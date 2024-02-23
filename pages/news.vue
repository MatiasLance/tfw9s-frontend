<template>
  <div>
    <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black">
      <div
        class="
          col-span-12
          space-y-3
          px-6
          text-center
          sm:space-y-3 sm:text-left
          lg:col-span-6
          xl:mt-10
        "
      >
        <span
          class="
            superheadline
            flex flex-row
            items-center
            pb-3
            text-[1rem]
            font-normal
          "
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white">Home</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-6xl">
          News
        </h1>
      </div>
    </BaseHeader>
  <div class="container mx-auto py-12">
    <div class="grid grid-cols-1 gap-8">
      <div
         v-for="(item, index) in items"
        :key="index" class="flex overflow-hidden
         rounded-lg shadow-lg"
         >
        <div class="w-full p-6 sm:w-2/3 ">
          <h3
         class="text-xl font-semibold
         text-black "
          >
       {{ item.title }}
       </h3>
       <p class="text-black">
       {{ item.text }}
         </p>
          <p class="mb-2 text-black">
       {{ item.description }}
         </p>
        <BaseButton
                class=" max-w-full
                border border-gray-200
                bg-gradient-to-r
                from-brand-green
                to-brand-black
                py-4
                px-8
                text-xl
                font-bold
                uppercase
                text-white"
                >
                READ MORE
     </BaseButton>
        </div>
        <div class="w-full sm:w-1/2">
          <img
          :src="item.image"
          alt="Product Image" c
          lass="h-64 w-full object-cover"
        >
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Weekly Wrap',
          text: '00-00-00',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          title: 'Weekly Wrap',
          text: '00-00-00',
          description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          title: 'Weekly Wrap',
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
/* Add any additional styling here if needed */
</style>
