<template>
  <OModal :active="active" @close="closeDialog">
    <div class="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)] ring-1 ring-red-500/20 sm:w-full sm:p-8">
      
      <div class="pointer-events-none absolute inset-0 opacity-10">
        <div class="absolute left-1/4 top-0 h-full w-0 border-l-2 border-dashed border-green-500"></div>
        <div class="absolute left-3/4 top-0 h-full w-0 border-l-2 border-dashed border-green-500"></div>
        <div class="absolute left-0 top-1/2 h-0 w-full border-t-2 border-dashed border-green-500"></div>
      </div>

      <form @submit.prevent="submitDelete" class="relative z-10">
        <div class="flex items-center gap-4 mb-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/20 shadow-[0_0_20px_rgba(239,68,68,0.3)] ring-1 ring-red-400/30">
            <i class="ri-error-warning-line text-2xl text-red-400" aria-hidden="true"></i>
          </div>
          <h3 class="text-xl font-extrabold uppercase tracking-wider text-white">
            Delete Series
          </h3>
        </div>

        <hr class="my-4 border-white/10" />

        <p class="text-base leading-relaxed text-gray-300">
          Are you sure you want to remove
          <strong class="font-bold text-white">{{ seriesData.name }}</strong>?
        </p>
        <div class="mt-3 flex items-center gap-2 rounded-lg bg-red-600/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/30">
          <i class="ri-alert-line flex-shrink-0 text-lg" aria-hidden="true"></i>
          <span>
            Deleting <strong class="font-semibold">{{ seriesData.name }}</strong> will remove all related Teams and Fixings.
          </span>
        </div>

        <hr class="my-4 border-white/10" />

        <div class="flex flex-col justify-end gap-3 sm:flex-row">
          <VBtn
            depressed
            color="success"
            class="custom-btn w-full sm:w-[185px] !bg-gradient-to-br !from-[#5EE738] !via-[#3e872a] !to-[#050505] !text-white !font-bold !uppercase !tracking-wider !shadow-[0_4px_12px_rgba(94,231,56,0.3)] hover:!shadow-[0_6px_20px_rgba(94,231,56,0.5)] hover:!brightness-110"
            type="submit"
            :loading="isDeleting"
            :disabled="isDeleting"
          >
            <i class="ri-check-line mr-1" aria-hidden="true"></i> OK
          </VBtn>
          <VBtn
            depressed
            color="error"
            class="custom-btn w-full sm:w-[185px] !bg-transparent !border !border-red-500/40 !text-red-400 !font-bold !uppercase !tracking-wider hover:!bg-red-500/10 hover:!border-red-400"
            @click="closeDialog"
            :disabled="isDeleting"
          >
            <i class="ri-close-line mr-1" aria-hidden="true"></i> Cancel
          </VBtn>
        </div>
      </form>
    </div>
  </OModal>
</template>

<script>
/* eslint-disable camelcase */
import 'vue-croppa/dist/vue-croppa.css';

export default {
  name: 'DeleteSeriesModal',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    series: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      seriesData: { id: null, name: '' },
      rules: [ value => !!value || 'Required' ],
      isDeleting: false,
    }
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.seriesData = this.series;
          this.isDeleting = false;
        }
      },
      immediate: true,
    },
  },

  methods: {
    async submitDelete() {
      if (!this.seriesData || !this.seriesData.id) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Series data is missing. Cannot delete.',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return;
      }

      this.isDeleting = true;
      try {
        await this.$axios.$delete(`/v1/series/${this.seriesData.id}`);
        this.$emit('confirm', this.seriesData.id);
      } catch (error) {
        console.error('Failed to delete series:', error);
        const errorMessage = error.response.data.message || 'Failed to remove series. Please try again.';
        this.$oruga.notification.open({
          duration: 5000,
          message: errorMessage,
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        // Optionally, you might want to close the dialog on failure or let the user retry
        // For now, it keeps the dialog open.
      } finally {
        this.isDeleting = false;
      }
    },
    closeDialog() {
      if (!this.isDeleting) { // Prevent closing while delete is in progress
        this.$emit('close');
      }
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

