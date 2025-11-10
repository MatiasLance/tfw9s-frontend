<template>
  <OModal :active="active" full-screen @close="closeDialog">
    <div
    class="z-50 flex h-dvh w-full flex-col gap-2 rounded bg-[#1A1A1B] p-2 sm:w-full sm:p-4"
    >
      <h3 class="pt-8 font-bold text-white">
          Manage Series Teams
      </h3>
      <hr class="my-2"/>
      <div class="mb-2 flex w-full items-center gap-2">
        <input
          v-model="searchQuery"
          type="text"
          class="
            block
            flex-1
            appearance-none
            rounded-md
            border border-gray-200
            bg-gray-100
            px-3
            py-1.5
            font-normal
            outline-inherit
            hover:border-gray-400
            focus:border-gray-400
            focus:bg-white
            focus:outline-none
            focus:ring-0
          "
          placeholder="Search..."
          @input="search"
        >
        <button
        type="button"
        class="
        whitespace-nowrap
        rounded-md
        bg-gradient-to-br from-[#5EE738]
        via-[#3e872a] to-[#050505] px-3
        py-1.5
        text-center
        font-medium
        text-white
        "
        @click="openManageTeamModal([])"
        >
          Insert
        </button>
      </div>
      <div
      class="col-span-1 flex flex-wrap items-center justify-around
      gap-x-2 md:col-span-3 md:justify-between"
      data-aos="flip-up" data-aos-once="true"
      >
        <span
        class="font-medium text-white"
        >
        Showing {{ from }}-{{ to }} of {{ totalItems }} items
        </span>
        <VPagination
          v-model="page"
          :length="totalPages"
          color="success"
          :total-visible="7"
          class="text-white"
          dark
          @change="quickFetch"
          />
      </div>
      <section
      v-if="totalPages && totalPages > 0"
      class="flex-1 overflow-y-auto"
      >
        <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div
            v-for="(team) in seriesTeams"
            :key="team.id"
            class="relative flex items-center gap-2
            rounded-md bg-[#212121] p-4 text-white"
            > 
              <!-- Color Selection Bar -->
              <article
              class="absolute right-2 top-2 flex w-full max-w-[350px] justify-end"
              >
                <div
                class="relative mb-2 flex flex-col text-left"
                > 
                  <button
                  type="button"
                  class="w-full rounded px-1  text-right text-sm
                  text-gray-400 transition hover:text-gray-300"
                  @click="openPlayersCardModal(team)"
                  @blur="selectedTeamId = null"
                  >
                    {{ containsCentralCoast(team.series.name) ? team.player_count :
                    team.registered_players_count }}
                    / {{ team.player_limit }}
                  </button>
                  <!-- Basic Themes -->
                  <div
                    id="dropdown-menu"
                    class="ring/5 absolute right-0 top-full z-30 mt-2 max-h-80 w-full min-w-[200px]
                    divide-y divide-gray-100 overflow-y-auto rounded-md bg-white shadow-lg ring-1
                    ring-black drop-shadow-lg"
                    :class="team.id === selectedTeamId?'block':'hidden'"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
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
                    v-else-if="players && players.length > 0"
                    class="w-full py-1" role="none"
                    >
                      <a
                        v-for="player in players"
                        :key="player.id"
                        class="flex items-start justify-start gap-2 p-2 text-sm
                        font-medium text-gray-700 transition hover:bg-gray-200"
                        role="menuitem"
                        @mousedown="openPlayerCardModal(player)"
                      >
                      {{ player.name }}
                      </a>
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
                  </div>
                </div>
              </article>
              <img
              :src="getMediaURL(team.media[0])"
              alt="Team Logo"
              class="size-20 object-cover"
              />
              <article class="flex flex-1 flex-col">
                <span class="font-semibold">
                  {{ team.name }}
                </span>
                <p class="text-sm">
                  Age Group: {{ team.agegroup.name }}
                </p>
                <p class="my-2 flex items-center space-x-2 text-sm">
                  <span
                  class="rounded border px-2 py-1 text-right text-xs
                  text-white transition"
                  :class="team.discount_codes_id?'visible':'invisible'"
                  >
                    Discounted <i class="ri-price-tag-3-line"></i>
                  </span>
                </p>
                <span class="flex flex-wrap justify-end gap-2">
                    <button
                    type="button"
                    class="
                      max-w-full rounded
                      border border-gray-200
                      bg-[#3f51b5]
                      px-3
                      py-1.5
                      text-sm
                      uppercase
                      text-white
                      "
                      @click="copyRegistrationLink(team)"
                    >
                      <p
                      v-if="teamUrlGenerating === team.id"
                      >
                        <i class="ri-clipboard-line"></i>
                        link copied
                      </p>
                      <p
                      v-else
                      >
                        <i class="ri-file-copy-line"></i>
                        copy link
                      </p>
                    </button>
                    <button
                    type="button"
                    class="
                      max-w-full rounded
                      border border-gray-200
                      bg-[#1e4573]
                      px-3
                      py-1.5
                      text-sm
                      uppercase
                      text-white
                      "
                      @click="sendLinkViaSms(team)"
                    >
                      <p
                      v-if="teamUrlGeneratingPerID === team.id"
                      >
                        <i class="ri-send-plane-line animate-pulse"/>
                        sending link...
                      </p>
                      <p v-else>
                        <i class="ri-send-plane-line"></i>
                        send link via sms
                      </p>
                    </button>
                    <button
                    type="button"
                    class="
                      max-w-full rounded
                      border border-gray-200
                      bg-[#4cbe5c]
                      px-3
                      py-1.5
                      text-sm
                      uppercase
                      text-white
                      "
                      @click="openManageTeamModal(team)"
                    >
                      <i class="ri-pencil-line"></i>
                      Update
                    </button>
                    <button
                    type="button"
                    class="
                      max-w-full rounded
                      border border-gray-200
                      bg-[#fb0d2b]
                      px-3
                      py-1.5
                      text-sm
                      uppercase
                      text-white
                      "
                      @click="openDeleteTeamModal(team)"
                    >
                      <i class="ri-delete-bin-line"></i>
                      Delete
                    </button>
                </span>
                
              </article>
            </div>
        </div>
      </section>
      <section
      v-else
      class="flex h-60 flex-1 items-center
      justify-center font-semibold
      text-[#555555] md:col-span-3"
      >
      No Teams Available
      </section>
      <hr class="my-3"/>
      <div class="flex flex-col justify-end gap-2 md:flex-row">
        <VBtn
        v-if="hasCentralCoast"
        depressed
        dark
        small
        color="primary"
        class="custom-btn w-full md:w-[185px] lg:w-[185px]"
        :loading="sending"
        @click="notifyTeamsForCC(selected.id)"
        >
        <i class="ri-notification-line"></i>
          Notify Teams
        </VBtn>

        <VBtn
        v-else
        depressed
        dark
        small
        color="primary"
        class="custom-btn w-full md:w-[185px] lg:w-[185px]"
        :loading="sending"
        @click="notifyTeams(selected.id)"
        >
        <i class="ri-notification-line"></i>
          Notify Teams
        </VBtn>

        <VBtn
        outlined
        small
        color="amber"
        class="custom-btn w-full md:w-[185px] lg:w-[185px]"
        :loading="generating"
        @click="generateTeamLinks(selected.id)"
        >
        <i class="ri-links-line"></i>
          Generate Links
        </VBtn>
      </div>
    </div>
    <SeriesPlayersCardModal
    :active="showPlayersCardModal"
    :team="selectedTeam"
    :series="selected"
    @close="closePlayersCardDialog"
    />
    <ManageSeriesTeamModal
    :active="showManageTeamModal"
    :team="selectedTeam"
    :series="selected"
    @close="closeManageTeamModal"
    @confirm="retrieveSeriesTeams"
    />
    <DeleteTeamModal
    :active="showDeleteTeamModal"
    :team="selectedTeam"
    @close="closeDeleteTeamDialog"
    @confirm="retrieveSeriesTeams"
    />
  </OModal>
</template>

<script>
import _debounce from 'lodash/debounce'
import ManageSeriesTeamModal from './ManageSeriesTeamModal.vue';
/* eslint-disable camelcase */
import 'vue-croppa/dist/vue-croppa.css';
import DeleteTeamModal from './DeleteTeamModal.vue';
import SeriesPlayersCardModal from './SeriesPlayersCardModal.vue';
import currencyMixin from '@/mixins/currency/handlesCurrency';
import handlesMedia from '@/mixins/shop/handlesMedia';
import handleXLSX from '@/mixins/utilities/handleXLSX';

export default {
  name: 'ManageWeeklySeriesTeamsModal',
  components: {
    ManageSeriesTeamModal, DeleteTeamModal, SeriesPlayersCardModal 
  },
  mixins: [
    currencyMixin, handlesMedia, handleXLSX 
  ],
  props: {
    active: {
      type: Boolean,
      required: true
    },
    agegroup: {
      type: Array,
      required: true
    },
    selected: {
      type: [ Object, Array ],
      default: () => ({}),
    },
  },
  data() {
    return {
      searchQuery: '',
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
      seriesTeams: [],
      isLoading: true,
      sending: false,
      generating: false,
      showManageTeamModal: false,
      showDeleteTeamModal: false,
      showPlayersCardModal: false,
      selectedTeam: [],
      selectedTeamId: null,
      selectedPlayer: [],
      playerLoading: false,
      players: [],
      teamUrlGenerating: null,
      teamUrlGeneratingPerID: null,
      seriesName: null
    }
  },
  computed: {
    formattedAgeGroup() {
      return this.agegroup.map(agegroup =>
        ({ text: agegroup.name, value: agegroup.id }));
    },
    hasCentralCoast() {
      if (!this.seriesName || typeof this.seriesName !== 'string') {
        return false
      }
      return this.seriesName.toLowerCase().includes('central coast')
    },
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.page = 1; // Reset page when dialog opens
          this.quickFetch();
        } else {
          this.seriesTeams = [] // clear modal teams
        }
      },
      immediate: true,
    },
    page: {
      handler(newPage) {
        this.quickFetch()
      },
      immediate: true,
    },
  },
  mounted() {
    this.retrieveSeriesTeams();
  },
  methods: {
    containsCentralCoast(name) {
      if (!name) return false
      return name.toLowerCase().includes('central coast')
    },
    search: _debounce(function() {
      if (this.active) {
        this.retrieveSeriesTeams();
      }
    }, 500),
    quickFetch: _debounce(function() {
      if (this.active) {
        this.retrieveSeriesTeams();
      }
    }, 50),
    retrieveSeriesTeams() {
      this.isLoading = true;

      const query = {
        q: this.searchQuery,
        sort: 'a_to_z',
        page: this.page,
        series: this.selected.id,
        maxTeamsPerPage: this.perPage,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/teams?${queryString}`)
        .then((response) => {
          this.seriesTeams = response.data.teams
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;

          for (let i = 0; i < this.seriesTeams.length; i++) {
            this.seriesName = this.seriesTeams[i].series.name
          }
        })
        .finally(() => {
          this.isLoading = false;
        })
    },
    retrievePlayers(team) {
      if (!team || this.selectedTeamId === team.id) {
        console.log(team)
        this.selectedTeamId = null
        return 
      };
      this.playerLoading = true;
      this.selectedTeamId = team.id
            
      const params = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        team: team.id,
        // eslint-disable-next-line camelcase
        per_page: this.perPage,
      };

      this.$axios
        .$get('/v1/players', { params })
        .then((response) => {
              
          const playersData = response.data.players || [];
              
          this.players = playersData.map(player => ({
            ...player,
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
    notifyTeams(id) {
      this.sending = true;
      this.$axios
        .$post(`v1/series/notify/${id}`)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Email notification sent...',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.message,
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
        .finally(() => {
          this.sending = false;
        })
    },
    notifyTeamsForCC(id) {
      this.sending = true;
      this.$axios
        .$post(`v1/series/notify.teams/${id}`)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Email notification sent...',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.message,
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
        .finally(() => {
          this.sending = false;
        })
    },
    generateTeamLinks(id) {
      this.generating = true;
      this.$axios
        .$post(`v1/series/teamlinks/${id}`)
        .then((response) => {
          this.exportToXLSX(response.data.teamLinks, `${this.selected.name} - Team Links`)
        })
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Team links generated successfully...',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.message,
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
        .finally(() => {
          this.generating = false;
        })
    },
    copyRegistrationLink(team) {
      this.teamUrlGenerating = team.id;
      this.$axios
        .$get(`v1/teams/link/${team.id}`)
        .then((response) => {
          const teamUrl = response.data.url;
          navigator.clipboard.writeText(teamUrl);
          this.$oruga.notification.open({
            message: 'Registration URL copied to clipboard...',
            variant: 'success',
            duration: 3000,
            position: 'bottom',
            queue: true,
            dangerouslyUseHTMLString: true,
          });
        })
        .catch(err => {
          console.error('Url generation failed:', err);
          this.$oruga.notification.open({
            message: 'Failed to generate registration URL',
            variant: 'danger',
            duration: 3000,
            position: 'bottom',
            queue: true,
            dangerouslyUseHTMLString: true,
          });
        })
        .finally(() => {
          setTimeout(() => {
            this.teamUrlGenerating = null;
          }, 500)
        })
    },
    sendLinkViaSms(team) {
      this.teamUrlGeneratingPerID = team.id;
      const payload = { id: team.id };
      this.$axios
        .$post('v1/sms/sendSMSNotification', payload)
        .then((response) => {
          this.$oruga.notification.open({
            message: response.message,
            variant: 'success',
            duration: 3000,
            position: 'bottom',
            queue: true,
            dangerouslyUseHTMLString: true,
          });
        })
        .catch(err => {
          console.error('Url generation failed:', err);
          this.$oruga.notification.open({
            message: 'Failed to send sms',
            variant: 'danger',
            duration: 3000,
            position: 'bottom',
            queue: true,
            dangerouslyUseHTMLString: true,
          });
        })
        .finally(() => {
          setTimeout(() => {
            this.teamUrlGeneratingPerID = null;
          }, 500)
        })
    },
    openManageTeamModal(team) {
      this.selectedTeam = { ...team };
      this.showManageTeamModal = true;
    },
    closeManageTeamModal() {
      this.selectedTeam = {};
      this.showManageTeamModal = false;
    },
    openDeleteTeamModal(team) {
      this.selectedTeam = { ...team };
      this.showDeleteTeamModal = true;
    },
    closeDeleteTeamDialog() {
      this.selectedTeam = {};
      this.showDeleteTeamModal = false;
    },
    openPlayerCardModal(team) {
      this.selectedPlayer = { ...team };
      this.showPlayerCardModal = true;
    },
    openPlayersCardModal(team) {
      this.selectedTeam = { ...team };
      this.showPlayersCardModal = true;
    },
    closePlayersCardDialog() {
      this.selectedTeam = {};
      this.showPlayersCardModal = false;
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

::v-deep .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
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

::v-deep .v-text-field input::label {
font-size: 1rem !important;
font-family: inherit !important;
color: rgb(104, 104, 104) !important;
}

.custom-btn {
  height: 50px !important;
}

::v-deep .o-input {
  box-shadow: none !important;
  border: 1px rgb(243 244 246 / var(--tw-border-opacity)) !important;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity)) !important;
  height: 2.75rem;
  width: 100% !important;
  appearance: none !important;
  border-radius: 0 !important;
  transition: border-color 0.3s !important;
}
</style>