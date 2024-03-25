<template>
<div>
  <div class="min-h-full bg-[#1A1A1B]  pb-12" data-aos="fade-up">
    <section class="mx-auto max-w-screen-xl gap-4 p-7 py-12">
      <div class="grid grid-cols-6 gap-4">
        <div class="col-span-6">
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
        >
          +
        </button>
        </div>
        <section class="col-span-6">
          <div class="grid grid-cols-1 gap-2">
            <div
            v-for="(data, index) in Dataset"
            :key="index"
            class="col-span-1 mb-0.5 gap-0 border-2 border-gray-500"
            >
              <Item class="grid grid-cols-3 p-2 gap-2">
                <div class="col-span-1">
                  <ODatepicker
                  v-model="data.date"
                  placeholder="Click to select..."
                  icon="calendar"
                  class="bg-black"
                  />
                </div>
                <div
                class="col-span-1 m-auto text-center
                text-xl font-medium text-white"
                >
                  {{ data.manager }}
                </div>
                <div class="col-span-1">
                  <select
                  v-model="data.field"
                  class="w-full bg-transparent p-1 text-lg text-white"
                  >
                    <option
                    v-for="(field, index) in Fields"
                    :key="index"
                    >{{field}}</option>
                  </select>
                </div>
                <div class="col-span-3">
                  <CustomVueTable
                  v-if="showCustomVueTable"
                  :columns="dataColumns"
                  :data="data.match"
                />
                </div>
                <div class="col-span-3 flex justify-end gap-4">
                  <BaseButton
                  class="
                    max-w-full rounded-lg
                    border border-gray-200
                    bg-[#4cbe5c]
                    py-2
                    px-4
                    text-white
                    "
                    @click="openEditFixingDialog(data)"
                  >
                    Edit
                  </BaseButton>
                  <BaseButton
                  class="
                    max-w-full rounded-lg
                    border border-gray-200
                    bg-[#fb0d2b]
                    py-2
                    px-4
                    text-white
                    "
                    @click="openDeleteFixingDialog(data)"
                  >
                    Delete
                  </BaseButton>
                </div>
              </Item>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
  <EditFixingModal
  :active="showEditFixingModal"
  :data="selectedFixing"
  @close="closeEditFixingDialog"
  @confirm="UpdateFixing"
  />
  <DeleteFixingModal
  :active="showDeleteFixingModal"
  :data="selectedFixing"
  @close="closeDeleteFixingDialog"
  @confirm="DeleteFixing"
  />
</div>
</template>

<script>
import CustomVueTable from '~/components/tables/CustomVueTable.vue';
import EditFixingModal from '~/components/modals/EditFixingModal.vue';
import DeleteFixingModal from '~/components/modals/DeleteFixingModal.vue';
export default {
  components: {
    CustomVueTable,
    EditFixingModal,
    DeleteFixingModal,
  },
  data() {
    return {
      selectedData: [],
      Fields: [
        'West Boulevard',
        'Grand George Canyon',
        'Spring Fields',
        'Tuggerah Football Grounds',
      ],
      Dataset: [
        {
          id: 1,
          date: new Date(),
          manager: 'Mike Tyson',
          field: 'Tuggerah Football Grounds',
          match: [
            {
              time: null,
              team1: 'Barbarians',
              team2: 'Valkeries'
            },
            {
              time: null,
              team1: 'Saints',
              team2: 'Knights'
            },
            {
              time: null,
              team1: 'Banisher',
              team2: 'Banshee'
            }
          ],
        },
        {
          id: 2,
          date: new Date(),
          manager: 'Markus Elle',
          field: 'Grand George Canyon',
          match: [
            {
              time: null,
              team1: 'Barbarians',
              team2: 'Valkeries'
            },
            {
              time: null,
              team1: 'Saints',
              team2: 'Knights'
            },
            {
              time: null,
              team1: 'Banisher',
              team2: 'Banshee'
            }
          ],
        },
        {
          id: 3,
          date: new Date(),
          manager: 'John Doe',
          field: 'Grand George Canyon',
          match: [
            {
              time: null,
              team1: 'Barbarians',
              team2: 'Valkeries'
            },
            {
              time: null,
              team1: 'Saints',
              team2: 'Knights'
            },
            {
              time: null,
              team1: 'Banisher',
              team2: 'Banshee'
            }
          ],
        }
      ],
      dataColumns: [
        { name: 'time', label: 'Time' },
        { name: 'team1', label: 'Team 1' },
        { name: 'team2', label: 'Team 2' },
      ],
      FixingList: [],
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
      selectedFixing: [],
      showCustomVueTable: true,
      showEditFixingModal: false,
      showDeleteFixingModal: false,
    };
  },
  methods: {
    openEditFixingDialog(data) {
      this.selectedFixing = data
      this.showEditFixingModal = true
    },
    openDeleteFixingDialog(data) {
      this.selectedFixing = data
      this.showDeleteFixingModal = true
    },
    closeEditFixingDialog(data) {
      this.selectedFixing = []
      this.showEditFixingModal = false
    },
    closeDeleteFixingDialog(data) {
      this.selectedFixing = []
      this.showDeleteFixingModal = false
    },
    UpdateFixing(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Fixing Updated',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showEditFixingModal = false;
    },
    DeleteFixing(data) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Fixing Deleted',
        position: 'bottom',
        variant: 'success',
        queue: true
      })
      this.showDeleteFixingModal = false;
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