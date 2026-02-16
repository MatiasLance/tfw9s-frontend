<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
    <!-- Enhanced Header -->
    <BaseHeader
      class="mx-auto max-w-full gap-4 relative overflow-hidden
      bg-gradient-to-br from-green-900 via-green-700 to-gray-900
      lg:px-8"
    >
      <!-- Animated Rugby Field Background -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-1/4 left-0 w-full h-1 bg-white/30 
                    animate-pulse"></div>
        <div class="absolute top-1/2 left-0 w-full h-1 bg-white/40 
                    animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-3/4 left-0 w-full h-1 bg-white/30 
                    animate-pulse" style="animation-delay: 2s;"></div>
      </div>

      <div
        class="col-span-12 text-center sm:space-y-3 sm:text-left
               lg:col-span-6 xl:mt-10 relative z-10"
        data-aos="fade-right"
      >
        <span class="superheadline flex flex-row items-center text-[1rem]
                    font-normal text-white"
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white" class="hover:scale-105 transition-transform">
                <i class="ri-home-4-line mr-2"></i>Home
              </VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl
                   bg-gradient-to-r from-green-400 to-white bg-clip-text 
                   drop-shadow-lg"
        >
          🏉 Tournaments
        </h1>
      </div>
    </BaseHeader>

    <!-- Main Content -->
    <section class="mx-auto max-w-screen-xl gap-4 py-8 px-4">
      <div class="grid grid-cols-1 gap-6">
        
        <!-- Sporty Tab Navigation -->
        <div class="col-span-1 block">
          <VueSlickCarousel v-bind="slickSettings" draggable focus-on-select>
            <div v-for="tab in tabs" :key="tab.name" class="px-2">
              <button
                type="button"
                class="w-full rounded-xl py-3 text-center font-bold 
                       transition-all duration-300 transform hover:scale-105 
                       shadow-lg border-2"
                :class="(activeTab == tab.name)
                  ? `bg-gradient-to-r from-green-500 to-green-600 
                     border-green-400 text-white shadow-green-500/50
                     hover:from-green-600 hover:to-green-700`
                  : `bg-gradient-to-r from-gray-800 to-gray-900 
                     border-gray-600 text-gray-300 hover:border-green-500
                     hover:text-white`"
                @click="setTab(tab.name)"
              >
                <i :class="tab.icon" class="mr-2"></i>
                {{ tab.Label }}
              </button>
            </div>
          </VueSlickCarousel>
        </div>

        <!-- Filters Section -->
        <div class="grid grid-cols-1 gap-6 p-4 md:grid-cols-3 
                    bg-gradient-to-br from-gray-800 to-gray-900 
                    rounded-2xl shadow-2xl border border-gray-700"
        >
          <!-- Date Filter -->
          <div class="flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <span class="text-lg font-bold text-white flex items-center">
                <i class="ri-calendar-2-line mr-2 text-green-400"></i>
                Select Date
              </span>
              <span
                v-if="dateFilter"
                class="cursor-pointer text-sm text-red-400 
                       hover:text-red-300 transition-colors flex items-center"
                @click="clearDate"
              >
                <i class="ri-close-line mr-1"></i>Clear
              </span>
            </div>
            <ODatepicker
              v-model="dateFilter"
              placeholder="Click to select..."
              icon="calendar"
              class="rounded-xl bg-gray-700 border-gray-600 
                     text-white focus:ring-2 focus:ring-green-500 
                     focus:border-transparent"
              :events="EventDates"
            />
          </div>

          <!-- Search Filter -->
          <div class="flex flex-col md:col-start-3">
            <span class="text-lg font-bold text-white mb-3 flex items-center">
              <i class="ri-search-line mr-2 text-green-400"></i>
              Search Tournaments
            </span>
            <div class="relative">
              <i class="ri-search-line absolute left-3 top-1/2 
                        transform -translate-y-1/2 text-green-400
                        z-10 pointer-events-none"
              ></i>
              <OInput
                v-model="query"
                type="text"
                placeholder="Search tournaments..."
                class="!pl-10 rounded-xl bg-gray-700 border-gray-600 
                      text-white placeholder-gray-400 
                      focus:ring-2 focus:ring-green-500 
                      focus:border-transparent w-full"
              />
            </div>
          </div>
        </div>

        <!-- Tournament Cards -->
        <span v-if="activeTab == 'weekly'" class="col-span-1" 
              data-aos="fade-up" data-aos-offset="0">
          <TournamentGrid 
            :items="filteredWeekly" 
            type="competitions"
            @view-article="ViewArticle"
          />
        </span>

        <span v-if="activeTab == 'tournament'" class="col-span-1" 
              data-aos="fade-up" data-aos-offset="0">
          <TournamentGrid 
            :items="filteredTournament" 
            type="tournaments"
            @view-article="ViewArticle"
          />
        </span>

        <span v-if="activeTab == 'coast'" class="col-span-1" 
              data-aos="fade-up" data-aos-offset="0">
          <TournamentGrid 
            :items="filteredCentral" 
            type="central coast"
            @view-article="ViewArticle"
          />
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'
import VueSlickCarousel from 'vue-slick-carousel'
import handlesMedia from '~/mixins/shop/handlesMedia';
import currencyMixin from '~/mixins/currency/handlesCurrency'

export default {
  components: { VueSlickCarousel },
  mixins: [
    handlesMedia,
    currencyMixin
  ],
  data() {
    return {
      pageSEO: {
        title: 'Registration - TFW9s',
        description: ''
      },
      activeTab: 'weekly',
      tabs: [
        { name: 'weekly', Label: 'Weekly Competitions' },
        { name: 'tournament', Label: 'Tournaments' },
        { name: 'coast', Label: 'Central Coast' },
      ],
      SeriesList: [],
      slickSettings: {
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 0,
              infinite: true,
              arrows: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 0,
              infinite: true,
              arrows: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 0,
              infinite: true,
              arrows: true
            }
          },
          {
            breakpoint: 370,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 0,
              infinite: true,
              arrows: true
            }
          }
        ],
      },
      query: null,
      dateFilter: null
    };
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
    EventDates() {
      return this.SeriesList.map(event =>
        ({ date: new Date(event.start), type: this.eventDot(event.type) }));
    },
    filteredWeekly() {
      return this.SeriesList.filter(x =>
        x && x.type && typeof x.type === 'string' ?
          x.type.toLowerCase().includes(('weekly').toLowerCase()) :
          false
      );
    },
    filteredTournament() {
      return this.SeriesList.filter(x =>
        x && x.type && typeof x.type === 'string' ?
          x.type.toLowerCase().includes(('tournament').toLowerCase()) :
          false
      );
    },
    filteredCentral() {
      return this.SeriesList.filter(x =>
        x && x.type && typeof x.type === 'string' ?
          x.type.toLowerCase().includes(('coast').toLowerCase()) :
          false
      );
    },
  },
  watch: {
    query() {
      this.quickFetch();
    },
    dateFilter: {
      handler(newDate) {
        this.quickFetch();
      },
      immediate: true,
    },
  },
  async mounted() {
    await this.quickFetch();
    this.page = 1
  },
  methods: {
    quickFetch: _debounce(function() {
      this.retrieveSeries();
    }, 50),
    eventDot(type) {
      if (type === 'weekly') {
        return 'success'
      } else if (type === 'tournament') {
        return 'warning'
      } else {
        return 'danger'
      }
    },
    setTab(tab) {
      this.activeTab = tab;
    },
    ViewArticle(id, type) {
      this.$router.push({
        path: '/tournament-article',
        query: {
          id,
          type
        }
      })
    },
    formattedDate(dateString) {
      const date = new Date(dateString);
      date.setHours(0, 0, 0, 0);
      return date;
    },
    DateRange(start, end) {
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
      const suffixes = [
        'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'
      ];
      const startdate = start.getDate();
      const enddate = end.getDate();
      const startmonth = months[start.getMonth()];
      const endmonth = months[end.getMonth()];
      const startyear = start.getFullYear();
      const endyear = end.getFullYear();

      const suffix1 = startdate % 100;
      const suffix2 = enddate % 100;
      const startsuffix = suffixes[suffix1 >= 11 &&
      suffix1 <= 13 ? 0 : startdate % 10];
      const endsuffix = suffixes[suffix2 >= 11 &&
      suffix2 <= 13 ? 0 : enddate % 10];

      // eslint-disable-next-line max-len, vue/max-len, no-return-assign
      return `${startmonth === endmonth? startmonth:endmonth} ${startdate}${startsuffix} -  ${startmonth !== endmonth? endmonth:''} ${enddate}${endsuffix} ${startyear === endyear? startyear: endyear}`;
    },

    retrieveSeries() {
      let eventYear = this.dateFilter ? this.dateFilter.getUTCFullYear() : null;
      let eventMonth = this.dateFilter ?
        (this.dateFilter.getUTCMonth() + 1) : null;
      let eventDay = this.dateFilter ?
        (this.dateFilter.getUTCDate()): null;

      // Increment the day by 1
      eventDay++;

      // Get the last day of the current month
      const lastDayOfMonth = new Date(eventYear, eventMonth, 0).getDate();

      if (eventDay > lastDayOfMonth) {
        eventDay = 1;
        eventMonth++;

        if (eventMonth === 13) {
          eventMonth = 1;
          eventYear++;
        }
      }

      const eventMonthStr = eventMonth? eventMonth.toString().padStart(2, '0') : null;
      const eventDayStr = eventDay? eventDay.toString().padStart(2, '0') : null;

      // eslint-disable-next-line camelcase
      let event_date = null
      if (eventYear && eventMonthStr && eventDayStr) {
        // eslint-disable-next-line camelcase, no-const-assign
        event_date = `${eventYear}-${eventMonthStr}-${eventDayStr}`;
      }

      const query = {
        q: this.query,
        sort: 'start_date',
        page: this.page,
        // eslint-disable-next-line camelcase
        eventDate: event_date,
        withFixing: 'with_fixing',
        isPaused: 0,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/series?${queryString}`)
        .then((response) => {
          this.SeriesList = response.data.series.map(x => {
            return {
              ...x,
              start: this.formattedDate(x.start),
              end: this.formattedDate(x.end),
            };
          });
        })
    },

    clearDate() {
      this.dateFilter = null;
    },
  },
};
</script>

<style>
.info h1,
.info h2,
.info h3,
.info p {
  font-size: revert !important;
}

.info ul,
.info ol {
  list-style: revert !important;
  margin: 0 !important;
  padding-left: 20px !important;
}

button.slick-prev:before, button.slick-next:before {
  color:#10b981 !important;
}

button.slick-prev:before {
  margin-right: -25px !important;
}

button.slick-next:before {
  margin-left: -25px !important;
}
</style>

