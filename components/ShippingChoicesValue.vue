<template>
     <div
        class="gap-auto my-5 grid md:grid-cols-3 md:gap-4"
     >
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
                        v-model="selected"
                        value="Registered Value"
                        type="checkbox"
                        name="registeredValue"
                        class="
                        mt-1 h-4 w-4 bg-gray-200
                        text-brand-black focus:ring-slate-500"
                    >
                </span>
            <template v-if="shipping === 'Own Country'">
                <p class="ml-2">
{{ formatCurrency(ownCountryShippingValues.registeredValue) }} Registered Value
                </p>
            </template>
            <template v-if="shipping === 'Own State'">
                <p class="ml-2">
{{ formatCurrency(ownStateShippingValues.registeredValue) }} Registered Value
                </p>
            </template>
            <template v-if="shipping === 'Own City'">
                <p class="ml-2">
{{ formatCurrency(ownCityShippingValues.registeredValue) }} Registered Value
                </p>
            </template>
            <template v-if="shipping === 'Other Country'">
                <p class="ml-2">
{{ formatCurrency(otherCountryShippingValues.registeredValue) }}
    Registered Value
                </p>
            </template>
            <template v-if="shipping === 'Other State'">
                <p class="ml-2">
{{ formatCurrency(otherStateShippingValues.registeredValue) }}
    Registered Value
                </p>
            </template>
            <template v-if="shipping === 'Other City'">
                <p class="ml-2">
{{ formatCurrency(otherCityShippingValues.registeredValue) }}
    Registered Value
                </p>
            </template>
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
                    v-model="selected"
                    value="Express Value"
                    type="checkbox"
                    name="expressValue"
                    class="
                    mt-1 h-4 w-4 bg-gray-200
                    text-brand-black focus:ring-slate-500"
                >
            </span>
            <template v-if="shipping === 'Own Country'">
            <p class="ml-2">
{{ formatCurrency(ownCountryShippingValues.expressValue) }} Express Value
            </p>
            </template>
            <template v-if="shipping === 'Own State'">
                <p class="ml-2">
{{ formatCurrency(ownStateShippingValues.expressValue) }} Express Value
                </p>
            </template>
            <template v-if="shipping === 'Own City'">
                <p class="ml-2">
{{ formatCurrency(ownCityShippingValues.expressValue) }} Express Value
                </p>
            </template>
            <template v-if="shipping === 'Other Country'">
                <p class="ml-2">
{{ formatCurrency(otherCountryShippingValues.expressValue) }}
    Express Value
                </p>
            </template>
            <template v-if="shipping === 'Other State'">
                <p class="ml-2">
{{ formatCurrency(otherStateShippingValues.expressValue) }}
    Express Value
                </p>
            </template>
            <template v-if="shipping === 'Other City'">
                <p class="ml-2">
{{ formatCurrency(otherCityShippingValues.expressValue) }}
    Express Value
                </p>
            </template>
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
                    v-model="selected"
                    value="Insurance Value"
                    type="checkbox"
                    name="insuranceValue"
                    class="
                    mt-1 h-4 w-4 bg-gray-200
                    text-brand-black focus:ring-slate-500"
                >
            </span>
            <template v-if="shipping === 'Own Country'">
            <p class="ml-2">
{{ formatCurrency(ownCountryShippingValues.insuranceValue) }} Insurance Value
            </p>
            </template>
            <template v-if="shipping === 'Own State'">
            <p class="ml-2">
{{ formatCurrency(ownStateShippingValues.insuranceValue) }} Insurance Value
            </p>
            </template>
            <template v-if="shipping === 'Own City'">
            <p class="ml-2">
{{ formatCurrency(ownCityShippingValues.insuranceValue) }} Insurance Value
            </p>
            </template>
            <template v-if="shipping === 'Other Country'">
            <p class="ml-2">
{{ formatCurrency(otherCountryShippingValues.insuranceValue) }} Insurance Value
            </p>
            </template>
            <template v-if="shipping === 'Other State'">
            <p class="ml-2">
{{ formatCurrency(otherStateShippingValues.insuranceValue) }} Insurance Value
            </p>
            </template>
            <template v-if="shipping === 'Other City'">
            <p class="ml-2">
{{ formatCurrency(otherCityShippingValues.insuranceValue) }} Insurance Value
            </p>
            </template>
        </label>
    </div>
</template>

<script>
import currencyMixin from '~/mixins/currency';

export default {
  name: 'ShippingChoicesValue',
  mixins: [ currencyMixin ],
  props: {
    shipping: {
      type: String,
      required: true
    }
  },
  data() {
    return {
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
  watch: {
    selected() {
      this.$emit('change', { selected: this.selected })
    }
  },
  mounted() {
    this.retrieve();
  },
  methods: {
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