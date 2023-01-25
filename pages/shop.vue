<template>
  <div>
    <!-- CONTENT -->
    <section class="my-16 w-full pb-28">
      <div class="container max-w-6xl">
        <!-- Categories Slider -->
        <div
          v-if="showComponent"
          class="mx-7"
        >
          <span
            class="mb-5 ml-3 block text-sm uppercase tracking-wider"
          >
            Categories
          </span>
          <CategorySlider
            @change="retrieveItems"
          />
        </div>
        <!-- / Categories Slider -->
        <!-- SORT & FILTER TOP ROW -->
        <div
          v-if="showComponent"
          class="my-7"
        >
          <SortSearchTop
            @change="retrieveItems"
          />
        </div>
        <!-- / FILTER WRAP -->
        <div
          class="-mx-4 flex flex-col
          sm:mx-0 sm:space-x-4 md:flex-row"
        >
          <aside class="max-w-full px-4 md:w-2/5 lg:w-1/4">
            <SearchTop class="mb-8" />
            <div class="my-5 w-full px-4 py-2">
              <h3 class="text-left text-lg text-black">
                Filter by
              </h3>
            </div>
            <div class="my-5">
              <ul class="shadow-box">
                <BaseAccordionFilter
                    v-for="(filter, index) in filters"
                    :key="index"
                    :accordion="filter"
                />
              </ul>
            </div>
          </aside>
          <main class="max-w-full md:w-3/5 lg:w-3/4">
            <ProductSection
              ref="products"
            />
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import CategorySlider from '../components/CategorySlider.vue';
import SortSearchTop from '../components/SortSearchTop.vue';
import BaseAccordionFilter from '../components/base/BaseAccordionFilter.vue';
import aosMixin from '@/mixins/aos';

export default {
  name: 'shop',
  components: {
    CategorySlider,
    SortSearchTop,
    BaseAccordionFilter,
  },
  mixins: [ aosMixin ],
  data() {
    return {
      pageSEO: {
        title: 'Shop - Revamped',
        description: 'Featuring our exclusive Revamped Products. Shop with us here.'
      },
      showComponent: false,
      filters: [
        {
          title: 'Availability',
          options: [
            {
              id: 1,
              name: 'In Stock',
              count: 3
            },
            {
              id: 2,
              name: 'Out of Stock',
              count: 0
            },
          ]
        },
        {
          title: 'Categories',
          options: [
            {
              id: 1,
              name: 'Cherry Hill',
              count: null
            },
            {
              id: 2,
              name: 'Franklin',
              count: null
            },
            {
              id: 3,
              name: 'Sonor',
              count: null
            },
            {
              id: 4,
              name: 'Uncategorised',
              count: null
            },
          ]
        }
      ]
    }
  },
  head() {
    return {
      title: this.pageSEO.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageSEO.description,
        },
      ],
    };
  },
  methods: {
    retrieveItems() {
      this.$refs.products.retrieveProducts()
    },
  },
};
</script>

<style>
.bgImageShop {
  background-image: url('~/assets/images/shop.jpg');
  background-position: 50% -298.006px;
}
</style>