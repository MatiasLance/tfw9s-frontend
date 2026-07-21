<template>
  <div class="flex w-full flex-col justify-center gap-4 md:flex-row">
    <!-- Payment Methods Section -->
    <div class="payment-section flex grow flex-col bg-gray-200">
      <!-- Payment Method Tabs -->
      <div class="flex">
        <PaymentTab
          v-if="stripeEnabled"
          :active="paymentMethod === 'stripe'"
          @click="setPaymentMethod('stripe')"
          :disabled="isLoading || isProcessing"
        >
          Credit Card
        </PaymentTab>
        <PaymentTab
          v-if="afterpayEnabled"
          :active="paymentMethod === 'afterpay'"
          @click="setPaymentMethod('afterpay')"
          :disabled="isLoading || isProcessing"
        >
          Afterpay
        </PaymentTab>
        <div v-if="!hasPaymentMethods && !isLoading"
        class="p-4 text-center text-red-600"
        >
          No payment methods available. Please contact support.
        </div>
      </div>

      <!-- Payment Method Components -->
      <div v-if="!isLoading && hasPaymentMethods">
        <StripeCheckout
          v-if="paymentMethod === 'stripe' && stripeEnabled"
          class="payment-module gap-3 text-gray-600"
          :series="series"
          :seriestype="seriestype"
          :price="price"
          :disabled="isProcessing"
          :lounge-token="loungeToken"
          :client-id="clientId"
          @active-step="handleActiveStep"
        />

        <AfterPayCheckout
          v-if="paymentMethod === 'afterpay' && afterpayEnabled"
          class="payment-module p-10"
          :series="series"
          :seriestype="seriestype"
          :price="price"
          :cart-total="overallTotal"
          :disabled="isProcessing"
          :lounge-token="loungeToken"
          :client-id="clientId"
          @active-step="handleActiveStep"
        />
      </div>
    </div>

    <!-- Order Summary -->
    <article class="summary flex w-full flex-col
    justify-center bg-white p-2 text-gray-600 md:w-80"
    >
      <h2 class="mb-3 flex justify-center text-lg font-semibold">
        Order Summary
      </h2>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center p-8">
        <VProgressCircular
          size="125"
          width="15"
          indeterminate
          color="gray lighten-2"
        />
        <p class="mt-4 text-gray-500">
            Loading payment information...
        </p>
      </div>

      <!-- Summary Content -->
      <div v-if="!isLoading && hasPaymentMethods" class="px-2">
        <ul>
          <li class="mb-3 flex justify-between border-b pb-2">
            <span class="font-medium">Subtotal:</span>
            <span>{{ formatCurrencyFromCent(subTotal) }}</span>
          </li>
          <li class="mb-3 flex justify-between border-b pb-2">
            <span class="font-medium">Tax Status:</span>
            <span>
              <span
              :class="showGSTIncluded ? 'text-green-600' : 'text-amber-600'"
              >
                {{ showGSTIncluded ? 'GST Inclusive' : 'GST Exclusive' }}
              </span>
            </span>
          </li>
          <li class="mb-3 flex justify-between border-b pb-2">
            <span class="font-medium">Tax Amount:</span>
            <span>{{ formatCurrency(taxAmount) }}</span>
          </li>
          <li class="mt-6 flex justify-between border-t pt-4">
            <span class="text-lg font-bold">Total:</span>
            <span class="text-xl font-bold text-gray-900">
              {{ formatCurrencyFromCent(overallTotal) }}
            </span>
          </li>
        </ul>
        
        <!-- Payment Method Info -->
        <div v-if="selectedPaymentMethodInfo" class="mt-6 rounded bg-blue-50 p-3">
          <p class="text-sm text-blue-800">
            <span class="font-semibold">Selected:</span> {{ selectedPaymentMethodInfo }}
          </p>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="errorMessage" class="mt-4 rounded bg-red-50 p-3">
        <p class="text-sm text-red-800">
            {{ errorMessage }}
        </p>
        <button
          type="button"
          @click="retryInitialization" 
          class="mt-2 text-sm font-medium text-red-600 hover:text-red-800"
        >
          Retry
        </button>
      </div>
    </article>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce';
import PaymentTab from '~/components/payment/PaymentTab';
import currencyMixin from '~/mixins/currency/handlesCurrency';
import StripeCheckout from '~/components/registration/StripeCheckout.vue';
import AfterPayCheckout from '~/components/registration/AfterPayCheckout.vue';

const API_ENDPOINTS = {
  WEEKLY: '/v1/tournament/indiv/stripe/calculation',
  TEAM: '/v1/tournament/team/stripe/calculation',
  PAYMENT_SETTINGS: 'v1/payment/setting/',
  TAX_SETTINGS: 'v1/toggletax/'
};

const PAYMENT_METHODS = {
  STRIPE: 'stripe',
  AFTERPAY: 'afterpay'
};

const LOADING_DELAY_MS = 300;
const INITIALIZATION_TIMEOUT_MS = 10000;

export default {
  name: 'PaymentForm',
  components: {
    PaymentTab,
    StripeCheckout,
    AfterPayCheckout
  },
  mixins: [ currencyMixin ],
  props: {
    series: {
      type: String,
      required: true
    },
    seriestype: {
      type: String,
      required: true
    },
    price: {
      type: [ Number, String ],
      required: true,
      default: 0
    },
    loungeToken: {
      type: String,
      default: null
    },
    clientId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isLoading: true,
      isProcessing: false,
      errorMessage: '',
      stripeEnabled: false,
      afterpayEnabled: false,
      paymentMethod: null,
      showGSTIncluded: true,
      showGSTExcluded: false,
      isGSTInclusive: true,
      overallTotal: 0,
      subTotal: 0,
      taxAmount: 0,
      originalAmount: {
        subtotal: 0,
        gst: 0,
        total: 0,
      },
      initializationAttempts: 0,
      maxInitializationAttempts: 3,
      timeLeft: 900,
      timer: null,
      componentInitialized: false,
      initializationRequestId: 0,
      calculationRequestId: 0,
      isDestroyed: false
    };
  },
  computed: {
    tax: {
      get() {
        return this.$store.state.cart.tax;
      },
      set(v) {
        this.$store.commit('cart/setTax', v);
      }
    },
    registrationInformation: {
      get() {
        return this.$store.state.registration.registrationInformation;
      },
      set(v) {
        this.$store.commit('registration/setRegistrationInformation', v);
      },
    },
    toggleControl1: {
      get() {
        return this.$store.state.master.toggleControl1;
      },
      set(val) {
        this.$store.commit('master/setToggleControl1', val);
      }
    },
    toggleControl2: {
      get() {
        return this.$store.state.master.toggleControl2;
      },
      set(val) {
        this.$store.commit('master/setToggleControl2', val);
      }
    },
    paymentIntent: {
      get() {
        return this.$store.state.registration.paymentIntent;
      },
      set(v) {
        this.$store.commit('registration/setPaymentIntent', v);
      }
    },

    hasPaymentMethods() {
      return this.stripeEnabled || this.afterpayEnabled;
    },
    
    selectedPaymentMethodInfo() {
      if (!this.paymentMethod) return null;
      
      const methods = {
        [PAYMENT_METHODS.STRIPE]: 'Credit/Debit Card',
        [PAYMENT_METHODS.AFTERPAY]: 'Afterpay'
      };
      
      return methods[ this.paymentMethod ] || this.paymentMethod;
    },

    isValidPrice() {
      const price = Number(this.price);
      return !isNaN(price) && price >= 0;
    }
  },
  watch: {
    price: {
      handler(newPrice) {
        if (this.componentInitialized &&
            newPrice !== undefined && newPrice !== null && this.isValidPrice) {
          this.debouncedPriceUpdate();
        }
      }
    },

    paymentMethod(newMethod) {
      if (newMethod) {
        this.$store.commit('order/setPaymentMethod', newMethod);
      }
    }
  },

  async mounted() {
    this.isDestroyed = false;
    await this.initializeComponent();

    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        alert("Your session has expired. Please re-enter the queue.");
        window.location.reload();
      }
    }, 1000);
  },

  beforeDestroy() {
    this.isDestroyed = true;
    this.initializationRequestId++;
    this.calculationRequestId++;
    if (this.debouncedPriceUpdate && this.debouncedPriceUpdate.cancel) {
      this.debouncedPriceUpdate.cancel();
    }
    if (this.initializationTimeout) {
      clearTimeout(this.initializationTimeout);
    }
    clearInterval(this.timer);
  },
  methods: {
    /**
     * Main initialization sequence
     */
    async initializeComponent() {
      const requestId = ++this.initializationRequestId;

      try {
        this.isLoading = true;
        this.componentInitialized = false;
        this.errorMessage = '';

        this.initializationTimeout = setTimeout(() => {
          this.handleInitializationTimeout(requestId);
        }, INITIALIZATION_TIMEOUT_MS);

        await Promise.all([
          this.loadPaymentSettings(),
          this.loadTaxSettings(),
        ]);

        if (requestId !== this.initializationRequestId || this.isDestroyed) return;

        const calculationSucceeded = await this.initializePaymentCalculation();

        if (requestId !== this.initializationRequestId || this.isDestroyed) return;

        if (!calculationSucceeded) {
          throw new Error('Unable to calculate the payment amount');
        }

        this.setInitialPaymentMethod();

        this.setOriginalAmount();
        this.componentInitialized = true;
        
      } catch (error) {
        if (requestId === this.initializationRequestId && !this.isDestroyed) {
          this.handleInitializationError(error);
        }
      } finally {
        if (requestId === this.initializationRequestId && !this.isDestroyed) {
          this.isLoading = false;
        }
        if (requestId === this.initializationRequestId && this.initializationTimeout) {
          clearTimeout(this.initializationTimeout);
          this.initializationTimeout = null;
        }
      }
    },
    
    /**
     * Load available payment methods from API
     */
    async loadPaymentSettings() {
      try {
        const response = await this.$axios.$get(API_ENDPOINTS.PAYMENT_SETTINGS);
        
        this.stripeEnabled = Boolean(response.stripe_enabled);
        this.afterpayEnabled = Boolean(response.afterpay_enabled);
        
        if (!this.hasPaymentMethods) {
          throw new Error('No payment methods are currently available');
        }
      } catch (error) {
        console.error('Failed to load payment settings:', error);
        this.showNotification(
          'Unable to load payment options. Please try again.',
          'danger'
        );
        throw error;
      }
    },
    
    /**
     * Load tax configuration
     */
    async loadTaxSettings() {
      try {
        const response = await this.$axios.$get(API_ENDPOINTS.TAX_SETTINGS);
        
        if (response) {
          this.toggleControl1 = response.toggleControl1;
          this.toggleControl2 = response.toggleControl2;
          
          this.$store.commit('master/setToggleControl1', response.toggleControl1);
          this.$store.commit('master/setToggleControl2', response.toggleControl2);
          
          this.showGSTIncluded = Boolean(response.toggleControl2);
          this.showGSTExcluded = Boolean(response.toggleControl1);
          this.isGSTInclusive = response.toggleControl2;
        }
      } catch (error) {
        console.warn('Failed to load tax settings, using defaults:', error);
      }
    },
    
    /**
     * Initialize payment calculation
     */
    async initializePaymentCalculation() {
      const requestId = ++this.calculationRequestId;

      if (!this.isValidPrice) {
        this.errorMessage = 'Invalid price provided';
        return false;
      }
      
      try {
        this.isProcessing = true;
        
        const endpoint = this.seriestype === 'weekly' ?
          API_ENDPOINTS.WEEKLY :
          API_ENDPOINTS.TEAM;
        
        const item = this.$route.query.id;
        const amount = this.registrationInformation &&
        this.registrationInformation.price ?
          Number(this.registrationInformation.price) / 100 :
          Number(this.price) / 100;
        const discountID = this.registrationInformation &&
        this.registrationInformation.discountCodeId;
        
        const response = await this.$axios.$post(endpoint, {
          item,
          amount,
          discountID,
        });

        if (requestId !== this.calculationRequestId || this.isDestroyed) {
          return false;
        }

        this.overallTotal = Number(response.totalPrice) || 0;
        this.taxAmount = Number(response.taxAmount) || 0;
        this.subTotal = Number(response.subTotal) || 0;

        this.$store.commit('cart/setSubtotal', this.price);
        this.$store.commit('cart/setTotal', this.overallTotal);

        this.errorMessage = '';
        return true;
        
      } catch (error) {
        if (requestId !== this.calculationRequestId || this.isDestroyed) {
          return false;
        }

        console.error('Payment calculation failed:', error);
        this.errorMessage = 'Failed to calculate payment amount. Please refresh the page.';
        this.showNotification('Payment calculation error', 'danger');
        return false;
      } finally {
        if (requestId === this.calculationRequestId) {
          this.isProcessing = false;
        }
      }
    },
    
    /**
     * Debounced price update method
     */
    debouncedPriceUpdate: _debounce(function() {
      this.initializePaymentCalculation();
    }, LOADING_DELAY_MS),
    
    /**
     * Set the initial payment method based on availability
     */
    setInitialPaymentMethod() {
      if (this.stripeEnabled) {
        this.paymentMethod = PAYMENT_METHODS.STRIPE;
      } else if (this.afterpayEnabled) {
        this.paymentMethod = PAYMENT_METHODS.AFTERPAY;
      } else {
        this.paymentMethod = null;
      }
      
      if (this.paymentMethod) {
        this.$store.commit('order/setPaymentMethod', this.paymentMethod);
      }
    },
    
    /**
     * Set payment method with validation
     */
    setPaymentMethod(method) {
      if (this.isProcessing || this.isLoading) {
        return;
      }
      
      if ([ PAYMENT_METHODS.STRIPE, PAYMENT_METHODS.AFTERPAY ].includes(method)) {
        this.paymentMethod = method;
        this.$store.commit('order/setPaymentMethod', method);
      }
    },
    
    /**
     * Store original amounts for comparison/rollback
     */
    setOriginalAmount() {
      this.originalAmount = {
        subtotal: this.subTotal,
        total: this.overallTotal,
        timestamp: Date.now()
      };
    },
    
    /**
     * Check if amount is below minimum required
     */
    isBelowMinimumAmount(minAmount) {
      if (!this.isValidPrice) return true;
      
      const priceInDollars = Number(this.price) / 100;
      return priceInDollars < minAmount;
    },
    
    /**
     * Handle active step events from child components
     */
    handleActiveStep(stepNo) {
      this.$emit('active-step', stepNo);
    },
    
    /**
     * Handle initialization timeout
     */
    handleInitializationTimeout(requestId) {
      if (requestId !== this.initializationRequestId || this.isDestroyed) return;

      this.initializationRequestId++;
      this.calculationRequestId++;
      this.isProcessing = false;
      this.componentInitialized = false;
      this.errorMessage = 'Payment initialization is taking longer than expected.';
      this.showNotification('Please check your connection and try again.', 'warning');
      this.isLoading = false;
    },
    
    /**
     * Handle initialization errors
     */
    handleInitializationError(error) {
      console.error('Component initialization failed:', error);
      
      this.initializationAttempts++;
      
      if (this.initializationAttempts >= this.maxInitializationAttempts) {
        this.errorMessage = 'Unable to initialize payment system. Please contact support.';
      } else {
        this.errorMessage = `Failed to load (Attempt ${this.initializationAttempts}/
        ${this.maxInitializationAttempts})`;
      }
      
      this.showNotification('Initialization error', 'danger');
    },
    
    /**
     * Retry initialization
     */
    retryInitialization() {
      this.errorMessage = '';
      this.initializeComponent();
    },
    
    /**
     * Show notification consistently
     */
    showNotification(message, variant = 'danger') {
      if (this.$oruga && this.$oruga.notification) {
        this.$oruga.notification.open({
          message,
          duration: 5000,
          variant,
          queue: true,
          position: 'bottom'
        });
      }
    },
    
    /**
     * Original method for backward compatibility
     */
    initialize() {
      this.debouncedPriceUpdate();
    },

    setAsPaymentMethod(val) {
      this.setPaymentMethod(val);
    },
    
    activeStepPrev(stepNo) {
      this.handleActiveStep(stepNo);
    },
    
    checkLesserMinimumAmount(minAmount) {
      return this.isBelowMinimumAmount(minAmount);
    }
  }
};
</script>

<style lang="postcss" scoped>
.payment-module {
  @apply bg-white p-8;
}

.payment-section {
  @apply order-2 md:order-1;
}

.summary {
  @apply order-1 md:order-2;
}

/* Loading animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.payment-module,
.summary > div {
  animation: fadeIn 0.3s ease-in-out;
}
</style>
