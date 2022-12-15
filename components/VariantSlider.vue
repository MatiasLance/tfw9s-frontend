<template>
  <VueSlickCarousel
    v-if="items.length > 0"
    v-bind="slickSettings"
    class="flex w-full grow"
  >
    <ProductThumbnailView
      v-for="item in items"
      :key="item.id"
      :uid="item.id"
      :name="item.name"
      :price="item.price"
      :categories="item.categories"
      :stock="item.stock"
      :path="getMediaURL(item.media[0])"
      :has-variants="item.has_variants"
    />
  </VueSlickCarousel>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import VueSlickCarousel from 'vue-slick-carousel'
import handlesMedia from '~/mixins/shop/handlesMedia'
import ProductThumbnailView from '~/components/ProductThumbnailView'

const slickSettings = {
  arrows: true,
  rows: 1,
  slidesToShow: 6,
  slidesToScroll: 6,
  speed: 500,
  swipe: true,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 4,
        infinite: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 3,
        infinite: true,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      }
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      }
    }
  ]
}

export default {
  components: {
    VueSlickCarousel,
    ProductThumbnailView
  },
  mixins: [ handlesMedia ],
  props: {
    variants: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return { slickSettings }
  },
  computed: {
    items: {
      get() {
        if (this.variants != null || typeof this.variants === 'undefined') {
          return this.variants
        } else {
          return []
        }
      },
    },
  },
}
</script>