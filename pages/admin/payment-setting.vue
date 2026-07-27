<!-- eslint-disable max-len -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#111712]
    via-[#1A1A1B] to-[#0d120e]"
  >
    <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black shadow-md">
      <BreadCrumbs title="Payment Setting" />
    </BaseHeader>

    <main class="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <section
        class="relative mb-7 overflow-hidden rounded-3xl border
        border-white/10 bg-gradient-to-br from-[#26352a] via-brand-black
        to-[#163e2b] p-6 shadow-2xl shadow-black/30 sm:p-8"
        data-aos="fade-up"
        aria-labelledby="payment-settings-title"
      >
        <div
          class="pointer-events-none absolute -right-20 -top-24 h-72 w-72
          rounded-full border-[42px] border-brand-green/10"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-28 right-32 h-64 w-64
          rounded-full bg-brand-green/10 blur-3xl"
        ></div>
        <div
          class="pointer-events-none absolute left-1/2 top-0 h-px w-1/3
          bg-gradient-to-r from-transparent via-brand-green/60 to-transparent"
        ></div>

        <div
          class="relative flex flex-col gap-8 lg:flex-row lg:items-end
          lg:justify-between"
        >
          <div class="flex max-w-2xl items-start gap-5">
            <div
              class="hidden h-16 w-16 shrink-0 items-center justify-center
              rounded-3xl bg-brand-green text-brand-black shadow-xl
              shadow-green-950/30 sm:flex"
            >
              <i class="ri-bank-card-line text-3xl"></i>
            </div>
            <div>
              <div
                class="mb-4 inline-flex items-center gap-2 rounded-full
                border border-brand-green/20 bg-brand-green/10 px-3 py-1.5
                text-xs font-bold uppercase tracking-widest text-green-300"
              >
                <span class="h-2 w-2 animate-pulse rounded-full bg-brand-green"></span>
                Checkout control centre
              </div>
              <h1
                id="payment-settings-title"
                class="text-3xl font-black tracking-tight text-white sm:text-4xl"
              >
                Give every customer a better way to pay
              </h1>
              <p class="mt-3 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
                Choose the payment options available at checkout and create a
                fast, flexible experience your customers can trust.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3" aria-live="polite">
            <div
              class="min-w-[132px] rounded-2xl border border-white/10
              bg-white/5 px-4 py-3 text-center backdrop-blur-sm"
            >
              <p class="text-2xl font-black text-brand-green">
                {{ enabledGatewayCount }}/2
              </p>
              <p class="mt-1 text-[11px] font-bold uppercase tracking-wide text-gray-400">
                Gateways active
              </p>
            </div>
            <div
              class="min-w-[132px] rounded-2xl border border-white/10
              bg-white/5 px-4 py-3 text-center backdrop-blur-sm"
            >
              <p
                class="text-lg font-black"
                :class="enabledGatewayCount ? 'text-white' : 'text-amber-300'"
              >
                {{ checkoutStatus }}
              </p>
              <p class="mt-1 text-[11px] font-bold uppercase tracking-wide text-gray-400">
                Checkout status
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        v-if="isLoading"
        class="grid animate-pulse grid-cols-1 gap-6 lg:grid-cols-3"
        aria-label="Loading payment settings"
        aria-live="polite"
        role="status"
      >
        <span class="sr-only">Loading payment settings...</span>
        <div
          class="space-y-5 rounded-3xl border border-white/10 bg-white/10
          p-6 lg:col-span-2"
        >
          <div class="h-12 w-56 rounded-2xl bg-white/10"></div>
          <div class="h-48 rounded-2xl bg-white/10"></div>
          <div class="h-48 rounded-2xl bg-white/10"></div>
        </div>
        <div class="h-80 rounded-3xl border border-white/10 bg-white/10"></div>
      </section>

      <section
        v-else-if="loadError"
        class="relative overflow-hidden rounded-3xl border border-red-200
        bg-white p-6 shadow-2xl shadow-black/20 sm:p-10"
        role="alert"
      >
        <div
          class="pointer-events-none absolute -right-16 -top-20 h-56 w-56
          rounded-full bg-red-50"
        ></div>
        <div
          class="relative mx-auto flex max-w-xl flex-col items-center
          text-center"
        >
          <div
            class="flex h-16 w-16 items-center justify-center rounded-3xl
            bg-red-50 text-red-600 ring-8 ring-red-50/60"
          >
            <i class="ri-wifi-off-line text-3xl" aria-hidden="true"></i>
          </div>
          <p
            class="mt-6 text-xs font-black uppercase tracking-[0.2em]
            text-red-600"
          >
            Connection interrupted
          </p>
          <h2 class="mt-2 text-2xl font-black text-gray-900">
            We couldn’t load your payment settings
          </h2>
          <p class="mt-3 max-w-md text-sm leading-6 text-gray-600">
            {{ loadError }} Your saved configuration has not been changed.
            Check your connection and try again.
          </p>
          <button
            type="button"
            class="mt-6 inline-flex min-h-[48px] items-center justify-center
            gap-2 rounded-xl bg-brand-black px-6 text-sm font-black text-white
            shadow-lg shadow-gray-300 transition hover:-translate-y-0.5
            hover:bg-gray-900 focus:outline-none focus:ring-2
            focus:ring-brand-green focus:ring-offset-2"
            @click="listOfPaymentSetting"
          >
            <i class="ri-refresh-line text-lg" aria-hidden="true"></i>
            Try again
          </button>
        </div>
      </section>

      <form
        v-else
        class="grid grid-cols-1 gap-6 lg:grid-cols-3"
        @submit.prevent="updatePaymentSettings"
      >
        <section
          class="overflow-hidden rounded-3xl border border-gray-200
          bg-gray-50 shadow-2xl shadow-black/25 lg:col-span-2"
        >
          <header
            class="flex flex-col gap-4 border-b border-gray-200 bg-white
            px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-2xl
                bg-green-50 text-green-700"
              >
                <i class="ri-secure-payment-line text-2xl"></i>
              </div>
              <div>
                <h2 class="text-xl font-black text-gray-900">
                  Payment methods
                </h2>
                <p class="mt-0.5 text-sm text-gray-500">
                  Control which options customers see at checkout.
                </p>
              </div>
            </div>

            <span
              class="inline-flex w-max items-center gap-2 rounded-full px-3
              py-1.5 text-xs font-bold uppercase tracking-wide"
              :class="hasChanges
                ? 'bg-amber-50 text-amber-700'
                : 'bg-green-50 text-green-700'"
              aria-live="polite"
            >
              <span
                class="h-2 w-2 rounded-full"
                :class="hasChanges ? 'bg-amber-500' : 'bg-green-500'"
                aria-hidden="true"
              ></span>
              {{ hasChanges ? 'Unsaved changes' : 'Settings saved' }}
            </span>
          </header>

          <div class="space-y-5 p-5 sm:p-7">
            <article
              class="payment-card group relative overflow-hidden rounded-3xl
              border bg-white p-5 shadow-sm transition sm:p-6"
              :class="stripeEnabled
                ? 'border-indigo-200 ring-4 ring-indigo-50'
                : 'border-gray-200 hover:border-indigo-200'"
            >
              <div
                class="pointer-events-none absolute -right-12 -top-14 h-40
                w-40 rounded-full bg-indigo-100/60 blur-2xl"
              ></div>
              <div
                class="relative flex flex-col gap-5 sm:flex-row sm:items-center
                sm:justify-between"
              >
                <div class="flex min-w-0 items-start gap-4">
                  <div
                    class="flex h-14 w-14 shrink-0 items-center justify-center
                    rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-700
                    text-white shadow-lg shadow-indigo-200"
                  >
                    <i class="ri-bank-card-2-line text-3xl"></i>
                  </div>
                  <div>
                    <div class="flex flex-wrap items-center gap-2">
                      <h3 class="text-lg font-black text-gray-900">
                        Card payments
                      </h3>
                      <span
                        class="rounded-full px-2.5 py-1 text-[11px] font-bold
                        uppercase tracking-wide"
                        :class="stripeEnabled
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'bg-gray-100 text-gray-500'"
                      >
                        {{ stripeEnabled ? 'Active' : 'Inactive' }}
                      </span>
                    </div>
                    <p class="mt-2 max-w-md text-sm leading-6 text-gray-500">
                      Accept secure credit and debit card payments through
                      Stripe for a familiar, streamlined checkout.
                    </p>
                    <div
                      class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs
                      font-semibold text-gray-500"
                    >
                      <span class="inline-flex items-center gap-1.5">
                        <i class="ri-shield-check-line text-indigo-600"></i>
                        Secure processing
                      </span>
                      <span class="inline-flex items-center gap-1.5">
                        <i class="ri-flashlight-line text-indigo-600"></i>
                        Instant payment
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  class="flex min-w-[156px] items-center justify-between
                  rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3
                  transition focus-within:border-indigo-400
                  focus-within:bg-white focus-within:ring-4
                  focus-within:ring-indigo-100"
                >
                  <div>
                    <label
                      for="stripe-payment-toggle"
                      class="cursor-pointer text-sm font-black text-gray-800"
                    >
                      {{ stripeEnabled ? 'Enabled' : 'Disabled' }}
                    </label>
                    <p id="stripe-payment-help" class="text-xs text-gray-500">
                      Stripe
                    </p>
                  </div>
                  <VSwitch
                    id="stripe-payment-toggle"
                    v-model="stripeEnabled"
                    color="green"
                    aria-label="Enable Stripe card payments"
                    aria-describedby="stripe-payment-help"
                    hide-details
                    inset
                  />
                </div>
              </div>
            </article>

            <article
              class="payment-card group relative overflow-hidden rounded-3xl
              border bg-white p-5 shadow-sm transition sm:p-6"
              :class="afterpayEnabled
                ? 'border-emerald-200 ring-4 ring-emerald-50'
                : 'border-gray-200 hover:border-emerald-200'"
            >
              <div
                class="pointer-events-none absolute -right-12 -top-14 h-40
                w-40 rounded-full bg-emerald-100/70 blur-2xl"
              ></div>
              <div
                class="relative flex flex-col gap-5 sm:flex-row sm:items-center
                sm:justify-between"
              >
                <div class="flex min-w-0 items-start gap-4">
                  <div
                    class="flex h-14 w-14 shrink-0 items-center justify-center
                    rounded-2xl bg-gradient-to-br from-emerald-300 to-teal-500
                    text-emerald-950 shadow-lg shadow-emerald-100"
                  >
                    <i class="ri-calendar-check-line text-3xl"></i>
                  </div>
                  <div>
                    <div class="flex flex-wrap items-center gap-2">
                      <h3 class="text-lg font-black text-gray-900">
                        Buy now, pay later
                      </h3>
                      <span
                        class="rounded-full px-2.5 py-1 text-[11px] font-bold
                        uppercase tracking-wide"
                        :class="afterpayEnabled
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-gray-100 text-gray-500'"
                      >
                        {{ afterpayEnabled ? 'Active' : 'Inactive' }}
                      </span>
                    </div>
                    <p class="mt-2 max-w-md text-sm leading-6 text-gray-500">
                      Let eligible customers split purchases into manageable
                      instalments with Afterpay or Clearpay.
                    </p>
                    <div
                      class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs
                      font-semibold text-gray-500"
                    >
                      <span class="inline-flex items-center gap-1.5">
                        <i class="ri-calendar-event-line text-emerald-600"></i>
                        Flexible instalments
                      </span>
                      <span class="inline-flex items-center gap-1.5">
                        <i class="ri-global-line text-emerald-600"></i>
                        Supported regions
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  class="flex min-w-[156px] items-center justify-between
                  rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3
                  transition focus-within:border-emerald-400
                  focus-within:bg-white focus-within:ring-4
                  focus-within:ring-emerald-100"
                >
                  <div>
                    <label
                      for="afterpay-payment-toggle"
                      class="cursor-pointer text-sm font-black text-gray-800"
                    >
                      {{ afterpayEnabled ? 'Enabled' : 'Disabled' }}
                    </label>
                    <p id="afterpay-payment-help" class="text-xs text-gray-500">
                      Afterpay
                    </p>
                  </div>
                  <VSwitch
                    id="afterpay-payment-toggle"
                    v-model="afterpayEnabled"
                    color="green"
                    aria-label="Enable Afterpay or Clearpay"
                    aria-describedby="afterpay-payment-help"
                    hide-details
                    inset
                  />
                </div>
              </div>
            </article>

            <div
              v-if="!enabledGatewayCount"
              class="flex items-start gap-3 rounded-2xl border border-amber-200
              bg-amber-50 p-4 text-amber-900"
              role="alert"
            >
              <i class="ri-error-warning-line mt-0.5 text-xl text-amber-600"></i>
              <div>
                <p class="text-sm font-black">Checkout needs a payment method</p>
                <p class="mt-1 text-xs leading-5 text-amber-700">
                  Customers will not be able to complete paid orders while both
                  gateways are disabled.
                </p>
              </div>
            </div>
          </div>

          <footer
            class="flex flex-col gap-3 border-t border-gray-200 bg-white px-5
            py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7"
          >
            <NuxtLink
              to="/admin"
              class="inline-flex items-center justify-center gap-2 text-sm
              font-bold text-gray-500 transition hover:text-gray-900
              focus:outline-none focus:ring-2 focus:ring-brand-green"
            >
              <i class="ri-arrow-left-line"></i>
              Back to Admin Panel
            </NuxtLink>

            <div class="flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                class="inline-flex min-h-[46px] items-center justify-center
                gap-2 rounded-xl border border-gray-300 bg-white px-5 text-sm
                font-bold text-gray-700 transition hover:bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-gray-300
                disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="!hasChanges || isSaving"
                @click="resetChanges"
              >
                <i class="ri-restart-line"></i>
                Reset changes
              </button>
              <button
                type="submit"
                class="inline-flex min-h-[46px] items-center justify-center
                gap-2 rounded-xl bg-green-600 px-6 text-sm font-black
                text-white shadow-lg shadow-gray-300 transition
                hover:-translate-y-0.5 hover:bg-green-700 focus:outline-none
                focus:ring-2 focus:ring-green focus:ring-offset-2
                disabled:cursor-not-allowed disabled:opacity-50
                disabled:hover:translate-y-0"
                :disabled="!hasChanges || isSaving || !id"
              >
                <span class="text-gray-50">
                  <i
                    class="text-lg"
                    :class="isSaving
                      ? 'ri-loader-4-line animate-spin'
                      : 'ri-save-3-line'"
                  ></i>
                  {{ isSaving ? 'Saving settings...' : 'Save payment settings' }}
                </span>
              </button>
            </div>
          </footer>
        </section>

        <aside class="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <section
            class="overflow-hidden rounded-3xl border border-white/10
            bg-gradient-to-br from-[#253027] to-[#171b18] p-6
            shadow-2xl shadow-black/20"
          >
            <div class="flex items-center justify-between">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-2xl
                bg-brand-green/10 text-brand-green"
              >
                <i class="ri-shopping-bag-3-line text-2xl"></i>
              </div>
              <span
                class="inline-flex items-center gap-2 rounded-full px-3 py-1
                text-[11px] font-bold uppercase tracking-wide"
                :class="enabledGatewayCount
                  ? 'bg-green-400/10 text-green-300'
                  : 'bg-amber-400/10 text-amber-300'"
                aria-live="polite"
              >
                <span
                  class="h-1.5 w-1.5 rounded-full"
                  :class="enabledGatewayCount ? 'bg-green-400' : 'bg-amber-400'"
                  aria-hidden="true"
                ></span>
                {{ enabledGatewayCount ? 'Ready' : 'Action needed' }}
              </span>
            </div>

            <h2 class="mt-5 text-lg font-black text-white">
              Checkout snapshot
            </h2>
            <p class="mt-2 text-sm leading-6 text-gray-400">
              A quick view of what customers can currently use.
            </p>

            <div class="mt-5 space-y-3">
              <div
                class="flex items-center justify-between rounded-2xl
                border border-white/10 bg-white/5 px-4 py-3"
              >
                <span class="flex items-center gap-2 text-sm font-semibold text-gray-300">
                  <i class="ri-bank-card-2-line text-indigo-300"></i>
                  Card payments
                </span>
                <i
                  class="text-xl"
                  :class="stripeEnabled
                    ? 'ri-checkbox-circle-fill text-brand-green'
                    : 'ri-close-circle-line text-gray-500'"
                ></i>
              </div>
              <div
                class="flex items-center justify-between rounded-2xl
                border border-white/10 bg-white/5 px-4 py-3"
              >
                <span class="flex items-center gap-2 text-sm font-semibold text-gray-300">
                  <i class="ri-calendar-check-line text-emerald-300"></i>
                  Pay in instalments
                </span>
                <i
                  class="text-xl"
                  :class="afterpayEnabled
                    ? 'ri-checkbox-circle-fill text-brand-green'
                    : 'ri-close-circle-line text-gray-500'"
                ></i>
              </div>
            </div>
          </section>

          <section
            class="rounded-3xl border border-green-200 bg-gradient-to-br
            from-green-50 to-white p-6 shadow-xl shadow-black/10"
          >
            <div
              class="flex h-11 w-11 items-center justify-center rounded-2xl
              bg-green-100 text-green-700"
            >
              <i class="ri-shield-check-line text-2xl"></i>
            </div>
            <h2 class="mt-4 font-black text-gray-900">
              A confident checkout
            </h2>
            <ul class="mt-4 space-y-3 text-sm leading-5 text-gray-600">
              <li class="flex items-start gap-2">
                <i class="ri-check-line mt-0.5 text-green-600"></i>
                Offer at least one payment method at all times.
              </li>
              <li class="flex items-start gap-2">
                <i class="ri-check-line mt-0.5 text-green-600"></i>
                Changes apply to the customer checkout after saving.
              </li>
              <li class="flex items-start gap-2">
                <i class="ri-check-line mt-0.5 text-green-600"></i>
                Availability may depend on gateway and regional configuration.
              </li>
            </ul>
          </section>
        </aside>
      </form>
    </main>
  </div>
</template>

<script>
import BreadCrumbs from '~/components/BreadCrumbs.vue'
import 'remixicon/fonts/remixicon.css'

export default {
  name: 'payment-setting',
  components: { BreadCrumbs },
  data() {
    return {
      stripeEnabled: true,
      afterpayEnabled: false,
      id: null,
      isLoading: true,
      isSaving: false,
      loadError: '',
      savedSettings: {
        stripeEnabled: true,
        afterpayEnabled: false
      }
    }
  },
  computed: {
    enabledGatewayCount() {
      return Number(this.stripeEnabled) + Number(this.afterpayEnabled)
    },
    checkoutStatus() {
      if (this.enabledGatewayCount === 2) return 'Flexible'
      if (this.enabledGatewayCount === 1) return 'Ready'
      return 'Paused'
    },
    hasChanges() {
      return (
        this.stripeEnabled !== this.savedSettings.stripeEnabled ||
        this.afterpayEnabled !== this.savedSettings.afterpayEnabled
      )
    }
  },
  mounted() {
    this.listOfPaymentSetting()
  },
  methods: {
    async listOfPaymentSetting() {
      this.isLoading = true
      this.loadError = ''
      try {
        const response = await this.$axios.$get('v1/payment/setting/')
        this.id = response.id
        this.stripeEnabled = Boolean(response.stripe_enabled)
        this.afterpayEnabled = Boolean(response.afterpay_enabled)
        this.savedSettings = {
          stripeEnabled: this.stripeEnabled,
          afterpayEnabled: this.afterpayEnabled
        }
      } catch (err) {
        this.loadError =
          err.response?.data?.message ||
          err.message ||
          'The payment service did not respond.'
        this.showError(err)
      } finally {
        this.isLoading = false
      }
    },
    resetChanges() {
      this.stripeEnabled = this.savedSettings.stripeEnabled
      this.afterpayEnabled = this.savedSettings.afterpayEnabled
    },
    async updatePaymentSettings() {
      if (!this.id || !this.hasChanges || this.isSaving) return

      this.isSaving = true
      const form = new FormData()
      form.append('_method', 'PATCH')
      form.append('stripeEnabled', this.stripeEnabled)
      form.append('afterpayEnabled', this.afterpayEnabled)

      try {
        const response = await this.$axios.$post(
          `v1/payment/setting/${this.id}`,
          form
        )
        if (response.success) {
          this.$oruga.notification.open({
            message: `Payment settings: ${response.message}`,
            variant: 'success',
            duration: 5000,
            position: 'bottom'
          })
          await this.listOfPaymentSetting()
        }
      } catch (err) {
        this.showError(err)
      } finally {
        this.isSaving = false
      }
    },
    showError(err) {
      const message =
        err.response?.data?.message || err.message || 'Unable to load payment settings.'

      this.$oruga.notification.open({
        message,
        duration: 5000,
        variant: 'danger',
        queue: true,
        position: 'bottom'
      })
    }
  }
}
</script>

<style scoped>
.payment-card {
  transform: translateZ(0);
}

.payment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 36px -24px rgba(17, 24, 39, 0.45);
}

@media (prefers-reduced-motion: reduce) {
  .payment-card,
  .payment-card:hover {
    transform: none;
    transition: none;
  }
}
</style>
