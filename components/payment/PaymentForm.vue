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
          v-if="stripeEnabled"
          :active="paymentMethod === 'stripe'"
          @click="setAsPaymentMethod('stripe')"
        >
          Credit Card
        </PaymentTab>
        <PaymentTab
          v-if="afterpayEnabled"
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
        v-if="paymentMethod === 'stripe' && stripeEnabled"
        class="payment-module gap-3 text-gray-600"
        :series="series"
        :seriestype="seriestype"
        :price="price"
        @active-step="activeStepPrev"
      />

      <AfterPayCheckout
        v-if="paymentMethod === 'afterpay' && afterpayEnabled"
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
          <span>{{ formatCurrencyFromCent(subTotal) }}</span>
        </li>
        <li class="mb-1 flex justify-between">
          <span>GST:</span>
          <span v-if="showGSTIncluded" class="pl-2">GST Inclusive</span>
          <span v-if="showGSTExcluded" class="pl-2">GST Exclusive</span>
        </li>
        <li class="mb-1 flex justify-between">
          <span>Tax Amount:</span>
          <span>{{ formatCurrency(taxAmount) }}</span>
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
    series: {
      type: [ String ],
      required: true
    },
    seriestype: {
      type: [ String ],
      required: true
    },
    price: {
      type: [ Number, String ],
      required: true,
      default: 0
    }
  },
  data() {
    return {
      showGSTIncluded: true,
      showGSTExcluded: false,
      isGSTInclusive: true,
      paymentMethod: 'stripe',
      isLoading: false,
      originalAmount: {
        subtotal: 0,
        gst: 0,
        total: 0,
      },
      overallTotal: 0,
      showPaypal: false,
      showSquare: true,
      showStripe: true,
      isFormNotFilled: true,
      showErrorMessage: false,
      ResponseMessage: '',
      showMinimumAmountMessage: false,
      ResponseMessage2: '',
      showTaxInfo: true,
      subTotal: 0,
      taxAmount: 0,
      stripeEnabled: false,
      afterpayEnabled: false
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
    this.listOfPaymentSetting();
    setTimeout(() => {
      this.setOriginalAmount()
      this.$nextTick(() => {
        if (this.stripeEnabled) {
          this.setAsPaymentMethod('stripe')
        } else {
          this.setAsPaymentMethod('afterpay')
        }
      })
    }, 2000);
  },
  methods: {
    listOfPaymentSetting() {
      this.$axios
        .$get(`v1/payment/setting/`)
        .then((response) => {
          this.stripeEnabled = response.stripe_enabled
          this.afterpayEnabled = response.afterpay_enabled
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
      const amount = this.registrationInformation.price / 100;
      const discountID = this.registrationInformation.discountCodeId

      let endpoint = ''

      if (this.seriestype === 'weekly') {
        endpoint = '/v1/tournament/indiv/stripe/calculation'
      } else {
        endpoint = '/v1/tournament/team/stripe/calculation'
      }
      this.$axios
        .$post(endpoint, {
          item,
          amount,
          discountID
        })
        .then((response) => {
          this.activeStep = 2
          this.overallTotal = response.totalPrice;
          this.taxAmount = response.taxAmount;
          this.subTotal = response.subTotal;

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
