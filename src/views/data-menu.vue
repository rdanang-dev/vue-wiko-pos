<template>
  <dashboard-layouts>
    <div class="flex justify-center p-5  flex-grow h-full">
      <div class="p-5 bg-white rounded-xl w-full">
        <div class="text-2xl text-black mt-5 mx-5 font-bold text-center">
          Data Menu
        </div>
        <hr class="mt-5 border-black" />
        <div class="flex justify-between mt-5">
          <div class="w-full mr-5">
            <t-input v-model="search" placeholder="Search" />
          </div>

          <button
            @click="openFormModal()"
            class="py-2 px-3 bg-blue-500 rounded-md text-white focus:shadow-outline-none focus:shadow-xl"
          >
            <icon-plus></icon-plus>
          </button>
        </div>
        <div class="text-black mt-10 mx-5 overflow-x-auto">
          <t-table :headers="headers" :data="menuList.data">
            <template slot="row" slot-scope="props">
              <tr
                :class="[
                  props.trClass,
                  // props.rowIndex % 2 === 0 ? 'bg-gray-100' : ''
                ]"
              >
                <td :class="props.tdClass">
                  {{ props.row.id }}
                </td>
                <td :class="props.tdClass">
                  {{ props.row.name }}
                </td>
                <td :class="props.tdClass">
                  {{ props.row.price }}
                </td>
                <td :class="props.tdClass" class="flex flex-row">
                  <t-button
                    variant="secondary"
                    class="mr-2 bg-green-400"
                    @click="openFormModal(props.row.id)"
                    >Edit</t-button
                  >
                  <t-button
                    variant="secondary"
                    class="bg-red-400"
                    @click="openDeleteModal(props.row.id)"
                    >Delete</t-button
                  >
                </td>
              </tr>
            </template>
          </t-table>

          <t-modal v-model="formModal" header="Manage Menu">
            <div>
              <img :src="menuData.image_url" class="object-fit" />
            </div>
            <div>
              <label for="">Nama</label>
              <t-input v-model="menuData.name" />
            </div>
            <div>
              <label for="">Harga</label>
              <t-input v-model="menuData.price" />
            </div>

            <template v-slot:footer>
              <div class="flex justify-between">
                <t-button @click="closeFormModal" type="button">
                  Cancel
                </t-button>
                <t-button @click="submitMenu" type="button">
                  Save
                </t-button>
              </div>
            </template>
          </t-modal>

          <t-modal v-model="deleteModal" header="Delete">
            The data you have been deleted wont be revert.
            <template v-slot:footer>
              <div class="flex justify-between">
                <t-button @click="closeDeleteModal" type="button">
                  Cancel
                </t-button>
                <t-button @click="onDeleteMenu" type="button">
                  Ok
                </t-button>
              </div>
            </template>
          </t-modal>
        </div>
      </div>
    </div>
  </dashboard-layouts>
</template>

<script>
import DashboardLayouts from "../components/DashboardLayouts.vue";
import { mapActions, mapState } from "vuex";
import IconPlus from "vue-material-design-icons/Plus";
export default {
  components: { DashboardLayouts, IconPlus },
  name: "Menu",
  data() {
    return {
      search: "",
      formModal: false,
      deleteModal: false,
      selectedId: null,
      selectedAction: "create",
      headers: [
        {
          value: "id",
          text: "ID",
        },
        {
          value: "name",
          text: "Nama",
        },
        {
          value: "price",
          text: "Harga",
        },
        {
          value: "actions",
          text: "Actions",
        },
      ],
    };
  },
  computed: {
    ...mapState("menu", ["menuList", "menuData"]),
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions("menu", [
      "getAllMenuList",
      "getMenu",
      "updateMenu",
      "createMenu",
      "deleteMenu",
    ]),

    openFormModal(id = null) {
      // console.log(id);
      this.formModal = true;

      if (id != null) {
        this.selectedId = id;
        this.selectedAction = "edit";
        this.getMenu({ id });
      } else {
        this.selectedId = null;
        this.selectedAction = "create";
      }
    },

    closeFormModal() {
      this.formModal = false;
    },

    openDeleteModal(id) {
      this.deleteModal = true;
      this.selectedId = id;
    },

    closeDeleteModal() {
      this.deleteModal = false;
    },

    async onDeleteMenu() {
      try {
        await this.deleteMenu({ id: this.selectedId });
        this.fetchData();
        this.closeDeleteModal();
        this.$toast.success("Data Delete Successfully", { duration: 3000 });
      } catch (error) {
        console.log(error);
      }
    },

    async submitMenu() {
      try {
        console.log(this.selectedAction);
        if (this.selectedAction == "create") {
          await this.createMenu({ payload: this.menuData });
        } else if (this.selectedAction == "edit") {
          await this.updateMenu({
            id: this.selectedId,
            payload: this.menuData,
          });
          console.log(this.$toast);

          this.closeFormModal();
        }
        this.fetchData();
        this.$toast.success("Data Saved Successfully", { duration: 3000 });
      } catch (error) {
        console.log(error);
      }
    },

    fetchData() {
      this.getAllMenuList();
    },
  },
};
</script>
