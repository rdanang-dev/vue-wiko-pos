import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    meta: {
      needAuth: true,
    },
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Information" */ "../views/Login.vue"),
  },
  {
    path: "/data-menu",
    name: "DataMenu",
    component: () =>
      import(/* webpackChunkName: "JobVacancies" */ "../views/data-menu.vue"),
  },
  {
    path: "/account",
    name: "Account",
    component: () =>
      import(/* webpackChunkName: "JobVacancies" */ "../views/Account.vue"),
  },
  {
    path: "/transaction",
    name: "Transaction",
    component: () =>
      import(/* webpackChunkName: "JobVacancies" */ "../views/Transaction.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import(/* webpackChunkName: "JobVacancies" */ "../views/Cart.vue"),
  },
  {
    path: "/transaction-report",
    name: "TransactionReport",
    component: () =>
      import(
        /* webpackChunkName: "JobVacancies" */ "../views/transaction-report.vue"
      ),
  },
  {
    path: "/employees-report",
    name: "EmployeesReport",
    component: () =>
      import(
        /* webpackChunkName: "JobVacancies" */ "../views/employees-report.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters["login/isAuthenticated"];

  const requiredAuth = to.matched.some((record) => record.meta.needAuth);
  // console.log("required", requiredAuth);
  // console.log("isAuthenticated", isAuthenticated);
  try {
    if (requiredAuth && !isAuthenticated) {
      console.log("gagal");
      next("/login");
    } else if (requiredAuth && isAuthenticated) {
      console.log("berhasil");
      await store.dispatch("login/getProfile");
      next();
    } else {
      next();
    }
  } catch (error) {
    // console.log(error.message);
    if (error.message == 401) {
      next("/login");
    } else {
      next();
    }
  }
});
export default router;