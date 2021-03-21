<template>
  <div>
    <div class="md:p-4">
      <VueSlickCarousel v-bind="settings" v-if="productsMentionedSlider.length">
        <nuxt-link
          :to="`/urun/${product.slug}`"
          :key="product.slug"
          v-for="product in productsMentionedSlider"
        >
          <img
            :src="product.image"
            alt=""
            class="img-fluid md:pr-2"
            width="500"
            height="500"
          />
          <p v-text="product.slider_order"></p>
        </nuxt-link>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  data() {
    return {
      settings: {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        touchThreshold: 5,
        arrows: true,
        dots: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      },
      products: null,
      showOnSliderProducts: null,
      showOnHomePageProducts: null,
    };
  },

  components: {
    VueSlickCarousel,
  },

  computed: {
    ...mapGetters({
      categories: "categories",
    }),
  },

  async asyncData({ params, app }) {
    let [
      products,
      productsMentionedHomepage,
      productsMentionedSlider,
    ] = await Promise.all([
      app.$axios.$get(`/products`),
      app.$axios.$get(`/products?homepage=true`),
      app.$axios.$get(`/products?slider=true`),
    ]);
    return {
      product: products.data,
      productsMentionedHomepage: productsMentionedHomepage.data,
      productsMentionedSlider: productsMentionedSlider.data,
    };
  },
};
</script>