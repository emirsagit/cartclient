<template>
  <div>
    <div class="rounded flex flex-col w-full border">
      <p
        class="text-gray-800 bg-gray-400 w-full text-center py-2 font-semibold"
      >
        SİPARİŞ ÖZETİ
      </p>
      <total-overview />
    </div>
    <div
      class="flex w-full flex-col px-2 lg:px-8 text-gray-900 items-start border py-2"
    >
      <p class="text-gray-700 text-md mb-1">Ara Toplam: {{ $parent.subtotal }}</p>
      <p class="text-gray-700 text-md mb-1" v-if="$parent.shippingMethod">
        Kargo Ücreti: {{ $parent.shippingMethod.price }}
      </p>
      <p
        class="text-gray-700 text-md mb-1"
        v-if="$parent.selectedInstallment.installment_number > 1"
      >
        Taksit Farkı: {{ $parent.selectedInstallment.installment_difference }}
      </p>
    </div>
  </div>
</template>

<script>
import TotalOverview from '../../total/TotalOverview.vue';
export default {
    components: {
        TotalOverview,
    },
};
</script>
