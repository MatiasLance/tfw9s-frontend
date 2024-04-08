<template>
  <div class="bg-[#1A1A1B]" data-aos="fade-up">
    <section class="mx-auto max-w-screen-xl gap-4 p-4">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-3">

        <VSelect
        v-model="selectedYear"
        :items="formattedYears"
        placeholder="Select Event Year"
        solo
        class="col-span-1"
        />
        <VSelect
        v-model="selectedEvent"
        :items="filteredEvents"
        placeholder="Select Event"
        solo
        class="col-span-1"
        />
        <VTextField
        v-model="query"
        placeholder="Search"
        solo
        class="col-span-1"
        />
        <div
        v-if="showVueTable"
        class="col-span-1 flex flex-wrap items-center justify-around
        gap-x-2 md:col-span-3 md:justify-between"
        data-aos="flip-up"
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
            @change="setPage"
            />
        </div>
        <section
        v-if="showVueTable"
        data-aos="fade-up"
        data-aos-offset="0"
        class="col-span-1 md:col-span-3"
        >
          <VueTable
          :columns="dataColumns"
          :data="Teams"
          class="border"
          />
        </section>
        <section
        v-if="totalPages=== 0"
        class="col-span-1 flex h-60 items-center
        justify-center font-semibold
        text-[#555555] md:col-span-3"
        >
        No data available
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import VueTable from '~/components/tables/VueTable.vue';
export default {
  components: { VueTable },
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    TeamList: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    EventList: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      Teams: [],
      query: null,
      selectedEvent: null,
      selectedYear: null,
      selectedGroup: [],
      events: [
        'Event 1',
        'Event 2',
        'Event 3'
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
        { name: 'position', label: 'Pos' },
        { name: 'team', label: 'Team' },
        { name: 'win', label: 'Win' },
        { name: 'loss', label: 'Loss' },
        { name: 'draw', label: 'Draw' },
        { name: 'for', label: 'For' },
        { name: 'against', label: 'Against' },
        { name: 'difference', label: 'Difference' },
        { name: 'points', label: 'Points' },
      ],
      showVueTable: false,
      matches: [],
      data: [],
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
    }
  },
  computed: {
    formattedEvents() {
      return this.EventList.map(event => ({
        text: event.name,
        value: event.id,
        date: new Date(event.event_date),
      }));
    },
    filteredEvents() {
      if (this.selectedYear) {
        return this.formattedEvents.filter(event => {
          if (event && event.date) {
            return event.date.getFullYear() === this.selectedYear;
          } else {
            return false;
          }
        });
      } else {
        return this.formattedEvents;
      }
    },
    formattedYears() {
      const years = this.EventList.map(event => {
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
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
    page: {
      handler(newPage) {
        this.retrieveTeamPosition();
        setTimeout(() => {
          this.showVueTable = true
        }, 1000);
      },
      immediate: true,
    },
    selectedYear: {
      handler(newYear) {
        if (newYear) {
          this.page = 1
          this.selectedEvent = null
          this.query = null
          this.retrieveTeamPosition();
        }
      },
      immediate: true,
    },
    selectedEvent: {
      handler(newEvent) {
        if (newEvent) {
          this.page = 1
          this.query = null
          this.retrieveTeamPosition();
        }
      },
      immediate: true,
    },
    query: {
      handler(newQuery) {
        if (newQuery) {
          this.page = 1
          this.retrieveTeamPosition();
        } else if (newQuery === '') {
          this.retrieveTeamPosition();
        }
      },
      immediate: true,
    },
  },
  created() {
    if (this.filteredEvents.length > 0) {
      this.selectedEvent = this.filteredEvents[0].value;
      this.retrieveTeamPosition();
    }
  },
  methods: {
    // eslint-disable-next-line camelcase
    FindTeam(team_id) {
      // eslint-disable-next-line camelcase
      const foundField = this.TeamList.find(team => team.id === team_id);
      if (foundField) {
        return foundField.name;
      } else {
        // If no matching field is found, return "unknown"
        return 'Unknown';
      }
    },
    setPage() {
      this.retrieveTeamPosition();
    },
    retrieveTeamPosition() {
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        maxTeamPositionsPerPage: 10,
        event: this.selectedEvent,
        year: this.selectedYear,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/teampositions?${queryString}`)
        .then((response) => {
          this.Teams = response.data.teamPositions.map(team => {
            return {
              ...team,
              team: this.FindTeam(team.team_id)
            };
          });
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          console.log(this.Teams)
          this.showVueTable = true;
        });
    },
  }
}
</script>

<style scoped>
.v-label.theme--light {
  color: black
}
</style>
