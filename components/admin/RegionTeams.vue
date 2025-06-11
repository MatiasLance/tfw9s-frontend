  <template>
    <div>
      <div class="bg-[#1A1A1B]" data-aos="fade-up">
        <section class="mx-auto max-w-screen-xl gap-4 p-4">
          <div class="grid grid-cols-1 gap-4 flex">
            <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
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
                  sm:w-40"
                @click="openAddTeamDialog"
              >
                +
              </button>
            <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div class="flex flex-col w-full sm:w-auto md:max-w-[280px]">
              <VSelect
                  v-model="selectedSeries"
                  :items="formattedSeriesItems"
                  placeholder="Select Series"
                  solo
                  class="w-full"
                  :hide-details="true"
                  @change="onFilterChange"
              />
            </div>
    
            <div class="flex flex-col w-full sm:w-auto md:max-w-[280px]">
              <VSelect
                  v-model="selectedRegion"
                  :items="formattedRegionItems"
                  placeholder="Select Region"
                  solo
                  class="w-full"
                  :hide-details="true"
                  @change="onFilterChange"
              />
            </div>
            </div>
            </div>
            <div
              v-if="totalPages > 0"
              class="col-span-1 flex flex-wrap items-center
              justify-around gap-x-2 md:justify-between"
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
            />
            </div>
            <section class="col-span-1">
              <div class="overflow-x-auto">
              <div class="inline-block min-w-full text-center">
                <div 
                    v-if="totalItems  > 0"
                    class="flex min-w-[1200px] pr-24 md:w-auto"
                    data-aos="flip-up"
                >
                  <span
                  class="flex-1 text-center px-4 py-2 align-middle
                  text-[20px] font-semibold text-[#555555]"
                  >
                  Team
                  </span>
                  <span
                  class="flex-1 text-center px-4 py-2 align-middle
                  text-[20px] font-semibold text-[#555555]"
                  >
                  Age Group
                  </span>
                  <span
                  class="flex-1 text-center px-4 py-2 align-middle
                  text-[20px] font-semibold text-[#555555]"
                  >
                  Series
                  </span>
                  <span
                  class="flex-1 text-center px-4 py-2 align-middle
                  text-[20px] font-semibold text-[#555555]"
                  >
                  Region
                  </span>
                </div>
                <div
                v-for="(data) in Teams"
                :key="data.id" class="col-span-1 mb-0.5 gap-0"
                data-aos="flip-down" data-aos-duration="500"
                data-aos-offset="0"  data-aos-once="true"
                >
                <div class="flex min-w-[640px] items-center justify-center">
                  <input
                  v-model="data.name"
                  :rules="Rules"
                  placeholder="Enter Team"
                  hide-details
                  required
                  :disabled="true"
                  class="mr-0.5 flex-1 border-black bg-white p-1"
                  />
                  <input
                  v-model="data.agegroup.name"
                  :rules="Rules"
                  hide-details
                  required
                  :disabled="true"
                  class="mr-0.5 flex-1 border-black bg-white p-1"
                  />
                  <input
                  v-model="data.series.name"
                  :rules="Rules"
                  hide-details
                  required
                  :disabled="true"
                  class="mr-0.5 flex-1 border-black bg-white p-1"
                  />
                  <input
                  :value="getRegionName(data.region_id)"
                  @input="handleRegionInput(data, $event)"
                  :rules="Rules"
                  hide-details
                  required
                  readonly
                  class="mr-0.5 flex-1 border-black bg-white p-1"
                  />
                  <i
                  class="ri-pencil-fill px-4 text-xl text-white"
                  @click="openEditTeamDialog(data)"
                  />
                  <i
                  class="ri-delete-bin-fill px-4 text-xl text-red-400"
                  @click="openDeleteTeamDialog(data)"
                  />              
              </div>
              </div>
              </div>
            </div>
            </section>
            <section
            v-if="totalPages === 0"
            class="col-span-1 flex h-60 items-center
            justify-center font-semibold
            text-[#555555] md:col-span-3"
            >
            No Teams Available
            </section>
          </div>
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
        value => (value?.length || 0) <= 10 || 'Name must be less than 10 characters.'
      ],
    };
  },
  computed: {
    formattedSeriesItems() {
      const formatted = (this.seriesList || []).map(series => ({
        text: series.name,
        value: series.id
      }));
      return [{ text: 'All Series', value: null }, ...formatted];
    },
    formattedRegionItems() {
      const formatted = (this.regionList || []).map(region => ({
        text: region.name,
        value: region.id
      }));
      return [{ text: 'All Regions', value: null }, ...formatted];
    },
  },
  watch: {
    page(newPage, oldPage) {
      if (newPage !== oldPage) {
        this.retrieveTeams();
      }
    },
  },
  async mounted() {
    try {
      await Promise.all([
        this.retrieveSeries(),
        this.retrieveRegions(),
        this.retrieveAgeGroups()
      ]);
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
    onFilterChange() {
      this.page = 1; 
      this.retrieveTeams();
    },
    async retrieveTeams() {
      try {
        const queryData = {
          q: this.query,
          sort: 'a_to_z',
          page: this.page,
          seriestype: this.selectedSeries,
          region: this.selectedRegion,
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
          message: 'Failed to load teams. ' + (error.response?.data?.message || error.message),
          variant: 'danger',
          duration: 5000,
          position: 'bottom'
        });
        this.Teams = [];
        this.totalItems = 0;
        this.totalPages = 0;
      }
    },
    async retrieveAgeGroups() {
      try {
        const response = await this.$axios.$get('v1/agegroups');
        this.ageGroupList = response.data.ageGroups || [];
      } catch (error) {
        console.error('Error fetching age groups:', error);
        this.ageGroupList = [];
        throw error;
      }
    },
    async retrieveSeries() {
      try {
        const response = await this.$axios.$get('v1/series');
        this.seriesList = (response.data.series || []).filter(s => s.type !== 'weekly');
      } catch (error) {
        console.error('Error fetching series list:', error);
        this.seriesList = [];
        throw error;
      }
    },
    async retrieveRegions() {
      try {
        const response = await this.$axios.$get('v1/regions');
        this.regionList = response.data.regions || [];
      } catch (error) {
        console.error('Failed to retrieve regions:', error);
        this.regionList = [];
        throw error;
      }
    },
    getRegionName(regionId) {
      const region = this.regionList.find(r => r.id === regionId);
      return region ? region.name : 'Unknown';
    },
    openAddTeamDialog() { 
      this.showAddTeamModal = true 
    },
    openEditTeamDialog(data) {
      this.selectedData = data;
      this.showEditTeamModal = true
    },
    openDeleteTeamDialog(data) {
      this.selectedData = data;
      this.showDeleteTeamModal = true
    },
    closeAddTeamDialog() { 
      this.showAddTeamModal = false 
    },
    closeEditTeamDialog() {
      this.selectedData = {};
      this.showEditTeamModal = false
    },
    closeDeleteTeamDialog() {
      this.selectedData = {};
      this.showDeleteTeamModal = false
    },
    async AddTeam() {
      this.$oruga.notification.open({ duration: 5000, message: 'Team Added Successfully', position: 'bottom', variant: 'success', queue: true });
      this.showAddTeamModal = false;
      await this.retrieveTeams();
      if (typeof this.getTeams === 'function') this.getTeams();
    },
    async EditTeam() {
      this.$oruga.notification.open({ duration: 5000, message: 'Team Modified Successfully', position: 'bottom', variant: 'success', queue: true });
      this.showEditTeamModal = false;
      await this.retrieveTeams();
      if (typeof this.getTeams === 'function') this.getTeams();
    },
    async DeleteTeam() {
      this.$oruga.notification.open({ duration: 5000, message: 'Team Removed Successfully', position: 'bottom', variant: 'success', queue: true });
      this.showDeleteTeamModal = false;
      await this.retrieveTeams();
      if (typeof this.getTeams === 'function') this.getTeams();
    },
  }
}
</script>
 
  <style scoped>
  .superheadline {
  color: aliceblue;
  }
  </style>