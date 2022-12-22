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
  computed: {
    cart: {
      get() {
        return this.$store.state.cart.cart;
      },
    },
    shippingInformation: {
      get() {
        return this.$store.state.order.shippingInformation;
      },
      set(v) {
        this.$store.commit('order/setShippingInformation', v);
      },
    },
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
        .create({
          prefer: 'return=minimal',
          // eslint-disable-next-line camelcase
          purchase_units: [ { amount: { value: this.cartTotal } } ]
        })
        .then((orderId) => {
          return this.$axios
            .$post('v1/orders/checkout', {
              // eslint-disable-next-line camelcase
              payment_method: 'paypal',
              items: this.cart,
              metadata: {
                ...this.shippingInformation,
                // eslint-disable-next-line camelcase
                transaction_id: orderId
              },
            })
        });
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