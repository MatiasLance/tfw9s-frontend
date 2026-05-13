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

function cartItemKey(id, size_variant_id = null, color = null) {
  const parts = [id]
  if (size_variant_id) parts.push(size_variant_id)
  if (color) parts.push(color)
  return parts.join('-')
}

function getItemKey(item) {
  return cartItemKey(item.id, item.size_variant_id, item.color)
}

export const mutations = {
  addCartItem(state, { id, quantity, shippingOption, size_variant_id, size, variant_sku, color }) {
    const itemKey = cartItemKey(id, size_variant_id, color)

    const index = state.cart.findIndex(item => {
      return getItemKey(item) === itemKey
    })

    if (index >= 0) {
      state.cart[index].quantity += quantity
    } else {
      const cartItem = {
        id,
        quantity,
        ...(size_variant_id && { size_variant_id }),
        ...(size && { size }),
        ...(variant_sku && { variant_sku }),
        ...(color && { color })
      }
      state.cart.push(cartItem)
      state.shippingOptions.push(shippingOption)
    }
  },

  removeCartItem(state, { id, size_variant_id, color }) {
    const itemKey = cartItemKey(id, size_variant_id, color)

    const index = state.cart.findIndex(item => {
      return getItemKey(item) === itemKey
    })

    if (index >= 0) {
      state.cart.splice(index, 1)
      state.shippingOptions.splice(index, 1)
    }
  },

  setCartItemQuantity(state, { id, quantity, size_variant_id, color }) {
    const itemKey = cartItemKey(id, size_variant_id, color)

    const index = state.cart.findIndex(item => {
      return getItemKey(item) === itemKey
    })

    if (index >= 0) {
      state.cart[index].quantity = quantity
    }
  },

  setCartitems(state, cartItems) {
    state.cart = cartItems
  },

  setSubtotal(state, subtotal) { state.subtotal = subtotal },
  setTax(state, tax) { state.tax = tax },
  setTaxAmount(state, taxAmount) { state.taxAmount = taxAmount },
  setShipping(state, shipping) { state.shipping = shipping },
  setGst(state, gst) { state.gst = gst },
  setTotal(state, total) { state.total = total },

  setOwnCountryActive(state, active) { state.own.country.active = active },
  setOwnStateActive(state, active) { state.own.state.active = active },
  setOwnCityActive(state, active) { state.own.city.active = active },
  setOtherCountryActive(state, active) { state.other.country.active = active },
  setOtherStateActive(state, active) { state.other.state.active = active },
  setOtherCityActive(state, active) { state.other.city.active = active },

  setShippingAvailability(state) {
    if (state.shippingOptions.includes(0)) {
      state.shippingAvailability = 0
    } else if (
      state.shippingOptions.includes(2) &&
      (!state.shippingOptions.includes(1) && !state.shippingOptions.includes(0))
    ) {
      state.shippingAvailability = 2
    } else if (
      state.shippingOptions.includes(1) &&
      (!state.shippingOptions.includes(2) && !state.shippingOptions.includes(0))
    ) {
      state.shippingAvailability = 1
    } else if (
      state.shippingOptions.includes(3) &&
      !state.shippingOptions.includes(2) &&
      !state.shippingOptions.includes(1) &&
      !state.shippingOptions.includes(0)
    ) {
      state.shippingAvailability = 3
    } else {
      state.shippingAvailability = 0
    }
  }
}

export const actions = {
  addItemToCart({ state, commit },
    { id, quantity = 1, stock, shippingOption, size_variant_id, size, variant_sku, color }) {
    return new Promise((resolve, reject) => {
      const itemKey = cartItemKey(id, size_variant_id, color)

      let newStockAmount = quantity
      const index = state.cart.findIndex(item => {
        return getItemKey(item) === itemKey
      })

      if (index >= 0) {
        newStockAmount += state.cart[index].quantity
      }

      if (newStockAmount > stock) {
        reject(new Error('Item quantity in cart cannot exceed item stock'))
      } else {
        commit('addCartItem', {
          id,
          quantity,
          shippingOption,
          size_variant_id,
          size,
          variant_sku,
          color
        })
        commit('setShippingAvailability')
        resolve()
      }
    })
  },

  removeItemFromCart({ commit }, { id, size_variant_id = null, color = null }) {
    commit('removeCartItem', { id, size_variant_id, color })
    commit('setShippingAvailability')
  },

  updateCartItemQuantity({ state, commit }, { id, size_variant_id = null, color = null, quantity, stock }) {
    return new Promise((resolve, reject) => {
      const itemKey = cartItemKey(id, size_variant_id, color)

      const index = state.cart.findIndex(item => {
        return getItemKey(item) === itemKey
      })

      if (index >= 0 && quantity > stock) {
        reject(new Error('Item quantity in cart cannot exceed item stock'))
      } else {
        commit('setCartItemQuantity', { id, size_variant_id, color, quantity })
        resolve()
      }
    })
  },

  cullZeroQuantityItems({ state, commit }) {
    const culled = state.cart.filter(x => x.quantity > 0)
    commit('setCartitems', culled)
  },

  clearCart({ commit }) {
    commit('setCartitems', [])
  }
}

export const getters = {
  cartCount(state) {
    return state.cart.reduce((total, item) => total + item.quantity, 0)
  },

  getCartItem: (state) => (id, size_variant_id = null, color = null) => {
    const itemKey = cartItemKey(id, size_variant_id, color)
    return state.cart.find(item => {
      return getItemKey(item) === itemKey
    })
  },

  isItemInCart: (state) => (id, size_variant_id = null, color = null) => {
    const itemKey = cartItemKey(id, size_variant_id, color)
    return state.cart.some(item => {
      return getItemKey(item) === itemKey
    })
  },

  getItemQuantity: (state, getters) => (id, size_variant_id = null, color = null) => {
    const item = getters.getCartItem(id, size_variant_id, color)
    return item ? item.quantity : 0
  },

  getProductCartItems: (state) => (id) => {
    return state.cart.filter(item => item.id === id)
  }
}