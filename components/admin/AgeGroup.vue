<template>
  <div>
    <div class="bg-[#1A1A1B]" data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-4 p-4">
        <div class="grid grid-cols-1 gap-4">
          <div class="col-span-1 flex items-center">
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
            text-white
            sm:w-36"
            @click="openAddageGroupDialog"
          >
            +
          </button>
          </div>
          <div
          v-if="totalPages > 0"
          class="col-span-1 flex flex-wrap items-center
          justify-around gap-x-2 md:justify-between"
          data-aos="flip-up"
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
              class="text-white"
              :total-visible="7"
              dark
              @change="setPage"
              />
          </div>
          <section class="col-span-1">
            <div class="grid grid-cols-1 overflow-x-auto">
              <div
              v-for="(ageGroup) in ageGroupList"
              :key="ageGroup.id" class="col-span-1 mb-0.5 gap-0"
              data-aos="flip-down" data-aos-duration="500"
              data-aos-offset="0"
              >
              <div class="flex w-[640px] items-center justify-center md:w-auto">
                <input
                v-model="ageGroup.name"
                :rules="Rules"
                placeholder="Enter Age Group"
                hide-details
                required
                :disabled="true"
                class="flex-1 border-black bg-white p-1 text-lg"
                />
                <i
                class="ri-pencil-fill px-4 text-xl text-white"
                @click="openEditageGroupDialog(ageGroup)"
                />
                <i
                class="ri-delete-bin-fill px-4 text-xl text-red-400"
                @click="openDeleteageGroupDialog(ageGroup)"
                />
              </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
    <AddAgeGroupModal
    :active="showAddageGroupModal"
    @close="closeAddageGroupDialog"
    @confirm="AddAgeGroup"
    />
    <EditAgeGroupModal
    :active="showEditageGroupModal"
    :ageGroup_data="selectedageGroup"
    @close="closeEditageGroupDialog"
    @confirm="UpdateAgeGroup"
    />
    <DeleteAgeGroupModal
    :active="showDeleteageGroupModal"
    :ageGroup_data="selectedageGroup"
    @close="closeDeleteageGroupDialog"
    @confirm="DeleteAgeGroup"
    />
  </div>
</template>

<script>
import AddAgeGroupModal from '~/components/modals/AddAgeGroupModal.vue';
import EditAgeGroupModal from '~/components/modals/EditAgeGroupModal.vue';
import DeleteAgeGroupModal from '~/components/modals/DeleteAgeGroupModal.vue';
export default {
  components: {
    AddAgeGroupModal,
    EditAgeGroupModal,
    DeleteAgeGroupModal
  },
  data() {
    return {
      selectedageGroup: ({}),
      ageGroupList: [],
      showAddageGroupModal: false,
      showEditageGroupModal: false,
      showDeleteageGroupModal: false,
      query: '',
      from: 0,
      to: 0,
      page: 1,
      perPage: 12,
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
  watch: {
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
    page: {
      handler(newPage) {
        this.retrieveAgeGroups()
      },
      immediate: true,
    },
  },
  methods: {
    setPage() {
      this.retrieveAgeGroups();
    },
    openAddageGroupDialog(a) {
      this.showAddageGroupModal = true
    },
    openEditageGroupDialog(data) {
      this.selectedageGroup = data
      this.showEditageGroupModal = true
    },
    openDeleteageGroupDialog(data) {
      this.selectedageGroup = data
      this.showDeleteageGroupModal = true
    },
    closeAddageGroupDialog(a) {
      this.showAddageGroupModal = false
    },
    closeEditageGroupDialog(data) {
      this.selectedageGroup = ({})
      this.showEditageGroupModal = false
    },
    closeDeleteageGroupDialog(data) {
      this.selectedageGroup = ({})
      this.showDeleteageGroupModal = false
    },
    AddAgeGroup() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Age Group Added',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showAddageGroupModal = false;
      this.retrieveAgeGroups();
    },
    UpdateAgeGroup(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Age Group Updated',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showEditageGroupModal = false;
      this.retrieveAgeGroups();
    },
    DeleteAgeGroup(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Age Group Removed',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showDeleteageGroupModal = false;
      this.retrieveAgeGroups();
    },
    retrieveAgeGroups() {
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        maxAgeGroupsPerPage: 10,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/agegroups?${queryString}`)
        .then((response) => {
          this.ageGroupList = response.data.ageGroups;
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
.superheadline {
color: aliceblue;
}
</style>