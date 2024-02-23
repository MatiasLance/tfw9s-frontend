<template>
  <div
    class="relative
    mx-auto grid
    max-w-screen-xl grid-cols-12 gap-x-6
    px-4 sm:px-8"
    v-bind="$attrs"
>
    <slot></slot>
  </div>
</template>

<script>
export default { name: 'BaseSection' }
</script>