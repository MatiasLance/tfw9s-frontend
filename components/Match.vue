<template>
  <div>
    <div class="col-span-1">
      <label for="field" class="mb-1 block">
        Field:
      </label>
      <VSelect
      v-model="matchData.field_id"
      :items="filteredFields"
      label="Choose Field"
      :rules="rules"
      solo
      :disabled="isMatchAlreadySubmitted"
      >
        <template #prepend-item>
          <div class="sticky-search-bar px-3">
            <SearchBar v-model="fieldQuery" />
          </div>
        </template>
      </VSelect>
    </div>
    <div class="col-span-1">
      <label for="match_team1" class="mb-1 block">
          Team 1:
      </label>
      <VSelect
      v-model="matchData.team1.id"
      :items="filteredTeam1"
      label="Choose Team 1"
      :rules="rules"
      solo
      :disabled="isMatchAlreadySubmitted"
      >
        <template #prepend-item>
          <div class="sticky-search-bar px-3">
            <SearchBar v-model="team1Query" />
          </div>
        </template>
      </VSelect>
    </div>
    <div class="col-span-1">
      <label for="match_team2" class="mb-1 block">
          Team 2:
      </label>
      <VSelect
      v-model="matchData.team2.id"
      :items="filteredTeam2"
      label="Choose Team 2"
      :rules="rules"
      solo
      :disabled="isMatchAlreadySubmitted"
      >
        <template #prepend-item>
          <div class="sticky-search-bar px-3">
            <SearchBar v-model="team2Query" />
          </div>
        </template>
      </VSelect>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    match: {
      type: Object,
      required: true,
    },
    teamList: {
      type: Array,
      required: true,
    },
    fieldList: {
      type: Array,
      required: true,
    },
    series: {
      type: String,
      required: true,
    },
    agegroup: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fieldQuery: '',
      team1Query: '',
      team2Query: '',
      rules: [ value => !!value || 'Required' ],
      matchData: {
        id: this.match.id || null,
        // eslint-disable-next-line camelcase
        field_id: this.match.field_id || '',
        time: this.match.time,
        team1: this.match.team1 || '',
        team2: this.match.team2|| '',
      },
    }
  },
  computed: {
    formattedTeam() {
      return this.teamList
        .filter(
          team => team.agegroup_id === this.agegroup &&
          team.series_id === this.series
        )
        .map(team => ({
          text: team.name,
          value: team.id,
          event: team.event_id
        }));
    },
    formattedField() {
      return this.fieldList.map(field =>
        ({
          text: field.name,
          value: field.id,
          region: field.region_id
        }));
    },
    filteredFields() {
      return this.formattedField;
    },
    filteredTeam1() {
      return this.formattedTeam;
    },
    filteredTeam2() {
      return this.formattedTeam;
    },
    isMatchAlreadySubmitted() {
      return this.match.submitted === 1;
    }
  },
  watch: {
    matchData: {
      handler(newMatch) {
        this.$emit('update-event', newMatch);
      },
      deep: true
    },
    match: {
      immediate: true,
      handler(newMatch) {
        this.matchData = newMatch
      }
    }
  },
}

</script>

<style scoped>
select.o-tpck__select {
  appearance: auto !important;
}
</style>
