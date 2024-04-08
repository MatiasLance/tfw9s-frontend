<template>
  <div
    class="
      group
      flex
      w-full
      flex-col
      items-start
      rounded-lg
      bg-[#212121]
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
          <span class="col-span-1 text-[16px] text-white">
            <i class="ri-price-tag-3-line"></i>
            <span class="font-medium text-white">
              {{ category.name }}
            </span>
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
              font-semibold transition duration-300
              text-white ease-in-out hover:text-[#5EE738]
            "
          >
            {{ name }}
          </span>
        </NuxtLink>
      </h3>
      <span class="w-9 border-t-2 border-white my-4"/>
        <span class="text-[18px] font-medium text-white">
          <span>
            {{ formatCurrency(price) }}
          </span>
        </span>
      <BaseButton
      class="from-40% via-95% to-100%
      w-full rounded-lg
      bg-gradient-to-tr
      from-[#5EE738]
      via-[#3e872a]
      to-[#050505]
      py-4
      px-8
      mb-6"
      @click="addToCart"
      >
      <span class="font-semibold normal-case text-white">
        Add to Cart
      </span>
      </BaseButton>
    </div>
  </div>
</template>

<script>
import currencyMixin from '~/mixins/currency';

const CURRENCY_CODE = 'AUD'

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