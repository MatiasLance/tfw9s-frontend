<!-- eslint-disable max-len -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#111712]
    via-[#1A1A1B] to-[#0d120e]"
  >
    <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black shadow-md">
      <BreadCrumbs title="Terms & Conditions Setting" />
    </BaseHeader>

    <main class="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <section
        class="relative mb-7 overflow-hidden rounded-3xl border
        border-white/10 bg-gradient-to-br from-[#26352a] via-brand-black
        to-[#163e2b] p-6 shadow-2xl shadow-black/30 sm:p-8"
        aria-labelledby="terms-page-title"
        data-aos="fade-up"
      >
        <div
          class="pointer-events-none absolute -right-20 -top-24 h-72 w-72
          rounded-full border-[42px] border-brand-green/10"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-24 right-1/3 h-56 w-56
          rounded-full bg-brand-green/10 blur-3xl"
        ></div>
        <div
          class="pointer-events-none absolute left-1/2 top-0 h-px w-1/3
          bg-gradient-to-r from-transparent via-brand-green/60 to-transparent"
        ></div>

        <div
          class="relative flex flex-col gap-8 lg:flex-row lg:items-end
          lg:justify-between"
        >
          <div class="flex max-w-2xl items-start gap-5">
            <div
              class="hidden h-16 w-16 shrink-0 items-center justify-center
              rounded-3xl bg-brand-green text-brand-black shadow-xl
              shadow-green-950/30 sm:flex"
            >
              <i class="ri-scales-3-line text-3xl" aria-hidden="true"></i>
            </div>
            <div>
              <div
                class="mb-4 inline-flex items-center gap-2 rounded-full
                border border-brand-green/20 bg-brand-green/10 px-3 py-1.5
                text-xs font-bold uppercase tracking-widest text-green-300"
              >
                <span
                  class="h-2 w-2 rounded-full bg-brand-green"
                  aria-hidden="true"
                ></span>
                Legal content library
              </div>
              <h1
                id="terms-page-title"
                class="text-3xl font-black tracking-tight text-white sm:text-4xl"
              >
                Keep your terms clear and trustworthy
              </h1>
              <p class="mt-3 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
                Organise the policies that protect your organisation and help
                customers understand their rights, responsibilities, and choices.
              </p>
            </div>
          </div>

          <button
            type="button"
            class="group inline-flex min-h-[52px] items-center justify-center
            gap-3 rounded-2xl bg-brand-green px-6 font-black text-brand-black
            shadow-xl shadow-green-950/30 transition hover:-translate-y-0.5
            hover:bg-green-400 focus:outline-none focus:ring-2
            focus:ring-brand-green focus:ring-offset-2
            focus:ring-offset-brand-black"
            @click="addTerm"
          >
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full
              bg-brand-black/10 transition group-hover:rotate-90"
            >
              <i class="ri-add-line text-xl" aria-hidden="true"></i>
            </span>
            Add terms section
          </button>
        </div>
      </section>

      <section
        class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
        aria-label="Terms and conditions overview"
      >
        <article
          class="rounded-2xl border border-gray-200 bg-white p-5
          shadow-xl shadow-black/10"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl
              bg-green-50 text-green-700"
            >
              <i class="ri-file-list-3-line text-2xl" aria-hidden="true"></i>
            </div>
            <div>
              <p class="text-2xl font-black text-gray-900">{{ totalItems }}</p>
              <p class="text-xs font-bold uppercase tracking-wider text-gray-500">
                Terms sections
              </p>
            </div>
          </div>
        </article>

        <article
          class="rounded-2xl border border-gray-200 bg-white p-5
          shadow-xl shadow-black/10"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl
              bg-blue-50 text-blue-700"
            >
              <i class="ri-pages-line text-2xl" aria-hidden="true"></i>
            </div>
            <div>
              <p class="text-2xl font-black text-gray-900">
                {{ totalPages || 0 }}
              </p>
              <p class="text-xs font-bold uppercase tracking-wider text-gray-500">
                Content pages
              </p>
            </div>
          </div>
        </article>

        <article
          class="rounded-2xl border border-gray-200 bg-white p-5
          shadow-xl shadow-black/10"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl"
              :class="totalItems
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-amber-50 text-amber-700'"
            >
              <i
                class="text-2xl"
                :class="totalItems
                  ? 'ri-shield-check-line'
                  : 'ri-draft-line'"
                aria-hidden="true"
              ></i>
            </div>
            <div>
              <p class="text-lg font-black text-gray-900">
                {{ totalItems ? 'Content ready' : 'Needs content' }}
              </p>
              <p class="text-xs font-bold uppercase tracking-wider text-gray-500">
                Library status
              </p>
            </div>
          </div>
        </article>
      </section>

      <section
        class="mb-6 rounded-3xl border border-gray-200 bg-white p-5
        shadow-xl shadow-black/10 sm:p-6"
        aria-labelledby="terms-library-title"
      >
        <div
          class="flex flex-col gap-5 md:flex-row md:items-center
          md:justify-between"
        >
          <div class="flex items-start gap-3">
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center
              rounded-2xl bg-green-50 text-green-700"
            >
              <i class="ri-book-open-line text-2xl" aria-hidden="true"></i>
            </div>
            <div>
              <h2 id="terms-library-title" class="text-lg font-black text-gray-900">
                Terms library
              </h2>
              <p class="mt-1 text-sm text-gray-500">
                Search, review, and maintain every legal section in one place.
              </p>
            </div>
          </div>
          <form
            class="relative w-full md:w-80"
            role="search"
            @submit.prevent="retrieveTerms"
          >
            <label for="terms-search" class="sr-only">
              Search terms and conditions
            </label>
            <SearchBar
              v-model="query"
              input-id="terms-search"
              placeholder="Search terms and conditions..."
              aria-label="Search terms and conditions"
            />
          </form>
        </div>
      </section>

      <section
        v-if="isLoading"
        class="space-y-5"
        aria-label="Loading terms and conditions"
        aria-live="polite"
        role="status"
      >
        <span class="sr-only">Loading terms and conditions...</span>
        <article
          v-for="placeholder in 3"
          :key="placeholder"
          class="animate-pulse overflow-hidden rounded-3xl border
          border-white/10 bg-white/10 p-6 sm:p-8"
        >
          <div class="flex gap-5">
            <div class="h-12 w-12 shrink-0 rounded-2xl bg-white/10"></div>
            <div class="w-full space-y-4">
              <div class="h-6 w-1/3 rounded bg-white/20"></div>
              <div class="h-3 w-full rounded bg-white/10"></div>
              <div class="h-3 w-5/6 rounded bg-white/10"></div>
            </div>
          </div>
        </article>
      </section>

      <section
        v-else-if="!termList.length"
        class="relative overflow-hidden rounded-3xl border border-gray-200
        bg-white px-6 py-14 text-center shadow-2xl shadow-black/20"
      >
        <div
          class="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56
          -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-50 blur-3xl"
        ></div>
        <div class="relative mx-auto max-w-md">
          <div
            class="mx-auto flex h-16 w-16 items-center justify-center
            rounded-3xl bg-green-50 text-green-700 ring-8 ring-green-50/60"
          >
            <i
              :class="query ? 'ri-search-eye-line' : 'ri-file-add-line'"
              class="text-3xl"
              aria-hidden="true"
            ></i>
          </div>
          <h2 class="mt-6 text-2xl font-black text-gray-900">
            {{ query ? 'No matching terms found' : 'Build your terms library' }}
          </h2>
          <p class="mt-3 text-sm leading-6 text-gray-600">
            {{
              query
                ? 'Try a different search phrase to find the section you need.'
                : 'Add the first section to create a clear, organised terms and conditions page.'
            }}
          </p>
          <button
            v-if="!query"
            type="button"
            class="mt-6 inline-flex min-h-[48px] items-center justify-center
            gap-2 rounded-xl bg-green-600 px-6 text-sm font-black
            transition hover:-translate-y-0.5 hover:bg-green-700
            focus:outline-none focus:ring-2 focus:ring-green
            focus:ring-offset-2"
            @click="addTerm"
          >
          <span class="text-gray-50">
            <i class="ri-add-line text-lg" aria-hidden="true"></i>
            Add first section
          </span>
          </button>
        </div>
      </section>

      <section v-else class="space-y-5" aria-label="Terms and conditions sections">
        <article
          v-for="(item, index) in termList"
          :key="item.id"
          class="terms-card group relative overflow-hidden rounded-3xl
          border border-gray-200 bg-white shadow-xl shadow-black/15
          transition duration-300 hover:border-green-200 hover:shadow-2xl"
          data-aos="fade-up"
          data-aos-offset="0"
        >
          <div
            class="absolute inset-y-0 left-0 w-1.5 bg-gray-200 transition
            group-hover:bg-brand-green"
          ></div>
          <div
            class="pointer-events-none absolute -right-16 -top-16 h-48 w-48
            rounded-full bg-green-50 transition duration-500
            group-hover:scale-110"
          ></div>

          <div
            class="relative grid grid-cols-1 gap-6 p-5 sm:p-7
            lg:grid-cols-[72px_minmax(0,1fr)] lg:gap-8"
          >
            <div class="flex items-center gap-3 lg:flex-col">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center
                rounded-2xl bg-brand-black font-black text-brand-green
                shadow-lg shadow-gray-300"
              >
                {{ (page - 1) * perPage + index + 1 }}
              </div>
              <span
                class="text-[10px] font-black uppercase tracking-[0.18em]
                text-gray-400"
              >
                Section
              </span>
            </div>

            <div class="min-w-0">
              <header
                class="flex flex-col gap-4 border-b border-gray-100 pb-5
                sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <div class="flex flex-wrap items-center gap-2">
                    <h2
                      class="text-xl font-black leading-tight text-gray-900
                      sm:text-2xl"
                    >
                      {{ item.title }}
                    </h2>
                    <span
                      class="inline-flex items-center gap-1.5 rounded-full
                      bg-green-50 px-3 py-1 text-[11px] font-bold uppercase
                      tracking-wide text-green-700"
                    >
                      <i class="ri-check-line" aria-hidden="true"></i>
                      Published
                    </span>
                  </div>
                  <p
                    class="mt-2 inline-flex items-center gap-2 text-xs
                    font-semibold text-gray-400"
                  >
                    <i class="ri-calendar-line text-base" aria-hidden="true"></i>
                    Updated {{ formattedDate(item.updated_at) }}
                  </p>
                </div>

                <div class="flex shrink-0 gap-2">
                  <button
                    type="button"
                    class="inline-flex min-h-[42px] flex-1 items-center
                    justify-center gap-2 rounded-xl border border-green-200
                    bg-green-50 px-4 text-sm font-bold text-green-700
                    transition hover:border-green-600 hover:bg-green-600
                    hover:text-white focus:outline-none focus:ring-2
                    focus:ring-green-300 sm:flex-none"
                    :aria-label="`Edit ${item.title}`"
                    @click="editTerm(item.id)"
                  >
                    <i class="ri-edit-line text-lg" aria-hidden="true"></i>
                    Edit
                  </button>
                  <button
                    type="button"
                    class="inline-flex min-h-[42px] flex-1 items-center
                    justify-center gap-2 rounded-xl border border-red-200
                    bg-red-50 px-4 text-sm font-bold text-red-600 transition
                    hover:border-red-600 hover:bg-red-600 hover:text-white
                    focus:outline-none focus:ring-2 focus:ring-red-300
                    sm:flex-none"
                    :aria-label="`Delete ${item.title}`"
                    @click="removeTerm(item.id)"
                  >
                    <i
                      class="ri-delete-bin-line text-lg"
                      aria-hidden="true"
                    ></i>
                    <span class="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </header>

              <div
                class="terms-content mt-6 max-w-4xl text-base leading-8
                text-gray-700"
                v-html="item.paragraph"
              ></div>

              <footer
                class="mt-7 flex items-start gap-3 rounded-2xl border
                border-blue-100 bg-blue-50 px-4 py-3 text-xs leading-5
                text-blue-800"
              >
                <i
                  class="ri-information-line mt-0.5 shrink-0 text-lg
                  text-blue-600"
                  aria-hidden="true"
                ></i>
                Review this section regularly so customers always have clear,
                current information.
              </footer>
            </div>
          </div>
        </article>
      </section>

      <section
        v-if="!isLoading && totalPages > 0"
        class="mt-6 flex flex-col gap-4 rounded-2xl border border-gray-200
        bg-white px-5 py-4 shadow-xl shadow-black/10 sm:flex-row
        sm:items-center sm:justify-between"
        aria-label="Terms pagination"
      >
        <div class="flex items-center gap-3 text-sm text-gray-600">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center
            rounded-xl bg-green-50 text-green-700"
          >
            <i class="ri-information-line text-lg" aria-hidden="true"></i>
          </div>
          <span>
            Showing <strong class="text-gray-900">{{ from }}</strong>–
            <strong class="text-gray-900">{{ to }}</strong> of
            <strong class="text-gray-900">{{ totalItems }}</strong> sections
          </span>
        </div>
        <BasePagination
          :active-page="page"
          :total-pages="totalPages"
          @change="setPage"
        />
      </section>
    </main>

    <OModal
      :active="showFormModal"
      class="terms-modal"
      @close="closeForm"
    >
      <div
        class="mx-auto flex w-full max-w-4xl flex-col overflow-hidden
        rounded-3xl bg-white shadow-2xl"
        style="max-height: 92vh;"
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-form-title"
      >
        <header
          class="relative shrink-0 overflow-hidden bg-gradient-to-br
          from-[#26352a] via-brand-black to-green-900 px-5 py-6 sm:px-7"
        >
          <div
            class="pointer-events-none absolute -right-12 -top-16 h-44 w-44
            rounded-full border-[28px] border-brand-green/10"
          ></div>
          <div class="relative flex items-start justify-between gap-4">
            <div class="flex items-start gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center
                rounded-2xl bg-brand-green text-gray-50"
              >
                <i
                  :class="isEditing ? 'ri-file-edit-line' : 'ri-file-add-line'"
                  class="text-2xl"
                  aria-hidden="true"
                ></i>
              </div>
              <div>
                <p
                  class="text-xs font-black uppercase tracking-[0.18em]
                  text-green-300"
                >
                  {{ isEditing ? 'Update section' : 'New legal section' }}
                </p>
                <h2
                  id="terms-form-title"
                  class="mt-1 text-xl font-black text-white sm:text-2xl"
                >
                  {{ isEditing ? 'Edit terms section' : 'Add terms section' }}
                </h2>
                <p class="mt-1 text-sm text-gray-300">
                  Use a clear title and straightforward language customers can scan.
                </p>
              </div>
            </div>
            <button
              type="button"
              class="flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl border border-white/10 bg-white/10
              transition hover:bg-white/20 focus:outline-none focus:ring-2
              focus:ring-brand-green"
              aria-label="Close terms editor"
              @click="closeForm"
            >
              <i class="ri-close-line text-xl text-gray-50" aria-hidden="true"></i>
            </button>
          </div>
        </header>

        <div class="flex-1 space-y-6 overflow-y-auto px-5 py-6 sm:px-7">
          <div>
            <div class="mb-2 flex items-center justify-between gap-4">
              <label
                for="term-title"
                class="text-sm font-black text-gray-800"
              >
                Section title <span class="text-red-500">*</span>
              </label>
              <span class="text-xs font-semibold text-gray-400">
                {{ term.title.length }}/100
              </span>
            </div>
            <div class="relative">
              <i
                class="ri-heading absolute left-4 top-1/2 -translate-y-1/2
                text-lg text-gray-400"
                aria-hidden="true"
              ></i>
              <input
                id="term-title"
                v-model="term.title"
                type="text"
                maxlength="100"
                placeholder="e.g. Refund policy"
                class="w-full rounded-xl border-2 border-gray-200 bg-gray-50
                py-3 pl-11 pr-4 text-gray-900 outline-none transition
                placeholder:text-gray-400 hover:border-green-300
                focus:border-brand-green focus:bg-white focus:ring-4
                focus:ring-green-100"
                :class="{ 'border-red-400 focus:ring-red-100': errors.title }"
                :aria-invalid="Boolean(errors.title)"
                aria-describedby="term-title-help"
                @input="errors.title = ''"
              />
            </div>
            <p
              id="term-title-help"
              class="mt-2 text-xs leading-5"
              :class="errors.title ? 'font-semibold text-red-600' : 'text-gray-500'"
            >
              {{ errors.title || 'Choose a concise heading that describes this section.' }}
            </p>
          </div>

          <div>
            <div class="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <label for="paragraph" class="text-sm font-black text-gray-800">
                Terms content <span class="text-red-500">*</span>
              </label>
              <span class="text-xs text-gray-500">
                Headings and lists make longer policies easier to understand.
              </span>
            </div>
            <div
              class="rich-editor-wrapper overflow-hidden rounded-2xl border-2
              border-gray-200 bg-white transition hover:border-green-300
              focus-within:border-brand-green focus-within:ring-4
              focus-within:ring-green-100"
              :class="{ 'border-red-400 focus-within:ring-red-100': errors.paragraph }"
            >
              <Tiptap
                id="paragraph"
                v-model="term.paragraph"
                class="enhanced-editor"
                @input="errors.paragraph = ''"
              />
            </div>
            <p
              v-if="errors.paragraph"
              class="mt-2 text-xs font-semibold text-red-600"
              role="alert"
            >
              {{ errors.paragraph }}
            </p>
          </div>

          <div
            class="flex items-start gap-3 rounded-2xl border border-blue-100
            bg-blue-50 p-4 text-xs leading-5 text-blue-800"
          >
            <i
              class="ri-shield-check-line mt-0.5 shrink-0 text-lg
              text-blue-600"
              aria-hidden="true"
            ></i>
            Changes are reflected on the public terms page after saving. Review
            legal wording carefully before publishing.
          </div>
        </div>

        <footer
          class="flex shrink-0 flex-col-reverse gap-3 border-t
          border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row
          sm:justify-end sm:px-7"
        >
          <button
            type="button"
            class="inline-flex min-h-[46px] items-center justify-center gap-2
            rounded-xl border border-gray-300 bg-white px-6 text-sm font-bold
            text-gray-700 transition hover:bg-gray-100 focus:outline-none
            focus:ring-2 focus:ring-gray-300"
            @click="closeForm"
          >
            <i class="ri-close-line" aria-hidden="true"></i>
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex min-h-[46px] items-center justify-center gap-2
            rounded-xl bg-green-600 px-6 text-sm font-black
            shadow-lg shadow-gray-300 transition hover:-translate-y-0.5
            hover:bg-green-700 focus:outline-none focus:ring-2
            focus:ring-green focus:ring-offset-2"
            @click="validate"
          >
          <span class="text-gray-50">
            <i
              :class="isEditing ? 'ri-save-3-line' : 'ri-add-line'"
              class="text-lg"
              aria-hidden="true"
            ></i>
            {{ isEditing ? 'Save changes' : 'Add section' }}
          </span>
          </button>
        </footer>
      </div>
    </OModal>

    <OModal
      :active="showDeleteModal"
      class="terms-modal"
      @close="showDeleteModal = false"
    >
      <div
        class="mx-auto w-full max-w-lg overflow-hidden rounded-3xl bg-white
        shadow-2xl"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-term-title"
      >
        <header
          class="border-b border-red-100 bg-gradient-to-br from-red-50
          to-white px-6 py-6 text-center"
        >
          <div
            class="mx-auto flex h-16 w-16 items-center justify-center
            rounded-3xl bg-red-100 text-red-600 ring-8 ring-red-50"
          >
            <i class="ri-delete-bin-5-line text-3xl" aria-hidden="true"></i>
          </div>
          <p
            class="mt-5 text-xs font-black uppercase tracking-[0.18em]
            text-red-600"
          >
            Permanent action
          </p>
          <h2 id="delete-term-title" class="mt-2 text-2xl font-black text-gray-900">
            Delete this terms section?
          </h2>
        </header>

        <div class="px-6 py-6 text-center">
          <p class="text-base leading-7 text-gray-600">
            You’re about to permanently delete
            <strong class="font-black text-gray-900">“{{ term.title }}”</strong>.
            It will be removed from the public page immediately.
          </p>
        </div>

        <footer
          class="flex flex-col-reverse gap-3 border-t border-gray-200
          bg-gray-50 px-6 py-4 sm:flex-row sm:justify-center"
        >
          <button
            type="button"
            class="inline-flex min-h-[46px] items-center justify-center
            rounded-xl border border-gray-300 bg-white px-6 text-sm font-bold
            text-gray-700 transition hover:bg-gray-100 focus:outline-none
            focus:ring-2 focus:ring-gray-300"
            @click="showDeleteModal = false"
          >
            Keep section
          </button>
          <button
            type="button"
            class="inline-flex min-h-[46px] items-center justify-center gap-2
            rounded-xl bg-red-600 px-6 text-sm font-black text-white
            transition hover:bg-red-700 focus:outline-none focus:ring-2
            focus:ring-red-300 focus:ring-offset-2"
            @click="confirmDelete"
          >
            <i class="ri-delete-bin-line" aria-hidden="true"></i>
            Delete permanently
          </button>
        </footer>
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
.terms-card {
  transform: translateZ(0);
}

.terms-card:hover {
  transform: translateY(-2px);
}

.terms-content ::v-deep h1,
.terms-content ::v-deep h2,
.terms-content ::v-deep h3,
.terms-content ::v-deep h4 {
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  color: #111827;
  font-weight: 800;
  line-height: 1.3;
}

.terms-content ::v-deep h1:first-child,
.terms-content ::v-deep h2:first-child,
.terms-content ::v-deep h3:first-child,
.terms-content ::v-deep h4:first-child,
.terms-content ::v-deep p:first-child {
  margin-top: 0;
}

.terms-content ::v-deep p {
  margin-top: 0.875rem;
  margin-bottom: 0.875rem;
}

.terms-content ::v-deep ul,
.terms-content ::v-deep ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.terms-content ::v-deep ul {
  list-style: disc;
}

.terms-content ::v-deep ol {
  list-style: decimal;
}

.terms-content ::v-deep li {
  margin: 0.5rem 0;
  padding-left: 0.25rem;
}

.terms-content ::v-deep a {
  color: #047857;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.terms-content ::v-deep blockquote {
  margin: 1.25rem 0;
  border-left: 4px solid #55d22d;
  border-radius: 0 0.75rem 0.75rem 0;
  background: #f0fdf4;
  padding: 1rem 1.25rem;
  color: #374151;
}

.enhanced-editor ::v-deep .ProseMirror {
  min-height: 260px;
  padding: 1.25rem;
  background: #fff;
  color: #111827;
  line-height: 1.75;
}

.terms-modal ::v-deep .o-modal__content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 100vh;
  padding: 1rem;
  border-radius: 1.5rem;
  overflow: hidden;
}

@media (max-width: 640px) {
  .terms-content {
    font-size: 0.9375rem;
    line-height: 1.75;
  }

  .terms-modal ::v-deep .o-modal__content {
    padding: 0.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .terms-card,
  .terms-card:hover {
    transform: none;
    transition: none;
  }
}
</style>
