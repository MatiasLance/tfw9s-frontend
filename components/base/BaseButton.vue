<template>
  <VBtn
    large
    dark
    text
    class="btn text-button rounded-none text-center text-[16px]
    transition duration-300 hover:shadow-lg hover:shadow-slate-300/60"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </VBtn>
</template>

<script>
export default {
  name: 'BaseButton',
  inheritAttrs: false,
}
</script>