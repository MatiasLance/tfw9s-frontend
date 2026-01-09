<!-- eslint-disable tailwindcss/classnames-order -->
<template>
  <div>
    <div data-aos="fade-up">
      <section
      class="mx-auto max-w-full gap-4 p-4
      grid grid-cols-1 md:grid-cols-3"
      >
          <div class="flex flex-col">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <i class="ri-calendar-check-line text-lg text-[#555555]"></i>
                <span class="text-lg font-bold text-[#555555]">
                  Select Date
                </span>
              </div>
              
              <button
              type="button"
                v-if="dateFilter"
                @click="clearDate"
                class="flex items-center gap-2 px-3 py-1 rounded-full
                cursor-pointer bg-red-50 text-red-500 hover:bg-red-100
                hover:text-red-600 transition-all duration-200 group"
              >
                <i class="ri-close-line text-sm group-hover:scale-110"></i>
                <span class="text-xs font-semibold">
                  Clear Filter
                </span>
              </button>
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
           class="col-span-1 flex items-end justify-between"
          @submit.prevent="retrieveEvents"
          >
            <input
            id="query"
            v-model="query"
            placeholder="Search..."
            type="text"
            class="h-9 flex-1 rounded-l"
            solo
            />
            <button
            type="submit"
            class="h-9 rounded-r bg-gradient-to-tr
            from-[#5EE738] via-[#3e872a] to-[#050505]
            px-4
            text-xl
            font-semibold
            text-white"
            >
            <i class="ri-search-line"/>
            </button>
          </form>
          <div
          class="col-span-1 flex items-end justify-end lg:justify-center"
          >
            <label
            class="flex h-9 items-center gap-2 font-semibold text-[#555555]"
            >
              Show Submitted
              <input
              id="submitted" v-model="submit"
              type="checkbox"
              />
            </label>
          </div>

          <div
            v-if="totalPages > 0"
            class="col-span-3 flex flex-col items-center justify-between
            gap-4 bg-white backdrop-blur-sm rounded-xl
            p-4 sm:flex-row sm:gap-6"
            data-aos="flip-up" 
            data-aos-once="true"
          >
            <div class="flex items-center space-x-2">
              <span class="text-sm font-medium text-black">
                Showing 
                <span class="font-semibold text-black">{{ from }}-{{ to }}</span> 
                of 
                <span class="font-semibold text-black">{{ totalItems }}</span> 
                {{ totalItems === 1 ? 'item' : 'items' }}
              </span>
            </div>

            <VPagination
              v-model="page"
              :length="totalPages"
              color="success"
              :total-visible="7"
              class="text-black"
              dark
              @change="setPage"
              />
          </div>

          <LoadingAnimation
          :is-loading="isLoading"
          loading-title="Results"
          />

          <section
          v-if="!isLoading"
          class="relative col-span-1 md:col-span-3"
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
          v-if="MatchList.length === 0 && !isLoading"
          class="col-span-1 flex h-60 items-center
          justify-center font-semibold
          text-[#555555] md:col-span-3"
          >
          Nothing Pending Today
          </section>
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
import _debounce from 'lodash/debounce';
import CustomVueTable from '~/components/tables/CustomVueTable.vue';
import ManageResultModal from '~/components/modals/ManageResultModal.vue';
import SubmitResultModal from '~/components/modals/SubmitResultModal.vue';
import LoadingAnimation from '~/components/loading/LoadingAnimation.vue';

export default {
  components: {
    CustomVueTable,
    ManageResultModal,
    SubmitResultModal,
    LoadingAnimation
  },
  props: {
    Matches: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      query: null,
      dateFilter: new Date(new Date().setHours(0, 0, 0, 0)),
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
          if (value.length <= 10) {
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
      const filtered = this.MatchList.filter(match =>
        match && typeof match.submit === 'boolean' ?
          match.submit === this.submit :
          false
      );

      return filtered.sort((a, b) => {
        const timeToMinutes = (timeStr) => {
          const [ time, period ] = timeStr.split(' ');
          const [ hours, minutes ] = time.split(':').map(Number);
          let total = hours * 60 + minutes;
          if (period === 'PM' && hours !== 12) {
            total += 12 * 60;
          }
          if (period === 'AM' && hours === 12) {
            total -= 12 * 60;
          }
          return total;
        };

        return timeToMinutes(a.matchtime) - timeToMinutes(b.matchtime);
      });
    }

  },
  watch: {
    dateFilter: {
      handler(newDate) {
        this.retrieveEvents();
      },
      immediate: true,
    },
    page(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.retrieveEvents();
      }
    },
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
  },
  methods: {
    setPage() {
      this.retrieveEvents();
    },
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
      this.retrieveEvents();
    },
    AMPMformat(time) {
      const matched = this.matchTimeOption.find(data => data.value === time);
      if (matched) {
        return matched.text;
      } else {
        return 'Unknown';
      }
    },
    roundFormat(round) {
      const matched = this.matchRoundOption.find(data => data.value === round);
      if (matched) {
        return matched.text;
      } else {
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
      this.retrieveEvents();
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
    retrieveEvents: _debounce(function() {
      this.isLoading = true
      let eventYear = this.dateFilter ? this.dateFilter.getUTCFullYear() : null;
      let eventMonth = this.dateFilter ?
        (this.dateFilter.getUTCMonth() + 1) : null;
      let eventDay = this.dateFilter ?
        (this.dateFilter.getUTCDate()): null;

      eventDay++;

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
        // eslint-disable-next-line camelcase
        event_date = `${eventYear}-${eventMonthStr}-${eventDayStr}`;
      }

      const query = {
        q: this.query,
        sort: 'latest',
        page: this.page,
        // eslint-disable-next-line camelcase
        per_page: this.perPage,
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
                  series: event.series.name || 'Unknown',
                  matchtime: this.AMPMformat(time),
                  round: this.roundFormat(event.round),
                  // eslint-disable-next-line camelcase
                  agegroup_id: ageGroupName,
                  // eslint-disable-next-line camelcase
                  event_date: this.formattedDate(event.event_date),
                  date: event.event_date,
                  // eslint-disable-next-line camelcase
                  field: match.field.name || 'Unknown',
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
    }, 100),
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

input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
  border: 2px solid white;
  width: 25px;
  height: 25px;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
}

input[type="checkbox"]:checked {
  background-color:#e42828;
}

input[type="checkbox"]::after {
  display: inline-block;
  font-size: 14px;
  color: white;
  line-height: 1;
  visibility: hidden;
}

input[type="checkbox"]:checked::after {
  visibility: visible;
}

</style>
