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
          <cart-overview-product :product="product" :key="product.id" />
        </template>
        <tr
          class="flex h-36 py-2 px-1 mb-4"
        >
          <td
            class="flex w-full flex-col p-1 md:p-2 text-gray-900 items-end "
          >
          <p class="font-bold text-gray-900 text-xl"><span class="font-normal">Toplam:</span> {{ subtotal }}</p>
          </td>
        </tr>
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
      subtotal: "cart/subtotal"
    }),
  },

  components: {
    CartOverviewProduct,
  },
};
</script>
