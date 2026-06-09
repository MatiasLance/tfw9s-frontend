<template>
  <div>
    <section v-if="totalPages > 0" class="mb-8">
      <div
      v-if="!isProductsLoading"
        class="
          flex flex-wrap items-center justify-around
          gap-x-2
          lg:justify-between
        "
        data-aos="flip-up"
        data-aos-offset="0"
      >
        <span class="text-base leading-[2.5em] text-white">
          Showing {{ from }}-{{ to }} of {{ totalItems }} results
        </span>
        <BasePagination
          :active-page="page"
          :total-pages="totalPages"
          @change="setPage"
        />
      </div>
    </section>

    <section
      v-if="totalPages === 0"
      class="flex h-80 items-center justify-center rounded-3xl 
            bg-gradient-to-br from-gray-800 to-gray-900 
            border-2 border-dashed border-green-500/30"
    >
      <div class="text-center">
        <i class="ri-article-line text-6xl text-green-500/40 mb-4"></i>
        <h3 class="text-2xl font-bold text-gray-300 mb-2">
          No Merch Available
        </h3>
        <p class="text-gray-400">
          It looks like this category is currently empty. 
          Check back soon for new team gear, exclusive drops, and official merchandise!
        </p>
      </div>
    </section>

    <section
      class="
        xxl:grid-cols-5
        2xxl:grid-cols-7
        xxl:gap-x-4
        2xxl:gap-x-5
        xxl:gap-y-12
        2xxl:gap-y-12
        grid grid-cols-1
        gap-x-4 gap-y-6
        sm:grid-cols-2
        md:grid-cols-3 md:gap-x-4 md:gap-y-8
        lg:grid-cols-4 lg:gap-x-4 lg:gap-y-10
      "
      v-bind="$attrs"
    >
      <ItemThumbnailView
        v-for="product in products"
        :key="product.id"
        :uid="product.id"
        :name="product.name"
        :price="product.price"
        :saleprice="product.saleprice"
        :categories="product.categories"
        :stock="product.stock"
        :path="getMediaURL(product.media[0])"
        :has-variants="product.has_variants"
        :is-rrp="product.show_rrp"
        :is-on-sale="product.is_on_sale"
        :is-hide-out-of-stock="product.isHideOutOfStock"
        :active="product.is_active"
        data-aos="fade-up"
        data-aos-offset="30"
      />
    </section>
    <LoadingAnimation
    :is-loading="isProductsLoading"
    loading-title="Products"
    />
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import handlesMedia from '~/mixins/shop/handlesMedia'
import BasePagination from '~/components/base/BasePagination';
import ItemThumbnailView from '~/components/ItemThumbnailView';
import LoadingAnimation from '~/components/loading/LoadingAnimation';

export default {
  name: 'ProductSection',
  components: {
    BasePagination,
    ItemThumbnailView,
    LoadingAnimation
  },
  mixins: [ handlesMedia ],
  data() {
    return {
      from: 0,
      to: 0,
      totalItems: 0,
      totalPages: 0,
      isProductsLoading: true,
      products: [],
      isScroll: false,
      scrollValue: 0
    };
  },
  computed: {
    page: {
      get() {
        return this.$store.state.shop.page
      },
      set(value) {
        this.$store.commit('shop/setPage', value)
      },
    },
    query: {
      get() {
        return this.$store.state.shop.q
      },
    }
  },
  watch: {
    query() {
      this.debouncedSearch();
    },
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
  },
  mounted() {
    this.debouncedSearch = debounce(this.retrieveProducts, 800);
    this.retrieveProducts();
    this.page = 1
    this.$nextTick(() => {
      if (localStorage.getItem('scrollTop') !== null) {
        this.scrollValue = Number.parseInt(localStorage.getItem('scrollTop'))
      }
      this.retrieveProductsWithScroll()
    })
  },
  methods: {
    retrieveProducts() {
      const query = {
        q: this.query,
        sort: this.$store.state.shop.sortBy,
        page: this.$store.state.shop.page,
        category: this.$store.state.shop.selectedCategory,
      };

      // Sanitize and remove null values
      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/items?${queryString}`)
        .then((response) => {
          this.products = response.data.items
          this.totalItems = response.data.total_items
          this.totalPages = response.data.last_page
          this.from = response.data.from
          this.to = response.data.to
        })
        .finally(() => {
          this.isProductsLoading = false
        })
    },
    retrieveProductsWithScroll() {
      this.isProductsLoading = true
      this.isScroll = this.$route.query.scroll

      const query = {
        q: this.$store.state.shop.q,
        sort: this.$store.state.shop.sortBy,
        page: this.$store.state.shop.page,
        category: this.$store.state.shop.selectedCategory,
      };

      // Sanitize and remove null values
      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/items?${queryString}`)
        .then((response) => {
          this.products = response.data.items
          this.totalItems = response.data.total_items
          this.totalPages = response.data.last_page
          this.from = response.data.from
          this.to = response.data.to
          this.$nextTick(() => {
            if (this.cartCount > 0 || this.isScroll) {
              window.scrollTo({
                top: this.scrollValue,
                behavior: 'smooth'
              })
            }
          })
        })
        .finally(() => {
          this.isProductsLoading = false
        })
    },
    setPage(page) {
      this.page = page
      this.retrieveProducts()
    },
  },
};
</script>

<style scoped>
.container {
  border: 1px solid green;
}
.row {
  border: 1px solid blue;
}
</style>