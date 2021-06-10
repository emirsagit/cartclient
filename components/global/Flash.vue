<template>
  <div
    class="fixed right-0 bottom-0 mb-2 mr-2 flex flex-col z-50"
    :class="classes"
    v-show="message"
  >
    <!-- <span
      class="text-right pt-2 px-4 text-white hover:text-gray-300 cursor-pointer"
      @click="hide"
      >X</span
    > -->
    <p class="px-4 py-4 text-white rounded lg:text-lg text-center">
      {{ message }}
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions({
      getCart: "cart/getCart",
      hide: "flash/hide",
    }),
  },

  computed: {
    classes() {
      return this.type == "success" ? "bg-green-400" : "bg-red-400";
    },
    ...mapGetters({
      message: "flash/message",
      type: "flash/type",
    }),
  },

  watch: {
    message() {
      if (this.message) {
        this.hide();
      }
    },
  },
};
</script>
