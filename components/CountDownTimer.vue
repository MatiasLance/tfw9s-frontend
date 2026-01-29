<template>
  <div 
    class="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black overflow-hidden"
    :class="{ 'pointer-events-none opacity-0 transition-all duration-1000': isComplete }"
  >
    <!-- Animated background particles -->
    <div class="absolute inset-0 overflow-hidden">
      <div 
        v-for="i in 30" 
        :key="`particle-${i}`"
        class="absolute w-1 h-1 bg-emerald-400/20 rounded-full"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${3 + Math.random() * 4}s infinite ease-in-out ${Math.random() * 2}s`,
          transform: `scale(${0.2 + Math.random() * 0.8})`
        }"
      ></div>
    </div>

    <!-- Central content -->
    <div class="relative z-10 h-full flex flex-col items-center justify-center px-4">
      <!-- Title -->
      <div class="text-center mb-8 md:mb-12">
        <h1 class="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
          Registration Opens In
        </h1>
        <p class="text-gray-400 text-lg md:text-xl">
          {{ targetDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }) }}
        </p>
      </div>

      <!-- Timer Units -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl w-full">
        <TimerUnit 
          :value="days" 
          label="Days" 
          :is-leading="days > 0"
          :pulse="daysChanged"
        />
        <TimerUnit 
          :value="hours" 
          label="Hours" 
          :is-leading="days === 0 && hours > 0"
          :pulse="hoursChanged"
        />
        <TimerUnit 
          :value="minutes" 
          label="Minutes" 
          :is-leading="days === 0 && hours === 0 && minutes > 0"
          :pulse="minutesChanged"
        />
        <TimerUnit 
          :value="seconds" 
          label="Seconds" 
          :is-leading="days === 0 && hours === 0 && minutes === 0"
          :pulse="secondsChanged"
        />
      </div>

      <!-- Progress bar -->
      <div class="mt-12 md:mt-16 w-full max-w-2xl">
        <div class="flex justify-between text-sm text-emerald-300/70 mb-2">
          <span>Now</span>
          <span>{{ progressPercentage }}%</span>
          <span>Registration Open</span>
        </div>
        <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-emerald-500
            via-green-500 to-emerald-500
            transition-all duration-1000 ease-out"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>

      <!-- Subtle instruction -->
      <p class="mt-12 text-emerald-300/50 text-sm text-center animate-pulse">
        This screen will disappear automatically when registration opens
        <i class="ri-timer-line ml-1"></i>
      </p>
    </div>

    <!-- Confetti explosion when complete -->
    <Transition name="confetti">
      <div v-if="isComplete" class="absolute inset-0 z-20 pointer-events-none">
        <div 
          v-for="i in 150" 
          :key="`confetti-${i}`"
          class="absolute w-2 h-2 rounded-sm"
          :class="confettiColors[i % confettiColors.length]"
          :style="{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
            animation: `confetti-fall ${1 + Math.random() * 2}s
            forwards ease-out ${Math.random() * 0.5}s`,
            opacity: 0,
            '--tx': `calc(-50% + ${Math.random() * 200 - 100}px)`,
            '--ty': `calc(-50% + ${Math.random() * 200 + 100}px)`,
            '--rot': `${Math.random() * 720}deg`
          }"
        ></div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'CountDownTimer',
  props: {
    targetDate: {
      type: Date,
      required: true,
      validator: (value) => value instanceof Date && !isNaN(value)
    }
  },
  data() {
    return {
      now: Date.now(),
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      daysChanged: false,
      hoursChanged: false,
      minutesChanged: false,
      secondsChanged: false,
      interval: null,
      confettiColors: [
        'bg-emerald-500', 'bg-green-500', 'bg-lime-500', 'bg-teal-500',
        'bg-emerald-400', 'bg-green-400', 'bg-lime-400', 'bg-teal-400'
      ],
      isMounted: false
    }
  },
  computed: {
    isComplete() {
      return this.now >= this.targetDate.getTime()
    },
    totalDuration() {
      return this.targetDate.getTime() - new Date('2026-01-01').getTime()
    },
    elapsedDuration() {
      return this.now - new Date('2026-01-01').getTime()
    },
    progressPercentage() {
      if (this.isComplete) return 100
    
      const total = this.targetDate.getTime() - new Date('2026-01-01').getTime()
      const elapsed = this.now - new Date('2026-01-01').getTime()
      const rawPercentage = (elapsed / total) * 100

      // Round to nearest whole number
      return Math.min(100, Math.max(0, Math.round(rawPercentage)))
    }
  },
  
  mounted() {
    this.isMounted = true
    this.startTimer()
    document.addEventListener('visibilitychange',
      this.handleVisibilityChange)
  },

  // Use beforeDestroy for cleanup
  beforeDestroy() {
    this.cleanupTimer()
  },
  // For Nuxt's asyncData/fetch scenarios
  beforeRouteLeave(to, from, next) {
    this.cleanupTimer()
    next()
  },
  // Handle deactivation in keep-alive scenarios
  deactivated() {
    this.cleanupTimer()
  },
  activated() {
    if (this.isMounted && !this.isComplete && !this.interval) {
      this.startTimer()
    }
  },

  destroyed() {
    this.cleanupTimer()
    document.removeEventListener('visibilitychange',
      this.handleVisibilityChange)
  },

  methods: {
    startTimer() {
      this.updateTimer()
      this.interval = setInterval(() => {
        this.updateTimer()
      }, 1000)
    },
    
    cleanupTimer() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    },
    
    handleVisibilityChange() {
      if (document.hidden) {
        // Page is hidden, slow down or pause timer
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
        return
      }
      // Page is visible again, restart timer
      if (this.isMounted && !this.isComplete && !this.interval) {
        this.updateTimer() // Immediate update
        this.startTimer()
      }
    },
    
    updateTimer() {
      const previous = {
        days: this.days,
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds
      }

      this.now = Date.now()
      
      if (this.isComplete) {
        this.triggerCompletion()
        return
      }

      const diff = this.targetDate.getTime() - this.now
      
      this.days = Math.floor(diff / (1000 * 60 * 60 * 24))
      this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      this.seconds = Math.floor((diff % (1000 * 60)) / 1000)

      // Trigger pulse animations
      this.daysChanged = previous.days !== this.days
      this.hoursChanged = previous.hours !== this.hours
      this.minutesChanged = previous.minutes !== this.minutes
      this.secondsChanged = previous.seconds !== this.seconds

      // Reset pulse flags after animation
      if (this.daysChanged) {
        setTimeout(() => {
          this.daysChanged = false
        }, 600)
      }
      if (this.hoursChanged) {
        setTimeout(() => {
          this.hoursChanged = false
        }, 600)
      }
      if (this.minutesChanged) {
        setTimeout(() => {
          this.minutesChanged = false
        }, 600)
      }
      if (this.secondsChanged) {
        setTimeout(() => {
          this.secondsChanged = false
        }, 600)
      }
    },
    
    triggerCompletion() {
      // Clean up the interval first
      this.cleanupTimer()
      
      // Emit event when countdown completes
      this.$emit('completed')
      
      // Auto-dismiss after celebration
      setTimeout(() => {
        this.$emit('dismiss')
      }, 4000)
    }
  }
}
</script>

<style scoped>
/* Particle animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0.1;
  }
  50% {
    transform: translateY(-20px) translateX(10px);
    opacity: 0.3;
  }
}

/* Confetti animation */
@keyframes confetti-fall {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0);
  }
}

.confetti-enter-active {
  transition: all 0.5s ease;
}
.confetti-leave-active {
  transition: all 1s ease;
}
.confetti-enter-from,
.confetti-leave-to {
  opacity: 0;
}
</style>