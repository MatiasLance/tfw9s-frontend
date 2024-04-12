<!-- eslint-disable max-len -->
<template>
    <div class="h-full  bg-[#1A1A1B]">
      <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black">
        <div
          class="
            space-y-3
            px-6
            text-left
            sm:text-left
            lg:col-span-6 lg:mt-10
            xl:mt-10
          "
        >
          <span
            class="
              superheadline
              flex flex-row
              items-center
              pb-3
              text-[1rem]
              font-normal
            "
          >
            <span class="font-medium">
              <NuxtLink to="/admin">
                <VBtn text color="white">Admin</VBtn>
              </NuxtLink>
            </span>
          </span>
          <h1 class="flex flex-row text-3xl font-bold text-white lg:text-4xl">
            News
          </h1>
        </div>
      </BaseHeader>

      <div class="mx-auto max-w-screen-xl px-4 py-7">
        <div class="-mx-4 flex flex-wrap">
          <main class="w-full px-4">
            <div class="my-6 flex flex-wrap items-center justify-between gap-4">
              <div
                class="flex flex-wrap justify-start gap-2"
              >
              <button
                type="button"
                class="
                  from-40% via-95% to-100%
                  w-full rounded-md
                  bg-gradient-to-br
                  from-[#5EE738] via-[#3e872a]
                  to-[#050505] p-1.5
                  text-center
                  font-semibold
                  text-white
                  sm:w-60"
                @click="addNews"
              >
                <span
                class="
                flex items-center
                justify-center"
                aria-hidden="true"
                >
                  <i class="ri-add-line"></i>
                  <span class="pr-1">Add News</span>
                </span>
              </button>
              </div>
              <div class="w-full sm:w-80">
              <form @submit.prevent="retrieveNews">
                <SearchBar v-model="query" />
              </form>
            </div>
            </div>
          </main>
        </div>

        <section class="mb-8" data-aos="fade-up">
          <div
            class="
              flex flex-wrap items-center justify-around
              gap-x-2
              md:justify-between
            "
          >
            <span class="flex items-center">
              <p class="text-base leading-[2.5em] text-white">
                Showing {{ from }}-{{ to }} of {{ totalItems }} results
              </p>
            </span>
            <BasePagination
              :active-page="page"
              :total-pages="totalPages"
              @change="setPage"
            />
          </div>
        </section>
        <article class="mx-auto max-w-screen-xl gap-4">
            <div class="grid grid-cols-1 gap-4">
              <div
                v-for="(news, index) in newsList"
                :key="index" class="group col-span-1 bg-[#212121]"
                data-aos="fade-up"
              >
                <div
                  class="
                  grid grid-cols-1
                  gap-4 md:grid-cols-6
                  lg:grid-cols-6"
                >
                  <div
                    class="
                    col-span-1 p-4 md:col-span-3
                    lg:col-span-4 lg:p-8"
                  >
                    <h3
                      class="
                      grid text-2xl font-semibold
                      text-white sm:grid-cols-1"
                    >
                      {{ news.headline }}
                    </h3>

                    <p class="text-sm text-brand-slate">
                    {{ new Date(news.updated_at) }}
                    </p>

                    <p
                      class="my-4 text-white line-clamp-3"
                      v-html="news.content"
                    ></p>

                    <div
                      class="mt-8 flex flex-wrap justify-start gap-2"
                      >
                      <button
                        type="button"
                        class="
                          text-brand-green
                          hover:text-brand-green
                          hover:decoration-brand-green
                          mr-2
                          flex
                          cursor-pointer
                          items-center
                          text-sm hover:underline
                          "
                        @click="editNews(news.id)"
                      >
                        <i class="ri-edit-line"></i> Edit
                      </button>
                      <button
                        type="button"
                        class="
                          text-brand-red
                          hover:text-brand-red
                          hover:decoration-brand-red
                          mr-2
                          flex
                          cursor-pointer
                          items-center
                          text-sm hover:underline
                          "
                        @click="removeNews(news.id)"
                      >
                        <i class="ri-delete-bin-5-line"></i> Remove
                      </button>
                    </div>
                  </div>
                  <div
                    class="col-span-1 overflow-hidden
                    md:col-span-3 lg:col-span-2"
                  >
                    <img
                      :src="getMediaURL(news.media[0], 'news')"
                      alt="Product Image"
                      class="h-64 w-full object-cover transition-all
                        group-hover:scale-110"
                      >
                  </div>
                </div>
              </div>
            </div>
        </article>
      </div>
       <!-- showAdd modal component -->
       <OModal
       :active="showAddNewsModal"
       @close="showAddNewsModal = false"
       >
        <div class="w-full rounded bg-white p-2 sm:w-[890px] sm:p-4">
          <h3
        class="
        mb-3
        font-bold"
        >
            Add News
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
              <ImageUpload
                 @update-image="updateImage"
              />
            </div>
          </div>
          <hr class="my-3">
          <div class="block lg:flex lg:flex-auto lg:justify-end">
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
                hover:bg-green-700
                lg:mx-4 lg:w-48
              "
              @click="create"
            >
              OK
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
                hover:bg-[#B1271B]
                lg:mx-4 lg:w-48
              "
              @click="close"
            >
              Cancel
            </button>
          </div>
        </div>
      </OModal>
      <!-- Show Edit News -->
      <OModal
      :active="showEditNewsModal"
      @close="showEditNewsModal = false"
    >
      <div class="w-full rounded bg-white p-2 sm:w-[890px] sm:p-4">
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
        <div class="block lg:flex lg:flex-auto lg:justify-end">
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
            @click="edit(editingNo)"
          >
            Confirm
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
            @click="closeEdit"
          >
            Cancel
          </button>
        </div>
      </div>
    </OModal>
    <!-- showRemoveProduct modal component -->
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
import 'remixicon/fonts/remixicon.css';
import 'vue-croppa/dist/vue-croppa.css';
import logout from '~/mixins/auth/logout';
import handlesMedia from '~/mixins/shop/handlesMedia'
import BasePagination from '~/components/base/BasePagination';
import SearchBar from '~/components/SearchBar'
import aosMixin from '@/mixins/aos';
import Tiptap from '~/components/Wysiwyg/Tiptap'
import ImageUpload from '~/components/ImageUpload'
import ImageUploadEdit from '~/components/ImageUploadEdit'

const toNumber = (str) => +str;
export default {
  buildModules: [ '@nuxtjs/moment' ],
  components: {
    BasePagination,
    SearchBar,
    Tiptap,
    ImageUpload,
    ImageUploadEdit
  },
  mixins: [
    aosMixin,
    logout,
    handlesMedia
  ],
  data() {
    return {
      query: '',
      rules: [ value => !!value || 'Required' ],
      news: {
        headline: '',
        lead: '',
        content: '',
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
      perPage: 12,
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
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
  },
  mounted() {
    this.retrieveNews();
    this.page = 1 // Reset pagination
  },
  methods: {
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
        maxNewsPerPage: 12,
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
            closable: true,
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
            closable: true,
            queue: true,
          });
        });
    },
    edit(index) {
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

      form.append('id', index);
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
            closable: true,
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
      this.news.content = ''
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
