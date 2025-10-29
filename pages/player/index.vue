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
                @change="calculateAgeGroup"
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
                @input="formatPhoneNumber"
              />
            </div>
            <p v-if="errors.parentContact" class="text-sm text-red-600 flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.parentContact }}
            </p>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="grid grid-cols-1 gap-4">
          <button
            type="submit"
            :disabled="isSubmitting"
            :class="[
              'w-full py-3 px-4 border border-transparent rounded-lg',
              'shadow-sm text-sm font-medium text-white focus:outline-none',
              'focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
              'transition-all grid grid-cols-auto-1fr gap-2',
              'items-center justify-center',
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' :
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
export default {
  name: 'index',
  data() {
    return {
      form: {
        teamName: 'Thunderbolts U12', // Example auto-populated data
        ageGroup: 'U12', // Example auto-populated data
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        photo: null,
        parentFirstName: '',
        parentLastName: '',
        parentContact: ''
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
        parentContact: ''
      },
      dragOver: false,
      photoPreview: null,
      isSubmitting: false,
      showSuccess: false
    }
  },
  mounted() {
    // You can call an API here to get the team and age group data
    // this.fetchTeamData()
  },
  methods: {
    // Example method to fetch team data from an API
    async fetchTeamData() {
      try {
        const response = await this.$axios.get('/api/team-info')
        console.log(response)
        // this.form.teamName = response.data.teamName
        // this.form.ageGroup = response.data.ageGroup
      } catch (error) {
        console.error('Error fetching team data:', error)
      }
    },

    // Method to calculate age group based on date of birth
    calculateAgeGroup() {
      if (!this.form.dateOfBirth) return
      
      const dob = new Date(this.form.dateOfBirth)
      const today = new Date()
      let age = today.getFullYear() - dob.getFullYear()
      
      // Adjust age if birthday hasn't occurred this year
      const monthDiff = today.getMonth() - dob.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--
      }
      
      // Determine age group
      if (age < 8) this.form.ageGroup = 'U8'
      else if (age < 10) this.form.ageGroup = 'U10'
      else if (age < 12) this.form.ageGroup = 'U12'
      else if (age < 14) this.form.ageGroup = 'U14'
      else if (age < 16) this.form.ageGroup = 'U16'
      else if (age < 18) this.form.ageGroup = 'U18'
      else this.form.ageGroup = 'U19+'
    },

    validateField(field) {
      this.errors[field] = ''
      
      switch (field) {          
      case 'firstName':
        if (!this.form.firstName.trim()) {
          this.errors.firstName = 'First name is required'
        } else if (this.form.firstName.trim().length < 2) {
          this.errors.firstName = 'First name must be at least 2 characters'
        }
        break
          
      case 'lastName':
        if (!this.form.lastName.trim()) {
          this.errors.lastName = 'Last name is required'
        } else if (this.form.lastName.trim().length < 2) {
          this.errors.lastName = 'Last name must be at least 2 characters'
        }
        break
          
      case 'dateOfBirth':
        if (!this.form.dateOfBirth) {
          this.errors.dateOfBirth = 'Date of birth is required'
        } else {
          const dob = new Date(this.form.dateOfBirth)
          const today = new Date()
          const minDate = new Date()
          minDate.setFullYear(today.getFullYear() - 100) // Max 100 years old
              
          if (dob > today) {
            this.errors.dateOfBirth = 'Date of birth cannot be in the future'
          } else if (dob < minDate) {
            this.errors.dateOfBirth = 'Please enter a valid date of birth'
          }
        }
        break

      case 'parentFirstName':
        if (!this.form.parentFirstName.trim()) {
          this.errors.parentFirstName = 'Parent first name is required'
        } else if (this.form.parentFirstName.trim().length < 2) {
          this.errors.parentFirstName = 'Parent first name must be at least 2 characters'
        }
        break

      case 'parentLastName':
        if (!this.form.parentLastName.trim()) {
          this.errors.parentLastName = 'Parent last name is required'
        } else if (this.form.parentLastName.trim().length < 2) {
          this.errors.parentLastName = 'Parent last name must be at least 2 characters'
        }
        break

      case 'parentContact':
        if (!this.form.parentContact.trim()) {
          this.errors.parentContact = 'Parent contact number is required'
        } else {
          const phoneRegex = /^\+?[1-9][\d]{0,15}$/
          const cleanPhone = this.form.parentContact.replace(/\D/g, '')
          if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
            this.errors.parentContact = 'Please enter a valid phone number'
          }
        }
        break
      }
    },

    formatPhoneNumber() {
      // Basic phone number formatting - you can enhance this based on your needs
      let phone = this.form.parentContact.replace(/\D/g, '')
      if (phone.length > 10) {
        phone = phone.substring(0, 10)
      }
      if (phone.length >= 6) {
        this.form.parentContact = `(${phone.substring(0, 3)})
        ${phone.substring(3, 6)}-${phone.substring(6)}`
      } else if (phone.length >= 3) {
        this.form.parentContact = `(${phone.substring(0, 3)}) ${phone.substring(3)}`
      } else {
        this.form.parentContact = phone
      }
    },
    
    handleFileSelect(event) {
      const file = event.target.files[0]
      this.processFile(file)
    },
    
    handleFileDrop(event) {
      event.preventDefault()
      this.dragOver = false
      
      const file = event.dataTransfer.files[0]
      this.processFile(file)
    },
    
    processFile(file) {
      // Reset previous file
      this.form.photo = null
      this.photoPreview = null
      this.errors.photo = ''
      
      if (!file) return
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.errors.photo = 'Please select an image file'
        return
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.errors.photo = 'File size must be less than 5MB'
        return
      }
      
      this.form.photo = file
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        this.photoPreview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    
    removePhoto() {
      this.form.photo = null
      this.photoPreview = null
      this.$refs.fileInput.value = ''
    },
    
    async handleSubmit() {
      const fieldsToValidate = [
        'firstName',
        'lastName',
        'dateOfBirth',
        'parentFirstName',
        'parentLastName',
        'parentContact'
      ]
      fieldsToValidate.forEach(field => {
        this.validateField(field)
      })
      
      // Check if there are any errors
      const hasErrors = Object.values(this.errors).some(error => error !== '')
      if (hasErrors) {
        this.$emit('error', 'Please fix the form errors before submitting')
        return
      }
      
      this.isSubmitting = true
      this.showSuccess = false
      
      try {
        // Prepare form data for submission
        const formData = new FormData()
        Object.keys(this.form).forEach(key => {
          if (key === 'photo' && this.form.photo) {
            formData.append(key, this.form.photo)
          } else if (this.form[key] !== null) {
            formData.append(key, this.form[key])
          }
        })
        
        // Emit the form data to parent component
        const response = await this.$emit('submit', formData)

        console.log(response)
        
        // Show success message
        this.showSuccess = true
        
        // Reset form after delay (but keep team name and age group)
        setTimeout(() => {
          this.resetForm()
          this.showSuccess = false
        }, 3000)
        
      } catch (error) {
        this.$emit('error', 'Failed to submit form: ' + error.message)
      } finally {
        this.isSubmitting = false
      }
    },
    
    resetForm() {
      // Reset all fields except teamName and ageGroup
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
        parentContact: ''
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
        parentContact: ''
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
</style>