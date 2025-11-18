<template>
  <div class="min-h-full bg-gradient-to-br from-gray-900 to-green-900">
    
    <BaseHeader
      class="mx-auto max-w-full gap-4 relative overflow-hidden
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

    <div class="mx-auto max-w-screen-xl gap-4 px-4 py-8">
      <div class="flex flex-col gap-8 md:flex-row">
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
                  Browse Shop
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
                  <span class="text-lg">Subtotal:</span>
                  <span class="text-lg font-semibold">{{ formatCurrency(subtotal) }}</span>
                </li>
                <li class="flex justify-between text-green-300">
                  <span>Tax:</span>
                  <span>{{ formatCurrency(taxAmount) }}</span>
                </li>
                <li class="flex justify-between text-white border-t 
                           border-gray-600 pt-4 text-xl font-bold">
                  <span>Total:</span>
                  <span class="text-green-400">
                    {{ formatCurrency(total) }}
                  </span>
                </li>
              </ul>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-4">
              <NuxtLink v-if="cartItems.length > 0" to="/checkout">
                <button type="button"
                        class="w-full bg-green-600 hover:bg-green-700 
                               text-white font-bold py-4 px-6 rounded-lg
                               text-md transition-colors"
                        :class="cartItems.length > 0 ? 'mb-4' : 'mb-0'">
                  Proceed to Checkout
                </button>
              </NuxtLink>
              
              <NuxtLink to="/shop">
                <button type="button"
                        class="w-full bg-gray-700 hover:bg-gray-600 
                               text-white font-semibold py-3 px-6 rounded-lg
                               border border-gray-500 transition-colors
                               text-md">
                  Continue Shopping
                </button>
              </NuxtLink>
            </div>

            <!-- Help Text -->
            <p class="text-green-300 text-center text-sm mt-6">
              Need help? Contact our team
            </p>
          </article>
        </aside>
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
    // NEW: Generate unique key for cart items with size variants
    getCartItemKey(item) {
      const cartItem = this.getCartItemFromStore(item);
      return cartItem && cartItem.size_variant_id ?
        `${item.id}-${cartItem.size_variant_id}` :
        `${item.id}`;
    },
    
    // NEW: Get the cart item from store with size variant info
    getCartItemFromStore(item) {
      if (!this.cartItems || !this.cartItems.length) return null;
      
      const cartItem = this.cartItems.find(cartItem => {
        if (cartItem.size_variant_id) {
          // For items with size variants, match both ID and size_variant_id
          return cartItem.id === item.id && 
                this.doesItemHaveSizeVariant(item, cartItem.size_variant_id);
        } else {
          // For regular items, just match the ID
          return cartItem.id === item.id && 
                !this.doesItemHaveSizeVariants(item);
        }
      });
      return cartItem || null;
    },
    
    // NEW: Check if item has a specific size variant
    doesItemHaveSizeVariant(item, sizeVariantId) {
      return (item.size_variants && item.size_variants.some(v => v.id === sizeVariantId)) ||
             (item.available_sizes && item.available_sizes.some(s => s.id === sizeVariantId));
    },
    
    // NEW: Check if item has any size variants
    doesItemHaveSizeVariants(item) {
      return (item.size_variants && item.size_variants.length > 0) ||
             (item.available_sizes && item.available_sizes.length > 0);
    },
    
    // UPDATED: Get quantity for item (with size variant support)
    getQuantity(item) {
      const cartItem = this.getCartItemFromStore(item);
      return cartItem ? cartItem.quantity : 0;
    },
    
    // NEW: Get size information for display
    getItemSize(item) {
      const cartItem = this.getCartItemFromStore(item);
      if (cartItem && cartItem.size) {
        return cartItem.size;
      }
      
      // Fallback: try to get size from item data
      if (cartItem && cartItem.size_variant_id) {
        const sizeVariant = this.findSizeVariant(item, cartItem.size_variant_id);
        return sizeVariant ? sizeVariant.size || sizeVariant.value : null;
      }
      
      return null;
    },
    
    // NEW: Get size variant ID
    getSizeVariantId(item) {
      const cartItem = this.getCartItemFromStore(item);
      return cartItem ? cartItem.size_variant_id : null;
    },
    
    // NEW: Find size variant in item data
    findSizeVariant(item, sizeVariantId) {
      if (item.size_variants) {
        return item.size_variants.find(v => v.id === sizeVariantId);
      }
      if (item.available_sizes) {
        return item.available_sizes.find(s => s.id === sizeVariantId);
      }
      return null;
    },
    
    // UPDATED: Get item price (consider size variant pricing)
    getItemPrice(item) {
      const cartItem = this.getCartItemFromStore(item);
      
      if (cartItem && cartItem.size_variant_id) {
        const sizeVariant = this.findSizeVariant(item, cartItem.size_variant_id);
        if (sizeVariant && sizeVariant.price) {
          return sizeVariant.price;
        }
      }
      
      return item.price;
    },
    
    // Handle both item object and { id, size_variant_id } object
    /* eslint-disable camelcase */
    getItemStock(itemOrData) {
      let id, size_variant_id;
      
      if (typeof itemOrData === 'object' && itemOrData.id) {
        id = itemOrData.id;
        size_variant_id = itemOrData.size_variant_id || null;
      } else {
        const cartItem = this.getCartItemFromStore(itemOrData);
        id = cartItem.id;
        size_variant_id = cartItem.size_variant_id || null;
      }
      
      const item = this.items.find(i => i.id === id);
      if (!item) return 0;
      
      if (size_variant_id) {
        const sizeVariant = this.findSizeVariant(item, size_variant_id);
        return sizeVariant ? sizeVariant.stock_quantity : item.stock;
      }
      
      return item.stock;
    },
    
    retrieveToggleTaxControl() {
      const id = 1;
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
      // Get unique product IDs from cart (since same product ID can have multiple size variants)
      const uniqueProductIds = [ ...new Set(this.cartItems.map(item => item.id)) ];
      
      const itemPromises = uniqueProductIds.map((productId) => {
        return this.$axios
          .$get(`/v1/items/${productId}`)
          .then((response) => {
            const item = response.data.item;
            // Get all cart items for this product ID (including different sizes)
            const productCartItems = this.$store.getters[ 'cart/getProductCartItems' ](productId);
            // Store cart item references
            item._cartItems = productCartItems;
            return item;
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
    
    /* eslint-disable camelcase */
    quantityChanged(changeData) {
      // Handle both old format { id, quantity } and new format { id, quantity, size_variant_id }
      const { id, quantity, size_variant_id } = changeData;
      
      this.$store.dispatch('cart/updateCartItemQuantity', {
        id,
        size_variant_id: size_variant_id || null,
        quantity,
        stock: this.getItemStock({ id, size_variant_id })
      }).then(() => {
        this.$nextTick(() => {
          this.calculatePriceAggregates();
        });
      }).catch(error => {
        this.$oruga.notification.open({
          message: error.message,
          variant: 'danger',
          duration: 5000
        });
      });
    },
    
    // Handle both old format (just ID) and new format (object with id and size_variant_id)
    removeCartItem(removeData) {
      const id = removeData.id || removeData;
      const size_variant_id = removeData.size_variant_id || null;
      
      // Remove from store first
      this.$store.dispatch('cart/removeItemFromCart', {
        id,
        size_variant_id
      }).then(() => {
        // After store is updated, find and remove the correct item from this.items
        this.removeItemFromLocalArray(id, size_variant_id);
        
        this.$nextTick(() => {
          this.calculatePriceAggregates();
        });
      }).catch(error => {
        this.$oruga.notification.open({
          message: error.message,
          variant: 'danger',
          duration: 5000
        });
      });
    },

    // Helper method to properly remove item from local items array
    removeItemFromLocalArray(id, size_variant_id) {
      this.items = this.items.filter(item => {
        // If we're dealing with a specific size variant
        if (size_variant_id) {
          // Check if this item has the matching ID AND contains the specific size variant
          if (item.id === id) {
            const hasSizeVariant = this.doesItemHaveSizeVariant(item, size_variant_id);
            // Keep the item only if it doesn't have this specific size variant in cart
            return !hasSizeVariant;
          }
          return true; // Keep items with different IDs
        } else {
          // For regular items without size variants, remove the entire item
          return item.id !== id;
        }
      });
      
      // Additional cleanup: remove items that have no cart entries left
      this.items = this.items.filter(item => {
        const cartItem = this.getCartItemFromStore(item);
        return cartItem !== undefined;
      });
    },
    
    calculatePriceAggregates() {
      const itemCostData = this.items.map((item) => {
        const quantity = this.getQuantity(item)
        const price = this.getItemPrice(item)
        const finalPrice = item.is_on_sale && item.saleprice ? item.saleprice : price;
        
        return {
          id: item.id, 
          quantity, 
          price: finalPrice
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
        .multiply(this.taxrateValue)
        .value;

      this.subtotal = subtotal;

      const total = this.toggleControl1 ? exclusiveValue : subtotal;
      this.total = total;

      this.taxAmount = this.toggleControl2 ?
        inclusiveValue :
        this.total - this.subtotal
      this.$store.commit('cart/setTaxAmount', this.taxAmount);
      this.$store.commit('cart/setTotal', total);
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