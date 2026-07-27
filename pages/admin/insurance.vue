<!-- eslint-disable max-len -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#0f1714]
    via-[#1A1A1B] to-[#0c1413]"
  >
    <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black shadow-md">
      <BreadCrumbs title="Insurance Setting"/>
    </BaseHeader>

    <main class="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <section
        class="relative mb-7 overflow-hidden rounded-3xl border
        border-white/10 bg-gradient-to-br from-[#263a35] via-brand-black
        to-teal-900 p-6 shadow-2xl shadow-black/30 sm:p-8"
        data-aos="fade-up"
      >
        <div
          class="absolute -right-14 -top-20 h-64 w-64 rounded-full
          border-[36px] border-emerald-300/10"
        ></div>
        <div
          class="absolute -bottom-24 right-40 h-56 w-56 rounded-full
          bg-cyan-300/10 blur-3xl"
        ></div>

        <div
          class="relative flex flex-col gap-8 lg:flex-row
          lg:items-end lg:justify-between"
        >
          <div class="flex max-w-2xl items-start gap-5">
            <div
              class="hidden h-16 w-16 shrink-0 items-center justify-center
              rounded-3xl bg-gradient-to-br from-brand-green to-emerald-400
              text-brand-black shadow-xl sm:flex"
            >
              <i class="ri-shield-check-line text-3xl"></i>
            </div>
            <div>
              <div
                class="mb-4 inline-flex items-center gap-2 rounded-full
                border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5
                text-xs font-bold uppercase tracking-widest text-emerald-200"
              >
                <span class="h-2 w-2 animate-pulse rounded-full bg-brand-green"></span>
                Protection information
              </div>
              <h1 class="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Make coverage clear and reassuring
              </h1>
              <p class="mt-3 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
                Manage the insurance information members need before they
                register, compete, or attend an event.
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
            @click="openAddContentDialog"
          >
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full
              bg-brand-black/10 transition group-hover:rotate-90"
            >
              <i class="ri-add-line text-xl"></i>
            </span>
            Add insurance policy
          </button>
        </div>
      </section>

      <section
        class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
        aria-label="Insurance overview"
      >
        <article
          class="rounded-2xl border border-gray-200 bg-white p-5
          shadow-xl shadow-black/10"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl
              bg-emerald-50 text-emerald-700"
            >
              <i class="ri-file-shield-2-line text-2xl"></i>
            </div>
            <div>
              <p class="text-2xl font-black text-gray-900">{{ totalItems }}</p>
              <p class="text-xs font-bold uppercase tracking-wider text-gray-500">
                Policy records
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
              bg-cyan-50 text-cyan-700"
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
              class="flex h-12 w-12 items-center justify-center rounded-2xl"
              :class="hasActivePolicy
                ? 'bg-green-50 text-green-700'
                : 'bg-amber-50 text-amber-700'"
            >
              <i
                class="text-2xl"
                :class="hasActivePolicy
                  ? 'ri-shield-check-line'
                  : 'ri-shield-cross-line'"
              ></i>
            </div>
            <div>
              <p class="text-lg font-black text-gray-900">
                {{ hasActivePolicy ? 'Protected' : 'Needs review' }}
              </p>
              <p class="text-xs font-bold uppercase tracking-wider text-gray-500">
                Current page status
              </p>
            </div>
          </div>
        </article>
      </section>

      <section
        v-if="totalPages > 0"
        class="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200
        bg-white px-5 py-4 shadow-xl shadow-black/10 sm:flex-row
        sm:items-center sm:justify-between"
        data-aos="fade-up"
      >
        <div class="flex items-center gap-3 text-sm text-gray-600">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
            bg-emerald-50 text-emerald-700"
          >
            <i class="ri-information-line text-lg"></i>
          </div>
          <span>
            Showing <strong class="text-gray-900">{{ from }}</strong>–
            <strong class="text-gray-900">{{ to }}</strong> of
            <strong class="text-gray-900">{{ totalItems }}</strong> policies
          </span>
        </div>
        <BasePagination
          :active-page="page"
          :total-pages="totalPages"
          @change="setPage"
        />
      </section>

      <section v-if="isLoading" class="space-y-4" aria-label="Loading policies">
        <div
          v-for="placeholder in 3"
          :key="placeholder"
          class="animate-pulse rounded-3xl border border-white/10 bg-white/10 p-6"
        >
          <div class="mb-5 h-6 w-44 rounded bg-white/20"></div>
          <div class="space-y-3">
            <div class="h-3 w-full rounded bg-white/10"></div>
            <div class="h-3 w-4/5 rounded bg-white/10"></div>
          </div>
        </div>
      </section>

      <section v-else-if="ContentList.length" class="space-y-5">
        <article
          v-for="(content, index) in ContentList"
          :key="content.id"
          class="group relative overflow-hidden rounded-3xl border bg-white
          p-5 shadow-xl shadow-black/15 transition duration-300
          hover:-translate-y-0.5 hover:shadow-2xl sm:p-7"
          :class="content.isActive
            ? 'border-emerald-300'
            : 'border-gray-200 hover:border-emerald-200'"
          data-aos="fade-up"
          data-aos-offset="0"
        >
          <div
            class="absolute inset-y-0 left-0 w-1.5 transition-all"
            :class="content.isActive
              ? 'bg-gradient-to-b from-brand-green to-emerald-500'
              : 'bg-gray-200 group-hover:bg-emerald-300'"
          ></div>
          <div
            class="absolute -right-10 -top-10 h-32 w-32 rounded-full
            bg-emerald-50 transition group-hover:scale-125"
          ></div>

          <div class="relative">
            <header
              class="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start
              sm:justify-between"
            >
              <div class="flex items-start gap-4">
                <div
                  class="flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-2xl"
                  :class="content.isActive
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-500'"
                >
                  <i class="ri-shield-star-line text-2xl"></i>
                </div>
                <div>
                  <div class="flex flex-wrap items-center gap-2">
                    <h2 class="text-xl font-black text-gray-900">
                      Insurance policy {{ (page - 1) * perPage + index + 1 }}
                    </h2>
                    <span
                      v-if="content.isActive"
                      class="inline-flex items-center gap-1.5 rounded-full
                      bg-green-50 px-3 py-1 text-xs font-bold uppercase
                      tracking-wide text-green-700"
                    >
                      <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></span>
                      Published
                    </span>
                    <span
                      v-else
                      class="rounded-full bg-gray-100 px-3 py-1 text-xs
                      font-bold uppercase tracking-wide text-gray-500"
                    >
                      Draft
                    </span>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">
                    Policy record #{{ content.id }}
                  </p>
                </div>
              </div>

              <button
                v-if="!content.isActive"
                type="button"
                class="inline-flex min-h-[42px] items-center justify-center
                gap-2 rounded-xl border border-gray-300 bg-gray-50 px-4
                text-sm font-bold text-gray-700 transition
                hover:border-emerald-300 hover:bg-emerald-50
                hover:text-emerald-700 focus:outline-none focus:ring-2
                focus:ring-emerald-300"
                @click="setActive(content.id)"
              >
                <i class="ri-send-plane-line text-lg"></i>
                Publish policy
              </button>
              <button
                v-else
                type="button"
                class="inline-flex min-h-[42px] items-center justify-center
                gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4
                text-sm font-bold text-amber-700 transition hover:bg-amber-100
                focus:outline-none focus:ring-2 focus:ring-amber-300"
                @click="deactivate(content.id)"
              >
                <i class="ri-eye-off-line text-lg"></i>
                Unpublish
              </button>
            </header>

            <div
              class="policy-preview mb-6 rounded-2xl border border-emerald-100
              bg-gradient-to-br from-gray-50 to-emerald-50/50 p-5 text-sm
              leading-7 text-gray-600 sm:p-6"
              v-html="content.content"
            ></div>

            <footer
              class="flex flex-col gap-3 border-t border-gray-100 pt-5
              sm:flex-row sm:items-center sm:justify-between"
            >
              <p class="flex items-center gap-2 text-xs text-gray-400">
                <i class="ri-lock-2-line text-base text-emerald-600"></i>
                Review coverage language whenever policy terms change.
              </p>
              <div class="flex gap-2">
                <button
                  type="button"
                  class="inline-flex min-h-[42px] flex-1 items-center
                  justify-center gap-2 rounded-xl border border-emerald-200
                  bg-emerald-50 px-4 text-sm font-bold text-emerald-700
                  transition hover:bg-emerald-600 hover:text-white
                  focus:outline-none focus:ring-2 focus:ring-emerald-300
                  sm:flex-none"
                  @click="openEditContentDialog(content)"
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
                  @click="openDeleteContentDialog(content)"
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
        border-emerald-300 bg-white p-8 text-center shadow-xl shadow-black/10
        sm:p-14"
      >
        <div
          class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r
          from-brand-green to-emerald-500"
        ></div>
        <div
          class="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl
          bg-emerald-50 text-emerald-600"
        >
          <i class="ri-shield-plus-line text-4xl"></i>
        </div>
        <h2 class="mt-5 text-2xl font-black text-gray-900">
          Add your insurance information
        </h2>
        <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
          Give members a reliable place to understand coverage, limitations,
          and important steps before taking part.
        </p>
        <button
          type="button"
          class="mt-6 inline-flex min-h-[48px] items-center justify-center
          gap-2 rounded-xl bg-green-600 px-6 font-bold text-white transition
          hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none
          focus:ring-2 focus:ring-brand-green"
          @click="openAddContentDialog"
        >
        <span class="text-gray-50">
          <i class="ri-add-circle-line text-xl"></i>
          Create first policy
        </span>
        </button>
      </section>
    </main>

    <OModal
      :active="showAddContentModal || showEditContentModal"
      :width="960"
      @close="closeEditorDialog"
    >
      <div
        class="mx-auto flex w-full max-w-4xl flex-col overflow-hidden
        rounded-3xl bg-white shadow-2xl"
        style="max-height: 90vh"
        role="dialog"
        aria-modal="true"
        aria-labelledby="insurance-editor-title"
      >
        <header
          class="relative shrink-0 overflow-hidden bg-gradient-to-br
          from-[#263a35] via-brand-black to-teal-900 p-5 text-white sm:p-7"
        >
          <div
            class="absolute -right-12 -top-16 h-44 w-44 rounded-full
            border-[28px] border-emerald-300/10"
          ></div>
          <div class="relative flex items-start justify-between gap-4">
            <div class="flex items-start gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center
                rounded-2xl bg-brand-green text-brand-black"
              >
                <i
                  class="text-2xl"
                  :class="showEditContentModal
                    ? 'ri-shield-keyhole-line'
                    : 'ri-shield-plus-line'"
                ></i>
              </div>
              <div>
                <p
                  class="mb-1 text-xs font-bold uppercase tracking-widest
                  text-emerald-200"
                >
                  Policy editor
                </p>
                <h2 id="insurance-editor-title" class="text-2xl font-black">
                  {{ showEditContentModal ? 'Update policy details' : 'Add insurance policy' }}
                </h2>
                <p class="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                  {{ showEditContentModal
                    ? 'Keep coverage details accurate, current, and easy to understand.'
                    : 'Create a trustworthy summary of coverage and important limitations.' }}
                </p>
              </div>
            </div>
            <button
              type="button"
              class="flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-white/10 text-white transition hover:rotate-90
              hover:bg-white/20 focus:outline-none focus:ring-2
              focus:ring-brand-green"
              aria-label="Close policy editor"
              @click="closeEditorDialog"
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
          <div class="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
            <section
              class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div class="mb-4 flex items-start gap-3">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-xl bg-emerald-50 text-emerald-700"
                >
                  <i class="ri-file-text-line text-xl"></i>
                </div>
                <div>
                  <label for="content" class="font-bold text-gray-900">
                    Policy information <span class="text-red-500">*</span>
                  </label>
                  <p class="mt-1 text-sm text-gray-500">
                    Explain coverage, exclusions, and next steps in plain language.
                  </p>
                </div>
              </div>
              <div
                class="policy-editor overflow-hidden rounded-2xl border-2
                border-gray-200 transition focus-within:border-emerald-500
                focus-within:ring-4 focus-within:ring-emerald-100"
              >
                <Tiptap
                  id="content"
                  v-model="contentData.content"
                />
              </div>
            </section>

            <div
              class="mt-4 flex items-start gap-3 rounded-2xl border
              border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-800"
            >
              <i class="ri-information-line mt-0.5 text-xl text-blue-600"></i>
              <p>
                Include contact details and explain how members can request
                complete policy documents or make a claim.
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
              @click="closeEditorDialog"
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
              :disabled="!valid"
              @click="validate(showEditContentModal ? 'Edit' : 'Add')"
            >
              <i
                class="text-lg"
                :class="showEditContentModal
                  ? 'ri-save-3-line'
                  : 'ri-add-circle-line'"
              ></i>
              {{ showEditContentModal ? 'Save changes' : 'Add policy' }}
            </button>
          </footer>
        </VForm>
      </div>
    </OModal>

    <OModal
      :active="showDeleteContentModal"
      :width="520"
      @close="closeDeleteContentDialog"
    >
      <div
        class="mx-auto w-full max-w-lg overflow-hidden rounded-3xl
        bg-white shadow-2xl"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-policy-title"
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
                <i class="ri-shield-cross-line text-2xl"></i>
              </div>
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-red-100">
                  Permanent action
                </p>
                <h2 id="delete-policy-title" class="text-xl font-black">
                  Delete insurance policy?
                </h2>
              </div>
            </div>
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-full
              bg-white/10 transition hover:bg-white/20 focus:outline-none
              focus:ring-2 focus:ring-white"
              aria-label="Close delete policy dialog"
              @click="closeDeleteContentDialog"
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
            <i class="ri-error-warning-line text-4xl"></i>
          </div>
          <h3 class="mt-5 text-xl font-black text-gray-900">
            This cannot be undone
          </h3>
          <p class="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
            The policy record will be permanently removed. If it is published,
            members may lose access to this information immediately.
          </p>
          <div
            class="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3
            text-left text-sm font-semibold text-red-800"
          >
            <i class="ri-file-warning-line mr-2"></i>
            Policy record #{{ contentData.id || '—' }}
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
            @click="closeDeleteContentDialog"
          >
            Keep policy
          </button>
          <button
            type="button"
            class="inline-flex min-h-[46px] items-center justify-center gap-2
            rounded-xl bg-red-600 px-5 font-bold text-white shadow-lg
            shadow-red-200 transition hover:-translate-y-0.5 hover:bg-red-700
            focus:outline-none focus:ring-2 focus:ring-red-400"
            @click="DeleteContent"
          >
            <i class="ri-delete-bin-line text-lg"></i>
            Delete permanently
          </button>
        </footer>
      </div>
    </OModal>
  </div>
</template>

<script>
import Tiptap from '~/components/Wysiwyg/Tiptap'

export default {
  components: {
    Tiptap,
  },
  data() {
    return {
      valid: true,
      isLoading: true,
      showAddContentModal: false,
      showEditContentModal: false,
      showDeleteContentModal: false,
      contentData: { content: '<p></p>' },
      ContentList: [],
      query: '',
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
    };
  },
  computed: {
    hasActivePolicy() {
      return this.ContentList.some(content => content.isActive)
    },
  },
  watch: {
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
    page: {
      handler(newPage) {
        this.retrieveGuidelines()
      },
      immediate: true,
    },
  },
  methods: {
    validate(type) {
      const plainContent = (this.contentData.content || '')
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
      } else if (!plainContent) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Add policy information before saving',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else if (type === 'Add') {
        this.AddContent()
        return true;
      } else if (type === 'Edit') {
        this.UpdateContent()
        return true;
      } else {
        return false;
      }
    },
    setPage(newPage) {
      if (newPage !== this.page) {
        this.page = newPage
      }
    },
    openAddContentDialog() {
      this.reset()
      this.showAddContentModal = true
    },
    openEditContentDialog(data) {
      this.contentData = { ...data }
      this.showEditContentModal = true
    },
    openDeleteContentDialog(data) {
      this.contentData = { ...data }
      this.showDeleteContentModal = true
    },
    closeAddContentDialog() {
      this.reset()
      this.showAddContentModal = false
    },
    closeEditContentDialog() {
      this.reset()
      this.showEditContentModal = false
    },
    closeEditorDialog() {
      this.reset()
      this.showAddContentModal = false
      this.showEditContentModal = false
    },
    closeDeleteContentDialog() {
      this.reset()
      this.showDeleteContentModal = false
    },
    setActive(id) {
      this.$axios
        .$post(`v1/guidelines/active/${id}`)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Insurance policy published',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.retrieveGuidelines();
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
    deactivate(id) {
      this.$axios
        .$post(`v1/guidelines/deactivate/${id}`)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Insurance policy unpublished',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.retrieveGuidelines();
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
    AddContent() {
      const form = new FormData();
      form.append('type', 'Insurance')
      form.append('content', this.contentData.content)

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$axios
        .$post('/v1/guidelines', form, config)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Insurance policy added',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.showAddContentModal= false
          this.retrieveGuidelines();
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
    UpdateContent(data) {
      const form = new FormData();
      form.append('type', 'Insurance')
      form.append('content', this.contentData.content)

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$axios
        .$post(`v1/guidelines/${this.contentData.id}`, form, config)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Insurance policy updated',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.showEditContentModal= false
          this.retrieveGuidelines();
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
    DeleteContent(data) {
      this.$axios
        .$delete(`/v1/guidelines/${this.contentData.id}`)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Insurance policy deleted',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.showDeleteContentModal= false
          this.retrieveGuidelines();
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
    reset() {
      this.contentData = { content: '<p></p>' }
    },
    retrieveGuidelines() {
      this.isLoading = true
      const query = {
        q: this.query,
        page: this.page,
        type: 'Insurance',
        maxContentPerPage: this.perPage,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/guidelines?${queryString}`)
        .then((response) => {
          this.ContentList = response.data.guidelines;
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.message || 'Unable to load insurance policies',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  }
};
</script>

<style scoped>
.policy-preview {
  max-height: 12rem;
  overflow: hidden;
  position: relative;
}

.policy-preview::after {
  background: linear-gradient(transparent, rgb(246 253 250));
  bottom: 0;
  content: '';
  height: 2.5rem;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
}

.policy-preview ::v-deep p:last-child {
  margin-bottom: 0;
}

.policy-preview ::v-deep ul,
.policy-preview ::v-deep ol {
  margin: 0.5rem 0;
  padding-left: 1.25rem;
}

.policy-editor ::v-deep .ProseMirror {
  min-height: 17rem;
  padding: 0.5rem;
}

.policy-editor ::v-deep > div {
  border: 0;
}
</style>
