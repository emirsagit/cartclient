<template>
  <select
    class="block appearance-none w-full border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:border-blue-500 border-2 focus:outline-none rounded-xl"
    disabled
    id="grid-state"
  >
    <option :value="postal_code">{{ postal_code }}</option>
  </select>
</template>

<script>
export default {
  props: ["postal_code"],
};
</script>
