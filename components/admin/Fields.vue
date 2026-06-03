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
              <span class="text-white">+</span>
            </button>
          </div>

          <!-- Pagination Info -->
          <div
            v-if="totalPages > 0"
            class="col-span-1 flex flex-wrap items-center
            justify-around gap-x-2 md:justify-between"
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
              color="success"
              dark
              class="text-white"
              @change="retrieveFields"
            />
          </div>

          <!-- Table Header -->
          <section class="col-span-1">
            <div class="grid grid-cols-1 overflow-x-scroll
            overflow-y-hidden md:overflow-x-hidden"
            >
              <div
                v-if="totalPages > 0"
                class="col-span-1 flex w-[640px] pr-24 md:w-auto"
                data-aos="flip-up"
              >
                <span class="flex-1 px-4 py-2 text-[20px]
                font-semibold text-[#555555]"
                >
                  Field
                </span>
                <span class="flex-1 px-4 py-2 text-[20px]
                font-semibold text-[#555555]"
                >
                  Region
                </span>
              </div>

              <!-- Fields List -->
              <div
                v-for="field in fieldsList"
                :key="field.id"
                class="col-span-1 mb-0.5 gap-0"
                data-aos="flip-down"
                data-aos-duration="500"
                data-aos-offset="0"
                data-aos-once="true"
              >
                <div class="flex min-w-[640px] items-center justify-center">
                  <input
                    v-model="field.name"
                    :rules="Rules"
                    placeholder="Enter Field"
                    hide-details
                    required
                    disabled
                    class="mr-0.5 flex-1 border-black bg-white p-1"
                  />
                  <input
                    v-model="field.regionName"
                    :rules="Rules"
                    placeholder="Enter Region"
                    hide-details
                    required
                    disabled
                    class="mr-0.5 flex-1 border-black bg-white p-1"
                  />
                  <i
                    class="ri-pencil-fill px-4 text-xl text-white cursor-pointer"
                    @click="openEditFieldDialog(field)"
                  ></i>
                  <i
                    class="ri-delete-bin-fill px-4 text-xl text-red-400 cursor-pointer"
                    @click="openDeleteFieldDialog(field)"
                  ></i>
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
