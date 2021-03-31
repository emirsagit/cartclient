<template>
  <div class="block p-4">
    <span class="font-bold">Adresler</span>
    <div class="mt-2 flex flex-row flex-wrap">
      <div
        class="p-2 w-full border md:w-1/2 flex flex-col"
        v-for="address in localAddresses"
        :key="address.id"
      >
        <div class="flex flex-row justify-between">
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="radio"
            class="form-radio"
            :value="address"
            @click.prevent="change(address)"
          />
          <span class="ml-3 text-sm text-teal-800">{{
            address.description
          }}</span>
        </label>
        <button class="text-sm text-red-500 hover:text-red-600">
          X
        </button>
        </div>
        <div
          class="bg-gray-100 flex flex-col relative text-xs p-1 cursor-pointer hover:bg-gray-200"
          @click.prevent="change(address)"
        >
          <p>{{ address.name }}</p>
          <p>{{ address.address }}</p>
          <p>
            {{ address.neighborhood }} / {{ address.district }} /
            {{ address.city.name }}
          </p>
          <p>{{ address.phone }}</p>
        </div>
      </div>
      <button
        class="p-2 text-indigo-700 hover:text-indigo-800"
        @click.prevent="$parent.selecting = false"
      >
        Geri
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["localAddresses"],

  methods: {
    change(address) {
      this.$parent.switchAddress(address);
      this.$parent.selecting = false;
    },
  },
};
</script>
