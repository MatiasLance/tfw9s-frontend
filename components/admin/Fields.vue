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
              :disabled="selectedData.id !== data.id"
              class="border-black bg-white text-lg flex-1 p-1 mr-0.5"
              />
              <select
              v-model="data.region"
              class="border-black bg-white text-lg flex-1 p-1"
              :disabled="selectedData.id !== data.id"
              >
                <option
                v-for="(region) in RegionList"
                :key="region.id"
                >{{region.title}}</option>
              </select>
              <i
              v-if="selectedData.id !== data.id"
              class="ri-pencil-fill text-white text-xl px-4"
              @click="editRegion(data)"
              />
              <i
              v-if="selectedData.id === data.id"
              class="ri-save-3-fill text-green-400 text-xl px-4"
              @click="saveRegion(data)"
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
</template>

<script>
export default {
  data() {
    return {
      selectedData: [],
      Fields: [],
      Dataset: [],
      RegionList: [],
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
    editRegion(selected) {
      console.log(selected)
      if (this.selectedData.length === 0) {
        this.selectedData = selected;
      } else {
        this.Dataset = this.Dataset.map(data => {
          if (data.id === this.selectedData.id) {
            console.log('matched', data, this.selectedData);
            return this.selectedData;
          } else {
            return data;
          }
        });
        this.selectedData = selected;
      }
    },
    saveRegion(data) {
      console.log(data)
      this.selectedData = []
    },
    generateRandomData() {
      for (let i = 0; i < 14; i++) {
        this.Dataset.push({
          id: i,
          field: this.getRandomField(),
          region: this.getRandomRegion(),
        });
      }
      for (let i = 0; i < 8; i++) {
        this.RegionList.push({
          id: i,
          title: `Region Number ${i+1}`
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