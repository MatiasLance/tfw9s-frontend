import currency from 'currency.js'

export default {
  data() {
    return {
      currencyOptions: {
        symbol: '$',
        separator: ',',
        decimal: '.',
        precision: 2,
        fromCents: false,
      },
    }
  },
  methods: {
    toCurrency(value) {
      return currency(value)
    },
    formatCurrency(value) {
      return currency(value, this.currencyOptions).format()
    },
    formatCurrencyFromCent(value) {
      const options = {
        ...this.currencyOptions,
        fromCents: true,
      }
      return currency(value, options).format()
    },
    currencyToValue(value) {
      const options = {
        ...this.currencyOptions,
        fromCents: false,
      }
      return currency(value, options).value
    }
  },
}