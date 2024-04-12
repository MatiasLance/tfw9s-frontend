<template>
  <div class="min-h-screen bg-[#1A1A1B] text-white">
    <div>
      <div class="block gap-4 md:grid md:grid-cols-12">
        <div class="article-gallery col-span-12">
          <VCarousel
          height="450"
          :show-arrows="false"
          cycle
          hide-delimiters
        >
        <VCarouselItem
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        :lazy-src="'~/assets/images/kidsplaying.jpg'"
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
        <div
        class="article-description col-span-12 p-[1rem]
        mx-auto max-w-screen-xl"
        v-html="article.content"
        >
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
      items: [
        { src: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL2Rlc2lnbndpdGhtZTA5X2JsYWNrX21hbl9ydWdieV9zcG9ydHNtYW5fcGxheWVyc193aXRoX2JhbGxfaW5fYV9kZDBiMTI2OS05ZDYwLTQ3M2ItYWRkOC1jYjdjMDcxN2U2MmVfMS5qcGc.jpg' },
        { src: 'https://wallpapers.com/images/hd/rugby-1920-x-1080-background-0vg09r15g7wpqe45.jpg' },
        { src: 'https://images5.alphacoders.com/545/545896.jpg' },
        { src: 'https://png.pngtree.com/background/20230617/original/pngtree-3d-rugby-ball-and-posts-rendered-on-the-field-picture-image_3668304.jpg' },
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
          this.photos = this.article.media
        })
    },
    formattedDate(dateString) {
      const date = new Date(dateString);
      const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
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
      const dayOfWeek = daysOfWeek[date.getDay()];
      const dayOfMonth = date.getDate();
      const monthName = months[date.getMonth()];
      const year = date.getFullYear();

      const suffixes = [
        'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'
      ];
      const suffixIndex = dayOfMonth % 100;
      const suffix = suffixes[suffixIndex >= 11 &&
      suffixIndex <= 13 ? 0 : dayOfMonth % 10];

      return `${dayOfWeek} ${dayOfMonth}${suffix} ${monthName} ${year}`;
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