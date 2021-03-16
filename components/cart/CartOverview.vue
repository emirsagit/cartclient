<template>
  <div class="flex-1">
    <table
      class="w-full text-sm lg:text-base flex flex-col justify-between"
      cellspacing="0"
    >
      <thead class="w-full">
        <tr
          class="h-12 uppercase w-full flex flex-row justify-between md:justify-around"
        >
          <th class="hidden md:flex flex-col p-1 md:p-2 w-32"></th>
          <th class="md:flex flex-col p-1 md:p-2">Ürün</th>
          <th class="md:flex flex-col p-1 md:p-2">Mİktar</th>
          <th class="md:flex flex-col p-1 md:p-2 items-end">Fİyat</th>
        </tr>
      </thead>
      <tbody class="w-full pb-4">
        <template v-for="product in products">
          <cart-overview-product :product="product" :key="product.id"/>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartOverviewProduct from "@/components/cart/CartOverviewProduct";

export default {
  computed: {
    ...mapGetters({
      products: "cart/products",
    }),
  },

  components: {
    CartOverviewProduct,
  },
};
</script>
