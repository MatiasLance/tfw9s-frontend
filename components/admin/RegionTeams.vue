  <template>
    <div>
      <div data-aos="fade-up">
        <section class="mx-auto max-w-screen-xl gap-6 p-4 sm:p-6">
          <!-- Header Section -->
          <div class="mb-8">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <!-- Page Title -->
              <div class="flex items-center gap-3">
                <div class="bg-green-600 rounded-xl p-2">
                  <i class="ri-team-line text-gray-50 text-xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-100">
                  Teams
                </h2>
              </div>

              <!-- Add Team Button -->
              <button
                type="button"
                class="bg-green-600 hover:bg-green-700 text-gray-50 font-bold 
                      py-3 px-6 rounded-xl transition-all duration-300 
                      flex items-center gap-2 w-full sm:w-auto justify-center"
                @click="openAddTeamDialog"
              >
                <i class="ri-add-line text-xl"></i>
                Add Team
              </button>
            </div>
          </div>

          <!-- Filters Section -->
          <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="col-span-1">
              <VSelect
                v-model="selectedSeries"
                :items="formattedSeriesItems"
                placeholder="Select Series"
                solo
                class="bg-gray-800 rounded-lg"
                :hide-details="true"
                @change="onFilterChange"
              />
            </div>

            <div class="col-span-1">
              <VSelect
                v-model="selectedRegion"
                :items="formattedRegionItems"
                placeholder="Select Region"
                solo
                class="bg-gray-800 rounded-lg"
                :hide-details="true"
                @change="onFilterChange"
              />
            </div>
          </div>

          <!-- Results Info & Pagination -->
          <div v-if="totalPages > 0" class="mb-6 flex flex-col gap-4
            sm:flex-row sm:items-center sm:justify-between">
            <div class="text-gray-300 text-sm">
              Showing <span class="font-bold text-green-400">{{ from }}-{{ to }}</span>
              of <span class="font-bold text-green-400">{{ totalItems }}</span> teams
            </div>
            <VPagination
              v-model="page"
              :length="totalPages"
              color="success"
              :total-visible="5"
              class="text-white"
              dark
            />
          </div>

          <!-- Teams Table -->
          <section v-if="totalItems > 0" class="bg-gray-800 rounded-2xl border
            border-green-500/20 overflow-hidden">
            <!-- Table Header -->
            <div class="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-900
            border-b border-green-500/30">
              <div class="col-span-3 flex items-center gap-2">
                <i class="ri-team-line text-green-400"></i>
                <span class="font-semibold text-green-400">Team Name</span>
              </div>
              <div class="col-span-2 flex items-center gap-2">
                <i class="ri-user-line text-green-400"></i>
                <span class="font-semibold text-green-400">Age Group</span>
              </div>
              <div class="col-span-3 flex items-center gap-2">
                <i class="ri-trophy-line text-green-400"></i>
                <span class="font-semibold text-green-400">Series</span>
              </div>
              <div class="col-span-2 flex items-center gap-2">
                <i class="ri-map-pin-line text-green-400"></i>
                <span class="font-semibold text-green-400">Region</span>
              </div>
              <div class="col-span-2 flex items-center justify-center gap-2">
                <i class="ri-settings-3-line text-green-400"></i>
                <span class="font-semibold text-green-400">Actions</span>
              </div>
            </div>

            <!-- Table Body -->
            <div class="divide-y divide-gray-700/50">
              <div
                v-for="(team, index) in Teams"
                :key="team.id"
                :class="[
                  'grid grid-cols-12 gap-4 px-6 py-4 transition-all duration-300',
                  'hover:bg-gray-700/30',
                  index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'
                ]"
              >
                <!-- Team Name -->
                <div class="col-span-3 flex items-center">
                  <span class="text-gray-200 font-medium truncate">
                    {{ team.name || 'Unnamed Team' }}
                  </span>
                </div>

                <!-- Age Group -->
                <div class="col-span-2 flex items-center">
                  <span class="text-gray-300">
                    {{ team.agegroup && team.agegroup.name || 'N/A' }}
                  </span>
                </div>

                <!-- Series -->
                <div class="col-span-3 flex items-center">
                  <span class="text-gray-300">
                    {{ team.series && team.series.name || 'N/A' }}
                  </span>
                </div>

                <!-- Region -->
                <div class="col-span-2 flex items-center">
                  <span class="text-gray-300">
                    {{ getRegionName(team.region_id) || 'N/A' }}
                  </span>
                </div>

                <!-- Actions -->
                <div class="col-span-2 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    class="text-blue-400 hover:text-blue-300 transition-colors
                    duration-200 p-2 rounded-lg hover:bg-blue-600/20"
                    @click="openEditTeamDialog(team)"
                    title="Edit Team"
                  >
                    <i class="ri-pencil-line text-lg"></i>
                  </button>
                  <button
                    type="button"
                    class="text-red-400 hover:text-red-300 transition-colors
                    duration-200 p-2 rounded-lg hover:bg-red-600/20"
                    @click="openDeleteTeamDialog(team)"
                    title="Delete Team"
                  >
                    <i class="ri-delete-bin-line text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Empty State -->
          <section
            v-if="totalPages === 0"
            class="flex h-60 items-center justify-center 
                  rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 
                  border-2 border-dashed border-green-500/30"
          >
            <div class="text-center">
              <i class="ri-team-line text-6xl text-green-500/50 mb-4"></i>
              <h3 class="text-xl font-bold text-gray-300 mb-2">
                No Teams Available
              </h3>
              <p class="text-gray-400">
                Get started by adding your first team
              </p>
            </div>
          </section>
        </section>
      </div>

    <AddTeamModal
      :active="showAddTeamModal"
      :field="FieldList"
      :series="seriesList"
      :agegroup="ageGroupList"
      :regions="regionList"
      @close="closeAddTeamDialog"
      @confirm="AddTeam"
      />


      <EditTeamModal
      :active="showEditTeamModal"
      :field="FieldList"
      :series="seriesList"
      :agegroup="ageGroupList"
      :regions="regionList"
      :team="selectedData"
      @close="closeEditTeamDialog"
      @confirm="EditTeam"
      />

      <DeleteTeamModal
      :active="showDeleteTeamModal"
      :team="selectedData"
      @close="closeDeleteTeamDialog"
      @confirm="DeleteTeam"
      />

    </div>
  </template>

<script>
import AddTeamModal from '~/components/modals/AddTeamModal.vue';
import EditTeamModal from '~/components/modals/EditTeamModal.vue';
import DeleteTeamModal from '~/components/modals/DeleteTeamModal.vue';
export default {
  components: {
    AddTeamModal,
    EditTeamModal,
    DeleteTeamModal
  },
  props: {
    FieldList: {
      type: Array,
      required: false,
      default: () => []
    },
    getTeams: {
      type: Function,
      required: false,
      default: () => () => {}
    },
    getEvents: {
      type: Function,
      required: false,
      default: () => () => {}
    },
  },
  data() {
    return {
      selectedData: {},
      showAddTeamModal: false,
      showEditTeamModal: false,
      showDeleteTeamModal: false,
      selectedRegion: null,
      selectedSeries: null,
      Teams: [],
      ageGroupList: [],
      seriesList: [],
      regionList: [],
      query: null,
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
      Rules: [
        value => !!value || 'Name is required.',
        value => (value.length || 0) <= 10 || 'Name must be less than 10 characters.'
      ],
    };
  },
  computed: {
    formattedSeriesItems() {
      const formatted = (this.seriesList || []).map(series => ({
        text: series.name,
        value: series.id
      }));
      return [ { text: 'All Series', value: null }, ...formatted ];
    },
    formattedRegionItems() {
      const formatted = (this.regionList || []).map(region => ({
        text: region.name,
        value: region.id
      }));
      return [ { text: 'All Regions', value: null }, ...formatted ];
    },
  },
  watch: {
    totalPages() {
      if (this.page > this.totalPages && this.totalPages > 0) {
        this.page = this.totalPages;
        this.retrieveTeams();
      } else if (this.page > 1 && this.totalPages === 0) {
        this.page = 1;
        this.retrieveTeams();
      }
    },
    selectedRegion(newVal) {
      this.page = 1;
      this.retrieveTeams();
    },
    selectedSeries(newVal) {
      this.page = 1;
      this.retrieveTeams();
    },
    page: {
      handler(newPage) {
        this.retrieveTeams()
        this.retrieveAgeGroups()
        this.retrieveSeries()
        this.retrieveRegions()
        this.retrieveMainDisplayData();

      },
      immediate: true,
    },
  },
  async mounted() {
    try {
      console.log("Component mounted. Fetching lookup data...");
      await Promise.all([
        this.retrieveAgeGroups(),
        this.retrieveSeries(),
        this.retrieveRegions()
      ]);
      console.log("Lookup data fetched. Fetching initial teams...");
      await this.retrieveTeams();
    } catch (error) {
      console.error("Error during component mount initialization:", error);
      this.$oruga.notification.open({
        message: 'Failed to load initial data. Please try refreshing.',
        variant: 'danger',
        duration: 5000,
        position: 'bottom'
      });
    }
  },
  methods: {
    retrieveAgeGroups() {
      const query = { q: this.query };

      Object.keys(query).forEach((key) => {
        if (query[key] == null || query[key] === '') {
          delete query[key];
        }
      });

      const queryString = new URLSearchParams(query).toString();

      return this.$axios
        .$get(`v1/agegroups?${queryString}`)
        .then((response) => {
          this.ageGroupList = response.data.ageGroups || [];
          console.log('All Age Groups Loaded:', this.ageGroupList.length);
        })
        .catch(error => {
          console.error('Error fetching age groups:', error);
          this.ageGroupList = [];
          throw error;
        });
    },

    async retrieveSeries() {
      try {
        const response = await this.$axios.$get('v1/series');
        this.seriesList = (response.data.series || response.data || []).filter(series =>
          series.type !== 'weekly'
        );
        console.log('All Series Loaded:', this.seriesList.length);
      } catch (error) {
        console.error('Error fetching series list:', error);
        this.seriesList = [];
        throw error;
      }
    },

    async retrieveRegions() { // Make it async or ensure promise return
      try {
        const response = await this.$axios.$get('v1/regions'); // Assuming this fetches all regions
        // Ensure correct path to region data
        this.regionList = response.data.regions || response.data || [];
        console.log('All Regions Loaded:', this.regionList.length);
      } catch (error) {
        console.error('Failed to retrieve regions:', error);
        this.regionList = [];
        throw error;
      }
    },

    onFilterChange() {
      this.page = 1; 
      this.retrieveTeams();
    },

    retrieveMainDisplayData() {

      const params = {
        q: this.query,
        page: this.page,
      };

      if (this.selectedSeries !== null) {
        params.series = this.selectedSeries;
      }
      if (this.selectedRegion !== null) {
        params.region = this.selectedRegion;
      }
    },
    matchField(id) {
      const fieldData = this.FieldList.find(field => field.id === id);
      return fieldData ? fieldData.name : '';
    },
    setPage() {
      this.retrieveTeams();
    },
    openAddTeamDialog(a) {
      this.showAddTeamModal = true
    },
    openEditTeamDialog(a) {
      this.selectedData = a;
      this.showEditTeamModal = true
    },
    openDeleteTeamDialog(a) {
      this.selectedData = a;
      this.showDeleteTeamModal = true
    },
    closeAddTeamDialog(a) {
      this.showAddTeamModal = false
    },
    closeEditTeamDialog(a) {
      this.selectedData = ({});
      this.showEditTeamModal = false
    },
    closeDeleteTeamDialog(a) {
      this.selectedData = ({});
      this.showDeleteTeamModal = false
    },
    AddTeam(response) {
      console.log('AddTeam confirmed, data from modal (if any):', response);
        
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Team Added Successfully',
        position: 'bottom',
        variant: 'success',
        queue: true
      });
        
      this.showAddTeamModal = false;
        
      this.retrieveTeams().then(() => {
        if (typeof this.getTeams === 'function') this.getTeams();
        if (typeof this.getEvents === 'function') this.getEvents();
      });
    },
    async EditTeam() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Team Modified Successfully',
        position: 'bottom',
        variant: 'success',
        queue: true
      });
      this.showEditTeamModal = false;
      await this.retrieveTeams();
      if (typeof this.getTeams === 'function') this.getTeams();
      if (typeof this.getEvents === 'function') this.getEvents();
    },
    async DeleteTeam(deletedTeamId) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Team Removed Successfully',
        position: 'bottom',
        variant: 'success',
        queue: true
      });
      this.showDeleteTeamModal = false;
    
      await this.retrieveTeams();
      if (typeof this.getTeams === 'function') this.getTeams();
      if (typeof this.getEvents === 'function') this.getEvents();
    },
    async retrieveTeams() {
      try {
        if (this.ageGroupList.length === 0 && this.totalItems > 0) { 
          console.warn("retrieveTeams: ageGroupList is empty. Attempting to reload it.");
          await this.retrieveAgeGroups();
        }

        const queryData = {
          q: this.query,
          sort: 'a_to_z',
          page: this.page,
          // eslint-disable-next-line camelcase
          series_id: this.selectedSeries,
          // eslint-disable-next-line camelcase
          region_id: this.selectedRegion,
          maxTeamsPerPage: this.perPage,
        };

        Object.keys(queryData).forEach((key) => {
          if (queryData[key] == null) {
            delete queryData[key];
          }
        });

        const queryString = new URLSearchParams(queryData).toString();
        const response = await this.$axios.$get(`v1/teams?${queryString}`);
        
        this.Teams = response.data.teams.map(team => {
          const ageGroup = this.ageGroupList.find(ag => ag.id === team.agegroup_id);
          const series = this.seriesList.find(s => s.id === team.series_id);

          return {
            ...team,
            name: team.name || '',
            agegroup: {
              name: ageGroup ? ageGroup.name : `(ID: ${team.agegroup_id})`,
              id: team.agegroup_id
            },
            series: { 
              name: series ? series.name : `(ID: ${team.series_id})`,
              id: team.series_id
            },
          };
        });

        this.totalItems = response.data.total_items;
        this.totalPages = response.data.last_page;
        this.from = response.data.from;
        this.to = response.data.to;

      } catch (error) {
        console.error('Error retrieving teams:', error);
        this.$oruga.notification.open({
          message: 'Failed to load teams. ' + (error.response.data.message || error.message),
          variant: 'danger',
          duration: 5000,
          position: 'bottom'
        });
        this.Teams = [];
        this.totalItems = 0;
        this.totalPages = 0;
      }
    },

    getRegionName(regionId) {
      const region = this.regionList.find(r => r.id === regionId);
      return region ? region.name : 'Unknown';
    },
  }
}
</script>