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
        <span
        v-if="activeTab == 'weekly'"
        class="col-cpan-1 p-4 text-white"
        data-aos="fade-up"
        data-aos-offset="0"
        >
          <article
            class="grid md:grid-cols-2 grid-cols-1 w-full gap-4 pt-2"
          >
            <div
              v-for="(item, index) in filteredWeekly" :key="item.id"
              class="relative shrink-0 snap-center
              rounded bg-[#212121] backdrop-blur border-double
              border-[#4cbe5c] border-2 group"
              data-aos="zoom-in"
              data-aos-once="true"
              :data-aos-delay="`${index}00`"
            >

            <img
              class="z-0 h-full w-full object-cover
              transition"
              :src="getMediaURL(item.media[0], 'temp')"
              alt="Series Image"
            />

            <div
              class="absolute top-0 right-0 z-10 rounded-bl-xl
              bg-black p-2 pl-4 font-semibold text-white"
            >
              {{ DateRange(item.start, item.end) }}
            </div>

            <div
              class="absolute bottom-0 z-10 w-full bg-black
              bg-opacity-75 p-2 pl-4 transition"
            >
              <span class="w-full font-semibold text-white">
                {{ item.name }}
              </span>
              <span
                class="w-full line-clamp-3 text-sm text-white h-0
                opacity-0 group-hover:h-16 group-hover:opacity-100
                transform-translate text-left transition-all origin-left"
                v-html="item.description"
              />
              <span
                class="w-full line-clamp-1 text-white h-0 font-medium
                opacity-100 group-hover:h-6 group-hover:opacity-100 text-sm
                transform-translate text-center transition-all origin-left
                cursor-pointer"
                @click="ViewArticle(item.id)"
              >See more</span>
            </div>
          </div>
        </article>
        </span>
        <span
          v-if="activeTab == 'tournament'"
          class="col-cpan-1 p-4 text-white"
          data-aos="fade-up"
          data-aos-offset="0"
        >
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="(item, index) in filteredTournament" :key="item.id"
              class="relative col-span-1 overflow-hidden rounded-lg
              bg-[#212121] group p-4"
              data-aos="zoom-in"
              data-aos-once="true"
              :data-aos-delay="`${index}00`"
            >

              <article class="w-full overflow-hidden rounded-md">
                <img
                  class=" w-full object-cover group-hover:scale-125 transition"
                  :src="getMediaURL(item.media[0], 'temp')"
                  alt="Series Image"
                />
              </article>
              <div class="w-full flex flex-row pt-4">
                <div class="flex w-5/6 flex-col px-2">
                  <span class="w-full font-semibold text-white line-clamp-1">
                    {{ item.name }}
                  </span>
                  <span
                    class="w-full text-xs font-medium
                    text-white opacity-75"
                  >
                    {{ DateRange(item.start, item.end) }}
                  </span>
                </div>
                <div class="flex w-1/6 items-center justify-center">
                  <span
                    class="rounded-md bg-[#212121] px-2 text-3xl
                    text-white transition hover:brightness-125
                    cursor-pointer"
                    @click="ViewArticle(item.id)"
                  >
                    <i class="ri-arrow-right-line"/>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </span>
        <span
        v-if="activeTab == 'coast'"
        class="col-cpan-1 p-4 text-white"
        data-aos="fade-up"
        data-aos-offset="0"
        >
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="(item, index) in filteredCentral" :key="item.id"
              class="relative col-span-1 overflow-hidden rounded-lg
              bg-[#212121] group p-4"
              data-aos="zoom-in"
              data-aos-once="true"
              :data-aos-delay="`${index}00`"
            >

              <article class="w-full overflow-hidden rounded-md">
                <img
                  class=" w-full object-cover group-hover:scale-125 transition"
                  :src="getMediaURL(item.media[0], 'temp')"
                  alt="Series Image"
                />
              </article>
              <div class="w-full flex flex-row pt-4">
                <div class="flex w-5/6 flex-col px-2">
                  <span class="w-full font-semibold text-white line-clamp-1">
                    {{ item.name }}
                  </span>
                  <span
                    class="w-full text-xs font-medium
                    text-white opacity-75"
                  >
                    {{ DateRange(item.start, item.end) }}
                  </span>
                </div>
                <div class="flex w-1/6 items-center justify-center">
                  <span
                    class="rounded-md bg-[#212121] px-2 text-3xl
                    text-white transition hover:brightness-125
                    cursor-pointer"
                    @click="ViewArticle(item.id)"
                  >
                    <i class="ri-arrow-right-line"/>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import handlesMedia from '~/mixins/shop/handlesMedia';

export default {
  components: { VueSlickCarousel },
  mixins: [ handlesMedia ],
  data() {
    return {
      pageSEO: {
        title: 'Registration - TFW Rugby League',
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
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              initialSlide: 0,
              infinite: true,
              arrows: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 3,
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
  methods: {
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
      const query = {
        q: this.query,
        sort: 'start_date',
        page: this.page,
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

