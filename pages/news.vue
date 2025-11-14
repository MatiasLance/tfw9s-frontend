<!-- eslint-disable max-len -->
<template>
  <div class="min-h-screen bg-[#1A1A1B]">
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
          🏉 News
        </h1>
      </div>
    </BaseHeader>

    <div class="mx-auto max-w-screen-2xl px-4 py-8">
      <!-- Header Section -->
      <div class="mb-12 text-center" data-aos="zoom-in">
        <div class="inline-flex items-center gap-4 mb-6">
          <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-3 
                      shadow-lg animate-pulse">
            <i class="ri-newspaper-fill text-gray-50 text-2xl"></i>
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 
                    to-gray-100 bg-clip-text text-transparent">
            Rugby News & Updates
          </h1>
        </div>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          Stay updated with the latest from our rugby community
        </p>
        
        <!-- Search Bar -->
        <div class="max-w-md mx-auto">
          <form @submit.prevent="retrieveNews">
            <SearchBar v-model="query" />
          </form>
        </div>
      </div>

      <!-- Results Info -->
      <section v-if="totalPages > 0" class="mb-8" data-aos="zoom-in">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-gray-300">
              Showing <span class="font-bold text-green-400">{{ from }}-{{ to }}</span>
              of <span class="font-bold text-green-400">{{ totalItems }}</span> articles
            </span>
          </div>
          <BasePagination
            :active-page="page"
            :total-pages="totalPages"
            @change="setPage"
          />
        </div>
      </section>

      <!-- Empty State -->
      <section
        v-if="totalPages === 0"
        class="flex h-80 items-center justify-center rounded-3xl 
              bg-gradient-to-br from-gray-800 to-gray-900 
              border-2 border-dashed border-green-500/30"
        data-aos="zoom-in"
      >
        <div class="text-center">
          <i class="ri-article-line text-6xl text-green-500/40 mb-4"></i>
          <h3 class="text-2xl font-bold text-gray-300 mb-2">
            No Articles Found
          </h3>
          <p class="text-gray-400">
            Try adjusting your search terms
          </p>
        </div>
      </section>

      <!-- News Grid -->
      <article class="gap-8" data-aos="zoom-in">
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <div
            v-for="news in newsList"
            :key="news.id" 
            class="group rugby-news-card bg-gradient-to-br from-gray-800 to-gray-900 
                  rounded-3xl border border-green-500/20 shadow-2xl 
                  hover:shadow-3xl transition-all duration-700 
                  hover:border-green-400/50 overflow-hidden 
                  flex flex-col h-full"
          >
            <!-- Full Image Section -->
            <div class="relative overflow-hidden">
              <div class="aspect-w-16 aspect-h-9 h-64">
                <img
                  :src="getMediaURL(news.media[0], 'news')"
                  :alt="news.headline"
                  class="absolute inset-0 w-full h-full object-cover 
                        transition-transform duration-1000 
                        group-hover:scale-110"
                />
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 
                            via-transparent to-transparent"></div>
                
                <!-- Category Tag -->
                <div class="absolute top-4 right-4">
                  <span class="bg-green-600 text-gray-50 px-3 py-1 
                              rounded-full text-xs font-semibold uppercase 
                              tracking-wide">
                    News
                  </span>
                </div>
              </div>
            </div>

            <!-- Content Section -->
            <div class="flex-1 p-6 lg:p-8 flex flex-col">
              <!-- Date - Now Visible Below Image -->
              <div class="mb-4 flex items-center gap-2">
                <div class="bg-green-600/20 rounded-lg p-2">
                  <i class="ri-calendar-2-line text-green-400 text-lg"></i>
                </div>
                <span class="text-green-400 font-semibold text-lg">
                  {{ formattedDate(news.updated_at) }}
                </span>
              </div>

              <!-- Headline -->
              <h3 class="text-2xl lg:text-3xl font-bold text-gray-100 mb-4 
                        group-hover:text-green-400 transition-colors 
                        duration-500 line-clamp-2 leading-tight">
                {{ news.headline }}
              </h3>

              <!-- Excerpt -->
              <div class="flex-1 mb-6">
                <p 
                  class="text-gray-300 leading-relaxed line-clamp-3 
                        text-lg group-hover:text-gray-200 transition-colors 
                        duration-300"
                  v-html="news.content"
                ></p>
              </div>

              <!-- Action Button -->
              <div class="mt-auto">
                <NuxtLink :to="'/news-article/?id='+ news.id">
                  <button
                    type="button"
                    class="w-full bg-gradient-to-r from-green-600 to-green-700 
                          hover:from-green-700 hover:to-green-800 text-gray-50 
                          font-bold py-4 px-6 rounded-xl transition-all 
                          duration-500 transform hover:scale-105 
                          flex items-center justify-center gap-3 
                          group/btn shadow-lg hover:shadow-xl"
                  >
                    <span>Read Full Story</span>
                    <i class="ri-arrow-right-line transition-transform 
                              duration-300 group-hover/btn:translate-x-1"></i>
                  </button>
                </NuxtLink>
              </div>
            </div>

            <!-- Hover Effect Border -->
            <div class="absolute inset-0 rounded-3xl border-2 border-transparent 
                        bg-gradient-to-r from-green-500/0 via-green-400/0 to-green-500/0 
                        bg-[length:200%_100%] group-hover:bg-[length:100%_100%] 
                        transition-all duration-1000 -z-10 opacity-0 
                        group-hover:opacity-100">
            </div>
          </div>
        </div>
      </article>

      <!-- Bottom Pagination -->
      <section v-if="totalPages > 0" class="mt-16" data-aos="zoom-in">
        <div class="flex justify-center">
          <BasePagination
            :active-page="page"
            :total-pages="totalPages"
            @change="setPage"
          />
        </div>
      </section>
    </div>
    <LoadingAnimationVue
    :is-loading="isNewsLoading"
    loading-title="News"
    />
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import 'vue-croppa/dist/vue-croppa.css';
import debounce from 'lodash/debounce';
import logout from '~/mixins/auth/logout';
import handlesMedia from '~/mixins/shop/handlesMedia'
import aosMixin from '@/mixins/aos';
import BasePagination from '~/components/base/BasePagination';
import SearchBar from '~/components/SearchBar'
import LoadingAnimationVue from '~/components/loading/LoadingAnimation.vue';

export default {
  buildModules: [ '@nuxtjs/moment' ],
  components: {
    BasePagination,
    SearchBar,
    LoadingAnimationVue
  },
  mixins: [
    aosMixin,
    logout,
    handlesMedia
  ],
  data() {
    return {
      query: null,
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
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
      showThumbnail: false,
      isNewsLoading: false,
      isNewsAdded: false,
    };
  },
  watch: {
    query() {
      this.debouncedSearch();
    },
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
  },
  mounted() {
    this.debouncedSearch = debounce(this.retrieveNews, 800);
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
        maxNewsPerPage: 10,
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
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.aspect-w-16 {
  position: relative;
}

.aspect-w-16::before {
  content: '';
  display: block;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.aspect-w-16 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
