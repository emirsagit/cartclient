<template>
  <form class="p-4 pb-2 rounded bg-white">
    <div class="mb-3">
      <label class="text-sm block mb-1 text-gray-800" for="">Kart Sahibi</label>
      <input
        type="text"
        class="border border-gray-500 rounded-md inline-block py-2 px-2 w-full text-gray-800 tracking-widest"
        v-model="localCard.cardHolder"
        autocomplete="false"
      />
    </div>
    <div class="mb-3">
      <div class="flex flex-row">
        <label class="text-sm block mb-1 text-gray-800 mr-3" for=""
          >Kart Numarası</label
        >
        <img
          :src="'/credit/' + symbolImage + '.png'"
          alt="kredi-kartı-simgesi"
          class="w-10 h-full"
          v-if="symbolImage && cardLength"
        />
      </div>
      <input
        class="border border-gray-500 rounded-md inline-block py-2 px-2 w-full text-gray-800 tracking-widest"
        :value="localCard.cardNumber"
        v-imask="cardMasks"
        @accept="onAcceptCardType"
        autocomplete="false"
        :unmask="true"
      />
    </div>
    <div class="mb-3 flex flex-wrap">
      <div class="w-2/3">
        <label class="text-sm block mb-1 text-gray-800" for=""
          >Son Kullanma Tarihi</label
        >
        <div class="flex">
          <select
            class="border border-gray-500 rounded-md inline-block py-2 px-2 w-full text-gray-800 tracking-widest mr-3"
            v-model="localCard.expirationMonth"
            autocomplete="false"
            placeholder="AY"
          >
            <option>Ay</option>
          </select>
          <select
            class="border border-gray-500 rounded-md inline-block py-2 px-2 w-full text-gray-800 tracking-widest"
            v-model="localCard.expirationYear"
            autocomplete="false"
            placeholder="YIL"
          >
            <option>Yıl</option>
          </select>
        </div>
      </div>
      <div class="w-1/3 pl-3">
        <label class="text-sm block mb-1 text-gray-800" for="">CVV</label>
        <input
          class="border border-gray-500 rounded-md inline-block py-2 px-2 w-full text-gray-800 tracking-widest"
          :value="localCard.cvv"
          autocomplete="false"
          v-imask="cvvMask"
          @accept="onAcceptCvv"
        />
      </div>
    </div>
    <div class="mb-3 text-right">
      <span class="text-right font-bold">{{ total }}</span>
    </div>
    <div>
      <button
        type="submit"
        @click.prevent="finishPayment"
        class="w-full text-ceenter px-2 py-3 text-xl font-bold bg-teal-900 rounded-md shadow-md text-white"
        :class="{
          'opacity-50 hover:bg-teal-800': submitting,
        }"
      >
        TAMAMLA
      </button>
    </div>
  </form>
</template>

<script>
import { IMaskDirective } from "vue-imask";
import { cardMasks, cvvMask } from "@/assets/src/masks";
export default {
  props: ["total", "card", "submitting"],

  directives: {
    imask: IMaskDirective,
  },

  data() {
    return {
      cardMasks: cardMasks,
      cvvMask: cvvMask,
      symbolImage: "",
    };
  },

  methods: {
    finishPayment() {
      this.$emit("charge");
    },

    onAcceptCardType(e) {
      const maskRef = e.detail;
      const type = maskRef.masked.currentMask.cardtype;

      if (type !== "Unknown") {
        this.symbolImage = type;
      }

      this.localCard.cardNumber = maskRef.unmaskedValue;
    },
    onAcceptCvv(e) {
      const maskRef = e.detail;
      this.localCard.cvv = maskRef.value;
    },
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

    cardLength() {
      if (this.localCard.cardNumber.length < 4) {
        return false;
      }
      return true;
    },
  },
};
</script>

