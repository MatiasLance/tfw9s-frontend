<template>
  <div class="w-screen min-h-screen bg-[#1A1A1B]">
    <BaseHeader
    class="mx-auto max-w-screen-xl gap-4
    bg-gradient-to-r from-brand-green to-brand-black lg:px-8"
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
      <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div class="col-span-2 p-2"  data-aos="fade-up">
          <Filters class="flex flex-wrap gap-2">
            <VSelect
            v-model="selectedYear"
            :items="formattedYears"
            placeholder="Select Event Year"
            solo
            class="md:w-80 lg:w-80"
            />
            <VSelect
            v-model="selectedAgeGroup"
            :items="formattedAgeGroup"
            placeholder="Select Age Group"
            solo
            class="md:w-80 lg:w-80"
            />
            <VSelect
            v-model="selectedEvent"
            :items="filteredEvents"
            placeholder="Select Event"
            solo
            class="md:w-80 lg:w-80"
            />
          </Filters>
          <div
          v-if="showVueTable"
          class="col-span-1 mb-2 flex flex-wrap items-center
          justify-around gap-x-2 md:col-span-3 md:justify-between"
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
          v-if="showVueTable" class="w-full"
          data-aos="fade-up" data-aos-offset="0"
          >
            <VueTable
            :columns="dataColumns"
            :data="team"
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
      team: [],
      events: [],
      AgeGroupList: [],
      selectedEvent: null,
      selectedAgeGroup: null,
      selectedYear: null,
      pageSEO: {
        title: 'Ladders - TFW Rugby League',
        description: ''
      },
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
        text: event.name,
        value: event.id,
        agegroup: event.agegroup_id,
        date: new Date(event.event_date),
      }));
    },
    formattedAgeGroup() {
      return this.AgeGroupList.map(agegroup =>
        ({ text: agegroup.name, value: agegroup.id }));
    },
    filteredEvents() {
      if (this.selectedYear && this.selectedAgeGroup) {
        return this.formattedEvents.filter(event => {
          return event && event.date &&
                event.date.getFullYear() === this.selectedYear &&
                event.agegroup === this.selectedAgeGroup;
        });
      } else {
        return this.formattedEvents;
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
              this.selectedEvent = firstEvent.id;
              this.selectedAgeGroup = firstEvent.agegroup_id;
              this.retrieveTeamPosition()
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
        if (newYear && this.showVueTable) {
          this.page = 1
          this.selectedEvent = null
          this.selectedAgeGroup = null
        }
      },
      immediate: true,
    },
    selectedAgeGroup: {
      handler(newYear) {
        if (newYear && this.showVueTable) {
          this.page = 1
          this.selectedEvent = null
        }
      },
      immediate: true,
    },
    selectedEvent: {
      handler(newEvent) {
        if (newEvent && this.showVueTable) {
          this.page = 1
          this.query = null
          this.retrieveTeamPosition();
        }
      },
      immediate: true,
    },
  },
  created() {
    this.retrieveEvents();
    this.retrieveAgeGroups()
    this.generateRandomData();
  },
  methods: {
    retrieveTeamPosition() {
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        maxTeamPositionsPerPage: 10,
        event: this.selectedEvent,
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
          this.team = response.data.teamPositions.map(team => {
            return {
              ...team,
              team: team.team.name
            };
          });
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          this.showVueTable = true;
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
          this.AgeGroupList= response.data.ageGroups;
        })
    },
    generateRandomData() {
      for (let i = 0; i < 14; i++) {
        this.data.push({
          index: i+1,
          team: this.getRandomTeam(),
          win: Math.floor(Math.random() * 30),
          loss: Math.floor(Math.random() * 30),
          draw: Math.floor(Math.random() * 30),
          points: Math.floor(Math.random() * 30),
          for: Math.floor(Math.random() * 30),
          against: Math.floor(Math.random() * 30),
          difference: Math.floor(Math.random() * 30),
        });
      }
      for (let i = 0; i < 4; i++) {
        this.matches.push({
          date: 'Saturday 10th February',
          location: 'tuggerah Football Grounds',
          team1: this.getRandomTeam(),
          team1score: Math.floor(Math.random() * 20),
          team2: this.getRandomTeam(),
          team2score: Math.floor(Math.random() * 20),
        });
      }
    },
    getRandomTeam() {
      const teams = [
        'North',
        'South',
        'Easts',
        'Wests',
        'Brothers',
        'Saints',
        'Spartans',
        'Knights'
      ];
      return teams[Math.floor(Math.random() * teams.length)];
    }
  }
}
</script>

<style scoped>
.v-label.theme--light {
  color: black
}
</style>
