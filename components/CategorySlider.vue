<template>
  <div v-if="categories.length > 0">
      <InfiniteCategorySlider
        :options="categories"
        @click="filterCategory"
      />
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'
import InfiniteCategorySlider from './InfiniteCategorySlider.vue'
import categoryList from '~/mixins/shop/categories'

export default {
  name: 'CategorySlider',
  components: { InfiniteCategorySlider },
  mixins: [ categoryList ],
  data() {
    return { }
  },
  mounted() {
    this.$nextTick(() => {
      this.retrieveCategories()
    })
  },
  methods: {
    filterCategory(category) {
      if (category === null) {
        this.$store.commit('shop/setSelectedCategory', null)
      } else {
        this.$store.commit('shop/setSelectedCategory', category.id)
      }
      this.emitChange()
    },
    emitChange: _debounce(function() {
      this.$emit('change')
    }, 1000)
  },
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