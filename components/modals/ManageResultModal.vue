<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full overflow-hidden rounded bg-white">
      <!-- Header with Stadium Feel -->
      <div class="bg-brand-black px-6 py-4 text-white">
        <h3 class="flex items-center gap-2 text-lg font-black uppercase italic">
          <i class="ri-numbers-line text-brand-green"></i>
          Final Score Entry
        </h3>
      </div>

      <VForm ref="form" v-model="valid" lazy-validation class="p-6">
        <!-- Scoreboard Grid -->
        <div class="mb-6 grid grid-cols-1 items-center gap-4 sm:grid-cols-7">
          <!-- Team 1 -->
          <div class="sm:col-span-3">
            <label class="mb-2 block text-xs font-bold uppercase text-gray-500">
              {{ displayTeam1Name }}
            </label>
            <VTextField
              v-model="MatchData.team1_score"
              type="number"
              placeholder="0"
              solo
              flat
              class="scoreboard-input shadow-sm"
              :rules="rules"
              :readonly="displayTeam1Name === 'Bye'"
            />
          </div>

          <!-- VS Divider -->
          <div class="hidden text-center sm:col-span-1 sm:block">
            <span class="text-sm font-black italic text-gray-800">VS</span>
          </div>

          <!-- Team 2 -->
          <div class="sm:col-span-3">
            <label class="mb-2 block text-xs font-bold uppercase text-gray-500">
              {{ displayTeam2Name }}
            </label>
            <VTextField
              v-model="MatchData.team2_score"
              type="number"
              placeholder="0"
              solo
              flat
              class="scoreboard-input shadow-sm"
              :rules="rules"
              :readonly="displayTeam2Name === 'Bye'"
            />
          </div>
        </div>

        <hr class="mb-6 border-gray-400" />

        <!-- Tactical Actions -->
          <div
            v-if="MatchData.is_abandoned_match"
            class="mb-8 flex w-full items-center justify-center gap-2 rounded-lg 
                  border-2 border-dashed border-red-200 py-3 text-xs 
                  font-bold uppercase tracking-widest text-red-500 
                  transition-all hover:bg-red-50 hover:border-red-400"
          >
            <i class="ri-alert-line text-lg"></i>
            Abandoned Matched
          </div>

        <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="
              flex h-[52px] w-full items-center justify-center rounded-lg 
              border-2 border-brand-black px-8 py-3 text-sm font-black 
              uppercase tracking-widest text-white transition-all
              bg-brand-black hover:bg-gray-700 hover:text-white
              active:scale-95 sm:w-auto
            "
            @click="closeDialog"
          >
          <span class="text-white">
            Cancel
          </span>
          </button>

          <button
            type="button"
            class="flex w-full items-center justify-center gap-2 rounded-lg 
                  border-2 border-red-900 bg-red-900 py-3 text-xs 
                  font-bold uppercase tracking-widest text-red-500 
                  transition-all hover:bg-red-800 hover:border-red-800
                  disabled:cursor-not-allowed disabled:opacity-50 sm:w-[280px]"
            @click="handleMatchAbandoned(true)"
            :disabled="MatchData.is_abandoned_match"
          >
            <span class="text-white">
                <i class="ri-alert-line text-lg"></i>
                Abandoned Match
            </span>
          </button>
          
          <button
            type="button"
            :disabled="!valid || processing"
            class="
              flex h-[52px] w-full items-center justify-center gap-2 rounded-lg 
              bg-emerald-600 px-10 py-3 text-sm font-black uppercase 
              tracking-widest text-white shadow-lg transition-all 
              hover:bg-emerald-500 active:scale-95 disabled:cursor-not-allowed 
              disabled:opacity-50 sm:w-[280px]
            "
            @click="validate"
          > 
            <span class="text-white">
              <i v-if="processing" class="ri-loader-4-line animate-spin text-xl"></i>
              <i v-else class="ri-check-double-line text-xl"></i>
              {{ processing ? 'Updating...' : 'Confirm Score' }}
            </span>
          </button>
        </div>
      </VForm>
    </div>
  </OModal>
</template>

<script>
/* eslint-disable camelcase */
import 'vue-croppa/dist/vue-croppa.css';

export default {
  name: 'ManageResultModal',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    match: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      processing: false,
      regionQuery: '',
      valid: true,
      MatchData: {
        team1: [],
        team2: [],
      },
      rules: [ 
        value => (value !== null &&
        value !== undefined &&
        value !== '') || 'Required' 
      ],
      isAbandonedMatched: false
    }
  },
  computed: {
    displayTeam2Name() {
      if (!this.MatchData) return 'Loading...';

      return this.MatchData ?
        this.MatchData.team2.name :
        'Bye';
    },
    displayTeam1Name() {
      if (!this.MatchData) return 'Loading...';

      return this.MatchData ? this.MatchData.team1.name : 'Bye';
    }
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.MatchData = JSON.parse(JSON.stringify(this.match));
          
          this.MatchData.team1_name = this.MatchData.team1 ?
            this.MatchData.team1 :
            'Unknown';
            
          this.MatchData.team2_name = this.MatchData.team2 ?
            this.MatchData.team2 :
            'Bye';
        }
      },
      immediate: true,
      isAbandonedMatched: {
        handler(isTrue) {
          if (isTrue) {
            this.MatchData.is_abandoned_match = isTrue
          }
        }
      }
    },
  },
  methods: {
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
      } else {
        this.processing = true;
        this.confirmResult();
        return true;
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    confirmResult() {
      this.saveResult()
    },
    saveResult() {
      const formData = new FormData();
      formData.append('team1_score', this.MatchData.team1_score);
      formData.append('team2_score', this.MatchData.team2_score);
      formData.append('is_abandoned_match', this.isAbandonedMatched);
      this.$axios
        .$post(`v1/eventmatches/update/${this.MatchData.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.processing = false;
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Match Abandoned: Standings updated with 1 point awarded to each team.',
            position: 'bottom',
            variant: 'success',
            queue: true,
          });
          this.reset();
          this.closeDialog()
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
    handleMatchAbandoned(val) {
      this.isAbandonedMatched = val
      this.confirmResult();
    },
    closeDialog() {
      this.$emit('close')
    },
    reset() {
      this.MatchData = []
    },
  }
}
</script>

<style scoped>
.scoreboard-input :deep(.v-input__slot) {
  background: #f8fafc !important;
  border: 2px solid #e2e8f0 !important;
  font-size: 1.5rem !important;
  font-weight: 900 !important;
  text-align: center !important;
  border-radius: 12px !important;
}
.scoreboard-input :deep(input) {
  text-align: center;
}
</style>

