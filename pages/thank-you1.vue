<template>
  <div class="h-full">
    <BaseHeader class="from-brand-green to-brand-black bg-gradient-to-r">
      <div
        class="
          col-span-12
          mt-12
          space-y-3
          px-2
          text-center
          sm:space-y-3
          sm:px-6 sm:text-left
          lg:col-span-6
          xl:mt-10
        "
      >
        <span
          class="
            superheadline
            flex flex-row
            items-center
            pb-3
            text-[1rem]
            font-normal
          "
        >
          <span class="font-medium text-white">
            <NuxtLink to="/">
                <VBtn text color="white">Home</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-3xl font-bold text-white lg:text-6xl">
          {{ bannerText }}
        </h1>
      </div>
    </BaseHeader>

    <div class="flex flex-col items-center justify-center px-8 py-20">
      <template v-if="status === 'loading'">
        <VProgressCircular
          size="125"
          width="10"
          indeterminate
          color="gray lighten-2"
        />
        <div class="mt-8 text-2xl font-bold text-white">
          Finalizing your payment...
        </div>
        <div class="text-base text-gray-300">
          Please do not close your browser until this is done.
        </div>
      </template>

      <template v-else-if="status === 'success'">
        <VIcon size="150" color="green">
          mdi-check-circle
        </VIcon>
        <div class="mt-8 text-2xl font-bold text-white">
          Payment Success!
        </div>
        <div class="text-base text-gray-300">
          You can go back to the Tournaments to continue the registration
        </div>
                <div class="mt-4 flex items-center justify-center">
        <span
          v-if="transactionUrl"
          class="mx-2 cursor-pointer rounded bg-gradient-to-tr
          from-[#5EE738] via-[#3e872a] to-[#050505] px-4 py-2 text-white"
          @click="redirectTo(transactionUrl)"
          >
            Registration Details
          </span>
        </div> 
        <div class="mt-4 flex items-center justify-center">
          <NuxtLink to="/tournaments">
            <span
              class="bg-brand-black mx-2 cursor-pointer rounded px-4 py-2 text-white"
            >
              Tournaments
            </span>
          </NuxtLink>
        </div>
      </template>

      <template v-else-if="status === 'processing'">
        <VIcon size="150" color="blue lighten-2">
          mdi-information
        </VIcon>
        <div class="mt-8 text-2xl font-bold text-white">
          Payment is still being processed
        </div>
        <div class="text-base text-gray-300">
          Please refresh this tab in a few minutes.
          Do not close this tab
        </div>
        <div class="mt-4 flex items-center justify-center">
          <span
            class="bg-brand-black mx-2 cursor-pointer px-4 py-2 text-white"
            @click="verify"
          >
            Refresh
          </span>
        </div>
      </template>

      <template v-else>
        <VIcon size="150" color="red darken-2">
          mdi-alert-circle
        </VIcon>
        <div class="mt-8 text-2xl font-bold text-white">
          Your payment failed
        </div>
        <div class="text-base text-gray-300">
          You can go back to the Tournaments to continue the registration
          or attempt to checkout again
        </div>
        <div class="mt-4 flex items-center justify-center">
          <NuxtLink to="/tournaments">
            <span
              class="bg-brand-black mx-2 cursor-pointer px-4 py-2 text-white"
            >
              Tournaments
            </span>
          </NuxtLink>
          <NuxtLink to="/register">
            <span
              class="bg-brand-black mx-2 cursor-pointer px-4 py-2 text-white"
            >
              Checkout
            </span>
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
const GATEWAY_STRIPE = 'stripe'
const GATEWAY_PAYPAL = 'paypal'
const GATEWAY_SQUARE = 'square'
const GATEWAY_AFTERPAY = 'afterpay'

const SUPPORTED_GATEWAYS = [
  GATEWAY_STRIPE,
  GATEWAY_PAYPAL,
  GATEWAY_AFTERPAY
  // GATEWAY_SQUARE,
]

export default {
  data() {
    return {
      status: 'loading',
      transactionId: null,
      paymentGateway: null,
      bannerText: 'Verifying Order',
      transactionUrl: '',
    }
  },
  computed: {
    base64IMG: {
      get() {
        return this.$store.state.registration.base64IMG;
      },
    },
  },
  mounted() {
    if (typeof this.$route.query.payment_intent !== 'undefined') {
      this.paymentGateway = GATEWAY_STRIPE
      this.transactionId = this.$route.query.payment_intent
    } else if (typeof this.$route.query.paypal_transaction_id !== 'undefined') {
      this.paymentGateway = GATEWAY_PAYPAL
      this.transactionId = this.$route.query.paypal_transaction_id
    } else if (typeof this.$route.query.square_transaction_id !== 'undefined') {
      this.paymentGateway = GATEWAY_SQUARE
      this.transactionId = this.$route.query.square_transaction_id
    } else if (typeof this.$route.query.afterpay_transaction_id !== 'undefined') {
      this.paymentGateway = GATEWAY_AFTERPAY
      this.transactionId = this.$route.query.afterpay_transaction_id
    } else {
      this.status = 'failed'
      this.bannerText = 'Could not find transaction'
    }

    this.$nextTick(() => {
      const amount = Number(this.$route.query.amount);
      if (amount !== 0) {
        this.verify()
      } else {
        this.verifyFullyDiscountedTransaction();
      }
    })
  },
  methods: {
    verifyFullyDiscountedTransaction() {
      const amount = Number(this.$route.query.amount);
      this.transactionId = this.$route.query.transactionID
      this.status = 'loading'
      setTimeout(() => {
        if (amount === 0) {
          this.status = 'success'
          this.bannerText = 'Thank you'
          this.$store.dispatch('cart/clearCart')
          this.generateTransactionURL();
          if (this.base64IMG) {
            this.saveRegistrationImage(this.base64IMG);
          }
        }
      }, 500)
    },
    verify() {
      const amount = this.$route.query.amount
      if (SUPPORTED_GATEWAYS.includes(this.paymentGateway) && amount !== 0) {
        this.status = 'loading'
        let endpoint = ''

        if (this.$route.query.seriesType === 'weekly') {
          endpoint = '/v1/tournament/indiv/verify'
        } else {
          endpoint = '/v1/tournament/team/verify'
        }

        this.$axios
          .$post(endpoint, {
            // eslint-disable-next-line camelcase
            transaction_id: this.transactionId,
            // eslint-disable-next-line camelcase
            payment_method: this.paymentGateway,
          })
          .then((response) => {
            const status = response.data.status
            if (status === 'complete') {
              this.status = 'success'
              this.bannerText = 'Thank you'
              this.$store.dispatch('cart/clearCart')
              this.generateTransactionURL();
              if (this.base64IMG) {
                this.saveRegistrationImage(this.base64IMG);
              }
            } else if (status === 'processing') {
              this.status = 'processing'
              this.bannerText = 'Order is being processed'
            } else {
              this.status = 'failed'
              this.bannerText = 'Order failed'
            }
          })
          .catch((err) => {
            console.log(err.message)
            this.status = 'failed'
            this.bannerText = 'Order failed'
          })

      } else {
        this.status = 'failed'
        this.bannerText = 'Order failed'
      }
    },
    generateTransactionURL() {
      const formData = new FormData();
      formData.append('type', this.$route.query.seriesType);
      formData.append('transaction', this.transactionId);
      this.$axios
        .$post('v1/transaction/generate', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.transactionUrl = response.data.url
        })
    },
    saveRegistrationImage(base64Image) {
      // Convert base64 string to Blob
      const byteString = atob(base64Image.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // Create Blob from binary data
      const media = new Blob([ ia ], { type: 'image/jpeg' });

      // Build FormData
      const formData = new FormData();
      formData.append('type', this.$route.query.seriesType);
      formData.append('transaction', this.transactionId);
      formData.append('photo', media, 'photo.jpg'); // Filename is optional but recommended

      this.$axios
        .$post('v1/transaction/savemedia', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.$store.commit('registration/setBase64IMG', '');
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    },
    redirectTo(url) {
      if (url) window.open(url, '_blank')
    },

  },
}
</script>