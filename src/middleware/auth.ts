import { Context } from "@nuxt/types";
import { AuthService } from "../services/AuthService";

const LOGIN_PATH = "/login";

export default function ({ store, redirect, route, req }: Context) {
  AuthService.init(store);

  const loggedInUser = store.state.auth.loggedInUser;
  const checkToken = AuthService.checkToken();

  if (!loggedInUser || !checkToken) {
    let token;

    if (process.client) {
      token = localStorage.getItem("accessToken");
    } else if (process.server && req) {
      const cookies = req.headers.cookie;
      token = AuthService.getCookie(cookies!, "accessToken");
    }

    store.dispatch("auth/setAccessToken", token);

    if (!token || !AuthService.checkToken()) {
      if (route.path !== LOGIN_PATH) {
        return redirect(LOGIN_PATH);
      }
    }
  }
}
