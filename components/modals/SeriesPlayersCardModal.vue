<template>
  <Modal :active="active" @close="closeDialog">
    <section class="min-h-40 w-full flex-col gap-2 p-2 sm:p-4">
      <h3 class="text-brand-black font-bold">
        {{ team.name }}'s Players
      </h3>
      <hr class="my-2"/>
      <div
      v-if="playerLoading"
      class="flex items-center justify-center py-4"
      >
        <VProgressCircular
        size="80"
        width="8"
        indeterminate
        color="green"
        />
      </div>
      <div
      v-else-if="players && players.length > 0" class="grid gap-4 md:grid-cols-2 md:gap-6">
          <PlayerCardView
          v-for="player in players"
          :id="player.card"
          :key="player.id"
          :player="player"
          />
        <VBtn
        color="green"
        class="rounded-md py-2 font-semibold transition
        hover:brightness-125 md:col-span-2"
        :loading="generating"
        block
        dark
        @click="generateTeamPlayersCard()"
        >
        Generate Team IDs
        </VBtn>     
      </div>
      <div
      v-else
      class="w-full py-1" role="none"
      >
        <a
          class="flex items-center justify-center gap-2 px-2 py-6 text-sm
          font-medium text-gray-700 transition hover:bg-gray-200"
        >
          No Players Found
        </a>
      </div>
    </section>
  </Modal>
</template>

<script>
/* eslint-disable camelcase */
import 'vue-croppa/dist/vue-croppa.css';
import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import PlayerCardView from '../PlayerCardView.vue';
import Modal from './custom/Modal.vue';

export default {
  name: 'SeriesPlayersCardModal',
  components: { PlayerCardView, Modal },
  props: {
    active: {
      type: Boolean,
      required: true
    },
    team: {
      type: [ Array, Object ],
      default: () => ({}),
    },
    series: {
      type: [ Array, Object ],
      default: () => ({}),
    },
  },
  data() {
    return {
      players: [],
      playerLoading: false,
      generating: false,
    };
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.playerLoading = true;
          this.retrieveTeamPlayers(this.team);
        } else {
          this.playerLoading = false;
          this.players = [] // clear modal teams
        }
      },
      immediate: true,
    },
  },
  methods: {
    retrieveTeamPlayers(team) {
      if (!team || this.selectedTeamId === team.id) {
        console.log(team)
        this.selectedTeamId = null
        return 
      };
      this.playerLoading = true;
      const params = {
        q: this.query,
        sort: 'a_to_z',
        page: 1,
        team: team.id,
        // eslint-disable-next-line camelcase
        per_page: Math.max(
          Number(team.registered_players_count) || 0,
          Number(team.player_limit) || 0
        )
      };

      this.$axios
        .$get('/v1/players', { params })
        .then((response) => {
              
          const playersData = response.data.players || [];
              
          this.players = playersData.map(player => ({
            ...player,
            card: `player-card-${player.id}`,
            name: `${player.player_firstname} ${player.player_lastname}`,
          }));
        })
        .catch((error) => {
          console.error('API request failed', error);
          this.players = [];
        })
        .finally(() => {
          this.playerLoading = false;
        });
    },
    async testgenerateTeamPlayersCard() {
      this.generating = true;
      await document.fonts.ready;


      for (let i = 0; i < this.players.length; i++) {
      
        const playerName = `${this.players[i].player_firstname} ${this.players[i].player_lastname}`;
        const fileName = `${this.players[i].player_firstname} ${this.players[i].player_lastname}-player-card.png`.toLowerCase().replace(/\s+/g, '-');

        const node = document.getElementById(this.players[i].card);

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
    async generateTeamPlayersCard() {
      this.generating = true;
      await document.fonts.ready;

      const zip = new JSZip();

      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];
        const playerName = `${player.player_firstname} ${player.player_lastname}`;
        const fileName = `${playerName}-player-card.png`.toLowerCase().replace(/\s+/g, '-');

        const node = document.getElementById(player.card);
        if (!node) {
          console.warn(`Could not find DOM element for ${playerName}`);
          continue;
        }

        try {
          const dataUrl = await toPng(node, {
            cacheBust: true,
            backgroundColor: null,
            pixelRatio: 2,
            style: {
              margin: '0',
              padding: '0',
              fontFamily: 'Montserrat, sans-serif',
            },
          });

          // Convert dataURL to Blob and add to ZIP
          const response = await fetch(dataUrl);
          const blob = await response.blob();
          zip.file(fileName, blob);
        } catch (err) {
          console.error(`Failed to generate card for ${playerName}`, err);
        }
      }

      // File Name when converted to zip.
      const teamFileName = `${this.series.name || 'Unknown Series'} - ${this.team.name || 'Unknown Team'} (${this.team.agegroup.name || '???'})`;
      try {
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, `${teamFileName}.zip`);

        this.$oruga.notification.open({
          message: `Player cards for ${teamFileName} generated`,
          variant: 'success',
          duration: 5000,
          position: 'bottom',
          queue: true,
          dangerouslyUseHTMLString: true,
        });
      } catch (err) {
        console.error('ZIP creation failed:', err);

        this.$oruga.notification.open({
          message: 'Failed to compile cards into ZIP.',
          variant: 'danger',
          duration: 5000,
          position: 'bottom',
          queue: true,
          dangerouslyUseHTMLString: true,
        });
      } finally {
        this.generating = false;
      }
    },
    closeDialog() {
      this.$emit('close')
    },
  }
}
</script>

<style scoped>
.croppa-container {
  background-color: #abb8c3;
  border: 3px solid #1C1B1C;
}
.o-inputit__item--danger {
  background-color: #e73538 !important;
}

.part-item__actions [class^="ri-"] {
  padding-right: 0.25rem;
}

::v-deep .v-text-FieldList.v-text-FieldList--solo:not(.v-text-FieldList--solo-flat)
> .v-input__control > .v-input__slot {
box-shadow: none;
border: 1px rgb(243 244 246 / var(--tw-border-opacity));
background-color: rgb(243 244 246 / var(--tw-bg-opacity));
padding: 0.5rem 0.75rem;
width: 100%;
appearance: none;
border-radius: 0;
transition: border-color 0.3s;
}

::v-deep .v-text-FieldList input::label {
font-size: 1rem !important;
font-family: inherit !important;
color: rgb(104, 104, 104) !important;
}

.custom-btn {
  height: 50px !important;
}
</style>

