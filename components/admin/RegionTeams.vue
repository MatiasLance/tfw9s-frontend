<template>
  <div>
    <div class="bg-[#1A1A1B]" data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-4 p-4">
        <div class="grid grid-cols-1 gap-4">
          <div class="col-span-1 flex items-center flex items-center gap-4">
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
            @click="openAddTeamDialog"
          >
            +
          </button>
   <div class="flex items-center gap-2 ml-auto">
    
        <select
    id="series-select"
    v-model="selectedSeries"
    @change="retrieveTeams"
    class="rounded-md px-3 py-1 bg-white text-black shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
  >
    <option :value="null">All Series</option>
    <option v-for="series in seriesList" :key="series.id" :value="series.id">
      {{ series.name }}
    </option>
  </select>
    <select
      id="region-select"
      v-model="selectedRegion"
      @change="retrieveTeams"
      class="rounded-md px-3 py-1 bg-white text-black shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
    >
      <option :value="null">All Regions</option>
      <option v-for="region in regionList" :key="region.id" :value="region.id">
        {{ region.name }}
      </option>
    </select>
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
              @change="setPage"
              />
          </div>
          <section class="col-span-1">
            <div
            class="grid grid-cols-1 overflow-y-hidden
            overflow-x-scroll md:overflow-x-hidden"
            >
              <div
              v-if="totalPages > 0"
              class="col-span-1 flex min-w-[960px] pr-24 md:w-auto"
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
              <div class="flex min-w-[960px] items-center justify-center">
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
                />              </div>
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
      required: true
    },
    getTeams: {
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
      selectedData: ({}),
      showAddTeamModal: false,
      showEditTeamModal: false,
      showDeleteTeamModal: false,
      selectedRegion: null,
      selectedSeries: null,
      Teams: [],
      Dataset: [],
      ageGroupList: [],
      seriesList: [],
      regionList: [],
      query: '',
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
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
    };
  },
  mounted() {
    this.retrieveTeams();
    this.retrieveAgeGroups();
    this.retrieveSeries();
    this.retrieveRegions();
  },
  watch: {
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
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

      },
      immediate: true,
    },
  },
  methods: {
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
  console.log('AddTeam response:', response);
  
  this.$oruga.notification.open({
    duration: 5000,
    message: response?.message || 'Team Added',
    position: 'bottom',
    variant: 'success',
    queue: true
  });
  
  this.showAddTeamModal = false;
  
  Promise.all([
    this.retrieveTeams(),
    this.retrieveAgeGroups(),
    this.retrieveSeries(),
    this.retrieveRegions()
  ]).then(() => {
    this.getTeams();
    this.getEvents();
  });
},
    EditTeam() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Team Modified',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showEditTeamModal = false;
      this.retrieveTeams();
      this.getTeams();
      this.getEvents();
    },
    DeleteTeam() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Team Removed',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showDeleteTeamModal = false;
      this.retrieveTeams();
      this.getTeams();
      this.getEvents();
    },
async retrieveTeams() {
  try {
    if (this.regionList.length === 0) {
      await this.retrieveRegions();
    }

const queryData = {
  q: this.query,
  sort: 'a_to_z',
  page: this.page,
  region: this.selectedRegion,
  seriestype: this.selectedSeries,
  maxTeamsPerPage: 10,
  
};

    Object.keys(queryData).forEach((key) => {
        if (queryData[key] == null) {
          delete queryData[key]
        }
      })
 
    const queryString = new URLSearchParams(queryData).toString();

    const response = await this.$axios.$get(`v1/teams?${queryString}`);
    
    this.Teams = response.data.teams.map(team => {
      const ageGroup = this.ageGroupList.find(ag => ag.id === team.agegroup_id) || {};
      
      const series = this.seriesList.find(s => s.id === team.series_id) || {};
      
      return {
        ...team,
        name: team.name,
        agegroup: {
          name: ageGroup.name || '',
          id: team.agegroup_id
        },
        series: {
          name: series.name || '',
          id: team.series_id
        },
        region_id: team.region_id
      };
    });

    this.totalItems = response.data.total_items;
    this.totalPages = response.data.last_page;
    this.from = response.data.from;
    this.to = response.data.to;
    
    console.log('Processed Teams:', this.Teams);
  } catch (error) {
    console.error('Error retrieving teams:', error);
  }
},

  getRegionName(regionId) {
      const region = this.regionList.find(r => r.id === regionId);
      return region ? region.name : 'Unknown';
    },
retrieveAgeGroups() {
  const query = {
    q: this.query,
    page: this.page,
  };

  Object.keys(query).forEach((key) => {
    if (query[key] == null) {
      delete query[key]
    }
  })

  const queryString = new URLSearchParams(query).toString()

  return this.$axios
    .$get(`v1/agegroups?${queryString}`)
    .then((response) => {
      this.ageGroupList = response.data.ageGroups;
    })
    .catch(error => {
      console.error('Error retrieving age groups:', error);
      this.ageGroupList = []; 
    });
},
    retrieveSeries() {
      this.$axios
        .$get('v1/series')
        .then((response) => {
          this.seriesList = response.data.series.filter(series =>
            series.type !== 'weekly');
        })
        .finally(() => {
          this.showVueTable = true;
        });
    },
async retrieveRegions() {
  try {
    const response = await this.$axios.$get('v1/regions');
    console.log('Retrieved regions:', response.data.regions);
    this.regionList = response.data.regions;
  } catch (error) {
    console.error('Failed to retrieve regions:', error);
  }
}
  }
}
</script>

<style scoped>
.superheadline {
color: aliceblue;
}
</style>