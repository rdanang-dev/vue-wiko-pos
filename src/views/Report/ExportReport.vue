<template>
  <div class="min-h-screen w-full bg-white p-2">
    <!-- navigation -->
    <div class="flex justify-between no-print">
      <t-button
        :to="{
          name: 'TransactionReport',
        }"
        variant="editable"
        class="font-medium bg-red-500 text-white"
        >Back
      </t-button>
      <t-button
        variant="editable"
        class="font-medium bg-custom-color2 text-white"
        @click="onExport"
        >Export
      </t-button>
    </div>
    <!-- navigation -->

    <!-- Page Header -->
    <div class="flex justify-center text-center flex-col">
      <img class="h-12 w-12 mx-auto" src="~@/assets/small_ico.jpg" alt="logo" />
      <span class="text-xl">Wisata Kopi</span>

      <!-- Label -->
      <span class="text-md" v-if="exportData.label != 'Yearly'"
        >{{ exportData.label }} Report</span
      >
      <span class="text-md" v-else
        >{{ exportData.data.data[0].tahun }} {{ exportData.label }} Report</span
      >
      <!-- Label -->

      <!-- Range Details -->
      <div>
        <span v-if="exportData.label == 'Daily'">{{
          exportData.data.data[0].date
        }}</span>
        <span v-if="exportData.label == 'Weekly'"
          >from {{ exportData.data.data[0].order_date }} ~
          {{
            exportData.data.data[exportData.data.data.length - 1].order_date
          }}</span
        >
        <span v-if="exportData.label == 'Monthly'">{{
          exportData.data.data[0].bulanTahun
        }}</span>
        <span v-if="exportData.label == 'Yearly'"
          >from {{ exportData.data.data[0].first_trans }} ~
          {{
            exportData.data.data[exportData.data.data.length - 1].last_trans
          }}</span
        >
        <span
          v-if="exportData.label == 'Custom' && exportData.date.length == 1"
          >{{ exportData.data[0].order_date }}</span
        >
        <span v-if="exportData.label == 'Custom' && exportData.date.length > 1"
          >from {{ exportData.data[0].first_trans }} ~
          {{ exportData.data[exportData.data.length - 1].last_trans }}</span
        >
      </div>
      <!-- Range Details -->
    </div>
    <!-- Page Header -->

    <!-- Daily, and Custom 1 Data Report -->
    <div
      class="py-7"
      v-if="
        exportData.label == 'Daily' ||
          (exportData.label == 'Custom' && exportData.date.length == 1)
      "
    >
      <t-table
        :headers="dailyTableHeaders"
        :data="
          exportData.label == 'Daily' ? exportData.data.data : exportData.data
        "
        variant="report"
      >
        <template slot="row" slot-scope="props">
          <tr :class="[props.trClass]">
            <td :class="props.tdClass">
              {{ props.row.order_code }}
            </td>
            <td :class="props.tdClass">
              Rp. {{ props.row.total_price | formatRupiah }},-
            </td>
            <td :class="props.tdClass">
              {{ props.row.employee.name }}
            </td>
          </tr>
        </template>
      </t-table>
      <div class="flex flex-row-reverse pr-11 pt-8">
        <div class="flex flex-col" style="min-width: 250px;">
          <div class="flex flex-row justify-between">
            <span>Total :</span>
            <span>Rp. {{ dataSum.totalPrice | formatRupiah }},-</span>
          </div>
          <div class="flex flex-row justify-between">
            <span>Total Transaction :</span>
            <span>{{ dataSum.totalTransaction }}x</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Daily, and Custom 1 Data Report -->

    <!-- Week, Month and Custom under 30 Data Report -->
    <div
      class="py-7"
      v-if="
        exportData.label == 'Weekly' ||
          exportData.label == 'Monthly' ||
          (exportData.label == 'Custom' &&
            exportData.date.length > 1 &&
            !exportData.data[0].first_trans)
      "
    >
      <t-table
        :headers="weekNMonthTableHeaders"
        :data="
          exportData.label == 'Custom' ? exportData.data : exportData.data.data
        "
        variant="report"
      >
        <template slot="row" slot-scope="props">
          <tr :class="[props.trClass]">
            <td :class="props.tdClass">
              {{ props.row.order_date }}
            </td>
            <td :class="props.tdClass">{{ props.row.total_transaction }}x</td>
            <td :class="props.tdClass">
              Rp. {{ props.row.order_total | formatRupiah }},-
            </td>
          </tr>
        </template>
      </t-table>
      <div class="flex flex-row-reverse pr-11 pt-8">
        <div class="flex flex-col" style="min-width: 250px;">
          <div class="flex flex-row justify-between">
            <span>Total :</span>
            <span>Rp. {{ dataSum.totalPrice | formatRupiah }},-</span>
          </div>
          <div class="flex flex-row justify-between">
            <span>Total Transaction :</span>
            <span>{{ dataSum.totalTransaction }}x</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Week, Month and Custom under 30 Data Report -->

    <!-- Yearly Report and Custom more than 30 data Report -->
    <div
      class="py-7"
      v-if="
        exportData.label == 'Yearly' ||
          (exportData.label == 'Custom' && exportData.data[0].first_trans)
      "
    >
      <t-table
        :headers="yearlyTableHeaders"
        :data="
          exportData.label == 'Custom' ? exportData.data : exportData.data.data
        "
        variant="report"
      >
        <template slot="row" slot-scope="props">
          <tr :class="[props.trClass]">
            <td v-if="exportData.label == 'Custom'" :class="props.tdClass">
              {{ props.row.bulan }}
            </td>
            <td v-else :class="props.tdClass">
              {{ props.row.month_formatted }}
            </td>
            <td :class="props.tdClass">
              {{ props.row.first_trans }} ~ {{ props.row.last_trans }}
            </td>
            <td :class="props.tdClass">{{ props.row.total_transaction }}x</td>
            <td :class="props.tdClass">
              Rp. {{ props.row.order_total | formatRupiah }},-
            </td>
          </tr>
        </template>
      </t-table>
      <div class="flex flex-row-reverse pr-11 pt-8">
        <div class="flex flex-col" style="min-width: 250px;">
          <div class="flex flex-row justify-between">
            <span>Total :</span>
            <span>Rp. {{ dataSum.totalPrice | formatRupiah }},-</span>
          </div>
          <div class="flex flex-row justify-between">
            <span>Total Transaction :</span>
            <span>{{ dataSum.totalTransaction }}x</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Yearly Report and Custom more than 30 data Report -->
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "ExportReport",
  data() {
    return {
      dataSum: {
        totalPrice: 0,
        totalTransaction: 0,
      },
      //Daily Report
      dailyTableHeaders: [
        {
          value: "order_code",
          text: "Order Code",
        },
        {
          value: "total_price",
          text: "Total Price",
        },
        {
          value: "cashier",
          text: "Cashier",
        },
      ],
      //Week and Month Report
      weekNMonthTableHeaders: [
        {
          value: "order_date",
          text: "Date",
        },
        {
          value: "total_transaction",
          text: "Total Transaction",
        },
        {
          value: "order_total",
          text: "Total Price",
        },
      ],
      //Yearly Report
      yearlyTableHeaders: [
        {
          value: "month",
          text: "Month",
        },
        {
          value: "Range",
          text: "Range",
        },
        {
          value: "total_transaction",
          text: "Total Transaction",
        },
        {
          value: "order_total",
          text: "Total Price",
        },
      ],
    };
  },
  computed: {
    ...mapState("report", ["exportData"]),
  },
  mounted() {
    this.countTotal();
  },
  methods: {
    onExport() {
      window.print();
    },
    countTotal() {
      // Daily and Custom 1 data
      if (
        this.exportData.label == "Daily" ||
        (this.exportData.label == "Custom" && this.exportData.date.length == 1)
      ) {
        if (this.exportData.label == "Daily") {
          this.exportData.data.data.forEach((value, index) => {
            this.dataSum.totalPrice += parseInt(value.total_price);
            this.dataSum.totalTransaction = index + 1;
          });
        }
        if (this.exportData.label == "Custom") {
          this.exportData.data.forEach((value, index) => {
            this.dataSum.totalPrice += parseInt(value.total_price);
            this.dataSum.totalTransaction = index + 1;
          });
        }
      }
      // Weekly, Monthly, Yearly, and Custom many Data
      if (
        this.exportData.label == "Weekly" ||
        this.exportData.label == "Monthly" ||
        this.exportData.label == "Yearly" ||
        (this.exportData.label == "Custom" && this.exportData.date.length > 1)
      ) {
        if (
          this.exportData.label == "Weekly" ||
          this.exportData.label == "Monthly" ||
          this.exportData.label == "Yearly"
        ) {
          this.exportData.data.data.forEach((value) => {
            this.dataSum.totalPrice += parseInt(value.order_total);
            this.dataSum.totalTransaction += parseInt(value.total_transaction);
          });
        }
        if (
          this.exportData.label == "Custom" &&
          this.exportData.date.length > 1
        ) {
          this.exportData.data.forEach((value) => {
            this.dataSum.totalPrice += parseInt(value.order_total);
            this.dataSum.totalTransaction += parseInt(value.total_transaction);
          });
        }
      }
    },
  },
};
</script>
<style scoped>
@media print {
  .no-print,
  .no-print * {
    display: none !important;
  }
}
</style>
