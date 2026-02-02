<template>
  <OModal :active="active" @close="closeModal">
    <div class="w-full rounded-lg bg-white p-4 sm:p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Header -->
        <div class="border-b border-gray-200 pb-4">
          <h2 class="text-lg font-semibold text-gray-900">
            Registration Form Settings
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Configure countdown timer for the registration page
          </p>
        </div>

        <!-- Switch - Show Countdown Timer -->
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <label class="text-base font-medium text-gray-900">
              Show countdown timer
            </label>
            <p class="mt-1 text-sm text-gray-500">
              Display a countdown timer on the registration form
            </p>
          </div>
          
          <button
            type="button"
            @click="toggleSwitch"
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer
            rounded-full border-2 border-transparent p-0.5
            transition-colors duration-200 ease-in-out focus:outline-none
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :class="form.isShowCountDownTimer ? 'justify-end bg-blue-600' :
            'justify-start bg-gray-300'"
          >
            <span class="sr-only">Toggle countdown timer</span>
            <span class="h-5 w-5 rounded-full bg-white shadow"></span>
          </button>
        </div>

        <div>
          <label for="date" class="block text-sm font-medium text-gray-700">
            Countdown end date
            <span class="ml-1 text-red-500">*</span>
          </label>
          
          <input
            id="date"
            v-model="dateInput"
            type="date"
            :min="minDate"
            required
            class="mt-2 block w-full rounded-md border border-gray-300
            px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            :class="dateError ? 'border-red-500' : ''"
          />
          
          <p v-if="dateError" class="mt-2 text-sm text-red-600">
            <i class="ri-error-warning-line mr-1"></i>
            {{ dateError }}
          </p>
          
          <p v-else class="mt-2 text-sm text-gray-500">
            The countdown will expire on {{ new Date(date).toDateString() }}
          </p>
        </div>

        <!-- Error Alert -->
        <div v-if="submitError" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <i class="ri-error-warning-line text-red-400 mt-0.5"></i>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                Unable to save settings
              </h3>
              <p class="mt-2 text-sm text-red-700">
                {{ submitError }}
              </p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
          <button
            type="button"
            @click="resetForm"
            :disabled="loading"
            class="rounded-md border border-gray-300 px-4 py-2 text-sm
            font-medium text-gray-700 hover:bg-gray-50 focus:outline-none
            focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Reset
          </button>
          
          <button
            type="submit"
            :disabled="loading || !hasChanges"
            class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium
            text-white hover:bg-blue-700 focus:outline-none focus:ring-2
            focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50
            disabled:cursor-not-allowed"
          >
            <template v-if="loading">
              <i class="ri-loader-4-line animate-spin mr-2"></i>
              Saving...
            </template>
            <template v-else>
              Save Changes
            </template>
          </button>
        </div>
      </form>
    </div>
  </OModal>
</template>

<script>
export default {
  name: 'RegistrationStatusModal',

  props: {
    active: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      default: '',
    },
    isShowCountDownTimer: {
      type: Boolean,
      default: false,
    },
    seriesId: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      form: {
        date: '',
        isShowCountDownTimer: false,
        seriesId: null
      },
      originalForm: null,
      dateError: '',
      submitError: '',
      dateInput: '',
    }
  },

  computed: {
    minDate() {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },

    hasChanges() {
      if (!this.originalForm) return false
      return (
        this.form.date !== this.originalForm.date ||
        this.form.isShowCountDownTimer !== this.originalForm.isShowCountDownTimer
      )
    },
  },

  watch: {
    active(isActive) {
      if (isActive) {
        this.initForm()
      } else {
        this.resetErrors()
      }
    },

    dateInput(value) {
      this.form.date = value
      this.validateDate()
    }
  },

  methods: {
    initForm() {
      this.form.date = this.date || ''
      this.form.isShowCountDownTimer = this.isShowCountDownTimer
      this.form.seriesId = this.seriesId

      this.dateInput = this.date || ''

      this.originalForm = { ...this.form }

      this.resetErrors()
    },

    toggleSwitch() {
      this.form.isShowCountDownTimer = !this.form.isShowCountDownTimer
    },

    validateDate() {
      this.dateError = ''
      
      if (!this.form.isShowCountDownTimer) {
        return true
      }

      if (!this.form.date) {
        this.dateError = 'Please select a date for the countdown'
        return false
      }

      const selectedDate = new Date(this.form.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (isNaN(selectedDate.getTime())) {
        this.dateError = 'Invalid date format'
        return false
      }

      if (selectedDate < today) {
        this.dateError = 'Please select a future date'
        return false
      }

      return true
    },

    handleSubmit() {
      this.submitError = ''
      
      if (this.form.isShowCountDownTimer && !this.validateDate()) {
        return
      }

      const payload = {
        date: this.form.date,
        isShowCountDownTimer: this.form.isShowCountDownTimer,
        seriesId: this.seriesId
      }

      this.$emit('save', payload)
    },

    resetForm() {
      if (this.originalForm) {
        this.form = { ...this.originalForm }
        this.form.date = ''
        this.form.isShowCountDownTimer = false
        this.form.seriesId = null
      }
      this.resetErrors()
    },

    resetErrors() {
      this.dateError = ''
      this.submitError = ''
    },

    closeModal() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
button[role="switch"]:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
</style>