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
            class="rounded bg-white"
            :events="EventDates"
            >
          </ODatepicker>
          </div>
          <div class="col-span-1"></div>
          <div
          class="col-span-1 flex items-center justify-end lg:justify-center"
          >
            <label class="font-semibold text-[#555555]">
              Show Submitted
              <input
              id="submitted" v-model="submit"
              type="checkbox"
              />
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
            :data="filteredMatches"
            @match-data="openManageResultDialog"
            @submit-data="openSubmitResultDialog"
            @edit-data="openManageResultDialog"
            />
          </section>
          <section
          v-if="MatchList.length === 0"
          class="col-span-1 flex h-60 items-center
          justify-center font-semibold
          text-[#555555] md:col-span-3"
          >
          Nothing Pending Today
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
    <SubmitResultModal
    :active="showSubmitResultModal"
    :match="selectedMatch"
    @close="closeSubmitResultDialog"
    @confirm="SubmitSuccess"
    @error="SubmitError"
    />
  </div>
</template>

<script>
import CustomVueTable from '~/components/tables/CustomVueTable.vue';
import ManageResultModal from '~/components/modals/ManageResultModal.vue';
import SubmitResultModal from '~/components/modals/SubmitResultModal.vue';

export default {
  components: {
    CustomVueTable,
    ManageResultModal,
    SubmitResultModal,
  },
  props: {
    Matches: {
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
      dateFilter: null,
      submit: false,
      showCustomVueTable: false,
      showManageResultModal: false,
      showSubmitResultModal: false,
      showModifyResultModal: false,
      selectedMatch: ({}),
      MatchList: [],
      Data: [],
      selectedData: [],
      dataColumns: [
        { name: 'event_date', label: 'Date' },
        { name: 'matchtime', label: 'Time' },
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
  computed: {
    EventDates() {
      return this.Matches.map(event =>
        ({ date: new Date(event.date), type: event.submit?'danger':'success' }));
    },
    filteredMatches() {
      return this.MatchList.filter(match =>
        match && typeof match.submit === 'boolean' ?
          match.submit === this.submit :
          false
      );
    }
  },
  watch: {
    dateFilter: {
      handler(newDate) {
        this.retrieveEvents();
      },
      immediate: true,
    },
  },
  methods: {
    convertTo12HourFormat(timeString) {
      const [ hour, minute ] = timeString.split(':');
      const period = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = (hour % 12) || 12; // Convert 0 to 12
      return `${formattedHour}:${minute} ${period}`;
    },
    openManageResultDialog(data) {
      this.selectedMatch = data
      this.showManageResultModal = true
    },
    openSubmitResultDialog(data) {
      if (data.team1_score === 0 && data.team2_score ===0) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Please add a score before proceeding.',
          position: 'bottom',
          variant: 'info',
          queue: true
        })
        this.selectedMatch = data
        this.showManageResultModal = true
      } else {
        this.selectedMatch = data
        this.showSubmitResultModal = true
      }
    },
    openModifyResultDialog(data) {
      this.selectedMatch = data
      this.showModifyResultModal = true
    },
    closeManageResultDialog(data) {
      this.selectedMatch = ({})
      this.showManageResultModal = false
    },
    closeSubmitResultDialog(data) {
      this.selectedMatch = ({})
      this.showSubmitResultModal = false
    },
    closeModifyResultDialog(data) {
      this.selectedMatch = ({})
      this.showModifyResultModal = false
    },
    ManageResult(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Score Updated',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showManageResultModal = false;
      this.getEvents();
      this.retrieveEvents();
    },
    SubmitSuccess(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Result Submitted',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showSubmitResultModal = false
      this.getEvents();
      this.retrieveEvents();
    },
    ModifyResult(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Result Updated',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showModifyResultModal = false;
      // this.retrieveEvents();
    },
    SubmitError(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Submission Fail',
        position: 'bottom',
        variant: 'danger',
        queue: true
      })
      this.showSubmitResultModal = false
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
      return `${day}/${month}/${year.toString().slice(-2)}`;
    },
    retrieveEvents() {
      let eventYear = this.dateFilter ? this.dateFilter.getUTCFullYear() : null;
      let eventMonth = this.dateFilter ?
        (this.dateFilter.getUTCMonth() + 1) : null;
      let eventDay = this.dateFilter ?
        (this.dateFilter.getUTCDate()): null;

      // Increment the day by 1
      eventDay++;

      // Get the last day of the current month
      const lastDayOfMonth = new Date(eventYear, eventMonth, 0).getDate();

      if (eventDay > lastDayOfMonth) {
        eventDay = 1;
        eventMonth++;

        if (eventMonth === 13) {
          eventMonth = 1;
          eventYear++;
        }
      }

      const eventMonthStr = eventMonth? eventMonth.toString().padStart(2, '0') : null;
      const eventDayStr = eventDay? eventDay.toString().padStart(2, '0') : null;

      // eslint-disable-next-line camelcase
      let event_date = null
      if (eventYear && eventMonthStr && eventDayStr) {
        // eslint-disable-next-line camelcase, no-const-assign
        event_date = `${eventYear}-${eventMonthStr}-${eventDayStr}`;
      }

      const query = {
        q: this.query,
        sort: 'latest',
        page: this.page,
        // eslint-disable-next-line camelcase
        eventDate: event_date,
        submit: this.submit,
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
                  matchtime: this.convertTo12HourFormat(match.match_time),
                  // eslint-disable-next-line camelcase
                  event_date: this.formattedDate(event.event_date),
                  date: event.event_date,
                  // eslint-disable-next-line camelcase
                  field: match.field.name??'Unknown',
                  submit: match.submitted === 1
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
