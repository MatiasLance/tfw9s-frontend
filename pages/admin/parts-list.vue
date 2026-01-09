<template>
  <div class="mx-auto max-w-full">
    <div class="flex flex-wrap">
    <main class="w-full px-2">

      <!-- Tabs -->
      <section class="px-4 mb-8" data-aos="fade-down">
        <!-- Simple Sporty Tabs Container -->
        <div class="bg-gray-800 text-white rounded-xl p-2 border border-green-500/30 shadow-lg">
            <VueSlickCarousel
            v-bind="slickSettings"
            draggable
            focusOnSelect
            class="tab-carousel"
            >
            <div
                v-for="tab in tabs"
                :key="tab.value" 
                class="px-1"
            >
                <button
                type="button"
                class="w-full rounded-lg py-3 px-4 text-center font-semibold 
                        transition-all duration-300 min-w-[110px] flex items-center 
                        justify-center gap-2"
                :class="activeTab == tab.value
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'"
                @click="setActiveTab(tab.value)"
                >
                <i :class="getTabIcon(tab.value)" class="text-base"></i>
                <span class="text-sm whitespace-nowrap">{{ tab.label }}</span>
                </button>
            </div>

            <!-- Custom Previous Arrow with Remix Icon -->
            <template #prevArrow="arrowOption">
                <div 
                :class="arrowOption.className" 
                class="remix-arrow remix-prev-arrow"
                @click="arrowOption.click"
                >
                <i class="ri-arrow-left-s-line text-green-500 text-xl"></i>
                </div>
            </template>
            
            <!-- Custom Next Arrow with Remix Icon -->
            <template #nextArrow="arrowOption">
                <div 
                :class="arrowOption.className" 
                class="remix-arrow remix-next-arrow"
                @click="arrowOption.click"
                >
                <i class="ri-arrow-right-s-line text-green-500 text-xl"></i>
                </div>
            </template>
            </VueSlickCarousel>
        </div>

        <!-- Simple Active Indicator -->
        <div class="flex justify-center mt-3">
            <div class="flex gap-1">
            <div 
                v-for="tab in tabs" 
                :key="tab.value"
                class="w-2 h-2 rounded-full transition-all duration-300"
                :class="activeTab == tab.value ? 'bg-green-500' : 'bg-gray-600'"
            ></div>
            </div>
        </div>
        </section>

      <!-- Content -->
      <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
      <keep-alive>
        <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
        <component
          :is="activeComponent"
          v-bind="activeProps"
          @refresh="handleRefresh"
        />
      </keep-alive>

    </main>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'

import Regions from '~/components/admin/Regions.vue'
import Fields from '~/components/admin/Fields.vue'
import AgeGroup from '~/components/admin/AgeGroup.vue'
import Players from '~/components/admin/Players.vue'
import Teams from '~/components/admin/Teams.vue'
import Managers from '~/components/admin/Managers.vue'
import Fixings from '~/components/admin/Fixings.vue'
import Results from '~/components/admin/Results.vue'
import Series from '~/components/admin/Series.vue'
import Registered from '~/components/admin/Registered.vue'

export default {
  components: {
    VueSlickCarousel,
    Regions,
    Fields,
    AgeGroup,
    Players,
    Teams,
    Managers,
    Fixings,
    Results,
    Series,
    Registered
  },

  data() {
    return {
      activeTab: 'regions',

      lists: {
        regions: [],
        fields: [],
        ageGroups: [],
        players: [],
        teams: [],
        managers: [],
        series: [],
        events: [],
        matches: []
      },

      slickSettings: {
        arrows: true,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 6
      },

      tabs: [
        { value: 'regions', label: 'Regions' },
        { value: 'fields', label: 'Fields' },
        { value: 'ages', label: 'Ages' },
        { value: 'players', label: 'Players' },
        { value: 'teams', label: 'Teams' },
        { value: 'managers', label: 'Staffs' },
        { value: 'series', label: 'Series' },
        { value: 'fixings', label: 'Fixings' },
        { value: 'results', label: 'Results' },
        { value: 'registered', label: 'Registered' }
      ]
    }
  },

  computed: {
    activeComponent() {
      return {
        regions: Regions,
        fields: Fields,
        ages: AgeGroup,
        players: Players,
        teams: Teams,
        managers: Managers,
        series: Series,
        fixings: Fixings,
        results: Results,
        registered: Registered
      }[this.activeTab]
    },

    activeProps() {
      return {
        regions: this.lists.regions,
        fields: this.lists.fields,
        ageGroups: this.lists.ageGroups,
        players: this.lists.players,
        teams: this.lists.teams,
        managers: this.lists.managers,
        series: this.lists.series,
        events: this.lists.events,
        matches: this.lists.matches
      }
    }
  },

  watch: {
    activeTab: {
      immediate: true,
      handler(tab) {
        const loaders = {
          regions: this.loadRegions,
          fields: this.loadFields,
          ages: this.loadAgeGroups,
          players: this.loadPlayers,
          teams: this.loadTeams,
          managers: this.loadManagers,
          series: this.loadSeries,
          fixings: this.loadEvents,
          results: this.loadEvents,
          registered: this.loadEvents
        }
        
        if (loaders[tab]) {
          loaders[tab]()
        }
      }
    }
  },

  methods: {
    handleRefresh() {
      const tabLoaders = {
        regions: this.loadRegions,
        fields: this.loadFields,
        ages: this.loadAgeGroups,
        players: this.loadPlayers,
        teams: this.loadTeams,
        managers: this.loadManagers,
        series: this.loadSeries,
        fixings: this.loadEvents,
        results: this.loadEvents,
        registered: this.loadEvents
      }

      const loader = tabLoaders[this.activeTab]
      if (loader) {
        loader()
      }
    },

    getTabIcon(tabValue) {
      const icons = {
        'teams': 'ri-team-line',
        'fixtures': 'ri-calendar-event-line',
        'results': 'ri-trophy-line',
        'stats': 'ri-line-chart-line',
        'news': 'ri-newspaper-line',
        'gallery': 'ri-gallery-line',
        'shop': 'ri-shopping-bag-line'
      };
      return icons[tabValue] || 'ri-file-text-line';
    },

    setActiveTab(tab) {
      this.activeTab = tab;
    },

    buildQuery(params) {
      return new URLSearchParams(
        Object.entries(params).filter(([ , v ]) => v != null)
      ).toString()
    },

    async loadRegions() {
      if (this.lists.regions.length) return
      const r = await this.$axios.$get(`v1/regions/all?${this.buildQuery({ sort: 'a_to_z' })}`)
      this.lists.regions = r.data.regions
    },

    async loadFields() {
      if (this.lists.fields.length) return
      const r = await this.$axios.$get(`v1/fields/all`)
      this.lists.fields = r.data.fields
    },

    async loadAgeGroups() {
      if (this.lists.ageGroups.length) return
      const r = await this.$axios.$get(`v1/agegroups`)
      this.lists.ageGroups = r.data.ageGroups
    },

    async loadPlayers() {
      if (this.lists.players.length) return
      const r = await this.$axios.$get(`v1/players`)
      this.lists.players = r.data.players
    },

    async loadTeams() {
      if (this.lists.teams.length) return
      const r = await this.$axios.$get(`v1/teams`)
      this.lists.teams = r.data.teams
    },

    async loadManagers() {
      if (this.lists.managers.length) return
      const r = await this.$axios.$get(`v1/managers`)
      this.lists.managers = r.data.managers
    },

    async loadSeries() {
      if (this.lists.series.length) return
      const r = await this.$axios.$get(`v1/series`)
      this.lists.series = r.data.series
    },

    async loadEvents() {
      if (this.lists.events.length) return
      const r = await this.$axios.$get(`v1/events`)
      this.lists.events = r.data.events
      this.lists.matches = r.data.events.flatMap(e => e.eventmatch)
    }
  }
}
</script>

<style scoped>
.croppa-container {
  background-color: #abb8c3;
  border: 3px solid #1a1d18;
}
.o-inputit__item--danger {
  background-color: #e73538 !important;
}

.part-item__actions [class^="ri-"] {
  padding-right: 0.25rem;
}

.v-icon {
  color: white !important;
}

.tab-carousel {
  margin: 0 -4px;
}

:deep(.slick-list) {
  border-radius: 12px;
}

:deep(.slick-track) {
  display: flex;
  gap: 8px;
}

:deep(.slick-slide) {
  padding: 0 4px;
}

::v-deep .remix-arrow {
  width: 36px;
  height: 36px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  background: #374151 !important; /* gray-700 */
  border: 1px solid #4b5563 !important; /* gray-600 */
  border-radius: 8px;
  z-index: 10;
  transition: all 0.3s ease;
}

::v-deep .remix-arrow:hover {
  background: #4b5563 !important; /* gray-600 */
  border-color: #6b7280 !important; /* gray-500 */
}

::v-deep .remix-arrow:hover i {
  color: #34d399 !important; /* green-400 on hover */
}

::v-deep .remix-arrow::before {
  display: none !important; /* Hide default arrow */
}

/* Position adjustments */
::v-deep .remix-prev-arrow {
  left: -18px !important;
}

::v-deep .remix-next-arrow {
  right: -18px !important;
}
</style>
