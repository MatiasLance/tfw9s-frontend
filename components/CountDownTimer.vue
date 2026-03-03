<template>
  <div 
    v-if="mounted"
    class="fixed inset-0 bg-gradient-to-br from-gray-900
    via-gray-950 to-black overflow-hidden"
    :class="{
      'pointer-events-none opacity-0 transition-all duration-1000':
      isComplete
    }"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div 
        v-for="i in 30" 
        :key="`particle-${i}`"
        class="absolute w-1 h-1 bg-emerald-400/20 rounded-full"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${3 + Math.random() * 4}s
          infinite ease-in-out ${Math.random() * 2}s`,
          transform: `scale(${0.2 + Math.random() * 0.8})`
        }"
      ></div>
    </div>

    <div class="relative z-10 h-full flex flex-col items-center justify-center px-4">
      <div class="text-center mb-8 md:mb-12">
        <h1 class="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
          Registration Opens In
        </h1>
        <p class="text-gray-400 text-lg md:text-xl">
          {{ formattedTargetDate }}
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl w-full">
        <TimerUnit
        :value="days"
        label="Days"
        :pulse="diffs.days"
        />
        <TimerUnit
        :value="hours"
        label="Hours"
        :pulse="diffs.hours"
        />
        <TimerUnit
        :value="minutes"
        label="Minutes"
        :pulse="diffs.minutes"
        />
        <TimerUnit
        :value="seconds"
        label="Seconds"
        :pulse="diffs.seconds"
        />
      </div>

      <div class="mt-12 md:mt-16 w-full max-w-2xl">
        <div class="flex justify-between text-sm text-emerald-300/70 mb-2 font-mono">
          <span>INITIALIZED</span>
          <span>{{ progressPercentage }}%</span>
          <span>OPENING</span>
        </div>
        <div class="h-2 bg-gray-800 rounded-full overflow-hidden p-[1px]">
          <div 
            class="h-full bg-gradient-to-r from-emerald-600 via-emerald-400
            to-emerald-600 rounded-full transition-all duration-1000 ease-linear"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>

      <p class="mt-12 text-emerald-300/40 text-xs text-center
      uppercase tracking-widest animate-pulse">
        System will redirect automatically
        <i class="ri-refresh-line ml-1"></i>
      </p>

      <div class="mt-8">
        <ReturnButtonLink 
          to="/tournaments"
          label="View Tournaments"
          :isTryScored="true"
        />
      </div>
    </div>

    <Transition name="confetti">
      <div v-if="isComplete"
      class="absolute inset-0 z-20 pointer-events-none"
      >
        <div 
          v-for="i in 100" 
          :key="`confetti-${i}`"
          class="absolute w-2 h-2 rounded-sm"
          :class="confettiColors[i % confettiColors.length]"
          :style="getConfettiStyle(i)"
        ></div>
      </div>
    </Transition>
  </div>
</template>

<script>
import ReturnButtonLink from './base/ReturnButtonLink.vue';

export default {
  name: 'CountDownTimer',
  components: { ReturnButtonLink },
  props: {
    targetDate: {
      type: [
        Date,
        String,
        Number
      ],
      required: true,
      validator: (value) => !isNaN(new Date(value).getTime())
    },
    startDate: {
      type: [
        Date,
        String,
        Number
      ],
      default: () => new Date()
    }
  },
  data() {
    return {
      mounted: false,
      now: Date.now(),
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      diffs: {
        days: false,
        hours: false,
        minutes: false,
        seconds: false
      },
      interval: null,
      confettiColors: [
        'bg-emerald-500',
        'bg-green-400',
        'bg-teal-400',
        'bg-white'
      ]
    }
  },
  computed: {
    targetDateTime() {
      return new Date(this.targetDate).getTime();
    },
    startDateTime() {
      return new Date(this.startDate).getTime();
    },
    isComplete() {
      return this.now >= this.targetDateTime;
    },
    formattedTargetDate() {
      return new Date(this.targetDate).toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    },
    progressPercentage() {
      const start = this.startDateTime;
      const end = this.targetDateTime;
      const current = this.now;

      if (current >= end) return 100;
      if (current <= start) return 0;

      const total = end - start;
      const elapsed = current - start;
      return Math.min(100, Math.round((elapsed / total) * 100));
    }
  },
  watch: {
    targetDate: {
      handler: 'resetTimer',
      immediate: true
    }
  },
  mounted() {
    this.mounted = true;
    this.startTimer();
  },
  beforeDestroy() {
    this.cleanupTimer();
  },
  methods: {
    startTimer() {
      this.updateTimer();
      
      this.interval = setInterval(() => {
        this.updateTimer();
      }, 1000);
    },
    
    resetTimer() {
      this.cleanupTimer();
      this.now = Date.now();
      this.startTimer();
    },
    
    cleanupTimer() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    
    updateTimer() {
      requestAnimationFrame(() => {
        const previous = {
          d: this.days,
          h: this.hours,
          m: this.minutes,
          s: this.seconds
        };
        
        this.now = Date.now();
        
        if (this.isComplete) {
          this.triggerCompletion();
          return;
        }

        const diff = Math.max(0, this.targetDateTime - this.now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;

        this.diffs.days = previous.d !== days;
        this.diffs.hours = previous.h !== hours;
        this.diffs.minutes = previous.m !== minutes;
        this.diffs.seconds = previous.s !== seconds;
      });
    },
    
    triggerCompletion() {
      this.cleanupTimer();

      this.$nextTick(() => {
        this.$emit('completed');
        
        setTimeout(() => {
          this.$emit('dismiss');
        }, 3000);
      });
    },
    
    getConfettiStyle(i) {
      return {
        'left': '50%',
        'top': '50%',
        '--tx': `${(Math.random() - 0.5) * 400}px`,
        '--ty': `${(Math.random() - 0.5) * 400}px`,
        '--rot': `${Math.random() * 720}deg`,
        'animation': `confetti-fall ${1 + Math.random() * 2}s forwards ease-out`
      };
    }
  }
}
</script>