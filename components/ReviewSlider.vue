<template>
    <div>
        <VueSlickCarousel
            class="mb-8"
            v-bind="slickSettings"
        >
            <div
                v-for="review in reviews"
                :key="review.id"
                class="mx-4 flex flex-col rounded-md px-9
                py-3"
            >
                <h3 class="my-8 text-xl font-bold text-brand-dgrey">
                    "{{ review.message }}"
                </h3>
                <small class="my-11 text-sm">
                    {{ review.customer }} ({{ review.product}})
                </small>
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
  dots: true,
  rows: 1,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 700,
  swipe: true,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
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
  name: 'ReviewSlider',
  components: { VueSlickCarousel },
  data() {
    return {
      slickSettings,
      reviews: [
        {
          id: 1,
          message: 'Very happy! Great service! Great product! Great price!',
          customer: 'Mike',
          product: 'Nike Air Huarache Run, Size US 9.5'
        },
        {
          id: 2,
          message: 'Super fast shipping. I love these sneakers so much. Thank you so much',
          customer: 'Kalen Garcia',
          product: 'Jordan 1 Mid Glitter Black, Size US 6.5W'
        },
        {
          id: 3,
          message: 'Quick postage, shoes as pictured and described. They’re so HOT! Really happy, such a smooth transaction with Authenticator.',
          customer: 'Madeleine S. Naylor',
          product: 'Air Force 1 Iridescent Swoosh, Size US 9W'
        },
        {
          id: 4,
          message: 'Perfect seller. Very kind to deal with and immaculate service - had the item posted very fast and the item is exactly as the seller described. Can’t thank you enough.',
          customer: 'Brayden Black',
          product: 'Jordan 1 Low Black, White, Grey, Size US 10'
        },
        {
          id: 5,
          message: 'Great Seller, fast delivery on shoes even with Authentication process. Product exactly as advertised.',
          customer: 'Derrick Chee',
          product: 'Jordan 1 Retro High Reverse bred, Size US 12.5'
        },
        {
          id: 6,
          message: 'Great seller, fast delivery. Definitely recommended!',
          customer: 'Evan Borce',
          product: 'Nike Air Presto South Korea, Size S'
        }
      ]
    }
  }
}
</script>