export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "cartclient",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next"
  ],

  auth: {
    redirect: {
      login: "/login",
      logout: "/",
      callback: false,
      home: "/"
    },

    strategies: {
      laravelSanctum: {
        provider: "laravel/sanctum",
        url: "http://laravel.loc",
        endpoints: {
          login: { url: "/sanctum/token", method: "post" }
        },
        token: {
          property: "access_token",
          maxAge: 3600
        },
        scheme: "local",
        user: {
          property: 'data',
          autoFetch: false
        },
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: process.env.BASE_URL || "http://laravel.loc/api/",
    credentials: true
  },

  env: {
    DEVICE_NAME: process.env.DEVICE_NAME || "browser"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
