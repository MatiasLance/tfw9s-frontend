export const state = () => ({
  stripeEnabled: false,
  afterpayEnabled: false,
})

export const mutations = {
  setStripeEnabled(state, stripeEnabled) {
    state.stripeEnabled = stripeEnabled
  },
  setAfterpayEnabled(state, afterpayEnabled) {
    state.afterpayEnabled = afterpayEnabled
  }
}