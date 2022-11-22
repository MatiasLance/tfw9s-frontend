<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <div class="mx-auto max-w-full overflow-hidden">
    <HomeSliderSection />
    <BrandsSection />
    <FeaturedProductsSection />
    <ReviewSection />
    <!-- todo: BeforeFooter wip -->
    <BeforeFooterSection />
  </div>
</template>

<script>
import ReviewSection from '../components/ReviewSection.vue';
import BrandsSection from '../components/BrandsSection.vue';
import HomeSliderSection from '../components/HomeSliderSection.vue';
import FeaturedProductsSection from '../components/FeaturedProductsSection.vue';
import BeforeFooterSection from '../components/BeforeFooterSection.vue';
import aosMixin from '@/mixins/aos';

export default {
  name: 'index',
  components: {
    ReviewSection,
    BrandsSection,
    HomeSliderSection,
    FeaturedProductsSection,
    BeforeFooterSection
  },
  mixins: [ aosMixin ],
  data() {
    return {};
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
