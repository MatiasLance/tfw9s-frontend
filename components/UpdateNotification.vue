<template>
  <transition name="slide-up">
    <div v-if="updateAvailable" class="fixed bottom-6 right-6 z-[99999] max-w-[320px] w-full">
      <div class="bg-white border border-gray-200 shadow-2xl
      rounded-xl p-4 flex flex-col space-y-4"
      >
        
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0 bg-blue-50 p-2 rounded-lg">
            <i class="ri-restart-line text-blue-600 text-xl leading-none"></i>
          </div>
          <div class="flex-1">
            <h4 class="text-gray-900 font-semibold text-sm leading-tight">
              Update Available
            </h4>
            <p class="text-gray-500 text-xs mt-1">
              A newer version of TFW9s is ready for you.
            </p>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <button 
            @click="refreshApp" 
            class="flex-1 bg-gray-900 hover:bg-black text-white text-xs
            font-bold py-2.5 px-4 rounded-lg transition-all
            active:scale-95 flex items-center justify-center space-x-1"
          >
            <i class="ri-refresh-line mr-1"></i>
            <span>Refresh Now</span>
          </button>
          
          <button 
            @click="updateAvailable = false" 
            class="px-4 py-2.5 text-xs text-gray-500 hover:text-gray-800
            font-medium transition-colors"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      updateAvailable: false,
    }
  },
  mounted() {
    if (process.client && 'serviceWorker' in navigator) {
      const sw = navigator.serviceWorker;

      sw.addEventListener('controllerchange', () => {
        this.updateAvailable = true;
      });

      this.checkForUpdates();

      setInterval(() => {
        this.checkForUpdates();
      }, 1000 * 60 * 30);
    }
  },
  methods: {
    checkForUpdates() {
        navigator.serviceWorker.getRegistration().then(reg => {
          if (reg) {
            reg.update(); 

            if (reg.waiting) {
              this.updateAvailable = true;
            }
          }
        });
    },

    refreshApp() {
      this.updateAvailable = false;
      window.location.reload(true);
    }
  }
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-up-enter {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}
</style>