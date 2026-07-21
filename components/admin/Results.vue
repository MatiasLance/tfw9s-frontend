<template>
  <div>
    <div data-aos="fade-up">
      <section class="mx-auto max-w-full p-4">
        <!-- ==================== FILTER BAR ==================== -->
        <div class="flex items-end gap-4" style="flex-wrap: wrap;">
          <!-- 1. Date picker -->
          <div class="flex flex-col min-w-[200px] flex-1">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <i class="ri-calendar-check-line text-lg text-gray-600"></i>
                <span class="text-sm font-bold text-gray-600 uppercase tracking-wide">Date</span>
              </div>
              <button
                v-if="dateFilter"
                type="button"
                @click="clearDate"
                class="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                       bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
              >
                <i class="ri-close-line text-xs"></i> Clear
              </button>
            </div>
            <ODatepicker
              v-model="dateFilter"
              placeholder="Select date..."
              icon="calendar"
              class="rounded bg-white w-full"
              :events="eventDates"
            />
          </div>

          <!-- 2. Search input -->
          <form class="flex flex-col min-w-[180px] flex-1" @submit.prevent="applyFilters">
            <label class="text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">Search</label>
            <div class="flex h-9">
              <input
                v-model="query"
                placeholder="Search..."
                type="text"
                class="flex-1 rounded-l bg-gray-100 px-3 text-sm border-none outline-none"
              />
              <button
                type="submit"
                class="rounded-r bg-gradient-to-tr from-[#5EE738] via-[#3e872a] to-[#050505] px-4 text-white"
              >
                <i class="ri-search-line text-white"></i>
              </button>
            </div>
          </form>

          <!-- 3. Series select -->
          <form class="flex flex-col min-w-[180px] flex-1" @submit.prevent="applyFilters">
            <label class="text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">Series</label>
            <div class="flex h-9">
              <select
                v-model="series"
                class="flex-1 rounded-l bg-gray-100 px-3 text-sm border-none outline-none"
              >
                <option disabled value="">Select series...</option>
                <option v-for="s in seriesList" :key="s.id" :value="s.id">
                  {{ s.name }}
                </option>
              </select>
              <button
                v-if="series"
                type="button"
                class="bg-gray-100 px-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                @click="clearSearchSeriesName"
              >
                <i class="ri-close-line"></i>
              </button>
              <button
                type="submit"
                class="rounded-r bg-gradient-to-tr from-[#5EE738] via-[#3e872a] to-[#050505] px-4 text-white"
              >
                <i class="ri-search-line text-white"></i>
              </button>
            </div>
          </form>

          <!-- 4. Show Submitted checkbox -->
            <div class="flex items-center pb-1 min-w-[140px]">
            <label class="flex items-center gap-2 text-sm font-bold text-gray-600 uppercase tracking-wide cursor-pointer">
              <input v-model="submit" type="checkbox" class="w-4 h-4" @change="filterSubmittedResults" />
              Show Submitted
            </label>
          </div>
        </div>

        <!-- ==================== PAGINATION & RESULTS ==================== -->
        <div
          v-if="totalPages > 0"
          class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between 
                 bg-gradient-to-br from-gray-800 to-gray-900 
                 rounded-2xl p-6 border border-green-500/20 shadow-lg"
          data-aos="flip-up"
        >
          <div class="flex items-center gap-3">
            <div class="bg-green-600/20 rounded-lg p-2">
              <i class="ri-list-check text-green-400 text-lg"></i>
            </div>
            <span class="text-gray-300 font-medium">
              Showing <span class="font-bold text-green-400">{{ from }}-{{ to }}</span>
              of <span class="font-bold text-green-400">{{ totalItems }}</span> results
            </span>
          </div>
          
          <VPagination
            v-model="page"
            :length="totalPages"
            :total-visible="7"
            class="text-white"
            color="success"
            dark
          />
        </div>

        <!-- ==================== LOADING ==================== -->
        <LoadingAnimation
          v-if="isLoading"
          :is-loading="isLoading"
          loading-title="Results"
        />

        <!-- ==================== TABLE ==================== -->
        <section v-if="!isLoading" class="relative mt-6">
          <CustomVueTable
            :columns="dataColumns"
            :data="filteredMatches"
            @match-data="openManageResultDialog"
            @submit-data="openSubmitResultDialog"
            @edit-data="openManageResultDialog"
            @revert-data="openRevertResultModal"
          />
        </section>

        <!-- ==================== EMPTY STATE ==================== -->
        <div v-if="matchList.length === 0 && !isLoading" class="mt-6">
          <BaseEmptyState
            title="Nothing Pending Today"
            description="We couldn't find anything matching your current filters. Try adjusting your search or removing some filters."
            icon="ri-checkbox-circle-line"
            :show-button="false"
          />
        </div>
      </section>
    </div>

    <!-- ==================== MODALS ==================== -->
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

    <RevertResultModal
      :active="showRevertResultModal"
      :match="selectedMatch"
      @close="closeRevertResultModal"
      @confirm="manageRevertResultResponse"
    />
  </div>
</template>

<script>
import _debounce from 'lodash/debounce';
import CustomVueTable from '~/components/tables/CustomVueTable.vue';
import ManageResultModal from '~/components/modals/ManageResultModal.vue';
import SubmitResultModal from '~/components/modals/SubmitResultModal.vue';
import LoadingAnimation from '~/components/loading/LoadingAnimation.vue';
import RevertResultModal from '~/components/modals/RevertResultModal.vue';

export default {
  components: {
    CustomVueTable,
    ManageResultModal,
    SubmitResultModal,
    LoadingAnimation,
    RevertResultModal
  },
  props: {
    matches: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      query: null,
      series: null,
      dateFilter: new Date(new Date().setHours(0, 0, 0, 0)),
      submit: false,
      showCustomVueTable: false,
      showManageResultModal: false,
      showSubmitResultModal: false,
      showModifyResultModal: false,
      showRevertResultModal: false,
      selectedMatch: ({}),
      matchList: [],
      Data: [],
      selectedData: [],
      seriesList: [],
      dataColumns: [
        { name: 'event_date', label: 'Date' },
        { name: 'matchTime', label: 'Time' },
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
      isLoading: false,
      requestSequence: 0,
    };
  },
  computed: {
    eventDates() {
      return this.matches.map(event =>
        ({ date: new Date(event.date), type: event.submit?'danger':'success' }));
    },

    filteredMatches() {
      return [ ...this.matchList ].sort((a, b) => {
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

        return timeToMinutes(a.matchTime) - timeToMinutes(b.matchTime);
      });
    }

  },
  watch: {
    dateFilter: {
      handler(newDate) {
        this.applyFilters();
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
        this.page = Math.max(this.totalPages, 1)
      }
    },
  },
  mounted() {
    this.loadSeries()
  },
  methods: {
    applyFilters() {
      if (this.page !== 1) {
        this.page = 1;
      } else {
        this.retrieveEvents();
      }
    },
    filterSubmittedResults() {
      this.applyFilters();
    },
    clearSearchSeriesName() {
      this.series = '';
      if (this.page !== 1) {
        this.page = 1;
      } else {
        this.retrieveEvents();
      }
    },
    convertTo12HourFormat(timeString) {
      const [ hour, minute ] = timeString.split(':');
      const period = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = (hour % 12) || 12;
      return `${formattedHour}:${minute} ${period}`;
    },
    openRevertResultModal(data) {
      this.selectedMatch = data
      this.showRevertResultModal = true
    },
    openManageResultDialog(data) {
      this.selectedMatch = data
      this.showManageResultModal = true
    },
    openSubmitResultDialog(data) {
      this.selectedMatch = data
      this.showSubmitResultModal = true
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
    closeRevertResultModal() {
      this.selectedMatch = ({})
      this.showRevertResultModal = false
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
    manageRevertResultResponse(response) {
      this.$oruga.notification.open({
        duration: 5000,
        message: response.title || response.message || 'Result reverted successfully',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showRevertResultModal = false;
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
      if (!dateString) return 'Unknown';

      const date = new Date(dateString);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${day}/${month}/${year.toString().slice(-2)}`;
    },
    retrieveEvents: _debounce(function() {
      this.isLoading = true
      
      const requestId = ++this.requestSequence;
      const eventYear = this.dateFilter ? this.dateFilter.getFullYear() : null;
      const eventMonth = this.dateFilter ? (this.dateFilter.getMonth() + 1) : null;
      const eventDay = this.dateFilter ? this.dateFilter.getDate() : null;

      const eventMonthStr = eventMonth? eventMonth.toString().padStart(2, '0') : null;
      const eventDayStr = eventDay? eventDay.toString().padStart(2, '0') : null;

      let event_date = null
      if (eventYear && eventMonthStr && eventDayStr) {
        event_date = `${eventYear}-${eventMonthStr}-${eventDayStr}`;
      }

      const query = {
        q: this.query,
        series_id: this.series,
        sort: 'latest',
        page: this.page,
        maxEventMatchesPerPage: this.perPage,
        event_date: event_date,
        status: this.submit ? 'complete' : 'upcoming',
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()
      this.$axios
        .$get(`v1/eventmatches?${queryString}`)
        .then((response) => {
          if (requestId !== this.requestSequence) return;

          this.matchList = response.data.eventMatches.map(match => {
            const event = match.event || {};
            return {
              ...match,
              series: event.series ? event.series.name : 'Unknown',
              matchTime: this.convertTo12HourFormat(event.time || '00:00'),
              round: this.roundFormat(event.round),
              agegroup_id: event.agegroup ? event.agegroup.name : 'Unknown',
              event_date: this.formattedDate(event.event_date),
              field: match.field ? match.field.name : 'Field TBA',
              submit: !!match.submitted,
            };
          });
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.total_items ? response.data.from : 0;
          this.to = response.data.to;
        })
        .catch(() => {
          if (requestId !== this.requestSequence) return;

          this.$oruga.notification.open({
            duration: 5000,
            message: 'Results could not be loaded. Please try again.',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
        .finally(() => {
          if (requestId !== this.requestSequence) return;

          this.showCustomVueTable = true;
          this.isLoading = false
        });
    }, 100),

    clearDate() {
      this.dateFilter = null;
    },

    async loadSeries() {
      if (this.seriesList.length) return
      const r = await this.$axios.$get(`v1/series/names`)
      this.seriesList = r.series
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
