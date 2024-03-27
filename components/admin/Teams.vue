<template>
  <div>
    <div class="bg-[#1A1A1B]" data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-4 p-4">
        <div class="grid grid-cols-1 sm:grid-cols-6 gap-4">
          <div class="col-span-1 sm:col-span-2 flex items-center">
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
            @click="openAddTeamDialog"
          >
            +
          </button>
          </div>
          <div
          v-if="totalPages > 0"
          class="col-span-1 sm:col-span-4 sm:flex justify-end"
          data-aos="flip-up"
          >
            <VPagination
              v-model="page"
              :length="totalPages"
              @change="setPage"
              dark
              color="success"
              :total-visible="7"
              class="my-4 text-white"
              />
          </div>
          <section class="col-span-6">
            <div class="grid grid-cols-1 overflow-x-auto">
              <div
              v-for="(data) in Teams"
              :key="data.id" class="gap-0 col-span-1 mb-0.5"
              data-aos="flip-down" data-aos-duration="500"
              data-aos-offset="30"
              >
              <div class="w-[640px] flex items-center justify-center md:w-auto">
                <input
                v-model="data.name"
                :rules="Rules"
                placeholder="Enter Team"
                hide-details
                required
                :disabled="true"
                class="border-black bg-white text-lg flex-1 p-1 mr-0.5"
                />
                <select
                v-model="data.fieldName"
                class="border-black bg-white text-lg flex-1 p-1"
                :disabled="true"
                >
                  <option
                  v-for="(field) in FieldList"
                  :key="field.id"
                  >{{field.name}}</option>
                </select>
                <i
                class="ri-pencil-fill text-white text-xl px-4"
                @click="openEditTeamDialog(data)"
                />
                <i
                class="ri-delete-bin-fill text-red-400 text-xl px-4"
                @click="openDeleteTeamDialog(data)"
                />
              </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
    <AddTeamModal
    :active="showAddTeamModal"
    :field="FieldList"
    @close="closeAddTeamDialog"
    @confirm="AddTeam"
    />
    <EditTeamModal
    :active="showEditTeamModal"
    :field="FieldList"
    :team="selectedData"
    @close="closeEditTeamDialog"
    @confirm="EditTeam"
    />
    <DeleteTeamModal
    :active="showDeleteTeamModal"
    :team_data="selectedData"
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
    // eslint-disable-next-line vue/prop-name-casing
    FieldList: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      selectedData: [],
      showAddTeamModal: false,
      showEditTeamModal: false,
      showDeleteTeamModal: false,
      Teams: [],
      Dataset: [],
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
        this.retrieveTeams()
      },
      immediate: true,
    },
  },
  created() {
    this.retrieveTeams();
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
      this.showEditTeamModal = false
    },
    closeDeleteTeamDialog(a) {
      this.showDeleteTeamModal = false
    },
    AddTeam() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Team Added',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
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
    retrieveTeams() {
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        maxTeamsPerPage: 10,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/teams?${queryString}`)
        .then((response) => {
          this.Teams = response.data.teams.map(team => {
            return {
              ...team,
              fieldName: team.field && team.field.name ? team.field.name : '',
            };
          });
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          console.log(this.Teams)
        });
    },
  }
};
</script>

<style scoped>
.superheadline {
color: aliceblue;
}
</style>