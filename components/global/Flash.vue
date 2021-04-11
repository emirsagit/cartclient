<template>
  <div
    class="fixed right-0 bottom-0 p-4 text-white rounded lg:text-lg mb-2 mr-2 flex flex-col items-center z-50"
    :class="classes"
    v-show="message"
  >
    <p>{{ message }}</p>
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
