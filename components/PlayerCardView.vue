<template>
  <div
    class="card-ratio relative flex w-full max-w-[500px] flex-col overflow-hidden
    rounded-xl border border-gray-200 bg-white text-gray-800 shadow-md"
  >
    <article class="absolute inset-0 z-0 flex items-center justify-center">
      <img
        src="~/assets/images/tfw9s.png"
        alt="background logo"
        class="h-4/6 opacity-5"
      >
    </article>

    <article class="z-10 flex flex-1 flex-col">
      <div
      v-if="player && player.id"
      class="relative flex size-full flex-1 gap-2 px-6 py-2 sm:px-10"
      >
        <div
          class="flex h-full flex-1 flex-col items-start justify-center gap-2"
        >
          <img
            src="~/assets/images/tfw9s.png"
            alt="logo"
            class="aspect-square w-3/5 max-w-24"
          >
          <div
          class="w-full text-left text-base tracking-widest sm:text-xl"
          >
            <p class="font-semibold uppercase leading-5">
              {{ player.player_firstname }}
            </p>
            <p class="font-semibold capitalize leading-5">
              {{ player.player_lastname }}
            </p>
            <p class="leading-5">
              {{ formatDate(player.dob) }}
            </p>
          </div>
        </div>

        <div class="flex flex-1 flex-col items-center justify-center gap-1">
          <p class="text-xl font-bold sm:text-3xl">
            TFW9'S
          </p>
          <img
            :src="getMediaURL(player.media[0], 'player')"
            alt="Player"
            class="aspect-square max-h-40 w-5/6 rounded-lg border
            border-solid border-gray-300 object-cover shadow-sm"
            @click="$emit('image-click')"
          >
        </div>
      </div>
      <div
      class="
      flex-none
      bg-green-600
      p-2
      text-center
      text-sm
      font-bold
      tracking-widest
      text-white
      sm:text-xl"
      >
        REGISTERED PLAYER
      </div>
      <!--
        <div
        v-if="player.registration_id"
        class="
        flex-none
        bg-green-600
        p-2
        text-center
        text-sm
        font-bold
        tracking-widest
        text-white
        sm:text-xl"
        >
        REGISTERED PLAYER
        </div>
      -->
      <!--
        <div
        v-else
        class="
        flex-none
        bg-green-600
        p-2
        text-center
        text-sm
        uppercase
        font-bold
        tracking-widest
        text-white
        sm:text-xl"
        >
        full sponsorship covered
        </div>
      -->
    </article>
  </div>
</template>

<script>
import handlesMedia from '~/mixins/shop/handlesMedia'
export default {
  mixins: [ handlesMedia ],
  props: {
    player: {
      type: [ Object, Array ],
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: true,
      error: null,
      debugInfo: null,
    }
  },
  methods: {
    formatDate(datestring) {
      const date = new Date(datestring);
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const yy = String(date.getFullYear()).slice();
      return `${mm}/${dd}/${yy}`;
    },
  }
}

</script>
   
<style scoped>
.card-ratio {
  aspect-ratio: 1.484 / 1;
}
* {
  font-family: 'Courier Prime', monospace !important;
}

</style>
<!-- aspect-ratio: 1.588 / 1; proper style ratio -->