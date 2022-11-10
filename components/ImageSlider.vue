<template>
    <div>
        <VueSlickCarousel class="mb-4" v-bind="slickSettings">
            <div class="my-auto">
        <img
    src="~/assets/images/products/revamped_item_placeholder_thumbnail.png"
    alt="logo"
    class="w-full"
        />
    </div>
    <div class="my-auto">
        <img
    src="~/assets/images/products/revamped_item_placeholder_thumbnail.png"
    alt="logo"
    class="w-full"
        />
    </div>
    <div class="my-auto">
        <img
    src="~/assets/images/products/revamped_item_placeholder_thumbnail.png"
    alt="logo"
    class="w-full"
        />
            </div>
        </VueSlickCarousel>
    </div>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import VueSlickCarousel from 'vue-slick-carousel'

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
        slidesToShow: 8,
        slidesToScroll: 8,
        initialSlide: 8,
        infinite: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 6,
        infinite: true,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
      }
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
      }
    }
  ]
}

export default {
  name: 'ImageSlider',
  components: { VueSlickCarousel },
  data() {
    return {
      currentImage: null,
      slickSettings
    }
  }

}
</script>

<style>
.slick-prev:before, .slick-next:before {
    color:#3981da !important;
    font-size: 1.15rem;
    height: 3fr;
    width: 3fr;
}

.selected {
  background: #3981da;
  color: #ffffff;
  border: 1px solid transparent;
}
</style>