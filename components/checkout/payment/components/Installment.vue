<template>
  <div
    class="flex items-center justify-center bg-gray-100 font-sans overflow-hidden my-4"
  >
    <div class="bg-white shadow-md rounded w-full">
      <h4
        class="uppercase bg-gray-400 w-full text-center py-2 font-semibold text-gray-800"
      >
        {{ installments[0].card_family }} TAKSİT SEÇENEKLERİ
      </h4>
      <table class="w-full table-auto px-2">
        <thead>
          <tr
            class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            <th class="py-3 px-2 text-left"></th>
            <th class="py-3 px-2 text-left">Taksit</th>
            <th class="py-3 px-2 text-left">Taksit Tutarı</th>
            <th class="py-3 px-2 text-left">Toplam</th>
          </tr>
        </thead>
        <tbody class="text-gray-800 text-sm font-light">
          <tr
            class="border-b border-gray-200 hover:bg-gray-100"
            v-for="installment in installments"
            :key="installment.id"
          >
            <td class="py-3 pr-2 pl-4 text-left whitespace-nowrap">
              <div class="flex items-center">
                <input
                  type="radio"
                  class="form-radio"
                  v-model="localInstallment"
                  :checked="installment.id === selectedInstallment.id"
                  :value="installment"
                  name="installment"
                />
              </div>
            </td>
            <td class="py-3 px-2 text-left whitespace-nowrap">
              <div class="flex items-center">
                <span
                  class="font-medium"
                  v-html="installment.installment_number"
                ></span>
              </div>
            </td>
            <td class="py-3 px-2 text-left whitespace-nowrap">
              <div class="flex items-center">
                <span
                  class="font-medium"
                  v-html="installment.installment_price"
                ></span>
              </div>
            </td>
            <td class="py-3 px-2 text-left whitespace-nowrap">
              <div class="flex items-center">
                <span
                  class="font-medium"
                  v-html="installment.total_price"
                ></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["installments", "selectedInstallment"],

  computed: {
    localInstallment: {
      set(installment) {
        this.$emit("input", installment);
      },
      get() {
        return this.selectedInstallment;
      },
    },
  },
};
</script>
