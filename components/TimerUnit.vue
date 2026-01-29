<template>
  <div class="relative" :class="{ 'order-first': isLeading }">
    <div 
      class="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 md:p-8 
             border border-emerald-900/30 shadow-2xl overflow-hidden
             transition-all duration-500"
      :class="{
        'ring-2 ring-emerald-500/50 ring-offset-2 ring-offset-transparent scale-105': pulse,
        'ring-1 ring-emerald-500/30': isLeading,
        'bg-gradient-to-b from-emerald-900/20 to-green-900/20': isLeading
      }"
    >
      <!-- Glow effect for leading unit -->
      <div 
        v-if="isLeading"
        class="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 blur-xl"
      ></div>
      
      <!-- Animated gradient border for leading unit -->
      <div 
        v-if="isLeading"
        class="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r
        from-emerald-500 via-green-500 to-emerald-500 -z-10"
        style="mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); 
               -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); 
               -webkit-mask-composite: xor; 
               mask-composite: exclude;"
      ></div>
      
      <!-- Number -->
      <div class="relative z-10">
        <div 
          class="font-mono text-5xl md:text-7xl lg:text-8xl font-bold 
                 text-center text-white mb-2 tracking-tighter select-none"
          :class="{ 'animate-pulse-subtle': pulse }"
        >
          {{ formattedValue }}
        </div>
        
        <!-- Label -->
        <div 
          class="text-center text-emerald-300/80 text-sm md:text-base font-medium 
                 uppercase tracking-wider mt-2"
        >
          {{ label }}
        </div>
      </div>
    </div>
    
    <!-- Corner accents -->
    <div class="absolute top-0 left-0 w-4 h-4 border-t-2
    border-l-2 border-emerald-500/50 rounded-tl-lg"
    ></div>
    <div class="absolute top-0 right-0 w-4 h-4 border-t-2
    border-r-2 border-emerald-500/50 rounded-tr-lg"
    ></div>
    <div class="absolute bottom-0 left-0 w-4 h-4
    border-b-2 border-l-2 border-emerald-500/50 rounded-bl-lg"
    ></div>
    <div class="absolute bottom-0 right-0 w-4 h-4
    border-b-2 border-r-2 border-emerald-500/50 rounded-br-lg"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'TimerUnit',
  props: {
    value: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    isLeading: {
      type: Boolean,
      default: false
    },
    pulse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formattedValue() {
      return this.value.toString().padStart(2, '0')
    }
  }
}
</script>

<style scoped>
@keyframes pulse-subtle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 0.6s ease-in-out;
}
</style>