export const state = () => ({
  toggleControl1: false,
  toggleControl2: false,
  addTaxValue: 0,
  includeTaxValue: 0
})

export const mutations = {
  setToggleControl1(state, settingValue) {
    state.toggleControl1 = settingValue
  },
  setToggleControl2(state, settingValue) {
    state.toggleControl2 = settingValue
  },
  setAddTaxValue(state, value) {
    state.addTaxValue = value
  },
  setIncludeTaxValue(state, value) {
    state.includeTaxValue = value
  }
}