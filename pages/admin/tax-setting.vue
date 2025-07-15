<template>
  <div class="bg-[#1A1A1B] h-full">
    <!-- Header -->
    <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black shadow-md">
      <!-- Breadcrumbs and Title -->
      <BreadCrumbs title="Tax Setting"/>
    </BaseHeader>

    <!-- Main Content -->
    <section class="container mx-auto max-w-screen-lg px-4 py-10">
      <article
      class="
      mx-auto w-full
      rounded-lg border
      border-gray-200
      bg-white p-6
      shadow-lg md:p-8"
      >
        <form @submit.prevent="proceed">
          <!-- Option 1: Add Tax -->
          <div class="mb-8 rounded-md border border-gray-100 bg-gray-50 p-5">
            <div class="flex flex-col gap-4">
              <div class="flex items-center">
                <VSwitch v-model="toggleControl1" color="green" @change="toggleControl2 = false" />
                <label class="ml-3 text-xl font-semibold text-gray-700">Add Tax of:</label>
              </div>

              <div class="flex flex-wrap items-center gap-4">
                <input
                  v-model.number="addTaxOnCartPrice"
                  type="number"
                  name="addTaxOnCartPrice"
                  class="
                    form-input
                    w-32 appearance-none
                    rounded-md border border-gray-200
                    bg-gray-100
                    p-3 text-xl
                    transition
                    focus:border-green-500 focus:outline-none
                    disabled:cursor-not-allowed disabled:bg-gray-300
                  "
                  :disabled="!toggleControl1"
                  step=".01"
                  min="0"
                />
                <span class="text-lg text-gray-600">on top of prices in cart stage.</span>
              </div>
            </div>
          </div>

          <!-- Option 2: Show Inclusive Tax -->
          <div class="mb-8 rounded-md border border-gray-100 bg-gray-50 p-5">
            <div class="flex flex-col gap-4">
              <div class="flex items-center">
                <VSwitch
                v-model="toggleControl2"
                color="green"
                @change="toggleControl1 = false"
                />
                <label
                class="
                ml-3 text-xl
                font-semibold
                text-gray-700"
                >
                Show inclusive tax amount of:
                </label>
              </div>

              <div class="flex flex-wrap items-center gap-4">
                <input
                  v-model.number="includeTaxOnCartPrice"
                  type="number"
                  name="includeTaxOnCartPrice"
                  class="
                    form-input
                    w-32 appearance-none
                    rounded-md border border-gray-200
                    bg-gray-100
                    p-3 text-xl
                    transition
                    focus:border-green-500 focus:outline-none
                    disabled:cursor-not-allowed disabled:bg-gray-300
                  "
                  :disabled="!toggleControl2"
                  step=".01"
                  min="0"
                  @keydown="handleDecimal"
                />
                <span class="text-lg text-gray-600">in cart stage.</span>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
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
            Apply Changes
          </button>

          <!-- Back Link -->
          <p class="mt-6 text-center text-sm font-medium text-gray-500">
            <NuxtLink
              to="/admin"
              class="
              inline-flex items-center
              font-semibold
              text-brand-black
              hover:text-black"
            >
              <i class="ri-arrow-left-line mr-2"></i>
              Back to Admin panel
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
  name: 'tax-setting',
  components: { BreadCrumbs },
  data() {
    return {
      addTaxOnCartPrice: 0,
      includeTaxOnCartPrice: 0
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
  mounted() {
    const { tax } = this.$store.state.cart;
    this.addTaxOnCartPrice = tax;
    this.retrieveToggleControl();
    setTimeout(() => {
      this.retrieveControlValues();
    }, 1000);
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
    saveControl1() {
      this.$store.commit('master/setToggleControl1', this.toggleControl1)
    },
    saveControl2() {
      this.$store.commit('master/setToggleControl2', this.toggleControl2)
    },
    retrieveControlValues() {
      const id = 1;
      this.$axios
        .$get(`v1/tax/${id}`)
        .then((response) => {
          this.addTaxOnCartPrice = response.me.addTaxValue
          this.includeTaxOnCartPrice = response.me.includeTaxValue
          if (!this.toggleControl1 && !this.toggleControl2) {
            this.$store.commit('cart/setTax', 0)
          } else {
            this.$store.commit('cart/setTax', this.addTaxOnCartPrice)
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
    },
    updateToggleControl() {
      this.saveControl1()
      this.saveControl2()
      const form = new FormData();
      form.append('_method', 'PATCH')
      form.append('toggleControl1', this.toggleControl1)
      form.append('toggleControl2', this.toggleControl2)

      const endpoint = 'v1/toogletax/1'
      this.$axios
        .$post(endpoint, form)
        .then((response) => {
          this.$oruga.notification.open({
            message: `Toggle setting: ${response.message}`,
            variant: 'success',
            duration: 5000,
            position: 'bottom'
          })
          this.retrieveToggleControl()
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
    retrieveToggleControl() {
      const id = 1;
      const endpoint = `v1/toogletax/${id}`
      this.$axios
        .$get(endpoint)
        .then((response) => {
          this.toggleControl1 = response.me.toggleControl1
          this.toggleControl2 = response.me.toggleControl2
          this.$store.commit('master/setToggleControl1', response.me.toggleControl1)
          this.$store.commit('master/setToggleControl2', response.me.toggleControl2)
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
    proceed() {
      const form = new FormData();
      form.append('_method', 'PATCH')
      form.append('addTaxValue', this.addTaxOnCartPrice)
      form.append('includeTaxValue', this.includeTaxOnCartPrice)
      const id = 1
      const endpoint = `v1/tax/${id}`
      this.$axios
        .$post(endpoint, form)
        .then((response) => {
          this.$oruga.notification.open({
            message: `Master settings: ${response.message}`,
            variant: 'success',
            duration: 5000,
            position: 'bottom'
          })
          this.retrieveControlValues()
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

      this.updateToggleControl()
    }
  }
}
</script>
