<template>
  <div
    class="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800"
  >
    <div class="flex flex-col max-w-screen-xl mx-auto md:px-6 lg:px-8">
      <div class="flex flex-col items-end">
        <div class="flex flex-row font-bold py-1 items-center">
          <template v-if="this.$auth.loggedIn">
            <p class="px-2">Merhaba {{ this.$auth.user.name }}</p>
            <nuxt-link
              to="/hesabim"
              class="px-2 text-teal-700 hover:text-teal-800 cursor-pointer"
              >Hesabım</nuxt-link
            >
            <nuxt-link
              to="/sepet"
              class="pl-2 pr-6 flex flex-row cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="black"
                class="h-8 w-8"
              >
                <path
                  d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                />
              </svg>
              <p
                class="text-sm font-bold font-sans text-white bg-red-700 rounded-full absolute px-2 ml-6"
                v-if="cartCount > 0"
                v-text="cartCount"
              ></p>
            </nuxt-link>
          </template>
          <template v-else>
            <nuxt-link
              to="/login"
              class="px-2 text-blue-700 hover:text-blue-800"
              >Giriş</nuxt-link
            >
            <nuxt-link
              to="/register"
              class="px-2 text-teal-700 hover:text-teal-800"
              >Kayıt</nuxt-link
            >
            <a href="#" class="pl-2 pr-6 flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="black"
                class="h-8 w-8"
              >
                <path
                  d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                />
              </svg>
              <p
                class="text-sm font-bold font-sans text-white bg-red-700 rounded-full absolute px-2 ml-6"
                v-if="cartCount"
                v-text="cartCount"
              ></p>
            </a>
          </template>
        </div>
      </div>
      <div class="flex flex-col md:items-center md:justify-between md:flex-row">
        <div class="p-4 flex flex-row items-center justify-between">
          <nuxtLink
            to="/"
            class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
            >BaskıTasarım</nuxtLink
          >
          <button
            class="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
            @click="showMenu = !showMenu"
          >
            <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
              <path
                v-show="!showMenu"
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <nav
          :class="{
            'flex h-screen w-full absolute top-0': showMenu,
            hidden: !showMenu,
          }"
          class="flex-col flex-grow md:flex md:justify-end md:flex-row z-50 bg-white p-4"
        >
          <button
            class="md:hidden rounded-lg focus:outline-none focus:shadow-outline flex flex-col items-end"
            @click="showMenu = !showMenu"
          >
            <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
              <path
                v-show="showMenu"
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <template v-for="category in categories">
            <nuxtLink
              class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              :to="`/kategori/${category.slug}`"
              v-if="!category.children.length"
              v-text="category.name"
              :key="category.slug"
            ></nuxtLink>
            <div class="relative" v-else :key="category.slug">
              <button
                @click="dropDownOpen = !dropDownOpen"
                class="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                <span v-text="category.name"></span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  :class="{
                    'rotate-180': dropDownOpen,
                    'rotate-0': !dropDownOpen,
                  }"
                  class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <div
                v-show="dropDownOpen"
                class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48"
              >
                <div
                  class="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800"
                >
                  <template v-for="child in category.children">
                    <nuxtLink
                      class="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      :to="`/kategori/${child.slug}`"
                      v-text="child.name"
                      :key="child.slug"
                      @click.native="dropDownOpen = false"
                    ></nuxtLink>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </nav>
      </div>
    </div>
  </div>
</template> 


<script>
import { mapGetters } from "vuex";

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      dropDownOpen: false,
    };
  },

  computed: {
    ...mapGetters({
      categories: "categories",
      cartCount: "cart/count",
    }),
  },
};
</script>
