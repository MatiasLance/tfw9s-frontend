<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
  <div class="bg-[#1A1A1B]" data-aos="fade-up">
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

        <!--
          <div class="col-span-1">
          <button
          type="button"
          class="
          w-full
          rounded-md
          py-1.5
          text-center
          font-semibold
          "
          :class="(ActiveTab == 'weekly')
          ? `
          bg-gradient-to-br
          from-[#5EE738]
          via-[#3e872a]
          to-[#050505]
          text-white`
          :
          'bg-[#212121] text-[#555555]'"
          @click="setTab('weekly')"
          >
          Weekly Competition
          </button>
          </div>
          <div class="col-span-1">
          <button
          type="button"
          class="
          w-full
          rounded-md
          py-1.5
          text-center
          font-semibold
          "
          :class="(ActiveTab == 'tournament')
          ? `
          bg-gradient-to-br
          from-[#5EE738]
          via-[#3e872a]
          to-[#050505]
          text-white`
          :
          'bg-[#212121] text-[#555555]'"
          @click="setTab('tournament')"
          >
          Tournament
          </button>
          </div>
          <div class="col-span-1">
          <button
          type="button"
          class="
          w-full
          rounded-md
          py-1.5
          text-center
          font-semibold
          "
          :class="(ActiveTab == 'coast')
          ? `
          bg-gradient-to-br
          from-[#5EE738]
          via-[#3e872a]
          to-[#050505]
          text-white`
          :
          'bg-[#212121] text-[#555555]'"
          @click="setTab('coast')"
          >
          Central Coast
          </button>
          </div>
        -->

      <!--
        <VSelect
        v-model="selectedYear"
        :items="formattedYears"
        label="Select Event Year"
        solo
        class="col-span-1"
        />
        <VSelect
        v-model="selectedEvent"
        :items="filteredEvents"
        label="Select Event"
        solo
        class="col-span-1"
        />
        <VTextField
        v-model="query"
        label="Search"
        solo
        class="col-span-1"
        />
      -->

        <!--
          <div v-if="!ActiveTab" class="col-span-1">
          <VBtnToggle
          v-model="ActiveTab"
          mandatory
          shaped
          dark
          >
          <VBtn size="large" :value="'weekly'">
          Weekly Competition
          </VBtn>
          <VBtn size="large" :value="'tournament'">
          Tournament
          </VBtn>
          <VBtn size="large" :value="'coast'">
          Central Coast
          </VBtn>
          </VBtnToggle>
          </div> 
        -->

        <div
        v-if="totalPages > 0"
        class="col-span-1 flex flex-wrap items-center justify-around
        gap-x-2 md:col-span-3 md:justify-between"
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
          class="grid min-w-[640px] grid-cols-1 gap-2"
          >
            <div
            v-for="data in seriesList"
            :key="data.id"
            class="col-span-1 bg-[#212121] p-4 text-white"
            data-aos="fade-up" data-aos-offset="0"
            >
              <Form class="grid w-full grid-cols-3 gap-2 p-2">
                <div class="col-span-2 font-semibold">
                  {{ data.name}}
                </div>
                <div class="col-span-1 text-right font-medium">
                  {{ DateRange(data.start, data.end) }}
                </div>
                <span class="col-span-3 line-clamp-4"
                  v-html="data.description"
                >
                </span>
                <span class="col-span-3 line-clamp-4">
                  {{ `Location: ${data.address || 'Unknown'}`}}
                </span>
                <div class="col-span-3 flex justify-end gap-4">
                  <div v-if="!data.is_paused">
                    <BaseButton
                      class="
                        max-w-full rounded-lg
                        border border-gray-200
                        bg-[#737373]
                        px-4
                        py-2
                        text-white
                      "
                      @click="pauseSeries(data.id)"
                    >
                      Pause
                    </BaseButton>
                  </div>
                  <div v-if="data.is_paused">
                    <BaseButton
                      class="
                        max-w-full rounded-lg
                        border border-gray-200
                        bg-[#737373]
                        px-4
                        py-2
                        text-white
                      "
                      @click="resumeSeries(data.id)"
                    >
                      Resume
                    </BaseButton>
                  </div>
                  <BaseButton
                    v-show="ActiveTab === 'weekly'
                    || ActiveTab === 'coast'
                    || ActiveTab === 'tournament'"
                    class="
                    max-w-full rounded-lg
                    border border-gray-200
                    bg-[#737373]
                    px-4
                    py-2
                    "
                    @click="openWeeklyTeamsDialog(data)"
                  >
                    Manage Teams
                  </BaseButton>
                  <BaseButton
                    v-show="ActiveTab === 'tournament' || ActiveTab === 'coast'"
                  class="
                    max-w-full rounded-lg
                    border border-gray-200
                    bg-[#737373]
                    px-4
                    py-2
                    "
                    @click="openTeamLimitDialog(data)"
                  >
                    Team Limit
                  </BaseButton>
                  <BaseButton
                  class="
                    max-w-full rounded-lg
                    border border-gray-200
                    bg-[#4cbe5c]
                    px-4
                    py-2
                    text-white
                    "
                    @click="openEditSeriesDialog(data)"
                  >
                    Edit
                  </BaseButton>
                  <BaseButton
                  class="
                    max-w-full rounded-lg
                    border border-gray-200
                    bg-[#fb0d2b]
                    px-4
                    py-2
                    text-white
                    "
                    @click="openDeleteSeriesDialog(data)"
                  >
                    Delete
                  </BaseButton>
                </div>
              </Form>
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
  <AddSeriesModal
  :active="showAddSeriesModal"
  :agegroup="AgeGroupList"
  :teams="TeamList"
  @close="closeAddSeriesDialog"
  @confirm="AddSeries"
  />
  <ManageTeamLimitModal
  :active="showTeamLimitModal"
  :agegroup="AgeGroupList"
  :seriesid="seriesid"
  @close="closeTeamLimitDialog"
  @confirm="EditTeamLimit"
  />
  <ManageWeeklySeriesTeamsModal
  :active="showWeeklyTeamsModal"
  :selected="selected"
  :agegroup="AgeGroupList"
  @close="closeWeeklyTeamsDialog"
  />
  <EditSeriesModal
  :active="showEditSeriesModal"
  :agegroup="AgeGroupList"
  :teams="TeamList"
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
  :agegroup="AgeGroupList"
  :teams="TeamList"
  :series="selecetedData"
  @close="closeDeleteSeriesDialog"
  @confirm="DeleteSeries"
  />
  </div>
</template>

<script>
import AddSeriesModal from '~/components/modals/AddSeriesModal.vue';
import EditSeriesModal from '~/components/modals/EditSeriesModal.vue';
import DeleteSeriesModal from '~/components/modals/DeleteSeriesModal.vue';
import ManageTeamLimitModal from '~/components/modals/ManageTeamLimitModal.vue';
import ManageWeeklySeriesTeamsModal from '~/components/modals/ManageWeeklySeriesTeamsModal.vue';
import EditThumbnailModal from '~/components/modals/EditThumbnailModal.vue';
export default {
  components: {
    AddSeriesModal,
    ManageTeamLimitModal,
    ManageWeeklySeriesTeamsModal,
    EditSeriesModal,
    DeleteSeriesModal,
    EditThumbnailModal
  },
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    TeamList: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    EventList: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    AgeGroupList: {
      type: Array,
      required: true
    },
    getSeries: {
      type: Function,
      required: true,
    },
    getEvents: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 5,
      totalPages: 0,
      from: 0,
      to: 0,
      perPage: 10,
      totalItems: 0,
      ActiveTab: 'weekly',
      SeriesTabs: [
        { text: 'Weekly Competitions', value: 'weekly' },
        { text: 'Tournaments', value: 'tournament' },
        { text: 'Central Coast', value: 'coast' },
      ],
      showAddSeriesModal: false,
      showEditSeriesModal: false,
      showEditThumbnailModal: false,
      showTeamLimitModal: false,
      showWeeklyTeamsModal: false,
      showDeleteSeriesModal: false,
      selecetedData: ({}),
      seriesList: [],
      query: null,
      selectedEvent: null,
      selectedYear: null,
      selectedGroup: [],
      seriesid: 0,
      events: [
        'Event 1',
        'Event 2',
        'Event 3'
      ],
      eventYears: [
        '2020',
        '2021',
        '2022',
        '2023',
        '2024',
      ],
      ageGroup: [
        '12 Years Below',
        '13 to 15',
        '16 to 18',
        '19 to 24',
        '25 and above'
      ],
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
  },
  watch: {
    ActiveTab: {
      handler() {
        this.retrieveSeries();
      },
      immediate: true,
    },
    totalPages(newTotalPages) {
      if (this.page > this.totalPages && newTotalPages > 0) {
        this.page = newTotalPages;
        this.retrieveSeries();
      } else if (this.page > newTotalPages === 0) {
        this.page = 1;
        this.retrieveSeries();
      }
    },
  },
  methods: {
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
    AddSeries(data) {
      this.seriesList.unshift(data);
      this.showAddSeriesModal = false;
      this.retrieveSeries();
      this.getSeries();
      this.getEvents();
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
      this.getSeries();
      this.getEvents();
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
      this.getSeries();
      this.getEvents();
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
      this.getSeries();
      this.getEvents();
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
      this.getSeries();
      this.getEvents();
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
        .$get(`v1/series?${queryString}`)
        .then((response) => {
          this.seriesList = response.data.series.map(event => {
            return {
              ...event,
              start: this.formattedDate(event.start),
              end: this.formattedDate(event.end),
            };
          });
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page; // This will trigger the watcher if it changes
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
  }
}
</script>

<style scoped>
.v-label.theme--light {
  color: black
}
</style>