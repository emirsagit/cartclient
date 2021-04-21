<template>
  <div
    class="flex flex-col p-2 mx-3 lg:mx-16 rounded-lg lg:w-2/3 shadow-lg bg-white mb-3 text-gray-800"
  >
    <div class="flex flex-row items-center">
      <div class="flex flex-col justify-between w-full">
        <p v-text="order.created_at"></p>
        <p>
          <span class="text-teal-800 font-semibold">{{ order.total }}</span>
        </p>
      </div>
      <a href="#" class="text-teal-800">Detaylar</a>
    </div>
    <component :is="order.status" />
    <nuxt-link
      class=""
      :to="{ name: 'urun-slug', params: { slug: product.product.slug } }"
      v-for="product in products"
      :key="product.id"
      >{{ product.product.name }}
      <span class="text-gray-600 font-light"
        >({{ product.option_value }} / {{ product.attribute_value }})
      </span></nuxt-link
    >
    <p class="" v-if="moreNumberOfProducts > 0">
      {{ moreNumberOfProducts }} tane daha
    </p>
  </div>
</template>

<script>
import Pending from "./status/Pending.vue";
import PaymentFailed from "./status/PaymentFailed.vue";
import Processing from "./status/Processing.vue";
import Completed from "./status/Completed.vue";

export default {
  components: {
    pending: Pending,
    payment_failed: PaymentFailed,
    processing: Processing,
    completed: Completed,
  },

  props: ["order"],

  data() {
    return {
      productToShow: 3,
    };
  },

  computed: {
    products() {
      return this.order.products.slice(0, this.productToShow);
    },

    moreNumberOfProducts() {
      return this.order.products.length - this.productToShow;
    },
  },
};
</script>