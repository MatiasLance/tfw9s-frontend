<template>
  <div class="min-h-screen w-screen bg-gradient-to-br
  from-gray-900 via-gray-800 to-gray-900 transition">
    <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black">
      <BreadCrumbs title="Terms & Conditions Setting" />
    </BaseHeader>

    <div class="mx-auto max-w-screen-xl px-4 py-7">
      <main class="w-full">
        <div
          class="my-6 flex flex-wrap items-center justify-between gap-4
                 rounded-xl bg-white p-5 shadow-md"
        >
          <div class="flex flex-wrap justify-start gap-2">
            <button
              type="button"
              class="group flex w-full items-center justify-center rounded-lg
                     bg-gradient-to-r from-green-500 via-lime-500 to-emerald-700
                     p-2.5 font-semibold text-white transition-transform
                     duration-200 hover:scale-[1.02] sm:w-60 shadow-md
                     hover:shadow-lg"
              @click="addTerm"
            >
              <span class="text-white">
                <i class="ri-add-line mr-2 text-lg transition-transform
                          group-hover:rotate-90" />
                Add Terms
              </span>
            </button>
          </div>

          <div class="w-full sm:w-80">
            <form @submit.prevent="retrieveTerms" class="relative">
              <SearchBar v-model="query" />
            </form>
          </div>
        </div>
      </main>

      <!-- Pagination & info -->
      <section v-if="totalPages > 0" class="mb-10" data-aos="fade-up">
        <div
          class="flex flex-wrap items-center justify-between gap-4 rounded-lg
                 bg-white px-6 py-4 text-black shadow-md"
        >
          <div class="flex items-center space-x-2 text-sm md:text-base">
            <i class="ri-information-line text-lg text-green-400" />
            <span>
              Showing <span class="font-semibold">{{ from }}</span>–
              <span class="font-semibold">{{ to }}</span>
              of <span class="font-semibold">{{ totalItems }}</span> results
            </span>
          </div>
          <div class="flex shrink-0">
            <BasePagination
              :active-page="page"
              :total-pages="totalPages"
              @change="setPage"
            />
          </div>
        </div>
      </section>

      <!-- Empty state -->
      <section
        v-if="!isLoading && totalPages === 0"
        class="col-span-1 flex flex-col items-center justify-center rounded-xl
               bg-gray-50 p-8 text-center font-semibold text-gray-600 shadow-inner
               transition-all duration-300 md:col-span-3 h-60"
      >
        <i class="ri-file-text-line text-4xl text-green-500 mb-3 animate-pulse" />
        <h3 class="text-lg">No Terms & Conditions Yet</h3>
        <p class="mt-1 text-sm text-gray-500">
          Start adding terms to be displayed on your site.
        </p>
      </section>

      <!-- Terms List -->
      <article class="mx-auto max-w-screen-xl">
        <div class="grid grid-cols-1 gap-6">
            <div
            v-for="term in termList"
            :key="term.id"
            class="group relative bg-white rounded-2xl border border-gray-200 p-6
                    shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300
                    transform hover:-translate-y-1 overflow-hidden"
            data-aos="fade-up"
            >
            <!-- Accent bar that appears on hover -->
            <div class="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-green-400 to-emerald-500
                        scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-r-full" />

            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <!-- Left Content -->
                <div class="flex-1 space-y-2">
                <!-- Title with icon -->
                <div class="flex items-center gap-3">
                    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-200
                                flex items-center justify-center shadow-inner">
                    <i class="ri-file-text-line text-xl text-green-700"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 group-hover:text-green-800 transition-colors">
                    {{ term.title }}
                    </h3>
                </div>

                <!-- Date badge -->
                <div class="flex items-center gap-2 text-xs text-gray-400 ml-13">
                    <i class="ri-calendar-line text-sm" />
                    <span>Updated {{ formattedDate(term.updated_at) }}</span>
                </div>

                <!-- Excerpt (rich text preview) -->
                <div
                    class="mt-3 text-gray-600 text-sm leading-relaxed line-clamp-3 prose prose-sm max-w-none"
                    v-html="term.paragraph"
                ></div>
                </div>

                <!-- Action Buttons (always visible, right aligned on desktop) -->
                <div class="flex sm:flex-col gap-2 sm:self-center ml-auto sm:ml-0">
                <button
                    @click="editTerm(term.id)"
                    class="group/btn flex items-center gap-2 px-4 py-2 rounded-lg
                        bg-green-50 text-green-700 font-medium border border-green-200
                        hover:bg-green-600 hover:text-white hover:border-green-600
                        transition-all duration-200 active:scale-95 shadow-sm"
                >
                    <i class="ri-edit-line text-lg group-hover/btn:rotate-12 transition-transform" />
                    <span class="hidden sm:inline">Edit</span>
                </button>
                <button
                    @click="removeTerm(term.id)"
                    class="group/btn flex items-center gap-2 px-4 py-2 rounded-lg
                        bg-red-50 text-red-600 font-medium border border-red-200
                        hover:bg-red-500 hover:text-white hover:border-red-500
                        transition-all duration-200 active:scale-95 shadow-sm"
                >
                    <i class="ri-delete-bin-line text-lg group-hover/btn:scale-110 transition-transform" />
                    <span class="hidden sm:inline">Delete</span>
                </button>
                </div>
            </div>

            <!-- Subtle bottom border glow on hover -->
            <div class="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-green-400 to-emerald-500
                        rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
        </div>
        </article>
    </div>

    <!-- Add/Edit Modal (Scrollable) -->
    <OModal :active="showFormModal" @close="closeForm" class="terms-modal">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-auto flex flex-col" style="max-height: 90vh;">
        <!-- Header -->
        <div class="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-5 rounded-t-xl flex-shrink-0">
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <i :class="isEditing ? 'ri-file-edit-line' : 'ri-file-add-line'" class="text-2xl text-white" />
            </div>
            <div>
            <h3 class="text-xl font-bold text-white">
                {{ isEditing ? 'Edit Terms' : 'Add New Terms' }}
            </h3>
            <p class="text-emerald-100 text-sm mt-0.5">
                {{ isEditing ? 'Update your existing terms & conditions' : 'Create a new terms entry for your site' }}
            </p>
            </div>
        </div>
        </div>

        <!-- Scrollable Body -->
        <div class="px-6 py-5 space-y-5 overflow-y-auto flex-1">
        <!-- Title Field -->
        <div>
            <label class="flex items-center justify-between text-sm font-semibold text-gray-700 mb-1.5">
            <span>Title <span class="text-red-500">*</span></span>
            <span class="text-xs text-gray-400">{{ term.title.length }}/100</span>
            </label>
            <input
            v-model="term.title"
            type="text"
            maxlength="100"
            placeholder="e.g., Refund Policy"
            class="w-full px-4 py-2.5 bg-gray-200 border-2 border-gray-200 rounded-xl
                    text-gray-900 placeholder-gray-400
                    transition duration-200
                    hover:border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 focus:bg-gray-200
                    outline-none"
            :class="{ 'border-red-400 focus:ring-red-500/20': errors.title }"
            @input="errors.title = ''"
            />
            <p v-if="errors.title" class="mt-1 text-sm text-red-500">{{ errors.title }}</p>
        </div>

        <!-- Content Field -->
        <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">
            Content <span class="text-red-500">*</span>
            </label>
            <div
            class="rich-editor-wrapper border-2 border-gray-200 rounded-xl overflow-hidden
                    transition duration-200
                    hover:border-emerald-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/20"
            :class="{ 'border-red-400': errors.paragraph }"
            >
            <Tiptap
                id="paragraph"
                v-model="term.paragraph"
                class="enhanced-editor"
                @input="errors.paragraph = ''"
            />
            </div>
            <p v-if="errors.paragraph" class="mt-1 text-sm text-red-500">{{ errors.paragraph }}</p>
        </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end gap-3 border-t border-gray-200 flex-shrink-0">
        <button
            type="button"
            class="group flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 
                bg-white text-gray-700 font-medium transition-all duration-200
                hover:bg-gray-100 hover:border-gray-400 active:scale-95"
            @click="closeForm"
        >
            <i class="ri-close-line group-hover:rotate-90 transition-transform duration-200" />
            Cancel
        </button>
        <button
            type="button"
            class="group flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-semibold
                bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-200
                hover:shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="validate"
        >
            <span class="text-white">
            <i :class="isEditing ? 'ri-check-line' : 'ri-add-line'" 
                class="group-hover:-translate-y-0.5 transition-transform" />
            {{ isEditing ? 'Save Changes' : 'Add Terms' }}
            </span>
        </button>
        </div>
    </div>
    </OModal>

    <!-- Delete Confirmation Modal -->
    <OModal :active="showDeleteModal" @close="showDeleteModal = false" class="terms-modal">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden">
        <!-- Header with warning accent -->
        <div class="bg-gradient-to-r from-amber-500 to-red-500 px-6 py-5">
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <i class="ri-error-warning-line text-2xl text-white"></i>
            </div>
            <div>
            <h3 class="text-xl font-bold text-white">Confirm Deletion</h3>
            <p class="text-red-100 text-sm mt-0.5">This action cannot be undone</p>
            </div>
        </div>
        </div>

        <!-- Body -->
        <div class="px-6 py-6 text-center space-y-4">
        <div class="flex justify-center">
            <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
            <i class="ri-delete-bin-5-line text-3xl text-red-500"></i>
            </div>
        </div>
        <p class="text-gray-700 text-lg leading-relaxed">
            Are you sure you want to permanently delete the terms
            <span class="font-semibold text-gray-900">"{{ term.title }}"</span>?
        </p>
        <p class="text-sm text-gray-400">
            This will remove it from the public page immediately.
        </p>
        </div>

        <!-- Footer Actions -->
        <div class="px-6 py-4 bg-gray-50 flex justify-center gap-4 border-t border-gray-200">
        <button
            type="button"
            class="group flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 
                bg-white text-gray-700 font-medium transition-all duration-200
                hover:bg-gray-100 hover:border-gray-400 active:scale-95"
            @click="showDeleteModal = false"
        >
            <i class="ri-close-line group-hover:rotate-90 transition-transform duration-200" />
            Cancel
        </button>
        <button
            type="button"
            class="group flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-semibold
                bg-gradient-to-r from-red-500 to-red-600 transition-all duration-200
                hover:shadow-lg hover:scale-[1.02] active:scale-95"
            @click="confirmDelete"
        >
         <span class="text-white">
            <i class="ri-delete-bin-line group-hover:scale-110 transition-transform" />
            Yes, remove it
         </span>
        </button>
        </div>
    </div>
    </OModal>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import 'remixicon/fonts/remixicon.css';
import BasePagination from '~/components/base/BasePagination';
import SearchBar from '~/components/SearchBar';
import aosMixin from '@/mixins/aos';
import Tiptap from '~/components/Wysiwyg/Tiptap';
import formattedDate from '~/mixins/utilities/formattedDate';

export default {
  components: {
    BasePagination,
    SearchBar,
    Tiptap,
  },
  mixins: [aosMixin, formattedDate],
  data() {
    return {
      query: null,
      term: {
        title: '',
        paragraph: '<p></p>',
      },
      termList: [],
      editingId: null,
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
      isLoading: false,
      showFormModal: false,
      showDeleteModal: false,
      isEditing: false,
      errors: {
        title: '',
        paragraph: '',
      },
    };
  },
  watch: {
    query() {
      this.debouncedSearch();
    },
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1);
      }
    },
  },
  mounted() {
    this.debouncedSearch = debounce(this.retrieveTerms, 800);
    this.retrieveTerms();
    this.page = 1;
  },
  methods: {
    // ---------- Data Fetching ----------
    retrieveTerms() {
      this.isLoading = true;
      const params = {
        q: this.query,
        page: this.page,
        per_page: this.perPage,
      };
      Object.keys(params).forEach(
        (key) => params[key] == null && delete params[key]
      );
      const queryString = new URLSearchParams(params).toString();

      this.$axios
        .$get(`v1/terms?${queryString}`)
        .then((response) => {
          this.termList = response.data.terms.data || [];
          this.totalItems = response.data.terms.total || 0;
          this.totalPages = response.data.terms.last_page || 0;
          this.from = response.data.terms.from || 0;
          this.to = response.data.terms.to || 0;
        })
        .catch(() => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Failed to load terms',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    setPage(page) {
      this.page = page;
      this.retrieveTerms();
    },

    // ---------- Form Logic ----------
    validate() {
      this.errors = { title: '', paragraph: '' };
      let isValid = true;

      if (!this.term.title.trim()) {
        this.errors.title = 'Title is required.';
        isValid = false;
      }
      if (
        !this.term.paragraph ||
        this.term.paragraph === '<p></p>' ||
        this.term.paragraph.trim() === ''
      ) {
        this.errors.paragraph = 'Content cannot be empty.';
        isValid = false;
      }

      if (!isValid) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Please fix the errors below.',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return;
      }

      this.isEditing ? this.update() : this.create();
    },

    addTerm() {
      this.isEditing = false;
      this.errors = { title: '', paragraph: '' };
      this.term = { title: '', paragraph: '<p></p>' };
      this.showFormModal = true;
    },

    editTerm(id) {
      this.isEditing = true;
      this.editingId = id;
      this.errors = { title: '', paragraph: '' };
      this.$axios
        .$get(`v1/terms/${id}`)
        .then((response) => {
          const data = response.data.term;
          this.term = {
            title: data.title,
            paragraph: data.paragraph,
          };
          this.showFormModal = true;
        })
        .catch(() => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Failed to load term details',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        });
    },

    create() {
      const payload = {
        title: this.term.title,
        paragraph: this.term.paragraph,
      };
      this.$axios
        .$post('v1/terms', payload)
        .then((response) => {
          this.$oruga.notification.open({
            message: response.title,
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.closeForm();
          this.retrieveTerms();
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.message,
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        });
    },

    update() {
      const payload = {
        title: this.term.title,
        paragraph: this.term.paragraph,
      };
      this.$axios
        .$put(`v1/terms/${this.editingId}`, payload)
        .then((response) => {
          this.$oruga.notification.open({
            message: response.title,
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.closeForm();
          this.retrieveTerms();
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.message,
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        });
    },

    closeForm() {
      this.showFormModal = false;
      this.term = { title: '', paragraph: '<p></p>' };
      this.errors = { title: '', paragraph: '' };
    },

    // ---------- Delete ----------
    removeTerm(id) {
      const term = this.termList.find((t) => t.id === id);
      this.term.title = term ? term.title : '';
      this.editingId = id;
      this.showDeleteModal = true;
    },

    confirmDelete() {
      this.$axios
        .$delete(`v1/terms/${this.editingId}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: response.title,
            position: 'bottom',
            variant: 'success',
            queue: true,
          });
          this.showDeleteModal = false;
          this.retrieveTerms();
        })
        .catch(() => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Failed to remove term',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        });
    },
  },
};
</script>

<style scoped>
/* Rich text editor inner padding */
.enhanced-editor :deep(.ProseMirror) {
  min-height: 200px;
  padding: 1rem;
  background: #f9fafb;
}

.terms-modal ::v-deep .o-modal__content {
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 100vh;
  padding: 1rem;
}
</style>