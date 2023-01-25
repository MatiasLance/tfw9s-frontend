<template>
  <button
    type="button"
    :class="`
      page-link
      flex items-center justify-center
      h-8 w-8
      md:h-11 md:w-11
      cursor-pointer
      border
      bg-gray-200
      text-center text-lg
      md:text-2xl
      leading-[3rem]
      outline-none
      transition-all
      duration-300
      focus:shadow-none
      ${activeClass}
    `"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    activeClass() {
      if (this.active) {
        return 'bg-brand-black text-white'
      } else {
        return 'text-gray-800 hover:bg-brand-yellow hover:text-white'
      }
    },
  },
}
</script>