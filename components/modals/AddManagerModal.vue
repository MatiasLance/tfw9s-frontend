<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <VForm ref="form" v-model="valid" lazy-validation>
                <h3 class="mb-3 font-bold text-brand-black">
                    Add Manager
                </h3>
                <hr class="my-3"/>
                <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div class="col-span-1">
                    <label for="firstname" class="mb-1 block">
                      Firstname:
                    </label>
                    <VTextField
                    id="firstname"
                    v-model="managerData.first"
                    label="Enter Firstname"
                    :rules="rules"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="lastname" class="mb-1 block">
                      Lastname:
                    </label>
                    <VTextField
                    id="lastname"
                    v-model="managerData.last"
                    label="Enter Lastname"
                    :rules="rules"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="mobile" class="mb-1 block">
                      Mobile Number:
                    </label>
                    <VTextField
                    id="mobile"
                    v-model="managerData.mobile"
                    label="Enter Mobile Number"
                    :rules="rules"
                    type="tel"
                    solo
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="email" class="mb-1 block">
                      Email:
                    </label>
                    <VTextField
                    id="email"
                    v-model="managerData.email"
                    label="Enter Email"
                    :rules="rules"
                    type="email"
                    solo
                    />
                  </div>
                  <div class="col-span-1 md:col-span-2">
                    <label for="fixingname" class="mb-1 block">
                      Description:
                    </label>
                    <VTextarea
                    id="name"
                    v-model="managerData.description"
                    label="Enter Manager Description"
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
  name: 'AddManagerModal',
  props: {
    active: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      valid: true,
      managerData: {
        name: null,
        description: null
      },
      rules: [ value => !!value || 'Required' ],
    }
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
      } else if (this.managerData.description === '') {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Description should not be empty',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else {
        this.confirmManager();
        return true;
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    confirmManager() {
      this.addManager()
      this.closeDialog()
    },
    addManager() {
      const formData = new FormData();
      formData.append('firstname', this.managerData.first);
      formData.append('lastname', this.managerData.last);
      formData.append('mobile', this.managerData.mobile);
      formData.append('email', this.managerData.email);
      formData.append('description', this.managerData.description);
      this.$axios
        .$post('v1/managers', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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
      this.reset()
    },
    reset() {
      this.managerData = []
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

