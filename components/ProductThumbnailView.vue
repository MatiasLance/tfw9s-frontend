<template>
  <div
    class="
      group
      flex
      w-full
      flex-col
      items-start
      border-2
      transition
      duration-200
      hover:shadow-xl
    "
  >
    <div class="flex w-full items-center justify-center overflow-hidden">
      <img
        class="
          cursor-pointer
          object-cover
          transition
          duration-200
          group-hover:scale-125
        "
        :src="path"
        :alt="name"
      />
    </div>

    <div
      class="flex w-full flex-col items-start space-y-1 p-3 lg:space-y-3"
    >
      <div class="grid grid-cols-1">
        <div
          v-for="category in categories"
          :key="category.id"
          class="flex items-center justify-start"
        >
          <span class="flex items-center pr-1 text-[16px]">
            <i class="ri-price-tag-3-line text-[#1a1d18]"></i>
          </span>
          <span
            class="
              break-words
              text-start text-xs
              selection:bg-[#1a1d18] selection:text-white
              hover:text-[#00000080]
            "
          >
            {{ category.name }}
          </span>
        </div>
      </div>
      <h3
        class="
          break-words text-sm
          selection:bg-[#1a1d18]
          selection:text-white md:text-lg
        "
      >
        <NuxtLink :to="'/product/?id=' + uid">
          <span
            class="
              font-montserrat
              whitespace-normal
              font-bold transition duration-200
              hover:text-[#1a1d18]
            "
          >
            {{ name }}
          </span>
        </NuxtLink>
      </h3>
      <div class="mt-2"></div>
      <span class="w-9 border-t-2 border-slate-600"></span>
      <div class="h-7">
        <span class="pt-2 pb-4 text-[18px] font-bold text-gray-900">
          <span>{{ formatCurrency(price) }}</span>
        </span>
      </div>

      <VBtn
        dark
        large
        color="black"
        class="
          relative
          cursor-pointer
          rounded-lg
          py-2
          text-xs
          leading-3 text-white
          transition
          duration-300
          hover:shadow-[#1a1d18]/50
          sm:px-3
          lg:px-7
          lg:py-5
          lg:text-base
        "
        @click="viewItem"
      >
        View item
      </VBtn>

      <span
        class="pl-availability flex flex-col
        items-start justify-start space-x-1 py-3"
      >
        <template v-if="stock > 0">
          <div class="flex space-x-1">
            <i class="ri-check-line text-green-500"></i>
            <span class="mt-1 text-sm font-bold uppercase">
              In Stock
            </span>
          </div>
        </template>
        <template v-else>
          <template v-if="showOutOfStock">
            <div class="ml-1 flex space-x-1">
              <i class="ri-forbid-line text-red-500"></i>
              <span class="mt-1 text-sm font-bold uppercase">
                Out of stock
              </span>
            </div>
          </template>
          <template v-if="hasVariants">
            <div class="flex space-x-1">
              <i class="ri-check-line text-green-500"></i>
              <span class="mt-1 text-sm font-bold uppercase">
                Variants In Stock
              </span>
            </div>
          </template>
        </template>
      </span>
    </div>
  </div>
</template>

<script>
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
    isHideOutOfStock: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      currencyCode: 'AUD',
      showComponent: false,
      showOutOfStock: true
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
  },
  mounted() {
    this.$nextTick(() => {
      if (this.isHideOutOfStock && this.hasVariants) {
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