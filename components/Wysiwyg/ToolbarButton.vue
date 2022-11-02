<template>
  <button
    type="button"
    class="
      flex
      h-8 w-8
      items-center justify-center
      border border-solid border-gray-400
      bg-white
      pt-[2px]
    "
    @click="$emit('click')"
  >
  <slot></slot>
  </button>
</template>