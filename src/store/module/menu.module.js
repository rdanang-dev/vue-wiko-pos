import axios from "axios";
const state = {
  menuList: {
    data: [],
  },
  menuData: {},
  errorData: {
    errors: [],
  },
};
const getters = {};
const mutations = {
  setMenuList(state, payload) {
    state.menuList = payload;
  },
  setMenu(state, payload) {
    state.menuData = payload;
  },
  setError(state, payload) {
    state.errorData = payload;
  },
};
const actions = {
  clearError(context) {
    const payload = {
      errorData: {
        errors: [],
      },
    };
    context.commit("setError", payload);
  },

  async getAllMenuList(
    context,
    { page, per_page, filter } = { page: 1, per_page: null, filter: "" }
  ) {
    try {
      const params = new URLSearchParams();
      if (page != null) {
        params.append("page", page);
      }
      if (per_page != null) {
        params.append("per_page", per_page);
      }

      if (filter != null && filter != "") {
        params.append("filter", filter);
      }
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/menu?${params}`
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
      let errorMessage = "";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      if (error.response.status == 401) {
        console.error("masuk error", error.response);
        throw new Error(errorMessage);
      } else if (error.response.status == 422) {
        context.commit("setError", error.response.data);
        throw new Error(errorMessage);
      }
      return error.message;
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
      let errorMessage = "";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      if (error.response.status == 401) {
        console.error("masuk error", error.response);

        throw new Error(errorMessage);
      } else if (error.response.status == 422) {
        context.commit("setError", error.response.data);
        throw new Error(errorMessage);
      } else if (error.response.status == 413) {
        context.commit("setError", error.response.data.message);
        throw new Error(errorMessage);
      }

      return error.message;
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
