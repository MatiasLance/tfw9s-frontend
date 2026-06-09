<template>
  <form
    class="mb-5 w-full rounded border
    border-gray-200 bg-white p-4 shadow-sm lg:p-6"
    @submit.prevent="submit"
  >
    <h2 class="mb-5 text-xl font-semibold">
      Shipping Information
    </h2>

    <div class="grid gap-x-3 lg:grid-cols-2">
      <div class="mb-4">
        <label class="mb-1 block"> First name* </label>
        <input
          v-model="firstName"
          name="firstname"
          class="
            w-full
            appearance-none
            border border-gray-200
            bg-gray-100
            py-2
            px-3
            hover:border-gray-400
            focus:border-gray-400 focus:outline-none
          "
          type="text"
          placeholder="First Name"
          required
        />
      </div>

      <div class="mb-4">
        <label class="mb-1 block"> Last name* </label>
        <input
          v-model="lastName"
          name="lastname"
          class="
            w-full
            appearance-none
            border border-gray-200
            bg-gray-100
            py-2
            px-3
            hover:border-gray-400
            focus:border-gray-400 focus:outline-none
          "
          type="text"
          placeholder="Last Name"
          required
        />
      </div>
    </div>

    <div class="grid gap-x-3 lg:grid-cols-2">
      <div class="mb-4">
        <label class="mb-1 block"> Phone*</label>
        <div class="flex w-full">
          <input
            v-model="phoneCode"
            name="phoneCode"
            class="
              w-1/6
              appearance-none
              border border-gray-200
              bg-gray-100
              py-2
              px-3
              hover:border-gray-400
              focus:border-gray-400 focus:outline-none
            "
            type="text"
            placeholder="Code"
            disabled
          />
          <input
            v-model="phoneDigits"
            name="phoneDigits"
            class="
              w-5/6
              appearance-none
              border border-gray-200
              bg-gray-100
              py-2
              px-3
              hover:border-gray-400
              focus:border-gray-400 focus:outline-none
            "
            type="text"
            placeholder="Phone Number"
            required
          />
        </div>
      </div>

      <div class="mb-4">
        <label class="mb-1 block"> Email* </label>
        <input
          v-model="email"
          name="email"
          class="
            w-full
            appearance-none
            border border-gray-200
            bg-gray-100
            py-2
            px-3
            hover:border-gray-400
            focus:border-gray-400 focus:outline-none
          "
          type="email"
          placeholder="Email"
          required
        />
      </div>
    </div>

    <div class="grid gap-x-6 gap-y-4 lg:grid-cols-2 mb-[20px]">
      <label
        class="
          flex items-center gap-4
          p-4
          border-2 border-gray-200 rounded-lg
          bg-white
          cursor-pointer
          hover:border-brand-green hover:shadow-md
          transition-all duration-200
          focus-within:border-brand-green focus-within:shadow-md
        "
        :class="{ 'border-brand-green shadow-md': shipOption === 'delivery' }"
      >
        <div
          class="
            flex-shrink-0 w-5 h-5
            border-2 border-gray-400 rounded-full
            flex items-center justify-center
            transition-colors duration-200
          "
          :class="{
            'border-brand-green': shipOption === 'delivery',
            'bg-brand-green': shipOption === 'delivery'
          }"
        >
          <div
            v-if="shipOption === 'delivery'"
            class="w-2.5 h-2.5 rounded-full bg-white"
          ></div>
        </div>

        <div class="flex flex-col">
          <span class="font-semibold text-gray-800">Ship To My Address</span>
          <span class="text-sm text-gray-500">We'll deliver to your registered address</span>
        </div>

        <input
          v-model="shipOption"
          type="radio"
          value="delivery"
          class="sr-only"
          name="shipOption"
          aria-label="Ship to my address"
        />
      </label>

      <label
        class="
          flex items-center gap-4
          p-4
          border-2 border-gray-200 rounded-lg
          bg-white
          cursor-pointer
          hover:border-brand-green hover:shadow-md
          transition-all duration-200
          focus-within:border-brand-green focus-within:shadow-md
        "
        :class="{ 'border-brand-green shadow-md': shipOption === 'pickup' }"
      >
        <div
          class="
            flex-shrink-0 w-5 h-5
            border-2 border-gray-400 rounded-full
            flex items-center justify-center
            transition-colors duration-200
          "
          :class="{
            'border-brand-green': shipOption === 'pickup',
            'bg-brand-green': shipOption === 'pickup'
          }"
        >
          <div
            v-if="shipOption === 'pickup'"
            class="w-2.5 h-2.5 rounded-full bg-white"
          ></div>
        </div>

        <div class="flex flex-col">
          <span class="font-semibold text-gray-800">Pickup From Event</span>
          <span class="text-sm text-gray-500">Collect your order at the event venue</span>
        </div>

        <input
          v-model="shipOption"
          type="radio"
          value="pickup"
          class="sr-only"
          name="shipOption"
          aria-label="Pickup from event"
        />
      </label>
    </div>

    <div
    v-if="shipOption === 'delivery'"
    class="grid gap-x-3 md:grid-cols-3"
    >
      <div class="mb-4 md:col-span-2">
        <label class="mb-1 block">
          Address
        </label>
        <input
          v-model="address"
          name="address1"
          class="
            w-full
            appearance-none
            border border-gray-200
            bg-gray-100
            py-2
            px-3
            hover:border-gray-400
            focus:border-gray-400 focus:outline-none
          "
          type="text"
          placeholder="Address"
        />
      </div>
      <div class="mb-4 md:col-span-1">
        <label class="mb-1 block">
          Postcode
        </label>
        <input
          v-model="postCode"
          name="postcode"
          class="
            w-full
            appearance-none
            border border-gray-200
            bg-gray-100
            py-2
            px-3
            hover:border-gray-400
            focus:border-gray-400 focus:outline-none
          "
          type="text"
          placeholder="Post Code"
        />
      </div>
    </div>

    <div class="mb-4">
      <label class="mb-1 block"> Other info </label>
      <textarea
        v-model="remarks"
        name="comments"
        placeholder="Comments"
        class="
          w-full
          appearance-none
          border border-gray-200
          bg-gray-100
          py-2
          px-3
          hover:border-gray-400
          focus:border-gray-400 focus:outline-none
        "
      ></textarea>
    </div>

    <div class="flex w-full flex-wrap items-center justify-between gap-x-2">

      <label class="my-4 mr-0 flex w-max items-center sm:mr-4 md:mr-8">
        <input
          v-model="hasAgreedToTerms"
          type="checkbox"
          class="
            mr-2
            h-4
            w-4
            cursor-pointer
            rounded-full
            border-[3px] border-gray-300
            bg-gray-400
            text-brand-black
            hover:border-gray-700
            focus:border-transparent
            focus:bg-gray-200
            focus:ring-1
            focus:ring-gray-500
            focus:ring-offset-2
          "
          required
        />
        <span class="mt-1 inline-block cursor-pointer text-gray-500">
            I have read and agree to the
          <a
            class="decoration-none hover:text-brand-black hover:underline"
            href="#"
            @click="showTermsModal = true"
          >
            Terms and Conditions
          </a>
        </span>
      </label>

      <button
        type="submit"
        class="w-24 cursor-pointer bg-brand-black py-2"
        :disabled="isLoading"
      >
        <span class="text-white" v-if="!isLoading">
          Confirm
        </span>
        <span v-if="isLoading">
          <VProgressCircular
            size="20"
            width="2"
            indeterminate
            color="white"
          />
        </span>
      </button>
    </div>

    <template>
      <Modal :show="showTermsModal" @close="showTermsModal = false">
        <template #header>
          <h3>Terms and Conditions</h3>
        </template>
        <template #body>
          <TermsSection/>
        </template>
        <template #footer>
          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              @click="showTermsModal = false"
              class="group inline-flex items-center justify-center gap-2 px-5 py-2.5 
              rounded-xl text-sm font-semibold 
              bg-transparent border border-gray-500/40 
              text-gray-300 
              hover:border-gray-400 hover:text-gray-100 hover:bg-gray-700
              hover:-translate-y-0.5 
              active:translate-y-0 active:scale-[0.98] 
              focus:outline-none focus-visible:outline-none 
              focus:ring-2 focus:ring-gray-400/50 focus:ring-offset-2 focus:ring-offset-gray-800
              transition-all duration-200 ease-out"
            >
              <i class="ri-close-line text-lg transition-transform duration-200 group-hover:-translate-x-0.5"></i>
              <span>Cancel</span>
            </button>

            <button
            type="button"
            @click="acceptTerms"
            class="group inline-flex items-center justify-center gap-2 px-6 py-2.5 
            rounded-xl text-sm font-semibold 
            bg-gradient-to-b from-green-500 to-green-700 
            border border-green-400/30 
            shadow-lg shadow-green-900/30 
            text-white 
            hover:from-green-400 hover:to-green-600 
            hover:border-green-300/40 
            hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/40
            active:translate-y-0 active:shadow-md active:scale-[0.98]
            focus:outline-none focus-visible:outline-none focus:ring-0
            disabled:opacity-60 disabled:cursor-not-allowed 
            disabled:hover:translate-y-0 disabled:hover:shadow-lg disabled:hover:shadow-green-900/30
            disabled:hover:from-green-500 disabled:hover:to-green-700 disabled:hover:border-green-400/30
            transition-all duration-200 ease-out"
          >
            <i class="ri-check-line text-white text-lg transition-transform duration-200 group-hover:scale-110"></i>
            <span class="text-white">I Agree</span>
          </button>
          </div>
        </template>
      </Modal>
    </template>
  </form>
</template>

<script>
import Modal from '~/components/Modal';
import TermsSection from '~/components/TermsSection';

export default {
  components: {
    Modal,
    TermsSection
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      phoneCode: '+61',
      phoneDigits: '',
      email: '',
      address: '',
      postCode: '',
      remarks: '',
      hasAgreedToTerms: false,
      showTermsModal: false,
      shipOption: '',
    }
  },
  computed: {
    phoneNumber: {
      get() {
        return `${this.phoneCode}${this.phoneDigits}`
      },
    }
  },
  methods: {
    submit() {
      this.$emit('submit', {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        shipOption: this.shipOption,
        address: this.address,
        postCode: this.postCode,
        remarks: this.remarks
      })
    },

    acceptTerms() {
      this.hasAgreedToTerms = true
      this.showTermsModal = false
    },
  }
}
</script>

<style lang="postcss">
.shipping-option {
  @apply cursor-pointer hover:border-brand-grey hover:bg-blue-50
}

.shipping-option.disabled {
  @apply text-gray-400 cursor-not-allowed hover:border-gray-200 hover:bg-gray-50
}
</style>