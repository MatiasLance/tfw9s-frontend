<template>
     <div
        class="gap-auto my-5 grid md:grid-cols-3 md:gap-4"
     >
        <label
            class="
            shipping-option
            flex
            cursor-pointer
            border border-gray-200
            bg-gray-50
            p-3
            hover:border-brand-black hover:bg-slate-50
            "
            :class="checkDisabledAll() ? 'disabled' : ''"
        >
                <span>
                    <input
                        v-model="selected"
                        value="Registered Value"
                        type="checkbox"
                        name="registeredValue"
                        class="
                        mt-1 h-4 w-4 bg-gray-200
                        text-brand-black focus:ring-slate-500"
                        :disabled="checkDisabledAll()"
                    >
                </span>
                <p class="ml-2">
Add Registered Post
               </p>
        </label>
        <label
            class="
            shipping-option
            flex
            cursor-pointer
            border border-gray-200
            bg-gray-50
            p-3
            hover:border-brand-black hover:bg-slate-50
            "
            :class="checkDisabledAll() ? 'disabled' : ''"
        >
            <span>
                <input
                    v-model="selected"
                    value="Express Value"
                    type="checkbox"
                    name="expressValue"
                    class="
                    mt-1 h-4 w-4 bg-gray-200
                    text-brand-black focus:ring-slate-500"
                    :disabled="checkDisabledAll()"
                >
            </span>
            <p class="ml-2">
Add Express Post
           </p>
        </label>
        <label
            class="
            shipping-option
            flex
            cursor-pointer
            border border-gray-200
            bg-gray-50
            p-3
            hover:border-brand-black hover:bg-slate-50
            "
            :class="checkDisabledAll() ? 'disabled' : ''"
        >
            <span>
                <input
                    v-model="selected"
                    value="Insurance Value"
                    type="checkbox"
                    name="insuranceValue"
                    class="
                    mt-1 h-4 w-4 bg-gray-200
                    text-brand-black focus:ring-slate-500"
                    :disabled="checkDisabledAll()"
                >
            </span>
            <p class="ml-2">
              Add Insurance Value
           </p>
        </label>
    </div>
</template>

<script>
import currencyMixin from '~/mixins/currency';

export default {
  name: 'ShippingChoicesValue',
  mixins: [ currencyMixin ],
  data() {
    return {
      showAmountt: false,
      registeredPostSelect: null,
      expressPostSelect: null,
      insuranceValueSelect: null,
      selected: [],
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
      ownCountryShippingValues: {
        registeredValue: 0,
        expressValue: 0,
        insuranceValue: 0,
      },
      ownStateShippingValues: {
        registeredValue: 0,
        expressValue: 0,
        insuranceValue: 0,
      },
      ownCityShippingValues: {
        registeredValue: 0,
        expressValue: 0,
        insuranceValue: 0,
      },
    }
  },
  computed: {
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
          this.$store.state.cart.other.state.active
        )
      }
    },
    isOtherCityActive: {
      get() {
        return (
          this.$store.state.cart.other.city.active
        )
      }
    },
  },
  watch: {
    selected() {
      this.$emit('change', { selected: this.selected })
    }
  },
  methods: {
    checkDisabledAll() {
      return (
        !this.isOwnCountryActive &&
        !this.isOwnStateActive &&
        !this.isOwnCityActive &&
        !this.isOtherCountryActive &&
        !this.isOtherStateActive &&
        !this.isOtherCityActive
      )
    },
    retrieve() {
      this.$axios
        .$get('/v1/shipping/country/latest')
        .then((response) => {
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
          }
        })
        .catch((err) => {
          console.log(err)
          this.$store.commit('cart/setOwnCountryActive', false)
        })
    }
  }
}
</script>

<style lang="postcss">
.shipping-option {
  @apply cursor-pointer hover:border-brand-grey hover:bg-blue-50
}

.shipping-option.disabled {
  @apply text-gray-400 cursor-not-allowed hover:border-gray-200 hover:bg-gray-50
}
</style>