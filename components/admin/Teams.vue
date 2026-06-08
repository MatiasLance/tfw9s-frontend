<template>
  <div>
    <div data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-4 p-4">
        <div class="grid grid-cols-1 gap-4">
          <div
          class="
          col-span-1 flex flex-col md:flex-row
          lg:flex-row justify-between
          items-center space-x-3
          space-y-3
          sm:space-y-3
          sm:space-x-3"
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
              @click="openAddTeamDialog"
            >
              <span class="text-white">+ Add Team</span>
            </button>
            
            <YearFilter
              v-model="selectedYear"
              :start-year="2020"
              :end-year="2050"
              @year-change="handleYearChange"
              class="flex-1 max-w-xs"
            />
          </div>

          <!-- Pagination Info -->
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
                of <span class="font-bold text-green-400">{{ totalItems }}</span> teams
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

          <section class="col-span-1">
            <div class="overflow-x-auto bg-gray-800 border border-green-500/20 rounded-2xl">
              <!-- Header -->
              <div
                v-if="totalItems > 0"
                class="grid grid-cols-12 gap-4 px-6 py-4
                bg-gray-900 border-b border-green-500/30"
              >
                <span class="col-span-3 text-left text-sm font-semibold
                text-green-400 uppercase tracking-wide">
                  Team
                </span>
                <span class="col-span-2 text-left text-sm font-semibold
                  text-green-400 uppercase tracking-wide">
                  Age Group
                </span>
                <span class="col-span-3 text-left text-sm font-semibold
                  text-green-400 uppercase tracking-wide">
                  Series
                </span>
                <span class="col-span-2 text-left text-sm font-semibold
                  text-green-400 uppercase tracking-wide">
                  Region
                </span>
                <span class="col-span-2 text-center text-sm font-semibold
                  text-green-400 uppercase tracking-wide">
                  Actions
                </span>
              </div>

              <!-- Rows -->
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
                    <input
                      v-model="team.name"
                      placeholder="Enter Team"
                      :disabled="true"
                      class="w-full bg-transparent text-gray-200 font-medium truncate border-none outline-none p-0 placeholder-gray-500"
                    />
                  </div>

                  <!-- Age Group -->
                  <div class="col-span-2 flex items-center">
                    <input
                      v-model="team.agegroup.name"
                      placeholder="N/A"
                      :disabled="true"
                      class="w-full bg-transparent text-gray-300 border-none outline-none p-0 placeholder-gray-500"
                    />
                  </div>

                  <!-- Series -->
                  <div class="col-span-3 flex items-center">
                    <input
                      v-model="team.series.name"
                      placeholder="N/A"
                      :disabled="true"
                      class="w-full bg-transparent text-gray-300 border-none outline-none p-0 placeholder-gray-500"
                    />
                  </div>

                  <!-- Region -->
                  <div class="col-span-2 flex items-center">
                    <input
                      :value="getRegionName(team.region_id) || ''"
                      placeholder="N/A"
                      readonly
                      class="w-full bg-transparent text-gray-300 border-none outline-none p-0 placeholder-gray-500"
                      @input="handleRegionInput(team, $event)"
                    />
                  </div>

                  <!-- Actions -->
                  <div class="col-span-2 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      class="hover:text-green-300 transition-colors duration-200 p-2 rounded-lg hover:bg-green-600/20"
                      @click="openEditTeamDialog(team)"
                      title="Edit Team"
                    >
                      <span class="text-green-400">
                        <i class="ri-pencil-line text-lg"></i>
                      </span>
                    </button>

                    <button
                      type="button"
                      class="hover:text-red-300 transition-colors duration-200 p-2 rounded-lg hover:bg-red-600/20"
                      @click="openDeleteTeamDialog(team)"
                      title="Delete Team"
                    >
                      <span class="text-red-400">
                        <i class="ri-delete-bin-line text-lg"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            v-if="totalPages === 0"
            class="col-span-1 md:col-span-3 flex flex-col
            items-center justify-center
            h-60 text-center px-6"
          >
            <div class="mb-3 text-gray-400">
              <i class="ri-team-line text-4xl md:text-5xl" />
            </div>

            <h3 class="text-lg font-semibold text-gray-700 mb-1">
              No Teams Available
            </h3>

            <!-- Description -->
            <p class="text-sm text-gray-500 mb-4 max-w-xs">
              There are no teams to display yet. Create a new team to get started.
            </p>

            <!-- Action Button -->
            <button
              type="button"
              class="
                inline-flex
                items-center
                px-4
                py-2
                rounded-md
                bg-gradient-to-br
                from-[#5EE738]
                via-[#3e872a]
                to-[#050505]
                text-white
                text-sm
                font-medium
                shadow-sm
                hover:from-[#4ec82a]
                hover:via-[#336a20]
                transition-all
                duration-200
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-green-500
              "
              @click="openAddTeamDialog"
            >
              <i class="ri-add-line mr-1.5" />
              <span>Add Your First Team</span>
            </button>
          </section>
        </div>
      </section>
    </div>
    <AddTeamModal
    :active="showAddTeamModal"
    :field="fields"
    :series="seriesList"
    :agegroup="ageGroupList"
    :regions="regionList"
    @close="closeAddTeamDialog"
    @confirm="AddTeam"
    />
    <EditTeamModal
    :active="showEditTeamModal"
    :field="fields"
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
import _debounce from 'lodash/debounce';
import YearFilter from '~/components/YearFilter.vue';
import AddTeamModal from '~/components/modals/AddTeamModal.vue';
import EditTeamModal from '~/components/modals/EditTeamModal.vue';
import DeleteTeamModal from '~/components/modals/DeleteTeamModal.vue';
export default {
  components: {
    AddTeamModal,
    EditTeamModal,
    DeleteTeamModal,
    YearFilter
  },
  props: {
    fields: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      selectedYear: new Date().getFullYear(),
      selectedData: ({}),
      showAddTeamModal: false,
      showEditTeamModal: false,
      showDeleteTeamModal: false,
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
          if (value.length <= 10) {
            return true
          }

          return 'Name must be less than 10 characters.'
        },
      ],
    };
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
    page: {
      handler(newPage) {
        this.retrieveTeams()
      },
    },
  },
  async mounted() {
    try {
      await Promise.all([
        this.retrieveAgeGroups(),
        this.retrieveSeries(),
        this.retrieveRegions()
      ]);
    } catch (error) {
      console.error("Failed to load initial lookup data:", error);
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Failed to load some essential data. Please try refreshing.',
        position: 'bottom',
        variant: 'danger',
        queue: true
      });
    }
  
    this.retrieveTeams();
    this.retrieveSeries();
    this.retrieveAgeGroups();
  },
  methods: {
    handleYearChange(year) {
      this.selectedYear = year;
      this.query = year;
      this.retrieveTeams();
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
    AddTeam(newTeamData) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Team Added Successfully',
        position: 'bottom',
        variant: 'success',
        queue: true
      });
      
      this.showAddTeamModal = false;
      
      this.retrieveTeams();
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
    },
    retrieveTeams: _debounce(async function() {
      try {
        if (this.ageGroupList.length === 0 && this.totalItems > 0) {
          // Only log if expecting teams but no age groups
          await this.retrieveAgeGroups();
        }

        const query = {
          q: this.query,
          sort: 'a_to_z',
          page: this.page,
          maxTeamsPerPage: this.perPage,
        };

        Object.keys(query).forEach((key) => {
          if (query[key] == null || query[key] === '') {
            delete query[key];
          }
        });

        const queryString = new URLSearchParams(query).toString();
        const response = await this.$axios.$get(`v1/teams?${queryString}`);
        
        this.Teams = response.data.teams.map(team => {
          const foundAgeGroup = this.ageGroupList.find(ag => ag.id === team.agegroup_id);
          const foundSeries = this.seriesList.find(s => s.id === team.series_id);
          return {
            ...team,
            agegroup: foundAgeGroup ? 
              { name: foundAgeGroup.name, id: foundAgeGroup.id } : 
              { name: 'N/A' }, // Fallback
            series: foundSeries ? 
              { name: foundSeries.name, id: foundSeries.id } :
              { name: 'N/A' }, // Fallback
          };
        });

        this.totalItems = response.data.total_items;
        this.totalPages = response.data.last_page;
        this.from = response.data.from;
        this.to = response.data.to;
        
        if (this.Teams.some(t => t.agegroup.name.startsWith('(ID:'))) {
          console.warn("Some teams have missing age group names. Check ageGroupList and team agegroup_ids. Current ageGroupList count:", this.ageGroupList.length);
        }

      } catch (error) {
        console.error('Error retrieving teams:', error);
        this.Teams = [];
        this.totalItems = 0;
        this.totalPages = 0;
      }
    }, 100),
    getRegionName(regionId) {
      const region = this.regionList.find(r => r.id === regionId);
      return region ? region.name : '';
    },
    retrieveAgeGroups() {
      const query = { q: this.query };

      Object.keys(query).forEach((key) => {
        if (query[key] == null || query[key] === '') {
          delete query[key];
        }
      });

      const queryString = new URLSearchParams(query).toString()

      return this.$axios
        .$get(`v1/agegroups?${queryString}`)
        .then((response) => {
          this.ageGroupList = response.data.ageGroups;
        })
        .catch(error => {
          console.error('Error fetching age groups:', error);
          this.ageGroupList = [];
          throw error; 
        });
    },
    retrieveSeries() {
      this.$axios
        .$get('v1/series')
        .then((response) => {
          this.seriesList = response.data.series
        })
        .finally(() => {
          this.showVueTable = true;
        });
    },
    retrieveRegions() {
      this.$axios
        .$get('v1/regions')
        .then((response) => {
          if (response.data && response.data.regions) {
            this.regionList = response.data.regions;
          } else if (Array.isArray(response.data)) {
            this.regionList = response.data;
          } else if (Array.isArray(response)) {
            this.regionList = response;
          } else {
            console.error('Unexpected regions response format:', response);
            this.regionList = [];
          }
        })
        .catch(error => {
          console.error('Error fetching regions:', error);
          this.regionList = [];
        });
    }
  }
}
</script>

<style scoped>
.superheadline {
color: aliceblue;
}
</style>