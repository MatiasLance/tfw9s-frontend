<template>
  <section id="featuredProducts" class="my-36 w-full">
    <BaseSection>
      <div class="col-span-12 my-4">
        <h2
          class="
            mb-8
            px-4
            text-center text-3xl
            font-semibold
            uppercase
            sm:mb-16 sm:px-0 sm:text-5xl
          "
        >
          {{ headline }}
        </h2>
      </div>
      <div class="col-span-12 w-full px-4 sm:px-6">
        <section
          class="mb-8"
          data-aos="fade-up"
        >
          <BasePagination
            :active-page="page"
            :total-pages="totalPages"
            @change="setPage"
          />
        </section>
      </div>
      <div class="col-span-12 w-full px-4 sm:px-6">
        <div
          class="
            grid grid-flow-row grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
          data-aos="fade-up"
        >
          <div
            v-for="product in featuredIndexProducts"
            :key="product.id"
          >
            <NuxtLink
              :to="`/product?id=${product.id}`"
            >
              <div
                class="
                  flex aspect-square
                  cursor-pointer
                  flex-col
                  rounded-lg border
                  border-transparent
                  transition
                  duration-200
                  hover:border-gray-400
                "
              >
                <img
                  :src="getMediaURL(product.media[0])"
                  loading="lazy"
                  class="mb-8 rounded-t-lg object-contain"
                  alt=""
                />
                <div class="p-2">
                  <span
                    class="
                      block
                      pb-2
                      text-[18px]
                      font-bold
                      uppercase
                      text-brand-dgrey
                    "
                  >
                    {{ product.brand }}
                  </span>
                  <h2
                    class="
                      pb-2
                      text-base
                      font-normal
                      uppercase
                      text-brand-black
                    "
                  >
                    {{ product.name }}
                  </h2>
                  <span v-if="product.is_on_sale">
                    <span
                      v-if="product.show_rrp"
                      class="text-[14px] leading-[20px]"
                    >RRP</span>
                    <span
                      v-if="product.saleprice
                      && product.saleprice > 0"
                      class="text-[14px] leading-[20px] text-red-500
                      line-through"
                    >
                      A{{ formatCurrency(product.price) }}
                    </span>
                </span>
                  <span
                    v-else
                    class="
                      text-[14px]
                      leading-[20px]
                      text-brand-grey
                      transition-all
                    "
                  >
                    A{{ formatCurrency(product.price) }}
                  </span>
                  <div>
                  <span
                    class="pt-2 pb-4 text-[14px]
                    font-bold
                    leading-[20px]
                    text-brand-green"
                  >
                    <span
                      v-if="product.is_on_sale && product.saleprice
                      && product.saleprice > 0 &&
                      product.saleprice < product.price"
                    >SALE A{{ formatCurrency(product.saleprice) }}</span>
                  </span>
                </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </BaseSection>
  </section>
</template>

<script>
import handlesMedia from '~/mixins/shop/handlesMedia';
import BasePagination from '~/components/base/BasePagination';
import currency from '~/mixins/currency';

export default {
  name: 'FeaturedProductsSection',
  components: {
    BasePagination
  },
  mixins: [
    currency,
    handlesMedia
  ],
  data() {
    return {
      query: '',
      from: 0,
      to: 0,
      totalPages: 0,
      totalItems: 0,
      headline: 'Featured Products',
      products: [],
      filterFeaturedProducts: [],
      currentPage: 1,
      productsPerPage: 8,
      isProductsLoading: false,
      productsRequestId: 0,
      isDestroyed: false
    };
  },
  computed: {
    page: {
      get() {
        return this.$store.state.shop.page;
      },
      set(value) {
        this.$store.commit('shop/setPage', value);
      },
    },
    featuredIndexProducts() {
      return this.products;
    },
  },
  watch: {
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    }
  },
  mounted() {
    this.page = 1
    this.retrieveFeaturedItems();
    this.$socket.on('item-list-changed', this.handleItemListChanged)
  },
  methods: {
    handleItemListChanged() {
      this.retrieveFeaturedItems()
    },
    async retrieveFeaturedItems() {
      const requestId = ++this.productsRequestId
      this.isProductsLoading = true
      const query = {
        sort: 'a_to_z',
        page: this.page,
        featured: true,
        maxItemsPerPage: this.productsPerPage
      };

      // Sanitize and remove null values
      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key];
        }
      });

      const queryString = new URLSearchParams(query).toString();

      try {
        const response = await this.$axios.$get(`v1/items?${queryString}`)
        if (requestId !== this.productsRequestId || this.isDestroyed) return

        this.products = response.data.items;
        this.totalItems = response.data.total_items;
        this.totalPages = response.data.last_page;
        this.from = response.data.from;
        this.to = response.data.to;
      } finally {
        if (requestId === this.productsRequestId && !this.isDestroyed) {
          this.isProductsLoading = false;
        }
      }
    },
    setPage(page) {
      this.page = page;
      this.retrieveFeaturedItems();
    }
  },
  beforeDestroy() {
    this.isDestroyed = true
    this.productsRequestId += 1
    if (this.$socket) {
      this.$socket.off('item-list-changed', this.handleItemListChanged)
    }
  },
};
</script>
