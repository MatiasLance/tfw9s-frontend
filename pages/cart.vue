<template>
  <div>
    <BaseHeader class="from-brand-dgrey to-brand-black bg-gradient-to-r">
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
              :saleprice="item.saleprice"
              :is-on-sale="item.is_on_sale"
              :show-rrp="item.show_rrp"
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
                <span>Subtotal (Pre-GST amount):</span>
                <span class="pl-2">{{ formatCurrency(subtotal) }}</span>
              </li>
              <li class="mb-1 flex justify-between text-gray-600">
                <span>Tax Amount:</span>
                <span class="pl-2">{{ formatCurrency(taxAmount) }}</span>
              </li>
              <li class="mb-1 flex justify-between text-gray-600">
                <span>GST:</span>
                <span
                  v-if="showGST"
                  class="pl-2"
                >{{ formatCurrency(gst) }}</span>
                <span v-if="showGSTIncluded" class="pl-2">GST Inclusive*</span>
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
                <span>Total price:</span>
                <span class="pl-2">{{ formatCurrency(total) }}</span>
              </li>
              <li v-if="showTaxInfo">
                <small class="text-xs font-light">
                  * Tax of {{ tax }}% is included in the displayed price
                </small>
              </li>
            </ul>

            <span v-if="cartItems.length > 0">
              <NuxtLink to="/checkout">
                <span
                  class="
                    bg-brand-green
                    mb-2
                    inline-block
                    w-full
                    select-none border
                    border-transparent
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
                  text-brand-green
                  inline-block
                  w-full border
                  border-gray-200
                  bg-white
                  py-3
                  px-4 text-center
                  text-lg
                  font-medium
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
    return {
      items: [],
      showGSTIncluded: true,
      showGST: false,
      taxrate: '10%',
      taxrateValue: 0,
      totalPrice: 0,
      addTaxOnCartPrice: 0,
      includeTaxOnCartPrice: 0,
      showTaxInfo: true
    }
  },
  computed: {
    cartItems: {
      get() {
        return this.$store.state.cart.cart
      },
    },
    tax: {
      get() {
        return this.$store.state.cart.tax
      },
      set(v) {
        this.$store.commit('cart/setTax', v)
      }
    },
    taxAmount: {
      get() {
        return this.$store.state.cart.taxAmount
      },
      set(v) {
        this.$store.commit('cart/setTaxAmount', v)
      }
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
    this.retrieveTaxValue()
    setTimeout(() => {
      this.getItemData()
    }, 700);
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
        const price = item.is_on_sale ? item.saleprice : item.price;
        return {
          id: item.id,
          quantity,
          price,
        };
      })

      let subtotal = 0;

      itemCostData.forEach((item) => {
        const preTaxSubtotal = currency(item.price, { fromCents: false })
          .multiply(item.quantity)
          .value;

        subtotal = currency(subtotal, { fromCents: false })
          .add(preTaxSubtotal)
          .value;
      });
      // calculate pre gst amount subtotal
      this.subtotal = currency(subtotal, { fromCents: false })
        .divide(1 + this.taxrateValue)
        .value;
      const total = subtotal
      this.total = total
      this.taxAmount = this.total - this.subtotal
      this.$store.commit('cart/setTaxAmount', this.taxAmount)
      this.$store.commit('cart/setTotal', total)
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
    },
    retrieveTaxValue() {
      const id = 1
      this.$axios
        .$get(`v1/tax/${id}`)
        .then((response) => {
          this.addTaxOnCartPrice = response.me.addTaxValue
          this.includeTaxOnCartPrice = response.me.includeTaxValue
          if (this.includeTaxOnCartPrice > 0) {
            this.$store.commit('cart/setTax', this.includeTaxOnCartPrice) // inclusive
          } else {
            this.$store.commit('cart/setTax', this.addTaxOnCartPrice) // exclusive
          }
          const taxPercent = this.tax
          this.taxrateValue = taxPercent / 100
        })
        .catch((err) => {
          this.$oruga.notification.open({
            message: err.message,
            duration: 5000,
            variant: 'danger',
            queue: true,
            position: 'bottom'
          })
        })
    }
  },
};
</script>