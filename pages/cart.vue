<template>
  <div>
    <BaseHeader class="bg-gradient-to-r from-swd-dgrey to-swd-blue">
      <div
        class="
          col-span-12
          mt-12
          space-y-3
          px-6
          text-center
          sm:space-y-3 sm:text-left
          lg:col-span-6
          xl:mt-10
        "
      >
        <span
          class="
            superheadline
            flex flex-row
            items-center
            pb-3
            text-[1rem]
            font-normal
          "
        >
          <span class="font-medium text-white">
            <NuxtLink to="/">
                <VBtn text color="white">Home</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-6xl font-bold text-white">
          Cart
        </h1>
        <div
          class="pt-4 text-[1.125rem] font-medium leading-6 text-white"
        ></div>
      </div>
    </BaseHeader>
    <div class="container mt-32 py-[30px]">
      <div class="flex flex-col gap-4 md:flex-row">
        <main class="md:w-3/4">

          <template v-if="!items.length > 0">
            <article
              class="mb-5 rounded border border-gray-200 bg-white shadow-sm"
            >
              <div class="p-5">
                No items from cart.
              </div>
            </article>
          </template>
          <template v-else>
            <CartItem
              v-for="item in items"
              :key="item.id"
              :uid="item.id"
              :name="item.name"
              :price="item.price"
              :stock="item.stock"
              :categories="item.categories"
              :quantity="getQuantity(item.id)"
              :thumbnail="getMediaURL(item.media[0])"
              @change="quantityChanged"
              @remove="removeCartItem(item.id)"
            />
          </template>

        </main>
        <aside class="md:w-1/4">
          <article class="mb-5 bg-white p-3 shadow-sm lg:p-5">
            <ul class="mb-5">
              <li class="mb-1 flex justify-between text-gray-600">
                <span>Subtotal (Price before GST added):</span>
                <span class="pl-2">{{ formatCurrency(subtotal) }}</span>
              </li>
              <li class="mb-1 flex justify-between text-gray-600">
                <span>GST:</span>
                <span class="pl-2">{{ formatCurrency(gst) }}</span>
              </li>
              <li
                class="
                  mt-3
                  flex
                  justify-between
                  border-t
                  pt-3
                  text-lg
                  font-bold
                "
              >
                <span>Total price (including GST):</span>
                <span class="pl-2">{{ formatCurrency(total) }}</span>
              </li>
            </ul>

            <span v-if="cartItems.length > 0">
              <NuxtLink to="/checkout">
                <span
                  class="
                    mb-2
                    inline-block
                    w-full
                    select-none
                    border border-transparent
                    bg-swd-green
                    py-3
                    px-4
                    text-center text-lg
                    font-medium
                    text-white
                    hover:bg-green-700
                  "
                >
                  Proceed to checkout
                </span>
              </NuxtLink>
            </span>
            <span v-else>
                <span
                  class="
                    mb-2
                    inline-block
                    w-full
                    select-none
                    border border-transparent
                    bg-green-200
                    py-3
                    px-4
                    text-center text-lg
                    font-medium
                    text-white
                  "
                >
                  Proceed to checkout
                </span>
            </span>

            <NuxtLink to="/shop">
              <span
                class="
                  inline-block
                  w-full
                  border border-gray-200
                  bg-white
                  py-3
                  px-4
                  text-center text-lg
                  font-medium
                  text-swd-green
                  shadow-sm
                  hover:bg-gray-100
                "
              >
                Back to shop
              </span>
            </NuxtLink>
          </article>
          <!-- card end.// -->
        </aside>
        <!-- col.// -->
      </div>
    </div>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import currency from 'currency.js';
import BaseHeader from '../components/base/BaseHeader.vue';
import CartItem from '~/components/CartItem'
import currencyMixin from '~/mixins/currency';
import handlesMedia from '~/mixins/shop/handlesMedia'

export default {
  name: 'cart',
  components: {
    BaseHeader,
    CartItem,
  },
  mixins: [
    currencyMixin,
    handlesMedia
  ],
  data() {
    return { items: [] }
  },
  computed: {
    cartItems: {
      get() {
        return this.$store.state.cart.cart
      },
    },
    subtotal: {
      get() {
        return this.$store.state.cart.subtotal
      },
      set(v) {
        this.$store.commit('cart/setSubtotal', v)
      },
    },
    gst: {
      get() {
        return this.$store.state.cart.gst
      },
      set(v) {
        this.$store.commit('cart/setGst', v)
      },
    },
    total: {
      get() {
        return this.$store.state.cart.total
      },
      set(v) {
        this.$store.commit('cart/setTotal', v)
      },
    },
  },
  mounted() {
    this.getItemData()
  },
  beforeDestroy() {
    this.cullZeroQuantityItems()
  },
  methods: {
    getItemData() {
      const itemPromises = this.cartItems.map((item) => {
        return this.$axios
          .$get(`/v1/items/${item.id}`)
          .then((response) => {
            return response.data.item
          })
      })

      Promise.all(itemPromises)
        .then((values) => {
          this.items = values
        })
        .then(() => {
          this.calculatePriceAggregates()
        })
    },
    getQuantity(id) {
      const index = this.cartItems.findIndex(x => x.id === id)
      return this.cartItems[index].quantity
    },
    quantityChanged({ id, quantity }) {
      this.$store.commit('cart/setCartItemQuantity', {
        id,
        quantity
      })
      this.$nextTick(() => {
        this.calculatePriceAggregates()
      })
    },
    calculatePriceAggregates() {
      const itemCostData = this.items.map((item) => {
        const quantity = this.getQuantity(item.id)
        return {
          id: item.id,
          quantity,
          price: item.price,
        }
      })

      let gst = 0
      let subtotal = 0
      itemCostData.forEach((item) => {
        const gstCut = currency(item.price, { fromCents: false })
          .divide(10)
          .multiply(item.quantity)
          .value

        const preTaxSubtotal = currency(item.price, { fromCents: false })
          .multiply(item.quantity)
          .value

        gst = currency(gst, { fromCents: false })
          .add(gstCut).value
        subtotal = currency(subtotal, { fromCents: false })
          .add(preTaxSubtotal).value
      })
      this.gst = gst
      this.subtotal = subtotal
      this.total = gst + subtotal
    },
    removeCartItem(id) {
      this.$store.commit('cart/removeCartItem', id)

      const index = this.items.findIndex(x => x.id === id)
      this.items.splice(index, 1)

      this.$nextTick(() => {
        this.calculatePriceAggregates()
      })
    },
    cullZeroQuantityItems() {
      this.$store.dispatch('cart/cullZeroQuantityItems')
    }
  },
};
</script>