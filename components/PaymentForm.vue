<template>
  <div class="flex w-full flex-col justify-center gap-4 md:flex-row">
    <div class="payment-section flex grow flex-col bg-gray-200">

      <div class="flex">
        <!--
          <PaymentTab
          v-if="showPaypal"
          :active="paymentMethod === 'paypal'"
          @click="setAsPaymentMethod('paypal')"
          >
          Paypal
          </PaymentTab>
        -->
        <PaymentTab
          v-if="showStripe"
          :active="paymentMethod === 'stripe'"
          @click="setAsPaymentMethod('stripe')"
        >
          Credit Card
        </PaymentTab>
        <PaymentTab
          v-if="showSquare"
          :active="paymentMethod === 'square'"
          @click="paymentMethod = 'square'"
        >
          Square
        </PaymentTab>
      </div>

      <!--
        <PaypalCheckout
        v-if="paymentMethod === 'paypal'"
        id="paypal-payment-form"
        class="payment-module p-10"
        :cart-total="overallTotal"
        :discount-code="discountcode"
        @active-step="activeStepPrev"
        />
      -->

      <StripeCheckout
        v-if="paymentMethod === 'stripe'"
        class="payment-module gap-3 text-gray-600"
        :discount-code="discountcode"
        @active-step="activeStepPrev"
      />

      <SquareCheckout
        v-if="paymentMethod === 'square'"
        class="payment-module p-10"
        :cart-total="overallTotal"
        @active-step="activeStepPrev"
      />
    </div>

    <article
      class="
        summary
        flex
        w-full
        flex-col
        justify-center
        bg-white
        p-2
        text-gray-600
        md:w-80
      "
    >
      <h2 class="mb-3 flex justify-center text-lg font-semibold">
        Summary
      </h2>
      <div class="mb-6 border-b border-gray-200 pb-6">
        <form
          v-if="showDiscountCodeForm"
          @submit.prevent="applyDiscount()"
        >
          <div class="-mx-2 flex items-end justify-end">
            <div class="grow px-2 lg:max-w-xs">
                  <label
                    class="mb-2 ml-1 text-xs font-semibold text-gray-600"
                  >Discount code</label>
                  <div>
                      <input
                        v-model="discountcode"
                        class="border-swd-lgrey w-full rounded-md border-2
                        border-solid px-3 py-2 text-lg font-bold
                        uppercase text-brand-mgrey
                        transition-colors
                        placeholder:text-brand-slate
                        focus:border-brand-grey focus:outline-none"
                        placeholder="XXXXXXX"
                        maxlength="20"
                        type="text"
                        @keydown.space.prevent
                        @change="checkDiscountCodeField()"
                      />
                  </div>
            </div>
            <div class="px-2">
              <button
                  v-if="!isDiscountCodeMatch"
                  type="submit"
                  class="mx-auto block w-full max-w-xs
                  rounded-md border border-transparent
                  bg-gray-500 px-3 py-2.5 font-semibold
                  text-white
                  hover:bg-gray-400 focus:border-brand-dgrey
                  disabled:cursor-not-allowed disabled:bg-gray-200"
                  :disabled="isFormNotFilled"
                >
                  APPLY
                </button>
                <VBtn
                  v-else
                  class="mx-auto block w-full max-w-xs
                  rounded-md border border-transparent
                  bg-gray-400 px-3 py-2.5 font-semibold
                  text-white
                  hover:bg-gray-500 focus:bg-gray-500"
                  @click="removeDiscount"
                >
                  CLEAR
                </VBtn>
            </div>
          </div>
          <div class="my-2">
                <small
                  v-if="showErrorMessage"
                  class="text-sm font-semibold text-brand-dred"
                >
                  {{ ResponseMessage }}
                </small>
          </div>
        </form>
      </div>
      <ul class="px-2">
        <li v-if="isDiscountCodeMatch" class="mb-1 flex justify-between">
          <span>Subtotal
            <span class="font-bold">
              ({{ discountRate * 100 }}% discount applied):</span>
          </span>
          <span>{{ formatCurrency(subtotal) }}</span>
        </li>
        <li v-else class="mb-1 flex justify-between">
          <span>Subtotal:</span>
          <span>{{ formatCurrency(subtotal) }}</span>
        </li>
        <li class="mb-1 flex justify-between">
          <span>Shipping:</span>
          <span>{{ formatCurrency(shipping) }}</span>
        </li>
        <li class="mb-1 flex justify-between">
          <span>GST:</span>
          <span v-if="showGSTIncluded" class="pl-2">GST Inclusive</span>
          <span v-if="showGSTExcluded" class="pl-2">GST Exclusive</span>
        </li>
        <li class="mt-3 flex justify-between border-t pt-3">
          <span>Total price:</span>
          <span class="font-bold text-gray-900">
            {{ formatCurrency(overallTotal) }}
          </span>
        </li>
        <li class="mb-1 flex justify-between text-xs font-light">
          <span>( Tax Amount:</span>
          <span>{{ formatCurrency(taxAmount) + ' )' }}</span>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import currency from 'currency.js';
// import PaypalCheckout from '~/components/PaypalCheckout.vue';
import SquareCheckout from '~/components/SquareCheckout.vue';
import PaymentTab from '~/components/payment/PaymentTab';
import currencyMixin from '~/mixins/currency';
import StripeCheckout from '~/components/StripeCheckout.vue';

export default {
  components: {
    // PaypalCheckout,
    SquareCheckout,
    PaymentTab,
    StripeCheckout
  },
  mixins: [ currencyMixin ],
  props: {
    subtotal: {
      type: [ Number ],
      required: true,
    },
  },
  data() {
    return {
      showGSTIncluded: true,
      showGSTExcluded: false,
      isGSTInclusive: true,
      paymentMethod: 'stripe',
      isStepperLoading: false,
      minimumAmount: 500,
      originalAmount: {
        subtotal: 0,
        gst: 0,
        total: 0,
        taxamount: 0,
      },
      overallTotal: 0,
      newSubTotal: 0,
      showPaypal: true,
      showSquare: false,
      showStripe: true,
      showDiscountCodeForm: true,
      discountcode: null,
      discount: -1,
      discountRateFixed: 0.3,
      discountRate: 0,
      taxrateValue: 0,
      isDiscountCodeMatch: false,
      isFormNotFilled: true,
      showErrorMessage: false,
      ResponseMessage: '',
      showMinimumAmountMessage: false,
      ResponseMessage2: '',
      showTaxInfo: true,
      gstrate: '10%',
      gstrateValue: 0.1
    };
  },
  computed: {
    shipping: {
      get() {
        return this.$store.state.cart.shipping
      },
      set(v) {
        this.$store.commit('cart/setShipping', v)
      }
    },
    tax: {
      get() {
        return this.$store.state.cart.tax
      },
      set(v) {
        this.$store.commit('cart/setTax', v)
      }
    },
    taxAmount: {
      get() {
        return this.$store.state.cart.taxAmount
      },
      set(v) {
        this.$store.commit('cart/setTaxAmount', v)
      }
    },
    shippingInformation: {
      get() {
        return this.$store.state.order.shippingInformation;
      },
      set(v) {
        this.$store.commit('order/setShippingInformation', v);
      },
    },
    toggleControl1: {
      get() {
        return (
          this.$store.state.master.toggleControl1
        )
      },
      set(val) {
        this.$store.commit('master/setToggleControl1', val)
      }
    },
    toggleControl2: {
      get() {
        return (
          this.$store.state.master.toggleControl2
        )
      },
      set(val) {
        this.$store.commit('master/setToggleControl2', val)
      }
    },
  },
  mounted() {
    this.retrieveToggleTaxControl();
    this.$store.commit('order/setPaymentMethod', this.paymentMethod)
    this.initialize()
    setTimeout(() => {
      this.setOriginalAmount()
    }, 2000);
  },
  methods: {
    setOriginalAmount() {
      this.originalAmount.subtotal = this.subtotal
      this.originalAmount.total = this.overallTotal
      this.originalAmount.taxamount = this.taxAmount
    },
    retrieveToggleTaxControl() {
      const id = 1;
      // todo: check endpoint
      const endpoint = `v1/toogletax/retrieve/${id}`
      this.$axios
        .$get(endpoint)
        .then((response) => {
          this.toggleControl1 = response.me.toggleControl1
          this.toggleControl2 = response.me.toggleControl2
          this.$store.commit('master/setToggleControl1', response.me.toggleControl1)
          this.$store.commit('master/setToggleControl2', response.me.toggleControl2)
          if (this.toggleControl1) {
            this.showGSTExcluded = true;
            this.showGSTIncluded = false;
            this.isGSTInclusive = false;
          }
          if (this.toggleControl2) {
            this.showGSTExcluded = false;
            this.showGSTIncluded = true;
            this.isGSTInclusive = true;
          }
        })
        .catch((err) => {
          this.$oruga.notification.open({
            message: err.message,
            duration: 5000,
            variant: 'danger',
            queue: true,
            position: 'bottom'
          })
        })
    },
    toCurrency(x) {
      return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(x)
    },
    checkDiscountCodeField() {
      if (this.discountcode.length !== 0) {
        this.isFormNotFilled = false;
        this.showMinimumAmountMessage = false;
      } else {
        this.isFormNotFilled = true;
      }
    },
    setAsPaymentMethod(val) {
      this.paymentMethod = val
      this.$store.commit('order/setPaymentMethod', this.paymentMethod)
    },
    checkLesserMinimumAmount(minAmount) {
      const isLesserThanMinimumAmount = (
        this.subtotal < minAmount)
      return isLesserThanMinimumAmount;
    },
    applyDiscount() {
      this.$oruga.notification.open({
        message: 'Verifying discount code',
        variant: 'info',
        duration: 5000,
        position: 'bottom',
        queue: true,
      });
      const endpoint = '/v1/discountcode/verifycode';
      const data = { code: this.discountcode }
      this.$axios
        .$post(endpoint, data)
        .then((response) => {
          if (response.isExist) {
            this.minimumAmount = +response.discountcode.amountapplied;
            if (this.checkLesserMinimumAmount(this.minimumAmount)) {
              this.showErrorMessage = true
              this.ResponseMessage = `
Cart Subtotal is less than $${this.minimumAmount} minimum order required
for this code.
`
              setTimeout(() => {
                this.showErrorMessage = false
              }, 5000);
            } else {
              setTimeout(() => {
                this.discountRate = response.discountcode.rate
                this.newSubTotal = currency(this.subtotal)
                  .multiply(1 - this.discountRate);

                if (this.isGSTInclusive) {
                // If GST is inclusive, overallTotal is the discounted subtotal
                  this.overallTotal = this.newSubTotal.value;
                } else {
                // If GST is exclusive, add GST to the discounted subtotal
                  const taxPercent = this.tax
                  const gstAmount = this.newSubTotal.multiply(taxPercent / 100);
                  this.overallTotal = this.newSubTotal.add(gstAmount).value;
                }
                this.$store.commit('cart/setSubtotal', this.newSubTotal)
                this.$store.commit('cart/setTotal', this.overallTotal)
                this.$oruga.notification.open({
                  message: response.message,
                  variant: 'success',
                  duration: 5000,
                  position: 'bottom',
                  queue: true,
                });
                this.isDiscountCodeMatch = true
                this.initialize()
              }, 2000);
            }
          } else {
            setTimeout(() => {
              this.$store.commit('cart/setSubtotal', this.originalAmount.subtotal)
              this.$store.commit('cart/setGst', this.originalAmount.gst)
              this.$store.commit('cart/setTotal', this.originalAmount.total)
              this.$store.commit('cart/setTaxAmount', this.originalAmount.taxAmount)
              this.$oruga.notification.open({
                message: 'Discount code is invalid. Please enter a valid code',
                variant: 'error',
                duration: 5000,
                position: 'bottom',
                queue: true,
              });
              this.isDiscountCodeMatch = false
            }, 2000)
          }
        })
        .catch((err) => {
          this.$oruga.notification.open({
            message: err.message,
            variant: 'error',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
        })

    },
    removeDiscount() {
      this.discountcode = null
      this.$oruga.notification.open({
        message: 'Removing discount',
        variant: 'info',
        duration: 5000,
        position: 'bottom',
        queue: true,
      });
      setTimeout(() => {
        this.$store.commit('cart/setSubtotal', this.originalAmount.subtotal)
        this.$store.commit('cart/setGst', this.originalAmount.gst)
        this.$store.commit('cart/setTotal', this.originalAmount.total)
        this.$store.commit('cart/setTaxAmount', this.originalAmount.taxamount)
        this.overallTotal = this.originalAmount.total
        this.isDiscountCodeMatch = false
      }, 1000)
    },
    activeStepPrev(stepNo) {
      this.$emit('active-step', stepNo)
    },
    initialize() {
      this.isStepperLoading = true
      const items = this.$store.state.cart.cart
      const metadata = this.shippingInformation
      const discounted = this.isDiscountCodeMatch
      const discountcode = this.discountcode ?? ''
      // eslint-disable-next-line camelcase
      const payment_method = this.paymentMethod
      this.$axios
        .$post('v1/orders/calculation', {
          items,
          metadata,
          // eslint-disable-next-line camelcase
          payment_method,
          // todo: pass discounted and discountcode entered ?
          discounted,
          discountcode
        })
        .then((response) => {
          this.activeStep = 2
          if (this.shippingInformation.shippingType === 'pickup') {
            response.shippingCalculation.totalShipping = 0
          }
          this.$store.commit('cart/setShipping', response.shippingCalculation.totalShipping/100)
          this.$store.commit('cart/setTotal', response.shippingCalculation.totalProduct)
          this.newSubTotal = (this.subtotal + (this.shipping));
          let total = 0
          let taxamount = 0
          if (this.toggleControl1) {
            total = currency(this.newSubTotal, { fromCents: false })
              .multiply(1 + this.tax / 100)
              .value;
            taxamount = currency(total, { fromCents: false })
              .multiply(this.tax)
              .divide(100)
              .value
            this.taxAmount = taxamount;
          } else {
            total = this.newSubTotal
            if (this.shipping > 0) {
              taxamount = currency(total, { fromCents: false })
                .multiply(this.tax)
                .divide(100)
                .value
              this.taxAmount = taxamount;
            }
          }
          this.overallTotal = total;
        })
        .finally(() => {
          this.isStepperLoading = false
        })
        .catch((err) => {
          console.log(err.message)
        })
    },
  }
};
</script>

<style scoped>
.payment-module {
  @apply bg-white p-8;
}

.payment-section {
  @apply order-2 md:order-1;
}

.summary {
  @apply order-1 md:order-2;
}
</style>
