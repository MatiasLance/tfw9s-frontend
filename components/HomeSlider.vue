<template>
  <VueSlickCarousel class="bg-brand-slate" v-bind="slickSettings">
    <div
      v-for="slider in sliders"
      :key="slider.id"
      class="h-[400px] w-full bg-cover bg-top sm:h-[600px] lg:h-[900px]"
    >
      <NuxtLink to="/shop" class="cursor-pointer">
        <img
           :src="`/img/hero/${slider.path}`"
           class="h-[400px] w-full
           object-cover lg:my-0 lg:h-[900px]"
           alt=""
         />
      </NuxtLink>
    </div>
  </VueSlickCarousel>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import VueSlickCarousel from 'vue-slick-carousel'

const slickSettings = {
  arrows: false,
  dots: true,
  rows: 1,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipe: true,
  speed: 1000,
  swipeToSlide: true,
  pauseOnDotsHover: true,
  pauseOnFocus: true,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        focusOnSelect: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        focusOnSelect: true,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
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
  name: 'HomeSlider',
  components: { VueSlickCarousel },
  data() {
    return {
      superheadline: 'Welcome to',
      headline: 'Gold Coast\'s Finest RETAIL BOUTIQUE',
      cta: 'Browse Products',
      contentblurb: 'A BRAND NEW 1-OF-1 RETAIL STORE',
      slickSettings,
      sliders: [
        {
          id: 1,
          path: '1.png',
          title: 'Nike Dunk Low \'Panda\''
        },
        {
          id: 2,
          path: '2.png',
          title: 'Jordan 4 Retro Black Canvas'
        },
        {
          id: 3,
          path: '3.png',
          title: 'Nike Dunk Low Gym Red USC'
        },
        {
          id: 4,
          path: '4.png',
          title: 'Jordan 1 Low Vintage Grey'
        },
        {
          id: 5,
          path: '5.png',
          title: 'Jordan 1 Retro High OG Light Fusion Red'
        },
        {
          id: 6,
          path: '6.png',
          title: 'Nike Dunk Low \'UCLA\''
        },
        {
          id: 7,
          path: '7.png',
          title: 'Jordan 11 Retro Low \'Easter\' (Iridescent Emerald)'
        },
        {
          id: 8,
          path: '8.png',
          title: 'Nike Dunk High Black White (Panda)'
        },
      ]
    };
  },
};
</script>

<style lang="postcss">
.shop-cta{
  @apply mt-16 mb-8
}

.shop-cta-sm{
  @apply mt-2 mb-10
}

@media (max-width: 768px) {
  .home-slider-container {
    @apply flex-wrap items-start
  }
}

.home-slider-container {
  @apply flex justify-center items-center;
}
</style>