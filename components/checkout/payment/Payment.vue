<template>
  <div class="mt-4 border rounded">
    <div class="bg-gray-400 text-center">
      <p
        class="text-gray-800 bg-gray-400 w-full text-center py-2 font-semibold"
      >
        KART BİLGİLERİ
      </p>
    </div>
    <payment-form
      :card="localCard"
      :total="total"
      :submitting="submitting"
      @charge="$emit('charge')"
      v-model="localCard"
      :errors="errors"
      @validation="isValid"
      @clearError="clearError"
    />
    <button
      class="bg-gray-200 hover:bg-gray-300 text-sm p-2 rounded-lg ml-4 mb-4"
      @click.prevent="$parent.showPayment = false"
    >
      Geri
    </button>
  </div>
</template>
<script>
import PaymentForm from "./components/PaymentForm.vue";
export default {
  components: { PaymentForm },
  props: ["total", "card", "submitting", "errors"],

  data() {
    return {
      name: "",
      cardNumber: "",
      expiration: "",
      security: "",
    };
  },

  computed: {
    localCard: {
      get() {
        return this.card;
      },
      set(localCard) {
        this.$emit("input", localCard);
      },
    },
  },

  methods: {
    isValid(isValid) {
      console.log(isValid);
      this.$emit('validation', isValid)
    },
    clearError(value) {
      this.$emit('clearError', value)
    }
  },
};
</script>