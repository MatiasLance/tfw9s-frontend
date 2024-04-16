<template>
<div>
  <div class="bg-[#1A1A1B]" data-aos="fade-up">
    <section class="mx-auto max-w-screen-xl gap-4 p-4">
      <div class="grid grid-cols-1 gap-4">
        <div class="col-span-1 flex items-center">
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
          @click="openAddFixingDialog"
        >
          +
        </button>
        </div>
        <div
        v-if="totalPages > 0"
        class="col-span-1 flex flex-wrap items-center
        justify-around gap-x-2 md:justify-between"
        data-aos="flip-up"
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
        class="col-span-1 overflow-x-auto
        overflow-y-hidden md:overflow-x-hidden"
        >
          <div class="grid min-w-[640px] grid-cols-1 gap-2">
            <div
            v-for="(event) in EventList"
            :key="event.id"
            class="col-span-1 mb-0.5 gap-0 border-2 border-gray-500"
            data-aos="fade-up" data-aos-offset="0"
            >
              <Form class="grid grid-cols-3 gap-2 p-2">
                <div
                class="col-span-1 m-auto flex
                items-center text-lg font-semibold
                text-white"
                >
                  <i class="ri-calendar-event-fill mr-2 text-2xl"></i>
                  {{ calendarDate(event.date) }}
                </div>
                <div
                class="col-span-1 m-auto text-center
                text-lg font-semibold
                text-white"
                >
                  {{ event.manager_name }}
                </div>
                <div
                class="col-span-1 m-auto text-center
                text-lg font-semibold
                text-white"
                >
                  {{ event.field_name }}
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
              </Form>
            </div>
          </div>
        </section>
        <section
        v-if="totalPages=== 0"
        class="col-span-1 flex h-60 items-center
        justify-center font-semibold
        text-[#555555] md:col-span-3"
        >
        No event saved yet
        </section>
      </div>
    </section>
  </div>
  <AddFixingModal
  :active="showAddFixingModal"
  :managers="ManagerList"
  :fields="FieldList"
  :agegroup="AgeGroupList"
  :teams="TeamList"
  @close="closeAddFixingDialog"
  @confirm="AddFixing"
  />
  <EditFixingModal
  :active="showEditFixingModal"
  :managers="ManagerList"
  :fields="FieldList"
  :agegroup="AgeGroupList"
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
import AddFixingModal from '~/components/modals/AddFixingModal.vue';
import EditFixingModal from '~/components/modals/EditFixingModal.vue';
import DeleteFixingModal from '~/components/modals/DeleteFixingModal.vue';
export default {
  components: {
    CustomVueTable,
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
    reformatTime(timeString) {
      const [
        hours,
        minutes
      ] = timeString.split(':');
      const formattedTime = `${hours}:${minutes}`;
      return formattedTime;
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
      return `${month}/${day}/${year.toString().slice(-2)}`;
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
              manager_name: `${event.manager.user.first_name}
               ${event.manager.user.last_name}`,
              // eslint-disable-next-line camelcase
              field_name: event.field.name,
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