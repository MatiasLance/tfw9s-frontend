export const state = () => ({
  deliveryNote: '',
  pickupNote: '',
  shippingInformation: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    shipOption: '',
    address: '',
    postCode: '',
    remarks: ''
  },
  paymentMethod: '',
  shippingRates: {
    delivery: 0,
    pickup: 0
  },
  toggleMasterSetting1: true,
  toggleMasterSetting2: true
})

export const mutations = {
  setDeliveryNote(state, delivery) {
    state.deliveryNote = delivery
  },
  setPickupNote(state, pickup) {
    state.pickupNote = pickup
  },
  setShippingRates(state, rates) {
    state.shippingRates = {
      delivery: Number(rates.delivery) || 0,
      pickup: Number(rates.pickup) || 0
    }
  },
  setShippingInformation(state, shippingInformation) {
    state.shippingInformation.firstName = shippingInformation.firstName
    state.shippingInformation.lastName = shippingInformation.lastName
    state.shippingInformation.phoneNumber = shippingInformation.phoneNumber
    state.shippingInformation.email = shippingInformation.email
    state.shippingInformation.shipOption = shippingInformation.shipOption
    state.shippingInformation.address = shippingInformation.address
    state.shippingInformation.postCode = shippingInformation.postCode
    state.shippingInformation.remarks = shippingInformation.remarks
  },
  setPaymentMethod(state, paymentMethod) {
    state.paymentMethod = paymentMethod
  },
  setToggleMasterSetting1(state, settingValue) {
    state.toggleMasterSetting1 = settingValue
  },
  setToggleMasterSetting2(state, settingValue) {
    state.toggleMasterSetting2 = settingValue
  },
}

export const actions = {
  async fetchShippingRates({ commit }) {
    const response = await this.$axios.$get('/v1/orders/shipping-notes')
    const options = response?.data?.options || {}
    const charges = response?.data?.charges || {}
    const toDollars = (cents, fallback) => {
      const value = cents ?? fallback
      return (Number(value) || 0) / 100
    }

    const rates = {
      delivery: toDollars(charges.delivery, options.delivery_charge),
      pickup: toDollars(charges.pickup, options.pickup_charge)
    }

    commit('setShippingRates', rates)

    return rates
  }
}
