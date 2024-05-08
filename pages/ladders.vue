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
      <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div class="col-span-3 p-2"  data-aos="fade-up">
          <span class="grid grid-cols-1 gap-2 md:grid-cols-3">
            <div class="col-span-1">
              <span
              class="hidden w-full py-2 align-middle text-[20px]
              font-semibold text-[#555555] md:block"
              >
              Event Year
              </span>
              <VSelect
              v-model="selectedYear"
              :items="formattedYears"
              placeholder="Select Event Year"
              solo
              class="w-full"
              />
            </div>
            <div class="col-span-1">
              <span
              class="hidden w-full py-2 align-middle text-[20px]
              font-semibold text-[#555555] md:block"
              >
              Age Group
              </span>
              <VSelect
              v-model="selectedAgeGroup"
              :items="formattedAgeGroup"
              placeholder="Select Age Group"
              solo
              class="w-full"
              />
            </div>
            <div class="col-span-1">
              <span
              class="hidden w-full py-2 align-middle text-[20px]
              font-semibold text-[#555555] md:block"
              >
              Event
              </span>
              <VSelect
              v-model="selectedEvent"
              :items="filteredEvents"
              label="Select Event"
              solo
              class="md:w-80 lg:w-80"
              />
            </div>
          </span>
          <div
          v-if="totalPages > 0"
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
              />
          </div>
          <section
          v-if="totalPages > 0" class="w-full"
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
        { name: 'pos', label: 'Pos' },
        { name: 'team', label: 'Team' },
        { name: 'win', label: 'Win' },
        { name: 'loss', label: 'Loss' },
        { name: 'draw', label: 'Draw' },
        { name: 'for', label: 'For' },
        { name: 'against', label: 'Against' },
        { name: 'difference', label: 'Difference' },
        { name: 'points', label: 'Points' },
      ],
      isLoaded: false,
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
        text: `${event.name} ${this.replaceUnderWithU(event.agegroup.name)}`,
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
        if (newYear && this.isLoaded) {
          this.page = 1
          /*
           * this.selectedEvent = null
           * this.selectedAgeGroup = null
           */
          this.selectedAgeGroup = this.formattedAgeGroup[0]?.value ?? null;
          this.selectedEvent = this.filteredEvents[0]?.value ?? null;
        }
      },
      immediate: true,
    },
    selectedAgeGroup: {
      handler(newYear) {
        if (newYear && this.isLoaded) {
          this.page = 1
          this.selectedEvent = this.filteredEvents[0]?.value ?? null;
        }
      },
      immediate: true,
    },
    selectedEvent: {
      handler(newEvent) {
        if (newEvent && this.isLoaded) {
          this.page = 1
          // this.query = null
          this.retrieveTeamPosition();
        } else if (this.isLoaded) {
          this.team = []
          this.totalPages = 0
        }
      },
      immediate: true,
    },
  },
  created() {
    this.retrieveAgeGroups();
    this.retrieveEvents();
  },
  methods: {
    replaceUnderWithU(str) {
      return str.replace(/^Under \b/, 'U');
    },
    retrieveTeamPosition() {
      const query = {
        q: this.query,
        sort: 'points',
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
          this.team = response.data.teamPositions.map((team, index) => {
            return {
              ...team,
              team: team.team.name,
              pos: index + 1,
            };
          });
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          this.isLoaded = true;
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
  }
}
</script>

<style scoped>
.v-label.theme--light {
  color: black
}
</style>
