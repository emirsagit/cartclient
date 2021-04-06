<template>
  <button
    @click.prevent="$emit('clicked')"
    class="w-full px-4 py-2 bg-teal-800 text-white font-extrabold text-xl hover:bg-teal-700"
  >
    Devam
  </button>
</template>

<script>
export default {};
</script>
