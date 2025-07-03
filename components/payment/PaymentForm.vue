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
          v-if="showStripe && seriestype === 'tournament' ||
          seriestype === 'coast'"
          :active="paymentMethod === 'stripe'"
          @click="setAsPaymentMethod('stripe')"
        >
          Credit Card
        </PaymentTab>
        <PaymentTab
          v-if="showSquare && seriestype === 'weekly'"
          :active="paymentMethod === 'afterpay'"
          @click="paymentMethod = 'afterpay'"
        >
          Afterpay
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
        :series="series"
        :seriestype="seriestype"
        :price="price"
        @active-step="activeStepPrev"
      />

      <AfterPayCheckout
        v-if="paymentMethod === 'afterpay'"
        class="payment-module p-10"
        :series="series"
        :seriestype="seriestype"
        :price="price"
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
      <ul v-if="isLoading" class="px-2">
        <li class="mb-1 flex justify-center">
          <VProgressCircular
          size="125"
          width="15"
          indeterminate
          color="gray lighten-2"
        />
        </li>
      </ul>
      <ul
      v-if="!isLoading"
      class="px-2"
      >
        <li class="mb-1 flex justify-between">
          <span>Subtotal:</span>
          <span>{{ formatCurrencyFromCent(price) }}</span>
        </li>
        <li class="mb-1 flex justify-between">
          <span>GST:</span>
          <span v-if="showGSTIncluded" class="pl-2">GST Inclusive</span>
          <span v-if="showGSTExcluded" class="pl-2">GST Exclusive</span>
        </li>
        <li class="mb-1 flex justify-between">
          <span>Tax Amount:</span>
          <span>{{ formatCurrencyFromCent(taxAmount) }}</span>
        </li>
        <li class="mt-3 flex justify-between">
          <span>Total price:</span>
          <span class="font-bold text-gray-900">
            {{ formatCurrencyFromCent(overallTotal) }}
          </span>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import PaymentTab from '~/components/payment/PaymentTab';
import currencyMixin from '~/mixins/currency/handlesCurrency';
import StripeCheckout from '~/components/registration/StripeCheckout.vue';
import AfterPayCheckout from '~/components/registration/AfterPayCheckout.vue';

export default {
  components: {
    PaymentTab,
    StripeCheckout,
    AfterPayCheckout
  },
  mixins: [ currencyMixin ],
  props: {
    subtotal: {
      type: [ Number ],
      required: true,
    },
    series: {
      type: [ String ],
      required: true
    },
    seriestype: {
      type: [ String ],
      required: true
    },
    price: {
      type: [ String ],
      required: true
    },
  },
  data() {
    return {
      showGSTIncluded: true,
      showGSTExcluded: false,
      isGSTInclusive: true,
      paymentMethod: 'stripe',
      isLoading: false,
      minimumAmount: 500,
      originalAmount: {
        subtotal: 0,
        gst: 0,
        total: 0,
      },
      overallTotal: 0,
      newSubTotal: 0,
      showPaypal: false,
      showSquare: true,
      showStripe: true,
      taxrateValue: 0,
      isFormNotFilled: true,
      showErrorMessage: false,
      ResponseMessage: '',
      showMinimumAmountMessage: false,
      ResponseMessage2: '',
      showTaxInfo: true,
      gstrate: '10%',
      gstrateValue: 0.1,
      afterDiscount: 0,
      regularPrice: 0,
    };
  },
  computed: {
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
    paymentIntent: {
      get() {
        return this.$store.state.registration.paymentIntent;
      },
      set(v) {
        this.$store.commit('registration/setPaymentIntent', v);
      }
    }
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
    },
    retrieveToggleTaxControl() {
      const id = 1;
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
    setAsPaymentMethod(val) {
      this.paymentMethod = val
      this.$store.commit('order/setPaymentMethod', this.paymentMethod)
    },
    checkLesserMinimumAmount(minAmount) {
      const isLesserThanMinimumAmount = (
        this.price/100 < minAmount)
      return isLesserThanMinimumAmount;
    },
    activeStepPrev(stepNo) {
      this.$emit('active-step', stepNo)
    },
    initialize() {
      this.isLoading = true
      const item = this.$route.query.id
      const toggleControl1 = this.toggleControl1
      const toggleControl2 = this.toggleControl2
      const tax = this.tax
      const paymentIntent = this.paymentIntent
      const paymentMethod = this.paymentMethod

      let endpoint = ''

      if (this.seriestype === 'weekly') {
        endpoint = '/v1/tournament/indiv/calculation'
      } else {
        endpoint = '/v1/tournament/team/calculation'
      }
      this.$axios
        .$post(endpoint, {
          item,
          toggleControl1,
          toggleControl2,
          tax,
          paymentIntent,
          paymentMethod,
        })
        .then((response) => {
          this.activeStep = 2
          let total = 0
          total = response.calculation.totalPrice;
          this.overallTotal = total;
          this.taxAmount = response.calculation.taxAmount;
          this.afterDiscount = response.calculation.afterDiscount;
          this.regularPrice = response.calculation.regularPrice;

          this.$store.commit('cart/setSubtotal', this.price)
          this.$store.commit('cart/setTotal', this.overallTotal)
        })
        .finally(() => {
          this.isLoading = false
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
