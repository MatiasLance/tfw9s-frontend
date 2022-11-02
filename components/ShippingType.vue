<template>
  <label
    class="
      flex
      cursor-pointer
      border border-gray-200
      bg-gray-50
      p-3
      hover:border-swd-blue hover:bg-blue-50
    "
  >
    <span>
      <input
        v-model="actualValue"
        :value="radioValue"
        :name="name"
        type="radio"
        class="mt-1 h-4 w-4 bg-gray-200 text-swd-blue focus:ring-swd-blue"
      />
    </span>
    <p class="ml-2">
      <span>
        {{ title }}
      </span>
      <small class="block text-sm text-gray-400" v-html="note"></small>
    </p>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: [ String, Boolean ],
      required: false,
      default: null,
    },
    radioValue: {
      type: [ String, null ],
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  computed: {
    actualValue: {
      get() {
        return this.value
      },
      set() {
        this.$emit('change', this.radioValue)
      },
    },
  },
}
</script>