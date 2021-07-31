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
  dailyReport: {},
  weeklyReport: {
    data: [],
  },
  monthlyReport: {
    data: [],
  },
  yearlyReport: {},
  exportData: {
    data: [],
  },
  exportCustom: {
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
  setDailyReport(state, payload) {
    state.dailyReport = payload;
  },
  setWeeklyReport(state, payload) {
    state.weeklyReport = payload;
  },
  setMonthlyReport(state, payload) {
    state.monthlyReport = payload;
  },
  setYearlyReport(state, payload) {
    state.yearlyReport = payload;
  },
  setExportData(state, payload) {
    state.exportData = payload;
  },
  setExportCustom(state, payload) {
    state.exportCustom = payload;
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
  async getAllTransaction(
    context,
    { filter, fromdate, todate, page, per_page } = {
      filter: "",
      fromdate: "",
      todate: "",
      page: 1,
      per_page: null,
    }
  ) {
    try {
      const params = new URLSearchParams();
      if (filter != null && filter != "") {
        params.append("filter", filter);
      }
      if (fromdate != null && fromdate != "") {
        params.append("fromdate", fromdate);
      }
      if (todate != null && todate != "") {
        params.append("todate", todate);
      }
      if (page != null) {
        params.append("page", page);
      }
      if (per_page != null) {
        params.append("per_page", per_page);
      }
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/report/alltransaction?${params}`
      );
      context.commit("setAllTransaction", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getDailyReport(context) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/report/daily`
      );
      context.commit("setDailyReport", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getWeeklyReport(context) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/report/weekly`
      );
      context.commit("setWeeklyReport", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getMonthlyReport(context) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/report/monthly`
      );
      context.commit("setMonthlyReport", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getYearlyReport(context) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/report/yearly`
      );
      context.commit("setYearlyReport", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fillExportData(context, { data }) {
    try {
      context.commit("setExportData", data);
    } catch (error) {
      console.log(error);
    }
  },
  async getExportCustom(
    context,
    { fromdate, todate } = {
      fromdate: "",
      todate: "",
    }
  ) {
    try {
      const params = new URLSearchParams();
      if (fromdate != null && fromdate != "") {
        params.append("fromdate", fromdate);
      }
      if (todate != null && todate != "") {
        params.append("todate", todate);
      }
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/report/exportcustom?${params}`
      );
      context.commit("setExportCustom", response.data);
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
