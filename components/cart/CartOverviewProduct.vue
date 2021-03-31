<template>
  <tr class="flex justify-between md:justify-around h-36 py-2 px-1 mb-4 border">
    <td class="hidden md:flex">
      <div class="w-32 h-32">
        <nuxt-link :to="`/urun/${product.product.slug}`" class="flex flex-col justify-center">
          <img
            :src="product.product.image"
            class="rounded img-fluid"
            alt="Thumbnail"
            width="1000"
            height="1000"
          />
        </nuxt-link>
      </div>
    </td>
    <td
      class="flex flex-col p-1 md:p-2 text-gray-900 justify-between md:items-center"
    >
      <nuxt-link :to="`/urun/${product.product.slug}`" class="flex flex-col mb-2 md:mb-0 text-sm md:text-center"
        ><span class="font-bold text-lg">{{ product.product.name }}</span> (
        {{ product.attribute_value }} - {{ product.option_value }} )</nuxt-link
      >
      <a class="text-gray-700 flex items-center hover:text-gray-900 cursor-pointer" @click.prevent="destroy(product.id)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <p class="mt-1">Sil</p>
      </a>
    </td>
    <td class="flex flex-col p-1 md:p-2 w-24 justify-center">
      <div
        class="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex relative w-full"
      >
        <select
          type="number"
          class="bg-white dark:bg-gray-800 appearance-none z-10 pl-3 py-3 w-full text-sm border border-transparent focus:outline-none text-gray-800 dark:text-gray-100 rounded"
          v-model="quantity"
        >
          <option value="0" v-if="product.quantity == 0">0</option>
          <option
            v-for="x in product.stock"
            :key="x"
            :value="x"
            :selected="x == product.quantity"
          >
            {{ x }}
          </option>
        </select>
        <div
          class="px-2 flex items-center border-l border-gray-300 dark:border-gray-700 flex-col justify-center text-gray-500 dark:text-gray-400 absolute right-0 bottom-0 top-0 mx-auto z-20 pointer-events-none"
        >
          <svg
            tabindex="0"
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-chevron-up"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <polyline points="6 15 12 9 18 15" />
          </svg>
          <svg
            tabindex="0"
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-chevron-down"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </td>
    <td class="flex flex-col p-1 md:p-2 justify-center">
      <span class="text-sm lg:text-base font-medium">
        {{ product.total }}
      </span>
    </td>
  </tr>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["product"],

  data() {
    return {
      quantity: this.product.quantity,
    };
  },

  watch: {
    quantity(quantity) {
      this.update({ productId: this.product.id, quantity: quantity })
    }
  },

  methods: {
    ...mapActions({
      destroy: "cart/destroy",
      update: "cart/update"
    }),
  },
};
</script>
