<template>
  <section id="hero" class="my-16 w-full">
    <BaseSection>
      <div
        class="
          mb-15
          col-span-12
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
            text-[2.5rem]
            font-bold
            uppercase
            leading-tight
            text-black
            sm:pr-8 sm:text-5xl
            xl:pr-10 xl:text-6xl
          "
          style="background: linear-gradient(45deg, #53B437, #050505);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;"
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
                from-brand-green
                to-brand-black
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
      <div
         class=" mb-15
          col-span-12
          mt-10
          space-y-4
          px-6
          sm:space-y-6
          md:text-left
          lg:col-span-6"
>
        <div class="aspect-w-16 aspect-h-9 w-full">
          <img
            src="~/assets/images/kidsplaying.jpg"
            class="relative z-10 p-4 sm:p-7 lg:-mt-4"
            alt=""
          />
        </div>
        <div class="flex items-center justify-center">
          <img
           src="~/assets/images/the-final-whistle-logo.png"
            class="h-30 absolute top-3 z-10 mt-3 w-20 object-cover"
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
        headline: false,
        cta: false,
        contentblurb: false
      },
      headline: 'TFW RL 9’S',
      cta: 'REGISTER NOW',
      contentblurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquam dictum risus sed rutrum. Sed bibendum lectus ac imperdiet elementum. Ut luctus erat a magna vehicula, in posuere urna sagittis. Quisque elementum sem mi, sit amet vehicula nisi posuere sit amet. Praesent iaculis sapien ac nunc auctor, nec sagittis orci egestas. Vivamus scelerisque vitae lorem eu tincidunt. Duis ac orci id urna dictum sodales. Suspendisse euismod lectus ac risus pellentesque facilisis. Sed est nulla, posuere vel pharetra in, viverra eu sem. Fusce gravida luctus nisl gravida convallis.',
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