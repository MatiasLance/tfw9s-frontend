<template>
    <li class="relative border-b-2 border-gray-200">
    <button
        type="button" class="w-full py-4 text-left"
        @click="selected = !selected"
    >
      <div class="flex items-center justify-between">
        <span class="text-xl font-medium text-white">
          {{ accordion.title }}
        </span>
        <VIcon
            v-if="selected"
            size="25" color="white"
            class="rotate-180 transition duration-300"
        >
            mdi-chevron-down
        </VIcon>
        <VIcon
            v-else
            size="25"
            class="rotate-0 transition duration-300"
        >
            mdi-chevron-down
        </VIcon>
      </div>
    </button>

    <Transition name="slide">
      <div
        v-if="selected"
        class="relative overflow-hidden transition-all duration-700"
      >
        <div class="py-2">
          <p class="text-xl leading-relaxed tracking-wide text-gray-300">
            {{ accordion.description }}
          </p>
        </div>
      </div>
    </Transition>
  </li>
</template>

<script>
export default {
  name: 'BaseAccordion',
  props: {
    accordion: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { selected: false };
  }
}
</script>
