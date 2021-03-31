<template>
  <div class="container">
    <nuxt-link
      :to="`/urun/${product.slug}`"
      v-for="product in products"
      :key="product.slug"
    >
      <p class="text-xl" v-text="product.name"></p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: null,
    };
  },
  
  async asyncData({ params, app }) {
    let response = await app.$axios.$get(`api/products?category=${params.slug}`);

    return {
      products: response.data,
    };
  },
};
</script>