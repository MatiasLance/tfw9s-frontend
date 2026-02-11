<template>
  <div class="waiting-lounge">
    <div class="text-center mb-8">
      <div class="text-4xl mb-4">
        ⏳
      </div>
      <h2 class="text-xl font-bold text-gray-800">
        Waiting Lounge
      </h2>
      <p class="text-gray-600 mt-1">
        Your team is in line for registration
      </p>
    </div>

    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <div class="text-center">
        <div class="text-3xl font-bold text-blue-700 mb-2">
          Position #{{ queuePosition }}
        </div>
        <div class="text-blue-600 text-sm">
          in the queue
        </div>
      </div>

      <div class="mt-6">
        <div class="flex justify-between text-sm text-blue-700 mb-1">
          <span>Your position</span>
          <span>{{ estimatedWait }} min wait</span>
        </div>
        <div class="w-full bg-blue-200 rounded-full h-2">
          <div 
            class="bg-blue-600 h-2 rounded-full transition-all duration-500"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-blue-600 mt-1">
          <span>Start</span>
          <span>Your turn</span>
          <span>End</span>
        </div>
      </div>
    </div>

    <div class="space-y-4 mb-6">
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-gray-800">
            {{ status.available_slots || 0 }}
          </div>
          <div class="text-sm text-gray-600 mt-1">
            Available Slots
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-gray-800">
            {{ teamsAhead }}
          </div>
          <div class="text-sm text-gray-600 mt-1">
            Teams Ahead
          </div>
        </div>
      </div>
      
      <div class="bg-gray-50 rounded-lg p-4">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center">
            <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span class="text-sm font-medium text-gray-700">Live Status</span>
          </div>
          <span class="text-xs text-gray-500">
            {{ lastUpdated }}
          </span>
        </div>
        
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Total in queue:</span>
            <span class="font-medium">{{ status.total_in_queue || 0 }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Estimated wait:</span>
            <span class="font-medium">{{ estimatedWait }} minutes</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Max teams:</span>
            <span class="font-medium">{{ maxTeams }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-3">
      <button
        type="button"
        @click="refreshStatus"
        :disabled="isRefreshing"
        :class="[
          'w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center',
          isRefreshing 
            ? 'bg-gray-200 text-gray-500 cursor-wait' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
      >
        <span v-if="isRefreshing" class="animate-spin mr-2">⟳</span>
        Refresh Status
      </button>
      
      <button
        type="button"
        @click="leaveQueue"
        class="w-full py-3 bg-red-50 text-red-700 rounded-lg font-medium
        hover:bg-red-100 transition-colors border border-red-200"
      >
        Leave Queue
      </button>
    </div>

    <div class="mt-6 pt-4 border-t border-gray-200">
      <div class="text-center text-xs text-gray-500 mb-2">
        <div class="flex items-center justify-center">
          <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Auto-refreshing every 15 seconds
        </div>
      </div>
      <p class="text-xs text-gray-600 text-center">
        Keep this page open. You'll be notified when it's your turn.
      </p>
    </div>

    <div 
      v-if="slotAvailable"
      class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-pulse"
    >
      <div class="flex items-center">
        <span class="text-green-600 mr-2">🎉</span>
        <div>
          <p class="font-medium text-green-800">
            Slot Available!
          </p>
          <p class="text-sm text-green-600 mt-1">
            Redirecting to registration in {{ countdown }} seconds...
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemId: {
      type: String,
      required: true
    },
    queuePosition: {
      type: Number,
      required: true
    },
    maxTeams: {
      type: Number,
      default: 5
    }
  },
  
  data() {
    return {
      status: {},
      isRefreshing: false,
      refreshInterval: null,
      lastUpdated: 'Just now',
      slotAvailable: false,
      countdown: 5
    }
  },
  
  computed: {
    teamsAhead() {
      return (this.status.user_position || 1) - 1
    },
    
    estimatedWait() {
      return this.status.estimated_wait || (this.teamsAhead * 5)
    },
    
    progressPercentage() {
      if (!this.status.total_in_queue) return 0
      const position = this.status.user_position || 1
      return Math.min(100, ((position - 1) / this.status.total_in_queue) * 100)
    }
  },
  
  mounted() {
    this.loadQueueStatus()
    
    this.refreshInterval = setInterval(this.loadQueueStatus, 15000)
    
    this.setupEventListeners()
  },
  
  beforeDestroy() {
    this.cleanup()
  },
  
  methods: {
    async loadQueueStatus() {
      try {
        const { data } = await this.$axios.get(
          `/v1/registrations/${this.itemId}/queue-status`,
          /* eslint-disable camelcase */
          { params: { queue_position: this.queuePosition } }
        )
        
        this.status = data
        this.lastUpdated = new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
        
        if (data.is_available && data.user_position === 1) {
          this.handleSlotAvailable()
        }
        
        this.$emit('status-updated', data)
        
      } catch (error) {
        console.error('Failed to load queue status:', error)
        this.$emit('error', error.message)
      }
    },
    
    handleSlotAvailable() {
      this.slotAvailable = true

      const countdownInterval = setInterval(() => {
        this.countdown--
        
        if (this.countdown <= 0) {
          clearInterval(countdownInterval)
          this.$emit('slot-available')
        }
      }, 1000)
    },
    
    refreshStatus() {
      this.isRefreshing = true
      this.loadQueueStatus()
      
      setTimeout(() => {
        this.isRefreshing = false
      }, 1000)
    },
    
    async leaveQueue() {
      const confirmed = await this.$confirm(
        'Leave Queue?',
        'Are you sure you want to leave the waiting lounge?',
        {
          confirmButtonText: 'Yes, leave',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      ).catch(() => false)
      
      if (confirmed) {
        try {
          await this.$axios.delete(`/v1/registrations/${this.itemId}/queue`,
            {
              /* eslint-disable camelcase */
              params: { queue_position: this.queuePosition }
            })
          
          this.$emit('left-queue')
          
        } catch (error) {
          this.$notify.error({
            title: 'Error',
            message: 'Failed to leave queue. Please try again.'
          })
        }
      }
    },
    
    setupEventListeners() {
      // Listen for custom events if using WebSockets or similar
      window.addEventListener('registration-slot-available', (event) => {
        if (event.detail.itemId === this.itemId) {
          this.loadQueueStatus()
        }
      })
    },
    
    cleanup() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval)
      }
      
      window.removeEventListener('registration-slot-available', this.loadQueueStatus)
    }
  }
}
</script>

<style scoped>
.waiting-lounge {
  @apply max-w-md mx-auto;
}

/* Custom animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>