<template>
  <div class="rounded flex flex-col w-full border-2 border-teal-800">
    <p class="text-gray-800 bg-gray-400 w-full text-center py-2 font-semibold">
      KARGO SEÇENEKLERİ
    </p>
    <div
      class="p-2 w-full border flex flex-col bg-gray-300 mt-1"
      v-for="shipping in shippings"
      :key="shipping.id"
    >
      <div class="flex flex-row justify-between">
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="radio"
            class="form-radio"
            @change="$emit('input', shipping)"
            :checked="shipping.id === selectedShipping.id"
            :value="shipping"
            name="shipping"
          />
          <span class="ml-3 text-sm text-teal-800">{{ shipping.name }}</span>
        </label>
        <p class="text-gray-800">{{ shipping.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["shippings", "selectedShipping"],
};
</script>
