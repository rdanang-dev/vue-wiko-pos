import axios from "axios";

const state = {
  userList: [],
  userData: {},
  errorData: {
    errors: [],
  },
  profile: {},
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
};
const getters = {
  isAuthenticated(state) {
    state.token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    return state.isAuthenticated;
  },
};
const mutations = {
  setUserList(state, payload) {
    state.userList = payload;
  },
  setProfile(state, payload) {
    state.profile = payload;
  },
  setToken(state, payload) {
    state.token = payload;
  },
  setError(state, payload) {
    state.errorData = payload;
  },
  purgeAuth(state) {
    state.profile = {};
    state.token = "";
    localStorage.removeItem("token");
  },
};
const actions = {
  // fungsi handle login
  async handleLogin(context, { payload }) {
    try {
      //masukin data yang di fetch dari api ke dalam variable response
      const response = await axios.post(
        `${process.env.VUE_APP_BASE_URL}/api/auth`,
        //payload di sini berfungsi untuk mengisi data yang di transfer ke api
        // dalam kasus ini email dan password yang di ambil dari login.vue
        payload
      );

      //data user yang sudah di ambil kemdian di se ke variable setprofile dengan
      context.commit("setProfile", response.data.user);
      context.commit("setToken", response.data.token);
      localStorage.setItem("token", response.data.token);
      return response;
    } catch (error) {
      let errorMessage = "";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      if (error.response.status == 401) {
        console.error("masuk error", error.response);
        throw new Error(errorMessage);
      } else if (error.response.status == 400) {
        context.commit("setError", error.response.data);
        throw new Error(errorMessage);
      }

      return error.message;
    }
  },
  async getProfile(context) {
    if (localStorage.getItem("token")) {
      try {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${context.state.token}`;
        const response = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/api/profile`
        );
        context.commit("setProfile", response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      context.commit("purgeAuth");
    }
  },

  async handleLogOut(context) {
    try {
      await axios.get(`${process.env.VUE_APP_BASE_URL}/api/auth`);
      context.commit("purgeAuth");
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
