<template>
    <section class="w-full">
        <div
          id="paypal-button-container"
          class="mx-8 flex min-h-[250px] items-center justify-center"
        ></div>
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
  beforeCreate() {
    loadScript({ 'client-id': this.$config.paypal.clientId })
      .then((paypal) => {
        paypal
          .Buttons({
            createOrder: this.createOrder,
            onApprove: this.onApprove,
            style: {
              layout: 'horizontal',
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
      return actions.order
        // eslint-disable-next-line camelcase
        .create({ purchase_units: [ { amount: { value: this.cartTotal } } ] });
    },
    onApprove(data, actions) {
      return actions.order
        .capture()
        .then(() => {
          this.$router.push(`/thank-you?paypal_transaction_id=${data.orderID}`)
        })
    },
  }
}
</script>

<style scoped>
#confirmation {
    color: green;
    margin-top: 1em;
    font-size: 2em;
}
</style>