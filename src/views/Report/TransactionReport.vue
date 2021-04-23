<template>
  <dashboard-layouts>
    <div class="flex justify-center p-5 flex-grow h-full">
      <div class="p-5 bg-white rounded-xl w-full">
        <line-chart :chartdata="chartdata" :options="options" />
      </div>
    </div>
    <div class="flex justify-center px-5 py-1 flex-grow h-full">
      <div class="p-5 bg-white rounded-xl w-full">
        <div class="flex lg:flex-row">
          <t-input class="lg:w-9/12 pr-2" placeholder="Search Data Here" />
          <t-datepicker
            range
            placeholder="Filter by Date"
            class="lg:w-5/12 pl-2"
          />
          <!-- <t-input class="lg:w-6/12"></t-input> -->
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
