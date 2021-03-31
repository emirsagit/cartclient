<template>
  <select
    class="block appearance-none w-full border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:border-blue-500 border-2 focus:outline-none rounded-xl"
    id="grid-state"
    @change="changed"
  >
    <option value="0">Seçiniz</option>
    <option
      v-for="district in districts"
      :value="district.id"
      :key="district.id"
    >
      {{ district.name }}
    </option>
  </select>
</template>

<script>
export default {
  props: ["city"],

  data() {
    return {
      districts: [],
    };
  },

  methods: {
    async fetchDistricts() {
      let response = await this.$axios.$get(
        `api/cities/${this.city}/districts`
      );
      this.districts = response.data;
      this.reset();
    },

    changed($event) {
      this.$emit("input", $event.target.value);
    },

    reset() {
      this.$parent.form.district_id = "";
      this.$parent.form.neighborhood = "";
      this.$parent.form.postal_code = "";
    },
  },

  watch: {
    city() {
      this.fetchDistricts();
    },
  },
};
</script>
