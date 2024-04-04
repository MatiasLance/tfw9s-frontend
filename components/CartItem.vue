<template>
  <article class="mb-5 bg-[#212121] p-3 shadow-sm lg:p-5">
    <div class="mb-4 flex flex-wrap gap-5 lg:flex-row">
      <div class="w-full lg:w-2/5 xl:w-2/4">
        <figure class="flex leading-5">
          <div>
            <div
              class="
                flex
                h-[105px]
                w-[105px]
                shrink-0
                overflow-hidden
                border border-gray-200
              "
            >
              <img
                :src="thumbnail"
                :alt="`Image of ${name}`"
              />
            </div>
          </div>
          <figcaption class="ml-3">
            <p>
              <NuxtLink
                :to="'/product/?id=' + uid"
                class="hover:text-[#1a1d18]"
              >
                {{ name }}
              </NuxtLink>
            </p>
            <div class="grid grid-cols-3 gap-4">
              <span
                v-for="category in categories"
                :key="category.id"
                class="mt-1 text-gray-400"
              >
              <i class="ri-price-tag-3-line mr-1 text-[#1a1d18]"></i>
              {{ category.name }}
              </span>
            </div>
          </figcaption>
        </figure>
      </div>
      <div>
        <div class="relative flex w-full flex-row">
          <input
            v-model="editableQuantity"
            type="number"
            min="1"
            :max="stock"
            class="
              form-input
              mt-1
              block
              w-24
              appearance-none
              border border-gray-100
              bg-gray-200
              py-2
              px-3
              font-semibold
              hover:border-gray-400
              focus:border-gray-400 focus:outline-none
            "
            @change="quantityChanged()"
            @keyup="handleHighStockValue"
          />
          <div class="ml-2 leading-5">
            <p class="font-semibold not-italic">
              {{ formatCurrency(totalItemCost) }}
            </p>
            <span v-if="isOnSale" class="text-sm">
              <span class="block">
                <span v-if="showRrp">RRP</span>
                <span class="text-red-400 line-through">
                  {{ formatCurrency(price) }} / item
                </span>
              </span>
              <span class="block">
                <span class="text-brand-green">
                  SALE {{ formatCurrency(finalPrice) }} / item
                </span>
              </span>
            </span>
            <span v-else class="text-gray-400 text-sm">
              {{ formatCurrency(finalPrice) }} / item
            </span>
          </div>
        </div>
      </div>
      <div class="flex-auto">
        <div class="float-right">
          <button
            type="button"
            class="
              flex
              items-center
              justify-center
              rounded-md
              border border-gray-200
              bg-brand-mred
              py-2
              px-4
              text-white
              shadow-sm
              hover:bg-slate-700
            "
            @click="removeItem"
          >
            <i class="ri-close-fill"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- item-cart end// -->
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
      type: Boolean,
      required: true
    },
    showRrp: {
      type: Boolean,
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
  },
  data() {
    return {
      editableQuantity: 1,
      originalPrice: this.price,
      Price: this.isOnSale ? this.saleprice : this.price
    }
  },
  computed: {
    totalItemCost: {
      get() {
        return currency(this.editableQuantity, { fromCents: false })
          .multiply(this.finalPrice)
      },
    },
  },
  mounted() {
    this.editableQuantity = this.quantity
    // if item is on sale, apply saleprice value to price
    this.updatePrices(); // Call the updatePrices function to set initial prices
  },
  methods: {
    updatePrices() {
      this.originalPrice = this.price;
      this.finalPrice = this.isOnSale ? this.saleprice : this.price;
    },
    quantityChanged() {
      this.$emit('change', {
        id: this.uid,
        quantity: parseInt(this.editableQuantity)
      })
    },
    removeItem() {
      this.$emit('remove', this.uid)
    },
    handleHighStockValue() {
      if (this.editableQuantity > this.stock) {
        this.editableQuantity = this.stock
      }

      if (this.editableQuantity <= 0) {
        this.editableQuantity = 0
      }
    }
  },
}
</script>