import axios from "axios";
const state = {
  userList: [],
  roleList: [],
  userData: {},
  errorData: {
    errors: [],
  },
};
const getters = {};
const mutations = {
  setUserList(state, payload) {
    state.userList = payload;
  },
  setRoleList(state, payload) {
    state.roleList = payload;
  },
  setUser(state, payload) {
    state.userData = payload;
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

  async getAllUserList(
    context,
    { filter, privileges } = { filter: "", privileges: "All" }
  ) {
    try {
      const params = new URLSearchParams();
      if (filter != null && filter != "") {
        params.append("filter", filter);
      }
      if (privileges != "All") {
        params.append("privileges", privileges);
      }
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/user?${params}`
      );
      context.commit("setUserList", response.data);
    } catch (error) {
      console.error(error);
    }
  },

  async getUser(context, { id }) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/user/${id}`
      );
      context.commit("setUser", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },

  async createUser(context, { payload }) {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_BASE_URL}/api/user`,
        payload
      );
      return response.data;
    } catch (error) {
      let errorMessage = "";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      if (error.response.status >= 400) {
        console.error("masuk error", error.response);
        context.commit("setError", error.response.data);
        throw new Error(errorMessage);
      }
      return error.message;
      // if (error.response) {
      //   errorMessage = error.response.data.message;
      // }
      // if (error.response.status == 401) {
      //   console.error("masuk error", error.response);
      //   throw new Error(errorMessage);
      // } else if (error.response.status == 400) {
      //   context.commit("setError", error.response.data);
      //   throw new Error(errorMessage);
      // }
    }
  },

  resetUser(context) {
    context.commit("setUser", {});
  },

  async updateUser(context, { id, payload }) {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_BASE_URL}/api/user/${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      let errorMessage = "";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      if (error.response.status >= 400) {
        console.error("masuk error", error.response);
        context.commit("setError", error.response.data);
        throw new Error(errorMessage);
      }
      return error.message;
    }
  },

  async deleteUser(context, { id }) {
    try {
      const response = await axios.delete(
        `${process.env.VUE_APP_BASE_URL}/api/user/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getAllRoles(context) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/roles`
      );
      context.commit("setRoleList", response.data.roles);
    } catch (error) {
      console.error(error);
    }
  },
};

const user = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default user;
