<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <VForm ref="form" v-model="valid" lazy-validation>
                <h3 class="text-brand-black mb-3 font-bold">
                    Edit Field
                </h3>
                <hr class="my-3 lg:w-[918px]"/>
                <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div class="col-span-1">
                    <label for="fieldname" class="mb-1 block">
                      Name:
                    </label>
                    <VTextField
                    id="name"
                    v-model="FieldData.name"
                    label="Enter Field Name"
                    :rules="rules"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="selectregion" class="mb-1 block">
                      Region:
                    </label>
                    <VSelect
                    v-model="FieldData.region_id"
                    :items="filteredRegions"
                    label="Choose a Region"
                    :rules="rules"
                    solo
                    >
                      <template #prepend-item>
                        <div class="sticky-search-bar px-3">
                          <SearchBar v-model="regionQuery" />
                        </div>
                      </template>
                    </VSelect>
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
  name: 'EditFieldModal',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    field: {
      type: Object,
      default: () => ({}),
    },
    // eslint-disable-next-line vue/prop-name-casing
    regions: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      regionQuery: '',
      valid: true,
      FieldData: {
        name: '',
        description: '',
        region_id: [],
      },
      rules: [ value => !!value || 'Required' ],
    }
  },
  computed: {
    formattedRegions() {
      return this.regions.map(region =>
        ({ text: region.name, value: region.id }));
    },
    filteredRegions() {
      return this.formattedRegions.filter(region =>
        region && region.text && typeof region.text === 'string' ?
          region.text.toLowerCase().includes(this.regionQuery.toLowerCase()) :
          false
      );
    },
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.FieldData = this.field;
          const matchingRegion = this.filteredRegions.find(manager =>
            manager.value === this.field.region_id);
          this.FieldData.region_id = matchingRegion ?
            matchingRegion.value : null;
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
      } else if (this.FieldData.description === '') {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Description should not be empty',
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
      this.editField()
      this.closeDialog()
    },
    editField() {
      const formData = new FormData();
      formData.append('name', this.FieldData.name);
      formData.append('description', this.FieldData.description);
      formData.append('region_id', this.FieldData.region_id);

      this.$axios
        .$post(`v1/fields/${this.field.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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
      this.FieldData = []
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
</style>

