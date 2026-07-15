<template>
  <div>
  <div data-aos="fade-up">
    <section class="mx-auto max-w-full gap-4 p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div class="col-span-2 md:col-span-3">
          <button
          type="button"
          class="w-full sm:w-36 rounded-lg text-sm text-white
              bg-green-600 py-2 px-4 flex items-center
              gap-2 justify-center font-semibold"
          @click="openAddPlayerDialog"
          >
            <span class="text-white">+ Player</span>
          </button>
        </div>

        <div class="col-span-2 md:col-span-1 md:col-start-1">
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

        <div class="col-span-2 md:col-span-1 md:col-start-3">
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

        <div class="col-span-2 md:col-span-3">
          <div
            v-if="totalPages > 0"
            class="flex flex-col gap-4 sm:flex-row sm:items-center 
                  sm:justify-between bg-gradient-to-br from-gray-800 to-gray-900 
                  rounded-2xl p-6 border border-green-500/20 shadow-lg"
            data-aos="flip-up"
          >
            <div class="flex items-center gap-3">
              <div class="bg-green-600/20 rounded-lg p-2">
                <i class="ri-list-check text-green-400 text-lg"></i>
              </div>
              <span class="text-gray-300 font-medium">
                Showing <span class="font-bold text-green-400">{{ from }}-{{ to }}</span>
                of <span class="font-bold text-green-400">{{ totalItems }}</span> players
              </span>
            </div>
            
            <VPagination
              v-model="page"
              :length="totalPages"
              :total-visible="7"
              class="text-white"
              color="success"
              dark
              @change="setPage"
            />
          </div>
        </div>

        <section v-if="totalItems > 0" class="col-span-3">
          <div class="overflow-x-auto bg-gray-800 border border-green-500/20 rounded-2xl">
            <div class="min-w-[1000px]">
              <!-- Header -->
              <div
                class="grid grid-cols-[1fr_1fr_1.5fr_1.5fr_1.5fr_1fr_1fr_80px] items-center px-4 py-4 bg-gray-900 border-b border-green-500/30"
                data-aos="flip-up"
              >
                <span class="text-center text-sm font-semibold text-green-400 uppercase tracking-wide">Contact Name</span>
                <span class="text-center text-sm font-semibold text-green-400 uppercase tracking-wide">Phone Number</span>
                <span class="text-center text-sm font-semibold text-green-400 uppercase tracking-wide">Email</span>
                <span class="text-center text-sm font-semibold text-green-400 uppercase tracking-wide">Player Name</span>
                <span class="text-center text-sm font-semibold text-green-400 uppercase tracking-wide">Team</span>
                <span class="text-center text-sm font-semibold text-green-400 uppercase tracking-wide">Date of Birth</span>
                <span class="text-center text-sm font-semibold text-green-400 uppercase tracking-wide">Age Group</span>
                <span class="text-center text-sm font-semibold text-green-400 uppercase tracking-wide">Actions</span>
              </div>

              <!-- Rows -->
              <div class="divide-y divide-gray-700/50">
                <div
                  v-for="(data, index) in Players"
                  :key="data.id"
                  class="grid grid-cols-[1fr_1fr_1.5fr_1.5fr_1.5fr_1fr_1fr_80px] items-center px-4 py-3 transition-all duration-300 hover:bg-gray-700/30"
                  :class="index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'"
                  data-aos="flip-down"
                  data-aos-duration="500"
                  data-aos-offset="0"
                  data-aos-once="true"
                >
                  <!-- Contact Name -->
                  <div class="px-3 py-3 flex justify-center">
                    <input
                      :value="data.contact_firstname + ' ' + data.contact_lastname"
                      placeholder="Enter Contact First Name"
                      disabled
                      class="w-full bg-transparent border-0 p-0 text-sm text-gray-200 text-center focus:ring-0 focus:outline-none disabled:opacity-100 disabled:cursor-default truncate"
                    />
                  </div>

                  <!-- Phone Number -->
                  <div class="px-3 py-3 flex justify-center">
                    <input
                      v-model="data.phone_number"
                      placeholder="Enter Phone Number"
                      disabled
                      class="w-full bg-transparent border-0 p-0 text-sm text-gray-300 text-center focus:ring-0 focus:outline-none disabled:opacity-100 disabled:cursor-default truncate"
                    />
                  </div>

                  <!-- Email -->
                  <div class="px-3 py-3 flex justify-center">
                    <input
                      v-model="data.email"
                      placeholder="Enter Email"
                      disabled
                      class="w-full bg-transparent border-0 p-0 text-sm text-gray-300 text-center focus:ring-0 focus:outline-none disabled:opacity-100 disabled:cursor-default truncate"
                    />
                  </div>

                  <!-- Player Name -->
                  <div class="px-3 py-3 flex justify-center">
                    <input
                      v-model="data.name"
                      placeholder="Enter Team"
                      disabled
                      class="w-full bg-transparent border-0 p-0 text-sm text-gray-300 text-center focus:ring-0 focus:outline-none disabled:opacity-100 disabled:cursor-default truncate"
                    />
                  </div>

                  <!-- Team -->
                  <div class="px-3 py-3 flex justify-center">
                    <input
                      v-model="data.team_name"
                      placeholder="Enter Field"
                      disabled
                      class="w-full bg-transparent border-0 p-0 text-sm text-gray-300 text-center focus:ring-0 focus:outline-none disabled:opacity-100 disabled:cursor-default truncate"
                    />
                  </div>

                  <!-- Date of Birth -->
                  <div class="px-3 py-3 flex justify-center">
                    <input
                      v-model="data.dobGB"
                      placeholder="Enter Birth Date"
                      disabled
                      class="w-full bg-transparent border-0 p-0 text-sm text-gray-300 text-center focus:ring-0 focus:outline-none disabled:opacity-100 disabled:cursor-default truncate"
                    />
                  </div>

                  <!-- Age Group -->
                  <div class="px-3 py-3 flex justify-center">
                    <input
                      v-model="data.agegroup"
                      placeholder="Enter Age Group"
                      disabled
                      class="w-full bg-transparent border-0 p-0 text-sm text-gray-300 text-center focus:ring-0 focus:outline-none disabled:opacity-100 disabled:cursor-default truncate"
                    />
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex items-center justify-center space-x-2 px-4 py-3">
                    <button
                      type="button"
                      class="hover:text-green-300 transition-colors duration-200 p-2 rounded-lg hover:bg-green-600/20"
                      @click="openEditPlayersDialog(data)"
                      title="Edit Player"
                    >
                      <span class="text-green-400">
                        <i class="ri-pencil-line text-lg"></i>
                      </span>
                    </button>
                    <button
                      type="button"
                      class="hover:text-red-300 transition-colors duration-200 p-2 rounded-lg hover:bg-red-600/20"
                      @click="openDeletePlayersDialog(data)"
                      title="Delete Player"
                    >
                      <span class="text-red-400">
                        <i class="ri-delete-bin-line text-lg"></i>
                      </span>
                    </button>
                  </div>
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
  :teams="players"
  @close="closeAddPlayerDialog"
  @confirm="AddSeries"
  />
  <EditPlayersModal
  :active="showEditPlayersModal"
  :agegroup="ageGroupList"
  :teams="players"
  :series="selecetedData"
  @close="closeEditPlayersDialog"
  @confirm="EditSeries"
  />
  <DeletePlayersModal
  :active="showDeletePlayersModal"
  :agegroup="ageGroupList"
  :teams="players"
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
    players: {
      type: Array,
      required: true
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