<template>
  <div>
    <div class="min-h-full bg-[#1A1A1B]  pb-12" data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-4 p-7 py-12">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div class="col-span-1">
            <ODatepicker
            v-model="date"
            placeholder="Click to select..."
            icon="calendar"
            class="bg-black"
            />
          </div>
          <div class="col-span-1"></div>
          <div
          class="col-span-1 flex items-center justify-end lg:justify-center"
          >
            <label class="font-semibold text-[#555555]">
              Show Submitted
              <input id="submitted" type="checkbox"/>
            </label>
          </div>
          <section class="col-span-1 md:col-span-3">
            <CustomVueTable
            v-if="showCustomVueTable"
            :columns="dataColumns"
            :data="Data"
            />
          </section>
          <div
            class="col-span-1 justify-center md:col-span-3"
            >
            <VPagination
              v-model="page"
              :length="totalPages"
              dark
              color="success"
              :total-visible="7"
              class="my-4 text-white"
              />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import CustomVueTable from '~/components/tables/CustomVueTable.vue';
export default {
  components: { CustomVueTable },
  data() {
    return {
      date: null,
      showCustomVueTable: true,
      Data: [],
      selectedData: [],
      dataColumns: [
        { name: 'date', label: 'Date' },
        { name: 'field', label: 'Field' },
        { name: 'team1', label: 'Team' },
        { name: 'point1', label: 'Points' },
        { name: 'team2', label: 'Team' },
        { name: 'point2', label: 'Points' },
        { name: 'action', label: '' },
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
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 1,
      totalItems: 0,
    };
  },
  created() {
    this.generateRandomData();
  },
  methods: {
    generateRandomData() {
      for (let i = 0; i < 14; i++) {
        this.Data.push({
          id: i,
          date: '25/03/2024',
          field: 'Test Field',
          team1: 'Team 1',
          point1: 10,
          team2: 'Team 2',
          point2: 10,
        });
      }
    },
  }
};
</script>

<style scoped>
.superheadline {
color: aliceblue;
}
/* Default background color for unchecked checkbox */
/* Default styles for unchecked checkbox */
input[type="checkbox"] {
  -webkit-appearance: none; /* Remove default styles */
  -moz-appearance: none;
  appearance: none;
  background-color: white; /* Transparent background */
  border: 2px solid white; /* White border */
  width: 25px; /* Adjust width and height as needed */
  height: 25px;
  outline: none; /* Remove outline */
  cursor: pointer; /* Show pointer on hover */
  border-radius: 5px;
}

/* Background color for checked checkbox */
input[type="checkbox"]:checked {
  background-color:#e42828; /* Orange background */
}

/* Optional: Styles for checkmark */
input[type="checkbox"]::after {
  display: inline-block;
  font-size: 14px; /* Adjust size as needed */
  color: white; /* Color of the checkmark */
  line-height: 1; /* Vertical alignment */
  visibility: hidden; /* Hide by default */
}

/* Show checkmark when checkbox is checked */
input[type="checkbox"]:checked::after {
  visibility: visible;
}

</style>