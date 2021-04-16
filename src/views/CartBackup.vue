<template>
  <dashboard-layouts>
    <div class="flex flex-col lg:flex-row justify-center p-3  flex-grow h-full">
      <div class="w-full p-5 bg-white rounded-xl">
        <t-table :headers="headers" :data="cart">
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
                {{ props.row.nama }}
              </td>
              <td :class="props.tdClass">
                {{ props.row.harga }}
              </td>
              <!--              <td :class="props.tdClass" class="flex flex-row">-->
              <!--                <t-button-->
              <!--                    variant="secondary"-->
              <!--                    class="mr-2 bg-green-400"-->
              <!--                    @click="openFormModal(props.row.id)"-->
              <!--                >Edit</t-button-->
              <!--                >-->
              <!--                <t-button-->
              <!--                    variant="secondary"-->
              <!--                    class="bg-red-400"-->
              <!--                    @click="openDeleteModal(props.row.id)"-->
              <!--                >Delete</t-button-->
              <!--                >-->
              <!--              </td>-->
            </tr>
          </template>
        </t-table>
      </div>
      <!--      <div class="w-full lg:w-4/12 p-5 bg-white rounded-xl">-->
      <!--        mantul 2-->
      <!--      </div>-->
    </div>
  </dashboard-layouts>
</template>
<script>
import DashboardLayouts from "../components/DashboardLayouts.vue";
import { mapState } from "vuex";
export default {
  components: { DashboardLayouts },
  data() {
    return {
      headers: [
        {
          value: "id",
          text: "ID",
        },
        {
          value: "Date",
          text: "date",
        },
        {
          value: "Number",
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
    ...mapState("order", ["cart"]),
  },
};
</script>
