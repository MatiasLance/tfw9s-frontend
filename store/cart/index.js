export const state = () => ({
  cart: [],
  subtotal: 0,
  gst: 0,
  total: 0,
})

export const mutations = {
  addCartItem(state, { id, quantity }) {
    const index = state.cart.findIndex(item => item.id === id)
    if (index >= 0) {
      state.cart[index].quantity += quantity
    } else {
      state.cart.push({
        id,
        quantity,
      })
    }
  },
  removeCartItem(state, id) {
    const index = state.cart.findIndex(item => item.id === id)
    if (index >= 0) {
      state.cart.splice(index, 1)
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
  setGst(state, gst) {
    state.gst = gst
  },
  setTotal(state, total) {
    state.total = total
  },
}

export const actions = {
  addItemToCart({ state, commit }, { id, quantity = 1, stock }) {
    return new Promise((resolve, reject) => {
      let newStockAmount = quantity
      const index = state.cart.findIndex(item => item.id === id)

      if (index >= 0) {
        newStockAmount += state.cart[index].quantity
      }

      if (newStockAmount > stock) {
        reject(new Error('Item quantity in cart cannot exceed item stock'))
      } else {
        commit('addCartItem', { id, quantity })
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