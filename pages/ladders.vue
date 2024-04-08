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
        <div class="col-span-2 p-4"  data-aos="fade-up">
          <Filters class="flex flex-wrap gap-2">
            <VSelect
            v-model="selectedEvent"
            :items="events"
            placeholder="Select Event"
            solo
            class="md:w-80 lg:w-80"
            />
            <VSelect
            v-model="selectedYear"
            :items="eventYears"
            placeholder="Select Event Year"
            solo
            class="md:w-80 lg:w-80"
            />
            <VSelect
            v-model="selectedGroup"
            :items="ageGroup"
            placeholder="Select Age Group"
            solo
            class="md:w-80 lg:w-80"
            />
          </Filters>
          <section class="w-full">
            <VueTable
            v-if="showVueTable"
            :columns="dataColumns"
            :data="team"
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
      team: [],
      pageSEO: {
        title: 'Ladders - TFW Rugby League',
        description: ''
      },
      selectedEvent: '',
      selectedYear: '',
      selectedGroup: '',
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
      showVueTable: true,
      matches: [],
      data: [],
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 1,
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
  created() {
    this.retrieveTeamPosition();
    this.generateRandomData();
    setTimeout(() => {
      this.showVueTable = true
    }, 1000);
  },
  methods: {
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
