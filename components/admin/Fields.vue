<template>
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
            v-for="(data, index) in Dataset"
            :key="index" class="gap-0 col-span-1 mb-0.5"
            >
            <div class="flex items-center justify-center">
              <input
              v-model="data.field"
              :rules="Rules"
              placeholder="Enter Field"
              hide-details
              required
              :disabled="true"
              class="border-black bg-white text-lg flex-1 p-1 mr-0.5"
              />
              <select
              v-model="data.region"
              class="border-black bg-white text-lg flex-1 p-1"
              :disabled="true"
              >
                <option
                v-for="(data, index) in Dataset"
                :key="index"
                >{{data.region}}</option>
              </select>
              <i class="ri-pencil-fill text-white text-xl px-4"/>
              <i class="ri-delete-bin-fill text-red-400 text-xl px-4"/>
            </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Fields: [],
      Dataset: [],
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
  created() {
    this.generateRandomData();
  },
  methods: {
    generateRandomData() {
      for (let i = 0; i < 14; i++) {
        this.Dataset.push({
          id: i,
          field: this.getRandomField(),
          region: this.getRandomRegion(),
        });
      }
    },
    getRandomField() {
      const fields = [
        'West Boulevard',
        'Grand George Canyon',
        'Spring Fields',
        'Tugkaran',
      ];
      return fields[Math.floor(Math.random() * fields.length)];
    },
    getRandomRegion() {
      const region = [
        'Region Number 1',
        'Region Number 2',
        'Region Number 3',
        'Region Number 4',
      ];
      return region[Math.floor(Math.random() * region.length)];
    }
  }
};
</script>

<style scoped>
.superheadline {
color: aliceblue;
}
</style>