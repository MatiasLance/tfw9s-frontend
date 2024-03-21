<template>
  <div class="min-h-full bg-[#1A1A1B]  pb-12" data-aos="fade-up">
    <section class="mx-auto max-w-screen-xl gap-4 p-7 py-12">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-3">

        <VSelect
        v-model="selectedYear"
        :items="eventYears"
        placeholder="Select Event Year"
        solo
        class="col-span-1"
        data-aos="fade-up"
        />
        <VSelect
        v-model="selectedEvent"
        :items="events"
        placeholder="Select Event"
        solo
        class="col-span-1"
        data-aos="fade-up"
        />
        <VTextField
        v-model="query"
        placeholder="Search"
        solo
        class="col-span-1"
        data-aos="fade-up"
        />
        <section class="col-span-1 md:col-span-3">
          <VueTable
          v-if="showVueTable"
          :columns="dataColumns"
          :data="data"
          class="border"
          />
        </section>

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
      query: '',
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
        { name: 'index', label: 'Pos' },
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
    }
  },
  created() {
    this.generateRandomData();
    setTimeout(() => {
      this.showVueTable = true
    }, 1000);
  },
  methods: {
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
      console.log(this.matches)
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