<template>
  <div
    class="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800"
  >
    <div
      class="flex flex-col max-w-screen-xl mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
    >
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
    }),
  },
};
</script>
