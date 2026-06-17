<template>
  <OModal :active="active" full-screen @close="closeDialog">
    <div
    class="z-50 flex h-dvh w-full flex-col gap-2 rounded bg-[#1A1A1B] p-2 sm:w-full sm:p-4"
    >
      <h3 class="pt-8 font-bold text-white">
          Manage Series Teams
      </h3>
      
      <hr class="my-2"/>

      <div class="relative mb-2 flex w-full items-stretch gap-3 rounded-xl bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm ring-1 ring-white/10">
        
        <div class="relative flex-1">
          <i class="ri-search-line absolute left-3 top-1/2 -translate-y-[15px] text-lg text-gray-400" aria-hidden="true"></i>
          <input
            v-model="searchQuery"
            type="text"
            class="
              block w-full rounded-lg border border-white/5 bg-black/40 py-2.5 pl-10 pr-4
              text-sm font-medium text-white placeholder-gray-400
              transition-all duration-200 ease-out
              focus:border-green-500/70 focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-green-500/20
              hover:border-white/10
            "
            placeholder="Find players, teams, stats..."
            @input="search"
            aria-label="Search rugby data"
          />
          <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-[20px] text-3xl text-gray-700/30" aria-hidden="true">
            <i class="ri-football-line"></i>
          </div>
        </div>

        <button
          type="button"
          class="
            group relative flex items-center gap-2 overflow-hidden rounded-lg
            bg-gradient-to-br from-[#5EE738] via-[#3e872a] to-[#050505] px-5
            text-sm font-bold uppercase tracking-wider text-white
            shadow-[0_4px_12px_rgba(94,231,56,0.3)] transition-all duration-300
            hover:shadow-[0_6px_20px_rgba(94,231,56,0.5)] hover:brightness-110
            focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
          "
          @click="openManageTeamModal([])"
          aria-label="Insert new rugby team or player"
        >
          <i class="ri-add-line text-white text-lg transition-transform duration-200 group-hover:scale-110" aria-hidden="true"></i>
          <span class="text-white">Insert</span>

          <span class="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><line x1=%220%22 y1=%2250%22 x2=%22100%22 y2=%2250%22 stroke=%22white%22 stroke-width=%221%22 stroke-dasharray=%2210,10%22/></svg>')] bg-repeat"></span>
        </button>
      </div>

      <div
        class="col-span-1 md:col-span-3 mb-2 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-gray-900/90 to-gray-800/90 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.5)] ring-1 ring-green-500/20 backdrop-blur-sm"
        data-aos="flip-up"
        data-aos-once="true"
      >
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600/20 ring-1 ring-green-400/30">
            <i class="ri-football-line text-lg text-green-400" aria-hidden="true"></i>
          </div>
          <span class="text-sm font-semibold uppercase tracking-wider text-gray-300">
            Showing
            <span class="font-bold text-green-400">{{ from }}-{{ to }}</span>
            of
            <span class="font-bold text-green-400">{{ totalItems }}</span>
            matches
          </span>
        </div>

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
            <div class="flex items-start gap-4 pt-8">
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
              <article class="flex flex-1 flex-col space-y-3 min-w-0">
                <div class="min-w-0">
                  <h3 class="text-lg font-bold text-white truncate" 
                      :title="team.name">
                    {{ team.name }}
                  </h3>
                  <p class="text-sm text-green-300">
                    <i class="ri-user-star-line mr-1"></i>
                    {{ team.agegroup.name }}
                  </p>
                </div>

                <!-- Status Badges Row -->
                <div class="flex flex-wrap gap-2">
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
                  <button
                    type="button"
                    class="flex items-center justify-center gap-1 rounded-xl
                    bg-blue-600/90 px-3 py-2 text-xs font-semibold text-white
                    transition-all hover:bg-blue-500 hover:shadow-lg"
                    @click="copyTeamAndIndividualRegistrationLink(team)"
                  >
                    <i 
                      :class="teamUrlGenerating === team.id ? 
                      'ri-check-line animate-bounce' : 'ri-link'" 
                      class="text-sm"
                    ></i>
                    {{ teamUrlGenerating === team.id ? 'Copied!' : 'Link' }}
                  </button>

                  <button
                    type="button"
                    class="items-center justify-center gap-1 rounded-xl
                    bg-blue-600/90 px-3 py-2 text-xs font-semibold text-white
                    transition-all hover:bg-blue-500 hover:shadow-lg hidden"
                    @click="copyPlayerRegistrationLink(team)"
                  >
                    <i 
                      :class="playerRegistrationUrlGenerating === team.id ? 
                      'ri-check-line animate-bounce' : 'ri-link'" 
                      class="text-sm"
                    ></i>
                    {{ playerRegistrationUrlGenerating === team.id ? 'Copied!' : 'Link' }}
                  </button>

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

            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r
            from-transparent via-green-500 to-transparent opacity-50"></div>
          </div>
        </div>
      </section>

      <section
        v-else
        class="relative flex flex-1 flex-col items-center justify-center py-16 px-4 text-center md:col-span-3 overflow-hidden
              bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      >
        <div class="absolute inset-0 opacity-20">
          <div class="absolute left-1/4 top-0 h-full w-0 border-l-2 border-dashed border-green-500/50"></div>
          <div class="absolute left-3/4 top-0 h-full w-0 border-l-2 border-dashed border-green-500/50"></div>
          <div class="absolute left-0 top-1/4 w-full h-0 border-t-2 border-dashed border-green-500/50"></div>
          <div class="absolute left-0 top-3/4 w-full h-0 border-t-2 border-dashed border-green-500/50"></div>
        </div>

        <div class="relative z-10 flex flex-col items-center">
          <div class="mb-6 flex size-20 items-center justify-center rounded-full
                      bg-gradient-to-br from-green-600/30 to-green-900/30
                      shadow-[0_0_40px_rgba(94,231,56,0.3)] ring-1 ring-green-400/30
                      backdrop-blur-sm">
            <i class="ri-football-line text-4xl text-green-400 drop-shadow-[0_0_12px_rgba(94,231,56,0.7)]" aria-hidden="true"></i>
          </div>

          <h3 class="mb-3 text-2xl font-extrabold uppercase tracking-wider text-white">
            Ready to <span class="text-green-400">Play</span>?
          </h3>

          <p class="mb-8 max-w-md text-base leading-relaxed text-gray-300">
            The pitch is marked, the floodlights are on, but no team has taken the field yet.
            <span class="font-semibold text-green-400">
              Create your first rugby squad
            </span>
            and kick off the tournament.
          </p>

          <button
            type="button"
            class="group relative flex items-center gap-2 overflow-hidden rounded-lg
                  bg-gradient-to-br from-[#5EE738] via-[#3e872a] to-[#050505]
                  px-6 py-3 text-sm font-bold uppercase tracking-wider text-white
                  shadow-[0_4px_20px_rgba(94,231,56,0.3)]
                  transition-all duration-300
                  hover:shadow-[0_8px_30px_rgba(94,231,56,0.5)] hover:brightness-110
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            @click="openManageTeamModal([])"
            aria-label="Create first rugby team"
          >
            <i class="ri-add-line text-white text-lg transition-transform duration-200 group-hover:scale-110" aria-hidden="true"></i>
            <span class="text-white">Create First Team</span>
            <span class="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><line x1=%220%22 y1=%2250%22 x2=%22100%22 y2=%2250%22 stroke=%22white%22 stroke-width=%221%22 stroke-dasharray=%2210,10%22/></svg>')] bg-repeat"></span>
          </button>
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
      seriesName: null,
      playerRegistrationUrlGenerating: null
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
    copyTeamAndIndividualRegistrationLink(team) {
      this.teamUrlGenerating = team.id;
      this.$axios
        .$get(`v1/teams/link/${team.id}`)
        .then((response) => {
          const teamUrl = response.data.url;
          navigator.clipboard.writeText(teamUrl);
          this.$oruga.notification.open({
            message: 'URL copied to clipboard...',
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
            message: 'Failed to generate URL',
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
    copyPlayerRegistrationLink(team) {
      this.playerRegistrationUrlGenerating = team.id;
      this.$axios
        .$get(`v1/teams/player/registration/link/${team.id}`)
        .then((response) => {
          const teamUrl = response.data.url;
          navigator.clipboard.writeText(teamUrl);
          this.$oruga.notification.open({
            message: 'Player Registration URL copied to clipboard...',
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
            message: 'Failed to generate player registration URL',
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