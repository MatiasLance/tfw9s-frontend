<template>
  <section class="w-full">
    <form id="payment-form">
      <div id="card-container"></div>
      <div class="mt-2">
        <div id="spinner" class="spinner hidden"></div>
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
      isStepperLoading: false
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
            discountcode: ''
          })
          .then((response) => {
            this.$router.push(`/thank-you?square_transaction_id=${response}`)
          })
      }
    },
    async initializeAfterpay(payments) {
      const amount = this.registrationInformation.price / 100;
      const discountID = this.registrationInformation.discountCodeId
      const price = await this.initialCalculation(amount, discountID)
      const paymentRequest = this.buildPaymentRequest(payments, price)

      this.afterpay = await payments.afterpayClearpay(paymentRequest)
      await this.afterpay.attach('#afterpay-button')
    },
    buildPaymentRequest(payments, price) {
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
      this.setLoading(true);
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
            discountcode: ''
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
            this.setLoading(false);
          })
      }
    },
    setLoading(isLoading) {
      if (isLoading) {
        // Disable the button and show a spinner
        // document.querySelector('#afterpay-button').disabled = true;
        document.querySelector('#spinner').classList.remove('hidden');
        document.querySelector('#afterpay-button').classList.add('hidden');
      } else {
        // document.querySelector('#afterpay-button').disabled = false;
        document.querySelector('#spinner').classList.add('hidden');
        document.querySelector('#afterpay-button').classList.remove('hidden');
      }
    },
    async initialCalculation(amount, discountID) {
      let endpoint = '';
      if (this.seriestype === 'weekly') {
        endpoint = '/v1/tournament/indiv/afterpay/calculation'
      } else {
        endpoint = '/v1/tournament/team/afterpay/calculation'
      } 
      try {
        const response = await this.$axios.$post(endpoint, {
          amount,
          discountID
        });
        return response.totalPrice;
      } catch (error) {
        console.error('Error calculating price:', error);
      }
    }
  },
}
</script>