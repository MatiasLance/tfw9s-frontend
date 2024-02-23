<template>
  <section>
    <div class="container mx-auto mb-10 py-8">
      <div class="grid grid-cols-4 gap-4 ">
        <div
       v-for="(item, index) in items"
        :key="index" class="flex items-center
        justify-center rounded-lg bg-white p-4
        shadow-md"
        >
          <div class="m-2 p-24 text-center">
            <p class="text-black hover:text-white">
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
        { text: 'PARTNER SPONSOR' },
      ],
    };
  },
};
</script>
