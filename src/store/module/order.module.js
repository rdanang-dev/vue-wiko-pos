import axios from "axios";
import { getField, updateField } from "vuex-map-fields";

const state = {
  orderList: {
    data: [],
  },
  successList: {
    data: [],
  },
  orderData: {
    customer_id: "",
    details: [],
  },
  cart: [
    {
      customer_id: "",
      selectedProduct: [],
    },
  ],
  selectedProduct: [],
};
const getters = {
  getField,
};
const mutations = {
  setOrderList(state, payload) {
    state.orderList = payload;
  },
  setOrder(state, payload) {
    state.orderData = payload;
  },
  addSelectedProduct(state, payload) {
    console.log(payload);
    state.orderData.details.push(payload);
  },
  removeSelectedProduct(state, id) {
    state.orderData.details = state.orderData.details.filter((value) => {
      return value.menu_id !== id;
    });
  },
  updateField,
};

const actions = {
  async getAllOrderList(
    context,
    { status, filter } = { status: 1, filter: "" }
  ) {
    try {
      const params = new URLSearchParams();
      if (status != null) {
        params.append("status", status);
      }
      if (filter != null && filter != "") {
        params.append("filter", filter);
      }
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/order?${params}`
      );
      context.commit("setOrderList", response.data);
    } catch (error) {
      console.error(error);
    }
  },

  async getOrder(context, { id }) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/order/${id}`
      );
      context.commit("setOrder", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },

  async createOrder(context, { payload } = { payload: {} }) {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_BASE_URL}/api/order`,
        payload
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  async updateOrder(context, { id, payload }) {
    try {
      const response = await axios.put(
        `${process.env.VUE_APP_BASE_URL}/api/order/${id}`,
        payload
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  async deleteOrder(context, { id }) {
    try {
      const response = await axios.delete(
        `${process.env.VUE_APP_BASE_URL}/api/order/${id}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

const order = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default order;
