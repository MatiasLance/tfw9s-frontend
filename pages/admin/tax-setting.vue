<template>
  <div class="min-h-screen w-screen bg-gradient-to-br
  from-gray-900 via-gray-800 to-gray-900 transition">
    <!-- Header -->
     <BaseHeader
      class="mx-auto max-w-full gap-4 relative overflow-hidden
      bg-gradient-to-br from-green-900 via-green-700 to-gray-900
      lg:px-8"
    >

    <!-- Animated Rugby Field Background -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-1/4 left-0 w-full h-1 bg-white/30 
                    animate-pulse"></div>
        <div class="absolute top-1/2 left-0 w-full h-1 bg-white/40 
                    animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-3/4 left-0 w-full h-1 bg-white/30 
                    animate-pulse" style="animation-delay: 2s;"></div>
      </div>
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
              <div class="flex flex-wrap items-center gap-4">
                <label class="ml-3 text-xl font-semibold text-gray-700">Add Tax of:</label>
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
                  step=".01"
                  min="0"
                  @keydown="handleDecimal"
                />
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
                />
                <label
                class="
                ml-3 text-xl
                font-semibold
                text-gray-700"
                >
                Show {{ toggleControl2 ? 'inclusive' : 'exclusive' }} tax in cart stage.
                </label>
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
      taxID: null,
      toggleTaxControllID: null
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
          this.$store.commit('cart/setTax', this.addTaxValue)
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
      }
    }
  }
}
</script>
