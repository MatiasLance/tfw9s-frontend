<template>
  <section class="w-full">
      <div
        id="paypal-button-container"
        class="mx-8 flex min-h-[250px] items-center justify-center"
      ></div>
      <button
            type="button"
            class="
            mt-3
            block
            w-full
            bg-white py-[16px] px-[12px]
            text-center
            text-gray-700
            shadow-sm
            outline outline-1
            outline-gray-200
            hover:bg-gray-100 hover:text-[#1a1d18]
            "
            @click="activeStepPrev"
        >
            Return to Step 1
        </button>
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
    paymentMethod: {
      get() {
        return this.$store.state.order.paymentMethod;
      },
      set(v) {
        this.$store.commit('order/setPaymentMethod', v);
      }
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
    activeStepPrev() {
      this.$emit('active-step', 1)
    },
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