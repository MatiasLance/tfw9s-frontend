<template>
  <OModal :active="active" @close="closeModal">
    <div class="w-full max-w-md overflow-hidden rounded-xl
    bg-white shadow-2xl border border-gray-100"
    >
      <div class="px-6 py-5 border-b border-gray-100">
        <div class="flex items-center gap-2">
          <i class="ri-settings-4-line text-blue-600 text-xl"></i>
          <h2 class="text-xl font-bold text-gray-900 leading-tight">
            Registration Settings
          </h2>
        </div>
        <p class="text-sm text-gray-500 mt-1">
          Configure how and when the registration opens.
        </p>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="p-6 space-y-8">
          
          <div 
            class="flex items-center justify-between p-4
            rounded-xl border transition-all duration-300"
            :class="isShowCountDownTimer ?
            'border-blue-200 bg-blue-50/40' :
            'border-gray-200 bg-gray-50/50'"
          >
            <div class="pr-4">
              <label class="block text-sm font-bold text-gray-900">
                Enable Countdown Timer
              </label>
              <p class="text-xs text-gray-500 mt-0.5">
                Show a timer to users before registration opens.
              </p>
            </div>
            
            <button
              type="button"
              @click="form.isShowCountDownTimer = !form.isShowCountDownTimer"
              class="relative inline-flex h-6 w-11 flex-shrink-0
              cursor-pointer rounded-full border-2 border-transparent
              transition-colors duration-200 focus:outline-none
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              :class="form.isShowCountDownTimer ? 'bg-blue-600' : 'bg-gray-300'"
            >
              <span 
                class="pointer-events-none inline-block h-5 w-5
                transform rounded-full bg-white shadow-md
                ring-0 transition duration-200 mt-[2px]"
                :class="form.isShowCountDownTimer ? 'translate-x-5' : 'translate-x-1'"
              ></span>
            </button>
          </div>

          <Transition 
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div v-if="form.isShowCountDownTimer" class="space-y-6">
              <div>
                <label class="text-[10px] font-black uppercase
                tracking-[0.1em] text-gray-400 mb-3 block"
                >
                  Timer Type
                </label>
                <div class="flex p-1 bg-gray-100 rounded-lg">
                  <button 
                    v-for="timerMode in ['duration', 'date']" 
                    :key="timerMode"
                    type="button"
                    @click="form.timerMode = timerMode"
                    class="flex-1 flex items-center justify-center gap-2
                    py-2 text-sm font-semibold rounded-md
                    transition-all duration-200"
                    :class="form.timerMode === timerMode 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'"
                  >
                    <i :class="timerMode === 'duration' ?
                    'ri-history-line' :
                    'ri-calendar-event-line'"
                    ></i>
                    {{ timerMode === 'duration' ? 'Relative' : 'Specific' }}
                  </button>
                </div>
              </div>

              <div v-if="form.timerMode === 'duration'" class="grid grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-gray-700 ml-1">
                    Unit
                  </label>
                  <div class="relative">
                    <select
                      v-model="form.countdownUnit"
                      class="block w-full rounded-lg border-gray-200
                      bg-white px-3 py-2.5 text-sm focus:border-blue-500
                      focus:ring-blue-500 appearance-none border shadow-sm"
                    >
                      <option value="days">
                        Days
                      </option>
                      <option value="hours">
                        Hours
                      </option>
                      <option value="minutes">
                        Minutes
                      </option>
                    </select>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-gray-700 ml-1">Value</label>
                  <input
                    v-model.number="form.countdownValue"
                    type="number"
                    min="1"
                    class="block w-full rounded-lg border-gray-200 bg-white
                    px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500
                    border shadow-sm"
                    :class="{
                      'border-red-500 ring-1 ring-red-500':
                      validationErrors.countdownValue
                    }"
                  />
                </div>
              </div>

              <div v-else class="space-y-1.5">
                <label class="block text-xs font-bold text-gray-700 ml-1">
                  Countdown End Date
                </label>
                <input
                  v-model="form.date"
                  type="datetime-local"
                  :min="minDate"
                  class="block w-full rounded-lg border-gray-200 bg-white
                  px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500
                  border shadow-sm"
                  :class="{ 'border-red-500 ring-1 ring-red-500': validationErrors.date }"
                />
              </div>

              <div v-if="hasErrors"
              class="flex items-start gap-3 bg-red-50 p-3
              rounded-lg border border-red-100"
              >
                <i class="ri-error-warning-fill text-red-500 mt-0.5"></i>
                <p class="text-xs font-semibold text-red-700 leading-relaxed">
                  {{ currentErrorMessage }}
                </p>
              </div>
            </div>
          </Transition>
        </div>

        <div class="bg-gray-50 px-6 py-4 flex items-center
        justify-between border-t border-gray-100"
        >
          <button
            type="button"
            @click="initForm"
            class="flex items-center gap-1.5 text-xs font-bold text-gray-400
            hover:text-gray-600 transition-colors uppercase tracking-widest"
          >
            <i class="ri-restart-line"></i>
            Reset
          </button>
          
          <div class="flex items-center gap-3">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-sm font-semibold text-gray-600
              hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading || !hasChanges"
              class="inline-flex items-center justify-center gap-2
              px-6 py-2 text-sm font-bold text-white bg-blue-600
              rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-100
              disabled:opacity-50 transition-all shadow-md active:scale-95"
            >
              <i v-if="loading" class="ri-loader-4-line animate-spin"></i>
              <i v-else class="ri-checkbox-circle-line"></i>
              {{ loading ? 'Saving...' : 'Save Settings' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </OModal>
</template>

<script>
export default {
  name: 'RegistrationStatusModal',

  props: {
    active: Boolean,
    loading: Boolean,
    seriesId: {
      type: Number,
      required: true
    },
    date: {
      type: String,
      default: ''
    },
    isShowCountDownTimer: {
      type: Boolean,
      default: false
    },
    timerMode: {
      type: String,
      default: 'date'
    },
    countdownUnit: {
      type: [ String, Number ],
      default: 'days'
    },
    countdownValue: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      form: {
        seriesId: null,
        date: '',
        isShowCountDownTimer: false,
        timerMode: 'date',
        countdownUnit: 'days',
        countdownValue: 1
      },
      originalFormJson: '',
      validationErrors: {}
    }
  },

  computed: {
    minDate() {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      return now.toISOString().slice(0, 16);
    },

    hasChanges() {
      return JSON.stringify(this.form) !== this.originalFormJson;
    },

    hasErrors() {
      return Object.keys(this.validationErrors).length > 0;
    },

    currentErrorMessage() {
      return Object.values(this.validationErrors) || '';
    }
  },

  watch: {
    active: {
      immediate: true,
      handler(val) {
        if (val) this.initForm();
      }
    },
  },

  methods: {
    initForm() {
      const data = {
        seriesId: this.seriesId,
        date: this.date || '',
        isShowCountDownTimer: this.isShowCountDownTimer,
        timerMode: this.timerMode || (this.date ? 'date' : 'duration'),
        countdownUnit: this.countdownUnit || 'days',
        countdownValue: this.countdownValue || 1
      };

      this.form = { ...data };
      this.originalFormJson = JSON.stringify(data);
      this.validationErrors = {};
    },

    validate() {
      this.validationErrors = {};
      
      if (this.form.isShowCountDownTimer) {
        if (this.form.timerMode === 'date' && !this.form.date) {
          this.validationErrors.date = 'Please select a countdown end date.';
        }
        if (this.form.timerMode === 'duration' &&
        (!this.form.countdownValue || this.form.countdownValue < 1)) {
          this.validationErrors.countdownValue = 'Please enter a valid duration.';
        }
      }
      
      return !this.hasErrors;
    },

    handleSubmit() {
      if (!this.validate()) return;

      this.$emit('save', { ...this.form });
    },

    closeModal() {
      this.$emit('close');
    }
  }
}
</script>