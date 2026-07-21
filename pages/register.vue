<template>
  <div class="min-h-screen w-screen bg-gradient-to-br from-gray-900 to-gray-950">

    <!-- Countdown overlay (does NOT destroy form) -->
    <ClientOnly>
      <CountDownTimer 
        v-if="registrationOpensDate !== null && serverTime !== null"
        v-show="displayCountdown"
        :target-date="registrationOpensDate"
        :server-time="serverTime"
        @dismiss="handleCountdownDismiss"
      />
    </ClientOnly>

    <!-- Queue overlay (kept as before) -->
    <div
      v-show="isInQueue"
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
            {{ queuePosition || 'Checking…' }}
          </p>
        </div>

        <p class="text-xs text-gray-400">
          Do not refresh the page.
        </p>
        <p v-if="loungeError" class="mt-3 text-sm text-red-600">
          {{ loungeError }}
        </p>
      </div>
    </div>

    <BaseHeader
      v-show="!displayCountdown"
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
      v-show="!displayCountdown"
      class="mt-10 mb-10 rounded-lg mx-auto max-w-screen-xl bg-gray-200"
    >
      <div
        v-if="isPageLoading"
        class="flex min-h-[320px] flex-col items-center justify-center gap-4 bg-white text-gray-600"
      >
        <VProgressCircular
          size="72"
          width="8"
          indeterminate
          color="green darken-2"
        />
        <p>Loading registration…</p>
      </div>

      <div
        v-else-if="pageLoadError"
        class="flex min-h-[320px] flex-col items-center justify-center gap-4 bg-white p-8 text-center"
      >
        <p class="text-red-700">{{ pageLoadError }}</p>
        <button
          type="button"
          class="rounded bg-green-700 px-5 py-2 text-white hover:bg-green-800"
          @click="initializeRegistrationPage"
        >
          Try again
        </button>
      </div>

      <template v-else>
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
      </template>
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
      serverTime: null,
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
      loungeCheckInFlight: false,
      loungeError: '',
      statusDebounceTimer: null,
      countdownPermanentlyDismissed: false,
      seriesId: null,
      isPageLoading: true,
      pageLoadError: '',
      initializationRequestId: 0,
      loungeRequestId: 0,
      submissionRequestId: 0,
      pageSessionId: 0,
      pageIsActive: false,
      pageInitialized: false,
      hasMounted: false
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
    displayCountdown() {
      return this.pageInitialized &&
        this.showCountdown &&
        this.seriestype !== 'competitions';
    },
  },

  watch: {
    async $route(to) {
      if (to.name !== 'register' || !to.query.id) return;

      if (Number(to.query.id) !== this.seriesId) {
        await this.initializeRegistrationPage();
      }
    }
  },

  beforeDestroy() {
    this.cleanupPage();
  },

  activated() {
    if (!this.hasMounted) return;

    const wasInactive = !this.pageIsActive;
    this.pageIsActive = true;
    this.subscribeToRegistrationStatus();

    if (wasInactive && this.pageInitialized) {
      this.retrieveRegistrationFormStatus(this.seriesId);
    }
  },

  deactivated() {
    this.pageIsActive = false;
    this.pageSessionId++;
    this.loungeRequestId++;
    this.submissionRequestId++;
    this.loungeCheckInFlight = false;
    this.stopPolling();
    this.isStepperLoading = false;
    clearTimeout(this.statusDebounceTimer);
    this.unsubscribeFromRegistrationStatus();
  },

  async mounted() {
    this.hasMounted = true;
    this.pageIsActive = true;
    this.$store.commit('registration/setBase64IMG', '');
    await this.initializeRegistrationPage();
    this.subscribeToRegistrationStatus();
  },

  methods: {
    async initializeRegistrationPage() {
      const id = Number(this.$route.query.id);
      if (!id) return;

      const requestId = ++this.initializationRequestId;
      this.pageSessionId++;
      this.loungeRequestId++;
      this.submissionRequestId++;
      this.stopPolling();
      clearTimeout(this.statusDebounceTimer);

      this.seriesId = id;
      this.clientId = uuidv4();
      this.series = this.$route.query.series || '';
      this.price = this.$route.query.price || 0;
      this.seriestype = '';
      this.pause = false;
      this.activeStep = 1;
      this.isStepperLoading = false;
      this.loungeToken = null;
      this.queuePosition = 0;
      this.loungeError = '';
      this.showCountdown = false;
      this.registrationOpensDate = null;
      this.serverTime = null;
      this.countdownPermanentlyDismissed = false;
      this.pageInitialized = false;
      this.pageLoadError = '';
      this.isPageLoading = true;

      try {
        const [seriesData] = await Promise.all([
          this.retrieveSeries(id),
          this.retrieveRegistrationFormStatus(id, requestId),
        ]);

        if (requestId !== this.initializationRequestId) return;

        this.seriestype = seriesData.type;
        this.pause = parseInt(seriesData.is_paused) === 1;
        this.pageInitialized = true;
      } catch (error) {
        if (requestId !== this.initializationRequestId) return;

        console.error('Failed to initialize registration page', error);
        this.pageLoadError = 'Unable to load registration. Please try again.';
      } finally {
        if (requestId === this.initializationRequestId) {
          this.isPageLoading = false;
        }
      }
    },

    handleRegistrationStatus(response) {
      if (this.countdownPermanentlyDismissed || !this.pageIsActive) return;

      const data = response.data || response;
      if (data.seriesId && Number(data.seriesId) !== this.seriesId) return;

      clearTimeout(this.statusDebounceTimer);
      this.statusDebounceTimer = setTimeout(() => {
        if (data && this.pageIsActive && !this.countdownPermanentlyDismissed) {
          this.registrationOpensDate = data.date;
          this.showCountdown = data.isShowCountDownTimer;
          this.serverTime = data.serverTime
        }
      }, 500);
    },

    async retrieveRegistrationFormStatus(id, requestId = this.initializationRequestId) {
      try {
        const response = await this.$axios.$get(`/v1/registration-form-status/${id}`);
        
        if (requestId !== this.initializationRequestId || Number(id) !== this.seriesId) {
          return;
        }

        if (response.success && response.data) {
          if (!this.countdownPermanentlyDismissed) {
            this.registrationOpensDate = response.data.date;
            this.showCountdown = response.data.isShowCountDownTimer;
            this.serverTime = response.data.serverTime
          }
        }
      } catch (error) {
        console.error('Failed to fetch registration status:', error);
      }
    },

    handleCountdownDismiss() {
      this.showCountdown = false;
      this.countdownPermanentlyDismissed = true;
      if (this.$socket) {
        this.$socket.off('registration-form-status', this.handleRegistrationStatus);
      }
      clearTimeout(this.statusDebounceTimer);
    },

    async checkLoungeAndProceed() {
      if (this.loungeCheckInFlight || !this.pageIsActive) return;

      const requestId = ++this.loungeRequestId;
      const sessionId = this.pageSessionId;
      this.loungeCheckInFlight = true;

      try {
        const response = await this.$axios.$post('/v1/lounge/check', {
          item: this.$route.query.id,
          client_id: this.clientId
        });

        if (requestId !== this.loungeRequestId ||
            sessionId !== this.pageSessionId || !this.pageIsActive) return;

        if (response.status === 'pass') {
          if (!response.token) {
            throw new Error('The lounge did not return a checkout token.');
          }

          this.loungeToken = response.token;
          this.loungeError = '';
          this.stopPolling();
          this.moveToPaymentStep();
        } else if (response.status === 'waiting') {
          this.isInQueue = true;
          this.queuePosition = response.position;
          this.loungeError = '';
          this.startLoungePolling();
        } else {
          throw new Error('Unexpected waiting lounge response.');
        }
      } catch (error) {
        if (requestId !== this.loungeRequestId ||
            sessionId !== this.pageSessionId || !this.pageIsActive) return;

        console.error('Lounge check failed', error);
        // Fail closed: never open payment when the capacity gate is unavailable.
        this.isInQueue = true;
        this.loungeError = 'Unable to confirm a checkout slot. Retrying automatically…';
        this.startLoungePolling();
      } finally {
        if (requestId === this.loungeRequestId) {
          this.loungeCheckInFlight = false;
        }
      }
    },

    startLoungePolling() {
      if (!this.pollingInterval) {
        this.pollingInterval = setInterval(() => {
          this.checkLoungeAndProceed();
        }, 5000);
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
      if (this.activeStep !== 2) {
        this.activeStep = 2;
      }
      this.isStepperLoading = false;
    },

    async retrieveSeries(id) {
      const response = await this.$axios.$get(`v1/series/${id}`, {
        params: { includeTeams: false },
      });

      return response.data.series;
    },

    setPreviousStep(stepNo) {
      this.activeStep = stepNo
    },

    toPayStep(registrationInformation) {
      if (this.isStepperLoading || !this.pageIsActive) return;

      const requestId = ++this.submissionRequestId;
      const sessionId = this.pageSessionId;
      const seriesId = this.seriesId;
      this.registrationInformation = registrationInformation;
      this.isStepperLoading = true;

      this.$axios
        .$get(`v1/series/${seriesId}`, {
          params: { includeTeams: false },
        })
        .then((response) => {
          if (requestId !== this.submissionRequestId ||
              sessionId !== this.pageSessionId || !this.pageIsActive) return;

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
            this.checkLoungeAndProceed();
          }
        })
        .catch(err => {
          if (requestId !== this.submissionRequestId ||
              sessionId !== this.pageSessionId) return;

          console.log(err)
          this.isStepperLoading = false;
        });
    },

    subscribeToRegistrationStatus() {
      if (!this.$socket) return;

      this.$socket.off('registration-form-status', this.handleRegistrationStatus);
      this.$socket.on('registration-form-status', this.handleRegistrationStatus);
    },

    unsubscribeFromRegistrationStatus() {
      if (this.$socket) {
        this.$socket.off('registration-form-status', this.handleRegistrationStatus);
      }
    },

    cleanupPage() {
      this.pageIsActive = false;
      this.initializationRequestId++;
      this.pageSessionId++;
      this.loungeRequestId++;
      this.submissionRequestId++;
      this.stopPolling();
      clearTimeout(this.statusDebounceTimer);
      this.unsubscribeFromRegistrationStatus();
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
