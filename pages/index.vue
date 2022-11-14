<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <div>
    <HeroSection
      class="flex min-h-screen items-center justify-center py-24"
    />
    <ReviewSection />
  </div>
</template>

<script>
import ReviewSection from '../components/ReviewSection.vue';
import aosMixin from '@/mixins/aos';

export default {
  name: 'index',
  components: { ReviewSection },
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
