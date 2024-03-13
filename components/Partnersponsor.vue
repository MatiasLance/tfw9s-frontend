<template>
  <section>
    <div class="container mx-auto mb-10 py-8 ">
      <div
       class="grid grid-cols-2 gap-5 sm:grid-cols-2
           md:grid-cols-3 xl:grid-cols-4"
        >
        <div
       v-for="(item, index) in items"
        :key="index" class="flex items-center
        justify-center rounded-lg bg-[#1A1A1B] p-4
        "
        >
          <div class="m-2 p-24 text-center">
            <p class="font-bold text-stone-800 hover:text-white">
          {{ item.text }}
         </p>
          </div>
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
        { text: 'PARTNER SPONSOR' },
        { text: 'PARTNER SPONSOR' },
        { text: 'PARTNER SPONSOR' },
        { text: 'PARTNER SPONSOR' }
      ],
    };
  },
};
</script>
