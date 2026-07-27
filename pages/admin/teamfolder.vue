<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#111712]
    via-[#1A1A1B] to-[#0d120e]"
  >
    <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black shadow-md">
      <BreadCrumbs title="Team Folder Setting"/>
    </BaseHeader>

    <main class="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <section
        class="relative mb-7 overflow-hidden rounded-3xl border
        border-white/10 bg-gradient-to-br from-[#28382c] via-brand-black
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
              <i class="ri-folder-shield-2-line text-3xl"></i>
            </div>
            <div>
              <div
                class="mb-4 inline-flex items-center gap-2 rounded-full
                border border-brand-green/20 bg-brand-green/10 px-3 py-1.5
                text-xs font-bold uppercase tracking-widest text-green-300"
              >
                <span class="h-2 w-2 animate-pulse rounded-full bg-brand-green"></span>
                Team resources
              </div>
              <h1 class="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Give every team one reliable starting point
              </h1>
              <p class="mt-3 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
                Maintain the central guidance, links, and resources teams need
                throughout the season.
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
            @click="openEditContentDialog"
          >
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full
              bg-brand-black/10 transition group-hover:rotate-12"
            >
              <i
                class="text-xl"
                :class="hasContent ? 'ri-edit-line' : 'ri-add-line'"
              ></i>
            </span>
            {{ hasContent ? 'Edit team folder' : 'Create team folder' }}
          </button>
        </div>
      </section>

      <section
        class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
        aria-label="Team folder overview"
      >
        <article
          class="rounded-2xl border border-gray-200 bg-white p-5
          shadow-xl shadow-black/10"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl"
              :class="hasContent
                ? 'bg-green-50 text-green-700'
                : 'bg-amber-50 text-amber-700'"
            >
              <i
                class="text-2xl"
                :class="hasContent
                  ? 'ri-checkbox-circle-line'
                  : 'ri-draft-line'"
              ></i>
            </div>
            <div>
              <p class="text-lg font-black text-gray-900">
                {{ hasContent ? 'Ready' : 'Not created' }}
              </p>
              <p class="text-xs font-bold uppercase tracking-wider text-gray-500">
                Content status
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
              <i class="ri-text-spacing text-2xl"></i>
            </div>
            <div>
              <p class="text-2xl font-black text-gray-900">{{ wordCount }}</p>
              <p class="text-xs font-bold uppercase tracking-wider text-gray-500">
                Words
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
              <i class="ri-time-line text-2xl"></i>
            </div>
            <div>
              <p class="text-2xl font-black text-gray-900">
                {{ estimatedReadTime }}
              </p>
              <p class="text-xs font-bold uppercase tracking-wider text-gray-500">
                Minute read
              </p>
            </div>
          </div>
        </article>
      </section>

      <section
        v-if="isLoading"
        class="animate-pulse rounded-3xl border border-white/10 bg-white/10 p-8"
        aria-label="Loading team folder"
      >
        <div class="mb-7 h-8 w-2/3 rounded bg-white/20"></div>
        <div class="space-y-4">
          <div class="h-3 w-full rounded bg-white/10"></div>
          <div class="h-3 w-11/12 rounded bg-white/10"></div>
          <div class="h-3 w-4/5 rounded bg-white/10"></div>
        </div>
      </section>

      <div
        v-else-if="hasContent"
        class="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <article
          class="overflow-hidden rounded-3xl border border-gray-200 bg-white
          shadow-2xl shadow-black/20 lg:col-span-2"
          data-aos="fade-up"
        >
          <header
            class="relative overflow-hidden border-b border-gray-200
            bg-gradient-to-r from-gray-50 to-green-50 px-6 py-7 sm:px-8"
          >
            <div
              class="absolute -right-8 -top-10 h-32 w-32 rounded-full
              border-[20px] border-green-100"
            ></div>
            <div class="relative flex items-start gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center
                rounded-2xl bg-brand-green text-brand-black shadow-lg"
              >
                <i class="ri-folder-open-line text-2xl"></i>
              </div>
              <div>
                <p
                  class="text-xs font-bold uppercase tracking-widest text-green-700"
                >
                  Team folder preview
                </p>
                <h2
                  class="mt-2 text-3xl font-black leading-tight text-gray-900
                  sm:text-4xl"
                >
                  {{ contentData.title }}
                </h2>
              </div>
            </div>
          </header>

          <div class="p-6 sm:p-8">
            <div
              class="team-folder-content prose max-w-none text-gray-700
              prose-a:text-green-700 prose-strong:text-gray-900
              prose-img:max-w-full prose-img:rounded-2xl"
              v-html="contentData.content"
            ></div>
          </div>

          <footer
            class="flex flex-col gap-3 border-t border-gray-100 bg-gray-50
            px-6 py-4 text-xs text-gray-500 sm:flex-row sm:items-center
            sm:justify-between sm:px-8"
          >
            <span class="flex items-center gap-2">
              <i class="ri-eye-line text-base text-green-600"></i>
              This preview reflects the current saved content.
            </span>
            <button
              type="button"
              class="inline-flex items-center gap-2 font-bold text-green-700
              transition hover:text-green-900 focus:outline-none
              focus:ring-2 focus:ring-green-300"
              @click="openEditContentDialog"
            >
              <i class="ri-edit-line text-base"></i>
              Edit content
            </button>
          </footer>
        </article>

        <aside class="space-y-6">
          <section
            class="overflow-hidden rounded-3xl border border-white/10
            bg-gradient-to-br from-[#29312b] to-brand-black p-6 text-white
            shadow-2xl shadow-black/20"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl
              bg-brand-green text-brand-black"
            >
              <i class="ri-team-line text-2xl"></i>
            </div>
            <h3 class="mt-5 text-xl font-black">Built for team managers</h3>
            <p class="mt-2 text-sm leading-6 text-gray-300">
              Use this space for onboarding steps, season resources, contacts,
              deadlines, and links that every team should know.
            </p>
            <div class="mt-5 space-y-3 text-sm">
              <p class="flex items-center gap-2 text-gray-300">
                <i class="ri-check-line text-lg text-brand-green"></i>
                Keep essential links near the top
              </p>
              <p class="flex items-center gap-2 text-gray-300">
                <i class="ri-check-line text-lg text-brand-green"></i>
                Use headings to make sections scannable
              </p>
              <p class="flex items-center gap-2 text-gray-300">
                <i class="ri-check-line text-lg text-brand-green"></i>
                Review details before each season
              </p>
            </div>
          </section>

          <section
            class="rounded-3xl border border-gray-200 bg-white p-6
            shadow-xl shadow-black/10"
          >
            <div class="flex items-start gap-3">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl bg-amber-50 text-amber-600"
              >
                <i class="ri-lightbulb-flash-line text-xl"></i>
              </div>
              <div>
                <h3 class="font-black text-gray-900">Content tip</h3>
                <p class="mt-2 text-sm leading-6 text-gray-500">
                  Put time-sensitive information first and remove expired links
                  to keep the folder dependable.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>

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
          <i class="ri-folder-add-line text-4xl"></i>
        </div>
        <h2 class="mt-5 text-2xl font-black text-gray-900">
          Create your team folder
        </h2>
        <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
          Give teams one organized place for important guidance, documents,
          contact details, and season resources.
        </p>
        <button
          type="button"
          class="mt-6 inline-flex min-h-[48px] items-center justify-center
          gap-2 rounded-xl bg-green-600 px-6 font-bold text-white transition
          hover:-translate-y-0.5 hover:bg-green-700 focus:outline-none
          focus:ring-2 focus:ring-brand-green"
          @click="openEditContentDialog"
        >
          <span class="text-gray-50">
            <i class="ri-add-circle-line text-xl"></i>
            Add team folder
          </span>
        </button>
      </section>
    </main>

    <OModal
      :active="showEditContentModal"
      :width="960"
      @close="closeEditContentDialog"
    >
      <div
        class="mx-auto flex w-full max-w-4xl flex-col overflow-hidden
        rounded-3xl bg-white shadow-2xl"
        style="max-height: 90vh"
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-folder-editor-title"
      >
        <header
          class="relative shrink-0 overflow-hidden bg-gradient-to-br
          from-[#28382c] via-brand-black to-green-900 p-5 text-white sm:p-7"
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
                  :class="hasContent ? 'ri-folder-settings-line' : 'ri-folder-add-line'"
                ></i>
              </div>
              <div>
                <p
                  class="mb-1 text-xs font-bold uppercase tracking-widest
                  text-green-300"
                >
                  Team folder editor
                </p>
                <h2 id="team-folder-editor-title" class="text-2xl font-black">
                  {{ hasContent ? 'Update team resources' : 'Create team resources' }}
                </h2>
                <p class="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                  Organize the information teams need into a clear, useful page.
                </p>
              </div>
            </div>
            <button
              type="button"
              class="flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-white/10 text-white transition hover:rotate-90
              hover:bg-white/20 focus:outline-none focus:ring-2
              focus:ring-brand-green"
              aria-label="Close team folder editor"
              @click="closeEditContentDialog"
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
                  <i class="ri-heading text-xl"></i>
                </div>
                <div>
                  <label for="team-folder-title" class="font-bold text-gray-900">
                    Page title <span class="text-red-500">*</span>
                  </label>
                  <p class="mt-1 text-sm text-gray-500">
                    Choose a title team managers will recognize immediately.
                  </p>
                </div>
              </div>
              <VTextField
                id="team-folder-title"
                v-model="formData.title"
                label="e.g. Team Manager Resource Hub"
                :rules="rules"
                maxlength="120"
                counter="120"
                type="text"
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
                  <i class="ri-file-list-3-line text-xl"></i>
                </div>
                <div>
                  <label for="content" class="font-bold text-gray-900">
                    Folder content <span class="text-red-500">*</span>
                  </label>
                  <p class="mt-1 text-sm text-gray-500">
                    Use headings and lists to keep longer resources easy to navigate.
                  </p>
                </div>
              </div>
              <div
                class="team-folder-editor overflow-hidden rounded-2xl border-2
                border-gray-200 transition focus-within:border-brand-green
                focus-within:ring-4 focus-within:ring-green-100"
              >
                <Tiptap
                  id="content"
                  v-model="formData.content"
                />
              </div>
            </section>

            <div
              class="flex items-start gap-3 rounded-2xl border border-blue-100
              bg-blue-50 p-4 text-sm leading-6 text-blue-800"
            >
              <i class="ri-information-line mt-0.5 text-xl text-blue-600"></i>
              <p>
                Changes become visible after saving. Canceling will preserve
                the current published team folder.
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
              @click="closeEditContentDialog"
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
              @click="validate"
            >
              <i
                class="text-lg"
                :class="isSaving
                  ? 'ri-loader-4-line animate-spin'
                  : 'ri-save-3-line'"
              ></i>
              {{ isSaving ? 'Saving…' : 'Save team folder' }}
            </button>
          </footer>
        </VForm>
      </div>
    </OModal>
  </div>
</template>

<script>
import Tiptap from '~/components/Wysiwyg/Tiptap'

export default {
  components: { Tiptap },
  data() {
    return {
      valid: true,
      isLoading: true,
      isSaving: false,
      showEditContentModal: false,
      rules: [ value => !!value || 'Required' ],
      contentData: {
        title: '',
        content: '<p></p>'
      },
      formData: {
        title: '',
        content: '<p></p>'
      },
    };
  },
  computed: {
    plainTextContent() {
      return (this.contentData.content || '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    },
    hasContent() {
      return Boolean(
        (this.contentData.title || '').trim() && this.plainTextContent
      )
    },
    wordCount() {
      return this.plainTextContent
        ? this.plainTextContent.split(/\s+/).length
        : 0
    },
    estimatedReadTime() {
      return this.wordCount ? Math.max(1, Math.ceil(this.wordCount / 200)) : 0
    },
  },
  mounted() {
    this.retrieveTeamFolder()
  },
  methods: {
    validate() {
      const plainContent = (this.formData.content || '')
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
          message: 'Add team folder content before saving',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else {
        this.updateTeamFolder()
        return true;
      }
    },
    openEditContentDialog() {
      this.formData = {
        title: this.contentData.title || '',
        content: this.contentData.content || '<p></p>',
      }
      this.showEditContentModal = true
    },
    closeEditContentDialog() {
      this.formData = {
        title: this.contentData.title || '',
        content: this.contentData.content || '<p></p>',
      }
      this.showEditContentModal = false
    },
    updateTeamFolder() {
      this.isSaving = true
      const form = new FormData();
      form.append('title', this.formData.title)
      form.append('content', this.formData.content)

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$axios
        .$post(`v1/teamfolder/update/${1}`, form, config)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Team Folder Updated',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.showEditContentModal= false
          this.retrieveTeamFolder();
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
    retrieveTeamFolder() {
      this.isLoading = true
      const id = 1;
      this.$axios
        .$get(`v1/teamfolder/${id}`)
        .then((response) => {
          const teamFolder = response.data.teamFolder || {}
          this.contentData = {
            title: teamFolder.title || '',
            content: teamFolder.content || '<p></p>',
          }
          this.formData = { ...this.contentData }
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.message || 'Unable to load the team folder',
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
.team-folder-content ::v-deep > :first-child {
  margin-top: 0;
}

.team-folder-content ::v-deep > :last-child {
  margin-bottom: 0;
}

.team-folder-content ::v-deep ul,
.team-folder-content ::v-deep ol {
  padding-left: 1.5rem;
}

.team-folder-editor ::v-deep .ProseMirror {
  min-height: 19rem;
  padding: 0.5rem;
}

.team-folder-editor ::v-deep > div {
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
