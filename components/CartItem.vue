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
            <div v-if="color" class="mt-3">
              <span class="group inline-flex items-center gap-2.5 px-3.5 py-1.5 
                          rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/20 
                          border border-emerald-400/30 backdrop-blur-md
                          shadow-sm shadow-emerald-500/10
                          hover:shadow-md hover:shadow-emerald-500/20 hover:border-emerald-400/50 hover:scale-[1.02]
                          transition-all duration-300 ease-out cursor-default">
                
                <img v-if="colorImage && useImage"
                    :src="colorImage"
                    class="w-5 h-5 rounded-full object-cover ring-2 ring-white/20 shadow-inner"
                    :alt="`${color} visual`" />
                    
                <span v-else
                      class="w-4 h-4 rounded-full ring-2 ring-white/20"
                      :style="{ 
                        backgroundColor: color, 
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.2)' 
                      }"
                      role="img"
                      :aria-label="`Color swatch for ${color}`"></span>

                <span class="flex items-baseline gap-1.5">
                  <span class="text-emerald-200/60 text-[11px] font-semibold uppercase tracking-wider">Color:</span>
                  <span class="text-white text-sm font-bold">{{ color }}</span>
                </span>
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
import currency from 'currency.js';
import currencyMixin from '~/mixins/currency';

export default {
  mixins: [currencyMixin],
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
    isOnSale: {
      type: [Boolean, Number],
      required: true,
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
      default: null,
    },
    sizeVariantId: {
      type: [String, Number],
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    colorImage: {
      type: String,
      default: null,
    },
    useImage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editableQuantity: 1,
      finalPrice: this.isOnSale ? this.saleprice : this.price,
    };
  },
  computed: {
    totalItemCost() {
      return currency(this.editableQuantity, { fromCents: false }).multiply(
        this.finalPrice
      );
    },
    hasSizeVariant() {
      return this.size !== null && this.sizeVariantId !== null;
    },
  },
  mounted() {
    this.editableQuantity = this.quantity;
  },
  methods: {
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
        color: this.color,
      });
    },
    handleHighStockValue() {
      if (this.editableQuantity > this.stock) {
        this.editableQuantity = this.stock;
      }
      if (this.editableQuantity <= 0) {
        this.editableQuantity = 0;
      }
    },
  },
};
</script>