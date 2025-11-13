<template>
    <div>
        <!-- Loading indicator -->
        <section v-if="isLoading">
        <div class="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50">
            <div class="text-center">
            <!-- Rugby Ball Spinner -->
            <div class="relative">
                <!-- Outer Ring -->
                <div class="
                w-20 h-20 border-4 border-green-500/30 
                rounded-full animate-spin
                "></div>
                
                <!-- Rugby Ball -->
                <div class="
                absolute inset-0 flex items-center justify-center
                ">
                <div class="
                    w-12 h-8 bg-gradient-to-r from-green-500 to-emerald-600 
                    rounded-full relative transform -rotate-45
                    animate-bounce
                ">
                    <!-- Rugby Ball Details -->
                    <div class="
                    absolute inset-1 bg-green-700 rounded-full 
                    border-2 border-green-300
                    "></div>
                    <div class="
                    absolute top-1/2 left-0 right-0 h-0.5 
                    bg-green-300 transform -translate-y-1/2
                    "></div>
                    <div class="
                    absolute top-1/2 left-1/3 w-1 h-2 
                    bg-green-300 transform -translate-y-1/2
                    "></div>
                    <div class="
                    absolute top-1/2 right-1/3 w-1 h-2 
                    bg-green-300 transform -translate-y-1/2
                    "></div>
                </div>
                </div>
            </div>
            
            <!-- Loading Text -->
            <p class="mt-6 text-lg font-semibold text-green-400 animate-pulse">
                Loading tfw9s {{ displayLoadingTitle }}...
            </p>
            
            <!-- Subtle Dots -->
            <div class="flex justify-center space-x-1 mt-4">
                <div class="
                w-2 h-2 bg-green-500 rounded-full 
                animate-bounce delay-0
                "></div>
                <div class="
                w-2 h-2 bg-green-500 rounded-full 
                animate-bounce delay-150
                "></div>
                <div class="
                w-2 h-2 bg-green-500 rounded-full 
                animate-bounce delay-300
                "></div>
            </div>
            </div>
        </div>
        </section>
    </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
      default: false
    },
    loadingTitle: {
      type: String,
      required: true,
      default: 'Draws'
    }
  },

  computed: {
    displayLoadingTitle() {
      return this.loadingTitle
    }
  }
}
</script>