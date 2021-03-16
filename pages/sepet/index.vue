<template>
  <!-- component -->
  <div class="flex justify-center my-6">
    <div
      class="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5"
    >
      <template v-if="!products.count">
        <cart-overview />

        <button
          class="flex justify-center w-full px-10 py-3 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none"
          :disabled="isEmpty"
          :class="{ 'opacity-50 hover:bg-gray-800' : isEmpty  }"
        >
          <svg
            aria-hidden="true"
            data-prefix="far"
            data-icon="credit-card"
            class="w-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
            />
          </svg>
          <span class="ml-2 mt-5px">Satın Al</span>
        </button>
      </template>
      <template v-else>
        <div class="m-auto w-full">
          <nuxt-link class="font-bold text-indigo-800 text-xl" to="/"
            >Sepetiniz boş. İndirim fırsatlarını görmek için buradan
            anasayfamıza gidebilirsiniz.</nuxt-link
          >
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CartOverview from "@/components/cart/CartOverview";
import { mapGetters } from "vuex";

export default {
  components: {
    CartOverview,
  },

  computed: {
    ...mapGetters({
      isEmpty: "cart/isEmpty",
      products: "cart/products",
    }),
  },
};
</script>
