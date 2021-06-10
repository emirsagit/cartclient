<template>
  <div
    class="flex flex-col text-sm lg:text-md py-4 bg-gray-200 w-full lg:items-center min-h-screen"
  >
    <div class="mb-2 p-2 mx-3 flex flex-row items-center text-gray-800">
      <nuxt-link to="/hesabim">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 mr-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </nuxt-link>
      <p class="text-md lg:text-lg">Siparişlerim</p>
    </div>
    <template v-if="orders.length">
      <Order v-for="order in orders" :key="order.id" :order="order" />
    </template>
    <div
      class="flex flex-col p-2 mx-3 lg:mx-16 rounded-lg lg:w-2/3 shadow-lg bg-white mb-3 text-gray-800 text-center"
      v-if="! orders.length"
    >
      <p class="text-gray-700">Henüz Siparişiniz Yok</p>
      <nuxt-link class="text-blue-700 font-semibold py-1 text-xl" to="/">Buradan anasayfaya giderek fırsatlardan yararlanabilirsiniz.</nuxt-link>
    </div>
  </div>
</template>

<script>
import Order from "../../../components/account/order/Order.vue";
export default {
  components: { Order },

  data() {
    return {
      orders: [],
    };
  },

  async asyncData({ app }) {
    let response = await app.$axios.$get("api/orders");
    return {
      orders: response.data,
    };
  },
};
</script>

