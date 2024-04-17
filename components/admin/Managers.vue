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
          @click="openAddManagerDialog"
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
            dark
            color="success"
            :total-visible="7"
            class="text-white"
            />
        </div>
        <section class="col-span-1">
          <div
          class="grid grid-cols-1 overflow-x-auto
          overflow-y-hidden md:overflow-x-hidden"
          >
            <div
            v-for="(manager) in ManagerList"
            :key="manager.id" class="col-span-1 mb-0.5 gap-0"
            data-aos="flip-down" data-aos-duration="500"
            data-aos-offset="0"
            >
            <div class="flex w-[640px] items-center justify-center md:w-auto">
              <input
              v-model="manager.name"
              :rules="Rules"
              placeholder="Enter Manager"
              hide-details
              required
              :disabled="true"
              class="flex-1 border-black bg-white p-1 text-lg"
              />
              <i
              class="ri-pencil-fill px-4 text-xl text-white"
              @click="openEditManagerDialog(manager)"
              />
              <i
              class="ri-delete-bin-fill px-4 text-xl text-red-400"
              @click="openDeleteManagerDialog(manager)"
              />
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
        No manager saved yet
        </section>
      </div>
    </section>
  </div>
  <AddManagerModal
  :active="showAddManagerModal"
  @close="closeAddManagerDialog"
  @confirm="AddManager"
  />
  <EditManagerModal
  :active="showEditManagerModal"
  :data="selectedManager"
  @close="closeEditManagerDialog"
  @confirm="UpdateManager"
  />
  <DeleteManagerModal
  :active="showDeleteManagerModal"
  :data="selectedManager"
  @close="closeDeleteManagerDialog"
  @confirm="DeleteManager"
  />
</div>
</template>

<script>
import AddManagerModal from '~/components/modals/AddManagerModal.vue';
import EditManagerModal from '~/components/modals/EditManagerModal.vue';
import DeleteManagerModal from '~/components/modals/DeleteManagerModal.vue';
export default {
  components: {
    AddManagerModal,
    EditManagerModal,
    DeleteManagerModal,
  },
  props: {
    getManagers: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      date: new Date(),
      ManagerList: [],
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
      selectedManager: ({}),
      showCustomVueTable: true,
      showAddManagerModal: false,
      showEditManagerModal: false,
      showDeleteManagerModal: false,
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
        this.retrieveManagers()
      },
      immediate: true,
    },
  },
  methods: {
    setPage() {
      this.retrieveManagers();
    },
    reformatTime(timeString) {
      const [
        hours,
        minutes
      ] = timeString.split(':');
      const formattedTime = `${hours}:${minutes}`;
      return formattedTime;
    },
    formattedDate(dateString) {
      const date = new Date(dateString);
      date.setHours(0, 0, 0, 0);
      return date;
    },
    calendarDate(date) {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month}/${day}/${year.toString().slice(-2)}`;
    },
    openAddManagerDialog() {
      this.showAddManagerModal = true
    },
    openEditManagerDialog(data) {
      this.selectedManager = data
      this.showEditManagerModal = true
    },
    openDeleteManagerDialog(data) {
      this.selectedManager = data
      this.showDeleteManagerModal = true
    },
    closeAddManagerDialog() {
      this.showAddManagerModal = false
    },
    closeEditManagerDialog(data) {
      this.selectedManager = ({})
      this.showEditManagerModal = false
    },
    closeDeleteManagerDialog(data) {
      this.selectedManager = ({})
      this.showDeleteManagerModal = false
    },
    AddManager(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Manager Added',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showEditManagerModal = false;
      this.retrieveManagers();
      this.getManagers();
    },
    UpdateManager(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Manager Updated',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showEditManagerModal = false;
      this.retrieveManagers();
      this.getManagers();
    },
    DeleteManager(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Manager Deleted',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showDeleteManagerModal = false;
      this.retrieveManagers();
      this.getManagers();
    },
    retrieveManagers() {
      const query = {
        q: this.query,
        sort: 'latest',
        page: this.page,
        maxManagersPerPage: 12,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/managers?${queryString}`)
        .then((response) => {
          this.ManagerList = response.data.managers.map(manager => {
            return {
              ...manager,
              name: `${manager.user.first_name} ${manager.user.last_name}`,
            };
          });
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
select option {
  background-color: #333131; /* Change to your desired background color */
}
</style>