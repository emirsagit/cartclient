<template>
  <div class="my-4 border flex flex-col rounded">
    <div class="p-4">
      <div class="flex flex-row justify-between">
        <p class="font-bold">Fatura Adresi:</p>
      </div>
      <div class="text-sm" v-if="billingAddress">
        <p>{{ billingAddress.name }}</p>
        <p>{{ billingAddress.address }}</p>
        <p>
          {{ billingAddress.neighborhood }} / {{ billingAddress.district }} /
          {{ billingAddress.city.name }}
        </p>
        <p>{{ billingAddress.phone }}</p>
        <div class="flex flex-row mt-4">
          <button
            class="font-bold text-teal-700 hover:text-teal-800 underline mr-2 py-1"
            v-if="hasMultipleAddresses"
            @click.prevent="$emit('changeAddress', 'billing')"
          >
            Değiştir
          </button>
          <button
            class="font-bold text-white bg-teal-600 px-2 py-1 hover:bg-teal-700 rounded-lg"
            @click.prevent="$emit('addAddress', 'billing')"
          >
            Yeni Adres Ekle
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["billingAddress", "hasMultipleAddresses"],
};
</script>
