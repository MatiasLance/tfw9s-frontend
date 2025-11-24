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
          🏉 Info
        </h1>
      </div>
    </BaseHeader>

    <section class="mx-auto max-w-screen-xl gap-6 py-8 px-4 sm:px-6">
      <!-- Tab Navigation -->
      <div class="mb-8" data-aos="fade-down">
        <div class="relative">
          <!-- Sporty Background Container -->
          <div class="rugby-tab-container bg-gradient-to-br from-gray-800 to-gray-900 
                      rounded-2xl p-2 border border-green-500/20 shadow-2xl">
            <VueSlickCarousel
              v-bind="slickSettings"
              draggable
              focus-on-select
              class="rugby-tab-carousel"
            >
              <div
                v-for="tab in tabs"
                :key="tab.name" 
                class="px-1 sm:px-2"
              >
                <button
                  type="button"
                  class="rugby-tab-btn group relative w-full rounded-xl py-4 px-4 
                        text-center font-bold transition-all duration-500 
                        transform hover:scale-105 min-w-[120px]"
                  :class="(activeTab == tab.name)
                    ? 
                    'bg-gradient-to-r from-green-500 to-green-600 text-gray-50' +
                    'shadow-lg shadow-green-500/25 scale-105'
                    : 
                    'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50' +
                    'hover:text-gray-300 border border-transparent' +
                    'hover:border-green-500/30'"
                  @click="setTab(tab.name)"
                >
                  <!-- Active Tab Indicator -->
                  <div 
                    v-if="activeTab == tab.name"
                    class="absolute -top-1 left-1/2 transform -translate-x-1/2 
                          w-2 h-2 bg-green-400 rounded-full animate-pulse"
                  ></div>
                  
                  <!-- Tab Icon -->
                  <div class="flex items-center justify-center gap-2">
                    <i 
                      :class="getTabIcon(tab.name)" 
                      class="text-lg transition-transform duration-300 
                            group-hover:scale-110"
                    ></i>
                    <span class="text-sm sm:text-base font-semibold tracking-wide">
                      {{ tab.Label }}
                    </span>
                  </div>

                  <!-- Hover Effect -->
                  <div 
                    class="absolute inset-0 rounded-xl bg-gradient-to-r 
                          from-green-500/0 via-green-400/0 to-green-500/0 
                          opacity-0 group-hover:opacity-100 transition-opacity 
                          duration-500 -z-10"
                  ></div>
                </button>
              </div>
            </VueSlickCarousel>
          </div>

          <!-- Decorative Rugby Elements -->
          <div class="absolute -top-2 -left-2 w-4 h-4 bg-green-500 rounded-full 
                      opacity-60 animate-pulse"></div>
          <div class="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full 
                      opacity-40 animate-ping-slow"></div>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="rugby-content-container" data-aos="fade-up" data-aos-offset="50">
        <!-- Code Content -->
        <div
          v-if="activeTab == 'code'"
          class="rugby-tab-content bg-gradient-to-br from-gray-800 to-gray-900 
                rounded-3xl p-6 sm:p-8 border border-green-500/20 
                shadow-2xl backdrop-blur-sm"
        >
          <div class="flex items-center gap-3 mb-6">
            <div class="rugby-content-badge bg-green-600 rounded-xl p-2">
              <i class="ri-file-code-line text-gray-50 text-xl"></i>
            </div>
            <h3 class="text-sm font-bold text-green-400">
              Code of Conduct
            </h3>
          </div>
          <div class="space-y-6">
            <div
              v-for="statement in filteredCode"
              :key="statement.id"
              class="rugby-content-card group bg-gray-700/30 rounded-2xl p-6 
                    border border-gray-600/50 hover:border-green-500/30 
                    transition-all duration-500 hover:shadow-lg cursor-pointer"
            >
              <span 
                class="info text-gray-200 leading-relaxed text-lg 
                      group-hover:text-gray-100 transition-colors duration-300" 
                v-html="statement.content"
              ></span>
            </div>
          </div>
        </div>

        <!-- Rules Content -->
        <div
          v-if="activeTab == 'rules'"
          class="rugby-tab-content bg-gradient-to-br from-gray-800 to-gray-900 
                rounded-3xl p-6 sm:p-8 border border-green-500/20 
                shadow-2xl backdrop-blur-sm"
        >
          <div class="flex items-center gap-3 mb-6">
            <div class="rugby-content-badge bg-green-600 rounded-xl p-2">
              <i class="ri-football-line text-gray-50 text-xl"></i>
            </div>
            <h3 class="text-xl font-bold text-green-400">
              Game Rules
            </h3>
          </div>
          <div class="space-y-6">
            <div
              v-for="statement in filteredRules"
              :key="statement.id"
              class="rugby-content-card group bg-gray-700/30 rounded-2xl p-6 
                    border border-gray-600/50 hover:border-green-500/30 
                    transition-all duration-500 hover:shadow-lg cursor-pointer"
            >
              <span 
                class="info text-gray-200 leading-relaxed text-lg 
                      group-hover:text-gray-100 transition-colors duration-300" 
                v-html="statement.content"
              ></span>
            </div>
          </div>
        </div>

        <!-- Insurance Content -->
        <div
          v-if="activeTab == 'insurance'"
          class="rugby-tab-content bg-gradient-to-br from-gray-800 to-gray-900 
                rounded-3xl p-6 sm:p-8 border border-green-500/20 
                shadow-2xl backdrop-blur-sm"
        >
          <div class="flex items-center gap-3 mb-6">
            <div class="rugby-content-badge bg-green-600 rounded-xl p-2">
              <i class="ri-shield-check-line text-gray-50 text-xl"></i>
            </div>
            <h3 class="text-xl font-bold text-green-400">
              Insurance Coverage
            </h3>
          </div>
          <div class="space-y-6">
            <div
              v-for="statement in filteredInsurance"
              :key="statement.id"
              class="rugby-content-card group bg-gray-700/30 rounded-2xl p-6 
                    border border-gray-600/50 hover:border-green-500/30 
                    transition-all duration-500 hover:shadow-lg cursor-pointer"
            >
              <span 
                class="info text-gray-200 leading-relaxed text-lg 
                      group-hover:text-gray-100 transition-colors duration-300
                      insurance-content"
                v-html="statement.content"
              ></span>
            </div>
          </div>
        </div>

        <!-- FAQ Content -->
        <div 
          v-if="activeTab == 'faq'"
          class="rugby-tab-content bg-gradient-to-br from-gray-800 to-gray-900 
                rounded-3xl border border-green-500/20 shadow-2xl 
                backdrop-blur-sm overflow-hidden"
        >
          <FAQ />
        </div>

        <!-- Team Folder Content -->
        <div 
          v-if="activeTab == 'teamfolder'"
          class="rugby-tab-content bg-gradient-to-br from-gray-800 to-gray-900 
                rounded-3xl border border-green-500/20 shadow-2xl 
                backdrop-blur-sm overflow-hidden"
        >
          <TeamFolder />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import FAQ from '~/components/FAQ'
import TeamFolder from '~/components/TeamFolder'

export default {
  components: {
    VueSlickCarousel,
    FAQ,
    TeamFolder
  },
  data() {
    return {
      pageSEO: {
        title: 'Info - TFW9s',
        description: ''
      },
      activeTab: 'code',
      tabs: [
        { name: 'code', Label: 'Code of Conduct' },
        { name: 'rules', Label: 'Rules' },
        { name: 'insurance', Label: 'Insurance' },
        { name: 'faq', Label: 'FAQ' },
        { name: 'teamfolder', Label: 'Team Folder' },
      ],
      ContentList: [],
      slickSettings: {
        arrows: true,
        slidesToShow: 5,
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              initialSlide: 0,
              infinite: true,
              arrows: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
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
    filteredCode() {
      const type = 'Code_of_conduct';
      return this.ContentList.filter(content =>
        content &&
        content.type &&
        typeof content.type === 'string' &&
        content.type.toLowerCase().includes(type.toLowerCase())
      );
    },
    filteredRules() {
      const type = 'Rules';
      return this.ContentList.filter(content =>
        content &&
        content.type &&
        typeof content.type === 'string' &&
        content.type.toLowerCase().includes(type.toLowerCase())
      );
    },
    filteredInsurance() {
      const type = 'Insurance';
      return this.ContentList.filter(content =>
        content &&
        content.type &&
        typeof content.type === 'string' &&
        content.type.toLowerCase().includes(type.toLowerCase())
      );
    },
  },
  created() {
    this.retrieveGuidelines();
  },
  methods: {
    getTabIcon(tabName) {
      const icons = {
        'code': 'ri-file-code-line',
        'rules': 'ri-football-line',
        'insurance': 'ri-shield-check-line',
        'faq': 'ri-question-line',
        'teamfolder': 'ri-folder-line'
      };
      return icons[tabName] || 'ri-file-text-line';
    },
    setTab(tabName) {
      this.activeTab = tabName;
    },
    retrieveGuidelines() {
      const query = {
        q: this.query,
        isActive: true,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/guidelines?${queryString}`)
        .then((response) => {
          this.ContentList = response.data.guidelines;
        })
    },
  }
};
</script>

<style scoped>
.rugby-tab-carousel {
  margin: 0 -4px;
}

.rugby-tab-btn {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.rugby-tab-btn:hover {
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.15);
}

.rugby-content-card:hover {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
}

.rugby-content-badge {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes ping-slow {
  75%, 100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.animate-ping-slow {
  animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Custom slick carousel styles */
:deep(.slick-list) {
  border-radius: 16px;
}

:deep(.slick-track) {
  display: flex;
  gap: 8px;
}

:deep(.slick-slide) {
  padding: 0 4px;
}

/* Deep selector to penetrate v-html content */
.insurance-content ::v-deep a {
  color: #10b981 !important; /* Your green-400 equivalent */
  text-decoration: none;
  transition: color 0.3s ease;
  border-bottom: 1px solid transparent;
}

.insurance-content ::v-deep a:hover {
  color: #34d399 !important; /* A lighter green for hover */
  border-bottom-color: #34d399;
}

.insurance-content ::v-deep a:visited {
  color: #059669 !important; /* A darker green for visited state */
}
</style>
