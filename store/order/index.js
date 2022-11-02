export const state = () => ({
  deliveryNote: '',
  pickupNote: ''
})

export const mutations = {
  setDeliveryNote(state, delivery) {
    state.deliveryNote = delivery
  },
  setPickupNote(state, pickup) {
    state.pickupNote = pickup
  }
}