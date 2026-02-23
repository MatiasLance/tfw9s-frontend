<template>
  <Transition name="slide-up">
    <div
    v-if="updateAvailable"
    class="fixed bottom-6 right-6 z-[99999] max-w-[320px] w-full"
    >
      <div class="bg-white border border-gray-200 shadow-2xl
      rounded-xl p-4 flex flex-col space-y-4"
      >
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0 bg-blue-50 p-2 rounded-lg">
            <i class="ri-restart-line text-blue-600 text-xl"></i>
          </div>
          <div class="flex-1">
            <h4 class="text-gray-900 font-semibold text-sm leading-tight">
              Update Available
            </h4>
            <p class="text-gray-500 text-xs mt-1">
              A newer version is ready for you.
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button
          type="button"
          @click="refreshApp"
          class="flex-1 bg-gray-900 hover:bg-black text-white
          text-xs font-bold py-2.5 px-4 rounded-lg flex
          items-center justify-center space-x-1"
          >
            <i class="ri-refresh-line mr-1"></i>
            <span>Refresh Now</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  data() {
    return {
      updateAvailable: false,
    }
  },

  mounted() {
    if (process.browser && this.$socket) {
      this.$socket.on('trigger-update-notification', (data) => {
        console.log('Live update signal received!', data.version);
        
        this.updateAvailable = true; 
      });
    }
  },

  methods: {
    refreshApp() {
      window.location.reload(true);
    }
  }
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active { 
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>