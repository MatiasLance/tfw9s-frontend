export const state = () => ({
  registrationInformation: {
    contactFirstName: '',
    contactLastName: '',
    contactPhoneNumber: '',
    contactEmail: '',
    playerFirstName: '',
    playerLastName: '',
    teamName: '',
    dob: '',
    ageGroup: '',
    price: '',
    coachesName: '',
    coachesEmail: '',
    coachesPhoneNumber: '',
    managerName: '',
    managerEmail: '',
    managerPhoneNumber: '',
  },
  paymentMethod: '',
  toggleMasterSetting1: true,
  toggleMasterSetting2: true,
  gst: 0,
  tax: 0,
  taxAmount: 0,
  seriesType: '',
  paymentIntent: ''
})

export const mutations = {
  setRegistrationInformation(state, registrationInformation) {
    state.registrationInformation.contactFirstName =
      registrationInformation.contactFirstName
    state.registrationInformation.contactLastName =
      registrationInformation.contactLastName
    state.registrationInformation.contactPhoneNumber =
      registrationInformation.contactPhoneNumber
    state.registrationInformation.contactEmail =
      registrationInformation.contactEmail
    state.registrationInformation.playerFirstName =
      registrationInformation.playerFirstName
    state.registrationInformation.playerLastName =
      registrationInformation.playerLastName
    state.registrationInformation.teamName =
      registrationInformation.teamName
    state.registrationInformation.dob =
      registrationInformation.dob
    state.registrationInformation.ageGroup =
      registrationInformation.ageGroup
    state.registrationInformation.price =
      registrationInformation.price
    state.registrationInformation.coachesName =
      registrationInformation.coachesName
    state.registrationInformation.coachesEmail =
      registrationInformation.coachesEmail
    state.registrationInformation.coachesPhoneNumber =
      registrationInformation.coachesPhoneNumber
    state.registrationInformation.managerName =
      registrationInformation.managerName
    state.registrationInformation.managerEmail =
      registrationInformation.managerEmail
    state.registrationInformation.managerPhoneNumber =
      registrationInformation.managerPhoneNumber
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
  setTax(state, tax) {
    state.tax = tax
  },
  setTaxAmount(state, taxAmount) {
    state.taxAmount = taxAmount
  },
  setGst(state, gst) {
    state.gst = gst
  },
  setSeriesType(state, seriesType) {
    state.seriesType = seriesType
  },
  setPaymentIntent(state, paymentIntent) {
    state.paymentIntent = paymentIntent
  },
}
