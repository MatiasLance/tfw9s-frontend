<template>
  <div>
    <!-- CONTENT -->
    <section class="my-16 w-full pb-28">
      <div class="container max-w-6xl">
        <!-- Categories Slider -->
        <div
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
          <main class="px-4 lg:w-full">
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
import aosMixin from '@/mixins/aos';

export default {
  name: 'shop',
  components: {
    CategorySlider,
    SortSearchTop,
  },
  mixins: [ aosMixin ],
  data() {
    return {
      pageSEO: {
        title: 'Shop - Drum HQ',
        description: ''
      },
      showComponent: false,
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