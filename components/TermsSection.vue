<template>
  <div class="flex flex-col bg-gradient-to-br from-gray-900 to-gray-950 text-green-50 rounded-lg overflow-hidden" style="max-height: 70vh;">
    <!-- Loading -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-16 flex-1">
      <div class="w-9 h-9 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mb-4"></div>
      <p class="text-base text-green-300">Loading terms…</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="flex flex-col items-center justify-center py-16 flex-1">
      <i class="ri-error-warning-line text-4xl text-red-400 mb-3"></i>
      <p class="text-base text-red-400 font-medium">Failed to load terms.</p>
      <button
        @click="fetchTerms"
        class="mt-3 text-base text-green-400 hover:text-green-300 underline transition-colors"
      >
        Try again
      </button>
    </div>

    <!-- Terms content -->
    <template v-else-if="terms.length">
      <div class="overflow-y-auto flex-1 px-6 p-6">
        <div
          v-for="term in terms"
          :key="term.id"
          class="mb-8 pb-6 border-b border-green-700/30 last:border-0"
        >
          <h3 class="text-xl font-semibold text-green-200 mb-6">{{ term.title }}</h3>
          <div
            class="tiptap-content text-lg leading-relaxed text-green-50/90"
            v-html="term.paragraph"
          ></div>
        </div>
      </div>
    </template>

    <!-- Empty state -->
    <p v-else class="text-center text-green-300/70 py-16 text-base flex-1">
      No terms have been added yet.
    </p>
  </div>
</template>

<script>
export default {
  name: 'TermsSection',
  data() {
    return {
      terms: [],
      isLoading: true,
      error: null,
    }
  },
  mounted() {
    this.fetchTerms()
  },
  methods: {
    async fetchTerms() {
      this.isLoading = true
      this.error = null
      try {
        const response = await this.$axios.$get('v1/terms')
        this.terms = response.data?.terms.data || response.terms || []
      } catch (err) {
        console.error('Failed to fetch terms', err)
        this.error = true
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style scoped>
.tiptap-content :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

.tiptap-content :deep(ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

.tiptap-content :deep(li) {
  margin-bottom: 0.35rem;
}

.tiptap-content :deep(p) {
  margin-bottom: 1rem;
}
</style>