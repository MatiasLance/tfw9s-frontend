<template>
  <section class="mx-auto max-w-screen-xl px-7 py-4">
    <div v-if="partnerSponsors.length">
      <VueSlickCarousel
        class="flex w-full gap-6"
        :arrows="true"
        :infinite="true"
        :speed="500"
        :slidesToShow="6"
        :slidesToScroll="1"
        :responsive="responsiveSettings"
        data-aos="fade-up"
      >
        <div
          v-for="(item, index) in partnerSponsors"
          :key="index"
        >
            <img
              class="size-24 md:size-40 overflow-hidden rounded-lg
              object-contain brightness-50 transition duration-300
              ease-in-out hover:scale-125 hover:brightness-100
              cursor-pointer"
              :src="getMediaURL(item.media[0])"
              alt="Sponsor Image"
              @click="openLink(item.hyperlink)"
            />
        </div>
      </VueSlickCarousel>
    </div>
  </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import handlesMedia from '~/mixins/shop/handlesMedia';

export default {
  components: { VueSlickCarousel },
  mixins: [ handlesMedia ],
  data() {
    return {
      partnerSponsors: [],
      responsiveSettings: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
      ],
    };
  },
  created() {
    this.retrieveSponsors();
  },
  methods: {
    openLink(url) {
      window.open(url, '_blank');
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
    },
  },
};
</script>
