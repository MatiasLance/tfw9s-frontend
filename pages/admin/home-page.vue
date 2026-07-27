<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#111712]
    via-[#1A1A1B] to-[#0d120e]"
  >
    <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black shadow-md">
      <BreadCrumbs title="Home Page Setting"/>
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
              <i class="ri-layout-2-line text-3xl"></i>
            </div>
            <div>
              <div
                class="mb-4 inline-flex items-center gap-2 rounded-full
                border border-brand-green/20 bg-brand-green/10 px-3 py-1.5
                text-xs font-bold uppercase tracking-widest text-green-300"
              >
                <span class="h-2 w-2 animate-pulse rounded-full bg-brand-green"></span>
                Homepage hero
              </div>
              <h1 class="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Make the first impression count
              </h1>
              <p class="mt-3 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
                Shape the opening message and featured image visitors see when
                they arrive at The Final Whistle.
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
              <i class="ri-edit-line text-xl"></i>
            </span>
            Edit homepage hero
          </button>
        </div>
      </section>

      <section
        class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
        aria-label="Homepage hero overview"
      >
        <article
          class="rounded-2xl border border-gray-200 bg-white p-5
          shadow-xl shadow-black/10"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl"
              :class="isHeroReady
                ? 'bg-green-50 text-green-700'
                : 'bg-amber-50 text-amber-700'"
            >
              <i
                class="text-2xl"
                :class="isHeroReady
                  ? 'ri-checkbox-circle-line'
                  : 'ri-error-warning-line'"
              ></i>
            </div>
            <div>
              <p class="text-lg font-black text-gray-900">
                {{ isHeroReady ? 'Ready' : 'Needs content' }}
              </p>
              <p class="text-xs font-bold uppercase tracking-wider text-gray-500">
                Hero status
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
                Message words
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
              <i class="ri-image-2-line text-2xl"></i>
            </div>
            <div>
              <p class="text-2xl font-black text-gray-900">{{ imageCount }}</p>
              <p class="text-xs font-bold uppercase tracking-wider text-gray-500">
                Hero images
              </p>
            </div>
          </div>
        </article>
      </section>

      <section
        v-if="isLoading"
        class="animate-pulse rounded-3xl border border-white/10 bg-white/10 p-8"
        aria-label="Loading homepage preview"
      >
        <div class="mb-7 h-8 w-56 rounded bg-white/20"></div>
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div class="space-y-4">
            <div class="h-4 w-3/4 rounded bg-white/10"></div>
            <div class="h-4 w-full rounded bg-white/10"></div>
            <div class="h-4 w-5/6 rounded bg-white/10"></div>
          </div>
          <div class="h-72 rounded-2xl bg-white/10"></div>
        </div>
      </section>

      <div
        v-else-if="isHeroReady"
        class="grid grid-cols-1 gap-6 lg:grid-cols-4"
      >
        <section
          class="overflow-hidden rounded-3xl border border-gray-700
          bg-brand-black shadow-2xl shadow-black/30 lg:col-span-3"
          data-aos="fade-up"
        >
          <header
            class="flex flex-col gap-3 border-b border-white/10 bg-[#242725]
            px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex items-center gap-3">
              <div class="flex gap-1.5" aria-hidden="true">
                <span class="h-3 w-3 rounded-full bg-red-400"></span>
                <span class="h-3 w-3 rounded-full bg-amber-400"></span>
                <span class="h-3 w-3 rounded-full bg-green-400"></span>
              </div>
              <p class="text-sm font-bold text-white">Homepage hero preview</p>
            </div>
            <span
              class="inline-flex items-center gap-2 rounded-full bg-green-400/10
              px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-300"
            >
              <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green"></span>
              Saved version
            </span>
          </header>

          <div class="homepage-preview overflow-hidden bg-[#111712]">
            <HeroSection
              :blurb="contentData.content"
              :image="contentData.image"
              :is-admin="true"
            />
          </div>

          <footer
            class="flex flex-col gap-3 border-t border-white/10 bg-[#242725]
            px-5 py-4 text-xs text-gray-400 sm:flex-row sm:items-center
            sm:justify-between"
          >
            <span class="flex items-center gap-2">
              <i class="ri-device-line text-base text-brand-green"></i>
              Preview the saved hero across screen sizes before publishing updates.
            </span>
            <button
              type="button"
              class="inline-flex items-center gap-2 font-bold text-green-300
              transition hover:text-brand-green focus:outline-none
              focus:ring-2 focus:ring-brand-green"
              @click="openEditContentDialog"
            >
              <i class="ri-edit-line text-base"></i>
              Edit hero
            </button>
          </footer>
        </section>

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
              <i class="ri-magic-line text-2xl"></i>
            </div>
            <h2 class="mt-5 text-xl font-black">Hero checklist</h2>
            <div class="mt-5 space-y-4 text-sm">
              <p class="flex items-start gap-3 text-gray-300">
                <i class="ri-check-line mt-0.5 text-lg text-brand-green"></i>
                Lead with a clear benefit for visitors.
              </p>
              <p class="flex items-start gap-3 text-gray-300">
                <i class="ri-check-line mt-0.5 text-lg text-brand-green"></i>
                Keep the main message concise and scannable.
              </p>
              <p class="flex items-start gap-3 text-gray-300">
                <i class="ri-check-line mt-0.5 text-lg text-brand-green"></i>
                Choose an image with a strong, readable focal point.
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
                rounded-xl bg-blue-50 text-blue-600"
              >
                <i class="ri-information-line text-xl"></i>
              </div>
              <div>
                <h3 class="font-black text-gray-900">Preview note</h3>
                <p class="mt-2 text-sm leading-6 text-gray-500">
                  Navigation and visitor-only calls to action are hidden in
                  this admin preview.
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
          <i class="ri-layout-masonry-line text-4xl"></i>
        </div>
        <h2 class="mt-5 text-2xl font-black text-gray-900">
          Complete your homepage hero
        </h2>
        <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
          Add an engaging introduction and a featured image to create a strong
          first impression for visitors.
        </p>
        <button
          type="button"
          class="mt-6 inline-flex min-h-[48px] items-center justify-center
          gap-2 rounded-xl bg-brand-black px-6 font-bold text-white transition
          hover:-translate-y-0.5 hover:bg-green-700 focus:outline-none
          focus:ring-2 focus:ring-brand-green"
          @click="openEditContentDialog"
        >
          <i class="ri-edit-circle-line text-xl"></i>
          Complete hero content
        </button>
      </section>
    </main>

    <OModal
      :active="showEditContentModal"
      :width="1080"
      @close="closeEditContentDialog"
    >
      <div
        class="mx-auto flex w-full max-w-5xl flex-col overflow-hidden
        rounded-3xl bg-white shadow-2xl"
        style="max-height: 92vh"
        role="dialog"
        aria-modal="true"
        aria-labelledby="homepage-editor-title"
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
                <i class="ri-layout-2-line text-2xl"></i>
              </div>
              <div>
                <p
                  class="mb-1 text-xs font-bold uppercase tracking-widest
                  text-green-300"
                >
                  Homepage editor
                </p>
                <h2 id="homepage-editor-title" class="text-2xl font-black">
                  Refine your homepage hero
                </h2>
                <p class="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                  Pair a concise welcome message with an energetic featured image.
                </p>
              </div>
            </div>
            <button
              type="button"
              class="flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-white/10 text-white transition hover:rotate-90
              hover:bg-white/20 focus:outline-none focus:ring-2
              focus:ring-brand-green"
              aria-label="Close homepage editor"
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
                  <i class="ri-quill-pen-line text-xl"></i>
                </div>
                <div>
                  <label for="content" class="font-bold text-gray-900">
                    Hero message <span class="text-red-500">*</span>
                  </label>
                  <p class="mt-1 text-sm text-gray-500">
                    Lead with the most compelling reason to explore the site.
                  </p>
                </div>
              </div>
              <div
                class="homepage-editor overflow-hidden rounded-2xl border-2
                border-gray-200 transition focus-within:border-brand-green
                focus-within:ring-4 focus-within:ring-green-100"
              >
                <Tiptap
                  id="content"
                  v-model="formData.content"
                />
              </div>
            </section>

            <section
              class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div class="mb-4 flex items-start gap-3">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-xl bg-blue-50 text-blue-700"
                >
                  <i class="ri-image-edit-line text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900">Featured image</h3>
                  <p class="mt-1 text-sm text-gray-500">
                    Crop and prepare the image used beside the hero message.
                  </p>
                </div>
              </div>
              <div class="image-editor-shell overflow-hidden rounded-2xl">
                <ImageUpload
                  :key="imageEditorKey"
                  :imglistedit="imgListEdit"
                  :imgurledit="imgUrlEdit"
                  @update-image-edit="updateImageEdit"
                />
              </div>
            </section>

            <div
              class="flex items-start gap-3 rounded-2xl border border-blue-100
              bg-blue-50 p-4 text-sm leading-6 text-blue-800"
            >
              <i class="ri-information-line mt-0.5 text-xl text-blue-600"></i>
              <p>
                Changes appear in the homepage preview after saving. Canceling
                will preserve the currently saved message and image.
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
              {{ isSaving ? 'Saving…' : 'Save homepage hero' }}
            </button>
          </footer>
        </VForm>
      </div>
    </OModal>
  </div>
</template>

<script>
import Tiptap from '~/components/Wysiwyg/Tiptap'
import ImageUpload from '~/components/ImageUploadEditSolo'
import HeroSection from '~/components/HeroSection'

export default {
  components: {
    Tiptap,
    ImageUpload,
    HeroSection
  },
  data() {
    return {
      valid: true,
      isLoading: true,
      isSaving: false,
      showEditContentModal: false,
      imgListEdit: [],
      imgUrlEdit: [],
      imageEditorKey: 0,
      contentData: {
        image: [],
        content: '<p></p>'
      },
      formData: {
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
    wordCount() {
      return this.plainTextContent
        ? this.plainTextContent.split(/\s+/).length
        : 0
    },
    imageCount() {
      return Array.isArray(this.contentData.image)
        ? this.contentData.image.length
        : 0
    },
    isHeroReady() {
      return Boolean(this.plainTextContent && this.imageCount)
    },
  },
  mounted() {
    this.retrieveHomePageInfo()
  },
  methods: {
    updateImageEdit(image) {
      this.imgListEdit = [ ...image ]
    },
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
          message: 'Add a homepage message before saving',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else {
        this.updateHomePage()
        return true;
      }
    },
    openEditContentDialog() {
      this.formData = {
        content: this.contentData.content || '<p></p>',
      }
      this.prepareImageDraft()
      this.imageEditorKey += 1
      this.showEditContentModal = true
    },
    closeEditContentDialog() {
      this.formData = {
        content: this.contentData.content || '<p></p>',
      }
      this.prepareImageDraft()
      this.imageEditorKey += 1
      this.showEditContentModal = false
    },
    prepareImageDraft() {
      const media = Array.isArray(this.contentData.image)
        ? this.contentData.image
        : []

      this.imgUrlEdit = media.map(item =>
        `${this.$config.baseURL}/storage/${item.path}`
      )
      this.imgListEdit = media.map(item => item.hash)
    },
    updateHomePage() {
      this.isSaving = true
      const form = new FormData();
      form.append('content', this.formData.content)

      for (let i = 0; i < this.imgListEdit.length; i++) {
        form.append('photo[]', this.imgListEdit[i]);
      }

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$axios
        .$post(`v1/homepageinfo/update/${1}`, form, config)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Home Page Information Updated',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.showEditContentModal= false
          this.retrieveHomePageInfo();
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
    retrieveHomePageInfo() {
      this.isLoading = true
      const id = 1;

      this.$axios
        .$get(`v1/homepageinfo/${id}`)
        .then((response) => {
          const homepage = response.data.teamFolder || {}
          this.contentData = {
            content: homepage.blurb || '<p></p>',
            image: Array.isArray(homepage.media) ? homepage.media : [],
          }
          this.formData = {
            content: this.contentData.content,
          }
          this.prepareImageDraft()
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.message || 'Unable to load homepage information',
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
.homepage-preview ::v-deep > section {
  padding-bottom: 2rem;
  padding-top: 2rem;
}

.homepage-editor ::v-deep .ProseMirror {
  min-height: 16rem;
  padding: 0.5rem;
}

.homepage-editor ::v-deep > div {
  border: 0;
}

.image-editor-shell ::v-deep > div {
  grid-column: 1 / -1;
}

.image-editor-shell ::v-deep > div > div {
  box-shadow: none;
}

@media (max-width: 640px) {
  .image-editor-shell ::v-deep canvas {
    height: auto !important;
    max-width: 100%;
  }
}
</style>
