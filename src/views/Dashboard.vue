<template>
  <dashboard-layouts>
    <div class="flex justify-center p-5 flex-grow h-full">
      <div class="w-full lg:w-6/12 p-1">
        <div class="flex flex-col lg:flex-row flex-wrap ">
          <div class="w-full mb-2 lg:w-6/12 lg:mb-0 pr-1 ">
            <div class="flex bg-white rounded-xl shadow p-5 ">
              <div class="rounded-xl bg-blue-400 p-5">
                Rp
              </div>
              <div class="flex flex-col p-4">
                <span class="text-xs">Pemasukan Harian</span>
                <span class="text-xs">Place holder :p</span>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-6/12 pl-1">
            <div class="flex bg-white rounded-xl shadow p-5">
              <div class="rounded-xl bg-blue-400 p-5">
                Rp
              </div>
              <div class="flex flex-col p-4">
                <span class="text-xs">Pelanggan Harian</span>
                <span class="text-xs">Place holder :p</span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full bg-white rounded-xl shadow p-5 my-2 mr-4">
          <bar-chart :chartdata="chartdata" :options="options" />
        </div>
      </div>
      <div class="w-full lg:w-6/12 p-1">
        <div class="bg-white rounded-xl shadow p-5 h-full">asfasfdasdf</div>
      </div>
    </div>
  </dashboard-layouts>
</template>

<script>
import BarChart from "../components/BarChart.vue";
import DashboardLayouts from "../components/DashboardLayouts.vue";
// import { Bar } from 'vue-chartjs';
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    DashboardLayouts,
    BarChart,
    // Bar,
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
