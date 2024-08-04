import { Store } from "vuex";
import { jwtDecode } from "jwt-decode";
import axios, { AxiosResponse } from "axios";
import { User } from "../models/User";
import { DecodedToken } from "../models/DecodedToken";
import { LoginData } from "../models/LoginData";
import { AuthenticatedUser } from "../models/NewUserResponse";
import UserService from "./UserService";

const API_URL = "https://user-server-ejc2gtb6hqb4dtbh.polandcentral-01.azurewebsites.net/api";
const LOGIN_PATH = "/login";

let store: Store<any> | null = null;

export const AuthService = {
  loggedInUser: undefined as User | undefined,

  init(storeInstance: Store<any>): void {
    store = storeInstance;
  },

  get store(): Store<any> | null {
    return store;
  },

  getLoggedInUser(): User | undefined {
    return this.loggedInUser;
  },

  setLoggedInUser(user: User | undefined): void {
    store?.dispatch("auth/setLoggedInUser", user);
    this.loggedInUser = user;
  },

  logout(): void {
    store?.dispatch("auth/setLoggedInUser", undefined);
    this.deleteTokenAndCookie();
    this.loggedInUser = undefined;

    if (process.client) {
      window.location.href = LOGIN_PATH;
    }
  },

  decodeToken(token: string): DecodedToken | null {
    if (!process.client) return null;

    try {
      if (!this.isValidTokenFormat(token)) {
        throw new Error("Érvénytelen token formátum.");
      }

      const decoded = jwtDecode<DecodedToken>(token);

      if (decoded.exp * 1000 < Date.now()) {
        throw new Error("A token lejárt.");
      }

      if (process.client) {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken !== token) {
          throw new Error("A token érvénytelen.");
        }
      }

      return decoded;
    } catch (error) {
      this.logout();
      throw error;
    }
  },

  isValidTokenFormat: (token: string): boolean => {
    const parts = token.split(".");

    return parts.length === 3;
  },

  deleteTokenAndCookie(): void {
    if (!process.client) return;

    localStorage.removeItem("accessToken");

    if (document?.cookie) {
      const expires = new Date(0).toUTCString();
      document.cookie = `accessToken=;expires=${expires};path=/`;
    }
  },

  async login(loginData: LoginData): Promise<AxiosResponse<AuthenticatedUser, LoginData>> {
    try {
      const response = await axios.post(`${API_URL}${LOGIN_PATH}`, loginData);

      return response;
    } catch (err: any) {
      return err.response;
    }
  },

  getCookie(cookiesLocation: string, cname: string) {
    const name = cname + "=";
    const ca = cookiesLocation?.split(";");
    for (let i = 0; i < ca?.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  },

  checkToken(): boolean {
    if (process.client) {
      const token = localStorage.getItem("accessToken");

      if (token) {
        this.decodeToken(token);

        return true;
      }

      this.logout();

      return false;
    }

    return true;
  },

  async setLoggedInUserByToken(): Promise<void> {
    if (process.client) {
      if (localStorage.getItem("accessToken")) {
        const token = localStorage.getItem("accessToken");
        const decodedToken = AuthService.decodeToken(token!);

        try {
          const user = await UserService.getUserByEmail(decodedToken!.sub, token!);
          store?.dispatch("auth/setLoggedInUser", user);
          AuthService.setLoggedInUser(user);
          AuthService.loggedInUser = user;
        } catch (error) {
          console.error("User fetch error:", error);
        }
      }
    }
  },
};

export interface AuthState {
  loggedInUser: User | null;
}
