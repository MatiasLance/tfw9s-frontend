<template>
  <div>
    <section class="mb-8">
      <div
        class="
          flex flex-wrap items-center justify-around
          gap-x-2 lg:justify-between
        "
      >
        <span class="text-base leading-[2.5em]">
          Showing {{ from }}-{{ to }} of {{ totalItems }} results
        </span>
        <div>
          <SortSearchTop
            @change="retrieveProducts"
          />
        </div>
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
        grid grid-cols-2
        gap-x-0 gap-y-6
        sm:grid-cols-2
        md:grid-cols-3 md:gap-x-4 md:gap-y-8
        lg:grid-cols-4 lg:gap-x-2 lg:gap-y-10
      "
      v-bind="$attrs"
    >
      <ProductThumbnailView
        v-for="product in productsStatic"
        :key="product.id"
        :uid="product.id"
        :name="product.name"
        :price="product.price"
        :categories="product.categories"
        :stock="product.stock"
        :path="getMediaURL(product.media[0])"
        :has-variants="product.has_variants"
      />
    </section>

    <section class="mt-8">
      <div class="flex items-end justify-end">
        <BasePagination
            :active-page="page"
            :total-pages="totalPages"
            @change="setPage"
          />
      </div>
    </section>
  </div>
</template>

<script>
import handlesMedia from '~/mixins/shop/handlesMedia'
import BasePagination from '~/components/base/BasePagination';
import ProductThumbnailView from '~/components/ProductThumbnailView';

export default {
  name: 'ProductSection',
  components: {
    BasePagination,
    ProductThumbnailView
  },
  mixins: [ handlesMedia ],
  data() {
    return {
      from: 0,
      to: 0,
      totalItems: 0,
      totalPages: 0,
      isProductsLoading: false,
      products: [],
      productsStatic: [
        {
          id: 1,
          name: 'Chamois cloth 50 cm',
          categories: [
            {
              id: 1,
              name: 'Detailing'
            }
          ],
          price: '169.00',
          stock: 3,
          media: [],
          // eslint-disable-next-line camelcase
          has_variants: false
        },
        {
          id: 2,
          name: 'High pressure washer noob',
          categories: [
            {
              id: 1,
              name: 'Tools'
            }
          ],
          price: '129.00',
          stock: 5,
          media: [],
          // eslint-disable-next-line camelcase
          has_variants: false
        },
        {
          id: 3,
          name: 'Polish microfiber cloth',
          categories: [
            {
              id: 1,
              name: 'Polishing'
            }
          ],
          price: '9.95',
          stock: 20,
          media: [],
          // eslint-disable-next-line camelcase
          has_variants: false
        },
      ]
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
  },
  watch: {
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
  },
  mounted() {
    // this.retrieveProducts()
  },
  methods: {
    retrieveProducts() {
      this.isProductsLoading = true

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