<!-- eslint-disable max-len -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#111712]
    via-[#1A1A1B] to-[#0d120e]"
  >
    <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black shadow-md">
      <BreadCrumbs title="Tax Setting"/>
    </BaseHeader>

    <main class="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <section
        class="relative mb-7 overflow-hidden rounded-3xl border
        border-white/10 bg-gradient-to-br from-brand-grey-2 via-brand-black
        to-green-900 p-6 shadow-2xl shadow-black/30 sm:p-8"
      >
        <div
          class="absolute -right-16 -top-20 h-64 w-64 rounded-full
          border-[36px] border-brand-green/10"
        ></div>
        <div
          class="absolute -bottom-24 right-32 h-56 w-56 rounded-full
          bg-brand-green/10 blur-3xl"
        ></div>

        <div
          class="relative flex flex-col gap-7 lg:flex-row
          lg:items-end lg:justify-between"
        >
          <div class="max-w-2xl">
            <div
              class="mb-4 inline-flex items-center gap-2 rounded-full
              border border-brand-green/20 bg-brand-green/10 px-3 py-1.5
              text-xs font-bold uppercase tracking-widest text-green-300"
            >
              <span class="h-2 w-2 animate-pulse rounded-full bg-brand-green"></span>
              Checkout configuration
            </div>
            <h1 class="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Keep tax clear and predictable
            </h1>
            <p class="mt-3 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
              Set the tax rate applied to purchases and choose how customers
              see tax information during checkout.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div
              class="min-w-[130px] rounded-2xl border border-white/10
              bg-white/5 px-4 py-3 text-center backdrop-blur-sm"
            >
              <p class="text-2xl font-black text-brand-green">
                {{ formattedTaxRate }}%
              </p>
              <p class="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Current rate
              </p>
            </div>
            <div
              class="min-w-[130px] rounded-2xl border border-white/10
              bg-white/5 px-4 py-3 text-center backdrop-blur-sm"
            >
              <p class="text-lg font-black capitalize text-white">
                {{ taxModeLabel }}
              </p>
              <p class="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Cart display
              </p>
            </div>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section
          class="overflow-hidden rounded-3xl border border-gray-200
          bg-gray-50 shadow-2xl shadow-black/25 lg:col-span-2"
        >
          <div
            class="flex items-center gap-3 border-b border-gray-200
            bg-white px-5 py-5 sm:px-7"
          >
            <div
              class="flex h-11 w-11 items-center justify-center rounded-2xl
              bg-green-50 text-green-700"
            >
              <i class="ri-settings-3-line text-2xl"></i>
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-900">
                Tax preferences
              </h2>
              <p class="mt-0.5 text-sm text-gray-500">
                Configure the rate and checkout presentation.
              </p>
            </div>
          </div>

          <form @submit.prevent="proceed">
            <div class="space-y-5 p-5 sm:p-7">
              <article
                class="group rounded-2xl border border-gray-200 bg-white
                p-5 shadow-sm transition hover:border-green-200
                hover:shadow-md sm:p-6"
              >
                <div class="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center
                    rounded-2xl bg-green-50 text-green-700 transition
                    group-hover:scale-105"
                  >
                    <i class="ri-percent-line text-2xl"></i>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div
                      class="flex flex-col gap-4 sm:flex-row sm:items-start
                      sm:justify-between"
                    >
                      <div>
                        <div class="flex flex-wrap items-center gap-2">
                          <h3 class="font-bold text-gray-900">
                            Cart tax rate
                          </h3>
                          <span
                            class="rounded-full bg-green-50 px-2.5 py-1
                            text-[11px] font-bold uppercase tracking-wide
                            text-green-700"
                          >
                            Required
                          </span>
                        </div>
                        <p class="mt-2 max-w-md text-sm leading-6 text-gray-500">
                          Enter the percentage applied to taxable purchases.
                          Decimals are supported for precise rates.
                        </p>
                      </div>
                      <div class="relative w-full shrink-0 sm:w-44">
                        <label for="tax-rate" class="sr-only">
                          Tax rate percentage
                        </label>
                        <input
                          id="tax-rate"
                          v-model.number="addTaxOnCartPrice"
                          type="number"
                          name="addTaxOnCartPrice"
                          class="tax-rate-input w-full rounded-xl border
                          border-gray-300 bg-gray-50 py-3 pl-4 pr-12
                          text-right text-xl font-black text-gray-900
                          transition focus:border-brand-green focus:bg-white
                          focus:outline-none focus:ring-4 focus:ring-green-100"
                          step=".01"
                          min="0"
                          inputmode="decimal"
                          @keydown="handleDecimal"
                        />
                        <span
                          class="pointer-events-none absolute inset-y-0 right-4
                          flex items-center text-lg font-bold text-green-700"
                        >
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              <article
                class="group rounded-2xl border border-gray-200 bg-white
                p-5 shadow-sm transition hover:border-green-200
                hover:shadow-md sm:p-6"
              >
                <div class="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center
                    rounded-2xl bg-blue-50 text-blue-700 transition
                    group-hover:scale-105"
                  >
                    <i class="ri-shopping-cart-2-line text-2xl"></i>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div
                      class="flex flex-col gap-4 sm:flex-row sm:items-center
                      sm:justify-between"
                    >
                      <div>
                        <div class="flex flex-wrap items-center gap-2">
                          <h3 class="font-bold text-gray-900">
                            Cart display mode
                          </h3>
                          <span
                            class="rounded-full px-2.5 py-1 text-[11px]
                            font-bold uppercase tracking-wide"
                            :class="toggleControl2
                              ? 'bg-green-50 text-green-700'
                              : 'bg-amber-50 text-amber-700'"
                          >
                            {{ taxModeLabel }}
                          </span>
                        </div>
                        <p class="mt-2 max-w-md text-sm leading-6 text-gray-500">
                          Choose whether checkout communicates prices as
                          tax-inclusive or tax-exclusive.
                        </p>
                      </div>
                      <div
                        class="tax-switch flex min-w-[180px] items-center
                        justify-between rounded-2xl border border-gray-200
                        bg-gray-50 px-4 py-2"
                      >
                        <div>
                          <p class="text-sm font-bold text-gray-800">
                            {{ toggleControl2 ? 'Inclusive' : 'Exclusive' }}
                          </p>
                          <p class="text-xs text-gray-500">
                            Shown in cart
                          </p>
                        </div>
                        <VSwitch
                          id="tax-display-mode"
                          v-model="toggleControl2"
                          color="green"
                          inset
                          hide-details
                          aria-label="Toggle inclusive tax display"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              <div
                class="flex items-start gap-3 rounded-2xl border
                border-blue-100 bg-blue-50 p-4"
              >
                <i class="ri-information-line mt-0.5 text-xl text-blue-600"></i>
                <p class="text-xs leading-5 text-blue-800">
                  These settings affect how tax is presented at checkout.
                  Review the preview before applying your changes.
                </p>
              </div>
            </div>

            <footer
              class="flex flex-col-reverse gap-3 border-t border-gray-200
              bg-white px-5 py-5 sm:flex-row sm:items-center
              sm:justify-between sm:px-7"
            >
              <NuxtLink
                to="/admin"
                class="inline-flex min-h-[48px] items-center justify-center
                gap-2 rounded-xl border border-gray-300 bg-white px-5
                font-semibold text-gray-700 transition hover:bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <i class="ri-arrow-left-line"></i>
                Back to admin
              </NuxtLink>
              <button
                type="submit"
                class="inline-flex min-h-[48px] items-center justify-center
                gap-2 rounded-xl bg-brand-green px-7 font-bold
                text-brand-black shadow-lg shadow-green-200 transition
                hover:-translate-y-0.5 hover:bg-green-500 hover:shadow-xl
                focus:outline-none focus:ring-2 focus:ring-brand-green
                focus:ring-offset-2 disabled:cursor-wait disabled:opacity-60
                disabled:shadow-none"
                :disabled="isSaving || addTaxOnCartPrice === null
                  || addTaxOnCartPrice < 0"
              >
                <i
                  class="text-lg"
                  :class="isSaving
                    ? 'ri-loader-4-line animate-spin'
                    : 'ri-save-3-line'"
                ></i>
                {{ isSaving ? 'Applying changes…' : 'Apply changes' }}
              </button>
            </footer>
          </form>
        </section>

        <aside class="space-y-6">
          <section
            class="overflow-hidden rounded-3xl border border-white/10
            bg-gradient-to-br from-[#252925] to-brand-black text-white
            shadow-2xl shadow-black/25"
          >
            <div class="border-b border-white/10 px-5 py-5">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs font-bold uppercase tracking-widest text-green-300">
                    Live preview
                  </p>
                  <h2 class="mt-1 text-xl font-bold">
                    Cart tax summary
                  </h2>
                </div>
                <div
                  class="flex h-11 w-11 items-center justify-center
                  rounded-2xl bg-brand-green text-brand-black"
                >
                  <i class="ri-receipt-line text-2xl"></i>
                </div>
              </div>
            </div>

            <div class="p-5">
              <div class="rounded-2xl bg-white p-5 text-gray-900 shadow-xl">
                <div class="mb-5 flex items-center justify-between">
                  <span class="text-sm font-bold">
                    Checkout summary
                  </span>
                  <span
                    class="inline-flex items-center gap-1 rounded-full
                    bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    Preview
                  </span>
                </div>
                <div class="space-y-3 text-sm">
                  <div class="flex items-center justify-between text-gray-500">
                    <span>Tax rate</span>
                    <strong class="text-gray-900">{{ formattedTaxRate }}%</strong>
                  </div>
                  <div class="flex items-center justify-between text-gray-500">
                    <span>Price display</span>
                    <strong class="capitalize text-gray-900">{{ taxModeLabel }}</strong>
                  </div>
                  <div class="border-t border-dashed border-gray-300 pt-3">
                    <div class="flex items-center justify-between">
                      <span class="font-semibold text-gray-700">
                        Cart label
                      </span>
                      <span
                        class="rounded-lg bg-gray-100 px-2.5 py-1
                        text-xs font-bold text-gray-700"
                      >
                        Tax {{ taxModeLabel }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p class="mt-4 text-center text-xs leading-5 text-gray-400">
                Preview updates instantly as you adjust the settings.
              </p>
            </div>
          </section>

          <section
            class="rounded-3xl border border-gray-200 bg-white p-5
            shadow-xl shadow-black/10"
          >
            <div class="flex items-start gap-3">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl bg-amber-50 text-amber-600"
              >
                <i class="ri-lightbulb-flash-line text-xl"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-900">
                  Good to know
                </h3>
                <p class="mt-2 text-sm leading-6 text-gray-500">
                  Confirm the rate complies with the tax requirements that
                  apply to your business and customers.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </main>
  </div>
</template>

<script>
import BreadCrumbs from '~/components/BreadCrumbs.vue';
import 'remixicon/fonts/remixicon.css'

export default {
  name: 'tax-setting',
  components: { BreadCrumbs },
  data() {
    return {
      addTaxOnCartPrice: 0,
      taxID: null,
      toggleTaxControllID: null,
      isSaving: false,
    }
  },
  computed: {
    toggleControl1: {
      get() {
        return (
          this.$store.state.master.toggleControl1
        )
      },
      set(val) {
        this.$store.commit('master/setToggleControl1', val)
      }
    },
    toggleControl2: {
      get() {
        return (
          this.$store.state.master.toggleControl2
        )
      },
      set(val) {
        this.$store.commit('master/setToggleControl2', val)
      }
    },
    formattedTaxRate() {
      const rate = Number.parseFloat(this.addTaxOnCartPrice)

      if (Number.isNaN(rate)) {
        return '0'
      }

      return Number.isInteger(rate)
        ? rate.toString()
        : rate.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')
    },
    taxModeLabel() {
      return this.toggleControl2 ? 'inclusive' : 'exclusive'
    },
    tax: {
      get() {
        return (
          this.$store.state.cart.tax
        )
      },
      set(val) {
        if (!this.toggleControl1 && !this.toggleControl2) {
          this.$store.commit('cart/setTax', 0)
        } else {
          this.$store.commit('cart/setTax', val)
        }
      }
    }
  },
  created() {
    this.debouncedUpdateToggleControl = this.debounce(this.updateToggleControl, 500)
  },
  async mounted() {
    await this.retrieveToggleControl();
    await this.taxList();
  },
  methods: {
    handleDecimal(event) {
      const keyCodes = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        '.'
      ]
      return keyCodes.includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'
    },

    debounce(func, wait) {
      let timeout
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout)
          func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }
    },

    async taxList() {
      try {
        const response = await this.$axios.$get('v1/tax/');
        this.addTaxOnCartPrice = response.addTaxValue
        this.taxID = response.id
        if (!this.toggleControl2) {
          this.$store.commit('cart/setTax', 0)
        } else {
          this.$store.commit('cart/setTax', this.addTaxOnCartPrice)
        }
      } catch (error) {
        console.error(error)
      }
    },

    async retrieveToggleControl() {
      try {
        const response = await this.$axios.$get('v1/toggletax/');
        this.toggleControl2 = response.toggleControl2
        this.toggleTaxControllID = response.id
        this.$store.commit('master/setToggleControl2', response.toggleControl2)
      } catch (error) {
        console.error(error)
      }
    },

    async updateToggleControl() {
      try {
        const form = new FormData()
        form.append('toggleControl1', this.toggleControl1)
        form.append('toggleControl2', this.toggleControl2)

        const endpoint = `v1/toggletax/${this.toggleTaxControllID}`
        await this.$axios.$post(endpoint, form)
        
        await this.retrieveToggleControl()
        
      } catch (err) {
        this.$oruga.notification.open({
          message: err.message,
          duration: 5000,
          variant: 'danger',
          queue: true,
          position: 'bottom'
        })
      }
    },

    async proceed() {
      this.isSaving = true
      try {
        const form = new FormData();
        form.append('addTaxOnCartPrice', this.addTaxOnCartPrice)

        const response = await this.$axios.$post(`v1/tax/${this.taxID}`, form)

        this.$oruga.notification.open({
          message: `Tax settings: ${response.message}`,
          variant: 'success',
          duration: 5000,
          position: 'bottom'
        })

        await Promise.all([
          this.taxList(),
          this.retrieveToggleControl(),
          this.updateToggleControl()
        ])
      } catch (error) {
        this.$oruga.notification.open({
          message: error.message || 'Failed to update tax settings',
          variant: 'danger',
          duration: 5000,
          position: 'bottom'
        })
      } finally {
        this.isSaving = false
      }
    }
  }
}
</script>

<style scoped>
.tax-rate-input {
  font-variant-numeric: tabular-nums;
}

.tax-switch ::v-deep .v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}

.tax-switch ::v-deep .v-input__slot {
  margin-bottom: 0;
}
</style>
