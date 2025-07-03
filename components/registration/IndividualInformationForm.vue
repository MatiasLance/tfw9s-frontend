<template>
  <form
    class="mb-5 w-full rounded border
    border-gray-200 bg-white p-4 shadow-sm lg:p-6"
    @submit.prevent="submit"
  >
    <h2 class="mb-5 text-xl font-semibold">
      Information
    </h2>

        <hr class="my-4" />

    <div class="grid gap-x-3 lg:grid-cols-2">
      <div class="mb-4">
        <label class="mb-1 block"> Team Name </label>
          <div class="relative">
            <select
              v-model="player.teamName"
              name="teams"
              class="
              w-full appearance-none border
              border-gray-200 bg-gray-100
              px-3 py-2 hover:border-gray-400
              focus:border-gray-400 focus:outline-none"
              disabled
              required
            >
              <option :value="null" disabled hidden>
                Player Team Name
              </option>
              <option
                v-for="team in teams"
                :key="team.id" :value="team.id"
              >
                {{ team.name }}
              </option>
            </select>
            <div
              v-if="!player.teamName"
              class="
              pointer-events-none absolute inset-y-0
              left-0 flex items-center
              pl-3 text-gray-500
              "
            >
              Team Name
            </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="mb-1 block"> Age Group </label>
          <div class="relative">
            <select
              v-model="player.ageGroup"
              name="agegroup"
              class="
              w-full appearance-none border
              border-gray-200 bg-gray-100
              px-3 py-2 hover:border-gray-400
              focus:border-gray-400 focus:outline-none"
              disabled
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
              pointer-events-none absolute inset-y-0
              left-0 flex items-center
              pl-3 text-gray-500
              "
            >
              Age Group
            </div>
        </div>
      </div>
    </div>

    <hr class="my-4" />

    <div class="grid gap-x-3 lg:grid-cols-2">
      <div class="mb-4">
        <label class="mb-1 block"> Parent Name* </label>
        <input
          v-model="contact.firstName"
          name="contactfirstname"
          class="
            w-full
            appearance-none
            border border-gray-200
            bg-gray-100
            px-3
            py-2
            hover:border-gray-400
            focus:border-gray-400 focus:outline-none
          "
          type="text"
          placeholder="Contact First Name"
          required
        />
      </div>

      <div class="mb-4">
        <label class="mb-1 block"> Parent Name* </label>
        <input
          v-model="contact.lastName"
          name="contactlastname"
          class="
            w-full
            appearance-none
            border border-gray-200
            bg-gray-100
            px-3
            py-2
            hover:border-gray-400
            focus:border-gray-400 focus:outline-none
          "
          type="text"
          placeholder="Contact Last Name"
          required
        />
      </div>

      <div class="mb-4">
        <label class="mb-1 block"> Parent Phone Numbers* </label>
        <div class="flex w-full">
          <input
            v-model="phoneCode"
            name="phoneCode"
            class="
              w-1/6
              appearance-none
              border border-gray-200
              bg-gray-100
              px-3
              py-2
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
              px-3
              py-2
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
        <label class="mb-1 block"> Parent Email* </label>
        <input
          v-model="contact.email"
          name="email"
          class="
            w-full
            appearance-none
            border border-gray-200
            bg-gray-100
            px-3
            py-2
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
            px-3
            py-2
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
            px-3
            py-2
            hover:border-gray-400
            focus:border-gray-400 focus:outline-none
          "
          type="text"
          placeholder="Player Last Name"
          required
        />
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
            px-3
            py-2
            hover:border-gray-400
            focus:border-gray-400 focus:outline-none
          "
          type="date"
          placeholder="Date of Birth"
          required
        />
      </div>
    </div>

    <div class="flex">
      <div
      v-if="cropping"
      class="flex size-[320px] items-center justify-center
      overflow-hidden border-[3px] border-sky-500"
      >
        <VProgressCircular
        size="80"
        width="8"
        indeterminate
        color="green"
        />
      </div>
      <div
      v-else-if="base64IMG"
      class="relative size-[320px] overflow-hidden border-[3px] border-sky-500"
      >
        <img
        class="size-full object-cover"
        :src="base64IMG"
        />
        <button
          type="button"
          class="group absolute right-0 top-0 rounded-bl-md border-2
          border-b border-gray-400 bg-white px-3 text-base
          text-gray-500 drop-shadow-xl transition hover:bg-gray-200"
          @click="base64IMG = ''"
        >
          <i
          class="ri-close-fill font-semibold transition-all
          group-hover:scale-125"
          />
        </button>
      </div>
      <ImageCropper
      v-else
      :width="320"
      :height="320"
      @upload="handleUpload"
      />
    </div>

    <div class="flex w-full flex-wrap items-center justify-between gap-x-2">

      <label class="my-4 mr-0 flex w-max items-center sm:mr-4 md:mr-8">
        <input
          v-model="hasAgreedToTerms"
          type="checkbox"
          class="
            text-brand-black
            mr-2
            size-4
            cursor-pointer
            rounded-full
            border-[3px] border-gray-300
            bg-gray-400
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
        class="w-24 cursor-pointer py-2 text-white"
          :class="{
          'bg-brand-black': !isLoading && !isPlayerLimitReached,
          'bg-gray-400': isLoading || isPlayerLimitReached
        }"
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
import ImageCropper from '../ImageCropper.vue';
import Modal from '~/components/Modal';
import TermsSection from '~/components/TermsSection';


export default {
  components: {
    Modal,
    TermsSection,
    ImageCropper,
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
        discountCodeId: null
      },
      agegroup: [],
      teams: [],
      phoneCode: '+61',
      hasAgreedToTerms: false,
      showTermsModal: false,
      photo: null,
      series: [],
      team: [],
      isPlayerLimitReached: false,
      cropping: false,
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
    base64IMG: {
      get() {
        return this.$store.state.registration.base64IMG;
      },
      set(v) {
        this.$store.commit('registration/setBase64IMG', v);
      },
    },
  },
  created() {
    this.retrieveAgeGroups();
    this.retrieveTeams();
  },
  mounted() {
    const token = this.$route.query.token

    if (token) {
      this.retrieveTokenData(token)
    }
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
        photo: this.photo,
        discountCodeId: this.player.discountCodeId
      })

      return false
    },
    handleUpload(image) {
      this.cropping = true;
      try {
        if (image && image instanceof Blob) {
          const reader = new FileReader();

          reader.onloadend = () => {
            const img = new Image();

            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              const targetWidth = 500;
              const targetHeight = 500;

              canvas.width = targetWidth;
              canvas.height = targetHeight;

              ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

              const base64Url = canvas.toDataURL('image/jpeg', 0.8);

              this.base64IMG = base64Url;
              this.cropping = false; // ✅ Set false after processing
            };

            img.onerror = () => {
              console.error('Error loading image into canvas');
              this.cropping = false; // ✅ Also handle error case
            };

            img.src = reader.result;
          };

          reader.onerror = () => {
            console.error('Error reading image as base64');
            this.cropping = false; // ✅ Reader failed
          };

          reader.readAsDataURL(image);
        } else {
          console.error('Invalid image file');
          this.cropping = false;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        this.cropping = false;
      }
    },
    handleFileChange(event) {
      const files = event.target.files;
      if (files && files.length > 0) {
        this.$emit('update-image', Array.from(files));
      } else {
        this.$emit('update-image', []);
      }
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
    retrieveTokenData(key) {
      this.$axios
        .$get(`v1/series/token/${key}`)
        .then((response) => {
          this.series = response.data.series || [];;
          this.team = response.data.team || [];

          const registered = this.team.registered_players_count || 0;
          const limit = this.team.player_limit || 0;
          
          this.isPlayerLimitReached = registered >= limit

          if (this.isPlayerLimitReached) {
            this.$oruga.notification.open({
              duration: 5000,
              message: 'Player Registration Limit Reached',
              position: 'bottom',
              variant: 'info',
              queue: true,
            });
          }

          this.player.teamName = this.team.id
          this.player.ageGroup = this.team.agegroup_id
          this.player.discountCodeId = this.team.discount_codes_id
        })
    },
  }
}
</script>