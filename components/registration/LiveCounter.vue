<template>
  <div 
    :class="[
      'transition-all duration-500 ease-in-out p-4',
      'rounded-t-lg border-b shadow-sm mx-auto max-w-screen-xl', 
      statusClasses.container
    ]"
  >
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      <div class="flex items-start gap-3">
        <div class="mt-1 relative flex h-3 w-3">
          <span :class="[
            'animate-ping absolute inline-flex h-full',
            'w-full rounded-full opacity-75',
            statusClasses.indicator
          ]"
          ></span>
          <span :class="[
            'relative inline-flex rounded-full h-3 w-3',
            statusClasses.indicator
            ]"
            ></span>
        </div>
        <div>
          <h3 class="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            {{ statusLabel }}
          </h3>
          <p class="text-xs text-white/80 mt-1 leading-relaxed">
            {{ statusDescription }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="bg-black/20 backdrop-blur-sm px-3
         py-2 rounded-md border border-white/10 text-center min-w-[100px]"
        >
          <p class="text-[10px] uppercase text-white/60 font-semibold mb-1">
            In Checkout
          </p>
          <p class="text-lg font-mono font-bold text-white">
            {{ stats.active_shoppers }}<span class="text-xs font-normal opacity-50 ml-1">/
            {{ stats.total_limit }}</span>
          </p>
        </div>
        
        <div v-if="stats.active_shoppers >= stats.total_limit" 
          class="bg-white/10 px-3 py-2 rounded-md border
          border-white/10 text-center min-w-[100px]"
        >
           <p class="text-[10px] uppercase text-white/60 font-semibold mb-1">
            Queue Size
          </p>
          <p class="text-lg font-mono font-bold text-white">
            {{ stats.active_shoppers - stats.total_limit }}
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'LiveCounter',
  props: {
    seriesId: {
      type: [ String, Number ],
      required: true
    }
  },
  data() {
    return {
      stats: {
        /* eslint-disable camelcase */
        active_shoppers: 0,
        /* eslint-disable camelcase */
        slots_available: 0,
        /* eslint-disable camelcase */
        total_limit: 20 
      },
      polling: null
    };
  },
  computed: {
    trafficLevel() {
      const shoppers = this.stats.active_shoppers;
      const limit = this.stats.total_limit;

      if (shoppers >= limit) return 'CRITICAL';
      if (shoppers >= limit * 0.75) return 'HIGH';
      return 'STABLE';
    },

    statusLabel() {
      const labels = {
        'STABLE': 'System Healthy',
        'HIGH': 'High Traffic Detected',
        'CRITICAL': 'Waiting Room Active'
      };
      return labels[this.trafficLevel];
    },

    statusDescription() {
      const descriptions = {
        'STABLE': 'Slots available. Proceed to payment for instant processing.',
        'HIGH': 'Many users are currently registering. Your checkout speed may vary.',
        'CRITICAL': 'The payment gateway is at capacity. You will be queued automatically.'
      };
      return descriptions[this.trafficLevel];
    },

    statusClasses() {
      const styles = {
        'STABLE': {
          container: 'bg-green-700 border-green-600',
          indicator: 'bg-green-300'
        },
        'HIGH': {
          container: 'bg-orange-600 border-orange-500',
          indicator: 'bg-orange-200'
        },
        'CRITICAL': {
          container: 'bg-red-700 border-red-600',
          indicator: 'bg-red-200'
        }
      };
      return styles[this.trafficLevel];
    }
  },
  mounted() {
    this.fetchStats();
    this.polling = setInterval(this.fetchStats, 10000);
  },
  beforeDestroy() {
    if (this.polling) clearInterval(this.polling);
  },
  methods: {
    async fetchStats() {
      try {
        const response = await this.$axios.$get(`v1/lounge/stats/${this.seriesId}`);
        this.stats = response;
      } catch (error) {
        console.error('Failed to fetch live traffic stats:', error);
      }
    }
  }
};
</script>

<style scoped>
.bg-red-200 {
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}
</style>