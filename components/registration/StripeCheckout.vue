<template>
  <form class="w-full" @submit.prevent="handleSubmit" novalidate>
    <!-- Payment Form Content (unchanged) -->
    <div class="mb-6" v-if="!isZeroAmount">
      <div 
        v-show="stripeInitialized"
        id="payment-element"
        ref="paymentElementRef"
        :class="{ 'invisible': !stripeInitialized }"
      ></div>
      
      <div 
        v-show="!stripeInitialized && !stripeError"
        class="border border-gray-200 rounded-lg p-8 text-center"
      >
        <div class="animate-spin inline-block w-6 h-6 border-2
        border-gray-300 border-t-[#1a1d18] rounded-full mb-4"
        ></div>
        <p class="text-gray-600">
          Loading secure payment form...
        </p>
      </div>
      
      <div 
        v-if="stripeError"
        class="border border-red-200 rounded-lg p-6 text-center bg-red-50"
      >
        <i class="ri-error-warning-line text-red-600 text-2xl mb-3 block"></i>
        <p class="text-red-800 font-medium mb-2">
          Unable to load payment form
        </p>
        <p class="text-red-600 mb-4">
          {{ stripeError }}
        </p>
        <button
          type="button"
          @click="retryStripeInitialization"
          class="px-4 py-2 bg-red-100 text-red-700 rounded
          hover:bg-red-200 transition-colors"
        >
          <i class="ri-refresh-line mr-2"></i>
          Try Again
        </button>
      </div>
    </div>

    <!-- Zero Amount Message -->
    <div v-else class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div class="flex items-center">
        <i class="ri-checkbox-circle-line text-green-600 text-xl mr-3"></i>
        <p class="text-green-800">
          No payment required for this registration.
        </p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="space-y-3">
      <button
        type="submit"
        :disabled="isButtonDisabled"
        :class="[
          'w-full py-4 px-6 rounded-lg font-medium transition-all',
          'duration-200 flex items-center justify-center',
          isButtonDisabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-[#1a1d18] text-white hover:bg-gray-800 active:scale-[0.99]'
        ]"
      >
        <!-- Always use the same wrapper pattern -->
        <template v-if="isSubmitting">
          <span class="flex items-center justify-center">
            <span class="spinner w-5 h-5 border-2 border-white
            border-t-transparent rounded-full animate-spin mr-3"
            ></span>
            <span>
              Processing Payment...
            </span>
          </span>
        </template>
        
        <template v-else-if="isZeroAmount">
          <span class="flex items-center justify-center">
            <i class="ri-arrow-right-line"></i>
            <span class="ml-2">
              Complete Registration
            </span>
          </span>
        </template>
        
        <template v-else>
          <span class="flex items-center justify-center">
            <i class="ri-lock-line"></i>
            <span class="ml-2">
              Pay Now
            </span>
          </span>
        </template>
      </button>

      <!-- Return Links -->
      <NuxtLink
        class="flex items-center justify-center
        w-full border border-gray-200 bg-white
        py-4 px-4 text-gray-700 rounded-lg shadow-sm
        hover:bg-gray-50 hover:text-[#1a1d18]
        transition-colors duration-200"
        to="/tournaments"
      >
        <i class="ri-arrow-left-line"></i>
        <span class="ml-2">
          Return to Tournaments
        </span>
      </NuxtLink>

      <button
        type="button"
        :disabled="isLoading"
        @click="activeStepPrev"
        class="flex items-center justify-center
        w-full bg-white py-4 px-4 text-gray-700
        rounded-lg shadow-sm border border-gray-200
        hover:bg-gray-50 hover:text-[#1a1d18]
        transition-colors duration-200 disabled:opacity-50
        disabled:cursor-not-allowed"
      >
        <i class="ri-arrow-go-back-line"></i>
        <span class="ml-2">
          Return to Step 1
        </span>
      </button>
    </div>

    <!-- Error Message -->
    <div
      v-if="errorMessage"
      ref="errorMessageRef"
      class="mt-4 p-4 bg-red-50 border border-red-200
      rounded-lg transition-all duration-300"
      role="alert"
      aria-live="assertive"
    >
      <div class="flex items-start">
        <i class="ri-error-warning-line text-red-600
        text-xl mr-3 mt-0.5 flex-shrink-0"></i>
        <div>
          <p class="text-red-800 font-medium mb-1">
            Payment Error
          </p>
          <p class="text-red-700">
            {{ errorMessage }}
          </p>
        </div>
        <button
          type="button"
          @click="errorMessage = ''"
          class="ml-auto text-red-400 hover:text-red-600"
          aria-label="Dismiss error"
        >
          <i class="ri-close-line text-xl"></i>
        </button>
      </div>
    </div>

    <!-- Success Message -->
    <div
      v-if="successMessage"
      class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
      role="status"
      aria-live="polite"
    >
      <div class="flex items-center">
        <i class="ri-checkbox-circle-line text-green-600 text-xl mr-3"></i>
        <p class="text-green-800">
          {{ successMessage }}
        </p>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <div class="animate-spin inline-block w-12 h-12 border-4
        border-gray-300 border-t-[#1a1d18] rounded-full mb-4"
        ></div>
        <p class="text-gray-700 text-center">
          Setting up your payment...
        </p>
      </div>
    </div>

    <!-- Leave Protection Modal -->
    <div
      v-if="showLeaveWarning"
      class="fixed inset-0 bg-black bg-opacity-50 flex
      items-center justify-center z-[100]"
      @click.self="cancelLeave"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <div class="flex items-start mb-4">
            <i class="ri-alert-line text-yellow-600 text-2xl mr-3 mt-1"></i>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                Payment in Progress
              </h3>
              <p class="text-gray-600">
                Your payment is currently being processed.
                If you leave now, your transaction may not complete.
              </p>
            </div>
          </div>
          
          <div class="flex space-x-3">
            <button
              type="button"
              @click="cancelLeave"
              class="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg
              hover:bg-gray-200 transition-colors font-medium"
            >
              <i class="ri-arrow-left-line mr-2"></i>
              Stay on Page
            </button>
            <button
              type="button"
              @click="confirmLeave"
              class="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg
              hover:bg-red-700 transition-colors font-medium"
            >
              <i class="ri-logout-circle-line mr-2"></i>
              Leave Anyway
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'StripeCheckout',

  props: {
    seriestype: {
      type: String,
      required: true
    },
    loungeToken: {
      type: String,
      required: true
    },
    clientId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      isLoading: false,
      isSubmitting: false,
      isZeroAmount: false,
      stripeInitialized: false,
      stripeError: null,
      errorMessage: '',
      successMessage: '',
      stripeElements: null,
      paymentElement: null,
      paymentIntentId: null,
      clientSecret: null,
      cleanupFunctions: [],
      showLeaveWarning: false,
      pendingNavigation: null
    }
  },

  computed: {
    registrationInformation: {
      get() {
        return this.$store.state.registration.registrationInformation || {}
      },
      set(value) {
        this.$store.commit('registration/setRegistrationInformation', value)
      }
    },

    tournamentId() {
      return this.$route.query.id || ''
    },

    isButtonDisabled() {
      return this.isLoading || 
             this.isSubmitting || 
             (this.isZeroAmount ? false : !this.stripeInitialized || this.stripeError)
    },

    baseURL() {
      return this.$config.baseURL || window.location.origin
    }
  },

  async mounted() {
    if (!this.validateRequiredData()) {
      return
    }

    await this.initializePayment()
    this.setupNavigationProtection()
  },

  beforeDestroy() {
    this.performCleanup()
  },

  methods: {
    validateRequiredData() {
      if (!this.tournamentId) {
        this.showError('Missing tournament information. Please return to registration.')
        return false
      }

      if (!this.registrationInformation || Object.keys(this.registrationInformation).length === 0) {
        this.showError('Registration information is missing.')
        return false
      }

      return true
    },

    async initializePayment() {
      this.isLoading = true
      this.errorMessage = ''
      this.stripeError = null

      try {
        const response = await this.$axios.$post(
          this.getEndpoint(),
          this.buildCheckoutPayload(),
          { timeout: 15000 }
        )

        if (!this.validateCheckoutResponse(response)) {
          throw new Error('Invalid server response')
        }

        if (Number(response.amount) === 0) {
          await this.handleZeroAmountPayment(response)
          return
        }

        if (response.success) {
          this.$oruga.notification.open({
            message: response.message,
            variant: 'warning',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
        }

        this.paymentIntentId = response.paymentIntentId
        this.clientSecret = response.stripeToken
        this.$store.commit('registration/setPaymentIntent', response.paymentIntentId)

        await this.initializeStripeElements()

        this.stripeInitialized = true

      } catch (error) {
        await this.handleInitializationError(error)
      } finally {
        this.isLoading = false
      }
    },

    getEndpoint() {
      return this.seriestype === 'weekly' ?
        '/v1/tournament/indiv/checkout' :
        '/v1/tournament/team/checkout'
    },

    buildCheckoutPayload() {
      return {
        item: this.tournamentId,
        /* eslint-disable camelcase */
        payment_method: 'stripe',
        metadata: this.registrationInformation,
        discountcode: '',
        /* eslint-disable camelcase */
        lounge_token: this.loungeToken,
        client_id: this.clientId
      }
    },

    validateCheckoutResponse(response) {
      const requiredFields = [ 'paymentIntentId', 'stripeToken' ]
      return requiredFields.every(field => {
        const hasField = field in response
        if (!hasField) {
          console.error(`Missing required field in response: ${field}`, response)
        }
        return hasField
      })
    },

    async initializeStripeElements() {
      try {
        if (!this.clientSecret || !this.$stripe) {
          throw new Error('Payment gateway configuration error')
        }

        await this.$nextTick()

        if (!this.$refs.paymentElementRef) {
          await new Promise(resolve => setTimeout(resolve, 100))
          if (!this.$refs.paymentElementRef) {
            throw new Error('Payment element not found in DOM')
          }
        }

        const appearance = {
          theme: 'stripe',
          labels: 'floating',
          variables: {
            colorPrimary: '#1a1d18',
            colorBackground: '#ffffff',
            colorText: '#191919',
            colorDanger: '#e73538',
            fontFamily: 'Ideal Sans, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '2px'
          }
        }

        this.stripeElements = this.$stripe.elements({
          clientSecret: this.clientSecret,
          appearance
        })

        const paymentElementOptions = { layout: 'tabs' }

        this.paymentElement = this.stripeElements.create('payment', paymentElementOptions)
        
        await this.paymentElement.mount(this.$refs.paymentElementRef)

        this.paymentElement.on('change', (event) => {
          if (event.error) {
            this.stripeError = event.error.message
          } else {
            this.stripeError = null
          }
        })

      } catch (error) {
        console.error('Failed to initialize Stripe:', error)
        this.stripeError = error.message || 'Unable to load payment form'
        throw error
      }
    },

    async retryStripeInitialization() {
      this.stripeError = null
      this.stripeInitialized = false
      
      if (this.paymentElement) {
        this.paymentElement.destroy()
        this.paymentElement = null
      }
      
      if (this.stripeElements) {
        this.stripeElements = null
      }
      
      await this.initializeStripeElements()
      if (!this.stripeError) {
        this.stripeInitialized = true
      }
    },

    // ==================== PAYMENT PROCESSING ====================
    handleSubmit: debounce(async function() {
      if (this.isSubmitting || this.isButtonDisabled) {
        return
      }

      this.isSubmitting = true
      this.errorMessage = ''
      this.stripeError = null

      try {
        if (this.isZeroAmount) {
          await this.handleZeroAmountPayment()
          return
        }

        if (!this.stripeElements || !this.paymentElement) {
          throw new Error('Payment form not ready. Please refresh the page.')
        }

        const { error } = await this.$stripe.confirmPayment({
          elements: this.stripeElements,
          confirmParams: { return_url: `${this.baseURL}/thank-you1?seriesType=${this.seriestype}` }
        })

        if (error) {
          throw this.normalizeStripeError(error)
        }

        this.removeNavigationProtection()

      } catch (error) {
        await this.handlePaymentError(error)
      } finally {
        this.isSubmitting = false
      }
    }, 1000, { leading: true, trailing: false }),

    async handleZeroAmountPayment(response = null) {
      this.isZeroAmount = true
      this.successMessage = 'Processing your registration...'

      try {
        const transactionId = response && response.transactionId || `free-${Date.now()}`

        await this.$router.push({
          path: '/thank-you1',
          query: {
            seriesType: this.seriestype,
            amount: 0,
            transactionID: transactionId,
            timestamp: Date.now()
          }
        })

      } catch (navigationError) {
        this.showError('Registration completed but unable to redirect. Please click the button below.')
      }
    },

    // ==================== NAVIGATION PROTECTION ====================
    setupNavigationProtection() {
      document.addEventListener('click', this.handleInternalLinkClick, true)
      
      this.$router.beforeEach((to, from, next) => {
        if (this.isSubmitting && to.path !== '/thank-you1') {
          this.pendingNavigation = next
          this.showLeaveWarning = true
          return false
        }
        next()
      })

      window.addEventListener('popstate', this.handlePopState)

      this.cleanupFunctions.push(() => {
        document.removeEventListener('click', this.handleInternalLinkClick, true)
        window.removeEventListener('popstate', this.handlePopState)
      })
    },

    handleInternalLinkClick(event) {
      const link = event.target.closest('a')
      if (!link || !link.href) return
      
      const isInternalLink = link.href.startsWith(window.location.origin)
      const isDifferentPage = !link.href.includes(window.location.pathname)
      
      if (isInternalLink && isDifferentPage && this.isSubmitting) {
        event.preventDefault()
        event.stopPropagation()
        this.showLeaveWarning = true
      }
    },

    handlePopState(event) {
      if (this.isSubmitting) {
        event.preventDefault()
        this.showLeaveWarning = true
        window.history.pushState(null, '', window.location.href)
      }
    },

    cancelLeave() {
      this.showLeaveWarning = false
      this.pendingNavigation = null
    },

    confirmLeave() {
      this.showLeaveWarning = false
      this.isSubmitting = false
      
      if (this.pendingNavigation) {
        this.pendingNavigation()
        this.pendingNavigation = null
      } else {
        window.removeEventListener('beforeunload', this.handleBeforeUnload)
        window.history.back()
      }
    },

    removeNavigationProtection() {
      this.cleanupFunctions.forEach(fn => {
        if (typeof fn === 'function') fn()
      })
      this.cleanupFunctions = this.cleanupFunctions.filter(fn => 
        !fn.toString().includes('removeEventListener')
      )
    },

    // ==================== ERROR HANDLING ====================
    async handleInitializationError(error) {
      console.error('Payment initialization error:', error)
      
      if (!this.stripeError) {
        this.stripeError = await this.getUserFriendlyErrorMessage(error)
      }
      
      this.showError('Failed to initialize payment system. Please try again.')
    },

    async handlePaymentError(error) {
      console.error('Payment processing error:', error)

      const userMessage = await this.getUserFriendlyErrorMessage(error)
      this.showError(userMessage)

      this.$nextTick(() => {
        if (this.$refs.errorMessageRef) {
          this.$refs.errorMessageRef.focus()
        }
      })
    },

    normalizeStripeError(error) {
      const errorMap = {
        'card_error': 'Your card was declined. Please try a different card.',
        'validation_error': 'Invalid payment details. Please check and try again.',
        'invalid_request_error': 'Invalid payment request. Please refresh and try again.',
        'api_error': 'Payment service error. Please try again in a moment.',
        'rate_limit_error': 'Too many attempts. Please wait a moment before trying again.',
        'card_declined': 'Your card was declined. Please try a different payment method.'
      }

      return {
        message: errorMap[error.type] || error.message || 'An unexpected payment error occurred.',
        originalError: error
      }
    },

    getUserFriendlyErrorMessage(error) {
      if (error.message && typeof error.message === 'string') {
        return error.message
      }

      if (error.response) {
        switch (error.response.status) {
        case 400:
          return 'Invalid request. Please check your information and try again.'
        case 401:
        case 403:
          return 'Session expired. Please refresh the page and try again.'
        case 404:
          return 'Tournament not found or no longer available.'
        case 429:
          return 'Too many attempts. Please wait a moment.'
        case 500:
        case 502:
        case 503:
        case 504:
          return 'Server temporarily unavailable. Please try again in a few moments.'
        default:
          return 'Unable to process payment. Please try again.'
        }
      }

      if (error instanceof TypeError && error.message.includes('network')) {
        return 'Network error. Please check your connection and try again.'
      }

      return 'An unexpected error occurred. Please refresh the page and try again.'
    },

    showError(message, duration = 7000) {
      this.errorMessage = message
      this.successMessage = ''

      if (duration > 0) {
        const timer = setTimeout(() => {
          this.errorMessage = ''
        }, duration)

        this.cleanupFunctions.push(() => clearTimeout(timer))
      }
    },

    activeStepPrev() {
      if (!this.isLoading && !this.isSubmitting) {
        this.$emit('active-step', 1)
      }
    },

    performCleanup() {
      this.cleanupFunctions.forEach(cleanup => {
        if (typeof cleanup === 'function') cleanup()
      })
      this.cleanupFunctions = []

      if (this.paymentElement) {
        this.paymentElement.destroy()
        this.paymentElement = null
      }

      if (this.stripeElements) {
        this.stripeElements = null
      }
    }
  }
}
</script>

<style scoped>
.spinner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid #1a1d18;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .spinner,
  .animate-spin {
    animation-duration: 2s;
  }

  button,
  a {
    transition: none;
  }
}

.fixed.inset-0 {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>