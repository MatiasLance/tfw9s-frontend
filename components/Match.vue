<template>
  <div>
    <div class="col-span-2">
      <label for="match_time" class="mb-1 block">
          Match Time:
      </label>
      <input
      id="time"
      v-model="matchData.time" type="time"
      placeholder="Click to select..."
      step="900"
      :min="'08:00'"
      :max="'18:00'"
      :rules="rules"
      />
    <!--
      <VTimePicker
      v-model="matchData.time"
      full-width
      no-title
      landscape
      color="green"
      min="08:00:00"
      max="18:00:00"
      />
    -->
    </div>
    <div class="col-span-1">
      <label for="fielf" class="mb-1 block">
        Field:
      </label>
      <VSelect
      v-model="matchData.field_id"
      :items="filteredFields"
      placeholder="Choose Field"
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
      <label for="match_team1" class="mb-1 block">
          Team 1:
      </label>
      <VSelect
      v-model="matchData.team1.id"
      :items="filteredTeam1"
      placeholder="Choose Team 1"
      :rules="rules"
      solo
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
      placeholder="Choose Team 2"
      :rules="rules"
      solo
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
    region: {
      type: Number,
      default: null,
      required: false,
    },
    agegroup: {
      type: Number,
      default: null,
      required: false,
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
      return this.teamList.map(team =>
        ({
          text: team.name,
          value: team.id,
          age: team.agegroup_id
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
      return this.formattedField.filter(field => {
        return field && field.text && typeof field.text === 'string' &&
          field.text.toLowerCase().includes(this.fieldQuery.toLowerCase()) &&
          (this.region ? this.region === field.region : true);
      });
    },
    filteredTeam1() {
      return this.formattedTeam.filter(team =>
        team && team.text && typeof team.text === 'string' ?
          team.text.toLowerCase().includes(this.team1Query.toLowerCase()) &&
          this.matchData.team2.id !== team.value &&
          (this.agegroup?this.agegroup === team.age:true):
          false
      );
    },
    filteredTeam2() {
      return this.formattedTeam.filter(team =>
        team && team.text && typeof team.text === 'string' ?
          team.text.toLowerCase().includes(this.team2Query.toLowerCase()) &&
          this.matchData.team1.id !== team.value &&
          (this.agegroup?this.agegroup === team.age:true):
          false
      );
    },
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
