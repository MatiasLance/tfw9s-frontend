<template>
  <div>
    <VueSlickCarousel
      v-if="options.length > 0"
      :key="`carousel-${currentCategory || 'all'}-${options.length}`"
      class="mb-4"
      v-bind="slickSettings"
    >
      <div :key="'all'">
        <ShopCategory
          :selected="currentCategory === null"
          @click="categorySelectedEventHandler(null)"
        >
          All
        </ShopCategory>
      </div>
      <div
        v-for="category in options"
        :key="`cat-${category.id}`"
      >
        <ShopCategory
          :selected="isSelected(category)"
          @click="categorySelectedEventHandler(category)"
        >
          {{ category.name }}
        </ShopCategory>
      </div>
    </VueSlickCarousel>
    <InfiniteCategorySlider
      v-if="selected &&
      selected.children && selected.children.length > 0 &&
      isCurrentSelectionValid()"
      ref="childSlider"
      :options="selected.children"
      @selection-changed="handleChildSelection"
    />
  </div>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import VueSlickCarousel from 'vue-slick-carousel'
import ShopCategory from '~/components/ShopCategory'
import categoryList from '~/mixins/shop/categories'

// Slick Carousel Settings
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
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 3,
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
  name: 'InfiniteCategorySlider',
  components: {
    VueSlickCarousel,
    ShopCategory
  },
  mixins: [ categoryList ],
  props: {
    options: {
      type: Array,
      required: true
    }
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
        }
        return null
      },
      set(value) {
        this.currentCategory = value != null && value.id != null ? value.id : null
      }
    }
  },
  watch: {
    options: {
      handler() {
        if (this.selected && !this.isCurrentSelectionValid()) {
          this.currentCategory = null
        }
      },
      immediate: true
    }
  },
  activated() {
    if (this.selected && !this.isCurrentSelectionValid()) {
      this.currentCategory = null
    }

    this.$nextTick(() => {
      this.$forceUpdate()
    })
  },
  methods: {
    findCategory(id, categories = null) {
      if (!categories) categories = this.categories

      for (const category of categories) {
        if (category.id === id) {
          return category
        } else if (category.children && category.children.length > 0) {
          const found = this.findCategory(id, category.children)
          if (found) return found
        }
      }
      return null
    },
    isCurrentSelectionValid() {
      if (!this.selected) return false
      return this.options.some(opt => opt.id === this.selected.id)
    },
    isSelected(category) {
      return this.selected !== null && category.id === this.selected.id
    },
    getSelected() {
      if (!this.selected) return null

      if (
        Array.isArray(this.selected.children) &&
        this.selected.children.length > 0 &&
        this.isCurrentSelectionValid()
      ) {
        const childSlider = this.$refs.childSlider
        if (childSlider && typeof childSlider.getSelected === 'function') {
          const childSelected = childSlider.getSelected()
          if (childSelected) return childSelected
        }
      }

      return this.selected
    },
    categorySelectedEventHandler(category) {
      const newId = category != null && category.id != null ? category.id : null
      const oldId = this.currentCategory

      // Prevent duplicate emits
      if (newId === oldId) return

      this.currentCategory = newId

      this.$nextTick(() => {
        const selection = this.getSelected()
        this.$emit('selection-changed', selection)
      })
    },
    handleChildSelection(selection) {
      this.$emit('selection-changed', selection)
    }
  }
}
</script>

<style>
.slick-prev:before,
.slick-next:before {
  color: #1a1d18 !important;
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