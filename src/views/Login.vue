<template>
  <div class="min-h-screen h-full w-full background-login bg-gray-400">
    <div class="py-32 container px-4 mx-auto">
      <div
        class="flex bg-gray-50 rounded-lg max-w-md mx-auto flex-col text-center shadow-2xl"
      >
        <div class="mt-5 font-bold flex flex-row">
          <img
            class="ml-5 mr-1 h-14"
            src="~@/assets/small_logo.png"
            alt=""
            width="auto"
          />
          <span class="text-gray-900 text-md mt-4"
            >Wisata Kopi Point of Sales</span
          >
        </div>
        <div class="p-8">
          <div class="flex flex-col justify-start mb-4 px-4 rounded">
            <label class="text-gray-900 text-left">Email</label>
            <div class="flex flex-col">
              <input
                class="w-full pl-3 py-4 rounded-lg text-xs placeholder-blueGray-400 font-semibold leading-none bg-blueGray-50 outline-none"
                type="email"
                placeholder="name@email.com"
                v-model="login.email"
              />
            </div>
            <span
              class="text-sm text-left text-red-600"
              v-if="errorData.errors && errorData.errors.email"
            >
              {{ errorData.errors.email[0] }}
            </span>
          </div>
          <div class="flex flex-col mb-6 px-4 rounded">
            <label class="text-gray-900 text-left">
              Password
            </label>
            <div class="flex flex-row">
              <input
                type="password"
                class="w-full pl-3 py-4 rounded-lg text-xs font-semibold leading-none outline-none"
                placeholder="Enter your password"
                v-model="login.password"
              />
            </div>
            <span
              class="text-sm text-left text-red-600"
              v-if="errorData.errors && errorData.errors.password"
            >
              {{ errorData.errors.password[0] }}
            </span>
            <button
              class="mt-3 block w-full p-4 text-center text-xs text-white font-semibold leading-none bg-green-600 hover:bg-green-500 rounded"
              @click="onLogin"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      user: null,
      login: {
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  computed: {
    ...mapState("login", ["userList", "userData", "errorData"]),
  },
  methods: {
    ...mapActions("login", [
      "handleLogin",
      // "handleUser"
    ]),
    async onLogin() {
      try {
        const response = await this.handleLogin({ payload: this.login });
        console.log("berhasil", response);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

<style scoped>
/* .background-login {
  background-image: url("~@/assets/login_background1.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
} */
</style>
