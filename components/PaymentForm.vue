<template>
  <div class="flex w-full flex-col justify-center gap-4 md:flex-row">
    <div class="payment-section flex grow flex-col bg-gray-200">

      <div class="flex">
        <PaymentTab
          v-if="showPaypal"
          :active="paymentMethod === 'paypal'"
          @click="setAsPaymentMethod('paypal')"
        >
          Paypal
        </PaymentTab>
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

      <PaypalCheckout
        v-if="paymentMethod === 'paypal'"
        id="paypal-payment-form"
        class="payment-module p-10"
        :cart-total="overallTotal"
        @active-step="activeStepPrev"
      />

      <StripeCheckout
        v-if="paymentMethod === 'stripe'"
        class="payment-module gap-3 text-gray-600"
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
      <ul class="px-2">
        <li class="mb-1 flex justify-between">
          <span>Subtotal:</span>
          <span>{{ formatCurrency(subtotal) }}</span>
        </li>
        <li class="mb-1 flex justify-between">
          <span>Shipping:</span>
          <span>{{ formatCurrency(shipping) }}</span>
        </li>
        <li class="mb-1 flex justify-between">
          <span>GST:</span>
          <span>{{ formatCurrency(newGST) }}</span>
        </li>
        <li class="mt-3 flex justify-between border-t pt-3">
          <span>Total price:</span>
          <span class="font-bold text-gray-900">
            {{ formatCurrency(overallTotal) }}
          </span>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import PaypalCheckout from '~/components/PaypalCheckout.vue';
import SquareCheckout from '~/components/SquareCheckout.vue';
import PaymentTab from '~/components/payment/PaymentTab';
import currencyMixin from '~/mixins/currency';
import StripeCheckout from '~/components/StripeCheckout.vue';

export default {
  components: {
    PaypalCheckout,
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
      paymentMethod: 'paypal',
      isStepperLoading: false,
      overallTotal: 0,
      newSubTotal: 0,
      newGST: 0,
      showPaypal: true,
      showSquare: false,
      showStripe: true
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
    shippingInformation: {
      get() {
        return this.$store.state.order.shippingInformation;
      },
      set(v) {
        this.$store.commit('order/setShippingInformation', v);
      },
    },
  },
  mounted() {
    this.$store.commit('order/setPaymentMethod', this.paymentMethod)
    this.initialize()
  },
  methods: {
    setAsPaymentMethod(val) {
      this.paymentMethod = val
      this.$store.commit('order/setPaymentMethod', this.paymentMethod)
    },
    activeStepPrev(stepNo) {
      this.$emit('active-step', stepNo)
    },
    initialize() {
      this.isStepperLoading = true
      const items = this.$store.state.cart.cart
      const metadata = this.shippingInformation
      // eslint-disable-next-line camelcase
      const payment_method = this.paymentMethod
      this.$axios
        .$post('v1/orders/calculation', {
          items,
          metadata,
          // eslint-disable-next-line camelcase
          payment_method
        })
        .then((response) => {
          this.activeStep = 2
          if (this.shippingInformation.shippingType === 'pickup') {
            response.shippingCalculation.totalShipping = 0
          }
          this.$store.commit('cart/setShipping', response.shippingCalculation.totalShipping/100)
          this.$store.commit('cart/setTotal', response.shippingCalculation.totalProduct)
          this.newSubTotal = (this.subtotal + (this.shipping));
          this.newGST = this.newSubTotal * 0.1;
          this.overallTotal = this.newGST + this.newSubTotal;
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