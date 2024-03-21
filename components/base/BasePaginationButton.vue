<template>
  <button
    type="button"
    :class="`
      rounded-md
      page-link
      flex items-center justify-center
      h-8 w-8
      md:h-11 md:w-11
      cursor-pointer
      border
      text-center text-lg
      md:text-2xl
      leading-[3rem]
      outline-none
      transition-all
      duration-300
      focus:shadow-none
      hover:scale-110
      transition
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
        return 'bg-gradient-to-tr from-[#5EE738] to-[#050505] text-white'
      } else {
        return 'bg-[#2f2f2f] text-white opacity-50 hover:opacity-100'
      }
    },
  },
}
</script>