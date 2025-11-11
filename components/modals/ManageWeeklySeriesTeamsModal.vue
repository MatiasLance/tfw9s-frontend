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
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="team in seriesTeams"
            :key="team.id"
            class="relative overflow-hidden rounded-2xl bg-gradient-to-br
            from-green-900 via-gray-900 to-gray-800 p-6 text-white
            shadow-2xl transition-all duration-300 hover:scale-105
            hover:shadow-green-500/20 border-2 border-green-600/30"
          > 
            <!-- Rugby Jersey Stripe Design -->
            <div class="absolute left-0 top-1/2 h-8 w-3 -translate-y-1/2
            bg-white/20 rounded-r-lg"></div>
            
            <!-- Paid Status Badge -->
            <div v-if="team.is_team_registered" class="absolute left-4 top-4">
              <span class="flex items-center gap-1 rounded-full bg-gradient-to-r
              from-green-500 to-emerald-600 px-3 py-1.5 text-xs font-bold
              text-white shadow-lg">
                <i class="ri-checkbox-circle-line text-sm"></i>
                Paid
              </span>
            </div>

            <div v-else class="absolute left-4 top-4">
              <span class="flex items-center gap-1 rounded-full bg-gradient-to-r
              from-green-500 to-emerald-600 px-3 py-1.5 text-xs font-bold
              text-white shadow-lg">
                <i class="ri-checkbox-circle-line text-sm"></i>
                Manually Added by Admin
              </span>
            </div>
            
            <!-- Player Count Badge -->
            <article class="absolute right-4 top-4">
              <div class="relative">
                <button
                  type="button"
                  class="flex items-center gap-1 rounded-full bg-green-600/90
                  px-3 py-1.5 text-xs font-bold text-white transition-all
                  hover:bg-green-500 hover:shadow-lg"
                  @click="openPlayersCardModal(team)"
                  @blur="selectedTeamId = null"
                >
                  <i class="ri-team-line text-sm"></i>
                  <span class="font-mono">
                    {{ team.player_count + team.registered_players_count }} /
                    {{ team.player_limit }}
                  </span>
                </button>

                <!-- Players Dropdown -->
                <div
                  id="dropdown-menu"
                  class="ring/5 absolute right-0 top-full z-30 mt-2 max-h-80
                  w-48 divide-y divide-gray-100 overflow-y-auto rounded-xl
                  bg-white shadow-2xl ring-1 ring-black/5"
                  :class="team.id === selectedTeamId ? 'block' : 'hidden'"
                >
                  <div
                    v-if="playerLoading"
                    class="flex items-center justify-center py-6"
                  >
                    <VProgressCircular
                      size="60"
                      width="4"
                      indeterminate
                      color="green"
                    />
                  </div>
                  <div
                    v-else-if="players && players.length > 0"
                    class="w-full py-2"
                  >
                    <a
                      v-for="player in players"
                      :key="player.id"
                      class="flex items-center gap-3 px-4 py-2 text-sm font-medium
                      text-gray-700 transition-all hover:bg-green-50 hover:text-green-700"
                      @mousedown="openPlayerCardModal(player)"
                    >
                      <i class="ri-user-3-line text-green-600"></i>
                      {{ player.name }}
                    </a>
                  </div>
                  <div v-else class="w-full py-6 text-center">
                    <p class="text-sm text-gray-500">
                      <i class="ri-user-search-line text-lg"></i>
                      No Players
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <!-- Team Content -->
            <div class="flex items-start gap-4 pt-8"> <!-- Added pt-8 for spacing -->
              <!-- Team Logo -->
              <div class="relative">
                <img
                  :src="getMediaURL(team.media[0])"
                  alt="Team Logo"
                  class="size-16 rounded-xl object-cover shadow-lg ring-2
                  ring-green-500/50"
                />
                <div class="absolute -bottom-1 -right-1 size-3 rounded-full
                bg-green-500 ring-2 ring-white"></div>
              </div>

              <!-- Team Info -->
              <article class="flex flex-1 flex-col space-y-3 min-w-0"> <!-- Added min-w-0 -->
                <div class="min-w-0"> <!-- Added for text truncation -->
                  <h3 class="text-lg font-bold text-white truncate" 
                      :title="team.name"> <!-- Added truncate and title -->
                    {{ team.name }}
                  </h3>
                  <p class="text-sm text-green-300">
                    <i class="ri-user-star-line mr-1"></i>
                    {{ team.agegroup.name }}
                  </p>
                </div>

                <!-- Status Badges Row -->
                <div class="flex flex-wrap gap-2">
                  <!-- Discount Badge -->
                  <div v-if="team.discount_codes_id" class="inline-flex">
                    <span class="rounded-full bg-amber-500/20 px-3 py-1 text-xs
                    font-semibold text-amber-300 ring-1 ring-amber-500/30">
                      <i class="ri-price-tag-3-line mr-1"></i>
                      Special Offer
                    </span>
                  </div>

                  <!-- Payment Status Badge (Alternative position) -->
                  <div v-if="team.is_team_registered" class="inline-flex md:hidden">
                    <span class="rounded-full bg-gradient-to-r from-green-500
                    to-emerald-600 px-3 py-1 text-xs font-semibold text-white
                    shadow-lg">
                      <i class="ri-checkbox-circle-line mr-1"></i>
                      Paid
                    </span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="grid grid-cols-2 gap-2 pt-2">
                  <!-- Copy Link -->
                  <button
                    type="button"
                    class="flex items-center justify-center gap-1 rounded-xl
                    bg-blue-600/90 px-3 py-2 text-xs font-semibold text-white
                    transition-all hover:bg-blue-500 hover:shadow-lg"
                    @click="copyRegistrationLink(team)"
                  >
                    <i 
                      :class="teamUrlGenerating === team.id ? 
                      'ri-check-line animate-bounce' : 'ri-link'" 
                      class="text-sm"
                    ></i>
                    {{ teamUrlGenerating === team.id ? 'Copied!' : 'Link' }}
                  </button>

                  <!-- SMS Link -->
                  <button
                    type="button"
                    class="flex items-center justify-center gap-1 rounded-xl
                    bg-purple-600/90 px-3 py-2 text-xs font-semibold text-white
                    transition-all hover:bg-purple-500 hover:shadow-lg"
                    @click="sendLinkViaSms(team)"
                  >
                    <i 
                      :class="teamUrlGeneratingPerID === team.id ?
                      'ri-send-plane-fill animate-pulse' : 'ri-send-plane-line'" 
                      class="text-sm"
                    ></i>
                    {{ teamUrlGeneratingPerID === team.id ? 'Sending...' : 'SMS' }}
                  </button>

                  <!-- Update -->
                  <button
                    type="button"
                    class="flex items-center justify-center gap-1 rounded-xl
                    bg-green-600/90 px-3 py-2 text-xs font-semibold text-white
                    transition-all hover:bg-green-500 hover:shadow-lg"
                    @click="openManageTeamModal(team)"
                  >
                    <i class="ri-pencil-line text-sm"></i>
                    Edit
                  </button>

                  <!-- Delete -->
                  <button
                    type="button"
                    class="flex items-center justify-center gap-1 rounded-xl
                    bg-red-600/90 px-3 py-2 text-xs font-semibold text-white
                    transition-all hover:bg-red-500 hover:shadow-lg"
                    @click="openDeleteTeamModal(team)"
                  >
                    <i class="ri-delete-bin-line text-sm"></i>
                    Remove
                  </button>
                </div>
              </article>
            </div>

            <!-- Rugby Field Background Pattern -->
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r
            from-transparent via-green-500 to-transparent opacity-50"></div>
          </div>
        </div>
      </section>

      <section
        v-else
        class="relative flex flex-1 flex-col items-center justify-center
        py-16 px-4 text-center md:col-span-3 overflow-hidden
        bg-gradient-to-br from-green-50 to-gray-100"
      >
        <!-- Rugby Field Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute left-1/4 top-0 h-full w-0.5 bg-green-500"></div>
          <div class="absolute left-3/4 top-0 h-full w-0.5 bg-green-500"></div>
          <div class="absolute left-0 top-1/4 h-0.5 w-full bg-green-500"></div>
          <div class="absolute left-0 top-3/4 h-0.5 w-full bg-green-500"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10">
          <div class="mb-6 flex justify-center">
            <div class="flex size-20 items-center justify-center rounded-full
            bg-white shadow-lg border border-green-200">
              <i class="ri-football-line text-3xl text-green-600"></i>
            </div>
          </div>

          <h3 class="mb-3 text-2xl font-bold text-gray-800">
            Ready to Play?
          </h3>
          
          <p class="mb-8 text-gray-600 max-w-md leading-relaxed">
            The field is set but no teams are registered yet. 
            <span class="font-semibold text-green-600">
              Create your first rugby team
            </span> 
            and kick off the competition!
          </p>
        </div>
      </section>

      <hr class="my-3"/>
      <div class="flex flex-col justify-end gap-2 md:flex-row">
        <VBtn
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