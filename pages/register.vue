<template>
  <div class="min-h-full bg-[#1A1A1B]">

    <ClientOnly>
      <CountDownTimer 
        v-if="showCountdown && series.type !== 'competitions'"
        :target-date="registrationOpensDate"
        @dismiss="handleCountdownDismiss"
      />
    </ClientOnly>

    <div
     v-if="isInQueue"
     class="fixed inset-0 z-50 flex items-center
     justify-center bg-black/90 backdrop-blur-sm"
    >
      <div class="bg-white rounded-lg p-8 max-w-md w-full
      text-center shadow-2xl border-t-4 border-green-600"
      >
        <div class="mb-4">
          <div class="spinner !text-green-600 !w-12 !h-12 !border-green-200"></div>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">
            You are in line
        </h2>
        <p class="text-gray-600 mb-6">
          Due to high traffic, we have placed you in a virtual waiting room. 
        </p>
        
        <div class="bg-gray-100 rounded p-4 mb-4">
          <p class="text-sm text-gray-500 uppercase tracking-wide">
            Your Position
          </p>
          <p class="text-4xl font-bold text-green-700">
            {{ queuePosition }}
         </p>
        </div>

        <p class="text-xs text-gray-400">
          Do not refresh the page.
        </p>
      </div>
    </div>

    <BaseHeader
      class="mx-auto max-w-full gap-4 relative overflow-hidden
      bg-gradient-to-br from-green-900 via-green-700 to-gray-900
      lg:px-8"
    >
    <!-- Animated Rugby Field Background -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-1/4 left-0 w-full h-1 bg-white/30 
                    animate-pulse"></div>
        <div class="absolute top-1/2 left-0 w-full h-1 bg-white/40 
                    animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-3/4 left-0 w-full h-1 bg-white/30 
                    animate-pulse" style="animation-delay: 2s;"></div>
      </div>

      <div
        class="col-span-12 text-center sm:space-y-3 sm:text-left
               lg:col-span-6 xl:mt-10 relative z-10"
        data-aos="fade-right"
      >
        <span class="superheadline flex flex-row items-center text-[1rem]
                    font-normal text-white"
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white" class="hover:scale-105 transition-transform">
                <i class="ri-home-4-line mr-2"></i>Home
              </VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl
                   bg-gradient-to-r from-green-400 to-white bg-clip-text 
                   drop-shadow-lg"
        >
          🏉 Registration
        </h1>
      </div>
    </BaseHeader>

    <div
      v-if="!showCountdown"
      class="mt-10 mb-10 rounded-lg mx-auto max-w-screen-xl bg-gray-200"
    >
      <div class="mb-5 w-full rounded-t-lg bg-white">
        <Stepper :step="activeStep" stepname="Information" />
      </div>

      <div class="flex flex-col gap-4 p-2 md:flex-row">
        <template v-if="activeStep === 1">
           <template v-if="seriestype === 'weekly'">
            <IndividualInformationForm
              :is-loading="isStepperLoading"
              :price="price"
              @submit="toPayStep"
            />
          </template>
          <template v-if="seriestype === 'tournament' || seriestype === 'coast'">
            <TeamInformationForm
              :is-loading="isStepperLoading"
              :price="price"
              :series-type="seriestype"
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
            :lounge-token="loungeToken"
            :client-id="clientId"
            @active-step="setPreviousStep"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import BaseHeader from '~/components/base/BaseHeader';
import IndividualInformationForm from '~/components/registration/IndividualInformationForm';
import TeamInformationForm from '~/components/registration/TeamInformationForm';
import Stepper from '~/components/Stepper/Stepper';
import currencyMixin from '~/mixins/currency';
import PaymentForm from '~/components/payment/PaymentForm';
import CountDownTimer from '~/components/CountDownTimer.vue'

export default {
  name: 'register',

  components: {
    BaseHeader,
    IndividualInformationForm,
    TeamInformationForm,
    Stepper,
    PaymentForm,
    CountDownTimer
  },

  mixins: [ currencyMixin ],

  data() {
    return {
      showCountdown: false,
      registrationOpensDate: null,
      clientSecret: '',
      activeStep: 1,
      isStepperLoading: false,
      seriestype: '',
      pause: false,
      series: null,
      price: null,
      clientId: null,
      loungeToken: null,
      isInQueue: false,
      queuePosition: 0,
      pollingInterval: null,
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

  beforeDestroy() {
    this.stopPolling();
    if (this.$socket) {
      this.$socket.off('registration-form-status', this.handleRegistrationStatus)
    }
  },

  async mounted() {
    await this.$nextTick()
    this.clientId = uuidv4();
    
    this.retrieveSeries();
    this.series = this.$route.query.series
    this.price = this.$route.query.price
    this.$store.commit('registration/setBase64IMG', '');
    await this.retrieveRegistrationFormStatus(this.$route.query.id)
    this.$socket.on('registration-form-status', this.handleRegistrationStatus);
  },

  methods: {
    handleRegistrationStatus(response) {
      const data = response.data || response
      
      if (data) {
        this.registrationOpensDate = new Date(data.date);
        this.showCountdown = data.isShowCountDownTimer;

        this.$forceUpdate();
        
        this.$emit('registration-status-updated', data);
      }
    },
    async retrieveRegistrationFormStatus(id) {
      try {
        const response = await this.$axios.$get(`/v1/registration-form-status/${id}`);
        
        if (response.success && response.data &&
        response.data.date) {
          const parsedDate = new Date(response.data.date);
          
          if (!isNaN(parsedDate.getTime())) {
            this.registrationOpensDate = parsedDate;
            this.showCountdown = response.data.isShowCountDownTimer;
          } else {
            console.warn('Invalid date received:', response.data.date);
            this.showCountdown = false;
          }
        }
      } catch (error) {
        console.error('Failed to fetch registration status:', error);
        this.showCountdown = false;
      }
    },
    handleCountdownDismiss() {
      this.showCountdown = false
    },
    async checkLoungeAndProceed() {
      try {
        const response = await this.$axios.$post('/v1/lounge/check', {
          item: this.$route.query.id,
          /* eslint-disable camelcase */
          client_id: this.clientId
        });

        if (response.status === 'pass') {
          this.loungeToken = response.token;
          this.stopPolling();
          this.moveToPaymentStep();
        } else {
          this.isInQueue = true;
          this.queuePosition = response.position;

          if (!this.pollingInterval) {
            this.pollingInterval = setInterval(() => {
              this.checkLoungeAndProceed();
            }, 5000);
          }
        }
      } catch (error) {
        console.error("Lounge check failed", error);
        this.stopPolling();
        this.moveToPaymentStep(); 
      }
    },

    stopPolling() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
        this.pollingInterval = null;
      }
      this.isInQueue = false;
    },

    moveToPaymentStep() {
      this.activeStep = 2;
      this.isStepperLoading = false;
    },

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
              this.checkLoungeAndProceed();
            }, 1000);
          }
        })
        .catch(err => {
          console.log(err)
          this.isStepperLoading = false;
        });
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
    }
  }
};
</script>