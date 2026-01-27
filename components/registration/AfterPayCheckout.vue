<template>
  <section class="w-full">
    <!-- Add aria-live region for screen readers -->
    <div 
      id="payment-announcement" 
      aria-live="polite" 
      aria-atomic="true" 
      class="sr-only"
    >
      {{ announcement }}
    </div>

    <form 
      id="payment-form"
      @submit.prevent="handleFormSubmit"
      novalidate
      aria-label="Payment form for Afterpay checkout"
    >
      <!-- Card container remains but hidden since we're using Afterpay -->
      <div id="card-container" class="hidden" aria-hidden="true"></div>
      
      <div class="mt-2">
        <!-- Enhanced spinner with accessibility -->
        <div 
          id="spinner" 
          class="spinner hidden" 
          role="status"
          :aria-label="loadingLabel"
        ></div>
        
        <!-- Afterpay button with better accessibility and error handling -->
        <button
          id="afterpay-button"
          type="button"
          @click="payViaAfterpay"
          :disabled="isButtonDisabled"
          :aria-disabled="isButtonDisabled"
          :aria-label="buttonAriaLabel"
          class="afterpay-button w-full"
          :class="{ 'opacity-50 cursor-not-allowed': isButtonDisabled }"
        >
          <slot>
            Pay with Afterpay
          </slot>
        </button>

        <hr class="my-4">

        <!-- Navigation buttons -->
        <NuxtLink 
          to="/cart" 
          class="block mb-2"
          :aria-label="'Return to cart'"
        >
          <div
            class="
              w-full
              rounded
              border
              border-gray-200
              p-2
              text-center
              font-bold
              hover:bg-gray-50
              transition-colors
              duration-200
            "
            role="button"
            tabindex="0"
          >
            Return to Cart
          </div>
        </NuxtLink>
        
        <button
          type="button"
          class="
            w-full
            rounded
            border
            border-gray-200
            p-2 text-center
            font-bold
            shadow-sm hover:bg-gray-100
            transition-colors
            duration-200
          "
          @click="activeStepPrev"
          :disabled="isStepperLoading"
          :aria-disabled="isStepperLoading"
        >
          Return to Step 1
        </button>
      </div>
    </form>
    
    <!-- Enhanced payment status container -->
    <div
      id="payment-status-container"
      role="alert"
      :aria-live="paymentStatus ? 'assertive' : 'off'"
    ></div>

    <!-- Error display component -->
    <div 
      v-if="errorMessage" 
      class="mt-4 p-3 bg-red-50 border border-red-200 rounded"
      role="alert"
    >
      <p class="text-red-700 font-medium">
        {{ errorMessage }}
      </p>
      <button
        type="button"
        v-if="isRecoverableError"
        @click="retryInitialization"
        class="mt-2 text-sm text-red-600 hover:text-red-800 underline"
      >
        Retry
      </button>
    </div>
  </section>
</template>

<script>
// Add proper constants for maintainability
const PAYMENT_METHODS = {
  AFTERPAY: 'afterpay',
  SQUARE: 'square'
}

const PAYMENT_ENDPOINTS = {
  WEEKLY: {
    CHECKOUT: '/v1/tournament/indiv/checkout',
    CALCULATION: '/v1/tournament/indiv/afterpay/calculation'
  },
  TEAM: {
    CHECKOUT: '/v1/tournament/team/checkout',
    CALCULATION: '/v1/tournament/team/afterpay/calculation'
  }
}

// Configuration constants
const SQUARE_SCRIPT_URL = 'https://web.squarecdn.com/v1/square.js'
const INITIALIZATION_TIMEOUT = 10000 // 10 seconds
const RETRY_DELAY = 2000 // 2 seconds
const MAX_RETRIES = 3

export default {
  name: 'AfterPayCheckout',
  
  props: {
    seriestype: {
      type: String,
      required: true
    },
  },
  
  data() {
    return {
      card: null,
      afterpay: null,
      appID: this.$config.square.appId || '',
      locationID: this.$config.square.locationId || '',
      isStepperLoading: false,
      
      // New state management
      isLoading: false,
      isInitialized: false,
      initializationError: null,
      paymentError: null,
      retryCount: 0,
      announcement: '',
      
      // Track component state
      componentState: 'idle', // idle, initializing, ready, error
      
      // Request cancellation
      abortController: null
    }
  },
  
  computed: {
    registrationInformation: {
      get() {
        return this.$store.state.registration.registrationInformation
      },
      set(value) {
        this.$store.commit('registration/setRegistrationInformation', value)
      },
    },
    
    // Computed endpoints for better readability
    endpoints() {
      return this.seriestype === 'weekly' ? PAYMENT_ENDPOINTS.WEEKLY : PAYMENT_ENDPOINTS.TEAM
    },
    
    // Button state management
    isButtonDisabled() {
      return !this.isInitialized || this.isLoading || this.isStepperLoading
    },
    
    buttonAriaLabel() {
      if (this.isLoading) return 'Processing payment, please wait'
      if (!this.isInitialized) return 'Payment method initializing'
      return 'Pay with Afterpay'
    },
    
    loadingLabel() {
      return this.isLoading ? 'Processing payment' : 'Loading'
    },
    
    // Error handling
    errorMessage() {
      return this.initializationError || this.paymentError
    },
    
    isRecoverableError() {
      // Determine if error is recoverable (network, timeout) vs fatal (invalid config)
      return this.initializationError && 
             !this.initializationError.includes('Invalid') &&
             this.retryCount < MAX_RETRIES
    },
    
    // Accessibility announcements
    paymentStatus() {
      if (this.isLoading) return 'Processing your payment'
      if (this.errorMessage) return `Payment error: ${this.errorMessage}`
      return ''
    }
  },
  
  watch: {
    // Watch for changes in loading state for accessibility
    isLoading(newVal) {
      this.announcement = newVal ? 'Processing payment, please wait' : 'Payment ready'
      this.$nextTick(() => {
        const announcementEl = document.getElementById('payment-announcement')
        if (announcementEl) {
          // Force screen reader to announce
          announcementEl.textContent = this.announcement
        }
      })
    },
    
    // Watch for component state changes
    componentState(newState) {
      this.$emit('payment-state-change', newState)
    }
  },
  
  async mounted() {
    // Validate configuration before proceeding
    if (!this.validateConfig()) {
      this.handleFatalError('Invalid Square configuration')
      return
    }
    
    // Setup cleanup on component destruction
    this.setupCleanup()
    
    // Initialize payment with retry logic
    await this.initializePaymentWithRetry()
    
    // Listen for visibility changes to handle tab switching
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  },
  
  beforeDestroy() {
    // Clean up resources
    this.performCleanup()
    
    // Remove event listeners
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
    
    // Cancel any pending requests
    if (this.abortController) {
      this.abortController.abort()
    }
  },
  
  methods: {
    // ==================== INITIALIZATION METHODS ====================
    
    async initializePaymentWithRetry() {
      this.componentState = 'initializing'
      
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          await this.initializePayment()
          this.initializationError = null
          this.componentState = 'ready'
          this.isInitialized = true
          this.retryCount = 0
          return // Success
        } catch (error) {
          this.initializationError = `Payment initialization failed: ${error.message}`
          this.componentState = 'error'
          this.retryCount = attempt
          
          // Log the error with context
          console.error(`Payment initialization attempt ${attempt} failed:`, {
            error: error.message,
            stack: error.stack,
            attempt,
            maxRetries: MAX_RETRIES
          })
          
          // Emit error event for monitoring
          this.$emit('initialization-error', {
            error: error.message,
            attempt,
            maxRetries: MAX_RETRIES
          })
          
          if (attempt < MAX_RETRIES) {
            // Exponential backoff before retry
            const delay = RETRY_DELAY * Math.pow(2, attempt - 1)
            await new Promise(resolve => setTimeout(resolve, delay))
          } else {
            // Max retries reached
            this.$emit('initialization-failed', {
              error: error.message,
              retryCount: this.retryCount
            })
          }
        }
      }
    },
    
    async initializePayment() {
      // Load Square SDK if not already loaded
      await this.loadSquareSDK()
      
      // Create Square payments instance with timeout
      const payments = await this.createSquarePayments()
      
      // Initialize Afterpay
      await this.initializeAfterpay(payments)
    },
    
    loadSquareSDK() {
      // Check if Square is already loaded
      if (window.Square) {
        return
      }
      
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Square SDK loading timeout'))
        }, INITIALIZATION_TIMEOUT)
        
        const script = document.createElement('script')
        script.src = SQUARE_SCRIPT_URL
        script.async = true
        script.defer = true
        
        script.onload = () => {
          clearTimeout(timeoutId)
          
          // Verify Square loaded correctly
          if (!window.Square || !window.Square.payments) {
            reject(new Error('Square SDK loaded but API not available'))
            return
          }
          
          resolve()
        }
        
        script.onerror = (error) => {
          clearTimeout(timeoutId)
          reject(new Error(`Failed to load Square SDK: ${error.message}`))
        }
        
        // Add to document
        document.head.appendChild(script)
      })
    },
    
    createSquarePayments() {
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Square payments creation timeout'))
        }, 5000) // 5 second timeout
        
        try {
          const payments = window.Square.payments(this.appID, this.locationID)
          
          // Basic validation
          if (!payments) {
            throw new Error('Failed to create Square payments instance')
          }
          
          clearTimeout(timeoutId)
          resolve(payments)
        } catch (error) {
          clearTimeout(timeoutId)
          reject(error)
        }
      })
    },
    
    // Original method preserved but enhanced with error handling
    async initializeAfterpay(payments) {
      try {
        const amount = this.registrationInformation.price / 100
        const discountID = this.registrationInformation.discountCodeId
        
        // Validate amount
        if (!amount || amount <= 0) {
          throw new Error('Invalid payment amount')
        }
        
        const price = await this.initialCalculation(amount, discountID)
        
        // Validate calculated price
        if (!price || price <= 0) {
          throw new Error('Invalid calculated price')
        }
        
        const paymentRequest = this.buildPaymentRequest(payments, price)
        this.afterpay = await payments.afterpayClearpay(paymentRequest)
        
        // Attach Afterpay button with timeout
        await Promise.race([
          this.afterpay.attach('#afterpay-button'),
          new Promise((resolve, reject) => 
            setTimeout(() => reject(new Error('Afterpay attachment timeout')), 5000)
          )
        ])
        
      } catch (error) {
        console.error('Afterpay initialization error:', error)
        throw new Error(`Afterpay initialization failed: ${error.message}`)
      }
    },
    
    buildPaymentRequest(payments, price) {
      // Enhanced with better validation and defaults
      if (!price || isNaN(price) || price <= 0) {
        throw new Error('Invalid price for payment request')
      }
      
      try {
        const req = payments.paymentRequest({
          countryCode: 'AU', // Consider making this configurable
          currencyCode: 'AUD',
          total: {
            amount: price.toString(),
            label: 'Total'
          },
        })
        
        return req
      } catch (error) {
        throw new Error(`Failed to build payment request: ${error.message}`)
      }
    },
    
    // ==================== PAYMENT METHODS ====================
    
    async payViaAfterpay() {
      // Prevent multiple simultaneous payments
      if (this.isLoading || !this.isInitialized) {
        return
      }
      
      this.isLoading = true
      this.paymentError = null
      
      // Create abort controller for request cancellation
      this.abortController = new AbortController()
      
      try {
        const result = await this.afterpay.tokenize()
        
        if (result.status === 'OK') {
          await this.processPayment(result.token)
        } else {
          throw new Error(`Payment tokenization failed: ${result.status}`)
        }
      } catch (error) {
        this.handlePaymentError(error)
      } finally {
        this.isLoading = false
        this.abortController = null
      }
    },
    
    async processPayment(token) {
      try {
        const response = await this.$axios.$post(
          this.endpoints.CHECKOUT,
          {
            item: this.$route.query.id,
            /* eslint-disable camelcase */
            payment_method: PAYMENT_METHODS.AFTERPAY,
            metadata: {
              ...this.registrationInformation,
              card_token: token
            },
            discountcode: ''
          },
          {
            timeout: 30000, // 30 second timeout
            signal: this.abortController && this.abortController.signal
          }
        )
        
        // Validate response
        if (!response) {
          throw new Error('Empty response from server')
        }
        
        // Navigate to thank you page
        this.$router.push({
          path: '/thank-you1',
          query: {
            afterpay_transaction_id: response,
            seriesType: this.seriestype,
            timestamp: Date.now() // Cache busting
          }
        })
        
        // Emit success event
        this.$emit('payment-success', {
          transactionId: response,
          paymentMethod: PAYMENT_METHODS.AFTERPAY,
          timestamp: new Date().toISOString()
        })
        
      } catch (error) {
        // Handle axios errors specifically
        if (error.name === 'CanceledError') {
          throw new Error('Payment request was cancelled')
        }
        
        if (error.response) {
          // Server responded with error
          throw new Error(`Payment failed: ${error.response.data && error.response.data.message ||
          error.response.statusText}`)
        } else if (error.request) {
          // Request was made but no response
          throw new Error('Network error. Please check your connection.')
        } else {
          // Request setup error
          throw new Error(`Payment processing error: ${error.message}`)
        }
      }
    },
    
    // ==================== HELPER METHODS ====================
    
    // Original method enhanced with better error handling
    async initialCalculation(amount, discountID) {
      try {
        const response = await this.$axios.$post(
          this.endpoints.CALCULATION,
          {
            amount,
            discountID
          },
          { timeout: 10000 }
        )
        
        if (!response || typeof response.totalPrice !== 'number') {
          throw new Error('Invalid calculation response')
        }
        
        return response.totalPrice
      } catch (error) {
        console.error('Price calculation error:', error)
        
        // Provide fallback price
        this.$emit('calculation-error', {
          error: error.message,
          amount,
          discountID
        })
        
        // Return original amount as fallback
        return amount
      }
    },
    
    // Original method preserved
    activeStepPrev() {
      this.$emit('active-step', 1)
    },
    
    // ==================== ENHANCED SETLOADING ====================
    
    setLoading(isLoading) {
      this.isLoading = isLoading
      
      const spinner = document.querySelector('#spinner')
      const button = document.querySelector('#afterpay-button')
      
      if (spinner && button) {
        if (isLoading) {
          spinner.classList.remove('hidden')
          button.classList.add('hidden')
          button.setAttribute('aria-disabled', 'true')
        } else {
          spinner.classList.add('hidden')
          button.classList.remove('hidden')
          button.setAttribute('aria-disabled', 'false')
        }
      }
    },
    
    // ==================== ERROR HANDLING ====================
    
    validateConfig() {
      if (!this.appID || !this.locationID) {
        console.error('Missing Square configuration')
        return false
      }
      
      // Basic pattern validation for Square IDs
      const appIdPattern = /^sq0idp-[A-Za-z0-9_-]+$/
      const locationIdPattern = /^[A-Za-z0-9]+$/
      
      if (!appIdPattern.test(this.appID)) {
        console.error('Invalid Square App ID format')
        return false
      }
      
      if (!locationIdPattern.test(this.locationID)) {
        console.error('Invalid Square Location ID format')
        return false
      }
      
      return true
    },
    
    handleFatalError(message) {
      this.initializationError = message
      this.componentState = 'error'
      this.$emit('fatal-error', { message })
      
      // Log to error tracking service
      if (process.env.NODE_ENV === 'production') {
        // Integrate with your error tracking (Sentry, LogRocket, etc.)
        console.error('Fatal payment error:', message)
      }
    },
    
    handlePaymentError(error) {
      this.paymentError = error.message
      this.componentState = 'error'
      
      // Emit error for parent component handling
      this.$emit('payment-error', {
        error: error.message,
        timestamp: new Date().toISOString(),
        paymentMethod: PAYMENT_METHODS.AFTERPAY
      })
      
      // Show user-friendly error
      this.setLoading(false)
      
      // Log detailed error for debugging
      console.error('Payment processing error:', {
        message: error.message,
        stack: error.stack,
        registrationInfo: this.registrationInformation
      })
    },
    
    retryInitialization() {
      this.initializationError = null
      this.paymentError = null
      this.initializePaymentWithRetry()
    },
    
    handleVisibilityChange() {
      // Re-initialize if component becomes visible and wasn't initialized
      if (document.visibilityState === 'visible' && !this.isInitialized) {
        this.retryInitialization()
      }
    },
    
    // ==================== CLEANUP METHODS ====================
    
    setupCleanup() {
      // Store cleanup functions
      this.cleanupFunctions = []
      
      // Cleanup Afterpay instance
      this.cleanupFunctions.push(() => {
        if (this.afterpay) {
          try {
            this.afterpay.destroy()
          } catch (error) {
            console.warn('Error destroying Afterpay instance:', error)
          }
        }
      })
      
      // Cleanup Square card instance (if used in future)
      this.cleanupFunctions.push(() => {
        if (this.card) {
          try {
            this.card.destroy()
          } catch (error) {
            console.warn('Error destroying Square card:', error)
          }
        }
      })
    },
    
    performCleanup() {
      // Execute all cleanup functions
      if (this.cleanupFunctions) {
        this.cleanupFunctions.forEach(fn => {
          try {
            fn()
          } catch (error) {
            console.error('Cleanup error:', error)
          }
        })
      }
    },
    
    // ==================== FORM HANDLING ====================
    
    handleFormSubmit(event) {
      // Prevent default form submission since we handle it via button click
      event.preventDefault()
      
      // If form is submitted via enter key, trigger Afterpay payment
      if (this.isInitialized && !this.isLoading) {
        this.payViaAfterpay()
      }
    }
  }
}
</script>

<style scoped>
/* Enhanced spinner styling */
.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Button states */
.afterpay-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Focus styles for accessibility */
.afterpay-button:focus {
  outline: 2px solid #3498db;
  outline-offset: 2px;
}
</style>