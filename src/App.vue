<template>
  <div id="app">
    <h1>{{message}}</h1>
    <input type="text" v-model="message" />
    <div v-if="showCewe">
      <img src="https://images.unsplash.com/photo-1614640384477-93219e3554a1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"/>
    </div>
    <div  v-if="showLaki">
      <img src="https://images.unsplash.com/photo-1614656655693-2d4fac96bd57?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"/>
    </div>
    <div>
      <button @click="onToggleLaki()">Show Laki</button>
      <button @click="onToggleCewe()">Show Perempuan</button>
    </div>


    <div style="margin-top:2rem;margin-bottom:2rems">
      <ul>
        <li>Product Name : {{  product.name}}</li>
        <li>Product Price : {{  product.price}}</li>
      </ul>
    </div>
    <div>
      <button @click="add">Add</button>
      <input type="text" v-model="qty"/>
      <button @click="remove">Remove</button>
    </div>
    <div>
      {{  totalPrice }}
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Harga</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(menu,key) in menuList" :key="key">
          <td>{{menu.id}}</td>
          <td>{{menu.nama}}</td>
          <td>{{menu.harga}}</td>
        </tr>
      </tbody>
    </table>
    <!-- <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name Simple</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(quran,key) in quranList" :key="key">
          <td>{{quran.id}}</td>
          <td>{{quran.name_simple}}</td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      message:"",
      showLaki:false,
      showCewe:false,
      qty:0,
      product:{
        name:"Mantul",
        price:2000
      },
      quranList:[],
      menuList:[]
      
    }
  },
  components: {
  },
  mounted(){
    this.fetchApiQuran()
    this.fetchApiMenu()
  },
  computed:{
    totalPrice(){
      return this.qty * this.product.price;
    }
  },
  methods:{
    add(){
      this.qty++;
    },
    remove(){
      if(this.qty > 0){
        this.qty--;
      }
      
    },
    onToggleLaki(){
      this.showLaki = !this.showLaki;
    },
    onToggleCewe(){
      this.showCewe = !this.showCewe;
    },
    fetchApiQuran(){
      
//       bismillah_pre: false
// id: 1
// name_arabic: "الفاتحة"
// name_complex: "Al-Fātiĥah"
// name_simple: "Al-Fatihah"
// pages: (2) [1, 1]
// revelation_order: 5
// revelation_place: "makkah"
// translated_name: {language_name: "english", name: "The Opener"}
// verses_count
      const url = 'https://api.quran.com/api/v4/chapters?language=en';
      let self = this;

      console.log('asdasd')
      this.axios.get(url).then(response => {
        console.log(response);
        self.quranList = response.data.chapters
      })
    },

    fetchApiMenu(){
      const url = 'http://c041592e712a.ngrok.io/api/menu';
      let self = this;

      console.log('asdasd')
      this.axios.get(url).then(response => {
        console.log(response);
        self.menuList = response.data
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
