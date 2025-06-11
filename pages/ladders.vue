<template>
  <div class="min-h-screen w-screen bg-[#1A1A1B]">
    <BaseHeader
    class="from-brand-green to-brand-black mx-auto
    max-w-screen-xl gap-4 bg-gradient-to-r lg:px-8"
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
    <section class="mx-auto max-w-screen-xl gap-4 p-7">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div class="col-span-3 p-2"  data-aos="fade-up">
          <span class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-6">
            <div class="col-span-1">
              <span
              class="hidden w-full align-middle text-[20px]
              font-semibold text-[#555555] md:block"
              >
              Event Year
              </span>
              <VSelect
              v-model="selectedYear"
              :items="formattedYears"
              placeholder="Event Year"
              solo
              class="w-full"
              />
            </div>
            <div class="col-span-1">
              <span
              class="hidden w-full align-middle text-[20px]
              font-semibold text-[#555555] md:block"
              >
              Age Group
              </span>
              <VSelect
              v-model="selectedAgeGroup"
              :items="formattedAgeGroup"
              placeholder="Age Group"
              solo
              class="w-full"
              />
            </div>
            <div class="col-span-1 md:col-span-2">
              <span
              class="hidden w-full align-middle text-[20px]
              font-semibold text-[#555555] md:block"
              >
              Event
              </span>
              <VSelect
              v-model="selectedSeries"
              :items="formattedSeries"
              label="Select Event"
              solo
              />
            </div>
            <div class="col-span-1 md:col-span-2">
              <span
              class="hidden w-full align-middle text-[20px]
              font-semibold text-[#555555] md:block"
              >
              Match Round
              </span>
              <VSelect
              v-model="selectedRound"
              :items="filteredRound"
              label="Match Round"
              solo
              />
            </div>
          </span>
          <section
          v-if="isLoading"
          class="pt-12 text-center"
          >
            <VProgressCircular
              :size="150"
              :width="15"
              color="green"
              indeterminate
            >
            </VProgressCircular>
          </section>
          <section
          v-else-if="allTeamStats.length === 0"
          class="col-span-1 flex h-60 items-center
          justify-center font-semibold
          text-[#555555] md:col-span-3"
          >
          No Data Recorded
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
export default {
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
      pageSEO: {
        title: 'Ladders - TFW9s',
        description: ''
      },
      matchRoundOption: [
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
      ],
      eventYears: [
        '2020',
        '2021',
        '2022',
        '2023',
        '2024',
      ],
      ageGroup: [
        '12 Years Below',
        '13 to 15',
        '16 to 18',
        '19 to 24',
        '25 and above'
      ],
      dataColumns: [
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
      ],
      isLoaded: false,
      isLoading: false,
      matches: [],
      data: [],
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0
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
  computed: {
    formattedEvents() {
      return this.events.map(event => ({
        text: `${event.name} ${this.replaceUnderWithU(event.agegroup.name)}`,
        value: event.id,
        agegroup: event.agegroup_id,
        series: event.eventmatch.map(em => em.team1.series_id),
        date: new Date(event.event_date),
      }));
    },
    formattedAgeGroup() {
      return this.ageGroupList.map(agegroup =>
        ({ text: agegroup.name, value: agegroup.id }));
    },
    formattedSeries() {
      return this.seriesList.map(series =>
        ({ text: series.name, value: series.id }));
    },
    filteredEvents() {
      if (this.selectedYear && this.selectedAgeGroup && this.selectedSeries) {
        return this.formattedEvents.filter(event => {
          return event &&
                event.date &&
                event.date.getFullYear() === this.selectedYear &&
                event.agegroup === this.selectedAgeGroup &&
                event.series.includes(this.selectedSeries);
        });
      } else if (this.selectedYear && this.selectedAgeGroup) {
        return this.formattedEvents.filter(event => {
          return event &&
                event.date &&
                event.date.getFullYear() === this.selectedYear &&
                event.agegroup === this.selectedAgeGroup;
        });
      } else {
        return this.formattedEvents;
      }
    },
    filteredRound() {
      if (this.team.length > 0) {
        const rounds = this.team.map(team => team.round);
        const uniqueRounds = [ ...new Set(rounds) ];

        uniqueRounds.splice(0, 0, null);

        const formattedRounds = this.matchRoundOption.filter(option =>
          uniqueRounds.includes(option.value));
        return formattedRounds;
      } else {
        return this.matchRoundOption[0];
      }
    },
    filteredTeamsByRound() {
      if (this.selectedRound) {
        return this.team.filter(team => {
          return team.event.round === this.selectedRound;
        });
      } else {
        return this.team;
      }
    },
    formattedYears() {
      const years = this.events.map(event => {
        const eventDate = new Date(event.event_date);
        return eventDate.getFullYear();
      });

      const uniqueYears = [ ...new Set(years) ];

      uniqueYears.sort();

      const formattedYears = uniqueYears.map(year => ({
        text: `Year ${year.toString()}`,
        value: year
      }));

      return formattedYears;
    },
  },
  watch: {
    events: {
      handler(newEvents) {
        if (Array.isArray(newEvents) && newEvents.length > 0) {
          const firstEvent = newEvents[0];
          if (firstEvent && firstEvent.event_date) {
            const eventDate = new Date(firstEvent.event_date);
            if (!isNaN(eventDate)) {
              this.selectedYear = eventDate.getFullYear();
              this.selectedAgeGroup = firstEvent.agegroup_id;
              this.selectedSeries = firstEvent.eventmatch[0].team1.series_id;
              this.retrieveTeamPosition();
            } else {
              console.error('Invalid event date format');
            }
          } else {
            console.error('Missing or invalid event data');
          }
        } else {
          console.warn('No events or invalid events array');
        }
      },
      immediate: true,
    },
    selectedYear: {
      handler(newYear) {
        this.isLoading = true
        if (newYear && this.isLoaded) {
          this.isLoading = false
          this.page = 1
          /*
           * this.selectedEvent = null
           * this.selectedAgeGroup = null
           */
          this.selectedAgeGroup = this.formattedAgeGroup[0].value || null;
          this.selectedSeries = this.formattedSeries[0].value || null;
          this.selectedRound = null;
        }
      },
      immediate: true,
    },
    selectedAgeGroup: {
      handler(newYear) {
        this.isLoading = true
        if (newYear && this.isLoaded) {
          this.isLoading = false
          this.page = 1
          this.selectedRound = null;
          this.retrieveTeamPosition();
        }
      },
      immediate: true,
    },
    selectedSeries: {
      handler(newYear) {
        this.isLoading = true
        if (newYear && this.isLoaded) {
          this.isLoading = false
          this.page = 1
          this.retrieveTeamPosition();
          this.selectedRound = null;
        }
      },
      immediate: true,
    },
    selectedRound: {
      handler(newYear) {
        this.calculateAllTeamStats()
      },
      immediate: true,
    },
  },
  created() {
    this.retrieveAgeGroups();
    this.retrieveSeries();
    this.retrieveEvents();
  },
  methods: {
    getUniqueTeamIds() {
      const teamIds = new Set();
      this.filteredTeamsByRound.forEach(event => {
        teamIds.add(event.team_id);
      });
      return Array.from(teamIds);
    },
    calculateTeamStats(teamId) {
      const teamStats = {
        // eslint-disable-next-line camelcase
        team_id: teamId,
        played: 0,
        win: 0,
        loss: 0,
        draw: 0,
        for: 0,
        against: 0,
        difference: 0,
        points: 0,
      };

      this.filteredTeamsByRound.forEach(event => {
        if (event.team_id === teamId) {
          teamStats.team = event.team;
          teamStats.played += (event.win + event.loss + event.draw);
          teamStats.win += event.win;
          teamStats.loss += event.loss;
          teamStats.draw += event.draw;
          teamStats.for += event.for;
          teamStats.against += event.against;
          teamStats.difference += event.difference;
          teamStats.points += event.points;
        }
      });

      return teamStats;
    },
    calculateAllTeamStats() {
      const uniqueTeamIds = this.getUniqueTeamIds();
      // eslint-disable-next-line max-len, vue/max-len
      const stats = uniqueTeamIds.map(teamId => this.calculateTeamStats(teamId));

      const sortedData = stats.sort((a, b) => {
        if (b.points === a.points) {
          if (b.difference === a.difference) {
            return a.team.localeCompare(b.team);
          }
          return b.difference - a.difference;
        }
        return b.points - a.points;
      });

      this.allTeamStats= sortedData.map((team, index) => ({
        ...team,
        pos: index + 1,
      }));
    },
    replaceUnderWithU(str) {
      return str.replace(/^Under \b/, 'U');
    },
    retrieveTeamPosition() {
      this.isLoading = true
      const query = {
        q: this.query,
        sort: 'points',
        page: this.page,
        agegroup: this.selectedAgeGroup,
        series: this.selectedSeries,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString();

      this.$axios
        .$get(`v1/teampositions?${queryString}`)
        .then((response) => {
          const fteams = response.data.teamPositions.map((team, index) => ({
            ...team,
            team: team.team.name,
            round: team.event.round || null,
            pos: index + 1,
          }));

          this.team = fteams;
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
          this.calculateAllTeamStats()
        })
        .finally(() => {
          this.isLoaded = true;
          this.isLoading = false
        });
    },
    retrieveEvents() {
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/events?${queryString}`)
        .then((response) => {
          this.events = response.data.events;
        })
    },
    retrieveAgeGroups() {
      const query = {
        q: this.query,
        page: this.page,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/agegroups?${queryString}`)
        .then((response) => {
          this.ageGroupList = response.data.ageGroups;
        })
    },
    retrieveSeries() {
      this.$axios
        .$get('v1/series')
        .then((response) => {
          this.seriesList = response.data.series;
        })
    }
  }
}
</script>

<style scoped>
.v-label.theme--light {
  color: black
}
</style>
