<template>
  <div class="flex min-h-screen items-center bg-[#1A1A1B] text-white">
    <div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-6">
        <div class="article-gallery md:col-span-4">
          <VCarousel
              height="500"
              :show-arrows="false"
              cycle
              hide-delimiters-background
              >
          <VCarouselItem
              v-for="(photo, i) in photos"
              :key="i"
              :src="photo"
              cover
              />
          <VCarouselItem
              v-if="photos.length === 0"
              src='http://localhost:8000/_nuxt/assets/images/kidsplaying.jpg'
              cover
              />
          </VCarousel>
        </div>
        <div class="col-span-1 flex flex-col items-center md:col-span-2">
        <div
        class="article-context font-semibold p-[1rem]
        mx-auto max-w-screen-xl w-full"
        >
          <span class="text-3xl">
            {{article.name}}
          </span>
          <p class="text-lg text-brand-slate">
            {{ DateRange(formattedDate(article.start),
               formattedDate(article.end)) }}
          </p>
        </div>
        <div
        class="article-context font-bold px-[1rem]
        mx-auto max-w-screen-xl w-full
        text-4xl"
        >
        {{ formatCurrencyFromCent(article.price) }}
        </div>
        <article
        class="article-description p-[1rem]
        mx-auto max-w-screen-xl w-full text-wrap
        h-[200px] overflow-y-scroll mb-4"
        >
          <p
            class="my-4 text-white"
            v-html="article.description"
          />
        </article>
        <div class="mb-4 flex w-full justify-center">
          <NuxtLink
            :to="{
              path: '/register/?id=' + article.id,
            query: {
              series: article.name,
              price: article.price,
            }
            }"
          >
            <button
            type="button"
            class="
            from-40%
            via-95%
            to-100%
            col-span-1 inline-block
            w-[250px] select-none rounded-lg
            border
            border-transparent
            bg-gradient-to-tr
            from-[#5EE738]
            via-[#3e872a]
            to-[#050505]
            py-2
            px-6
            text-center text-xl
            font-semibold
            text-white
            transition
            hover:brightness-125
          "
            >
            Register Now
          </button>
        </NuxtLink>
        </div>
        <div class="mb-4 flex w-full justify-center">
          <NuxtLink :to="'/tournaments'">
            <button
            type="button"
            class="
            inline-block
            w-[250px]
            rounded-lg
            bg-[#212121] text-[#999999]
            border-2
            border-[#414141]
            py-3
            px-4
            text-center text-lg
            font-medium
            shadow-sm
            hover:text-white
            hover:bg-[#414141]
            transition
          "
            >
            Back to Tournaments
          </button>
        </NuxtLink>
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
import handlesMedia from '~/mixins/shop/handlesMedia'
import handlesCoordinates from '~/mixins/utilities/handlesCoordinates'
import currencyMixin from '~/mixins/currency/handlesCurrency'

const slickSettings = {
  arrows: true,
  slidesToShow: 4,
  slidesToScroll: 4,
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
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
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
  data() {
    return {
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
        // eslint-disable-next-line camelcase
        updated_at: null,
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
  mounted() {
    this.retrieveToggleTaxControl()
    this.retrieveTaxValue()
    this.retrieveSeries(this.$route.query.id);
  },
  methods: {
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
      this.$axios
        .$get(`v1/series/${Id}`)
        .then((response) => {
          this.article = response.data.series
          this.photos = this.article.media.map((x) =>
            `${this.$config.baseURL}/storage/${x.path}`);
          this.calculatePriceAggregates()
        })

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
      const id = 1;
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
    async retrieveTaxValue() {
      try {
        const id = 1
        const response = await this.$axios.$get(`v1/tax/${id}`)
        this.addTaxOnCartPrice = response.me.addTaxValue
        this.includeTaxOnCartPrice = response.me.includeTaxValue
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
    }
  },
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
</style>
