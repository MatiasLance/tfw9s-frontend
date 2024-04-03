<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <VForm ref="form" v-model="valid" lazy-validation>
                <h3 class="mb-3 font-bold text-brand-black">
                    Edit Team
                </h3>
                <hr class="my-3"/>
                <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div class="col-span-1">
                    <label for="fixingname" class="mb-1 block">
                      Name:
                    </label>
                    <VTextField
                    id="name"
                    v-model="TeamData.name"
                    label="Enter Field Name"
                    :rules="rules"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="fixingname" class="mb-1 block">
                      Field:
                    </label>
                    <VSelect
                    v-model="TeamData.field_id"
                    :items="filteredField"
                    placeholder="Choose a Field"
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
                  <div class="col-span-1 md:col-span-2">
                    <label for="fixingname" class="mb-1 block">
                      Description:
                    </label>
                    <VTextarea
                    id="name"
                    v-model="TeamData.description"
                    label="Enter Field Description"
                    :rules="rules"
                    type="text"
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
  name: 'EditTeamModal',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    team: {
      type: Object,
      default: () => ({}),
    },
    // eslint-disable-next-line vue/prop-name-casing
    field: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      fieldQuery: '',
      valid: true,
      TeamData: {
        name: null,
        description: null
      },
      rules: [ value => !!value || 'Required' ],
    }
  },
  computed: {
    formattedField() {
      return this.field.map(field =>
        ({ text: field.name, value: field.id }));
    },
    filteredField() {
      return this.formattedField.filter(field =>
        field && field.text && typeof field.text === 'string' ?
          field.text.toLowerCase().includes(this.fieldQuery.toLowerCase()) :
          false
      );
    },
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.TeamData = this.team;
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
      } else if (this.TeamData.description === '') {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Description should not be empty',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else {
        this.confirmField();
        return true;
      }
    },
    confirmField() {
      this.editTeam()
      this.$emit('confirm')
      this.closeDialog()
    },
    editTeam() {
      const formData = new FormData();
      formData.append('name', this.TeamData.name);
      formData.append('description', this.TeamData.description);
      formData.append('field_id', this.TeamData.field_id);
      this.$axios
        .$post(`v1/teams/${this.team.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.reset();
          console.log('Success')
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
      this.TeamData = []
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

