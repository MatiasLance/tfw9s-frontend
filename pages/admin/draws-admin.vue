<template>
  <div class="min-h-screen bg-[#1A1A1B] text-white">
    <section class="mx-auto w-full max-w-screen-xl gap-4 p-4 sm:p-7">
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
                Field
              </span>
              <VSelect
                v-model="selectedField"
                :items="formattedFields"
                placeholder="Select Field"
                solo
                class="w-full"
              />
            </div>

            <!-- Region -->
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

            <!-- Team Name -->
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
            class="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
          >
            <div
              v-for="(match) in filteredMatchList"
              :key="match.id" data-aos="fade-up"
              data-aos-offset="0"
              class="col-span-1 mx-auto w-full max-w-lg"
            >
              <div class="grid grid-cols-5 rounded-lg bg-[#212121] p-4 w-full">
                <div class="col-span-4 text-md md:text-xl font-medium text-white">
                  {{ match.event_date }}
                </div>
                <div class="col-span-4 text-sm md:text-lg font-medium text-green-600">
                  {{ match.time }}
                </div>
                <div class="col-span-4 text-sm md:text-lg font-medium text-green-600">
                  {{ match.field.name }}
                </div>
                <div
                  class="col-span-2 flex text-lg
                  font-medium text-slate-600"
                >
                  <span class="flex-1 transition h-44 sm:h-52 md:h-60 p-4">
                    <img
                    :src="getMediaURL(match.team1.media[0])"
                    alt="Team 1 logo"
                    class="h-full w-full object-contain"
                    />
                  </span>
                </div>
                <div></div>
                <div
                  class="col-span-2 flex text-lg
                  font-medium text-slate-600"
                >
                  <span class="flex-1 transition h-44 sm:h-52 md:h-60 p-4">
                    <img
                    :src="getMediaURL(match.team2.media[0])"
                    alt="Team 2 logo"
                    class="h-full w-full object-contain"
                    />
                  </span>
                </div>
                <div
                class="col-span-2 text-center text-sm md:text-lg font-semibold
                text-white lg:truncate lg:whitespace-nowrap lg:text-xl"
                >
                  {{ match.team1.name }}
                </div>
                <div
                class="col-span-1 flex items-center justify-center text-center
                text-sm md:text-lg font-semibold text-[#CCCCCC] lg:text-xl"
                  >
                  VS
                </div>
                <div
                class="col-span-2 text-center text-sm md:text-lg font-semibold
                text-white lg:truncate lg:whitespace-nowrap lg:text-xl"
                  >
                  {{ match.team2.name }}
                </div>
                <div v-if="match.submit"
                class="col-span-5 text-2xl text-white font-semibold
                flex justify-center pt-2 relative"
                >
                  <div class="absolute bg-red-500 text-sm rounded px-2">
                    Final Score
                  </div>
                  <div class="bg-[#1A1A1B] px-4 py-2 mt-8 rounded">
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
                class="col-span-5 text-2xl text-white font-semibold
                flex justify-center pt-4 pb-2 relative"
                >
                  <div class="absolute bg-green-600 text-sm rounded px-2">
                    Upcoming
                  </div>
                  <div class="px-4 py-2 mt-4">
                  <span class="font-semibold text-[#5EE738]">
                    {{ match.time }}
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- No draws section -->
           <section
            v-if="filteredMatchList.length === 0"
            class="
            col-span-3 flex flex-col
            items-center justify-center
            h-60 p-6 text-center
            rounded-lg border border-dashed
            border-gray-300 bg-gray-50"
            data-aos="fade-up"
          >
            <div class="text-gray-400 mb-3">
              <i class="ri-emotion-sad-line ri-2x"></i>
            </div>

            <h2 class="text-lg font-semibold text-gray-700 mb-1">
              No Draws Found
            </h2>

            <p class="text-sm text-gray-500 max-w-[280px]">
              There are no draws matching your current criteria.
              Try changing the filters or check back later.
            </p>

            <button
              type="button"
              class="
              mt-4 px-4 py-2
              bg-blue-600 text-white
              text-sm font-medium
              rounded hover:bg-blue-700
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
              focus:ring-offset-2 transition"
              @click="refreshDraws"
            >
              Refresh
            </button>
          </section>
          <!-- End of no draws section -->
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
      selectedField: null,
      selectedYear: null,
      FieldList: [],
      EventList: [],
      MatchList: [],
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
    formattedFields() {
      const allFields = this.FieldList
        .filter(field => field && field.id && field.name)
        .map(field => ({
          id: field.id,
          name: field.name
        }));

      const eventFields = this.EventList
        .map(event => event.field)
        .filter(field => field && field.id && field.name)
        .map(field => ({
          id: field.id,
          name: field.name
        }));

      const combinedFields = [ ...allFields, ...eventFields ];
      const uniqueFieldsMap = new Map();
      
      combinedFields.forEach(field => {
        if (!uniqueFieldsMap.has(field.id)) {
          uniqueFieldsMap.set(field.id, field);
        }
      });

      const uniqueFields = Array.from(uniqueFieldsMap.values());

      uniqueFields.sort((a, b) => a.name.localeCompare(b.name));

      return uniqueFields.map(field => ({
        text: field.name,
        value: field.id
      }));
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

      // Filter out duplicates and sort the region names alphabetically
      const uniqueRegions = [ ...new Set(regions.map(region => region.name)) ]
        .filter(region => region).sort();

      // Create formatted region objects with text and value properties
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
        return this.MatchList;
      }

      return this.MatchList.filter(match => {

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
              this.selectedField  = firstEvent.field_id;
              this.retrieveEventMatch()
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
          this.selectedRegion = null;
          this.selectedField = null;
          this.retrieveEventMatch();
        }
      },
      immediate: true,
    },
    selectedRegion: {
      handler(newEvent) {
        if (newEvent && this.isLoaded) {
          this.page = 1
          // this.query = null
          this.retrieveEventMatch();
        } else if (this.isLoaded) {
          this.team = []
          this.totalPages = 0
        }
      },
      immediate: true,
    },
    selectedField: {
      handler(newField) {
        if (newField && this.isLoaded) {
          this.page = 1;
          this.retrieveEventMatch();
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
    this.retrieveFields();
    this.retrieveEvents();
  },
  methods: {
    refreshDraws() {
      this.$nuxt.refresh();
    },
    AMPMformat(time) {
      const matched = this.matchTimeOption.find(data => data.value === time);
      if (matched) {
        return matched.text;
      } else {
        return 'Unknown';
      }
    },
    roundFormat(round) {
      const matched = this.matchRoundOption.find(data => data.value === round);
      if (matched) {
        return matched.text;
      } else {
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
    retrieveFields() {
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
        .$get(`v1/fields?${queryString}`)
        .then((response) => {
          this.FieldList = response.data.fields;
        })
    },
    retrieveEventMatch() {
      const query = {
        sort: 'latest',
        region: this.selectedRegion,
        /* eslint-disable camelcase */
        field_id: this.selectedField,
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
                  eventDate: this.formattedDate(event.event_date),
                  field: {
                    id: match.field.id || null,
                    name: match.field.name || 'Unknown Field'
                  },
                  submit: match.submitted === 1
                };
              })
            };
          });
          this.MatchList = EventList.flatMap(data => data.eventmatch);
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