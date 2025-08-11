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