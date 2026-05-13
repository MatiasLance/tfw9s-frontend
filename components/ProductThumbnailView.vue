<template>
  <div
    class="group flex w-full flex-col items-start rounded-2xl 
           bg-gradient-to-br from-gray-50 to-white shadow-lg 
           border-2 border-green-200 transition-all duration-300 
           hover:shadow-2xl hover:border-green-400 hover:scale-105"
  >
    <!-- Product Image -->
    <div class="flex w-full items-center justify-center overflow-hidden 
                rounded-t-2xl bg-gradient-to-br from-green-100 
                to-gray-100 p-4">
      <img
        class="cursor-pointer object-cover transition-all 
               duration-500 group-hover:scale-110 
               group-hover:rotate-1 h-48 w-48"
        :src="getMediaURL(path)"
        :alt="name"
      />
    </div>

    <!-- Product Content -->
    <div class="flex w-full flex-col items-start space-y-3 p-4">
      
      <!-- Categories -->
      <div class="grid grid-cols-1 gap-1">
        <div
          v-for="category in categories"
          :key="category.id"
          class="flex items-center justify-start"
        >
          <span class="flex items-center pr-2 text-green-600">
            <i class="ri-price-tag-3-line text-sm"></i>
          </span>
          <span
            class="text-xs font-medium text-gray-600 
                   transition-colors duration-200 
                   hover:text-green-700"
          >
            {{ category.name }}
          </span>
        </div>
      </div>

      <!-- Product Name -->
      <h3 class="w-full">
        <NuxtLink :to="'/product/?id=' + uid" class="block">
          <span
            class="font-bold text-gray-900 text-lg leading-tight 
                   transition-colors duration-200 
                   hover:text-green-700 line-clamp-2"
          >
            {{ name }}
          </span>
        </NuxtLink>
      </h3>

      <!-- Price Section -->
      <div class="w-full space-y-2">
        <div class="h-px w-12 bg-gradient-to-r from-green-400 
                    to-transparent"></div>
        
        <!-- Regular Price -->
        <div class="flex items-center gap-2">
          <span 
            v-if="isOnSale && isRrp" 
            class="text-xs font-bold text-gray-500 uppercase"
          >
            RRP
          </span>
          <span
            v-if="isOnSale && saleprice && saleprice > 0"
            class="text-lg font-bold text-red-500 line-through"
          >
            {{ formatCurrency(price) }}
          </span>
          <span v-else class="text-xl font-bold text-gray-900">
            {{ formatCurrency(price) }}
          </span>
        </div>

        <!-- Sale Price -->
        <div v-if="isOnSale && saleprice && saleprice > 0 
                   && saleprice < price">
          <span class="text-2xl font-bold text-green-600 
                       bg-gradient-to-r from-green-100 to-transparent 
                       px-2 py-1 rounded-lg">
            SALE {{ formatCurrency(saleprice) }}
          </span>
        </div>
      </div>

      <!-- Action Button -->
      <button
        type="button"
        @click="viewItem"
        class="w-full rounded-xl bg-gradient-to-r from-green-500 
               to-green-600 px-6 py-3 text-sm font-bold text-white 
               shadow-lg transition-all duration-300 transform 
               hover:from-green-600 hover:to-green-700 
               hover:scale-105 hover:shadow-green-500/50 
               active:scale-95 flex items-center justify-center gap-2"
      >
        <i class="ri-eye-line"></i>
        View Product
      </button>

      <!-- Stock Status -->
      <div class="w-full">
        <template v-if="stock > 0">
          <div class="flex items-center gap-2 rounded-lg 
                      bg-green-50 px-3 py-2 border border-green-200">
            <i class="ri-checkbox-circle-line text-green-500"></i>
            <span class="text-sm font-bold text-green-700 uppercase">
              In Stock ✅
            </span>
          </div>
        </template>
        
        <template v-else>
          <template v-if="showOutOfStock">
            <div class="flex items-center gap-2 rounded-lg 
                        bg-red-50 px-3 py-2 border border-red-200">
              <i class="ri-close-circle-line text-red-500"></i>
              <span class="text-sm font-bold text-red-700 uppercase">
                Out of Stock
              </span>
            </div>
          </template>
          
          <template v-if="hasVariants">
            <div class="flex items-center gap-2 rounded-lg 
                        bg-blue-50 px-3 py-2 border border-blue-200">
              <i class="ri-checkbox-circle-line text-blue-500"></i>
              <span class="text-sm font-bold text-blue-700 uppercase">
                Variants Available
              </span>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import currencyMixin from '~/mixins/currency';
import handlesMedia from '~/mixins/shop/handlesMedia'

const CURRENCY_CODE = 'AUD'

export default {
  mixins: [ currencyMixin, handlesMedia ],
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
    stock: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true
    },
    hasVariants: {
      type: Boolean,
      required: true
    },
    isRrp: {
      type: Boolean,
      required: true
    },
    isOnSale: {
      type: Boolean,
      required: true
    },
    isHideOutOfStock: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      rrp: this.price, // Regular Price (RRP)
      salePrice: 100, // Initialize with a default value
      showRRP: true, // remove when backend has showRRP field
      isOnSaleMock: true,
      showComponent: false,
      showOutOfStock: true
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
    },
    addToCart() {
      const scrollYValue = window.scrollY
      localStorage.setItem('scrollTop', scrollYValue);
      this.$store
        .dispatch('cart/addItemToCart', {
          id: this.uid,
          quantity: 1,
          stock: this.stock
        })
        .then(() => {
          this.$oruga.notification.open({
            duration: 2000,
            message: 'Item added to cart',
            position: 'bottom',
            variant: 'success',
            closable: true,
            queue: true,
          });
        })
        .catch(() => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Item quantity in cart cannot exceed item stock',
            position: 'bottom',
            variant: 'danger',
            closable: true,
            queue: true,
          });
        })
    },
  },
};
</script>

<style scoped>
.break-words {
  word-break: normal;
  overflow-wrap: anywhere;
}
</style>