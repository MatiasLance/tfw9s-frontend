<template>
  <div class="flex w-full flex-col justify-center gap-4 md:flex-row">
    <div class="payment-section flex grow flex-col bg-gray-200">

      <div class="flex">
        <PaymentTab
          :active="paymentMethod === 'square'"
          @click="paymentMethod = 'square'"
        >
          Credit Card
        </PaymentTab>
        <PaymentTab
          :active="paymentMethod === 'paypal'"
          @click="paymentMethod = 'paypal'"
        >
          Paypal
        </PaymentTab>
      </div>

      <PaypalCheckout
        v-show="paymentMethod === 'paypal'"
        id="paypal-payment-form"
        class="payment-module p-10"
        :cart-total="total"
      />

      <SquareCheckout
        v-show="paymentMethod === 'square'"
        class="payment-module p-10"
        :cart-total="total"
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
          <span>{{ formatCurrency(gst) }}</span>
        </li>
        <li class="mt-3 flex justify-between border-t pt-3">
          <span>Total price:</span>
          <span class="font-bold text-gray-900">
            {{ formatCurrency(total) }}
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

export default {
  components: {
    PaypalCheckout,
    SquareCheckout,
    PaymentTab
  },
  mixins: [ currencyMixin ],
  props: {
    subtotal: {
      type: [ Number ],
      required: true,
    },
    gst: {
      type: [ Number ],
      required: true,
    },
    total: {
      type: [ Number ],
      required: true,
    },
    shipping: {
      type: [ Number ],
      required: true
    }
  },
  data() {
    return {
      paymentMethod: 'square',
      isStepperLoading: false,
      overallTotal: 0,
      newSubTotal: 0,
      newGST: 0
    };
  },
  computed: {
    shippingInformation: {
      get() {
        return this.$store.state.order.shippingInformation;
      },
      set(v) {
        this.$store.commit('order/setShippingInformation', v);
      },
    },
  },
  methods: {
    initialize() {
      this.isStepperLoading = true
      const items = this.$store.state.cart.cart
      const metadata = this.shippingInformation
      this.$axios
        .$post('v1/orders/checkout', {
          items,
          metadata
        })
        .then((response) => {
          this.activeStep = 2
          this.$store.commit('cart/setShipping', response.totalShipping)
          this.$store.commit('cart/setTotal', response.totalProduct)
          this.newSubTotal = (this.subtotal + this.shipping);
          this.newGST = this.newSubTotal * 0.1;
          this.overallTotal = this.newGST + this.newSubTotal;
        })
        .finally(() => {
          this.isStepperLoading = false
        })
    }
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