<!-- eslint-disable max-len -->
<template>
  <div class="h-full  bg-[#1A1A1B]">
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
          News
        </h1>
      </div>
    </BaseHeader>

    <div class="mx-auto max-w-screen-xl px-4 py-7">
      <div class="-mx-4 flex flex-wrap">
        <main class="w-full px-4">
          <div class="my-6 flex flex-wrap items-center justify-end gap-4">
            <div class="w-full sm:w-80">
            <form @submit.prevent="retrieveNews">
              <SearchBar v-model="query" />
            </form>
          </div>
          </div>
        </main>
      </div>

      <section class="mb-8" data-aos="fade-up">
        <div
          class="
            flex flex-wrap items-center justify-around
            gap-x-2
            md:justify-between
          "
        >
          <span class="flex items-center">
            <p class="text-base leading-[2.5em] text-white">
              Showing {{ from }}-{{ to }} of {{ totalItems }} results
            </p>
          </span>
          <BasePagination
            :active-page="page"
            :total-pages="totalPages"
            @change="setPage"
          />
        </div>
      </section>
      <article class="mx-auto max-w-screen-xl gap-4">
          <div class="grid grid-cols-1 gap-4">
            <div
            v-for="(news, index) in newsList"
            :key="index" class="group col-span-1 bg-[#212121]"
            data-aos="fade-up"
          >
            <div
              class="
              grid grid-cols-1
              gap-4 md:grid-cols-6
              lg:grid-cols-6"
            >
              <div
                class="
                col-span-1 p-4 md:col-span-3
                lg:col-span-4 lg:p-8"
              >
                <h3
                  class="
                  grid text-2xl font-semibold
                  text-white sm:grid-cols-1"
                >
                  {{ news.headline }}
                </h3>

                <p class="text-sm text-brand-slate">
                  {{ formattedDate(news.updated_at) }}
                </p>

                <p
                  class="my-4 text-white line-clamp-3"
                  v-html="news.content"
                ></p>

                <div
                  class="mt-8 flex flex-wrap justify-start gap-2"
                  >
                  <NuxtLink :to="'/news-article/?id='+ news.id">
                    <BaseButton
                    class="from-40% via-95% to-100%
                    max-w-full rounded-lg
                    bg-gradient-to-tr
                    from-[#5EE738]
                    via-[#3e872a]
                    to-[#050505]
                    py-4
                    px-8
                    uppercase
                    text-white"
                    >
                    READ MORE
                    </BaseButton>
                  </NuxtLink>
                </div>
              </div>
              <div
                class="col-span-1 overflow-hidden
                md:col-span-3 lg:col-span-2"
              >
                <img
                  :src="getMediaURL(news.media[0], 'news')"
                  alt="Product Image"
                  class="h-64 w-full object-cover transition-all
                    group-hover:scale-110"
                  >
              </div>
            </div>
          </div>y
          </div>
      </article>
    </div>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import 'vue-croppa/dist/vue-croppa.css';
import logout from '~/mixins/auth/logout';
import handlesMedia from '~/mixins/shop/handlesMedia'
import BasePagination from '~/components/base/BasePagination';
import SearchBar from '~/components/SearchBar'
import aosMixin from '@/mixins/aos';

export default {
  buildModules: [ '@nuxtjs/moment' ],
  components: {
    BasePagination,
    SearchBar,
  },
  mixins: [
    aosMixin,
    logout,
    handlesMedia
  ],
  data() {
    return {
      query: '',
      rules: [ value => !!value || 'Required' ],
      news: {
        headline: '',
        lead: '',
        content: '',
      },
      newsList: [],
      from: 0,
      to: 0,
      page: 1,
      perPage: 12,
      totalPages: 0,
      totalItems: 0,
      showThumbnail: false,
      isNewsLoading: false,
      isNewsAdded: false,
    };
  },
  watch: {
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
  },
  mounted() {
    this.retrieveNews();
    this.page = 1 // Reset pagination
  },
  methods: {
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
    retrieveNews() {
      this.isNewsLoading = true;

      const query = {
        q: this.query,
        page: this.page,
        maxNewsPerPage: 12,
      };

      // Sanitize and remove null values
      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })
      const queryString = new URLSearchParams(query).toString()
      this.$axios
        .$get(`v1/news?${queryString}`)
        .then((response) => {
          this.newsList = response.data.news
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          this.isNewsLoading = false;
        });
    },
    setPage(page) {
      this.page = page
      this.retrieveNews()
    },
  },
};

</script>

<style scoped>
.croppa-container {
background-color: #abb8c3;
border: 3px solid #1C1B1C;
}
.o-inputit__item--danger {
background-color: #e73538 !important;
}

.part-item__actions [class^="ri-"] {
padding-right: 0.25rem;
}

::v-deep .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
> .v-input__control > .v-input__slot {
box-shadow: none;
border: 1px rgb(243 244 246 / var(--tw-border-opacity));
background-color: rgb(243 244 246 / var(--tw-bg-opacity));
padding: 0.5rem 0.75rem;
width: 100%;
appearance: none;
border-radius: 0;
transition: border-color 0.3s;
}

::v-deep .v-text-field input::placeholder {
font-size: 1rem !important;
font-family: inherit !important;
color: rgb(104, 104, 104) !important;
}

.custom-btn {
height: 50px !important;
}
</style>
