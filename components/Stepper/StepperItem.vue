<template>
  <div
    :class="`
      px-4 py-8
      ${itemActiveClass}
    `"
  >
    <div
      :class="`
        text-xl font-bold
        ${titleActiveClass}
      `"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    titleActiveClass: {
      get() {
        if (this.active) {
          return 'text-brand-black'
        }
        return 'text-gray-400'
      },
    },
    itemActiveClass: {
      get() {
        if (this.active) {
          return 'border-b-4 border-b-brand-black'
        }

        return 'border-b-4 border-b-transparent'
      },
    },
  }
}
</script>