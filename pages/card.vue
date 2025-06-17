<template>
  <div
    class="mt-15 relative mx-auto max-w-xl overflow-hidden rounded-xl border
           border-gray-200 bg-white p-4 shadow-md"
  >
    <img
      src="~/assets/images/tfw9s.png"
      alt="background logo"
      class="
      absolute left-1/2 top-1/2 z-0 w-64 -translate-x-1/2
      -translate-y-1/2 opacity-5"
    >

    <div class="relative z-10">
      <div v-if="loading" class="py-10 text-center">
        <VProgressCircular indeterminate color="primary" />
        <p class="mt-4">
        Loading player data...
        </p>
      </div>

      <div v-else-if="error" class="py-10 text-center text-red-500">
        Error loading player data: {{ error }}
        <VBtn class="mt-4" @click="fetchPlayerData">
        Retry
        </VBtn>
      </div>

      <div v-else>
        <div
          class="sm:gap-22 flex flex-col items-center
                 justify-center gap-20 sm:flex-row sm:items-start"
        >
          <div
            class="mr-2 flex flex-col items-center
                   gap-3 sm:mr-4 sm:items-start sm:gap-4"
          >
            <img
              src="~/assets/images/tfw9s.png"
              alt="logo"
              class="w-20 sm:w-24"
            >
            <div class="text-center sm:text-left">
              <p class="text-lg font-bold tracking-wider sm:text-xl">
                {{ player.firstName.toUpperCase() }}
              </p>
              <p class="text-base font-semibold sm:text-lg">
                {{ player.lastName }}
              </p>
              <p class="mt-2 text-sm tracking-widest">
                {{ formatDate(player.dateOfBirth) }}
              </p>
            </div>
          </div>

          <div class="ml-2 flex flex-col items-center gap-2 sm:ml-4">
            <p class="text-xl font-bold sm:text-2xl">
              TFW9'S
            </p>
            <img
              :src="playerPhoto || require('~/assets/images/tfw9s.png')"
              alt="Player"
              class="h-48 w-40 rounded-xl border
                    border-gray-300 object-cover"
            >
          </div>
        </div>

        <div
          class="mt-6 rounded-b-xl bg-green-600 py-2
                 text-center text-lg font-bold tracking-widest text-white
                 sm:text-xl"
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
  mounted() {
    this.fetchPlayerData();
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
  }
}

</script>