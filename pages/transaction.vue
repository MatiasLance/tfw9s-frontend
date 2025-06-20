<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="min-h-screen bg-[#1A1A1B] text-white">
    <section
    v-if="isLoading"
    class="flex h-screen items-center justify-center"
    >
      <VProgressCircular
      size="125"
      width="10"
      indeterminate
      color="gray lighten-2"
      />
    </section>
    <section
    v-else-if="record && record.id"
    class="flex flex-col items-center justify-center gap-4"
    >
      <div class="article-gallery relative w-full max-w-screen-2xl">
        <VCarousel
          height="450"
          :show-arrows="false"
          cycle
          hide-delimiters-background
        >
          <VCarouselItem
            v-for="(photo, i) in photos"
            :key="i"
            :src="photo"
            cover
          >
            <span
              class="back-button absolute left-2
              top-2 z-10 cursor-pointer text-white"
              @click="$router.back()"
            >
              <div class="flex items-center justify-center gap-2 md:m-4">
                <i class="ri-arrow-left-line text-xl"></i>
                <span class="text-sm font-semibold">BACK</span>
              </div>
            </span>
          </VCarouselItem>
          <VCarouselItem
            v-if="photos.length === 0"
            src="http://localhost:8000/_nuxt/assets/images/kidsplaying.jpg"
            cover
          >
            <span
              class="back-button absolute left-2
              top-2 z-10 cursor-pointer text-white"
              @click="$router.back()"
            >
              <div class="flex items-center justify-center gap-2 md:m-4">
                <i class="ri-arrow-left-line text-xl"></i>
                <span class="text-sm font-semibold">BACK</span>
              </div>
            </span>
          </VCarouselItem>
        </VCarousel>
      </div>
      <div
      class="article-context mx-auto w-full
      max-w-screen-xl p-4 font-semibold"
      >
        <span class="text-2xl md:text-3xl">
          {{record.item? record.item.name : 'Unknown'}}
        </span>
        <p class="text-brand-slate text-lg">
          {{ SeriesDateRange(record.item) }}
        </p>
      </div>
      <article
      class="article-description mx-auto
      w-full max-w-screen-xl text-wrap p-4"
      >
        <p
          class="my-4 text-white"
          v-html="series.description"
        />
      </article>
      <article
      v-if="players && players.length > 0"
      class="grid w-full max-w-screen-xl gap-4 p-4 lg:grid-cols-2"
      >
        <div
        v-for="player in players"
        :key="player.id"
        class="flex flex-col items-center justify-center gap-4 rounded-lg bg-gray-800 p-4"
        >
          <PlayerCardView
          id="player-card"
          :player="player"
          @image-click="openEditImageModal(player)"
          />
          <!--
            <VBtn
            color="green"
            class="rounded-md py-2 font-semibold transition hover:brightness-125"
            :loading="generating"
            block
            dark
            @click="generatePlayerCard(player)"
            >
            Generate Registration Card
            </VBtn> 
          -->
        </div>
      </article>
      <article v-if="teams && teams.length > 0"
      class="grid w-full max-w-screen-xl gap-4 p-4"
      >
        <div
        v-for="team in teams"
        :key="team.id"
        class="flex flex-col items-center justify-center
        gap-4 rounded-lg bg-gray-800 p-4 md:flex-row"
        >
          <img
          v-if="team.media"
          :src="getMediaURL(team.media[0])"
          alt="Team Logo"
          class="size-32 object-cover"
          />
          <span class="flex flex-1 flex-col">
            <span class="text-xl font-semibold md:text-2xl">
              {{team.name || 'Unknown'}}
            </span>
            <p class="text-brand-slate text-lg">
              Age Group: {{team.agegroup? team.agegroup.name : 'Unknown'}}
            </p>
          </span>
        </div>
      </article>
    </section>
    <section
    v-else
    class="flex h-screen flex-col items-center justify-center"
    >
      <VIcon size="150" color="red darken-2">
        mdi-alert-circle
      </VIcon>
      <div class="mt-8 text-2xl font-bold text-white">
        Transaction not found
      </div>
      <div class="text-base text-gray-400">
        Opps! We couldn't find the transaction you were looking for.
      </div>
      <div class="mt-4 flex items-center justify-center">
        <span
        class="bg-brand-black mx-2 cursor-pointer px-4 py-2 text-white"
        @click="$router.back()"
        >
          Return
        </span>
      </div>
    </section>
    <OModal :active="showUploadModal" @close="showUploadModal = false">
      <section class="p-4">
        <ImageCropper
        :width="320"
        :height="320"
        @upload="handleUpload"
        />
      </section>
    </OModal>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';
// import domtoimage from 'dom-to-image-more';
// import html2canvas from 'html2canvas';
import { toPng } from 'html-to-image';
import PlayerCardView from '../components/PlayerCardView.vue';
import ImageCropper from '../components/ImageCropper.vue';
import handlesMedia from '~/mixins/shop/handlesMedia'
import handlesCoordinates from '~/mixins/utilities/handlesCoordinates'
import currencyMixin from '~/mixins/currency'
import formattedDate from '~/mixins/utilities/formattedDate'

export default {
  // eslint-disable-next-line vue/component-definition-name-casing
  name: 'transaction',
  components: { PlayerCardView, ImageCropper },
  mixins: [
    currencyMixin,
    handlesMedia,
    handlesCoordinates,
    formattedDate,
  ],
  data() {
    return {
      record: [],
      series: [],
      players: [],
      teams: [],
      activeImageURL: '',
      photos: [],
      isLoading: true,
      showUploadModal: false,
      selected: [],
      generating: false,
    };
  },
  watch: {
    $route() {
      this.retrieveTransaction(this.$route.query.key);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  },
  mounted() {
    this.retrieveTransaction(this.$route.query.key);
  },
  methods: {
    openEditImageModal(player) {
      // Image Upload modal disable for now until further notice
      // this.showUploadModal = true;
      this.selected = { ...player };
    },
    retrieveTransaction(key) {
      this.isLoading = true;
      this.$axios
        .$get(`v1/transaction/retrieve/${key}`)
        .then((response) => {
          this.record = response.data.record
          this.series = response.data.record.item
          this.players = response.data.record.players
          this.teams = response.data.record.teams

          this.activeImageURL = this.getMediaURL(this.series.media[0])
          this.photos = this.series.media.map((x) =>
            `${this.$config.baseURL}/storage/${x.path}`);
        })
        .finally(() => {
          this.isLoading = false;
        })
    },
    formattedDate(dateString) {
      const date = new Date(dateString);
      date.setHours(0, 0, 0, 0);
      return date;
    },
    SeriesDateRange(series) {
      const start = this.formattedDate(series.start)
      const end = this.formattedDate(series.end)

      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      const suffixes = [
        'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'
      ];
      const startdate = start.getDate();
      const enddate = end.getDate();
      const startmonth = months[start.getMonth()];
      const endmonth = months[end.getMonth()];
      const startyear = start.getFullYear();
      const endyear = end.getFullYear();

      const suffix1 = startdate % 100;
      const suffix2 = enddate % 100;
      const startsuffix = suffixes[suffix1 >= 11 &&
      suffix1 <= 13 ? 0 : startdate % 10];
      const endsuffix = suffixes[suffix2 >= 11 &&
      suffix2 <= 13 ? 0 : enddate % 10];

      // eslint-disable-next-line max-len, vue/max-len, no-return-assign
      return `${startmonth === endmonth? startmonth:endmonth} ${startdate}${startsuffix} -  ${startmonth !== endmonth? endmonth:''} ${enddate}${endsuffix} ${startyear === endyear? startyear: endyear}`;
    },
    handleUpload(image) {
      try {
        if (image && image instanceof Blob) {
          const reader = new FileReader();

          reader.onloadend = () => {
            const base64Url = reader.result; // This is your base64 data URL

            if (!this.selected.media) {
              this.selected.media = [];
            }

            this.selected.media[0] = base64Url; // insert base64 at index 0
            this.selected.data = image;         // optionally store the original blob

            this.setPlayerImage();
          };

          reader.onerror = () => {
            console.error('Error reading image as base64');
          };

          reader.readAsDataURL(image); // ✅ Convert blob to base64
        } else {
          console.error('Invalid image file');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },

    removeUpload() {
      this.selected.url = null;
      this.selected.data = null;
    },
    setPlayerImage() {
      this.players = this.players.map(x => {
        if (x.id === this.selected.id) {
          return { ...this.selected };
        }
        return x;
      });
      this.showUploadModal = false;
    },
    async generatePlayerCard(player) {
      this.generating = true;
      const playerName = `${player.player_firstname} ${player.player_lastname}`;
      const fileName = `${player.player_firstname} ${player.player_lastname}-player-card.png`.toLowerCase().replace(/\s+/g, '-');

      await document.fonts.ready;

      const node = document.getElementById('player-card');

      toPng(node, {
        cacheBust: true,
        backgroundColor: null,
        pixelRatio: 2, // Higher resolution
        style: {
          margin: '0',
          padding: '0',
          fontFamily: 'Montserrat, sans-serif',
        },
      })
        .then(dataUrl => {
          const link = document.createElement('a');
          link.download = fileName;
          link.href = dataUrl;
          link.click();

          this.$oruga.notification.open({
            message: `Player card for ${playerName} generated successfully!`,
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
            dangerouslyUseHTMLString: true,
          });
        })
        .catch(err => {
          console.error('Card capture failed:', err);

          this.$oruga.notification.open({
            message: 'Something went wrong...',
            variant: 'danger',
            duration: 5000,
            position: 'bottom',
            queue: true,
            dangerouslyUseHTMLString: true,
          });
        })
        .finally(() => {
          this.generating = false
        })
    }

  },
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--large {
  height: 62px;
}
</style>

<style>
.article-description p {
  min-height: 1.5rem;
}
.slick-prev:before, .slick-next:before {
      color:#1a1d18 !important;
      font-size: 1.15rem;
      height: 2fr;
      width: 2fr;
}

.selected {
  background: #1a1d18;
  color: #ffffff;
  border: 1px solid transparent;
}
</style>
