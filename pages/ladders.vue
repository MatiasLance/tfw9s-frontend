<template>
  <div class="w-screen min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
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
                item-text="text"
                item-value="value"
                label="Select Event"
                solo
                class="w-full rounded-lg shadow-lg
                hover:border-green-400 transition-all"
              />
             
            </div>
            
            <div class="col-span-1">
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

            <div class="col-span-1 mb-10">
              <VBtn
                color="green"
                class="w-full h-[56px]
                      rounded-lg
                      bg-gradient-to-r from-green-600 to-green-500
                      text-white font-bold tracking-wide
                      shadow-lg
                      transition-all duration-200
                      hover:from-green-500 hover:to-green-400
                      hover:scale-[1.02]
                      active:scale-[0.98]"
                :disabled="isLoading"
                @click="handleFilterChange"
              >
                <i class="ri-play-circle-line mr-2 text-lg"></i>
                Go
              </VBtn>
            </div>
          </span>

          <section
          v-if="isLoading"
          class="w-full"
          >
            <LoadingAnimation
              :is-loading="true"
              loading-title="Ladders"
            />
          </section>

          <section
            v-else-if="allTeamStats.length === 0"
            class="flex h-80 items-center justify-center rounded-3xl 
                  bg-gradient-to-br from-gray-800 to-gray-900 
                  border-2 border-dashed border-green-500/30"
          >
            <div class="text-center">
              <i class="ri-article-line text-6xl text-green-500/40 mb-4"></i>
              <h3 class="text-2xl font-bold text-gray-300 mb-2">
                No Match Data
              </h3>
              <p class="text-gray-400">
                No team statistics recorded for the selected 
                filters. Try adjusting your search criteria.
              </p>
            </div>
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
      ageGroupList: [],
      seriesList: [],
      selectedEvent: null,
      selectedAgeGroup: 7,
      selectedSeries: 9,
      selectedRound: null,
      selectedYear: 2025,
      isLoading: true,
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
      // return MATCH_ROUND_OPTIONS;
    },

    filteredTeamsByRound() {
      if (!this.selectedRound) {
        return this.team;
      }
      return this.team.filter(team => team.event && team.event.round === this.selectedRound);
    },

    formattedYears() {
      const currentYear = new Date().getFullYear();

      return [
        {
          text: `Year ${currentYear - 1}`,
          value: currentYear - 1
        },
        {
          text: `Year ${currentYear}`,
          value: currentYear
        }
      ];
    },

    dataColumns() {
      return DATA_COLUMNS;
    },
  },

  watch: {
    // events: {
    //   handler(events) {
    //     if (events && events.length > 0) {
    //       this.initializeSelections();
    //     }
    //   },
    //   immediate: true
    // },

    // selectedYear: {
    //   handler(year) {
    //     if (year && !this.isLoading) {
    //       this.handleFilterChange();
    //     }
    //   }
    // },

    // selectedAgeGroup: {
    //   handler() {
    //     if (!this.isLoading) {
    //       this.handleFilterChange();
    //     }
    //   }
    // },

    // selectedSeries: {
    //   handler() {
    //     if (!this.isLoading) {
    //       this.handleFilterChange();
    //     }
    //   }
    // },

    selectedRound: {
      handler() {
        this.calculateAllTeamStats();
        // if (!this.isLoading) {
        //   this.handleFilterChange();
        // }
      }
    },

    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
  },

  created() {
    this.initializeData();
  },

  methods: {
    async initializeData() {
      try {
        this.isLoading = true
        await Promise.all([
          this.retrieveAgeGroups(),
          this.retrieveSeries(),
          this.retrieveTeamPosition()
        ]);
      } catch (error) {
        console.error('Error initializing data:', error);
        this.isLoading = false;
      }
    },

    handleFilterChange() {
      this.isLoading = true;
      this.page = 1;
      this.selectedRound = null;

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

    buildQueryParams(additionalParams = {}) {
      const baseParams = {
        q: this.query,
        sort: 'points',
        page: this.page,
        agegroup: this.selectedAgeGroup,
        series: this.selectedSeries,
        year: this.selectedYear,
        round: this.selectedRound,
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
        const response = await this.$axios.$get(`v1/teampositions/list?${queryString}`);

        this.team = response.data.all_positions.map((team, index) => ({
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
        this.isLoading = false;
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
        const response = await this.$axios.$get('v1/series/names')

        this.seriesList = response.series

      } catch (error) {
        console.error('Error retrieving series:', error)
        this.seriesList = []
      }
    },

    // setPage(page) {
    //   this.page = page
    //   this.retrieveTeamPosition()
    // }
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
