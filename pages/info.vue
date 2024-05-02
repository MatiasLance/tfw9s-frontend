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
          Info
        </h1>
      </div>
    </BaseHeader>
    <section class="mx-auto max-w-screen-xl gap-4 p-6">
      <div class="grid grid-cols-1 gap-4">
        <span class="col-cpan-1">
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
        v-if="activeTab == 'code'"
        class="col-cpan-1 p-4 text-white"
        data-aos="fade-up"
        data-aos-offset="0"
        >
          <div
              v-for="statement in filteredCode"
              :key="statement.id"
              >
              <span class="info" v-html="statement.content"/>
          </div>
        </span>
        <span
        v-if="activeTab == 'rules'"
        class="col-cpan-1 p-4 text-white"
        data-aos="fade-up"
        data-aos-offset="0"
        >
          <div
              v-for="statement in filteredRules"
              :key="statement.id"
              >
              <span class="info" v-html="statement.content"/>
          </div>
        </span>
        <span
        v-if="activeTab == 'insurance'"
        class="col-cpan-1 p-4 text-white"
        data-aos="fade-up"
        data-aos-offset="0"
        >
          <div
              v-for="statement in filteredInsurance"
              :key="statement.id"
              >
              <span class="info" v-html="statement.content"/>
          </div>
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
export default {
  components: { VueSlickCarousel },
  data() {
    return {
      pageSEO: {
        title: 'Info - TFW Rugby League',
        description: ''
      },
      activeTab: 'code',
      tabs: [
        { name: 'code', Label: 'Code of Conduct' },
        { name: 'rules', Label: 'Rules' },
        { name: 'insurance', Label: 'Insurance' },
      ],
      ContentList: [],
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
    setTab(tab) {
      this.activeTab = tab;
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
