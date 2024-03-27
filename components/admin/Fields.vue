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
            @click="openAddFieldDialog"
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
              v-for="(data) in Fields"
              :key="data.id" class="gap-0 col-span-1 mb-0.5"
              data-aos="flip-down" data-aos-duration="500"
              data-aos-offset="30"
              >
              <div class="w-[640px] flex items-center justify-center md:w-auto">
                <input
                v-model="data.name"
                :rules="Rules"
                placeholder="Enter Field"
                hide-details
                required
                :disabled="true"
                class="border-black bg-white text-lg flex-1 p-1 mr-0.5"
                />
                <select
                v-model="data.regionName"
                class="border-black bg-white text-lg flex-1 p-1"
                :disabled="true"
                >
                  <option
                  v-for="(region) in RegionList"
                  :key="region.id"
                  >{{region.name}}</option>
                </select>
                <i
                class="ri-pencil-fill text-white text-xl px-4"
                @click="openEditFieldDialog(data)"
                />
                <i
                class="ri-delete-bin-fill text-red-400 text-xl px-4"
                @click="openDeleteFieldDialog(data)"
                />
              </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
    <AddFieldModal
    :active="showAddFieldModal"
    :regions="RegionList"
    @close="closeAddFieldDialog"
    @confirm="AddField"
    />
    <EditFieldModal
    :active="showEditFieldModal"
    :regions="RegionList"
    :field="selectedData"
    @close="closeEditFieldDialog"
    @confirm="EditField"
    />
    <DeleteFieldModal
    :active="showDeleteFieldModal"
    :field_data="selectedData"
    @close="closeDeleteFieldDialog"
    @confirm="DeleteField"
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
    // eslint-disable-next-line vue/prop-name-casing
    RegionList: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      selectedData: [],
      showAddFieldModal: false,
      showEditFieldModal: false,
      showDeleteFieldModal: false,
      Fields: [],
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
        this.retrieveFields()
      },
      immediate: true,
    },
  },
  created() {
    this.retrieveFields();
  },
  methods: {
    setPage() {
      this.retrieveFields();
    },
    openAddFieldDialog(a) {
      this.showAddFieldModal = true
    },
    openEditFieldDialog(a) {
      this.selectedData = a;
      this.showEditFieldModal = true
    },
    openDeleteFieldDialog(a) {
      this.selectedData = a;
      this.showDeleteFieldModal = true
    },
    closeAddFieldDialog(a) {
      this.showAddFieldModal = false
    },
    closeEditFieldDialog(a) {
      this.showEditFieldModal = false
    },
    closeDeleteFieldDialog(a) {
      this.showDeleteFieldModal = false
    },
    AddField() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Field Added',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showAddFieldModal = false;
      this.retrieveFields();
    },
    EditField() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Field Modified',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showEditFieldModal = false;
      this.retrieveFields();
    },
    DeleteField() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Field Removed',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showDeleteFieldModal = false;
      this.retrieveFields();
    },
    retrieveFields() {
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        maxFieldsPerPage: 10,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/fields?${queryString}`)
        .then((response) => {
          this.Fields = response.data.fields.map(region => {
            return {
              ...region,
              regionName: region.region && region.region.name ? region.region.name : '',
            };
          });
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          console.log(this.Fields)
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