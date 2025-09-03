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
          lg:col-span-6
          lg:space-y-3
          lg:text-left
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
      <div class="grid grid-cols-3 gap-2">
        <div class="col-span-3 p-2" data-aos="fade-up">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
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

            <div>
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

            <div>
              <span
                class="hidden w-full py-2 align-middle text-[20px]
                font-semibold text-[#555555] md:block"
              >
                Region
              </span>
              <VSelect
                v-model="selectedRegion"
                :items="formattedRegions"
                placeholder="Select Region"
                solo
                class="w-full"
              />
            </div>

            <div>
              <span
                class="hidden w-full py-2 align-middle text-[20px]
                font-semibold text-[#555555] md:block"
              >
                Teams
              </span>
              <VTextField
                v-model="searchTeamName"
                placeholder="Type Team Name"
                solo
                class="w-full"
                :hide-details="false"
                clearable
                @click:clear="searchTeamName = ''"
              />
            </div>
          </div>
        </div>
        <div class="col-span-3">
          <section
            v-if="totalPages > 0"
            class="grid w-full grid-cols-1 gap-2 md:grid-cols-2"
          >
            <div
              v-for="(match) in filteredMatchList"
              :key="match.id" data-aos="fade-up"
              data-aos-offset="0"
              class="col-span-1"
            >
              <div class="grid grid-cols-5 rounded-lg bg-[#212121] p-4">
                <div class="text-md col-span-4 font-medium text-white md:text-xl">
                  {{ match.event_date }}
                </div>
                <div class="col-span-4 text-sm font-medium text-green-600 md:text-lg">
                  {{ match.time }}
                </div>
                <div class="col-span-4 text-sm font-medium text-green-600 md:text-lg">
                  {{ match.field }}
                </div>
                <div
                  class="col-span-2 flex text-lg
                  font-medium text-slate-600"
                >
                  <span class="h-44 flex-1 p-4 transition sm:h-52 md:h-60">
                    <img
                    :src="getMediaURL(match.team1.media[0])"
                    alt="Team 1 logo"
                    class="size-full object-contain"
                    />
                  </span>
                </div>
                <div></div>
                <div
                v-if="match.team2"
                  class="col-span-2 flex text-lg
                  font-medium text-slate-600"
                >
                  <span class="h-44 flex-1 p-4 transition sm:h-52 md:h-60">
                    <img
                    :src="getMediaURL(match.team2.media[0])"
                    alt="Team 2 logo"
                    class="size-full object-contain"
                    />
                  </span>
                </div>
                <div
                v-else
                  class="col-span-2 flex text-lg
                  font-medium text-slate-600"
                >
                  <span class="h-44 flex-1 p-4 transition sm:h-52 md:h-60">
                    <img
                    src="~/assets/images/tfw9s.png"
                    alt="Team 2 logo"
                    class="size-full object-contain"
                    />
                  </span>
                </div>
                <div
                class="col-span-2 text-center text-sm font-semibold text-white
                md:text-lg lg:truncate lg:whitespace-nowrap lg:text-xl"
                >
                  {{ match.team1.name }}
                </div>
                <div
                class="col-span-1 flex items-center justify-center text-center
                text-sm font-semibold text-[#CCCCCC] md:text-lg lg:text-xl"
                  >
                  VS
                </div>
                <div
                v-if="match.team2"
                class="col-span-2 text-center text-sm font-semibold text-white
                md:text-lg lg:truncate lg:whitespace-nowrap lg:text-xl"
                  >
                  {{ match.team2.name }}
                </div>
                <div
                v-else
                class="col-span-2 text-center text-sm font-semibold text-white
                md:text-lg lg:truncate lg:whitespace-nowrap lg:text-xl"
                  >
                  Bye
                </div>
                <div v-if="match.submit"
                class="relative col-span-5 flex justify-center
                pt-2 text-2xl font-semibold text-white"
                >
                  <div class="absolute rounded bg-red-500 px-2 text-sm">
                    Final Score
                  </div>
                  <div class="mt-8 rounded bg-[#1A1A1B] px-4 py-2">
                  <span
                  :class="(parseInt(match.team1_score) >= parseInt(match.team2_score))
                  ? 'font-semibold text-[#5EE738]' : 'font-medium text-white'"
                  >
                    {{ doubleDigitFormat(match.team1_score) }}
                  </span>
                  :
                  <span
                  :class="(parseInt(match.team1_score) <= parseInt(match.team2_score))
                  ? 'font-semibold text-[#5EE738]' : 'font-medium text-white'"
                  >
                    {{ doubleDigitFormat(match.team2_score) }}
                  </span>
                  </div>
                </div>
                <div v-if="!match.submit"
                class="relative col-span-5 flex justify-center
                pb-2 pt-4 text-2xl font-semibold text-white"
                >
                  <div class="absolute rounded bg-green-600 px-2 text-sm">
                    Upcoming
                  </div>
                  <div class="mt-4 px-4 py-2">
                  <span class="font-semibold text-[#5EE738]">
                    {{ match.time }}
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            v-if="filteredMatchList.length === 0"
            class="col-span-1 flex h-60 items-center
            justify-center font-semibold
            text-[#555555] md:col-span-3"
            data-aos="fade-up"
          >
            No Draws
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import handlesMedia from '~/mixins/shop/handlesMedia';
export default {
  mixins: [ handlesMedia ],
  data() {
    return {
      pageSEO: {
        title: 'Draws - TFW9s',
        description: ''
      },
      searchTeamName: '',
      matchRoundOption: [
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
      matchTimeOption: [
        { text: '8:00 AM', value: '8:00' },
        { text: '8:25 AM', value: '8:25' },
        { text: '8:50 AM', value: '8:50' },
        { text: '9:15 AM', value: '9:15' },
        { text: '9:40 AM', value: '9:40' },
        { text: '10:05 AM', value: '10:05' },
        { text: '10:30 AM', value: '10:30' },
        { text: '10:55 AM', value: '10:55' },
        { text: '11:20 AM', value: '11:20' },
        { text: '11:45 AM', value: '11:45' },
        { text: '12:10 PM', value: '12:10' },
        { text: '12:35 PM', value: '12:35' },
        { text: '1:00 PM', value: '13:00' },
        { text: '1:25 PM', value: '13:25' },
        { text: '1:50 PM', value: '13:50' },
        { text: '2:15 PM', value: '14:15' },
        { text: '2:40 PM', value: '14:40' },
        { text: '3:05 PM', value: '15:05' },
        { text: '3:30 PM', value: '15:30' },
        { text: '3:55 PM', value: '15:55' },
        { text: '4:20 PM', value: '16:20' },
        { text: '4:45 PM', value: '16:45' },
        { text: '5:10 PM', value: '17:10' },
        { text: '5:35 PM', value: '17:35' },
        { text: '6:00 PM', value: '18:00' },
        { text: '6:00 PM', value: '18:00' },
        { text: '6:25 PM', value: '18:25' },
        { text: '6:50 PM', value: '18:50' },
        { text: '7:15 PM', value: '19:15' },
        { text: '7:40 PM', value: '19:40' },
        { text: '8:05 PM', value: '20:05' },
        { text: '8:30 PM', value: '20:30' },
        { text: '8:55 PM', value: '20:55' },
        { text: '9:20 PM', value: '21:20' },
        { text: '9:45 PM', value: '21:45' },
        { text: '10:00 PM', value: '22:00' },
      ],
      selectedRegion: null,
      selectedAgeGroup: null,
      selectedYear: null,
      AgeGroupList: [],
      EventList: [],
      matchList: [],
      isLoaded: false,
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
    formattedRegions() {
      const regions = this.EventList.map(event => ({
        id: event.region ? event.region.id : null,
        name: event.region ? event.region.name : 'Unknown'
      }));

      const uniqueRegions = [ ...new Set(regions.map(region => region.name)) ]
        .filter(region => region).sort();

      const formattedRegions = uniqueRegions.map(regionName => {
        const regionId = regions.find(region => region.name === regionName).id;
        return {
          text: regionName,
          value: regionId
        };
      });
      return formattedRegions;
    },
    filteredMatchList() {
      const searchTerm = this.searchTeamName.toLowerCase().trim();

      if (!searchTerm) {
        return this.matchList;
      }

      return this.matchList.filter(match => {

        const team1Name = match.team1.name.toLowerCase() || '';
        const team2Name = match.team2.name.toLowerCase() || '';
        const teamNameMatches = team1Name.includes(searchTerm) || team2Name.includes(searchTerm);

        const isNotCompleted = !match.submit;

        return teamNameMatches && isNotCompleted;
      });
    }
  },
  watch: {
    EventList: {
      handler(newEvents) {
        if (Array.isArray(newEvents) && newEvents.length > 0) {
          const firstEvent = newEvents[0];
          if (firstEvent && firstEvent.event_date) {
            const eventDate = new Date(firstEvent.event_date);
            if (!isNaN(eventDate)) {
              this.selectedYear = eventDate.getFullYear();
              this.selectedRegion = firstEvent.region_id;
              this.selectedAgeGroup = firstEvent.agegroup_id;
              this.retrieveEventMatch()
            } else {
              console.error('Invalid event date format');
            }
          } else {
            console.error('Missing or invalid event data');
          }
        }
      },
      immediate: true,
    },
    selectedYear: {
      handler(newYear) {
        if (newYear && this.isLoaded) {
          this.page = 1
          /*
           * this.selectedRegion = null
           * this.selectedAgeGroup = null
           */
          this.selectedAgeGroup = this.formattedAgeGroup[0].value || null;
          this.selectedRegion = this.formattedRegions[0].value || null;
        }
      },
      immediate: true,
    },
    selectedAgeGroup: {
      handler(newYear) {
        if (newYear && this.isLoaded) {
          this.page = 1
          this.selectedRegion = null;
          this.retrieveEventMatch()
        }
      },
      immediate: true,
    },
    selectedRegion: {
      handler(newEvent) {
        if (newEvent && this.isLoaded) {
          this.page = 1
          this.retrieveEventMatch();
        } else if (this.isLoaded) {
          this.team = []
          this.totalPages = 0
        }
      },
      immediate: true,
    },
    searchTeamName(newVal) {
      if (newVal) {
        this.page = 1;
      }
    }
  },
  created() {
    this.retrieveAgeGroups();
    this.retrieveEvents();
  },
  methods: {
    AMPMformat(time) {
      // eslint-disable-next-line camelcase
      const matched = this.matchTimeOption.find(data => data.value === time);
      if (matched) {
        return matched.text;
      } else {
        // If no matching field is found, return "unknown"
        return 'Unknown';
      }
    },
    roundFormat(round) {
      // eslint-disable-next-line camelcase
      const matched = this.matchRoundOption.find(data => data.value === round);
      if (matched) {
        return matched.text;
      } else {
        // If no matching field is found, return "unknown"
        return 'Unknown';
      }
    },
    replaceUnderWithU(str) {
      return str.replace(/^Under \b/, 'U');
    },
    doubleDigitFormat(num) {
      if (num < 10) {
        return `0${num}`;
      } else {
        return num.toString();
      }
    },
    reformatTime(timeString) {
      const [
        hours,
        minutes
      ] = timeString.split(':');
      let formattedTime;
      let period;

      // Convert hours to integer for comparison
      const hoursInt = parseInt(hours, 10);

      if (hoursInt >= 12) {
        period = 'PM';
        formattedTime = `${hoursInt === 12 ? 12 : hoursInt - 12}:${minutes}`;
      } else {
        period = 'AM';
        formattedTime = `${hoursInt === 0 ? 12 : hoursInt}:${minutes}`;
      }

      return `${formattedTime} ${period}`;
    },
    formattedDate(dateString) {
      const date = new Date(dateString);
      const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      const dayOfWeek = daysOfWeek[date.getDay()];
      const dayOfMonth = date.getDate();
      const monthName = months[date.getMonth()];
      const year = date.getFullYear();

      const suffixes = [
        'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'
      ];
      const suffixIndex = dayOfMonth % 100;
      const suffix = suffixes[suffixIndex >= 11 &&
      suffixIndex <= 13 ? 0 : dayOfMonth % 10];

      return `${dayOfWeek} ${dayOfMonth}${suffix} ${monthName} ${year}`;
    },
    // eslint-disable-next-line camelcase
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
          this.EventList = response.data.events;
        })
        .finally(() => {
          this.retrieveEventMatch();
        });
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
    retrieveEventMatch() {
      const query = {
        sort: 'latest',
        region: this.selectedRegion,
        agegroup: this.selectedAgeGroup,
        year: this.selectedYear,
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
          const EventList = response.data.events.map(event => {
            return {
              ...event,
              eventmatch: event.eventmatch.map(match => {
                return {
                  ...match,
                  time: this.AMPMformat(event.time),
                  round: this.roundFormat(event.round),
                  // eslint-disable-next-line camelcase
                  event_date: this.formattedDate(event.event_date),
                  // eslint-disable-next-line camelcase
                  field: match.field.name,
                  submit: match.submitted === 1
                };
              })
            };
          });
          this.matchList = EventList.flatMap(data => data.eventmatch);
          console.log(this.matchList)
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          this.isLoaded = true;
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