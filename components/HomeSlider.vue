<template>
  <div>
    <VueSlickCarousel class="mb-4 bg-brand-slate" v-bind="slickSettings">
      <div
        class="grid w-full grid-cols-12 bg-gray-700"
      >
        <div class="col-span-12 md:col-span-5">
          <div
            class="mx-auto w-full max-w-[380px] text-center sm:px-[20px]"
          >
            <div
              class="flex flex-col flex-wrap items-center
              justify-center py-24"
            >
              <div
                class="mb-[25px] h-[400px] w-full
                bg-[url('/img/hero/2.jpg')]
                bg-cover bg-no-repeat sm:h-[500px]"
              />
              <h2
                class="
                my-3 text-base font-normal
                uppercase tracking-[1px]
                text-white sm:text-2xl"
              >
              Giuseppe Zanotti Square Logo
              </h2>
              <NuxtLink to="/shop">
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
      <div
        class="grid w-full grid-cols-12 bg-orange-600"
      >
        <div class="col-span-12">
          <div
            class="mx-auto w-full max-w-[380px] text-center sm:px-[20px]"
          >
            <div
              class="flex flex-col flex-wrap items-center
              justify-center py-24"
            >
              <div
                class="mb-[25px] h-[400px] w-full
                bg-[url('/img/hero/3.jpg')]
                bg-cover bg-no-repeat sm:h-[500px]"
              />
              <h2
                class="
                my-3 text-base font-normal
                uppercase tracking-[1px]
                text-white sm:text-2xl"
              >
              Billionaire Boys Club
              </h2>
              <NuxtLink to="/shop">
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
      <div
        class="grid w-full grid-cols-12 bg-slate-200"
      >
        <div class="col-span-12">
          <div
            class="mx-auto w-full max-w-[380px] text-center sm:px-[20px]"
          >
            <div
              class="flex flex-col flex-wrap items-center
              justify-center py-24"
            >
              <div
                class="mb-[25px] h-[400px] w-full
                bg-[url('/img/hero/5.jpg')]
                bg-cover bg-no-repeat sm:h-[500px]"
              />
              <h2
                class="
                my-3 text-base font-normal
                uppercase tracking-[1px]
                text-black sm:text-2xl"
              >
              Jordan 4 Retro Black
              </h2>
              <NuxtLink to="/shop">
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
    </VueSlickCarousel>
  </div>
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
      slickSettings
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