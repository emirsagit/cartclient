<template>
  <div class="flex flex-col my-6 p-4 lg:p-8">
    <payment-header />
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
        <payment
          v-if="showPayment"
          :total="total"
          :card="card"
          :submitting="submitting"
          @charge="order"
          v-model="card"
          :errors="errors"
          @validation="changeValidation"
          @clearError="clearError"
        />
        <installment
          :installments="installments"
          v-if="showPayment && installments"
          v-model="selectedInstallment"
          :selectedInstallment="selectedInstallment"
        />
      </div>
      <div
        class="w-full lg:pl-4 lg:relative lg:w-2/5 flex flex-col mt-4 lg:mt-0"
      >
        <payment-overview />
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
            :class="
              submitting || cardInvalid
                ? 'opacity-75 hover:bg-teal-800'
                : 'hover:bg-teal-900'
            "
            v-if="showPayment"
            :disabled="submitting || cardInvalid"
          />

          <!-- add paymentValidate next time -->
        </div>
      </div>
    </div>
    <div v-html="secure">{{ secure }}</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import Payment from "../../components/checkout/payment/Payment.vue";
import PaymentHeader from "../../components/checkout/payment/components/PaymentHeader.vue";
import Addresses from "../../components/checkout/addresses/Addresses.vue";
import GoPaymentButton from "../../components/checkout/form/GoPaymentButton.vue";
import FinishPaymentButton from "../../components/checkout/form/FinishPaymentButton.vue";
import Shipping from "../../components/checkout/shipping/Shipping.vue";
import Installment from "../../components/checkout/payment/components/Installment.vue";
import PaymentOverview from "../../components/checkout/payment/components/PaymentOverview.vue";

export default {
  components: {
    Payment,
    Addresses,
    GoPaymentButton,
    FinishPaymentButton,
    Shipping,
    PaymentHeader,
    Installment,
    PaymentOverview,
  },

  data() {
    return {
      showPayment: false,
      submitting: false,
      addresses: [],
      cities: [],
      shippings: "",
      cardInvalid: true,
      secure: "",
      order_id: "",
      installments: "",
      existingCardNumber: "",
      errors: {},
      form: {
        selectedAddress: "",
        billingAddress: "",
        payAtDoor: false,
      },
      card: {
        cardHolder: "",
        cardNumber: "",
        expirationYear: "",
        expirationMonth: "",
        cvc: "",
        has3ds: false,
      },
    };
  },

  computed: {
    ...mapGetters({
      subtotal: "cart/subtotal",
      total: "cart/total",
      isEmpty: "cart/isEmpty",
      shipping: "cart/shipping",
      installment: "cart/installment",
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

    selectedInstallment: {
      get() {
        return this.installment ? this.installment : "";
      },
      set(value) {
        this.setInstallment(value);
      },
    },

    cardLength() {
      return this.card.cardNumber.length;
    },

    isRetrieveInstallments() {
      return this.existingCardNumber != this.card.cardNumber.substr(0, 6);
    },
  },

  watch: {
    shippingMethod() {
      this.getCart();
      this.reset();
    },

    selectedInstallment() {
      this.getCart();
      this.card.has3ds = this.selectedInstallment.force3ds;
    },

    cardLength() {
      if (this.installment && this.cardLength < 6) {
        this.setInstallment("");
        this.installments = "";
        this.existingCardNumber = "";
      }

      if (this.cardLength >= 6 && this.isRetrieveInstallments) {
        this.installmentRequest();
      }
    },

    installments() {
      if (this.installments) {
        this.setInstallment(
          this.installments.find((ins) => {
            return ins.installment_number == 1;
          })
        );
      }
    },

    subtotal() {
      this.reset();
      if (this.isEmpty) {
        this.$router.replace("sepet");
      }
    },
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
    ...mapActions({
      setShipping: "cart/setShipping", //also supports payload `this.nameOfAction(amount)`
      getCart: "cart/getCart", //also supports payload `this.nameOfAction(amount)`
      setMessage: "flash/setMessage",
      setInstallment: "cart/setInstallment",
    }),

    async installmentRequest() {
      try {
        this.existingCardNumber = this.card.cardNumber.substr(0, 6);
        var response = await this.$axios.$post("api/payment/installment", {
          card_number: this.card.cardNumber,
          shipping_id: this.shippingMethod.id,
        });
        this.installments = response.data;
      } catch {}
    },

    async order() {
      this.submitting = true;

      try {
        var response = await this.$axios.$post("api/orders", {
          delivery_id: this.form.selectedAddress.id,
          billing_id: this.form.billingAddress.id,
          pay_at_door: this.form.payAtDoor,
          shipping_id: this.shippingMethod.id,
          selected_address: this.form.selectedAddress,
          billing_address: this.form.billingAddress,
          card_holder: this.card.cardHolder,
          card_number: this.card.cardNumber,
          expiration_year: this.card.expirationYear,
          expiration_month: this.card.expirationMonth,
          has3ds: this.card.has3ds,
          cvc: this.card.cvc,
          installment_id: this.installment.id,
        });
        if (this.card.has3ds) {
          await (this.secure = response);
          document.getElementById("iyzico-3ds-form").submit();
        }
        await this.getCart();
        // await (this.order_id = response.data.id);
        this.$router.replace({
          name: "odeme-sonrasi-order-id",
          params: { id: response.data.id },
        });
      } catch (error) {
        if (error.response) {
          let data = error.response.data;
          if (data.message) {
            await this.setMessage(data.message);
            this.errors.card_holder = data.errors.card_holder
              ? data.errors.card_holder[0]
              : "";
            this.errors.card_number = data.errors.card_number
              ? data.errors.card_number[0]
              : "";
            this.errors.expiration_year = data.errors.expiration_year
              ? data.errors.expiration_year[0]
              : "";
            this.errors.expiration_month = data.errors.expiration_month
              ? data.errors.expiration_month[0]
              : "";
            this.errors.cvc = data.errors.cvc ? data.errors.cvc[0] : "";
            await this.getCart();
            this.submitting = false;
          } else {
            //error came from payment gateway
            await this.setMessage(data);
            this.submitting = false;
          }
        }
      }
    },

    isShowPaymentPage() {
      if (this.addressDetached) {
        this.showPayment = true;
      }
    },

    reset() {
      this.installments = "";
      this.card.cardNumber = "";
      this.setInstallment("");
      this.existingCardNumber = "";
    },

    changeValidation(isValid) {
      this.cardInvalid = isValid;
    },

    clearError(parameter) {
      console.log(parameter);
      console.log(this.errors[parameter]);
      this.errors[parameter] = "";
    },
  },

  created() {
    if (this.shippings) {
      this.setShipping(this.shippings[0]);
      this.getCart();
    }

    if (this.$route.query.failure) {
      this.setMessage(this.$route.query.failure);
    }
  },
};
</script>