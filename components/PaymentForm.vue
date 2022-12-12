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
        class="p-10"
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
          <span>{{ subtotal }}</span>
        </li>
        <li class="mb-1 flex justify-between">
          <span>GST:</span>
          <span>{{ gst }}</span>
        </li>
        <li class="mt-3 flex justify-between border-t pt-3">
          <span>Total price:</span>
          <span class="font-bold text-gray-900">
            {{ total }}
          </span>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import PaypalCheckout from '~/components/PaypalCheckout.vue';
import PaymentTab from '~/components/payment/PaymentTab'

export default {
  components: {
    PaypalCheckout,
    PaymentTab
  },
  props: {
    subtotal: {
      type: [ String, Number ],
      required: true,
    },
    gst: {
      type: [ String, Number ],
      required: true,
    },
    total: {
      type: [ String, Number ],
      required: true,
    },
  },
  data() {
    return { paymentMethod: 'stripe' };
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