<template>
  <div class="min-h-screen w-full bg-white p-2">
    <div class="flex justify-between">
      <t-button
        :to="{
          name: 'TransactionReport',
        }"
        variant="editable"
        class="font-medium bg-red-500 text-white"
        >Back
      </t-button>
      <t-button
        variant="editable"
        class="font-medium bg-custom-color2 text-white"
        >Export
      </t-button>
    </div>
    <div class="flex"></div>
  </div>
</template>
<script>
export default {
  name: "ExportReport",
};
</script>
