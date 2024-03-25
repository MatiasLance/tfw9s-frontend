<template>
  <div>
    <div class="col-span-2">
      <label for="match_name" class="mb-1 block">
          Match Time:
      </label>
      <input
      v-model="matchData.time" type="time"
      placeholder="Click to select..."
      />
    </div>
    <div class="col-span-1">
      <label for="match_name" class="mb-1 block">
          Team 1:
      </label>
      <VSelect
      v-model="matchData.team1"
      :items="teamList"
      placeholder="Choose a Manager"
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
      <label for="match_name" class="mb-1 block">
          Team 2:
      </label>
      <VSelect
      v-model="matchData.team2"
      :items="teamList"
      placeholder="Choose a Manager"
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
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      team1Query: '',
      team2Query: '',
      rules: [ value => !!value || 'Required' ],
      matchData: {
        time: this.match.time || new Date().getTime(),
        team1: this.match.team1 || '',
        team2: this.match.team2|| '',
      },
    }
  },
  watch: {
    matchData: {
      handler(newMatch) {
        this.$emit('update-data', newMatch)
      },
      deep: true,
    },
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
