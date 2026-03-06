<template>
  <form
    class="w-full max-w-screen mx-auto border
    border-gray-100 bg-white p-6 shadow-lg transition-all
    duration-300 hover:shadow-xl lg:p-8"
    @submit.prevent="submit"
  >
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900
          flex items-center gap-2"
          >
            <i class="ri-team-line text-2xl text-emerald-600"></i>
            Team Registration
          </h2>
          <p class="mt-2 text-gray-600">
            Register your team for the upcoming tournament
          </p>
        </div>
      </div>
      
      <div class="mt-4 h-1 w-full rounded-full bg-gray-100">
        <div 
          class="h-full rounded-full bg-gradient-to-r
          from-emerald-500 to-emerald-600 transition-all duration-500"
          :style="{ width: '100%' }"
        ></div>
      </div>
    </div>

    <div class="mb-8">
      <div class="mb-6 flex items-center gap-2">
        <div class="flex h-8 w-8 items-center
        justify-center rounded-full bg-emerald-100"
        >
          <i class="ri-group-line text-emerald-600"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-900">
            Team Information
        </h3>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <!-- Coach Name -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            <span class="flex items-center gap-1">
              Team Organizer
              <span class="text-red-500">*</span>
            </span>
          </label>
          <div class="relative flex rounded-lg border border-gray-300 bg-white
          transition-all duration-200 focus-within:border-emerald-500
          focus-within:ring-2 focus-within:ring-emerald-200 hover:border-gray-400"
          >
            <i class="ri-user-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              v-model="coach.name"
              name="coachesname"
              class="w-full rounded-lg border-2 border-gray-900
              pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500
              transition-all duration-200 focus:border-emerald-500
              focus:ring-2 focus:ring-emerald-200 focus:outline-none hover:border-gray-500"
              type="text"
              placeholder="Enter full name"
              required
              :disabled="isLoading"
              @focus="handleInputFocus"
            />
            <div 
              v-if="coach.name"
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <i class="ri-check-line text-green-500"></i>
            </div>
          </div>
          <p class="text-xs text-gray-500">
            This person will receive all communications
          </p>
        </div>

        <!-- Coach Email -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            <span class="flex items-center gap-1">
              Team Email
              <span class="text-red-500">*</span>
            </span>
          </label>
          <div class="relative flex rounded-lg border border-gray-300 bg-white
          transition-all duration-200 focus-within:border-emerald-500
          focus-within:ring-2 focus-within:ring-emerald-200 hover:border-gray-400"
          >
            <i class="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              v-model="coach.email"
              name="coachesemail"
              class="w-full rounded-lg border border-gray-300
              bg-white pl-10 pr-4 py-3 text-gray-900 placeholder-gray-400
              transition-all duration-200 focus:border-emerald-500
              focus:ring-2 focus:ring-emerald-200 focus:outline-none hover:border-gray-400"
              type="email"
              placeholder="team@example.com"
              required
              :disabled="isLoading"
              @input="validateEmail"
            />
            <div 
              v-if="coach.email && isValidEmail"
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <i class="ri-check-line text-green-500"></i>
            </div>
          </div>
          <p v-if="coach.email && !isValidEmail" class="text-xs text-red-500">
            Please enter a valid email address
          </p>
        </div>
      </div>
    </div>

    <!-- Team Details Section -->
    <div class="mb-8">
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Phone Number -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            <span class="flex items-center gap-1">
              Phone Number
              <span class="text-red-500">*</span>
            </span>
          </label>
          <div class="flex rounded-lg border border-gray-300 bg-white
          transition-all duration-200 focus-within:border-emerald-500
          focus-within:ring-2 focus-within:ring-emerald-200 hover:border-gray-400"
          >
            <div class="flex items-center bg-gray-50 px-3 border-r border-gray-300">
              <span class="flex items-center gap-2 text-gray-700">
                <i class="ri-flag-line"></i>
                <span class="font-medium">{{ phoneCode }}</span>
              </span>
            </div>
            <div class="relative flex-1">
              <i class="ri-phone-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                v-model="coach.phoneDigits"
                name="coachesPhoneDigits"
                class="w-full pl-10 pr-4 py-3 bg-transparent text-gray-900
                placeholder-gray-400 focus:outline-none"
                type="tel"
                placeholder="123 456 789"
                required
                :disabled="isLoading"
                @input="formatPhoneNumber"
              />
            </div>
          </div>
          <p class="text-xs text-gray-500">
            We'll send SMS updates to this number
         </p>
        </div>

        <!-- Team Name -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            <span class="flex items-center gap-1">
              Team Name
              <span class="text-red-500">*</span>
            </span>
          </label>
          <div class="relative flex rounded-lg border border-gray-300 bg-white
          transition-all duration-200 focus-within:border-emerald-500
          focus-within:ring-2 focus-within:ring-emerald-200 hover:border-gray-400"
          >
            <i class="ri-trophy-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              v-model="teamName"
              name="teamName"
              class="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3
              text-gray-900 placeholder-gray-400 transition-all duration-200
              focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200
              focus:outline-none hover:border-gray-400"
              type="text"
              placeholder="Enter team name"
              required
              :disabled="isLoading"
            />
            <div 
              v-if="teamName"
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <i class="ri-check-line text-green-500"></i>
            </div>
          </div>
          <p v-if="teamName" class="text-xs text-gray-500">
            {{ 30 - teamName.length }} characters remaining
          </p>
        </div>
      </div>

      <!-- Age Group with Status Indicator -->
      <div class="mt-6 space-y-2">
        <label class="block text-sm font-medium text-gray-700">
          <span class="flex items-center gap-1">
            Age Group
            <span class="text-red-500">*</span>
          </span>
        </label>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="relative flex rounded-lg border border-gray-300 bg-white
          transition-all duration-200 focus-within:border-emerald-500
          focus-within:ring-2 focus-within:ring-emerald-200 hover:border-gray-400"
          >
            <i class="ri-calendar-line absolute left-3 top-1/2 z-10
            -translate-y-1/2 text-gray-400"
            ></i>
            <select
              v-model="ageGroup"
              name="agegroup"
              class="w-full appearance-none rounded-lg border border-gray-300
              bg-white pl-10 pr-10 py-3 text-gray-900 transition-all
              duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200
              focus:outline-none hover:border-gray-400"
              required
              :disabled="isLoading"
              @change="handleAgeGroupChange"
            >
              <option :value="null" disabled hidden>
                Select age group
              </option>
              <option
                v-for="group in agegroup"
                :key="group.id"
                :value="group.id"
                :disabled="isGroupFull(group.id)"
              >
                {{ group.name }}
                <template v-if="getGroupAvailability(group.id)">
                  ({{ getGroupAvailability(group.id) }} spots left)
                </template>
              </option>
            </select>
          </div>
          
          <!-- Availability Indicator -->
          <div v-if="ageGroup && selectedGroupInfo" class="rounded-lg border p-4" :class="{
            'border-green-200 bg-green-50': selectedGroupInfo.available > 0,
            'border-red-200 bg-red-50': selectedGroupInfo.available <= 0
          }">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-900">
                    {{ selectedGroupInfo.name }}
                </p>
                <p class="text-sm" :class="{
                  'text-green-700': selectedGroupInfo.available > 0,
                  'text-red-700': selectedGroupInfo.available <= 0
                }">
                  <template v-if="selectedGroupInfo.available > 0">
                    {{ selectedGroupInfo.available }} of
                    {{ selectedGroupInfo.limit }} spots available
                  </template>
                  <template v-else>
                    This group is full
                  </template>
                </p>
              </div>
              <i 
                class="text-2xl"
                :class="{
                  'ri-checkbox-circle-line text-green-500': selectedGroupInfo.available > 0,
                  'ri-close-circle-line text-red-500': selectedGroupInfo.available <= 0
                }"
              ></i>
            </div>
            
            <!-- Progress bar -->
            <div v-if="selectedGroupInfo.limit" class="mt-2">
              <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div 
                  class="h-full transition-all duration-500"
                  :class="{
                    'bg-green-500': selectedGroupInfo.available > 0,
                    'bg-red-500': selectedGroupInfo.available <= 0
                  }"
                  :style="{
                      width: `${(selectedGroupInfo.registered /
                      selectedGroupInfo.limit) * 100}%`
                    }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tournament Pool Selection -->
      <div
        v-if="seriesType.toLowerCase() === 'coast'"
        class="w-full mt-6 space-y-4 p-4"
      >
        <div class="flex items-center gap-2 px-2">
          <i class="ri-trophy-line text-brand-green"></i>
          <span class="text-xs font-bold uppercase
            tracking-widest text-gray-400"
          >
            Select Tournament Pool
          </span>
        </div>

        <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
          <label
            v-for="pool in ['A', 'B', 'C', 'D']"
            :key="pool"
            :class="[
              'relative flex cursor-pointer flex-col items-center justify-center',
              'rounded-xl border-2 py-6 transition-all duration-200 group',
              selectedPool === pool
                ? 'border-brand-black bg-brand-black text-white shadow-lg'
                : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
            ]"
          >
            <input
              v-model="selectedPool"
              type="radio"
              :value="pool"
              class="hidden"
            />
            
            <span 
              :class="[
                'text-3xl font-black italic tracking-tighter font-montserrat',
                selectedPool === pool ? 'text-brand-green' : 'text-gray-200'
              ]"
            >
              {{ pool }}
            </span>
            
            <span class="mt-1 text-[10px] font-bold uppercase tracking-widest">
              Pool {{ pool }}
            </span>

            <div 
              v-if="selectedPool === pool"
              class="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand-green"
            ></div>
          </label>
        </div>
      </div>
    </div>

    <!-- Terms and Submit Section -->
    <div class="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
      <div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <!-- Terms Agreement -->
        <div class="flex-1">
          <label class="flex cursor-pointer items-start gap-3">
            <div class="relative mt-0.5 flex rounded border border-gray-300 bg-white
            transition-all duration-200 focus-within:border-emerald-500
            focus-within:ring-2 focus-within:ring-emerald-200 hover:border-gray-400"
            >
              <input
                v-model="hasAgreedToTerms"
                type="checkbox"
                class="peer h-5 w-5 cursor-pointer rounded
                border-2 border-emerald-900 checked:border-emerald-500
                checked:bg-emerald-500 transition-all duration-200
                focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:outline-none"
                required
                :disabled="isLoading"
              />
              <i class="ri-check-line pointer-events-none absolute
              left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              text-white opacity-0 transition-opacity duration-200
              peer-checked:opacity-100"></i>
            </div>
            <div>
              <p class="text-gray-700">
                I agree to the
                <button
                  type="button"
                  class="text-emerald-600 hover:text-emerald-800 hover:underline focus:outline-none"
                  @click="showTermsModal = true"
                >
                  Terms and Conditions
                </button>
              </p>
              <p class="mt-1 text-sm text-gray-500">
                By registering, you confirm that all information provided is accurate
              </p>
            </div>
          </label>
        </div>

        <!-- Submit Button with Price -->
        <div class="flex flex-col items-end gap-3">
          <div class="text-right">
            <p class="text-sm text-gray-600">
                Registration Fee
            </p>
            <p class="text-2xl font-bold text-gray-900">
                {{ formatCurrency(price / 100) }}
            </p>
          </div>
          <button
            type="submit"
            class="relative flex items-center justify-center gap-2
            rounded-lg px-8 py-3 text-white font-medium transition-all
            duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-70"
            :class="{
              ['bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700' +
              'hover:to-emerald-800 focus:ring-emerald-200 shadow-lg hover:shadow-xl']: 
                !isLoading && !isAgeLimitReached && hasAgreedToTerms && !isAvailable,
              'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed shadow': 
                isLoading || isAgeLimitReached || !hasAgreedToTerms || isAvailable
            }"
            :disabled="isLoading || isAgeLimitReached || !hasAgreedToTerms"
          >
            <span v-if="!isLoading" class="flex items-center gap-2">
              Register Team
              <i class="ri-arrow-right-line"></i>
            </span>
            <span v-else class="flex items-center gap-2">
              <span class="h-4 w-4 animate-spin rounded-full
              border-2 border-white border-t-transparent"
              ></span>
              Processing...
            </span>
          </button>
        </div>
      </div>

      <!-- Form Status Messages -->
      <div v-if="isAgeLimitReached" class="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
        <div class="flex items-center gap-3">
          <i class="ri-error-warning-line text-xl text-red-600"></i>
          <div>
            <p class="font-medium text-red-800">
                Registration Temporarily Unavailable
            </p>
            <p class="text-sm text-red-700">
              The selected age group has reached its capacity.
              Please choose another age group or contact support.
            </p>
          </div>
        </div>
      </div>

      <div v-if="!hasAgreedToTerms" class="mt-4 text-sm text-gray-600">
        <i class="ri-information-line mr-1"></i>
        You must agree to the terms and conditions to proceed
      </div>
    </div>

    <!-- Terms Modal -->
    <Modal :show="showTermsModal" @close="showTermsModal = false">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900 flex items-center gap-2">
            <i class="ri-file-text-line"></i>
            Terms and Conditions
          </h3>
          <button
            type="button"
            @click="showTermsModal = false"
            class="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>
      </template>
      <template #body>
        <TermsSection />
      </template>
      <template #footer>
        <div class="flex justify-end gap-3">
          <button
            type="button"
            @click="showTermsModal = false"
            class="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            type="button"
            @click="agreeAndClose"
            class="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
          >
            I Agree
          </button>
        </div>
      </template>
    </Modal>
  </form>
</template>

<script>
import Modal from '~/components/Modal';
import TermsSection from '~/components/TermsSection';
import currencyMixin from '~/mixins/currency/handlesCurrency'

export default {
  components: {
    Modal,
    TermsSection,
  },
  mixins: [ currencyMixin ],
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    price: {
      type: [ String ],
      required: true
    },
    seriesType: {
      type: String,
      required: true
    }
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
      agegroup: [],
      phoneCode: '+61',
      hasAgreedToTerms: false,
      showTermsModal: false,
      teamLimit: [],
      ageGroup: '',
      teamCount: '',
      isAgeLimitReached: false,
      isValidEmail: false,
      emailTimeout: null,
      isAvailable: false,
      currentCount: null,
      remainingSlots: null,
      selectedPool: 'A'
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
    selectedGroupInfo() {
      if (!this.ageGroup || !this.teamLimit.length) return null;
      
      const limit = this.teamLimit.find(limit => 
        limit.age_groups[0] &&
        limit.age_groups[0].id === this.ageGroup
      );
      
      if (!limit) return null;
      
      return {
        name: limit.age_groups[0] && limit.age_groups[0].name || '',
        limit: limit.team_limit,
        registered: limit.teamcount || 0,
        available: Math.max(0, limit.team_limit - (limit.teamcount || 0))
      };
    }
  },
  watch: {
    'ageGroup'(newVal) {
      if (newVal) {
        this.checkTeamLimit(newVal);
      }
    },
  },
  created() {
    this.retrieveTeamLimits();
  },

  methods: {
    submit() {
      if (!this.isValidEmail) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Please enter a valid email address',
          position: 'bottom',
          variant: 'warning',
          queue: true,
        });
        return false;
      }

      const idEmpotencyKey = `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      this.$emit('submit', {
        coachesName: this.coach.name,
        coachesEmail: this.coach.email,
        coachesPhoneNumber: this.coachesPhoneNumber,
        managerName: this.manager.name,
        managerEmail: this.manager.email,
        managerPhoneNumber: this.managerPhoneNumber,
        teamName: this.teamName,
        ageGroup: this.ageGroup,
        price: this.price,
        pool: this.selectedPool,
        idEmpotencyKey
      });

      return false;
    },
    
    validateEmail() {
      clearTimeout(this.emailTimeout);
      
      if (!this.coach.email) {
        this.isValidEmail = false;
        return;
      }
      
      this.emailTimeout = setTimeout(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.isValidEmail = emailRegex.test(this.coach.email);
      }, 500);
    },
    
    formatPhoneNumber() {
      let digits = this.coach.phoneDigits.replace(/\D/g, '');
      
      if (digits.length > 3) {
        digits = `${digits.slice(0, 3)} ${digits.slice(3, 9)}`;
      }
      
      this.coach.phoneDigits = digits;
    },
    
    handleInputFocus(event) {
      if (event.target.select) {
        event.target.select();
      }
    },
    
    handleAgeGroupChange() {
      this.$oruga.notification.open({
        duration: 3000,
        message: `Age group selected: ${this.selectedGroupInfo && this.selectedGroupInfo.name}`,
        position: 'bottom',
        variant: 'info',
        queue: true,
      });
    },
    
    checkTeamLimit(agegroupid) {
      const teamLimit = this.teamLimit.find(limit => 
        limit.age_groups[0] && limit.age_groups[0].id === agegroupid
      );
      
      if (teamLimit) {
        this.teamCount = teamLimit.team_limit;
        if (teamLimit.teamcount >= teamLimit.team_limit) {
          this.isAgeLimitReached = true;
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Team limit reached for this age group.',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        } else {
          this.isAgeLimitReached = false;
        }
      } else {
        this.teamCount = null;
      }
    },
    
    isGroupFull(groupId) {
      const limit = this.teamLimit.find(limit => 
        limit.age_groups[0] && limit.age_groups[0].id === groupId
      );
      return limit && limit.teamcount >= limit.team_limit;
    },
    
    getGroupAvailability(groupId) {
      const limit = this.teamLimit.find(limit => 
        limit.age_groups[0] && limit.age_groups[0].id === groupId
      );
      if (limit) {
        return Math.max(0, limit.team_limit - limit.teamcount);
      }
      return null;
    },
    
    agreeAndClose() {
      this.hasAgreedToTerms = true;
      this.showTermsModal = false;
    },
    
    retrieveTeamLimits() {
      const seriesid = this.$route.query.id;
      this.$axios
        .$get(`v1/teamlimit/${seriesid}`)
        .then((response) => {
          this.teamLimit = response.data;

          this.agegroup = response.data
            .filter(limit => limit.is_selected === 1)
            .map(limit => limit.age_groups)
            .flat();
        })
        .catch((error) => {
          console.error('Failed to retrieve team limits:', error);
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Failed to load team availability',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        });
    },
  },
  
  beforeDestroy() {
    clearTimeout(this.emailTimeout);
  }
}
</script>

<style scoped>
[type='checkbox']:checked:focus {
    background-color: #10b981;
}
</style>