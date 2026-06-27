<template>
  <OModal :active="active" @close="closeDialog" :width="'550px'">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
      <VForm ref="form" v-model="valid" lazy-validation>
        <h3 class="mb-3 font-bold text-brand-black">Manage Team Limit</h3>
        <hr class="my-3" />
        <div>
          <table class="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th></th>
                <th class="px-4 py-2 border border-gray-300 text-center">
                  Age Group
                </th>
                <th class="px-4 py-2 border border-gray-300 text-center">
                  Team Limit
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(ageGroup, index) in formattedAgeGroup"
                :key="index"
                class="border"
                :class="{
                  'border-green-500': selectedAgeGroups.includes(ageGroup.value),
                }"
              >
                <td class="px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    v-model="selectedAgeGroups"
                    :value="ageGroup.value"
                    class="checkbox cursor-pointer"
                  />
                </td>
                <td class="px-4 py-2 text-center">{{ ageGroup.text }}</td>
                <td class="px-4 py-2 text-center">
                  <input
                    type="number"
                    v-model="teamCounts[ageGroup.value]"
                    :id="'teamcount-' + ageGroup.value"
                    :disabled="!selectedAgeGroups.includes(ageGroup.value)"
                    :rules="[
                      (v) =>
                        !selectedAgeGroups.includes(ageGroup.value) ||
                        (!!v && v > 0) ||
                        'Required',
                    ]"
                    class="border border-gray-300 p-2 w-full h-full"
                    placeholder="Enter Team Limit"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr class="my-3" />
        <div class="flex flex-col justify-end gap-2 md:flex-row">
          <VBtn
            depressed
            color="success"
            class="custom-btn w-full md:w-[185px] lg:w-[185px]"
            :disabled="!valid || loading"
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
export default {
  name: 'ManageTeamLimitModal',
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    seriesid: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      valid: true,
      loading: false,
      agegroup: [],
      teamLimit: [],
      limitId: {},
      teamCounts: {},
      selectedAgeGroups: [],
    };
  },
  computed: {
    formattedAgeGroup() {
      return this.agegroup.map((agegroup) => ({
        text: agegroup.name,
        value: agegroup.id,
      }));
    },
  },
  watch: {
    seriesid: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.retrieveTeamLimits();
        }
      },
    },
  },
  mounted() {
    this.retrieveAgeGroups();
  },
  methods: {
    async retrieveAgeGroups() {
      try {
        const response = await this.$axios.$get(
          'v1/agegroups/retrieve-age-groups'
        );
        this.agegroup = response;
      } catch (error) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Failed to load age groups. Please try again.',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
      }
    },
    async retrieveTeamLimits() {
      try {
        this.limitId = {};
        this.teamCounts = {};
        this.selectedAgeGroups = [];

        const response = await this.$axios.$get(
          `v1/teamlimit/${this.seriesid}`
        );
        this.teamLimit = response.data;

        this.teamLimit.forEach((limit) => {
          const ageGroupId = limit.age_groups[0]?.id;
          this.limitId[ageGroupId] = limit.id;
          this.teamCounts[ageGroupId] = limit.team_limit;

          if (limit.is_selected) {
            if (!this.selectedAgeGroups.includes(ageGroupId)) {
              this.selectedAgeGroups.push(ageGroupId);
            }
          } else {
            const index = this.selectedAgeGroups.indexOf(ageGroupId);
            if (index !== -1) {
              this.selectedAgeGroups.splice(index, 1);
            }
          }
        });
      } catch (error) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Failed to load team limits. Please try again.',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
      }
    },
    async validate() {
      if (!this.$refs.form.validate()) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Fill out all required fields.',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return;
      }
      await this.confirm();
    },
    async confirm() {
      this.loading = true;
      try {
        await this.editTeamLimit();
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Team limits updated successfully.',
          position: 'bottom',
          variant: 'success',
          queue: true,
        });
        this.$emit('confirm');
        this.closeDialog();
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false;
      }
    },
    async editTeamLimit() {
      const formData = new FormData();
      Object.keys(this.teamCounts).forEach((ageGroupId) => {
        formData.append(
          `teamcount[${ageGroupId}][id]`,
          this.limitId[ageGroupId] || ''
        );
        formData.append(
          `teamcount[${ageGroupId}][teamcount]`,
          this.teamCounts[ageGroupId] || 0
        );
        formData.append(
          `teamcount[${ageGroupId}][selected]`,
          this.selectedAgeGroups.includes(parseInt(ageGroupId)) ? '1' : '0'
        );
      });

      try {
        await this.$axios.$post('v1/teamlimit/update', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } catch (error) {
        if (error.response && error.response.status === 403) {
          this.$router.push('/unauthorized');
        } else {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Failed to update team limits. Please try again.',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        }
        throw error;
      }
    },
    closeDialog() {
      this.$emit('close');
      this.reset();
      this.retrieveTeamLimits();
    },
    reset() {
      this.limitId = {};
      this.teamCounts = {};
      this.selectedAgeGroups = [];
    },
  },
};
</script>

<style scoped>
.croppa-container {
  background-color: #abb8c3;
  border: 3px solid #1c1b1c;
}
.o-inputit__item--danger {
  background-color: #e73538 !important;
}

.part-item__actions [class^='ri-'] {
  padding-right: 0.25rem;
}

::v-deep .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
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

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #d1d5db;
  padding: 0.5rem;
}

th {
  background-color: #f9fafb;
}

tbody tr:hover {
  background-color: #f1f5f9;
}

input[type='number'] {
  background-color: #f1f5f9;
}

.border-green-500 {
  border: 2px solid #20ab20 !important;
}

.checkbox {
  border: 1px solid #d4d4d4 !important;
  border-radius: 5px;
  color: #20ab20 !important;
}

.checkbox:checked {
  border: 1px solid #20ab20 !important;
}
</style>