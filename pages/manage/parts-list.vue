<template>
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
                ? `
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
          <div v-if="activeTab === 'results'">
            <Results
            :manager="current_manager"
            :FieldList="FieldList"
            :Matches="MatchList"
            :getEvents="retrieveEvents"
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
import Results from '~/components/manage/Results.vue';
export default {
  name: 'parts-list',
  components: {
    VueSlickCarousel,
    Results,
  },
  data() {
    return {
      // eslint-disable-next-line camelcase
      current_manager: [],
      FieldList: [],
      EventList: [],
      MatchList: [],
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
      activeTab: 'results',
      tabs: [ { value: 'results', label: 'Results' } ],
    };
  },
  created() {
    this.getCurrentManager()
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    getCurrentManager() {
      const query = { user: this.$store.state.auth.user.id };

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/managers?${queryString}`)
        .then((response) => {
          // eslint-disable-next-line camelcase
          this.current_manager = response.data.managers;
        })
        .finally(() => {
          this.retrieveFields()
          this.retrieveEvents()
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
    },
    retrieveEvents() {
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        manager: this.current_manager[0]?.id ?? null
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
