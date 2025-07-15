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
                    bg-gradient-to-r from-green-500 via-lime-500 to-emerald-700
                    p-2.5
                    font-semibold text-white
                    transition-transform duration-200
                    hover:scale-[1.02]
                    sm:w-60
                    shadow-md hover:shadow-lg"
                  @click="addNews"
                >
                  <i
                  class="
                  ri-add-line mr-2
                  text-lg transition-transform
                  group-hover:rotate-90"
                  ></i>
                  <span>Add News</span>
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
                        bg-green-100 text-brand-green
                        hover:bg-green-200
                        active:bg-green-300
                        transition-colors
                        text-sm font-medium
                      "
                      @click="editNews(news.id)"
                    >
                      <i class="ri-edit-line"></i>
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      class="
                        inline-flex items-center gap-2
                        px-3 py-2 rounded-md
                        bg-red-100 text-brand-red
                        hover:bg-red-200
                        active:bg-red-300
                        transition-colors
                        text-sm font-medium
                      "
                      @click="removeNews(news.id)"
                    >
                      <i class="ri-delete-bin-5-line"></i>
                      <span>Remove</span>
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
      <!-- Add Modal Component -->
      <OModal
        :active="showAddNewsModal"
        @close="showAddNewsModal = false"
      >
        <div class="
          relative rounded-lg shadow-xl overflow-hidden
          bg-white transition-all duration-300 transform"
          >
          <!-- Close Button -->
          <button
            type="button"
            class="
            absolute top-4
            right-4 text-gray-500
            hover:text-gray-800
            dark:text-gray-400
            dark:hover:text-white"
            @click="showAddNewsModal = false"
          >
            <i class="ri-close-line text-xl"></i>
          </button>

          <!-- Form -->
          <VForm
            ref="form"
            v-model="valid"
            lazy-validation
            class="p-4 md:p-6"
          >
            <h3 class="text-xl font-bold text-gray-800 light:text-dark mb-2">
              Add News
            </h3>
            <hr class="my-4 border-gray-200 dark:border-gray-700" />

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <!-- Headline -->
              <div class="col-span-3">
                <label
                for="headline"
                class="
                mb-1 block text-sm
                font-medium text-gray-700
                light:text-dark"
                >
                  Headline:
                </label>
                <VTextField
                  id="news"
                  v-model="news.headline"
                  label="Enter Headline"
                  :rules="rules"
                  type="text"
                  solo
                  class="w-full focus:ring focus:ring-green-200"
                  :dark="$store.getters.isDarkMode"
                />
              </div>

              <!-- Content -->
              <div class="col-span-3">
                <label
                for="content"
                class="
                mb-1 block text-sm font-medium
                text-gray-700 light:text-dark"
                >
                  Content:
                </label>
                <Tiptap
                  id="content"
                  v-model="news.content"
                />
              </div>

              <!-- Image Upload -->
              <div class="col-span-3">
                <ImageUpload @update-image="updateImage" />
              </div>
            </div>

            <hr class="my-6 border-gray-200 dark:border-gray-700" />

            <!-- Actions -->
            <div class="flex flex-col-reverse justify-end gap-3 sm:flex-row">
              <!-- Cancel Button -->
              <button
                type="button"
                @click="close"
                class="
                  group relative w-full
                  rounded-md px-5 py-3
                  bg-[#050505] text-white
                  font-semibold text-sm uppercase tracking-wider
                  shadow-md hover:shadow-lg
                  transition-all duration-300
                  overflow-hidden
                  before:absolute before:inset-0 before:bg-white
                  before:opacity-0 before:w-full before:h-full
                  hover:before:opacity-10
                  sm:w-auto
                "
              >
                <span class="relative z-10">Cancel</span>
              </button>

              <!-- Save News Button -->
              <button
                type="button"
                :disabled="!valid"
                @click="validate('Add')"
                class="
                  group relative w-full
                  rounded-md px-5 py-3
                  bg-[#5ecb3e] text-white
                  font-semibold text-sm uppercase tracking-wider
                  shadow-md hover:shadow-lg
                  transition-all duration-300
                  overflow-hidden
                  before:absolute before:inset-0 before:bg-white
                  before:opacity-0 before:w-full before:h-full
                  hover:before:opacity-20
                  active:bg-green-700
                  disabled:opacity-60 disabled:cursor-not-allowed
                  sm:w-auto
                "
              >
                <span class="relative z-10">Save News</span>
              </button>
            </div>
          </VForm>
        </div>
      </OModal>

      <!-- Edit Modal Component -->
      <OModal
        :active="showEditNewsModal"
        @close="showEditNewsModal = false"
      >
      <VForm
        ref="form"
        v-model="valid"
        lazy-validation
        class="p-2 md:p-4"
      >
        <h3 class="text-swd-red mb-3 font-bold">
          Edit News
        </h3>
        <hr class="my-3">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div class="col-span-3">
            <label for="headline" class="mb-1 block">
              Headline:
            </label>
            <VTextField
              id="news"
              v-model="news.headline"
              label="Enter Headline"
              :rules="rules"
              type="text"
              solo
              />
          </div>

          <div class="col-span-3">
            <label for="content" class="mb-1 block">
              Content:
            </label>
            <Tiptap
              id="content"
              v-model="news.content"
              />
          </div>

          <div class="col-span-3">
            <ImageUploadEdit
              :imglistedit="imgListEdit"
              :imgurledit="imgUrlEdit"
              @update-image-edit="updateImageEdit"
              />
          </div>
        </div>
        <hr class="my-3">
        <div class="block lg:flex lg:justify-end lg:items-center gap-4">
          <!-- Confirm Button -->
          <button
            type="button"
            :disabled="!valid"
            @click="validate('Edit')"
            class="
              group relative w-full
              rounded-md px-5 py-3
              bg-[#5ecb3e] text-white
              font-semibold text-sm uppercase tracking-wider
              overflow-hidden shadow-md hover:shadow-lg
              transition-all duration-300
              before:absolute before:inset-0 before:bg-white
              before:opacity-0 before:w-full before:h-full
              hover:before:opacity-20
              disabled:opacity-60 disabled:cursor-not-allowed
              lg:w-48 lg:my-2"
          >
            <span class="relative z-10">Confirm</span>
          </button>

          <!-- Cancel Button -->
          <button
            type="button"
            @click="closeEdit"
            class="
              group relative w-full
              rounded-md px-5 py-3
              bg-[#050505] text-white
              font-semibold text-sm uppercase tracking-wider
              overflow-hidden shadow-md hover:shadow-lg
              transition-all duration-300
              before:absolute before:inset-0 before:bg-white
              before:opacity-0 before:w-full before:h-full
              hover:before:opacity-10
              lg:w-48 lg:my-2"
          >
            <span class="relative z-10">Cancel</span>
          </button>
        </div>
      </VForm>
    </OModal>
    <!-- Remove Modal Component -->
    <OModal
      :active="showRemoveNewsModal"
      @close="showRemoveNewsModal = false"
    >
      <div class="w-full rounded bg-white p-2 sm:w-[890px] sm:p-4">
        <h3 class="text-swd-red mb-3 font-bold">
          Remove News
        </h3>
        <hr class="my-3">
        <p class="text-center text-lg">
        <span>Are you sure you want to delete the news</span>
        <span class="font-semibold">headline: {{ news.headline }} </span>?
        </p>
        <hr class="my-3">
        <div class="block lg:flex lg:flex-auto lg:justify-center">
          <button
            type="button"
            class="
              my-2
              inline-block
              w-full
              border border-transparent
              bg-brand-green
              py-3
              px-5
              text-center
              font-bold
              text-white
              hover:bg-green-800
              lg:mx-4 lg:w-48
              "
            @click="remove(editingNo)"
            >
            Yes, remove it
          </button>
          <button
            type="button"
            class="
              my-2
              inline-block
              w-full
              border border-transparent
              bg-brand-red
              py-3
              px-5
              text-center
              font-bold
              text-white
              hover:bg-brand-dred
              lg:mx-4 lg:w-48
              "
            @click="closeRemove"
            >
            No
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
box-shadow: none;
border: 1px rgb(243 244 246 / var(--tw-border-opacity));
background-color: rgb(243 244 246 / var(--tw-bg-opacity));
padding: 0.5rem 0.75rem;
width: 100%;
appearance: none;
border-radius: 0;
transition: border-color 0.3s;
}

::v-deep .v-text-field input::placeholder {
font-size: 1rem !important;
font-family: inherit !important;
color: rgb(104, 104, 104) !important;
}

.custom-btn {
  height: 50px !important;
}
</style>
