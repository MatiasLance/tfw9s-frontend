<template>
  <article class="mb-5 bg-[#212121] p-3 shadow-sm lg:p-5 relative">
    <div class="mb-4 flex flex-wrap gap-5 lg:flex-row">
      <div class="w-full lg:w-2/5 xl:w-2/4">
        <figure class="flex leading-5">
          <div>
            <div
              class="
                flex
                h-[100px]
                w-[100px]
                shrink-0
                overflow-hidden
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
              <NuxtLink :to="'/product/?id=' + uid">

                <span
                class="text-white transition
                duration-300 ease-in-out hover:text-[#5EE738]"
                >{{ name }}</span>

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
              border-transparent
              bg-[#333131]
              py-2
              px-3
              text-lg text-white
              hover:border-gray-400
              focus:border-gray-400 focus:outline-none
            "
            @change="quantityChanged()"
            @keyup="handleHighStockValue"
          />
          <div class="ml-2 leading-5">
            <p class="text-white font-semibold not-italic">
              {{ formatCurrency(totalItemCost) }}
            </p>
            <span class="text-gray-400 text-sm">
              {{ formatCurrency(price) }} / item
            </span>
          </div>
        </div>
      </div>
      <div class="absolute top-0 right-0">
        <button
          type="button"
          class="
            rounded-md
            px-4
            pt-1
            text-[#999999]
            bg-[#212121]
            hover:text-white
            hover:bg-[#414141]
          "
          @click="removeItem"
        >
          <i class="ri-close-fill text-2xl"></i>
        </button>
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
          .multiply(this.price)
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