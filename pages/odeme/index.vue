<template>
  <div class="flex flex-col lg:flex-row justify-center my-6">
    <div
      class="flex flex-col w-full p-4 lg:p-8 text-gray-800 bg-white lg:w-3/5"
    >
      <div
        class="h-3 w-full border-gray-700 rounded-full border-2 flex flex-row"
      >
        <div class="w-1/2 h-full bg-green-700"></div>
        <div class="w-1/2 h-full"></div>
      </div>
      <addresses v-if="!selectedAddress" />
      <payment v-else />
    </div>
    <div class="w-full lg:relative lg:w-2/5 flex flex-col">
      <total-overview></total-overview>
      <div
        class="flex w-full flex-col px-2 lg:px-8 text-gray-900 items-start border py-2"
      >
        <p class="text-gray-700 text-md mb-1">Ara Toplam: {{ subtotal }}</p>
        <p class="text-gray-700 text-md">Kargo: {{ subtotal }}</p>
      </div>
      <div
        class="fixed bottom-0 lg:relative bg-white z-30 flex w-full flex-row justify-around lg:justify-between px-1 md:px-2 lg:px-8 text-gray-900 items-center border"
      >
        <p class="text-gray-900 text-xl flex flex-row mr-4">
          Toplam: <span class="font-bold">{{ subtotal }}</span>
        </p>
        <button
          class="w-full px-4 py-2 bg-teal-800 text-white lg:rounded-lg font-extrabold text-xl rounded-t hover:bg-teal-700"
          :class="{ 'opacity-50 hover:bg-teal-800': isEmpty }"
        >
          Onayla ve Bitir
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TotalOverview from "../../components/checkout/total/TotalOverview.vue";
import Payment from "../../components/checkout/payment/Payment.vue";
import Addresses from "../../components/checkout/addresses/Addresses.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      subtotal: "cart/subtotal",
      isEmpty: "cart/isEmpty",
    }),
  },
  components: {
    TotalOverview,
    Payment,
    Addresses,
  },

  data() {
    return {
      selectedAddress: "",
    };
  },
};
</script>