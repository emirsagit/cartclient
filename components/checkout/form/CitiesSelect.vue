<template>
  <select
    class="block appearance-none w-full text-gray-700 py-3 px-4 pr-8 leading-tight focus:border-blue-500 border-2 focus:outline-none rounded-xl"
    id="grid-state"
    @change="changed"
  >
    <option value="0">Seçiniz</option>
    <option v-for="city in cities" :value="city.id" :key="city.id">
      {{ city.name }}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      cities: [],
    };
  },

  methods: {
    async fetchCities() {
      let response = await this.$axios.$get("api/cities");
      this.cities = response.data;
    },

    changed($event) {
      this.$emit("input", $event.target.value);
    },
  },

  created() {
    this.fetchCities();
  },
};
</script>
