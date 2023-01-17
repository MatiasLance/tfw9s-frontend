<template>
  <form
    class="mb-5 w-full rounded border
    border-gray-200 bg-white p-4 shadow-sm lg:p-6"
    @submit.prevent="submit"
  >
    <h2 class="mb-5 text-xl font-semibold">
      Shipping Information
    </h2>

    <div class="grid gap-x-3 lg:grid-cols-2">
      <div class="mb-4">
        <label class="mb-1 block"> First name* </label>
        <input
          v-model="firstName"
          class="
            w-full
            appearance-none
            border border-gray-200
            bg-gray-100
            py-2
            px-3
            hover:border-gray-400
            focus:border-gray-400 focus:outline-none
          "
          type="text"
          placeholder="First Name"
          required
        />
      </div>

      <div class="mb-4">
        <label class="mb-1 block"> Last name* </label>
        <input
          v-model="lastName"
          class="
            w-full
            appearance-none
            border border-gray-200
            bg-gray-100
            py-2
            px-3
            hover:border-gray-400
            focus:border-gray-400 focus:outline-none
          "
          type="text"
          placeholder="Last Name"
          required
        />
      </div>
    </div>

    <div class="grid gap-x-3 lg:grid-cols-2">
      <div class="mb-4">
        <label class="mb-1 block"> Phone* </label>
        <div class="flex w-full">
          <input
            v-model="phoneCode"
            class="
              w-24
              appearance-none
              border border-gray-200
              bg-gray-100
              py-2
              px-3
              hover:border-gray-400
              focus:border-gray-400 focus:outline-none
            "
            type="text"
            placeholder="Code"
            disabled
          />
          <input
            v-model="phoneDigits"
            class="
              flex-1
              appearance-none
              border border-gray-200
              bg-gray-100
              py-2
              px-3
              hover:border-gray-400
              focus:border-gray-400 focus:outline-none
            "
            type="text"
            placeholder="Phone Number"
            required
          />
        </div>
      </div>

      <div class="mb-4">
        <label class="mb-1 block"> Email* </label>
        <input
          v-model="email"
          class="
            w-full
            appearance-none
            border border-gray-200
            bg-gray-100
            py-2
            px-3
            hover:border-gray-400
            focus:border-gray-400 focus:outline-none
          "
          type="email"
          placeholder="Email"
          required
        />
      </div>
    </div>

    <hr class="my-4" />

    <!-- radio selection -->
    <div class="mb-6 grid gap-3 sm:grid-cols-2">
      <label
        :class="`
          shipping-option
          flex
          cursor-pointer
          border border-gray-200 bg-gray-50
          p-3
          ${isDeliveryAvailableStatic ? '' : 'disabled'}
        `"
      >
        <span>
          <input
            v-model="shippingType"
            value="delivery"
            name="shipping"
            type="radio"
            class="mt-1 h-4 w-4 bg-gray-200
            text-brand-black focus:ring-slate-500"
            :disabled="!isDeliveryAvailableStatic"
          />
        </span>
        <p class="ml-2">
          <span class="">
            Delivery
          </span>
          <small
            class="block text-sm text-gray-400"
            v-html="deliveryNote"
          ></small>
        </p>
      </label>
      <label
        :class="`
          shipping-option
          flex
          cursor-pointer
          border border-gray-200
          bg-gray-50
          p-3
          ${isPickupAvailableStatic ? '' : 'disabled'}
        `"
      >
        <span>
          <input
            v-model="shippingType"
            value="pickup"
            name="shipping"
            type="radio"
            class="mt-1 h-4 w-4 bg-gray-200
            text-brand-black focus:ring-slate-500"
            :disabled="!isPickupAvailableStatic"
          />
        </span>
        <p class="ml-2">
          <span>Self pick-up</span>
          <small
            class="block text-sm text-gray-400"
            v-html="pickupNote"
          ></small>
        </p>
      </label>
    </div>
    <!-- radio selection .//end -->

    <div class="grid gap-x-3 md:grid-cols-3">
      <div class="my-4 md:col-span-3">
        <div class="grid w-full grid-cols-2 gap-2">
            <label
              class="
                shipping-option
                  flex
                  w-full
                  cursor-pointer border
                  border-gray-200
                  p-3
                  hover:border-brand-grey
                  hover:bg-blue-50
              "
              :class="
                isOwnCountryActive ?
                'bg-transparent' : 'disabled bg-gray-50'"
              >
              <span>
                  <input
                  v-model="shippingChoiceCalc"
                  value="Own Country"
                  type="radio"
                  class="
                  mt-1 h-4 w-4 bg-gray-200
                  text-brand-black focus:ring-slate-500"
                  :disabled="!isOwnCountryActive"
                  />
              </span>
                <span>Sending to {{ ownCountry }}</span>
              </label>
              <label
              class="
                shipping-option
                  flex
                  w-full
                  cursor-pointer border
                  border-gray-200
                  p-3
                  hover:border-brand-grey
                  hover:bg-blue-50
              "
              :class="
                isOtherCountryActive ?
                'bg-transparent' : 'disabled bg-gray-50'"
              >
              <span>
                  <input
                  v-model="shippingChoiceCalc"
                  value="Other Country"
                  type="radio"
                  class="
                mt-1 h-4 w-4 bg-gray-200
                text-brand-black focus:ring-slate-500"
                :disabled="!isOtherCountryActive"
                  />
              </span>
                <span>Sending to other Country</span>
              </label>
        </div>
        <div
          class="grid w-full grid-cols-2 gap-2"
        >
              <label
              class="
                shipping-option
                  flex
                  w-full
                  cursor-pointer border
                  border-gray-200
                  p-3
                  hover:border-brand-grey
                  hover:bg-blue-50
              "
              :class="
                isOwnStateActive ?
                'bg-transparent' : 'disabled bg-gray-50'"
              >
              <span>
                  <input
                  v-model="shippingChoiceCalc"
                  value="Own State"
                  name="shippingChoiceState"
                  type="radio"
                  class="
                mt-1 h-4 w-4 bg-gray-200
                text-brand-black focus:ring-slate-500"
                :disabled="!isOwnStateActive"
                  />
              </span>
                <span>Sending to {{ ownState }}</span>
            </label>
            <label
              class="
                shipping-option
                  flex
                  w-full
                  cursor-pointer border
                  border-gray-200
                  p-3
                  hover:border-brand-grey
                  hover:bg-blue-50
              "
              :class="
                isOtherStateActive ?
                'bg-transparent' : 'disabled bg-gray-50'"
              >
              <span>
                  <input
                  v-model="shippingChoiceCalc"
                  value="Other State"
                  name="shippingChoiceState"
                  type="radio"
                  class="
                mt-1 h-4 w-4 bg-gray-200
                text-brand-black focus:ring-slate-500"
                :disabled="!isOtherStateActive"
                  />
              </span>
                <span>Sending to other State</span>
              </label>
        </div>
        <div
          class="grid w-full grid-cols-2 gap-2"
        >
              <label
              class="
                shipping-option
                  flex
                  w-full
                  cursor-pointer border
                  border-gray-200
                  p-3
                  hover:border-brand-grey
                  hover:bg-blue-50
              "
              :class="
                isOwnCityActive ?
                'bg-transparent' : 'disabled bg-gray-50'"
              >
              <span>
                  <input
                  v-model="shippingChoiceCalc"
                  value="Own City"
                  name="shippingChoiceCity"
                  type="radio"
                  class="
                mt-1 h-4 w-4 bg-gray-200
                text-brand-black focus:ring-slate-500"
                :disabled="!isOwnCityActive"
                  />
              </span>
                <span>Sending to {{ ownCity }}</span>
              </label>
              <label
              class="
                  shipping-option
                  flex
                  w-full
                  cursor-pointer border
                  border-gray-200
                  p-3
                  hover:border-brand-grey
                  hover:bg-blue-50
              "
              :class="
                isOtherCityActive ?
                'bg-transparent' : 'disabled bg-gray-50'
              "
              >
              <span>
                  <input
                  v-model="shippingChoiceCalc"
                  value="Other City"
                  name="shippingChoiceCity"
                  type="radio"
                  class="
                mt-1 h-4 w-4 bg-gray-200
                text-brand-black focus:ring-slate-500"
                :disabled="!isOtherCityActive"
                  />
              </span>
                <span>Sending to other City</span>
              </label>
        </div>
      </div>
    </div>
     <!-- Adding shipping delivery choices insurance, registered, express -->
     <ShippingChoicesValue
       :shipping="shippingChoiceCalc"
       @change="setShippingOptions"
     />
            <!-- End of adding shipping delivery choices -->

    <div class="grid gap-x-3 md:grid-cols-3">
      <div class="mb-4 md:col-span-2">
        <label class="mb-1 block">
          Address<span v-show="shippingType === 'delivery'">*</span>
        </label>
        <input
          v-model="address"
          class="
            w-full
            appearance-none
            border border-gray-200
            bg-gray-100
            py-2
            px-3
            hover:border-gray-400
            focus:border-gray-400 focus:outline-none
          "
          type="text"
          placeholder="Address"
          :required="shippingType === 'delivery'"
        />
      </div>
      <div class="mb-4 md:col-span-1">
        <label class="mb-1 block">
          Postcode<span v-show="shippingType === 'delivery'">*</span>
        </label>
        <input
          v-model="postCode"
          class="
            w-full
            appearance-none
            border border-gray-200
            bg-gray-100
            py-2
            px-3
            hover:border-gray-400
            focus:border-gray-400 focus:outline-none
          "
          type="text"
          placeholder="Post Code"
          :required="shippingType === 'delivery'"
        />
      </div>
    </div>

    <div class="mb-4">
      <label class="mb-1 block"> Other info </label>
      <textarea
        v-model="remarks"
        placeholder="Comments"
        class="
          w-full
          appearance-none
          border border-gray-200
          bg-gray-100
          py-2
          px-3
          hover:border-gray-400
          focus:border-gray-400 focus:outline-none
        "
      ></textarea>
    </div>

    <div class="flex w-full flex-wrap items-center justify-between gap-x-2">

      <label class="my-4 mr-0 flex w-max items-center sm:mr-4 md:mr-8">
        <input
          v-model="hasAgreedToTerms"
          type="checkbox"
          class="
            mr-2
            h-4
            w-4
            cursor-pointer
            rounded-full
            border-[3px] border-gray-300
            bg-gray-400
            text-brand-black
            hover:border-gray-700
            focus:border-transparent
            focus:bg-gray-200
            focus:ring-1
            focus:ring-gray-500
            focus:ring-offset-2
          "
          required
        />
        <span class="mt-1 inline-block cursor-pointer text-gray-500">
          I agree with
          <a
            class="decoration-none hover:text-brand-black hover:underline"
            href="#"
            @click="showTermsModal = true"
          >
            Terms and Conditions
          </a>
        </span>
      </label>

      <button
        type="submit"
        class="w-24 cursor-pointer bg-brand-black py-2 text-white"
        :disabled="isLoading"
      >
        <span v-if="!isLoading">
          Confirm
        </span>
        <span v-if="isLoading">
          <VProgressCircular
            size="20"
            width="2"
            indeterminate
            color="white"
          />
        </span>
      </button>
    </div>

    <Modal :show="showTermsModal" @close="showTermsModal = false">
      <template #header>
        <h3>
          Terms and Conditions
        </h3>
      </template>
      <template #body>
        <TermsSection />
      </template>
    </Modal>
  </form>
</template>

<script>
import Modal from '~/components/Modal';
import TermsSection from '~/components/TermsSection';
import ShippingChoicesValue from '~/components/ShippingChoicesValue.vue';

export default {
  components: {
    Modal,
    TermsSection,
    ShippingChoicesValue
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      phoneCode: '+61',
      phoneDigits: '',
      totalShippingCost: 0,
      shippingChoiceCalc: null,
      shippingChoiceCountry: '',
      isPickupAvailableStatic: true,
      isDeliveryAvailableStatic: true,
      shippingChoiceState: '',
      shippingChoiceCity: '',
      otherCountryShippingValues: {
        registeredValue: 0,
        expressValue: 0,
        insuranceValue: 0
      },
      otherStateShippingValues: {
        registeredValue: 0,
        expressValue: 0,
        insuranceValue: 0
      },
      otherCityShippingValues: {
        registeredValue: 0,
        expressValue: 0,
        insuranceValue: 0
      },
      ownCountry: '',
      ownCountryDeliveryChoice: null,
      ownCountryShippingValues: {
        registeredValue: 0,
        expressValue: 0,
        insuranceValue: 0,
      },
      showStateLayer: false,
      ownState: '',
      ownStateShippingValues: {
        registeredValue: 0,
        expressValue: 0,
        insuranceValue: 0,
      },
      showCityLayer: false,
      ownCity: '',
      ownCityShippingValues: {
        registeredValue: 0,
        expressValue: 0,
        insuranceValue: 0,
      },
      shippingOptions: [],
      email: '',
      hasAgreedToTerms: false,
      shippingType: 'null',
      RegisteredPost: '',
      ExpressPost: '',
      AddInsurance: '',
      address: '',
      postCode: '',
      remarks: '',
      showTermsModal: false,
      deliveryNote: '',
      pickupNote: '',
    }
  },
  computed: {
    phoneNumber: {
      get() {
        return `${this.phoneCode}${this.phoneDigits}`
      },
    },
    shippingAvailability: {
      get() {
        return this.$store.state.cart.shippingAvailability
      },
    },
    isDeliveryAvailable: {
      get() {
        return (
          this.shippingAvailability === 3 ||
          this.shippingAvailability === 1
        )
      },
    },
    isOwnCountryActive: {
      get() {
        return (
          this.$store.state.cart.own.country.active
        )
      }
    },
    isOwnStateActive: {
      get() {
        return (
          this.$store.state.cart.own.state.active
        )
      }
    },
    isOwnCityActive: {
      get() {
        return (
          this.$store.state.cart.own.city.active
        )
      }
    },
    isOtherCountryActive: {
      get() {
        return (
          this.$store.state.cart.other.country.active
        )
      }
    },
    isOtherStateActive: {
      get() {
        return (
          this.$store.state.cart.other.country.active
        )
      }
    },
    isOtherCityActive: {
      get() {
        return (
          this.$store.state.cart.other.country.active
        )
      }
    },
    isPickupAvailable: {
      get() {
        return (
          this.shippingAvailability === 3 ||
          this.shippingAvailability === 2
        )
      },
    },
  },
  mounted() {
    this.retrieveShippingNotes();
    this.retrieveShippingInfo();
    this.retrieveShippingSetting();

    if (this.shippingAvailability === 3) {
      this.shippingType = 'delivery'
    } else if (this.shippingAvailability === 2) {
      this.shippingType = 'pickup'
    } else if (this.shippingAvailability === 1) {
      this.shippingType = 'delivery'
    } else {
      this.shippingType = null
    }
  },
  methods: {
    retrieveShippingInfo() {
      this.firstName = this.$store.state.order.shippingInformation.firstName
      this.lastName = this.$store.state.order.shippingInformation.lastName
      this.phoneDigits =
        this.$store.state.order.shippingInformation.phoneNumber.slice(3)
      this.email = this.$store.state.order.shippingInformation.email
      this.shippingType =
        this.$store.state.order.shippingInformation.shippingType
      this.shippingChoiceCalc =
        this.$store.state.order.shippingInformation.shippingChoiceCalc
      this.shippingOptions =
        this.$store.state.order.shippingInformation.shippingOptions
      this.address = this.$store.state.order.shippingInformation.address
      this.postCode = this.$store.state.order.shippingInformation.postCode
      this.remarks = this.$store.state.order.shippingInformation.remarks
    },
    setShippingOptions(options) {
      this.shippingOptions = options
    },
    retrieveShipping() {
      this.$axios
        .$get('v1/shipping/country/')
        .then((response) => {
          this.shippingSettingsList = response.list.data
        })
        .catch((err) => {
          console.log(err)
          this.$oruga.notification.open({
            message: err.message,
            variant: 'danger',
            duration: 3000,
            position: 'bottom',
            queue: true
          })
        })
      this.$axios
        .$get('v1/shipping/state/')
        .then((response) => {
          this.shippingSettingsList2 = response.list.data
        })
        .catch((err) => {
          console.log(err)
          this.$oruga.notification.open({
            message: err.message,
            variant: 'danger',
            duration: 3000,
            position: 'bottom',
            queue: true
          })
        })
      this.$axios
        .$get('v1/shipping/city/')
        .then((response) => {
          this.shippingSettingsList3 = response.list.data
        })
        .catch((err) => {
          console.log(err)
          this.$oruga.notification.open({
            message: err.message,
            variant: 'danger',
            duration: 3000,
            position: 'bottom',
            queue: true
          })
        })
      this.$axios
        .$get('v1/shipping/othercountry/')
        .then((response) => {
          this.shippingSettingsList4 = response.list.data
        })
        .catch((err) => {
          console.log(err)
          this.$oruga.notification.open({
            message: err.message,
            variant: 'danger',
            duration: 3000,
            position: 'bottom',
            queue: true
          })
        })
      this.$axios
        .$get('v1/shipping/otherstate/')
        .then((response) => {
          this.shippingSettingsList5 = response.list.data
        })
        .catch((err) => {
          console.log(err)
          this.$oruga.notification.open({
            message: err.message,
            variant: 'danger',
            duration: 3000,
            position: 'bottom',
            queue: true
          })
        })
      this.$axios
        .$get('v1/shipping/othercity/')
        .then((response) => {
          this.shippingSettingsList6 = response.list.data
        })
        .catch((err) => {
          console.log(err)
          this.$oruga.notification.open({
            message: err.message,
            variant: 'danger',
            duration: 3000,
            position: 'bottom',
            queue: true
          })
        })
    },
    triggerFunc2() {
      this.hideCityFunc()
      this.shippingChoiceCity = ''
    },
    triggerFunc1() {
      this.hideStateFunc()
      this.hideCityFunc()
      this.shippingChoiceState = ''
      this.shippingChoiceCity = ''
    },
    showStateFunc() {
      this.showStateLayer = true
    },
    hideStateFunc() {
      this.showStateLayer = false
    },
    showCityFunc() {
      this.showCityLayer = true
    },
    hideCityFunc() {
      this.showCityLayer = false
    },
    submit() {
      if (this.additionalValidation()) {
        this.$emit('submit', {
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          email: this.email,
          shippingType: this.shippingType,
          shippingChoiceCalc: this.shippingChoiceCalc,
          shippingOptions: this.shippingOptions,
          RegisteredPost: this.RegisteredPost,
          ExpressPost: this.ExpressPost,
          AddInsurance: this.AddInsurance,
          address: this.address,
          postCode: this.postCode,
          remarks: this.remarks,
        })
      } else {
        this.$oruga.notification.open({
          message: 'You need to pick a shipping type to continue',
          variant: 'error',
          duration: 5000,
          position: 'bottom',
          queue: true
        })
      }

      return false
    },
    additionalValidation() {
      return this.shippingType && this.shippingType !== null
    },
    retrieveShippingSetting() {
      this.$axios
        .$get('/v1/shipping/country/latest')
        .then((response) => {
          this.ownCountry = response.data.data[0].country
          this.ownState = response.data.data[1].state
          this.ownCity = response.data.data[2].city

          this.ownCountryShippingValues.registeredValue =
            response.data.data[0].registered_value
          this.ownCountryShippingValues.expressValue =
            response.data.data[0].express_value
          this.ownCountryShippingValues.insuranceValue =
            response.data.data[0].insurance_value

          this.ownStateShippingValues.registeredValue =
            response.data.data[1].registered_value
          this.ownStateShippingValues.expressValue =
            response.data.data[1].express_value
          this.ownStateShippingValues.insuranceValue =
            response.data.data[1].insurance_value

          this.ownCityShippingValues.registeredValue =
            response.data.data[2].registered_value
          this.ownCityShippingValues.expressValue =
            response.data.data[2].express_value
          this.ownCityShippingValues.insuranceValue =
            response.data.data[2].insurance_value

          this.otherCountryShippingValues.registeredValue =
            response.data.data[3].registered_value
          this.otherCountryShippingValues.expressValue =
            response.data.data[3].express_value
          this.otherCountryShippingValues.insuranceValue =
            response.data.data[3].insurance_value

          this.otherStateShippingValues.registeredValue =
            response.data.data[4].registered_value
          this.otherStateShippingValues.expressValue =
            response.data.data[4].express_value
          this.otherStateShippingValues.insuranceValue =
            response.data.data[4].insurance_value

          this.otherCityShippingValues.registeredValue =
            response.data.data[5].registered_value
          this.otherCityShippingValues.expressValue =
            response.data.data[5].express_value
          this.otherCityShippingValues.insuranceValue =
            response.data.data[5].insurance_value

          if (!response.data.data) {
            this.$store.commit('cart/setOwnCountryActive', false)
            this.$store.commit('cart/setOwnStateActive', false)
            this.$store.commit('cart/setOwnCityActive', false)
            this.$store.commit('cart/setOtherCountryActive', false)
            this.$store.commit('cart/setOtherStateActive', false)
            this.$store.commit('cart/setOtherCityActive', false)
          }
        })
        .catch((err) => {
          console.log(err)
          this.$store.commit('cart/setOwnCountryActive', false)
          this.$store.commit('cart/setOwnStateActive', false)
          this.$store.commit('cart/setOwnCityActive', false)
          this.$store.commit('cart/setOtherCountryActive', false)
          this.$store.commit('cart/setOtherStateActive', false)
          this.$store.commit('cart/setOtherCityActive', false)
        })
    },
    retrieveShippingNotes() {
      this.$axios
        .$get('/v1/orders/shipping-notes/')
        .then((response) => {
          this.deliveryNote = response.data.options.delivery_note
          const regex = /(<([^>]+)>)/ig;
          const pickupNoteRaw = response.data.options.pickup_note
          this.pickupNote = pickupNoteRaw.replace(regex, '')
        })
    },
  }
}
</script>

<style scoped>
.shipping-option {
  @apply cursor-pointer hover:border-brand-grey hover:bg-blue-50
}

.shipping-option.disabled {
  @apply text-gray-400 cursor-not-allowed hover:border-gray-200 hover:bg-gray-50
}
</style>