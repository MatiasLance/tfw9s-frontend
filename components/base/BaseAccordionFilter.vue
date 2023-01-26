<template>
    <li class="relative border-b-2 border-gray-200">
    <button
        type="button" class="w-full py-4 text-left"
        @click="selected = !selected"
    >
      <div class="flex items-center justify-between">
        <span class="text-xl font-medium">{{ accordion.title }}</span>
        <VIcon
            v-if="selected"
            size="20" color="black"
            class="rotate-180 transition duration-300"
        >
            mdi-chevron-down
        </VIcon>
        <VIcon
            v-else
            size="20"
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
        <ul class="space-y-1">
          <li
            v-for="filter in accordion.options"
            :key="filter.id"
          >
            <label
            class="
            shipping-option
            flex cursor-pointer
            items-center
            bg-transparent
            p-3
            "
            >
                <span>
                    <input
                      :value="filter.name"
                      type="checkbox"
                      name="filterValues"
                      class="
                      mt-1 h-4 w-4 bg-gray-200
                      text-brand-black focus:ring-slate-500"
                    >
                </span>
                <p v-if="filter.count !== null" class="ml-2">
                  {{ filter.name }} ({{ filter.count }})
               </p>
               <p v-else class="ml-2">
                {{ filter.name }}
               </p>
            </label>
          </li>
        </ul>
      </div>
    </Transition>
  </li>
</template>

<script>
export default {
  name: 'BaseAccordionFilter',
  props: {
    accordion: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selected: false,
      selectedFilter: ''
    };
  }
}
</script>