import axios from "axios";
const state = {
  menuList: {
    data: [],
  },
  menuData: {},
};
const getters = {};
const mutations = {
  setMenuList(state, payload) {
    state.menuList = payload;
  },
  setMenu(state, payload) {
    state.menuData = payload;
  },
};
const actions = {
  async getAllMenuList(context) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/menu`
      );
      context.commit("setMenuList", response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async getMenu(context, { id }) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/menu/${id}`
      );
      context.commit("setMenu", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  clearMenu(context) {
    context.commit("setMenu", {});
  },
  async createMenu(context, { payload }) {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_BASE_URL}/api/menu`,
        payload
      );

      context.dispatch("clearMenu");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  async updateMenu(context, { id, payload }) {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_BASE_URL}/api/menu/${id}`,
        payload
      );
      context.dispatch("clearMenu");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  async deleteMenu(context, { id }) {
    try {
      const response = await axios.delete(
        `${process.env.VUE_APP_BASE_URL}/api/menu/${id}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

const menu = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default menu;
