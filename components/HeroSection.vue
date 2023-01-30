<template>
  <section id="hero" class="my-16 w-full">
    <BaseSection>
      <div
        class="
          col-span-12
          mt-12
          space-y-4
          px-6
          sm:space-y-6
          md:text-left
          lg:col-span-6
          xl:mt-10
        "
      >
        <span
          data-aos="fade-right"
          data-aos-once="true"
          class="
            font-montserrat
            pb-3
            text-base
            font-semibold
            capitalize
            text-brand-yellow
          "
        >
          {{ superheadline }}
        </span>
        <h1
          data-aos="fade-right"
          data-aos-once="true"
          class="
            font-montserrat
            text-[2.5rem]
            font-bold
            uppercase
            leading-tight
            text-black
            sm:pr-8 sm:text-5xl
            xl:pr-10 xl:text-6xl
          "
        >
          {{ headline }}
        </h1>
        <p
          data-aos="fade-down"
          data-aos-once="true"
          data-aos-delay="300"
          class="paragraph hidden sm:block"
        >
          {{ contentblurb }}
        </p>
        <div
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-delay="700"
          class="
            shop-cta
            sm:shop-cta-sm
            flex
            flex-col
            items-center space-y-4
            sm:flex-row
            sm:space-y-0
            sm:space-x-4 md:mt-2 md:mb-10
            md:items-start md:justify-start
          "
        >
          <NuxtLink to="/shop">
            <BaseButton
              class="
                max-w-full
                border border-gray-200
                bg-gradient-to-r
                from-brand-yellow
                to-brand-yellow
                py-4
                px-8
                font-bold
                uppercase
                text-white
              "
            >
              {{ cta }}
            </BaseButton>
          </NuxtLink>
        </div>
      </div>
      <div class="col-span-12 sm:block lg:col-span-6">
        <div class="mt-[30px] w-full">
          <img
            data-aos="fade-up"
            data-aos-once="true"
            src="/img/hero/drum.webp"
            class="p-4 shadow-lg sm:p-7 lg:-mt-4"
            alt=""
          />
        </div>
      </div>
    </BaseSection>
  </section>
</template>

<script>
import BaseSection from './base/BaseSection.vue';
export default {
  name: 'HeroSection',
  components: { BaseSection },
  data() {
    return {
      showContent: {
        superheadline: false,
        headline: false,
        cta: false,
        contentblurb: false
      },
      superheadline: 'The Best In New & Used Drum Kits',
      headline: 'Buy Premium New & Used Drum Kits',
      cta: 'Start Shopping',
      contentblurb: 'Buy Online or Book To Visit Our Brisbane Store',
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