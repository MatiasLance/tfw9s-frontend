<template>
  <OModal :active="active" @close="closeDialog" :width="480">
    <div class="overflow-hidden rounded-lg bg-white
    shadow-2xl border-t-8 border-red-600"
    >
      <div class="p-6 sm:p-8">
        <VForm lazy-validation>
          <div class="flex items-center gap-4 mb-4">
            <div class="flex h-12 w-12 items-center justify-center
            rounded-full bg-red-100 text-red-600"
            >
              <i class="ri-error-warning-fill text-2xl"></i>
            </div>
            <div>
              <h3 class="text-xl font-black uppercase tracking-tight text-brand-black">
                Revert Match Result
              </h3>
              <p class="text-xs font-bold text-gray-500 uppercase">
                System Administration
              </p>
            </div>
          </div>

          <div class="my-6 rounded-md bg-gray-50 p-4 border-l-4 border-gray-300">
            <p class="text-sm leading-relaxed text-gray-700">
              Are you sure you want to revert the result ? 
              This will unlock the match for score editing and notify the officials.
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <VBtn
              depressed
              color="error"
              class="custom-btn w-full font-bold uppercase tracking-widest sm:flex-1"
              :loading="processing"
              :disabled="processing"
              @click="revertResult"
            >
              Confirm Revert
            </VBtn>
            <VBtn
              outlined
              color="grey darken-1"
              class="custom-btn w-full font-bold uppercase tracking-widest sm:flex-1"
              @click="closeDialog"
            >
              Cancel
            </VBtn>
          </div>
        </VForm>
      </div>
    </div>
  </OModal>
</template>

<script>
export default {
  name: 'RevertResultModal',
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
    return { processing: false }
  },
  methods: {
    revertResult() {
      this.processing = true

      this.$axios
        .$post(`v1/eventmatches/revert/${this.match.id}`)
        .then((response) => {
          this.$emit('confirm', response)
          this.closeDialog()
        })
        .catch((error) => {
          this.$emit('error', error)
        })
        .finally(() => {
          this.processing = false
        })
    },
    closeDialog() {
      this.$emit('close')
    },
  }
}
</script>

<style scoped>
/* Rugged Rugby Aesthetic */
.custom-btn {
  height: 52px !important;
  border-radius: 4px !important;
  font-size: 0.85rem !important;
  letter-spacing: 0.1em !important;
}

/* Add a subtle texture to the background if desired */
.bg-white {
  background-image: radial-gradient(circle at 2px 2px, #f3f4f6 1px, transparent 0);
  background-size: 24px 24px;
}
</style>