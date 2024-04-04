<template>
  <div class="min-h-full bg-[#1A1A1B] pt-8">
    <!-- CONTENT -->
    <section class="mx-auto max-w-screen-xl gap-4 p-7 py-12">
      <div class="container max-w-6xl">
        <!-- Categories Slider -->
        <div
          class="mx-7"
        >
          <span
            class="mb-5 ml-3 block text-sm uppercase tracking-wider text-white"
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
  computed: {
    toggleControl1: {
      get() {
        return (
          this.$store.state.master.toggleControl1
        )
      },
      set(val) {
        this.$store.commit('master/setToggleControl1', val)
      }
    },
    toggleControl2: {
      get() {
        return (
          this.$store.state.master.toggleControl2
        )
      },
      set(val) {
        this.$store.commit('master/setToggleControl2', val)
      }
    },
  },
  mounted() {
    this.retrieveTaxValue()
    this.retrieveToggleTaxControl()
  },
  methods: {
    retrieveItems() {
      this.$refs.products.retrieveProducts()
    },
    retrieveToggleTaxControl() {
      const id = 1;
      // todo: check endpoint
      const endpoint = `v1/toogletax/retrieve/${id}`
      this.$axios
        .$get(endpoint)
        .then((response) => {
          this.toggleControl1 = response.me.toggleControl1
          this.toggleControl2 = response.me.toggleControl2
          this.$store.commit('master/setToggleControl1', response.me.toggleControl1)
          this.$store.commit('master/setToggleControl2', response.me.toggleControl2)
        })
        .catch((err) => {
          this.$oruga.notification.open({
            message: err.message,
            duration: 5000,
            variant: 'danger',
            queue: true,
            position: 'bottom'
          })
        })
    },
    async retrieveTaxValue() {
      try {
        const id = 1
        const response = await this.$axios.$get(`v1/tax/${id}`)
        const taxAmount = this.toggleControl1 ?
          response.me.addTaxValue :
          (this.toggleControl2 ? response.me.includeTaxValue : 0);
        this.$store.commit('cart/setTax', taxAmount);
      } catch (err) {
        this.$oruga.notification.open({
          message: err.message,
          duration: 5000,
          variant: 'danger',
          queue: true,
          position: 'bottom'
        })
      }
    }
  },
};
</script>

<style>
.bgImageShop {
  background-image: url('~/assets/images/shop.jpg');
  background-position: 50% -298.006px;
}
</style>