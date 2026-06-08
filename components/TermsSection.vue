<template>
  <div class="terms-journey">

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-16">
      <div class="loader-spinner"></div>
      <p class="mt-4 text-gray-500">Loading terms…</p>
    </div>

    <div v-else-if="error" class="text-center py-16">
      <div class="mb-4 text-red-400">
        <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p class="text-red-500 font-medium">Failed to load terms and conditions.</p>
      <button
        class="mt-4 text-green-600 underline hover:text-green-700"
        @click="fetchTerms"
      >
        Try again
      </button>
    </div>

    <div v-else-if="terms.length && currentStep === 0" class="welcome-card">
      <div class="icon-circle">
        <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <h2 class="welcome-title">Before we get started…</h2>
      <p class="welcome-text">
        We know legal stuff can be boring. That’s why we broke it down into
        bite‑sized sections. Open each one and you’ll be done in no time.
      </p>
      <button class="start-btn" @click="currentStep = 1">
        Let’s go!
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>

    <div v-else-if="terms.length" class="terms-sections-wrapper">
      <div class="progress-section">
        <div class="progress-bar-bg">
          <div
            class="progress-bar-fill"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>
        <p class="progress-text">
          {{ readSections }} / {{ terms.length }} sections opened
        </p>
      </div>

      <div class="section-nav">
        <button
          v-for="(term, idx) in terms"
          :key="term.id"
          class="nav-pill"
          :class="{
            'nav-pill--active': openSection === idx,
            'nav-pill--read': readSet.has(idx),
          }"
          @click="openSection = idx"
        >
          <span class="nav-index">{{ idx + 1 }}</span>
          <span class="nav-label">{{ term.title || 'Section ' + (idx + 1) }}</span>
        </button>
      </div>

      <transition name="fade-slide" mode="out-in">
        <div :key="openSection" class="active-term">
          <h3 class="term-title">{{ terms[openSection].title }}</h3>
          <div
            class="tiptap-content text-base leading-relaxed text-gray-700"
            v-html="terms[openSection].paragraph"
          ></div>
          <div class="section-footer">
            <span
              v-if="readSet.has(openSection)"
              class="read-badge"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Read
            </span>
            <button
              v-else
              class="mark-read-btn"
              @click="markAsRead(openSection)"
            >
              Mark as read
            </button>
          </div>

          <div class="pagination">
            <button
              v-if="openSection > 0"
              class="pagination-btn"
              @click="openSection--"
            >
              ← Previous
            </button>
            <span v-else class="pagination-spacer"></span>
            <button
              v-if="openSection < terms.length - 1"
              class="pagination-btn pagination-btn--primary"
              @click="openSection++"
            >
              Next →
            </button>
          </div>
        </div>
      </transition>

      <div v-if="allRead" class="completion-banner">
        <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <p>You’ve reviewed all sections – thank you for taking the time!</p>
      </div>
    </div>

    <p v-else class="text-gray-400 text-center py-8">
      No terms have been added yet.
    </p>
  </div>
</template>

<script>
export default {
  name: 'TermsSection',
  emits: ['all-read'],
  data() {
    return {
      terms: [],
      isLoading: true,
      error: null,
      currentStep: 0,
      openSection: 0,
      readSet: new Set(),
    }
  },
  computed: {
    progressPercent() {
      return this.terms.length ? (this.readSet.size / this.terms.length) * 100 : 0
    },
    readSections() {
      return this.readSet.size
    },
    allRead() {
      return this.terms.length > 0 && this.readSet.size === this.terms.length
    },
  },
  watch: {
    allRead(val) {
      if (val) this.$emit('all-read')
    },
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
    markAsRead(index) {
      this.readSet = new Set([...this.readSet, index])
    },
  },
}
</script>

<style scoped>
.loader-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #10b981;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.welcome-card {
  text-align: center;
  padding: 2rem 1rem;
}
.icon-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #ecfdf5;
  margin-bottom: 1.5rem;
}
.welcome-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
}
.welcome-text {
  color: #6b7280;
  max-width: 28rem;
  margin: 0 auto 1.5rem auto;
  line-height: 1.6;
}
.start-btn {
  display: inline-flex;
  align-items: center;
  background-color: #059669;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;
}
.start-btn:hover {
  background-color: #047857;
}

.progress-section {
  margin-bottom: 1.5rem;
}
.progress-bar-bg {
  width: 100%;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: linear-gradient(to right, #10b981, #059669);
  border-radius: 9999px;
  transition: width 0.4s ease;
}
.progress-text {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.25rem;
  text-align: right;
}

.section-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.nav-pill {
  display: flex;
  align-items: center;
  background-color: #f3f4f6;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
}
.nav-pill:hover {
  background-color: #e5e7eb;
}
.nav-pill--active {
  background-color: #059669;
  color: white;
  box-shadow: 0 2px 8px rgba(5, 150, 105, 0.3);
}
.nav-pill--read:not(.nav-pill--active) {
  background-color: #d1fae5;
  color: #065f46;
}
.nav-index {
  font-weight: 700;
  margin-right: 0.3rem;
}
.nav-label {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.active-term {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.term-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

.tiptap-content :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.tiptap-content :deep(ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.tiptap-content :deep(li) {
  margin-bottom: 0.25rem;
}
.tiptap-content :deep(p) {
  margin-bottom: 0.75rem;
}

.section-footer {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.read-badge {
  display: inline-flex;
  align-items: center;
  color: #059669;
  font-size: 0.85rem;
  font-weight: 500;
}
.mark-read-btn {
  background: none;
  border: 1px solid #d1d5db;
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  color: #4b5563;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.mark-read-btn:hover {
  border-color: #059669;
  color: #059669;
}

.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}
.pagination-spacer {
  flex: 1;
}
.pagination-btn {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s;
}
.pagination-btn:hover {
  background-color: #e5e7eb;
}
.pagination-btn--primary {
  background-color: #059669;
  color: white;
}
.pagination-btn--primary:hover {
  background-color: #047857;
}

.completion-banner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  background-color: #ecfdf5;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: #065f46;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>