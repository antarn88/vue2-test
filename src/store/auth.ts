import { Module } from "vuex";
import { User } from "../models/User";

interface AuthState {
  loggedInUser: User | null;
  accessToken: string;
}

const state: () => AuthState = () => ({
  loggedInUser: null,
  accessToken: "",
});

const getters = {
  getLoggedInUser: (state: AuthState) => state.loggedInUser,
  getAccessToken: (state: AuthState) => state.accessToken,
};

const actions = {
  setLoggedInUser({ commit }: any, user: User) {
    commit("SET_LOGGED_IN_USER", user);
  },

  setAccessToken({ commit }: any, accessToken: string) {
    commit("SET_ACCESS_TOKEN", accessToken);
  },
};

const mutations = {
  SET_LOGGED_IN_USER(state: AuthState, user: User) {
    state.loggedInUser = user;
  },

  SET_ACCESS_TOKEN(state: AuthState, accessToken: string) {
    state.accessToken = accessToken;
  },
};

const authStore: Module<AuthState, any> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default authStore;
