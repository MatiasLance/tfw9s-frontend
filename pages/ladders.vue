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
            <div
              class="overflow-hidden rounded-2xl border border-green-500/20
                     bg-gray-900/80 shadow-xl"
            >
              <div
                class="flex flex-col gap-2 border-b border-green-500/20
                       bg-green-900/40 px-4 py-3 sm:flex-row
                       sm:items-center sm:justify-between"
              >
                <h2 class="text-lg font-bold text-white">
                  Progressive Ladder
                </h2>
                <p class="text-xs text-gray-300">
                  <span class="mr-3">
                    <i class="ri-arrow-up-s-fill text-green-400"></i> Up
                  </span>
                  <span class="mr-3">
                    <i class="ri-arrow-down-s-fill text-red-400"></i> Down
                  </span>
                  <span class="mr-3">
                    <i class="ri-subtract-line text-gray-400"></i> No change
                  </span>
                  <span>
                    <i class="ri-star-s-fill text-sky-400"></i> New
                  </span>
                </p>
              </div>

              <div class="block w-full overflow-x-auto">
                <table
                  class="w-full min-w-[760px] table-auto border-collapse"
                >
                  <thead>
                    <tr class="bg-gray-950/80">
                      <th
                        class="whitespace-nowrap px-3 py-3 text-center
                               text-[11px] font-semibold uppercase
                               tracking-wide text-green-400"
                      >
                        Move
                      </th>
                      <th
                        v-for="column in dataColumns"
                        :key="column.name"
                        class="whitespace-nowrap px-3 py-3 text-center
                               text-[11px] font-semibold uppercase
                               tracking-wide text-green-400"
                      >
                        {{ column.label }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="team in allTeamStats"
                      :key="team.team_id"
                      class="border-t border-green-500/10
                             transition-colors duration-200
                             hover:bg-green-500/5"
                      :class="ladderRowClass(team.pos)"
                    >
                      <td class="px-3 py-3 text-center align-middle">
                        <span
                          class="inline-flex items-center justify-center
                                 gap-0.5"
                          :class="movementClass(team)"
                          :aria-label="movementLabel(team)"
                          :title="movementLabel(team)"
                        >
                          <i :class="movementIcon(team)"></i>
                          <span
                            v-if="team.rankChange"
                            class="text-xs font-bold"
                          >
                            {{ Math.abs(team.rankChange) }}
                          </span>
                        </span>
                      </td>
                      <td
                        class="px-3 py-3 text-center align-middle
                               text-sm font-bold"
                        :class="positionClass(team.pos)"
                      >
                        {{ team.pos }}
                      </td>
                      <td
                        class="px-3 py-3 text-left align-middle
                               text-sm font-semibold text-white"
                      >
                        {{ team.team }}
                      </td>
                      <td
                        v-for="column in statColumns"
                        :key="column.name"
                        class="px-3 py-3 text-center align-middle
                               text-[13px] text-gray-200"
                        :class="{
                          'font-bold text-green-400':
                            column.name === 'points'
                        }"
                      >
                        {{ formatStat(team, column.name) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
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
    LoadingAnimation
  },
  
  data() {
    return {
      allTeamStats: [],
      team: [],
      ageGroupList: [],
      seriesList: [],
      selectedEvent: null,
      selectedAgeGroup: null,
      selectedSeries: null,
      selectedRound: null,
      selectedYear: new Date().getFullYear(),
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
      return MATCH_ROUND_OPTIONS;
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

    statColumns() {
      return DATA_COLUMNS.filter(column =>
        column.name !== 'pos' && column.name !== 'team'
      );
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
      if (this.page > Math.max(this.totalPages, 1)) {
        this.page = 1;
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
        ]);
        this.selectedAgeGroup = this.selectedAgeGroup
          || this.ageGroupList.find(ageGroup => ageGroup.name === '6')?.id
          || this.ageGroupList[0]?.id
          || null;
        this.selectedSeries = this.selectedSeries
          || this.seriesList.find(series => series.name === 'Weekly Series')?.id
          || this.seriesList[0]?.id
          || null;
        await this.retrieveTeamPosition();
      } catch (error) {
        console.error('Error initializing data:', error);
        this.isLoading = false;
      }
    },

    handleFilterChange() {
      this.isLoading = true;
      this.page = 1;

      clearTimeout(this._filterTimeout);
      this._filterTimeout = setTimeout(() => {
        this.retrieveTeamPosition();
      }, 300);
    },

    getUniqueTeamIds() {
      return [ ...new Set(this.filteredTeamsByRound.map(event => event.team_id)) ];
    },

    calculateTeamStats(teamId, teamEvents = null) {
      const events = teamEvents || this.filteredTeamsByRound.filter(
        event => event.team_id === teamId
      );
      
      if (events.length === 0) {
        return null;
      }
      /* eslint-disable camelcase */
      const stats = events.reduce((acc, event) => ({
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
        team: events[0].team,
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

    getEventDate(entry) {
      const raw = entry && entry.event && entry.event.event_date;
      return raw ? String(raw).slice(0, 10) : '';
    },

    getLatestEventDate(events) {
      const dates = events
        .map(entry => this.getEventDate(entry))
        .filter(Boolean)
        .sort();

      return dates.length ? dates[dates.length - 1] : null;
    },

    getPreviousTeamEvents(events) {
      const latestDate = this.getLatestEventDate(events);
      if (!latestDate) {
        return [];
      }

      return events.filter(entry => {
        const date = this.getEventDate(entry);
        return date && date < latestDate;
      });
    },

    rankTeams(stats) {
      return [...stats].sort((a, b) => {
        if (b.points !== a.points) {
          return b.points - a.points;
        }
        if (b.difference !== a.difference) {
          return b.difference - a.difference;
        }
        return a.team.localeCompare(b.team);
      }).map((team, index) => ({
        ...team,
        pos: index + 1,
      }));
    },

    buildRankLookup(events) {
      const teamIds = [...new Set(events.map(event => event.team_id))];
      const stats = teamIds
        .map(teamId => this.calculateTeamStats(
          teamId,
          events.filter(event => event.team_id === teamId)
        ))
        .filter(Boolean);

      return this.rankTeams(stats).reduce((lookup, team) => {
        lookup[team.team_id] = team.pos;
        return lookup;
      }, {});
    },

    calculateAllTeamStats() {
      const uniqueTeamIds = this.getUniqueTeamIds();
      const stats = uniqueTeamIds
        .map(teamId => this.calculateTeamStats(teamId))
        .filter(Boolean);
      const ranked = this.rankTeams(stats);
      const previousEvents = this.getPreviousTeamEvents(this.filteredTeamsByRound);
      const previousRankByTeamId = previousEvents.length
        ? this.buildRankLookup(previousEvents)
        : {};

      this.allTeamStats = ranked.map(team => {
        const previousPos = previousRankByTeamId[team.team_id];
        const hasPrevious = previousPos != null;
        const rankChange = hasPrevious ? previousPos - team.pos : 0;
        let movement = 'same';

        if (!hasPrevious && previousEvents.length > 0) {
          movement = 'new';
        } else if (rankChange > 0) {
          movement = 'up';
        } else if (rankChange < 0) {
          movement = 'down';
        }

        return {
          ...team,
          previousPos: hasPrevious ? previousPos : null,
          rankChange,
          movement,
        };
      });
    },

    formatStat(team, columnName) {
      const value = team[columnName];
      if (columnName === 'difference' && Number(value) > 0) {
        return `+${value}`;
      }
      return value;
    },

    ladderRowClass(pos) {
      if (pos === 1) {
        return 'bg-yellow-400/10';
      }
      if (pos === 2) {
        return 'bg-gray-300/10';
      }
      if (pos === 3) {
        return 'bg-amber-700/10';
      }
      return '';
    },

    positionClass(pos) {
      if (pos === 1) {
        return 'text-yellow-300';
      }
      if (pos === 2) {
        return 'text-gray-200';
      }
      if (pos === 3) {
        return 'text-amber-500';
      }
      return 'text-white';
    },

    movementClass(team) {
      if (team.movement === 'up') {
        return 'text-green-400';
      }
      if (team.movement === 'down') {
        return 'text-red-400';
      }
      if (team.movement === 'new') {
        return 'text-sky-400';
      }
      return 'text-gray-500';
    },

    movementIcon(team) {
      if (team.movement === 'up') {
        return 'ri-arrow-up-s-fill text-lg';
      }
      if (team.movement === 'down') {
        return 'ri-arrow-down-s-fill text-lg';
      }
      if (team.movement === 'new') {
        return 'ri-star-s-fill text-sm';
      }
      return 'ri-subtract-line text-sm';
    },

    movementLabel(team) {
      if (team.movement === 'up') {
        return `Moved up ${team.rankChange} ${team.rankChange === 1 ? 'place' : 'places'}`;
      }
      if (team.movement === 'down') {
        const places = Math.abs(team.rankChange);
        return `Moved down ${places} ${places === 1 ? 'place' : 'places'}`;
      }
      if (team.movement === 'new') {
        return 'New to the ladder';
      }
      return 'Position unchanged';
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

      return baseParams;
    },

    async retrieveTeamPosition() {
      this.isLoading = true;
      
      try {
        const response = await this.$axios.$get('v1/teampositions/list', {
          params: this.buildQueryParams(),
        });

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
        this.team = [];
        this.allTeamStats = [];
      } finally {
        this.isLoading = false;
      }
    },

    async retrieveAgeGroups() {
      try {
        const response = await this.$axios.$get('v1/agegroups', {
          params: this.buildQueryParams(),
        });
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
