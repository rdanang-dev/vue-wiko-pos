<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->
  <div
    class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-white border-r z-30"
    :class="sideBarOpen ? '' : 'hidden'"
    id="main-nav"
  >
    <div class="w-full h-20 border-b flex px-4 items-center mb-8">
      <img class="object-cover max-h-20" src="~@/assets/logo.png" />
    </div>

    <perfect-scrollbar>
      <div class="mb-4 px-4">
        <p class="pl-4 text-sm font-semibold mb-1">MAIN</p>
        <router-link
          to="/"
          exact
          exact-active-class="bg-gray-200"
          class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <span class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
            <viewDashboard></viewDashboard>
          </span>
          <span class="text-gray-700">Dashboard</span>
        </router-link>
        <router-link
          to="/menu"
          exact
          exact-active-class="bg-gray-200"
          class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <span class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
            <food></food>
          </span>
          <span class="text-gray-700">Kelola Menu</span>
        </router-link>

        <router-link
          to="/account"
          exact
          exact-active-class="bg-gray-200"
          v-if="profile.roles == 'admin'"
          class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <span class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
            <accountSupervisorCircle></accountSupervisorCircle>
          </span>
          <span class="text-gray-700">Kelola Akun</span>
        </router-link>

        <router-link
          to="/transaction"
          exact
          exact-active-class="bg-gray-200"
          class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <span class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
            <cartVariant></cartVariant>
          </span>
          <span class="text-gray-700">Trasaction</span>
        </router-link>
      </div>

      <div class="mb-4 px-4">
        <p class="pl-4 text-sm font-semibold mb-1">Kelola Laporan</p>
        <router-link
          to="/transaction-report"
          exact
          exact-active-class="bg-gray-200"
          class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <span class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
            <clipboardPulse></clipboardPulse>
          </span>
          <span class="text-gray-700">Laporan Transaksi</span>
        </router-link>
        <router-link
          to="/employees-report"
          exact
          exact-active-class="bg-gray-200"
          class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <span class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
            <clipboardList></clipboardList>
          </span>
          <span class="text-gray-700">Laporan Pegawai</span>
        </router-link>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import cartVariant from "vue-material-design-icons/CartVariant";
import viewDashboard from "vue-material-design-icons/ViewDashboard";
import food from "vue-material-design-icons/Food";
import accountSupervisorCircle from "vue-material-design-icons/AccountSupervisorCircle";
import clipboardPulse from "vue-material-design-icons/ClipboardPulse";
import clipboardList from "vue-material-design-icons/ClipboardList";
export default {
  name: "Sidebar",
  components: {
    cartVariant,
    viewDashboard,
    food,
    accountSupervisorCircle,
    clipboardPulse,
    clipboardList,
  },
  computed: {
    ...mapState(["sideBarOpen"]),
    ...mapState("login", ["profile"]),
  },
  data() {
    return {
      menu: [],
    };
  },
};
</script>
