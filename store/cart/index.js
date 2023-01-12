export const state = () => ({
  cart: [],
  subtotal: 0,
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

export const mutations = {
  addCartItem(state, { id, quantity, shippingOption }) {
    const index = state.cart.findIndex(item => item.id === id)
    if (index >= 0) {
      state.cart[index].quantity += quantity
    } else {
      state.cart.push({
        id,
        quantity,
      })
      state.shippingOptions.push(shippingOption)
    }
  },
  removeCartItem(state, id) {
    const index = state.cart.findIndex(item => item.id === id)
    if (index >= 0) {
      state.cart.splice(index, 1)
      state.shippingOptions.splice(index, 1)

    }
  },
  setCartItemQuantity(state, { id, quantity }) {
    const index = state.cart.findIndex(item => item.id === id)
    if (index >= 0) {
      state.cart[index].quantity = quantity
    }
  },
  setCartitems(state, cartItems) {
    state.cart = cartItems
  },
  setSubtotal(state, subtotal) {
    state.subtotal = subtotal
  },
  setShipping(state, shipping) {
    state.shipping = shipping
  },
  setGst(state, gst) {
    state.gst = gst
  },
  setTotal(state, total) {
    state.total = total
  },
  setOwnCountryActive(state, active) {
    state.own.country.active = active
  },
  setOwnStateActive(state, active) {
    state.own.state.active = active
  },
  setOwnCityActive(state, active) {
    state.own.city.active = active
  },
  setOtherCountryActive(state, active) {
    state.other.country.active = active
  },
  setOtherStateActive(state, active) {
    state.other.state.active = active
  },
  setOtherCityActive(state, active) {
    state.other.city.active = active
  },
  setShippingAvailability(state) {
    if (state.shippingOptions.includes(0)) {
      state.shippingAvailability = 0
    } else if (
      state.shippingOptions.includes(2) &&
      (
        !state.shippingOptions.includes(1) &&
        !state.shippingOptions.includes(0)
      )
    ) {
      state.shippingAvailability = 2
    } else if (
      state.shippingOptions.includes(1) &&
      (
        !state.shippingOptions.includes(2) &&
        !state.shippingOptions.includes(0)
      )
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
    { id, quantity = 1, stock, shippingOption }) {
    return new Promise((resolve, reject) => {
      let newStockAmount = quantity
      const index = state.cart.findIndex(item => item.id === id)

      if (index >= 0) {
        newStockAmount += state.cart[index].quantity
      }

      if (newStockAmount > stock) {
        reject(new Error('Item quantity in cart cannot exceed item stock'))
      } else {
        commit('addCartItem', {
          id,
          quantity,
          shippingOption
        })
        commit('setShippingAvailability')
        resolve()
      }
    })
  },
  removeItemFromCart({ commit }, id) {
    commit('removeCartItem', id)
    commit('setShippingAvailability')
  },
  cullZeroQuantityItems({ state, commit }) {
    const culled = state.cart.filter(x => x.quantity > 0)
    commit('setCartitems', culled)
  },
  clearCart({ commit }) {
    commit('setCartitems', [])
  },
}

export const getters = {
  cartCount(state) {
    let totalItems = 0
    state.cart.forEach((x) => {
      totalItems += parseInt(x.quantity)
    })
    return totalItems
  }
}