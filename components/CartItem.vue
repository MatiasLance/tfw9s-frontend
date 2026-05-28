<template>
  <article class="mb-5 bg-gradient-to-br from-gray-800 to-gray-900 p-4 
                  border border-green-500/20 rounded-xl shadow-lg 
                  hover:shadow-green-500/10 transition-all duration-300">
    <div class="mb-4 flex flex-wrap gap-5 lg:flex-row">
      <div class="w-full lg:w-2/5 xl:w-2/4">
        <figure class="flex leading-5">
          <div>
            <div class="flex h-[100px] w-[100px] shrink-0 overflow-hidden
                        rounded-lg border-2 border-green-500/30 
                        hover:border-green-400 transition-colors">
              <img
                :src="thumbnail"
                :alt="`Image of ${name}`"
                class="object-cover hover:scale-105 transition-transform"
              />
            </div>
          </div>
          <figcaption class="ml-3">
            <p>
              <NuxtLink :to="'/product/?id=' + uid">
                <span class="text-white font-semibold transition
                duration-300 ease-in-out hover:text-[#5EE738]">
                  {{ name }}
                </span>
              </NuxtLink>
            </p>
            
            <!-- Enhanced Size Display -->
            <div v-if="size" class="mt-2">
              <span class="inline-flex items-center gap-1 px-3 py-1 
                           rounded-full bg-gradient-to-r from-green-500/30 
                           to-green-600/20 border border-green-500/40 
                           text-green-300 text-sm font-medium">
                <i class="ri-ruler-line text-xs"></i>
                Size: {{ size }}
              </span>
            </div>

            <!-- Color badge -->
            <div v-if="color" class="mt-2">
              <span class="inline-flex items-center gap-1 px-3 py-1 
                          rounded-full bg-gradient-to-r from-green-500/30 
                          to-green-600/20 border border-green-500/40 
                          text-green-300 text-sm font-medium">
                <span class="w-3 h-3 rounded-full border border-green-400"
                      :style="{ backgroundColor: color }"></span>
                Color: {{ color }}
              </span>
            </div>
            
            <div class="grid grid-cols-2 gap-3 mt-3">
              <span
                v-for="category in categories"
                :key="category.id"
                class="text-gray-400 text-sm flex items-center"
              >
                <i class="ri-price-tag-3-line mr-2 text-green-400"></i>
                {{ category.name }}
              </span>
            </div>
          </figcaption>
        </figure>
      </div>
      <div>
        <div class="relative flex w-full flex-row items-center">
          <input
            v-model="editableQuantity"
            type="number"
            min="1"
            :max="stock"
            class="form-input mt-1 block w-20 appearance-none
                   border-2 border-green-500/30 bg-gray-700 py-2 px-3
                   text-lg text-white rounded-lg hover:border-green-400
                   focus:border-green-400 focus:outline-none
                   focus:ring-2 focus:ring-green-500/20 transition-colors"
            @change="quantityChanged()"
            @keyup="handleHighStockValue"
          />
          <div class="ml-3 leading-5">
            <p class="text-white font-bold text-lg not-italic">
              {{ formatCurrency(totalItemCost) }}
            </p>
            <span v-if="!isOnSale" class="text-gray-300 text-sm block mt-1">
              {{ formatCurrency(finalPrice) }} / item
            </span>
            <span v-if="isOnSale" class="text-[#5EE738] text-sm font-medium block mt-1">
              {{ formatCurrency(finalPrice) }} / item
            </span>
            
            <!-- Stock indicator -->
            <div class="mt-2">
              <span class="text-xs text-gray-400">
                <i class="ri-store-2-line mr-1"></i>
                {{ stock }} in stock
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute top-3 right-3">
        <button
          type="button"
          class="rounded-lg p-2 text-gray-400 bg-gray-700/50
                 hover:text-white hover:bg-red-500/20 
                 border border-transparent hover:border-red-500/30
                 transition-all duration-200"
          @click="removeItem"
        >
          <i class="ri-close-line text-xl text-white"></i>
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import currency from 'currency.js'
import currencyMixin from '~/mixins/currency';

export default {
  mixins: [ currencyMixin ],
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
      required: true
    },
    isOnSale: {
      type: [ Boolean, Number ],
      required: true
    },
    stock: {
      type: Number,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: null
    },
    sizeVariantId: {
      type: [ String, Number ],
      default: null
    },
    color: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      editableQuantity: 1,
      originalPrice: this.price,
      finalPrice: this.isOnSale ? this.saleprice : this.price
    }
  },
  computed: {
    totalItemCost: {
      get() {
        return currency(this.editableQuantity, { fromCents: false })
          .multiply(this.finalPrice)
      },
    },
    
    // NEW: Check if this item has a size variant
    hasSizeVariant() {
      return this.size !== null && this.sizeVariantId !== null;
    },
    
    // NEW: Show price difference info for size variants
    showSizePriceDifference() {
      return this.hasSizeVariant && this.finalPrice !== this.originalPrice;
    }
  },
  mounted() {
    this.editableQuantity = this.quantity;
    this.updatePrices();
  },
  methods: {
    updatePrices() {
      this.originalPrice = this.price;
      this.finalPrice = this.isOnSale ? this.saleprice : this.price;
    },
    
    quantityChanged() {
      const changeData = {
        id: this.uid,
        quantity: parseInt(this.editableQuantity),
      };

      if (this.sizeVariantId) {
        changeData.size_variant_id = this.sizeVariantId;
      }
      if (this.color) {
        changeData.color = this.color;
      }

      this.$emit('change', changeData);
    },
    
    removeItem() {
      this.$emit('remove', {
        id: this.uid,
        size_variant_id: this.hasSizeVariant ? this.sizeVariantId : null,
        color: this.color
      });
    },
    
    handleHighStockValue() {
      if (this.editableQuantity > this.stock) {
        this.editableQuantity = this.stock;
      }

      if (this.editableQuantity <= 0) {
        this.editableQuantity = 0;
      }
    }
  },
}
</script>