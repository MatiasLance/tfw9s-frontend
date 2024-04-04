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
          Draws
        </h1>
      </div>
    </BaseHeader>
    <section class="mx-auto max-w-screen-xl gap-4 p-7">
      <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div class="col-span-1 p-4"  data-aos="fade-right">
          <Filters class="w-full">
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
          <section class="w-full md:pr-8 lg:pr-16">
            <div
            v-for="(match, index) in matches"
            :key="index" class="grid grid-cols-6 p-4"
            data-aos="fade-up"
            >
              <div class="col-span-6 text-xl font-medium text-white">
                {{ match.date }}
              </div>
              <div class="col-span-6 text-lg font-medium text-slate-600">
                {{ match.location }}
              </div>
              <div
              class="col-span-2 text-left text-xl"
              :class="(parseInt(match.team1score) > parseInt(match.team2score))
               ? 'font-semibold text-[#5EE738]' : 'font-medium text-white'"
               >
              {{ match.team1 }}
              </div>
              <div
              class="col-span-1 text-center text-xl"
              :class="(parseInt(match.team1score) > parseInt(match.team2score))
               ? 'font-semibold text-[#5EE738]' : 'font-medium text-white'"
               >
                {{ match.team1score }}
              </div>
              <div
              class="col-span-1 text-center text-xl"
              :class="(parseInt(match.team1score) < parseInt(match.team2score))
               ? 'font-semibold text-[#5EE738]' : 'font-medium text-white'"
               >
                {{ match.team2score }}
              </div>
              <div
              class="col-span-2 text-right text-xl"
              :class="(parseInt(match.team1score) < parseInt(match.team2score))
               ? 'font-semibold text-[#5EE738]' : 'font-medium text-white'"
               >
                {{ match.team2 }}
              </div>
            </div>
          </section>
        </div>
        <div class="col-span-1 w-full"  data-aos="fade-left">
          <VueTable
          v-if="showVueTable"
          :columns="dataColumns"
          :data="data"
          class="border"
        />
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
        { name: 'index', label: '' },
        { name: 'team', label: 'Team' },
        { name: 'win', label: 'Win' },
        { name: 'loss', label: 'Loss' },
        { name: 'draw', label: 'Draw' },
        { name: 'points', label: 'Points' },
        { name: 'for', label: 'For' },
        { name: 'against', label: 'Against' },
        { name: 'difference', label: 'Difference' },
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
          win: this.getRandomTeam(),
          loss: this.getRandomTeam(),
          draw: Math.random() > 0.5 ? 'Yes' : 'No',
          points: Math.floor(Math.random() * 30),
          for: '???',
          against: this.getRandomTeam(),
          difference: Math.floor(Math.random() * 20) - 10
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