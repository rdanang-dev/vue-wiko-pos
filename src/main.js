import Vue from 'vue'
import App from './App.vue'
// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// Router
import router from './router'
// Tailwind
import "tailwindcss/tailwind.css";
import MyTheme from './myTheme.js'
import VueTailwind from 'vue-tailwind';
// Perfect Scrollbar
import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

Vue.use(PerfectScrollbar);

Vue.use(VueTailwind, MyTheme);

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
