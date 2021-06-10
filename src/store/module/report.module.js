import axios from "axios";
const state = {
  dashboardDailyReport: {},
  dashboardWeeklyReport: {},
  dashboardYearlyReport: {},
  dashboardRecentTransaction: {
    data: [],
  },
  allTransaction: {
    data: [],
  },
};
const getters = {};
const mutations = {
  setDashboardDailyReport(state, payload) {
    state.dashboardDailyReport = payload;
  },
  setDashboardWeeklyReport(state, payload) {
    state.dashboardWeeklyReport = payload;
  },
  setDashboardYearlyReport(state, payload) {
    state.dashboardYearlyReport = payload;
  },
  setDashboardRecentTransaction(state, payload) {
    state.dashboardRecentTransaction = payload;
  },
  setAllTransaction(state, payload) {
    state.allTransaction = payload;
  },
};
const actions = {
  async getDashboardDailyReport(context) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/report/dashboarddaily`
      );
      context.commit("setDashboardDailyReport", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getDashboardWeeklyReport(context) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/report/dashboardweekly`
      );
      context.commit("setDashboardWeeklyReport", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getDashboardYearlyReport(context) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/report/dashboardyearly`
      );
      context.commit("setDashboardYearlyReport", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getDashboardRecentTransaction(context) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/report/dashboardrecenttransaction`
      );
      context.commit("setDashboardRecentTransaction", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getAllTransaction(context) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/report/alltransaction`
      );
      context.commit("setAllTransaction", response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

const report = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default report;
