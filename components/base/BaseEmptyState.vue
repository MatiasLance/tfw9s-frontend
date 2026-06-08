<template>
  <section class="col-span-1 lg:col-span-3 flex flex-col items-center justify-center min-h-[320px] p-8 text-center group">
    
    <div class="relative mb-6">
      <div class="absolute inset-0 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-500/20 transition-colors duration-500"></div>
      
      <div class="relative w-20 h-20 flex items-center justify-center 
                  rounded-full bg-gray-100 dark:bg-gray-900 
                  border border-gray-200 dark:border-gray-800
                  group-hover:scale-110 group-hover:border-green-500/50 
                  transition-all duration-300 ease-out">
        <i :class="[icon, 'text-4xl text-gray-400 dark:text-gray-500 group-hover:text-green-500 transition-colors duration-300']"></i>
      </div>
    </div>

    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
      {{ title }}
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed mb-6">
      {{ description }}
    </p>

    <button
      v-if="showButton"
      type="button"
      class="group/btn flex items-center justify-center gap-2 px-6 py-2.5
             rounded-lg bg-green-600 text-white font-semibold text-sm
             border border-green-700
             shadow-lg shadow-green-900/20
             hover:bg-green-500 hover:border-green-400
             hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/40
             active:translate-y-0 active:shadow-md
             focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900
             transition-all duration-300 ease-out"
      @click="$emit('action')"
    >
      <i :class="[buttonIcon, 'text-white text-lg transition-transform duration-300 group-hover/btn:rotate-90']"></i>
      <span class="text-white">{{ buttonText }}</span>
    </button>
  </section>
</template>

<script>
export default {
  name: 'BaseEmptyState',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'ri-calendar-event-line'
    },
    showButton: {
      type: Boolean,
      default: true
    },
    buttonText: {
      type: String,
      default: 'Add First Match'
    },
    buttonIcon: {
      type: String,
      default: 'ri-add-fill'
    }
  }
}
</script>