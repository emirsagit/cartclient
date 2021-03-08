<template>
  <!-- parent is urun _slug page -->
  <div class="custom-number-input flex mt-2 justify-end">
    <div
      class="flex flex-row h-full rounded-lg relative bg-transparent items-center"
    >
      <label
        for="custom-input-number"
        class="text-gray-700 text-sm font-semibold mr-2"
        >Adet:
      </label>
      <button
        class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        @click.prevent="decreaseQuantity"
      >
        <span class="m-auto text-2xl font-thin">−</span>
      </button>
      <input
        type="number"
        class="outline-none focus:outline-none text-center bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 h-full w-16"
        name="custom-input-number"
        v-model="$parent.quantity"
        min="1"
        :max="$parent.stock"
        :disabled="!$parent.stock"
        @changed="changedQuantityFromTextField"
      />
      <button
        class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        @click.prevent="increaseQuantity"
      >
        <span class="m-auto text-2xl font-thin">+</span>
      </button>
    </div>
  </div>
</template>
<!-- parent is urun _slug page -->
<script>
export default {
  methods: {
    changedQuantityFromTextField() {
      if (this.$parent.quantity > this.$parent.stock) {
        this.$parent.quantity = this.$parent.stock;
      } else if (this.$parent.quantity < 1) {
        this.$parent.quantity = 1;
      }
    },

    increaseQuantity() {
      this.$parent.quantity++;
      if (this.$parent.quantity > this.$parent.stock) {
        this.$parent.quantity = this.$parent.stock;
      }
    },

    decreaseQuantity() {
      this.$parent.quantity--;
      if (this.$parent.quantity < 1) {
        this.$parent.quantity = 1;
      }
    },
  },
};
</script>
