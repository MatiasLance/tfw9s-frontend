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
          Bar-TV
        </h1>
      </div>
    </BaseHeader>
    <div class="container mx-auto px-4 ">
    <div class="mb-4 flex justify-center">
      <input
        v-model="searchText"
        type="text"
        class="w-1/4 rounded-md border border-gray-300 px-4 py-2"
        placeholder="Search..."
      >
      <input
        v-model="searchText"
        type="text"
        class="w-1/4 rounded-md border border-gray-300 px-4 py-2"
        placeholder="Search..."
      >
      <BaseButton
                class=" max-w-full
                border border-gray-200
                bg-gradient-to-r
                from-brand-green
                to-brand-black
                py-4
                px-8
                font-bold
                uppercase
                text-white"
                >
                GO
     </BaseButton>
    </div>

  <div class="flex flex-wrap justify-center">
    <div v-for="(item, index) in items" :key="index" class="m-2 w-1/4">
      <img
      :src="item.image"
      class="h-48 w-full
      rounded-t-lg object-cover"
      alt="Image"
      >
      <div class="rounded-b-lg bg-white p-1 text-center">
        <p class="text-gray-700">
      {{ item.description }}
       </p>
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
          description: 'description',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          description: 'description',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          description: 'description',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          description: 'description',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          description: 'description',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          description: 'description',
          image: require('~/assets/images/kidsplaying.jpg')
        },
      ]
    };
  },
};
</script>
