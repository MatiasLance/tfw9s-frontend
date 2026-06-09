<template>
  <section class="mx-auto max-w-screen-xl px-4 py-16 lg:px-8 lg:py-24">
    <!-- Header -->
    <div class="text-center mb-12" data-aos="fade-up">
      <div class="inline-flex items-center gap-3 mb-4">
        <div class="bg-green-600 rounded-full p-2 shadow-lg">
          <i class="ri-team-fill text-gray-50 text-xl"></i>
        </div>
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-100">
          Our Partners
        </h2>
      </div>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        Supported by leaders who share our rugby passion
      </p>
    </div>

    <!-- Partners Carousel -->
    <div v-if="partnerSponsors.length" class="relative py-8" data-aos="fade-up">      
      <VueSlickCarousel
        class="py-4"
        :arrows="true"
        :infinite="true"
        :speed="600"
        :slidesToShow="6"
        :slidesToScroll="1"
        :autoplay="true"
        :autoplaySpeed="2500"
        :pauseOnHover="true"
        :dots="false"
        :responsive="responsiveSettings"
      >
        <div
          v-for="(item, index) in partnerSponsors"
          :key="index"
          class="px-2 lg:px-3"
        >
          <div 
            class="group relative cursor-pointer h-40 flex items-center justify-center"
            @click="openLink(item.hyperlink)"
          >
            <img
              :title="item.company_name"
              class="max-h-32 w-full object-contain brightness-50 
                    transition-all duration-500 group-hover:brightness-100 
                    group-hover:scale-125"
              :src="getMediaURL(item.media[0])"
              loading="lazy"
              :alt="item.company_name"
            />
          </div>
        </div>
      </VueSlickCarousel>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12" data-aos="fade-up">
      <div class="bg-gray-800 rounded-2xl p-8 border-2 border-dashed border-green-500/30 
                  max-w-md mx-auto">
        <i class="ri-team-line text-5xl text-green-500 mb-4"></i>
        <h3 class="text-xl font-bold text-gray-300 mb-2">
          Join Our Team
        </h3>
        <p class="text-gray-400 mb-6">
          Become a sponsor and support rugby excellence
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import handlesMedia from '~/mixins/shop/handlesMedia';

export default {
  name: 'Partnersponsor',
  components: { VueSlickCarousel },
  mixins: [ handlesMedia ],
  data() {
    return {
      partnerSponsors: [],
      responsiveSettings: [
        {
          breakpoint: 1280,
          settings: { slidesToShow: 5 }
        },
        {
          breakpoint: 1024,
          settings: { slidesToShow: 4 }
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 3 }
        },
        {
          breakpoint: 640,
          settings: { slidesToShow: 2 }
        }
      ]
    };
  },
  created() {
    this.retrieveSponsors();
  },
  methods: {
    openLink(url) {
      if (url) {
        window.open(url, '_blank');
      }
    },
    retrieveSponsors() {
      const query = { q: this.query };
      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key];
        }
      });
      const queryString = new URLSearchParams(query).toString();
      this.$axios
        .$get(`v1/partnersponsors?${queryString}`)
        .then((response) => {
          this.partnerSponsors = response.data.partnerSponsors;
        });
    }
  }
};
</script>

<style scoped>
:deep(.slick-prev) {
  left: -40px !important;
}
:deep(.slick-next) {
  right: -40px !important;
}
:deep(.slick-prev),
:deep(.slick-next) {
  width: 36px !important;
  height: 36px !important;
  background: rgba(31, 41, 55, 0.8) !important;
  border-radius: 50% !important;
  border: 2px solid rgba(34, 197, 94, 0.3) !important;
}
:deep(.slick-prev::before),
:deep(.slick-next::before) {
  display: none !important;
}
</style>