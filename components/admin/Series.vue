<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
  <div data-aos="fade-up">
    <section class="mx-auto max-w-screen-xl gap-4 p-4">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-3">

        <div
          class="
            col-span-1 flex flex-col
            items-center gap-2
            md:col-span-3 md:flex-row"
          >
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
              @click="openAddSeriesDialog"
          >
            +
          </button>

          <button
            type="button"
            class="
              w-full rounded-md
              bg-gradient-to-br
              from-[#5EE738] via-[#3e872a]
              to-[#050505] py-1.5
              text-center
              text-white
              sm:w-36"
              @click="openEditThumbnailDialog"
          >
            Edit Thumbnail
          </button>
        </div>

        <div class="col-span-1 md:col-span-2"></div>

        <VSelect
        v-model="ActiveTab"
        :items="SeriesTabs"
        label="Select Event Year"
        solo
        class="col-span-1"
        />

        <div
          v-if="totalPages > 0"
          class="col-span-1 flex flex-wrap items-center justify-around
          gap-x-2 md:col-span-3 md:justify-between"
          data-aos="flip-up" data-aos-once="true"
        >
          <span class="font-medium text-white">
            Showing {{ from }}-{{ to }} of {{ totalItems }} items
          </span>

          <VPagination
            v-model="page"
            :length="totalPages"
            color="success"
            :total-visible="7"
            class="text-white"
            dark
            @change="setPage"
            />
        </div>

        <section
          class="col-span-1 overflow-y-hidden overflow-x-scroll
          md:col-span-3 md:overflow-x-hidden"
        >
          <div
            v-if="seriesList && seriesList.length > 0"
            class="grid min-w-[640px] grid-cols-1 gap-6"
          >
            <div
              v-for="data in seriesList"
              :key="data.id"
              class="col-span-1 overflow-hidden rounded-2xl bg-gradient-to-br
              from-gray-900 via-green-900 to-gray-800 p-6 text-white
              shadow-2xl transition-all duration-300 hover:scale-105
              hover:shadow-green-500/20 border-2 border-green-600/30"
              data-aos="fade-up" data-aos-offset="0"
            >
              <!-- Header Section -->
              <div class="mb-4 flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3">
                    <!-- Status Indicator -->
                    <div class="flex items-center gap-2">
                      <div 
                        :class="[
                          'size-3 rounded-full ring-2 ring-white',
                          data.is_paused ? 'bg-amber-500' : 'bg-green-500'
                        ]"
                      ></div>
                      <span 
                        :class="[
                          'text-sm font-semibold',
                          data.is_paused ? 'text-amber-300' : 'text-green-300'
                        ]"
                      >
                        {{ data.is_paused ? 'Paused' : 'Active' }}
                      </span>
                    </div>
                    
                    <!-- Series Name -->
                    <h3 class="text-xl font-bold text-white truncate flex-1">
                      {{ data.name }}
                    </h3>
                  </div>
                  
                  <!-- Date Range -->
                  <div class="mt-2 flex items-center gap-2 text-green-300">
                    <i class="ri-calendar-event-line text-sm"></i>
                    <span class="text-sm font-medium">
                      {{ DateRange(data.start, data.end) }}
                    </span>
                  </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="flex gap-2 mr-2">
                  <!-- Pause/Resume Toggle -->
                  <button
                    type="button"
                    v-if="!data.is_paused"
                    @click="pauseSeries(data.id)"
                    class="flex items-center gap-1 rounded-full bg-amber-500/20
                    px-3 py-1.5 text-xs font-semibold text-amber-300 transition-all
                    hover:bg-amber-500/30 hover:shadow-lg"
                    title="Pause Series"
                  >
                    <i class="ri-pause-circle-line"></i>
                    Pause
                  </button>
                  <button
                    type="button"
                    v-if="data.is_paused"
                    @click="resumeSeries(data.id)"
                    class="flex items-center gap-1 rounded-full bg-green-500/20
                    px-3 py-1.5 text-xs font-semibold text-green-300 transition-all
                    hover:bg-green-500/30 hover:shadow-lg"
                    title="Resume Series"
                  >
                    <i class="ri-play-circle-line"></i>
                    Resume
                  </button>
                </div>
              </div>

              <!-- Content Section -->
              <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <!-- Description & Location -->
                <div class="col-span-1 lg:col-span-2 space-y-4">
                  <!-- Description -->
                  <div class="rounded-xl bg-black/30 p-4 backdrop-blur-sm">
                    <div class="flex items-center gap-2 mb-2">
                      <i class="ri-file-text-line text-green-400"></i>
                      <span class="text-sm font-semibold text-green-300">
                        About this Series
                      </span>
                    </div>
                    <p class="text-gray-200 leading-relaxed line-clamp-3"
                      v-html="data.description">
                    </p>
                  </div>

                  <!-- Location -->
                  <div class="flex items-center gap-3 rounded-xl bg-black/30 p-4
                  backdrop-blur-sm">
                    <i class="ri-map-pin-2-line text-xl text-green-400"></i>
                    <div>
                      <p class="text-sm font-semibold text-green-300">
                        Location
                      </p>
                      <p class="text-gray-200">
                        {{ data.address || 'Location not specified' }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="col-span-1 lg:col-span-1 space-y-3">
                  <!-- Manage Teams -->
                  <BaseButton
                    v-show="ActiveTab === 'weekly' || ActiveTab === 'coast' 
                    || ActiveTab === 'tournament'"
                    class="w-full justify-center rounded-xl bg-blue-600/90 px-4 py-3
                    text-sm font-semibold text-white transition-all hover:bg-blue-500
                    hover:shadow-lg hover:scale-105"
                    @click="openWeeklyTeamsDialog(data)"
                  >
                    <i class="ri-team-line mr-2"></i>
                    Manage Teams
                  </BaseButton>

                  <!-- Add Player (Tuggerah Specific) -->
                  <BaseButton
                    v-if="ActiveTab === 'coast' && data.name.toLowerCase().includes('tuggerah')"
                    class="w-full justify-center rounded-xl bg-purple-600/90 px-4 py-3
                    text-sm font-semibold text-white transition-all hover:bg-purple-500
                    hover:shadow-lg hover:scale-105"
                    @click="openAddPlayerDialog"
                  >
                    <i class="ri-user-add-line mr-2"></i>
                    Add Player
                  </BaseButton>

                  <!-- Team Limit -->
                  <BaseButton
                    v-show="ActiveTab === 'tournament' || ActiveTab === 'coast'"
                    class="w-full justify-center rounded-xl bg-amber-600/90 px-4 py-3
                    text-sm font-semibold text-white transition-all hover:bg-amber-500
                    hover:shadow-lg hover:scale-105"
                    @click="openTeamLimitDialog(data)"
                  >
                    <i class="ri-group-line mr-2"></i>
                    Team Limit
                  </BaseButton>

                  <!-- Edit Series -->
                  <BaseButton
                    class="w-full justify-center rounded-xl bg-green-600/90 px-4 py-3
                    text-sm font-semibold text-white transition-all hover:bg-green-500
                    hover:shadow-lg hover:scale-105"
                    @click="openEditSeriesDialog(data)"
                  >
                    <i class="ri-pencil-line mr-2"></i>
                    Edit Series
                  </BaseButton>

                  <!-- Delete Series -->
                  <BaseButton
                    class="w-full justify-center rounded-xl bg-red-600/90 px-4 py-3
                    text-sm font-semibold text-white transition-all hover:bg-red-500
                    hover:shadow-lg hover:scale-105"
                    @click="openDeleteSeriesDialog(data)"
                  >
                    <i class="ri-delete-bin-line mr-2"></i>
                    Delete Series
                  </BaseButton>

                  <BaseButton
                    v-show="ActiveTab === 'tournament' || ActiveTab === 'coast'"
                    class="w-full justify-center rounded-xl bg-indigo-600 px-4 py-3
                    text-sm font-semibold text-white transition-all hover:bg-indigo-700
                    hover:shadow-lg hover:scale-105"
                    @click="handleOpenRegistrationStatusModal(data)"
                  >
                    Registration Setting
                  </BaseButton>

                  <BaseButton
                    v-show="ActiveTab === 'tournament' || ActiveTab === 'coast'"
                    class="w-full justify-center rounded-xl bg-emerald-600 px-4 py-3
                    text-sm font-semibold text-white transition-all hover:bg-emerald-700
                    hover:shadow-lg hover:scale-105"
                    :disabled="Boolean(data.is_paused)"
                    @click="handleOpenCheckRegistrationStatusModal(data)"
                  >
                    Check Registration Status
                  </BaseButton>

                </div>
              </div>

              <!-- Rugby Field Decoration -->
              <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r
              from-transparent via-green-500 to-transparent opacity-50"></div>
            </div>
          </div>
        </section>

        <section
        v-if="totalPages === 0"
        class="col-span-1 flex h-60 items-center
        justify-center font-semibold
        text-[#555555] md:col-span-3"
        >
        No Series Available
        </section>
      </div>
    </section>
  </div>
  <AddPlayersModal
  :active="showAddPlayersModal"
  :agegroup="ageGroups"
  :teams="players"
  @close="closeAddPlayerDialog"
  @confirm="confirmAddedPlayer"
  />
  <AddSeriesModal
  :active="showAddSeriesModal"
  :agegroup="ageGroups"
  :teams="teams"
  @close="closeAddSeriesDialog"
  @confirm="AddSeries"
  />
  <ManageTeamLimitModal
  :active="showTeamLimitModal"
  :agegroup="ageGroups"
  :seriesid="seriesid"
  @close="closeTeamLimitDialog"
  @confirm="EditTeamLimit"
  />
  <ManageWeeklySeriesTeamsModal
  :active="showWeeklyTeamsModal"
  :selected="selected"
  :agegroup="ageGroups"
  @close="closeWeeklyTeamsDialog"
  />
  <EditSeriesModal
  :active="showEditSeriesModal"
  :agegroup="ageGroups"
  :teams="teams"
  :series="selecetedData"
  @close="closeEditSeriesDialog"
  @confirm="EditSeries"
  />
  <EditThumbnailModal
  :active="showEditThumbnailModal"
  :series="selecetedData"
  @close="closeEditThumbnailDialog"
  @confirm="EditThumbnail"
  />
  <DeleteSeriesModal
  :active="showDeleteSeriesModal"
  :agegroup="ageGroups"
  :teams="teams"
  :series="selecetedData"
  @close="closeDeleteSeriesDialog"
  @confirm="DeleteSeries"
  />

  <RegistrationStatusModal
    :active="openRegistrationModalStatus"
    :loading="saving"
    :date="formatDate"
    :isShowCountDownTimer="currentSettings.isShowCountDownTimer"
    :seriesId="seriesid"
    :countdownUnit="currentSettings.countdownUnit"
    :countdownValue="currentSettings.countdownValue"
    :timerMode="currentSettings.timerMode"
    @close="handleCloseRegistrationStatusModal"
    @save="handleSave"
  />

  <CheckRegistrationStatusModal
    :active="openCheckRegistrationStatusModal"
    :seriesId="seriesid"
    @close="handleCloseCheckRegistrationStatusModal"
  />
  
  </div>
</template>

<script>
import AddPlayersModal from '~/components/modals/AddPlayersModal.vue';
import AddSeriesModal from '~/components/modals/AddSeriesModal.vue';
import EditSeriesModal from '~/components/modals/EditSeriesModal.vue';
import DeleteSeriesModal from '~/components/modals/DeleteSeriesModal.vue';
import ManageTeamLimitModal from '~/components/modals/ManageTeamLimitModal.vue';
import ManageWeeklySeriesTeamsModal from '~/components/modals/ManageWeeklySeriesTeamsModal.vue';
import EditThumbnailModal from '~/components/modals/EditThumbnailModal.vue';
import RegistrationStatusModal from '~/components/modals/RegistrationStatusModal.vue'
import CheckRegistrationStatusModal from '~/components/modals/CheckRegistrationStatusModal.vue';

export default {
  components: {
    AddPlayersModal,
    AddSeriesModal,
    ManageTeamLimitModal,
    ManageWeeklySeriesTeamsModal,
    EditSeriesModal,
    DeleteSeriesModal,
    EditThumbnailModal,
    RegistrationStatusModal,
    CheckRegistrationStatusModal
  },
  props: {
    teams: {
      type: Array,
      required: true
    },
    ageGroups: {
      type: Array,
      required: true
    },
    players: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      query: '', 
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
      ActiveTab: 'weekly',
      SeriesTabs: [
        { text: 'Weekly Competitions', value: 'weekly' },
        { text: 'Tournaments', value: 'tournament' },
        { text: 'Central Coast', value: 'coast' },
      ],
      showAddPlayersModal: false,
      showAddSeriesModal: false,
      showEditSeriesModal: false,
      showEditThumbnailModal: false,
      showTeamLimitModal: false,
      showWeeklyTeamsModal: false,
      showDeleteSeriesModal: false,
      selecetedData: ({}),
      seriesList: [],
      selectedEvent: null,
      selectedYear: null,
      selectedGroup: [],
      seriesid: 0,
      dataColumns: [
        { name: 'name', label: 'Title' },
        { name: 'type', label: 'Type' },
        { name: 'address', label: 'Address' },
        { name: 'start', label: 'Start' },
        { name: 'end', label: 'End' },
      ],
      showVueTable: false,
      matches: [],
      selected: [],

      // Registration Status
      openRegistrationModalStatus: false,
      saving: false,
      currentSettings: {
        date: '',
        isShowCountDownTimer: false,
        countdownUnit: 0,
        countdownValue: null,
        timerMode: ''
      },
      openCheckRegistrationStatusModal: false,
    }
  },
  computed: {
    formattedEvents() {
      return this.EventList.map(event => ({
        text: event.name,
        value: event.id,
        date: new Date(event.event_date),
      }));
    },
    filteredEvents() {
      if (this.selectedYear) {
        return this.formattedEvents.filter(event => {
          if (event && event.date) {
            return event.date.getFullYear() === this.selectedYear;
          } else {
            return false;
          }
        });
      } else {
        return this.formattedEvents;
      }
    },
    formattedYears() {
      const years = this.EventList.map(event => {
        const eventDate = new Date(event.event_date);
        return eventDate.getFullYear();
      });

      const uniqueYears = [ ...new Set(years) ];

      // uniqueYears.sort();

      const formattedYears = uniqueYears.map(year => ({
        text: `Year ${year.toString()}`,
        value: year
      }));

      return formattedYears;
    },
    formatDate() {
      const date = new Date(this.currentSettings.date);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }
  },
  watch: {
    ActiveTab: {
      handler() {
        this.retrieveSeries();
      },
      immediate: true,
    },
    totalPages() {
      if (this.page > this.totalPages && this.totalPages > 0) {
        this.page = this.totalPages;
        this.retrieveSeries();
      } else if (this.page > 1 && this.totalPages === 0) {
        this.page = 1;
        this.retrieveSeries();
      }
    },
    page: {
      handler() {
        this.retrieveSeries()
      },
    },
  },

  methods: {
    handleOpenCheckRegistrationStatusModal(data) {
      this.seriesid = data.id
      this.openCheckRegistrationStatusModal = true
    },
    async handleOpenRegistrationStatusModal(data) {
      this.seriesid = data.id
      await this.retrieveRegistrationFormStatus(data.id)
      this.openRegistrationModalStatus = true
    },
    openAddPlayerDialog() {
      this.showAddPlayersModal = true
    },
    openAddSeriesDialog() {
      this.showAddSeriesModal = true
    },
    openEditThumbnailDialog() {
      this.showEditThumbnailModal = true
    },
    openTeamLimitDialog(data) {
      this.seriesid = data.id
      this.showTeamLimitModal = true
    },
    openWeeklyTeamsDialog (data) {
      this.selected = { ...data }
      this.showWeeklyTeamsModal = true
    },
    handleCloseRegistrationStatusModal() {
      this.openRegistrationModalStatus = false
    },
    handleCloseCheckRegistrationStatusModal() {
      this.openCheckRegistrationStatusModal = false
    },
    closeAddPlayerDialog() {
      this.showAddPlayersModal = false
    },
    closeEditThumbnailDialog() {
      this.showEditThumbnailModal = false
    },
    closeTeamLimitDialog() {
      this.showTeamLimitModal = false
    },
    closeAddSeriesDialog() {
      this.showAddSeriesModal = false
    },
    closeWeeklyTeamsDialog () {
      this.selected = []
      this.showWeeklyTeamsModal = false
    },
    confirmAddedPlayer() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Player Added',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showAddPlayersModal = false
    },
    AddSeries(data) {
      this.seriesList.unshift(data);
      this.showAddSeriesModal = false;
      this.showAddPlayersModal = false
      this.retrieveSeries();
    },
    openEditSeriesDialog(data) {
      this.selecetedData = data
      this.showEditSeriesModal = true
    },
    closeEditSeriesDialog() {
      this.selecetedData = ({})
      this.showEditSeriesModal = false
    },
    EditTeamLimit() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Team Limit Modified',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showTeamLimitModal = false;
      this.retrieveSeries();
    },
    EditThumbnail() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Thumbnail Modified',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showEditThumbnailModal = false;
      this.retrieveSeries();
    },
    EditSeries(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Tournament Series Modified',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showEditSeriesModal = false;
      this.retrieveSeries();
    },
    openDeleteSeriesDialog(data) {
      this.selecetedData = data
      this.showDeleteSeriesModal = true
    },
    closeDeleteSeriesDialog() {
      this.selecetedData = ({})
      this.showDeleteSeriesModal = false
    },
    DeleteSeries(deletedSeriesId) {
      const index = this.seriesList.findIndex(series => series.id === deletedSeriesId);
      if (index !== -1) {
        this.seriesList.splice(index, 1);
      }
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Series Removed',
        position: 'bottom',
        variant: 'success',
        queue: true
      });
      this.showDeleteSeriesModal = false;
      this.selecetedData = ({});
      this.retrieveSeries();
    },
    setTab(tab) {
      this.ActiveTab = tab
    },
    replaceUnderWithU(str) {
      return str.replace(/^Under \b/, 'U');
    },
    FindTeam(teamId) {
      const foundField = this.TeamList.find(team => team.id === teamId);
      if (foundField) {
        return foundField.name;
      } else {
        return 'Unknown';
      }
    },
    DateRange(eventStart, eventEnd) {
      const start = new Date(eventStart) || new Date;
      const end = new Date(eventEnd) || new Date;
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      const suffixes = [
        'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'
      ];
      const startdate = (start).getDate();
      const enddate = (end).getDate();
      const startmonth = months[start.getMonth()];
      const endmonth = months[end.getMonth()];
      const startyear = start.getFullYear();
      const endyear = end.getFullYear();

      const suffix1 = startdate % 100;
      const suffix2 = enddate % 100;
      const startsuffix = suffixes[suffix1 >= 11 &&
      suffix1 <= 13 ? 0 : startdate % 10];
      const endsuffix = suffixes[suffix2 >= 11 &&
      suffix2 <= 13 ? 0 : enddate % 10];

      // eslint-disable-next-line max-len, vue/max-len, no-return-assign
      if (startmonth === endmonth && startyear === endyear) {
        return `${startmonth} ${startdate}${startsuffix} - ${enddate}${endsuffix}, ${startyear}`;
      } else if (startyear === endyear) {
        return `${startmonth} ${startdate}${startsuffix} - ${endmonth}
         ${enddate}${endsuffix}, ${startyear}`;
      } else {
        return `${startmonth} ${startdate}${startsuffix}, ${startyear}
         - ${endmonth} ${enddate}${endsuffix}, ${endyear}`;
      }
    },
    calendarDate(datestring) {
      const date = new Date(datestring)
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${day}/${month}/${year.toString().slice(-2)}`;
    },
    formattedDate(dateString) {
      const date = new Date(dateString);
      date.setHours(0, 0, 0, 0);
      return date;
    },
    setPage() {
      this.retrieveSeries();
    },
    reset() {
      this.contentData = { content: '<p></p>' }
    },
    retrieveSeries() {
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        type: this.ActiveTab,
        maxSeriesPerPage: this.perPage,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null || query[key] === '') {
          delete query[key];
        }
      });

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/series/paginated?${queryString}`)
        .then((response) => {
          this.seriesList = response.data.series.map(event => {
            return {
              ...event,
              start: this.formattedDate(event.start),
              end: this.formattedDate(event.end),
            };
          });
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .catch(error => {
          console.error("Error retrieving series:", error);
          this.$oruga.notification.open({
            duration: 5000,
            message: error.response.data.message || 'Failed to load series data.',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
          this.seriesList = [];
          this.totalItems = 0;
          this.totalPages = 0;
        })
        .finally(() => {
          this.showVueTable = true;
        });
    },
    pauseSeries(id) {
      this.$axios
        .$post(`v1/series/pause/${id}`)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Series paused.',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.retrieveSeries();
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.message,
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        });
    },
    resumeSeries(id) {
      this.$axios
        .$post(`v1/series/resume/${id}`)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Series resume.',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.retrieveSeries();
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.message,
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        });
    },

    async handleSave(payload) {
      this.saving = true
      try {
        const response =  await this.$axios.$post('/v1/registration-form-status', payload)

        if (response.success) {
          this.$oruga.notification.open({
            message: response.message,
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });

          await this.retrieveRegistrationFormStatus(response.data.series_id)
        } else {
          this.$oruga.notification.open({
            message: response.message,
            variant: 'warning',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });

          await this.retrieveRegistrationFormStatus(response.data.series_id)
        }
        this.openRegistrationModalStatus = false
      } catch (error) {
        console.error('Save failed:', error)
      } finally {
        this.saving = false
      }
    },

    async retrieveRegistrationFormStatus(id) {
      try {
        const response = await this.$axios.$get(`/v1/registration-form-status/${id}`)

        if (response.success) {
          this.currentSettings.date = response.data.date;
          this.currentSettings.isShowCountDownTimer = response.data.isShowCountDownTimer
          this.currentSettings.countdownUnit = response.data.countdownUnit
          this.currentSettings.countdownValue = response.data.countdownValue
          this.currentSettings.timerMode = response.data.timerMode
        }

      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.v-label.theme--light {
  color: black
}
</style>