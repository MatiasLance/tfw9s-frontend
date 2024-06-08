<template>
    <div class="flex flex-wrap justify-center">
      <div class="w-full px-4 py-8 md:w-1/2">
        <h1
        class="font-montserrat mb-4
            bg-gradient-to-br from-[#53B437]
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
        <p class="mb-4 text-lg">
            {{ contentblurb }}
        </p>
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
      <div class="w-full px-4 py-8 md:w-1/2">
        <div>
        <img
         src="~/assets/images/kidsplaying.jpg"
         alt="Image"
         class="h-auto w-full"
         >
         </div>
         <div class="mt-3 flex items-center justify-center">
        <img
         src="~/assets/images/tfw9s.png"
         class="h-30 y-10 absolute top-3 mt-14 w-20"
         >
         </div>
      </div>
    </div>
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
