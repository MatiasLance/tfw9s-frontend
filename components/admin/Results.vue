<template>
  <div>
    <div class="bg-[#1A1A1B]" data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-4 p-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div class="col-span-1">
            <ODatepicker
            v-model="dateFilter"
            placeholder="Click to select..."
            icon="calendar"
            class="bg-black"
            >
          </ODatepicker>
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
          <section
          v-if="showCustomVueTable"
          data-aos="fade-up"
          data-aos-offset="0"
          class="col-span-1 md:col-span-3"
          >
            <CustomVueTable
            :columns="dataColumns"
            :data="MatchList"
            @match-data="openManageResultDialog"
            @submit-data="SubmitResult"
            />
          </section>
        </div>
      </section>
    </div>
    <ManageResultModal
    :active="showManageResultModal"
    :match="selectedMatch"
    @close="closeManageResultDialog"
    @confirm="ManageResult"
    />
  </div>
</template>

<script>
import CustomVueTable from '~/components/tables/CustomVueTable.vue';
import ManageResultModal from '~/components/modals/ManageResultModal.vue';
export default {
  components: {
    CustomVueTable,
    ManageResultModal,
  },
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    FieldList: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      dateFilter: null,
      showCustomVueTable: false,
      showManageResultModal: false,
      selectedMatch: ({}),
      MatchList: [],
      Data: [],
      selectedData: [],
      dataColumns: [
        { name: 'event_date', label: 'Date' },
        { name: 'field', label: 'Field' },
        { name: 'team1', label: 'Team' },
        { name: 'team1_score', label: 'Points' },
        { name: 'team2', label: 'Team' },
        { name: 'team2_score', label: 'Points' },
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
  watch: {
    dateFilter: {
      handler(newDate) {
        this.retrieveEvents()
      },
      immediate: true,
    },
  },
  methods: {
    SubmitResult(data) {
      console.log('Submited Data: ', data)
    },
    openManageResultDialog(data) {
      this.selectedMatch = data
      this.showManageResultModal = true
    },
    closeManageResultDialog(data) {
      this.selectedMatch = ({})
      this.showManageResultModal = false
    },
    ManageResult(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Fixing Deleted',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showManageResultModal = false;
      this.retrieveEvents();
    },
    getCurrentDate() {
      const currentDate = new Date();
      return new Date(currentDate.getFullYear(),
        currentDate.getMonth(), currentDate.getDate());
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
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month}/${day}/${year.toString().slice(-2)}`;
    },
    calendarDate(date) {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month}/${day}/${year.toString().slice(-2)}`;
    },
    // eslint-disable-next-line camelcase
    findField(field_id) {
      // eslint-disable-next-line camelcase
      const foundField = this.FieldList.find(field => field.id === field_id);
      if (foundField) {
        return foundField.name;
      } else {
        // If no matching field is found, return "unknown"
        return 'Unknown';
      }
    },
    retrieveEvents() {
      // eslint-disable-next-line max-len, vue/max-len
      const eventYear = this.dateFilter ? this.dateFilter.getUTCFullYear() : null;
      const eventMonth = this.dateFilter ? (this.dateFilter.getUTCMonth() + 1).toString().padStart(2, '0') : null;
      const eventDay = this.dateFilter ? (this.dateFilter.getUTCDate() + 1).toString().padStart(2, '0') : null;
      // eslint-disable-next-line camelcase, max-len, vue/max-len
      const event_date = this.dateFilter ?`${eventYear}-${eventMonth}-${eventDay}`: null;
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        // eslint-disable-next-line camelcase
        eventDate: event_date,
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
          const EventList = response.data.events.map(event => {
            return {
              ...event,
              // eslint-disable-next-line camelcase
              manager_name: `${event.manager.user.first_name}
               ${event.manager.user.last_name}`,
              date: this.formattedDate(event.event_date),
              eventmatch: event.eventmatch.map(match => {
                return {
                  ...match,
                  time: this.reformatTime(match.match_time),
                  // eslint-disable-next-line camelcase
                  event_date: this.formattedDate(event.event_date),
                  // eslint-disable-next-line camelcase
                  field: this.findField(event.field_id)
                };
              })
            };
          });
          this.MatchList = EventList.flatMap(data => {
            return data.eventmatch;
          });
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          this.showCustomVueTable = true;
        });
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