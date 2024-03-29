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
import MyTheme from "././assets/js/main.js";
import "tailwindcss/tailwind.css";
import "././assets/css/main.css";

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

// Vue.filter("formatTanggal", (value) => {
// let date = value;
// let dateFiltered = date.toLocalDateString("id-ID", options);
// let options = {
//   day: "numeric",
//   month: "short",
//   year: "numeric",
// };
// return dateFiltered;

// var month = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];
// return (
//   value.getDate() + " " + month[value.getMonth()] + ", " + value.getFullYear()
// );
// return value;
// });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
