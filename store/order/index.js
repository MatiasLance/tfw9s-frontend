export const state = () => ({
  deliveryNote: '',
  pickupNote: '',
  shippingInformation: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    shippingType: '',
    shippingChoiceCalc: '',
    address: '',
    postCode: '',
    remarks: '',
  }
})

export const mutations = {
  setDeliveryNote(state, delivery) {
    state.deliveryNote = delivery
  },
  setPickupNote(state, pickup) {
    state.pickupNote = pickup
  },
  setShippingInformation(state, shippingInformation) {
    state.shippingInformation.firstName = shippingInformation.firstName
    state.shippingInformation.lastName = shippingInformation.lastName
    state.shippingInformation.phoneNumber = shippingInformation.phoneNumber
    state.shippingInformation.email = shippingInformation.email
    state.shippingInformation.shippingType = shippingInformation.shippingType
    state.shippingInformation.shippingChoiceCalc =
    shippingInformation.shippingChoiceCalc
    state.shippingInformation.address = shippingInformation.address
    state.shippingInformation.postCode = shippingInformation.postCode
    state.shippingInformation.remarks = shippingInformation.remarks
  },
}