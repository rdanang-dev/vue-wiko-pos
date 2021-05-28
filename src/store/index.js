import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import menu from "./module/menu.module";
import login from "./module/login.module";
import user from "./module/user.module";
import order from "./module/order.module";
import category from "./module/category.module";
import report from "./module/report.module";

import createPersistedState from "vuex-persistedstate";

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
    order,
    category,
    report,
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => localStorage.getItem(key),
        setItem: (key, value) => localStorage.setItem(key, value),
        removeItem: (key) => localStorage.removeItem(key),
      },
    }),
  ],
});
