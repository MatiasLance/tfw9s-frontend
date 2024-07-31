<!-- eslint-disable vue/max-len -->
<!-- eslint-disable max-len -->
<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <VForm ref="form" v-model="valid" lazy-validation>
                <h3 class="mb-3 font-bold text-brand-black">
                    {{ trashed?'Refund Details':'Refund Payment'}}
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
                    :readonly="true"
                    type="text"
                    solo
                    />
                    <VTextField
                    v-if="seriesType !== 'weekly'"
                    id="name"
                    v-model="transactionData.team"
                    label="Transaction ID"
                    :rules="rules"
                    :readonly="true"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-2">
                    <label for="transactionname" class="mb-1 block">
                      {{trashed?'Refund':'Transaction'}} ID:
                    </label>
                    <VTextField
                    id="name"
                    v-model="transactionid"
                    label="Transaction ID"
                    :rules="rules"
                    :readonly="true"
                    type="text"
                    solo
                    />
                  </div>
                  <div class="col-span-1">
                    <label for="transactionname" class="mb-1 block">
                      Age Group:
                    </label>
                    <VTextField
                    id="name"
                    v-model="transactionData.agegroup"
                    label="Age Group"
                    :rules="rules"
                    :readonly="true"
                    type="text"
                    solo
                    />
                  </div>
                  <div v-if="!trashed" class="col-span-1">
                    <label for="transactionname" class="mb-1 block">
                      Amount:
                    </label>
                    <VTextField
                    id="name"
                    v-model="Amount"
                    label="Refund Amount"
                    prefix="$"
                    :rules="amountRules"
                    type="number"
                    solo
                    />
                  </div>
                  <div v-if="trashed" class="col-span-1">
                    <label for="transactionname" class="mb-1 block">
                      Amount:
                    </label>
                    <VTextField
                    id="name"
                    v-model="transactionData.refund"
                    label="Refund Amount"
                    :rules="rules"
                    :readonly="true"
                    type="text"
                    solo
                    />
                  </div>
                </div>
                <div v-if="trashed" class="col-span-2">
                  <span class="flex justify-center font-semibold text-medium text-green-500">
                    Payment Refunded
                  </span>
                  <span class="flex justify-center text-sm text-green-500">
                    It may take a few days for the money to reach the customer's bank account.
                  </span>
                  </div>
                <hr class="my-3"/>
                <div class="flex flex-col justify-end gap-2 md:flex-row">
                  <VBtn
                  v-if="!refunding && !trashed && transactionData.transactionid"
                  depressed
                  color="success"
                  class="custom-btn w-full md:w-[185px] lg:w-[185px]"
                  :disabled="!valid"
                  @click="validate"
                  >
                    {{ trashed?'Show':'Refund' }}
                  </VBtn>
                  <VBtn
                  v-if="refunding"
                  depressed
                  color="error"
                  class="custom-btn w-full md:w-[185px] lg:w-[185px]"
                  @click="cancelRef = true"
                  >
                    Cancel ({{ timerCount }})
                  </VBtn>
                  <VBtn
                  v-if="!refunding"
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
      Amount: null,
      valid: true,
      timerCount: 0,
      cancelRef: false,
      refunding: false,
      transactionid: '',
      transactionData: {
        name: null,
        description: null,
      },
      rules: [ value => !!value || 'Required' ],
      amountRules: [
        value => !!value || 'Required.',
        // eslint-disable-next-line max-len, vue/max-len
        value => (value && value <= this.transactionData.amount) || `Refund amount must be ${this.formatCurrency(this.transactionData.amount)} or less.`,
        value => (value && value > 0) || 'Refund amount must be greater than 0.',
      ],
    }
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.transactionData = this.transaction;
          this.transactionData.amount = this.transaction.amount/100;
          // eslint-disable-next-line max-len, vue/max-len
          this.transactionData.refund = this.formatCurrencyFromCent(this.transaction.refund);
          // eslint-disable-next-line max-len, vue/max-len
          this.transactionid = this.trashed?this.transactionData.refundid:this.transactionData.transactionid
        }
      },
      immediate: true,
    },
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }
      },
      immediate: true
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
        this.timerCount = 10
        this.cancelRef = false;
        this.refunding = true
        const countdown = () => {
          if (this.cancelRef) {
            this.timerCount = 0;
            this.cancelRef = false;
            this.refunding = false;
            return false;
          }

          const intervalId = setInterval(() => {
            if (this.cancelRef) {
              clearInterval(intervalId);
              this.timerCount = 0;
              this.cancelRef = false;
              this.refunding = false;
              return false;
            }

            if (this.timerCount > 0) {
              // eslint-disable-next-line no-unused-expressions
              this.timerCount - 1;
            } else {
              clearInterval(intervalId);
              this.confirmRequest();
              this.timerCount = 0;
              this.cancelRef = false;
              this.refunding = false;
              return true;
            }
          }, 1000);
        }
        // Start the countdown
        countdown();
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    confirmRequest() {
      if (this.Amount > 0) {
        this.handleSubmit()
        this.closeDialog()
      }
    },
    handleSubmit() {
      const endpoint = this.seriesType === 'weekly'? 'players':'teams'
      const type = this.trashed?'cancelref':'refund'
      const formData = new FormData();
      formData.append('amount', parseInt(this.Amount*100));
      this.$axios
        .$post(`v1/${endpoint}/${type}/${this.transaction.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.reset();
          this.$emit('confirm')
        })
        .catch((error) => {
          console.log(error)
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Failed to refund',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        });
    },
    closeDialog() {
      this.reset()
      this.$emit('close')
    },
    reset() {
      this.transactionData.amount = this.transaction.amount*100
      if (typeof this.transactionData.refund === 'string' && this.transactionData.refund.includes('$')) {
        this.transactionData.refund = parseInt(this.transactionData.refund.replace(/[$,]/g, '')) * 100;
      }
      this.Amount = null;
      this.transactionData = []
      this.timerCount = 0;
      this.cancelRef = this.timerCount > 0;
      this.refunding = false;
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

