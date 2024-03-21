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
          <div class="grid grid-cols-1 gap-2">
            <div
            v-for="(data, index) in Dataset"
            :key="index"
            class="col-span-1 mb-0.5 gap-0 border-2 border-gray-500"
            >
              <Item class="grid grid-cols-3">
                <div class="col-span-1">
                  <ODatepicker
                  v-model="pDates"
                  placeholder="Click to select..."
                  icon="calendar"
                  />
                </div>
                <div
                class="col-span-1 m-auto text-center
                text-2xl font-semibold text-white"
                >
                  {{ data.manager }}
                </div>
                <div class="col-span-1">
                  <select
                  v-model="data.field"
                  class="w-full bg-transparent p-1 text-lg text-white"
                  >
                    <option
                    v-for="(field, index) in Fields"
                    :key="index"
                    >{{field}}</option>
                  </select>
                </div>
              </Item>
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
      Fields: [
        'West Boulevard',
        'Grand George Canyon',
        'Spring Fields',
        'Tuggerah Football Grounds',
      ],
      Dataset: [
        {
          id: 1,
          date: null,
          manager: 'Kiko Pangilinan',
          field: 'Tuggerah Football Grounds'
        }
      ],
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
};
</script>

<style scoped>
.superheadline {
color: aliceblue;
}
select option {
  background-color: #333131; /* Change to your desired background color */
}
ODatepicker {
  background-color: #333131;
}
</style>