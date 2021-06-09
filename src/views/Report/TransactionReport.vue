<template>
  <dashboard-layouts>
    <div class="flex justify-center pb-1 flex-grow h-full">
      <div class="p-5 bg-white rounded-xl w-full">
        <div class="flex justify-between">
          <span>Income Statistic</span>
          <span>from x Transaction</span>
          <select
            class="transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="Daily">Daily</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
        <line-chart :chartdata="chartdata" :options="options" />
      </div>
    </div>
    <div class="flex justify-center py-1 flex-grow h-full">
      <div class="p-5 bg-white rounded-xl w-full">
        <div class="flex flex-col lg:flex-row">
          <div class="flex flex-row lg:w-9/12">
            <div class="relative flex w-full flex-wrap max-h-6 pr-1">
              <t-input
                v-model="filter"
                @change="onSearch"
                placeholder="Search by Price/Order_Code"
              />
              <span
                v-if="!!filter"
                @click="clearSearch"
                class="text-center absolute bg-transparent text-base items-center justify-center right-0 pr-2 py-2 text-gray-400"
              >
                <close-thick></close-thick>
              </span>
            </div>

            <div class="lg:pr-1">
              <button
                @click="onSearch"
                class="py-2 px-3 bg-blue-500 rounded-md text-white focus:shadow-outline-none focus:shadow-xl"
              >
                <magnify></magnify>
              </button>
            </div>
          </div>
          <t-datepicker
            range
            v-model="date"
            placeholder="Filter by Date"
            class="py-2 lg:py-0 lg:w-3/12"
            date-format="Y-m-d"
            user-format="j F, y"
            @change="onDateChange"
          />
        </div>
      </div>
    </div>
  </dashboard-layouts>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DashboardLayouts from "../../components/DashboardLayouts.vue";
import LineChart from "../../components/LineChart.vue";
import CloseThick from "vue-material-design-icons/CloseThick";
import Magnify from "vue-material-design-icons/Magnify";

export default {
  name: "TransactionReport",
  components: {
    DashboardLayouts,
    LineChart,
    CloseThick,
    Magnify,
  },
  data: () => ({
    date: "",
    filter: "",
    chartdata: {
      labels: ["January", "February", "Maret"],
      datasets: [
        {
          label: "Data",
          backgroundColor: "#f87979",
          data: [40, 20, 10],
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
    ...mapState("order", ["orderList"]),
    check() {
      return this.date;
    },
  },
  watch: {
    check(date) {
      if (date == "") {
        this.clearDate();
      }
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions("order", {
      getAllOrderList: "getAllOrderList",
      createOrder: "createOrder",
    }),

    fetchData() {
      this.getAllOrderList();
    },

    clearDate() {
      this.onSearch();
    },

    onDateChange() {
      if (this.date) {
        if (this.date.length == 1) {
          this.getAllOrderList({
            filter: this.filter,
            fromdate: this.date[0],
          });
        }
        if (this.date.length > 1) {
          this.getAllOrderList({
            filter: this.filter,
            fromdate: this.date[0],
            todate: this.date[1],
          });
        }
      }
    },

    onSearch() {
      if (this.date) {
        this.getAllOrderList({
          filter: this.filter,
        });
        this.onDateChange();
      } else {
        this.getAllOrderList({
          filter: this.filter,
        });
      }
    },

    clearSearch() {
      this.filter = "";
      this.onSearch();
    },
  },
};
</script>
