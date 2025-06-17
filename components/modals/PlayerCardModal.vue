<template>
  <OModal :active="active" @close="closeDialog">
    <div
    v-if="player"
    class="flex w-full flex-col items-center justify-center gap-4
    rounded bg-white p-4 sm:w-[600px]"
    >
      <PlayerCardView
      id="player-card"
      :player="player"
      />
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
    </div>
  </OModal>
</template>

<script>
/* eslint-disable camelcase */
import 'vue-croppa/dist/vue-croppa.css';
import { toPng } from 'html-to-image';
import PlayerCardView from '../PlayerCardView.vue';

export default {
  name: 'PlayerCardModal',
  components: { PlayerCardView },
  props: {
    active: {
      type: Boolean,
      required: true
    },
    player: {
      type: [ Array, Object ],
      default: () => ({}),
    },
  },
  data() {
    return {
      test: [],
      generating: false,
    };
  },
  methods: {
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

