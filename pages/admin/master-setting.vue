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
                    Master Controls
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
                    <div class="mr-1 mt-3">
                      <VSwitch
                      v-model="toggleMasterSetting1"
                      color="black"
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
                      name="maxShipping"
                      class="
                          form-input
                          mt-1
                          ml-4 block
                          w-32 appearance-none
                          self-center
                          border border-gray-100 bg-gray-100
                          py-2 px-3
                          text-xl hover:border-gray-400
                          focus:border-gray-400 focus:outline-none
                          disabled:cursor-not-allowed
                          disabled:bg-gray-400"
                      :disabled="!toggleMasterSetting1"
                      step=".01"
                      min="0"
                    />
                    <span class="ml-3 mb-1 mt-3 block self-center text-xl">
                        on top of the product prices in the cart.
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
                      v-model="toggleMasterSetting2"
                      color="black"
                      ></VSwitch>
                    </div>
                    <label
                    class="mb-1 block self-center
                    text-xl font-bold sm:mt-0"
                    >
                      Include Tax of:
                    </label>
                    <input
                      v-model="includeTaxOnCartPrice"
                      type="number"
                      name="freeShippingValue"
                      class="
                        form-input
                        mt-1
                        block
                        w-32
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
                      :disabled="!toggleMasterSetting2"
                      step=".01"
                      min="0"
                      @keydown="handleDecimal"
                    />
                    <span class="ml-3 mb-1 mt-3 block self-center text-xl">
                        on top of the product prices in the cart.
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
    }
}
</script>