<template>
  <div>
    <BaseHeader class="bg-gradient-to-r from-brand-dgrey to-brand-black">
      <div
        class="
          col-span-12
          mt-12
          space-y-3
          px-6
          text-center
          sm:space-y-3 sm:text-left
          lg:col-span-6
          xl:mt-10
        "
      >
        <span
          class="
            superheadline
            flex flex-row
            items-center
            pb-3
            text-[1rem]
            font-normal
          "
        >
          <span class="font-medium text-white">
            <NuxtLink to="/">
                <VBtn text color="white">Home</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-3xl font-bold text-white lg:text-6xl">
          Checkout
        </h1>
      </div>
    </BaseHeader>

    <div class="container mx-auto my-24 max-w-screen-xl px-4">

      <div class="mb-12 w-full">
        <Stepper :step="activeStep" />
      </div>

      <div class="flex flex-col justify-center gap-4 md:flex-row">

        <div v-if="activeStep === 1">
          <ShippingInformationForm
            :is-loading="isStepperLoading"
            @submit="toPayStep"
          />
        </div>
        <div v-else-if="activeStep === 2" class="w-[320px]">
          <article
            class="flex flex-col justify-center text-gray-600"
          >
            <h2 class="mb-3 flex justify-center text-lg font-semibold">
              Summary
            </h2>
            <ul>
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

            <hr class="my-4" />
          </article>
          <div
            class="my-7 flex flex-col items-center
            justify-center md:flex-row md:space-x-4"
          >
            <button
              type="button"
              class="rounded-xl
              border
              border-solid border-brand-slate
              bg-transparent px-6 py-3
              text-base text-slate-600 hover:bg-slate-200
              hover:text-black"
              :class="selectedClass1"
              @click="togglePaypal"
            >
              Paypal
            </button>
            <button
              type="button"
              class="rounded-xl
              border
              border-solid border-brand-slate
              bg-transparent px-6 py-3
              text-base text-slate-600 hover:bg-slate-200
              hover:text-black"
              :class="selectedClass2"
              @click="toggleStripe"
            >
              Stripe
            </button>
            <button
              type="button"
              class="rounded-xl
              border
              border-solid border-brand-slate
              bg-transparent px-6 py-3
              text-base text-slate-600 hover:bg-slate-200
              hover:text-black"
              :class="selectedClass3"
              @click="toggleAfterPay"
            >
              Afterpay
            </button>
          </div>
          <PaypalCheckout
            v-if="showPaypal"
            id="paypal-payment-form"
            class="p-10"
            :cart-total="total"
          />
          <div v-if="showStripe" class="flex gap-3 text-gray-600">
            <form id="payment-form" @submit.prevent="handleSubmit">
              <legend>
                <h2 class="mb-3 block text-lg font-semibold">
                  Payment Method (Stripe)
                </h2>
              </legend>
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
          <div v-if="showAfterpay" class="flex gap-3 text-gray-600">
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
        <!-- col.// -->
      </div>
      <!-- grid.// -->
    </div>
    <!-- container.// -->
  </div>
</template>

<script>
import PaypalCheckout from '../components/PaypalCheckout.vue';
import BaseHeader from '~/components/base/BaseHeader';
import ShippingInformationForm from '~/components/ShippingInformationForm';
import Stepper from '~/components/Stepper/Stepper';
import currencyMixin from '~/mixins/currency';
let elements;

export default {
  name: 'checkout',
  components: {
    BaseHeader,
    ShippingInformationForm,
    Stepper,
    PaypalCheckout,
  },
  mixins: [ currencyMixin ],
  data() {
    return {
      clientSecret: '',
      shippingInformation: [],
      activeStep: 1,
      isStepperLoading: false,
      showPaypal: false,
      showAfterpay: false,
      showStripe: false,
      selectedPaypal: false,
      selectedStripe: false,
      selectedAfterpay: false
    };
  },
  computed: {
    selectedClass1() {
      return this.selectedPaypal ? 'selected' : ''
    },
    selectedClass2() {
      return this.selectedStripe ? 'selected' : ''
    },
    selectedClass3() {
      return this.selectedAfterpay ? 'selected' : ''
    },
    subtotal: {
      get() {
        return this.$store.state.cart.subtotal
      },
      set(v) {
        this.$store.commit('cart/setSubtotal', v)
      },
    },
    gst: {
      get() {
        return this.$store.state.cart.gst
      },
      set(v) {
        this.$store.commit('cart/setGst', v)
      },
    },
    total: {
      get() {
        return this.$store.state.cart.total
      },
      set(v) {
        this.$store.commit('cart/setTotal', v)
      },
    },
  },
  methods: {
    togglePaypal() {
      this.showPaypal = true
      this.showStripe = false
      this.showAfterpay = false
      this.selectedAfterpay = false
      this.selectedStripe = false
      this.selectedPaypal = true
    },
    toggleStripe() {
      this.showPaypal = false
      this.showStripe = true
      this.showAfterpay = false
      this.selectedAfterpay = false
      this.selectedStripe = true
      this.selectedPaypal = false
      this.initialize()
    },
    toggleAfterPay() {
      this.showPaypal = false
      this.showStripe = false
      this.showAfterpay = true
      this.selectedAfterpay = true
      this.selectedStripe = false
      this.selectedPaypal = false
    },
    toPayStep(shippingInformation) {
      this.shippingInformation = shippingInformation
      this.isStepperLoading = true
      setTimeout(() => {
        this.activeStep = 2
        this.isStepperLoading = false
      }, 3000);
    },
    async initialize() {
      this.isStepperLoading = true
      const items = this.$store.state.cart.cart
      const metadata = this.shippingInformation
      const clientSecret = await this.$axios
        .$post('v1/orders/checkout', {
          items,
          metadata
        })
        .then((response) => {
          this.activeStep = 2
          return response;
        })
        .finally(() => {
          this.isStepperLoading = false
        })

      this.loadStripe(clientSecret)

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
    async checkStatus() {
      const clientSecret = this.$route.query.payment_intent_client_secret;

      if (!clientSecret) {
        return false;
      }

      const { paymentIntent } = await this.$stripe.retrievePaymentIntent(
        clientSecret
      );

      switch (paymentIntent.status) {
      case 'succeeded':
        this.showMessage('Success! Payment received.');
        this.$router.push('/shop')
        break;
      case 'processing':
        this.showMessage('Your payment is processing.');
        break;
      case 'requires_payment_method':
        this.showMessage(
          'Your payment was not successful, please try again.'
        );
        break;
      default:
        this.showMessage('Something went wrong.');
        break;
      }
    },
  },
};
</script>

<style>
/* Variables */
form#payment-form {
  width: 100%;
  /* min-width: 500px; */
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
              0px 2px 5px 0px rgba(50, 50, 93, 0.1),
              0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
}

#paypal-payment-form {
  width: 100%;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
              0px 2px 5px 0px rgba(50, 50, 93, 0.1),
              0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
}

#payment-message {
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
}

#payment-element {
  margin-bottom: 24px;
}

/* Buttons and links */
button#stripeSubmit {
  background: #1a1d18;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
}

button#backCart {
  background: #ffffff;
  color: #000;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
}

button#stripeSubmit:hover {
  filter: contrast(115%);
}

button#stripeSubmit:disabled {
  opacity: 0.5;
  cursor: default;
}

/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
}
.spinner {
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.spinner:before,
.spinner:after {
  position: absolute;
  content: '';
}
.spinner:before {
  width: 10.4px;
  height: 20.4px;
  background: #5469d4;
  border-radius: 20.4px 0 0 20.4px;
  top: -0.2px;
  left: -0.2px;
  -webkit-transform-origin: 10.4px 10.2px;
  transform-origin: 10.4px 10.2px;
  -webkit-animation: loading 2s infinite ease 1.5s;
  animation: loading 2s infinite ease 1.5s;
}
.spinner:after {
  width: 10.4px;
  height: 10.2px;
  background: #5469d4;
  border-radius: 0 10.2px 10.2px 0;
  top: -0.1px;
  left: 10.2px;
  -webkit-transform-origin: 0px 10.2px;
  transform-origin: 0px 10.2px;
  -webkit-animation: loading 2s infinite ease;
  animation: loading 2s infinite ease;
}

@-webkit-keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@media only screen and (max-width: 600px) {
  form {
    width: 80vw;
    min-width: initial;
  }
}

.selected {
  background: #1a1d18;
  color: #ffffff;
  border: 1px solid transparent;
}
</style>