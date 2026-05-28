<template>
  <div
    class="group grid grid-cols-1 md:grid-cols-4 w-full 
           rounded-3xl bg-gradient-to-br from-gray-800 
           via-gray-850 to-gray-900 border-2 border-green-500/30 
           shadow-xl transition-all duration-500 ease-out
           hover:shadow-2xl hover:border-green-400 
           backdrop-blur-sm overflow-hidden"
  >
    <!-- Product Image with Clean Overlay -->
    <div class="relative flex w-full items-center justify-center 
                overflow-hidden rounded-t-3xl md:rounded-l-3xl 
                bg-gradient-to-br from-green-900/40 to-gray-900/60 p-8">
      <div class="absolute inset-0 bg-gradient-to-t 
                  from-gray-900 via-transparent to-transparent 
                  opacity-60 z-5"></div>
      <img
        class="h-72 cursor-pointer object-contain relative z-10
               transition-transform duration-500 ease-out
               group-hover:scale-105"
        :src="getMediaURL(path)"
        loading="lazy"
        :alt="name"
      />
      
      <!-- Stock Badge -->
      <div class="absolute top-4 left-4 z-20">
        <div class="rounded-2xl bg-gradient-to-r 
                    from-green-500 to-green-600 px-4 py-2 
                    text-sm font-bold text-gray-50 shadow-lg 
                    border border-green-400/50 transition-transform
                    duration-300 group-hover:scale-105">
          {{ stock }} in Stock
        </div>
      </div>
    </div>

    <!-- Product Content -->
    <div class="md:col-span-3 m-6 flex w-full md:max-w-[49rem] flex-col relative">
      
      <!-- Simplified Corner Accents -->
      <div class="absolute top-0 right-0 w-6 h-6 
                  border-t-2 border-r-2 border-green-400/60 
                  rounded-tr-3xl opacity-0 
                  group-hover:opacity-100 transition-opacity 
                  duration-300 delay-100"></div>
      <div class="absolute bottom-0 left-0 w-6 h-6 
                  border-b-2 border-l-2 border-green-400/60 
                  rounded-bl-3xl opacity-0 
                  group-hover:opacity-100 transition-opacity 
                  duration-300 delay-100"></div>

      <!-- Categories -->
      <div class="mb-4 flex flex-wrap gap-2">
        <div
          v-for="category in categories"
          :key="category.id"
          class="inline-flex items-center gap-2 px-3 py-1 
                 rounded-full bg-green-500/20 border 
                 border-green-500/30 text-green-300 text-sm 
                 transition-all duration-200 hover:bg-green-500/30"
        >
          <i class="ri-price-tag-3-line text-xs"></i>
          <span class="font-medium">
            {{ category.name }}
          </span>
        </div>
      </div>

      <!-- Product Name -->
      <h3 class="mb-4">
        <NuxtLink :to="'/product/?id=' + uid" class="block">
          <span
            class="text-3xl font-bold bg-gradient-to-r 
                   from-green-400 to-gray-100 bg-clip-text 
                   text-transparent leading-tight 
                   transition-all duration-300 
                   group-hover:from-green-300 group-hover:to-gray-50 
                   line-clamp-2"
          >
            {{ name }}
          </span>
        </NuxtLink>
      </h3>

      <!-- Price Section -->
      <div class="mb-6 space-y-3">
        <div class="h-px w-16 bg-gradient-to-r from-green-400 
                    to-transparent transition-all duration-300
                    group-hover:w-24"></div>
        
        <!-- Regular Price -->
        <div v-if="!isOnSale" class="flex items-center">
          <span class="text-2xl font-bold text-gray-100 
                       bg-gradient-to-r from-gray-100 to-gray-200 
                       bg-clip-text">
            {{ formatCurrency(price) }}
          </span>
        </div>

        <!-- Sale Price -->
        <div v-if="isOnSale" class="flex items-center gap-4">
          <span v-if="isRrp" 
                class="text-xl font-medium text-gray-400 line-through">
            {{formatCurrency(price)}}
          </span>
          <span class="text-2xl font-bold text-green-400 
                       bg-gradient-to-r from-green-500/30 to-green-600/30 
                       px-4 py-2 rounded-2xl border border-green-400/50 
                       shadow-lg transition-transform duration-200
                       group-hover:scale-105">
            {{formatCurrency(saleprice)}}
          </span>
        </div>
      </div>

      <!-- Description -->
      <div class="mb-6 flex-1">
        <span
          class="text-gray-300 text-justify line-clamp-3 
                 leading-relaxed transition-colors duration-300 
                 group-hover:text-gray-200"
          v-html="description"
        ></span>
      </div>

      <!-- Variants Section -->
      <div v-if="variants && variants.length > 0" class="mb-6">
        <div class="flex items-center gap-2 mb-3">
          <i class="ri-git-branch-line text-green-400"></i>
          <span class="text-sm font-semibold text-gray-300">
            {{ variants.length }} 
            {{ variants.length === 1 ? 'Variant' : 'Variants' }}
          </span>
        </div>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(variant, index) in expandVariants ? variants : variants.slice(0, 3)"
            :key="index"
            class="inline-flex items-center gap-2 px-3 py-2 
                   rounded-lg bg-gradient-to-r from-green-500/15 
                   to-green-600/15 border border-green-500/40 
                   text-green-300 text-xs font-medium 
                   transition-all duration-200 hover:from-green-500/25 
                   hover:to-green-600/25 hover:border-green-400/60 
                   hover:shadow-md"
          >
            <i class="ri-shapes-line"></i>
            <span class="truncate">{{ variant.name || `Variant ${index + 1}` }}</span>
          </div>
          <button
            v-if="!expandVariants && variants.length > 3"
            type="button"
            @click="expandVariants = true"
            class="inline-flex items-center gap-2 px-3 py-2 
                   rounded-lg bg-gradient-to-r from-green-500/10 
                   to-green-600/10 border border-green-500/30 
                   text-green-400 text-xs font-medium cursor-pointer
                   transition-all duration-200 hover:from-green-500/20
                   hover:to-green-600/20 hover:border-green-400/50
                   hover:text-green-300 hover:shadow-md"
          >
            <span class="text-green-400 hover:text-green-300">+{{ variants.length - 3 }} more</span>
          </button>
          <button
            v-if="expandVariants && variants.length > 3"
            type="button"
            @click="expandVariants = false"
            class="inline-flex items-center gap-2 px-3 py-2 
                   rounded-lg bg-gradient-to-r from-green-500/10 
                   to-green-600/10 border border-green-500/30 
                   text-green-400 text-xs font-medium cursor-pointer
                   transition-all duration-200 hover:from-green-500/20
                   hover:to-green-600/20 hover:border-green-400/50
                   hover:text-green-300 hover:shadow-md"
          >
            <span class="text-green-400 hover:text-green-300"> <i class="ri-arrow-up-s-line"></i> Show Less</span>
          </button>
        </div>
      </div>

      <!-- Action Buttons - Staggered Hover Effects -->
      <div class="mt-auto flex flex-wrap items-center gap-3 
                  bg-gradient-to-r from-gray-800/50 to-transparent 
                  p-4 rounded-2xl border border-gray-700/50
                  transition-all duration-300
                  group-hover:border-gray-600/50">
        
        <!-- Edit Button -->
        <button
          type="button"
          class="flex cursor-pointer items-center gap-2 
                 px-4 py-2 rounded-xl bg-gradient-to-r 
                 from-green-500/20 to-green-600/20 
                 text-green-300 text-sm font-semibold 
                 border border-green-500/30 transition-all 
                 duration-200 hover:from-green-500/30 
                 hover:to-green-600/30 hover:text-green-200 
                 hover:shadow-lg active:scale-95"
          @click="$emit('update', uid, 'edit')"
        >
          <span class="text-gray-400 hover:text-gray-300"><i class="ri-edit-line"></i> Edit</span>
        </button>

        <!-- Duplicate Button -->
        <button
          type="button"
          class="flex cursor-pointer items-center gap-2 
                 px-4 py-2 rounded-xl bg-gradient-to-r 
                 from-blue-500/20 to-blue-600/20 
                 text-blue-300 text-sm font-semibold 
                 border border-blue-500/30 transition-all 
                 duration-200 hover:from-blue-500/30 
                 hover:to-blue-600/30 hover:text-blue-200 
                 hover:shadow-lg active:scale-95"
          @click="$emit('duplicate', uid)"
        >
          <span class="text-gray-400 hover:text-gray-300"><i class="ri-file-copy-line"></i> Duplicate</span>
        </button>

        <!-- Add Variant Button -->
        <button
          type="button"
          class="flex cursor-pointer items-center gap-2 
                 px-4 py-2 rounded-xl bg-gradient-to-r 
                 from-purple-500/20 to-purple-600/20 
                 text-purple-300 text-sm font-semibold 
                 border border-purple-500/30 transition-all 
                 duration-200 hover:from-purple-500/30 
                 hover:to-purple-600/30 hover:text-purple-200 
                 hover:shadow-lg active:scale-95"
          @click="$emit('addvariant', uid, 'variant')"
        >
          <span class="text-gray-400 hover:text-gray-300"><i class="ri-links-line"></i> Add Variant</span>
        </button>

        <!-- Show Variants Button -->
        <button
          type="button"
          :disabled="!variants || variants.length === 0"
          :class="[
            'flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r text-sm font-semibold border transition-all duration-200',
            (!variants || variants.length === 0) 
              ? 'from-gray-500/10 to-gray-600/10 text-gray-400 border-gray-500/20 cursor-not-allowed opacity-50'
              : 'cursor-pointer from-yellow-500/20 to-yellow-600/20 text-yellow-300 border-yellow-500/30 hover:from-yellow-500/30 hover:to-yellow-600/30 hover:text-yellow-200 hover:shadow-lg active:scale-95'
          ]"
          @click="$emit('showvariant', uid)"
        >
          <span class="text-gray-400 hover:text-gray-300"><i class="ri-link"></i> {{ variants.length }} Variant</span>
        </button>

        <!-- Remove Button -->
        <button
          type="button"
          class="flex cursor-pointer items-center gap-2 
                 px-4 py-2 rounded-xl bg-gradient-to-r 
                 from-red-500/20 to-red-600/20 
                 text-red-300 text-sm font-semibold 
                 border border-red-500/30 transition-all 
                 duration-200 hover:from-red-500/30 
                 hover:to-red-600/30 hover:text-red-200 
                 hover:shadow-lg active:scale-95"
          @click="$emit('delete', uid)"
        >
          <span class="text-gray-400 hover:text-gray-300"><i class="ri-delete-bin-5-line"></i> Remove</span>
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
    description: {
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
    isRrp: {
      type: [ Boolean, Number ],
      required: true
    },
    isOnSale: {
      type: [ Boolean, Number ],
      required: true
    },
    isHideOutOfStock: {
      type: [ Boolean, Number ],
      required: true
    },
    variants: {
      type: Array,
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
      showOutOfStock: true,
      expandVariants: false
    }
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
            queue: true,
          });
        })
        .catch(() => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Item quantity in cart cannot exceed item stock',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
    },
    toggleVariants() {
      this.expandVariants = !this.expandVariants
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