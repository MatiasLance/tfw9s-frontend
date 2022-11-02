export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'StraddieWorld',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Photo images of North Stradbroke Island (Minjerribah), and other places. Canvas art for wall decoration. Home to Mal-apause Surf Wear.'
      },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Straddie World',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'Photo images of North Stradbroke Island (Minjerribah), and other places. Canvas art for wall decoration. Home to Mal-apause Surf Wear.',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://i.imgur.com/1fUeNUK.jpg',
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'Straddie World',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com'
      },
      {
        rel: 'stylesheet', 
        href: 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:wght@400;700&display=swap'
      }
    ],
    script: [
      { src: 'https://js.stripe.com/v3' }
    ]
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'server',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vuex-persist.js',
      mode: 'client',
    },
    {
      src: '~/plugins/axios.js',
    },
    { src: '~/plugins/oruga.js' },
    { src: '~/plugins/croppa.js' },
    { src: '~/plugins/vue-stripe.js', mode: 'client' },
  ],

  router: {
    middleware: ['auth'],
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxt/postcss8',
    '@oruga-ui/oruga/nuxt',
    '@nuxtjs/sitemap',
  ],

  publicRuntimeConfig: {
    axios: {
      baseUrl: process.env.BACKEND_URL + process.env.API_PATH,
      credentials: true,
      withCredentials: true,
    },
    stripe: {
      liveEnvironment: process.env.STRIPE_LIVE_ENVIRONMENT,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      account: process.env.STRIPE_ACCOUNT,
      apiVersion: process.env.STRIPE_API_VERSION,
      locale: process.env.STRIPE_LOCALE,
    },
    environment: process.env.ENVIRONMENT,
    baseURL: process.env.BASE_URL,
    apiURL: process.env.BACKEND_URL + process.env.API_PATH,
    persistentVuexModules: process.env.PERSISTENT_VUEX_MODULES.split(','),
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    headers: {
      common: {
        'Accept': 'application/json'
      }
    },
  },

  // Vuetify module: https://github.com/nuxt-community/vuetify-module#options
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    optionsPath: './vuetify.options.js'
  },

  // Nuxt sitemap generator: https://www.npmjs.com/package/@nuxtjs/sitemap
  sitemap: function() {
    if (process.env.ENVIRONMENT.toLowerCase() === 'production') {
      return {
        hostname: process.env.BASE_URL,
        gzip: true,
        exclude: [
          '/admin',
          '/admin/**',
          '/login',
          '/forgot-password',
          '/reset-password',
          '/signup',
          '/checkout',
        ],
      }
    } else {
      return false
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      }
    }
  },
}
