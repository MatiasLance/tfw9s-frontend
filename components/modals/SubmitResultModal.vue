<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
      <VForm lazy-validation>
        <h3 class="mb-3 font-bold text-brand-black">
            Submit Result
        </h3>
        <hr class="my-3"/>
          <p>
            Are you sure you want to submit this result?
          </p>
        <hr class="my-3"/>
        <div class="flex flex-col justify-end gap-2 md:flex-row">
          <VBtn
          depressed
          color="success"
          class="custom-btn w-full md:w-[185px] lg:w-[185px]"
          :loading="processing"
          :disabled="processing"
          @click="SubmitResult"
          >
            OK
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

export default {
  name: 'SubmitResultModal',
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
      matchData: { name: '' },
      processing: false,
      rules: [ value => !!value || 'Required' ],
    }
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.matchData = JSON.parse(JSON.stringify(this.match));
        }
      },
      immediate: true,
    },
  },

  methods: {
    SubmitResult() {
      this.processing = true
      const payload = {
        team1_score: Number(this.matchData.team1_score),
        team2_score: Number(this.matchData.team2_score),
        is_abandoned_match: this.toBoolean(
          this.matchData.is_abandoned_match
        ),
      };

      this.$axios
        .$post(`v1/eventmatches/${this.matchData.id}`, payload)
        .then((response) => {
          this.$emit('confirm')
        })
        .catch((error) => {
          this.$emit('error', error)
        })
        .finally(() => {
          this.processing = false
        });
    },
    closeDialog() {
      this.$emit('close')
    },
    toBoolean(value) {
      if (typeof value === 'string') {
        return [ '1', 'true', 'on', 'yes' ].includes(
          value.trim().toLowerCase()
        );
      }

      return value === true || value === 1;
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

