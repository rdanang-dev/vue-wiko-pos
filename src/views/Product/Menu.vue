<template>
  <dashboard-layouts>
    <div class="flex justify-center flex-grow h-full">
      <div class="pt-1 px-5 pb-5 bg-white rounded-xl w-full">
        <div class="text-2xl text-black mt-5 font-bold text-center">
          Product Lists
        </div>

        <div class="flex py-1">
          <div class="relative flex w-full flex-wrap items-stretch pr-1">
            <t-input
              v-model="filter"
              @keyup.enter="onSearch"
              placeholder="Search Here"
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

          <div class="pr-1">
            <button
              @click="openFormModal()"
              class="py-2 px-3 bg-blue-500 rounded-md text-white focus:shadow-outline-none focus:shadow-xl"
            >
              <icon-plus></icon-plus>
            </button>
          </div>

          <select
            class="transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            v-model.number="perPage"
          >
            <option value="7">7</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>

        <div class="text-black overflow-x-auto py-1">
          <t-table :headers="headers" :data="menuList.data">
            <template slot="row" slot-scope="props">
              <tr :class="[props.trClass]">
                <td :class="props.tdClass">
                  {{ props.row.name }}
                </td>
                <td :class="props.tdClass">
                  Rp.{{ props.row.price | formatRupiah }},-
                </td>
                <td :class="props.tdClass" class="flex flex-row">
                  <t-button
                    variant="editable"
                    class="mr-2 bg-custom-color2 font-medium"
                    @click="openFormModal(props.row.id)"
                    >Edit</t-button
                  >
                  <t-button
                    variant="editable"
                    class="bg-red-500 font-medium"
                    @click="confirmDelete(props.row.name, props.row.id)"
                    >Delete</t-button
                  >
                </td>
              </tr>
            </template>
          </t-table>

          <t-pagination
            class="mt-2"
            :total-items="menuList.meta.total ? menuList.meta.total : 1"
            :per-page="perPage"
            :hideEllipsis="true"
            v-model="currentPage"
          />

          <t-modal v-model="formModal">
            <template v-slot:header>
              {{ selectedAction == "create" ? "Create Menu" : "Edit Menu" }}
            </template>
            <div class="flex justify-center">
              <img
                v-if="menuData.image_url"
                :src="menuData.image_url"
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
                <span class="mt-2 text-base leading-normal">{{
                  selectedImage != null && selectedImage.name
                    ? selectedImage.name
                    : "Select File"
                }}</span>
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
            <div>
              <label for="">Category</label>
              <t-select
                v-model="menuData.category_id"
                :options="allCategory"
                textAttribute="name"
                valueAttribute="id"
              />
              <span
                class="text-sm text-left text-red-600"
                v-if="errorData.errors && errorData.errors.category_id"
              >
                {{ errorData.errors.category_id[0] }}
              </span>
            </div>
            <div>
              <label for="">Name</label>
              <t-input v-model="menuData.name" placeholder="Insert Menu Name" />
              <span
                class="text-sm text-left text-red-600"
                v-if="errorData.errors && errorData.errors.name"
              >
                {{ errorData.errors.name[0] }}
              </span>
            </div>
            <div>
              <label for="">Price</label>
              <t-input v-model="menuData.price" placeholder="Insert Price" />
              <span
                class="text-sm text-left text-red-600"
                v-if="errorData.errors && errorData.errors.price"
              >
                {{ errorData.errors.price[0] }}
              </span>
            </div>

            <template v-slot:footer>
              <div class="flex justify-between">
                <t-button
                  variant="editable"
                  class="bg-red-500"
                  @click="closeFormModal"
                  type="button"
                >
                  Cancel
                </t-button>
                <t-button
                  @click="submitMenu"
                  variant="editable"
                  class="bg-custom-color2"
                  :disabled="!!selectedImage && selectedImage.size > 2048000"
                  type="button"
                >
                  Save
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
import DashboardLayouts from "../../components/DashboardLayouts.vue";
import { mapActions, mapState } from "vuex";
import IconPlus from "vue-material-design-icons/Plus";
import CloseThick from "vue-material-design-icons/CloseThick";
import Magnify from "vue-material-design-icons/Magnify";
export default {
  components: { DashboardLayouts, IconPlus, CloseThick, Magnify },
  name: "Menu",
  data() {
    return {
      filter: "",
      formModal: false,
      selectedId: null,
      selectedImage: null,
      selectedAction: "create",
      currentPage: 1,
      perPage: 7,
      errors: {},
      headers: [
        {
          value: "name",
          text: "Name",
        },
        {
          value: "price",
          text: "Price",
        },
        {
          value: "actions",
          text: "Actions",
        },
      ],
    };
  },

  computed: {
    ...mapState("menu", ["menuList", "menuData", "errorData"]),
    ...mapState("category", ["allCategory"]),
  },

  mounted() {
    this.fetchData();
    this.clearError();
  },

  watch: {
    currentPage(newVal) {
      this.getAllMenuList({
        page: newVal,
        per_page: this.perPage,
        filter: this.filter,
      });
    },
    perPage(newVal) {
      this.getAllMenuList({
        page: this.currentPage,
        per_page: newVal,
        filter: this.filter,
      });
    },
    menuList(newVal) {
      if (newVal.data.length == 0) {
        this.$toast.error("Data not Found!", {
          duration: 800,
        });
      }
    },
  },
  methods: {
    ...mapActions("menu", [
      "getAllMenuList",
      "getMenu",
      "updateMenu",
      "createMenu",
      "deleteMenu",
      "clearMenu",
      "clearError",
    ]),
    ...mapActions("category", ["getAllCategory"]),

    clearImage() {
      this.selectedImage = null;
    },

    async onSearch() {
      this.currentPage = 1;
      await this.getAllMenuList({
        page: this.currentPage,
        per_page: this.perPage,
        filter: this.filter,
      });
    },

    clearSearch() {
      this.filter = "";
      this.onSearch();
    },

    async openFormModal(id = null) {
      this.formModal = true;
      this.selectedImage = null;
      this.clearError();
      await this.getAllCategory();

      if (id != null) {
        this.selectedId = id;
        this.selectedAction = "edit";
        this.getMenu({ id });
      } else {
        this.selectedId = null;
        this.selectedAction = "create";
        this.clearMenu();
      }
    },

    closeFormModal() {
      this.formModal = false;
      this.clearError();
    },

    confirmDelete(name, id) {
      this.selectedId = id;
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
              await this.deleteMenu({ id: this.selectedId });
              this.fetchData();
              this.$swal(
                "Deleted!",
                "The menu data has been deleted.",
                "success"
              );
            } catch (error) {
              console.log(error);
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    async submitMenu() {
      try {
        const formData = new FormData();
        if (this.selectedImage != null) {
          formData.append("image", this.selectedImage);
        }
        if (this.menuData.name) {
          formData.append("name", this.menuData.name);
        }
        if (this.menuData.category_id) {
          formData.append("category_id", this.menuData.category_id);
        }
        if (this.menuData.price) {
          formData.append("price", this.menuData.price);
        }

        if (this.selectedAction == "create") {
          try {
            await this.createMenu({ payload: formData });
            this.closeFormModal();
            this.fetchData();
            this.$toast.success("Data Saved Successfully", {
              duration: 3000,
            });
            this.selectedImage = null;
            this.clearError();
          } catch (error) {
            console.log(error);
            this.$toast.error(error.message);
          }
        } else if (this.selectedAction == "edit") {
          try {
            await this.updateMenu({
              id: this.selectedId,
              payload: formData,
            });
            this.closeFormModal();
            this.fetchData();
            this.$toast.success("Data Saved Successfully", {
              duration: 3000,
            });
            this.selectedImage = null;
            this.clearError();
          } catch (error) {
            console.log(error);
            this.$toast.error(error.message);
          }
        }
      } catch (error) {
        console.log(error);
        this.$toast.error(error.message);
      }
    },

    async onFileChange(e) {
      this.selectedImage = e.target.files[0];
      if (!!this.selectedImage && this.selectedImage.size > 2048000) {
        this.$toast.error("File size must be lower than 2MB.", {
          duration: 3000,
        });
      }
    },

    async fetchData() {
      await this.getAllMenuList({
        page: this.currentPage,
        per_page: this.perPage,
        filter: this.filter,
      });
    },
  },
};
</script>
