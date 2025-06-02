<template>
  <div
    class="max-w-xl mx-auto mt-15 p-4 bg-white rounded-xl shadow-md
           border border-gray-200 relative overflow-hidden"
  >
    <img
      src="~/assets/images/tfw9s.png"
      alt="background logo"
      class="
      absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      w-64 opacity-5 z-0"
    >

    <div class="relative z-10">
      <div v-if="loading" class="text-center py-10">
        <VProgressCircular indeterminate color="primary" />
        <p class="mt-4">Loading player data...</p>
      </div>

      <div v-else-if="error" class="text-center py-10 text-red-500">
        Error loading player data: {{ error }}
        <VBtn @click="fetchPlayerData" class="mt-4">Retry</VBtn>
      </div>

      <div v-else>
        <div
          class="flex flex-col sm:flex-row justify-center
                 items-center sm:items-start gap-20 sm:gap-22"
        >
          <div
            class="flex flex-col items-center sm:items-start
                   gap-3 sm:gap-4 mr-2 sm:mr-4"
          >
            <img
              src="~/assets/images/tfw9s.png"
              alt="logo"
              class="w-20 sm:w-24"
            >
            <div class="text-center sm:text-left">
              <p class="font-bold text-lg sm:text-xl tracking-wider">
                {{ player.firstName.toUpperCase() }}
              </p>
              <p class="font-semibold text-base sm:text-lg">
                {{ player.lastName }}
              </p>
              <p class="text-sm mt-2 tracking-widest">
                {{ formatDate(player.dateOfBirth) }}
              </p>
            </div>
          </div>

          <div class="flex flex-col items-center gap-2 ml-2 sm:ml-4">
            <p class="font-bold text-xl sm:text-2xl">
              TFW9'S
            </p>
            <img
              :src="playerPhoto || require('~/assets/images/tfw9s.png')"
              alt="Player"
              class="rounded-xl object-cover w-40 h-48
                    border border-gray-300"
            >
          </div>
        </div>

        <div
          class="mt-6 bg-green-600 text-white text-center
                 font-bold py-2 rounded-b-xl text-lg sm:text-xl
                 tracking-widest"
        >
          REGISTERED PLAYER
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      error: null,
      debugInfo: null,
      player: {
        firstName: 'Loading...',
        lastName: 'Loading...',
        dateOfBirth: new Date().toISOString(),
      },
      playerPhoto: null
    }
  },
  methods: {
    async fetchPlayerData() {
      this.loading = true;
      this.error = null;
      this.debugInfo = null;
      
      try {
        console.log('Route query:', this.$route.query);
        const encryptedKey = this.$route.query.key;
        
        if (!encryptedKey) {
          throw new Error('No player key provided in URL');
        }

        // Debug the key decoding
        let payload;
        try {
          payload = JSON.parse(atob(encryptedKey));
          console.log('Decoded payload:', payload);
        } catch (decodeError) {
          throw new Error('Failed to decode key: ' + decodeError.message);
        }

        // Determine endpoint
        let endpoint;
        if (payload.type === 'individual') {
          endpoint = `/v1/tournament/indiv/player/${payload.target}`;
        } else if (payload.type === 'team') {
          endpoint = `/v1/tournament/team/player/${payload.target}`;
        } else {
          throw new Error(`Unknown registration type: ${payload.type}`);
        }

        console.log('Attempting to fetch from endpoint:', endpoint);
        
        // Make API request
        const response = await this.$axios.$get(endpoint)
          .catch(err => {
            console.error('API Error:', err);
            if (err.response) {
              console.error('Response data:', err.response.data);
              console.error('Response status:', err.response.status);
            }
            throw err;
          });

        console.log('API Response:', response);
        
        if (!response.data) {
          throw new Error('Invalid response structure - missing data');
        }

        this.player = {
          firstName: response.data.first_name || 'First',
          lastName: response.data.last_name || 'Last',
          dateOfBirth: response.data.date_of_birth || new Date().toISOString(),
        };
        
        this.playerPhoto = response.data.photo_url || null;
        
        this.debugInfo = {
          encryptedKey,
          decodedPayload: payload,
          apiEndpoint: endpoint,
          apiResponse: response
        };

      } catch (err) {
        console.error('Full error:', err);
        this.error = `Error: ${err.message}`;
        this.debugInfo = {
          error: err,
          stack: err.stack
        };
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchPlayerData();
  }
}

</script>