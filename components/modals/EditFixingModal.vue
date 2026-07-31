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
              :items="formattedRegion"
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
                  flex items-center justify-center
                  border border-solid border-brand-black
                  bg-brand-black
                  px-4 py-2
                  text-white
                  rounded-md
                  transition-all duration-200 ease-in-out
                  hover:bg-gray-900 hover:border-gray-900
                  hover:shadow-lg hover:shadow-black/20
                  hover:-translate-y-0.5
                  active:scale-95 active:translate-y-0 active:shadow-md
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-black
                "
                @click="addMatchForm"
              >
                <span class="flex items-center gap-1.5 text-white">
                  <i class="ri-add-fill"></i>
                  Add Match
                </span>
              </button>
            </div>
            <div
              class="
              mt-2 grid grid-cols-1 gap-2 md:grid-cols-2"
            >
              <div
              v-for="(matchBuffer, matchIndex) in multipleMatch"
              :key="matchBuffer.id ? `match-${matchBuffer.id}` : `new-match-${matchIndex}`"
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
                      @change="handleByeToggle(matchBuffer)"
                    />
                    <label
                      class="text-sm font-medium text-gray-800 cursor-pointer -ml-[15px]"
                      @click="matchBuffer.isBye = !matchBuffer.isBye; handleByeToggle(matchBuffer)"
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
            :disabled="!valid || isSaving"
            :loading="isSaving"
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
import {
  fixtureTimeOptions,
  normalizeFixtureTime
} from '~/utils/fixtureTime';

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
      isSaving: false,
      seriesQuery: '',
      managerQuery: '',
      regionQuery: '',
      Event: {},
      multipleMatch: [
        {
          time: null,
          field_id: null,
          team1: null,
          team2: null,
          isBye: false
        }
      ],
      matchTimeOption: fixtureTimeOptions,
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
      matchCache: {},
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
          this.Event = JSON.parse(JSON.stringify(this.event));
          this.Event.time = normalizeFixtureTime(this.Event.time);

          if (this.Event.date) {
            this.Event.date = new Date(this.Event.date);
          }
          
          if (this.Event.eventmatch) {
            this.multipleMatch = this.Event.eventmatch.map(event => ({
              id: event.id,
              field_id: event.field_id,
              team1: event.team1,
              team2: event.team2,
              cachedTeam2: null,
              submitted: event.submitted,
              isBye: false
            }));
          } else {
            this.multipleMatch = [];
          }
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
  },
  methods: {
    formattedDate(dateString) {
      const date = new Date(dateString);
      date.setHours(0, 0, 0, 0);
      return date;
    },
    async validate() {
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
        return this.confirmFixing();
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async confirmFixing() {
      if (this.isSaving) return false

      this.isSaving = true

      try {
        await this.editFixing()
        this.reset()
        this.$emit('confirm')
        return true
      } catch (error) {
        if (error.response && error.response.status === 403) {
          this.$router.push('/unauthorized')
        } else {
          const errors = error.response && error.response.data
            ? error.response.data.errors
            : null
          const message = errors
            ? Object.values(errors).flat().join(' ')
            : 'Unable to update the fixture. Please try again.'

          this.$oruga.notification.open({
            duration: 5000,
            message,
            position: 'bottom',
            variant: 'danger',
            queue: true,
          })
        }

        return false
      } finally {
        this.isSaving = false
      }
    },
    async editFixing() {
      const eventYear = this.Event.date.getFullYear();
      const eventMonth = this.Event.date.getMonth() + 1;
      const eventDay = this.Event.date.getDate();

      const eventMonthStr = eventMonth.toString().padStart(2, '0');
      const eventDayStr = eventDay.toString().padStart(2, '0');

      const event_date = `${eventYear}-${eventMonthStr}-${eventDayStr}`;

      const formData = new FormData();
      formData.append('time', normalizeFixtureTime(this.Event.time) || '');
      formData.append('round', this.Event.round || '');
      formData.append('region_id', this.Event.region_id || '');
      formData.append('agegroup_id', this.Event.agegroup_id || '');
      formData.append('datetime', event_date);

      for (let i = 0; i < this.multipleMatch.length; i++) {
        const match = this.multipleMatch[i];

        const team1Id = match.team1 ? match.team1.id : '';
        const team2Id = match.isBye ? 0 : (match.team2 ? match.team2.id : '');

        formData.append(`matches[${i}][id]`, match.id || '');
        formData.append(`matches[${i}][field_id]`, match.field_id || '');
        formData.append(`matches[${i}][team1]`, team1Id);
        formData.append(`matches[${i}][team2]`, team2Id);
      }
      
      return this.$axios.$post(
        `v1/events/${this.Event.id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
    },
    closeDialog() {
      this.reset()
      this.$emit('close')
    },
    reset() {
      this.Event = {}
      this.multipleMatch = [
        {
          time: null,
          field_id: null,
          team1: null,
          team2: null,
          cachedTeam2: null,
          isBye: false
        }
      ]
    },
    addMatchForm() {
      this.multipleMatch.push({
        time: null,
        field_id: null,
        team1: null,
        team2: null,
        cachedTeam2: null,
        isBye: false
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
    handleByeToggle(match) {
      if (match.isBye) {
        match.cachedTeam2 = match.team2 ? { ...match.team2 } : null;
        match.team2 = { id: 0 };
      } else {
        match.team2 = match.cachedTeam2 ? { ...match.cachedTeam2 } : { id: null };
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
