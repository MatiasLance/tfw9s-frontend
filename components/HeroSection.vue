<template>
  <section id="hero" class="w-full">
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
        <h1
          data-aos="fade-right"
          data-aos-once="true"
          class="
            font-montserrat
            break-words
            text-[2rem] font-black
            uppercase
            leading-snug
            tracking-wider
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
                border border-[#fb0d2b]
                bg-gradient-to-r
                from-[#3981da]
                to-[#3981da]
                py-8
                px-14
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
            :src="require('~/assets/images/home.jpg')"
            class="p-7 shadow-lg lg:-mt-4"
            alt=""
          />
        </div>
      </div>
    </BaseSection>
  </section>
</template>

<script>
import BaseSection from './base/BaseSection.vue';
import BaseButton from './base/BaseButton.vue';
export default {
  name: 'HeroSection',
  components: { BaseSection, BaseButton },
  data() {
    return {
      superheadline: 'Stradbroke Island Art',
      headline: 'Keep a piece of Straddy Forever',
      cta: 'Shop',
      contentblurb: '',
    };
  },
};
</script>

<style>
.superheadline:before {
  width: 3.125rem;
  border-top: 2px solid #3981da;
  margin-right: 10px;
  content: ' ';
}

.shop-cta{
  @apply mt-16 mb-8
}

.shop-cta-sm{
  @apply mt-2 mb-10
}
</style>