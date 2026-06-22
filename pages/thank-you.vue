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
        <!-- Loading indicator -->
        <div class="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50">
            <div class="text-center">
            <!-- Rugby Ball Spinner -->
            <div class="relative">
                <!-- Outer Ring -->
                <div class="
                w-20 h-20 border-4 border-green-500/30 
                rounded-full animate-spin
                "></div>
                
                <!-- Rugby Ball -->
                <div class="
                absolute inset-0 flex items-center justify-center
                ">
                <div class="
                    w-12 h-8 bg-gradient-to-r from-green-500 to-emerald-600 
                    rounded-full relative transform -rotate-45
                    animate-bounce
                ">
                    <!-- Rugby Ball Details -->
                    <div class="
                    absolute inset-1 bg-green-700 rounded-full 
                    border-2 border-green-300
                    "></div>
                    <div class="
                    absolute top-1/2 left-0 right-0 h-0.5 
                    bg-green-300 transform -translate-y-1/2
                    "></div>
                    <div class="
                    absolute top-1/2 left-1/3 w-1 h-2 
                    bg-green-300 transform -translate-y-1/2
                    "></div>
                    <div class="
                    absolute top-1/2 right-1/3 w-1 h-2 
                    bg-green-300 transform -translate-y-1/2
                    "></div>
                </div>
                </div>
            </div>
            
            <!-- Loading Text -->
            <p class="mt-6 text-lg font-semibold text-green-400 animate-pulse">
                Finalizing your order...
            </p>
            <p class="mt-6 text-lg font-semibold text-green-400 animate-pulse">
                Please do not close your browser until this is done.
            </p>
            <!-- Subtle Dots -->
            <div class="flex justify-center space-x-1 mt-4">
                <div class="
                w-2 h-2 bg-green-500 rounded-full 
                animate-bounce delay-0
                "></div>
                <div class="
                w-2 h-2 bg-green-500 rounded-full 
                animate-bounce delay-150
                "></div>
                <div class="
                w-2 h-2 bg-green-500 rounded-full 
                animate-bounce delay-300
                "></div>
            </div>
            </div>
        </div>
      </template>

      <template v-else-if="status === 'success'">
        <div class="rugby-celebration" aria-label="Order successful – rugby goal scored">
          <svg 
            viewBox="0 0 200 180" 
            class="goalposts" 
            width="150" 
            height="135" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="30" y1="160" x2="30" y2="20" stroke="white" stroke-width="8" stroke-linecap="round"/>
            <line x1="170" y1="160" x2="170" y2="20" stroke="white" stroke-width="8" stroke-linecap="round"/>
            <line x1="30" y1="60" x2="170" y2="60" stroke="white" stroke-width="8" stroke-linecap="round"/>
            
            <g class="rugby-ball">
              <ellipse 
                cx="100" cy="30" rx="14" ry="8" 
                fill="#2BC769" 
                stroke="white" 
                stroke-width="2"
                transform="rotate(-15, 100, 30)"
              />
              <line x1="95" y1="24" x2="95" y2="36" stroke="white" stroke-width="1.5" transform="rotate(-15, 100, 30)"/>
              <line x1="100" y1="23" x2="100" y2="37" stroke="white" stroke-width="1.5" transform="rotate(-15, 100, 30)"/>
              <line x1="105" y1="24" x2="105" y2="36" stroke="white" stroke-width="1.5" transform="rotate(-15, 100, 30)"/>
            </g>
          </svg>
        </div>

        <div class="mt-8 text-2xl font-bold text-white">
          Goal! Order Successful
        </div>
        <div class="text-base text-gray-400">
          You’ve kicked it straight through the posts.  
          Now head back to the merch stand.
        </div>

        <div class="mt-4 flex items-center justify-center">
          <NuxtLink to="/shop">
            <span class="mx-2 cursor-pointer bg-green-500 px-4 py-2 text-white hover:bg-green-700 transition">
              Back to Merch
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
        <div class="rugby-fail" aria-label="Order failed – conversion missed">
          <svg 
            viewBox="0 0 200 180" 
            class="goalposts" 
            width="150" 
            height="135" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="30" y1="160" x2="30" y2="20" stroke="white" stroke-width="8" stroke-linecap="round"/>
            <line x1="170" y1="160" x2="170" y2="20" stroke="white" stroke-width="8" stroke-linecap="round"/>
            <line x1="30" y1="60" x2="170" y2="60" stroke="white" stroke-width="8" stroke-linecap="round"/>
            
            <g class="rugby-ball-miss">
              <ellipse 
                cx="100" cy="55" rx="12" ry="7" 
                fill="#EF3849" 
                stroke="white" 
                stroke-width="2"
                transform="rotate(10, 100, 55)"
              />
              <line x1="95" y1="50" x2="95" y2="60" stroke="white" stroke-width="1.5" transform="rotate(10, 100, 55)"/>
              <line x1="100" y1="49" x2="100" y2="61" stroke="white" stroke-width="1.5" transform="rotate(10, 100, 55)"/>
              <line x1="105" y1="50" x2="105" y2="60" stroke="white" stroke-width="1.5" transform="rotate(10, 100, 55)"/>
            </g>
            
            <g class="impact" opacity="0">
              <line x1="80" y1="60" x2="70" y2="50" stroke="#EF3849" stroke-width="3" stroke-linecap="round"/>
              <line x1="120" y1="60" x2="130" y2="50" stroke="#EF3849" stroke-width="3" stroke-linecap="round"/>
              <line x1="100" y1="60" x2="100" y2="45" stroke="#EF3849" stroke-width="3" stroke-linecap="round"/>
            </g>
          </svg>
        </div>

        <div class="mt-8 text-2xl font-bold text-white">
          Conversion Missed
        </div>
        <div class="text-base text-gray-400">
          Your order didn’t go through this time.<br />
          Hit the lineout, reset, and try again.
        </div>

        <div class="mt-4 flex items-center justify-center gap-4">
          <NuxtLink to="/shop">
            <span class="mx-2 cursor-pointer bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition">
              Back to Merch
            </span>
          </NuxtLink>
          <NuxtLink to="/checkout">
            <span class="mx-2 cursor-pointer bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition">
              Try Checkout Again
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
          .catch(() => {
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

<style scoped>
.rugby-ball {
  animation: fly-through 0.8s ease-out forwards;
  opacity: 0;
}
@keyframes fly-through {
  0% {
    transform: translateY(-30px) scale(0.5);
    opacity: 0;
  }
  60% {
    opacity: 1;
    transform: translateY(0) scale(1.1);
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
.goalposts line {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: draw-posts 0.6s ease-out forwards;
}
@keyframes draw-posts {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes draw-posts {
  to {
    stroke-dashoffset: 0;
  }
}

/* Ball hits crossbar and bounces away */
.rugby-ball-miss {
  animation: hit-post 1.2s ease-in-out forwards;
  opacity: 0;
}
@keyframes hit-post {
  0% {
    transform: translateY(-30px) scale(0.5);
    opacity: 0;
  }
  40% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(0) scale(1);
  }
  60% {
    transform: translateY(5px) scale(0.9);
  }
  80% {
    transform: translateY(40px) scale(0.3);
    opacity: 0.8;
  }
  100% {
    transform: translateY(80px) scale(0.2);
    opacity: 0;
  }
}

.impact {
  animation: show-impact 0.2s ease-out 0.6s forwards;
}
@keyframes show-impact {
  from { opacity: 0; transform: scale(0); }
  to { opacity: 1; transform: scale(1); }
}
</style>