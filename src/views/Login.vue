<template>
  <div
    class="min-h-screen w-full flex justify-center items-center background-login"
  >
    <!-- Login Box -->
    <div class="bg-gray-50 rounded-lg shadow-2xl">
      <div class="flex flex-col p-5">
        <div class="flex flex-row px-16">
          <img
            class="h-16"
            src="~@/assets/small_logo.png"
            alt="wiko logo"
            width="auto"
          />
          <span class="text-gray-900 font-bold pt-4 pl-2 text-xl"
            >Wisata Kopi Point of Sales</span
          >
        </div>
        <div class="p-8">
          <div class="flex flex-col justify-start mb-4 px-4 rounded">
            <label class="text-gray-900 text-left">Email</label>
            <div class="flex flex-col">
              <input
                class="w-full pl-3 py-4 rounded-lg text-xs placeholder-blueGray-400 leading-none bg-blueGray-50 outline-none"
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
          <div class="flex flex-col px-4 rounded">
            <label class="text-gray-900 text-left">
              Password
            </label>
            <div class="flex flex-row">
              <input
                :type="passwordField"
                class="w-full pl-3 py-4 rounded-lg text-xs leading-none outline-none"
                placeholder="Enter your password"
                v-model="login.password"
                @keyup.enter="onLogin"
              />
              <a class="pl-2 pr-1 py-2" @click="onShowPassword">
                <div v-if="passwordField === 'password'">
                  <lock></lock>
                </div>
                <div v-else>
                  <lockOpenVariant></lockOpenVariant>
                </div>
              </a>
            </div>
            <span
              class="text-sm text-left text-red-600"
              v-if="errorData.errors && errorData.errors.password"
            >
              {{ errorData.errors.password[0] }}
            </span>
            <button
              class="mt-4 block w-full p-4 text-center text-xs text-white font-semibold leading-none bg-green-600 hover:bg-green-500 rounded"
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
  import { mapActions, mapState } from "vuex"
  import lock from "vue-material-design-icons/Lock"
  import lockOpenVariant from "vue-material-design-icons/LockOpenVariant"

  export default {
    name: "Login",
    components: {
      lock,
      lockOpenVariant,
    },
    data() {
      return {
        passwordField: "password",
        user: null,
        login: {
          email: "",
          password: "",
        },
        errors: {},
      }
    },
    computed: {
      ...mapState("login", ["userList", "userData", "errorData"]),
    },
    mounted() {
      this.clearError()
    },
    methods: {
      ...mapActions("login", ["handleLogin", "clearError"]),
      onShowPassword: function() {
        if (this.passwordField === "password") {
          this.passwordField = "text"
        } else {
          this.passwordField = "password"
        }
      },
      async onLogin() {
        try {
          await this.handleLogin({ payload: this.login })
          this.$router.push("/")
          this.clearError()
        } catch (error) {
          console.log(error)
          this.$toast.error(error.message)
        }
      },
    },
  }
</script>

<style scoped>
  .background-login {
    background-image: url("~@/assets/login_background1.png");
    background-position: center center;
    overflow: hidden;
  }
</style>
