<template>
  <div class="mt-6 space-y-4">
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
        solo
        :disabled="isMatchAlreadySubmitted || isBye"
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
      default: () => [],
    },
    fieldList: {
      type: Array,
      default: () => [],
    },
    isBye: {
      type: Boolean,
      default: false,
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
        field_id: this.match.field_id || null,
        time: this.match.time,
        team1: this.match.team1 && !Array.isArray(this.match.team1) ?
          { id: this.match.team1.id } : { id: null },
        team2: this.match.team2 && !Array.isArray(this.match.team2) ?
          { id: this.match.team2.id } : { id: null },
      },
    }
  },
  computed: {
    formattedTeam() {
      return this.teamList.map(team => ({
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
      const query = this.fieldQuery.toLowerCase().trim();
      return query
        ? this.formattedField.filter(field => field.text.toLowerCase().includes(query))
        : this.formattedField;
    },
    filteredTeam1() {
      const query = this.team1Query.toLowerCase().trim();
      return this.formattedTeam.filter(team => {
        const matchesQuery = !query || team.text.toLowerCase().includes(query);
        return matchesQuery && team.value !== this.matchData.team2.id;
      });
    },
    filteredTeam2() {
      const query = this.team2Query.toLowerCase().trim();
      const teams = this.formattedTeam.filter(team => {
        const matchesQuery = !query || team.text.toLowerCase().includes(query);
        return matchesQuery && team.value !== this.matchData.team1.id;
      });

      return [ { text: 'Bye', value: 0 }, ...teams ];
    },
    isMatchAlreadySubmitted() {
      return !!this.match.submitted;
    }
  },
  watch: {
    match: {
      handler(newMatch) {
        this.syncMatchToData(newMatch);
      },
      deep: true,
      immediate: true,
    },
    matchData: {
      handler(newMatch) {
        this.$emit('update-event', newMatch);
      },
      deep: true
    }
  },
  methods: {
    syncMatchToData(match = this.match) {
      this.matchData = {
        id: match.id || null,
        // eslint-disable-next-line camelcase
        field_id: match.field_id || null,
        time: match.time,
        team1: match.team1 && !Array.isArray(match.team1) ? { id: match.team1.id } : { id: null },
        team2: match.team2 && !Array.isArray(match.team2) ? { id: match.team2.id } : { id: 0 },
      };
    }
  }
}
</script>

<style scoped>
select.o-tpck__select {
  appearance: auto !important;
}
</style>
