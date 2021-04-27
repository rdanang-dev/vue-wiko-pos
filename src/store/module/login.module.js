import axios from "axios";

const state = {
  errorData: {
    errors: [],
  },
  profile: {},
  token: "",
};
const getters = {
  isAuthenticated(state) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    return !!state.token;
  },
};
const mutations = {
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
  async handleLogin(context, { payload }) {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_BASE_URL}/api/auth`,
        payload
      );

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
        context.commit("setProfile", response.data.data);
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

const login = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default login;
