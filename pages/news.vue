<template>
  <div class="w-screen min-h-screen bg-[#1A1A1B]">
    <BaseHeader
    class="mx-auto max-w-screen-xl gap-4
    bg-gradient-to-r from-brand-green to-brand-black lg:px-8"
    >
      <div
        class="
          col-span-12
          text-center
          sm:space-y-3
          sm:text-left
          lg:col-span-6
          xl:mt-10"
          data-aos="fade-right"
      >
        <span
          class="
            superheadline
            flex flex-row
            items-center
            text-[1rem]
            font-normal
            text-white
          "
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white">Home</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl">
          News
        </h1>
      </div>
    </BaseHeader>
    <section class="mx-auto max-w-screen-xl gap-4 p-7 py-12">
      <div class="grid grid-cols-1 gap-4">
        <div
        v-for="(item, index) in items"
        :key="index" class="group col-span-1 bg-[#212121]"
        data-aos="fade-up"
        >

          <div class="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-6">
            <div class="col-span-1 p-4 md:col-span-3 lg:col-span-4 lg:p-8">

              <h3 class="grid text-xl font-semibold text-white sm:grid-cols-1 ">
                {{ item.title }}
              </h3>

              <p class="text-white">
                {{ item.text }}
              </p>

              <p class="mb-2 text-white  line-clamp-3">
                {{ item.description }}
              </p>

              <BaseButton
              class="from-40% via-95% to-100%
              max-w-full rounded-lg
              bg-gradient-to-tr
              from-[#5EE738]
              via-[#3e872a]
              to-[#050505]
              py-4
              px-8
              uppercase
              text-white"
              >
              READ MORE
              </BaseButton>

            </div>
            <div class="col-span-1 overflow-hidden md:col-span-3 lg:col-span-2">
              <img
              :src="item.image"
              alt="Product Image"
              class="h-full w-full object-cover transition-all
              group-hover:scale-110"
            >
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Weekly Wrap up',
          text: '00-00-00',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          title: 'Weekly Wrap up',
          text: '00-00-00',
          description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          title: 'Weekly Wrap up',
          text: '00-00-00',
          description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          title: 'Weekly Wrap up',
          text: '00-00-00',
          description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          title: 'Weekly Wrap up',
          text: '00-00-00',
          description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: require('~/assets/images/kidsplaying.jpg')
        },

      ]
    };
  }
};
</script>

<style scoped>
.superheadline {
  color: aliceblue;
}
</style>