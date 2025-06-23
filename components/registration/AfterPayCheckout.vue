<template>
  <section class="w-full">
    <form id="payment-form">
      <div id="card-container"></div>
      <div class="mt-2">
        <!--
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
        -->

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
  name: 'AfterPayCheckout',
  props: {
    discountCode: {
      type: String,
      default: ''
    },
    seriestype: {
      type: [ String ],
      required: true
    },
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
    registrationInformation: {
      get() {
        return this.$store.state.registration.registrationInformation;
      },
      set(v) {
        this.$store.commit('registration/setRegistrationInformation', v);
      },
    },
  },
  mounted() {
    if (!window.Square) {
      throw new Error('Sqaure.js failed to load properly')
    }

    const payments = window.Square.payments(this.appID, this.locationID)

    // this.initializeSquare(payments)

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
      let endpoint = ''
      if (this.seriestype === 'weekly') {
        endpoint = '/v1/tournament/indiv/checkout'
      } else {
        endpoint = '/v1/tournament/team/checkout'
      }
      if (result.status === 'OK') {
        this.$axios
          .$post(endpoint, {
            item: this.$route.query.id,
            // eslint-disable-next-line camelcase
            payment_method: 'square',
            metadata: {
              ...this.registrationInformation,
              // eslint-disable-next-line camelcase
              card_token: result.token
            },
            discountcode: this.discountCode
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
      const price = this.registrationInformation.price / 100;
      const req = payments.paymentRequest({
        countryCode: 'AU',
        currencyCode: 'AUD',
        total: {
          amount: price.toString(),
          label: 'Total'
        },
      })

      return req
    },
    async payViaAfterpay() {
      const result = await this.afterpay.tokenize()
      let endpoint = ''
      if (this.seriestype === 'weekly') {
        endpoint = '/v1/tournament/indiv/checkout'
      } else {
        endpoint = '/v1/tournament/team/checkout'
      } 
      if (result.status === 'OK') {
        this.$axios
          .$post(endpoint, {
            item: this.$route.query.id,
            // eslint-disable-next-line camelcase
            payment_method: 'afterpay',
            metadata: {
              ...this.registrationInformation,
              // eslint-disable-next-line camelcase
              card_token: result.token
            },
            discountcode: this.discountCode
          })
          .then((response) => {
            this.$router.push({
              path: '/thank-you1',
              query: {
                // eslint-disable-next-line camelcase
                afterpay_transaction_id: response,
                seriesType: this.seriestype
              }
            })
          })
      }
    },
  },
}
</script>