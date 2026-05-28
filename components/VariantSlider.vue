<template>
  <VueSlickCarousel
    v-if="items.length > 0"
    v-bind="slickSettings"
    class="px-4"
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
      :is-hide-out-of-stock="item.isHideOutOfStock"
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
  slidesToShow: 3,
  slidesToScroll: 1,
  speed: 500,
  swipe: true,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        infinite: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        infinite: true,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
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
    items() {
      return Array.isArray(this.variants) ? this.variants : []
    }
  },
}
</script>

<style scoped>
::v-deep .slick-slide[data-v-e4caeaf8] {
  padding: 10px;
}
</style>