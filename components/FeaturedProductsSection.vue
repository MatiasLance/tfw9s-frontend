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
                  class="mb-8 rounded-t-lg object-contain"
                  alt=""
                />
                <div class="p-2">
                  <span
                    class="
                      text-brand-dgrey
                      block
                      pb-2
                      text-[18px]
                      font-bold
                      uppercase
                    "
                  >
                    {{ product.brand }}
                  </span>
                  <h2
                    class="
                      text-brand-black
                      pb-2
                      text-base
                      font-normal
                      uppercase
                    "
                  >
                    {{ product.name }}
                  </h2>
                  <span
                    class="
                      text-brand-grey
                      text-[14px]
                      leading-[20px]
                      transition-all
                    "
                  >
                    A{{ formatCurrency(product.price) }}
                  </span>
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
  mixins: [
    currency,
    handlesMedia,
    BasePagination
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
      productsPerPage: 8
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
      return this.products.filter(element => element.is_featured);
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
    this.retrieveFeaturedItems();
    this.page = 1
  },
  methods: {
    retrieveFeaturedItems() {
      const query = {
        sort: 'a_to_z',
        page: this.page,
        maxItemsPerPage: 64
      };

      // Sanitize and remove null values
      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key];
        }
      });

      const queryString = new URLSearchParams(query).toString();

      this.$axios
        .$get(`v1/items?${queryString}`)
        .then((response) => {
          this.products = response.data.items;
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          this.isProductsLoading = false;
        });
    },
    setPage(page) {
      this.page = page;
      this.retrieveFeaturedItems();
    }
  },
};
</script>
