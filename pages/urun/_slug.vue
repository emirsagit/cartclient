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
    <form class="md:w-1/2 p-2 md:p-4 pt-8 flex flex-col">
      <div class="border-gray-400 border p-1 rounded">
        <h1 class="text-2xl font-extrabold" v-text="product.name"></h1>
        <p v-text="product.description" class="text-gray-800"></p>
      </div>
      <options
        v-for="(attribute, attributeName) in product.attributes"
        :key="attributeName"
        :attribute="attribute"
        :attributeName="attributeName"
        :product="product"
        v-on:product-variant-selected="productVariantSelected"
      />
      <div class="relative my-4">
        <p
          class="opacity-75 text-sm text-gray-800 absolute"
          v-show="stock"
          :class="{ 'text-red-800 opacity-100': stockAlarm }"
        >
          <span
            v-if="stockAlarm"
            class="bg-red-700 py-1 px-2 text-white font-bold rounded-lg mr-2"
            >Tükeniyor !</span
          >{{ stock }} adet kaldı.
        </p>
        <p
          v-if="!product.in_stock"
          class="bg-gray-800 p-2 text-white font-bold text-lg rounded-lg w-32 text-center"
        >
          Stokta Yok
        </p>
      </div>
      <ProductQuantity />
      <div
        class="fixed bottom-0 md:relative md:mt-4 p-1 flex flex-row bg-white w-full justify-between items-center px-4 border"
      >
        <p class="text-gray-500 opacity-75 text-sm">100<span>&#8378;</span></p>
        <div class="font-bold flex flex-col">
          <p class="text-xs">Sepette %{{ product.discount }} indirim</p>
          <p class="text-red-700 text-lg">{{ price }} TL</p>
        </div>
        <button
          class="bg-red-600 text-white text-md py-2 px-4 rounded cursor-pointer hover:bg-red-700"
          @click.prevent="add"
        >
          Sepete Ekle
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Options from "@/components/products/Options";
import ProductQuantity from "@/components/products/ProductQuantity";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  data() {
    return {
      product: null,
      price: null,
      stock: "",
      quantity: 1,
      selectedVariant: "",
    };
  },

  computed: {
    stockAlarm() {
      return this.stock < 10;
    },
  },

  components: {
    VueSlickCarousel,
    Options,
    ProductQuantity,
  },

  methods: {
    productVariantSelected(variant) {
      this.selectedVariant = variant;
      this.price = variant.price;
      this.stock = variant.stock;
    },

    add() {
      this.store([
        {
          id: this.selectedVariant.id,
          quantity: this.quantity,
        },
      ]);

      this.selectedVariant = "";
      this.quantity = "1";
      this.$router.push('/sepet')
    },

    ...mapActions({
      store: "cart/store",
    }),
  },

  async asyncData({ params, app }) {
    let response = await app.$axios.$get(`/products/${params.slug}`);
    return {
      product: response.data,
      price: response.data.price,
    };
  },
};
</script>