import axios from "axios";
const state = {
  categoryList: {
    data: [],
  },
  categoryData: {},
  allCategory: [],
  errorData: {
    errors: [],
  },
};
const getters = {};
const mutations = {
  setCategoryList(state, payload) {
    state.categoryList = payload;
  },
  setCategory(state, payload) {
    state.categoryData = payload;
  },
  setShowAllCategory(state, payload) {
    state.allCategory = payload;
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

  async getAllCategoryList(
    context,
    { page, per_page, filter } = {
      page: 1,
      per_page: null,
      filter: "",
    }
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
        `${process.env.VUE_APP_BASE_URL}/api/category?${params}`
      );
      context.commit("setCategoryList", response.data);
    } catch (error) {
      console.error(error);
    }
  },

  async getCategory(context, { id }) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/category/${id}`
      );
      context.commit("setCategory", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },

  clearCategory(context) {
    context.commit("setCategory", {});
  },

  async createCategory(context, { payload }) {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_BASE_URL}/api/category`,
        payload
      );
      context.dispatch("clearCategory");
      return response.data;
    } catch (error) {
      let errorMessage = "";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      if (error.response.status == 422) {
        context.commit("setError", error.response.data);
        throw new Error(errorMessage);
      }
      return error.message;
    }
  },

  async updateCategory(context, { id, payload }) {
    try {
      const response = await axios.put(
        `${process.env.VUE_APP_BASE_URL}/api/category/${id}`,
        payload
      );
      context.dispatch("clearCategory");
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

  async deleteCategory(context, { id }) {
    try {
      const response = await axios.delete(
        `${process.env.VUE_APP_BASE_URL}/api/category/${id}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getAllCategory(context) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/categories`
      );
      context.commit("setShowAllCategory", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
};

const category = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default category;
