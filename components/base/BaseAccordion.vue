<template>
  <li class="relative border-b-2 border-gray-700 last:border-b-0 group">
    <button
      type="button"
      class="w-full py-5 text-left transition-all duration-300 hover:bg-gray-800/50 rounded-lg px-4"
      @click="$emit('toggle')"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <v-icon color="green lighten-1" size="28">{{ icon }}</v-icon>
          <span
            class="text-xl font-medium text-white"
            v-html="highlightText(accordion.title, searchTerm)"
          ></span>
        </div>
        <v-icon
          :class="isExpanded ? 'rotate-180' : 'rotate-0'"
          class="transition-transform duration-300"
          size="25"
          color="white"
        >
          mdi-chevron-down
        </v-icon>
      </div>
    </button>

    <transition
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
    >
      <div v-if="isExpanded" class="overflow-hidden">
        <div class="px-4 pb-4 pt-1">
          <div
            class="text-lg leading-relaxed tracking-wide text-gray-300"
            v-html="highlightText(accordion.description, searchTerm)"
          ></div>
        </div>
      </div>
    </transition>
  </li>
</template>

<script>
export default {
  name: 'BaseAccordion',
  props: {
    accordion: { type: Object, required: true },
    icon: { type: String, default: 'mdi-help-circle' },
    searchTerm: { type: String, default: '' },
    isExpanded: { type: Boolean, default: false },
  },
  methods: {
    highlightText(text, query) {
      if (!query) return text
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`(${escaped})`, 'gi')
      return text.replace(regex, '<mark class="bg-green-600 text-white rounded px-1">$1</mark>')
    },
    
    onEnter(el, done) {
      el.style.height = '0px'
      el.style.transition = 'height 0.4s ease'
      el.offsetHeight 
      el.style.height = el.scrollHeight + 'px'
      const onEnd = () => {
        el.removeEventListener('transitionend', onEnd)
        done()
      }
      el.addEventListener('transitionend', onEnd)
    },
    onAfterEnter(el) {
      el.style.height = 'auto'
      el.style.transition = ''
    },
    onLeave(el, done) {
      el.style.height = el.scrollHeight + 'px'
      el.style.transition = 'height 0.3s ease'
      el.offsetHeight
      el.style.height = '0px'
      const onEnd = () => {
        el.removeEventListener('transitionend', onEnd)
        done()
      }
      el.addEventListener('transitionend', onEnd)
    },
  },
}
</script>