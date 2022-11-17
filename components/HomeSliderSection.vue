<template>
  <section id="homeslider" class="w-full">
    <HomeSlider />
  </section>
</template>

<script>
import HomeSlider from './HomeSlider.vue';
export default {
  name: 'HomeSliderSection',
  components: { HomeSlider },
  data() {
    return {
      superheadline: 'Welcome to',
      headline: 'Gold Coast\'s Finest RETAIL BOUTIQUE',
      cta: 'Browse Products',
      contentblurb: 'A BRAND NEW 1-OF-1 RETAIL STORE',
    };
  },
};
</script>