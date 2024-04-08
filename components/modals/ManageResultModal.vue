<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <VForm ref="form" v-model="valid" lazy-validation>
                <h3 class="mb-3 font-bold text-brand-black">
                    Manage Result
                </h3>
                <hr class="my-3"/>
                <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div class="col-span-1 p-4">
                    <label for="team1score" class="mb-1 block">
                      {{ MatchData.team1_name }}
                    </label>
                    <VTextField
                    id="name"
                    v-model="MatchData.team1_score"
                    label="Team 1 Score"
                    :rules="rules"
                    type="number"
                    solo
                    />
                  </div>
                  <div class="col-span-1 p-4">
                    <label for="team2score" class="mb-1 block">
                      {{ MatchData.team2_name }}
                    </label>
                    <VTextField
                    id="name"
                    v-model="MatchData.team2_score"
                    label="Team 2 Score"
                    :rules="rules"
                    type="number"
                    solo
                    />
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
                    Save
                  </VBtn>
                  <VBtn
                  depressed
                  color="error"
                  class="custom-btn w-full md:w-[185px] lg:w-[185px]"
                  @click="closeDialog"
                  >
                    Close
                  </VBtn>
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
      regionQuery: '',
      valid: true,
      MatchData: {
        team1: [],
        team2: [],
      },
      rules: [ value => !!value || 'Required' ],
    }
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.MatchData = this.match;
          this.MatchData.team1_name = this.MatchData.team1.name
          this.MatchData.team2_name = this.MatchData.team2.name
        }
      },
      immediate: true,
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
        this.confirmResult();
        return true;
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    confirmResult() {
      this.SaveResult()
      this.closeDialog()
    },
    SaveResult() {
      const formData = new FormData();
      formData.append('team1_score', this.MatchData.team1_score);
      formData.append('team2_score', this.MatchData.team2_score);
      this.$axios
        .$post(`v1/eventmatches/update/${this.MatchData.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.reset();
          console.log('Success')
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
      this.$emit('close')
    },
    reset() {
      this.MatchData = []
    },
  }
}
</script>

<style scoped>
.croppa-container {
  background-color: #abb8c3;
  border: 3px solid #1C1B1C;
}
.o-inputit__item--danger {
  background-color: #e73538 !important;
}

.part-item__actions [class^="ri-"] {
  padding-right: 0.25rem;
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

