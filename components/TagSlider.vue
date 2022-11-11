<template>
    <div>
        <VueSlickCarousel v-bind="slickSettings">
            <div
                v-for="tag in tags"
                :key="tag.id"
                @click="tag.isActive = !tag.isActive"
            >
                <a
                href="#"
                :class="`mx-3 flex flex-col items-center justify-center
                rounded-md border
                border-gray-300 p-1 text-center
                focus:border-gray-900 ${select(tag)}`"
                >
                    <span class="text-center">
                        {{ tag.name }}
                    </span>
                </a>
            </div>
        </VueSlickCarousel>
    </div>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import VueSlickCarousel from 'vue-slick-carousel'

const tagData = [
  {
    id: 1,
    name: 'Good condition',
    isActive: false
  },
  {
    id: 2, name: 'Always in stock', isActive: false
  },
  {
    id: 3, name: 'Some scratches', isActive: false
  },
  {
    id: 4, name: 'Tested', isActive: false
  },
  {
    id: 5, name: 'No Splits', isActive: false
  },
  {
    id: 6, name: 'New', isActive: false
  },
  {
    id: 7, name: 'Popular', isActive: false
  }
]

const slickSettings = {
  arrows: true,
  rows: 1,
  slidesToShow: 6,
  slidesToScroll: 6,
  speed: 500,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 3,
        infinite: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        infinite: true,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      }
    }
  ]
}

export default {
  name: 'TagSlider',
  components: { VueSlickCarousel },
  data() {
    return {
      selectedTags: [],
      tags: tagData,
      slickSettings
    }
  },
  methods: {
    select(tag) {
      if (tag.isActive) {
        return 'selected'
      }
      return ''
    }
  }
}
</script>

<style>
.slick-prev:before, .slick-next:before {
    color:#1a1d18 !important;
    font-size: 1.15rem;
    height: 3fr;
    width: 3fr;
}

.slick-track
{
    display: flex !important;
}

.slick-slide
{
    height: inherit !important;
}

.selected {
  background: #1a1d18;
  color: #ffffff;
  border: 1px solid transparent;
}

</style>