<template>
  <OModal :active="active" @close="closeDialog" :width="'960px'">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
      <VForm ref="form" v-model="valid" lazy-validation>
        <h3 class="mb-3 font-bold text-brand-black">
          Manage Team Limit
        </h3>
        <hr class="my-3 lg:w-[918px]" />
        <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div class="col-span-1">
            <label for="selectagegroup" class="mb-1 block">
              Age Group:
            </label>
            <VSelect
              v-model="SeriesData.agegroup_id"
              :items="formattedAgeGroup"
              label="Choose Age Group"
              :rules="rules"
              solo
            >
            </VSelect>
          </div>
          <div class="col-span-1">
            <label for="eventname" class="mb-1 block">
              Team Count:
            </label>
            <VTextField
              id="name"
              v-model="SeriesData.teamcount"
              label="Enter Event Title"
              :rules="rules"
              type="number"
              solo
            />
          </div>
        </div>
        <hr class="my-3" />
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

export default {
  name: 'ManageTeamLimitModal',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    agegroup: {
      type: Array,
      required: true
    },
    seriesid: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      valid: true,
      showGenerateCreatedImageBtn: false,
      id: '',
      imgUrl: [],
      imgList: [],
      SeriesData: {},
      teamLimit: [],
      rules: [ value => !!value || 'Required' ],
    }
  },
  computed: {
    formattedAgeGroup() {
      return this.agegroup.map(agegroup =>
        ({ text: agegroup.name, value: agegroup.id }));
    },
  },
  watch: {
    'SeriesData.agegroup_id'(newVal, oldVal) {
      if (newVal) {
        this.checkTeamLimit(newVal)
      }
    },
    seriesid(newVal, oldVal) {
      if (newVal) {
        this.retrieveTeamLimits();
      }
    }
  },
  methods: {
    updateImage(image) {
      this.imgList = image
    },
    checkTeamLimit(agegroup_id) {
      const teamLimit =
        this.teamLimit.find(limit => limit.age_groups[0].id === agegroup_id);
      if (teamLimit) {
        this.SeriesData.teamcount = teamLimit.team_limit;
        this.id = teamLimit.id;
      } else {
        this.SeriesData.teamcount = null;
      }
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
      } else {
        this.confirm();
        return true;
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    confirm() {
      this.editTeamLimit()
      this.closeDialog()
    },
    editTeamLimit() {
      const formData = new FormData();
      formData.append('teamcount', this.SeriesData.teamcount);

      this.$axios
        .$post(`v1/teamlimit/update/${this.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.reset();
          this.$emit('confirm')
          this.retrieveTeamLimits()
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            this.$router.push('/unauthorized');
          } else {
            console.error('Error:', error);
          }
        });
    },
    retrieveTeamLimits() {
      this.$axios
        .$get(`v1/teamlimit/${this.seriesid}`)
        .then((response) => {
          this.teamLimit = response.data
        })
    },
    closeDialog() {
      this.$emit('close')
      this.reset()
    },
    reset() {
      this.SeriesData = []
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
  height: 2.75rem;
  width: 100% !important;
  appearance: none !important;
  border-radius: 0 !important;
  transition: border-color 0.3s !important;
}
</style>

