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
              +
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
              class="h-9 flex-1 rounded-l"
            />
            <button
              type="submit"
              class="h-9 rounded-r bg-gradient-to-tr
                     from-[#5EE738] via-[#3e872a] to-[#050505]
                     px-4 text-xl font-semibold text-white"
            >
              <i class="ri-search-line"></i>
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
      :fields="fields"
      :agegroup="ageGroups"
      :teams="teams"
      :series="series"
      @close="closeAddFixingDialog"
      @confirm="handleRefresh"
    />

    <EditFixingModal
    :active="showEditFixingModal"
    :managers="managers"
    :regions="regions"
    :fields="fields"
    :agegroup="ageGroups"
    :teams="teams"
    :series="series"
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
    fields: Array,
    ageGroups: Array,
    teams: Array,
    series: Array
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
      ]
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
  },

  methods: {
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
