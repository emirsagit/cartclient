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
    <button
      class="w-full px-4 py-2 bg-teal-800 text-white rounded-lg font-extrabold text-xl hover:bg-teal-700"
      :class="{
        'opacity-50 hover:bg-teal-800': !$parent.addressDetached,
      }"
      @click.prevent="$parent.isShowPaymentPage()"
    >
      Devam
    </button>
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
export default {
  props: ["addresses", "selectedAddress", "billingAddress"],

  components: {
    AddressChange,
    BillingAddress,
    SelectedAddress,
    AddressCreate,
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
        this.$parent.billingAddress = this.$parent.selectedAddress;
      }
    },

    selectedAddress() {
      if (this.billingAddressIsSame) {
        this.$parent.billingAddress = this.$parent.selectedAddress;
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
    this.$parent.billingAddress = this.defaultAddress;
  },

  methods: {
    switchAddress(address) {
      if (this.type == "billing") {
        this.$parent.billingAddress = address;
      } else {
        this.$parent.selectedAddress = address;
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
