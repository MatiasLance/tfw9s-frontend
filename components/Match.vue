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
      :rules="rules"
      />
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
    agegroup: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      team1Query: '',
      team2Query: '',
      rules: [ value => !!value || 'Required' ],
      matchData: {
        id: this.match.id || null,
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
.o-tpck__select {
  width: 100px !important; /* Override width */
}
.o-tpck__select o-tpck__select-placeholder{
  width: 100px !important; /* Override width */
}
</style>
