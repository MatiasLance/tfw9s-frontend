<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
      <VForm ref="form" v-model="valid" lazy-validation>
          <h3 class="mb-3 font-bold text-brand-black">
              Add Fixing
          </h3>
          <hr class="my-3"/>
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div class="col-span-1 md:col-span-2">
              <label for="eventname" class="mb-1 block">
                Title:
              </label>
              <VTextField
              id="name"
              v-model="Event.name"
              label="Enter Event Title"
              :rules="rules"
              type="text"
              solo
              />
            </div>
            <div class="col-span-1">
              <label for="selectmanager" class="mb-1 block">
                Manager:
              </label>
              <VSelect
              v-model="Event.managerId"
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
              <label for="selectfield" class="mb-1 block">
                Field:
              </label>
              <VSelect
              v-model="Event.fieldId"
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
              <label for="selectdate" class="mb-1 block">
                Date:
              </label>
              <ODatepicker
              v-model="Event.date"
              placeholder="Click to select..."
              icon="calendar"
              :rules="rules"
              />
          </div>
          <div class="col-span-1 md:col-span-2">
            <label for="eventdescription" class="mb-1 block">
              Description:
            </label>
            <VTextarea
            id="name"
            v-model="Event.description"
            label="Enter Event Description"
            :rules="rules"
            type="text"
            solo
            />
          </div>
          <div class="col-span-1 mb-4 lg:col-span-2">
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
            <div class="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
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
                    :teamList="teams"
                    @update-event="updateMatch(matchIndex, $event)"
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
          <hr class="my-3"/>
          <div class="flex flex-col justify-end gap-2 md:flex-row">
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
      </VForm>
    </div>
  </OModal>
</template>

<script>
/* eslint-disable camelcase */
import 'vue-croppa/dist/vue-croppa.css';
import Match from '~/components/Match.vue';

export default {
  name: 'AddFixingModal',
  components: { Match },
  props: {
    active: {
      type: Boolean,
      required: true
    },
    managers: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    teams: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      valid: true,
      managerQuery: '',
      fieldQuery: '',
      Event: {},
      multipleMatch: [
        {
          time: null,
          team1: [],
          team2: [],
        }
      ],
      rules: [ value => !!value || 'Required' ],
    }
  },
  computed: {
    formattedField() {
      return this.fields.map(field =>
        ({ text: field.name, value: field.id }));
    },
    formattedManager() {
      return this.managers.map(manager =>
        ({
          text: `${manager.user.first_name}
           ${manager.user.last_name}`,
          value: manager.id,
        }));
    },
    filteredFields() {
      return this.formattedField.filter(field =>
        field && field.text && typeof field.text === 'string' ?
          field.text.toLowerCase().includes(this.fieldQuery.toLowerCase()) :
          false
      );
    },
    filteredManagers() {
      return this.formattedManager.filter(manager =>
        manager && manager.text && typeof manager.text === 'string' ?
          manager.text.toLowerCase().includes(this.managerQuery.toLowerCase()) :
          false
      );
    },
  },
  methods: {
    reformatTime(timeString) {
      const [
        hours,
        minutes
      ] = timeString.split(':');
      const formattedTime = `${hours}:${minutes}`;
      return formattedTime;
    },
    validate() {
      if (!this.$refs.form.validate()) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Fill out all required fields',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else if (!this.Event.date) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Fill in Event Date',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
      } else {
        this.confirmFixing();
        return true;
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    confirmFixing() {
      this.addFixing()
      this.closeDialog()
    },
    addFixing() {
      const eventYear = this.Event.date.getUTCFullYear();
      const eventMonth = (this.Event.date.getUTCMonth() + 1).toString().padStart(2, '0');
      const eventDay = (this.Event.date.getUTCDate() + 1).toString().
        padStart(2, '0');
      const event_date = `${eventYear}-${eventMonth}-${eventDay}`;

      const formData = new FormData();
      formData.append('datetime', event_date);
      formData.append('name', this.Event.name);
      formData.append('description', this.Event.description);
      formData.append('field_id', this.Event.fieldId);
      formData.append('manager_id', this.Event.managerId);

      for (let i = 0; i < this.multipleMatch.length; i++) {
        const match = this.multipleMatch[i];
        formData.append(`matches[${i}][time]`, match.time?match.time:'00:00');
        formData.append(`matches[${i}][team1]`, match.team1.id);
        formData.append(`matches[${i}][team2]`, match.team2.id);
      }
      this.$axios
        .$post('v1/events', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.reset()
          this.$emit('confirm')
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            this.$router.push('/unauthorized');
          } else {
            console.error('Error:', error);
          }
        });
    },
    closeDialog() {
      this.reset()
      this.$emit('close')
    },
    reset() {
      this.Event = []
      this.multipleMatch = [
        {
          time: null, team1: [], team2: []
        }
      ]
    },
    addMatchForm() {
      this.multipleMatch.push({
        time: null, team1: [], team2: []
      });
    },
    updateMatch(matchIndex, newMatch) {
      this.$set(this.multipleMatch, matchIndex, newMatch);
    },
    removeMatch(index) {
      if (this.multipleMatch.length !== 1) {
        this.multipleMatch.splice(index, 1)
      } else {
        this.$oruga.notification.open({
          message: 'Fixing needs at least one match.',
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
