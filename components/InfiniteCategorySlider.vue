<template>
  <div>
    <VueSlickCarousel class="mb-4" v-bind="slickSettings">
      <div>
        <ShopCategory
          :selected="currentCategory === null"
          @click="categorySelectedEventHandler(null)"
        >
          All
        </ShopCategory>
      </div>
      <div
        v-for="category in options"
        :key="category.id"
      >
        <ShopCategory
          :selected="isSelected(category)"
          @click="categorySelectedEventHandler(category)"
        >
          {{ category.name }}
        </ShopCategory>
      </div>
    </VueSlickCarousel>
    <div v-if="selected != null && selected.children.length > 0 && isSibling()">
      <InfiniteCategorySlider
        ref="childSlider"
        :options="selected.children"
        @click="$emit('click', getSelected())"
      />
    </div>
  </div>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import VueSlickCarousel from 'vue-slick-carousel'
import ShopCategory from '~/components/ShopCategory'
import categoryList from '~/mixins/shop/categories'

const slickSettings = {
  arrows: true,
  rows: 1,
  slidesToShow: 5,
  slidesToScroll: 1,
  speed: 500,
  swipe: true,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 4,
        infinite: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 3,
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
  name: 'InfiniteCategorySlider',
  components: {
    VueSlickCarousel,
    ShopCategory
  },
  mixins: [ categoryList ],
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentCategory: null,
      slickSettings
    }
  },
  computed: {
    selected: {
      get() {
        if (this.currentCategory !== null) {
          return this.findCategory(this.currentCategory)
        } else {
          return null
        }
      },
      set(value) {
        this.currentCategory = value
      }
    }
  },
  methods: {
    findCategory(id, categories = null) {
      if (categories === null) {
        categories = this.categories;
      }

      for (let i = 0; i < categories.length; i++) {
        const category = categories[i]
        let needle = null

        if (category.id === id) {
          needle = category
        } else if (category.children && category.children.length > 0) {
          needle = this.findCategory(id, category.children)
        }

        if (needle === null) {
          continue
        } else {
          return needle
        }
      }

      return null
    },
    isSelected(category) {
      return this.selected != null && category.id === this.selected.id
    },
    isSibling() {
      if (this.selected !== null) {
        const isSibling = this.options.find((x) => {
          return x.id === this.selected.id
        })

        if (!isSibling) {
          this.selected = null
        }
        return !!isSibling
      }

      return false
    },
    getSelected() {
      if (this.selected != null) {
        if (
          this.selected.children.length > 0 &&
          this.isSibling()
        ) {
          const childSelected = this.$refs.childSlider.getSelected()

          if (childSelected !== null) {
            return childSelected
          }
        }

        return this.selected

      } else {
        return null
      }
    },
    categorySelectedEventHandler(category) {
      if (category == null) {
        this.currentCategory = null
      } else {
        this.currentCategory = category.id
      }

      this.$nextTick(() => {
        this.$emit('click', this.getSelected())
      })
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

.selected {
  background: #1a1d18;
  color: #ffffff;
  border: 1px solid transparent;
}
</style>