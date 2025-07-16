<!-- eslint-disable max-len -->
<template>
    <div class="h-full  bg-[#1A1A1B]">
      <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black">
        <!-- Breadcrumbs and Title -->
        <BreadCrumbs title="FAQ Setting"/>
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
                  @click="addFaq"
                >
                  <i
                  class="
                  ri-add-line mr-2
                  text-lg transition-transform
                  group-hover:rotate-90"
                  ></i>
                  <span>Add FAQ</span>
                </button>
              </div>

              <!-- Right Section: Search Bar -->
              <div class="w-full sm:w-80">
                <form @submit.prevent="retrieveFaq" class="relative">
                  <SearchBar v-model="query"/>
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
          ri-question-line
          text-4xl text-green-500
          mb-3 animate-pulse"
          ></i>

          <!-- Message -->
          <h3 class="text-lg">
            No FAQ Available
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Try adding some faq or adjusting your search.
          </p>
        </section>

        <article class="mx-auto max-w-screen-xl gap-4">
          <div class="grid grid-cols-1 gap-4">
            <div
              v-for="(faq, index) in faqList"
              :key="index"
              class="
                group col-span-1 rounded-lg
                bg-gray-200 p-4 transition
                hover:bg-gray-100 md:p-6
              "
              data-aos="fade-up"
            >
              <div class="grid grid-cols-1">
                <!-- Text Content -->
                <div class="col-span-1 p-5 md:col-span-4 lg:col-span-4 lg:p-8">
                  <h3 class="text-2xl font-semibold text-black">
                    {{ faq.title }}
                  </h3>

                  <p class="mt-1 text-sm text-gray-500">
                    {{ formattedDate(faq.updated_at) }}
                  </p>

                  <p class="mt-4 text-black line-clamp-3" v-html="faq.description"></p>

                  <!-- Buttons (Right-aligned) -->
                  <div class="mt-6 flex justify-end gap-4">
                    <BaseButton
                      @click="editFaq(faq.id)"
                      class="
                        flex items-center gap-2 rounded-md
                        border border-green-200
                        bg-green-600 px-4 py-2
                        text-sm font-medium
                        text-white
                        transition
                        hover:bg-green-700
                      "
                    >
                      <i class="ri-edit-line text-xl"></i> Edit
                    </BaseButton>

                    <BaseButton
                    @click="removeFaq(faq.id)"
                      class="
                        flex items-center gap-2 rounded-md
                        border border-red-200
                        bg-red-600 px-4 py-2
                        text-sm font-medium
                        text-white
                        transition
                        hover:bg-red-700
                      "
                    >
                      <i class="ri-delete-bin-5-line text-xl"></i> Remove
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
       <!-- showAdd modal component -->
       <OModal
       :active="showAddFaqModal"
       @close="showAddFaqModal = false"
       >
        <VForm
        ref="form" v-model="valid" lazy-validation
        class="p-2 md:p-4"
        >
          <h3
        class="
        mb-3
        font-bold"
        >
            Add Faq
          </h3>
          <hr class="my-3">
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div class="col-span-3">
              <label for="title" class="mb-1 block">
                Title:
              </label>
              <VTextField
                id="faq"
                v-model="faq.title"
                label="Enter title"
                :rules="rules"
                type="text"
                solo
              />
            </div>

            <div class="col-span-3">
              <label for="description" class="mb-1 block">
                Description:
              </label>
              <Tiptap
                id="description"
                v-model="faq.description"
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
              :disabled="!valid"
              @click="validate('Add')"
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
        </VForm>
      </OModal>
      <!-- Show Edit Faq -->
      <OModal
      :active="showEditFaqModal"
      @close="showEditFaqModal = false"
    >
      <VForm
      ref="form" v-model="valid" lazy-validation
      class="p-2 md:p-4"
      >
        <h3 class="text-swd-red mb-3 font-bold">
          Edit Faq
        </h3>
        <hr class="my-3">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div class="col-span-3">
            <label for="title" class="mb-1 block">
              Title:
            </label>
            <VTextField
              id="faq"
              v-model="faq.title"
              label="Enter Title"
              :rules="rules"
              type="text"
              solo
              />
          </div>

          <div class="col-span-3">
            <label for="description" class="mb-1 block">
              Description:
            </label>
            <Tiptap
              id="description"
              v-model="faq.description"
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
            :disabled="!valid"
            @click="validate('Edit')"
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
      </VForm>
    </OModal>
    <!-- showRemoveProduct modal component -->
    <OModal
      :active="showRemoveFaqModal"
      @close="showRemoveFaqModal = false"
    >
      <div class="w-full rounded bg-white p-2 sm:w-[890px] sm:p-4">
        <h3 class="text-swd-red mb-3 font-bold">
          Remove Faq
        </h3>
        <hr class="my-3">
        <p class="text-center text-lg">
        <span>Are you sure you want to delete the faq</span>
        <span class="font-semibold">title - {{ faq.title }} </span>?
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
    logout,
    formattedDate,
    handlesMedia
  ],
  data() {
    return {
      valid: true,
      query: null,
      rules: [ value => !!value || 'Required' ],
      faq: {
        title: '',
        lead: '',
        description: '<p></p>',
      },
      faqList: [],
      myEditCroppa: {},
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
      showThumbnail: false,
      isFaqLoading: false,
      isFaqAdded: false,
      showAddFaqModal: false,
      showEditFaqModal: false,
      showRemoveFaqModal: false,
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
    this.debouncedSearch = debounce(this.retrieveFaq, 800);
    this.retrieveFaq();
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
      } else if (this.faq.description === '<p></p>') {
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
    setAddFaqErrorDescriptionStatus(status) {
      this.showAddFaqError.description.status = status
    },
    getExcerptDescription(description) {
      const truncate = (str, max, suffix) => (str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`);
      return truncate(description, 190, '...')
    },
    addFaq() {
      this.showAddFaqModal = true;
      this.reset()
    },
    close() {
      this.showAddFaqModal = false;
    },
    closeEdit() {
      this.showEditFaqModal = false;
    },
    closeRemove() {
      this.showRemoveFaqModal = false;
    },
    isDisable() {
      return (
        this.title === '' ||
        this.description === '' ||
        this.imgUrl === ''
      );
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
        .finally(() => {
          this.isFaqLoading = false;
        });
    },
    setPage(page) {
      this.page = page
      this.retrieveFaq()
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
    toDecimal(x) {
      return Number.parseFloat(x/100).toFixed(2)
    },
    create() {
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
          this.isFaqAdded = true;
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
      const editObject = this.faqList.find(
        (itemFaq) => itemFaq.id === this.editingNo
      );
      const editedFaq = {
        title: this.faq.title,
        description: this.faq.description
      };
      const form = new FormData();
      form.append('title', editedFaq.title);
      form.append('description', editedFaq.description);

      form.append('id', this.faq.id);
      this.$axios
        .$post(`v1/faq/${editObject.id}`, form)
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
        });
    },
    removeFaq(index) {
      this.editingNo = toNumber(index);
      this.$axios.$get(`v1/faq/${this.editingNo}`)
        .then((response) => {
          this.faq.title = response.data.faq.title;
        });
      setTimeout(() => {
        this.showRemoveFaqModal = true;
      }, 1000);
    },
    remove(index) {
      const editObject = this.faqList.find(
        (itemFaq) => itemFaq.id === this.editingNo
      );
      this.$axios
        .$delete(`/v1/faq/${editObject.id}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: response.title,
            position: 'bottom',
            variant: 'success',
            queue: true,
          });
          this.retrieveFaq();
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
      this.showRemoveFaqModal = false;
    },
    reset() {
      this.faq.title = '';
      this.faq.description = '<p></p>'
    },
    isCreateFaqFormEmpty() {
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