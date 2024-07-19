import { Context } from "@nuxt/types";
import { AuthService } from "../services/AuthService";
import UserService from "../services/UserService";

const LOGIN_PATH = "/login";

export default async function ({ store, redirect, route, req }: Context) {
  AuthService.init(store);

  const loggedInUser = store.state.auth.loggedInUser;
  const checkToken = AuthService.checkToken();

  if (loggedInUser && checkToken) {
    AuthService.setLoggedInUser(loggedInUser);
  } else {
    let token;

    if (process.client) {
      token = localStorage.getItem("accessToken");
    } else if (process.server && req) {
      const cookies = req.headers.cookie;
      token = AuthService.getCookie(cookies!, "accessToken");
    }

    if (!token || !AuthService.decodeToken(token)) {
      if (route.path !== LOGIN_PATH) {
        return redirect(LOGIN_PATH);
      }
    } else {
      const decodedToken = AuthService.decodeToken(token);

      try {
        const user = await UserService.getUserByEmail(decodedToken!.email);
        store.dispatch("auth/setLoggedInUser", user);
        AuthService.setLoggedInUser(user);
        AuthService.loggedInUser = user;
      } catch (error) {
        console.error("User fetch error:", error);

        return redirect(LOGIN_PATH);
      }
    }
  }
}
