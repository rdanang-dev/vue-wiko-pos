<template>
  <dashboard-layouts>
    <div class="flex justify-center p-5  flex-grow h-full">
      <form @submit.prevent="submitForm" class="p-5 bg-white rounded-xl w-full">
        <div>
          <label for="">Nama</label>
          <t-input v-model="userData.name" />
        </div>
        <div class="mt-5">
          <label for="">E-Mail</label>
          <t-input v-model="userData.email" />
        </div>
        <div class="mt-5">
          <label for="">Password</label>
          <t-input
            v-model="userData.password"
            :placeholder="
              action == 'create'
                ? 'insert your password'
                : 'type for changing password'
            "
          />
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
      action: this.$route.params.action,
      id: this.$route.params.id,
    };
  },
  computed: {
    ...mapState("user", ["userData"]),
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions("user", ["resetUser", "getUser", "createUser", "updateUser"]),

    submitForm() {
      try {
        if (this.action == "create") {
          this.createUser({ payload: this.userData });
          this.$toast.success("User Created");
        } else {
          this.updateUser({ id: this.id, payload: this.userData });
          this.$toast.success("User Updated");
        }
      } catch (error) {
        this.$toast.error("error");
      }
    },

    fetchData() {
      if (this.action == "edit") {
        this.getUser({ id: this.id });
      } else {
        this.resetUser();
      }
    },
  },
};
</script>
