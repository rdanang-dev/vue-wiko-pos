<template>
  <dashboard-layouts>
    <div class="flex justify-center flex-grow h-full flex-col lg:flex-row">
      <div class="w-full lg:w-6/12 p-1">
        <div class="flex flex-col lg:flex-row flex-wrap">
          <div class="w-full mb-2 lg:w-6/12 lg:pr-1">
            <div class="flex bg-white rounded-xl shadow p-2">
              <div class="rounded-xl bg-blue-400 p-5">
                Rp
              </div>
              <div class="flex flex-col py-3 px-2">
                <span class="text-sm">Daily Income</span>
                <span class="text-sm"
                  >Rp.{{
                    dashboardDailyReport.order_total | formatRupiah
                  }}</span
                >
              </div>
            </div>
          </div>
          <div class="w-full lg:w-6/12 pb-3 lg:pl-1 lg:pb-0">
            <div class="flex bg-white rounded-xl shadow p-2">
              <div class="rounded-xl bg-blue-400 p-5">
                <swap-horizontal></swap-horizontal>
              </div>
              <div class="flex flex-col py-3 px-2">
                <span class="text-sm">Daily Transacion</span>
                <span class="text-sm"
                  >{{ dashboardDailyReport.total_transaction }}x
                  Transaction</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="w-full bg-white rounded-xl shadow p-3">
          <div class="flex justify-between">
            <span>Weekly Income </span>
            <span>from {{ weeklyCount }}x Transactions</span>
          </div>

          <bar-chart :chartdata="weeklyData" :options="options" class="pt-2" />
        </div>
      </div>
      <div class="w-full lg:w-6/12 p-1">
        <div class="bg-white rounded-xl shadow p-5 h-full">
          <div class="flex flex-col text-center">
            <span class="text-2xl pb-1">Yearly Income</span>
            <span class="text-5xl pb-3"
              >Rp. {{ dashboardYearlyReport.order_total | formatRupiah }},-
            </span>
            <span class="text-md text-gray-500 pb-5"
              >{{ dashboardYearlyReport.first_trans }} -
              {{ dashboardYearlyReport.last_trans }}</span
            >
            <hr />
          </div>
          <div class="flex flex-col">
            <div class="flex justify-between py-2">
              <span>Latest Transaction</span>
              <button
                class="block px-2 transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-300 rounded-lg"
                @click="onMore"
              >
                More
              </button>
            </div>

            <div class="flex flex-col">
              <div
                class="flex justify-between pb-2"
                v-for="(recent, key) in dashboardRecentTransaction.data"
                :key="key"
              >
                <div class="flex flex-row">
                  <div class="bg-gray-300 rounded-lg p-4">
                    <swap-horizontal></swap-horizontal>
                  </div>
                  <div class="flex flex-col pl-2 py-1">
                    <span class="text">
                      {{ recent.order_code }}
                    </span>
                    <div class="flex flex-row text-xs">
                      <span>
                        Total:
                        {{ recent.order_total }}
                      </span>
                      <span>, Handled by:</span>
                      <span>
                        {{ " " + recent.employee.name }}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  {{ recent.order_date }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dashboard-layouts>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BarChart from "../components/BarChart.vue";
import DashboardLayouts from "../components/DashboardLayouts.vue";
import SwapHorizontal from "vue-material-design-icons/SwapHorizontal";

export default {
  name: "Home",
  components: {
    DashboardLayouts,
    BarChart,
    SwapHorizontal,
  },
  data: () => ({
    weeklyCount: 0,
    weeklyData: {
      labels: [],
      datasets: [
        {
          label: "Data",
          backgroundColor: "#f87979",
          data: [],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      base: 0,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  }),
  computed: {
    ...mapState("report", [
      "dashboardDailyReport",
      "dashboardWeeklyReport",
      "dashboardYearlyReport",
      "dashboardRecentTransaction",
    ]),
  },
  async mounted() {
    await this.fetchData();
    this.getDashboardDailyReport();
    this.getDashboardYearlyReport();
    this.getDashboardRecentTransaction();
  },
  methods: {
    ...mapActions("report", [
      "getDashboardDailyReport",
      "getDashboardWeeklyReport",
      "getDashboardYearlyReport",
      "getDashboardRecentTransaction",
    ]),

    async fetchData() {
      await this.getDashboardWeeklyReport();
      this.weeklyReportChart();
    },

    weeklyReportChart() {
      const weeklyLabels = this.dashboardWeeklyReport.data.map((value) => {
        return value.order_date;
      });
      this.weeklyData.labels = weeklyLabels;
      const weeklyData = this.dashboardWeeklyReport.data.map((value) => {
        return value.order_total;
      });
      this.dashboardWeeklyReport.data.forEach((value) => {
        this.weeklyCount += value.total_transaction;
      });
      this.weeklyData.datasets[0].data = weeklyData;
    },

    onMore() {
      this.$router.push("/transaction-report");
    },
  },
};
</script>
