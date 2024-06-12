<template>
  <section class="w-full">
    <form id="payment-form">
      <div id="card-container"></div>
      <div class="mt-2">
        <button
          id="card-button"
          type="button"
          class="
            mb-4
            w-full
            rounded bg-[#1a1d18]
            p-4
            font-bold
            text-white
          "
          @click="checkoutViaSquare"
        >
          Pay Now
        </button>

        <div id="afterpay-button" @click="payViaAfterpay"></div>

        <hr class="my-4">

        <NuxtLink to="/cart">
          <div
            class="
              w-full
              rounded
              border
              border-gray-200
              p-2
              text-center
              font-bold
            "
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
            "
            @click="activeStepPrev"
        >
            Return to Step 1
        </button>
      </div>
    </form>
    <div
      id="payment-status-container"
    ></div>
  </section>
</template>

<script>
export default {
  name: 'SquareCheckout',
  props: {
    cartTotal: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      card: null,
      afterpay: null,
      appID: this.$config.square.appId,
      locationID: this.$config.square.locationId,
    }
  },
  computed: {
    cart: {
      get() {
        return this.$store.state.cart.cart;
      },
    },
    shippingInformation: {
      get() {
        return this.$store.state.order.shippingInformation;
      },
      set(v) {
        this.$store.commit('order/setShippingInformation', v);
      },
    },
    paymentMethod: {
      get() {
        return this.$store.state.order.paymentMethod;
      },
      set(v) {
        this.$store.commit('order/setPaymentMethod', v);
      }
    }
  },
  mounted() {
    if (!window.Square) {
      throw new Error('Sqaure.js failed to load properly')
    }

    const payments = window.Square.payments(this.appID, this.locationID)

    this.initializeSquare(payments)

    try {
      this.initializeAfterpay(payments)
    } catch (e) {
      console.error('Initializing Afterpay/Clearpay failed', e);
    }
  },
  methods: {
    activeStepPrev() {
      this.$emit('active-step', 1)
    },
    async initializeSquare(payments) {
      try {
        this.card = await this.initializeCard(payments)
      } catch (e) {
        console.error(e)
        return false;
      }
    },
    async initializeCard(payments) {
      const card = await payments.card()
      await card.attach('#card-container')
      return card;
    },
    async checkoutViaSquare() {
      const result = await this.card.tokenize()
      // todo: remove
      if (result.status === 'OK') {
        this.$axios
          .$post('/v1/orders/checkout', {
            // eslint-disable-next-line camelcase
            payment_method: 'square',
            items: this.cart,
            metadata: {
              ...this.shippingInformation,
              // eslint-disable-next-line camelcase
              card_token: result.token
            },
          })
          .then((response) => {
            this.$router.push(`/thank-you?square_transaction_id=${response}`)
          })
      }
    },
    async initializeAfterpay(payments) {
      const paymentRequest = this.buildPaymentRequest(payments)

      this.afterpay = await payments.afterpayClearpay(paymentRequest)
      await this.afterpay.attach('#afterpay-button')
    },
    buildPaymentRequest(payments) {
      const req = payments.paymentRequest({
        countryCode: 'AU',
        currencyCode: 'AUD',
        total: {
          amount: this.cartTotal.toString(),
          label: 'Total'
        },
      })

      return req
    },
    async payViaAfterpay() {
      const result = await this.afterpay.tokenize()

      if (result.status === 'OK') {
        this.$axios
          .$post('/v1/orders/checkout', {
            // eslint-disable-next-line camelcase
            payment_method: 'afterpay',
            items: this.cart,
            metadata: {
              ...this.shippingInformation,
              // eslint-disable-next-line camelcase
              card_token: result.token
            },
          })
          .then((response) => {
            this.$router.push(`/thank-you?afterpay_transaction_id=${response}`)
          })
      }
    },
  },
}
</script>