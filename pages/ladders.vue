<template>
  <div class="min-h-screen w-screen bg-[#1A1A1B]">
    <BaseHeader
    class="mx-auto max-w-full gap-4 relative overflow-hidden
    bg-gradient-to-br from-green-900 via-brand-green to-green-800
    background: radial-gradient(ellipse at center, rgba(120, 200, 100, 0.2) 0%, transparent 70%)
    lg:px-8"
    >
      <div
        class="
          col-span-12
          text-center
          sm:space-y-3
          sm:text-left
          lg:col-span-6
          xl:mt-10"
          data-aos="fade-right"
      >
        <span
          class="
            superheadline
            flex flex-row
            items-center
            text-[1rem]
            font-normal
            text-white
          "
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white">Home</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl">
          Ladders
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
            v-if="isLoading"
            class="flex min-h-[400px] items-center justify-center"
          >
            <div class="text-center">
              <!-- Animated Rugby Ball -->
              <div class="relative mb-8">
                <div class="h-20 w-12 rounded-full bg-green-600 
                            animate-[bounce_1s_ease-in-out_infinite] 
                            shadow-lg">
                  <div class="absolute left-1/2 top-1/2 h-16 w-10 
                              -translate-x-1/2 -translate-y-1/2 
                              rounded-full bg-white/20"></div>
                  <div class="absolute left-1/2 top-3 h-1 w-8 
                              -translate-x-1/2 bg-white/40"></div>
                  <div class="absolute left-1/2 bottom-3 h-1 w-8 
                              -translate-x-1/2 bg-white/40"></div>
                </div>
              </div>
              
              <!-- Loading Text -->
              <p class="text-lg font-bold text-green-800 uppercase 
                        tracking-wider animate-pulse">
                Loading Match Data...
              </p>
              
              <!-- Progress Bar -->
              <div class="mt-4 h-2 w-48 overflow-hidden rounded-full 
                          bg-gray-200 mx-auto">
                <div class="h-full w-1/2 bg-green-500 rounded-full 
                            animate-[slide_2s_ease-in-out_infinite]">
                </div>
              </div>
            </div>
          </section>

          <section
            v-else-if="allTeamStats.length === 0 && !isLoading"
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

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VueTable from '~/components/tables/VueTable.vue';

// Constants - optimized for faster access
const MATCH_ROUND_OPTIONS = Object.freeze([
  { text: 'Overall Standings', value: null },
  { text: 'Round', value: 'round' },
  { text: 'Semi', value: 'semi' },
  { text: 'Final', value: 'final' },
  ...Array.from({ length: 4 }, (_, i) => 
    [
      'a',
      'b',
      'c',
      'd'
    ].map(pool => [
      { text: `Pool ${pool.toUpperCase()} Round`, value: `pool_${pool}_round` },
      { text: `Pool ${pool.toUpperCase()} Semi`, value: `pool_${pool}_semi` },
      { text: `Pool ${pool.toUpperCase()} Grand Final`, value: `pool_${pool}_grand_final` }
    ])
  ).flat(2)
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

const AGE_GROUPS = Object.freeze([
  '12 Years Below', '13 to 15', '16 to 18', '19 to 24', '25 and above'
]);

// Memoization cache
const memoized = new Map();

export default {
  name: 'ladders',
  components: { VueTable },
  
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
      initialLoad: false 
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
      if (memoized.has(cacheKey)) return memoized.get(cacheKey);

      const result = this.events
        .map(event => {
          if (!event.event_date) return null;
          
          const ageGroupName = (event.agegroup && event.agegroup.name) ? event.agegroup.name : '';
          const eventName = event.name || '';
          const date = new Date(event.event_date);
          
          if (isNaN(date)) return null;

          return {
            text: `${eventName} ${this.replaceUnderWithU(ageGroupName)}`,
            value: event.id,
            agegroup: event.agegroup_id,
            series: (event.eventmatch && event.eventmatch.map(em => 
              (em.team1 && em.team1.series_id)
            )) || [],
            date,
          };
        })
        .filter(Boolean);

      memoized.set(cacheKey, result);
      return result;
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

      const cacheKey = `filteredEvents-${this.selectedYear}-
      ${this.selectedAgeGroup}-${this.selectedSeries}`;
      if (memoized.has(cacheKey)) return memoized.get(cacheKey);

      const result = this.formattedEvents.filter(event => {
        const yearMatch = event.date.getFullYear() === this.selectedYear;
        const ageGroupMatch = event.agegroup === this.selectedAgeGroup;
        
        return this.selectedSeries ?
          yearMatch && ageGroupMatch && event.series.includes(this.selectedSeries) :
          yearMatch && ageGroupMatch;
      });

      memoized.set(cacheKey, result);
      return result;
    },

    filteredRound() {
      if (!this.team.length) {
        return [ MATCH_ROUND_OPTIONS[ 0 ] ];
      }

      const cacheKey = `filteredRound-${this.team.length}-${this.team.map(t => t.round).join(',')}`;
      if (memoized.has(cacheKey)) return memoized.get(cacheKey);

      const rounds = this.team.map(team => team.round).filter(Boolean);
      const uniqueRounds = [ null, ...new Set(rounds) ];
      const result = MATCH_ROUND_OPTIONS.filter(option =>
        uniqueRounds.includes(option.value)
      );

      memoized.set(cacheKey, result);
      return result;
    },

    filteredTeamsByRound() {
      if (!this.selectedRound) return this.team;
      
      const cacheKey = `filteredTeams-${this.selectedRound}-${this.team.length}`;
      if (memoized.has(cacheKey)) return memoized.get(cacheKey);

      const result = this.team.filter(team => {
        return team.event && team.event.round === this.selectedRound;
      });
      memoized.set(cacheKey, result);
      return result;
    },

    formattedYears() {
      const cacheKey = `formattedYears-${this.events.length}`;
      if (memoized.has(cacheKey)) return memoized.get(cacheKey);

      const years = this.events
        .map(event => {
          if (!event.event_date) return null;
          const year = new Date(event.event_date).getFullYear();
          return isNaN(year) ? null : year;
        })
        .filter(Boolean);

      const uniqueYears = [ ...new Set(years) ].sort((a, b) => b - a);
      const result = uniqueYears.map(year => ({
        text: `Year ${year}`,
        value: year
      }));

      memoized.set(cacheKey, result);
      return result;
    },

    dataColumns() {
      return DATA_COLUMNS;
    },

    matchRoundOption() {
      return MATCH_ROUND_OPTIONS;
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

    selectedYear() {
      this.handleFilterChangeDebounced();
    },
    selectedAgeGroup() {
      this.handleFilterChangeDebounced();
    }, 
    selectedSeries() {
      this.handleFilterChangeDebounced();
    },

    selectedRound() {
      this.calculateAllTeamStats();
    }
  },

  created() {
    this.initializeData();
    this.$once('hook:beforeDestroy', () => memoized.clear());
  },

  methods: {
    async initializeData() {
      this.isLoading = true;
      try {
        await Promise.allSettled([
          this.retrieveAgeGroups(),
          this.retrieveSeries(), 
          this.retrieveEvents()
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
      if (isNaN(eventDate)) return;

      this.selectedYear = eventDate.getFullYear();
      this.selectedAgeGroup = firstEvent.agegroup_id;
      
      const eventMatch = firstEvent.eventmatch;
      const firstMatch = eventMatch && eventMatch[0];
      const team1 = firstMatch && firstMatch.team1;
      this.selectedSeries = team1 && team1.series_id;
      
      // Set initial load flag and make the first API call
      this.initialLoad = true;
      this.retrieveTeamPosition();
    },

    handleFilterChangeDebounced() {
      if (this._debounceTimer) clearTimeout(this._debounceTimer);
      
      this._debounceTimer = setTimeout(() => {
        // Allow initial load and subsequent filter changes
        if (this.initialLoad || this.isLoaded) {
          this.handleFilterChange();
        }
      }, 300);
    },

    handleFilterChange() {
      this.isLoading = true;
      this.page = 1;
      this.selectedRound = null;
      this.retrieveTeamPosition();
    },

    getUniqueTeamIds() {
      const cacheKey = `uniqueTeamIds-${this.filteredTeamsByRound.length}`;
      if (memoized.has(cacheKey)) return memoized.get(cacheKey);

      const result = [ ...new Set(this.filteredTeamsByRound.map(event => event.team_id)) ];
      memoized.set(cacheKey, result);
      return result;
    },

    calculateTeamStats(teamId) {
      const teamEvents = this.filteredTeamsByRound.filter(event => event.team_id === teamId);
      if (teamEvents.length === 0) return null;

      const stats = teamEvents.reduce((acc, event) => ({
        /* eslint-disable camelcase */
        team_id: teamId,
        team: event.team,
        played: acc.played + (event.win + event.loss + event.draw),
        win: acc.win + event.win,
        loss: acc.loss + event.loss,
        draw: acc.draw + event.draw,
        for: acc.for + event.for,
        against: acc.against + event.against,
        difference: acc.difference + (event.for - event.against),
        points: acc.points + event.points,
      }),
      {
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
      });

      return stats;
    },

    calculateAllTeamStats() {
      const uniqueTeamIds = this.getUniqueTeamIds();
      const stats = uniqueTeamIds
        .map(teamId => this.calculateTeamStats(teamId))
        .filter(Boolean);

      const sortedData = stats.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.difference !== a.difference) return b.difference - a.difference;
        return a.team.localeCompare(b.team);
      });

      this.allTeamStats = sortedData.map((team, index) => ({
        ...team,
        pos: index + 1,
      }));
    },

    replaceUnderWithU(str) {
      if (!str) return '';
      return str.replace(/^Under \b/, 'U');
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

      // Remove null/undefined values efficiently
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
        this.initialLoad = false; // Reset initial load flag
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
    clearTimeout(this._debounceTimer);
    memoized.clear();
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
