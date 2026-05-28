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
                :color="getItemColor(item)"
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
                  <li class="flex justify-between text-white border-t 
                            border-gray-600 pt-4 text-xl font-bold">
                    <span>Grand Total:</span>
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
  async mounted() {
    await this.retrieveTaxValue()
    await this.retrieveToggleTaxControl()
    await this.getItemData()
  },
  beforeDestroy() {
    this.cullZeroQuantityItems()
  },
  methods: {
    getItemColor(item) {
      const cartItem = this.getCartItemFromStore(item);
      return cartItem ? cartItem.color : null;
    },
    // NEW: Generate unique key for cart items with size variants
    getCartItemKey(item) {
      const cartItem = this.getCartItemFromStore(item);
      const parts = [item.id];
      if (cartItem) {
        if (cartItem.size_variant_id) parts.push(cartItem.size_variant_id);
        if (cartItem.color) parts.push(cartItem.color);
      }
      return parts.join('-');
    },
    
    // UPDATED: Much simpler now that items have cart context
    getCartItemFromStore(item) {
      return this.cartItems.find(cartItem => 
        cartItem.id === item._cartItemId &&
        (cartItem.size_variant_id == item._sizeVariantId || (!cartItem.size_variant_id && !item._sizeVariantId)) &&
        (cartItem.color == item._color || (!cartItem.color && !item._color))
      );
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
    
    // UPDATED: Simplified stock lookup using the enriched item data
    /* eslint-disable camelcase */
    getItemStock(item) {
      // Now item already contains the cart context
      if (!item) return 0;
      
      // If this cart item has a size variant, get that stock
      if (item._sizeVariantId) {
        const sizeVariant = this.findSizeVariant(item, item._sizeVariantId);
        return sizeVariant ? sizeVariant.stock_quantity : item.stock;
      }
      
      // Otherwise return base item stock
      return item.stock;
    },
        
    getItemData() {
      // Process each cart item individually to preserve size variant context
      const itemPromises = this.cartItems.map((cartItem) => {
        return this.$axios
          .$get(`/v1/items/${cartItem.id}`)
          .then((response) => {
            const product = response.data.item;
            
            // Create a enriched item that combines product data WITH cart context
            return {
              // Product data
              ...product,
              // Cart-specific context (CRITICAL)
              _cartItemId: cartItem.id,
              _sizeVariantId: cartItem.size_variant_id,
              _quantity: cartItem.quantity,
              _color: cartItem.color,
              // For direct access in templates
              cartSizeVariantId: cartItem.size_variant_id,
              cartQuantity: cartItem.quantity
            };
          })
          .catch(error => {
            console.error(`Failed to fetch product ${cartItem.id}:`, error);
            return null;
          });
      });

      Promise.all(itemPromises)
        .then((values) => {
          this.items = values.filter(item => item !== null);
        })
        .then(() => {
          this.calculatePriceAggregates();
        });
    },
    
    /* eslint-disable camelcase */
    quantityChanged(changeData) {
      const { id, quantity, size_variant_id, color } = changeData;

      this.$store.dispatch('cart/updateCartItemQuantity', {
        id,
        size_variant_id: size_variant_id || null,
        color: color || null,
        quantity,
        stock: this.getItemStock({ id, size_variant_id, color })
      }).then(() => {
        this.$nextTick(() => this.calculatePriceAggregates());
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
      const color = removeData.color || null;

      this.$store.dispatch('cart/removeItemFromCart', {
        id,
        size_variant_id,
        color
      }).then(() => {
        this.removeItemFromLocalArray(id, size_variant_id, color);
        this.$nextTick(() => this.calculatePriceAggregates());
      }).catch(error => {
        this.$oruga.notification.open({ message: error.message, variant: 'danger', duration: 5000 });
      });
    },

    // Helper method to properly remove item from local items array
    removeItemFromLocalArray(id, size_variant_id, color) {
      this.items = this.items.filter(item => {
        // Match cart entry based on all three identifiers
        const cartItem = this.getCartItemFromStore(item);
        if (!cartItem) return false;

        const sameId = cartItem.id === id;
        const sameSize = (size_variant_id == null && cartItem.size_variant_id == null) ||
                        (cartItem.size_variant_id == size_variant_id);
        const sameColor = (color == null && cartItem.color == null) ||
                          (cartItem.color == color);

        return !(sameId && sameSize && sameColor);
      });
    },
    
    calculatePriceAggregates() {
      const itemCostData = this.items.map((item) => {
        const quantity = this.getQuantity(item);
        const price = this.getItemPrice(item);
        const finalPrice = item.is_on_sale && item.saleprice ? item.saleprice : price;
        
        return {
          id: item.id, 
          quantity, 
          price: finalPrice
        };
      });

      const itemBasePrice = itemCostData.reduce((acc, item) => {
        const itemTotal = currency(item.price, { fromCents: false })
          .multiply(item.quantity)
          .value;
        return currency(acc, { fromCents: false })
          .add(itemTotal)
          .value;
      }, 0);

      const isInclusive = this.toggleControl2;

      const currentTaxRate = this.taxrateValue || this.$store.state.cart.tax || 0;

      let taxAmount = 0;
      let total = 0;
      let subTotal = 0;

      if (isInclusive) {
        // INCLUSIVE MODE: Tax is hidden in product prices
        // Customer sees prices that already include tax
        
        subTotal = currency(itemBasePrice, { fromCents: false })
          .divide(1 + (currentTaxRate / 100))
          .value;
        
        taxAmount = currency(itemBasePrice, { fromCents: false })
          .subtract(subTotal)
          .value;
        
        total = itemBasePrice;
        
      } else {
        // EXCLUSIVE MODE: Tax is added on top of product prices
        // Customer sees prices before tax
        
        subTotal = itemBasePrice;
        
        total = currency(itemBasePrice, { fromCents: false })
          .multiply(1 + (currentTaxRate / 100))
          .value;
        
        taxAmount = currency(total, { fromCents: false })
          .subtract(subTotal)
          .value;
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
    }
  },
};
</script>