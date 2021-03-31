<template>
  <div v-if="product.in_stock">
    <div class="mt-4">
      <span class="text-gray-700">{{ attributeName }}</span>
      <div class="mt-2">
        <label
          class="inline-flex items-center mr-2"
          v-for="(value, valueName) in attribute"
          :key="value.name"
        >
          <input
            type="radio"
            class="form-radio"
            v-model="selectedAttribute"
            :value="valueName"
            @change="attributeIsSelected"
          />
          <span class="ml-2">{{ valueName }}</span>
        </label>
      </div>
      <div
        class="mt-4"
        v-for="(option, optionName) in options"
        :key="optionName"
      >
        <span class="text-gray-700">{{ optionName }}</span>
        <div
          class="mt-2 opacity-50"
          :class="radioIsDisabled ? 'opacity-50' : 'opacity-100'"
        >
          <label
            class="inline-flex items-center mr-2"
            :class="{ 'opacity-50': !value[0].in_stock }"
            v-for="(value, valueName) in option"
            :key="value.name"
          >
            <input
              type="radio"
              class="form-radio"
              v-model="selectedOption"
              :value="valueName"
              :disabled="radioIsDisabled || !value[0].in_stock"
              @change="optionsIsSelected(optionName)"
            />
            <span class="ml-2">{{ valueName }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    attribute: {
      type: Object,
    },
    product: {
      type: Object,
    },
    attributeName: {
      type: String,
    },
  },

  data() {
    return {
      options: this.product.options,
      selectedAttribute: null,
      selectedOption: null,
      radioIsDisabled: true,
      selectedProductVariant: null,
    };
  },

  methods: {
    async attributeIsSelected() {
      this.reset();
      this.radioIsDisabled = false;
      let response = await this.$axios.$get(
        `api/products/${this.product.slug}/attributes/${this.selectedAttribute}`
      );
      this.options = response.data;
    },

    optionsIsSelected(optionName) {
      this.selectedProductVariant = this.options[optionName][
        this.selectedOption
      ][0];
      this.$emit("product-variant-selected", this.selectedProductVariant);
    },

    reset() {
      this.selectedOption = null;
      this.$parent.price = this.product.price;
      this.$parent.stock = "";
      this.$parent.quantity = 1;
    },
  },
};
</script>
