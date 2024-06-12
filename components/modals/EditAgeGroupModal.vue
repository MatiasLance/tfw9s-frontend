<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <VForm ref="form" v-model="valid" lazy-validation>
                <h3 class="mb-3 font-bold text-brand-black">
                    Edit Age Group
                </h3>
                <hr class="my-3"/>
                <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div class="col-span-1 md:col-span-2">
                    <label for="agename" class="mb-1 block">
                      Name:
                    </label>
                    <VTextField
                    id="name"
                    v-model="ageGroupData.name"
                    label="Enter Age Group Name"
                    :rules="rules"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="minage" class="mb-1 block">
                      Min Age:
                    </label>
                    <VTextField
                    id="min"
                    v-model="ageGroupData.min_age"
                    single-line
                    label="Enter Minimum Age"
                    type="number"
                    :min="1"
                    :step="1"
                    :max="100"
                    :rules="rules"
                    solo
                    inputmode="numeric"
                    @keyup="handleMinAge"
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="maxage" class="mb-1 block">
                      Max Age:
                    </label>
                    <VTextField
                    id="max"
                    v-model="ageGroupData.max_age"
                    single-line
                    label="Enter Maximum Age"
                    type="number"
                    :min="1"
                    :step="1"
                    :max="100"
                    :rules="rules"
                    solo
                    inputmode="numeric"
                    @keyup="handleMaxAge"
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
  name: 'EditAgeGroupModal',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    ageGroup_data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      valid: true,
      ageGroupData: {
        name: null,
        min_age: null,
        max_age: null
      },
      rules: [ value => !!value || 'Required' ],
    }
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.ageGroupData = this.ageGroup_data;
        }
      },
      immediate: true,
    },
  },

  methods: {
    handleMinAge() {
      if (this.ageGroupData.min_age < 1) {
        this.ageGroupData.min_age = 0
      } else if (this.ageGroupData.min_age > 100) {
        this.ageGroupData.min_age = 100
      }
    },
    handleMaxAge() {
      if (this.ageGroupData.max_age > 100) {
        this.ageGroupData.max_age = 100
      } else if (this.ageGroupData.max_age < 1) {
        this.ageGroupData.max_age = 0
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
        // eslint-disable-next-line max-len, vue/max-len
      } else if (parseInt(this.ageGroupData.min_age) > parseInt(this.ageGroupData.max_age)) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Minimum Age should be lower than Maximum Age',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
        // eslint-disable-next-line max-len, vue/max-len
      } else if (parseInt(this.ageGroupData.min_age) === parseInt(this.ageGroupData.max_age)) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Minimum and Maximum Age should not have the same value',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else {
        this.confirmAgeGroup();
        return true;
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    confirmAgeGroup() {
      this.addAgeGroup()
      this.closeDialog()
    },
    addAgeGroup() {
      const formData = new FormData();
      formData.append('name', this.ageGroupData.name);
      formData.append('min_age', this.ageGroupData.min_age);
      formData.append('max_age', this.ageGroupData.max_age);
      this.$axios
        .$post(`v1/agegroups/${this.ageGroupData.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.reset();
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
      this.ageGroupData = []
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

