<template>
  <div>
    <div class="bg-[#1A1A1B]" data-aos="fade-up">
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
            +
          </button>
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
              class="text-white"
              :total-visible="7"
              dark
              @change="setPage"
              />
          </div>
          <!--
            <section class="col-span-1">
            <div
            class="grid grid-cols-1 overflow-x-scroll
            overflow-y-hidden md:overflow-x-hidden"
            >
            <div
            v-for="(ageGroup) in ageGroupList"
            :key="ageGroup.id" class="col-span-1 mb-0.5 gap-0"
            data-aos="flip-down" data-aos-duration="500"
            data-aos-offset="0"
            >
            <div class="flex min-w-[640px] items-center justify-center">
            <input
            v-model="ageGroup.name"
            :rules="Rules"
            placeholder="Enter Age Group"
            hide-details
            required
            :disabled="true"
            class="mr-0.5 flex-1 border-black bg-white p-1"
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
          -->
          <section v-if="totalPages > 0" class="col-span-1">
            <div
            class="grid grid-cols-1 overflow-y-hidden
            overflow-x-scroll md:overflow-x-hidden"
            >
            <table class="col-span-1 min-w-[640px]">
              <tr
              v-for="(agegroup) in ageGroupList"
              :key="agegroup.id"
              data-aos="flip-down" data-aos-duration="500"
              data-aos-offset="0"  data-aos-once="true"
              >
                <td
                class="flex-1 border-b-[2.5px] border-[#1a1a1b] bg-white
                px-2 py-1"
                >
                  {{agegroup.name??'Unknown'}}
                </td>
                <td class="w-[116px] text-center">
                  <i
                  class="ri-pencil-fill px-4 text-xl text-white"
                  @click="openEditageGroupDialog(agegroup)"
                  />
                  <i
                  class="ri-delete-bin-fill px-4 text-xl text-red-400"
                  @click="openDeleteageGroupDialog(agegroup)"
                  />
                </td>
              </tr>
            </table>
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
  props: {
    getAgeGroups: {
      type: Function,
      required: true,
    },
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
      this.getAgeGroups();
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
      this.getAgeGroups();
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
      this.getAgeGroups();
    },
    retrieveAgeGroups() {
      const query = {
        q: this.query,
        page: this.page,
        maxAgeGroupsPerPage: 12,
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
