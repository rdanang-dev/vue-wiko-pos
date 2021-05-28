<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->
  <div
    class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-white border-r z-30"
    :class="sideBarOpen ? '' : 'hidden'"
    id="main-nav"
  >
    <div class="w-full h-16 border-b flex px-3 items-center">
      <img class="object-cover max-h-20" src="~@/assets/logo.png" />
    </div>

    <perfect-scrollbar>
      <div class="pt-4">
        <p class="px-4 text-sm font-semibold">MAIN</p>
        <router-link
          to="/"
          exact
          exact-active-class="bg-gray-200"
          class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 cursor-pointer"
        >
          <viewDashboard></viewDashboard>
          <span class="text-gray-700 pl-2">Dashboard</span>
        </router-link>

        <router-link
          to="/account"
          exact
          exact-active-class="bg-gray-200"
          v-if="profile.roles == 'admin'"
          class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 cursor-pointer"
        >
          <accountSupervisorCircle></accountSupervisorCircle>
          <span class="text-gray-700 pl-2">Kelola Akun</span>
        </router-link>

        <router-link
          to="/transaction"
          exact
          exact-active-class="bg-gray-200"
          class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 cursor-pointer"
        >
          <cartVariant></cartVariant>

          <span class="text-gray-700 pl-2">Trasaction</span>
        </router-link>

        <div>
          <p class="px-4 text-sm font-semibold">Kelola Menu</p>
          <router-link
            to="/menu"
            exact
            exact-active-class="bg-gray-200"
            class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 cursor-pointer"
          >
            <food></food>
            <span class="text-gray-700 pl-2">Kelola Menu</span>
          </router-link>

          <router-link
            to="/category"
            exact
            exact-active-class="bg-gray-200"
            class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 cursor-pointer"
          >
            <ballot></ballot>
            <span class="text-gray-700 pl-2">Kelola Kategori</span>
          </router-link>
        </div>

        <div>
          <p class="px-4 text-sm font-semibold">Kelola Laporan</p>
          <router-link
            to="/transaction-report"
            exact
            exact-active-class="bg-gray-200"
            class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 cursor-pointer"
          >
            <clipboardPulse></clipboardPulse>
            <span class="text-gray-700 pl-2">Laporan Transaksi</span>
          </router-link>
          <router-link
            to="/employees-report"
            exact
            exact-active-class="bg-gray-200"
            class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 cursor-pointer"
          >
            <clipboardList></clipboardList>
            <span class="text-gray-700 pl-2">Laporan Pegawai</span>
          </router-link>
        </div>
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
import ballot from "vue-material-design-icons/Ballot";
export default {
  name: "Sidebar",
  components: {
    cartVariant,
    viewDashboard,
    food,
    accountSupervisorCircle,
    clipboardPulse,
    clipboardList,
    ballot,
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
