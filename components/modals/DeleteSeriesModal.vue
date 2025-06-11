<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <form @submit.prevent="submitDelete">
                <h3 class="text-brand-black mb-3 font-bold">
                    Delete Series
                </h3>
                <hr class="my-3"/>
                  <p>
                    Are you sure you want to remove
                    <strong>
                      {{ seriesData.name }}
                    </strong> ?
                  </p>
                  <i class="text-red-500">
                    Deleting {{ seriesData.name }} will remove all related Teams and Fixings.
                  </i>
                <hr class="my-3"/>
                <div class="flex flex-col justify-end gap-2 md:flex-row">
                  <VBtn
                  depressed
                  color="success"
                  class="custom-btn w-full md:w-[185px] lg:w-[185px]"
                  type="submit"
                  :loading="isDeleting"
                  :disabled="isDeleting"
                  >
                    OK
                  </VBtn>
                  <VBtn
                    depressed
                    color="error"
                    class="custom-btn w-full md:w-[185px] lg:w-[185px]"
                    @click="closeDialog"
                    :disabled="isDeleting"
                  >
                    Cancel
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

