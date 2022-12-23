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
        class="
          flex
          cursor-pointer
          border border-gray-200
          bg-gray-50
          p-3
          hover:border-brand-black hover:bg-slate-50
        "
      >
        <span>
          <input
            v-model="shippingType"
            value="delivery"
            name="shipping"
            type="radio"
            class="mt-1 h-4 w-4 bg-gray-200
            text-brand-black focus:ring-slate-500"
          />
        </span>
        <p class="ml-2">
          <span>Delivery</span>
          <small
            class="block text-sm text-gray-400"
            v-html="deliveryNote"
          ></small>
        </p>
      </label>
      <label
        class="
          flex
          cursor-pointer
          border border-gray-200
          bg-gray-50
          p-3
          hover:border-brand-black hover:bg-slate-50
        "
      >
        <span>
          <input
            v-model="shippingType"
            value="pickup"
            name="shipping"
            type="radio"
            class="mt-1 h-4 w-4 bg-gray-200
            text-brand-black focus:ring-slate-500"
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
              v-if="isOwnCountryActive"
              class="
                  hover:border-wpi-red
                  flex
                  w-full cursor-pointer
                  border
                  border-gray-200 bg-transparent
                  p-3
                  hover:bg-blue-50
              "
              >
              <span>
                  <input
                  v-model="shippingChoiceCalc"
                  value="Own Country"
                  type="radio"
                  class="
                  text-wpi-red focus:ring-wpi-red mt-1 mr-1 h-4 w-4
                  bg-gray-200"
                  />
              </span>
              <span>Sending to {{ ownCountry }}</span>
              </label>
              <label
              v-if="isOtherCountryActive"
              class="
                  hover:border-wpi-red
                  flex
                  w-full cursor-pointer
                  border
                  border-gray-200 bg-transparent
                  p-3
                  hover:bg-blue-50
              "
              >
              <span>
                  <input
                  v-model="shippingChoiceCalc"
                  value="Other Country"
                  type="radio"
                  class="
                  text-wpi-red focus:ring-wpi-red mt-1 mr-1 h-4 w-4
                  bg-gray-200"
                  />
              </span>
              <span>Sending to other Country</span>
              </label>
        </div>
        <div
          class="grid w-full grid-cols-2 gap-2"
        >
              <label
              v-if="isOwnStateActive"
              class="
                  hover:border-wpi-red
                  flex
                  w-full cursor-pointer
                  border
                  border-gray-200 bg-transparent
                  p-3
                  hover:bg-blue-50
              "
              >
              <span>
                  <input
                  v-model="shippingChoiceCalc"
                  value="Own State"
                  name="shippingChoiceState"
                  type="radio"
                  class="
                  text-wpi-red focus:ring-wpi-red mt-1 mr-1 h-4 w-4
                  bg-gray-200"
                  />
              </span>
              <span>Sending to {{ ownState }}</span>
            </label>
            <label
              v-if="isOtherStateActive"
              class="
                  hover:border-wpi-red
                  flex
                  w-full cursor-pointer
                  border
                  border-gray-200 bg-transparent
                  p-3
                  hover:bg-blue-50
              "
              >
              <span>
                  <input
                  v-if="isOtherStateActive"
                  v-model="shippingChoiceCalc"
                  value="Other State"
                  name="shippingChoiceState"
                  type="radio"
                  class="
                  text-wpi-red focus:ring-wpi-red mt-1 mr-1
                  h-4
                  w-4
                  bg-gray-200"
                  />
              </span>
              <span>Sending to other State</span>
              </label>
        </div>
        <div
          class="grid w-full grid-cols-2 gap-2"
        >
              <label
              v-if="isOwnCityActive"
              class="
                  hover:border-wpi-red
                  flex
                  w-full cursor-pointer
                  border
                  border-gray-200 bg-transparent
                  p-3
                  hover:bg-blue-50
              "
              >
              <span>
                  <input
                  v-model="shippingChoiceCalc"
                  value="Own City"
                  name="shippingChoiceCity"
                  type="radio"
                  class="
                  text-wpi-red focus:ring-wpi-red mt-1 mr-1 h-4 w-4
                  bg-gray-200"
                  />
              </span>
              <span>Sending to {{ ownCity }}</span>
              </label>
              <label
              v-if="isOtherCityActive"
              class="
                  hover:border-wpi-red
                  flex
                  w-full cursor-pointer
                  border
                  border-gray-200 bg-transparent
                  p-3
                  hover:bg-blue-50
              "
              >
              <span>
                  <input
                  value="Other City"
                  name="shippingChoiceCity"
                  type="radio"
                  class="
                  text-wpi-red focus:ring-wpi-red mt-1 mr-1 h-4 w-4
                  bg-gray-200"
                  />
              </span>
              <span>Sending to other City</span>
              </label>
        </div>
      </div>
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

export default {
  components: {
    Modal,
    TermsSection,
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
      shippingChoiceCalc: '',
      shippingChoiceCountry: '',
      shippingChoiceState: '',
      shippingChoiceCity: '',
      ownCountry: '',
      ownState: '',
      ownCity: '',
      email: '',
      hasAgreedToTerms: false,
      shippingType: 'delivery',
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
  },
  mounted() {
    this.retrieveShippingNotes();
  },
  methods: {
    submit() {
      if (this.additionalValidation) {
        this.$emit('submit', {
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          email: this.email,
          shippingType: this.shippingType,
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
      return this.shippingType
    },
    retrieveShippingSetting() {
      this.$axios
        .$get('/v1/shipping/country/latest')
        .then((response) => {
          this.ownCountry = response.data.data.country
          if (!response.data.data) {
            this.$store.commit('cart/setOwnCountryActive', false)
          }
        })
        .catch((err) => {
          console.log(err)
          this.$store.commit('cart/setOwnCountryActive', false)
        })
      this.$axios
        .$get('/v1/shipping/state/latest')
        .then((response) => {
          this.ownState = response.data.data.state
          if (!response.data.data) {
            this.$store.commit('cart/setOwnStateActive', false)
          }
        })
        .catch((err) => {
          console.log(err)
          this.$store.commit('cart/setOwnStateActive', false)
        })
      this.$axios
        .$get('/v1/shipping/city/latest')
        .then((response) => {
          this.ownCity = response.data.data.city
          if (!response.data.data) {
            this.$store.commit('cart/setOwnCityActive', false)
          }
        })
        .catch((err) => {
          console.log(err)
          this.$store.commit('cart/setOwnCityActive', false)
        })
      this.$axios
        .$get('/v1/shipping/othercountry/latest')
        .then((response) => {
          if (!response.data.data) {
            this.$store.commit('cart/setOtherCountryActive', false)
          }
        })
        .catch((err) => {
          console.log(err)
          this.$store.commit('cart/setOtherCountryActive', false)
        })
      this.$axios
        .$get('/v1/shipping/otherstate/latest')
        .then((response) => {
          if (!response.data.data) {
            this.$store.commit('cart/setOtherStateActive', false)
          }
        })
        .catch((err) => {
          console.log(err)
          this.$store.commit('cart/setOtherStateActive', false)
        })
      this.$axios
        .$get('/v1/shipping/othercity/latest')
        .then((response) => {
          if (!response.data.data) {
            this.$store.commit('cart/setOtherCityActive', false)
          }
        })
        .catch((err) => {
          console.log(err)
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