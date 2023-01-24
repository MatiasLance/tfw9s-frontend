<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <div class="max-w-full overflow-hidden">
    <HeroSection />
    <FeaturedProductsSection />
    <BeforeFooterSection v-if="showSections.beforeFooter" />
  </div>
</template>

<script>
import FeaturedProductsSection from '~/components/FeaturedProductsSection.vue';
import BeforeFooterSection from '~/components/BeforeFooterSection.vue';
import HeroSection from '~/components/HeroSection'
import aosMixin from '@/mixins/aos';

export default {
  name: 'index',
  components: {
    HeroSection,
    BeforeFooterSection,
    FeaturedProductsSection
  },
  mixins: [ aosMixin ],
  data() {
    return {
      showSections: {
        homeSlider: false,
        brands: false,
        featured: false,
        review: false,
        beforeFooter: true
      }
    };
  },
  head() {
    return {
      title: 'Revamped - GC\'S Finest Store: NIKE DUNKS, JORDANS, YEEZYS & MORE! | Revamped Official',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Gold Coast\'s finest sneaker, clothing and accessories store',
        },
      ],
      keywords: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'sneakers, clothing, accessories, nike dunks, jordans, yeezys, online store',
        },
      ],
    };
  }
};
</script>
