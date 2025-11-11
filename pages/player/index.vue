<template>
<div class="min-h-full bg-[#1A1A1B]">
<BaseHeader
    class="mx-auto max-w-screen-xl gap-4
    bg-gradient-to-r from-brand-green to-brand-black lg:px-8"
    >
      <div
        class="
          col-span-12
          text-center
          sm:space-y-3
          sm:text-left
          lg:col-span-6
          xl:mt-10
        "
        data-aos="fade-right"
      >
        <span
          class="
            superheadline
            flex flex-row
            items-center
            text-[1rem]
            font-normal
            text-white
          "
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white">Home</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-3xl font-bold text-white lg:text-3xl">
          Player Registration
        </h1>
      </div>
    </BaseHeader>

    <form
    @submit.prevent="handleSubmit"
    class="w-full my-24 mx-auto max-w-screen-xl bg-white rounded-lg
    shadow-md overflow-hidden"
    >
      <!-- Registration Status Badge -->
      <div class="px-6 pt-6">
        <div 
          :class="[
            'inline-flex items-center px-4 py-3 rounded-full border-2 transition-all duration-300',
            'animate-pulse-subtle shadow-lg transform hover:scale-105',
            registrationStatus.class
          ]"
        >
          <i 
            :class="registrationStatus.icon" 
            class="text-lg mr-2"
          ></i>
          <span class="text-sm font-semibold">
            {{ registrationStatus.text }}
          </span>
          <div 
            v-if="!isPlayerLimitReached"
            class="ml-2 px-2 py-1 rounded-full bg-white bg-opacity-20 text-xs font-bold"
          >
            {{ currentPlayers }}/{{ maxPlayers }}
          </div>
        </div>
      </div>

      <!-- Form Content -->
      <div class="p-6 grid grid-cols-1 gap-6">
        <!-- Team Name (Read-only) -->
        <div class="grid grid-cols-1 gap-2">
          <label for="teamName" class="text-sm font-medium text-gray-700">
            Team Name
          </label>
          <div class="relative">
            <i class="ri-team-line absolute left-3 top-1/2
            transform -translate-y-1/2 text-gray-400"
            ></i>
            <input
              id="teamName"
              v-model="form.teamName"
              type="text"
              readonly
              :class="[
                'w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm',
                'bg-gray-50 cursor-not-allowed',
                'border-gray-300 text-gray-700'
              ]"
              placeholder="Team name will be auto-populated"
            />
          </div>
          <p class="text-xs text-gray-500 flex items-center">
            <i class="ri-information-line mr-1"></i>
            Team name is automatically assigned
          </p>
        </div>

        <!-- Age Group (Read-only) -->
        <div class="grid grid-cols-1 gap-2">
          <label for="ageGroup" class="text-sm font-medium text-gray-700">
            Age Group
          </label>
          <div class="relative">
            <i class="ri-user-star-line absolute left-3 top-1/2
            transform -translate-y-1/2 text-gray-400"
            ></i>
            <input
              id="ageGroup"
              v-model="form.ageGroup"
              type="text"
              readonly
              :class="[
                'w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm',
                'bg-gray-50 cursor-not-allowed',
                'border-gray-300 text-gray-700'
              ]"
              placeholder="Age group will be auto-populated"
            />
          </div>
          <p class="text-xs text-gray-500 flex items-center">
            <i class="ri-information-line mr-1"></i>
            Age group is automatically determined
          </p>
        </div>

        <!-- Player Information Section -->
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i class="ri-user-3-line mr-2 text-blue-500"></i>
            Player Information
          </h3>
          
          <!-- First Name -->
          <div class="grid grid-cols-1 gap-2">
            <label for="firstName" class="text-sm font-medium text-gray-700">
              First Name *
            </label>
            <div class="relative">
              <i class="ri-user-3-line absolute left-3 top-1/2
              transform -translate-y-1/2 text-gray-400"
              ></i>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                :class="[
                  'w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  'focus:border-transparent transition-all',
                  errors.firstName ? 'border-red-500 bg-red-50' :
                  'border-gray-300 hover:border-gray-400'
                ]"
                placeholder="Enter first name"
                @blur="validateField('firstName')"
              />
            </div>
            <p v-if="errors.firstName" class="text-sm text-red-600 flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.firstName }}
            </p>
          </div>

          <!-- Last Name -->
          <div class="grid grid-cols-1 gap-2">
            <label for="lastName" class="text-sm font-medium text-gray-700">
              Last Name *
            </label>
            <div class="relative">
              <i class="ri-user-3-line absolute left-3 top-1/2
              transform -translate-y-1/2 text-gray-400"
              ></i>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                :class="[
                  'w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm focus:outline-none',
                  'focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                  errors.lastName ? 'border-red-500 bg-red-50' :
                  'border-gray-300 hover:border-gray-400'
                ]"
                placeholder="Enter last name"
                @blur="validateField('lastName')"
              />
            </div>
            <p v-if="errors.lastName" class="text-sm text-red-600 flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.lastName }}
            </p>
          </div>

          <!-- Date of Birth -->
          <div class="grid grid-cols-1 gap-2">
            <label for="dateOfBirth" class="text-sm font-medium text-gray-700">
              Date of Birth *
            </label>
            <div class="relative">
              <i class="ri-calendar-line absolute left-3 top-1/2
              transform -translate-y-1/2 text-gray-400"
              ></i>
              <input
                id="dateOfBirth"
                v-model="form.dateOfBirth"
                type="date"
                required
                :class="[
                  'w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm focus:outline-none',
                  'focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                  errors.dateOfBirth ? 'border-red-500 bg-red-50' :
                  'border-gray-300 hover:border-gray-400'
                ]"
                @blur="validateField('dateOfBirth')"
              />
            </div>
            <p v-if="errors.dateOfBirth" class="text-sm text-red-600 flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.dateOfBirth }}
            </p>
          </div>

          <!-- Photo Upload -->
          <div class="grid grid-cols-1 gap-2">
            <label for="photo" class="text-sm font-medium text-gray-700">
              Player Photo
            </label>
            
            <!-- File Input (hidden) -->
            <input
              id="photo"
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileSelect"
            />
            
            <!-- Custom Upload Area -->
            <div
              @click="$refs.fileInput.click()"
              @drop="handleFileDrop"
              @dragover.prevent
              @dragenter="dragOver = true"
              @dragleave="dragOver = false"
              :class="[
                'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer',
                'transition-all grid place-items-center',
                dragOver ? 'border-blue-400 bg-blue-50' :
                'border-gray-300 hover:border-gray-400',
                errors.photo ? 'border-red-500 bg-red-50' : ''
              ]"
            >
              <div v-if="!form.photo" class="grid grid-cols-1 gap-2 place-items-center">
                <i class="ri-image-add-line text-3xl text-gray-400"></i>
                <div class="grid grid-cols-1 gap-1">
                  <p class="text-sm text-gray-600">
                    <span class="text-blue-600 hover:text-blue-500 font-medium">
                      Click to upload
                    </span>
                    or drag and drop
                  </p>
                  <p class="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>
              
              <!-- Preview -->
              <div v-else class="grid grid-cols-1 gap-3 place-items-center">
                <div class="relative">
                  <img :src="photoPreview" alt="Preview"
                  class="h-50 w-50 object-cover rounded-lg border-2 border-gray-200"
                  >
                  <button
                    type="button"
                    @click.stop="removePhoto"
                    class="absolute w-[25px] h-[25px] -top-[10px] -right-[12px]
                    rounded-md bg-red-600"
                  >
                    <i class="ri-close-line text-sm text-white"></i>
                  </button>
                </div>
                <p class="text-sm text-gray-600
                truncate max-w-full text-center"
                >
                  {{ form.photo.name }}
                </p>
                <button
                  type="button"
                  @click.stop="removePhoto"
                  class="text-sm text-red-600 hover:text-red-800 flex items-center"
                >
                  <i class="ri-delete-bin-line mr-1"></i>
                  Remove Photo
                </button>
              </div>
            </div>
            
            <p v-if="errors.photo" class="text-sm text-red-600 flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.photo }}
            </p>
          </div>
        </div>

        <!-- Parent/Guardian Information Section -->
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i class="ri-parent-line mr-2 text-green-500"></i>
            Parent/Guardian Information
          </h3>
          
          <!-- Parent First Name -->
          <div class="grid grid-cols-1 gap-2">
            <label for="parentFirstName" class="text-sm font-medium text-gray-700">
              Parent First Name *
            </label>
            <div class="relative">
              <i class="ri-user-3-line absolute left-3 top-1/2
              transform -translate-y-1/2 text-gray-400"
              ></i>
              <input
                id="parentFirstName"
                v-model="form.parentFirstName"
                type="text"
                required
                :class="[
                  'w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  'focus:border-transparent transition-all',
                  errors.parentFirstName ? 'border-red-500 bg-red-50' :
                  'border-gray-300 hover:border-gray-400'
                ]"
                placeholder="Enter parent's first name"
                @blur="validateField('parentFirstName')"
              />
            </div>
            <p v-if="errors.parentFirstName" class="text-sm text-red-600 flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.parentFirstName }}
            </p>
          </div>

          <!-- Parent Last Name -->
          <div class="grid grid-cols-1 gap-2">
            <label for="parentLastName" class="text-sm font-medium text-gray-700">
              Parent Last Name *
            </label>
            <div class="relative">
              <i class="ri-user-3-line absolute left-3 top-1/2
              transform -translate-y-1/2 text-gray-400"
              ></i>
              <input
                id="parentLastName"
                v-model="form.parentLastName"
                type="text"
                required
                :class="[
                  'w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  'focus:border-transparent transition-all',
                  errors.parentLastName ? 'border-red-500 bg-red-50' :
                  'border-gray-300 hover:border-gray-400'
                ]"
                placeholder="Enter parent's last name"
                @blur="validateField('parentLastName')"
              />
            </div>
            <p v-if="errors.parentLastName" class="text-sm text-red-600 flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.parentLastName }}
            </p>
          </div>

          <!-- Parent Contact Number -->
          <div class="grid grid-cols-1 gap-2">
            <label for="parentContact" class="text-sm font-medium text-gray-700">
              Parent Contact Number *
            </label>
            <div class="relative">
              <i class="ri-phone-line absolute left-3 top-1/2
              transform -translate-y-1/2 text-gray-400"
              ></i>
              <input
                id="parentContact"
                v-model="form.parentContact"
                type="tel"
                required
                :class="[
                  'w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  'focus:border-transparent transition-all',
                  errors.parentContact ? 'border-red-500 bg-red-50' :
                  'border-gray-300 hover:border-gray-400'
                ]"
                placeholder="Enter parent's contact number"
                @blur="validateField('parentContact')"
              />
            </div>
            <p v-if="errors.parentContact" class="text-sm text-red-600 flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.parentContact }}
            </p>
          </div>

           <!-- Parent Email -->
          <div class="grid grid-cols-1 gap-2">
            <label for="parentEmail" class="text-sm font-medium text-gray-700">
              Parent Email *
            </label>
            <div class="relative">
              <i class="ri-mail-line absolute left-3 top-1/2
              transform -translate-y-1/2 text-gray-400"
              ></i>
              <input
                id="parentEmail"
                v-model="form.parentEmail"
                type="email"
                required
                :class="[
                  'w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  'focus:border-transparent transition-all',
                  errors.parentEmail ? 'border-red-500 bg-red-50' :
                  'border-gray-300 hover:border-gray-400'
                ]"
                placeholder="Enter parent's email address"
                @blur="validateField('parentEmail')"
              />
            </div>
            <p v-if="errors.parentEmail" class="text-sm text-red-600 flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.parentEmail }}
            </p>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="grid grid-cols-1 gap-4">
          <button
            type="submit"
            :disabled="isSubmitting || isPlayerLimitReached"
            :class="[
              'w-full py-3 px-4 border border-transparent rounded-lg',
              'shadow-sm text-sm font-medium text-white focus:outline-none',
              'focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
              'transition-all grid grid-cols-auto-1fr gap-2',
              'items-center justify-center',
              isSubmitting || isPlayerLimitReached ? 'bg-gray-400 cursor-not-allowed' :
              'bg-[#4cbe5c] hover:bg-green-700 transform hover:-translate-y-0.5'
            ]"
          >
            <i v-if="isSubmitting" class="ri-loader-4-line animate-spin"></i>
            <i v-else class="ri-user-add-line"></i>
            <span>{{ isSubmitting ? 'Registering Player...' : 'Register Player' }}</span>
          </button>

          <!-- Success Message -->
          <div v-if="showSuccess"
          class="p-3 bg-green-50 border border-green-200
          rounded-lg grid grid-cols-auto-1fr gap-2 items-center"
          >
            <i class="ri-checkbox-circle-line text-green-500 text-lg"></i>
            <span class="text-green-800 text-sm font-medium">Player registered successfully!</span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import validationMixin from '../../mixins/player/validation';
import uploadFile from '../../mixins/player/uploadFile';

export default {
  name: 'index',
  mixins: [ validationMixin, uploadFile ],
  data() {
    return {
      form: {
        teamName: '',
        teamID: null,
        ageGroup: '',
        ageGroupID: null,
        seriesID: null,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        photo: null,
        parentFirstName: '',
        parentLastName: '',
        parentContact: '',
        parentEmail: ''
      },
      errors: {
        teamName: '',
        ageGroup: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        photo: '',
        parentFirstName: '',
        parentLastName: '',
        parentContact: '',
        parentEmail: ''
      },
      dragOver: false,
      photoPreview: null,
      isSubmitting: false,
      showSuccess: false,
    }
  },
  computed: {
    ...mapGetters('player', [
      'currentPlayerCount',
      'maxPlayerCount',
      'isPlayerLimitReached'
    ]),
    currentPlayers() {
      return this.currentPlayerCount
    },
    maxPlayers() {
      return this.maxPlayerCount
    },
    registrationStatus() {
      if (this.isPlayerLimitReached) {
        return {
          class: 'bg-gradient-to-r from-red-500 to-red-600 border-red-600 text-white',
          icon: 'ri-close-circle-line',
          text: 'Registration Full - Waitlist Available'
        };
      } else if (this.currentPlayersCount >= this.maxPlayerCount * 0.8) {
        return {
          class: 'bg-gradient-to-r from-orange-500 to-orange-600 border-orange-600 text-white',
          icon: 'ri-alert-line',
          text: 'Almost Full - Register Soon!'
        };
      } else {
        return {
          class: 'bg-gradient-to-r from-green-500 to-green-600 border-green-600 text-white',
          icon: 'ri-checkbox-circle-line',
          text: 'Registration Open'
        };
      }
    }
  },
  mounted() {
    const token = this.$route.query.token
    if (token) {
      this.fetchTeamData(token)
    }
  },
  methods: {
    ...mapMutations('player', [
      'SET_CURRENT_PLAYER_COUNT',
      'SET_MAX_PLAYER_COUNT'
    ]),
    async fetchTeamData(key) {
      try {
        const response = await this.$axios.$get(`v1/series/token/${key}`)
        this.team = response.data.team || [];

        const currentPlayers = this.team.player_count +
        this.team.registered_players_count || 0;
        const maxPlayers = this.team.player_limit || 0;

        this.SET_CURRENT_PLAYER_COUNT(currentPlayers)
        this.SET_MAX_PLAYER_COUNT(maxPlayers)

        this.form.teamName = this.team.name
        this.form.teamID = this.team.id
        this.form.ageGroup = this.team.agegroup.name
        this.form.ageGroupID = this.team.agegroup_id
        this.form.seriesID = this.team.series.id
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    },
    
    async handleSubmit() {
      const fieldsToValidate = [
        'firstName',
        'lastName',
        'dateOfBirth',
        'parentFirstName',
        'parentLastName',
        'parentContact',
        'parentEmail'
      ]
      fieldsToValidate.forEach(field => {
        this.validateField(field)
      })
      
      const hasErrors = Object.values(this.errors).some(error => error !== '')
      if (hasErrors) {
        this.$emit('error', 'Please fix the form errors before submitting')
        return
      }
      
      this.isSubmitting = true
      this.showSuccess = false
      
      try {
        const formData = new FormData()
        formData.append('teamID', this.form.teamID)
        formData.append('agegroupID', this.form.ageGroupID)
        formData.append('player_firstname', this.form.firstName)
        formData.append('player_lastname', this.form.lastName)
        formData.append('dob', this.form.dateOfBirth)
        formData.append('contact_firstname', this.form.parentFirstName)
        formData.append('contact_lastname', this.form.parentLastName)
        formData.append('phone_number', this.form.parentContact)
        formData.append('email', this.form.parentEmail)
        formData.append('photo[]', this.form.photo)
        formData.append('description', '');
        formData.append('seriesID', this.form.seriesID);
        
        await this.$axios.$post('/v1/players',
          formData, { headers: { 'Content-Type': 'multipart/form-data' } })

        this.SET_CURRENT_PLAYER_COUNT(this.currentPlayerCount + 1)
        
        this.showSuccess = true
        
        setTimeout(() => {
          this.resetForm()
          this.showSuccess = false
        }, 3000)
        
      } catch (error) {
        console.error('error', 'Failed to submit form: ' + error.message)
      } finally {
        this.isSubmitting = false
      }
    },
    
    resetForm() {
      const teamName = this.form.teamName
      const ageGroup = this.form.ageGroup
      
      this.form = {
        teamName,
        ageGroup,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        photo: null,
        parentFirstName: '',
        parentLastName: '',
        parentContact: '',
        parentEmail: ''
      }
      this.errors = {
        teamName: '',
        ageGroup: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        photo: '',
        parentFirstName: '',
        parentLastName: '',
        parentContact: '',
        parentEmail: ''
      }
      this.photoPreview = null
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    }
  }
}
</script>

<style scoped>
.grid-cols-auto-1fr {
  grid-template-columns: auto 1fr;
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-subtle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>