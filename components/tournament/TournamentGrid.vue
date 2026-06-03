<template>
  <article class="grid w-full grid-cols-1 gap-6 pt-4 
                  md:grid-cols-2 xl:grid-cols-3">
    <!-- Clean Tournament Cards -->
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="group relative overflow-hidden rounded-2xl 
             bg-gradient-to-br from-gray-800 to-gray-900 
             shadow-xl border-2 border-green-500/20 
             transform transition-all duration-300 
             hover:scale-105 hover:border-green-400 
             hover:shadow-green-500/25"
      data-aos="zoom-in"
      data-aos-once="true"
      :data-aos-delay="`${index * 100}`"
      @click="handleViewArticle(item.id)"
    >
      <!-- Tournament Image -->
      <div class="relative h-48 overflow-hidden">
        <img
          class="h-full w-full object-cover transition-transform 
                 duration-300 group-hover:scale-105"
          :src="getMediaURL(item.media[0], 'temp')"
          :alt="item.name"
          loading="lazy"
        />
        
        <!-- Date Badge -->
        <div class="absolute top-4 right-4 z-10 rounded-xl 
                    bg-gradient-to-r from-green-600 to-green-800 
                    px-3 py-2 font-bold text-white shadow-lg"
        >
          <div class="text-sm leading-tight">
            {{ formatDateRange(item.start, item.end) }}
          </div>
        </div>
        
        <!-- Price Badge -->
        <div class="absolute top-4 left-4 z-10 rounded-xl 
                    bg-gradient-to-r from-yellow-500 to-yellow-600 
                    px-3 py-2 font-bold text-gray-900 shadow-lg"
        >
          <div class="text-sm text-gray-900 flex items-center">
            <i class="ri-money-dollar-circle-fill mr-1"></i>
            {{ formatCurrencyFromCent(item.price) }}
          </div>
        </div>
      </div>

      <!-- Tournament Content - Always Visible -->
      <div class="p-5">
        <!-- Title -->
        <div class="flex items-start justify-between mb-3">
          <h3 class="text-lg font-bold text-white leading-tight 
                     flex-1 pr-4"
          >
            {{ item.name }}
          </h3>
          <i class="ri-arrow-right-s-line text-green-400 
                    text-lg mt-1 flex-shrink-0"></i>
        </div>

        <!-- Description - Always Visible -->
        <div class="mb-4">
          <p
            class="text-gray-300 text-sm leading-relaxed 
                   line-clamp-3"
            v-html="item.description"
          ></p>
        </div>

        <!-- Action Button -->
        <div class="flex justify-center">
          <button
            type="button"
            @click.stop="handleViewArticle(item.id)"
            class="w-full flex items-center justify-center gap-2 
                   rounded-xl bg-gradient-to-r from-green-500 
                   to-green-600 px-4 py-3 text-sm font-bold 
                   text-white shadow-lg transition-all duration-300 
                   hover:from-green-600 hover:to-green-700 
                   hover:shadow-green-500/50 hover:scale-105 
                   active:scale-95"
          >
            <span class="text-white">
              View Tournament Details
              <i class="ri-arrow-right-line text-sm"></i>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Simple Empty State -->
    <section
      v-if="items.length === 0"
      class="col-span-1 flex h-80 flex-col items-center 
             justify-center rounded-2xl bg-gradient-to-br 
             from-gray-800 to-gray-900 border-2 
             border-dashed border-gray-600 p-8
             md:col-span-3"
    >
      <div class="text-center">
        <!-- Rugby Ball Icon -->
        <div class="mb-4">
          <div class="relative mx-auto">
            <div class="h-16 w-10 rounded-full bg-gradient-to-b 
                        from-green-600 to-green-800 shadow-lg 
                        border-2 border-green-400/50 mx-auto">
              <div class="absolute left-1/2 top-1/2 h-12 w-8 
                          -translate-x-1/2 -translate-y-1/2 
                          rounded-full bg-white/10"></div>
              <div class="absolute left-1/2 top-3 h-1 w-6 
                          -translate-x-1/2 bg-white/40"></div>
              <div class="absolute left-1/2 bottom-3 h-1 w-6 
                          -translate-x-1/2 bg-white/40"></div>
            </div>
          </div>
        </div>
        
        <i class="ri-trophy-line text-4xl text-gray-500 mb-3"></i>
        <h3 class="text-xl font-bold text-gray-400 mb-2">
          No {{ type }} Available
        </h3>
        <p class="text-gray-500 text-sm mb-6">
          Check back later for new rugby tournaments
        </p>
      </div>
    </section>
  </article>
</template>

<script>
import handlesMedia from '~/mixins/shop/handlesMedia';

export default {
  name: 'TournamentGrid',
  
  mixins: [ handlesMedia ],

  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    type: {
      type: String,
      required: true,
      default: 'tournaments'
    }
  },

  methods: {
    formatDateRange(start, end) {
      if (!start || !end) return 'Date TBC'
      
      try {
        const startDate = new Date(start)
        const endDate = new Date(end)
        
        // Same month - show "15-20 Jan"
        if (startDate.getMonth() === endDate.getMonth()) {
          return `${startDate.getDate()}-${endDate.getDate()}
          ${startDate.toLocaleDateString('en-US', { month: 'short' })}`
        }
        
        // Different months - show "15 Jan - 20 Feb"
        return `${startDate.getDate()} ${startDate.toLocaleDateString('en-US',
          { month: 'short' })} - ${endDate.getDate()}
        ${endDate.toLocaleDateString('en-US', { month: 'short' })}`
      } catch (error) {
        console.error('Error formatting date range:', error)
        return 'Date TBC'
      }
    },

    formatCurrencyFromCent(cents) {
      if (!cents || isNaN(cents)) return 'Free'
      
      const dollars = cents / 100
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(dollars)
    },

    handleViewArticle(id) {
      this.$emit('view-article', id, this.type)
    },
  }
}
</script>

<style scoped>
/* Simple transitions */
* {
  transition-property: color, background-color, border-color, 
                       transform, opacity, box-shadow;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Text clamping */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Ensure proper image display */
img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
</style>