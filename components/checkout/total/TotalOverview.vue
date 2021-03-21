<template>
  <div class="flex-1">
    <table
      class="w-full text-sm lg:text-base flex flex-col justify-between"
      cellspacing="0"
    >
      <tbody class="w-full">
        <template v-for="product in products">
          <total-overview-product :product="product" :key="product.id" />
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TotalOverviewProduct from "./TotalOverviewProduct";

export default {
  computed: {
    ...mapGetters({
      products: "cart/products",
      subtotal: "cart/subtotal",
    }),
  },

  components: {
    TotalOverviewProduct,
  },
};
</script>
