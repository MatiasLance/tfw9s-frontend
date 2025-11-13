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

// Pre-computed constants to avoid runtime calculations
const MATCH_ROUND_OPTIONS = Object.freeze([
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
  { text: 'Pool D Grand Final', value: 'pool_d_grand_final' }
]);

const DATA_COLUMNS = Object.freeze([
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
]);

// Simple cache with size limit
const createCache = (maxSize = 50) => {
  const cache = new Map();
  return {
    get(key) {
      return cache.get(key)
    },
    set(key, value) {
      if (cache.size >= maxSize) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      cache.set(key, value);
    },
    clear() {
      cache.clear()
    }
  };
};

const cache = createCache();

export default {
  name: 'ladders',
  components: { VueTable, LoadingAnimation },
  
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
      to: 0,
      initialLoad: false,
      pendingRequests: new Set()
    }
  },

  computed: {
    pageSEO() {
      return {
        title: 'Rugby Ladders & Standings - TFW9s',
        description: 'View latest rugby tournament ladders, team standings, match results and statistics. Track your team\'s performance across different age groups and competitions.'
      };
    },

    formattedEvents() {
      const cacheKey = `formattedEvents-${this.events.length}`;
      const cached = cache.get(cacheKey);
      if (cached) return cached;

      const result = [];
      for (let i = 0; i < this.events.length; i++) {
        const event = this.events[i];
        if (!event.event_date) continue;
        
        const ageGroupName = (event.agegroup && event.agegroup.name) ?
          event.agegroup.name : '';
        const eventName = event.name || '';
        const date = new Date(event.event_date);
        
        if (isNaN(date.getTime())) continue;

        const series = (event.eventmatch && Array.isArray(event.eventmatch)) ?
          event.eventmatch.map(em => (em.team1 && em.team1.series_id)).filter(Boolean) :
          [];

        result.push({
          text: `${eventName} ${this.replaceUnderWithU(ageGroupName)}`,
          value: event.id,
          agegroup: event.agegroup_id,
          series,
          date,
        });
      }

      cache.set(cacheKey, result);
      return result;
    },

    formattedAgeGroup() {
      return this.ageGroupList.map(agegroup => 
        ({ text: agegroup.name, value: agegroup.id })
      );
    },

    formattedSeries() {
      return this.seriesList.map(series => 
        ({ text: series.name, value: series.id })
      );
    },

    filteredEvents() {
      if (!this.selectedYear || !this.selectedAgeGroup) {
        return this.formattedEvents;
      }

      const cacheKey = `filteredEvents-${this.selectedYear}-
        ${this.selectedAgeGroup}-${this.selectedSeries}`;
      const cached = cache.get(cacheKey);
      if (cached) return cached;

      const result = this.formattedEvents.filter(event => {
        const yearMatch = event.date.getFullYear() === this.selectedYear;
        const ageGroupMatch = event.agegroup === this.selectedAgeGroup;
        
        return this.selectedSeries ?
          yearMatch && ageGroupMatch && event.series.includes(this.selectedSeries):
          yearMatch && ageGroupMatch;
      });

      cache.set(cacheKey, result);
      return result;
    },

    filteredRound() {
      if (!this.team.length) {
        return [ MATCH_ROUND_OPTIONS[0] ];
      }

      const cacheKey = `filteredRound-${this.team.length}`;
      const cached = cache.get(cacheKey);
      if (cached) return cached;

      const rounds = new Set();
      for (let i = 0; i < this.team.length; i++) {
        if (this.team[i].round) {
          rounds.add(this.team[i].round);
        }
      }
      
      const uniqueRounds = [ null, ...rounds ];
      const result = MATCH_ROUND_OPTIONS.filter(option =>
        uniqueRounds.includes(option.value)
      );

      cache.set(cacheKey, result);
      return result;
    },

    filteredTeamsByRound() {
      if (!this.selectedRound) return this.team;
      
      const cacheKey = `filteredTeams-${this.selectedRound}`;
      const cached = cache.get(cacheKey);
      if (cached) return cached;

      const result = this.team.filter(team => {
        return team.event && team.event.round === this.selectedRound;
      });
      cache.set(cacheKey, result);
      return result;
    },

    formattedYears() {
      const cacheKey = `formattedYears-${this.events.length}`;
      const cached = cache.get(cacheKey);
      if (cached) return cached;

      const years = new Set();
      for (let i = 0; i < this.events.length; i++) {
        const event = this.events[i];
        if (event.event_date) {
          const year = new Date(event.event_date).getFullYear();
          if (!isNaN(year)) years.add(year);
        }
      }

      const uniqueYears = Array.from(years).sort((a, b) => b - a);
      const result = uniqueYears.map(year => ({
        text: `Year ${year}`,
        value: year
      }));

      cache.set(cacheKey, result);
      return result;
    },

    dataColumns() {
      return DATA_COLUMNS;
    },

    matchRoundOption() {
      return MATCH_ROUND_OPTIONS;
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

    selectedYear: 'handleFilterChangeDebounced',
    selectedAgeGroup: 'handleFilterChangeDebounced', 
    selectedSeries: 'handleFilterChangeDebounced',

    selectedRound() {
      this.calculateAllTeamStats();
    }
  },

  created() {
    this.initializeData();
  },

  methods: {
    async initializeData() {
      this.isLoading = true;
      try {
        await this.retrieveEvents();
        await Promise.allSettled([
          this.retrieveAgeGroups(),
          this.retrieveSeries(),
        ]);
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
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
      if (isNaN(eventDate.getTime())) return;

      this.selectedYear = eventDate.getFullYear();
      this.selectedAgeGroup = firstEvent.agegroup_id;
      
      const eventMatch = firstEvent.eventmatch;
      const firstMatch = eventMatch && eventMatch[0];
      const team1 = firstMatch && firstMatch.team1;
      this.selectedSeries = team1 && team1.series_id;
      
      this.initialLoad = true;
      this.retrieveTeamPosition();
    },

    handleFilterChangeDebounced() {
      clearTimeout(this._debounceTimer);
      this._debounceTimer = setTimeout(() => {
        if (this.initialLoad || this.isLoaded) {
          this.handleFilterChange();
        }
      }, 200);
    },

    handleFilterChange() {
      this.pendingRequests.forEach(controller => controller.abort());
      this.pendingRequests.clear();

      this.isLoading = true;
      this.page = 1;
      this.selectedRound = null;
      this.retrieveTeamPosition();
    },

    getUniqueTeamIds() {
      const teams = this.filteredTeamsByRound;
      const cacheKey = `uniqueTeamIds-${teams.length}`;
      const cached = cache.get(cacheKey);
      if (cached) return cached;

      const teamIds = new Set();
      for (let i = 0; i < teams.length; i++) {
        teamIds.add(teams[i].team_id);
      }
      const result = Array.from(teamIds);
      
      cache.set(cacheKey, result);
      return result;
    },

    calculateTeamStats(teamId) {
      const teamEvents = this.filteredTeamsByRound.filter(event => 
        event.team_id === teamId
      );
      if (teamEvents.length === 0) return null;
      
      const stats = {
        /* eslint-disable camelcase */
        team_id: teamId,
        team: teamEvents[0].team,
        played: 0,
        win: 0,
        loss: 0,
        draw: 0,
        for: 0,
        against: 0,
        difference: 0,
        points: 0,
      };

      for (let i = 0; i < teamEvents.length; i++) {
        const event = teamEvents[i];
        stats.played += event.win + event.loss + event.draw;
        stats.win += event.win;
        stats.loss += event.loss;
        stats.draw += event.draw;
        stats.for += event.for;
        stats.against += event.against;
        stats.difference += (event.for - event.against);
        stats.points += event.points;
      }

      return stats;
    },

    calculateAllTeamStats() {
      const uniqueTeamIds = this.getUniqueTeamIds();
      const stats = [];
      
      for (let i = 0; i < uniqueTeamIds.length; i++) {
        const teamStats = this.calculateTeamStats(uniqueTeamIds[i]);
        if (teamStats) stats.push(teamStats);
      }

      stats.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.difference !== a.difference) return b.difference - a.difference;
        return a.team.localeCompare(b.team);
      });

      // Update reactively in one operation
      this.allTeamStats = stats.map((team, index) => ({
        ...team,
        pos: index + 1,
      }));
    },

    replaceUnderWithU(str) {
      return str ? str.replace(/^Under \b/, 'U') : '';
    },

    buildQueryParams(additionalParams = {}) {
      const params = {
        q: this.query,
        sort: 'points', 
        page: this.page,
        agegroup: this.selectedAgeGroup,
        series: this.selectedSeries,
        ...additionalParams
      };

      // Build URLSearchParams directly for better performance
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] != null) {
          searchParams.append(key, params[key]);
        }
      });

      return searchParams.toString();
    },

    async retrieveTeamPosition() {
      // Create abort controller for this request
      const controller = new AbortController();
      this.pendingRequests.add(controller);

      this.isLoading = true;
      
      try {
        const queryString = this.buildQueryParams();
        const response = await this.$axios.$get(`v1/teampositions?${queryString}`,
          { signal: controller.signal }
        );
        
        // Process data in batches for large datasets
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
        if (error.name !== 'CanceledError') {
          console.error('Error retrieving team positions:', error);
        }
      } finally {
        this.pendingRequests.delete(controller);
        this.isLoaded = true;
        this.initialLoad = false;
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
    clearTimeout(this._debounceTimer);
    // Abort all pending requests
    this.pendingRequests.forEach(controller => controller.abort());
    this.pendingRequests.clear();
    cache.clear();
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
