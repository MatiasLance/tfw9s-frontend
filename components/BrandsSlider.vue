<template>
    <div>
        <VueSlickCarousel
            class="mb-8"
            v-bind="slickSettings"
        >
            <BrandImageSm
                v-for="img in brandsList"
                :key="img"
                :img="img"
            />
        </VueSlickCarousel>
    </div>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import VueSlickCarousel from 'vue-slick-carousel'
import BrandImageSm from './BrandImageSm.vue'

const slickSettings = {
  arrows: false,
  dots: false,
  rows: 1,
  slidesToShow: 5,
  slidesToScroll: 1,
  focusOnSelect: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  swipe: true,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        focusOnSelect: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        focusOnSelect: true,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        focusOnSelect: true,
      }
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        focusOnSelect: true,
      }
    }
  ]
}

export default {
  name: 'BrandsSlider',
  components: {
    VueSlickCarousel,
    BrandImageSm
  },
  data() {
    return {
      slickSettings,
      brandsList: [
        '1.png',
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png',
        '7.png',
        '8.png',
        '9.png',
      ],
    }
  }
}
</script>