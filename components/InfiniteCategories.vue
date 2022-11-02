<template>
  <div class="grow">
    <select
      v-model="currentCategory"
      class="
        my-2 block w-full
        appearance-none
        border border-gray-200 bg-gray-200
        py-2 px-3
        hover:border-gray-400
        focus:border-gray-400 focus:outline-none
      "
    >
        <option
          v-for="category in options"
          :key="category.id"
          :value="category.id"
          aria-placeholder="Select Category"
          selected
          >
            {{ category.name }}
        </option>
    </select>

    <div v-if="selected != null && selected.children.length > 0">
        <InfiniteCategories
          ref="childCategory"
          :options="selected.children"
          :lineage="childLineage"
        />
    </div>
  </div>
</template>

<script>
import InfiniteCategories from '../components/InfiniteCategories'
import categoryList from '~/mixins/shop/categories'

export default {
  name: 'InfiniteCategories',
  components: { InfiniteCategories },
  mixins: [ categoryList ],
  props: {
    options: {
      type: Array,
      required: true,
    },
    lineage: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      currentCategory: null,
      childLineage: null,
    }
  },
  computed: {
    selected: {
      get() {
        if (this.currentCategory < 0) {
          return this.options.find(x => x.id === this.currentCategory)
        } else if (this.currentCategory !== null) {
          return this.findCategory(this.currentCategory)
        } else {
          return null
        }
      },
    },
    categories: {
      get() {
        return this.$store.state.product.categories
      },
      set(value) {
        this.$store.commit('product/setCategories', value)
      }
    }
  },
  mounted() {
    if (this.lineage !== null) {
      const lineageCopy = [ ...this.lineage ]
      this.currentCategory = lineageCopy.pop()
      this.childLineage = lineageCopy
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
    getSelected() {
      if (this.selected != null && this.$refs.childCategory) {
        const childValue = this.$refs.childCategory.getSelected()
        if (childValue != null) {
          return childValue
        } else {
          return this.selected
        }

      } else {
        return this.selected
      }
    }
  }
}
</script>