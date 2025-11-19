<template>
  <div
    class="group flex w-full flex-col items-start rounded-2xl 
           bg-gradient-to-br from-gray-800 to-gray-900 
           border-2 border-green-500/20 transition-all 
           duration-300 hover:shadow-2xl hover:border-green-400 
           hover:scale-105"
  >
    <!-- Product Image -->
    <div class="flex w-full items-center justify-center overflow-hidden 
                rounded-t-2xl bg-gradient-to-br from-green-900/30 
                to-gray-800/50 p-6">
      <img
        class="h-64 cursor-pointer object-contain transition-all 
               duration-500 group-hover:scale-110"
        :src="getMediaURL(path)"
        loading="lazy"
        :alt="name"
      />
    </div>

    <!-- Product Content -->
    <div class="flex w-full flex-col items-start space-y-4 p-6">
      
      <!-- Categories -->
      <div class="grid grid-cols-1 gap-2">
        <div
          v-for="category in categories"
          :key="category.id"
          class="flex items-center justify-start"
        >
          <span class="flex items-center gap-2 text-green-400">
            <i class="ri-price-tag-3-line text-sm"></i>
            <span class="text-sm font-medium text-gray-200">
              {{ category.name }}
            </span>
          </span>
        </div>
      </div>

      <!-- Product Name -->
      <h3 class="w-full min-h-[3rem]">
        <span
          class="font-bold text-xl text-gray-100 leading-tight 
                 transition-colors duration-300 line-clamp-2 
                 group-hover:text-green-300"
        >
          {{ name }}
        </span>
      </h3>

      <!-- Price Section -->
      <div class="w-full space-y-3">
        <div class="h-px w-12 bg-gradient-to-r from-green-400 
                    to-transparent"></div>
        
        <!-- Regular Price -->
        <div v-if="!isOnSale" class="flex items-center">
          <span class="text-2xl font-bold text-gray-100">
            {{ formatCurrency(price) }}
          </span>
        </div>

        <!-- Sale Price -->
        <div v-if="isOnSale" class="flex items-center gap-3">
          <span v-if="isRrp" 
                class="text-lg font-medium text-gray-400 line-through">
            {{formatCurrency(price)}}
          </span>
          <span class="text-2xl font-bold text-green-400 
                       bg-gradient-to-r from-green-500/20 to-transparent 
                       px-3 py-1 rounded-lg">
            {{formatCurrency(saleprice)}}
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="w-full space-y-3">
        <button
          type="button"
          @click="viewItem"
          class="w-full rounded-xl bg-gradient-to-r from-green-500 
                 to-green-600 py-3 px-6 text-base font-bold 
                 text-gray-50 shadow-lg transition-all duration-300 
                 transform hover:from-green-600 hover:to-green-700 
                 hover:scale-105 hover:shadow-green-500/50 
                 active:scale-95 flex items-center justify-center gap-2"
        >
          <i class="ri-eye-line text-lg"></i>
          View Product
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import currencyMixin from '~/mixins/currency';
import handlesMediaMixin from '@/mixins/shop/handlesMedia'

const CURRENCY_CODE = 'AUD'

export default {
  mixins: [ currencyMixin, handlesMediaMixin ],
  props: {
    uid: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    saleprice: {
      type: Number,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    path: {
      type: String,
      required: true
    },
    isOnSale: {
      type: [ Boolean, Number ],
      required: true
    },
    isRrp: {
      type: [ Boolean, Number ],
      required: true
    },
    isHideOutOfStock: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return { showOutOfStock: true }
  },
  computed: {
    cartItems: {
      get() {
        return this.$store.state.cart.cart
      },
    },
    cartCount: {
      get() {
        return this.$store.getters['cart/cartCount']
      },
    },
    currencyCode: {
      get() {
        return CURRENCY_CODE
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.isHideOutOfStock) {
        this.showOutOfStock = false
      } else {
        this.showOutOfStock = true
      }
    })
  },
  methods: {
    viewItem() {
      const scrollYValue = window.scrollY
      localStorage.setItem('scrollTop', scrollYValue);
      this.$router.push(`/product/?id=${this.uid}`)
    }
  },
};
</script>

<style scoped>
.break-words {
  word-break: normal;
  overflow-wrap: anywhere;
}
</style>
