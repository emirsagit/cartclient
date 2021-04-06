<template>
  <div class="flex flex-col">
    <selected-address
      v-if="!selecting && selectedAddress && !creating"
      :selectedAddress="selectedAddress"
      :hasMultipleAddresses="hasMultipleAddresses"
      @changeAddress="changeAddressRequest"
      @addAddress="addAddressRequest"
    />
    <billing-address
      v-if="!selecting && selectedAddress && !billingAddressIsSame && !creating"
      :billingAddress="billingAddress"
      :hasMultipleAddresses="hasMultipleAddresses"
      @changeAddress="changeAddressRequest"
      @addAddress="addAddressRequest"
    />
    <go-payment-button
      class="rounded-lg"
      :class="{
        'opacity-50 hover:bg-teal-800': !$parent.addressDetached,
      }"
      @clicked="$parent.isShowPaymentPage()"
      v-if="!creating && !selecting"
    />
    <address-change
      v-if="selecting && hasMultipleAddresses"
      :localAddresses="localAddresses"
      :address-has-changed="switchAddress"
    />
    <address-create
      v-if="creating || !selectedAddress"
      @created="addressHasCreated"
    />
  </div>
</template>

<script>
import AddressChange from "./AddressChange.vue";
import BillingAddress from "./BillingAddress.vue";
import SelectedAddress from "./SelectedAddress.vue";
import AddressCreate from "./AddressCreate.vue";
import GoPaymentButton from "../form/GoPaymentButton.vue";
export default {
  props: ["addresses", "selectedAddress", "billingAddress"],

  components: {
    AddressChange,
    BillingAddress,
    SelectedAddress,
    AddressCreate,
    GoPaymentButton,
  },

  data() {
    return {
      localAddresses: this.addresses,
      selecting: false,
      creating: false,
      billingAddressIsSame: true,
      type: "delivery",
    };
  },

  watch: {
    billingAddressIsSame() {
      if (this.billingAddressIsSame) {
        this.$parent.form.billingAddress = this.$parent.form.selectedAddress;
      }
    },

    selectedAddress() {
      if (this.billingAddressIsSame) {
        this.$parent.form.billingAddress = this.$parent.form.selectedAddress;
      }
    },
  },

  computed: {
    defaultAddress() {
      return this.localAddresses.find((address) => {
        return address.is_default === true;
      });
    },

    hasMultipleAddresses() {
      return this.addresses.length > 1;
    },
  },

  created() {
    this.switchAddress(this.defaultAddress);
    this.$parent.form.billingAddress = this.defaultAddress;
  },

  methods: {
    switchAddress(address) {
      if (this.type == "billing") {
        this.$parent.form.billingAddress = address;
      } else {
        this.$parent.form.selectedAddress = address;
      }
    },

    changeAddressRequest(type) {
      this.type = type;
      this.selecting = true;
    },

    addAddressRequest(type) {
      this.type = type;
      this.creating = true;
    },

    addressHasCreated(address) {
      this.localAddresses.push(address);
      this.switchAddress(address);
      this.creating = false;
    },
  },
};
</script>
