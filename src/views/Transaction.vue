<template>
  <dashboard-layouts>
    <div class="flex flex-col lg:flex-row justify-center p-3  flex-grow h-full">
      <div class="w-full flex flex-row flex-wrap lg:w-8/12 p-5 bg-white rounded-xl mr-5 shadow-xl">
        <t-input v-model="searchMenu" class="mb-5" placeholder="Search disini" />
        <perfect-scrollbar style="max-height: 400px;width:100%" class="flex flex-row flex-wrap px-2">
        <div class="w-1/4 lg:w-1/4 rounded-xl shadow-md px-1 mb-5" v-for="(menu,key) in filteredItem" :key="key" @click="onSelectMenu(menu.id)">
          <div>
            <img class="rounded-t-lg" :src="menu.image_url" />
          </div>
          <div class="p-2">
            {{menu.nama}} {{menu.harga}}
          </div>
        </div>
        </perfect-scrollbar>
      </div>
      <div class="w-full lg:w-4/12 p-5 bg-white rounded-xl shadow-xl">
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
          <ul>
            <li v-for="(menu,key) in selectedProduct" :key="key">
              {{menu.nama}} ( {{menu.qty}} ) : {{menu.total_harga}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </dashboard-layouts>
</template>
<script>
import DashboardLayouts from "../components/DashboardLayouts.vue";
import {mapActions, mapState,mapMutations} from "vuex";
import { mapMultiRowFields } from 'vuex-map-fields';

export default {
  components: { DashboardLayouts },
  computed:{
    ...mapState("menu",['menuList']),
    ...mapMultiRowFields("order",['selectedProduct']),
    filteredItem(){
      return this.menuList.data.filter(value => {
        return value.nama.toLowerCase().includes(this.searchMenu.toLowerCase())
      })
    }
  },
  data(){
    return {
      searchMenu:"",
      filteredList:[],
    }
  },
  mounted(){
    this.fetchData();
  },
  methods: {
    ...mapActions("menu",['getAllMenuList']),
    ...mapMutations("order",['addSelectedProduct']),
    async fetchData(){
      console.log("asdasd")
      await this.getAllMenuList();
      // this.filteredList = this.menuList.data;
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
    onSelectMenu(id){

      let findMenu = this.menuList.data.find((value) => value.id === id);
      // const hargaMenu = findMenu.harga;

      let checkExists = this.selectedProduct.some((value) => value.id === id);
      
      if(checkExists){
        let findIndex = this.selectedProduct.findIndex((value) => value.id === id);
        let qty = this.selectedProduct[findIndex].qty;
        let selectedProduct = this.selectedProduct[findIndex];
        const objectData = {
          nama:selectedProduct.nama,
          harga: selectedProduct.harga,
          qty: qty+1,
          total_harga:this.selectedProduct[findIndex].qty * selectedProduct.harga
        }

        this.selectedProduct[findIndex] = objectData


        // this.selectedProduct[findIndex].qty = qty +1;
        //
        // this.selectedProduct[findIndex].total_harga =
      }else{
        findMenu.qty = 1;
        findMenu.total_harga = findMenu.harga;
        console.log(findMenu);
        let pushData = Object.assign({},findMenu);
        // this.selectedProduct.push(pushData);
        this.addSelectedProduct(pushData)
      }
      // this.filteredList[key]
    },
    filterItem(){

      this.filteredList = this.menuList.data.filter((value) => {
        return value.nama.toLowerCase() === this.searchMenu.toLowerCase()
      })
    }
  },
};
</script>
