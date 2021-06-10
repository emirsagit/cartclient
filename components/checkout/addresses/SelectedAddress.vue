<template>
  <div class="border flex flex-col rounded">
    <div class="p-4">
      <div class="flex flex-row justify-between">
        <p class="font-bold">Teslimat Adresi:</p>
        <label class="flex items-center">
          <input
            type="checkbox"
            class="form-checkbox"
            v-model="$parent.billingAddressIsSame"
          />
          <span class="ml-2">Fatura adresim aynı</span>
        </label>
      </div>
      <div class="text-sm" v-if="selectedAddress">
        <p>{{ selectedAddress.name }}</p>
        <p>{{ selectedAddress.address }}</p>
        <p>
          {{ selectedAddress.neighborhood }} / {{ selectedAddress.district }} /
          {{ selectedAddress.city.name }}
        </p>
        <p>{{ selectedAddress.phone }}</p>
        <div class="flex flex-row mt-4">
          <button
            class="font-bold text-teal-700 hover:text-teal-800 underline mr-2 py-1"
            v-if="hasMultipleAddresses"
            @click.prevent="$emit('changeAddress', 'delivery')"
          >
            Değiştir
          </button>
          <button
            class="font-bold text-white bg-teal-600 px-2 py-1 hover:bg-teal-700 rounded-lg"
            @click.prevent="$emit('addAddress', 'delivery')"
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
  props: ["selectedAddress", "hasMultipleAddresses"],
};
</script>
