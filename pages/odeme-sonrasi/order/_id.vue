<template>
  <div
    class="flex flex-col text-sm lg:text-md py-4 bg-gray-200 w-full lg:items-center min-h-screen"
  >
    <div
      class="mb-2 p-2 mx-3 flex flex-row items-center text-gray-800 justify-center"
    >
      <span class="text-teal-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      <p class="text-lg lg:text-xl pl-2 font-bold">Siparişiniz Alındı</p>
    </div>
    <div
      class="flex flex-col mx-3 lg:mx-16 rounded-lg lg:w-2/4 shadow-lg bg-white mb-3 text-gray-800"
    >
      <div class="flex flex-row items-center">
        <div class="flex flex-col w-full">
          <div
            class="flex flex-row p-2 bg-gray-800 mb-2 rounded text-white justify-center w-full border"
          >
            <p class="font-bold">Sipariş Bilgileri</p>
          </div>
          <div class="flex flex-row p-1 pl-2">
            <span class="text-gray-700">Sipariş Kodu:</span>&nbsp
            <p v-text="order.id" class="text-gray-800 font-semibold"></p>
          </div>
          <div class="flex flex-row p-1 pl-2">
            <span class="text-gray-700">Sipariş Durumu:</span>&nbsp
            <component :is="order.status" class="font-semibold" />
          </div>
          <div class="flex flex-row p-1 pl-2">
            <span class="text-gray-700">Sipariş Zamanı:</span>&nbsp
            <p
              v-text="order.created_at"
              class="text-gray-800 font-semibold"
            ></p>
          </div>
          <div class="flex flex-row p-1 pl-2">
            <span class="text-gray-700">Toplam:</span>&nbsp
            <p v-text="order.total" class="text-gray-800 font-semibold"></p>
          </div>
          <div class="flex flex-row p-1 pl-2">
            <span class="text-gray-700">Kargo Firması:</span>&nbsp
            <p
              v-text="order.shipping.name"
              class="text-gray-800 font-semibold"
            ></p>
          </div>
        </div>
      </div>
      <div class="flex flex-col mb-3">
        <div
          class="flex flex-row p-2 bg-gray-800 my-2 rounded text-white justify-center w-full border"
        >
          <p
            class="font-bold"
            v-html="order.products.length == 1 ? 'Ürün' : 'Ürünler'"
          ></p>
        </div>
        <nuxt-link
          class="p-1 pl-2"
          v-for="product in order.products"
          :to="{ name: 'urun-slug', params: { slug: product.product.slug } }"
          :key="product.id"
          >{{ product.product.name }}
          <span class="text-gray-600 font-light"
            >({{ product.option_value }} / {{ product.attribute_value }})
          </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Pending from "../../../components/account/order/status/Pending.vue";
import PaymentFailed from "../../../components/account/order/status/PaymentFailed.vue";
import Processing from "../../../components/account/order/status/Processing.vue";
import Completed from "../../../components/account/order/status/Completed.vue";
export default {
  components: {
    pending: Pending,
    payment_failed: PaymentFailed,
    processing: Processing,
    completed: Completed,
  },

  data() {
    return {
      id: this.$route.params.id,
      order: "",
    };
  },

  async asyncData({ params, app }) {
    let response = await app.$axios.$get(`api/orders/${params.id}`);

    return {
      order: response.data,
    };
  },
};
</script>
