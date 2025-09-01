<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
      <VForm ref="form" v-model="valid" lazy-validation>
          <h3 class="text-brand-black mb-3 font-bold">
              Edit Fixing
          </h3>
          <hr class="my-3 lg:w-[918px]"/>
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div class="col-span-2 md:col-span-1">
              <label for="selectmatchtime" class="mb-1 block">
               Match Time
              </label>
              <VSelect
                v-model="Event.time"
                :items="matchTimeOption"
                label="Choose Match Time"
                :rules="rules"
                solo
              >
              </VSelect>
            </div>
            <div class="col-span-2 md:col-span-1">
              <label for="selectfield" class="mb-1 block">
                Region:
              </label>
              <VSelect
              v-model="Event.region_id"
              :items="filteredRegions"
              label="Choose a Region"
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
            <div class="col-span-2 md:col-span-1">
              <label for="selectagegroup" class="mb-1 block">
                Age Group:
              </label>
              <VSelect
              v-model="Event.agegroup_id"
              :items="formattedAgeGroup"
              label="Choose Age Group"
              :rules="rules"
              solo
              disabled
              >
              </VSelect>
            </div>
            <div class="col-span-2 md:col-span-1">
              <label for="selectfield" class="mb-1 block">
                Series:
              </label>
              <VSelect
                v-model="Event.series_id"
                :items="filteredSeries"
                label="Choose a Series"
                solo
                disabled
              >
              <template #prepend-item>
                <div class="sticky-search-bar px-3">
                  <SearchBar v-model="seriesQuery" />
                </div>
              </template>
            </VSelect>
            </div>
            <div class="col-span-2 md:col-span-1">
              <label for="selectdate" class="mb-1 block">
                Date:
              </label>
              <ODatepicker
              v-model="Event.date"
              label="Click to select..."
              icon="calendar"
              :min-date="mindate"
              :max-date="maxdate"
              :rules="rules"
              />
            </div>
            <div class="col-span-2 md:col-span-1">
              <label for="selectagegroup" class="mb-1 block">
               Match Round
              </label>
              <VSelect
                v-model="Event.round"
                :items="matchRoundOption"
                label="Choose Match Round"
                :rules="rules"
                solo
              >
              </VSelect>
            </div>
            <div class="col-span-1 md:col-span-2" hidden>
              <label for="eventname" class="mb-1 block">
                Title:
              </label>
              <VTextField
              id="name"
              v-model="Event.name"
              label="Enter Event Title"
              type="text"
              solo
              />
            </div>
            <div class="col-span-1" hidden>
              <label for="selectmanager" class="mb-1 block">
                TFW Staff:
              </label>
              <VSelect
              v-model="Event.managerId"
              :items="filteredManagers"
              label="Choose a Staff"
              solo
              >
                <template #prepend-item>
                  <div class="sticky-search-bar px-3">
                    <SearchBar v-model="managerQuery" />
                  </div>
                </template>
              </VSelect>
            </div>
          <div class="col-span-1" hidden>
            <label for="eventname" class="mb-1 block">
              Team Count:
            </label>
            <VTextField
            id="name"
            v-model="Event.teamcount"
            label="Enter Event Title"
            type="number"
            solo
            />
          </div>
          <div class="col-span-1 mb-4 lg:col-span-2">
            <div class="flex items-center justify-between">
              <label class="mb-1 block"> Matches: </label>
              <button
                type="button"
                class="
                  border-brand-black
                  bg-brand-black
                  flex
                  items-center justify-center border
                  border-solid
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
                  <div
                    v-if="matchBuffer.submitted"
                    class="flex items-center justify-center"
                  >
                    <span class="text-xs text-red-400">
                      This match is already submitted.
                    </span>
                  </div>
                  <div class="absolute top-2 left-[15px] mb-[20px] flex items-center gap-2 z-10">
                    <VCheckbox
                      v-model="matchBuffer.isBye"
                      color="primary"
                      hide-details
                      class="ma-0 pa-0"
                      @click="matchBuffer.team2 = []"
                    />
                    <label
                      class="text-sm font-medium text-gray-800 cursor-pointer -ml-[15px]"
                      @click="matchBuffer.isBye = !matchBuffer.isBye"
                    >
                      Bye
                    </label>
                  </div>
                  <button
                    v-if="!matchBuffer.submitted"
                    type="button"
                    class="
                      text-brand-black
                      hover:bg-brand-black
                      absolute
                      right-2 top-2
                      h-6
                      w-6 hover:text-white
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
                    :series="Event.series_id"
                    :agegroup="Event.agegroup_id"
                    :isBye="matchBuffer.isBye"
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
import currencyMixin from '@/mixins/currency';

export default {
  name: 'EditFixingModal',
  components: { Match },
  mixins: [ currencyMixin ],
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
      matchTime: null,
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
      matchRoundOption: [
        { text: 'Round', value: 'round' },
        { text: 'Semi', value: 'semi' },
        { text: 'Final', value: 'final' },
        { text: 'Pool A Round', value: 'pool_a_round' },
        { text: 'Pool B Round', value: 'pool_b_round' },
        { text: 'Pool C Round', value: 'pool_c_round' },
        { text: 'Pool D Round', value: 'pool_d_round' },
        { text: 'Pool A Semi', value: 'pool_a_semi' },
        { text: 'Pool B Semi', value: 'pool_b_semi' },
        { text: 'Pool C Semi', value: 'pool_c_semi' },
        { text: 'Pool D Semi', value: 'pool_d_semi' },
        { text: 'Pool A Grand Final', value: 'pool_a_grand_final' },
        { text: 'Pool B Grand Final', value: 'pool_b_grand_final' },
        { text: 'Pool C Grand Final', value: 'pool_c_grand_final' },
        { text: 'Pool D Grand Final', value: 'pool_d_grand_final' },
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
          this.multipleMatch = this.Event.eventmatch.map(event => ({
            id: event.id,
            field_id: event.field_id,
            team1: event.team1,
            team2: event.team2,
            submitted: event.submitted,
          }));
        }
      },
      immediate: true,
    },
    SeriesId: {
      handler(newSeries) {
        if (newSeries) {
          const data = this.series.find((x) => x.id === newSeries);
          this.mindate = this.formattedDate(data.start);
          this.maxdate = this.formattedDate(data.end);
        }
      },
      immediate: true,
    },
    multipleMatch: {
      handler(newVal, oldVal) {
        const firstMatchTime = newVal.map(match => {
          const matchTime = new Date(match.time);
          return matchTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }
          );
        })[0];
        if (firstMatchTime) {
          this.matchTime = firstMatchTime;
        }
      },
      deep: true
    },
  },
  methods: {
    formattedDate(dateString) {
      const date = new Date(dateString);
      date.setHours(0, 0, 0, 0);
      return date;
    },
    convertTimeToDate(timeString) {
      const [ hours, minutes ] = timeString.split(':').map(Number);
      const today = new Date();
      today.setHours(hours, minutes, 0, 0);
      return today;
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

      const formData = new FormData();
      formData.append('time', this.Event.time);
      formData.append('round', this.Event.round);
      formData.append('region_id', this.Event.region_id);
      formData.append('agegroup_id', this.Event.agegroup_id);
      formData.append('datetime', event_date);

      for (let i = 0; i < this.multipleMatch.length; i++) {
        const match = this.multipleMatch[i];
        formData.append(`matches[${i}][id]`, match.id);
        formData.append(`matches[${i}][time]`, this.matchTime);
        formData.append(`matches[${i}][field_id]`, match.field_id);
        formData.append(`matches[${i}][team1]`, match.team1.id);
        formData.append(`matches[${i}][team2]`, match.isBye ? 0: match.team2.id);
      }
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
        time: null, field_id: null, team1: [], team2: [], isBye: false
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
  input {
    box-shadow: none !important;
    border: 1px rgb(243 244 246 / var(--tw-border-opacity)) !important;
    background-color: rgb(243 244 246 / var(--tw-bg-opacity)) !important;
    padding: 0.65rem 0.75rem !important;
    width: 100% !important;
    appearance: none !important;
    border-radius: 0 !important;
    transition: border-color 0.3s !important;
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

  ::v-deep .v-text-field input::label {
    font-size: 1rem !important;
    font-family: inherit !important;
    color: rgb(104, 104, 104) !important;
  }

  .custom-btn {
    height: 50px !important;
  }

  ::v-deep .o-input {
    box-shadow: none !important;
    border: 1px rgb(243 244 246 / var(--tw-border-opacity)) !important;
    background-color: rgb(243 244 246 / var(--tw-bg-opacity)) !important;
    height: 2.8rem;
    width: 100% !important;
    appearance: none !important;
    border-radius: 0 !important;
    transition: border-color 0.3s !important;
  }

  ::v-deep .o-tpck__select  {
    padding: 5px 35px 5px !important;
  }

  ::v-deep input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
  }
</style>
