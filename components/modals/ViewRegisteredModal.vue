<template>
  <OModal :active="active" @close="closeDialog">
    <div
      class="w-full mx-auto rounded bg-white sm:w-[700px] sm:p-4 
      mt-15 p-4 bg-white overflow-hidden"
    >
      <img
        src="~/assets/images/tfw9s.png"
        alt="background logo"
        class="
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        w-64 opacity-5 z-0 mr-5"
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
                class="w-20 sm:w-24 sm:mr-8"
              >
              <div class="text-center sm:text-left">
                <p class="font-bold text-lg sm:text-xl tracking-wider">
                  {{ firstName.toUpperCase() }}
                </p>
                <p class="font-semibold text-base sm:text-lg">
                  {{ lastName }}
                </p>
                <p class="text-sm mt-2 tracking-widest">
                  {{ formattedDateOfBirth }}
                </p>
              </div>
            </div>

            <div class="flex flex-col items-center gap-2 ml-2 sm:ml-4">
              <p class="font-bold text-xl sm:text-2xl">
                TFW9'S
              </p>
           <img
                :src="playerPhoto"
                alt="Player"
                class="rounded-xl object-cover w-40 h-48 border border-gray-300"
                @error="handleImageError"
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
  </OModal>
</template>

<script>
export default {
  name: 'ViewRegisteredModal',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    player: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {
      loading: false,
      error: null,
      imageError: false
    }
  },
  computed: {
  firstName() {
    return this.player?.player_firstname || '';
  },
  lastName() {
    return this.player?.player_lastname || '';
  },
dateOfBirth() {
    return this.player?.date_of_birth || 
           this.player?.dob ||
           null;
  },
formattedDateOfBirth() {
    const rawDate = this.dateOfBirth;
    if (!rawDate) return 'Date not available';
    
    try {
      // Handle both ISO format (YYYY-MM-DD) and slash format (DD/MM/YYYY)
      let dateObj;
      
      if (typeof rawDate === 'string') {
        if (rawDate.includes('/')) {
          // Handle DD/MM/YYYY format
          const [day, month, year] = rawDate.split('/');
          dateObj = new Date(`${year}-${month}-${day}`);
        } else {
          // Handle ISO format or other string formats
          dateObj = new Date(rawDate);
        }
      } else if (typeof rawDate === 'number') {
        // Handle timestamp
        dateObj = new Date(rawDate);
      } else {
        // Fallback
        dateObj = new Date(rawDate);
      }

      if (isNaN(dateObj.getTime())) {
        console.error('Invalid date:', rawDate);
        return 'Invalid date';
      }

      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      console.error('Date formatting error:', e);
      return 'Invalid date format';
    }
  },
    playerPhoto() {
      // First try the direct photo prop
      if (this.player?.photo) {
        return this.player.photo;
      }
      // Then try the media relationship if available
      if (this.player?.media?.length > 0) {
        const media = this.player.media[0];
        if (media.path) {
          return `${process.env.APP_URL || window.location.origin}/storage/${media.path}`;
        }
      }
      return require('~/assets/images/kidsplaying.jpg');
    }
  },
  methods: {
      formatDate(date) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      },
      closeDialog() {
        this.$emit('close');
          },
    handleImageError() {
      this.imageError = true;
    }
    }
}
</script>