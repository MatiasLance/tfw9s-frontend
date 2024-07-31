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
            superheadline flex flex-row
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
          Registration
        </h1>
      </div>
    </BaseHeader>
    <section class="mx-auto max-w-screen-xl gap-4 p-6">
      <div class="grid grid-cols-1 gap-4">
        <span class="col-span-1">
          <VueSlickCarousel
            v-bind="slickSettings"
            draggable
            focus-on-select
            >
            <div
              v-for="tab in tabs"
              :key="tab.name" class="px-2"
            >
              <button
                type="button"
                class="
                w-full
                rounded-md
                py-1.5
                text-center
                font-semibold
                "
                :class="(activeTab == tab.name)
                ? `from-40% via-95% to-100%
                    bg-gradient-to-br
                    from-[#5EE738]
                    via-[#3e872a]
                    to-[#050505]
                    text-white`
                :
                'bg-[#212121] text-[#555555]'"
                @click="setTab(tab.name)"
              >
                {{ tab.Label }}
              </button>
            </div>
          </VueSlickCarousel>
        </span>
        <div class="grid grid-cols-1 md:grid-cols-3 px-4 gap-4">
          <div class="flex flex-col">
            <div class="flex items-center justify-between">
              <span
                class="text-[#555555]
                font-bold
                text-lg"
                >
                Select Date
              </span>
              <span
                v-if="dateFilter"
                class="text-red-400
                text-xs
                cursor-pointer
                hover:text-sm
                hover:text-red-500
                "
                @click="clearDate"
                >
                Clear
              </span>
            </div>
            <ODatepicker
              v-model="dateFilter"
              placeholder="Click to select..."
              icon="calendar"
              class="rounded bg-white"
              :events="EventDates"
            >
            </ODatepicker>
          </div>
          <div class="md:col-start-3 flex flex-col">
            <span
              class="text-[#555555]
              font-bold
              text-lg"
              >
              Search Tournaments
            </span>
            <OInput
            v-model="query"
            type="text"
            placeholder="Search..."
          />
          </div>
        </div>
        <span
          v-if="activeTab == 'weekly'"
          class="col-span-1 p-4 text-white"
          data-aos="fade-up"
          data-aos-offset="0"
        >
        <article
          class="grid w-full grid-cols-1
          gap-4 pt-2 md:grid-cols-2 lg:grid-cols-3"
          >
            <div
              v-for="(item, index) in filteredWeekly"
              :key="item.id"
              class="relative shrink-0 snap-center rounded bg-[#212121]
              backdrop-blur border-double border-[#4cbe5c] border-2 group"
              data-aos="zoom-in"
              data-aos-once="true"
              :data-aos-delay="`${index}00`"
            >
              <img
                class="z-0 h-full w-full object-cover transition"
                :src="getMediaURL(item.media[0], 'temp')"
                alt="Series Image"
              />
              <div class="absolute top-0 right-0 z-10 rounded-bl-xl
                bg-black p-2 pl-4 font-semibold text-white"
              >
                {{ DateRange(item.start, item.end) }}
              </div>
              <div class="absolute bottom-0 z-10 w-full
                bg-black bg-opacity-75 p-2 pl-4 transition"
              >
                <span class="w-full font-semibold text-white">
                  {{ item.name }} - {{ formatCurrencyFromCent(item.price) }}
                </span>
                <span
                  class="w-full line-clamp-3 text-sm text-white h-0
                  opacity-0 group-hover:h-16 group-hover:opacity-100
                  transform-translate text-left transition-all origin-left"
                  v-html="item.description"
                />
                <div class="mt-2 text-center">
                  <span
                    class="w-full line-clamp-1 text-white font-medium
                    h-0 opacity-0 group-hover:h-6 group-hover:opacity-100
                    text-sm transition-all cursor-pointer"
                    @click="ViewArticle(item.id)"
                  >
                    <span class="duration-300 ease-in-out hover:text-[#5EE738]">
                      See more
                    </span>
                    <span
                      class="inline-block transition-transform transform"
                    >
                      <i class="ri-arrow-right-s-line align-middle"></i>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </article>
          <section
            v-if="filteredWeekly.length === 0"
            class="col-span-1 flex h-60 items-center
            justify-center font-semibold
            text-[#555555] md:col-span-3"
            >
            No   Competitions Available
          </section>
        </span>
        <span
          v-if="activeTab == 'tournament'"
          class="col-span-1 p-4 text-white"
          data-aos="fade-up"
          data-aos-offset="0"
        >
        <article
          class="grid w-full grid-cols-1
          gap-4 pt-2 md:grid-cols-2 lg:grid-cols-3"
          >
            <div
              v-for="(item, index) in filteredTournament"
              :key="item.id"
              class="relative shrink-0 snap-center rounded bg-[#212121]
              backdrop-blur border-double border-[#4cbe5c] border-2 group"
              data-aos="zoom-in"
              data-aos-once="true"
              :data-aos-delay="`${index}00`"
            >
              <img
                class="z-0 h-full w-full object-cover transition"
                :src="getMediaURL(item.media[0], 'temp')"
                alt="Series Image"
              />
              <div class="absolute top-0 right-0 z-10 rounded-bl-xl
                bg-black p-2 pl-4 font-semibold text-white"
              >
                {{ DateRange(item.start, item.end) }}
              </div>
              <div class="absolute bottom-0 z-10 w-full
                bg-black bg-opacity-75 p-2 pl-4 transition"
              >
                <span class="w-full font-semibold text-white">
                  {{ item.name }} - {{ formatCurrencyFromCent(item.price) }}
                </span>
                <span
                  class="w-full line-clamp-3 text-sm text-white h-0
                  opacity-0 group-hover:h-16 group-hover:opacity-100
                  transform-translate text-left transition-all origin-left"
                  v-html="item.description"
                />
                <div class="mt-2 text-center">
                  <span
                    class="w-full line-clamp-1 text-white font-medium
                    h-0 opacity-0 group-hover:h-6 group-hover:opacity-100
                    text-sm transition-all cursor-pointer"
                    @click="ViewArticle(item.id)"
                  >
                    <span class="duration-300 ease-in-out hover:text-[#5EE738]">
                      See more
                    </span>
                    <span
                      class="inline-block transition-transform transform"
                    >
                      <i class="ri-arrow-right-s-line align-middle"></i>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </article>
          <section
            v-if="filteredTournament.length === 0"
            class="col-span-1 flex h-60 items-center
            justify-center font-semibold
            text-[#555555] md:col-span-3"
            >
            No Tournaments Available
          </section>
        </span>
        <span
          v-if="activeTab == 'coast'"
          class="col-span-1 p-4 text-white"
          data-aos="fade-up"
          data-aos-offset="0"
        >
          <article
          class="grid w-full grid-cols-1
          gap-4 pt-2 md:grid-cols-2 lg:grid-cols-3"
          >
            <div
              v-for="(item, index) in filteredCentral"
              :key="item.id"
              class="relative shrink-0 snap-center rounded bg-[#212121]
              backdrop-blur border-double border-[#4cbe5c] border-2 group"
              data-aos="zoom-in"
              data-aos-once="true"
              :data-aos-delay="`${index}00`"
            >
              <img
                class="z-0 h-full w-full object-cover transition"
                :src="getMediaURL(item.media[0], 'temp')"
                alt="Series Image"
              />
              <div class="absolute top-0 right-0 z-10 rounded-bl-xl
                bg-black p-2 pl-4 font-semibold text-white"
              >
                {{ DateRange(item.start, item.end) }}
              </div>
              <div class="absolute bottom-0 z-10 w-full
                bg-black bg-opacity-75 p-2 pl-4 transition"
              >
                <span class="w-full font-semibold text-white">
                  {{ item.name }} - {{ formatCurrencyFromCent(item.price) }}
                </span>
                <span
                  class="w-full line-clamp-3 text-sm text-white h-0
                  opacity-0 group-hover:h-16 group-hover:opacity-100
                  transform-translate text-left transition-all origin-left"
                  v-html="item.description"
                />
                <div class="mt-2 text-center">
                  <span
                    class="w-full line-clamp-1 text-white font-medium
                    h-0 opacity-0 group-hover:h-6 group-hover:opacity-100
                    text-sm transition-all cursor-pointer"
                    @click="ViewArticle(item.id)"
                  >
                    <span class="duration-300 ease-in-out hover:text-[#5EE738]">
                      See more
                    </span>
                    <span
                      class="inline-block transition-transform transform"
                    >
                      <i class="ri-arrow-right-s-line align-middle"></i>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </article>
          <section
            v-if="filteredCentral.length === 0"
            class="col-span-1 flex h-60 items-center
            justify-center font-semibold
            text-[#555555] md:col-span-3"
            >
            No Central Coast Available
          </section>
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import debounce from 'lodash/debounce';
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
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
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
      dateFilter: null,
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
  created() {
    this.retrieveSeries();
  },
  watch: {
    query() {
      this.debouncedSearch();
    },
    dateFilter: {
      handler(newDate) {
        this.retrieveSeries();
      },
      immediate: true,
    },
  },
  mounted() {
    this.debouncedSearch = debounce(this.retrieveSeries, 800);
    this.retrieveSeries();
    this.page = 1
  },
  methods: {
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
    ViewArticle(id) {
      this.$router.push(`/tournament-article/?id=${id}`);
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
  }
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
</style>

