<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
      <form @submit.prevent="updateFixing">
          <h3 class="mb-3 font-bold text-brand-black">
              Edit Fixing
          </h3>
          <hr class="my-3"/>
          <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div class="col-span-1">
              <label for="fixingname" class="mb-1 block">
                Manager:
              </label>
              <VSelect
              v-model="Data.manager"
              :items="filteredManagers"
              placeholder="Choose a Manager"
              :rules="rules"
              solo
              >
                <template #prepend-item>
                  <div class="sticky-search-bar px-3">
                    <SearchBar v-model="managerQuery" />
                  </div>
                </template>
              </VSelect>
            </div>
            <div class="col-span-1">
              <label for="fixingname" class="mb-1 block">
                Field:
              </label>
              <VSelect
              v-model="Data.field"
              :items="filteredFields"
              placeholder="Choose a Field"
              :rules="rules"
              solo
           >
            <template #prepend-item>
              <div class="sticky-search-bar px-3">
                <SearchBar v-model="fieldQuery" />
              </div>
            </template>
          </VSelect>
          </div>
          <div class="col-span-1">
              <label for="fixingname" class="mb-1 block">
                Date:
              </label>
              <ODatepicker
              v-model="Data.date"
              placeholder="Click to select..."
              icon="calendar"
              />
          </div>
          <div class="col-span-1 lg:col-span-2 mb-4">
            <div class="flex items-center justify-between">
              <label class="mb-1 block"> Matches: </label>
              <button
                type="button"
                class="
                  flex
                  items-center
                  justify-center
                  border border-solid border-brand-black
                  bg-brand-black
                  px-4
                  py-2
                  text-white
                "
                @click="addMatchForm"
              >
                <i class="ri-add-fill"></i>
                Add Match
              </button>
            </div>
            <div
            class="
            mt-2 grid grid-cols-1 md:grid-cols-2 gap-2"
            >
              <div
              v-for="(matchBuffer, matchIndex) in multipleMatch"
              :key="matchIndex"
              class="flex justify-center gap-1"
              >
              <!-- data Map -->
                <div
                class="
                  relative
                  h-auto
                  w-full
                  rounded-lg
                  border-2
                  border-[#CCCCCC]
                  p-4"
                >
                  <button
                    type="button"
                    class="
                      absolute
                      right-2
                      top-2
                      h-6 w-6
                      text-brand-black
                      hover:bg-brand-black hover:text-white
                    "
                    @click="removeMatch(matchIndex)"
                  >
                    <div class="ri-close-fill ri-lg"></div>
                  </button>
                  <Match
                    :match="matchBuffer"
                    :teamList="teamList"
                    @update-data="updateMatch(matchIndex, $event)"
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
          <hr class="my-3"/>
          <div class="flex flex-col justify-end md:flex-row gap-2">
            <VBtn
            depressed
            color="success"
            class="custom-btn w-full md:w-[185px] lg:w-[185px]"
            :disabled="!valid"
            @click="validate"
            >
              OK
            </VBtn>
            <VBtn
            depressed
            color="error"
            class="custom-btn w-full md:w-[185px] lg:w-[185px]"
            @click="closeDialog"
            >
              Cancel
            </VBtn>
          </div>
      </form>
    </div>
  </OModal>
</template>

<script>
/* eslint-disable camelcase */
import 'vue-croppa/dist/vue-croppa.css';
import Match from '~/components/Match.vue';

export default {
  name: 'EditFixingModal',
  components: { Match },
  props: {
    active: {
      type: Boolean,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      managerQuery: '',
      fieldQuery: '',
      Data: {},
      multipleMatch: [
        {
          time: '',
          team1: '',
          team2: ''
        }
      ],
      rules: [ value => !!value || 'Required' ],
      Managers: [
        'Mike Tyson',
        'John Doe',
        'Markus Elle',
        'Juan Dela Cruz',
      ],
      Fields: [
        'West Boulevard',
        'Grand George Canyon',
        'Spring Fields',
        'Tuggerah Football Grounds',
      ],
      teamList: [
        'Barbarians',
        'Valkeries',
        'Saints',
        'Knights',
        'Banisher',
        'Banshee',
      ],
    }
  },
  computed: {
    filteredFields() {
      return this.Fields.filter(field =>
        field && typeof field === 'string' ?
          field.toLowerCase().includes(this.fieldQuery.toLowerCase()) :
          false
      );
    },
    filteredManagers() {
      return this.Managers.filter(manager =>
        manager && typeof manager === 'string' ?
          manager.toLowerCase().includes(this.managerQuery.toLowerCase()) :
          false
      );
    },
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.Data = this.data;
          this.multipleMatch = this.Data.match.map(data => ({
            time: data.time,
            team1: data.team1,
            team2: data.team2
          }));
        }
      },
      immediate: true,
    },
  },
  methods: {
    updateFixing() {
      this.multipleMatch = []
      this.$emit('confirm')
    },
    closeDialog() {
      this.$emit('close')
    },
    addMatchForm() {
      this.multipleMatch.push({
        time: null, team1: '', team2: ''
      });
    },
    updateMatch(matchIndex, newMatch) {
      this.$set(this.multipleMatch, matchIndex, newMatch);
    },
    removeMatch(index) {
      console.log(index)
      if (this.multipleMatch.length !== 1) {
        this.multipleMatch.splice(index, 1)
      } else {
        this.$oruga.notification.open({
          message: 'Manager needs at least one match.',
          variant: 'info',
          duration: 3000,
          position: 'bottom',
          queue: true,
        });
      }
    },
  }
}
</script>

<style scoped>
input{
  background: transparent;
}
  .sticky-search-bar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #ffffff;
  padding: 10px;
  }

  .v-list{
  padding: 0px;
  }

.v-select__selection.v-select__selection--comma {
  background-color: #f3f4f6;
}

  ::v-deep .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control > .v-input__slot {
  box-shadow: none;
  border: 1px rgb(243 244 246 / var(--tw-border-opacity));
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
  padding: 0.5rem 0.75rem;
  width: 100%;
  appearance: none;
  border-radius: 0;
  transition: border-color 0.3s;
  }

  ::v-deep .v-text-field input::placeholder {
  font-size: 1rem !important;
  font-family: inherit !important;
  color: rgb(104, 104, 104) !important;
  }

  .custom-btn {
    height: 50px !important;
  }
</style>
