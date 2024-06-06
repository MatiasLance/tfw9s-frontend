<template>
    <div>
      <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black">
          <div
              class="
              space-y-3
              px-6
              text-left
              sm:text-left
              lg:col-span-6 lg:mt-10
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
              <span class="font-medium">
                  <NuxtLink to="/">
                  <VBtn text color="white">Home</VBtn>
                  </NuxtLink>
                  <NuxtLink to="/admin">
                  <VBtn text color="white">Admin</VBtn>
                  </NuxtLink>
              </span>
              </span>
              <h1
                  class="flex flex-row text-3xl font-bold
                  text-white lg:text-6xl"
              >
                Master Settings
              </h1>
          </div>
      </BaseHeader>

      <section class="container mx-auto max-w-screen-lg px-4">
          <div class="mb-20 mt-10 w-full">
              <article
                  class="my-5
                  mx-auto border
                  border-gray-200
                  bg-white p-4 shadow-lg
                  md:p-7
                  lg:p-6
                  "
              >
<!-- todo: change this back to proceed when backend endpoint is ready -->
            <form @submit.prevent="proceed">
              <div class="mb-4">
                <div class="flex flex-wrap items-start justify-start gap-4">
                  <div class="flex w-full flex-col sm:flex-row">
                    <div class="mr-1 mt-3">
                      <VSwitch
                      v-model="toggleControl1"
                      color="black"
                      @change="toggleControl2 = false"
                      ></VSwitch>
                    </div>
                    <label
                    class="mb-1 mt-3 block self-center
                    text-xl font-bold sm:mt-0"
                    >
                      Add Tax of:
                    </label>
                    <input
                      v-model.number="addTaxOnCartPrice"
                      type="number"
                      name="addTaxOnCartPrice"
                      class="
                          form-input
                          mt-1
                          ml-4 block
                          w-28 appearance-none
                          self-center
                          border border-gray-100 bg-gray-100
                          py-2 px-3
                          text-xl hover:border-gray-400
                          focus:border-gray-400 focus:outline-none
                          disabled:cursor-not-allowed
                          disabled:bg-gray-400"
                      :disabled="!toggleControl1"
                      step=".01"
                      min="0"
                    />
                    <span class="ml-3 mb-1 mt-3 block self-center text-xl">
                        % on top of prices in cart stage.
                    </span>
                  </div>
                </div>
              </div>
              <div class="mb-4">
                <div class="flex flex-wrap items-start justify-start gap-4">
                  <div
                  class="flex w-full flex-col justify-start
                  space-y-2 sm:flex-row sm:space-x-2"
                  >
                    <div class="mr-1 mt-3">
                      <VSwitch
                      v-model="toggleControl2"
                      color="black"
                      @change="toggleControl1 = false"
                      ></VSwitch>
                    </div>
                    <label
                    class="mb-1 block self-center
                    text-xl font-bold sm:mt-0"
                    >
                      Show inclusive tax amount of
                    </label>
                    <input
                      v-model.number="includeTaxOnCartPrice"
                      type="number"
                      name="includeTaxOnCartPrice"
                      class="
                        form-input
                        mt-1
                        block
                        w-28
                        appearance-none
                        self-center border
                        border-gray-100 bg-gray-100
                        py-2
                        px-3 text-xl
                        hover:border-gray-400
                        focus:border-gray-400
                        focus:outline-none disabled:cursor-not-allowed
                        disabled:bg-gray-400
                      "
                      :disabled="!toggleControl2"
                      step=".01"
                      min="0"
                      @keydown="handleDecimal"
                    />
                    <span class="ml-3 mb-1 mt-3 block self-center text-xl">
                        % in cart stage.
                    </span>
                  </div>
                </div>
              </div>
              <hr class="my-4">

              <button
                type="submit"
                class="
                  my-2
                  inline-block
                  w-full
                  border border-transparent
                  bg-brand-black
                  py-3
                  px-5
                  text-center
                  font-bold
                  text-white
                  hover:bg-brand-slate
                "
              >
                Apply changes
              </button>
              <p class="mt-5 flex justify-center font-semibold">
                <NuxtLink
                  to="/admin"
                  class="
                    mx-auto
                    flex items-center
                    text-brand-slate
                    hover:text-brand-black
                    hover:underline
                    hover:decoration-brand-black
                  "
                >
                  <i class="ri-arrow-left-line mr-2"></i>
                  Back to Admin panel
                </NuxtLink>
              </p>
            </form>
              </article>
          </div>
      </section>
    </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css'

export default {
  name: 'master-setting',
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
    /*
     * TODO: uncomment this.retrieveControlValues() if backend is ready
     * this.retrieveToggleControl()
     */
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

      // todo: insert final endpoint here when backend is ready.
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
      // todo: check endpoint
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
    proceedDemo() {
      this.$oruga.notification.open({
        message: 'Work in progress',
        duration: 5000,
        variant: 'info',
        queue: true,
        position: 'bottom'
      })
      if (!this.toggleControl1 && !this.toggleControl2) {
        this.$store.commit('cart/setTax', 0)
      } else {
        this.$store.commit('cart/setTax', this.addTaxOnCartPrice)
      }
      this.$store.commit('master/setAddTaxValue', this.addTaxOnCartPrice);
      this.$store.commit('master/setIncludeTaxValue', this.includeTaxOnCartPrice);
      this.saveControl1()
      this.saveControl2()
    },
    proceed() {
      const form = new FormData();
      form.append('_method', 'PATCH')
      form.append('addTaxValue', this.addTaxOnCartPrice)
      form.append('includeTaxValue', this.includeTaxOnCartPrice)
      // todo: check endpoint in backend
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
