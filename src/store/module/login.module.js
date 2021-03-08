// import axios from "axios";

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
  // async handleLogin() {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.VUE_APP_BASE_URL}/sanctum/csrf-cookie`
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
};

const menu = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default menu;
