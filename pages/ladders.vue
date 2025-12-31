<template>
  <div class="min-h-screen w-screen bg-[#1A1A1B]">
    <!-- Enhanced Header -->
    <BaseHeader
      class="mx-auto max-w-full gap-4 relative overflow-hidden
      bg-gradient-to-br from-green-900 via-green-700 to-gray-900
      lg:px-8"
    >
      <!-- Animated Rugby Field Background -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-1/4 left-0 w-full h-1 bg-white/30 
                    animate-pulse"></div>
        <div class="absolute top-1/2 left-0 w-full h-1 bg-white/40 
                    animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-3/4 left-0 w-full h-1 bg-white/30 
                    animate-pulse" style="animation-delay: 2s;"></div>
      </div>

      <div
        class="col-span-12 text-center sm:space-y-3 sm:text-left
               lg:col-span-6 xl:mt-10 relative z-10"
        data-aos="fade-right"
      >
        <span class="superheadline flex flex-row items-center text-[1rem]
                    font-normal text-white"
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white" class="hover:scale-105 transition-transform">
                <i class="ri-home-4-line mr-2"></i>Home
              </VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl
                   bg-gradient-to-r from-green-400 to-white bg-clip-text 
                   drop-shadow-lg"
        >
          🏉 Ladders
        </h1>
      </div>
    </BaseHeader>

    <section class="mx-auto max-w-screen-xl gap-4 py-6">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div class="col-span-3 p-2"  data-aos="fade-up">
          <span class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
            <div class="col-span-1">
              <span class="hidden w-full align-middle text-lg font-bold
                          text-white bg-green-800 px-3 py-1 rounded-t md:block">
                Event Year
              </span>
              <VSelect
                v-model="selectedYear"
                :items="formattedYears"
                placeholder="Event Year"
                solo
                class="w-full rounded-lg shadow-lg
                hover:border-green-400 transition-all"
              />
            </div>
            
            <div class="col-span-1">
              <span class="hidden w-full align-middle text-lg font-bold
                          text-white bg-green-800 px-3 py-1 rounded-t md:block">
                Age Group
              </span>
              <VSelect
                v-model="selectedAgeGroup"
                :items="formattedAgeGroup"
                placeholder="Age Group"
                solo
                class="w-full rounded-lg shadow-lg
                hover:border-green-400 transition-all"
              />
            </div>
            
            <div class="col-span-1 md:col-span-2">
              <span class="hidden w-full align-middle text-lg font-bold
                          text-white bg-green-800 px-3 py-1 rounded-t md:block">
                Event
              </span>
              <VSelect
                v-model="selectedSeries"
                :items="formattedSeries"
                label="Select Event"
                solo
                cclass="w-full rounded-lg shadow-lg
                hover:border-green-400 transition-all"
              />
            </div>
            
            <div class="col-span-1 md:col-span-2">
              <span class="hidden w-full align-middle text-lg font-bold
                          text-white bg-green-800 px-3 py-1 rounded-t md:block">
                Match Round
              </span>
              <VSelect
                v-model="selectedRound"
                :items="filteredRound"
                label="Match Round"
                solo
                class="w-full rounded-lg shadow-lg
                hover:border-green-400 transition-all"
              />
            </div>
          </span>

          <section
            v-if="allTeamStats.length === 0 && !isLoading"
            class="col-span-1 flex h-80 flex-col items-center
                  justify-center rounded-2xl bg-gradient-to-br
                  from-green-50 to-gray-100 p-8 text-center
                  shadow-lg md:col-span-3"
          >
            <!-- Rugby Ball Icon -->
            <div class="mb-4 transform transition-transform
                        hover:scale-110 duration-300">
              <div class="relative">
                <div class="h-16 w-10 rounded-full bg-green-600
                            shadow-md border-2 border-green-700">
                  <div class="absolute left-1/2 top-1/2 h-12 w-8
                              -translate-x-1/2 -translate-y-1/2
                              rounded-full bg-white/20"></div>
                  <div class="absolute left-1/2 top-3 h-0.5 w-6
                              -translate-x-1/2 bg-white/50"></div>
                  <div class="absolute left-1/2 bottom-3 h-0.5 w-6
                              -translate-x-1/2 bg-white/50"></div>
                </div>
              </div>
            </div>

            <!-- Message -->
            <p class="text-xl font-bold text-green-800
                      uppercase tracking-wider mb-2">
              No Match Data
            </p>
            
            <p class="text-green-600/80 text-sm max-w-xs
                      leading-relaxed mb-4">
              No team statistics recorded for the selected 
              filters. Try adjusting your search criteria.
            </p>
          </section>

          <section
            v-else
            class="w-full"
            data-aos="fade-up" data-aos-offset="0"
          >
            <VueTable
              :columns="dataColumns"
              :data="allTeamStats"
              class="border"
            />
          </section>
          <LoadingAnimation
          :is-loading="isLoading"
          loading-title="Ladders"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VueTable from '~/components/tables/VueTable.vue';
import LoadingAnimation from '~/components/loading/LoadingAnimation.vue';

// Constants moved outside component for better organization
const MATCH_ROUND_OPTIONS = [
  { text: 'Overall Standings', value: null },
  { text: 'Round', value: 'round' },
  { text: 'Semi', value: 'semi' },
  { text: 'Final', value: 'final' },
  { text: 'Pool A Round', value: 'pool_a_round' },
  { text: 'Pool B Round', value: 'pool_b_round' },
  { text: 'Pool C Round', value: 'pool_c_round' },
  { text: 'Pool D Round', value: 'pool_d_round' },
  { text: 'Pool A Semi', value: 'pool_a_semi' },
  { text: 'Pool B Semi', value: 'pool_b_semi' },
  { text: 'Pool C Semi', value: 'pool_c_semi' },
  { text: 'Pool D Semi', value: 'pool_d_semi' },
  { text: 'Pool A Grand Final', value: 'pool_a_grand_final' },
  { text: 'Pool B Grand Final', value: 'pool_b_grand_final' },
  { text: 'Pool C Grand Final', value: 'pool_c_grand_final' },
  { text: 'Pool D Grand Final', value: 'pool_d_grand_final' },
];

const DATA_COLUMNS = [
  { name: 'pos', label: 'Pos' },
  { name: 'team', label: 'Team' },
  { name: 'played', label: 'Played' },
  { name: 'win', label: 'Win' },
  { name: 'loss', label: 'Loss' },
  { name: 'draw', label: 'Draw' },
  { name: 'for', label: 'For' },
  { name: 'against', label: 'Against' },
  { name: 'difference', label: 'Difference' },
  { name: 'points', label: 'Points' },
];

const AGE_GROUPS = [
  '12 Years Below',
  '13 to 15',
  '16 to 18',
  '19 to 24',
  '25 and above'
];

export default {
  name: 'ladders',
  components: {
    VueTable,
    LoadingAnimation
  },
  
  data() {
    return {
      allTeamStats: [],
      team: [],
      events: [],
      ageGroupList: [],
      seriesList: [],
      selectedEvent: null,
      selectedAgeGroup: null,
      selectedSeries: null,
      selectedRound: null,
      selectedYear: null,
      isLoaded: false,
      isLoading: false,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
      from: 0,
      to: 0
    }
  },

  computed: {
    pageSEO() {
      return {
        title: 'Ladders - TFW9s',
        description: ''
      };
    },

    formattedEvents() {
      return this.events.map(event => {
        const ageGroupName = event.agegroup && event.agegroup.name ? event.agegroup.name : '';
        const eventName = event.name || '';
        
        return {
          text: `${eventName} ${this.replaceUnderWithU(ageGroupName)}`,
          value: event.id,
          agegroup: event.agegroup_id,
          series: event.eventmatch ?
            event.eventmatch.map(em => em.team1 && em.team1.series_id) : [],
          date: event.event_date ? new Date(event.event_date) : null,
        };
      }).filter(event => event.date && !isNaN(event.date));
    },

    formattedAgeGroup() {
      return (this.ageGroupList || []).map(agegroup => 
        ({ text: agegroup.name, value: agegroup.id })
      );
    },

    formattedSeries() {
      return (this.seriesList || []).map(series => 
        ({ text: series.name, value: series.id })
      );
    },

    filteredEvents() {
      if (!this.selectedYear || !this.selectedAgeGroup) {
        return this.formattedEvents;
      }

      return this.formattedEvents.filter(event => {
        const yearMatch = event.date && event.date.getFullYear() === this.selectedYear;
        const ageGroupMatch = event.agegroup === this.selectedAgeGroup;
        
        if (this.selectedSeries) {
          return yearMatch && ageGroupMatch && event.series.includes(this.selectedSeries);
        }
        
        return yearMatch && ageGroupMatch;
      });
    },

    filteredRound() {
      if (!this.team.length) {
        return [ MATCH_ROUND_OPTIONS[0] ];
      }

      const rounds = this.team.map(team => team.round).filter(Boolean);
      const uniqueRounds = [ ...new Set(rounds) ];
      uniqueRounds.unshift(null);

      return MATCH_ROUND_OPTIONS.filter(option =>
        uniqueRounds.includes(option.value)
      );
    },

    filteredTeamsByRound() {
      if (!this.selectedRound) {
        return this.team;
      }
      return this.team.filter(team => team.event && team.event.round === this.selectedRound);
    },

    formattedYears() {
      const years = this.events
        .map(event => {
          if (!event.event_date) return null;
          const eventDate = new Date(event.event_date);
          return isNaN(eventDate) ? null : eventDate.getFullYear();
        })
        .filter(Boolean);

      const uniqueYears = [ ...new Set(years) ].sort();
      
      return uniqueYears.map(year => ({
        text: `Year ${year}`,
        value: year
      }));
    },

    dataColumns() {
      return DATA_COLUMNS;
    },

    matchRoundOption() {
      return MATCH_ROUND_OPTIONS;
    },

    eventYears() {
      return [
        '2020',
        '2021',
        '2022',
        '2023',
        '2024'
      ];
    },

    ageGroup() {
      return AGE_GROUPS;
    }
  },

  watch: {
    events: {
      handler(events) {
        if (events && events.length > 0) {
          this.initializeSelections();
        }
      },
      immediate: true
    },

    selectedYear: {
      handler(year) {
        if (year && this.isLoaded) {
          this.handleFilterChange();
        }
      }
    },

    selectedAgeGroup: {
      handler() {
        if (this.isLoaded) {
          this.handleFilterChange();
        }
      }
    },

    selectedSeries: {
      handler() {
        if (this.isLoaded) {
          this.handleFilterChange();
        }
      }
    },

    selectedRound: {
      handler() {
        this.calculateAllTeamStats();
      }
    }
  },

  created() {
    this.initializeData();
  },

  methods: {
    async initializeData() {
      try {
        await Promise.all([
          this.retrieveAgeGroups(),
          this.retrieveSeries(),
          this.retrieveEvents()
        ]);
      } catch (error) {
        console.error('Error initializing data:', error);
        this.isLoading = false;
      }
    },

    initializeSelections() {
      const firstEvent = this.events[0];
      if (!firstEvent || !firstEvent.event_date) {
        console.warn('No valid events found');
        return;
      }

      const eventDate = new Date(firstEvent.event_date);
      if (isNaN(eventDate)) {
        console.error('Invalid event date format');
        return;
      }

      this.selectedYear = eventDate.getFullYear();
      this.selectedAgeGroup = firstEvent.agegroup_id;
      const eventMatch = firstEvent.eventmatch;
      const firstMatch = eventMatch && eventMatch[0];
      const team1 = firstMatch && firstMatch.team1;
      this.selectedSeries = team1 && team1.series_id;
      
      this.retrieveTeamPosition();
    },

    handleFilterChange() {
      this.isLoading = true;
      this.page = 1;
      this.selectedRound = null;
      
      // Debounce the API call to prevent rapid successive calls
      clearTimeout(this._filterTimeout);
      this._filterTimeout = setTimeout(() => {
        this.retrieveTeamPosition();
      }, 300);
    },

    getUniqueTeamIds() {
      return [ ...new Set(this.filteredTeamsByRound.map(event => event.team_id)) ];
    },

    calculateTeamStats(teamId) {
      const teamEvents = this.filteredTeamsByRound.filter(event => event.team_id === teamId);
      
      if (teamEvents.length === 0) {
        return null;
      }
      /* eslint-disable camelcase */
      const stats = teamEvents.reduce((acc, event) => ({
        team_id: teamId,
        team: event.team,
        played: acc.played + (event.win + event.loss + event.draw),
        win: acc.win + event.win,
        loss: acc.loss + event.loss,
        draw: acc.draw + event.draw,
        for: acc.for + event.for,
        against: acc.against + event.against,
        // Calculate difference as For - Against for each event and accumulate
        difference: acc.difference + (event.for - event.against),
        points: acc.points + event.points,
      }), {
        team_id: teamId,
        team: teamEvents[0].team,
        played: 0,
        win: 0,
        loss: 0,
        draw: 0,
        for: 0,
        against: 0,
        difference: 0, // Start with 0, not with event.difference
        points: 0,
      });

      return stats;
    },

    calculateAllTeamStats() {
      const uniqueTeamIds = this.getUniqueTeamIds();
      const stats = uniqueTeamIds
        .map(teamId => this.calculateTeamStats(teamId))
        .filter(Boolean);

      const sortedData = stats.sort((a, b) => {
        if (b.points !== a.points) {
          return b.points - a.points;
        }
        if (b.difference !== a.difference) {
          return b.difference - a.difference;
        }
        return a.team.localeCompare(b.team);
      });

      this.allTeamStats = sortedData.map((team, index) => ({
        ...team,
        pos: index + 1,
      }));
    },

    replaceUnderWithU(str) {
      return str ? str.replace(/^Under \b/, 'U') : '';
    },

    buildQueryParams(additionalParams = {}) {
      const baseParams = {
        q: this.query,
        sort: 'points',
        page: this.page,
        agegroup: this.selectedAgeGroup,
        series: this.selectedSeries,
        ...additionalParams
      };

      // Remove null/undefined values
      Object.keys(baseParams).forEach(key => {
        if (baseParams[key] == null) {
          delete baseParams[key];
        }
      });

      return new URLSearchParams(baseParams).toString();
    },

    async retrieveTeamPosition() {
      this.isLoading = true;
      
      try {
        const queryString = this.buildQueryParams();
        const response = await this.$axios.$get(`v1/teampositions?${queryString}`);
        
        this.team = response.data.teamPositions.map((team, index) => ({
          ...team,
          team: (team.team && team.team.name) || 'Unknown Team',
          round: (team.event && team.event.round) || null,
          pos: index + 1,
        }));

        this.totalItems = response.data.total_items;
        this.totalPages = response.data.last_page;
        this.from = response.data.from;
        this.to = response.data.to;
        
        this.calculateAllTeamStats();
      } catch (error) {
        console.error('Error retrieving team positions:', error);
      } finally {
        this.isLoaded = true;
        this.isLoading = false;
      }
    },

    async retrieveEvents() {
      try {
        const queryString = this.buildQueryParams({ sort: 'a_to_z' });
        const response = await this.$axios.$get(`v1/events?${queryString}`);
        this.events = response.data.events || [];
      } catch (error) {
        console.error('Error retrieving events:', error);
        this.events = [];
      }
    },

    async retrieveAgeGroups() {
      try {
        const queryString = this.buildQueryParams();
        const response = await this.$axios.$get(`v1/agegroups?${queryString}`);
        this.ageGroupList = response.data.ageGroups || [];
      } catch (error) {
        console.error('Error retrieving age groups:', error);
        this.ageGroupList = [];
      }
    },

    async retrieveSeries() {
      try {
        const response = await this.$axios.$get('v1/series');
        this.seriesList = response.data.series || [];
      } catch (error) {
        console.error('Error retrieving series:', error);
        this.seriesList = [];
      }
    }
  },

  head() {
    return {
      title: this.pageSEO.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageSEO.description,
        },
      ],
    };
  },

  beforeDestroy() {
    // Clean up any timeouts
    clearTimeout(this._filterTimeout);
  }
}
</script>

<style scoped>
.v-label.theme--light {
  color: black;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}
@keyframes slide {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
</style>
