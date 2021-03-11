import axios from "axios";
import { getField, updateField } from 'vuex-map-fields';

const state = {
    orderList: {
        data:[]
    },
    orderData: {},
    selectedProduct:[]
};
const getters = {
    getField
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
        state.selectedProduct.push(payload);
    },
    updateField
};
const actions = {
    async getAllOrderList(context) {
        try {
            const response = await axios.get(
                `${process.env.VUE_APP_BASE_URL}/api/order`
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
    async createOrder(context, { payload }) {
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
