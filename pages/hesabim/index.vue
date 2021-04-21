<template>
  <div class="flex flex-col lg:mx-16 my-4 text-gray-800">
    <div class="p-2 bg-gray-200 flex text-xl justify-left items-center">
      <p>Merhaba {{ $auth.user.name }}</p>
    </div>
    <div
      class="flex flex-col lg:flex-row flex-wrap justify-center items-center mt-4 mx-4"
    >
      <nuxt-link
        to="hesabim/siparislerim"
        class="md:w-1/2 lg:w-1/4 bg-gray-700 hover:bg-gray-800 text-white text-center rounded p-2 text-lg font-bold lg:m-4 my-2 cursor-pointer w-full"
        >SİPARİŞLERİM</nuxt-link
      >
      <a
        @click.prevent="logout"
        class="md:w-1/2 lg:w-1/4 bg-gray-700 hover:bg-gray-800 text-white text-center rounded p-2 text-lg font-bold lg:m-4 my-2 cursor-pointer w-full"
        >ÇIKIŞ</a
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>
