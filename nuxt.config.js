export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  target: 'static',
  head: {
    title: 'TFW9s | Competitive Kids Rugby League 9s & Life Skills Program',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      {
          hid: 'description',
          name: 'description',
          content: 'TFW9s: The electric & competitive kids footy 9s concept. A safe, empowering environment where young athletes build resilience, life skills & community spirit.'
      },

      {
          hid: 'og:title',
          property: 'og:title',
          content: 'TFW9s | Competitive Kids Footy in a Safe Environment'
      },
      {
          hid: 'og:description',
          property: 'og:description',
          content: 'Empowering young athletes through electric 9s footy. Building great humans on and off the field. Join the TFW9s community.'
      },
      {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://i.imgur.com/V1scZcq.png'
      },
      {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://tfw9s.com.au/'
      },
      {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'TFW9s'
      },
      {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
      },

      {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
      },
      {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'TFW9s | Competitive Kids Footy in a Safe Environment'
      },
      {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Empowering young athletes through electric 9s footy. Building great humans on and off the field. Join the TFW9s community.'
      },
      {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://i.imgur.com/V1scZcq.png'
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
        href: 'https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:wght@400;700&display=swap',
        media: 'print',
        onload: "this.media='all'" 
      },
    ],
    script: [
      {
        src: 'https://js.stripe.com/v3',
        async: false,
        defer: false,
      },
      {
        hid: 'square-web-payments-sdk',
        type: 'text/javascript',
        src: `${process.env.ENVIRONMENT === 'production' ? 'https://web.squarecdn.com/v1/square.js' : 'https://sandbox.web.squarecdn.com/v1/square.js'}`,
        defer: true
      },
      {
        hid: 'force-clear-sw',
        innerHTML: `
          (function() {
            var CURRENT_VERSION = '1.8';
            var savedVersion = localStorage.getItem('app_version');
            if (savedVersion !== CURRENT_VERSION) {
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(regs) {
                  for(var i=0; i<regs.length; i++) { regs[i].unregister(); }
                  localStorage.setItem('app_version', CURRENT_VERSION);
                  if (savedVersion) window.location.reload(true);
                });
              } else {
                localStorage.setItem('app_version', CURRENT_VERSION);
              }
            }
          })();
        `,
        type: 'text/javascript',
        charset: 'utf-8'
      },
      {
        hid: 'error-handler',
        innerHTML: `
          window.onerror = function(msg, url, line, col, error) {
            if (msg.indexOf('Stripe') > -1) {
              console.warn('Stripe load failed. Attempting graceful recovery...');
              return true;
            }
          };
        `,
        type: 'text/javascript'
      },
    ],
    __dangerouslyDisableSanitizers: ['script']
  },

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
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/oruga.js' },
    { src: '~/plugins/croppa.js' },
    { src: '~/plugins/ChromePicker.js', mode: 'client' },
    { src: '~/plugins/PhotoshopPicker.js', mode: 'client' },
    { src: '~/plugins/vue-stripe.js', mode: 'client' },
    { src: '~/plugins/socket.js', mode: 'client' },
    { src: '~/plugins/version-check.client.js', mode: 'client' }
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
    '@nuxtjs/pwa',
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
    socketURL: process.env.SOCKET_URL,
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
        ...(process.env.ENVIRONMENT === 'production' ? { cssnano: {} } : {})
      }
    },
    babel: {
      plugins: [
        process.env.ENVIRONMENT === 'production'
          ? 'transform-remove-console'
          : ''
      ].filter(Boolean)
    }
  },

  pwa: {
    workbox: {
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: '/index.html',
      updateOnNavigation: true,
    }
  }
}