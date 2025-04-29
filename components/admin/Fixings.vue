<template>
<div>
  <div class="bg-[#1A1A1B]" data-aos="fade-up">
    <section class="mx-auto max-w-screen-xl gap-4 p-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="col-span-1 flex items-center justify-between">
          <button
          type="button"
          class="
          w-full rounded-md
          bg-gradient-to-br
          from-[#5EE738] via-[#3e872a]
          to-[#050505] py-1.5
          text-center
          font-semibold
          text-white
          sm:w-36"
          @click="openAddFixingDialog"
        >
          +
        </button>
        </div>
        <div class="col-span-1"></div>
        <form
        @submit.prevent="retrieveEvents"
       class="col-span-1 flex items-end justify-between"
       >
         <input
         id="query"
         v-model="query"
         placeholder="Search..."
         :rules="rules"
         type="text"
         class="flex-1 h-9 rounded-l"
         solo
         />
         <button
         type="submit"
         class="h-9 px-4 rounded-r
         text-xl font-semibold text-white
         bg-gradient-to-tr
         from-[#5EE738]
         via-[#3e872a]
         to-[#050505]"
         >
         <i class="ri-search-line"/>
         </button>
       </form>
        <div
        v-if="totalPages > 0"
        class="col-span-1 flex flex-wrap items-center
        justify-around gap-x-2 md:justify-between
        lg:col-span-3"
        data-aos="flip-up" data-aos-once="true"
        >
          <span
          class="font-medium text-white"
          >
          Showing {{ from }}-{{ to }} of {{ totalItems }} items
          </span>
          <VPagination
            v-model="page"
            :length="totalPages"
            dark
            color="success"
            :total-visible="7"
            class="text-white"
            />
        </div>
        <section
        class="col-span-1 overflow-y-hidden lg:col-span-3
        overflow-x-scroll md:overflow-x-hidden"
        >
          <div class="grid min-w-[640px] grid-cols-1 gap-2">
            <div
            v-for="(event) in EventList"
            :key="event.id"
            class="col-span-1 mb-0.5 gap-0 border-2 border-gray-500"
            data-aos="fade-up" data-aos-offset="0"
            >
              <Form class="w-full grid grid-cols-6 gap-2 p-2">
                <div
                class="col-span-1 m-auto flex
                items-center text-lg font-semibold
                text-white"
                >
                  <i class="ri-calendar-event-fill mr-2 text-2xl"></i>
                  {{ calendarDate(event.date) }}
                </div>
                <div
                class="col-span-2 m-auto text-center
                text-lg font-semibold
                text-white"
                >
                  {{ event.series_name }}
                </div>
                <div
                class="col-span-2 m-auto text-center
                text-lg font-semibold
                text-white"
                >
                  {{ event.region_name }}
                </div>
                <div
                class="col-span-1 m-auto text-center
                text-lg font-semibold
                text-white"
                >
                  {{ event.agegroup_name }}
                </div>
                <div
                v-if="event.eventmatch.length > 0"
                class="col-span-6"
                >
                  <FixingCustomTable
                  v-if="showCustomVueTable"
                  :columns="dataColumns"
                  :data="event.eventmatch"
                />
                </div>
                <div
                v-if="event.eventmatch.length === 0"
                class="col-span-6"
                >
                <span
                class="flex h-32 w-full items-center
                justify-center font-semibold
                text-[#555555]"
                >
                No match saved yet
                </span>
                </div>
                <div class="col-span-6 flex justify-end gap-4">
                  <BaseButton
                  class="
                    max-w-full rounded-lg
                    border border-gray-200
                    bg-[#4cbe5c]
                    py-2
                    px-4
                    text-white
                    "
                    @click="openEditFixingDialog(event)"
                  >
                    Edit
                  </BaseButton>
                  <BaseButton
                  class="
                    max-w-full rounded-lg
                    border border-gray-200
                    bg-[#fb0d2b]
                    py-2
                    px-4
                    text-white
                    "
                    @click="openDeleteFixingDialog(event)"
                  >
                    Delete
                  </BaseButton>
                </div>
              </Form>
            </div>
          </div>
        </section>
        <section
        v-if="totalPages=== 0"
        class="col-span-1 flex h-60 items-center
        justify-center font-semibold lg:col-span-3
        text-[#555555]"
        >
        No Fixings Available
        </section>
      </div>
    </section>
  </div>
  <AddFixingModal
  :active="showAddFixingModal"
  :managers="ManagerList"
  :regions="RegionList"
  :fields="FieldList"
  :agegroup="AgeGroupList"
  :teams="TeamList"
  :series="SeriesList"
  @close="closeAddFixingDialog"
  @confirm="AddFixing"
  />
  <EditFixingModal
  :active="showEditFixingModal"
  :managers="ManagerList"
  :regions="RegionList"
  :fields="FieldList"
  :agegroup="AgeGroupList"
  :teams="TeamList"
  :series="SeriesList"
  :event="selectedFixing"
  @close="closeEditFixingDialog"
  @confirm="UpdateFixing"
  />
  <DeleteFixingModal
  :active="showDeleteFixingModal"
  :event="selectedFixing"
  @close="closeDeleteFixingDialog"
  @confirm="DeleteFixing"
  />
</div>
</template>

<script>
import FixingCustomTable from '~/components/tables/FixingCustomTable.vue';
import AddFixingModal from '~/components/modals/AddFixingModal.vue';
import EditFixingModal from '~/components/modals/EditFixingModal.vue';
import DeleteFixingModal from '~/components/modals/DeleteFixingModal.vue';
export default {
  components: {
    FixingCustomTable,
    AddFixingModal,
    EditFixingModal,
    DeleteFixingModal,
  },
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    ManagerList: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    RegionList: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    FieldList: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    AgeGroupList: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    TeamList: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    SeriesList: {
      type: Array,
      required: true
    },
    getEvents: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      date: new Date(),
      selectedData: [],
      EventList: [],
      query: '',
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
      dataColumns: [
        { name: 'matchtime', label: 'Time' },
        { name: 'team1', label: 'Team 1' },
        { name: 'team2', label: 'Team 2' },
        { name: 'field', label: 'Field' },
      ],
      matchTimeOption: [
        { text: '8:00 AM', value: '8:00' },
        { text: '8:25 AM', value: '8:25' },
        { text: '8:50 AM', value: '8:50' },
        { text: '9:15 AM', value: '9:15' },
        { text: '9:40 AM', value: '9:40' },
        { text: '10:05 AM', value: '10:05' },
        { text: '10:30 AM', value: '10:30' },
        { text: '10:55 AM', value: '10:55' },
        { text: '11:20 AM', value: '11:20' },
        { text: '11:45 AM', value: '11:45' },
        { text: '12:10 PM', value: '12:10' },
        { text: '12:35 PM', value: '12:35' },
        { text: '1:00 PM', value: '13:00' },
        { text: '1:25 PM', value: '13:25' },
        { text: '1:50 PM', value: '13:50' },
        { text: '2:15 PM', value: '14:15' },
        { text: '2:40 PM', value: '14:40' },
        { text: '3:05 PM', value: '15:05' },
        { text: '3:30 PM', value: '15:30' },
        { text: '3:55 PM', value: '15:55' },
        { text: '4:20 PM', value: '16:20' },
        { text: '4:45 PM', value: '16:45' },
        { text: '5:10 PM', value: '17:10' },
        { text: '5:35 PM', value: '17:35' },
        { text: '6:00 PM', value: '18:00' },
        { text: '6:25 PM', value: '18:25' },
        { text: '6:50 PM', value: '18:50' },
        { text: '7:15 PM', value: '19:15' },
        { text: '7:40 PM', value: '19:40' },
        { text: '8:05 PM', value: '20:05' },
        { text: '8:30 PM', value: '20:30' },
        { text: '8:55 PM', value: '20:55' },
        { text: '9:20 PM', value: '21:20' },
        { text: '9:45 PM', value: '21:45' },
        { text: '10:00 PM', value: '22:00' },
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
      selectedFixing: ({}),
      showCustomVueTable: true,
      showAddFixingModal: false,
      showEditFixingModal: false,
      showDeleteFixingModal: false,
    };
  },
  watch: {
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
    page: {
      handler(newPage) {
        this.retrieveEvents()
      },
      immediate: true,
    },
  },
  methods: {
    setPage() {
      this.retrieveEvents();
    },
    AMPMformat(time) {
      // eslint-disable-next-line camelcase
      const matched = this.matchTimeOption.find(data => data.value === time);
      if (matched) {
        return matched.text;
      } else {
        // If no matching field is found, return "unknown"
        return 'Unknown';
      }
    },
    formattedDate(dateString) {
      const date = new Date(dateString);
      date.setHours(0, 0, 0, 0);
      return date;
    },
    calendarDate(date) {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${day}/${month}/${year.toString().slice(-2)}`;
    },
    openAddFixingDialog() {
      this.showAddFixingModal = true
    },
    openEditFixingDialog(data) {
      this.selectedFixing = data
      this.showEditFixingModal = true
    },
    openDeleteFixingDialog(data) {
      this.selectedFixing = data
      this.showDeleteFixingModal = true
    },
    closeAddFixingDialog() {
      this.showAddFixingModal = false
    },
    closeEditFixingDialog(data) {
      this.selectedFixing = ({})
      this.showEditFixingModal = false
    },
    closeDeleteFixingDialog(data) {
      this.selectedFixing = ({})
      this.showDeleteFixingModal = false
    },
    AddFixing(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Fixing Added',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showEditFixingModal = false;
      this.retrieveEvents();
      this.getEvents();
    },
    UpdateFixing(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Fixing Updated',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showEditFixingModal = false;
      this.retrieveEvents();
      this.getEvents();
    },
    DeleteFixing(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Fixing Deleted',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showDeleteFixingModal = false;
      this.retrieveEvents();
      this.getEvents();
    },
    retrieveRegions() {
      // Temporary hardcoded data - replace API call
      this.regionList = [
        { id: 1, name: 'Region 1' },
        { id: 2, name: 'Region 2' }
      ];
      console.log('Using hardcoded regions:', this.regionList);
    },
    retrieveEvents() {
      const query = {
        q: this.query,
        sort: 'latest',
        page: this.page,
        maxEventsPerPage: 6,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/events?${queryString}`)
        .then((response) => {
          this.EventList = response.data.events.map(event => {
            return {
              ...event,
              // eslint-disable-next-line camelcase
              series_name: event.series?.name ?? '',
              // eslint-disable-next-line camelcase
              region_name: event.region?.name ?? '',
              // eslint-disable-next-line camelcase
              agegroup_name: event.agegroup?.name ?? '',
              date: this.formattedDate(event.event_date),
              eventmatch: event.eventmatch.map(match => {
                return {
                  ...match,
                  matchtime: this.AMPMformat(event.time),
                  // eslint-disable-next-line camelcase
                  field: match.field?.name ?? 'Unknown',
                };
              })
            };
          });
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
    },
  }
};
</script>

<style scoped>
.superheadline {
color: aliceblue;
}
select option {
  background-color: #333131; /* Change to your desired background color */
}
</style>
