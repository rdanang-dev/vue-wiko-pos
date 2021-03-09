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
  async handleLogin(context, { payload }) {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_BASE_URL}/api/auth`,
        payload
      );
      localStorage.setItem("token", response.data);
    } catch (error) {
      console.error(error);
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
