<template>
  <dashboard-layouts>
    <div
      class="flex flex-col-reverse lg:flex-row justify-center p-2 flex-grow h-full"
    >
      <div class="w-full lg:w-8/12 pr-2">
        <div class="">
          <div
            class="w-full p-3 bg-white rounded-xl shadow-xl mb-4"
            v-for="(user, key) in userList.data"
            :key="key"
          >
            <div class="flex justify-between">
              <div>
                <img
                  :src="user.image_url"
                  class="w-12 h-12 rounded-full shadow-lg"
                />
                <span>{{ user.name }} - {{ user.roles }}</span>
              </div>
              <div class="flex flex-row py-4">
                <div>
                  <t-button
                    variant="editable"
                    class="mr-2 bg-custom-color3 rounded-md text-black font-medium border"
                    @click="
                      openModalDetails(
                        user.image_url,
                        user.name,
                        user.email,
                        user.created_at,
                        user.id
                      )
                    "
                    >Details</t-button
                  >
                </div>
                <div>
                  <t-button
                    :to="{
                      name: 'AccountEdit',
                      params: { action: 'edit', id: user.id },
                    }"
                    variant="editable"
                    class="mr-2 bg-custom-color2 rounded-md text-black font-medium border"
                    >Edit</t-button
                  >
                </div>
                <div>
                  <t-button
                    variant=" "
                    class="mr-2 bg-red-500 rounded-md text-black font-medium"
                    @click="confirmDelete(user.name, user.id)"
                    >Delete</t-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-4/12 pb-2 lg:pb-0">
        <div class="flex flex-col p-3 sticky bg-white rounded-xl">
          <div>
            <t-button
              :to="{
                name: 'AccountCreate',
                params: { action: 'create' },
              }"
              variant="editable"
              class="bg-custom-color2 rounded-md text-black font-medium w-full"
              >Create new user</t-button
            >
          </div>

          <div class="flex py-1">
            <div class="relative flex w-full flex-wrap items-stretch pr-1">
              <t-input
                v-model="filter"
                @keyup.enter="onSearch"
                placeholder="Search by name"
              />
              <span
                v-if="!!filter"
                @click="clearSearch"
                class="text-center absolute bg-transparent text-base items-center justify-center right-0 pr-2 py-2 text-gray-400"
              >
                <close-thick></close-thick>
              </span>
            </div>

            <div class="pr-1">
              <button
                @click="onSearch"
                class="py-2 px-3 bg-blue-500 rounded-md text-white focus:shadow-outline-none focus:shadow-xl"
              >
                <magnify></magnify>
              </button>
            </div>
          </div>
          <div>
            <span>Privileges :</span>
            <t-radio-group
              name="example"
              :options="['All', 'Admin', 'Kasir']"
              v-model="privileges"
              @change="changepriv"
            ></t-radio-group>
          </div>
        </div>
      </div>
    </div>

    <t-modal v-model="modalDetails">
      <div>
        <img
          :src="userDetails.image"
          class="w-40 h-40 rounded-full shadow-lg m-auto"
        />
      </div>
      <div class="mt-5 text-center flex flex-col">
        <span>{{ userDetails.name }}</span>
        <span>{{ userDetails.email }}</span>
        <span>Joined Since : {{ userDetails.createdat }}</span>
      </div>
    </t-modal>
  </dashboard-layouts>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DashboardLayouts from "../../components/DashboardLayouts.vue";
import CloseThick from "vue-material-design-icons/CloseThick";
import Magnify from "vue-material-design-icons/Magnify";
export default {
  components: { DashboardLayouts, CloseThick, Magnify },
  name: "Account",
  data() {
    return {
      filter: "",
      privileges: "All",
      modalDetails: false,
      userDetails: {
        id: "",
        name: "",
        email: "",
        createdat: "",
        image: null,
      },
    };
  },
  computed: {
    ...mapState("user", ["userList", "userData"]),
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    userList(newVal) {
      if (newVal.data.length == 0) {
        this.$toast.error("User not Found!", {
          duration: 500,
        });
      }
    },
  },
  methods: {
    ...mapActions("user", ["getAllUserList", "deleteUser"]),

    openModalDetails(image, name, email, createdat, id) {
      this.modalDetails = true;
      this.userDetails.id = id;
      this.userDetails.name = name;
      this.userDetails.email = email;
      this.userDetails.createdat = createdat;
      this.userDetails.image = image;
    },

    onSearch() {
      this.getAllUserList({
        filter: this.filter,
        privileges: this.privileges,
      });
    },

    changepriv() {
      this.fetchData();
    },

    clearSearch() {
      this.filter = "";
      this.privileges = "All";
      this.onSearch();
    },

    confirmDelete(name, id) {
      try {
        this.$swal({
          title: "Are you sure?",
          text:
            name +
            " " +
            "will be Deleted, And you won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "rgba(52,211,153,1)",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await this.deleteUser({ id: id });
              this.fetchData();
              this.$swal("Deleted!", "user has been deleted.", "success");
            } catch (error) {
              console.log(error);
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    fetchData() {
      this.getAllUserList({
        filter: this.filter,
        privileges: this.privileges,
      });
    },
  },
};
</script>
