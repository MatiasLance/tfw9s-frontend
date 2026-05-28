<template>
  <div>
    <div data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-4 p-4">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">

          <!-- Add button -->
          <div class="col-span-1 flex items-center justify-between">
            <button
              type="button"
              class="w-full rounded-md bg-gradient-to-br
                     from-[#5EE738] via-[#3e872a] to-[#050505]
                     py-1.5 font-semibold text-white sm:w-36"
              @click="openAddFixingDialog"
            >
              <span class="text-white">+</span>
            </button>
          </div>

          <div class="col-span-1"></div>

          <!-- Search -->
          <form
            class="col-span-1 flex items-end"
            @submit.prevent
          >
            <input
              v-model="query"
              placeholder="Search..."
              type="text"
              class="h-9 flex-1 rounded-l bg-gray-100"
            />
            <button
              type="submit"
              class="h-9 rounded-r bg-gradient-to-tr
                     from-[#5EE738] via-[#3e872a] to-[#050505]
                     px-4 text-xl font-semibold text-white"
            >
              <i class="ri-search-line text-white"></i>
            </button>
          </form>

          <!-- Pagination header -->
          <div
            v-if="totalPages > 0"
            class="col-span-1 flex flex-wrap items-center
                   justify-between gap-x-2 lg:col-span-3"
          >
            <span class="font-medium text-white">
              Showing {{ from }}-{{ to }} of {{ totalItems }} items
            </span>

            <VPagination
              v-model="page"
              :length="totalPages"
              dark
              color="success"
              :total-visible="7"
            />
          </div>

          <!-- Events -->
          <section
            class="col-span-1 overflow-x-scroll
                   md:overflow-x-hidden lg:col-span-3"
          >
            <div class="grid min-w-[640px] gap-2">
              <div
                v-for="event in EventList"
                :key="event.id"
                class="border-2 border-gray-500 p-2"
              >
                <Form class="grid grid-cols-6 gap-2">
                  <div class="col-span-1 text-white font-semibold">
                    {{ calendarDate(event.date) }}
                  </div>

                  <div class="col-span-2 text-center text-white font-semibold">
                    {{ event.series_name }}
                  </div>

                  <div class="col-span-2 text-center text-white font-semibold">
                    {{ event.region_name }}
                  </div>

                  <div class="col-span-1 text-center text-white font-semibold">
                    {{ event.agegroup_name }}
                  </div>

                  <div v-if="event.eventmatch.length" class="col-span-6">
                    <FixingCustomTable
                      :columns="dataColumns"
                      :data="event.eventmatch"
                    />
                  </div>

                  <div
                    v-else
                    class="col-span-6 h-32 flex items-center justify-center
                           font-semibold text-[#555]"
                  >
                    No match saved yet
                  </div>

                  <div class="col-span-6 flex justify-end gap-4">
                    <BaseButton
                      class="bg-[#4cbe5c] text-white px-4 py-2"
                      @click="openEditFixingDialog(event)"
                    >
                      Edit
                    </BaseButton>

                    <BaseButton
                      class="bg-[#fb0d2b] text-white px-4 py-2"
                      @click="openDeleteFixingDialog(event)"
                    >
                      Delete
                    </BaseButton>
                  </div>
                </Form>
              </div>
            </div>
          </section>

          <!-- Empty -->
          <section
            v-if="totalPages === 0"
            class="col-span-1 flex h-60 items-center justify-center
                   font-semibold text-[#555] lg:col-span-3"
          >
            No Fixings Available
          </section>

        </div>
      </section>
    </div>

    <!-- Modals -->
    <AddFixingModal
      :active="showAddFixingModal"
      :managers="managers"
      :regions="regions"
      :fields="lists.fields"
      :agegroup="lists.ageGroups"
      :teams="lists.teams"
      :series="lists.series"
      @close="closeAddFixingDialog"
      @confirm="handleRefresh"
    />

    <EditFixingModal
    :active="showEditFixingModal"
    :managers="managers"
    :regions="regions"
    :fields="lists.fields"
    :agegroup="lists.ageGroups"
    :teams="lists.teams"
    :series="lists.series"
    :event="selectedFixing"
    @close="closeEditFixingDialog"
    @confirm="handleRefresh"
    />

    <DeleteFixingModal
      :active="showDeleteFixingModal"
      :event="selectedFixing"
      @close="closeDeleteFixingDialog"
      @confirm="handleRefresh"
    />
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import FixingCustomTable from '~/components/tables/FixingCustomTable.vue'
import AddFixingModal from '~/components/modals/AddFixingModal.vue'
import EditFixingModal from '~/components/modals/EditFixingModal.vue'
import DeleteFixingModal from '~/components/modals/DeleteFixingModal.vue'

export default {
  components: {
    FixingCustomTable,
    AddFixingModal,
    EditFixingModal,
    DeleteFixingModal
  },

  props: {
    managers: Array,
    regions: Array,
  },

  data() {
    return {
      EventList: [],
      query: '',
      page: 1,
      totalPages: 0,
      totalItems: 0,
      from: 0,
      to: 0,

      selectedFixing: {},
      showAddFixingModal: false,
      showEditFixingModal: false,
      showDeleteFixingModal: false,

      dataColumns: [
        { name: 'matchtime', label: 'Time' },
        { name: 'team1', label: 'Team 1' },
        { name: 'team2', label: 'Team 2' },
        { name: 'field', label: 'Field' }
      ],

      matchTimeOption: [
        { text: '8:00 AM', value: '8:00' },
        { text: '8:25 AM', value: '8:25' },
        { text: '8:50 AM', value: '8:50' },
        { text: '9:15 AM', value: '9:15' },
        { text: '9:40 AM', value: '9:40' },
        { text: '10:05 AM', value: '10:05' },
        { text: '10:30 AM', value: '10:30' },
        { text: '10:55 AM', value: '10:55' },
        { text: '11:20 AM', value: '11:20' },
        { text: '11:45 AM', value: '11:45' },
        { text: '12:10 PM', value: '12:10' },
        { text: '12:35 PM', value: '12:35' },
        { text: '1:00 PM', value: '13:00' },
        { text: '1:25 PM', value: '13:25' },
        { text: '1:50 PM', value: '13:50' },
        { text: '2:15 PM', value: '14:15' },
        { text: '2:40 PM', value: '14:40' },
        { text: '3:05 PM', value: '15:05' },
        { text: '3:30 PM', value: '15:30' },
        { text: '3:55 PM', value: '15:55' },
        { text: '4:20 PM', value: '16:20' },
        { text: '4:45 PM', value: '16:45' },
        { text: '5:10 PM', value: '17:10' },
        { text: '5:35 PM', value: '17:35' },
        { text: '6:00 PM', value: '18:00' },
        { text: '6:25 PM', value: '18:25' },
        { text: '6:50 PM', value: '18:50' },
        { text: '7:15 PM', value: '19:15' },
        { text: '7:40 PM', value: '19:40' },
        { text: '8:05 PM', value: '20:05' },
        { text: '8:30 PM', value: '20:30' },
        { text: '8:55 PM', value: '20:55' },
        { text: '9:20 PM', value: '21:20' },
        { text: '9:45 PM', value: '21:45' },
        { text: '10:00 PM', value: '22:00' },
      ],

      lists: {
        fields: [],
        ageGroups: [],
        teams: [],
        series: [],
      },

    }
  },

  watch: {
    page() {
      if (this._mounted) {
        this.retrieveEvents()
      }
    },

    query: {
      handler: debounce(function () {
        this.page = 1
        this.retrieveEvents()
      }, 400)
    }
  },

  mounted() {
    this._mounted = true
    this.retrieveEvents()
    this.loadAgeGroups()
    this.loadTeams()
    this.loadSeries()
    this.loadFields()
  },

  methods: {
    buildQuery(params) {
      return new URLSearchParams(
        Object.entries(params).filter(([ , v ]) => v != null)
      ).toString()
    },

    async loadAgeGroups() {
      if (this.lists.ageGroups.length) return
      const r = await this.$axios.$get(`v1/agegroups`)
      this.lists.ageGroups = r.data.ageGroups
    },

    async loadTeams() {
      if (this.lists.teams.length) return
      const r = await this.$axios.$get(`v1/teams`)
      this.lists.teams = r.data.teams
    },

    async loadSeries() {
      if (this.lists.series.length) return
      const r = await this.$axios.$get(`v1/series/names`)
      this.lists.series = r.series
    },

    async loadFields() {
      if (this.lists.fields.length) return
      const r = await this.$axios.$get(`v1/fields/all`)
      this.lists.fields = r.data.fields
    },

    AMPMformat(time) {
      const matched = this.matchTimeOption.find(data => data.value === time);
      if (matched) {
        return matched.text;
      } else {
        return 'Unknown';
      }
    },

    async retrieveEvents() {
      this.isLoading = true

      try {
        const params = {
          q: this.query || undefined,
          sort: 'latest',
          page: this.page,
          maxEventsPerPage: 6
        }

        const res = await this.$axios.$get('v1/events', { params })

        /* eslint-disable camelcase */
        this.EventList = res.data.events.map(event => ({
          ...event,
          series_name: event.series ?event.series.name : '',
          region_name: event.region ? event.region.name : '',
          agegroup_name: event.agegroup ? event.agegroup.name : '',
          date: new Date(event.event_date),
          eventmatch: event.eventmatch.map(m => ({
            ...m,
            matchtime: this.AMPMformat(event.time),
            field: m.field ? m.field.name : 'Unknown'
          }))
        }))

        this.totalItems = res.data.total_items
        this.totalPages = res.data.last_page
        this.from = res.data.from
        this.to = res.data.to
      } finally {
        this.isLoading = false
      }
    },

    calendarDate(date) {
      return `${date.getDate()}/${date.getMonth() + 1}/${date
        .getFullYear()
        .toString()
        .slice(-2)}`
    },

    handleRefresh() {
      this.closeAllModals()
      this.retrieveEvents()
    },

    closeAllModals() {
      this.selectedFixing = {}
      this.showAddFixingModal = false
      this.showEditFixingModal = false
      this.showDeleteFixingModal = false
    },

    openAddFixingDialog() {
      this.showAddFixingModal = true
    },
    openEditFixingDialog(e) {
      this.selectedFixing = e
      this.showEditFixingModal = true
    },
    openDeleteFixingDialog(e) {
      this.selectedFixing = e
      this.showDeleteFixingModal = true
    },
    closeAddFixingDialog() {
      this.showAddFixingModal = false
    },
    closeEditFixingDialog() {
      this.showEditFixingModal = false
    },
    closeDeleteFixingDialog() {
      this.showDeleteFixingModal = false
    }
  }
}
</script>
