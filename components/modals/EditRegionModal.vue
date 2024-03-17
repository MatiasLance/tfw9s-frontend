<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
            <form @submit.prevent="updateRegion">
                <h3 class="mb-3 font-bold text-brand-black">
                    Edit Region
                </h3>
                <hr class="my-3"/>
                <VTextField
                id="name"
                v-model="regionData.title"
                label="Enter Region Name"
                :rules="rules"
                type="text"
                solo
                />
                <hr class="my-3"/>
                <div class="block lg:flex lg:flex-auto lg:justify-end">
        <button
          type="submit"
          class="
            my-2
            inline-block
            w-full
            border border-transparent
            bg-brand-green
            py-3
            px-5
            text-center
            font-bold
            text-white
            hover:bg-brand-green/30
            lg:mx-4 lg:w-48
          "
          @click="updateRegion(region_data)"
        >
          OK
        </button>
        <button
          type="button"
          class="
            my-2
            inline-block
            w-full
            border border-transparent
            bg-brand-red
            py-3
            px-5
            text-center
            font-bold
            text-white
            hover:bg-brand-red/30
            lg:mx-4 lg:w-48
          "
          @click="closeDialog"
        >
          Cancel
        </button>
                </div>
            </form>
        </div>
  </OModal>
</template>

<script>
/* eslint-disable camelcase */
import 'vue-croppa/dist/vue-croppa.css';

export default {
  name: 'EditRegionModal',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    region_data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      regionData: {},
      rules: [ value => !!value || 'Required' ],
    }
  },
  watch: {
    active: {
      handler(newActive) {
        if (newActive) {
          this.regionData = this.region_data;
        }
      },
      immediate: true,
    },
  },

  methods: {
    updateRegion() {
      this.$emit('confirm')
    },
    closeDialog() {
      this.$emit('close')
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

