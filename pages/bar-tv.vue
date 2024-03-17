<template>
  <div  class="min-h-full bg-[#1A1A1B]  pb-12">
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
          color="white"
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
          Bar TV
        </h1>
      </div>
    </BaseHeader>
    <section class="mx-auto max-w-screen-xl gap-4 p-7 py-12">
      <div
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      data-aos="fade-up"
      >
        <div class="col-span-1">
          <input
          v-model="searchText"
          type="text"
          class="h-9 w-full rounded-md px-4"
          placeholder="Search..."
          >
        </div>
        <div class="col-span-1 flex gap-4">
          <OField label="">
            <ODatepicker
              v-model="pDates"
              placeholder="Click to select..."
              icon="calendar"
              range
            ></ODatepicker>
          </OField>
          <BaseButton
          class="from-40%
          via-95% to-100% h-9
          max-w-full rounded-lg
          bg-gradient-to-tr
          from-[#5EE738]
          via-[#3e872a]
          to-[#050505]
          uppercase
          text-white"
          >
          GO
          </BaseButton>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        <div
        v-for="(item, index) in items" :key="index"
        class="relative col-span-1 overflow-hidden lg:col-span-2"
        data-aos="fade-up"
        >
          <img
          :src="item.image"
          class="mb-8 h-48 w-full
          rounded-lg object-cover"
          alt="Image"
          >
          <div class="absolute bottom-0 w-full text-center line-clamp-1">
            <p class="text-sm text-white">
          {{item.description}}
          </p>
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
          description: 'West vs East 6\'s 00-00-0000',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          description: 'West vs East 6\'s 00-00-0000',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          description: 'West vs East 6\'s 00-00-0000',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          description: 'West vs East 6\'s 00-00-0000',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          description: 'West vs East 6\'s 00-00-0000',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          description: 'West vs East 6\'s 00-00-0000',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          description: 'West vs East 6\'s 00-00-0000',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          description: 'West vs East 6\'s 00-00-0000',
          image: require('~/assets/images/kidsplaying.jpg')
        },
      ]
    };
  },
};
</script>
