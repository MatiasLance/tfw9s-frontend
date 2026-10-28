<!-- eslint-disable max-len -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#111712]
    via-[#1A1A1B] to-[#0d120e]"
  >
    <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black shadow-md">
      <BreadCrumbs title="Shipping Setting" />
    </BaseHeader>

    <main class="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <section
        class="relative mb-7 overflow-hidden rounded-3xl border
        border-white/10 bg-gradient-to-br from-[#26352a] via-brand-black
        to-[#163e2b] p-6 shadow-2xl shadow-black/30 sm:p-8"
        data-aos="fade-up"
        aria-labelledby="shipping-settings-title"
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
              <i class="ri-truck-line text-3xl" aria-hidden="true"></i>
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
                id="shipping-settings-title"
                class="text-3xl font-black tracking-tight text-white sm:text-4xl"
              >
                Keep shipping options clear and flexible
              </h1>
              <p class="mt-3 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
                Configure delivery rates, pickup charges, and local fulfillment
                rules from one simple checkout control panel.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3" aria-live="polite">
            <div
              class="min-w-[132px] rounded-2xl border border-white/10
              bg-white/5 px-4 py-3 text-center backdrop-blur-sm"
            >
              <p class="text-2xl font-black text-brand-green">2</p>
              <p class="mt-1 text-[11px] font-bold uppercase tracking-wide text-gray-400">
                Modes active
              </p>
            </div>
            <div
              class="min-w-[132px] rounded-2xl border border-white/10
              bg-white/5 px-4 py-3 text-center backdrop-blur-sm"
            >
              <p class="text-lg font-black text-white">
                <span class="text-brand-green">{{ formatCurrency(deliveryCharge) }}</span>
                <span class="mx-1 text-gray-500">/</span>
                {{ formatCurrency(pickupRate) }}
              </p>
              <p class="mt-1 text-[11px] font-bold uppercase tracking-wide text-gray-400">
                Delivery / Pickup
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        v-if="isLoading"
        class="grid animate-pulse grid-cols-1 gap-6 lg:grid-cols-3"
        aria-label="Loading shipping settings"
        aria-live="polite"
        role="status"
      >
        <span class="sr-only">Loading shipping settings...</span>
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
        <div class="relative mx-auto flex max-w-xl flex-col items-center text-center">
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
            We couldn’t load your shipping settings
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
            @click="retrieveShippingSettings()"
          >
            <i class="ri-refresh-line text-lg" aria-hidden="true"></i>
            Try again
          </button>
        </div>
      </section>

      <form
        v-else
        class="grid grid-cols-1 gap-6 lg:grid-cols-3"
        @submit.prevent="editShippingNotes"
      >
        <section
          class="rounded-3xl border border-gray-200 bg-gray-50
          shadow-2xl shadow-black/25 lg:col-span-2"
        >
          <header
            class="flex flex-col gap-4 border-b border-gray-200 bg-white
            px-5 py-5 sm:flex-row sm:items-center sm:justify-between
            sm:px-7"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-2xl
                bg-green-50 text-green-700"
              >
                <i class="ri-equalizer-line text-2xl" aria-hidden="true"></i>
              </div>
              <div>
                <h2 class="text-xl font-black text-gray-900">
                  Shipping preferences
                </h2>
                <p class="mt-0.5 text-sm text-gray-500">
                  Set the fees and customer guidance shown at checkout.
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
              {{ isSaving ? 'Saving…' : hasChanges ? 'Unsaved changes' : 'Settings saved' }}
            </span>
          </header>

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
                  <i class="ri-truck-line text-2xl" aria-hidden="true"></i>
                </div>
                <div class="min-w-0 flex-1">
                  <div
                    class="flex flex-col gap-4 sm:flex-row sm:items-start
                    sm:justify-between"
                  >
                    <div>
                      <div class="flex flex-wrap items-center gap-2">
                        <h3 class="font-bold text-gray-900">
                          Delivery rate
                        </h3>
                        <span
                          class="rounded-full bg-green-50 px-2.5 py-1
                          text-[11px] font-bold uppercase tracking-wide
                          text-green-700"
                        >
                          Active
                        </span>
                      </div>
                      <p class="mt-2 max-w-md text-sm leading-6 text-gray-500">
                        Applied when customers choose delivery and every item
                        in the cart can be shipped.
                      </p>
                    </div>
                    <div class="relative w-full shrink-0 sm:w-44">
                      <label for="delivery-charge" class="sr-only">
                        Delivery charge in Australian dollars
                      </label>
                      <span
                        class="pointer-events-none absolute inset-y-0 left-4
                        flex items-center text-lg font-bold text-green-700"
                      >
                        $
                      </span>
                      <input
                        id="delivery-charge"
                        v-model.number="deliveryCharge"
                        type="number"
                        name="delivery_charge"
                        min="0"
                        step="0.01"
                        inputmode="decimal"
                        :disabled="isSaving"
                        class="w-full rounded-xl border border-gray-300 bg-gray-50
                        py-3 pl-9 pr-4 text-right text-xl font-black text-gray-900
                        transition focus:border-brand-green focus:bg-white
                        focus:outline-none focus:ring-4 focus:ring-green-100
                        disabled:cursor-wait disabled:opacity-60"
                      />
                      <p class="mt-1 text-right text-[11px] font-medium text-gray-400">
                        AUD · 2 decimal places
                      </p>
                    </div>
                  </div>

                  <div class="mt-5">
                    <label
                      for="delivery-note"
                      class="text-sm font-bold text-gray-800"
                    >
                      Delivery instructions
                    </label>
                    <p class="mb-2 mt-1 text-xs leading-5 text-gray-500">
                      Shown to customers when they select delivery at checkout.
                    </p>
                    <div class="overflow-hidden rounded-xl" :class="{ 'pointer-events-none opacity-60': isSaving }">
                      <Tiptap id="delivery-note" v-model="deliveryNote" />
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article
              class="group rounded-2xl border border-gray-200 bg-white
              p-5 shadow-sm transition hover:border-blue-200
              hover:shadow-md sm:p-6"
            >
              <div class="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div
                  class="flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-2xl bg-blue-50 text-blue-700 transition
                  group-hover:scale-105"
                >
                  <i class="ri-store-2-line text-2xl" aria-hidden="true"></i>
                </div>
                <div class="min-w-0 flex-1">
                  <div
                    class="flex flex-col gap-4 sm:flex-row sm:items-start
                    sm:justify-between"
                  >
                    <div>
                      <div class="flex flex-wrap items-center gap-2">
                        <h3 class="font-bold text-gray-900">
                          Pickup option
                        </h3>
                        <span
                          class="rounded-full px-2.5 py-1 text-[11px] font-bold
                          uppercase tracking-wide"
                          :class="pickupFeeEnabled
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-green-50 text-green-700'"
                        >
                          {{ pickupFeeEnabled ? 'Paid pickup' : 'Free pickup' }}
                        </span>
                      </div>
                      <p class="mt-2 max-w-md text-sm leading-6 text-gray-500">
                        Pickup remains available at checkout. Turn on a pickup
                        fee when collection should carry a charge.
                      </p>
                    </div>
                    <div
                      class="shipping-switch flex min-w-[180px] items-center
                      justify-between rounded-2xl border border-gray-200
                      bg-gray-50 px-4 py-2"
                    >
                      <div>
                        <p class="text-sm font-bold text-gray-800">
                          Charge for pickup
                        </p>
                        <p class="text-xs text-gray-500">
                          {{ pickupFeeEnabled ? 'Fee enabled' : 'No fee' }}
                        </p>
                      </div>
                      <VSwitch
                        id="pickup-fee-enabled"
                        v-model="pickupFeeEnabled"
                        color="green"
                        inset
                        hide-details
                        aria-label="Charge a fee for pickup"
                      />
                    </div>
                  </div>

                  <div class="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_11rem]">
                    <div>
                      <label
                        for="pickup-note"
                        class="text-sm font-bold text-gray-800"
                      >
                        Pickup instructions
                      </label>
                      <p class="mb-2 mt-1 text-xs leading-5 text-gray-500">
                        Let customers know where and when to collect their order.
                      </p>
                      <div class="overflow-hidden rounded-xl" :class="{ 'pointer-events-none opacity-60': isSaving }">
                        <Tiptap id="pickup-note" v-model="pickupNote" />
                      </div>
                    </div>
                    <div>
                      <label
                        for="pickup-charge"
                        class="text-sm font-bold text-gray-800"
                      >
                        Pickup fee
                      </label>
                      <p class="mb-2 mt-1 text-xs leading-5 text-gray-500">
                        Leave off for free pickup.
                      </p>
                      <div class="relative">
                        <span
                          class="pointer-events-none absolute inset-y-0 left-4
                          flex items-center text-lg font-bold text-blue-700"
                        >
                          $
                        </span>
                        <input
                          id="pickup-charge"
                          v-model.number="pickupCharge"
                          type="number"
                          name="pickup_charge"
                          min="0"
                          step="0.01"
                          inputmode="decimal"
                          :disabled="!pickupFeeEnabled || isSaving"
                          class="w-full rounded-xl border border-gray-300 bg-gray-50
                          py-3 pl-9 pr-4 text-right text-xl font-black text-gray-900
                          transition focus:border-brand-green focus:bg-white
                          focus:outline-none focus:ring-4 focus:ring-green-100
                          disabled:cursor-not-allowed disabled:bg-gray-100
                          disabled:text-gray-400"
                        />
                      </div>
                      <p class="mt-1 text-right text-[11px] font-medium text-gray-400">
                        AUD · 2 decimal places
                      </p>
                    </div>
                  </div>

                  <p class="mt-3 text-xs leading-5 text-gray-500">
                    Pickup is always offered at checkout. A $0 fee is shown as
                    FREE to the customer.
                  </p>
                </div>
              </div>
            </article>

            <div
              class="flex items-start gap-3 rounded-2xl border
              border-blue-100 bg-blue-50 p-4"
            >
              <i class="ri-information-line mt-0.5 text-xl text-blue-600"></i>
              <p class="text-xs leading-5 text-blue-800">
                These settings affect shipping calculations at checkout. New
                rates apply to carts recalculated after you save, while existing
                orders keep the totals they were charged.
              </p>
            </div>
          </div>

          <footer
            class="sticky bottom-0 z-10 flex flex-col-reverse gap-3 rounded-b-3xl
            border-t border-gray-200 bg-white/95 px-5 py-5 backdrop-blur
            sm:flex-row sm:items-center sm:justify-between sm:px-7"
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
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                class="inline-flex min-h-[48px] items-center justify-center
                rounded-xl px-5 font-semibold text-gray-500 transition
                hover:bg-gray-100 hover:text-gray-800 focus:outline-none
                focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed
                disabled:opacity-40"
                :disabled="isSaving || !hasChanges"
                @click="resetChanges"
              >
                Cancel changes
              </button>
              <button
                type="submit"
                class="inline-flex min-h-[48px] items-center justify-center
                gap-2 rounded-xl bg-brand-green px-7 font-bold text-brand-black
                shadow-lg shadow-green-200 transition hover:-translate-y-0.5
                hover:bg-green-500 hover:shadow-xl focus:outline-none
                focus:ring-2 focus:ring-brand-green focus:ring-offset-2
                disabled:cursor-not-allowed disabled:opacity-60
                disabled:shadow-none"
                :disabled="isSaving || !hasChanges || !isFormValid()"
              >
                <i
                  class="text-lg"
                  :class="isSaving
                    ? 'ri-loader-4-line animate-spin'
                    : 'ri-save-3-line'"
                ></i>
                {{ isSaving ? 'Applying changes…' : 'Apply changes' }}
              </button>
            </div>
          </footer>
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
                    Checkout shipping summary
                  </h2>
                </div>
                <div
                  class="flex h-11 w-11 items-center justify-center
                  rounded-2xl bg-brand-green text-brand-black"
                >
                  <i class="ri-receipt-line text-2xl" aria-hidden="true"></i>
                </div>
              </div>
            </div>

            <div class="p-5">
              <div class="rounded-2xl bg-white p-5 text-gray-900 shadow-xl">
                <div class="mb-5 flex items-center justify-between">
                  <div>
                    <span class="text-sm font-bold">Example checkout</span>
                    <p class="mt-0.5 text-xs text-gray-500">
                      Based on a {{ formatCurrency(previewSubtotal) }} cart
                    </p>
                  </div>
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
                    <span>Subtotal</span>
                    <strong class="text-gray-900">{{ formatCurrency(previewSubtotal) }}</strong>
                  </div>
                  <div class="flex items-center justify-between text-gray-500">
                    <span class="inline-flex items-center gap-2">
                      <i class="ri-truck-line text-green-600"></i>
                      Delivery fee
                    </span>
                    <strong class="text-gray-900">{{ formatCurrency(deliveryRate) }}</strong>
                  </div>
                  <div class="flex items-center justify-between text-gray-500">
                    <span class="inline-flex items-center gap-2">
                      <i class="ri-store-2-line text-blue-600"></i>
                      Pickup fee
                    </span>
                    <strong class="text-gray-900">{{ formatCurrency(pickupRate) }}</strong>
                  </div>
                </div>

                <div class="mt-5 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1">
                  <button
                    type="button"
                    class="rounded-lg px-3 py-2 text-xs font-bold transition
                    focus:outline-none focus:ring-2 focus:ring-brand-green"
                    :class="shippingType === 'delivery'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'"
                    @click="shippingType = 'delivery'"
                  >
                    Delivery
                  </button>
                  <button
                    type="button"
                    class="rounded-lg px-3 py-2 text-xs font-bold transition
                    focus:outline-none focus:ring-2 focus:ring-brand-green"
                    :class="shippingType === 'pickup'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'"
                    @click="shippingType = 'pickup'"
                  >
                    Pickup
                  </button>
                </div>

                <div class="mt-4 space-y-2 border-t border-dashed border-gray-300 pt-4">
                  <div class="flex items-center justify-between text-sm text-gray-500">
                    <span>Shipping charged</span>
                    <strong class="text-gray-900">{{ formatCurrency(selectedShippingFee) }}</strong>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-gray-700">Estimated total</span>
                    <strong class="text-base font-black text-gray-900">
                      {{ formatCurrency(selectedOrderTotal) }}
                    </strong>
                  </div>
                </div>
              </div>

              <p class="mt-4 text-center text-xs leading-5 text-gray-400">
                Preview updates instantly as you adjust the rates.
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
                <i class="ri-lightbulb-flash-line text-xl" aria-hidden="true"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-900">
                  Good to know
                </h3>
                <ul class="mt-3 space-y-2 text-sm leading-6 text-gray-500">
                  <li class="flex items-start gap-2">
                    <i class="ri-check-line mt-1 text-green-600"></i>
                    Delivery fees are skipped when a cart contains an item that
                    cannot be shipped.
                  </li>
                  <li class="flex items-start gap-2">
                    <i class="ri-check-line mt-1 text-green-600"></i>
                    A $0 pickup fee appears as FREE in checkout and invoices.
                  </li>
                  <li class="flex items-start gap-2">
                    <i class="ri-check-line mt-1 text-green-600"></i>
                    Saved rates apply to new checkout calculations immediately.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </aside>
      </form>
    </main>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import BreadCrumbs from '~/components/BreadCrumbs.vue';
import BaseHeader from '~/components/base/BaseHeader';
import Tiptap from '~/components/Wysiwyg/Tiptap';
import aosMixin from '~/mixins/aos';

export default {
  name: 'shipping',
  components: {
    BaseHeader,
    BreadCrumbs,
    Tiptap,
  },
  mixins: [aosMixin],
  data() {
    return {
      deliveryNote: '',
      pickupNote: '',
      deliveryCharge: 0,
      pickupCharge: 0,
      pickupFeeEnabled: true,
      shippingType: 'delivery',
      isLoading: true,
      isSaving: false,
      loadError: '',
      previewSubtotal: 40,
      savedSettings: {
        deliveryNote: '',
        pickupNote: '',
        deliveryCharge: 0,
        pickupCharge: 0,
      },
    };
  },
  computed: {
    deliveryRate() {
      return this.toDollarAmount(this.deliveryCharge);
    },
    pickupRate() {
      return this.pickupFeeEnabled
        ? this.toDollarAmount(this.pickupCharge)
        : 0;
    },
    selectedShippingFee() {
      return this.shippingType === 'pickup'
        ? this.pickupRate
        : this.deliveryRate;
    },
    selectedOrderTotal() {
      return this.previewSubtotal + this.selectedShippingFee;
    },
    currentSettings() {
      return {
        deliveryNote: this.deliveryNote || '',
        pickupNote: this.pickupNote || '',
        deliveryCharge: this.toCents(this.deliveryCharge),
        pickupCharge: this.pickupFeeEnabled
          ? this.toCents(this.pickupCharge)
          : 0,
      };
    },
    hasChanges() {
      return JSON.stringify(this.currentSettings) !== JSON.stringify(this.savedSettings);
    },
  },
  watch: {
    pickupFeeEnabled(enabled) {
      if (!enabled) {
        this.pickupCharge = 0;
      }
    },
  },
  mounted() {
    this.retrieveShippingSettings();
  },
  methods: {
    async retrieveShippingSettings(showLoading = true) {
      if (showLoading) {
        this.isLoading = true;
        this.loadError = '';
      }

      try {
        const response = await this.$axios.$get('/v1/orders/shipping-settings');
        const options = response.data?.options || {};
        const charges = response.data?.charges || {};
        const deliveryCents = Number(
          charges.delivery ?? options.delivery_charge ?? 0
        );
        const pickupCents = Number(
          charges.pickup ?? options.pickup_charge ?? 0
        );

        this.deliveryNote = options.delivery_note || '';
        this.pickupNote = options.pickup_note || '';
        this.deliveryCharge = deliveryCents / 100;
        this.pickupCharge = pickupCents / 100;
        this.pickupFeeEnabled = pickupCents > 0;
        this.saveSettingsSnapshot();
      } catch (error) {
        const message =
          error.response?.data?.message ||
          'Unable to load shipping settings.';

        if (showLoading) {
          this.loadError = message;
        } else {
          this.showNotification(message, 'danger');
        }
      } finally {
        if (showLoading) {
          this.isLoading = false;
        }
      }
    },

    async editShippingNotes() {
      if (!this.isFormValid()) {
        this.showNotification(
          'Shipping charges must be zero or greater.',
          'danger'
        );
        return;
      }

      this.isSaving = true;

      try {
        const response = await this.$axios.$patch(
          'v1/orders/shipping-settings',
          {
            delivery_note: this.deliveryNote || '',
            pickup_note: this.pickupNote || '',
            delivery_charge: this.toCents(this.deliveryCharge),
            pickup_charge: this.pickupFeeEnabled
              ? this.toCents(this.pickupCharge)
              : 0,
          }
        );

        await this.retrieveShippingSettings(false);
        this.showNotification(
          response.title || 'Shipping settings updated.',
          'success'
        );
      } catch (error) {
        this.showNotification(
          error.response?.data?.message ||
            'Unable to update shipping settings.',
          'danger'
        );
      } finally {
        this.isSaving = false;
      }
    },

    saveSettingsSnapshot() {
      this.savedSettings = {
        deliveryNote: this.deliveryNote || '',
        pickupNote: this.pickupNote || '',
        deliveryCharge: this.toCents(this.deliveryCharge),
        pickupCharge: this.toCents(this.pickupCharge),
      };
    },

    resetChanges() {
      this.deliveryNote = this.savedSettings.deliveryNote;
      this.pickupNote = this.savedSettings.pickupNote;
      this.deliveryCharge = this.savedSettings.deliveryCharge / 100;
      this.pickupCharge = this.savedSettings.pickupCharge / 100;
      this.pickupFeeEnabled = this.savedSettings.pickupCharge > 0;
    },

    isFormValid() {
      return (
        this.isValidAmount(this.deliveryCharge) &&
        (!this.pickupFeeEnabled || this.isValidAmount(this.pickupCharge))
      );
    },

    isValidAmount(value) {
      if (value === '' || value === null || typeof value === 'undefined') {
        return false;
      }

      const amount = Number(value);
      return Number.isFinite(amount) && amount >= 0;
    },

    toCents(value) {
      const amount = Number(value);
      return Number.isFinite(amount) && amount >= 0
        ? Math.round(amount * 100)
        : 0;
    },

    toDollarAmount(value) {
      const amount = Number(value);
      return Number.isFinite(amount) && amount >= 0 ? amount : 0;
    },

    formatCurrency(value) {
      return `$${this.toDollarAmount(value).toFixed(2)}`;
    },

    showNotification(message, variant) {
      this.$oruga.notification.open({
        message,
        variant,
        duration: 5000,
        position: 'bottom',
        queue: true,
      });
    },
  },
};
</script>

<style scoped>
.shipping-switch ::v-deep .v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}

.shipping-switch ::v-deep .v-input__slot {
  margin-bottom: 0;
}
</style>
