<template>
  <div>
    <div class="bg-[#1A1A1B]" data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-4 p-4">
        <div class="grid grid-cols-1 gap-4">
          <!-- Tabs with Add Button on the same row -->
          <div class="col-span-1 flex items-center justify-between">
            <div class="flex gap-2">
              <button
                type="button"
                @click="activeTab = 'matching'"
                :class="[ 
                  'rounded-md px-4 py-1.5 text-center font-semibold text-white',
                  activeTab === 'matching'
                    ? 'bg-gradient-to-br from-[#5EE738] via-[#3e872a] to-black'
                    : 'bg-[#212121] text-[#555555]'
                ]"
              >
                Matching
              </button>

              <button
                type="button"
                @click="activeTab = 'teams'"
                :class="[ 
                  'rounded-md px-4 py-1.5 text-center font-semibold text-white',
                  activeTab === 'teams'
                    ? 'bg-gradient-to-br from-[#5EE738] via-[#3e872a] to-black'
                    : 'bg-[#212121] text-[#555555]'
                ]"
              >
                Teams
              </button>
            </div>

            <!-- Add Button now on same row, right-aligned -->
            <button
              type="button"
              @click="openAddRegionDialog"
              class="rounded-md bg-gradient-to-br from-[#5EE738] via-[#3e872a] to-[#050505] px-16 py-1.5 font-semibold text-white"
            >
              +
            </button>
          </div>

          <!-- Pagination -->
          <div
            v-if="totalPages > 0"
            class="flex flex-wrap items-center justify-around gap-x-2 md:justify-between"
            data-aos="flip-up"
            data-aos-once="true"
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

          <!-- Matching Tab Content -->
          <section v-if="activeTab === 'matching'" class="col-span-1">
            <!-- Regions Table -->
            <div class="grid grid-cols-1 overflow-x-scroll overflow-y-hidden md:overflow-x-hidden">
              <table class="col-span-1 min-w-[640px]">
                <tr
                  v-for="(region) in RegionList"
                  :key="region.id"
                  data-aos="flip-down"
                  data-aos-duration="500"
                  data-aos-offset="0"
                  data-aos-once="true"
                >
                  <td class="flex-1 bg-white px-2 py-1 border-b-[2.5px] border-[#1a1a1b]">
                    {{ region.name ?? 'Unknown' }}
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

          <!-- Teams Tab Content -->
          <section
            v-if="activeTab === 'teams'"
            class="col-span-1 flex items-center justify-center text-white"
          >
            <p>Teams Content Here</p>
          </section>

          <!-- No Regions Available -->
          <section
            v-if="totalPages === 0"
            class="col-span-1 flex h-60 items-center justify-center font-semibold text-[#555555] md:col-span-3"
          >
            No Regions Available
          </section>
        </div>
      </section>
    </div>

    <!-- Modals -->
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

export default {
  components: {
    AddRegionModal,
    EditRegionModal,
    DeleteRegionModal
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
      selectedRegion: {},
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
            return true;
          }
          return 'Name is required.';
        },
        value => {
          if (value?.length <= 10) {
            return true;
          }
          return 'Name must be less than 10 characters.';
        },
      ],
      activeTab: 'matching',
    };
  },
  watch: {
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1);
      }
    },
    page: {
      handler() {
        this.retrieveRegions();
      },
      immediate: true,
    },
  },
  methods: {
    setPage() {
      this.retrieveRegions();
    },
    openAddRegionDialog() {
      this.showAddRegionModal = true;
    },
    openEditRegionDialog(data) {
      this.selectedRegion = data;
      this.showEditRegionModal = true;
    },
    openDeleteRegionDialog(data) {
      this.selectedRegion = data;
      this.showDeleteRegionModal = true;
    },
    closeAddRegionDialog() {
      this.showAddRegionModal = false;
    },
    closeEditRegionDialog() {
      this.selectedRegion = {};
      this.showEditRegionModal = false;
    },
    closeDeleteRegionDialog() {
      this.selectedRegion = {};
      this.showDeleteRegionModal = false;
    },
    AddRegion() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Region Added',
        position: 'bottom',
        variant: 'success',
        queue: true
      });
      this.showAddRegionModal = false;
      this.retrieveRegions();
      this.getRegions();
    },
    UpdateRegion() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Region Updated',
        position: 'bottom',
        variant: 'success',
        queue: true
      });
      this.showEditRegionModal = false;
      this.retrieveRegions();
      this.getRegions();
    },
    DeleteRegion() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Region Removed',
        position: 'bottom',
        variant: 'success',
        queue: true
      });
      this.showDeleteRegionModal = false;
      this.retrieveRegions();
      this.getRegions();
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
          delete query[key];
        }
      });

      const queryString = new URLSearchParams(query).toString();

      this.$axios
        .$get(`v1/regions?${queryString}`)
        .then((response) => {
          this.RegionList = response.data.regions;
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        });
    },
  }
};
</script>