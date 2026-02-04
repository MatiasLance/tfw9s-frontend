<template>
  <div class="flex min-h-screen w-screen items-center bg-gradient-to-br 
              from-gray-900 to-gray-950 text-white">
    
    <ClientOnly>
      <CountDownTimer 
        v-if="showCountdown && !hasCompleted &&
        series.type !== 'competitions'"
        :target-date="registrationOpensDate"
        @completed="handleCountdownComplete"
        @dismiss="handleCountdownDismiss"
      />
    </ClientOnly>
    
    <!-- Sporty Loading State -->
    <section
      v-if="isLoading"
      class="flex w-full h-[70vh] items-center justify-center"
    >
      <div class="text-center">
        <div class="relative mb-8">
          <div class="h-20 w-12 rounded-full bg-green-600 
                      animate-bounce shadow-lg mx-auto">
            <div class="absolute left-1/2 top-1/2 h-16 w-10 
                        -translate-x-1/2 -translate-y-1/2 
                        rounded-full bg-white/20"></div>
            <div class="absolute left-1/2 top-3 h-1 w-8 
                        -translate-x-1/2 bg-white/40"></div>
            <div class="absolute left-1/2 bottom-3 h-1 w-8 
                        -translate-x-1/2 bg-white/40"></div>
          </div>
        </div>
        <p class="text-lg font-bold text-green-400 uppercase 
                  tracking-wider animate-pulse">
          Loading Tournament...
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <div v-else-if="!showCountdown || hasCompleted ||
      series.type === 'competitions'" class="w-full"
    >
      <div class="grid h-auto w-screen grid-cols-1 gap-6 p-4 
                  sm:p-6 md:grid-cols-6 md:p-8 lg:p-12">
        
        <!-- Image Gallery Section -->
        <div class="md:col-span-4">
          <div v-if="photos.length !== 0" class="grid grid-cols-1 gap-4">
            <!-- Main Image -->
            <div class="col-span-1 rounded-2xl overflow-hidden 
                        shadow-2xl border-2 border-green-500/30">
              <InnerImageZoom
                :src="activeImageURL"
                :zoom-src="activeImageURL"
                zoom-type="hover"
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Thumbnail Carousel -->
            <div class="col-span-1" v-if="photos.length > 1">
              <VueSlickCarousel v-bind="imageCarouselSettings">
                <div v-for="photo in photos" :key="photo.id">
                  <button
                    type="button"
                    @click="setActiveMedia(photo)"
                    :class="[
                      'mx-1 inline-block rounded-xl border-2 p-2',
                      'transition-all duration-300 transform hover:scale-110',
                      activeImageURL === getMediaURL(photo) 
                        ? 'border-green-500 bg-green-500/20 shadow-lg' 
                        : 'border-gray-600 hover:border-green-400'
                    ]"
                  >
                    <img
                      class="h-12 w-16 object-cover rounded-lg"
                      :src="getMediaURL(photo)"
                      :alt="`Tournament thumbnail - ${photo.id}`"
                    >
                  </button>
                </div>
              </VueSlickCarousel>
            </div>
          </div>
          
          <!-- Fallback Image -->
          <div v-if="photos.length === 0" class="flex items-center 
                      justify-center rounded-2xl bg-gradient-to-br 
                      from-gray-800 to-gray-900 border-2 
                      border-dashed border-gray-600 p-8">
            <img
              src="~/assets/images/kidsplaying.jpg"
              class="rounded-xl shadow-lg max-h-96 object-cover"
              alt="Rugby tournament"
            />
          </div>
        </div>

        <!-- Tournament Details Section -->
        <div class="col-span-1 flex flex-col items-center md:col-span-2">
          <div class="mx-auto w-full max-w-screen-xl p-4 
                      bg-gradient-to-br from-gray-800 to-gray-900 
                      rounded-2xl shadow-2xl border border-gray-700">
            
            <!-- Tournament Header -->
            <div class="mb-6 text-center">
              <h1 class="text-2xl md:text-4xl font-bold text-white 
                         bg-gradient-to-r from-green-400 to-white 
                         bg-clip-text mb-2">
                {{ article.name }}
              </h1>
              <div class="space-y-2">
                <p class="text-green-300 text-sm flex items-center 
                          justify-center">
                  <i class="ri-calendar-line mr-2"></i>
                  {{ DateRange(formattedDate(article.start), 
                    formattedDate(article.end)) }}
                </p>
                <!-- Dynamic Address -->
                <p v-if="article.address" class="text-blue-300 text-sm 
                           flex items-center justify-center text-wrap">
                  <i class="ri-map-pin-line mr-2"></i>
                  {{ article.address }}
                </p>
              </div>
            </div>

            <!-- Price -->
            <div class="mb-6 text-center">
              <div class="inline-flex items-center gap-2 
                          bg-gradient-to-r from-yellow-500 to-yellow-600 
                          px-6 py-3 rounded-2xl shadow-lg">
                <i class="ri-money-dollar-circle-fill text-xl 
                          text-gray-900"></i>
                <span class="text-2xl md:text-3xl font-bold text-gray-900">
                  {{ formatCurrencyFromCent(article.price) }}
                </span>
              </div>
            </div>

            <!-- Description -->
            <article class="mb-6">
              <h3 class="text-lg font-bold text-white mb-3 
                         flex items-center">
                <i class="ri-information-line mr-2 text-green-400"></i>
                Tournament Details
              </h3>
              <div class="h-48 overflow-y-auto rounded-xl 
                          bg-gray-700/50 p-4 border border-gray-600">
                <p class="text-gray-200 text-sm leading-relaxed"
                   v-html="article.description"
                ></p>
              </div>
            </article>

            <!-- Action Buttons -->
            <div class="space-y-4">
              <!-- Register Button -->
              <div v-if="!article.pause && article.type !== 'weekly'" 
                   class="flex justify-center">
                <NuxtLink
                  :to="{
                    path: '/register/?id=' + article.id,
                    query: {
                      series: article.name,
                      price: article.price,
                    }
                  }"
                  class="w-full"
                >
                  <button
                    type="button"
                    class="w-full rounded-2xl bg-gradient-to-r 
                           from-green-500 to-green-600 px-8 py-4 
                           text-lg font-bold text-white shadow-2xl 
                           transition-all duration-300 transform 
                           hover:from-green-600 hover:to-green-700 
                           hover:scale-105 hover:shadow-green-500/50 
                           active:scale-95 flex items-center 
                           justify-center gap-2"
                  >
                    <i class="ri-user-add-line"></i>
                    Register Now
                  </button>
                </NuxtLink>
              </div>

              <!-- Event Unavailable -->
              <div v-if="article.pause" 
                   class="flex justify-center">
                <div class="rounded-2xl bg-gradient-to-r 
                            from-red-500 to-red-600 px-6 py-4 
                            text-center shadow-lg">
                  <p class="text-lg font-bold text-white 
                            flex items-center justify-center gap-2">
                    <i class="ri-close-circle-line"></i>
                    Event Unavailable
                  </p>
                </div>
              </div>

              <!-- Back Button -->
              <div class="flex justify-center">
                <NuxtLink to="/tournaments" class="w-full">
                  <button
                    type="button"
                    class="w-full rounded-2xl bg-gradient-to-r 
                           from-gray-700 to-gray-800 px-8 py-4 
                           text-lg font-semibold text-gray-300 
                           border-2 border-gray-600 transition-all 
                           duration-300 transform hover:from-gray-600 
                           hover:to-gray-700 hover:text-white 
                           hover:scale-105 hover:border-gray-500 
                           active:scale-95 flex items-center 
                           justify-center gap-2"
                  >
                    <i class="ri-arrow-left-line"></i>
                    Back to Tournaments
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import currency from 'currency.js';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';
import InnerImageZoom from 'vue-inner-image-zoom';
import VueSlickCarousel from 'vue-slick-carousel';
import CountDownTimer from '~/components/CountDownTimer.vue'
import handlesMedia from '~/mixins/shop/handlesMedia'
import handlesCoordinates from '~/mixins/utilities/handlesCoordinates'
import currencyMixin from '~/mixins/currency/handlesCurrency'

const slickSettings = {
  arrows: true,
  slidesToShow: 8,
  slidesToScroll: 5,
  initialSlide: 0,
  speed: 500,
  swipe: true,
  swipeToSlide: true,
  infinite: true,
  touchThreshold: 5,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
        infinite: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }
  ]
}

export default {
  name: 'tournament-article',
  mixins: [
    currencyMixin,
    handlesMedia,
    handlesCoordinates,
  ],
  components: {
    InnerImageZoom,
    VueSlickCarousel,
    CountDownTimer,
  },
  data() {
    return {
      showCountdown: false,
      hasCompleted: false,
      isLoading: true,
      isSelected: '',
      addTaxOnCartPrice: 0,
      includeTaxOnCartPrice: 0,
      showGSTIncluded: true,
      showGSTExcluded: false,
      taxrateValue: 0,
      subtotal: 0,
      showRRP: true,
      article: {
        id: 0,
        name: '',
        description: '',
        start: new Date(),
        end: new Date(),
        price: 0,
        ageGroup: {
          id: 0,
          name: '',
        },
        updatedAt: null
      },
      activeImageURL: '',
      photos: [],
      quantity: 1,
      imageCarouselSettings: slickSettings,
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
      registrationOpensDate: '',
      series: { type: '' },
      pollTimer: null,
      isPolling: false
    };
  },
  computed: {
    tax: {
      get() {
        return this.$store.state.cart.tax
      },
      set(v) {
        this.$store.commit('cart/setTax', v)
      }
    },
    taxAmount: {
      get() {
        return this.$store.state.cart.taxAmount
      },
      set(v) {
        this.$store.commit('cart/setTaxAmount', v)
      }
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
    toggleControl1: {
      get() {
        return (
          this.$store.state.master.toggleControl1
        )
      },
      set(val) {
        this.$store.commit('master/setToggleControl1', val)
      }
    },
    toggleControl2: {
      get() {
        return (
          this.$store.state.master.toggleControl2
        )
      },
      set(val) {
        this.$store.commit('master/setToggleControl2', val)
      }
    },
  },
  watch: {
    $route() {
      this.retrieveSeries(this.$route.query.id);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  },
  async mounted() {
    this.series.type = this.$route.query.type
    await this.retrieveToggleTaxControl()
    await this.retrieveTaxValue()
    await this.retrieveSeries(this.$route.query.id);
    await this.retrieveRegistrationFormStatus(this.$route.query.id)

    if (this.registrationOpensDate !== '') {
      if (Date.now() >= this.registrationOpensDate.getTime()) {
        this.showCountdown = false
      }
    }
  },

  methods: {
    handleCountdownComplete() {
      this.hasCompleted = true
    },

    handleCountdownDismiss() {
      this.showCountdown = false
    },

    setActiveMedia(path) {
      this.activeImageURL = this.getMediaURL(path)
    },
    formattedDate(dateString) {
      const date = new Date(dateString);
      date.setHours(0, 0, 0, 0);
      return date;
    },
    DateRange(start, end) {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      const suffixes = [
        'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'
      ];
      const startdate = start.getDate();
      const enddate = end.getDate();
      const startmonth = months[start.getMonth()];
      const endmonth = months[end.getMonth()];
      const startyear = start.getFullYear();
      const endyear = end.getFullYear();

      const suffix1 = startdate % 100;
      const suffix2 = enddate % 100;
      const startsuffix = suffixes[suffix1 >= 11 &&
      suffix1 <= 13 ? 0 : startdate % 10];
      const endsuffix = suffixes[suffix2 >= 11 &&
      suffix2 <= 13 ? 0 : enddate % 10];

      // eslint-disable-next-line max-len, vue/max-len, no-return-assign
      return `${startmonth === endmonth? startmonth:endmonth} ${startdate}${startsuffix} -  ${startmonth !== endmonth? endmonth:''} ${enddate}${endsuffix} ${startyear === endyear? startyear: endyear}`;
    },
    viewVariantSlider() {
      const sliderCoordinates = this.getCoordinates(this.$refs.variantSlider)
      window.scrollTo({
        top: sliderCoordinates.top,
        left: sliderCoordinates.left,
        behavior: 'smooth',
      })
    },
    retrieveSeries(Id) {
      this.isLoading = true;
      this.$axios
        .$get(`v1/series/${Id}`)
        .then((response) => {
          const series = response.data.series;

          this.article = {
            ...series,
            ageGroup: {
              id: (series.age_group && series.age_group.id) || 0,
              name: (series.age_group && series.age_group.name) || '',
            },
          };
          this.article.pause = parseInt(series.is_paused) === 1;
          this.activeImageURL = this.getMediaURL(series.media[0]);
          this.photos = series.media;
          this.calculatePriceAggregates();
        })
        .catch((error) => {
          console.error('Error fetching series:', error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    calculatePriceAggregates() {
      const itemCostData = {
        id: this.$route.query.id,
        price: this.article.price
      };

      // Calculate the subtotal directly from the single item's price
      const subtotal = currency(itemCostData.price, { fromCents: true }).value;

      // Determine which GST mode is active based on the toggle controls
      if (this.toggleControl1) {
        this.showGSTExcluded = true;
        this.showGSTIncluded = false;
      } else if (this.toggleControl2) {
        this.showGSTExcluded = false;
        this.showGSTIncluded = true;
      }

      // Calculate GST exclusive and inclusive values
      const exclusiveValue = currency(subtotal, { fromCents: false })
        .multiply(1 + this.taxrateValue)
        .value;

      const inclusiveValue = currency(subtotal, { fromCents: false })
        .divide(1 + this.taxrateValue)
        .value;

      // Set the subtotal
      this.subtotal = subtotal;

      // Determine the total based on the active GST mode
      const total = this.toggleControl1 ? exclusiveValue : subtotal;
      this.total = total;

      // Calculate the tax amount based on the active GST mode
      this.taxAmount = this.toggleControl2 ?
        this.total - inclusiveValue :
        this.total - this.subtotal;

      // Commit the tax amount and total to the store
      this.$store.commit('cart/setTaxAmount', this.taxAmount);
      this.$store.commit('cart/setTotal', total);

    },
    retrieveToggleTaxControl() {
      const endpoint = 'v1/toggletax'
      this.$axios
        .$get(endpoint)
        .then((response) => {
          this.toggleControl1 = response.toggleControl1
          this.toggleControl2 = response.toggleControl2
          this.$store.commit('master/setToggleControl1', response.toggleControl1)
          this.$store.commit('master/setToggleControl2', response.toggleControl2)
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
    async retrieveTaxValue() {
      try {
        const response = await this.$axios.$get('v1/tax')
        this.addTaxOnCartPrice = response.addTaxValue
        this.includeTaxOnCartPrice = response.includeTaxValue
        const taxAmount = this.toggleControl1 ?
          this.addTaxOnCartPrice :
          (this.toggleControl2 ? this.includeTaxOnCartPrice : 0);
        this.$store.commit('cart/setTax', taxAmount);
        this.taxrateValue = this.tax / 100
      } catch (err) {
        this.$oruga.notification.open({
          message: err.message,
          duration: 5000,
          variant: 'danger',
          queue: true,
          position: 'bottom'
        })
      }
    },

    retrieveRegistrationFormStatus(id) {
      this.isPolling = true

      let pollInterval  = 5000;

      const poll = async () => {

        if (!this.isPolling) {
          return
        }

        try {
          const response = await this.$axios.$get(`/v1/registration-form-status/${id}`)

          if (response.success) {
            if (this.hasDataChanged(response.data.date)) {
              this.registrationOpensDate = new Date(response.data.date);
              this.showCountdown = response.data.is_show_count_down_timer;
              pollInterval = 5000
            } else {
              pollInterval = Math.min(pollInterval * 1.5, 30000)
            }
          }

        } catch (error) {
          console.log(error)
          pollInterval = Math.min(pollInterval * 2, 60000)
        } finally {
          this.pollTimer = setTimeout(poll, pollInterval)
        }

      }

      poll();
    },

    hasDataChanged(newData) {
      return this.registrationOpensDate !== new Date(newData)
    },

    stopPolling() {
      this.isPolling = false
      if (this.pollTimer) {
        clearTimeout(this.pollTimer)
        this.pollTimer = null
      }
    }
  },

  beforeDestroy() {
    this.stopPolling();
  }
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--large {
  height: 62px;
}
</style>

<style>
.article-description p {
  min-height: 1.5rem;
}
.slick-prev:before, .slick-next:before {
      color:#1a1d18 !important;
      font-size: 1.15rem;
      height: 2fr;
      width: 2fr;
}

.selected {
  background: #1a1d18;
  color: #ffffff;
  border: 1px solid transparent;
}
img{
  aspect-ratio: 4 / 3;
  object-fit: contain;
}
</style>