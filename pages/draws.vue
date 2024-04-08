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
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-6">
        <div class="col-span-2">
          <VSelect
          v-model="selectedYear"
          :items="formattedYears"
          placeholder="Select Event Year"
          :clearable="false"
          solo
          />
        </div>
        <div class="col-span-2">
          <VSelect
          v-model="selectedEvent"
          :items="filteredEvents"
          placeholder="Select Event"
          solo
          />
        </div>
        <div class="col-span-2">
          <VSelect
          v-model="selectedGroup"
          :items="ageGroup"
          placeholder="Select Age Group"
          solo
          />
        </div>
        <div
          v-for="(match) in MatchList"
          :key="match.id" data-aos="fade-up"
          class="col-span-2 sm:col-span-6 lg:col-span-3"
        >
        <div class="grid grid-cols-5 rounded-lg bg-[#212121] p-4">
          <div class="col-span-5 text-xl font-medium text-white">
            {{ match.event_date }}
          </div>
          <div class="col-span-5 text-lg font-medium text-slate-600">
            {{ match.field }}
          </div>
          <div class="col-span-5 flex text-lg font-medium text-slate-600">
            <span class="flex-1 transition h-44 sm:h-52 md:h-60 p-4">
              <img
              src="https://www.sharks.com.au/.theme/sharks/badge-light.svg?bust=202404030404"
              alt="Team 1 logo"
              class="h-full w-full object-contain xl:object-cover"
              />
            </span>
            <span class="flex-1 transition h-44 sm:h-52 md:h-60 p-4">
              <img
              src="https://www.seaeagles.com.au/.theme/sea-eagles/badge-light.svg?bust=202404030404"
              alt="Team 2 logo"
              class="h-full w-full object-contain xl:object-cover"
              />
            </span>
          </div>
          <div
          class="col-span-2 text-right text-lg font-semibold
          text-white lg:truncate lg:whitespace-nowrap lg:text-xl"
          >
          {{ match.team1.name }}
          </div>
          <div
          class="col-span-1 flex items-center justify-center
          text-center text-lg font-semibold text-[#CCCCCC] lg:text-xl"
            >
            VS
          </div>
          <div
          class="col-span-2 text-left text-lg font-semibold
          text-white lg:truncate lg:whitespace-nowrap lg:text-xl"
            >
            {{ match.team2.name }}
          </div>
          <!--
            <div v-if="match.submit"
            class="col-span-5 text-2xl font-bold text-white text-center"
            >
            {{ match.team1_score+':'+ match.team2_score}}
            </div>
          -->
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
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedEvent: null,
      selectedYear: null,
      selectedGroup: '',
      FieldList: [],
      EventList: [],
      MatchList: [],
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
    selectedYear: {
      handler(newYear) {
        if (newYear) {
          this.selectedEvent = null
          this.query = null
          this.retrieveEventMatch();
        }
      },
      immediate: true,
    },
    selectedEvent: {
      handler(newEvent) {
        if (newEvent) {
          this.query = null
          this.retrieveEventMatch();
        }
      },
      immediate: true,
    },
    query: {
      handler(newQuery) {
        if (newQuery) {
          this.retrieveEventMatch();
        } else if (newQuery === '') {
          this.retrieveEventMatch();
        }
      },
      immediate: true,
    },
  },
  created() {
    this.retrieveEvents();
    setTimeout(() => {
      this.showVueTable = true
    }, 1000);
  },
  methods: {
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
        'th',
        'st',
        'nd',
        'rd'
      ];
      const suffix = suffixes[(dayOfMonth - 1) % 10 < 4 ?
        (dayOfMonth - 1) % 10 : 0];

      return `${dayOfWeek} ${dayOfMonth}${suffix} ${monthName} ${year}`;
    },
    // eslint-disable-next-line camelcase
    findField(field_id) {
      // eslint-disable-next-line camelcase
      const foundField = this.FieldList.find(field => field.id === field_id);
      if (foundField) {
        return foundField.name;
      } else {
        // If no matching field is found, return "unknown"
        return 'Unknown';
      }
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
          this.retrieveFields();
        });
    },
    retrieveFields() {
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
        .$get(`v1/fields?${queryString}`)
        .then((response) => {
          this.FieldList= response.data.fields;
        })
        .finally(() => {
          this.retrieveEventMatch();
        });
    },
    retrieveEventMatch() {
      const query = {
        sort: 'latest',
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
        .$get(`v1/events?${queryString}`)
        .then((response) => {
          const EventList = response.data.events.map(event => {
            return {
              ...event,
              // eslint-disable-next-line camelcase
              manager_name: `${event.manager.user.first_name}
               ${event.manager.user.last_name}`,
              date: this.formattedDate(event.event_date),
              eventmatch: event.eventmatch.map(match => {
                return {
                  ...match,
                  time: this.reformatTime(match.match_time),
                  // eslint-disable-next-line camelcase
                  event_date: this.formattedDate(event.event_date),
                  // eslint-disable-next-line camelcase
                  field: this.findField(event.field_id),
                  submit: match.submitted === 1
                };
              })
            };
          });
          console.log(EventList)
          this.MatchList = EventList.flatMap(data => {
            return data.eventmatch;
          });
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          this.showCustomVueTable = true;
          console.log('Matches: ', this.MatchList)
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
