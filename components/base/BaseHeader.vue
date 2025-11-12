<template>
    <section
        class="
        relative
        max-w-full
        overflow-hidden
        bg-cover
        bg-fixed
        bg-center
        bg-no-repeat"
        v-bind="$attrs"
    >
    <div class="relative max-w-screen-xl mx-auto items-start px-4 py-4">
      <header class="relative break-words">
          <slot></slot>
      </header>
    </div>
    </section>
</template>

<script>
export default {
  name: 'BaseHeader',
  data() {
    return {
      bgImage: '',
      id: ''
    }
  }
}
</script>