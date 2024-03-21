<template>
  <div>
    <div class="min-h-full bg-[#1A1A1B]  pb-12" data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-4 p-7 py-12">
        <div class="grid grid-cols-6 gap-4">
          <div class="col-span-1">
            <button
            type="button"
            class="
            from-40% via-95% to-100%
            w-full rounded-md
            bg-gradient-to-br
            from-[#5EE738] via-[#3e872a]
            to-[#050505] py-1.5
            text-center
            font-semibold
            text-white"
          >
            +
          </button>
          </div>
          <section class="col-span-6">
            <div class="grid grid-cols-1">
              <div
              v-for="(Age) in Ages"
              :key="Age.id" class="col-span-1 mb-0.5 gap-0"
              >
              <div class="flex items-center justify-center">
                <input
                v-model="Age.title"
                :rules="Rules"
                placeholder="Enter Age"
                hide-details
                required
                :disabled="true"
                class="border-black bg-white text-lg flex-1 p-1"
                />
                <i
                class="ri-pencil-fill text-white text-xl px-4"
                />
                <i
                class="ri-delete-bin-fill text-red-400 text-xl px-4"
                />
              </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedAge: [],
      Ages: [
        {
          id: 1,
          title: 'Under 8',
          key: 'U8'
        },
        {
          id: 2,
          title: 'Under 10',
          key: 'U10'
        },
        {
          id: 3,
          title: 'Under 12',
          key: 'U12'
        },
        {
          id: 4,
          title: 'Under 15',
          key: 'U15'
        },
        {
          id: 5,
          title: 'Under 18',
          key: 'U18'
        },
        {
          id: 6,
          title: 'Above 18',
          key: 'A18'
        },

      ],
      Rules: [
        value => {
          if (value) {
            return true
          }

          return 'Name is required.'
        },
        value => {
          if (value?.length <= 10) {
            return true
          }

          return 'Name must be less than 10 characters.'
        },
      ],
    };
  },
};
</script>

<style scoped>
.superheadline {
color: aliceblue;
}
</style>