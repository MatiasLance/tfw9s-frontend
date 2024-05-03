<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
      <VForm ref="form" v-model="valid" lazy-validation>
          <h3 class="mb-3 font-bold text-brand-black">
              Edit Fixing
          </h3>
          <hr class="my-3 lg:w-[918px]"/>
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div class="col-span-1">
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
                TFW Staff:
              </label>
              <VSelect
              v-model="Event.managerId"
              :items="filteredManagers"
              placeholder="Choose a Staff"
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
              <label for="selectagegroup" class="mb-1 block">
                Age Group:
              </label>
              <VSelect
              v-model="Event.agegroup_id"
              :items="formattedAgeGroup"
              placeholder="Choose Age Group"
              :rules="rules"
              solo
              >
              </VSelect>
            </div>
            <div class="col-span-1">
              <label for="selectfield" class="mb-1 block">
                Region:
              </label>
              <VSelect
              v-model="Event.region_id"
              :items="filteredRegions"
              placeholder="Choose a Region"
              :rules="rules"
              solo
           >
            <template #prepend-item>
              <div class="sticky-search-bar px-3">
                <SearchBar v-model="regionQuery" />
              </div>
            </template>
          </VSelect>
          </div>
          <div class="col-span-1">
            <label for="selectfield" class="mb-1 block">
              Series:
            </label>
            <VSelect
              v-model="SeriesId"
              :items="filteredSeries"
              placeholder="Choose a Series"
              :rules="rules"
              solo
          >
            <template #prepend-item>
              <div class="sticky-search-bar px-3">
                <SearchBar v-model="seriesQuery" />
              </div>
            </template>
          </VSelect>
          </div>
          <div class="col-span-1">
            <label for="eventname" class="mb-1 block">
              Team Count:
            </label>
            <VTextField
            id="name"
            v-model="Event.teamcount"
            label="Enter Event Title"
            :rules="rules"
            type="number"
            solo
            />
          </div>
          <div class="col-span-1">
              <label for="selectdate" class="mb-1 block">
                Date:
              </label>
              <ODatepicker
              v-model="Event.date"
              placeholder="Click to select..."
              icon="calendar"
              :min-date="mindate"
              :max-date="maxdate"
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
            <div
            class="
            mt-2 grid grid-cols-1 gap-2 md:grid-cols-2"
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
                    :teamList="teams"
                    :fieldList="fields"
                    :region="Event.region_id"
                    :agegroup="Event.agegroup_id"
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
  name: 'EditFixingModal',
  components: { Match },
  props: {
    active: {
      type: Boolean,
      required: true
    },
    event: {
      type: Object,
      default: () => ({}),
    },
    managers: {
      type: Array,
      required: true
    },
    regions: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    agegroup: {
      type: Array,
      required: true
    },
    teams: {
      type: Array,
      required: true
    },
    series: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      SeriesId: null,
      mindate: null,
      maxdate: null,
      valid: true,
      seriesQuery: '',
      managerQuery: '',
      regionQuery: '',
      Event: {},
      multipleMatch: [
        {
          time: null,
          field_id: null,
          team1: [],
          team2: [],
        }
      ],
      rules: [ value => !!value || 'Required' ],
    }
  },
  computed: {
    formattedRegion() {
      return this.regions.map(region =>
        ({ text: region.name, value: region.id }));
    },
    formattedAgeGroup() {
      return this.agegroup.map(agegroup =>
        ({ text: agegroup.name, value: agegroup.id }));
    },
    formattedManager() {
      return this.managers.map(manager =>
        ({
          text: `${manager.user.first_name}
           ${manager.user.last_name}`,
          value: manager.id,
        }));
    },
    formattedSeries() {
      return this.series.map(series =>
        ({ text: series.name, value: series.id }));
    },
    filteredRegions() {
      return this.formattedRegion.filter(region =>
        region && region.text && typeof region.text === 'string' ?
          region.text.toLowerCase().includes(this.regionQuery.toLowerCase()) :
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
    filteredSeries() {
      return this.formattedSeries.filter(series =>
        series && series.text && typeof series.text === 'string' ?
          series.text.toLowerCase().includes(this.seriesQuery.toLowerCase()) :
          false
      );
    },
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.Event = this.event;
          this.SeriesId = this.event.series_id??null;
          const matchingManager = this.filteredManagers.find(manager =>
            manager.value === this.Event.manager.id);
          this.Event.managerId = matchingManager ?
            matchingManager.value : null;
          this.multipleMatch = this.Event.eventmatch.map(event => ({
            id: event.id,
            time: this.reformatTime(event.match_time),
            field_id: event.field_id,
            team1: event.team1,
            team2: event.team2
          }));
        }
      },
      immediate: true,
    },
    SeriesId: {
      handler(newSeries) {
        if (newSeries) {
          const data = this.series.find((x) => x.id === newSeries);
          console.log(data)
          this.mindate = this.formattedDate(data.start);
          this.maxdate = this.formattedDate(data.end);
        }
      },
      immediate: true,
    },
  },
  methods: {
    formattedDate(dateString) {
      const date = new Date(dateString);
      date.setHours(0, 0, 0, 0);
      return date;
    },
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
      this.editFixing()
      this.closeDialog()
    },
    editFixing() {
      let eventYear = this.Event.date.getUTCFullYear();
      let eventMonth = this.Event.date.getUTCMonth() + 1;
      let eventDay = this.Event.date.getUTCDate(); // Get day

      // Increment the day by 1
      eventDay++;

      // Get the last day of the current month
      const lastDayOfMonth = new Date(eventYear, eventMonth, 0).getDate();

      if (eventDay > lastDayOfMonth) {
        eventDay = 1;
        eventMonth++;

        if (eventMonth === 13) {
          eventMonth = 1;
          eventYear++;
        }
      }

      const eventMonthStr = eventMonth.toString().padStart(2, '0');
      const eventDayStr = eventDay.toString().padStart(2, '0');

      const event_date = `${eventYear}-${eventMonthStr}-${eventDayStr}`;

      console.log(this.Event.date)

      const formData = new FormData();
      formData.append('datetime', event_date);
      formData.append('name', this.Event.name);
      formData.append('description', this.Event.description);
      formData.append('region_id', this.Event.region_id);
      formData.append('manager_id', this.Event.managerId);
      formData.append('agegroup_id', this.Event.agegroup_id);
      formData.append('series', this.SeriesId);
      formData.append('teamcount', this.Event.teamcount);

      for (let i = 0; i < this.multipleMatch.length; i++) {
        const match = this.multipleMatch[i];
        formData.append(`matches[${i}][id]`, match.id);
        formData.append(`matches[${i}][time]`, match.time?match.time:'00:00');
        formData.append(`matches[${i}][field_id]`, match.field_id);
        formData.append(`matches[${i}][team1]`, match.team1.id);
        formData.append(`matches[${i}][team2]`, match.team2.id);
      }
      console.log(this.multipleMatch)
      this.$axios
        .$post(`v1/events/${this.Event.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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
          time: null, field_id: null, team1: [], team2: []
        }
      ]
    },
    addMatchForm() {
      this.multipleMatch.push({
        time: null, field_id: null, team1: [], team2: []
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
