<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white pb-8">
    <div class="relative">
      <!-- Hero Carousel Section -->
      <div class="relative overflow-hidden">
        <VCarousel
          height="500"
          :show-arrows="false"
          cycle
          hide-delimiters-background
          class="rugby-carousel"
        >
          <VCarouselItem
            v-for="(photo, i) in photos"
            :key="i"
            :src="photo"
            cover
          >
            <!-- Back Button -->
            <div class="absolute top-6 left-6 z-20">
              <button
                type="button"
                @click="backToNews"
                class="back-button bg-gray-900/80 hover:bg-gray-900 
                       text-white px-6 py-3 rounded-xl transition-all 
                       duration-300 backdrop-blur-sm border border-green-500/30 
                       flex items-center gap-3 group"
              >
                <i class="ri-arrow-left-line text-xl group-hover:-translate-x-1 
                          transition-transform duration-300"></i>
                <span class="font-semibold text-lg">Back to News</span>
              </button>
            </div>
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 
                        via-gray-900/40 to-transparent"></div>
          </VCarouselItem>
          
          <VCarouselItem
            v-if="photos.length === 0"
            src="http://localhost:8000/_nuxt/assets/images/kidsplaying.jpg"
            loading="lazy"
            cover
          >
            <!-- Back Button for Fallback -->
            <div class="absolute top-6 left-6 z-20">
              <button
                type="button"
                @click="backToNews"
                class="back-button bg-gray-900/80 hover:bg-gray-900 
                       text-white px-6 py-3 rounded-xl transition-all 
                       duration-300 backdrop-blur-sm border border-green-500/30 
                       flex items-center gap-3 group"
              >
                <i class="ri-arrow-left-line text-xl group-hover:-translate-x-1 
                          transition-transform duration-300"></i>
                <span class="font-semibold text-lg">Back to News</span>
              </button>
            </div>
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 
                        via-gray-900/40 to-transparent"></div>
          </VCarouselItem>
        </VCarousel>
      </div>

      <!-- Article Content -->
      <div class="relative z-10 -mt-20">
        <div class="mx-auto max-w-4xl w-full px-4 lg:px-6">
          <!-- Article Header Card -->
          <div class="rugby-article-header bg-gradient-to-br from-gray-800 
                      to-gray-900 rounded-3xl border border-green-500/20 
                      shadow-2xl p-8 lg:p-12 mb-8">
            <!-- Article Title -->
            <h1 class="text-4xl lg:text-5xl font-bold text-gray-100 
                       leading-tight mb-6">
              {{ article.headline }}
            </h1>
            
            <!-- Date Badge -->
            <div class="flex items-center gap-4">
              <div class="bg-green-600/20 rounded-xl p-3 border 
                          border-green-500/30">
                <i class="ri-calendar-2-line text-green-400 text-xl"></i>
              </div>
              <span class="text-green-400 font-semibold text-lg">
                {{ formattedDate(article.updated_at) }}
              </span>
            </div>
          </div>

          <!-- Article Content -->
          <article class="rugby-article-content bg-gradient-to-br from-gray-800 
                         to-gray-900 rounded-3xl border border-green-500/20 
                         shadow-2xl p-8 lg:p-12">
            <div class="prose prose-invert prose-lg max-w-none">
              <div 
                class="text-gray-200 leading-relaxed text-lg 
                       space-y-6 article-body"
                v-html="article.content"
              />
            </div>
            
            <!-- Decorative Elements -->
            <div class="flex items-center justify-center mt-12 pt-8 
                        border-t border-green-500/20">
              <div class="flex items-center gap-4 text-green-400">
                <i class="ri-football-line text-2xl"></i>
                <span class="font-semibold">Rugby News</span>
                <i class="ri-football-line text-2xl"></i>
              </div>
            </div>
          </article>
        </div>
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
    backToNews() {
      this.$router.push('/news');
    },
  },
};
</script>

<style scoped>
.rugby-carousel :deep(.v-carousel__controls) {
  background: transparent;
}

.rugby-carousel :deep(.v-carousel__item) {
  position: relative;
}

.rugby-article-header {
  position: relative;
  overflow: hidden;
}

.rugby-article-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right, #10b981, #34d399);
}

.rugby-article-content {
  position: relative;
}

.article-body :deep(p) {
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.article-body :deep(h1),
.article-body :deep(h2),
.article-body :deep(h3) {
  color: #10b981;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-body :deep(a) {
  color: #34d399;
  text-decoration: underline;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.article-body :deep(blockquote) {
  border-left: 4px solid #10b981;
  padding-left: 1rem;
  margin: 2rem 0;
  font-style: italic;
}

.back-button {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.back-button:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}
</style>
