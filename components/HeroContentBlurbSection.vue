<template>
    <section class="my-4 w-full sm:my-36">
      <BaseSection class="my-10" data-aos="fade-down">
        <div
          class="
            col-span-12 mt-12
            space-y-6 px-4
            sm:mt-32 sm:px-6
            lg:col-span-12"
        >
          <h1 class="text-center text-3xl font-semibold sm:pr-8 xl:pr-12">
            {{ heading }}
          </h1>
          <p
            v-for="paragraph in paragraphs"
            :key="paragraph.id"
            class="paragraph text-center"
          >
            {{ paragraph.content }}
          </p>
        </div>
      </BaseSection>
    </section>
</template>

<script>
import BaseSection from './base/BaseSection.vue';
export default {
  name: 'HeroContentBlurbSection',
  components: { BaseSection },
  data() {
    return {
      showContent: {
        superheadline: false,
        headline: false,
        cta: false,
        contentblurb: false
      },
      heading: '#1 For New & Used Drum Kits Australia',
      paragraphs: [
        {
          id: '1',
          content: 'Browse the online store for all the best brands in new drumming gear or find pre-loved and high end drum kits and gear right here. Order online or contact us to arrange a meeting on site in our Brisbane store.'
        }
      ]
    };
  },
};
</script>

  <style lang="postcss">
  .shop-cta{
    @apply mt-16 mb-8
  }

  .shop-cta-sm{
    @apply mt-2 mb-10
  }
  </style>