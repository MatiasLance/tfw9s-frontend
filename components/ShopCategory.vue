<template>
  <span
    :class="`
      mx-1 flex flex-col rounded-md
      select-none font-semibold
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
      return this.selected ? 'text-white from-40% via-95% to-100% bg-gradient-to-br from-[#5EE738] via-[#3e872a] to-[#050505]' : 'bg-[#212121] text-[#555555]'
    },
  },
}
</script>