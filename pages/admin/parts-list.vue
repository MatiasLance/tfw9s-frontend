<template>
  <!-- min-h-screen added temporarily to avoid glitching when changing tabs -->
  <div>
    <div class="mx-auto max-w-screen-xl">
      <div class="flex flex-wrap">
        <main class="w-full">
          <VueSlickCarousel
            v-bind="slickSettings"
            draggable
            focusOnSelect
            >
            <div
              v-for="tab in tabs"
              :key="tab.value" class="px-2"
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
                :class="(activeTab == tab.value)
                ? `from-40% via-95% to-100%
                    bg-gradient-to-br
                    from-[#5EE738]
                    via-[#3e872a]
                    to-[#050505]
                    text-white`
                :
                'bg-[#212121] text-[#555555]'"
                data-aos="flip-right"
                data-aos-offset="0"
                @click="setActiveTab(tab.value)"
              >
                {{ tab.label }}
              </button>
            </div>
          </VueSlickCarousel>
          <div v-if="activeTab === 'regions'">
            <Regions
            :getRegions="retrieveRegions"
            />
          </div>
          <div v-if="activeTab === 'fields'">
            <Fields
            :RegionList="RegionList"
            :getFields="retrieveFields"
            />
          </div>
          <div v-if="activeTab === 'ages'">
            <AgeGroup
            :getAgeGroups="retrieveAgeGroups"
            />
          </div>
          <div v-if="activeTab === 'teams'">
            <Teams
            :FieldList="FieldList"
            :AgeGroupList="AgeGroupList"
            :getTeams="retrieveTeams"
            />
          </div>
          <div v-if="activeTab === 'managers'">
            <Managers
            :getManagers="retrieveManagers"
            />
          </div>
          <div v-if="activeTab === 'fixings'">
            <Fixings
            :ManagerList="ManagerList"
            :RegionList="RegionList"
            :FieldList="FieldList"
            :AgeGroupList="AgeGroupList"
            :TeamList="TeamList"
            :SeriesList="SeriesList"
            :getEvents="retrieveEvents"
            />
          </div>
          <div v-if="activeTab === 'results'">
            <Results
            :Matches="MatchList"
            :getEvents="retrieveEvents"
            />
          </div>
          <div v-if="activeTab === 'ladders'">
            <Ladders
            :TeamList="TeamList"
            :EventList="EventList"
            />
          </div>
          <div v-if="activeTab === 'series'">
            <Series
            :TeamList="TeamList"
            :EventList="EventList"
            :AgeGroupList="AgeGroupList"
            :getSeries="retrieveSeries"
            />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/max-len */
/* eslint-disable max-len */
/* eslint-disable multiline-comment-style */
import 'remixicon/fonts/remixicon.css';
import 'vue-croppa/dist/vue-croppa.css';
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import VueSlickCarousel from 'vue-slick-carousel'
import Regions from '~/components/admin/Regions.vue';
import Fields from '~/components/admin/Fields.vue';
import AgeGroup from '~/components/admin/AgeGroup.vue';
import Teams from '~/components/admin/Teams.vue';
import Managers from '~/components/admin/Managers.vue';
import Fixings from '~/components/admin/Fixings.vue';
import Results from '~/components/admin/Results.vue';
import Ladders from '~/components/admin/Ladders.vue';
import Series from '~/components/admin/Series.vue';
export default {
  name: 'parts-list',
  components: {
    VueSlickCarousel,
    Regions,
    Fields,
    AgeGroup,
    Teams,
    Managers,
    Fixings,
    Results,
    Ladders,
    Series,
  },
  data() {
    return {
      RegionList: [],
      FieldList: [],
      AgeGroupList: [],
      ManagerList: [],
      TeamList: [],
      SeriesList: [],
      EventList: [],
      MatchList: [],
      totalEvents: [],
      totalPages: 0,
      from: 0,
      to: 0,
      isEventsLoading: false,
      slickSettings: {
        arrows: false,
        slidesToShow: 8,
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              initialSlide: 0,
              infinite: true,
              arrows: false
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              initialSlide: 0,
              infinite: true,
              arrows: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 0,
              infinite: true,
              arrows: false
            }
          },
          {
            breakpoint: 370,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 0,
              infinite: true,
              arrows: false
            }
          }
        ],
      },
      activeTab: 'regions',
      tabs: [
        { value: 'regions', label: 'Regions' },
        { value: 'fields', label: 'Fields' },
        { value: 'ages', label: 'Ages' },
        { value: 'teams', label: 'Teams' },
        { value: 'managers', label: 'TFW Staffs' },
        { value: 'series', label: 'Series' },
        { value: 'fixings', label: 'Fixings' },
        { value: 'results', label: 'Results' },
      ],
    };
  },
  created() {
    this.retrieveRegions()
    this.retrieveFields()
    this.retrieveAgeGroups()
    this.retrieveManagers()
    this.retrieveTeams()
    this.retrieveSeries()
    this.retrieveEvents()
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    retrieveRegions() {
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
        .$get(`v1/regions/all?${queryString}`)
        .then((response) => {
          this.RegionList = response.data.regions;
        })
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
        .$get(`v1/fields/all?${queryString}`)
        .then((response) => {
          this.FieldList= response.data.fields;
        })
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
    retrieveManagers() {
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
        .$get(`v1/managers?${queryString}`)
        .then((response) => {
          this.ManagerList = response.data.managers;
        })
    },
    retrieveTeams() {
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
        .$get(`v1/teams/all?${queryString}`)
        .then((response) => {
          this.TeamList = response.data.teams;
        })
    },
    retrieveSeries() {
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
        .$get(`v1/series?${queryString}`)
        .then((response) => {
          this.SeriesList = response.data.series;
        })
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
        .$get(`v1/events/all?${queryString}`)
        .then((response) => {
          this.EventList = response.data.events.map(event => {
            return {
              ...event,
              eventmatch: event.eventmatch.map(match => {
                return {
                  ...match,
                  date: event.event_date,
                  submit: match.submitted === 1
                };
              })
            };
          });
          this.MatchList = this.EventList.flatMap(data => {
            return data.eventmatch;
          });
        })
    },
  },
};
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
</style>
