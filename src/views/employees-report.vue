<template>
  <dashboard-layouts>
    <div class="flex justify-center p-5  flex-grow h-full">
      <div class="p-5 bg-white rounded-xl w-full"></div>
    </div>
  </dashboard-layouts>
</template>

<script>
import DashboardLayouts from "../components/DashboardLayouts.vue";
// @ is an alias to /src

export default {
  name: "EmployeesReport",
  components: {
    DashboardLayouts,
  },
};
</script>
