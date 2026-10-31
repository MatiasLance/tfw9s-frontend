<template>
  <div class="min-h-screen flex flex-col w-full bg-gradient-to-br from-gray-900 to-green-900">
    <BaseHeader
      class="mx-auto w-full gap-4 relative overflow-hidden
      bg-gradient-to-br from-green-900 via-green-700 to-gray-900
      lg:px-8"
    >
      <!-- Animated Rugby Field Background -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-1/4 left-0 w-full h-1 bg-white/30 
                    animate-pulse"></div>
        <div class="absolute top-1/2 left-0 w-full h-1 bg-white/40 
                    animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-3/4 left-0 w-full h-1 bg-white/30 
                    animate-pulse" style="animation-delay: 2s;"></div>
      </div>

      <div
        class="col-span-12 text-center sm:space-y-3 sm:text-left
               lg:col-span-6 xl:mt-10 relative z-10"
        data-aos="fade-right"
      >
        <span class="superheadline flex flex-row items-center text-[1rem]
                    font-normal text-white"
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white" class="hover:scale-105 transition-transform">
                <i class="ri-home-4-line mr-2"></i>Home
              </VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl
                   bg-gradient-to-r from-green-400 to-white bg-clip-text 
                   drop-shadow-lg"
        >
          🏉 Cart
        </h1>
      </div>
    </BaseHeader>

    <div class="flex-1 flex items-center justify-center px-4 py-4">
      <div class="mx-auto max-w-screen-xl w-full">
        <div class="flex flex-col-reverse gap-4 md:flex-row">
          <!-- Main Cart Area -->
          <main class="md:w-3/4">
            <template v-if="!items.length">
              <div class="text-center py-16 bg-gray-800/50 rounded-2xl" data-aos="fade-up">
                <div class="text-6xl mb-6">
                  🏉
                </div>
                <h3 class="text-2xl font-semibold text-white mb-3">
                  Your cart is empty
                </h3>
                <p class="text-green-200 text-lg mb-6">
                  Add some team uniforms to get started
                </p>
                <NuxtLink to="/shop">
                  <button type="button" 
                          class="bg-green-600 hover:bg-green-700 text-white 
                                font-semibold py-3 px-8 rounded-lg text-lg
                                transition-colors">
                    <span class="text-white">
                      Browse Shop
                    </span>
                  </button>
                </NuxtLink>
              </div>
            </template>
            
            <template v-else>
              <CartItem
                v-for="item in items"
                :key="getCartItemKey(item)"
                :uid="item.id"
                :name="item.name"
                :price="getItemPrice(item)"
                :saleprice="item.saleprice"
                :is-on-sale="item.is_on_sale"
                :show-rrp="item.show_rrp"
                :stock="getItemStock(item)"
                :categories="item.categories"
                :quantity="getQuantity(item)"
                :thumbnail="getMediaURL(item.media[0])"
                :size="getItemSize(item)"
                :size-variant-id="getSizeVariantId(item)"
                :color="getItemColor(item)"
                :color-image="item._image"
                :use-image="item._use_image"
                :is-active="item.is_active"
                @change="quantityChanged"
                @remove="removeCartItem"
                data-aos="fade-up"
              />
            </template>
          </main>

          <!-- Order Summary -->
          <aside class="md:w-1/4" data-aos="fade-left">
            <article class="bg-gray-800 rounded-2xl p-6 border border-green-500/30">
              
              <div class="mb-6">
                <h3 class="text-white font-bold text-xl mb-6 text-center">
                  Order Summary
                </h3>
                
                <ul class="space-y-4">
                  <li class="flex justify-between text-white">
                    <span class="text-lg">Sub-Total:</span>
                    <span class="text-lg font-semibold">{{ formatCurrency(subtotal) }}</span>
                  </li>
                  <li class="flex justify-between text-green-300">
                    <span>Tax:</span>
                    <span>{{ formatCurrency(taxAmount) }}</span>
                  </li>
                  <li class="flex justify-between text-gray-300">
                    <span>Shipping:</span>
                    <span class="text-right text-sm">
                      Delivery {{ formatCurrency(shippingRates.delivery) }} ·
                      Pickup {{ formatCurrency(shippingRates.pickup) }}
                    </span>
                  </li>
                  <li class="flex justify-between text-white border-t 
                            border-gray-600 pt-4 text-xl font-bold">
                    <span>Grand Total:</span>
                    <span class="text-green-400">
                      {{ formatCurrency(total) }}
                    </span>
                  </li>
                </ul>
                <p class="mt-3 text-xs text-gray-400">
                  Shipping is calculated at checkout.
                </p>
              </div>

              <!-- Action Buttons -->
              <div class="space-y-4">
                <NuxtLink v-if="cartItems.length > 0" to="/checkout">
                  <button type="button"
                          class="w-full bg-green-600 hover:bg-green-700 
                                text-white font-bold py-4 px-6 rounded-lg
                                text-md transition-colors"
                          :class="cartItems.length > 0 ? 'mb-4' : 'mb-0'">
                    <span class="text-white">Proceed to Checkout</span>
                  </button>
                </NuxtLink>
                
                <NuxtLink to="/shop">
                  <button type="button"
                          class="w-full bg-gray-700 hover:bg-gray-600 
                                text-white font-semibold py-3 px-6 rounded-lg
                                border border-gray-500 transition-colors
                                text-md">
                    <span class="text-white">Continue Shopping</span>
                  </button>
                </NuxtLink>
              </div>
            </article>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import currency from 'currency.js';
import BaseHeader from '../components/base/BaseHeader.vue';
import CartItem from '~/components/CartItem';
import currencyMixin from '~/mixins/currency';
import handlesMedia from '~/mixins/shop/handlesMedia';
import {
  buildCartLineSnapshot,
  cartLineKey,
  mergeCartLine,
} from '~/utils/cartLines';

export default {
  name: 'cart',
  components: {
    BaseHeader,
    CartItem,
  },
  mixins: [currencyMixin, handlesMedia],
  data() {
    return {
      // Fresh product data from the API, keyed by cart line identity. The cart
      // list itself is a computed property derived from Vuex state.
      enrichedProducts: {},
      taxrateValue: 0,
      cartRequestId: 0,
      isDestroyed: false,
    };
  },
  computed: {
    cartItems: {
      get() {
        return this.$store.state.cart.cart;
      },
    },
    /**
     * Render-ready cart lines derived directly from Vuex state. Every line in
     * the store is represented here, whether or not it has a size/colour
     * variant and whether or not the product API responded.
     */
    items() {
      const enriched = this.enrichedProducts || {};

      return (this.cartItems || []).map((cartItem) => {
        const snapshot = buildCartLineSnapshot(cartItem);
        return mergeCartLine(snapshot, enriched[cartLineKey(snapshot)]);
      });
    },
    taxAmount: {
      get() {
        return this.$store.state.cart.taxAmount;
      },
      set(v) {
        this.$store.commit('cart/setTaxAmount', v);
      },
    },
    subtotal: {
      get() {
        return this.$store.state.cart.subtotal;
      },
      set(v) {
        this.$store.commit('cart/setSubtotal', v);
      },
    },
    total: {
      get() {
        return this.$store.state.cart.total;
      },
      set(v) {
        this.$store.commit('cart/setTotal', v);
      },
    },
    toggleControl2: {
      get() {
        return this.$store.state.master.toggleControl2;
      },
      set(val) {
        this.$store.commit('master/setToggleControl2', val);
      },
    },
    shippingRates() {
      return this.$store.state.order.shippingRates || { delivery: 0, pickup: 0 };
    },
  },

  watch: {
    items: {
      handler() {
        this.calculatePriceAggregates();
      },
      deep: true,
      immediate: true,
    },
  },

  async mounted() {
    await this.retrieveTaxValue();
    await this.retrieveToggleTaxControl();
    try {
      await this.$store.dispatch('order/fetchShippingRates');
    } catch (error) {
      console.error('Failed to load shipping rates:', error);
    }
    // The cart renders from Vuex immediately; this only enriches product data.
    await this.getItemData();
    this.$socket.on('item-list-changed', this.handleItemListChanged);
  },

  beforeDestroy() {
    this.isDestroyed = true;
    this.cartRequestId += 1;
    this.cullZeroQuantityItems();
    if (this.$socket) {
      this.$socket.off('item-list-changed', this.handleItemListChanged)
    }
  },

  methods: {
    handleItemListChanged() {
      // The public item endpoint is the source of truth and returns 404 for a
      // hidden/deleted item, regardless of which page an admin was viewing.
      this.getItemData();
    },
    getItemColor(item) {
      // Colour is snapshotted on the cart line when it is added.
      return item._color ?? null;
    },
    getCartItemKey(item) {
      // Identity comes from the line snapshot, never from a store lookup, so
      // variant and non-variant rows always receive distinct keys.
      return cartLineKey(item);
    },
    getQuantity(item) {
      if (item.cartQuantity !== undefined) return item.cartQuantity;
      if (item._quantity !== undefined) return item._quantity;
      return 0;
    },
    getItemSize(item) {
      // Size is snapshotted on the cart line when it is added.
      if (item.size) return item.size;
      if (item._sizeVariantId) {
        const sizeVariant = this.findSizeVariant(item, item._sizeVariantId);
        if (sizeVariant) return sizeVariant.size || sizeVariant.value;
      }
      return null;
    },
    getSizeVariantId(item) {
      return item._sizeVariantId ?? null;
    },
    findSizeVariant(item, sizeVariantId) {
      const sizes = item.availableSizes;
      if (Array.isArray(sizes) && sizes.length > 0) {
        return sizes.find((s) => s.id === parseInt(sizeVariantId));
      }
      return null;
    },
    getItemPrice(item) {
      if (item._sizeVariantId) {
        const sizeVariant = this.findSizeVariant(item, item._sizeVariantId);
        if (sizeVariant?.price) return sizeVariant.price;
      }
      return item.price ?? 0;
    },
    /* eslint-disable camelcase */
    getItemStock(item) {
      if (!item) return 0;
      if (item._sizeVariantId) {
        const sizeVariant = this.findSizeVariant(item, item._sizeVariantId);
        return sizeVariant ? sizeVariant.stock_quantity : item.stock;
      }
      return item.stock;
    },
    async getItemData() {
      const requestId = ++this.cartRequestId;
      const cartSnapshot = [...this.cartItems];
      let removedUnavailableItem = false;

      const fetched = await Promise.all(
        cartSnapshot.map(async (cartItem) => {
          const key = cartLineKey(buildCartLineSnapshot(cartItem));

          try {
            const response = await this.$axios.$get(`/v1/items/${cartItem.id}`);
            const product = response?.data?.item;
            return { key, product: product || null, removed: false };
          } catch (error) {
            console.error(`Failed to fetch product ${cartItem.id}:`, error);

            const status = error.response?.status;
            const payload = error.response?.data;
            // Only treat a 404/409 as "product removed" when the API actually
            // answered. An HTML 404 (misrouted proxy, wrong base URL) must not
            // wipe the cart.
            const isApiResponse =
              payload &&
              typeof payload === 'object' &&
              ('status' in payload || 'message' in payload);

            if ([404, 409].includes(status) && isApiResponse) {
              removedUnavailableItem = true;
              try {
                await this.$store.dispatch('cart/removeItemFromCart', {
                  id: cartItem.id,
                  size_variant_id: cartItem.size_variant_id,
                  color: cartItem.color,
                });
              } catch (removeError) {
                console.error(
                  `Failed to remove unavailable product ${cartItem.id}:`,
                  removeError
                );
              }
              return { key, product: null, removed: true };
            }

            return { key, product: null, removed: false };
          }
        })
      );

      if (requestId !== this.cartRequestId || this.isDestroyed) return;

      fetched.forEach(({ key, product, removed }) => {
        if (product) {
          this.$set(this.enrichedProducts, key, product);
        } else if (removed) {
          this.$delete(this.enrichedProducts, key);
        }
        // Transient failures keep the previous enrichment (or the snapshot).
      });

      // Drop enrichment for lines that are no longer in the cart.
      const activeKeys = new Set(
        (this.cartItems || []).map((cartItem) =>
          cartLineKey(buildCartLineSnapshot(cartItem))
        )
      );
      Object.keys(this.enrichedProducts).forEach((key) => {
        if (!activeKeys.has(key)) this.$delete(this.enrichedProducts, key);
      });

      if (removedUnavailableItem) {
        this.$oruga.notification.open({
          message: 'An unavailable item was removed from your cart.',
          variant: 'warning',
          duration: 5000,
          queue: true,
        });
      }
    },
    quantityChanged(changeData) {
      const { id, quantity, size_variant_id, color } = changeData;
      const lineKey = cartLineKey({ id, size_variant_id, color });
      const cartItem = this.items.find((item) => cartLineKey(item) === lineKey);

      this.$store
        .dispatch('cart/updateCartItemQuantity', {
          id,
          size_variant_id: size_variant_id || null,
          color: color || null,
          quantity,
          stock: this.getItemStock(cartItem),
        })
        .then(() => this.$nextTick(() => this.calculatePriceAggregates()))
        .catch((error) =>
          this.$oruga.notification.open({
            message: error.message,
            variant: 'danger',
            duration: 5000,
          })
        );
    },
    removeCartItem(removeData) {
      const id = removeData.id || removeData;
      const size_variant_id = removeData.size_variant_id || null;
      const color = removeData.color || null;

      // The cart list is computed from Vuex, so removing the store line
      // removes the row automatically.
      this.$store
        .dispatch('cart/removeItemFromCart', { id, size_variant_id, color })
        .then(() => this.$nextTick(() => this.calculatePriceAggregates()))
        .catch((error) =>
          this.$oruga.notification.open({
            message: error.message,
            variant: 'danger',
            duration: 5000,
          })
        );
    },
    calculatePriceAggregates() {
      const itemCostData = this.items.map((item) => {
        const quantity = this.getQuantity(item);
        const price = this.getItemPrice(item);
        const finalPrice = item.is_on_sale && item.saleprice ? item.saleprice : price;
        return { id: item.id, quantity, price: finalPrice };
      });

      const itemBasePrice = itemCostData.reduce((acc, item) => {
        const itemTotal = currency(item.price, { fromCents: false }).multiply(
          item.quantity
        ).value;
        return currency(acc, { fromCents: false }).add(itemTotal).value;
      }, 0);

      const isInclusive = this.toggleControl2;
      const currentTaxRate = this.taxrateValue || this.$store.state.cart.tax || 0;

      let taxAmount, total, subTotal;

      if (isInclusive) {
        subTotal = currency(itemBasePrice, { fromCents: false })
          .divide(1 + currentTaxRate / 100).value;
        taxAmount = currency(itemBasePrice, { fromCents: false })
          .subtract(subTotal).value;
        total = itemBasePrice;
      } else {
        subTotal = itemBasePrice;
        total = currency(itemBasePrice, { fromCents: false })
          .multiply(1 + currentTaxRate / 100).value;
        taxAmount = currency(total, { fromCents: false }).subtract(subTotal).value;
      }

      this.subtotal = subTotal;
      this.total = total;
      this.taxAmount = taxAmount;

      this.$store.commit('cart/setSubtotal', subTotal);
      this.$store.commit('cart/setTotal', total);
      this.$store.commit('cart/setTaxAmount', taxAmount);
    },
    cullZeroQuantityItems() {
      this.$store.dispatch('cart/cullZeroQuantityItems');
    },
    async retrieveToggleTaxControl() {
      try {
        const response = await this.$axios.$get('v1/toggletax/');
        this.toggleControl2 = response.toggleControl2;
        this.$store.commit('master/setToggleControl2', response.toggleControl2);
      } catch (error) {
        console.error('Failed to load tax controls:', error);
      }
    },
    async retrieveTaxValue() {
      try {
        const response = await this.$axios.$get('v1/tax/');
        const taxValue = response.addTaxValue || 0;
        this.taxrateValue = taxValue;
        this.$store.commit('cart/setTax', taxValue);
      } catch (error) {
        console.error('Failed to load tax value:', error);
      }
    },
  },
};
</script>
