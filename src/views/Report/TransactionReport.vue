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
        <div class="flex lg:flex-row">
          <t-input class="lg:w-9/12" placeholder="Search Data Here" />
          <t-datepicker
            range
            placeholder="Filter by Date"
            class="lg:w-3/12 pl-2"
            :date-formatter="dateFormatter"
            :date-parser="dateParser"
            date-format="DD-MM-YYYY"
            user-format="d-m-Y"
          />
        </div>
      </div>
    </div>
  </dashboard-layouts>
</template>

<script>
import DashboardLayouts from "../../components/DashboardLayouts.vue";
import LineChart from "../../components/LineChart.vue";
// @ is an alias to /src

export default {
  name: "TransactionReport",
  components: {
    DashboardLayouts,
    LineChart,
  },
  data: () => ({
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
};
</script>
