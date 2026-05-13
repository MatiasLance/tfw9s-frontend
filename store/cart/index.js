export const state = () => ({
  cart: [],
  subtotal: 0,
  tax: 0,
  taxAmount: 0,
  gst: 0,
  total: 0,
  shipping: 0,
  shippingOptions: [],
  shippingAvailability: 0,
  own: {
    country: { active: true },
    state: { active: true },
    city: { active: true }
  },
  other: {
    country: { active: true },
    state: { active: true },
    city: { active: true }
  }
})

/* eslint-disable camelcase */
export const mutations = {
  addCartItem(state, { id, quantity, shippingOption, size_variant_id, size, variant_sku, color }) {
    // Create unique identifier for cart items
    const itemKey = size_variant_id ? `${id}-${size_variant_id}-${color}` : `${id}`;
    
    const index = state.cart.findIndex(item => {
      console.log(item)
      const currentItemKey = item.size_variant_id ?
        `${item.id}-${item.size_variant_id}-${color}` : `${item.id}`;
      return currentItemKey === itemKey;
    });
    
    if (index >= 0) {
      state.cart[index].quantity += quantity;
    } else {
      const cartItem = {
        id,
        quantity,
        ...(size_variant_id && { size_variant_id }),
        ...(size && { size }),
        ...(variant_sku && { variant_sku }),
        ...(color && { color })
      };
      state.cart.push(cartItem);
      state.shippingOptions.push(shippingOption);
    }
  },
  
  removeCartItem(state, { id, size_variant_id }) {
    const itemKey = size_variant_id ? `${id}-${size_variant_id}` : `${id}`;
    
    const index = state.cart.findIndex(item => {
      const currentItemKey = item.size_variant_id ?
        `${item.id}-${item.size_variant_id}` : `${item.id}`;
      return currentItemKey === itemKey;
    });
    
    if (index >= 0) {
      state.cart.splice(index, 1);
      state.shippingOptions.splice(index, 1);
    }
  },
  
  setCartItemQuantity(state, { id, quantity, size_variant_id }) {
    const itemKey = size_variant_id ? `${id}-${size_variant_id}` : `${id}`;
    
    const index = state.cart.findIndex(item => {
      const currentItemKey = item.size_variant_id ?
        `${item.id}-${item.size_variant_id}` : `${item.id}`;
      return currentItemKey === itemKey;
    });
    
    if (index >= 0) {
      state.cart[index].quantity = quantity;
    }
  },
  
  setCartitems(state, cartItems) {
    state.cart = cartItems;
  },
  
  setSubtotal(state, subtotal) {
    state.subtotal = subtotal;
  },
  
  setTax(state, tax) {
    state.tax = tax;
  },
  
  setTaxAmount(state, taxAmount) {
    state.taxAmount = taxAmount;
  },
  
  setShipping(state, shipping) {
    state.shipping = shipping;
  },
  
  setGst(state, gst) {
    state.gst = gst;
  },
  
  setTotal(state, total) {
    state.total = total;
  },
  
  setOwnCountryActive(state, active) {
    state.own.country.active = active;
  },
  
  setOwnStateActive(state, active) {
    state.own.state.active = active;
  },
  
  setOwnCityActive(state, active) {
    state.own.city.active = active;
  },
  
  setOtherCountryActive(state, active) {
    state.other.country.active = active;
  },
  
  setOtherStateActive(state, active) {
    state.other.state.active = active;
  },
  
  setOtherCityActive(state, active) {
    state.other.city.active = active;
  },
  
  setShippingAvailability(state) {
    if (state.shippingOptions.includes(0)) {
      state.shippingAvailability = 0;
    } else if (
      state.shippingOptions.includes(2) &&
      (
        !state.shippingOptions.includes(1) &&
        !state.shippingOptions.includes(0)
      )
    ) {
      state.shippingAvailability = 2;
    } else if (
      state.shippingOptions.includes(1) &&
      (
        !state.shippingOptions.includes(2) &&
        !state.shippingOptions.includes(0)
      )
    ) {
      state.shippingAvailability = 1;
    } else if (
      state.shippingOptions.includes(3) &&
      !state.shippingOptions.includes(2) &&
      !state.shippingOptions.includes(1) &&
      !state.shippingOptions.includes(0)
    ) {
      state.shippingAvailability = 3;
    } else {
      state.shippingAvailability = 0;
    }
  }
}

/* eslint-disable camelcase */
export const actions = {
  addItemToCart({ state, commit },
    { id, quantity = 1, stock, shippingOption, size_variant_id, size, variant_sku, color }) {
      console.log(color)
    return new Promise((resolve, reject) => {
      const itemKey = size_variant_id ? `${id}-${size_variant_id}-${color}` : `${id}`;
      
      let newStockAmount = quantity;
      const index = state.cart.findIndex(item => {
        const currentItemKey = item.size_variant_id ?
          `${item.id}-${item.size_variant_id}-${color}` : `${item.id}`;
        return currentItemKey === itemKey;
      });

      console.log(index)

      if (index >= 0) {
        newStockAmount += state.cart[index].quantity;
      }

      if (newStockAmount > stock) {
        reject(new Error('Item quantity in cart cannot exceed item stock'));
      } else {
        commit('addCartItem', {
          id,
          quantity,
          shippingOption,
          ...(size_variant_id && { size_variant_id }),
          ...(size && { size }),
          ...(variant_sku && { variant_sku }),
          ...(color && { color })
        });
        commit('setShippingAvailability');
        resolve();
      }
    });
  },
  
  removeItemFromCart({ commit }, { id, size_variant_id = null }) {
    commit('removeCartItem', { id, size_variant_id });
    commit('setShippingAvailability');
  },
  
  updateCartItemQuantity({ state, commit }, { id, size_variant_id = null, quantity, stock, color }) {
    return new Promise((resolve, reject) => {
      const itemKey = size_variant_id ? `${id}-${size_variant_id}` : `${id}`;
      
      const index = state.cart.findIndex(item => {
        const currentItemKey = item.size_variant_id ?
          `${item.id}-${item.size_variant_id}` : `${item.id}`;
        return currentItemKey === itemKey;
      });

      if (index >= 0 && quantity > stock) {
        reject(new Error('Item quantity in cart cannot exceed item stock'));
      } else {
        commit('setCartItemQuantity', {
          id,
          size_variant_id,
          quantity,
          color
        });
        resolve();
      }
    });
  },
  
  cullZeroQuantityItems({ state, commit }) {
    const culled = state.cart.filter(x => x.quantity > 0);
    commit('setCartitems', culled);
  },
  
  clearCart({ commit }) {
    commit('setCartitems', []);
  },
}

/* eslint-disable camelcase */
export const getters = {
  cartCount(state) {
    let totalItems = 0;
    state.cart.forEach((x) => {
      totalItems += parseInt(x.quantity);
    });
    return totalItems;
  },
  
  // NEW: Get cart item by ID and optional size variant
  getCartItem: (state) => (id, size_variant_id = null) => {
    const itemKey = size_variant_id ? `${id}-${size_variant_id}` : `${id}`;
    
    return state.cart.find(item => {
      const currentItemKey = item.size_variant_id ?
        `${item.id}-${item.size_variant_id}` : `${item.id}`;
      return currentItemKey === itemKey;
    });
  },
  
  // NEW: Check if specific item variant is in cart
  isItemInCart: (state) => (id, size_variant_id = null) => {
    const itemKey = size_variant_id ? `${id}-${size_variant_id}` : `${id}`;
    
    return state.cart.some(item => {
      const currentItemKey = item.size_variant_id ?
        `${item.id}-${item.size_variant_id}` : `${item.id}`;
      return currentItemKey === itemKey;
    });
  },
  
  // NEW: Get quantity for specific item variant
  getItemQuantity: (state) => (id, size_variant_id = null) => {
    const item = state.getters.getCartItem(id, size_variant_id);
    return item ? item.quantity : 0;
  },
  
  // NEW: Get all cart items for a specific product ID (all sizes)
  getProductCartItems: (state) => (id) => {
    return state.cart.filter(item => item.id === id);
  }
}