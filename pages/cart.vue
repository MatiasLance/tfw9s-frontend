<template>
  <div class="bg-[#1A1A1B] pb-12  min-h-full">
    <BaseHeader
    class="mx-auto max-w-screen-xl gap-4
    bg-gradient-to-r from-brand-green to-brand-black lg:px-8"
    >
      <div
        class="
          col-span-12
          text-center
          sm:space-y-3
          sm:text-left
          lg:col-span-6
          xl:mt-10
        "
      >
        <span
          class="
            superheadline
            flex flex-row
            items-center
            text-[1rem]
            font-normal
            text-white
          "
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white">Home</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl">
          Cart
        </h1>
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
              <li class="mb-1 flex justify-between text-white">
                <span>Subtotal:</span>
                <span class="pl-2">{{ formatCurrency(subtotal) }}</span>
              </li>
              <li class="mb-1 flex justify-between text-white">
                <span>Tax Amount:</span>
                <span>{{ formatCurrency(taxAmount) }}</span>
              </li>
              <li class="mb-1 flex justify-between text-white">
                <span>GST:</span>
                <span
                  v-if="showGST"
                  class="pl-2"
                >{{ formatCurrency(gst) }}</span>
                <span v-if="showGSTIncluded" class="pl-2">GST Inclusive</span>
                <span v-if="showGSTExcluded" class="pl-2">GST Exclusive</span>
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
                    bg-brand-green
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
                  text-brand-green
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
      showGSTExcluded: false,
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
    toggleControl1: {
      get() {
        return (
          this.$store.state.master.toggleControl1
        )
      },
      set(val) {
        this.$store.commit('master/setToggleControl1', val)
      }
    },
    toggleControl2: {
      get() {
        return (
          this.$store.state.master.toggleControl2
        )
      },
      set(val) {
        this.$store.commit('master/setToggleControl2', val)
      }
    },
  },
  mounted() {
    this.retrieveTaxValue()
    this.retrieveToggleTaxControl()
    setTimeout(() => {
      this.getItemData()
    }, 700);
  },
  beforeDestroy() {
    this.cullZeroQuantityItems()
  },
  methods: {
    retrieveToggleTaxControl() {
      const id = 1;
      // todo: check endpoint
      const endpoint = `v1/toogletax/retrieve/${id}`
      this.$axios
        .$get(endpoint)
        .then((response) => {
          this.toggleControl1 = response.me.toggleControl1
          this.toggleControl2 = response.me.toggleControl2
          this.$store.commit('master/setToggleControl1', response.me.toggleControl1)
          this.$store.commit('master/setToggleControl2', response.me.toggleControl2)
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
    },
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
          id: item.id, quantity, price
        };
      });

      const subtotal = itemCostData.reduce((acc, item) => {
        const preTaxSubtotal = currency(item.price, { fromCents: false })
          .multiply(item.quantity)
          .value;
        return currency(acc, { fromCents: false })
          .add(preTaxSubtotal)
          .value;
      }, 0);
      if (this.toggleControl1) {
        this.showGSTExcluded = true;
        this.showGSTIncluded = false;
      }
      if (this.toggleControl2) {
        this.showGSTExcluded = false;
        this.showGSTIncluded = true;
      }
      // gst exclusive
      const exclusiveValue = currency(subtotal, { fromCents: false })
        .multiply(1 + this.taxrateValue)
        .value;
      // gst inclusive
      const inclusiveValue = currency(subtotal, { fromCents: false })
        .divide(1 + this.taxrateValue)
        .value;

      this.subtotal = subtotal;

      const total = this.toggleControl1 ? exclusiveValue : subtotal;
      this.total = total;

      this.taxAmount = this.toggleControl2 ?
        this.total - inclusiveValue :
        this.total - this.subtotal
      this.$store.commit('cart/setTaxAmount', this.taxAmount);
      this.$store.commit('cart/setTotal', total);
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
    async retrieveTaxValue() {
      try {
        const id = 1
        const response = await this.$axios.$get(`v1/tax/${id}`)
        this.addTaxOnCartPrice = response.me.addTaxValue
        this.includeTaxOnCartPrice = response.me.includeTaxValue
        const taxAmount = this.toggleControl1 ?
          this.addTaxOnCartPrice :
          (this.toggleControl2 ? this.includeTaxOnCartPrice : 0);
        this.$store.commit('cart/setTax', taxAmount);
        this.taxrateValue = this.tax / 100
      } catch (err) {
        this.$oruga.notification.open({
          message: err.message,
          duration: 5000,
          variant: 'danger',
          queue: true,
          position: 'bottom'
        })
      }
    }
  },
};
</script>