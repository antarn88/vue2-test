import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";

Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    modules: {
      auth,
      user,
    },
  });
};
