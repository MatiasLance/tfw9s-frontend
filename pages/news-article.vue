<template>
  <div class="min-h-screen bg-[#1A1A1B] text-white">
    <div>
      <div class="block gap-4 md:grid md:grid-cols-12">
        <div class="article-gallery col-span-12">
          <VCarousel
              height="450"
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
        <div
        class="article-context font-semibold col-span-12 p-[1rem]
        mx-auto max-w-screen-xl w-full"
        >
          <span class="text-3xl">
            {{article.headline}}
          </span>
          <p class="text-lg text-brand-slate">
            {{ formattedDate(article.updated_at) }}
          </p>
        </div>
        <article
        class="article-description col-span-12 p-[1rem]
        mx-auto max-w-screen-xl w-full text-wrap"
        >
          <p
            class="my-4 text-white"
            v-html="article.content"
          />
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';
import handlesMedia from '~/mixins/shop/handlesMedia'
import handlesCoordinates from '~/mixins/utilities/handlesCoordinates'
import currencyMixin from '~/mixins/currency'
import formattedDate from '~/mixins/utilities/formattedDate'

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
  name: 'news-article',
  mixins: [
    currencyMixin,
    handlesMedia,
    handlesCoordinates,
    formattedDate,
  ],
  data() {
    return {
      isSelected: '',
      salePriceMock: 100,
      showRRP: true,
      isOnSaleMock: true,
      article: {
        id: 0,
        headline: '',
        content: '',
        // eslint-disable-next-line camelcase
        updated_at: null,
      },
      showOutOfStock: true,
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
    cartItems: {
      get() {
        return this.$store.state.cart.cart
      },
    },
    cartCount: {
      get() {
        return this.$store.getters['cart/cartCount']
      },
    },
  },
  watch: {
    $route() {
      this.retrieveNews(this.$route.query.id);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  },
  mounted() {
    this.retrieveNews(this.$route.query.id);
  },
  methods: {
    viewVariantSlider() {
      const sliderCoordinates = this.getCoordinates(this.$refs.variantSlider)
      window.scrollTo({
        top: sliderCoordinates.top,
        left: sliderCoordinates.left,
        behavior: 'smooth',
      })
    },
    setActiveMedia(path) {
      this.activeImageURL = this.getMediaURL(path)
    },
    retrieveNews(newsId) {
      this.$axios
        .$get(`v1/news/${newsId}`)
        .then((response) => {
          this.article = response.data.news
          this.activeImageURL = this.getMediaURL(this.article.media[0])
          this.photos = this.article.media.map((x) =>
            `${this.$config.baseURL}/storage/${x.path}`);
        })
    },
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
