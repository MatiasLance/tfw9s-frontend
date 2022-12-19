<template>
  <div
    :class="`
      flex
      h-16
      w-48
      cursor-pointer
      items-center
      justify-center
      px-4
      text-lg
      font-bold
      ${activeStatusClass}
    `"
    @click="$emit('click')"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    activeStatusClass: {
      get() {
        return this.active ? 'bg-white' : 'bg-gray-300'
      }
    }
  },
}
</script>