<template>
  <form
    class="mb-5 w-full rounded border
    border-gray-200 bg-white p-4 shadow-sm lg:p-6"
    @submit.prevent="submit"
  >
    <h2 class="mb-5 text-xl font-semibold">
      Information
    </h2>

    <div class="grid gap-x-3 lg:grid-cols-2">
      <div class="mb-4">
        <label class="mb-1 block"> Coaches Name* </label>
        <input
          v-model="coach.name"
          name="coachesname"
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
          placeholder="Coaches Name"
          required
        />
      </div>

      <div class="mb-4">
        <label class="mb-1 block"> Coaches Email* </label>
        <input
          v-model="coach.email"
          name="coachesemail"
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
          placeholder="Coaches Email"
          required
        />
      </div>
    </div>

    <div class="grid gap-x-3 lg:grid-cols-2">
      <div class="mb-4">
        <label class="mb-1 block"> Coaches Number* </label>
        <div class="flex w-full">
          <input
            v-model="phoneCode"
            name="phoneCode"
            class="
              w-24
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
            v-model="coach.phoneDigits"
            name="coachesPhoneDigits"
            class="
              flex-1
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
        <label class="mb-1 block"> Team Name* </label>
        <input
          v-model="teamName"
          name="teamName"
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
          placeholder="Team Name"
          required
        />
      </div>
    </div>

    <hr class="my-4" />

    <div class="grid gap-x-3 lg:grid-cols-2">
      <div class="mb-4">
        <label class="mb-1 block"> Manager Name* </label>
        <input
          v-model="manager.name"
          name="managername"
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
          placeholder="Manager Name"
          required
        />
      </div>

      <div class="mb-4">
        <label class="mb-1 block"> Manager Email* </label>
        <input
          v-model="manager.email"
          name="manageremail"
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
          placeholder="Manager Email"
          required
        />
      </div>
    </div>

    <div class="grid gap-x-3 lg:grid-cols-2">
      <div class="mb-4">
        <label class="mb-1 block"> Manager Number* </label>
        <div class="flex w-full">
          <input
            v-model="phoneCode"
            name="phoneCode"
            class="
              w-24
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
            v-model="manager.phoneDigits"
            name="managerPhoneDigits"
            class="
              flex-1
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
        <label class="mb-1 block"> Age Group* </label>
          <div class="relative">
            <select
              v-model="ageGroup"
              name="agegroup"
              class="
              w-full appearance-none border
              border-gray-200 bg-gray-100
              py-2 px-3 hover:border-gray-400
              focus:border-gray-400 focus:outline-none"
              required
            >
              <option :value="null" disabled hidden>
                Age Group
              </option>
              <option
                v-for="group in agegroup"
                :key="group.id" :value="group.id"
              >
                {{ group.name }}
              </option>
            </select>
            <div
              v-if="!ageGroup"
              class="
              absolute inset-y-0 left-0
              flex items-center pl-3
              pointer-events-none text-gray-500"
            >
              Age Group
            </div>
        </div>
      </div>
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
          I agree with
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
        class="w-24 cursor-pointer bg-brand-black py-2 text-white"
        :disabled="isLoading"
      >
        <span v-if="!isLoading">
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

    <Modal :show="showTermsModal" @close="showTermsModal = false">
      <template #header>
        <h3>
          Terms and Conditions
        </h3>
      </template>
      <template #body>
        <TermsSection />
      </template>
    </Modal>
  </form>
</template>

<script>
import Modal from '~/components/Modal';
import TermsSection from '~/components/TermsSection';

export default {
  components: {
    Modal,
    TermsSection,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      coach: {
        name: '',
        email: '',
        phoneDigits: '',
      },
      manager: {
        name: '',
        email: '',
        phoneDigits: '',
      },
      teamName: '',
      ageGroup: '',
      agegroup: [],
      phoneCode: '+61',
      hasAgreedToTerms: false,
      showTermsModal: false,
    }
  },
  computed: {
    coachesPhoneNumber: {
      get() {
        return `${this.phoneCode}${this.coach.phoneDigits}`
      },
    },
    managerPhoneNumber: {
      get() {
        return `${this.phoneCode}${this.manager.phoneDigits}`
      },
    },
  },
  created() {
    this.retrieveAgeGroups();
  },
  methods: {
    submit() {
      this.$emit('submit', {
        coachesName: this.coach.name,
        coachesEmail: this.coach.email,
        coachesPhoneNumber: this.coachesPhoneNumber,
        managerName: this.manager.name,
        managerEmail: this.manager.email,
        managerPhoneNumber: this.managerPhoneNumber,
        teamName: this.teamName,
        ageGroup: this.ageGroup
      })

      return false
    },
    retrieveAgeGroups() {
      const query = {
        q: this.query,
        page: this.page,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/agegroups?${queryString}`)
        .then((response) => {
          this.agegroup = response.data.ageGroups;
        })
    },
  }
}
</script>
