<template>
  <dashboard-layouts>
    <div class="flex flex-col lg:flex-row justify-center p-3  flex-grow h-full">
      <div
        class="w-full flex flex-row flex-wrap lg:w-8/12 p-5 bg-white rounded-xl mr-5 shadow-xl mb-3"
      >
        <t-input
          v-model="searchMenu"
          class="mb-5"
          placeholder="Search disini"
        />
        <perfect-scrollbar
          style="max-height: 400px;width:100%"
          class="flex flex-row flex-wrap px-2"
        >
          <div
            class="w-1/4 lg:w-1/4 rounded-xl shadow-md px-1 mb-5"
            v-for="(menu, key) in filteredItem"
            :key="key"
            @click="onSelectMenu(menu.id)"
          >
            <div>
              <img class="rounded-t-lg" :src="menu.image_url" />
            </div>
            <div class="p-2">
              {{ menu.nama }} Rp.{{ menu.harga | formatRupiah }}
            </div>
          </div>
        </perfect-scrollbar>
      </div>
      <div class="w-full lg:w-4/12 sticky p-5 bg-white rounded-xl shadow-xl">
        <div class="bg-gray-100">
          <div class="flex justify-between">
            <span>Tanggal</span>
            <span>{{ getDate() }}</span>
          </div>
          <div class="flex justify-between">
            <span>Waktu</span>
            <span>{{ getTime() }}</span>
          </div>
        </div>
        <div>
          <perfect-scrollbar class="" style="max-height:230px">
            <div
              class="py-2 px-2 flex flex-row justify-between"
              v-for="(menu, key) in selectedProduct"
              :key="key"
            >
              <div class="flex flex-col">
                <div>
                  {{ menu.nama }}
                </div>
                <div class="flex flex-row align-middle">
                  <t-button
                    fixedClasses="h-7 w-7 rounded-full"
                    class="flex justify-center align-middle"
                    @click="onPlus(menu.id, menu.harga)"
                  >
                    <icon-plus class="w-6 h-6" />
                  </t-button>
                  <div class="py-1 px-2">
                    {{ menu.qty }}
                  </div>
                  <t-button
                    fixedClasses="h-7 w-7 rounded-full"
                    class="flex justify-center align-middle"
                    @click="onMin(menu.id, menu.harga)"
                  >
                    <icon-minus class="w-6 h-6" />
                  </t-button>
                </div>
              </div>
              <div class="flex flex-col">
                <div>
                  <span class="text-xs">
                    Harga : Rp.{{ menu.harga | formatRupiah }}
                  </span>
                </div>
                <span class="text-xs">
                  <div>Subtotal : Rp.{{ menu.total_harga | formatRupiah }}</div>
                </span>
              </div>
              <div class="flex flex-col">
                <t-button
                  fixedClasses="h-7 w-7 rounded-full"
                  class="flex justify-center align-middle"
                  @click="onCancel(menu.id)"
                >
                  <icon-close class="w-6 h-6" />
                </t-button>
              </div>
            </div>
          </perfect-scrollbar>
        </div>

        <div class="mt-5 flex flex-col">
          <div class="flex flex-col w-full mb-2">
            <t-button class="w-full">Move to Cart</t-button>
          </div>
          <div class="flex flex-col w-full">
            <t-button class="w-full">CheckOut</t-button>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </dashboard-layouts>
</template>
<script>
import DashboardLayouts from "../components/DashboardLayouts.vue";
import { mapActions, mapState, mapMutations } from "vuex";
import { mapMultiRowFields } from "vuex-map-fields";
import IconPlus from "vue-material-design-icons/Plus";
import IconMinus from "vue-material-design-icons/Minus";
import IconClose from "vue-material-design-icons/Close";
export default {
  components: { DashboardLayouts, IconPlus, IconMinus, IconClose },
  computed: {
    ...mapState("menu", ["menuList"]),
    ...mapMultiRowFields("order", ["selectedProduct"]),
    filteredItem() {
      return this.menuList.data.filter((value) => {
        return value.nama.toLowerCase().includes(this.searchMenu.toLowerCase());
      });
    },
  },
  data() {
    return {
      searchMenu: "",
      filteredList: [],
      calculator: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions("menu", ["getAllMenuList"]),
    ...mapMutations("order", ["addSelectedProduct", "removeSelectedProduct"]),

    async fetchData() {
      await this.getAllMenuList();
    },

    getDate() {
      return new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "2-digit",
        month: "long",
        day: "numeric",
      });
    },

    getTime() {
      return new Date().toLocaleString("id-ID", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    },

    onSelectMenu(id) {
      let findMenu = this.menuList.data.find((value) => value.id === id);
      let checkExists = this.selectedProduct.some((value) => value.id === id);

      if (checkExists) {
        let findIndex = this.selectedProduct.findIndex(
          (value) => value.id === id
        );
        let qty = this.selectedProduct[findIndex].qty;

        this.selectedProduct[findIndex].qty = qty + 1;
        this.selectedProduct[findIndex].total_harga =
          (qty + 1) * findMenu.harga;
      } else {
        findMenu.qty = 1;
        findMenu.total_harga = findMenu.harga;
        let pushData = Object.assign({}, findMenu);
        this.addSelectedProduct(pushData);
      }
    },

    onPlus(id, paramHarga) {
      const harga = paramHarga;
      let currentIndex = this.selectedProduct.findIndex(
        (value) => value.id === id
      );
      let qty = this.selectedProduct[currentIndex].qty;
      this.selectedProduct[currentIndex].qty += 1;
      this.selectedProduct[currentIndex].total_harga = (qty + 1) * harga;
    },

    onMin(id, paramHarga) {
      const harga = paramHarga;
      let currentIndex = this.selectedProduct.findIndex(
        (value) => value.id === id
      );
      let qty = this.selectedProduct[currentIndex].qty;
      if (qty > 1) {
        this.selectedProduct[currentIndex].qty -= 1;
        this.selectedProduct[currentIndex].total_harga = (qty - 1) * harga;
      } else {
        this.removeSelectedProduct(id);
      }
    },

    onCancel(id) {
      this.removeSelectedProduct(id);
    },

    filterItem() {
      this.filteredList = this.menuList.data.filter((value) => {
        return value.nama.toLowerCase() === this.searchMenu.toLowerCase();
      });
    },
  },
};
</script>
