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
            v-for="product in filterFeaturedProducts"
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
                  <span
                    class="
                      text-[14px]
                      leading-[20px]
                      text-brand-grey
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
import currency from '~/mixins/currency';

export default {
  name: 'FeaturedProductsSection',
  mixins: [
    currency,
    handlesMedia,
  ],
  data() {
    return {
      headline: 'Featured Products',
      products: [],
      filterFeaturedProducts: []
    };
  },
  mounted() {
    this.retrieveFeaturedItems();
  },
  methods: {
    retrieveFeaturedItems() {
      const query = {
        sort: 'a_to_z',
        maxItemsPerPage: 64,
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
          this.products.forEach(element => {
            if (element.is_featured === true) {
              this.filterFeaturedProducts.push(element)
            }
          });
        })
        .finally(() => {
          this.isProductsLoading = false;
        });
    },
  },
};
</script>