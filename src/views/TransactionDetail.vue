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
            @click="onSelectMenu(menu.menu_id)"
          >
            <div>
              <img class="rounded-t-lg" :src="menu.image_url" />
            </div>
            <div class="p-2">
              {{ menu.name }} Rp.{{ menu.price | formatRupiah }}
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
              v-for="(menu, key) in details"
              :key="key"
            >
              <div class="flex flex-col">
                <div>
                  {{ menu.name }}
                </div>
                <div class="flex flex-row align-middle">
                  <t-button
                    fixedClasses="h-7 w-7 rounded-full"
                    class="flex justify-center align-middle"
                    @click="onPlus(menu.menu_id, menu.price)"
                  >
                    <icon-plus class="w-6 h-6" />
                  </t-button>
                  <div class="py-1 px-2">
                    {{ menu.qty }}
                  </div>
                  <t-button
                    fixedClasses="h-7 w-7 rounded-full"
                    class="flex justify-center align-middle"
                    @click="onMin(menu.menu_id, menu.price)"
                  >
                    <icon-minus class="w-6 h-6" />
                  </t-button>
                </div>
              </div>
              <div class="flex flex-col">
                <div>
                  <span class="text-sm">
                    Harga : Rp.{{ menu.price | formatRupiah }}
                  </span>
                </div>
                <span class="text-sm">
                  <div>Subtotal : Rp.{{ menu.total_price | formatRupiah }}</div>
                </span>
              </div>
            </div>
          </perfect-scrollbar>
        </div>

        <div class="mt-5 flex flex-col">
          <div class="flex flex-col w-full mb-2">
            <t-button :to="{ name: 'Transaction' }" class="w-full"
              >Move to Cart</t-button
            >
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
import { debounce } from "debounce";
export default {
  components: { DashboardLayouts, IconPlus, IconMinus },
  computed: {
    ...mapState("menu", ["menuList"]),
    ...mapState("order", ["orderData"]),
    ...mapMultiRowFields("order", ["orderData.details"]),
    filteredItem() {
      return this.productMenu.filter((value) => {
        return value.name.toLowerCase().includes(this.searchMenu.toLowerCase());
      });
    },
  },
  data() {
    return {
      id: this.$route.params.id,
      searchMenu: "",
      filteredList: [],
      productMenu: [],
      calculator: [],
    };
  },
  created() {
    this.syncData = debounce(this.syncData, 1000);
  },
  onActive() {
    console.log("active");
  },
  async onIdle() {
    // console.log("onIdle");
    await this.syncData();
  },
  mounted() {
    this.fetchData();
  },
  async beforeDestroy() {
    await this.syncData();
  },
  methods: {
    ...mapActions("menu", ["getAllMenuList"]),
    ...mapActions("order", ["getOrder", "updateOrder"]),
    ...mapMutations("order", ["addSelectedProduct", "removeSelectedProduct"]),
    syncData() {
      this.updateOrder({ id: this.id, payload: this.orderData });
    },
    async fetchData() {
      await this.getAllMenuList();

      this.productMenu = this.menuList.data.map((value) => {
        return {
          menu_id: value.id,
          image_url: value.image_url,
          name: value.name,
          price: value.price,
          qty: value.qty,
          slug: value.slug,
          total_price: value.total_price,
        };
      });

      await this.getOrder({ id: this.id });
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
      let findMenu = this.productMenu.find((value) => value.menu_id === id);
      let checkExists = this.details.some((value) => value.menu_id === id);
      // console.log(findMenu);
      if (checkExists) {
        let findIndex = this.details.findIndex((value) => value.menu_id === id);
        let qty = this.details[findIndex].qty;

        this.details[findIndex].qty = qty + 1;
        this.details[findIndex].total_price = (qty + 1) * findMenu.price;
      } else {
        findMenu.qty = 1;
        findMenu.total_price = findMenu.price;
        let pushData = Object.assign({}, findMenu);
        this.addSelectedProduct(pushData);
      }
    },

    onPlus(id, paramHarga) {
      const price = paramHarga;
      let currentIndex = this.details.findIndex(
        (value) => value.menu_id === id
      );
      let qty = this.details[currentIndex].qty;
      this.details[currentIndex].qty += 1;
      this.details[currentIndex].total_price = (qty + 1) * price;
    },

    onMin(id, paramHarga) {
      const price = paramHarga;
      let currentIndex = this.details.findIndex(
        (value) => value.menu_id === id
      );
      let qty = this.details[currentIndex].qty;
      if (qty > 1) {
        this.details[currentIndex].qty -= 1;
        this.details[currentIndex].total_price = (qty - 1) * price;
      } else {
        this.removeSelectedProduct(id);
      }
    },

    filterItem() {
      this.filteredList = this.productMenu.filter((value) => {
        return value.name.toLowerCase() === this.searchMenu.toLowerCase();
      });
    },
  },
};
</script>
