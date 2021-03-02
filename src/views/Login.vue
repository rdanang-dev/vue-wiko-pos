<template>
  <div class="h-full w-full">
    <!-- <img src="" /> -->
    <section class="py-12 h-full background-login">
      <div class="container mt-10 px-4 mx-auto">
        <div
          class="flex bg-white rounded-lg max-w-md mx-auto flex-col text-center"
        >
          <span class="mt-5 text-lg font-bold">REKRUTMENT DOSEN</span>
          <a class="mx-48 mt-3"
            ><img
              class="h-16"
              src="https://irenkartika.files.wordpress.com/2014/12/logo-bulat-upj.png"
              alt=""
              width="auto"
          /></a>
          <div class=" mb-8 p-8 ">
            <span class="text-sm text-blueGray-400">Sign In</span>
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
                />
                <svg
                  class="h-6 w-6 ml-4 my-auto text-blueGray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewbox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="flex flex-col mb-6 px-4 bg-blueGray-50 rounded">
              <label class="text-left">
                Password
              </label>
              <div class="flex flex-row">
                <input
                  class="w-full pl-3 py-4 rounded-lg text-xs placeholder-blueGray-400 font-semibold leading-none bg-blueGray-50 outline-none"
                  :type="passwordField"
                  placeholder="Enter your password"
                />
                <button
                  class="ml-4 focus:shadow focus:bg-white focus:border-none focus:outline-none"
                  @click="onShowPassword"
                >
                  <svg
                    class="h-6 w-6 my-auto text-blueGray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewbox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <button
              class="mb-5 block w-full p-4 text-center text-xs text-white font-semibold leading-none bg-blue-600 hover:bg-blue-700 rounded"
              @click="onLogin"
            >
              Sign In
            </button>
            <hr />
            <router-link
              to="/register"
              class="mt-5 block text-center w-full focus:outline-none"
            >
              Don't have an Account ?
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      passwordField: "password"
    };
  },
  methods: {
    onShowPassword: function() {
      if (this.passwordField === "password") {
        this.passwordField = "text";
      } else {
        this.passwordField = "password";
      }
    },
    onLogin: function() {
      this.$router.push("/");
    }
  }
};
</script>
<style>
.background-login {
  background-image: url("https://th.bing.com/th/id/R7eacd3594a4ff3ebd5326029bccc9ba1?rik=Z%2fNH3Ps6j%2f9DFA&riu=http%3a%2f%2fupj.ac.id%2fupload%2fmodule%2fgallery3%2fgallery68.jpg&ehk=yPhVP1qMo3pAWbmzb6n4hwFBJ9wIFopCN%2bQ9lM6QnH4%3d&risl=&pid=ImgRaw");
  background-position: center center;
}
</style>
