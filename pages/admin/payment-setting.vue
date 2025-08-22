<template>
  <div class="bg-[#1A1A1B] h-full">
    <!-- Header -->
    <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black shadow-md">
      <!-- Breadcrumbs and Title -->
      <BreadCrumbs title="Payment Setting"/>
    </BaseHeader>

    <!-- Main Content -->
    <section class="container mx-auto max-w-screen-lg px-4 py-10">
        <article
        class="
            mx-auto w-full
            rounded-lg border
            border-gray-200
            bg-white p-6
            shadow-lg md:p-8
        "
        >
        <form @submit.prevent="updatePaymentSettings">
            <!-- Stripe Integration -->
            <div class="mb-8 rounded-md border border-gray-100 bg-gray-50 p-5">
                <div class="flex flex-col gap-4">
                    <div class="flex items-center">
                    <VSwitch
                        v-model="stripeEnabled"
                        color="green"
                    />
                    <label class="ml-3 text-xl font-semibold text-gray-700">
                        Enable Stripe Payments
                    </label>
                    </div>

                    <p class="text-gray-600">
                    Allow customers to pay securely with credit/debit cards via Stripe.
                    </p>
                </div>
            </div>

            <!-- Afterpay Integration -->
            <div class="mb-8 rounded-md border border-gray-100 bg-gray-50 p-5">
                <div class="flex flex-col gap-4">
                    <div class="flex items-center">
                    <VSwitch
                        v-model="afterpayEnabled"
                        color="green"
                    />
                    <label class="ml-3 text-xl font-semibold text-gray-700">
                        Enable Afterpay/Clearpay
                    </label>
                    </div>

                    <p class="text-gray-600">
                    Offer buy-now, pay-later options. Available in supported regions.
                    </p>
                </div>
            </div>

            <!-- Save Button -->
            <button
            type="submit"
            class="
                w-full
                rounded-md
                border border-transparent
                bg-brand-black
                py-3
                px-6
                text-center
                text-base
                font-bold
                text-white
                transition
                hover:bg-gray-900
                focus:outline-none
                focus:ring-2
                focus:ring-brand-black
                focus:ring-offset-2
            "
            >
            Save Payment Settings
            </button>

            <!-- Back Link -->
            <p class="mt-6 text-center text-sm font-medium text-gray-500">
            <NuxtLink
                to="/admin"
                class="
                inline-flex items-center
                font-semibold
                text-brand-black
                hover:text-black
                "
            >
                <i class="ri-arrow-left-line mr-2"></i>
                Back to Admin Panel
            </NuxtLink>
            </p>
        </form>
        </article>
    </section>
  </div>
</template>

<script>
import BreadCrumbs from '~/components/BreadCrumbs.vue';
import 'remixicon/fonts/remixicon.css'

export default {
  name: 'payment-setting',
  components: { BreadCrumbs },
  data() {
    return {
      stripeEnabled: true,
      afterpayEnabled: false,
      id: null,
    }
  },
  mounted() {
    this.listOfPaymentSetting();
  },
  methods: {
    listOfPaymentSetting() {
      this.$axios
        .$get(`v1/payment/setting/`)
        .then((response) => {
          console.log(response)
          this.id = response.id
          this.stripeEnabled = response.stripe_enabled
          this.afterpayEnabled = response.afterpay_enabled
        })
        .catch((err) => {
          this.$oruga.notification.open({
            message: err.message,
            duration: 5000,
            variant: 'danger',
            queue: true,
            position: 'bottom'
          })
        })
    },
    updatePaymentSettings() {
      const form = new FormData();
      form.append('_method', 'PATCH')
      form.append('stripeEnabled', this.stripeEnabled)
      form.append('afterpayEnabled', this.afterpayEnabled)
      const endpoint = `v1/payment/setting/${this.id}`
      this.$axios
        .$post(endpoint, form)
        .then((response) => {
          if (response.success) {
            this.$oruga.notification.open({
              message: `Master settings: ${response.message}`,
              variant: 'success',
              duration: 5000,
              position: 'bottom'
            })
            this.listOfPaymentSetting();
          }
        })
        .catch((err) => {
          this.$oruga.notification.open({
            message: err.message,
            duration: 5000,
            variant: 'danger',
            queue: true,
            position: 'bottom'
          })
        })
    }
  }
}
</script>
