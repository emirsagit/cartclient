<template>
  <div class="flex flex-col md:flex-row md:px-6 lg:px-8">
    <div class="md:w-1/2 md:p-4">
      <VueSlickCarousel :arrows="true" :dots="true">
        <img
          src="https://picsum.photos/1000/1000"
          alt=""
          width="1000"
          height="1000"
        />
        <img
          src="https://picsum.photos/1000/1000"
          alt=""
          width="1000"
          height="1000"
        />
        <img
          src="https://picsum.photos/1000/1000"
          alt=""
          width="1000"
          height="1000"
        />
        <img
          src="https://picsum.photos/1000/1000"
          alt=""
          width="1000"
          height="1000"
        />
      </VueSlickCarousel>
    </div>
    <div class="md:w-1/2 p-2 md:p-4 pt-8 flex flex-col">
      <div class="border-gray-400 border p-1 rounded">
        <h1 class="text-2xl font-extrabold" v-text="product.name"></h1>
        <p v-text="product.description" class="text-gray-800"></p>
      </div>
      <div
        class="fixed bottom-0 md:relative md:mt-4 p-1 flex flex-row bg-white w-full justify-between items-center px-4 border"
      >
        <p class="text-gray-500 opacity-75 text-sm">100<span>&#8378;</span></p>
        <div class="font-bold flex flex-col">
          <p class="text-xs">Sepette %{{ product.discount }} indirim</p>
          <p class="text-red-700 text-lg">{{ product.price }} TL</p>
        </div>
        <p
          class="bg-red-600 text-white text-md py-2 px-4 rounded cursor-pointer hover:bg-red-700"
        >
          Sepete Ekle
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  data() {
    return {
      product: null,
    };
  },

  components: {
    VueSlickCarousel,
  },

  async asyncData({ params, app }) {
    let response = await app.$axios.$get(`/products/${params.slug}`);
    return {
      product: response.data,
    };
  },
};
</script>