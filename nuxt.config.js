export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "cartclient",
    htmlAttrs: {
      lang: "tr"
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
  plugins: [
    // { src: '~/plugins/maz-ui' }
  ],
  
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
        url: "http://entegrasyon.test",
        endpoints: {
          login: { url: "/sanctum/token", method: "post" }
        },
        token: {
          property: "access_token",
          maxAge: 36000
        },
        scheme: "local",
        user: {
          property: "data",
          autoFetch: false
        }
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "http://entegrasyon.test/",
    credentials: true
  },

  env: {
    DEVICE_NAME: process.env.DEVICE_NAME || "browser"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "maz-ui",
            styleLibraryName: "css"
          }
        ]
      ]
    }
  }
};
