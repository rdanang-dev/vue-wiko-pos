<template>
  <dashboard-layouts>
    <div class="flex flex-col lg:flex-row justify-center p-3  flex-grow h-full">
      <div class="w-full p-5 bg-white rounded-xl">
        <t-button class="mb-2" @click="onCreateOrder">
          New Order
        </t-button>
        <t-table :headers="headers" :data="orderList.data">
          <template slot="row" slot-scope="props">
            <tr
              @click="onSelectRow(props.row)"
              :class="[
                props.trClass,
                // props.rowIndex % 2 === 0 ? 'bg-gray-100' : ''
              ]"
            >
              <td :class="props.tdClass">
                {{ props.row.id }}
              </td>
              <td :class="props.tdClass">
                {{ props.row.order_number }}
              </td>
              <td :class="props.tdClass">
                {{ props.row.order_code }}
              </td>
              <td :class="props.tdClass">
                {{ props.row.created_at }}
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
  </dashboard-layouts>
</template>
<script>
import DashboardLayouts from "../components/DashboardLayouts.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: { DashboardLayouts },
  data() {
    return {
      headers: [
        {
          value: "id",
          text: "ID",
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
          value: "created_at",
          text: "Tanggal",
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
    async onCreateOrder() {
      await this.createOrder();
      await this.getAllOrderList();
    },
    onSelectRow(row) {
      // console.log("id");
      if (row.status == 1) {
        this.$router.push({
          name: "TransactionDetail",
          params: { id: row.id },
        });
      } else {
        this.$toast.error("Transaction Already Completed", 3000);
      }
    },
  },
};
</script>
