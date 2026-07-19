<template>
  <div class="min-h-screen bg-[#1A1A1B] text-white font-sans">
    <section v-if="isLoading" class="flex h-screen items-center justify-center">
      <VProgressCircular size="80" width="6" indeterminate color="green-accent-3" />
    </section>

    <section v-else-if="record && record.id" class="flex flex-col gap-0">
      
      <div class="relative w-full overflow-hidden border-b-4 border-green-600 shadow-2xl">
        <VCarousel
          height="500"
          :show-arrows="false"
          cycle
          hide-delimiters
          class="hero-carousel"
        >
          <VCarouselItem
          v-for="(photo, i) in photos"
          :key="i"
          :src="photo" cover
          transition="fade-transition"
          >
            <div class="absolute inset-0 bg-gradient-to-t
            from-[#1A1A1B] via-transparent to-black/30"
            ></div>
            
            <button
             type="button"
              class="absolute left-6 top-6 z-20 flex items-center
              gap-2 rounded-full bg-black/60 px-5 py-2 backdrop-blur-md
              transition hover:bg-green-600 group"
              @click="$router.back()"
            >
              <i class="ri-arrow-left-line text-green-400 group-hover:text-white"></i>
              <span class="text-xs font-black tracking-widest uppercase italic">
                Back to Home
            </span>
            </button>

            <div class="absolute bottom-12 left-0 w-full px-6 lg:px-20">
              <div class="max-w-screen-xl mx-auto">
                <span class="inline-block bg-green-600 px-3 py-1 text-[10px]
                font-black uppercase tracking-widest italic mb-3"
                >
                  Official Tournament
                </span>
                <h1 class="text-5xl md:text-7xl font-black uppercase
                italic tracking-tighter text-white drop-shadow-xl leading-none"
                >
                  {{ record.item ? record.item.name : 'Unknown' }}
                </h1>
                <p class="mt-4 flex items-center gap-3 text-xl font-bold text-green-400">
                  <i class="ri-calendar-todo-fill"></i>
                  {{ SeriesDateRange(record.item) }}
                </p>
              </div>
            </div>

            <template v-slot:placeholder>
              <div class="absolute inset-0 bg-[#242426] animate-pulse
               flex items-center justify-center"
               >
                <i class="ri-image-line text-4xl text-gray-700"></i>
              </div>
            </template>
          </VCarouselItem>

          <VCarouselItem
          v-if="photos.length === 0"
          src="https://i.imgur.com/jJNXPBf.jpeg"
          cover
          >
            <div class="absolute inset-0 bg-black/40"></div>
          </VCarouselItem>
        </VCarousel>
      </div>

      <section class="mx-auto grid w-full max-w-screen-xl gap-10 p-6 lg:grid-cols-3 lg:py-12">
        <div class="lg:col-span-2">
          <div class="mb-6 flex items-center gap-3">
            <div class="h-8 w-1 bg-green-500"></div>
            <h3 class="text-2xl font-black uppercase italic tracking-tight">
                Series Overview
            </h3>
          </div>
          <p class="text-lg leading-relaxed text-gray-300 antialiased">
            {{ series.description }}
          </p>
        </div>
        
        <aside
            v-if="teams && teams.length > 0"
            class="rounded-2xl bg-gray-900/40 p-6 border
            border-gray-800 backdrop-blur-sm"
            >
          <h3 class="mb-5 text-xs font-black uppercase
          tracking-[0.2em] text-gray-500"
          >
            Squad Details
        </h3>
          <div 
            v-for="team in teams" 
            :key="team.id" 
            class="flex items-center gap-4 mb-4 border-b
            border-gray-800 pb-4 last:border-0 last:pb-0"
          >
            <div class="size-14 rounded-lg bg-white p-2
            flex items-center justify-center overflow-hidden shadow-inner">
              <img
              v-if="team.media" :src="getMediaURL(team.media[0])"
              class="max-h-full object-contain"
              />
              <i v-else class="ri-shield-flash-line text-gray-300 text-2xl"></i>
            </div>
            <div>
              <div class="text-lg font-black uppercase italic leading-none">
                {{ team.name || 'Unknown Team' }}
            </div>
              <div class="mt-1 text-xs text-green-500 font-bold uppercase tracking-wider">
                Category: {{ team.agegroup ? team.agegroup.name : 'Open' }}
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section v-if="players && players.length > 0" class="bg-[#141415] py-12">
        <div class="mx-auto w-full max-w-screen-xl px-6">
          <div class="mb-10 text-center">
            <h2 class="text-4xl font-black uppercase italic tracking-tighter">
              Manage <span class="text-green-500">Player Rosters</span>
            </h2>
            <div class="mx-auto mt-2 h-1 w-24 bg-green-600"></div>
          </div>

          <div class="grid gap-8 md:grid-cols-2">
            <div
              v-for="player in players"
              :key="player.id"
              class="group relative overflow-hidden rounded-3xl
              bg-[#1E1E20] p-6 transition-all hover:ring-2
              hover:ring-green-500/50 shadow-xl"
            >
              <PlayerCardView
                id="player-card"
                :player="player"
                @image-click="openEditImageModal(player)"
              />
              
              <div class="mt-6 flex flex-col sm:flex-row gap-3">
                <VBtn
                  v-if="player.data"
                  color="#10B981"
                  elevation="10"
                  class="flex-1 font-black italic tracking-wider rounded-xl py-6"
                  :loading="generating"
                  block
                  @click="savePlayerImage(player)"
                >
                  <i class="ri-upload-cloud-2-line mr-2"></i> SAVE CHANGES
                </VBtn>
                <VBtn
                  variant="outlined"
                  color="white"
                  class="flex-1 font-black italic tracking-wider rounded-xl border-2 py-6"
                  :loading="generating"
                  block
                  @click="generatePlayerCard(player)"
                >
                  <i class="ri-download-2-line mr-2"></i> GET PLAYER CARD
                </VBtn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>

    <section v-else class="min-h-screen bg-slate-900 flex items-center justify-center p-4">
    <div class="max-w-md w-full text-center">
      <div class="relative mb-8">
        <div class="w-28 h-28 mx-auto bg-green-600 rounded-full rotate-45 
          shadow-xl shadow-green-900/50 relative"
          >
          <div class="absolute inset-x-0 top-1/2 h-1.5
          bg-green-800 transform -translate-y-1/2"
          ></div>
          <div class="absolute left-1/2 top-0 w-1.5 h-full
          bg-green-800 transform -translate-x-1/2"
          ></div>
          <div class="absolute -left-2 top-1/2 w-4 h-4
          bg-green-700 rounded-full transform -translate-y-1/2"
          ></div>
          <div class="absolute -right-2 top-1/2 w-4 h-4
          bg-green-700 rounded-full transform -translate-y-1/2"
          ></div>
        </div>
      </div>

      <h1 class="text-5xl font-black uppercase italic text-white mb-2">
        Record Not Found
      </h1>
      
      <div class="h-1 w-20 bg-green-500 mx-auto my-6"></div>

      <p class="text-gray-400 text-lg mb-8">
        This match or tournament doesn't exist. 
        <span class="text-green-400 font-semibold">Knock-on!</span> 
        Try checking the link or go back.
      </p>

      <div class="space-y-3">
        <button
          type="button"
          class="w-full bg-green-600 hover:bg-green-500 
                text-white font-black uppercase italic py-4 px-6
                transition-all duration-200 transform hover:scale-105
                shadow-lg hover:shadow-green-500/25
                flex items-center justify-center gap-2"
          @click="$router.push('/')"
        >
          <i class="ri-home-4-line"></i>
          <span>Home Pitch</span>
        </button>
      </div>

    </div>
  </section>

    <OModal :active="showUploadModal" @close="showUploadModal = false">
      <div class="bg-[#1A1A1B] p-6 border border-gray-800 rounded-2xl">
        <h3 class="text-xl font-black uppercase italic mb-4 text-green-500">
            Update Player Photo
        </h3>
        <ImageCropper
          :width="400"
          :height="400"
          :prevent-white-space="true"
          initial-size="cover"
          @upload="handleUpload"
        />
        <button
          type="button"
          @click="showUploadModal = false"
          class="mt-4 w-full text-gray-500 text-xs font-bold uppercase hover:text-white"
        >
          Cancel Upload
        </button>
      </div>
    </OModal>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import { toPng } from 'html-to-image';
import PlayerCardView from '../components/PlayerCardView.vue';
import ImageCropper from '../components/ImageCropper.vue';
import handlesMedia from '~/mixins/shop/handlesMedia'
import handlesCoordinates from '~/mixins/utilities/handlesCoordinates'
import currencyMixin from '~/mixins/currency'
import formattedDate from '~/mixins/utilities/formattedDate'

export default {
  name: 'transaction',
  components: { PlayerCardView, ImageCropper },
  mixins: [
    currencyMixin,
    handlesMedia,
    handlesCoordinates,
    formattedDate
  ],
  data() {
    return {
      record: null,
      series: {},
      players: [],
      teams: [],
      photos: [],
      isLoading: true,
      showUploadModal: false,
      selected: {},
      generating: false,
    };
  },
  mounted() {
    if (this.$route.query.key) {
      this.retrieveTransaction(this.$route.query.key);
    } else {
      this.isLoading = false;
    }
  },
  methods: {
    openEditImageModal(player) {
      this.selected = { ...player };
      this.showUploadModal = true;
    },
    async retrieveTransaction(key) {
      try {
        const response = await this.$axios.$get(`v1/transaction/retrieve/${key}`);
        const data = response.data.record;
        this.record = data;
        this.series = data.item || {};
        this.players = data.players || [];
        this.teams = data.teams || [];
        
        if (this.series.media) {
          this.photos = this.series.media.map(x => `${this.$config.baseURL}/storage/${x.path}`);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        this.isLoading = false;
      }
    },
    SeriesDateRange(series) {
      if (!series || !series.start) return 'Dates TBD';
      // Re-using your existing logic but making it safer
      const start = new Date(series.start);
      const end = new Date(series.end);
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ];
      return `${months[start.getMonth()]}
      ${start.getDate()} - ${months[end.getMonth()]}
      ${end.getDate()}, ${end.getFullYear()}`;
    },
    handleUpload(image) {
      if (!image) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        this.selected.media = [ reader.result ];
        this.selected.data = image;
        this.setPlayerImage();
      };
      reader.readAsDataURL(image);
    },
    setPlayerImage() {
      this.players = this.players.map(p => p.id === this.selected.id ? { ...this.selected } : p);
      this.showUploadModal = false;
    },
    async generatePlayerCard(player) {
      this.generating = true;
      try {
        await document.fonts.ready;
        const node = document.getElementById('player-card');
        const dataUrl = await toPng(node, { pixelRatio: 3, cacheBust: true });
        const link = document.createElement('a');
        link.download = `${player.player_firstname}-card.png`.toLowerCase();
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Export failed', err);
      } finally {
        this.generating = false;
      }
    },
    async savePlayerImage(player) {
      this.generating = true;
      const formData = new FormData();
      formData.append('photo', player.data, 'photo.jpg');
      try {
        await this.$axios.$post(`v1/players/savemedia/${player.id}`, formData);
        this.retrieveTransaction(this.$route.query.key);
      } catch (error) {
        console.error('Save failed', error);
      } finally {
        this.generating = false;
      }
    }
  }
};
</script>

<style scoped>
h1, h2, h3, .font-black {
  font-family: sans-serif;
  font-weight: 900;
  font-style: normal;
  text-transform: uppercase;
}

.hero-carousel::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #1A1A1B;
  clip-path: polygon(0 100%, 100% 100%, 100% 0);
}

/* Custom transitions for buttons */
.v-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.v-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}
</style>