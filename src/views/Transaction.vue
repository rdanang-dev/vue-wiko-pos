<template>
  <dashboard-layouts>
    <div class="flex flex-col lg:flex-row justify-center p-3  flex-grow h-full">
      <div class="w-full lg:w-8/12 p-5 bg-white rounded-xl">
        mantul
      </div>
      <div class="w-full lg:w-4/12 p-5 bg-white rounded-xl">
        mantul 2
      </div>
    </div>
  </dashboard-layouts>
</template>
<script>
import DashboardLayouts from "../components/DashboardLayouts.vue";
export default {
  components: { DashboardLayouts },
};
</script>
