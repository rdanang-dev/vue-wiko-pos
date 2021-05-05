//import vue
import Vue from "vue";
import App from "./App.vue";

// Axios
import axios from "axios";
import VueAxios from "vue-axios";

// store for vuex module
import store from "./store";

// Router
import router from "./router";

// Tailwind
import VueTailwind from "vue-tailwind";
import MyTheme from "./myTheme.js";
import "tailwindcss/tailwind.css";

// Perfect Scrollbar
import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

//import vue toast
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

//import sweet alert
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Idle Vue
import IdleVue from "idle-vue";

const eventsHub = new Vue();

Vue.use(IdleVue, { eventEmitter: eventsHub, store, idleTime: 5000 });

Vue.use(VueToast);

Vue.use(PerfectScrollbar);

Vue.use(VueAxios, axios);

Vue.use(VueTailwind, MyTheme);

Vue.use(VueSweetalert2);

Vue.filter("formatRupiah", (value) => {
  return new Intl.NumberFormat("id-ID").format(value);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
