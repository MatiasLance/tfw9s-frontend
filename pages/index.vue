<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <div class="max-w-full overflow-hidden">
    <HeroSection />
    <HeroContentBlurbSection />
    <FeaturedProductsSection />
    <BeforeFooterSection v-if="showSections.beforeFooter" />
  </div>
</template>

<script>
import HeroContentBlurbSection from '../components/HeroContentBlurbSection.vue';
import FeaturedProductsSection from '~/components/FeaturedProductsSection.vue';
import BeforeFooterSection from '~/components/BeforeFooterSection.vue';
import HeroSection from '~/components/HeroSection'
import aosMixin from '@/mixins/aos';

export default {
  name: 'index',
  components: {
    HeroSection,
    BeforeFooterSection,
    FeaturedProductsSection,
    HeroContentBlurbSection
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
      title: 'Home - Drum HQ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
      keywords: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '',
        },
      ],
    };
  }
};
</script>
