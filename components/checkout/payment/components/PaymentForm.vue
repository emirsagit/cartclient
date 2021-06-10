<template>
  <form class="p-4 pb-2 rounded bg-white">
    <div class="mb-3">
      <div class="flex flex-row text-sm mb-1">
        <label class="text-gray-800 mr-2" for="">Kart Sahibi</label>
        <span
          class="text-red-500 font-light text-xs"
          v-if="$v.localCard.cardHolder.$invalid"
          >(*)</span
        >
        <span
          class="bg-red-700 text-white px-2 rounded"
          v-if="errors.card_holder"
          >{{ errors.card_holder }}</span
        >
      </div>
      <input
        type="text"
        class="border border-gray-500 rounded-md inline-block py-2 px-2 w-full text-gray-800 tracking-widest"
        v-model="localCard.cardHolder"
        autocomplete="false"
        @keydown="clearError('card_holder')"
      />
    </div>
    <div class="mb-3">
      <div class="flex flex-row">
        <div class="flex flex-row text-sm mb-1">
          <label class="text-gray-800 mr-2" for="">Kart Numarası</label>
          <span
            class="text-red-500 font-light text-xs"
            v-if="$v.localCard.cardNumber.$invalid"
            >(*)</span
          >
          <span
            class="bg-red-700 text-white px-2 rounded"
            v-if="errors.card_number"
            >{{ errors.card_number }}</span
          >
        </div>
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
        @keydown="clearError('card_number')"
      />
    </div>
    <div class="mb-3 flex flex-wrap">
      <div class="w-2/3">
        <div class="flex flex-row text-sm mb-1">
          <label class="text-gray-800 mr-2" for=""
            >Son Kullanma Tarihi (AY - YIL)</label
          >
          <span
            class="text-red-500 font-light text-xs"
            v-if="
              $v.localCard.expirationMonth.$invalid ||
              $v.localCard.expirationYear.$invalid
            "
            >(*)</span
          >
          <span
            class="bg-red-700 text-white px-2 rounded"
            v-if="errors.expiration_month || errors.expiration_year"
            v-html="
              errors.expiration_month
                ? errors.expiration_month
                : errors.expiration_year
            "
          ></span>
        </div>
        <div class="flex">
          <input
            class="border border-gray-500 rounded-md inline-block py-2 px-2 w-full text-gray-800 tracking-widest mr-3"
            :value="localCard.expirationMonth"
            autocomplete="false"
            v-imask="monthMask"
            @accept="onAcceptMonth"
            placeholder="AY"
            @keydown="clearError('expiration_month')"
          />
          <input
            class="border border-gray-500 rounded-md inline-block py-2 px-2 w-full text-gray-800 tracking-widest"
            :value="localCard.expirationYear"
            autocomplete="false"
            v-imask="yearMask"
            @accept="onAcceptYear"
            placeholder="YIL"
            @keydown="clearError('expiration_year')"
          />
        </div>
      </div>
      <div class="w-1/3 pl-3">
        <div class="flex flex-row text-sm mb-1">
          <label class="text-gray-800 mr-2" for="">CVC</label>
          <span
            class="text-red-500 font-light text-xs"
            v-if="$v.localCard.cvc.$invalid"
            >(*)</span
          >
          <span
            class="bg-red-700 text-white px-2 rounded"
            v-if="errors.cvc"
            >{{ errors.cvc }}</span
          >
        </div>
        <input
          class="border border-gray-500 rounded-md inline-block py-2 px-2 w-full text-gray-800 tracking-widest"
          :value="localCard.cvc"
          autocomplete="false"
          v-imask="cvvMask"
          @accept="onAcceptCvv"
          @keydown="clearError('cvc')"
        />
      </div>
    </div>
    <div class="mb-3 flex flex-row justify-between">
      <div class="flex flex-row items-center" :class="{'opacity-75' : installment.force3ds}">
        <input type="checkbox" v-model="localCard.has3ds" :disabled="installment.force3ds"/>
        <label class="text-gray-800 ml-1 text-sm" for=""
          >3D Kullanmak istiyorum</label
        >
      </div>
      <span class="font-bold">{{ total }}</span>
    </div>
    <div class="text-xs text-red-500 my-4 h-4">
      <p v-if="$v.$invalid">
        (*) Siparişinizi tamamlamak için lütfen gerekli alanları doldurun.
      </p>
    </div>
    <div>
      <button
        type="submit"
        @click.prevent="finishPayment"
        :disabled="submitting || $v.$invalid"
        class="w-full text-ceenter px-2 py-3 text-xl font-bold bg-teal-800 rounded-md shadow-md text-white"
        :class="
          submitting || $v.$invalid
            ? 'opacity-75 hover:bg-teal-800'
            : 'hover:bg-teal-900'
        "
      >
        TAMAMLA
      </button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import { IMaskDirective } from "vue-imask";
import { cardMasks, cvvMask, monthMask, yearMask } from "@/assets/src/masks";
import { validationMixin } from "vuelidate";
import {
  required,
  numeric,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  props: ["total", "card", "submitting", "errors"],

  mixins: [validationMixin],

  directives: {
    imask: IMaskDirective,
  },

  data() {
    return {
      cardMasks: cardMasks,
      cvvMask: cvvMask,
      monthMask: monthMask,
      yearMask: yearMask,
      symbolImage: "",
    };
  },

  watch: {
    "$v.$invalid": function () {
      this.$emit("validation", this.$v.$invalid);
    },
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
      this.localCard.cvc = maskRef.value;
    },
    onAcceptMonth(e) {
      const maskRef = e.detail;
      this.localCard.expirationMonth = maskRef.value;
    },
    onAcceptYear(e) {
      const maskRef = e.detail;
      this.localCard.expirationYear = maskRef.value;
    },
    clearError(value) {
      if (this.errors[value]) {
        this.$emit("clearError", value);
      }
    },
  },

  computed: {
    ...mapGetters({
      installment: "cart/installment",
    }),

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

  validations: {
    localCard: {
      cardNumber: {
        required,
        minLength: minLength(15),
        maxLength: maxLength(16),
        numeric,
      },
      cardHolder: {
        required,
      },
      expirationMonth: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(2),
        numeric,
      },
      expirationYear: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(2),
        numeric,
      },
      cvc: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(4),
        numeric,
      },
    },
  },
};
</script>

