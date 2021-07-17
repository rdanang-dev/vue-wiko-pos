<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->
  <div
    class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-custom-color4 noborder z-30 rounded-tr-3xl"
    :class="sideBarOpen ? '' : 'hidden'"
    id="main-nav"
  >
    <div class="w-full h-14 lg:h-16 noborder flex px-4 items-center">
      <img class="object-cover max-h-20" src="~@/assets/logo.png" />
    </div>

    <perfect-scrollbar>
      <!-- xs:hidden xs:invisible sm:hidden sm:invisible md:hidden md:invisible  -->
      <div
        class="visible flex lg:visible lg:flex xs:hidden xs:invisible sm:hidden sm:invisible md:hidden md:invisible justify-center pt-3"
      >
        <div class="flex flex-col">
          <img
            :src="profile.image_url"
            class="max-h-28 rounded-full shadow-lg"
          />
          <div class="flex flex-col mx-auto pt-2">
            <div class="flex flex-row">
              <span class="text-md pr-1">{{ profile.name }}</span>
              <span>|</span>
              <span class="text-md pl-1">{{ profile.roles }}</span>
            </div>
            <a
              href="#"
              class="mx-auto text-sm text-red-600 hover:text-red-400"
              @click="onLogout"
              >Logout</a
            >
          </div>
        </div>
      </div>

      <p class="pt-3 px-4 text-sm font-semibold">MAIN</p>
      <router-link
        to="/"
        exact
        exact-active-class="bg-custom-color font-medium text-white"
        class="w-full flex items-center rounded-l-3xl h-10 pl-4 hover:bg-custom-color cursor-pointer"
      >
        <div class="text-custom-color5">
          <viewDashboard></viewDashboard>
        </div>
        <span class="pl-2">Dashboard</span>
      </router-link>

      <div v-if="profile.roles == 'admin'">
        <router-link
          to="/account"
          exact
          exact-active-class="bg-custom-color font-medium text-white"
          class="w-full flex items-center rounded-l-3xl h-10 pl-4 hover:bg-custom-color cursor-pointer"
        >
          <div class="text-custom-color5">
            <accountSupervisorCircle></accountSupervisorCircle>
          </div>
          <span class="pl-2">Manage Users</span>
        </router-link>
      </div>

      <router-link
        to="/transaction"
        exact
        exact-active-class="bg-custom-color font-medium text-white"
        class="w-full flex items-center rounded-l-3xl h-10 pl-4 hover:bg-custom-color cursor-pointer"
      >
        <div class="text-custom-color5">
          <cartVariant></cartVariant>
        </div>
        <span class="pl-2">Trasaction</span>
        <div v-if="unfinish">
          <div class="ml-2 h-6 px-3 rounded-full bg-red-500 text-black">
            {{ unfinish }}
          </div>
        </div>
      </router-link>

      <div>
        <p class="px-4 text-sm font-semibold">Products</p>
        <router-link
          to="/menu"
          exact
          exact-active-class="bg-custom-color font-medium text-white"
          class="w-full flex items-center rounded-l-3xl h-10 pl-4 hover:bg-custom-color cursor-pointer"
        >
          <div class="text-custom-color5">
            <food></food>
          </div>
          <span class="pl-2">Manage Menus</span>
        </router-link>

        <router-link
          to="/category"
          exact
          exact-active-class="bg-custom-color font-medium text-white"
          class="w-full flex items-center rounded-l-3xl h-10 pl-4 hover:bg-custom-color cursor-pointer"
        >
          <div class="text-custom-color5">
            <ballot></ballot>
          </div>
          <span class="pl-2">Manage Categories</span>
        </router-link>
      </div>

      <div>
        <p class="px-4 text-sm font-semibold">Report</p>
        <router-link
          to="/transaction-report"
          exact
          exact-active-class="bg-custom-color font-medium text-white"
          class="w-full flex items-center rounded-l-3xl h-10 pl-4 hover:bg-custom-color cursor-pointer"
        >
          <div class="text-custom-color5">
            <clipboardPulse></clipboardPulse>
          </div>
          <span class="pl-2">Manage Report</span>
        </router-link>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import cartVariant from "vue-material-design-icons/CartVariant";
import viewDashboard from "vue-material-design-icons/ViewDashboard";
import food from "vue-material-design-icons/Food";
import accountSupervisorCircle from "vue-material-design-icons/AccountSupervisorCircle";
import clipboardPulse from "vue-material-design-icons/ClipboardPulse";
import ballot from "vue-material-design-icons/Ballot";
export default {
  name: "Sidebar",
  components: {
    cartVariant,
    viewDashboard,
    food,
    accountSupervisorCircle,
    clipboardPulse,
    ballot,
  },
  computed: {
    ...mapState(["sideBarOpen"]),
    ...mapState("login", ["profile"]),
    ...mapState("order", ["orderList"]),
    count() {
      return this.orderList.data.length;
    },
  },
  data() {
    return {
      menu: [],
      unfinish: 0,
    };
  },
  async mounted() {
    await this.getAllOrderList({
      status: 1,
    });
    this.unfinish = this.orderList.data.length;
  },
  watch: {
    count(newVal) {
      this.unfinish = newVal;
    },
  },
  methods: {
    ...mapActions("login", ["handleLogOut"]),
    ...mapActions("order", ["getAllOrderList"]),
    toggleSidebar() {
      this.$store.dispatch("toggleSidebar");
    },
    async onLogout() {
      await this.handleLogOut();
      await this.$router.push("/login");
    },
  },
};
</script>
