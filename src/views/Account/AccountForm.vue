<template>
  <dashboard-layouts>
    <div class="flex justify-center p-5  flex-grow h-full">
      <form @submit.prevent="submitForm" class="p-5 bg-white rounded-xl w-full">
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
          <span
            class="text-sm text-left text-red-600"
            v-if="errorData.errors && errorData.errors.image"
          >
            {{ errorData.errors.image[0] }}
          </span>
        </div>
        <div class="pt-5">
          <label for="">Name</label>
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
        <div class="pt-5">
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
        <div class="pt-5">
          <label for="">Roles</label>
          <t-select
            class="bg-white border-gray-300 focus:border-blue-500 placeholder-gray-300"
            v-model="userData.role_id"
            :options="action == 'create' ? createRoleList : roleList"
            value-attribute="id"
            text-attribute="name"
            placeholder="Select Role"
          ></t-select>
          <span
            class="text-sm text-left text-red-600"
            v-if="errorData.errors && errorData.errors.role_id"
          >
            {{ errorData.errors.role_id[0] }}
          </span>
        </div>
        <div class="pt-5">
          <label for="">Password</label>
          <div class="flex flex-row">
            <t-input
              v-model="userData.password"
              :placeholder="
                action == 'create'
                  ? 'insert your password'
                  : 'type for changing password'
              "
              :type="passwordField"
            />

            <a
              class="px-2 py-2 focus:shadow focus:bg-white border-black"
              @click="onShowPassword"
            >
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
import lock from "vue-material-design-icons/Lock";
import lockOpenVariant from "vue-material-design-icons/LockOpenVariant";

export default {
  name: "AccountForm",
  components: {
    DashboardLayouts,
    lock,
    lockOpenVariant,
  },
  data() {
    return {
      passwordField: "password",
      action: this.$route.params.action,
      id: this.$route.params.id,
      selectedImage: null,
      errors: {},
      createRoleList: [
        { id: 1, name: "admin" },
        { id: 2, name: "kasir" },
      ],
    };
  },
  computed: {
    ...mapState("user", ["userData", "roleList", "errorData"]),
  },
  mounted() {
    this.fetchData();
    this.clearError();
    // console.log(this.selectedImage);
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
