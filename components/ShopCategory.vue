<template>
  <span
    :class="`
      mx-1 flex flex-col rounded-md
      border border-gray-300
      select-none
      cursor-pointer
      py-2 px-1 text-center focus:border-transparent ${selectedClass}
      text-sm md:text-base
    `"
    @click="$emit('click')"
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    selected: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    selectedClass() {
      return this.selected ? 'selected' : ''
    },
  },
}
</script>