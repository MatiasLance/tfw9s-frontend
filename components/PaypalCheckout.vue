<template>
    <section class="w-full">
        <div v-if="!paid" id="paypal-button-container"></div>
        <div v-else id="confirmation">
            Order complete!
        </div>
    </section>
</template>

<script>
import { loadScript } from '@paypal/paypal-js';

export default {
  name: 'PaypalCheckout',
  props: {
    cartTotal: {
      type: Number,
      required: true
    }
  },
  data() {
    return { paid: false }
  },
  beforeCreate() {
    loadScript({ 'client-id': this.$config.paypal.clientId })
      .then((paypal) => {
        paypal
          .Buttons({
            createOrder: this.createOrder,
            onApprove: this.onApprove,
            style: {
              layout: 'vertical',
              color: 'black',
              shape: 'pill',
              label: 'paypal'
            }
          })
          .render('#paypal-button-container');
      })
  },
  methods: {
    createOrder(data, actions) {
      console.log('Creating order...')
      return actions.order
        // eslint-disable-next-line camelcase
        .create({ purchase_units: [ { amount: { value: this.cartTotal } } ] });
    },
    onApprove(data, actions) {
      console.log('Order approved...')
      return actions.order.capture().then(() => {
        this.paid = true;
        console.log('Order complete!')
      })
    },
  }
}
</script>

<style scoped>
#paypal-button-container {
    margin: 30px 0;
}

#confirmation {
    color: green;
    margin-top: 1em;
    font-size: 2em;
}
</style>