import axios from "axios";
const state = {
  userList: [],
  userData: {},
};
const getters = {};
const mutations = {
  setUserList(state, payload) {
    state.userList = payload;
  },
  setUser(state, payload) {
    state.userData = payload;
  },
};
const actions = {
  async getAllUserList(context) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/user`
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
      context.commit("setUser", response.data);
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
      console.log(error);
    }
  },
  resetUser(context) {
    context.commit("setUser", {});
  },
  async updateUser(context, { id, payload }) {
    try {
      const response = await axios.put(
        `${process.env.VUE_APP_BASE_URL}/api/user/${id}`,
        payload
      );

      return response.data;
    } catch (error) {
      console.log(error);
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
};

const user = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default user;
