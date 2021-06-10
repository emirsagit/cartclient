<template>
  <div class="bg-teal-800 min-h-screen px-2 py-4 md:px-0">
    <header class="max-w-lg mx-auto">
      <h1 class="text-4xl font-bold text-white text-center">Giriş Yap</h1>
    </header>
    <main
      class="bg-white max-w-lg mx-auto p-8 md:p-12 mt-4 rounded-lg shadow-2xl"
    >
      <section>
        <h3 class="font-bold text-2xl">Hoşgeldiniz</h3>
        <p class="text-gray-600 pt-2">
          Aşağıdaki formu kullanarak giriş yapabilirsiniz.
        </p>
      </section>

      <section class="mt-10">
        <form class="flex flex-col">
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="email"
              >E-posta Adresiniz</label
            >
            <input
              type="text"
              v-model="form.email"
              name="email"
              class="bg-yellow-200 rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-purple-600 transition duration-500 px-3 pb-3"
              :class="errors.email ? 'border-red-600' : 'border-gray-300'"
              @keydown="errors.email = null"
            />
            <p class="text-sm text-red-600 pl-3" v-if="errors.email">
              {{ errors.email[0] }}
            </p>
          </div>
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="password"
              >Şifreniz</label
            >
            <input
              type="password"
              id="password"
              v-model="form.password"
              class="bg-yellow-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
              :class="errors.password ? 'border-red-600' : 'border-gray-300'"
              @keydown="errors.password = null"
            />
            <p class="text-sm text-red-600 pl-3" v-if="errors.password">
              {{ errors.password[0] }}
            </p>
          </div>
          <button
            class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit"
            @click.prevent="login"
          >
            Giriş
          </button>
        </form>
      </section>
    </main>

    <div class="max-w-lg mx-auto text-center mt-12 mb-6">
      <p class="text-white">
        Hesabınız Yok Mu?
        <nuxt-link to="/register" class="font-bold hover:underline"
          >Üye Ol</nuxt-link
        >.
      </p>
    </div>

    <!-- <footer class="max-w-lg mx-auto flex justify-center text-white">
      <a href="#" class="hover:underline">Contact</a>
      <span class="mx-3">•</span>
      <a href="#" class="hover:underline">Privacy</a>
    </footer> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        device_name: process.env.DEVICE_NAME,
      },
      errors: {},
    };
  },

  methods: {
    ...mapActions({
      getCart: "cart/getCart",
    }),

    async login() {
      try {
        await this.$axios.get("/sanctum/csrf-cookie");
        await this.$auth.loginWith("laravelSanctum", {
          data: this.form,
        });
        await this.getCart();
        // await this.$auth.strategy.token.set(response_data.data.token);
        // await this.$auth.setUser(response.data.user);
      } catch (error) {
        console.log(error);
        // this.errors = error.response.data.errors;
      }
    },
  },
};
</script>
