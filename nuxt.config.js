export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TFW Rugby League',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: '',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: '',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '',
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'TFW Website',
      },
      {
        name: 'google-site-verification',
        content: 'KninbX5hpjrkV2j6g1xc7Hix4ahJTxeRzQYylzQGga0'
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
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
        href: 'https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:wght@400;700&display=swap'
      }
    ],
    script: [
      { src: 'https://js.stripe.com/v3' },
      {
        hid: 'square-web-payments-sdk',
        type: 'text/javascript',
        src: `${process.env.ENVIRONMENT === 'production' ? 'https://web.squarecdn.com/v1/square.js' : 'https://sandbox.web.squarecdn.com/v1/square.js'}`
      }
    ]
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'server',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css'
  ],

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
    { src: '~/plugins/ChromePicker.js', mode: 'client' },
    { src: '~/plugins/PhotoshopPicker.js', mode: 'client' },
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
    paypal: {
      clientId: process.env.PAYPAL_CLIENT_ID
    },
    square: {
      appId: process.env.SQUARE_APPLICATION_ID,
      locationId: process.env.SQUARE_LOCATION_ID,
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
  sitemap: function () {
    if (process.env.ENVIRONMENT.toLowerCase() === 'production') {
      return {
        hostname: process.env.BASE_URL,
        gzip: true,
        exclude: [
          '/admin',
          '/manage',
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
