<template>
  <VBtn
    x-large
    dark
    outlined
    class="btn text-button rounded-none text-center text-[24px] font-bold
    transition duration-300 hover:shadow-lg"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </VBtn>
</template>

<script>
export default {
  name: 'BaseButtonLight',
  inheritAttrs: false,
}
</script>