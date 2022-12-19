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

    <div class="my-24 mx-auto max-w-screen-xl bg-gray-200">
      <div class="mb-12 w-full bg-white">
        <Stepper :step="activeStep" />
      </div>

      <div class="flex flex-col gap-4 p-2 md:flex-row">
        <template v-if="activeStep === 1">
          <ShippingInformationForm
            :is-loading="isStepperLoading"
            @submit="toPayStep"
          />
        </template>
        <template v-else-if="activeStep === 2">
          <PaymentForm
            :subtotal="subtotal"
            :gst="gst"
            :total="total"
          />
        </template>
        <!-- col.// -->
      </div>
      <!-- grid.// -->
    </div>
    <!-- container.// -->
  </div>
</template>

<script>
import BaseHeader from '~/components/base/BaseHeader';
import ShippingInformationForm from '~/components/ShippingInformationForm';
import Stepper from '~/components/Stepper/Stepper';
import currencyMixin from '~/mixins/currency';
import PaymentForm from '~/components/PaymentForm';

export default {
  name: 'checkout',
  components: {
    BaseHeader,
    ShippingInformationForm,
    Stepper,
    PaymentForm,
  },
  mixins: [ currencyMixin ],
  data() {
    return {
      clientSecret: '',
      activeStep: 1,
      isStepperLoading: false,
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
    subtotal: {
      get() {
        return this.$store.state.cart.subtotal;
      },
      set(v) {
        this.$store.commit('cart/setSubtotal', v);
      },
    },
    gst: {
      get() {
        return this.$store.state.cart.gst;
      },
      set(v) {
        this.$store.commit('cart/setGst', v);
      },
    },
    total: {
      get() {
        return this.$store.state.cart.total;
      },
      set(v) {
        this.$store.commit('cart/setTotal', v);
      },
    },
  },
  methods: {
    toPayStep(shippingInformation) {
      this.shippingInformation = shippingInformation;
      this.isStepperLoading = true;
      setTimeout(() => {
        this.activeStep = 2;
        this.isStepperLoading = false;
      }, 3000);
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
        this.$router.push('/shop');
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
