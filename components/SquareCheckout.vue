<template>
  <section class="w-full">
    <form id="payment-form">
      <div id="card-container"></div>
      <div class="mt-4">
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
          @click="checkout"
        >
          Pay Now
        </button>
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
      </div>
    </form>
    <div
      id="payment-status-container"
      class="mx-8 flex min-h-[250px] items-center justify-center"
    ></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      card: null,
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
  },
  mounted() {
    this.initializeSquare()
  },
  methods: {
    async initializeCard(payments) {
      const card = await payments.card()
      await card.attach('#card-container')
      return card;
    },
    async initializeSquare() {
      if (!window.Square) {
        throw new Error('Sqaure.js failed to load properly')
      }
      const payments = window.Square.payments(this.appID, this.locationID)
      try {
        this.card = await this.initializeCard(payments)
      } catch (e) {
        console.error(e)
        return false;
      }
    },
    async checkout() {
      const result = await this.card.tokenize()

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
  },
}
</script>