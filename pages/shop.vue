<template>
  <div class="min-h-full bg-[#1A1A1B] pt-8">
    <!-- CONTENT -->
    <section class="mx-auto max-w-screen-xl gap-4 sm:p-7 sm:py-12">
      <div class="container max-w-6xl">
        <!-- Categories Slider -->
        <div class="mx-7">
          <span class="
          mb-5
          ml-3
          block
          text-sm
          uppercase
          tracking-wider
          text-white"
          >
            Categories
          </span>
          <CategorySlider @change="retrieveItems"/>
        </div>
        <!-- / Categories Slider -->
        <!-- SORT & FILTER TOP ROW -->
        <div class="my-7">
          <SortSearchTop @change="retrieveItems"/>
        </div>
        <!-- / FILTER WRAP -->
        <div class="
        -mx-4
        flex
        flex-col
        sm:mx-0
        sm:space-x-4
        md:flex-row"
        >
          <main class="px-4 lg:w-full">
            <ProductSection ref="products"/>
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
        title: 'Merch - TFW9s',
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
  async mounted() {
    await this.taxList()
    await this.retrieveToggleTaxControl()
  },
  methods: {
    retrieveItems() {
      this.$refs.products.retrieveProducts()
    },

    async taxList() {
      try {
        const response = await this.$axios.$get('v1/tax/');
        this.addTaxOnCartPrice = response.addTaxValue
        if (!this.toggleControl2) {
          this.$store.commit('cart/setTax', 0)
        } else {
          this.$store.commit('cart/setTax', this.addTaxValue)
        }
      } catch (error) {
        console.error(error)
      }
    },

    async retrieveToggleTaxControl() {
      try {
        const response = await this.$axios.$get('v1/toggletax/');
        this.toggleControl2 = response.toggleControl2
        this.$store.commit('master/setToggleControl2', response.toggleControl2)
      } catch (error) {
        console.error(error)
      }
    }
  },
};
</script>
