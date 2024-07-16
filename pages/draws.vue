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
          lg:space-y-3
          lg:text-left
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
      <div class="grid grid-cols-3 gap-2">
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
          </span>
        </div>
        <div class="col-span-3">
          <section
          v-if="totalPages > 0"
          class="grid w-full grid-cols-1 md:grid-cols-2 gap-2"
          >
          <div
          v-for="(match) in MatchList"
          :key="match.id" data-aos="fade-up"
          data-aos-offset="0"
          class="col-span-1"
        >
        <div class="grid grid-cols-5 rounded-lg bg-[#212121] p-4">
          <div class="col-span-4 text-md md:text-xl font-medium text-white">
            {{ match.event_date }}
          </div>
          <div class="col-span-4 text-sm md:text-lg font-medium text-slate-600">
            {{ match.field }}
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
              {{ parseInt(match.time) > 12 ? 'PM' : 'AM' }}
            </span>
            </div>
          </div>
        </div>
        </div>
          </section>
          <section
          v-if="totalPages=== 0"
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
        title: 'Draws - TFW Rugby League',
        description: ''
      },
      selectedRegion: null,
      selectedAgeGroup: null,
      selectedYear: null,
      AgeGroupList: [],
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
           * this.selectedRegion = null
           * this.selectedAgeGroup = null
           */
          this.selectedAgeGroup = this.formattedAgeGroup[0]?.value ?? null;
          this.selectedRegion = this.formattedRegions[0]?.value ?? null;
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
          // this.query = null
          this.retrieveEventMatch();
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
                  time: event.time,
                  // eslint-disable-next-line camelcase
                  event_date: this.formattedDate(event.event_date),
                  // eslint-disable-next-line camelcase
                  field: match.field.name,
                  submit: match.submitted === 1
                };
              })
            };
          });
          this.MatchList = EventList.flatMap(data => data.eventmatch);
          console.log(this.MatchList);
          console.log(response.data.events);
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
