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
    <div class="relative items-start py-10 lg:py-20">
        <div class="container">
            <header class="relative max-w-[1000px] break-words">
                <slot></slot>
            </header>
        </div>
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