<template>
  <div>
    <BaseHeader class="bg-gradient-to-r from-brand-grey to-brand-black">
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
                Shipping Master Controls
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
            <form @submit.prevent="proceed">
            <div class="mb-4">
              <div class="flex flex-wrap items-start justify-start gap-4">
                <div class="flex w-full flex-col sm:flex-row">
                  <label
                    class="mb-1 mt-3 block self-center
                    text-xl font-bold sm:mt-0"
                  >
                    Max Shipping Value:
                  </label>
                  <input
                    v-model="maxShippingValue"
                    type="tel"
                    name="maxShipping"
                    class="
                        form-input
                        mt-1
                        ml-4 block
                        w-24 appearance-none
                        self-center
                        border border-gray-100 bg-gray-100
                        py-2 px-3
                        text-xl hover:border-gray-400
                        focus:border-gray-400
                        focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div class="mb-4">
              <div class="flex flex-wrap items-start justify-start gap-4">
                <div
                    class="flex w-full flex-col justify-start
                    space-y-2 sm:flex-row sm:space-x-2"
                >
                  <label
                  class="mb-1 block self-center
                  text-xl font-bold sm:mt-0"
                  >
                    Free shipping on orders over:
                  </label>
                  <input
                    v-model="freeShippingValue"
                    type="tel"
                    name="freeShippingValue"
                    class="
                        form-input
                        mt-1
                        block
                        w-24
                        appearance-none
                        self-center border
                        border-gray-100 bg-gray-100
                        py-2
                        px-3 text-xl
                        hover:border-gray-400
                        focus:border-gray-400
                        focus:outline-none
                    "
                  />
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
  name: 'shipping-master',
  data() {
    return {
      maxShippingValue: 0,
      freeShippingValue: 0
    }
  },
  mounted() {
    this.retrieveMasterShipping()
  },
  methods: {
    retrieveMasterShipping() {
      this.$axios
        .$get('v1/shipping/mastershipping/1')
        .then((response) => {
          console.log(response)
          this.maxShippingValue = response.data[0].maxshipping_value
          this.freeShippingValue = response.data[0].freeshipping_value
        })
        .catch((err) => {
          console.log(err)
        })
    },
    proceed() {
      const form = new FormData();
      form.append('_method', 'PATCH')
      form.append('maxshipping_value', this.maxShippingValue)
      form.append('freeshipping_value', this.freeShippingValue)
      this.$axios
        .$post('v1/shipping/mastershipping/1', form)
        .then((response) => {
          this.$oruga.notification.open({
            message: response.Message,
            variant: 'success',
            duration: 5000,
            position: 'bottom'
          })
          this.retrieveMasterShipping()
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