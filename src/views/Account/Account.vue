<template>
  <dashboard-layouts>
    <div
      class="flex flex-col-reverse lg:flex-row justify-center p-3  flex-grow h-full "
    >
      <div class="w-full lg:w-8/12 mr-4">
        <div
          class="w-full p-5 bg-white rounded-xl mb-5 shadow-xl"
          v-for="(user, key) in userList"
          :key="key"
        >
          <div class="flex justify-between">
            <div>
              <img
                src="https://a7sas.net/wp-content/uploads/2019/07/4060.jpeg"
                class="w-12 h-12 rounded-full shadow-lg"
              />
              {{ user.name }}
            </div>
            <div class="flex flex-row">
              <t-button
                variant="secondary"
                class="mr-2 bg-blue-300 rounded-md py-2"
                @click="openModalDetails(user.id)"
                >Details</t-button
              >
              <t-button
                :to="{
                  name: 'AccountEdit',
                  params: { action: 'edit', id: user.id },
                }"
                variant="success"
                class="mr-2 bg-green-400 rounded-md text-white"
                >Edit</t-button
              >
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
      <div
        class="w-full lg:w-4/12 sticky p-5 mb-5 bg-white rounded-xl"
        style="max-height:300px;"
      >
        <t-button
          :to="{
            name: 'AccountCreate',
            params: { action: 'create' },
          }"
          variant="secondary"
          class="mr-2 bg-green-400 rounded-md w-full mb-3"
          >Create new user</t-button
        >
        <t-input v-model="search" placeholder="Search" />
      </div>
    </div>

    <t-modal v-model="modalDetails" header="Details">
      <div>
        <img
          src="https://a7sas.net/wp-content/uploads/2019/07/4060.jpeg"
          class="w-40 h-40 rounded-full shadow-lg"
        />
      </div>
      <div>
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
import DashboardLayouts from "../../components/DashboardLayouts.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: { DashboardLayouts },
  name: "Account",
  data() {
    return {
      search:"",
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
      // "updateMenu",
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

    fetchData() {
      this.getAllUserList();
    },
  },
};
</script>
