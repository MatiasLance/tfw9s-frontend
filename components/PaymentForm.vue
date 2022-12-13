<template>
  <div class="flex w-full flex-col justify-center gap-4 md:flex-row">
    <div class="payment-section flex grow flex-col bg-gray-200">

      <div class="flex">
        <PaymentTab
          :active="paymentMethod === 'stripe'"
          @click="paymentMethod = 'stripe'"
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

      <div
        v-if="paymentMethod === 'stripe'"
        class="payment-module gap-3 text-gray-600"
      >
        <form class="w-full" @submit.prevent="handleSubmit">
          <div id="payment-element">
            <!-- Stripe.js injects the Payment Element -->
          </div>
          <button id="stripeSubmit" type="submit">
            <div id="spinner" class="spinner hidden"></div>
            <span id="button-text">Pay now</span>
          </button>
          <a
            class="
              mt-3
              block
              w-full
              border border-gray-200
              bg-white
              py-[16px]
              px-[12px]
              text-center text-gray-700
              shadow-sm
              hover:bg-gray-100 hover:text-[#1a1d18]
            "
            href="/cart"
          >
            Return to cart
          </a>
          <div id="payment-message" class="hidden"></div>
        </form>
      </div>

      <PaypalCheckout
        v-else-if="paymentMethod === 'paypal'"
        id="paypal-payment-form"
        class="payment-module p-10"
        :cart-total="total"
      />

      <div
        v-else-if="paymentMethod === 'afterpay'"
        class="flex gap-3 text-gray-600"
      >
        <form id="afterpay-form" @submit.prevent="handleSubmitAfterpay">
          <legend>
            <h2 class="mb-3 block text-lg font-semibold">
              Payment Method (Afterpay)
            </h2>
          </legend>
          <a
            class="
              mt-3
              block
              w-full
              border border-gray-200
              bg-white
              py-[16px]
              px-[12px]
              text-center text-gray-700
              shadow-sm
              hover:bg-gray-100 hover:text-[#1a1d18]
            "
            href="/cart"
          >
            Return to cart
          </a>
        </form>
      </div>
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
import PaymentTab from '~/components/payment/PaymentTab';
import currencyMixin from '~/mixins/currency';

let elements;

export default {
  components: {
    PaypalCheckout,
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
  },
  data() {
    return { paymentMethod: 'stripe' };
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.isStepperLoading = true;
      const items = this.$store.state.cart.cart;
      const metadata = this.shippingInformation;
      const clientSecret = await this.$axios
        .$post('v1/orders/checkout', {
          items,
          metadata,
        })
        .then((response) => {
          this.activeStep = 2;
          return response;
        })
        .finally(() => {
          this.isStepperLoading = false;
        });

      this.loadStripe(clientSecret);
    },
    loadStripe(clientSecret) {
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
          borderRadius: '2px',
          // See all possible variables below
        },
      };

      elements = this.$stripe.elements({ clientSecret, appearance });
      const paymentElement = elements.create('payment');
      paymentElement.mount('#payment-element');
    },
    async handleSubmit() {
      this.setLoading(true);
      const { error } = await this.$stripe.confirmPayment({
        elements,
        // eslint-disable-next-line camelcase
        confirmParams: { return_url: `${this.$config.baseURL}/thank-you` },
      });

      if (error.type === 'card_error' || error.type === 'validation_error') {
        this.showMessage(error.message);
      } else {
        this.showMessage('An unexpected error occurred.');
      }

      this.setLoading(false);
    },
    setLoading(isLoading) {
      if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector('#stripeSubmit').disabled = true;
        document.querySelector('#spinner').classList.remove('hidden');
        document.querySelector('#button-text').classList.add('hidden');
      } else {
        document.querySelector('#stripeSubmit').disabled = false;
        document.querySelector('#spinner').classList.add('hidden');
        document.querySelector('#button-text').classList.remove('hidden');
      }
    },
    showMessage(messageText) {
      const messageContainer = document.querySelector('#payment-message');
      messageContainer.classList.remove('hidden');

      messageContainer.textContent = messageText;

      setTimeout(function() {
        messageContainer.classList.add('hidden');
        messageText = '';
        messageContainer.textContent = messageText;
      }, 7000);
    },
  },
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