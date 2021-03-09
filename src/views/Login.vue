<template>
  <div class="h-full w-full">
    <!-- <img src="" /> -->
    <section class="py-12 h-full background-login">
      <div class="container mt-10 px-4 mx-auto">
        <div
          class="flex bg-white rounded-lg max-w-md mx-auto flex-col text-center"
        >
          <span class="mt-5 text-lg font-bold">Wisata Kopi</span>
          <a class="mx-48 mt-3"
            ><img class="h-16" src="~@/assets/logos.png" alt="" width="auto"
          /></a>
          <div class=" mb-8 p-8 ">
            <!-- <span class="text-sm text-blueGray-400">Sign In</span> -->
            <!-- <h4 class="mb-6 text-3xl">Join our community</h4> -->
            <div
              class="flex flex-col justify-start mb-4 px-4 bg-blueGray-50 rounded"
            >
              <label class="text-left">Email</label>
              <div class="flex flex-row">
                <input
                  class="w-full pl-3 py-4 rounded-lg text-xs placeholder-blueGray-400 font-semibold leading-none bg-blueGray-50 outline-none"
                  type="email"
                  placeholder="name@email.com"
                  v-model="login.email"
                />
              </div>
              <p class="text-sm text-red-600" v-text="errors.email"></p>
            </div>
            <div class="flex flex-col mb-6 px-4 bg-blueGray-50 rounded">
              <label class="text-left">
                Password
              </label>
              <div class="flex flex-row">
                <input
                  class="w-full pl-3 py-4 rounded-lg text-xs placeholder-blueGray-400 font-semibold leading-none bg-blueGray-50 outline-none"
                  placeholder="Enter your password"
                  v-model="login.password"
                />
                <p class="text-sm text-red-600" v-text="errors.password"></p>
              </div>
            </div>
            <button
              class="mb-5 block w-full p-4 text-center text-xs text-white font-semibold leading-none bg-blue-600 hover:bg-blue-700 rounded"
              @click="onLogin"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </section>
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
    ...mapState("login", ["userList", "userData"]),
  },
  methods: {
    ...mapActions("login", [
      "handleLogin",
      // "handleUser"
    ]),
    async onLogin() {
      await this.handleLogin({ payload: this.login });
      await this.$router.push("/");
    },
  },
};
</script>
<style></style>
