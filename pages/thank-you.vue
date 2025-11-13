<template>
  <div class="h-full">
    <!-- Enhanced Header -->
    <BaseHeader
      class="mx-auto max-w-full gap-4 relative overflow-hidden
      bg-gradient-to-br from-green-900 via-green-700 to-gray-900
      lg:px-8"
    >
      <!-- Animated Rugby Field Background -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-1/4 left-0 w-full h-1 bg-white/30 
                    animate-pulse"></div>
        <div class="absolute top-1/2 left-0 w-full h-1 bg-white/40 
                    animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-3/4 left-0 w-full h-1 bg-white/30 
                    animate-pulse" style="animation-delay: 2s;"></div>
      </div>

      <div
        class="col-span-12 text-center sm:space-y-3 sm:text-left
               lg:col-span-6 xl:mt-10 relative z-10"
        data-aos="fade-right"
      >
        <span class="superheadline flex flex-row items-center text-[1rem]
                    font-normal text-white"
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white" class="hover:scale-105 transition-transform">
                <i class="ri-home-4-line mr-2"></i>Home
              </VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl
                   bg-gradient-to-r from-green-400 to-white bg-clip-text 
                   drop-shadow-lg"
        >
          🏉 {{ bannerText }}
        </h1>
      </div>
    </BaseHeader>

    <div class="flex flex-col items-center justify-center py-24 px-48">
      <template v-if="status === 'loading'">
        <VProgressCircular
          size="125"
          width="10"
          indeterminate
          color="gray lighten-2"
        />
        <div class="mt-8 text-2xl font-bold text-white">
          Finalizing your order...
        </div>
        <div class="text-base text-gray-400">
          Please do not close your browser until this is done.
        </div>
      </template>

      <template v-else-if="status === 'success'">
        <VIcon size="150" color="green">
          mdi-check-circle
        </VIcon>
        <div class="mt-8 text-2xl font-bold text-white">
          Order Success!
        </div>
        <div class="text-base text-gray-400">
          You can go now back to the merch to continue shopping
        </div>
        <div class="mt-4 flex items-center justify-center">
          <NuxtLink to="/shop">
            <span
              class="mx-2 cursor-pointer bg-brand-black px-4 py-2 text-white"
            >
              Merch
            </span>
          </NuxtLink>
        </div>
      </template>

      <template v-else-if="status === 'processing'">
        <VIcon size="150" color="blue lighten-2">
          mdi-information
        </VIcon>
        <div class="mt-8 text-2xl font-bold text-white">
          Order is still being processed
        </div>
        <div class="text-base text-gray-400">
          Please refresh this tab in a few minutes.
          Do not close this tab
        </div>
        <div class="mt-4 flex items-center justify-center">
          <span
            class="mx-2 cursor-pointer bg-brand-black px-4 py-2 text-white"
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
          Your order failed
        </div>
        <div class="text-base text-gray-400">
          You can go back to the merch to continue shopping
          or attempt to checkout again
        </div>
        <div class="mt-4 flex items-center justify-center">
          <NuxtLink to="/shop">
            <span
              class="mx-2 cursor-pointer bg-brand-black px-4 py-2 text-white"
            >
              Merch
            </span>
          </NuxtLink>
          <NuxtLink to="/checkout">
            <span
              class="mx-2 cursor-pointer bg-brand-black px-4 py-2 text-white"
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
  /*
   * GATEWAY_SQUARE,
   * GATEWAY_AFTERPAY,
   */
]

export default {
  data() {
    return {
      status: 'loading',
      transactionId: null,
      paymentGateway: null,
      bannerText: 'Verifying Order'
    }
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
      this.verify()
    })
  },
  methods: {
    verify() {
      if (SUPPORTED_GATEWAYS.includes(this.paymentGateway)) {
        this.status = 'loading'
        this.$axios
          .$post('/v1/orders/verify', {
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
  },
}
</script>
