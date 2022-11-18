<template>
  <VueSlickCarousel class="mb-4 bg-brand-slate" v-bind="slickSettings">
    <div
      v-for="slider in sliders"
      :key="slider.id"
      class="grid w-full grid-cols-12 bg-gray-700"
    >
      <div class="col-span-12 md:col-span-5">
        <div
          class="mx-auto h-full w-full text-center"
        >
          <div
            class="flex flex-col items-center
            justify-center"
          >
            <img
              :src="`/img/hero/${slider.path}`"
              class="mb-[25px] w-full object-cover
               object-center sm:h-screen"
              alt=""
            />
            <div class="h-[20vh] py-3 sm:px-5">
              <h2
                class="
                my-3 text-base font-normal
                uppercase tracking-[1px]
                text-white sm:text-2xl"
              >
                {{ slider.title }}
              </h2>
              <NuxtLink to="/shop" class="my-3 mb-11">
                <BaseButtonLight
                  class="
                    w-full
                    rounded-lg
                    bg-white py-8 px-14
                    uppercase
                    text-black
                    hover:bg-brand-slate hover:text-white
                    focus:ring-1 focus:ring-white focus:ring-offset-2
                  "
                >
                  {{ cta }}
                </BaseButtonLight>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </VueSlickCarousel>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import VueSlickCarousel from 'vue-slick-carousel'

const slickSettings = {
  arrows: false,
  dots: false,
  rows: 1,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 800,
  swipe: true,
  swipeToSlide: true,
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