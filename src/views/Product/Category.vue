<template>
  <dashboard-layouts>
    <div class="flex justify-center flex-grow h-full">
      <div class="pt-1 px-5 pb-5 bg-white rounded-xl w-full">
        <div class="text-2xl text-black mt-5 font-bold text-center">
          Daftar Kategori
        </div>

        <div class="flex py-1">
          <div class="relative flex w-full flex-wrap items-stretch pr-1">
            <t-input
              v-model="filter"
              @change="onSearch"
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
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="text-black overflow-x-auto py-1">
          <t-table :headers="headers" :data="categoryList.data">
            <template slot="row" slot-scope="props">
              <tr :class="[props.trClass]">
                <td :class="props.tdClass">
                  {{ props.row.id }}
                </td>
                <td :class="props.tdClass">
                  {{ props.row.name }}
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
                    @click="confirmDelete(props.row.id)"
                    >Delete</t-button
                  >
                </td>
              </tr>
            </template>
          </t-table>

          <t-pagination
            class="mt-2"
            :total-items="
              !!categoryList.meta.total ? categoryList.meta.total : 1
            "
            :per-page="perPage"
            :hideEllipsis="true"
            v-model="currentPage"
          />

          <t-modal v-model="formModal" header="Manage Category">
            <div>
              <label for="">Nama Kategori</label>
              <t-input v-model="categoryData.name" />
              <span
                class="text-sm text-left text-red-600"
                v-if="errorData.errors && errorData.errors.name"
              >
                {{ errorData.errors.name[0] }}
              </span>
            </div>

            <template v-slot:footer>
              <div class="flex justify-between">
                <t-button @click="closeFormModal" type="button">
                  Cancel
                </t-button>
                <t-button @click="submitCategory" type="button">
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
  name: "Category",
  components: { DashboardLayouts, IconPlus, CloseThick, Magnify },
  data() {
    return {
      filter: "",
      formModal: false,
      selectedId: null,
      selectedImage: null,
      selectedAction: "create",
      currentPage: 1,
      perPage: 5,
      errors: {},
      headers: [
        {
          value: "id",
          text: "Id",
        },
        {
          value: "name",
          text: "Nama",
        },
        {
          value: "actions",
          text: "Actions",
        },
      ],
    };
  },

  computed: {
    ...mapState("category", ["categoryList", "categoryData", "errorData"]),
    check() {
      return this.categoryList.data.length;
    },
  },

  mounted() {
    this.fetchData();
    this.clearError();
  },

  watch: {
    check(category) {
      if (!category) {
        this.$toast.error("Data not Found!", {
          duration: 3000,
        });
      }
    },
    currentPage(newVal) {
      this.getAllCategoryList({
        page: newVal,
        per_page: this.perPage,
        filter: this.filter,
      });
    },
    perPage(newVal) {
      this.getAllCategoryList({
        page: this.currentPage,
        per_page: newVal,
        filter: this.filter,
      });
    },
  },
  methods: {
    ...mapActions("category", [
      "getAllCategoryList",
      "getCategory",
      "updateCategory",
      "createCategory",
      "deleteCategory",
      "clearCategory",
      "clearError",
    ]),

    clearImage() {
      this.selectedImage = null;
    },

    onSearch() {
      this.currentPage = 1;
      this.getAllCategoryList({
        page: this.currentPage,
        per_page: this.perPage,
        filter: this.filter,
      });
    },

    clearSearch() {
      this.filter = "";
      this.onSearch();
    },

    openFormModal(id = null) {
      this.formModal = true;
      this.selectedImage = null;
      this.clearError();

      if (id != null) {
        this.selectedId = id;
        this.selectedAction = "edit";
        this.getCategory({ id });
      } else {
        this.selectedId = null;
        this.selectedAction = "create";
        this.clearCategory();
      }
    },

    closeFormModal() {
      this.formModal = false;
      this.clearError();
    },

    async confirmDelete(id) {
      this.selectedId = id;
      try {
        await this.getCategory({ id });
        this.$swal({
          title: "Are you sure?",
          text:
            this.categoryData.name +
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
              await this.deleteCategory({ id: this.selectedId });
              this.fetchData();
              this.$swal("Deleted!", "Your file has been deleted.", "success");
            } catch (error) {
              console.log(error);
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    async submitCategory() {
      try {
        if (this.selectedAction == "create") {
          try {
            await this.createCategory({ payload: this.categoryData });
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
            await this.updateCategory({
              id: this.selectedId,
              payload: this.categoryData,
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

    fetchData() {
      this.getAllCategoryList({
        page: this.currentPage,
        per_page: this.perPage,
      });
    },
  },
};
</script>