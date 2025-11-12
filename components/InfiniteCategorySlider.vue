<template>
  <div>
    <VueSlickCarousel 
      class="mb-4" 
      v-bind="slickSettings"
    >
      <!-- All Categories Option -->
      <div>
        <ShopCategory
          :selected="currentCategory === null"
          @click="handleCategorySelect(null)"
        >
          All
        </ShopCategory>
      </div>
      
      <!-- Category Options -->
      <div
        v-for="category in options"
        :key="category.id"
      >
        <ShopCategory
          :selected="isCategorySelected(category)"
          @click="handleCategorySelect(category)"
        >
          {{ category.name }}
        </ShopCategory>
      </div>
    </VueSlickCarousel>

    <!-- Child Categories Slider -->
    <div 
      v-if="shouldShowChildSlider"
      class="child-slider-container"
    >
      <InfiniteCategorySlider
        ref="childSlider"
        :options="selectedCategory.children"
        @click="$emit('click', getFinalSelectedCategory())"
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

// Carousel settings - easier to modify
const slickSettings = {
  arrows: true,
  rows: 1,
  slidesToShow: 5,
  slidesToScroll: 2,
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
        initialSlide: 2,
        infinite: true,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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
      default: () => [] // Safer default
    },
  },
  
  data() {
    return {
      currentCategory: null,
      slickSettings: { ...slickSettings } // Clone to avoid shared reference
    }
  },
  
  computed: {
    /**
     * Get the currently selected category object
     */
    selectedCategory() {
      if (this.currentCategory === null) {
        return null
      }
      return this.findCategoryById(this.currentCategory)
    },

    /**
     * Check if we should display the child slider
     */
    shouldShowChildSlider() {
      if (!this.selectedCategory) return false
      
      const hasChildren = this.selectedCategory.children && 
                         this.selectedCategory.children.length > 0
      const isCurrentCategoryValid = this.isCurrentCategoryInOptions()
      
      return hasChildren && isCurrentCategoryValid
    }
  },
  
  methods: {
    /**
     * Find a category by ID in the category tree
     */
    findCategoryById(targetId, categories = null) {
      const searchCategories = categories || this.categories
      
      for (const category of searchCategories) {
        // Check current category
        if (category.id === targetId) {
          return category
        }
        
        // Recursively search children
        if (category.children && category.children.length > 0) {
          const foundInChildren = this.findCategoryById(targetId, category.children)
          if (foundInChildren) {
            return foundInChildren
          }
        }
      }
      
      return null // Category not found
    },

    /**
     * Check if a category is currently selected
     */
    isCategorySelected(category) {
      return this.selectedCategory && 
             category.id === this.selectedCategory.id
    },

    /**
     * Verify current category exists in current options
     */
    isCurrentCategoryInOptions() {
      if (!this.selectedCategory) return false
      
      return this.options.some(category => 
        category.id === this.selectedCategory.id
      )
    },

    /**
     * Get the final selected category (handles nested selections)
     */
    getFinalSelectedCategory() {
      if (!this.selectedCategory) return null

      // Check if we have a child slider with a selection
      if (this.shouldShowChildSlider && this.$refs.childSlider) {
        const childSelection = this.$refs.childSlider.getFinalSelectedCategory()
        if (childSelection) {
          return childSelection
        }
      }

      return this.selectedCategory
    },

    /**
     * Handle category selection with clear naming
     */
    handleCategorySelect(category) {
      // Set the current category
      this.currentCategory = category ? category.id : null
      
      // Emit the selection after DOM update
      this.$nextTick(() => {
        const finalSelection = this.getFinalSelectedCategory()
        this.$emit('click', finalSelection)
      })
    },

    /**
     * Reset selection - useful for parent components
     */
    resetSelection() {
      this.currentCategory = null
      if (this.$refs.childSlider) {
        this.$refs.childSlider.resetSelection()
      }
    },

    /**
     * Get current selection state - for debugging
     */
    getSelectionState() {
      return {
        currentCategory: this.currentCategory,
        selectedCategory: this.selectedCategory,
        hasChildSlider: !!this.$refs.childSlider,
        childSelection: this.$refs.childSlider ? 
          this.$refs.childSlider.getSelectionState() : null
      }
    }
  }
}
</script>

<style scoped>
.child-slider-container {
  margin-top: 1rem;
}

/* Carousel arrow styling */
.slick-prev:before, 
.slick-next:before {
  color: #1a1d18 !important;
  font-size: 1.15rem;
}

/* Selected state styling - more specific */
.shop-category.selected {
  background: #1a1d18;
  color: #ffffff;
  border: 1px solid transparent;
}
</style>