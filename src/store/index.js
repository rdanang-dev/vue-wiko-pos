import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import menu from "./module/menu.module";
import login from "./module/login.module";
import user from "./module/user.module";

export default new Vuex.Store({
  state: {
    sideBarOpen: false,
  },
  getters: {
    sideBarOpen: (state) => {
      return state.sideBarOpen;
    },
  },
  mutations: {
    toggleSidebar(state) {
      state.sideBarOpen = !state.sideBarOpen;
    },
  },
  actions: {
    toggleSidebar(context) {
      context.commit("toggleSidebar");
    },
  },
  modules: {
    menu,
    login,
    user,
  },
});
