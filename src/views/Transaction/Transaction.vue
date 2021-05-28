<template>
  <dashboard-layouts>
    <div class="flex flex-wrap">
      <div class="w-full">
        <ul class="flex list-none flex-wrap pb-4 flex-row">
          <li class="flex-auto text-center">
            <a
              class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              v-on:click="toggleTabs(1)"
              v-bind:class="{
                'text-blue-500 bg-white': openTab !== 1,
                'text-white bg-blue-500': openTab === 1,
              }"
            >
              Order List
            </a>
          </li>
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              v-on:click="toggleTabs(2)"
              v-bind:class="{
                'text-blue-500 bg-white': openTab !== 2,
                'text-white bg-blue-500': openTab === 2,
              }"
            >
              History
            </a>
          </li>
        </ul>
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded"
        >
          <div class="px-4 py-5 flex-auto">
            <div class="tab-content tab-space">
              <div
                v-bind:class="{
                  hidden: openTab !== 1,
                  block: openTab === 1,
                }"
              >
                <div class>
                  <div class="flex">
                    <div class="relative flex w-full flex-wrap max-h-6 pr-1">
                      <t-input
                        v-model="filter"
                        @change="onSearch"
                        placeholder="Search Here"
                      />
                      <span
                        v-if="!!filter"
                        @click="clearSearch"
                        class="text-center absolute bg-transparent text-base items-center justify-center right-0 pr-2 py-2 text-gray-400"
                      >
                        <close-thick></close-thick>
                      </span>
                    </div>

                    <div class="pr-1">
                      <button
                        @click="onSearch"
                        class="py-2 px-3 bg-blue-500 rounded-md text-white focus:shadow-outline-none focus:shadow-xl"
                      >
                        <magnify></magnify>
                      </button>
                    </div>

                    <div>
                      <button
                        @click="onCreateOrder"
                        class="block text-white bg-blue-500 text-sm transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                      >
                        New Order
                      </button>
                    </div>
                  </div>

                  <t-table :headers="headers" :data="orderList.data">
                    <template slot="row" slot-scope="props">
                      <tr
                        @click="onSelectRow(props.row)"
                        :class="[props.trClass]"
                      >
                        <td :class="props.tdClass">
                          {{ props.row.created_at }}
                        </td>
                        <td :class="props.tdClass">
                          {{ props.row.order_number }}
                        </td>
                        <td :class="props.tdClass">
                          {{ props.row.order_code }}
                        </td>
                        <td :class="props.tdClass">
                          <button
                            v-if="props.row.status == 1"
                            class="block px-4 py-1 transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed bg-yellow-300"
                          >
                            Pending
                          </button>
                          <button
                            v-else-if="props.row.status == 2"
                            class="block px-4 py-1 transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed bg-green-300"
                          >
                            Success
                          </button>
                        </td>
                        <td :class="props.tdClass">
                          {{ props.row.total_price }}
                        </td>
                      </tr>
                    </template>
                  </t-table>
                </div>
              </div>
              <div
                v-bind:class="{
                  hidden: openTab !== 2,
                  block: openTab === 2,
                }"
              >
                <div>
                  <t-table :headers="headers" :data="orderList.data">
                    <template slot="row" slot-scope="props">
                      <tr
                        @click="onSelectRow(props.row)"
                        :class="[props.trClass]"
                      >
                        <td :class="props.tdClass">
                          {{ props.row.created_at }}
                        </td>
                        <td :class="props.tdClass">
                          {{ props.row.order_number }}
                        </td>
                        <td :class="props.tdClass">
                          {{ props.row.order_code }}
                        </td>
                        <td :class="props.tdClass">
                          <button
                            v-if="props.row.status == 1"
                            class="block px-4 py-1 transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed bg-yellow-300"
                          >
                            Pending
                          </button>
                          <button
                            v-else-if="props.row.status == 2"
                            class="block px-4 py-1 transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed bg-green-300"
                          >
                            Success
                          </button>
                        </td>
                        <td :class="props.tdClass">
                          {{ props.row.total_price }}
                        </td>
                      </tr>
                    </template>
                  </t-table>
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
import DashboardLayouts from "../../components/DashboardLayouts.vue";
import CloseThick from "vue-material-design-icons/CloseThick";
import Magnify from "vue-material-design-icons/Magnify";

import { mapActions, mapState } from "vuex";
export default {
  components: { DashboardLayouts, CloseThick, Magnify },
  data() {
    return {
      filter: "",
      openTab: 1,
      status: 1,
      headers: [
        {
          value: "created_at",
          text: "Tanggal",
        },
        {
          value: "order_number",
          text: "order_number",
        },
        {
          value: "order_code",
          text: "order_code",
        },
        {
          value: "status",
          text: "Status",
        },
        {
          value: "total_price",
          text: "Harga",
        },
      ],
    };
  },
  computed: {
    ...mapState("order", ["orderList"]),
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
    toggleTabs: function(tabNumber) {
      this.openTab = tabNumber;
      if (this.openTab == 1) {
        this.status = 1;
      } else {
        this.status = 2;
      }
      this.getAllOrderList({
        status: this.status,
      });
    },
    async onCreateOrder() {
      await this.createOrder();
      await this.getAllOrderList();
    },
    onSelectRow(row) {
      if (row.status == 1) {
        this.$router.push({
          name: "TransactionDetail",
          params: { id: row.id },
        });
      } else {
        this.$toast.error("Transaction Already Completed", 3000);
      }
    },
    onSearch() {
      this.currentPage = 1;
      // this.getAllMenuList({
      //   page: this.currentPage,
      //   per_page: this.perPage,
      //   filter: this.filter,
      // });
    },
    clearSearch() {
      this.filter = "";
      this.onSearch();
    },
  },
};
</script>
