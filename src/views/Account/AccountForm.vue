<template>
  <dashboard-layouts>
    <div class="flex justify-center p-5  flex-grow h-full">
      <form @submit.prevent="submitForm" class="p-5 bg-white rounded-xl w-full">
        <!-- <div class="flex flex-col">
          <div class="justify-items-center">
            <img
              v-if="userData.image_url"
              :src="userData.image_url"
              class="h-40 w-72 max-w-xs max-h-40"
            />
          </div>
          <div>
            <button
              v-if="!!userData.image_url"
              class="block w-full rounded text-md text-white bg-red-500 px-4 py-1 transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              @click="userData.image_url = null"
            >
              Remove Image
            </button>
          </div>
        </div> -->
        <div class="flex justify-center">
          <img
            v-if="userData.image_url"
            :src="userData.image_url"
            class="h-40 w-72 max-w-xs max-h-40"
          />
        </div>
        <div>
          <label for="">Picture</label>
          <label
            class="w-full flex flex-col items-center px-1 py-1 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-500"
          >
            <svg
              class="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
              />
            </svg>
            <span class="mt-2 text-base leading-normal">
              {{
                selectedImage != null && selectedImage.name
                  ? selectedImage.name
                  : " Select File"
              }}
            </span>
            <input type="file" class="hidden" @change="onFileChange" />
          </label>
          <button
            v-if="!!selectedImage"
            class="block w-full rounded text-md text-white bg-red-500 px-4 py-1 transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="clearImage"
          >
            Remove Image
          </button>
        </div>
        <div>
          <label for="">Nama</label>
          <t-input
            class="w-full pl-3 py-4 rounded-lg text-xs font-semibold leading-none outline-none"
            placeholder="Insert your name"
            v-model="userData.name"
          />
          <span
            class="text-sm text-left text-red-600"
            v-if="errorData.errors && errorData.errors.name"
          >
            {{ errorData.errors.name[0] }}
          </span>
        </div>
        <div class="mt-5">
          <label for="">E-Mail</label>
          <t-input
            class="w-full pl-3 py-4 rounded-lg text-xs font-semibold leading-none outline-none"
            placeholder="blablabla@blabla.com"
            v-model="userData.email"
          />
          <span
            class="text-sm text-left text-red-600"
            v-if="errorData.errors && errorData.errors.email"
          >
            {{ errorData.errors.email[0] }}
          </span>
        </div>
        <div class="mt-5">
          <label for="">Roles</label>
          <t-select
            class="bg-white border-gray-300 focus:border-blue-500 placeholder-gray-300"
            v-model="userData.role_id"
            :options="roleList"
            value-attribute="id"
            text-attribute="name"
          ></t-select>
        </div>
        <div class="mt-5">
          <label for="">Password</label>
          <div class="flex flex-row">
            <input
              v-model="userData.password"
              class="w-full pl-3 py-4 rounded-lg text-xs font-semibold leading-none outline-none"
              :placeholder="
                action == 'create'
                  ? 'insert your password'
                  : 'type for changing password'
              "
              :type="passwordField"
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
          <span
            class="text-sm text-left text-red-600"
            v-if="errorData.errors && errorData.errors.password"
          >
            {{ errorData.errors.password[0] }}
          </span>
        </div>
        <div class="flex justify-end">
          <t-button
            type="submit"
            variant="secondary"
            class="w-full lg:w-1/12 bg-green-400 mt-5"
            >Save</t-button
          >
        </div>
      </form>
    </div>
  </dashboard-layouts>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DashboardLayouts from "../../components/DashboardLayouts.vue";

export default {
  name: "AccountForm",
  components: {
    DashboardLayouts,
  },
  data() {
    return {
      passwordField: "password",
      action: this.$route.params.action,
      id: this.$route.params.id,
      selectedImage: null,
      errors: {},
    };
  },
  computed: {
    ...mapState("user", ["userData", "roleList", "errorData"]),
  },
  mounted() {
    this.fetchData();
    this.clearError();
    console.log(this.selectedImage);
  },
  methods: {
    ...mapActions("user", [
      "resetUser",
      "getUser",
      "createUser",
      "updateUser",
      "getAllRoles",
      "clearError",
    ]),

    onShowPassword() {
      if (this.passwordField === "password") {
        this.passwordField = "text";
      } else {
        this.passwordField = "password";
      }
    },

    clearImage() {
      this.selectedImage = null;
    },

    async submitForm() {
      const formData = new FormData();
      if (this.selectedImage != null) {
        formData.append("image", this.selectedImage);
      }
      for (let key in this.userData) {
        if (this.userData[key]) {
          formData.append(key, this.userData[key]);
        }
      }

      if (this.action == "create") {
        try {
          await this.createUser({ payload: formData });
          this.selectedImage = null;
          this.clearError();
          this.$toast.success("User Created");
          this.$router.push("/account");
        } catch (error) {
          console.log(error);
          this.$toast.error(error.message);
        }
      } else if (this.action == "edit") {
        try {
          await this.updateUser({ id: this.id, payload: formData });
          this.$toast.success("User Updated!");
          this.$router.push("/account");
          this.clearError();
        } catch (error) {
          console.log(error);
          this.$toast.error(error.message);
        }
      }
    },

    async onFileChange(e) {
      this.selectedImage = e.target.files[0];
    },

    fetchData() {
      this.getAllRoles();
      if (this.action == "edit") {
        this.getUser({ id: this.id });
      } else {
        this.resetUser();
      }
    },
  },
};
</script>
