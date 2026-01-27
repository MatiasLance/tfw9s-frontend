<template>
  <div class="flex w-full flex-col justify-center gap-4 md:flex-row">
    <div class="payment-section flex grow flex-col bg-gray-200">
      <div class="flex">
        <PaymentTab
          v-if="showStripe"
          :active="paymentMethod === 'stripe'"
          @click="setAsPaymentMethod('stripe')"
          :disabled="isProcessing || isLoading"
        >
          Credit Card
        </PaymentTab>
        <PaymentTab
          v-if="showSquare"
          :active="paymentMethod === 'square'"
          @click="setPaymentMethod('square')"
          :disabled="isProcessing || isLoading"
        >
          Square
        </PaymentTab>
      </div>

      <StripeCheckout
        v-if="paymentMethod === 'stripe' && showStripe"
        class="payment-module gap-3 text-gray-600"
        :discount-code="discountcode"
        :disabled="isProcessing || isLoading"
        @active-step="activeStepPrev"
      />

      <SquareCheckout
        v-if="paymentMethod === 'square' && showSquare"
        class="payment-module p-10"
        :cart-total="overAllTotal"
        :disabled="isProcessing || isLoading"
        @active-step="activeStepPrev"
      />
    </div>

    <article class="summary flex w-full flex-col justify-center bg-white p-2 text-gray-600 md:w-80">
      <h2 class="mb-3 flex justify-center text-lg font-semibold">
        Order Summary
      </h2>
      
      <!-- Discount Code Form -->
      <div v-if="showDiscountCodeForm" class="mb-6 border-b border-gray-200 pb-6">
        <form @submit.prevent="applyDiscount()">
          <div class="-mx-2 flex items-end justify-end">
            <div class="grow px-2 lg:max-w-xs">
              <label class="mb-2 ml-1 text-xs font-semibold text-gray-600">
                Discount Code
              </label>
              <input
                v-model="discountcode"
                class="border-swd-lgrey w-full rounded-md border-2
                border-solid px-3 py-2 text-lg font-bold uppercase
                text-brand-mgrey transition-colors placeholder:text-brand-slate
                focus:border-brand-grey focus:outline-none"
                :class="{ 'border-red-500': showErrorMessage }"
                placeholder="XXXXXXX"
                maxlength="20"
                type="text"
                @keydown.space.prevent
                @input="validateDiscountCode"
                :disabled="isProcessing"
              />
            </div>
            <div class="px-2">
              <button
                v-if="!isDiscountCodeMatch"
                type="submit"
                class="mx-auto block w-full max-w-xs rounded-md border
                border-transparent bg-gray-500 px-3 py-2.5 font-semibold
                text-white hover:bg-gray-400 focus:border-brand-dgrey
                disabled:cursor-not-allowed disabled:bg-gray-200"
                :disabled="isFormNotFilled || isProcessing"
              >
                APPLY
              </button>
              <VBtn
                v-else
                class="mx-auto block w-full max-w-xs rounded-md border
                border-transparent bg-gray-400 px-3 py-2.5 font-semibold
                text-white hover:bg-gray-500 focus:bg-gray-500"
                @click="removeDiscount"
                :disabled="isProcessing"
              >
                CLEAR
              </VBtn>
            </div>
          </div>
          
          <!-- Error Messages -->
          <div v-if="showErrorMessage || showMinimumAmountMessage" class="my-2 space-y-1">
            <small v-if="showErrorMessage"
            class="block text-sm font-semibold text-red-600"
            >
              {{ ResponseMessage }}
            </small>
            <small v-if="showMinimumAmountMessage"
            class="block text-sm font-semibold text-red-600"
            >
              {{ ResponseMessage2 }}
            </small>
          </div>
        </form>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading"
      class="flex flex-col items-center justify-center p-8"
      >
        <VProgressCircular
          size="125"
          width="15"
          indeterminate
          color="gray lighten-2"
        />
        <p class="mt-4 text-gray-500">
            Calculating totals...
        </p>
      </div>

      <!-- Summary Content -->
      <div v-if="!isLoading" class="px-2">
        <ul class="space-y-3">
          <li class="flex justify-between border-b pb-2">
            <span>Sub-Total:</span>
            <span class="font-medium">{{ formatCurrency(subTotal) }}</span>
          </li>
          <li class="flex justify-between border-b pb-2">
            <span>GST:</span>
            <span>
              <span v-if="showGSTIncluded" class="text-green-600">GST Inclusive</span>
              <span v-if="showGSTExcluded" class="text-amber-600">GST Exclusive</span>
            </span>
          </li>
          <li class="flex justify-between border-b pb-2">
            <span>Tax:</span>
            <span class="font-medium">{{ formatCurrency(taxAmount) }}</span>
          </li>
          
          <!-- Shipping -->
          <li v-if="shippingInformation.shipOption === 'pickup'"
          class="flex justify-between border-b pb-2"
          >
            <span>Shipping:</span>
            <span class="text-green-600 font-medium">FREE</span>
          </li>
          <li v-else class="flex justify-between border-b pb-2">
            <span>Shipping:</span>
            <span class="font-medium">{{ formatCurrency(shippingPreTax) }}</span>
          </li>
          
          <!-- Discount Applied -->
          <li v-if="isDiscountCodeMatch" class="flex justify-center border-t pt-3">
            <span class="font-bold text-green-600">
              ({{ formatDiscountRate(discountRate) }}% discount applied)
            </span>
          </li>
          
          <!-- Grand Total -->
          <li class="mt-4 flex justify-between border-t pt-4">
            <span class="text-lg font-bold">Grand Total:</span>
            <span class="text-xl font-bold text-gray-900">
              {{ formatCurrency(overAllTotal) }}
            </span>
          </li>
        </ul>
        
        <!-- Payment Method Info -->
        <div v-if="selectedPaymentMethod" class="mt-6 rounded-lg bg-blue-50 p-3">
          <p class="text-sm text-blue-800">
            <span class="font-semibold">Payment Method:</span> {{ selectedPaymentMethod }}
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import currency from 'currency.js';
import SquareCheckout from '~/components/SquareCheckout.vue';
import PaymentTab from '~/components/payment/PaymentTab';
import currencyMixin from '~/mixins/currency';
import StripeCheckout from '~/components/StripeCheckout.vue';

const API_ENDPOINTS = {
  TAX_CONTROL: 'v1/toggletax/',
  DISCOUNT_VERIFY: '/v1/discountcode/verifycode',
  ORDER_CALCULATION: 'v1/orders/calculation'
};

const PAYMENT_METHODS = {
  STRIPE: 'stripe',
  SQUARE: 'square'
};

const NOTIFICATION_DURATION = 5000;
const MINIMUM_AMOUNT_DEFAULT = 500;

export default {
  components: {
    SquareCheckout,
    PaymentTab,
    StripeCheckout
  },
  mixins: [ currencyMixin ],
  props: {
    subtotal: {
      type: Number,
      required: true,
      validator: value => !isNaN(value) && value >= 0
    }
  },
  data() {
    return {
      isLoading: false,
      isProcessing: false,
      showStripe: true,
      showSquare: false,
      paymentMethod: PAYMENT_METHODS.STRIPE,
      showGSTIncluded: true,
      showGSTExcluded: false,
      isGSTInclusive: true,
      overAllTotal: 0,
      subTotal: 0,
      shippingPreTax: 0,
      taxAmount: 0,
      originalAmount: {
        subtotal: 0,
        gst: 0,
        total: 0,
        taxamount: 0,
      },
      showDiscountCodeForm: true,
      discountcode: null,
      discountRate: 0,
      isDiscountCodeMatch: false,
      isFormNotFilled: true,
      showErrorMessage: false,
      showMinimumAmountMessage: false,
      ResponseMessage: '',
      ResponseMessage2: '',
      minimumAmount: MINIMUM_AMOUNT_DEFAULT,
      taxrateValue: 0,
      gstrateValue: 0.1
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
    taxAmountStore: {
      get() {
        return this.$store.state.cart.taxAmount;
      },
      set(v) {
        this.$store.commit('cart/setTaxAmount', v);
      }
    },
    shippingInformation: {
      get() {
        return this.$store.state.order.shippingInformation;
      },
      set(v) {
        this.$store.commit('order/setShippingInformation', v);
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
        return this.$store.state.shop.paymentIntent;
      },
      set(v) {
        this.$store.commit('shop/setPaymentIntent', v);
      }
    },

    selectedPaymentMethod() {
      const methods = {
        [ PAYMENT_METHODS.STRIPE ]: 'Credit Card (Stripe)',
        [ PAYMENT_METHODS.SQUARE ]: 'Square'
      };
      return methods[this.paymentMethod];
    },

    isDiscountCodeValid() {
      return this.discountcode && this.discountcode.trim().length > 0;
    }
  },
  watch: {
    subtotal: {
      immediate: true,
      handler(newSubtotal) {
        if (!isNaN(newSubtotal) && newSubtotal >= 0) {
          this.initialize();
        }
      }
    }
  },
  async mounted() {
    await this.initializeComponent();
  },
  beforeDestroy() {
    this.clearTimeouts();
  },
  methods: {
    /**
     * Initialize component with proper error handling
     */
    async initializeComponent() {
      try {
        this.isProcessing = true;

        await this.retrieveToggleTaxControl();

        this.setOriginalAmount();

        await this.initialize();

        this.$store.commit('order/setPaymentMethod', this.paymentMethod);
        
      } catch (error) {
        this.handleError('Failed to initialize payment component', error);
      } finally {
        this.isProcessing = false;
      }
    },
    
    /**
     * Set original amounts for comparison
     */
    setOriginalAmount() {
      if (isNaN(this.subtotal)) {
        console.warn('Invalid subtotal value');
        return;
      }
      
      this.originalAmount = {
        subtotal: this.subtotal,
        total: this.overAllTotal || 0,
        taxamount: this.taxAmount || 0,
        timestamp: Date.now()
      };
      
      // Calculate tax amount
      const taxRate = this.tax || 0;
      this.taxAmount = this.subtotal * (taxRate / 100);
      this.originalAmount.taxamount = this.taxAmount;
    },
    
    /**
     * Load tax configuration from API
     */
    async retrieveToggleTaxControl() {
      try {
        const response = await this.$axios.$get(API_ENDPOINTS.TAX_CONTROL);
        
        if (response && typeof response.toggleControl2 !== 'undefined') {
          this.toggleControl2 = Boolean(response.toggleControl2);
          this.$store.commit('master/setToggleControl2', this.toggleControl2);
          
          // Update GST display based on toggle
          this.showGSTIncluded = this.toggleControl2;
          this.showGSTExcluded = !this.toggleControl2;
          this.isGSTInclusive = this.toggleControl2;
        }
      } catch (error) {
        console.warn('Failed to load tax settings, using defaults:', error);
        // Show user-friendly notification
        this.showNotification(
          'Unable to load tax information. Using default settings.',
          'warning'
        );
        // Use default values - don't break the flow
        this.toggleControl2 = true;
        this.showGSTIncluded = true;
        this.showGSTExcluded = false;
        this.isGSTInclusive = true;
      }
    },
    
    /**
     * Validate discount code input
     */
    validateDiscountCode() {
      if (this.discountcode) {
        const trimmed = this.discountcode.trim();
        this.isFormNotFilled = trimmed.length === 0;
        
        // Auto-uppercase and remove extra spaces
        if (trimmed !== this.discountcode) {
          this.discountcode = trimmed.toUpperCase();
        }
      } else {
        this.isFormNotFilled = true;
      }
      
      // Clear errors when user starts typing
      this.showErrorMessage = false;
      this.showMinimumAmountMessage = false;
    },
    
    /**
     * Set payment method with validation
     */
    setAsPaymentMethod(val) {
      if (this.isProcessing || this.isLoading) {
        return;
      }
      
      if ([ PAYMENT_METHODS.STRIPE, PAYMENT_METHODS.SQUARE ].includes(val)) {
        this.paymentMethod = val;
        this.$store.commit('order/setPaymentMethod', val);
      }
    },
    
    /**
     * Check if amount meets minimum requirement
     */
    checkLesserMinimumAmount(minAmount) {
      if (isNaN(this.subtotal) || this.subtotal < 0) {
        return true; // Invalid amount fails check
      }
      
      return this.subtotal < minAmount;
    },
    
    /**
     * Apply discount code with proper validation
     */
    async applyDiscount() {
      if (!this.isDiscountCodeValid || this.isProcessing) {
        return;
      }
      
      try {
        this.isProcessing = true;
        
        this.showNotification('Verifying discount code...', 'info');
        
        const response = await this.$axios.$post(API_ENDPOINTS.DISCOUNT_VERIFY,
          { code: this.discountcode.trim() }
        );
        
        if (response.isExist && response.discountcode) {
          const discountCode = response.discountcode;
          this.minimumAmount = Number(discountCode.amountapplied) || MINIMUM_AMOUNT_DEFAULT;
          
          // Check minimum amount requirement
          if (this.checkLesserMinimumAmount(this.minimumAmount)) {
            this.showErrorMessage = true;
            this.ResponseMessage = `Cart subtotal is less than $${this.minimumAmount}
            minimum order required for this code.`;

            this.clearErrorAfterDelay();
            return;
          }

          this.discountRate = Number(discountCode.rate) || 0;

          const newSubTotal = currency(this.subtotal)
            .multiply(1 - this.discountRate);

          if (this.isGSTInclusive) {
            this.overAllTotal = newSubTotal.value;
          } else {
            const taxPercent = this.tax || 0;
            const gstAmount = newSubTotal.multiply(taxPercent / 100);
            this.overAllTotal = newSubTotal.add(gstAmount).value;
          }
          
          // Update store
          this.$store.commit('cart/setSubtotal', newSubTotal.value);
          this.isDiscountCodeMatch = true;
          
          // Refresh calculations
          await this.initialize();
          
          this.showNotification(response.message || 'Discount applied successfully!', 'success');
          
        } else {
          this.handleInvalidDiscountCode();
        }
        
      } catch (error) {
        this.handleError('Failed to apply discount code', error);
        this.handleInvalidDiscountCode();
      } finally {
        this.isProcessing = false;
      }
    },
    
    /**
     * Handle invalid discount code
     */
    handleInvalidDiscountCode() {
      // Reset to original amounts
      this.resetToOriginalAmounts();
      this.isDiscountCodeMatch = false;
      this.discountRate = 0;
      
      this.showNotification(
        'Discount code is invalid. Please enter a valid code.',
        'error'
      );
    },
    
    /**
     * Remove applied discount
     */
    async removeDiscount() {
      if (this.isProcessing) return;
      
      try {
        this.isProcessing = true;
        this.showNotification('Removing discount...', 'info');
        
        // Reset to original amounts
        this.resetToOriginalAmounts();
        
        // Clear discount code
        this.discountcode = null;
        this.isDiscountCodeMatch = false;
        this.discountRate = 0;
        this.isFormNotFilled = true;
        
        // Refresh calculations
        await this.initialize();
        
        this.showNotification('Discount removed successfully', 'success');
        
      } catch (error) {
        this.handleError('Failed to remove discount', error);
      } finally {
        this.isProcessing = false;
      }
    },
    
    /**
     * Reset cart to original amounts
     */
    resetToOriginalAmounts() {
      this.$store.commit('cart/setSubtotal', this.originalAmount.subtotal);
      this.$store.commit('cart/setTotal', this.originalAmount.total);
      this.$store.commit('cart/setTaxAmount', this.originalAmount.taxamount);
      this.overAllTotal = this.originalAmount.total;
    },
    
    /**
     * Handle active step from child components
     */
    activeStepPrev(stepNo) {
      // Reset to original amounts before navigation
      this.resetToOriginalAmounts();
      this.isDiscountCodeMatch = false;
      
      // Emit event to parent
      this.$emit('active-step', stepNo);
    },
    
    /**
     * Initialize payment calculations
     */
    async initialize() {
      if (this.isProcessing) {
        return; // Prevent concurrent executions
      }
      
      try {
        this.isLoading = true;
        
        const items = this.$store.state.cart.cart || [];
        const metadata = this.shippingInformation || {};
        const discountcode = this.isDiscountCodeMatch ? this.discountcode : null;
        
        const response = await this.$axios.$post(API_ENDPOINTS.ORDER_CALCULATION, {
          items,
          metadata,
          discountcode
        });
        
        // Update financial data with validation
        this.overAllTotal = Number(response.grand_total) || 0;
        this.subTotal = Number(response.subtotal) || 0;
        this.shippingPreTax = Number(response.shipping) || 0;
        this.taxAmount = Number(response.tax) || 0;
        
        // Update store
        this.$store.commit('cart/setTotal', this.overAllTotal);
        
        // Update original amount if not already set
        if (!this.originalAmount.subtotal && this.subTotal > 0) {
          this.setOriginalAmount();
        }
        
      } catch (error) {
        this.handleError('Failed to calculate order totals', error);
        
        // Fallback to local calculation
        this.calculateFallbackTotals();
      } finally {
        this.isLoading = false;
      }
    },
    
    /**
     * Calculate fallback totals when API fails
     */
    calculateFallbackTotals() {
      try {
        const taxRate = this.tax || 0;
        const shipping = this.shippingInformation &&
         this.shippingInformation.shipOption === 'pickup' ? 0 : 10;
        
        this.subTotal = this.subtotal || 0;
        this.taxAmount = this.subTotal * (taxRate / 100);
        this.shippingPreTax = shipping;
        
        if (this.isDiscountCodeMatch && this.discountRate > 0) {
          const discountedSubtotal = currency(this.subTotal).multiply(1 - this.discountRate);

          if (this.isGSTInclusive) {
            this.overAllTotal = discountedSubtotal.value + shipping;
          } else {
            const gstAmount = discountedSubtotal.multiply(taxRate / 100);
            this.overAllTotal = discountedSubtotal.add(gstAmount).value + shipping;
          }
        } else if (this.isGSTInclusive) {
          this.overAllTotal = this.subTotal + shipping;
        } else {
          this.overAllTotal = this.subTotal + this.taxAmount + shipping;
        }

        this.$store.commit('cart/setTotal', this.overAllTotal);
        
        this.showNotification(
          'Using calculated totals. Some features may be limited.',
          'warning'
        );
      } catch (error) {
        console.error('Fallback calculation failed:', error);
        this.showNotification('Unable to calculate totals. Please refresh.', 'danger');
      }
    },

    /**
     * Show notification with consistent styling
     */
    showNotification(message, variant = 'info') {
      if (this.$oruga && this.$oruga.notification) {
        this.$oruga.notification.open({
          message,
          duration: NOTIFICATION_DURATION,
          variant,
          queue: true,
          position: 'bottom'
        });
      } else {
        // Fallback console logging for development
        console.log(`[${variant.toUpperCase()}] ${message}`);
      }
    },
    
    /**
     * Handle errors consistently
     */
    handleError(context, error) {
      console.error(`${context}:`, error);
      
      const userMessage = error.response && error.responsedata &&
      error.response.data.message || error.message || context;
      this.showNotification(userMessage, 'danger');
      
      // Set error state for UI
      this.showErrorMessage = true;
      this.ResponseMessage = userMessage;
      this.clearErrorAfterDelay();
    },
    
    /**
     * Clear error messages after delay
     */
    clearErrorAfterDelay() {
      setTimeout(() => {
        this.showErrorMessage = false;
        this.showMinimumAmountMessage = false;
        this.ResponseMessage = '';
        this.ResponseMessage2 = '';
      }, NOTIFICATION_DURATION);
    },
    
    /**
     * Clear all pending timeouts
     */
    clearTimeouts() {
      // Clear any pending timeouts
      const highestTimeoutId = setTimeout(() => {}, 0);
      for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
      }
    },
    
    /**
     * Format discount rate for display
     */
    formatDiscountRate(rate) {
      return (rate * 100).toFixed(1).replace(/\.0$/, '');
    },
    
    /**
     * Alias for Square payment method (maintains existing interface)
     */
    setPaymentMethod(val) {
      this.setAsPaymentMethod(val);
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

/* Disabled state styling */
button:disabled,
input:disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* Transition for smoother state changes */
.payment-module,
.summary > div {
  transition: opacity 0.2s ease-in-out;
}
</style>