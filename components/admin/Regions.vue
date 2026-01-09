<!-- eslint-disable max-len -->
<!-- eslint-disable vue/max-len -->
<template>
  <div>
    <div data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-6 p-4 sm:p-6">
        <!-- Sporty Header with Tabs -->
        <div class="mb-8">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <!-- Simple Sporty Tabs -->
            <div class="bg-gray-800 rounded-xl p-2 border border-green-500/30">
              <div class="flex gap-1 overflow-x-auto">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  type="button"
                  :class="[
                    'rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200',
                    'flex items-center gap-2 min-w-[100px] justify-center',
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  ]"
                  @click="activeTab = tab.id"
                >
                  <i :class="getTabIcon(tab.id)" class="text-base"></i>
                  <span class="whitespace-nowrap">{{ tab.label }}</span>
                </button>
              </div>
            </div>

            <!-- Add Button -->
            <button
              v-if="activeTab === 'matches'"
              type="button"
              class="rugby-add-btn bg-gradient-to-r from-green-500 to-green-600 
                    hover:from-green-600 hover:to-green-700 text-gray-50 
                    font-bold py-3 px-6 rounded-xl transition-all duration-300 
                    transform hover:scale-105 shadow-lg hover:shadow-xl 
                    flex items-center gap-2 whitespace-nowrap"
              @click="openAddRegionDialog"
            >
              <i class="ri-add-line text-xl"></i>
              Add Region
            </button>
          </div>
        </div>

        <!-- Matches Tab Content -->
        <div v-if="activeTab === 'matches'" class="grid grid-cols-1 gap-6">
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
                of <span class="font-bold text-green-400">{{ totalItems }}</span> regions
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

          <!-- Regions Table -->
          <section v-if="totalPages > 0" class="col-span-1">
            <div class="rugby-table-container bg-gradient-to-br from-gray-800 to-gray-900 
                        rounded-2xl border border-green-500/20 shadow-lg overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full min-w-[600px]">
                  <thead>
                    <tr class="border-b-2 border-green-500/30">
                      <th class="px-6 py-4 text-left">
                        <div class="flex items-center gap-2 text-green-400 font-bold">
                          <i class="ri-map-pin-line"></i>
                          Region Name
                        </div>
                      </th>
                      <th class="px-6 py-4 text-center">
                        <div class="flex items-center gap-2 text-green-400 font-bold">
                          <i class="ri-settings-3-line"></i>
                          Actions
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="(region, index) in RegionList"
                      :key="region.id"
                      :class="[
                        'border-b border-gray-700/50 transition-all duration-300',
                        'hover:bg-gray-700/30 group',
                        index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'
                      ]"
                      data-aos="fade-up"
                      :data-aos-delay="index * 100"
                    >
                      <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                          <div class="bg-green-600/20 rounded-lg p-2">
                            <i class="ri-flag-2-line text-green-400 text-lg"></i>
                          </div>
                          <span class="text-gray-200 font-semibold text-lg">
                            {{ region.name || 'N/A' }}
                          </span>
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="flex items-center justify-center gap-3">
                          <!-- Edit Button -->
                          <button
                            type="button"
                            class="rugby-action-btn bg-blue-600/20 hover:bg-blue-600 
                                  text-blue-400 hover:text-gray-50 rounded-lg p-3 
                                  transition-all duration-300 transform hover:scale-110 
                                  border border-blue-500/30 hover:border-blue-400"
                            @click="openEditRegionDialog(region)"
                          >
                            <i class="ri-pencil-line text-lg"></i>
                          </button>
                          
                          <!-- Delete Button -->
                          <button
                            type="button"
                            class="rugby-action-btn bg-red-600/20 hover:bg-red-600 
                                  text-red-400 hover:text-gray-50 rounded-lg p-3 
                                  transition-all duration-300 transform hover:scale-110 
                                  border border-red-500/30 hover:border-red-400"
                            @click="openDeleteRegionDialog(region)"
                          >
                            <i class="ri-delete-bin-line text-lg"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <!-- Empty State -->
          <section
            v-if="totalPages === 0"
            class="col-span-1 flex h-80 items-center justify-center 
                  rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 
                  border-2 border-dashed border-green-500/30"
          >
            <div class="text-center">
              <i class="ri-map-pin-line text-6xl text-green-500/50 mb-4"></i>
              <h3 class="text-xl font-bold text-gray-300 mb-2">
                No Regions Available
              </h3>
              <p class="text-gray-400">
                Get started by adding your first region
              </p>
            </div>
          </section>
        </div>

        <!-- Teams Tab Content -->
        <div v-if="activeTab === 'teams'" class="grid grid-cols-1 gap-6">
          <RegionTeams 
            :regions="RegionList"
            @refresh="retrieveRegions"
          />
        </div>
      </section>
    </div>
    <AddRegionModal
    :active="showAddRegionModal"
    @close="closeAddRegionDialog"
    @confirm="AddRegion"
    />
    <EditRegionModal
    :active="showEditRegionModal"
    :region_data="selectedRegion"
    @close="closeEditRegionDialog"
    @confirm="UpdateRegion"
    />
    <DeleteRegionModal
    :active="showDeleteRegionModal"
    :region_data="selectedRegion"
    @close="closeDeleteRegionDialog"
    @confirm="DeleteRegion"
    />
  </div>
</template>

<script>
import AddRegionModal from '~/components/modals/AddRegionModal.vue';
import EditRegionModal from '~/components/modals/EditRegionModal.vue';
import DeleteRegionModal from '~/components/modals/DeleteRegionModal.vue';
import RegionTeams from '~/components/admin/RegionTeams.vue';
export default {
  components: {
    AddRegionModal,
    EditRegionModal,
    DeleteRegionModal,
    RegionTeams
  },
  data() {
    return {
      showAddRegionModal: false,
      showEditRegionModal: false,
      showDeleteRegionModal: false,
      selectedRegion: ({}),
      RegionList: [],
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
      activeTab: 'matches',
      tabs: [
        { id: 'matches', label: 'Matches' },
        { id: 'teams', label: 'Teams' }
      ],
    };
  },
  watch: {
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
    page: {
      handler(newPage) {
        this.retrieveRegions()
      },
      immediate: true,
    },
  },
  methods: {
    getTabIcon(tabId) {
      const icons = {
        'matches': 'ri-map-pin-line',
        'teams': 'ri-team-line',
        'players': 'ri-user-line',
        'fixtures': 'ri-calendar-event-line'
      };
      return icons[tabId] || 'ri-file-text-line';
    },
    setPage() {
      this.retrieveRegions();
    },
    openAddRegionDialog(a) {
      this.showAddRegionModal = true
    },
    openEditRegionDialog(data) {
      this.selectedRegion = data
      this.showEditRegionModal = true
    },
    openDeleteRegionDialog(data) {
      this.selectedRegion = data
      this.showDeleteRegionModal = true
    },
    closeAddRegionDialog(a) {
      this.showAddRegionModal = false
    },
    closeEditRegionDialog(data) {
      this.selectedRegion = ({})
      this.showEditRegionModal = false
    },
    closeDeleteRegionDialog(data) {
      this.selectedRegion = ({})
      this.showDeleteRegionModal = false
    },
    openAddTeamDialog() {
      console.log('Add team dialog will open');
    },
    AddRegion() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Region Added',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showAddRegionModal = false;
      this.retrieveRegions();
    },
    UpdateRegion(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Region Updated',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showEditRegionModal = false;
      this.retrieveRegions();
    },
    DeleteRegion(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Region Removed',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showDeleteRegionModal = false;
      this.retrieveRegions();
    },
    retrieveRegions() {
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        maxRegionsPerPage: 10,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/regions?${queryString}`)
        .then((response) => {
          this.RegionList = response.data.regions;
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
    },
  }
};
</script>

<style scoped>
.rugby-tab-btn {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.rugby-tab-btn:hover {
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.15);
}

.rugby-add-btn {
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
}

.rugby-add-btn:hover {
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
}

.rugby-action-btn {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.rugby-action-btn:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Responsive improvements */
@media (max-width: 640px) {
  
  .rugby-tab-btn {
    padding: 0.75rem 1rem;
    min-width: 100px;
  }
  
  .rugby-add-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>