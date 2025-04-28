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
        <label class="mb-1 block"> Parent's First Name* </label>
        <input
          v-model="contact.firstName"
          name="contactfirstname"
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
          placeholder="Contact First Name"
          required
        />
      </div>

      <div class="mb-4">
        <label class="mb-1 block"> Parent's Last Name* </label>
        <input
          v-model="contact.lastName"
          name="contactlastname"
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
          placeholder="Contact Last Name"
          required
        />
      </div>
    </div>

    <div class="grid gap-x-3 lg:grid-cols-2">
      <div class="mb-4">
        <label class="mb-1 block"> Parent's Phone Number* </label>
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
            v-model="contact.phoneDigits"
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
        <label class="mb-1 block"> Parent's Email* </label>
        <input
          v-model="contact.email"
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

    <hr class="my-4" />

    <div class="grid gap-x-3 lg:grid-cols-2">
      <div class="mb-4">
        <label class="mb-1 block"> Player First Name* </label>
        <input
          v-model="player.firstName"
          name="playerfirstname"
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
          placeholder="Player First Name"
          required
        />
      </div>

      <div class="mb-4">
        <label class="mb-1 block"> Player Last Name* </label>
        <input
          v-model="player.lastName"
          name="playerlastname"
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
          placeholder="Player Last Name"
          required
        />
      </div>

      <div class="mb-4">
        <label class="mb-1 block"> Team Name* </label>
          <div class="relative">
            <select
              v-model="player.teamName"
              name="teams"
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
                v-for="team in teams"
                :key="team.id" :value="team.name"
              >
                {{ team.name }}
              </option>
            </select>
            <div
              v-if="!player.teamName"
              class="
              absolute inset-y-0 left-0
              flex items-center pl-3
              pointer-events-none text-gray-500
              "
            >
              Team Name
            </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="mb-1 block"> Date of Birth* </label>
        <input
          v-model="player.dob"
          name="dob"
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
          type="date"
          placeholder="Date of Birth"
          required
        />
      </div>

      <div class="mb-4">
        <label class="mb-1 block"> Age Group* </label>
          <div class="relative">
            <select
              v-model="player.ageGroup"
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
              v-if="!player.ageGroup"
              class="
              absolute inset-y-0 left-0
              flex items-center pl-3
              pointer-events-none text-gray-500
              "
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
    price: {
      type: [ String ],
      required: true
    },
  },
  data() {
    return {
      contact: {
        firstName: '',
        lastName: '',
        phoneDigits: '',
        email: '',
      },
      player: {
        firstName: '',
        lastName: '',
        teamName: '',
        dob: '',
        ageGroup: '',
      },
      agegroup: [],
      teams: [],
      phoneCode: '+61',
      hasAgreedToTerms: false,
      showTermsModal: false,
    }
  },
  computed: {
    phoneNumber: {
      get() {
        return `${this.phoneCode}${this.contact.phoneDigits}`
      },
    },
    formattedAgeGroup() {
      return this.agegroup.map(agegroup =>
        ({ text: agegroup.name, value: agegroup.id }));
    },
    formattedTeams() {
      return this.teams.map(teams =>
        ({ text: teams.name, value: teams.name }));
    },
  },
  created() {
    this.retrieveAgeGroups();
    this.retrieveTeams();
  },
  methods: {
    submit() {
      this.$emit('submit', {
        contactFirstName: this.contact.firstName,
        contactLastName: this.contact.lastName,
        contactPhoneNumber: this.phoneNumber,
        contactEmail: this.contact.email,
        playerFirstName: this.player.firstName,
        playerLastName: this.player.lastName,
        teamName: this.player.teamName,
        dob: this.player.dob,
        ageGroup: this.player.ageGroup,
        price: this.price,
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
    retrieveTeams() {
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
        .$get(`v1/teams?${queryString}`)
        .then((response) => {
          this.teams = response.data.teams;
        })
    },
  }
}
</script>
