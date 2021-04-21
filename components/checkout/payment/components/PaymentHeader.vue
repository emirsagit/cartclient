<template>
  <div>
    <div class="w-full h-16 flex flex-row">
      <div
        class="w-1/2 bg-gray-200 text-xl flex items-center justify-center cursor-pointer"
        :class="{ 'bg-gray-700 text-white': !$parent.showPayment }"
        @click.prevent="$parent.showPayment = false"
      >
        <p>ADRES</p>
      </div>
      <div
        class="w-1/2 bg-gray-200 text-xl flex items-center justify-center cursor-pointer"
        :class="{ 'bg-gray-700 text-white': $parent.showPayment }"
        @click.prevent="$parent.isShowPaymentPage()"
      >
        <p>ÖDEME</p>
      </div>
    </div>
    <div class="h-6 bg-gray-400">
      <div
        class="h-full flex justify-center items-center w-1/2 bg-teal-800 text-white"
        :class="{ 'w-full': $parent.showPayment }"
      >
        <p class="" v-if="!$parent.showPayment">%50</p>
        <p class="" v-else>%100</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>