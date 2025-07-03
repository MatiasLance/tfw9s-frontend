<template>
    <form class="w-full" @submit.prevent="handleSubmit">
        <div id="payment-element">
        <!-- Stripe.js injects the Payment Element -->
        </div>
        <button id="stripeSubmit" type="submit">
        <div id="spinner" class="spinner hidden"></div>
        <span
            id="button-text"
        >
            Pay now
        </span>
        </button>
        <NuxtLink
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
          to="/tournaments"
        >
        Return to Registration
        </NuxtLink>
        <button
            type="button"
            class="
            mt-3
            block
            w-full
            bg-white py-[16px]
            px-[12px]
            text-center
            text-gray-700
            shadow-sm outline outline-1
            outline-gray-200
            hover:bg-gray-100 hover:text-[#1a1d18]
            "
            @click="activeStepPrev"
        >
            Return to Step 1
        </button>
        <div id="payment-message" class="hidden"></div>
    </form>
</template>

<script>
let elements;

export default {
  props: {
    seriestype: {
      type: [ String ],
      required: true
    },
  },
  data() {
    return { isStepperLoading: false }
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
    this.initialize()
  },
  methods: {
    activeStepPrev() {
      this.$emit('active-step', 1)
    },
    async initialize() {
      this.isStepperLoading = true;
      const metadata = this.registrationInformation;
      let endpoint = ''

      if (this.seriestype === 'weekly') {
        endpoint = '/v1/tournament/indiv/checkout'
      } else {
        endpoint = '/v1/tournament/team/checkout'
      }

      try {
        const response = await this.$axios.$post(endpoint, {
          item: this.$route.query.id,
          // eslint-disable-next-line camelcase
          payment_method: 'stripe',
          metadata,
          discountcode: ''
        });

        this.activeStep = 2;
        this.$store.commit('registration/setPaymentIntent', response.paymentIntentId);
        this.loadStripe(response.stripeToken);
      } catch (error) {
        console.error('Checkout initialization failed:', error.response || error);
        this.showMessage('Payment initialization failed.');
      } finally {
        this.isStepperLoading = false;
      }
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

      const paymentElementOptions = { layout: 'tabs' };

      elements = this.$stripe.elements({ clientSecret, appearance });
      const paymentElement = elements.create('payment', paymentElementOptions);
      paymentElement.mount('#payment-element');
    },
    async handleSubmit() {
      this.setLoading(true);
      try {
        const { error } = await this.$stripe.confirmPayment({
          elements,
          // eslint-disable-next-line camelcase
          confirmParams: {
          // eslint-disable-next-line camelcase
            return_url:
              `${this.$config.baseURL}/thank-you1?seriesType=${
                this.seriestype}`,
          },
        });

        if (error) {
          console.error('Stripe confirmPayment error:', error);
          if (error.type === 'card_error' || error.type === 'validation_error') {
            this.showMessage(error.message);
          } else {
            this.showMessage('An unexpected error occurred.');
          }
        }
      } catch (e) {
        console.error('Confirm payment crashed:', e);
        this.showMessage('Something went wrong during payment.');
      } finally {
        this.setLoading(false);
      }
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
}
</script>
