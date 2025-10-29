<template>
  <div class="min-h-full bg-[#1A1A1B]">
    <BaseHeader
    class="mx-auto max-w-screen-xl gap-4
    bg-gradient-to-r from-brand-green to-brand-black lg:px-8"
    >
      <div
        class="
          col-span-12
          text-center
          sm:space-y-3
          sm:text-left
          lg:col-span-6
          xl:mt-10
        "
        data-aos="fade-right"
      >
        <span
          class="
            superheadline
            flex flex-row
            items-center
            text-[1rem]
            font-normal
            text-white
          "
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white">Home</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl">
          Registration
        </h1>
      </div>
    </BaseHeader>

    <div class="my-24 mx-auto max-w-screen-xl bg-gray-200">
      <div class="mb-12 w-full bg-white">
        <Stepper :step="activeStep" stepname="Information" />
      </div>

      <div class="flex flex-col gap-4 p-2 md:flex-row">
        <template v-if="activeStep === 1">
          <template
            v-if="seriestype === 'weekly' || seriestype === 'coast'"
          >
            <IndividualInformationForm
              :is-loading="isStepperLoading"
              :price="price"
              @submit="toPayStep"
            />
          </template>
          <template v-if="seriestype === 'tournament'">
            <TeamInformationForm
              :is-loading="isStepperLoading"
              :price="price"
              @submit="toPayStep"
            />
          </template>
        </template>
        <template v-else-if="activeStep === 2">
          <PaymentForm
            :subtotal="subtotal"
            :total="total"
            :series="series"
            :seriestype="seriestype"
            :taxAmount="taxAmount"
            :price="price"
            @active-step="setPreviousStep"
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
import IndividualInformationForm from '~/components/registration/IndividualInformationForm';
import TeamInformationForm from '~/components/registration/TeamInformationForm';
import Stepper from '~/components/Stepper/Stepper';
import currencyMixin from '~/mixins/currency';
import PaymentForm from '~/components/payment/PaymentForm';

export default {
  name: 'register',
  components: {
    BaseHeader,
    IndividualInformationForm,
    TeamInformationForm,
    Stepper,
    PaymentForm,
  },
  mixins: [ currencyMixin ],
  data() {
    return {
      clientSecret: '',
      activeStep: 1,
      isStepperLoading: false,
      seriestype: '',
      pause: false,
      seeries: null,
      price: null,
    };
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
    subtotal: {
      get() {
        return this.$store.state.cart.subtotal;
      },
      set(v) {
        this.$store.commit('cart/setSubtotal', v);
      },
    },
    taxAmount: {
      get() {
        return this.$store.state.cart.taxAmount
      },
      set(v) {
        this.$store.commit('cart/setTaxAmount', v)
      }
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
  created() {
    this.retrieveSeries();
    this.series = this.$route.query.series
    this.price = this.$route.query.price
    this.$store.commit('registration/setBase64IMG', '');
  },
  methods: {
    retrieveSeries() {

      this.id = this.$route.query.id;

      this.$axios
        .$get(`v1/series/${this.id}`)
        .then((response) => {
          const SeriesData = response.data.series
          this.seriestype = SeriesData.type
          this.pause = parseInt(SeriesData.is_paused) === 1
        })
    },
    retrieveToggleTaxControl() {
      const id = 1;
      // todo: check endpoint
      const endpoint = `v1/toogletax/retrieve/${id}`
      this.$axios
        .$get(endpoint)
        .then((response) => {
          this.toggleControl1 = response.me.toggleControl1
          this.toggleControl2 = response.me.toggleControl2
          this.$store.commit('master/setToggleControl1', response.me.toggleControl1)
          this.$store.commit('master/setToggleControl2', response.me.toggleControl2)
        })
        .catch((err) => {
          this.$oruga.notification.open({
            message: err.message,
            duration: 5000,
            variant: 'danger',
            queue: true,
            position: 'bottom'
          })
        })
    },
    setPreviousStep(stepNo) {
      this.activeStep = stepNo
    },
    toPayStep(registrationInformation) {
      this.registrationInformation = registrationInformation;
      this.isStepperLoading = true;
      this.id = this.$route.query.id;

      this.$axios
        .$get(`v1/series/${this.id}`)
        .then((response) => {
          const SeriesData = response.data.series
          const pause = parseInt(SeriesData.is_paused) === 1
          if (pause) {
            this.$oruga.notification.open({
              message: 'Event Unavailable',
              variant: 'danger',
              duration: 5000,
              position: 'bottom',
              queue: true,
            });
            this.isStepperLoading = false;
          } else {
            setTimeout(() => {
              this.activeStep = 2;
              this.isStepperLoading = false;
            }, 3000);
          }
        })
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
        this.$router.push('/tournaments');
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
    checkRegistrationLimits(seriesData) {
      const maxAge = seriesData.age_group.max_age;
      const currentRegistrations = seriesData.max_registration || 0;
      
      const maxAllowed = maxAge <= 9 ? 12 : 15;

      if (currentRegistrations >= maxAllowed) {
        this.$router.push({
          path: '/registration-limit',
          query: {
            seriesName: seriesData.name,
            maxRegistrations: maxAllowed,
            ageGroup: maxAge <= 9
          }
        });
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
  .croppa-container {
  background-color: #abb8c3;
  border: 3px solid #3981da;
  }
  .o-inputit__item--danger {
  background-color: #e73538 !important;
  }
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