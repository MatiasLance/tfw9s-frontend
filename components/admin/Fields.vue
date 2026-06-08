<template>
  <div>
    <div data-aos="fade-up">
      <section class="mx-auto max-w-screen-xl gap-4 p-4">
        <div class="grid grid-cols-1 gap-4">
          <!-- Add Button -->
          <div class="col-span-1 flex items-center">
            <button
              type="button"
              class="w-full sm:w-36 rounded-md
              bg-gradient-to-br from-[#5EE738]
              via-[#3e872a] to-[#050505] py-1.5
              text-center font-semibold text-white"
              @click="showAddFieldModal = true"
            >
              <span class="text-white">+ Add Fields</span>
            </button>
          </div>

          <!-- Pagination Info -->
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
                of <span class="font-bold text-green-400">{{ totalItems }}</span> fields
              </span>
            </div>
            
            <VPagination
              v-model="page"
              :length="totalPages"
              :total-visible="7"
              class="text-white"
              color="success"
              dark
              @change="retrieveFields"
            />
          </div>

          <!-- Table Header -->
          <section class="col-span-1">
            <div class="overflow-x-auto bg-gray-800 border border-green-500/20 rounded-2xl">
              <!-- Header -->
              <div
                v-if="totalPages > 0"
                class="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-900 border-b border-green-500/30"
              >
                <span class="col-span-5 text-left text-sm font-semibold text-green-400 uppercase tracking-wide">
                  Field
                </span>
                <span class="col-span-5 text-left text-sm font-semibold text-green-400 uppercase tracking-wide">
                  Region
                </span>
                <span class="col-span-2 text-center text-sm font-semibold text-green-400 uppercase tracking-wide">
                  Actions
                </span>
              </div>

              <!-- Rows -->
              <div class="divide-y divide-gray-700/50">
                <div
                  v-for="(field, index) in fieldsList"
                  :key="field.id"
                  :class="[
                    'grid grid-cols-12 gap-4 px-6 py-4 transition-all duration-300',
                    'hover:bg-gray-700/30',
                    index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'
                  ]"
                >
                  <!-- Field Name -->
                  <div class="col-span-5 flex items-center">
                    <input
                      v-model="field.name"
                      placeholder="Enter Field"
                      disabled
                      class="w-full bg-transparent text-gray-200 font-medium truncate border-none outline-none p-0 placeholder-gray-500"
                    />
                  </div>

                  <!-- Region -->
                  <div class="col-span-5 flex items-center">
                    <input
                      v-model="field.regionName"
                      placeholder="Enter Region"
                      disabled
                      class="w-full bg-transparent text-gray-300 border-none outline-none p-0 placeholder-gray-500"
                    />
                  </div>

                  <!-- Actions -->
                  <div class="col-span-2 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      class="hover:text-green-300 transition-colors duration-200 p-2 rounded-lg hover:bg-green-600/20"
                      @click="openEditFieldDialog(field)"
                      title="Edit Field"
                    >
                      <span class="text-green-400">
                        <i class="ri-pencil-line text-lg"></i>
                      </span>
                    </button>

                    <button
                      type="button"
                      class="hover:text-red-300 transition-colors duration-200 p-2 rounded-lg hover:bg-red-600/20"
                      @click="openDeleteFieldDialog(field)"
                      title="Delete Field"
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

          <!-- No Fields -->
          <section
            v-if="totalPages === 0"
            class="col-span-1 flex h-60 items-center justify-center
            font-semibold text-[#555555] md:col-span-3"
          >
            No Fields Available
          </section>
        </div>
      </section>
    </div>

    <!-- Modals -->
    <AddFieldModal
      :active="showAddFieldModal"
      :regions="regions"
      @close="showAddFieldModal = false"
      @confirm="handleAddField"
    />
    <EditFieldModal
      :active="showEditFieldModal"
      :regions="regions"
      :field="selectedField"
      @close="showEditFieldModal = false"
      @confirm="handleEditField"
    />
    <DeleteFieldModal
      :active="showDeleteFieldModal"
      :field="selectedField"
      @close="showDeleteFieldModal = false"
      @confirm="handleDeleteField"
    />
  </div>
</template>

<script>
import AddFieldModal from '~/components/modals/AddFieldModal.vue';
import EditFieldModal from '~/components/modals/EditFieldModal.vue';
import DeleteFieldModal from '~/components/modals/DeleteFieldModal.vue';

export default {
  components: {
    AddFieldModal,
    EditFieldModal,
    DeleteFieldModal
  },
  props: {
    regions: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      fieldsList: [],
      selectedField: {},
      showAddFieldModal: false,
      showEditFieldModal: false,
      showDeleteFieldModal: false,
      query: '',
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
      Rules: [
        value => (value ? true : 'Name is required.'),
        value => (value && value.length <= 10 ? true : 'Name must be less than 10 characters.')
      ]
    };
  },
  watch: {
    page: {
      handler() {
        this.retrieveFields();
      },
      immediate: true
    }
  },
  methods: {
    openEditFieldDialog(field) {
      this.selectedField = field;
      this.showEditFieldModal = true;
    },
    openDeleteFieldDialog(field) {
      this.selectedField = field;
      this.showDeleteFieldModal = true;
    },

    async handleAddField() {
      this.showAddFieldModal = false;
      this.$oruga.notification.open({
        message: 'Field Added',
        variant: 'success',
        duration: 5000,
        position: 'bottom'
      });
      await this.retrieveFields();
    },

    async handleEditField() {
      this.showEditFieldModal = false;
      this.$oruga.notification.open({
        message: 'Field Modified',
        variant: 'success',
        duration: 5000,
        position: 'bottom'
      });
      await this.retrieveFields();
    },

    async handleDeleteField() {
      this.showDeleteFieldModal = false;
      this.$oruga.notification.open({
        message: 'Field Removed',
        variant: 'success',
        duration: 5000,
        position: 'bottom'
      });
      await this.retrieveFields();
    },

    async retrieveFields() {
      const query = {
        q: this.query || '',
        sort: 'a_to_z',
        page: this.page,
        maxFieldsPerPage: this.perPage
      };

      const queryString = new URLSearchParams(query).toString();

      try {
        const response = await this.$axios.$get(`v1/fields?${queryString}`);
        this.fieldsList = response.data.fields.map(f => ({
          ...f,
          regionName: f.region ? f.region.name : ''
        }));
        this.totalItems = response.data.total_items;
        this.totalPages = response.data.last_page;
        this.from = response.data.from;
        this.to = response.data.to;
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    }
  }
};
</script>

<style scoped>
.superheadline {
  color: aliceblue;
}
</style>
