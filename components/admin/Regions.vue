<template>
  <div>
    <div class="min-h-full bg-[#1A1A1B]  pb-12" data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-4 p-7 py-12">
        <div class="grid grid-cols-6 gap-4">
          <div class="col-span-1">
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
            text-white"
          >
            +
          </button>
          </div>
          <section class="col-span-6">
            <div class="grid grid-cols-1">
              <div
              v-for="(region) in Regions"
              :key="region.id" class="col-span-1 mb-0.5 gap-0"
              >
              <div class="flex items-center justify-center">
                <input
                v-model="region.title"
                :rules="Rules"
                placeholder="Enter Region"
                hide-details
                required
                :disabled="selectedRegion.id !== region.id"
                class="border-black bg-white text-lg flex-1 p-1"
                />
                <i
                class="ri-pencil-fill text-white text-xl px-4"
                @click="openEditRegionDialog(region)"
                />
                <i
                class="ri-delete-bin-fill text-red-400 text-xl px-4"
                @click="openDeleteRegionDialog(region)"
                />
              </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
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
import EditRegionModal from '~/components/modals/EditRegionModal.vue';
import DeleteRegionModal from '~/components/modals/DeleteRegionModal.vue';
export default {
  components: {
    EditRegionModal,
    DeleteRegionModal
  },
  data() {
    return {
      showEditRegionModal: false,
      showDeleteRegionModal: false,
      selectedRegion: [],
      Regions: [],
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
  created() {
    this.generateRandomData();
  },
  methods: {
    openEditRegionDialog(data) {
      this.selectedRegion = data
      this.showEditRegionModal = true
    },
    openDeleteRegionDialog(data) {
      this.selectedRegion = data
      this.showDeleteRegionModal = true
    },
    closeEditRegionDialog(data) {
      this.selectedRegion = []
      this.showEditRegionModal = false
    },
    closeDeleteRegionDialog(data) {
      this.selectedRegion = []
      this.showDeleteRegionModal = false
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
    },
    DeleteRegion(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Region Deleted',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showDeleteRegionModal = false;
    },
    generateRandomData() {
      for (let i = 0; i < 14; i++) {
        this.Regions.push({
          id: i,
          title: `Region Number ${i+1}`
        });
      }
    },
  }
};
</script>

<style scoped>
.superheadline {
color: aliceblue;
}
</style>