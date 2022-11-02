import currency from 'currency.js'

export default {
  data() {
    return {
      currencyJsDefaults: {
        symbol: '$',
        fromCents: false,
      }
    }
  },
  methods: {
    formatCurrency(value) {
      return currency(value, this.currencyJsDefaults).format()
    }
  },
}