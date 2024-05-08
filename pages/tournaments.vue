<template>
  <div class="min-h-screen w-screen bg-[#1A1A1B]">
    <section class="relative mx-auto max-w-screen-xl gap-4 p-7">
      <div v-if="!SeriesList" class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div class="col-span-1 lg:col-span-2">
          <span class="rounded-md bg-[#4cbe5c] px-4 py-2 font-semibold">
            Weekly Competitions
          </span>
        <article
        class="relative flex flex-row w-full snap-x gap-6
        overflow-y-hidden overflow-x-scroll pt-2"
        >
          <div
          v-for="(item, index) in filteredWeekly" :key="item.id"
          class="relative h-[282px] w-[500px] shrink-0 snap-center
          overflow-hidden rounded bg-[#212121] backdrop-blur border-double
          border-[#4cbe5c] border-2  group"
          data-aos="zoom-in"
          data-aos-once="true"
          :data-aos-delay="`${index}00`"
          >

          <img
          class="absolute z-0 h-full w-full object-cover
          group-hover:scale-125 transition"
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
            <span class="w-full font-semibold text-white">{{ item.name }}</span>
            <span
            class="w-full line-clamp-3 text-sm text-white h-0
            opacity-0 group-hover:h-16 group-hover:opacity-100
            transform-translate text-left transition-all origin-left"
            v-html="item.description"
            />
            <span
            class="w-full line-clamp-1 text-white h-0 font-medium
            opacity-100 group-hover:h-6 group-hover:opacity-100 text-sm
            transform-translate text-center transition-all origin-left"
            @click="ViewArticle(item.id)"
            >See more</span>
          </div>
          </div>
        </article>
        </div>
      </div>
      <div v-if="!SeriesList"
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <article
        v-for="(item, index) in filteredWeekly" :key="item.id"
        class="relative col-span-1 shrink-0 snap-center
        overflow-hidden rounded bg-[#212121] backdrop-blur border-double
        border-[#4cbe5c] border-2  group"
        data-aos="zoom-in"
        data-aos-once="true"
        :data-aos-delay="`${index}00`"
        >

        <img
        class="absolute z-0 h-full w-full object-cover
        group-hover:scale-125 transition"
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
          <span class="w-full font-semibold text-white">{{ item.name }}</span>
          <span
          class="w-full line-clamp-3 text-sm text-white h-0
          opacity-0 group-hover:h-16 group-hover:opacity-100
          transform-translate text-left transition-all origin-left"
          v-html="item.description"
          />
          <span
          class="w-full line-clamp-1 text-white h-0 font-medium
          opacity-100 group-hover:h-6 group-hover:opacity-100 text-sm
          transform-translate text-center transition-all origin-left"
          @click="ViewArticle(item.id)"
          >See more</span>
        </div>
        </article>
      </div>
      <div v-if="!SeriesList"
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
        v-for="(item, index) in SeriesList" :key="item.id"
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
          <span class="w-full text-xs font-medium text-white opacity-75">
            {{ DateRange(item.start, item.end) }}
          </span>
        </div>
        <div class="flex w-1/6 items-center justify-center">
          <span
          class="rounded-md bg-[#212121] px-2 text-3xl
          text-white transition hover:brightness-125"
          @click="ViewArticle(item.id)"
          >
            <i class="ri-arrow-right-line"/>
          </span>
        </div>
        </div>
      </div>
      </div>
      <div class="py-4">
        <span class="rounded-md bg-[#4cbe5c] px-4 py-2 font-semibold">
          Weekly Competitions
        </span>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
        v-for="(item, index) in filteredWeekly" :key="item.id"
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
          <span class="w-full text-xs font-medium text-white opacity-75">
            {{ DateRange(item.start, item.end) }}
          </span>
        </div>
        <div class="flex w-1/6 items-center justify-center">
          <span
          class="rounded-md bg-[#212121] px-2 text-3xl
          text-white transition hover:brightness-125"
          @click="ViewArticle(item.id)"
          >
            <i class="ri-arrow-right-line"/>
          </span>
        </div>
        </div>
      </div>
      </div>
      <div class="py-4">
        <span class="rounded-md bg-[#ff9933] px-4 py-2 font-semibold">
          Tournaments
        </span>
      </div>
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
          <span class="w-full text-xs font-medium text-white opacity-75">
            {{ DateRange(item.start, item.end) }}
          </span>
        </div>
        <div class="flex w-1/6 items-center justify-center">
          <span
          class="rounded-md bg-[#212121] px-2 text-3xl
          text-white transition hover:brightness-125"
          @click="ViewArticle(item.id)"
          >
            <i class="ri-arrow-right-line"/>
          </span>
        </div>
        </div>
      </div>
      </div>
      <div class="py-4">
        <span class="rounded-md bg-[#3366ff] px-4 py-2 font-semibold">
          Central Cost
        </span>
      </div>
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
          <span class="w-full text-xs font-medium text-white opacity-75">
            {{ DateRange(item.start, item.end) }}
          </span>
        </div>
        <div class="flex w-1/6 items-center justify-center">
          <span
          class="rounded-md bg-[#212121] px-2 text-3xl
          text-white transition hover:brightness-125"
          @click="ViewArticle(item.id)"
          >
            <i class="ri-arrow-right-line"/>
          </span>
        </div>
        </div>
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
      SeriesList: [],
    }
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
    // eslint-disable-next-line camelcase
    retrieveSeries() {
      const query = {
        q: this.query,
        sort: 'start_date',
        page: this.page,
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
}
</script>

<style scoped>
.v-label.theme--light {
  color: black
}
article{
  aspect-ratio: 16 / 9
}
img{
  aspect-ratio: 16 / 9
}
</style>
