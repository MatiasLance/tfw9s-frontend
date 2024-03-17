<template>
  <section class="mx-auto max-w-screen-xl gap-4 p-7">
    <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
      <div class="relative col-span-1 mb-4 w-full p-4" data-aos="fade-right">
        <h1
        class="font-montserrat from-70%
            via-95% to-100% mb-4
            bg-gradient-to-b
            from-[#5EE738]
            via-[#3e872a]
            to-[#050505]
            bg-clip-text
            text-[2.5rem]
            font-bold uppercase
            leading-tight
            text-transparent sm:pr-8 sm:text-5xl
            xl:pr-10 xl:text-6xl"
            >
        {{ headline }}
        </h1>
        <p class="mb-4 text-justify indent-10 text-lg text-white">
            {{ contentblurb }}
        </p>
        <NuxtLink to="/shop">
            <BaseButton

              class="
                from-40% via-95% to-100%
                max-w-full rounded-lg
                border border-gray-200
                bg-gradient-to-tr
                from-[#5EE738]
                via-[#3e872a]
                to-[#050505]
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
      <div
        class="relative col-span-1 mb-4 w-full p-4 py-8"
        data-aos="fade-up"
        >
        <div class="mt-6">
        <img
        src="~/assets/images/kidsplaying.jpg"
        class="h-auto w-auto"
        >
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
        <img
        src="~/assets/images/the-final-whistle-logo.png"
        class="h-30 absolute top-3 mt-3 w-20 contrast-125"
        >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
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