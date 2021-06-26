<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap">
      <Sidebar />

      <div
        class="w-full bg-custom-color pl-0 lg:pl-64 min-h-screen"
        :class="sideBarOpen ? 'overlay' : ''"
        id="main-content"
      >
        <Navbar />

        <div class="p-4 bg-custom-color min-h-full" id="main-layouts">
          <perfect-scrollbar>
            <slot />
          </perfect-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default {
  name: "Dashboard",
  computed: {
    ...mapState(["sideBarOpen"]),
  },
  components: {
    Sidebar,
    Navbar,
  },
};
</script>

<style>
/* .color {
  background-color: #c6beab;
  background-color: #c98860;
} */
/* .color1 {
  background-color: #c08552;
} */
/* .color2 {
  background-color: #94d2bd;
}
.color3 {
  background-color: #ee9b00;
} */
</style>
