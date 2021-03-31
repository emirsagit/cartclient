<template>
  <select
    class="block appearance-none w-full border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:border-blue-500 border-2 focus:outline-none rounded-xl"
    id="grid-state"
    @change="changed"
    v-model="neighborhood"
  >
    <option value="0">Seçiniz</option>
    <option
      v-for="neighborhood in neighborhoods"
      :key="neighborhood.id"
      :value="neighborhood"
    >
      {{ neighborhood.name }}
    </option>
  </select>
</template>

<script>
export default {
  props: ["district"],

  data() {
    return {
      neighborhoods: [],
      neighborhood: "",
    };
  },

  methods: {
    async fetchNeighborhoods() {
      let response = await this.$axios.$get(
        `api/districts/${this.district}/neighborhoods`
      );
      this.neighborhoods = response.data;
    },

    changed() {
      this.$emit("neighborhoodSelected", this.neighborhood);
    },

    reset() {
      this.neighborhoods = "";
      this.neighborhood = "";
      this.$parent.form.postal_code = "";
      this.$parent.form.neighborhood = "";
    },
  },

  watch: {
    district() {
      this.fetchNeighborhoods();
      this.reset();
    },
  },
};
</script>
