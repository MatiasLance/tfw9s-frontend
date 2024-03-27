<template>
<div>
  <div class="bg-[#1A1A1B]" data-aos="fade-up">
    <section class="mx-auto max-w-screen-xl gap-4 p-4">
      <div class="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div class="col-span-1 sm:col-span-2 flex items-center">
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
          text-white
          sm:w-36"
        >
          +
        </button>
        </div>
        <div
        v-if="totalPages > 0"
        class="col-span-1 sm:col-span-4 sm:flex justify-end"
        data-aos="flip-up"
        >
          <VPagination
            v-model="page"
            :length="totalPages"
            @change="setPage"
            dark
            color="success"
            :total-visible="7"
            class="my-4 text-white"
            />
        </div>
        <section class="col-span-6 overflow-x-auto">
          <div class="min-w-[640px] grid grid-cols-1 gap-2">
            <div
            v-for="(event, index) in EventList"
            :key="index"
            class="col-span-1 mb-0.5 gap-0 border-2 border-gray-500"
            data-aos="fade-up" data-aos-offset="30"
            >
              <Item class="grid grid-cols-3 p-2 gap-2">
                <div
                class="col-span-1 m-auto flex
                text-lg font-medium text-white items-center"
                >
                  <i class="ri-calendar-event-fill mr-2 text-2xl"></i>
                  {{ calendarDate(event.date) }}
                </div>
                <div
                class="col-span-1 m-auto text-center
                text-lg font-medium text-white"
                >
                  {{ event.manager_name }}
                </div>
                <div class="col-span-1">
                  <select
                  v-model="event.field.name"
                  :disabled="true"
                  class="w-full bg-transparent p-1
                  text-center text-lg text-white"
                  >
                    <option
                    v-for="(field, index) in FieldList"
                    :key="index"
                    >{{field.name}}</option>
                  </select>
                </div>
                <div class="col-span-3">
                  <CustomVueTable
                  v-if="showCustomVueTable"
                  :columns="dataColumns"
                  :data="event.eventmatch"
                />
                </div>
                <div class="col-span-3 flex justify-end gap-4">
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
              </Item>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
  <EditFixingModal
  :active="showEditFixingModal"
  :managers="ManagerList"
  :fields="FieldList"
  :teams="TeamList"
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
import CustomVueTable from '~/components/tables/CustomVueTable.vue';
import EditFixingModal from '~/components/modals/EditFixingModal.vue';
import DeleteFixingModal from '~/components/modals/DeleteFixingModal.vue';
export default {
  components: {
    CustomVueTable,
    EditFixingModal,
    DeleteFixingModal,
  },
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    ManagerList: {
      type: Object,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    FieldList: {
      type: Object,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    TeamList: {
      type: Object,
      required: true
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
      perPage: 12,
      totalPages: 0,
      totalItems: 0,
      dataColumns: [
        { name: 'time', label: 'Time' },
        { name: 'team1', label: 'Team 1' },
        { name: 'team2', label: 'Team 2' },
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
      selectedFixing: [],
      showCustomVueTable: true,
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
  created() {
    this.retrieveEvents()
  },
  methods: {
    reformatTime(timeString) {
      const [
        hours,
        minutes
      ] = timeString.split(':');
      const formattedTime = `${hours}:${minutes}`;
      return formattedTime;
    },
    formattedDate(dateString) {
      return new Date(dateString);
    },
    calendarDate(date) {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month}/${day}/${year.toString().slice(-2)}`;
    },
    openEditFixingDialog(data) {
      this.selectedFixing = data
      this.showEditFixingModal = true
    },
    openDeleteFixingDialog(data) {
      this.selectedFixing = data
      this.showDeleteFixingModal = true
    },
    closeEditFixingDialog(data) {
      this.selectedFixing = []
      this.showEditFixingModal = false
    },
    closeDeleteFixingDialog(data) {
      this.selectedFixing = []
      this.showDeleteFixingModal = false
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
    },
    retrieveEvents() {
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        maxEventsPerPage: 10,
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
              manager_name: `${event.manager.user.first_name}
               ${event.manager.user.last_name}`,
              date: this.formattedDate(event.event_date),
              eventmatch: event.eventmatch.map(match => {
                return {
                  ...match,
                  time: this.reformatTime(match.match_time)
                };
              })
            };
          });
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          console.log('Events: ', this.EventList)
          console.log('Date: ', this.EventList.event_date)
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