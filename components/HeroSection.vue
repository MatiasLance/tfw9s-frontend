<template>
  <section
    id="hero"
    class="relative flex min-h-screen flex-col justify-center
    overflow-hidden bg-gray-50 py-6 sm:py-12"
  >
    <img
      class="absolute top-1/2 left-1/2 w-full
      -translate-x-1/2 -translate-y-1/2 object-cover"
      src="/img/1.webp"
      alt=""
    />
    <div
    class="absolute inset-0 bg-gradient-to-r
      from-slate-800/50 to-black/50"
    ></div>
    <BaseSection>
      <div
        class="
          col-span-12
          mt-12
          px-6
          text-center
          sm:space-y-8 lg:col-span-12
        "
      >
        <span
          v-if="showContent.superheadline"
          data-aos="fade-right"
          data-aos-once="true"
          class="
            pb-3
            text-base
            font-semibold
            uppercase
            text-white
          "
        >
          {{ superheadline }}
        </span>
        <h1
          data-aos="fade-right"
          data-aos-once="true"
          class="
            font-montserrat
            break-words
            text-center text-[2rem]
            font-black uppercase
            leading-snug
            tracking-wider
            text-white
            sm:text-5xl
            xl:text-6xl
          "
        >
          {{ headline }}
        </h1>
        <p
          data-aos="fade-down"
          data-aos-once="true"
          data-aos-delay="300"
          class="hidden
          text-white sm:block"
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
            flex-col items-center
            justify-center space-y-4
            sm:flex-row
            sm:space-y-0
            sm:space-x-4 md:mb-10
          "
        >
          <NuxtLink to="/shop">
            <BaseButtonLight
              class="
                max-w-full
                rounded-lg
                bg-white py-8 px-14
                uppercase
                text-black
                hover:bg-brand-slate
                hover:text-white
                focus:ring-1 focus:ring-white focus:ring-offset-2
              "
            >
              {{ cta }}
            </BaseButtonLight>
          </NuxtLink>
        </div>
      </div>
    </BaseSection>
  </section>
</template>

<script>
import BaseSection from './base/BaseSection.vue';
import BaseButtonLight from './base/BaseButtonLight.vue';
export default {
  name: 'HeroSection',
  components: {
    BaseSection,
    BaseButtonLight
  },
  data() {
    return {
      showContent: {
        superheadline: false,
        headline: false,
        cta: false,
        contentblurb: false
      },
      superheadline: '',
      headline: 'The Drum HQ',
      cta: 'Start Shopping',
      contentblurb: 'Where drumming what you dream of becomes a tad closer',
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