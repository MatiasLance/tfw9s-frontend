<template>
  <VSelect
    v-model="selectedYear"
    :items="yearRange"
    :disabled="disabled"
    :label="label"
    item-value="year"
    hide-details
    solo
    @change="onYearChange"
    class="year-filter-select"
    :menu-props="{
      offsetY: true,
      nudgeTop: -6
    }"
  />
</template>

<script>
export default {
  name: 'YearFilter',

  props: {
    value: {
      type: [ String, Number ],
      default: null,
    },
    startYear: {
      type: Number,
      default() {
        return new Date().getFullYear() - 5;
      },
    },
    endYear: {
      type: Number,
      default() {
        return new Date().getFullYear() + 5;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Select Year',
    },
  },

  data() {
    return { selectedYear: this.value };
  },

  computed: {
    yearRange() {
      const years = [];
      const start = this.startYear;
      const end = this.endYear;

      for (let year = end; year >= start; year--) {
        years.push({ text: String(year), value: year });
      }

      return years;
    }
  },

  watch: {
    value(newVal) {
      this.selectedYear = newVal;
    },

    selectedYear(newVal) {
      this.$emit('input', newVal);
    },
  },

  methods: {
    onYearChange(year) {
      this.$emit('year-change', year);
    },
  },
};
</script>

<style scoped>
.year-filter-select {
  width: 250px !important;
  max-width: 250px;
  min-width: 230px;
  display: inline-block;
}

.year-filter-select >>> .v-input__control {
  min-height: 40px !important;
  height: 40px;
}

.year-filter-select >>> .v-select__selection {
  font-size: 0.875rem;
  min-height: 35px;
  height: 40px;
  line-height: 35px;
  text-align: center;
  padding: 0 !important;
}

.year-filter-select >>> .v-label {
  font-size: 0.875rem;
  color: #4b5563;
}
</style>