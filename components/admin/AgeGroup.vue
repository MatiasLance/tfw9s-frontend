<template>
  <div>
    <div data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-4 p-4">
        <div class="grid grid-cols-1 gap-4">
          <div class="col-span-1 flex items-center">
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
            @click="openAddageGroupDialog"
          >
            <span class="text-white">+</span>
          </button>
          </div>

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
                of <span class="font-bold text-green-400">{{ totalItems }}</span> age groups
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
          
          <section v-if="ageGroupList.length > 0" class="col-span-1">
            <div class="overflow-x-auto bg-gray-800 border border-green-500/20 rounded-2xl">
              <!-- Header -->
              <div
                class="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-900 border-b border-green-500/30"
              >
                <span class="col-span-10 text-left text-sm font-semibold text-green-400 uppercase tracking-wide">
                  Age Group
                </span>
                <span class="col-span-2 text-center text-sm font-semibold text-green-400 uppercase tracking-wide">
                  Actions
                </span>
              </div>

              <!-- Rows -->
              <div class="divide-y divide-gray-700/50">
                <div
                  v-for="(agegroup, index) in ageGroupList"
                  :key="agegroup.id"
                  class="grid grid-cols-12 gap-4 px-6 py-4 transition-all duration-300 hover:bg-gray-700/30"
                  :class="index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'"
                  data-aos="flip-down"
                  data-aos-duration="500"
                  data-aos-offset="0"
                  data-aos-once="true"
                >
                  <!-- Age Group Name -->
                  <div class="col-span-10 flex items-center">
                    <span class="text-gray-200 font-medium truncate">
                      {{ agegroup.name || 'Unknown' }}
                    </span>
                  </div>

                  <!-- Actions -->
                  <div class="col-span-2 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      class="hover:text-green-300 transition-colors duration-200 p-2 rounded-lg hover:bg-green-600/20"
                      @click="openEditageGroupDialog(agegroup)"
                      title="Edit Age Group"
                    >
                      <span class="text-green-400">
                        <i class="ri-pencil-line text-lg"></i>
                      </span>
                    </button>

                    <button
                      type="button"
                      class="hover:text-red-300 transition-colors duration-200 p-2 rounded-lg hover:bg-red-600/20"
                      @click="openDeleteageGroupDialog(agegroup)"
                      title="Delete Age Group"
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
          v-if="totalPages=== 0"
          class="col-span-1 flex h-60 items-center
          justify-center font-semibold
          text-[#555555] md:col-span-3"
          >
          No Age Group Available
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
          if (value && value.length <= 10) {
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
