<template>
  <div>
    <BaseHeader class="bg-gradient-to-r from-swd-dgrey to-swd-blue">
      <div
        class="
          col-span-12
          mt-12
          space-y-3
          px-6
          text-center
          sm:space-y-3 sm:text-left
          lg:col-span-6
          xl:mt-10
        "
      >
        <span
          class="
            superheadline
            flex flex-row
            items-center
            pb-3
            text-[1rem]
            font-normal
          "
        >
          <span class="font-medium text-white">
            <NuxtLink to="/">
                <VBtn text color="white">Home</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-3xl font-bold text-white lg:text-6xl">
          {{ bannerText }}
        </h1>
      </div>
    </BaseHeader>

    <div class="flex flex-col items-center justify-center py-24 px-48">
      <template v-if="status === 'loading'">
        <VProgressCircular
          size="125"
          width="10"
          indeterminate
          color="gray lighten-2"
        />
        <div class="mt-8 text-2xl font-bold">
          Finalizing your order...
        </div>
        <div class="text-base text-gray-600">
          Please do not close your browser until this is done.
        </div>
      </template>

      <template v-else-if="status === 'success'">
        <VIcon size="150" color="green">
          mdi-check-circle
        </VIcon>
        <div class="mt-8 text-2xl font-bold">
          Order Success!
        </div>
        <div class="text-base text-gray-600">
          You can go now back to the shop to continue shopping
        </div>
        <div class="mt-4 flex items-center justify-center">
          <NuxtLink to="/shop">
            <span
              class="mx-2 cursor-pointer bg-swd-blue px-4 py-2 text-white"
            >
              Shop
            </span>
          </NuxtLink>
        </div>
      </template>

      <template v-else-if="status === 'processing'">
        <VIcon size="150" color="blue lighten-2">
          mdi-information
        </VIcon>
        <div class="mt-8 text-2xl font-bold">
          Order is still being processed
        </div>
        <div class="text-base text-gray-600">
          Please refresh this tab in a few minutes.
          Do not close this tab
        </div>
        <div class="mt-4 flex items-center justify-center">
          <span
            class="mx-2 cursor-pointer bg-swd-blue px-4 py-2 text-white"
            @click="verify"
          >
            Refresh
          </span>
        </div>
      </template>

      <template v-else>
        <VIcon size="150" color="red darken-2">
          mdi-alert-circle
        </VIcon>
        <div class="mt-8 text-2xl font-bold">
          Your order failed
        </div>
        <div class="text-base text-gray-600">
          You can go back to the shop to continue shopping
          or attempt to checkout again
        </div>
        <div class="mt-4 flex items-center justify-center">
          <NuxtLink to="/shop">
            <span
              class="mx-2 cursor-pointer bg-swd-blue px-4 py-2 text-white"
            >
              Shop
            </span>
          </NuxtLink>
          <NuxtLink to="/checkout">
            <span
              class="mx-2 cursor-pointer bg-swd-blue px-4 py-2 text-white"
            >
              Checkout
            </span>
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 'loading',
      paymentIntentId: null,
      bannerText: 'Verifying Order'
    }
  },
  mounted() {
    this.paymentIntentId = this.$route.query.payment_intent
    this.$nextTick(() => {
      this.verify()
    })
  },
  methods: {
    verify() {
      if (this.paymentIntentId) {
        this.status = 'loading'
        this.$axios
          .$post('/v1/orders/verify', { paymentIntent: this.paymentIntentId })
          .then((response) => {
            const status = response.data.status
            if (status === 'succeeded') {
              this.status = 'success'
              this.bannerText = 'Thank you'
              this.$store.dispatch('cart/clearCart')
            } else if (status === 'processing') {
              this.status = 'processing'
              this.bannerText = 'Order is being processed'
            } else {
              this.status = 'failed'
              this.bannerText = 'Order failed'
            }
          })
          .catch(() => {
            this.status = 'failed'
            this.bannerText = 'Order failed'
          })
      } else {
        this.status = 'failed'
        this.bannerText = 'Order failed'
      }
    },
  },
}
</script>