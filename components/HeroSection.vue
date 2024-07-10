<template>
  <section class="mx-auto max-w-screen-xl gap-4 p-7">
    <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
      <div class="relative col-span-1 mb-4 w-full p-4" data-aos="fade-right">
        <h1
        class="font-montserrat mb-4
            bg-gradient-to-b
            from-[#5EE738]
            via-[#3e872a]
            to-[#050505]
            bg-clip-text
            text-[2.5rem]
            font-bold
            leading-tight
            text-transparent sm:pr-8 sm:text-5xl
            xl:pr-10 xl:text-6xl"
            >
        {{ headline }}
        </h1>
        <span class="text-justify indent-10 text-lg text-white"
          v-html="contentblurb"
        />
          <NuxtLink to="/tournaments" v-show="!isAdmin">
          <BaseButton
            class="
              mt-4
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
        :src="contentimage"
        class="h-auto w-auto"
        >
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
        <img
        src="~/assets/images/tfw9s.png"
        class="h-30 absolute top-3 mt-3 w-20 contrast-125"
        >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import handlesMedia from '~/mixins/shop/handlesMedia'

export default {
  mixins: [ handlesMedia ],
  props: {
    blurb: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: false
    },
    image: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showContent: {
        headline: false,
        cta: false,
        contentblurb: false
      },
      headline: 'TFW9’s',
      cta: 'Register Now',
      contentblurb: '',
      contentimage: []
    };
  },
  watch: {
    blurb(newVal) {
      this.contentblurb = newVal;
    },
    image(newVal) {
      this.contentimage = this.getMediaURL(newVal[0]);
    }
  },
  methods: {
    test() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Work in progress...',
        position: 'bottom',
        variant: 'info',
        queue: true
      })
    },
  }
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
