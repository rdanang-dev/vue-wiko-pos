<template>
  <dashboard-layouts>
    <div class="flex flex-col lg:flex-row justify-center p-3  flex-grow h-full">
      <div class="w-full lg:w-8/12 p-5 bg-white rounded-xl mr-5 shadow-xl">
        mantul
      </div>
      <div class="w-full lg:w-4/12 p-5 bg-white rounded-xl shadow-xl">
        <div class="bg-gray-100">
          <div class="flex justify-between">
            <span>Tanggal</span>
            <span>{{ getDate() }}</span>
          </div>
          <div class="flex justify-between">
            <span>Waktu</span>
            <span>{{ getTime() }}</span>
          </div>
        </div>
      </div>
    </div>
  </dashboard-layouts>
</template>
<script>
import DashboardLayouts from "../components/DashboardLayouts.vue";
export default {
  components: { DashboardLayouts },
  methods: {
    getDate() {
      return new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "2-digit",
        month: "long",
        day: "numeric",
      });
    },
    getTime() {
      return new Date().toLocaleString("id-ID", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    },
  },
};
</script>
