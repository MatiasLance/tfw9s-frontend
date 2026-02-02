<template>
  <NuxtLink
    :to="to"
    class="rugby-score-link mt-5"
    :class="{ 'rugby-score-link--pulse': pulse }"
    :aria-label="ariaLabel || label"
  >

    <span class="rugby-score-link__gradient" aria-hidden="true"></span>
    

    <span class="rugby-score-link__content">
      <slot>
        {{ label }}
      </slot>

      <span 
        v-if="showTryIndicator" 
        class="rugby-score-link__try-indicator"
        aria-hidden="true"
      >
        🏉
      </span>
    </span>
  </NuxtLink>
</template>

<script>
export default {
  name: 'ReturnButtonLink',
  props: {
    to: {
      type: [ String, Object ],
      required: true,
      validator: (value) => {
        return value && (typeof value === 'string' || typeof value === 'object')
      }
    },
    label: {
      type: String,
      default: 'View Match Details'
    },
    ariaLabel: {
      type: String,
      default: ''
    },

    isTryScored: {
      type: Boolean,
      default: false
    },

    pulse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showTryIndicator() {
      return this.isTryScored
    }
  }
}
</script>

<style scoped>
.rugby-score-link {
  @apply relative inline-flex items-center justify-center;
  @apply px-8 py-4;
  @apply rounded-lg;
  @apply font-bold text-white text-lg tracking-wide;
  @apply overflow-hidden;
  @apply transition-all duration-300 ease-out;
  @apply shadow-lg;
  @apply border-2 border-white border-opacity-20;
  
  outline: 2px solid transparent;
  outline-offset: 2px;
  min-height: 56px;
  isolation: isolate;
}

.rugby-score-link:focus {
  @apply outline-emerald-700;
  outline-width: 3px;
}

.rugby-score-link:hover {
  @apply shadow-xl;
  @apply scale-105;
  @apply border-opacity-30;
  transform: translateY(-2px);
}

.rugby-score-link:active {
  @apply scale-100;
  transform: translateY(0);
}

.rugby-score-link__gradient {
  @apply absolute inset-0 z-0;
  background: linear-gradient(
    90deg,
    theme('colors.emerald.500') 0%,
    theme('colors.green.500') 50%,
    theme('colors.emerald.500') 100%
  );
  
  background-size: 200% 100%;
  background-position: 100% 0;
  
  transition: background-position 0.8s ease;
}

.rugby-score-link:hover .rugby-score-link__gradient {
  background-position: 0 0;
}

.rugby-score-link--pulse {
  animation: rugby-pulse 2s infinite;
}

@keyframes rugby-pulse {
  0%, 100% {
    box-shadow: 
      0 0 0 0 rgba(16, 185, 129, 0.7),
      0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }
  50% {
    box-shadow: 
      0 0 0 10px rgba(16, 185, 129, 0),
      0 20px 40px -10px rgba(0, 0, 0, 0.2);
  }
}

.rugby-score-link__try-indicator {
  @apply ml-3;
  animation: try-celebration 0.6s ease-out;
  display: inline-block;
}

@keyframes try-celebration {
  0% {
    transform: scale(0.8) rotate(-15deg);
    opacity: 0;
  }
  70% {
    transform: scale(1.2) rotate(5deg);
  }
  100% {
    transform: scale(1) rotate(0);
    opacity: 1;
  }
}

.rugby-score-link__content {
  @apply relative z-10;
  @apply flex items-center;
  @apply transition-all duration-300;
}

.rugby-score-link--loading {
  @apply cursor-wait;
}

.rugby-score-link--loading .rugby-score-link__content::after {
  content: '';
  @apply ml-3 h-5 w-5;
  @apply border-2 border-white border-t-transparent;
  @apply rounded-full;
  animation: rugby-spin 0.8s linear infinite;
}

@keyframes rugby-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .rugby-score-link {
    @apply px-6 py-3;
    @apply text-base;
  }
}

@media (prefers-contrast: high) {
  .rugby-score-link {
    @apply border-2 border-white;
  }
  
  .rugby-score-link__gradient {
    background: theme('colors.emerald.700');
  }
}

@media (prefers-reduced-motion: reduce) {
  .rugby-score-link,
  .rugby-score-link:hover,
  .rugby-score-link__gradient,
  .rugby-score-link__try-indicator {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
  
  .rugby-score-link--pulse {
    @apply shadow-lg;
  }
}
</style>