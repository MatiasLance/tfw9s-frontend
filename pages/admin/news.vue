<!-- eslint-disable max-len -->
<template>
    <div class="bg-[#1A1A1B] h-full">
      <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black shadow-md">
          <!-- Breadcrumbs and Title -->
          <BreadCrumbs title="News Setting"/>
      </BaseHeader>

      <div class="mx-auto max-w-screen-xl px-4 py-7">
        <div class="-mx-4 flex flex-wrap">
          <main class="w-full px-4">
            <div
              class="
              my-6 flex flex-wrap
              items-center justify-between
              gap-4 rounded-xl
              bg-white p-5 shadow-md"
            >
              <!-- Left Section: Add News Button -->
              <div class="flex flex-wrap justify-start gap-2">
                <button
                  type="button"
                  class="
                    group
                    flex w-full items-center justify-center
                    rounded-lg
                    bg-green-600
                    p-2.5
                    font-semibold text-white
                    transition-transform duration-200
                    hover:scale-[1.02]
                    sm:w-60
                    shadow-md hover:shadow-lg"
                  @click="addNews"
                >
                  <span class="text-gray-50">
                    <i
                    class="ri-add-line mr-2
                    text-lg transition-transform
                    group-hover:rotate-90"
                    ></i>
                    Add News
                  </span>
                </button>
              </div>

              <!-- Right Section: Search Bar -->
              <div class="w-full sm:w-80">
                <form @submit.prevent="retrieveNews" class="relative">
                  <SearchBar v-model="query" placeholder="Search news..." />
                </form>
              </div>
            </div>
          </main>
        </div>

        <section v-if="totalPages > 0" class="mb-10" data-aos="fade-up">
          <div
          class="
          flex flex-wrap
          items-center
          justify-between gap-4
          rounded-lg bg-white
          px-6 py-4 text-black
          shadow-md"
          >
            <!-- Showing Results Info -->
            <div class="flex items-center space-x-2 text-sm md:text-base">
              <i class="ri-information-line text-lg text-green-400"></i>
              <span>
                Showing <span class="font-semibold">{{ from }}</span>–
                <span class="font-semibold">{{ to }}</span>
                of <span class="font-semibold">{{ totalItems }}</span> results
              </span>
            </div>

            <!-- Pagination Component -->
            <div class="flex shrink-0">
              <BasePagination
                :active-page="page"
                :total-pages="totalPages"
                @change="setPage"
              />
            </div>
          </div>
        </section>

        <section
          v-if="totalPages === 0"
          class="
            col-span-1
            flex
            flex-col
            items-center
            justify-center
            rounded-xl
            bg-gray-50
            p-8
            text-center
            font-semibold
            text-gray-600
            shadow-inner
            transition-all
            duration-300
            md:col-span-3
            h-60"
        >
          <!-- Icon -->
          <i class="
          ri-newspaper-line
          text-4xl text-green-500
          mb-3 animate-pulse"
          ></i>

          <!-- Message -->
          <h3 class="text-lg">
            No News Available
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Try adding some news or adjusting your search.
          </p>
        </section>
        
        <article class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-6">
            <div
              v-for="(news, index) in newsList"
              :key="index"
              class="
              group col-span-1
              overflow-hidden
              rounded-xl bg-white
              backdrop-blur-sm
              shadow-lg transition-all
              duration-300 hover:shadow-2xl
              md:flex md:flex-col"
              data-aos="fade-up"
            >
              <div class="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-6">
                <!-- Text Content -->
                <div class="col-span-1 p-5 md:col-span-3 lg:col-span-4 lg:p-8">
                  <h3
                    class="
                    text-xl font-bold
                    text-black transition-colors
                    group-hover:text-green-400 sm:text-2xl"
                  >
                    {{ news.headline }}
                  </h3>

                  <p class="mt-2 text-sm text-gray-600">
                    {{ formattedDate(news.updated_at) }}
                  </p>

                  <p
                    class="mt-4 line-clamp-3 text-black"
                    v-html="news.content"
                  ></p>

                  <!-- Action Buttons -->
                  <div class="mt-6 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      class="
                        inline-flex items-center gap-2
                        px-3 py-2 rounded-md
                        bg-green-600 text-brand-green
                        hover:bg-green-700
                        active:bg-green-700
                        transition-colors
                        text-sm font-medium
                      "
                      @click="editNews(news.id)"
                    >
                      
                      <span class="text-gray-50">
                        <i class="ri-edit-line"></i>
                        Edit
                      </span>
                    </button>
                    <button
                      type="button"
                      class="
                        inline-flex items-center gap-2
                        px-3 py-2 rounded-md
                        bg-red-600 text-brand-red
                        hover:bg-red-700
                        active:bg-red-700
                        transition-colors
                        text-sm font-medium
                      "
                      @click="removeNews(news.id)"
                    >
                      <span class="text-gray-50">
                        <i class="ri-delete-bin-5-line"></i>
                        Remove
                      </span>
                    </button>
                  </div>
                </div>

                <!-- Image Section -->
                <div class="col-span-1 overflow-hidden md:col-span-3 lg:col-span-2">
                  <img
                    :src="getMediaURL(news.media[0], 'news')"
                    alt="News Image"
                    class="
                    h-full w-full object-cover
                    object-center transition-transform
                    duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <!-- Add news modal -->
      <OModal
        :active="showAddNewsModal"
        :width="'1080px'"
        class="news-editor-modal"
        @close="close"
      >
        <div
          class="news-dialog w-full overflow-hidden rounded-2xl bg-white"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-news-title"
        >
          <header
            class="relative overflow-hidden bg-gradient-to-br
            from-brand-black via-brand-grey-2 to-green-900 px-6 py-7
            text-white sm:px-8"
          >
            <div
              class="absolute -right-16 -top-20 h-56 w-56 rounded-full
              border-[32px] border-white/5"
            ></div>
            <div
              class="absolute -bottom-20 right-36 h-44 w-44 rounded-full
              bg-brand-green/10 blur-3xl"
            ></div>
            <div class="relative flex items-start justify-between gap-4">
              <div class="flex items-start gap-4">
                <div
                  class="flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-2xl bg-brand-green text-brand-black shadow-lg"
                >
                  <i class="ri-newspaper-line text-2xl"></i>
                </div>
                <div>
                  <div
                    class="mb-2 inline-flex items-center gap-2 rounded-full
                    bg-white/10 px-3 py-1 text-xs font-bold uppercase
                    tracking-wider text-green-100"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-brand-green"></span>
                    Newsroom
                  </div>
                  <h2 id="add-news-title" class="text-2xl font-black sm:text-3xl">
                    Create a news story
                  </h2>
                  <p class="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                    Turn the latest update into a polished story for your audience.
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="flex h-10 w-10 shrink-0 items-center justify-center
                rounded-full bg-white/10 text-white transition
                hover:rotate-90 hover:bg-white/20 focus:outline-none
                focus:ring-2 focus:ring-brand-green"
                aria-label="Close create news dialog"
                @click="close"
              >
                <i class="ri-close-line text-2xl"></i>
              </button>
            </div>
          </header>

          <VForm
            ref="form"
            v-model="valid"
            lazy-validation
            class="bg-gray-50"
          >
            <div class="space-y-5 p-5 sm:p-8">
              <section class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div class="mb-5 flex items-start gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-xl bg-green-50 font-bold text-green-700"
                  >
                    1
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900">
                      Story headline
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      Lead with a concise title that tells readers what matters.
                    </p>
                  </div>
                </div>
                <label
                  for="add-news-headline"
                  class="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Headline <span class="text-red-500">*</span>
                </label>
                <VTextField
                  id="add-news-headline"
                  v-model="news.headline"
                  label="Enter a compelling headline"
                  prepend-inner-icon="ri-double-quotes-l"
                  :rules="rules"
                  type="text"
                  solo
                />
              </section>

              <section class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div class="mb-5 flex items-start gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-xl bg-green-50 font-bold text-green-700"
                  >
                    2
                  </div>
                  <div class="flex-1">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <h3 class="font-bold text-gray-900">
                        Story content
                      </h3>
                      <span
                        class="inline-flex items-center gap-1 rounded-full
                        bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500"
                      >
                        <i class="ri-text"></i>
                        Rich text editor
                      </span>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">
                      Structure the story with headings, links, and readable paragraphs.
                    </p>
                  </div>
                </div>
                <label
                  for="add-news-content"
                  class="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Article body <span class="text-red-500">*</span>
                </label>
                <Tiptap
                  id="add-news-content"
                  v-model="news.content"
                  class="news-rich-editor"
                />
              </section>

              <section
                class="news-image-section rounded-2xl border
                border-gray-200 bg-white p-5 shadow-sm"
              >
                <div class="mb-5 flex items-start gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-xl bg-green-50 font-bold text-green-700"
                  >
                    3
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900">
                      Featured image
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      Add a strong visual that represents the story at a glance.
                    </p>
                  </div>
                </div>
                <ImageUpload @update-image="updateImage" />
              </section>
            </div>

            <footer
              class="flex flex-col-reverse gap-3 border-t border-gray-200
              bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between
              sm:px-8"
            >
              <p class="text-center text-xs text-gray-500 sm:text-left">
                <i class="ri-shield-check-line mr-1 text-green-600"></i>
                Review the headline, content, and image before publishing.
              </p>
              <div class="flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  class="inline-flex min-h-[48px] items-center justify-center
                  rounded-xl border border-gray-300 bg-white px-6 font-semibold
                  text-gray-700 transition hover:bg-gray-50 focus:outline-none
                  focus:ring-2 focus:ring-gray-300"
                  @click="close"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="inline-flex min-h-[48px] items-center justify-center
                  gap-2 rounded-xl bg-brand-green px-7 font-bold
                  text-brand-black shadow-lg shadow-green-200 transition
                  hover:-translate-y-0.5 hover:bg-green-500 hover:shadow-xl
                  focus:outline-none focus:ring-2 focus:ring-brand-green
                  focus:ring-offset-2 disabled:cursor-not-allowed
                  disabled:opacity-50 disabled:shadow-none"
                  :disabled="!valid"
                  @click="validate('Add')"
                >
                  <i class="ri-send-plane-fill text-lg"></i>
                  Publish story
                </button>
              </div>
            </footer>
          </VForm>
        </div>
      </OModal>

      <!-- Edit news modal -->
      <OModal
        :active="showEditNewsModal"
        :width="'1080px'"
        class="news-editor-modal"
        @close="closeEdit"
      >
        <div
          class="news-dialog w-full overflow-hidden rounded-2xl bg-white"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-news-title"
        >
          <header
            class="relative overflow-hidden bg-gradient-to-br
            from-brand-black via-brand-grey-2 to-green-900 px-6 py-7
            text-white sm:px-8"
          >
            <div
              class="absolute -right-16 -top-20 h-56 w-56 rounded-full
              border-[32px] border-white/5"
            ></div>
            <div class="relative flex items-start justify-between gap-4">
              <div class="flex items-start gap-4">
                <div
                  class="flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-2xl bg-brand-green text-brand-black shadow-lg"
                >
                  <i class="ri-draft-line text-2xl"></i>
                </div>
                <div>
                  <div
                    class="mb-2 inline-flex items-center gap-2 rounded-full
                    bg-white/10 px-3 py-1 text-xs font-bold uppercase
                    tracking-wider text-green-100"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-brand-green"></span>
                    Story editor
                  </div>
                  <h2 id="edit-news-title" class="text-2xl font-black sm:text-3xl">
                    Refine this news story
                  </h2>
                  <p class="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                    Keep the story accurate, engaging, and visually current.
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="flex h-10 w-10 shrink-0 items-center justify-center
                rounded-full bg-white/10 text-white transition
                hover:rotate-90 hover:bg-white/20 focus:outline-none
                focus:ring-2 focus:ring-brand-green"
                aria-label="Close edit news dialog"
                @click="closeEdit"
              >
                <i class="ri-close-line text-2xl"></i>
              </button>
            </div>
          </header>

          <VForm
            ref="form"
            v-model="valid"
            lazy-validation
            class="bg-gray-50"
          >
            <div class="space-y-5 p-5 sm:p-8">
              <section class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div class="mb-5 flex items-start gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-xl bg-green-50 font-bold text-green-700"
                  >
                    1
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900">
                      Story headline
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      Adjust the title while keeping the story easy to identify.
                    </p>
                  </div>
                </div>
                <label
                  for="edit-news-headline"
                  class="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Headline <span class="text-red-500">*</span>
                </label>
                <VTextField
                  id="edit-news-headline"
                  v-model="news.headline"
                  label="Enter a compelling headline"
                  prepend-inner-icon="ri-double-quotes-l"
                  :rules="rules"
                  type="text"
                  solo
                />
              </section>

              <section class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div class="mb-5 flex items-start gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-xl bg-green-50 font-bold text-green-700"
                  >
                    2
                  </div>
                  <div class="flex-1">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <h3 class="font-bold text-gray-900">
                        Story content
                      </h3>
                      <span
                        class="inline-flex items-center gap-1 rounded-full
                        bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500"
                      >
                        <i class="ri-edit-box-line"></i>
                        Editing
                      </span>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">
                      Review the details and improve clarity where needed.
                    </p>
                  </div>
                </div>
                <label
                  for="edit-news-content"
                  class="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Article body <span class="text-red-500">*</span>
                </label>
                <Tiptap
                  id="edit-news-content"
                  v-model="news.content"
                  class="news-rich-editor"
                />
              </section>

              <section
                class="news-image-section rounded-2xl border
                border-gray-200 bg-white p-5 shadow-sm"
              >
                <div class="mb-5 flex items-start gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-xl bg-green-50 font-bold text-green-700"
                  >
                    3
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900">
                      Featured image
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      Refine the current visual or upload a replacement.
                    </p>
                  </div>
                </div>
                <ImageUploadEdit
                  :imglistedit="imgListEdit"
                  :imgurledit="imgUrlEdit"
                  @update-image-edit="updateImageEdit"
                />
              </section>
            </div>

            <footer
              class="flex flex-col-reverse gap-3 border-t border-gray-200
              bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between
              sm:px-8"
            >
              <p class="text-center text-xs text-gray-500 sm:text-left">
                <i class="ri-history-line mr-1 text-green-600"></i>
                Saved changes will appear on the public news page.
              </p>
              <div class="flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  class="inline-flex min-h-[48px] items-center justify-center
                  rounded-xl border border-gray-300 bg-white px-6 font-semibold
                  text-gray-700 transition hover:bg-gray-50 focus:outline-none
                  focus:ring-2 focus:ring-gray-300"
                  @click="closeEdit"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="inline-flex min-h-[48px] items-center justify-center
                  gap-2 rounded-xl bg-brand-green px-7 font-bold
                  text-brand-black shadow-lg shadow-green-200 transition
                  hover:-translate-y-0.5 hover:bg-green-500 hover:shadow-xl
                  focus:outline-none focus:ring-2 focus:ring-brand-green
                  focus:ring-offset-2 disabled:cursor-not-allowed
                  disabled:opacity-50 disabled:shadow-none"
                  :disabled="!valid"
                  @click="validate('Edit')"
                >
                  <i class="ri-save-3-line text-lg"></i>
                  Save changes
                </button>
              </div>
            </footer>
          </VForm>
        </div>
      </OModal>

      <!-- Remove news modal -->
      <OModal
        :active="showRemoveNewsModal"
        :width="'540px'"
        class="news-editor-modal news-delete-modal"
        @close="closeRemove"
      >
        <div
          class="news-dialog w-full overflow-hidden rounded-2xl bg-white"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="remove-news-title"
          aria-describedby="remove-news-description"
        >
          <div class="relative overflow-hidden px-6 pb-6 pt-8 text-center sm:px-8">
            <button
              type="button"
              class="absolute right-4 top-4 flex h-10 w-10 items-center
              justify-center rounded-full text-gray-400 transition
              hover:rotate-90 hover:bg-gray-100 hover:text-gray-700
              focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Close remove news dialog"
              @click="closeRemove"
            >
              <i class="ri-close-line text-2xl"></i>
            </button>
            <div class="relative mx-auto mb-5 h-20 w-20">
              <div
                class="absolute inset-0 animate-pulse rounded-3xl bg-red-100"
              ></div>
              <div
                class="relative flex h-20 w-20 rotate-3 items-center
                justify-center rounded-3xl border-8 border-red-50 bg-red-100
                text-red-600 shadow-lg shadow-red-100"
              >
                <i class="ri-article-line -rotate-3 text-3xl"></i>
              </div>
            </div>
            <p class="mb-2 text-xs font-bold uppercase tracking-widest text-red-500">
              Remove publication
            </p>
            <h2 id="remove-news-title" class="text-2xl font-black text-gray-900">
              Delete this news story?
            </h2>
            <p
              id="remove-news-description"
              class="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500"
            >
              The story
              <strong class="font-bold text-gray-900">“{{ news.headline }}”</strong>
              will be removed from the news listing.
            </p>
            <div
              class="mt-5 flex items-start gap-3 rounded-2xl border
              border-red-100 bg-red-50/70 p-4 text-left"
            >
              <i class="ri-alert-line mt-0.5 text-xl text-red-600"></i>
              <p class="text-xs leading-5 text-red-700">
                Readers will no longer be able to access this story. This action
                cannot be undone.
              </p>
            </div>
          </div>
          <div
            class="flex flex-col-reverse gap-3 border-t border-gray-200
            bg-gray-50 px-6 py-5 sm:flex-row sm:px-8"
          >
            <button
              type="button"
              class="inline-flex min-h-[50px] flex-1 items-center justify-center
              rounded-xl border border-gray-300 bg-white px-5 font-semibold
              text-gray-700 transition hover:bg-gray-100 focus:outline-none
              focus:ring-2 focus:ring-gray-300"
              @click="closeRemove"
            >
              Keep story
            </button>
            <button
              type="button"
              class="inline-flex min-h-[50px] flex-1 items-center justify-center
              gap-2 rounded-xl bg-red-600 px-5 font-bold text-white
              shadow-lg shadow-red-200 transition hover:-translate-y-0.5
              hover:bg-red-700 hover:shadow-xl focus:outline-none
              focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              @click="remove(editingNo)"
            >
              <i class="ri-delete-bin-line text-lg"></i>
              Delete story
            </button>
          </div>
        </div>
      </OModal>
    </div>
</template>

<script>
import debounce from 'lodash/debounce';
import 'remixicon/fonts/remixicon.css';
import 'vue-croppa/dist/vue-croppa.css';
import logout from '~/mixins/auth/logout';
import handlesMedia from '~/mixins/shop/handlesMedia'
import BasePagination from '~/components/base/BasePagination';
import BreadCrumbs from '~/components/BreadCrumbs.vue';
import SearchBar from '~/components/SearchBar'
import aosMixin from '@/mixins/aos';
import Tiptap from '~/components/Wysiwyg/Tiptap'
import ImageUpload from '~/components/ImageUpload'
import ImageUploadEdit from '~/components/ImageUploadEdit'
import formattedDate from '~/mixins/utilities/formattedDate'

const toNumber = (str) => +str;
export default {
  buildModules: [ '@nuxtjs/moment' ],
  components: {
    BasePagination,
    SearchBar,
    Tiptap,
    ImageUpload,
    ImageUploadEdit,
    BreadCrumbs
  },
  mixins: [
    aosMixin,
    logout,
    formattedDate,
    handlesMedia
  ],
  data() {
    return {
      valid: true,
      query: null,
      rules: [ value => !!value || 'Required' ],
      news: {
        headline: '',
        lead: '',
        content: '<p></p>',
      },
      newsList: [],
      myEditCroppa: {},
      showGenerateCreatedImageBtn: false,
      showGenerateEditedImageBtn: false,
      imgList: [],
      imgUrlEdit: [],
      imgListEdit: [],
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
      showThumbnail: false,
      isNewsLoading: false,
      isNewsAdded: false,
      showAddNewsModal: false,
      showEditNewsModal: false,
      showRemoveNewsModal: false,
      showModal: false,
    };
  },
  watch: {
    query() {
      this.debouncedSearch();
    },
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
  },
  mounted() {
    this.debouncedSearch = debounce(this.retrieveNews, 800);
    this.retrieveNews();
    this.page = 1 // Reset pagination
  },
  methods: {
    validate(type) {
      if (!this.$refs.form.validate()) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Fill out all required fields',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else if (this.news.content === '<p></p>') {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Fill out news content',
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
    setAddNewsErrorContentStatus(status) {
      this.showAddNewsError.content.status = status
    },
    getExcerptContent(content) {
      const truncate = (str, max, suffix) => (str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`);
      return truncate(content, 190, '...')
    },
    addNews() {
      this.showAddNewsModal = true;
      this.reset()
    },
    close() {
      this.showAddNewsModal = false;
    },
    closeEdit() {
      this.showEditNewsModal = false;
    },
    closeRemove() {
      this.showRemoveNewsModal = false;
    },
    isDisable() {
      return (
        this.headline === '' ||
        this.content === '' ||
        this.imgUrl === ''
      );
    },
    retrieveNews() {
      this.isNewsLoading = true;

      const query = {
        q: this.query,
        page: this.page,
        maxNewsPerPage: 10,
      };

      // Sanitize and remove null values
      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })
      const queryString = new URLSearchParams(query).toString()
      this.$axios
        .$get(`v1/news?${queryString}`)
        .then((response) => {
          this.newsList = response.data.news
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          this.isNewsLoading = false;
        });
    },
    setPage(page) {
      this.page = page
      this.retrieveNews()
    },
    applyEditMetadata() {
      this.$nextTick(() => {
        const jsonMetadata = localStorage.getItem('metadata')
        if (jsonMetadata !== null) {
          const metadata = JSON.parse(jsonMetadata);
          const currentMetadata = this.myEditCroppa.getMetadata()
          currentMetadata.orientation = metadata.orientation
          this.myEditCroppa.applyMetadata(currentMetadata);
        }
        // Force the canvas to update and display the metadata updates
        this.myEditCroppa.moveUpwards(1)
        this.myEditCroppa.moveDownwards(1)
      })
    },
    setEditImagePreset() {
      const metadata = this.myEditCroppa.getMetadata()
      localStorage.setItem(
        'metadata',
        JSON.stringify(metadata)
      );
    },
    removeEditedImage(index) {
      this.imgUrlEdit.splice(index, 1)
      this.imgListEdit.splice(index, 1)
    },
    /** EDIT IMAGE */
    zoomInEdit() {
      this.myEditCroppa.zoomIn()
    },
    zoomOutEdit() {
      this.myEditCroppa.zoomOut()
    },
    rotateAntiEdit() {
      this.myEditCroppa.rotate(-1)
    },
    rotateEdit() {
      this.myEditCroppa.rotate()
    },
    flipxEdit() {
      this.myEditCroppa.flipX()
    },
    flipyEdit() {
      this.myEditCroppa.flipY()
    },
    handleNewImage() {
      this.showGenerateEditedImageBtn = true
    },
    handleImageRemove() {
      this.showGenerateEditedImageBtn = false
    },
    handleNewImageCreate() {
      this.showGenerateCreatedImageBtn = true;
      this.showAddNewsError.imgList.status = false
    },
    handleImageRemoveCreate() {
      this.showGenerateCreatedImageBtn = false;
    },
    generateEditedImage() {
      this.myEditCroppa.generateBlob(
        (blob) => {
          this.imgUrlEdit.push(URL.createObjectURL(blob));
          this.imgListEdit.push(blob);
        }
      );

      this.myEditCroppa.refresh()
    },
    toDecimal(x) {
      return Number.parseFloat(x/100).toFixed(2)
    },
    updateImage(image) {
      this.imgList = image
    },
    updateImageEdit(image) {
      this.imgListEdit = image
    },
    create() {
      const news = {
        headline: this.news.headline,
        content: this.news.content,
      };
      const form = new FormData();
      form.append('headline', news.headline)
      form.append('content', news.content);

      for (let i = 0; i < this.imgList.length; i++) {
        form.append('photo[]', this.imgList[i], 'newsThumbnail.png');
      }

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$axios
        .$post('/v1/news', form, config)
        .then((response) => {
          this.showAddNewsModal = false;
          this.isNewsAdded = true;
          this.$oruga.notification.open({
            message: response.title,
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.retrieveNews();
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
    editNews(index) {
      this.editingNo = toNumber(index);
      this.$axios
        .$get(`v1/news/${this.editingNo}`)
        .then((response) => {
          this.news.headline = response.data.news.headline;
          this.news.content = response.data.news.content;
          this.imgUrlEdit = response.data.news.media.map((x) =>
            `${this.$config.baseURL}/storage/${x.path}`);
          this.imgListEdit = response.data.news.media.map((x) => x.hash);

          this.showEditNewsModal = true;
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
      const editObject = this.newsList.find(
        (itemNews) => itemNews.id === this.editingNo
      );
      const editedNews = {
        headline: this.news.headline,
        content: this.news.content
      };
      const form = new FormData();
      form.append('headline', editedNews.headline);
      form.append('content', editedNews.content);

      for (let i = 0; i < this.imgListEdit.length; i++) {
        form.append('photo[]', this.imgListEdit[i]);
      }

      form.append('id', this.news.id);
      this.$axios
        .$post(`v1/news/${editObject.id}`, form)
        .then((response) => {
          this.showEditNewsModal = false;
          this.$oruga.notification.open({
            message: response.title,
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.editingNo = '';
          this.reset();
          this.retrieveNews();
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
    removeNews(index) {
      this.editingNo = toNumber(index);
      this.$axios.$get(`v1/news/${this.editingNo}`)
        .then((response) => {
          this.news.headline = response.data.news.headline;
        });
      setTimeout(() => {
        this.showRemoveNewsModal = true;
      }, 1000);
    },
    remove(index) {
      const editObject = this.newsList.find(
        (itemNews) => itemNews.id === this.editingNo
      );
      this.$axios
        .$delete(`/v1/news/${editObject.id}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: response.title,
            position: 'bottom',
            variant: 'success',
            queue: true,
          });
          this.retrieveNews();
        })
        .catch(() => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Failed to remove item',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        });
      this.reset();
      this.showRemoveNewsModal = false;
    },
    reset() {
      this.news.headline = '';
      this.news.content = '<p></p>'
      this.imgList = []
      this.imgListEdit = []
    },
    isCreateNewsFormEmpty() {
      return (
        this.discount.codename === '' ||
        typeof this.discount.codename === 'undefined' ||
        this.discount.rate === '' ||
        typeof this.discount.rate === 'undefined' ||
        this.discount.description.length === 0 ||
        typeof this.discount.description === 'undefined'
      );
    },
  },
};

</script>

<style scoped>
.croppa-container {
  background-color: #abb8c3;
  border: 3px solid #1C1B1C;
}
.o-inputit__item--danger {
  background-color: #e73538 !important;
}

.part-item__actions [class^="ri-"] {
  padding-right: 0.25rem;
}

::v-deep .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
> .v-input__control > .v-input__slot {
  min-height: 54px;
  width: 100%;
  appearance: none;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background-color: #f9fafb;
  box-shadow: none;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

::v-deep .v-text-field.v-input--is-focused
> .v-input__control > .v-input__slot {
  border-color: #5ecb3e;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgb(94 203 62 / 15%);
}

::v-deep .v-text-field .v-input__prepend-inner {
  margin-right: 0.4rem;
}

::v-deep .v-text-field .v-input__prepend-inner .v-icon {
  color: #6b7280;
  font-size: 1.2rem;
}

::v-deep .v-text-field.v-input--is-focused .v-input__prepend-inner .v-icon {
  color: #438f2d;
}

::v-deep .v-text-field input::placeholder {
  color: #9ca3af !important;
  font-family: inherit !important;
  font-size: 0.95rem !important;
}

.news-editor-modal ::v-deep .o-modal__content {
  max-height: calc(100vh - 2rem);
  border-radius: 1rem;
  background: transparent;
  box-shadow: 0 30px 80px rgb(0 0 0 / 40%);
}

.news-editor-modal ::v-deep .o-modal__close {
  display: none;
}

.news-editor-modal ::v-deep .o-modal__overlay {
  background:
    radial-gradient(circle at 50% 15%, rgb(94 203 62 / 12%), transparent 32%),
    rgb(5 5 5 / 80%);
  backdrop-filter: blur(5px);
}

.news-delete-modal ::v-deep .o-modal__overlay {
  background:
    radial-gradient(circle at 50% 15%, rgb(239 68 68 / 10%), transparent 30%),
    rgb(5 5 5 / 80%);
}

.news-dialog {
  animation: news-dialog-enter 0.28s ease-out;
}

.news-rich-editor {
  overflow: hidden;
  border: 1px solid #e5e7eb !important;
  border-radius: 0.75rem;
  background: #fff;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.news-rich-editor:focus-within {
  border-color: #5ecb3e !important;
  box-shadow: 0 0 0 3px rgb(94 203 62 / 12%);
}

.news-rich-editor ::v-deep .ProseMirror {
  min-height: 320px;
  padding: 0.75rem;
}

.news-rich-editor ::v-deep hr {
  margin: 0;
  border-color: #e5e7eb;
}

.news-image-section ::v-deep .rugby-croppa-container {
  border-color: #d1fae5;
  background: linear-gradient(135deg, #f9fafb, #f0fdf4);
  box-shadow: none;
}

.news-image-section ::v-deep .croppa-container {
  max-width: 100%;
  overflow: hidden;
}

.news-image-section ::v-deep .rugby-control-btn {
  border-radius: 0.65rem;
  box-shadow: none;
}

@keyframes news-dialog-enter {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 640px) {
  .news-editor-modal ::v-deep .o-modal__content {
    max-height: calc(100vh - 1rem);
    margin: 0.5rem;
  }

  .news-rich-editor ::v-deep .ProseMirror {
    min-height: 260px;
  }

  .news-image-section ::v-deep .croppa-container,
  .news-image-section ::v-deep canvas {
    height: auto !important;
    max-width: 100% !important;
  }
}
</style>
