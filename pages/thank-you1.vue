<template>
  <div class="min-h-screen bg-gray-950 text-white">
    <!-- Header -->
    <BaseHeader class="mx-auto max-w-full gap-4 relative overflow-hidden bg-gradient-to-br from-green-900 via-green-700 to-gray-900 lg:px-8">
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

    <!-- Status card -->
    <div class="flex flex-col items-center justify-center px-4 py-20">
      <div class="w-full max-w-lg bg-gray-900/80 backdrop-blur-md border border-green-500/20 rounded-2xl p-8 shadow-2xl shadow-black/50 transition-all duration-500">

        <!-- Loading state -->
        <template v-if="status === 'loading'">
          <div class="flex flex-col items-center gap-8">
            <div class="relative">
              <VProgressCircular size="125" width="10" indeterminate color="green lighten-2" />
              <div class="absolute inset-0 flex items-center justify-center">
                <i class="ri-football-line text-3xl text-green-400 animate-bounce" aria-hidden="true"></i>
              </div>
            </div>
            <h2 class="text-2xl font-bold text-green-200">Confirming payment…</h2>
            <p class="text-gray-300 text-center">
              Please don’t close this page.<br/>
              We’re waiting for the bank to confirm.
            </p>
          </div>
        </template>

        <!-- Success state -->
        <template v-else-if="status === 'success'">
          <div class="flex flex-col items-center gap-6 text-center">
            <!-- Success icon with subtle glow -->
            <div class="relative">
              <div class="absolute inset-0 bg-green-500/30 rounded-full blur-2xl animate-pulse"></div>
              <VIcon size="150" color="green" class="relative z-10 drop-shadow-lg">
                mdi-check-circle
              </VIcon>
            </div>
            <h2 class="text-3xl font-extrabold text-white">Payment Success!</h2>
            <p class="text-gray-300">
              Your registration has been confirmed.
            </p>

            <!-- Action buttons -->
            <div class="flex flex-col sm:flex-row gap-4 w-full mt-4">
              <button
                v-if="transactionUrl"
                @click="redirectTo(transactionUrl)"
                class="flex-1 rounded-lg bg-gradient-to-tr from-[#5EE738] to-[#050505] px-6 py-3 font-semibold text-white shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <i class="ri-file-text-line mr-2"></i>
                View Registration Details
              </button>
              <NuxtLink to="/tournaments" class="flex-1">
                <span class="flex items-center justify-center rounded-lg bg-brand-black px-6 py-3 font-semibold text-white hover:bg-gray-800 transition-colors border border-green-500/30">
                  <i class="ri-trophy-line mr-2"></i>
                  Back to Tournaments
                </span>
              </NuxtLink>
            </div>
          </div>
        </template>

        <!-- Processing state -->
        <template v-else-if="status === 'processing'">
          <div class="flex flex-col items-center gap-6">
            <div class="relative">
              <div class="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
              <VIcon size="150" color="blue lighten-2" class="relative z-10">
                mdi-information
              </VIcon>
            </div>
            <h2 class="text-2xl font-bold text-blue-200">Still processing…</h2>
            <p class="text-gray-300 text-center">
              The bank hasn’t confirmed yet. <br/>
              You can safely close this page – we’ll email you as soon as it goes through.
            </p>
            <button
              @click="resetAndVerify"
              class="rounded-lg bg-brand-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition-colors border border-blue-500/30"
            >
              <i class="ri-refresh-line mr-2"></i>
              Check Again
            </button>
          </div>
        </template>

        <!-- Error state -->
        <template v-else>
          <div class="flex flex-col items-center gap-6">
            <div class="relative">
              <div class="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
              <VIcon size="150" color="red darken-2" class="relative z-10">
                mdi-alert-circle
              </VIcon>
            </div>
            <h2 class="text-2xl font-bold text-red-300">Verification Failed</h2>
            <p class="text-gray-300 text-center">
              {{ bannerText }}
            </p>
            <button
              type="button"
              @click="resetAndVerify"
              class="inline-flex items-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition-colors"
            >
              <i class="ri-refresh-line mr-2"></i>
              Check This Payment Again
            </button>
            <NuxtLink to="/tournaments">
              <span class="inline-flex items-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition-colors">
                <i class="ri-arrow-go-back-line mr-2"></i>
                Back to Tournaments
              </span>
            </NuxtLink>
          </div>
        </template>
      </div>
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
        this.status = 'processing'
        this.bannerText = 'Your payment may already be complete. Checking again is safe and will not create another charge.'
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

<style scoped>
@keyframes glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
.animate-pulse {
  animation: glow 2s ease-in-out infinite;
}
</style>
