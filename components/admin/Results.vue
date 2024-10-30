<template>
  <div>
    <div class="bg-[#1A1A1B]" data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-4 p-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div class="flex flex-col">
            <div class="flex items-center justify-between">
              <span
                class="text-lg
                font-bold
                text-[#555555]"
                >
                Select Date
              </span>
              <span
                v-if="dateFilter"
                class="cursor-pointer
                text-xs
                text-red-400
                hover:text-sm
                hover:text-red-500
                "
                @click="clearDate"
                >
                Clear
              </span>
            </div>
            <ODatepicker
              v-model="dateFilter"
              placeholder="Click to select..."
              icon="calendar"
              class="rounded bg-white"
              :events="EventDates"
            >
            </ODatepicker>
          </div>
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
          class="col-span-1 flex items-end justify-end lg:justify-center"
          >
            <label
            class="font-semibold text-[#555555] h-9 flex items-center gap-2"
            >
              Show Submitted
              <input
              id="submitted" v-model="submit"
              type="checkbox"
              />
            </label>
          </div>
          <section
          class="
          col-span-1
          flex h-60
          items-center
          justify-center
          md:col-span-3"
          v-if="isLoading"
          >
            <VProgressCircular
              :size="200"
              :width="15"
              color="green"
              indeterminate
            >
            </VProgressCircular>
          </section>
          <section
          v-else
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
    // eslint-disable-next-line vue/prop-name-casing
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
      query: null,
      dateFilter: new Date(),
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
        { name: 'series', label: 'Series' },
        { name: 'agegroup_id', label: 'Age Group' },
        { name: 'round', label: 'Match Round' },
        { name: 'field', label: 'Field' },
        { name: 'team1', label: 'Team 1' },
        { name: 'team1_score', label: 'Points' },
        { name: 'team2', label: 'Team 2' },
        { name: 'team2_score', label: 'Points' },
        { name: 'action', label: '' },
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
      ],
      matchRoundOption: [
        { text: 'Round', value: 'round' },
        { text: 'Semi', value: 'semi' },
        { text: 'Final', value: 'final' },
        { text: 'Pool A Round', value: 'pool_a_round' },
        { text: 'Pool B Round', value: 'pool_b_round' },
        { text: 'Pool C Round', value: 'pool_c_round' },
        { text: 'Pool D Round', value: 'pool_d_round' },
        { text: 'Pool A Semi', value: 'pool_a_semi' },
        { text: 'Pool B Semi', value: 'pool_b_semi' },
        { text: 'Pool C Semi', value: 'pool_c_semi' },
        { text: 'Pool D Semi', value: 'pool_d_semi' },
        { text: 'Pool A Grand Final', value: 'pool_a_grand_final' },
        { text: 'Pool B Grand Final', value: 'pool_b_grand_final' },
        { text: 'Pool C Grand Final', value: 'pool_c_grand_final' },
        { text: 'Pool D Grand Final', value: 'pool_d_grand_final' },
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
      isLoading: false
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
    roundFormat(round) {
      // eslint-disable-next-line camelcase
      const matched = this.matchRoundOption.find(data => data.value === round);
      if (matched) {
        return matched.text;
      } else {
        // If no matching field is found, return "unknown"
        return 'Unknown';
      }
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
        message: 'The result has already been submitted.',
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
      this.isLoading = true
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
            const ageGroupName = event.agegroup.name;
            const time = event.time;
            return {
              ...event,
              date: this.formattedDate(event.event_date),
              // eslint-disable-next-line camelcase
              eventmatch: event.eventmatch.map(match => {
                return {
                  ...match,
                  series: event.series.name??'Unknown',
                  matchtime: this.AMPMformat(time),
                  round: this.roundFormat(event.round),
                  // eslint-disable-next-line camelcase
                  agegroup_id: ageGroupName,
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
          this.isLoading = false
        });
    },
    clearDate() {
      this.dateFilter = null;
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
