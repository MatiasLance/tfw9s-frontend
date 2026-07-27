<!-- eslint-disable max-len -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#111712]
    via-[#1A1A1B] to-[#0d120e]"
  >
    <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black shadow-md">
      <BreadCrumbs title="FAQ Setting"/>
    </BaseHeader>

    <main class="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <section
        class="relative mb-7 overflow-hidden rounded-3xl border
        border-white/10 bg-gradient-to-br from-[#263a2b] via-brand-black
        to-green-900 p-6 shadow-2xl shadow-black/30 sm:p-8"
        data-aos="fade-up"
      >
        <div
          class="absolute -right-16 -top-20 h-64 w-64 rounded-full
          border-[36px] border-brand-green/10"
        ></div>
        <div
          class="absolute -bottom-24 right-36 h-56 w-56 rounded-full
          bg-brand-green/10 blur-3xl"
        ></div>

        <div
          class="relative flex flex-col gap-7 lg:flex-row
          lg:items-end lg:justify-between"
        >
          <div class="flex max-w-2xl items-start gap-5">
            <div
              class="hidden h-16 w-16 shrink-0 items-center justify-center
              rounded-3xl bg-brand-green text-brand-black shadow-xl sm:flex"
            >
              <i class="ri-question-answer-line text-3xl"></i>
            </div>
            <div>
              <div
                class="mb-4 inline-flex items-center gap-2 rounded-full
                border border-brand-green/20 bg-brand-green/10 px-3 py-1.5
                text-xs font-bold uppercase tracking-widest text-green-300"
              >
                <span class="h-2 w-2 animate-pulse rounded-full bg-brand-green"></span>
                Help centre content
              </div>
              <h1 class="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Turn common questions into quick answers
              </h1>
              <p class="mt-3 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
                Build a useful FAQ library that helps visitors find reliable
                answers without waiting for support.
              </p>
            </div>
          </div>

          <button
            type="button"
            class="group inline-flex min-h-[52px] items-center justify-center
            gap-3 rounded-2xl bg-brand-green px-6 font-black text-brand-black
            shadow-xl shadow-green-950/30 transition hover:-translate-y-0.5
            hover:bg-green-400 focus:outline-none focus:ring-2
            focus:ring-brand-green focus:ring-offset-2 focus:ring-offset-brand-black"
            @click="addFaq"
          >
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full
              bg-brand-black/10 transition group-hover:rotate-90"
            >
              <i class="ri-add-line text-xl"></i>
            </span>
            Add question
          </button>
        </div>
      </section>

      <section class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <article
          class="rounded-2xl border border-gray-200 bg-white p-5
          shadow-xl shadow-black/10"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl
              bg-green-50 text-green-700"
            >
              <i class="ri-questionnaire-line text-2xl"></i>
            </div>
            <div>
              <p class="text-2xl font-black text-gray-900">{{ totalItems }}</p>
              <p class="text-xs font-bold uppercase tracking-wider text-gray-500">
                Total questions
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
              <i class="ri-pages-line text-2xl"></i>
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
              class="flex h-12 w-12 items-center justify-center rounded-2xl
              bg-violet-50 text-violet-700"
            >
              <i class="ri-eye-line text-2xl"></i>
            </div>
            <div>
              <p class="text-2xl font-black text-gray-900">
                {{ faqList.length }}
              </p>
              <p class="text-xs font-bold uppercase tracking-wider text-gray-500">
                Visible now
              </p>
            </div>
          </div>
        </article>
      </section>

      <section
        class="mb-6 rounded-3xl border border-gray-200 bg-white p-5
        shadow-xl shadow-black/10 sm:p-6"
      >
        <div
          class="flex flex-col gap-4 lg:flex-row lg:items-center
          lg:justify-between"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center
              rounded-2xl bg-green-50 text-green-700"
            >
              <i class="ri-search-eye-line text-xl"></i>
            </div>
            <div>
              <h2 class="font-black text-gray-900">Find a question</h2>
              <p class="text-sm text-gray-500">
                Search titles and answers in your FAQ library.
              </p>
            </div>
          </div>
          <form
            class="relative w-full lg:w-96"
            role="search"
            @submit.prevent="retrieveFaq"
          >
            <SearchBar v-model="query"/>
          </form>
        </div>

        <div
          v-if="totalPages > 0"
          class="mt-5 flex flex-col gap-4 border-t border-gray-100 pt-5
          sm:flex-row sm:items-center sm:justify-between"
        >
          <p class="flex items-center gap-2 text-sm text-gray-500">
            <i class="ri-information-line text-lg text-green-600"></i>
            Showing <strong class="text-gray-900">{{ from }}</strong>–
            <strong class="text-gray-900">{{ to }}</strong> of
            <strong class="text-gray-900">{{ totalItems }}</strong>
          </p>
          <BasePagination
            :active-page="page"
            :total-pages="totalPages"
            @change="setPage"
          />
        </div>
      </section>

      <section
        v-if="isFaqLoading"
        class="space-y-4"
        aria-label="Loading frequently asked questions"
      >
        <div
          v-for="placeholder in 4"
          :key="placeholder"
          class="animate-pulse rounded-3xl border border-white/10 bg-white/10 p-6"
        >
          <div class="mb-5 h-6 w-2/3 rounded bg-white/20"></div>
          <div class="space-y-3">
            <div class="h-3 w-full rounded bg-white/10"></div>
            <div class="h-3 w-4/5 rounded bg-white/10"></div>
          </div>
        </div>
      </section>

      <section v-else-if="faqList.length" class="space-y-5">
        <article
          v-for="(faqItem, index) in faqList"
          :key="faqItem.id"
          class="group relative overflow-hidden rounded-3xl border
          border-gray-200 bg-white p-5 shadow-xl shadow-black/15 transition
          duration-300 hover:-translate-y-0.5 hover:border-green-200
          hover:shadow-2xl sm:p-7"
          data-aos="fade-up"
        >
          <div
            class="absolute inset-y-0 left-0 w-1.5 bg-gray-200 transition
            group-hover:bg-brand-green"
          ></div>
          <div
            class="absolute -right-10 -top-10 h-32 w-32 rounded-full
            bg-green-50 transition group-hover:scale-125"
          ></div>

          <div class="relative">
            <header class="flex items-start gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center
                rounded-2xl bg-green-50 font-black text-green-700 transition
                group-hover:bg-brand-green group-hover:text-brand-black"
              >
                {{ (page - 1) * perPage + index + 1 }}
              </div>
              <div class="min-w-0 flex-1">
                <p
                  class="text-xs font-bold uppercase tracking-widest text-green-700"
                >
                  Question
                </p>
                <h2 class="mt-1 text-xl font-black leading-7 text-gray-900 sm:text-2xl">
                  {{ faqItem.title }}
                </h2>
                <p class="mt-2 flex items-center gap-2 text-xs text-gray-400">
                  <i class="ri-time-line text-sm"></i>
                  Updated {{ formattedDate(faqItem.updated_at) }}
                </p>
              </div>
            </header>

            <div
              class="faq-answer mt-5 rounded-2xl border border-gray-100
              bg-gray-50 p-5 text-sm leading-7 text-gray-600 sm:ml-16 sm:p-6"
              v-html="faqItem.description"
            ></div>

            <footer
              class="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-5
              sm:flex-row sm:items-center sm:justify-between"
            >
              <p class="flex items-center gap-2 text-xs text-gray-400">
                <i class="ri-customer-service-2-line text-base text-green-600"></i>
                Keep answers direct, current, and easy to scan.
              </p>
              <div class="flex gap-2">
                <button
                  type="button"
                  class="inline-flex min-h-[42px] flex-1 items-center
                  justify-center gap-2 rounded-xl border border-green-200
                  bg-green-50 px-4 text-sm font-bold text-green-700 transition
                  hover:bg-green-600 hover:text-white focus:outline-none
                  focus:ring-2 focus:ring-green-300 sm:flex-none"
                  @click="editFaq(faqItem.id)"
                >
                  <i class="ri-edit-line text-lg"></i>
                  Edit
                </button>
                <button
                  type="button"
                  class="inline-flex min-h-[42px] flex-1 items-center
                  justify-center gap-2 rounded-xl border border-red-200
                  bg-red-50 px-4 text-sm font-bold text-red-600 transition
                  hover:bg-red-600 hover:text-white focus:outline-none
                  focus:ring-2 focus:ring-red-300 sm:flex-none"
                  @click="removeFaq(faqItem)"
                >
                  <i class="ri-delete-bin-line text-lg"></i>
                  Delete
                </button>
              </div>
            </footer>
          </div>
        </article>
      </section>

      <section
        v-else
        class="relative overflow-hidden rounded-3xl border border-dashed
        border-green-300 bg-white p-8 text-center shadow-xl shadow-black/10
        sm:p-14"
      >
        <div class="absolute inset-x-0 top-0 h-1 bg-brand-green"></div>
        <div
          class="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl
          bg-green-50 text-green-600"
        >
          <i
            class="text-4xl"
            :class="query ? 'ri-search-line' : 'ri-question-answer-line'"
          ></i>
        </div>
        <h2 class="mt-5 text-2xl font-black text-gray-900">
          {{ query ? 'No matching questions' : 'Start your FAQ library' }}
        </h2>
        <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
          {{ query
            ? 'Try a different search phrase or clear your search to see every question.'
            : 'Add the questions visitors ask most often and give them helpful, dependable answers.' }}
        </p>
        <button
          v-if="!query"
          type="button"
          class="mt-6 inline-flex min-h-[48px] items-center justify-center
          gap-2 rounded-xl bg-green-600 px-6 font-bold text-white transition
          hover:-translate-y-0.5 hover:bg-green-700 focus:outline-none
          focus:ring-2 focus:ring-brand-green"
          @click="addFaq"
        >
          <span class="text-gray-50">
            <i class="ri-add-circle-line text-xl"></i>
            Add first question
          </span>
        </button>
      </section>
    </main>

    <OModal
      :active="showAddFaqModal || showEditFaqModal"
      :width="960"
      @close="closeEditor"
    >
      <div
        class="mx-auto flex w-full max-w-4xl flex-col overflow-hidden
        rounded-3xl bg-white shadow-2xl"
        style="max-height: 90vh"
        role="dialog"
        aria-modal="true"
        aria-labelledby="faq-editor-title"
      >
        <header
          class="relative shrink-0 overflow-hidden bg-gradient-to-br
          from-[#263a2b] via-brand-black to-green-900 p-5 text-white sm:p-7"
        >
          <div
            class="absolute -right-12 -top-16 h-44 w-44 rounded-full
            border-[28px] border-brand-green/10"
          ></div>
          <div class="relative flex items-start justify-between gap-4">
            <div class="flex items-start gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center
                rounded-2xl bg-brand-green text-brand-black"
              >
                <i
                  class="text-2xl"
                  :class="showEditFaqModal
                    ? 'ri-questionnaire-line'
                    : 'ri-question-answer-line'"
                ></i>
              </div>
              <div>
                <p
                  class="mb-1 text-xs font-bold uppercase tracking-widest
                  text-green-300"
                >
                  FAQ editor
                </p>
                <h2 id="faq-editor-title" class="text-2xl font-black">
                  {{ showEditFaqModal ? 'Improve this answer' : 'Add a helpful answer' }}
                </h2>
                <p class="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                  {{ showEditFaqModal
                    ? 'Keep the question familiar and make the answer easier to use.'
                    : 'Capture a real visitor question and answer it clearly.' }}
                </p>
              </div>
            </div>
            <button
              type="button"
              class="flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-white/10 text-white transition hover:rotate-90
              hover:bg-white/20 focus:outline-none focus:ring-2
              focus:ring-brand-green"
              aria-label="Close FAQ editor"
              @click="closeEditor"
            >
              <i class="ri-close-line text-2xl"></i>
            </button>
          </div>
        </header>

        <VForm
          ref="form"
          v-model="valid"
          lazy-validation
          class="flex min-h-0 flex-1 flex-col bg-gray-50"
        >
          <div class="min-h-0 flex-1 space-y-5 overflow-y-auto p-5 sm:p-7">
            <section
              class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div class="mb-4 flex items-start gap-3">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-xl bg-green-50 text-green-700"
                >
                  <i class="ri-question-mark text-xl"></i>
                </div>
                <div>
                  <label for="faq-title" class="font-bold text-gray-900">
                    Question <span class="text-red-500">*</span>
                  </label>
                  <p class="mt-1 text-sm text-gray-500">
                    Phrase it the way a visitor would naturally ask it.
                  </p>
                </div>
              </div>
              <VTextField
                id="faq-title"
                v-model="faq.title"
                label="e.g. What does my registration include?"
                :rules="rules"
                type="text"
                maxlength="160"
                counter="160"
                solo
                hide-details="auto"
              />
            </section>

            <section
              class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div class="mb-4 flex items-start gap-3">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-xl bg-blue-50 text-blue-700"
                >
                  <i class="ri-chat-3-line text-xl"></i>
                </div>
                <div>
                  <label for="description" class="font-bold text-gray-900">
                    Answer <span class="text-red-500">*</span>
                  </label>
                  <p class="mt-1 text-sm text-gray-500">
                    Lead with the direct answer, then provide useful detail.
                  </p>
                </div>
              </div>
              <div
                class="faq-editor overflow-hidden rounded-2xl border-2
                border-gray-200 transition focus-within:border-brand-green
                focus-within:ring-4 focus-within:ring-green-100"
              >
                <Tiptap
                  id="description"
                  v-model="faq.description"
                />
              </div>
            </section>

            <div
              class="flex items-start gap-3 rounded-2xl border border-blue-100
              bg-blue-50 p-4 text-sm leading-6 text-blue-800"
            >
              <i class="ri-lightbulb-line mt-0.5 text-xl text-blue-600"></i>
              <p>
                Link to the relevant policy or page when visitors may need
                more detail after reading the answer.
              </p>
            </div>
          </div>

          <footer
            class="flex shrink-0 flex-col-reverse gap-3 border-t
            border-gray-200 bg-white px-5 py-4 sm:flex-row
            sm:justify-end sm:px-7"
          >
            <button
              type="button"
              class="inline-flex min-h-[48px] items-center justify-center gap-2
              rounded-xl border border-gray-300 bg-white px-6 font-bold
              text-gray-700 transition hover:bg-gray-50 focus:outline-none
              focus:ring-2 focus:ring-gray-300"
              @click="closeEditor"
            >
              <i class="ri-close-line text-lg"></i>
              Cancel
            </button>
            <button
              type="button"
              class="inline-flex min-h-[48px] items-center justify-center gap-2
              rounded-xl bg-brand-green px-7 font-black text-brand-black
              shadow-lg shadow-green-200 transition hover:-translate-y-0.5
              hover:bg-green-500 focus:outline-none focus:ring-2
              focus:ring-brand-green disabled:cursor-not-allowed
              disabled:opacity-50"
              :disabled="!valid || isSaving"
              @click="validate(showEditFaqModal ? 'Edit' : 'Add')"
            >
              <i
                class="text-lg"
                :class="isSaving
                  ? 'ri-loader-4-line animate-spin'
                  : showEditFaqModal
                    ? 'ri-save-3-line'
                    : 'ri-add-circle-line'"
              ></i>
              {{ isSaving
                ? 'Saving…'
                : showEditFaqModal
                  ? 'Save changes'
                  : 'Add question' }}
            </button>
          </footer>
        </VForm>
      </div>
    </OModal>

    <OModal
      :active="showRemoveFaqModal"
      :width="520"
      @close="closeRemove"
    >
      <div
        class="mx-auto w-full max-w-lg overflow-hidden rounded-3xl
        bg-white shadow-2xl"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-faq-title"
      >
        <header
          class="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 text-white"
        >
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-2xl
                bg-white/15"
              >
                <i class="ri-delete-bin-6-line text-2xl"></i>
              </div>
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-red-100">
                  Permanent action
                </p>
                <h2 id="delete-faq-title" class="text-xl font-black">
                  Delete this question?
                </h2>
              </div>
            </div>
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-full
              bg-white/10 transition hover:bg-white/20 focus:outline-none
              focus:ring-2 focus:ring-white"
              aria-label="Close delete FAQ dialog"
              @click="closeRemove"
            >
              <i class="ri-close-line text-xl"></i>
            </button>
          </div>
        </header>

        <div class="px-6 py-7 text-center">
          <div
            class="mx-auto flex h-20 w-20 items-center justify-center
            rounded-full bg-red-50 text-red-600"
          >
            <i class="ri-question-mark text-4xl"></i>
          </div>
          <h3 class="mt-5 text-xl font-black text-gray-900">
            This answer will be removed
          </h3>
          <p class="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
            Visitors will no longer be able to find this question in the FAQ.
            This action cannot be undone.
          </p>
          <div
            class="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3
            text-left text-sm font-bold leading-6 text-red-800"
          >
            “{{ faq.title }}”
          </div>
        </div>

        <footer
          class="flex flex-col-reverse gap-3 border-t border-gray-200
          bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end"
        >
          <button
            type="button"
            class="inline-flex min-h-[46px] items-center justify-center gap-2
            rounded-xl border border-gray-300 bg-white px-5 font-bold
            text-gray-700 transition hover:bg-gray-100 focus:outline-none
            focus:ring-2 focus:ring-gray-300"
            @click="closeRemove"
          >
            Keep question
          </button>
          <button
            type="button"
            class="inline-flex min-h-[46px] items-center justify-center gap-2
            rounded-xl bg-red-600 px-5 font-bold text-white shadow-lg
            shadow-red-200 transition hover:-translate-y-0.5 hover:bg-red-700
            focus:outline-none focus:ring-2 focus:ring-red-400
            disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="isSaving"
            @click="remove"
          >
            <i
              class="text-lg"
              :class="isSaving
                ? 'ri-loader-4-line animate-spin'
                : 'ri-delete-bin-line'"
            ></i>
            {{ isSaving ? 'Deleting…' : 'Delete permanently' }}
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
import SearchBar from '~/components/SearchBar'
import aosMixin from '@/mixins/aos';
import Tiptap from '~/components/Wysiwyg/Tiptap'
import formattedDate from '~/mixins/utilities/formattedDate'

const toNumber = (str) => +str;
export default {
  buildModules: [ '@nuxtjs/moment' ],
  components: {
    BasePagination,
    SearchBar,
    Tiptap,
  },
  mixins: [
    aosMixin,
    formattedDate,
  ],
  data() {
    return {
      valid: true,
      query: null,
      rules: [ value => !!value || 'Required' ],
      faq: {
        title: '',
        description: '<p></p>',
      },
      faqList: [],
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
      isFaqLoading: false,
      isSaving: false,
      editingNo: null,
      showAddFaqModal: false,
      showEditFaqModal: false,
      showRemoveFaqModal: false,
    };
  },
  watch: {
    query() {
      this.page = 1
      this.debouncedSearch();
    },
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
  },
  mounted() {
    this.debouncedSearch = debounce(this.retrieveFaq, 800);
    this.retrieveFaq();
  },
  methods: {
    validate(type) {
      const plainDescription = (this.faq.description || '')
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim()

      if (!this.$refs.form.validate()) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Fill out all required fields',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else if (!plainDescription) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Fill out faq description',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else if (type === 'Add') {
        this.create()
        return true;
      } else if (type === 'Edit') {
        this.edit()
        return true;
      } else {
        return false;
      }
    },
    addFaq() {
      this.reset()
      this.showAddFaqModal = true;
    },
    closeEditor() {
      this.reset()
      this.showAddFaqModal = false;
      this.showEditFaqModal = false;
    },
    closeRemove() {
      this.reset()
      this.editingNo = null
      this.showRemoveFaqModal = false;
    },
    retrieveFaq() {
      this.isFaqLoading = true;

      const query = {
        q: this.query,
        page: this.page,
        maxFaqPerPage: 10,
      };

      // Sanitize and remove null values
      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })
      const queryString = new URLSearchParams(query).toString()
      this.$axios
        .$get(`v1/faq?${queryString}`)
        .then((response) => {
          this.faqList = response.data.faq
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.message || 'Unable to load frequently asked questions',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
        .finally(() => {
          this.isFaqLoading = false;
        });
    },
    setPage(page) {
      if (page !== this.page) {
        this.page = page
        this.retrieveFaq()
      }
    },
    create() {
      this.isSaving = true
      const faq = {
        title: this.faq.title,
        description: this.faq.description,
      };
      const form = new FormData();
      form.append('title', faq.title)
      form.append('description', faq.description);

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$axios
        .$post('/v1/faq', form, config)
        .then((response) => {
          this.showAddFaqModal = false;
          this.$oruga.notification.open({
            message: response.title,
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.retrieveFaq();
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.message,
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
        .finally(() => {
          this.isSaving = false
        });
    },
    editFaq(index) {
      this.editingNo = toNumber(index);
      this.$axios
        .$get(`v1/faq/${this.editingNo}`)
        .then((response) => {
          this.faq.title = response.data.faq.title;
          this.faq.description = response.data.faq.description;
          this.showEditFaqModal = true;
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
    edit() {
      this.isSaving = true
      const editedFaq = {
        title: this.faq.title,
        description: this.faq.description
      };
      const form = new FormData();
      form.append('title', editedFaq.title);
      form.append('description', editedFaq.description);

      this.$axios
        .$post(`v1/faq/${this.editingNo}`, form)
        .then((response) => {
          this.showEditFaqModal = false;
          this.$oruga.notification.open({
            message: response.title,
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.editingNo = '';
          this.reset();
          this.retrieveFaq();
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.message,
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
        .finally(() => {
          this.isSaving = false
        });
    },
    removeFaq(faqItem) {
      this.editingNo = toNumber(faqItem.id);
      this.faq.title = faqItem.title
      this.showRemoveFaqModal = true;
    },
    remove() {
      this.isSaving = true
      this.$axios
        .$delete(`/v1/faq/${this.editingNo}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: response.title,
            position: 'bottom',
            variant: 'success',
            queue: true,
          });
          this.retrieveFaq();
          this.closeRemove()
        })
        .catch(() => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Failed to remove item',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
        .finally(() => {
          this.isSaving = false
        });
    },
    reset() {
      this.faq = {
        title: '',
        description: '<p></p>',
      }
    },
  },
};

</script>

<style scoped>
.faq-answer {
  max-height: 12rem;
  overflow: hidden;
  position: relative;
}

.faq-answer::after {
  background: linear-gradient(transparent, rgb(249 250 251));
  bottom: 0;
  content: '';
  height: 2.5rem;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
}

.faq-answer ::v-deep p:last-child {
  margin-bottom: 0;
}

.faq-answer ::v-deep ul,
.faq-answer ::v-deep ol {
  margin: 0.5rem 0;
  padding-left: 1.25rem;
}

.faq-editor ::v-deep .ProseMirror {
  min-height: 17rem;
  padding: 0.5rem;
}

.faq-editor ::v-deep > div {
  border: 0;
}

::v-deep .v-text-field.v-text-field--solo .v-input__slot {
  border: 1px solid rgb(209 213 219);
  border-radius: 0.75rem;
  box-shadow: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

::v-deep .v-text-field.v-text-field--solo.v-input--is-focused .v-input__slot {
  border-color: #5ee738;
  box-shadow: 0 0 0 4px rgb(94 231 56 / 0.15);
}
</style>
