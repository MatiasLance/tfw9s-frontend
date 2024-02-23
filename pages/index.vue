<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <div>
  <div class="max-w-full overflow-hidden">
    <HeroSection />
    <Partnersponsor/>
  </div>
</div>
</template>

<script>
import HeroSection from '~/components/HeroSection'
import aosMixin from '@/mixins/aos';

export default {
  name: 'index',
  components: { HeroSection },
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
