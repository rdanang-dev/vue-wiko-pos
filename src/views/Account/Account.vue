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
                    variant="secondary"
                    class="mr-2 bg-blue-300 rounded-md"
                    @click="openModalDetails(user.id)"
                    >Details</t-button
                  >
                </div>
                <div>
                  <t-button
                    :to="{
                      name: 'AccountEdit',
                      params: { action: 'edit', id: user.id },
                    }"
                    variant="success"
                    class="mr-2 bg-green-400 rounded-md text-white"
                    >Edit</t-button
                  >
                </div>
                <div>
                  <t-button
                    variant="error"
                    class="mr-2 bg-red-700 rounded-md text-white"
                    @click="openDeleteModal(user.id)"
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
              variant="secondary"
              class="bg-green-400 rounded-md w-full"
              >Create new user</t-button
            >
          </div>

          <div class="flex py-1">
            <div class="relative flex w-full flex-wrap items-stretch pr-1">
              <t-input
                v-model="filter"
                @change="onSearch"
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

    <t-modal v-model="modalDetails" header="Details">
      <div>
        <img
          :src="userData.image_url"
          class="w-40 h-40 rounded-full shadow-lg m-auto"
        />
      </div>
      <div class="mt-5">
        <p>Nama : {{ userData.name }}</p>
        <p>Email : {{ userData.email }}</p>
      </div>
    </t-modal>

    <t-modal v-model="deleteModal" header="Delete">
      The data you have been deleted wont be revert.
      <template v-slot:footer>
        <div class="flex justify-between">
          <t-button @click="closeDeleteModal" type="button">
            Cancel
          </t-button>
          <t-button @click="onDeleteUser" type="button">
            Ok
          </t-button>
        </div>
      </template>
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
      deleteModal: false,
      selectedId: null,
    };
  },
  computed: {
    ...mapState("user", ["userList", "userData"]),
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions("user", [
      "getAllUserList",
      "getUser",
      // "createMenu",
      "deleteUser",
    ]),
    openModalDetails(id) {
      this.selectedId = id;
      this.modalDetails = true;
      this.getUser({ id });
    },

    openDeleteModal(id) {
      this.deleteModal = true;
      this.selectedId = id;
    },

    closeDeleteModal() {
      this.deleteModal = false;
    },

    async onDeleteUser() {
      try {
        await this.deleteUser({ id: this.selectedId });
        this.fetchData();
        this.closeDeleteModal();
        this.$toast.success("Data Delete Successfully", { duration: 3000 });
      } catch (error) {
        console.log(error);
      }
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

    fetchData() {
      this.getAllUserList({
        filter: this.filter,
        privileges: this.privileges,
      });
    },
  },
};
</script>
