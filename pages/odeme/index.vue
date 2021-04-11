<template>
  <div class="flex flex-col my-6 p-4 lg:p-8">
    <div class="w-full h-16 flex flex-row">
      <div
        class="w-1/2 bg-gray-200 text-xl flex items-center justify-center cursor-pointer"
        :class="{ 'bg-gray-700 text-white': !showPayment }"
        @click.prevent="showPayment = false"
      >
        <p>ADRES</p>
      </div>
      <div
        class="w-1/2 bg-gray-200 text-xl flex items-center justify-center cursor-pointer"
        :class="{ 'bg-gray-700 text-white': showPayment }"
        @click.prevent="isShowPaymentPage()"
      >
        <p>ÖDEME</p>
      </div>
    </div>
    <div class="h-6 bg-gray-400">
      <div
        class="h-full flex justify-center items-center w-1/2 bg-teal-800 text-white"
        :class="{ 'w-full': showPayment }"
      >
        <p class="" v-if="!showPayment">%50</p>
        <p class="" v-else>%100</p>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row my-4">
      <div class="flex flex-col w-full text-gray-800 bg-white lg:w-3/5">
        <addresses
          :addresses="addresses"
          :selectedAddress="form.selectedAddress"
          :billingAddress="form.billingAddress"
          v-if="!showPayment"
        />
        <shipping
          v-if="showPayment"
          :shippings="shippings"
          v-model="shippingMethod"
          :selectedShipping="shippingMethod"
        />
        <payment v-if="showPayment" />
      </div>
      <div
        class="w-full lg:pl-4 lg:relative lg:w-2/5 flex flex-col mt-4 lg:mt-0"
      >
        <div class="rounded flex flex-col w-full border">
          <p
            class="text-gray-800 bg-gray-400 w-full text-center py-2 font-semibold"
          >
            SİPARİŞ ÖZETİ
          </p>
          <total-overview></total-overview>
        </div>
        <div
          class="flex w-full flex-col px-2 lg:px-8 text-gray-900 items-start border py-2"
        >
          <p class="text-gray-700 text-md mb-1">Ara Toplam: {{ subtotal }}</p>
          <p class="text-gray-700 text-md mb-1" v-if="shippingMethod">
            Kargo Ücreti: {{ shippingMethod.price }}
          </p>
        </div>
        <div
          class="fixed bottom-0 lg:relative bg-white z-30 flex w-full flex-row justify-around lg:justify-between px-1 md:px-2 lg:px-8 text-gray-900 items-center border"
        >
          <p class="text-gray-900 text-xl flex flex-row mr-4">
            Toplam: <span class="font-bold"> {{ total }}</span>
          </p>
          <go-payment-button
            @clicked="isShowPaymentPage()"
            class="lg:rounded-lg rounded-t"
            :class="{
              'opacity-50 hover:bg-teal-800': !addressDetached,
            }"
            v-if="!showPayment"
          />
          <finish-payment-button
            @clicked="order()"
            class="lg:rounded-lg rounded-t"
            :class="{
              'opacity-50 hover:bg-teal-800': submitting,
            }"
            v-if="showPayment"
          />

          <!-- add paymentValidate next time -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TotalOverview from "../../components/checkout/total/TotalOverview.vue";
import Payment from "../../components/checkout/payment/Payment.vue";
import Addresses from "../../components/checkout/addresses/Addresses.vue";
import GoPaymentButton from "../../components/checkout/form/GoPaymentButton.vue";
import FinishPaymentButton from "../../components/checkout/form/FinishPaymentButton.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import Shipping from "../../components/checkout/shipping/Shipping.vue";

export default {
  computed: {
    ...mapGetters({
      subtotal: "cart/subtotal",
      total: "cart/total",
      isEmpty: "cart/isEmpty",
      shipping: "cart/shipping",
    }),

    addressDetached() {
      return this.addresses.length > 0 && !this.isEmpty;
    },

    shippingMethod: {
      get() {
        return this.shipping ? this.shipping : "";
      },
      set(value) {
        this.setShipping(value);
      },
    },
  },

  watch: {
    shippingMethod() {
      this.getCart();
    },
  },

  data() {
    return {
      showPayment: false,
      submitting: false,
      addresses: [],
      cities: [],
      shippings: "",
      payAtDoor: false,
      paymentValidate: false,
      form: {
        selectedAddress: "",
        billingAddress: "",
      },
    };
  },

  async asyncData({ app }) {
    let response = await app.$axios.$get("api/addresses");
    let cities = await app.$axios.$get("api/cities");
    let shippings = await app.$axios.$get("api/shippings");
    return {
      addresses: response.data,
      cities: cities.data,
      shippings: shippings.data,
    };
  },

  methods: {
    isShowPaymentPage() {
      if (this.addressDetached) {
        this.showPayment = true;
      }
    },

    async order() {
      this.submitting = true;

      try {
        await this.$axios.$post("api/order", {
          delivery_id: this.form.selectedAddress.id,
          billing_id: this.form.billingAddress.id,
          shipping_id: this.shippingMethod.id,
          pay_at_door: this.payAtDoor,
        });
        await this.getCart();
        this.$router.replace("siparislerim");
      } catch (error) {
        await this.setMessage(error.response.data.message);
        await this.getCart();
        this.$router.replace('sepet');
      }
    },

    ...mapActions({
      setShipping: "cart/setShipping", //also supports payload `this.nameOfAction(amount)`
      getCart: "cart/getCart", //also supports payload `this.nameOfAction(amount)`
      setMessage: "flash/setMessage",
    }),
  },

  components: {
    TotalOverview,
    Payment,
    Addresses,
    GoPaymentButton,
    FinishPaymentButton,
    Shipping,
  },

  created() {
    if (this.shippings) {
      this.setShipping(this.shippings[0]);
      this.getCart();
    }
  },
};
</script>