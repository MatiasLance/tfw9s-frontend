<template>
  <div>
    <div class="mx-auto max-w-screen-xl pb-7">
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
                @click="setActiveTab(tab.value)"
              >
                {{ tab.label }}
              </button>
            </div>
          </VueSlickCarousel>
          <div v-if="activeTab === 'regions'">
            <Regions />
          </div>
          <div v-if="activeTab === 'fields'">
            <Fields />
          </div>
          <div v-if="activeTab === 'ages'">
            <Ages />
          </div>
          <div v-if="activeTab === 'teams'">
            <Teams />
          </div>
          <div v-if="activeTab === 'fixings'">
            <Fixings />
          </div>
          <div v-if="activeTab === 'results'">
            <Results />
          </div>
          <div v-if="activeTab === 'ladders'">
            <Ladders />
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
import Ages from '~/components/admin/Ages.vue';
import Teams from '~/components/admin/Teams.vue';
import Fixings from '~/components/admin/Fixings.vue';
import Results from '~/components/admin/Results.vue';
import Ladders from '~/components/admin/Ladders.vue';
export default {
  name: 'parts-list',
  components: {
    VueSlickCarousel,
    Regions,
    Fields,
    Ages,
    Teams,
    Fixings,
    Results,
    Ladders,
  },
  data() {
    return {
      trainers: [],
      fights: [],
      venues: [],
      fighters: [],
      categories: [],
      events: [],
      promoters: [],
      eventList: [],
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
              arrows: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              initialSlide: 0,
              infinite: true,
              arrows: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
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
      activeTab: 'regions',
      tabs: [
        { value: 'regions', label: 'Regions' },
        { value: 'fields', label: 'Fields' },
        { value: 'ages', label: 'Ages' },
        { value: 'teams', label: 'Teams' },
        { value: 'fixings', label: 'Fixings' },
        { value: 'results', label: 'Results' },
        { value: 'ladders', label: 'Ladders' }
      ],
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
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
