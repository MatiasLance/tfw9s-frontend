<!-- eslint-disable max-len -->
<!-- eslint-disable vue/max-len -->
<template>
  <div>
    <div class="bg-[#1A1A1B]" data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-4 p-4">
      <!-- Tabs with Add Button aligned right -->
        <div class="flex items-center justify-between mb-4">
          <!-- Tabs -->
          <div class="flex gap-2">
            <button
              type="button"
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'rounded-md px-4 py-1.5 text-center text-sm',
                activeTab === tab.id
                  ? 'font-semibold text-white bg-gradient-to-brfrom-[#5EE738] via-[#3e872a] to-[#050505]'
                  : 'font-semibold bg-[#212121] text-[#555555]'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
        <div v-if="activeTab === 'matches'" class="grid grid-cols-1 gap-4">
          <!-- Your existing regions content goes here -->
          <div class="col-span-1 flex items-center">
            <button
              type="button"
              class="w-full rounded-md bg-gradient-to-br from-[#5EE738] via-[#3e872a] to-[#050505] py-1.5 text-center font-semibold text-white sm:w-36"
              @click="openAddRegionDialog"
            >
              +
            </button>
          </div>
          <div
            v-if="totalPages > 0"
            class="col-span-1 flex flex-wrap items-center justify-around gap-x-2 md:justify-between"
            data-aos="flip-up" data-aos-once="true"
          >
            <span class="font-medium text-white">
              Showing {{ from }}-{{ to }} of {{ totalItems }} items
            </span>
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
          <section v-if="totalPages > 0" class="col-span-1">
            <div class="grid grid-cols-1 overflow-x-scroll overflow-y-hidden md:overflow-x-hidden">
              <table class="col-span-1 min-w-[640px]">
                <tr 
                  v-for="(region) in RegionList"
                  :key="region.id"
                  data-aos="flip-down" data-aos-duration="500"
                  data-aos-offset="0" data-aos-once="true"
                >
                  <td class="flex-1 bg-white px-2 py-1 border-b-[2.5px] border-[#1a1a1b]">
                    {{region.name||'N/A'}}
                  </td>
                  <td class="w-[116px] text-center">
                    <i
                      class="ri-pencil-fill px-4 text-xl text-white"
                      @click="openEditRegionDialog(region)"
                    />
                    <i
                      class="ri-delete-bin-fill px-4 text-xl text-red-400"
                      @click="openDeleteRegionDialog(region)"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </section>
          <section
            v-if="totalPages=== 0"
            class="col-span-1 flex h-60 items-center justify-center font-semibold text-[#555555] md:col-span-3"
          >
            No Regions Available
          </section>
        </div>
        <div v-if="activeTab === 'teams'" class="grid grid-cols-1 gap-4">
          <RegionTeams 
            v-if="activeTab === 'teams'"
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
  props: {
    getRegions: {
      type: Function,
      required: true,
    },
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
      this.getRegions()
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
      this.getRegions()
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
      this.getRegions()
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