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

        <div class="pt-4">
          <div>
            <div class="flex flex-col">
              <div
                class="flex justify-between pb-2"
                v-for="(trans, key) in allTransaction.data"
                :key="key"
              >
                <div class="flex flex-row">
                  <div class="bg-gray-300 rounded-lg p-4">
                    <swap-horizontal></swap-horizontal>
                  </div>
                  <div class="flex flex-col pl-2 py-1">
                    <span class="text">
                      {{ trans.order_code }}
                    </span>
                    <div class="flex flex-row text-xs">
                      <span>
                        Total:
                        {{ trans.order_total }}
                      </span>
                      <span>, Handled by:</span>
                      <span>
                        {{ " " + trans.employee.name }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col">
                  <span>{{ trans.order_date }}</span>
                  <span
                    class="text-right text-blue-400"
                    @click="openReceiptModal(trans.details)"
                    >Details</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <t-modal v-model="receiptModal" hideCloseButton:true>
          <div class="flex justify-center text-center flex-col">
            <img
              class="h-12 w-12 mx-auto"
              src="~@/assets/small_ico.jpg"
              alt="logo"
            />
            <div class="text-xl">Wisata Kopi</div>
            <hr class="my-1" />
          </div>
          <div>
            <t-table :headers="headers" :data="transDetails" variant="receipt">
              <template v-slot:thead="props">
                <thead :class="props.theadClass">
                  <tr :class="props.trClass">
                    <th class="text-left">
                      {{ props.data[0].text }}
                    </th>
                    <th class="text-left">
                      {{ props.data[1].text }}
                    </th>
                    <th class="text-right">
                      {{ props.data[2].text }}
                    </th>
                  </tr>
                </thead>
              </template>
              <template slot="row" slot-scope="props">
                <tr @click="onSelectRow(props.row)" :class="[props.trClass]">
                  <td :class="props.tdClass">
                    {{ props.row.name }}
                    <br />
                    {{ props.row.price }}
                  </td>
                  <td :class="props.tdClass">
                    {{ props.row.qty }}
                  </td>
                  <td :class="[props.tdClass, 'text-right']">
                    {{ props.row.total_price }}
                  </td>
                </tr>
              </template>
            </t-table>
          </div>
          <hr class="my-1" />
          <div class="flex flex-col">
            <div class="flex justify-between">
              <span class="text-sm">Total Item </span>
              <span class="text-sm"> item</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm">Subtotal</span>
              <span class="text-sm"></span>
            </div>
            <div class="flex justify-between">
              <span class="text-xs">Discount </span>
              <span class="text-xs"> % / Rp.</span>
            </div>
            <hr class="my-1" />
            <div class="flex justify-between">
              <span>Total</span>
              <span></span>
            </div>
            <div class="flex justify-between">
              <span>Cash</span>
              <span></span>
            </div>
            <hr class="my-1" />
            <div class="flex justify-between">
              <span>Change</span>
              <span></span>
            </div>
          </div>
        </t-modal>
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
import SwapHorizontal from "vue-material-design-icons/SwapHorizontal";

export default {
  name: "TransactionReport",
  components: {
    DashboardLayouts,
    LineChart,
    CloseThick,
    Magnify,
    SwapHorizontal,
  },
  data: () => ({
    receiptModal: null,
    transDetails: null,
    headers: [
      {
        value: "name",
        text: "Name",
      },
      {
        value: "qty",
        text: "Qty",
      },
      {
        value: "subtotal",
        text: "Subtotal",
      },
    ],
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
    ...mapState("report", ["allTransaction"]),
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
    ...mapActions("report", ["getAllTransaction"]),

    fetchData() {
      this.getAllOrderList();
      this.getAllTransaction();
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

    openReceiptModal(detail) {
      this.transDetails = detail;
      this.receiptModal = true;
    },

    closeReceiptModal() {
      this.receiptModal = false;
    },
  },
};
</script>
