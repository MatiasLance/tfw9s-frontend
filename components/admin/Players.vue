<template>
  <div>
  <div class="bg-[#1A1A1B]" data-aos="fade-up">
    <section class="mx-auto max-w-screen-xl gap-4 p-4">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div class="col-span-2 flex items-center md:col-span-3">
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
          @click="openAddPlayerDialog"
          >
            +
          </button>
        </div>
        <div class="col-span-2 flex flex-col md:col-span-1 md:col-start-1">
          <VSelect
            v-model="selectedAgeGroup"
            :items="formattedPlayerAgeGroups"
            placeholder="Select Age Group"
            solo
            class="w-full"
            :hide-details="true" 
            @change="retrievePlayersOnSelectChange" 
          />
        </div>
        <div class="col-span-2 flex flex-col md:col-span-1 md:col-start-3">
          <input
            v-model="query"
            type="text"
            class="
              block
              w-full
              appearance-none
              rounded-md
              border border-gray-200
              bg-gray-100
              px-[15px]
              py-[12px]
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
        v-if="totalPages > 0"
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
            @update:modelValue="page = $event"
            />
        </div>
    <section class="col-span-3">
      <div class="overflow-x-auto">
      <div class="inline-block min-w-full text-center">
          <div 
            v-if="totalItems  > 0"
            class="flex min-w-[1200px] pr-24 md:w-auto"
            data-aos="flip-up"
          >
            <span
              class="flex-1 px-4 py-2 text-center align-middle
              text-[20px] font-semibold text-[#555555]   "
            >
              Contact Name
            </span>
            <span
              class="flex-1 px-4 py-2 text-center align-middle
              text-[20px] font-semibold text-[#555555]   "
            >
              Phone Number
            </span>
            <span
              class="flex-1 px-4 py-2 text-center align-middle
              text-[20px] font-semibold text-[#555555]  "
            >
              Email
            </span>
            <span
              class="flex-1 px-4 py-2 text-center align-middle
              text-[20px] font-semibold text-[#555555]  "
            >
              Player Name
            </span>
            <span
              class="flex-1 px-4 py-2 text-center align-middle
              text-[20px] font-semibold text-[#555555] "
            >
              Team
            </span>
            <span
              class="flex-1 px-4 py-2 text-center align-middle
              text-[20px] font-semibold text-[#555555] "
            >
              Date of Birth
            </span>
            <span 
              class="flex-1 px-4 py-2 text-center align-middle
              text-[20px] font-semibold text-[#555555] "
            >
              Age Group
            </span>
          </div>
            <div
              v-for="(data) in Players"
              :key="data.id" class="col-span-1 mb-0.5 gap-0"
              data-aos="flip-down" data-aos-duration="500"
              data-aos-offset="0"  data-aos-once="true"
              >
                <div class="flex min-w-[640px] items-center justify-center">
                  <input
                  :value="data.contact_firstname + ' ' + data.contact_lastname"
                  placeholder="Enter Contact First Name"
                  hide-details
                  required
                  :disabled="true"
                  class="mr-0.5 flex-1 border-black bg-white p-1"
                  />
                  <input
                  v-model="data.phone_number"
                  placeholder="Enter Phone Number"
                  hide-details
                  required
                  :disabled="true"
                  class="mr-0.5 flex-1 border-black bg-white p-1"
                  />
                  <input
                  v-model="data.email"
                  placeholder="Enter Email"
                  hide-details
                  required
                  :disabled="true"
                  class="mr-0.5 flex-1 border-black bg-white p-1"
                  />
                  <input
                  v-model="data.name"
                  placeholder="Enter Team"
                  hide-details
                  required
                  :disabled="true"
                  class="mr-0.5 flex-1 border-black bg-white p-1"
                  />
                  <input
                  v-model="data.team_name"
                  placeholder="Enter Field"
                  hide-details
                  required
                  :disabled="true"
                  class="mr-0.5 flex-1 border-black bg-white p-1"
                  />
                  <input
                  v-model="data.dobGB"
                  placeholder="Enter Birth Date"
                  hide-details
                  required
                  :disabled="true"
                  class="mr-0.5 flex-1 border-black bg-white p-1"
                  />
                  <input
                  v-model="data.agegroup"
                  placeholder="Enter Age Group"
                  hide-details
                  required
                  :disabled="true"
                  class="mr-0.5 flex-1 border-black bg-white p-1"
                  />
                  <i
                  class="ri-pencil-fill px-4 text-xl text-white"
                  @click="openEditPlayersDialog(data)"
                  />
                  <i
                  class="ri-delete-bin-fill px-4 text-xl text-red-400"
                  @click="openDeletePlayersDialog(data)"
                  />
                </div>
              </div>
              </div>
            </div>
          </section>
          <section
          v-if="totalItems === 0"
          class="col-span-1 flex h-60 items-center
          justify-center font-semibold
          text-[#555555] md:col-span-3"
          >
          No Players Available
          </section>
      </div>
    </section>
  </div>
  <AddPlayersModal
  :active="showAddPlayersModal"
  :agegroup="ageGroupList"
  :teams="PlayersList"
  @close="closeAddPlayerDialog"
  @confirm="AddSeries"
  />
  <EditPlayersModal
  :active="showEditPlayersModal"
  :agegroup="ageGroupList"
  :teams="PlayersList"
  :series="selecetedData"
  @close="closeEditPlayersDialog"
  @confirm="EditSeries"
  />
  <DeletePlayersModal
  :active="showDeletePlayersModal"
  :agegroup="ageGroupList"
  :teams="PlayersList"
  :series="selecetedData"
  @close="closeDeletePlayersDialog"
  @confirm="DeleteSeries"
  />
  </div>
</template>

<script>
import _debounce from 'lodash/debounce';
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
    getSeries: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      showAddPlayersModal: false,
      showEditPlayersModal: false,
      showDeletePlayersModal: false,
      selecetedData: ({}),
      Players: [],
      query: null,
      selectedEvent: null,
      selectedYear: null,
      selectedAgeGroup: null,
      selectedGroup: [],
      ageGroupList: [],
      isLoading: false,
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
  // Inside the export default { ... }
  computed: { // If you don't have a computed section, create one
    formattedPlayerAgeGroups() {
      const formatted = (this.ageGroupList || []).map(group => ({
        text: group.name,
        value: group.id
      }));
      return [ { text: 'All Age Groups', value: null }, ...formatted ];
    },
  // ... any other computed properties you might have
  },
  watch: {
    query() {
      this.debouncedSearch();
    },
    page(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.retrievePlayers();
      }
    },
    selectedAgeGroup(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.page = 1;
        this.retrievePlayers();
      }
    },
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
  },
  mounted() {
    this.debouncedSearch = _debounce(this.retrievePlayers, 800);
    this.retrievePlayers();
    this.retrieveAgeGroups();
    this.page = 1
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
        message: 'Player Added',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showAddPlayersModal = false;
      this.retrievePlayers();
      this.getSeries();
    },
    formatDate(date) {
      if (!date) return "N/A"; // Handle null/undefined
      const d = new Date(date);
      return d.toLocaleDateString('en-GB'); // Formats as DD/MM/YYYY
      // OR for custom format:
      // return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    },
    // ... (keep existing methods)
    // eslint-disable-next-line camelcase
    getAgeGroupName(agegroup_id) {
      // eslint-disable-next-line camelcase
      if (agegroup_id === null) return 'All Age Groups';
      // eslint-disable-next-line camelcase
      const group = this.ageGroupList.find(g => g.id === agegroup_id);
      return group ? group.name : 'Unknown';
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
      this.retrievePlayers();
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
        message: 'Player Removed',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showDeletePlayersModal = false;
      this.retrievePlayers();
      this.getSeries();
    },
    setTab(tab) {
      this.selectedAgeGroup = tab
      this.query = tab
    },
    retrievePlayersOnSelectChange() {
      this.page = 1;
      this.retrievePlayers();
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
    setPage() {
      this.retrievePlayers();
    },
    retrieveAgeGroups() {
      return this.$axios
        .$get('v1/agegroups')
        .then((response) => {
          this.ageGroupList = response.data.ageGroups || [];
        })
        .catch(error => {
          console.error('Error retrieving age groups:', error);
          this.ageGroupList = []; 
        });
    },
    retrievePlayers: _debounce(function () {
      if (this.isLoading) return;
      this.isLoading = true;
            
      const params = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        // eslint-disable-next-line camelcase
        per_page: this.perPage,
      };

      if (this.selectedAgeGroup !== null) {
        params.agegroup = this.selectedAgeGroup;
      }

      this.$axios
        .$get('/v1/players', { params })
        .then((response) => {
              
          const playersData = response.data.players || response.data.data.players || [];
              
          this.Players = playersData.map(player => ({
            ...player,
            name: `${player.player_firstname} ${player.player_lastname}`,
            dobGB: this.formatDate(player.dob),
            agegroup: this.getAgeGroupName(player.agegroup_id),
          }));

          this.totalItems = response.data.total_items || 0;
          this.totalPages = response.data.last_page || 1;
          this.from = response.data.from || 1;
          this.to = response.data.to || this.Players.length;
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
          this.isLoading = false;
        });
    }, 100)     
  }
}
</script>

<style scoped>
.v-label.theme--light {
  color: black
}
</style>