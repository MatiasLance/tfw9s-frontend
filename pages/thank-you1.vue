<template>
  <div class="h-full">
    <BaseHeader
      class="mx-auto max-w-full gap-4 relative overflow-hidden
      bg-gradient-to-br from-green-900 via-green-700 to-gray-900 lg:px-8"
    >
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-1/2 left-0 w-full h-1 bg-white/40 animate-pulse"></div>
      </div>

      <div class="col-span-12 text-center lg:col-span-6 relative z-10" data-aos="fade-right">
        <span class="flex flex-row items-center text-[1rem] font-normal text-white">
          <NuxtLink to="/">
            <VBtn text color="white" class="hover:scale-105 transition-transform">
              <i class="ri-home-4-line mr-2"></i>Home
            </VBtn>
          </NuxtLink>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl drop-shadow-lg">
          🏉 {{ bannerText }}
        </h1>
      </div>
    </BaseHeader>

    <div class="flex flex-col items-center justify-center px-8 py-20">
      <template v-if="status === 'loading'">
        <VProgressCircular size="125" width="10" indeterminate color="green lighten-2" />
        <div class="mt-8 text-2xl font-bold text-white">
          {{ bannerText }}
        </div>
        <div class="text-base text-gray-300">
          Please do not close your browser. Confirming with the bank...
        </div>
      </template>

      <template v-else-if="status === 'success'">
        <VIcon size="150" color="green">
          mdi-check-circle
        </VIcon>
        <div class="mt-8 text-2xl font-bold text-white">
          Payment Success!
        </div>
        <div class="mt-4 flex flex-col items-center gap-3">
          <span
            v-if="transactionUrl"
            class="cursor-pointer rounded bg-gradient-to-tr from-[#5EE738]
            to-[#050505] px-6 py-2 text-white"
            @click="redirectTo(transactionUrl)"
          >
            Registration Details
          </span>
          <NuxtLink to="/tournaments">
            <span class="bg-brand-black cursor-pointer rounded px-6 py-2 text-white">
              Back to Tournaments
            </span>
          </NuxtLink>
        </div>
      </template>

      <template v-else-if="status === 'processing'">
        <VIcon size="150" color="blue lighten-2">
          mdi-information
        </VIcon>
        <div class="mt-8 text-2xl font-bold text-white">
          Processing takes longer than usual
        </div>
        <div class="text-base text-gray-300 text-center">
          We haven't received confirmation yet. It's safe to close this tab;<br> 
          we will email you once confirmed.
        </div>
        <div class="mt-4">
          <span class="bg-brand-black cursor-pointer px-4 py-2 text-white"
          @click="resetAndVerify"
          >
            Check Again
          </span>
        </div>
      </template>

      <template v-else>
        <VIcon size="150" color="red darken-2">
          mdi-alert-circle
        </VIcon>
        <div class="mt-8 text-2xl font-bold text-white">
          Verification Failed
        </div>
        <div class="text-base text-gray-300">
          {{ bannerText }}
        </div>
        <div class="mt-4 flex gap-4">
          <NuxtLink to="/tournaments"
          class="bg-brand-black px-4 py-2 text-white"
          >
            Try Checkout Again
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
  GATEWAY_AFTERPAY,
  GATEWAY_SQUARE
]

export default {
  data() {
    return {
      status: 'loading',
      transactionId: null,
      paymentGateway: null,
      bannerText: 'Initializing Verification',
      transactionUrl: '',
      isVerifying: false,
      retryCount: 0,
      maxRetries: 5,
    }
  },
  computed: {
    base64IMG() {
      return this.$store.state.registration.base64IMG
    },
  },
  mounted() {
    this.initializeTransaction()
  },
  methods: {
    initializeTransaction() {
      const q = this.$route.query
      
      if (q.payment_intent) {
        this.paymentGateway = GATEWAY_STRIPE
        this.transactionId = q.payment_intent
      } else if (q.paypal_transaction_id) {
        this.paymentGateway = GATEWAY_PAYPAL
        this.transactionId = q.paypal_transaction_id
      } else if (q.afterpay_transaction_id) {
        this.paymentGateway = GATEWAY_AFTERPAY
        this.transactionId = q.afterpay_transaction_id
      }

      if (!this.transactionId && Number(q.amount) !== 0) {
        this.status = 'failed'
        this.bannerText = 'No transaction ID found.'
        return
      }

      this.$nextTick(() => {
        if (Number(q.amount) === 0) {
          this.verifyFullyDiscountedTransaction()
        } else {
          this.verify()
        }
      })
    },

    async verify() {
      if (this.isVerifying) return
      this.isVerifying = true
      this.status = 'loading'

      if (!SUPPORTED_GATEWAYS.includes(this.paymentGateway)) {
        this.status = 'failed'
        this.bannerText = 'Unsupported payment gateway'
        this.isVerifying = false
        return
      }

      const endpoint = this.$route.query.seriesType === 'weekly' ?
        '/v1/tournament/indiv/verify' :
        '/v1/tournament/team/verify'

      try {
        const response = await this.$axios.$post(endpoint, {
          /* eslint-disable camelcase */
          transaction_id: this.transactionId,
          payment_method: this.paymentGateway,
        })

        const serverStatus = response.data.status

        if (serverStatus === 'complete') {
          await this.handleFinalizeSuccess()
        } else if (serverStatus === 'processing' &&
        this.retryCount < this.maxRetries) {
          this.handleRetry()
        } else if (serverStatus === 'processing') {
          this.status = 'processing'
          this.isVerifying = false
        } else {
          throw new Error('Payment was declined or failed')
        }
      } catch (err) {
        this.status = 'failed'
        this.bannerText = err.message || 'System error'
        this.isVerifying = false
      }
    },

    handleRetry() {
      this.retryCount++
      const delay = Math.pow(2, this.retryCount) * 750 
      this.bannerText = `Waiting for confirmation (Attempt ${this.retryCount})...`
      
      setTimeout(() => {
        this.isVerifying = false
        this.verify()
      }, delay)
    },

    async handleFinalizeSuccess() {
      this.bannerText = 'Finalizing Registration...'
      const tasks = []

      this.$store.dispatch('cart/clearCart')

      tasks.push(this.generateTransactionURL())
      
      if (this.base64IMG) {
        tasks.push(this.saveRegistrationImage(this.base64IMG))
      }

      try {
        await Promise.all(tasks)
      } catch (e) {
        console.error("Post-processing error:", e)
      } finally {
        this.status = 'success'
        this.bannerText = 'Payment Successful'
        this.isVerifying = false
      }
    },

    resetAndVerify() {
      this.retryCount = 0
      this.verify()
    },

    generateTransactionURL() {
      const formData = new FormData()
      formData.append('type', this.$route.query.seriesType)
      formData.append('transaction', this.transactionId)
      
      return this.$axios.$post('v1/transaction/generate', formData,
        { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res => {
          this.transactionUrl = res.data.url
        })
    },

    saveRegistrationImage(base64Image) {
      const byteString = atob(base64Image.split(',')[1])
      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i)

      const media = new Blob([ ia ], { type: 'image/jpeg' })
      const formData = new FormData()
      formData.append('type', this.$route.query.seriesType)
      formData.append('transaction', this.transactionId)
      formData.append('photo', media, 'photo.jpg')

      return this.$axios.$post('v1/transaction/savemedia', formData,
        { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(() => {
          this.$store.commit('registration/setBase64IMG', '')
        })
    },

    redirectTo(url) {
      if (url) window.open(url, '_blank')
    }
  },
}
</script>