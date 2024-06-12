<template>
  <div>
  <div class="bg-[#1A1A1B]" data-aos="fade-up">
    <section class="mx-auto max-w-screen-xl gap-4 p-4">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div class="col-span-2 flex items-center md:col-span-3">
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
          @click="openAddPlayerDialog"
          >
            +
          </button>
        </div>
        <div class="col-span-1 md:col-span-2"></div>
        <div class="flex items-center col-span-3 md:col-start-1 md:col-span-1">
          <select
            v-model="ActiveTab"
            class="
              mt-1
              block
              w-full
              appearance-none
              rounded-md
              border border-gray-200
              bg-gray-100
              py-[13px]
              px-[15px]
              font-normal
              outline-inherit
              hover:border-gray-400
              focus:border-gray-400
              focus:bg-white
              focus:outline-none
              focus:ring-0
            "
          >
            <option
              v-for="option in options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="flex items-center col-span-3 md:col-start-3 md:col-span-1">
          <input
            v-model="query"
            type="text"
            class="
              mt-1
              block
              w-full
              appearance-none
              rounded-md
              border border-gray-200
              bg-gray-100
              py-[13px]
              px-[15px]
              font-normal
              outline-inherit
              hover:border-gray-400
              focus:border-gray-400
              focus:bg-white
              focus:outline-none
              focus:ring-0
            "
            placeholder="Search"
          >
        </div>
        <div
        v-if="showVueTable"
        class="col-span-3 flex flex-wrap items-center justify-around
        gap-x-2 md:justify-between"
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
        class="col-span-1 md:col-span-3 overflow-x-scroll
        overflow-y-hidden md:overflow-x-hidden"
        >
          <div class="grid min-w-[640px] grid-cols-1 gap-2">
            <div
            v-for="(player) in Players"
            :key="player.id"
            class="col-span-1 p-4 text-white bg-[#212121]"
            data-aos="fade-up" data-aos-offset="0"
            >
              <Form class="grid grid-cols-3 gap-2 p-2">
                <div class="col-span-2 font-semibold">
                  {{ player.contact_firstname}}
                </div>
                <span class="col-span-3 line-clamp-4"
                v-html="player.team_name"
                />
                <span class="col-span-3">
                  {{ `${player.agegroup}` }}
                </span>
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
                    @click="openEditPlayersDialog(player)"
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
                    @click="openDeletePlayersDialog(player)"
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
        No data available
        </section>
      </div>
    </section>
  </div>
  <AddPlayersModal
  :active="showAddPlayersModal"
  :agegroup="AgeGroupList"
  :teams="PlayersList"
  @close="closeAddPlayerDialog"
  @confirm="AddSeries"
  />
  <EditPlayersModal
  :active="showEditPlayersModal"
  :agegroup="AgeGroupList"
  :teams="PlayersList"
  :series="selecetedData"
  @close="closeEditPlayersDialog"
  @confirm="EditSeries"
  />
  <DeletePlayersModal
  :active="showDeletePlayersModal"
  :agegroup="AgeGroupList"
  :teams="PlayersList"
  :series="selecetedData"
  @close="closeDeletePlayersDialog"
  @confirm="DeleteSeries"
  />
  </div>
</template>

<script>
import AddPlayersModal from '~/components/modals/AddPlayersModal.vue';
import EditPlayersModal from '~/components/modals/EditPlayersModal.vue';
import DeletePlayersModal from '~/components/modals/DeletePlayersModal.vue';
export default {
  components: {
    AddPlayersModal,
    EditPlayersModal,
    DeletePlayersModal,
  },
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    PlayersList: {
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
  },
  data() {
    return {
      ActiveTab: null,
      options: [
        { text: 'All Age Group', value: null },
        { text: 'Under 6', value: 'Under 6' },
        { text: 'Under 7', value: 'Under 7' },
        { text: 'Under 8', value: 'Under 8' },
        { text: 'Under 9', value: 'Under 9' },
        { text: 'Under 10', value: 'Under 10' },
        { text: 'Under 11', value: 'Under 11' },
      ],
      showAddPlayersModal: false,
      showEditPlayersModal: false,
      showDeletePlayersModal: false,
      selecetedData: ({}),
      Players: [],
      query: null,
      selectedEvent: null,
      selectedYear: null,
      selectedGroup: [],
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
      data: [],
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
    }
  },
  watch: {
    query: {
      handler(newPage) {
        this.retrieveSeries();
      },
      immediate: true,
    },
    ActiveTab: {
      handler(newPage) {
        this.retrieveSeries();
      },
      immediate: true,
    },
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
  },
  methods: {
    openAddPlayerDialog() {
      this.showAddPlayersModal = true
    },
    closeAddPlayerDialog() {
      this.showAddPlayersModal = false
    },
    AddSeries(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Player Series Added',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showAddPlayersModal = false;
      this.retrieveSeries();
      this.getSeries();
    },
    openEditPlayersDialog(data) {
      this.selecetedData = data
      this.showEditPlayersModal = true
    },
    closeEditPlayersDialog() {
      this.selecetedData = ({})
      this.showEditPlayersModal = false
    },
    EditSeries(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Player Modified',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showEditPlayersModal = false;
      this.retrieveSeries();
      this.getSeries();
    },
    openDeletePlayersDialog(data) {
      this.selecetedData = data
      this.showDeletePlayersModal = true
    },
    closeDeletePlayersDialog() {
      this.selecetedData = ({})
      this.showDeletePlayersModal = false
    },
    DeleteSeries(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Players Removed',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showDeletePlayersModal = false;
      this.retrieveSeries();
      this.getSeries();
    },
    setTab(tab) {
      this.ActiveTab = tab
      this.query = tab
    },
    replaceUnderWithU(str) {
      return str.replace(/^Under \b/, 'U');
    },
    // eslint-disable-next-line camelcase
    FindTeam(team_id) {
      // eslint-disable-next-line camelcase
      const foundField = this.PlayersList.find(team => team.id === team_id);
      if (foundField) {
        return foundField.name;
      } else {
        // If no matching field is found, return "unknown"
        return 'Unknown';
      }
    },
    DateRange(start, end) {
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
      const startdate = start.getDate();
      const enddate = end.getDate();
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
      return `${startmonth === endmonth? startmonth:endmonth} ${startdate}${startsuffix} -  ${startmonth !== endmonth? endmonth:''} ${enddate}${endsuffix} ${startyear === endyear? startyear: endyear}`;
    },
    calendarDate(date) {
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
    retrieveSeries() {
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        type: this.ActiveTab,
        maxPlayersPerPage: 10,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`/v1/players?${queryString}`)
        .then((response) => {
          this.Players = response.data.players.map(player => {
            return {
              ...player,
              name: `${player.contact_firstname} ${player.contact_lastname}`,
            };
          });
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .catch((error) => {
          console.error('API request failed', error);
          this.Players = [];
          this.totalItems = 0;
          this.totalPages = 0;
          this.from = 0;
          this.to = 0;
        })
        .finally(() => {
          this.showVueTable = true;
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

