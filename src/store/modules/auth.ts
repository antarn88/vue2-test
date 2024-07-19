import { Module } from "vuex";
import { User } from "../../models/User";

interface AuthState {
  loggedInUser: User | null;
}

const state: AuthState = {
  loggedInUser: null,
};

const getters = {
  getLoggedInUser: (state: AuthState) => state.loggedInUser,
};

const actions = {
  setLoggedInUser({ commit }: any, user: User) {
    commit("SET_LOGGED_IN_USER", user);
  },
};

const mutations = {
  SET_LOGGED_IN_USER(state: AuthState, user: User) {
    state.loggedInUser = user;
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
