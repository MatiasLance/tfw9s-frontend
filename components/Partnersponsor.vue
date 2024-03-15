<template>
  <section class="mx-auto max-w-screen-xl gap-4 p-7">
    <div
    class="grid grid-cols-1 gap-2 sm:grid-cols-2
    md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
      <div
      v-for="(item, index) in items"
      :key="index" class="flex h-72 items-center justify-center
      rounded-lg bg-[#1A1A1B] text-stone-800 hover:border-2 hover:text-white"
      data-aos="fade-up"
      >
        <div class="text-center">
          <p class="text-3xl font-bold ">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { text: 'Partner Sponsor' },
        { text: 'Partner Sponsor' },
        { text: 'Partner Sponsor' },
        { text: 'Partner Sponsor' },
        { text: 'Partner Sponsor' },
        { text: 'Partner Sponsor' },
        { text: 'Partner Sponsor' },
      ],
    };
  },
};
</script>
