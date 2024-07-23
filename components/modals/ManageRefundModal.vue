<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <VForm ref="form" v-model="valid" lazy-validation>
                <h3 class="mb-3 font-bold text-brand-black">
                    {{ trashed?'Cancel Refund':'Refund Payment'}}
                </h3>
                <hr class="my-3 lg:w-[618px]"/>
                <div class="grid grid-cols-2 gap-2">
                  <div class="col-span-2">
                    <label
                    v-if="seriesType === 'weekly'"
                    for="transactionname" class="mb-1 block"
                    >
                    Player Name:
                    </label>
                    <label
                    v-if="seriesType !== 'weekly'"
                    for="transactionname" class="mb-1 block"
                    >
                    Team Name:
                    </label>
                    <VTextField
                    v-if="seriesType === 'weekly'"
                    id="name"
                    v-model="transactionData.playername"
                    label="Transaction ID"
                    :rules="rules"
                    :disabled="true"
                    type="text"
                    solo
                    />
                    <VTextField
                    v-if="seriesType !== 'weekly'"
                    id="name"
                    v-model="transactionData.team"
                    label="Transaction ID"
                    :rules="rules"
                    :disabled="true"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-2">
                    <label for="transactionname" class="mb-1 block">
                      Transaction ID:
                    </label>
                    <VTextField
                    id="name"
                    v-model="transactionData.transactionid"
                    label="Transaction ID"
                    :rules="rules"
                    :disabled="true"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="transactionname" class="mb-1 block">
                      Amount:
                      {{ formatCurrencyFromCent(transactionData.amount) }}
                    </label>
                    <VTextField
                    id="name"
                    v-model="transactionData.amount"
                    label="Amount"
                    :rules="rules"
                    :disabled="true"
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
                    {{ trashed?'Restore':'Refund' }}
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
import currencyMixin from '~/mixins/currency/handlesCurrency'

export default {
  name: 'ManageRefundModal',
  mixins: [ currencyMixin ],
  props: {
    active: {
      type: Boolean,
      required: true
    },
    transaction: {
      type: Object,
      default: () => ({}),
    },
    trashed: {
      type: Boolean,
      required: true
    },
    seriesType: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      valid: true,
      transactionData: {
        name: null,
        description: null,
      },
      rules: [ value => !!value || 'Required' ],
    }
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.transactionData = this.transaction;
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
      } else if (this.transactionData.description === '') {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Description should not be empty',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else {
        this.confirmRegion();
        return true;
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    confirmRegion() {
      this.handleSubmit()
      this.closeDialog()
    },
    handleSubmit() {
      const endpoint = this.seriesType === 'weekly'? 'players':'teams'
      const type = this.trashed?'cancelref':'refund'
      this.$axios
        .$post(`v1/${endpoint}/${type}/${this.transaction.id}`)
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
      this.reset()
    },
    reset() {
      this.transactionData = []
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

