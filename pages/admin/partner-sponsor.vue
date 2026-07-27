<!-- eslint-disable max-len -->
<template>
    <div class="h-full  bg-[#1A1A1B]">
      <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black">
         <!-- Breadcrumbs and Title -->
         <BreadCrumbs title="Partner Sponsor Setting"/>
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
                  class="bg-green-600 hover:bg-green-700 font-bold 
                      py-3 px-6 rounded-xl transition-all duration-300 
                      flex items-center gap-2 w-full sm:w-auto justify-center"
                  @click="addPartnerSponsor"
                >
                  <span class="text-gray-50">
                    <i class="ri-add-line mr-2
                    text-lg transition-transform
                    group-hover:rotate-90"
                    ></i>
                    Add Partner Sponsor
                  </span>
                </button>
              </div>

              <!-- Right Section: Search Bar -->
              <div class="w-full sm:w-80">
                <form @submit.prevent="retrieveSponsors" class="relative">
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
          ri-service-line
          text-4xl text-green-500
          mb-3 animate-pulse"
          ></i>

          <!-- Message -->
          <h3 class="text-lg">
            No Partner Sponsor Available
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Try adding some partner sponsor or adjusting your search.
          </p>
        </section>

        <div
            class="grid grid-cols-1 gap-x-0 gap-y-6
            sm:grid-cols-2 sm:gap-x-4
            md:grid-cols-3 md:gap-x-4 md:gap-y-8
            xl:grid-cols-4 xl:gap-x-4 xl:gap-y-12
            "
        >
          <article
            v-for="sponsor in partnerSponsors"
            :key="sponsor.id"
            class="
              group
              mb-6 overflow-hidden
              rounded-xl bg-white
              shadow-md hover:shadow-xl
              transition-all duration-300
              flex flex-col
              border border-gray-100
              hover:border-green-200
            "
            data-aos="fade-up"
          >
            <!-- Image Section -->
            <div class="relative w-full h-56 overflow-hidden bg-gray-100">
              <img
                :src="getMediaURL(sponsor.media[0])"
                alt="Sponsor Image"
                class="
                w-full h-full object-contain
                object-center transition-transform
                duration-500 group-hover:scale-105"
              />
            </div>

            <!-- Content Section -->
            <div class="p-5 flex-grow flex flex-col justify-center items-center text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">
                {{ sponsor.company_name }}
              </h3>

              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-3">
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
                  @click="editSponsor(sponsor.id)"
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
                  @click="removeSponsor(sponsor.id)"
                >
                  <span class="text-gray-50">
                    <i class="ri-delete-bin-5-line"></i>
                    Remove
                  </span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
      <!-- Add sponsor modal -->
      <OModal
        :active="showAddSponsorsModal"
        :width="'960px'"
        class="partner-sponsor-modal"
        @close="close"
      >
        <div
          class="sponsor-dialog w-full overflow-hidden rounded-2xl bg-white"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-sponsor-title"
        >
          <header
            class="relative overflow-hidden bg-gradient-to-br
            from-brand-black via-brand-grey-2 to-green-900 px-6 py-7
            text-white sm:px-8"
          >
            <div
              class="absolute -right-12 -top-16 h-48 w-48 rounded-full
              border-[28px] border-white/5"
            ></div>
            <div
              class="absolute -bottom-16 right-32 h-32 w-32 rounded-full
              bg-brand-green/10 blur-2xl"
            ></div>
            <div class="relative flex items-start justify-between gap-4">
              <div class="flex items-start gap-4">
                <div
                  class="flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-2xl bg-brand-green text-brand-black shadow-lg
                  shadow-green-950/30"
                >
                  <i class="ri-hand-heart-line text-2xl"></i>
                </div>
                <div>
                  <div
                    class="mb-2 inline-flex items-center gap-2 rounded-full
                    bg-white/10 px-3 py-1 text-xs font-semibold uppercase
                    tracking-wider text-green-100"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-brand-green"></span>
                    New partnership
                  </div>
                  <h2 id="add-sponsor-title" class="text-2xl font-bold sm:text-3xl">
                    Add partner sponsor
                  </h2>
                  <p class="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                    Showcase a supporting organization with its logo and website.
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="flex h-10 w-10 shrink-0 items-center justify-center
                rounded-full bg-white/10 text-white transition
                hover:rotate-90 hover:bg-white/20 focus:outline-none
                focus:ring-2 focus:ring-brand-green"
                aria-label="Close add sponsor dialog"
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
            <div class="space-y-6 p-5 sm:p-8">
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
                      Sponsor details
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      Add the public name and destination for this sponsor.
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                  <div>
                    <label
                      for="add-sponsor-company"
                      class="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Company name <span class="text-red-500">*</span>
                    </label>
                    <VTextField
                      id="add-sponsor-company"
                      v-model="sponsor.company_name"
                      label="e.g. Acme Sports"
                      prepend-inner-icon="ri-building-4-line"
                      :rules="rules"
                      type="text"
                      solo
                    />
                  </div>
                  <div>
                    <label
                      for="add-sponsor-link"
                      class="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Website <span class="text-red-500">*</span>
                    </label>
                    <VTextField
                      id="add-sponsor-link"
                      v-model="sponsor.link"
                      label="https://example.com"
                      prepend-inner-icon="ri-links-line"
                      :rules="rules"
                      type="url"
                      solo
                    />
                  </div>
                </div>
              </section>

              <section class="sponsor-upload rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div class="mb-5 flex items-start gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-xl bg-green-50 font-bold text-green-700"
                  >
                    2
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900">
                      Brand image
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      Upload a clear, high-quality logo. PNG or WebP works best.
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
                You can update these details at any time.
              </p>
              <div class="flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  class="inline-flex min-h-[48px] items-center justify-center
                  rounded-xl border border-gray-300 bg-white px-6 font-semibold
                  text-gray-700 transition hover:bg-gray-50
                  focus:outline-none focus:ring-2 focus:ring-gray-300"
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
                  <i class="ri-add-circle-line text-xl"></i>
                  Add sponsor
                </button>
              </div>
            </footer>
          </VForm>
        </div>
      </OModal>

      <!-- Edit sponsor modal -->
      <OModal
        :active="showEditSponsorsModal"
        :width="'960px'"
        class="partner-sponsor-modal"
        @close="closeEdit"
      >
        <div
          class="sponsor-dialog w-full overflow-hidden rounded-2xl bg-white"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-sponsor-title"
        >
          <header
            class="relative overflow-hidden bg-gradient-to-br
            from-brand-black via-brand-grey-2 to-green-900 px-6 py-7
            text-white sm:px-8"
          >
            <div
              class="absolute -right-12 -top-16 h-48 w-48 rounded-full
              border-[28px] border-white/5"
            ></div>
            <div class="relative flex items-start justify-between gap-4">
              <div class="flex items-start gap-4">
                <div
                  class="flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-2xl bg-brand-green text-brand-black shadow-lg
                  shadow-green-950/30"
                >
                  <i class="ri-edit-2-line text-2xl"></i>
                </div>
                <div>
                  <div
                    class="mb-2 inline-flex items-center gap-2 rounded-full
                    bg-white/10 px-3 py-1 text-xs font-semibold uppercase
                    tracking-wider text-green-100"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-brand-green"></span>
                    Sponsor profile
                  </div>
                  <h2 id="edit-sponsor-title" class="text-2xl font-bold sm:text-3xl">
                    Edit partner sponsor
                  </h2>
                  <p class="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                    Keep the sponsor's public information and branding up to date.
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="flex h-10 w-10 shrink-0 items-center justify-center
                rounded-full bg-white/10 text-white transition
                hover:rotate-90 hover:bg-white/20 focus:outline-none
                focus:ring-2 focus:ring-brand-green"
                aria-label="Close edit sponsor dialog"
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
            <div class="space-y-6 p-5 sm:p-8">
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
                      Sponsor details
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      Review the company name and linked website.
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                  <div>
                    <label
                      for="edit-sponsor-company"
                      class="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Company name <span class="text-red-500">*</span>
                    </label>
                    <VTextField
                      id="edit-sponsor-company"
                      v-model="sponsor.company_name"
                      label="e.g. Acme Sports"
                      prepend-inner-icon="ri-building-4-line"
                      :rules="rules"
                      type="text"
                      solo
                    />
                  </div>
                  <div>
                    <label
                      for="edit-sponsor-link"
                      class="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Website <span class="text-red-500">*</span>
                    </label>
                    <VTextField
                      id="edit-sponsor-link"
                      v-model="sponsor.link"
                      label="https://example.com"
                      prepend-inner-icon="ri-links-line"
                      :rules="rules"
                      type="url"
                      solo
                    />
                  </div>
                </div>
              </section>

              <section class="sponsor-upload rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div class="px-5 pt-5">
                  <div class="flex items-start gap-3">
                    <div
                      class="flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-xl bg-green-50 font-bold text-green-700"
                    >
                      2
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-900">
                        Brand image
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Refine the existing logo or upload a replacement.
                      </p>
                    </div>
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
                Changes will appear after saving.
              </p>
              <div class="flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  class="inline-flex min-h-[48px] items-center justify-center
                  rounded-xl border border-gray-300 bg-white px-6 font-semibold
                  text-gray-700 transition hover:bg-gray-50
                  focus:outline-none focus:ring-2 focus:ring-gray-300"
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
                  <i class="ri-save-3-line text-xl"></i>
                  Save changes
                </button>
              </div>
            </footer>
          </VForm>
        </div>
      </OModal>

      <!-- Remove sponsor modal -->
      <OModal
        :active="showRemoveSponsorsModal"
        :width="'520px'"
        class="partner-sponsor-modal partner-sponsor-delete-modal"
        @close="closeRemove"
      >
        <div
          class="sponsor-dialog w-full overflow-hidden rounded-2xl bg-white"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="remove-sponsor-title"
          aria-describedby="remove-sponsor-description"
        >
          <div class="relative px-6 pb-6 pt-8 text-center sm:px-8">
            <button
              type="button"
              class="absolute right-4 top-4 flex h-9 w-9 items-center
              justify-center rounded-full text-gray-400 transition
              hover:bg-gray-100 hover:text-gray-700 focus:outline-none
              focus:ring-2 focus:ring-gray-300"
              aria-label="Close remove sponsor dialog"
              @click="closeRemove"
            >
              <i class="ri-close-line text-xl"></i>
            </button>
            <div class="relative mx-auto mb-5 h-20 w-20">
              <div
                class="absolute inset-0 animate-ping rounded-full
                bg-red-100 opacity-60"
              ></div>
              <div
                class="relative flex h-20 w-20 items-center justify-center
                rounded-full border-8 border-red-50 bg-red-100 text-red-600"
              >
                <i class="ri-delete-bin-6-line text-3xl"></i>
              </div>
            </div>
            <p class="mb-2 text-xs font-bold uppercase tracking-widest text-red-500">
              Permanent action
            </p>
            <h2 id="remove-sponsor-title" class="text-2xl font-bold text-gray-900">
              Remove {{ sponsor.company_name }}?
            </h2>
            <p
              id="remove-sponsor-description"
              class="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500"
            >
              This sponsor and its logo will disappear from the public partner
              listing. This action cannot be undone.
            </p>
          </div>
          <div
            class="flex flex-col-reverse gap-3 border-t border-gray-200
            bg-gray-50 px-6 py-5 sm:flex-row sm:justify-center"
          >
            <button
              type="button"
              class="inline-flex min-h-[48px] flex-1 items-center
              justify-center rounded-xl border border-gray-300 bg-white px-5
              font-semibold text-gray-700 transition hover:bg-gray-100
              focus:outline-none focus:ring-2 focus:ring-gray-300"
              @click="closeRemove"
            >
              Keep sponsor
            </button>
            <button
              type="button"
              class="inline-flex min-h-[48px] flex-1 items-center
              justify-center gap-2 rounded-xl bg-red-600 px-5 font-bold
              text-white shadow-lg shadow-red-200 transition
              hover:-translate-y-0.5 hover:bg-red-700 focus:outline-none
              focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              @click="remove(editingNo)"
            >
              <i class="ri-delete-bin-line text-lg"></i>
              Remove sponsor
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
import handlesMedia from '~/mixins/shop/handlesMedia';
import BasePagination from '~/components/base/BasePagination';
import SearchBar from '~/components/SearchBar'
import aosMixin from '@/mixins/aos';
import currencyMixin from '@/mixins/currency';
import ImageUpload from '~/components/ImageUploadSolo'
import ImageUploadEdit from '~/components/ImageUploadEditSolo'

const toNumber = (str) => +str;
export default {
  buildModules: [ '@nuxtjs/moment' ],
  components: {
    BasePagination,
    SearchBar,
    ImageUpload,
    ImageUploadEdit
  },
  mixins: [
    aosMixin,
    currencyMixin,
    logout,
    handlesMedia
  ],
  data() {
    return {
      valid: true,
      sponsor: {
        // eslint-disable-next-line camelcase
        company_name: '',
        link: '',
        // eslint-disable-next-line camelcase
        first_name: '',
        // eslint-disable-next-line camelcase
        last_name: '',
        description: '',
      },
      myCroppa: {},
      myEditCroppa: {},
      showGenerateCreatedImageBtn: false,
      showGenerateEditedImageBtn: false,
      rules: [ value => !!value || 'Required' ],
      imgUrl: [],
      imgUrlEdit: [],
      imgList: [],
      imgListEdit: [],
      query: '',
      from: 0,
      to: 0,
      totalPages: 0,
      totalItems: 0,
      newsList: [],
      partnerSponsors: [],
      editingNo: null,
      isNewsLoading: false,
      isNewsAdded: false,
      showAddSponsorsModal: false,
      showEditSponsorsModal: false,
      showRemoveSponsorsModal: false,
      showModal: false,
      headline: '',
      content: '',
      pageSEO: {
        title: 'Partner Sponsors - TFW9s',
        description: 'Partner Sponsors Page',
      },
      adminpage: { title: 'Partner Sponsors' }
    };
  },
  head() {
    return { title: this.pageSEO.title };
  },
  computed: {
    page: {
      get() {
        return this.$store.state.shop.page;
      },
      set(value) {
        this.$store.commit('shop/setPage', value);
      },
    },
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
    this.debouncedSearch = debounce(this.retrieveSponsors, 800);
    this.retrieveSponsors();
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
      } else if (this.sponsor.description === '<p></p>') {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Fill out description fields',
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
    addPartnerSponsor() {
      this.showAddSponsorsModal = true;
      this.reset()
    },
    close() {
      this.showAddSponsorsModal = false;
    },
    closeEdit() {
      this.showEditSponsorsModal = false;
    },
    closeRemove() {
      this.showRemoveSponsorsModal = false;
    },
    retrieveSponsors() {
      this.isNewsLoading = true;

      const query = {
        q: this.query,
        page: this.page
      };

      // Sanitize and remove null values
      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })
      const queryString = new URLSearchParams(query).toString()
      this.$axios
        .$get(`v1/partnersponsors?${queryString}`)
        .then((response) => {
          this.partnerSponsors = response.data.partnerSponsors
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
      this.retrieveSponsors()
    },
    handleCroppaFileSizeExceed(file) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'File size exceeds. Please choose a file smaller than 32mb.',
        position: 'bottom',
        variant: 'danger',
        queue: true,
      });
    },
    handleCroppaFileTypeMismatch(file) {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Invalid file type. Please choose a jpeg, png or webp file.',
        position: 'bottom',
        variant: 'danger',
        queue: true,
      });
    },
    /* ADD IMAGE */
    zoomIn() {
      this.myCroppa.zoomIn();
    },
    zoomOut() {
      this.myCroppa.zoomOut();
    },
    rotateAnti() {
      this.myCroppa.rotate(-1);
    },
    rotate() {
      this.myCroppa.rotate();
    },
    flipx() {
      this.myCroppa.flipX();
    },
    flipy() {
      this.myCroppa.flipY();
    },
    setImagePreset() {
      const metadata = this.myCroppa.getMetadata()
      localStorage.setItem(
        'metadata',
        JSON.stringify(metadata)
      );
    },
    clearImagePreset() {
      localStorage.removeItem('metadata')
      this.applyMetadata()
    },
    applyMetadata() {
      this.$nextTick(() => {
        const jsonMetadata = localStorage.getItem('metadata')
        if (jsonMetadata !== null) {
          const metadata = JSON.parse(jsonMetadata);
          const currentMetadata = this.myCroppa.getMetadata()
          currentMetadata.orientation = metadata.orientation
          this.myCroppa.applyMetadata(currentMetadata);
        }
        // Force the canvas to update and display the metadata updates
        this.myCroppa.moveUpwards(1)
        this.myCroppa.moveDownwards(1)
      })
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
    generateImage() {
      this.myCroppa.generateBlob(
        (blob) => {
          this.imgUrl.push(URL.createObjectURL(blob));
          this.imgList.push(blob)
        },
      );
      this.myCroppa.refresh();
    },
    /** REMOVE IMAGE IN IMGURL AND IMGLIST */
    removeImage(index) {
      this.imgUrl.splice(index, 1)
      this.imgList.splice(index, 1)
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
      const form = new FormData();
      form.append('company_name', this.sponsor.company_name)
      form.append('hyperlink', this.sponsor.link)
      form.append('first_name', 'null')
      form.append('last_name', 'null')
      form.append('description', 'null')

      for (let i = 0; i < this.imgList.length; i++) {
        form.append('photo[]', this.imgList[i], 'newsThumbnail.png');
      }

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$axios
        .$post('/v1/partnersponsors', form, config)
        .then((response) => {
          this.showAddNewsModal = false;
          this.isNewsAdded = true;
          this.$oruga.notification.open({
            message: 'Partner Sponsor Added',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.showAddSponsorsModal = false
          this.retrieveSponsors();
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
    editSponsor(index) {
      this.editingNo = toNumber(index);
      this.$axios
        .$get(`v1/partnersponsors/${this.editingNo}`)
        .then((response) => {
          // eslint-disable-next-line max-len, camelcase, vue/max-len
          this.sponsor.company_name = response.data.partnerSponsor.company_name;
          this.sponsor.link = response.data.partnerSponsor.hyperlink;
          // eslint-disable-next-line camelcase
          this.sponsor.first_name = response.data.partnerSponsor.first_name;
          // eslint-disable-next-line camelcase
          this.sponsor.last_name = response.data.partnerSponsor.last_name;
          this.sponsor.description = response.data.partnerSponsor.description;
          this.imgUrlEdit = response.data.partnerSponsor.media.map((x) =>
            `${this.$config.baseURL}/storage/${x.path}`);
          // eslint-disable-next-line max-len, vue/max-len
          this.imgListEdit = response.data.partnerSponsor.media.map((x) => x.hash);

          this.showEditSponsorsModal = true;
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
      const editObject = this.partnerSponsors.find(
        (item) => item.id === this.editingNo
      );
      const form = new FormData();
      form.append('company_name', this.sponsor.company_name)
      form.append('hyperlink', this.sponsor.link)
      form.append('first_name', this.sponsor.first_name)
      form.append('last_name', this.sponsor.last_name)
      form.append('description', this.sponsor.description)

      for (let i = 0; i < this.imgListEdit.length; i++) {
        form.append('photo[]', this.imgListEdit[i]);
      }

      form.append('id', this.sponsor.id);
      this.$axios
        .$post(`v1/partnersponsors/${editObject.id}`, form)
        .then((response) => {
          this.showEditNewsModal = false;
          this.$oruga.notification.open({
            message: 'Partner Sponsor Updated',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.editingNo = '';
          this.reset();
          this.showEditSponsorsModal = false
          this.retrieveSponsors();
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
    removeSponsor(index) {
      this.editingNo = toNumber(index);
      this.$axios.$get(`v1/partnersponsors/${this.editingNo}`)
        .then((response) => {
          // eslint-disable-next-line max-len, camelcase, vue/max-len
          this.sponsor.company_name = response.data.partnerSponsor.company_name;
        });
      setTimeout(() => {
        this.showRemoveSponsorsModal = true;
      }, 1000);
    },
    remove(index) {
      const editObject = this.partnerSponsors.find(
        (item) => item.id === this.editingNo
      );
      this.$axios
        .$delete(`/v1/partnersponsors/${editObject.id}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Partner Sponsor Deleted',
            position: 'bottom',
            variant: 'success',
            queue: true,
          });
          this.reset();
          this.showRemoveSponsorsModal = false
          this.retrieveSponsors();
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
      this.showRemoveSponsorsModal = false;
    },
    reset() {
      // eslint-disable-next-line camelcase
      this.sponsor.company_name = '';
      // eslint-disable-next-line camelcase
      this.sponsor.first_name = '';
      // eslint-disable-next-line camelcase
      this.sponsor.last_name = '';
      this.sponsor.description = '';
      this.sponsor.link = '';
      this.imgList = []
      this.imgUrl = []
      this.imgListEdit = []
    },
  },
};

</script>

<style scoped>
.o-inputit__item--danger {
  background-color: #e73538 !important;
}

.part-item__actions [class^="ri-"] {
  padding-right: 0.25rem;
}

::v-deep .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
> .v-input__control > .v-input__slot {
  min-height: 52px;
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

.partner-sponsor-modal ::v-deep .o-modal__content {
  max-height: calc(100vh - 2rem);
  border-radius: 1rem;
  background: transparent;
  box-shadow: 0 30px 80px rgb(0 0 0 / 35%);
}

.partner-sponsor-modal ::v-deep .o-modal__close {
  display: none;
}

.partner-sponsor-modal ::v-deep .o-modal__overlay {
  background:
    radial-gradient(circle at 50% 15%, rgb(94 203 62 / 12%), transparent 30%),
    rgb(5 5 5 / 78%);
  backdrop-filter: blur(5px);
}

.sponsor-dialog {
  animation: sponsor-dialog-enter 0.28s ease-out;
}

.sponsor-upload ::v-deep > div {
  max-width: none;
}

.sponsor-upload ::v-deep .croppa-container {
  max-width: 100%;
  overflow: hidden;
  border: 2px dashed #d1d5db;
  border-radius: 0.75rem;
  background-color: #f9fafb;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.sponsor-upload ::v-deep .croppa-container:hover {
  border-color: #5ecb3e;
  background-color: #f0fdf4;
}

.sponsor-upload ::v-deep .v-btn {
  min-width: 42px;
  border-radius: 0.65rem;
  box-shadow: none;
}

@keyframes sponsor-dialog-enter {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 640px) {
  .partner-sponsor-modal ::v-deep .o-modal__content {
    max-height: calc(100vh - 1rem);
    margin: 0.5rem;
  }

  .sponsor-upload ::v-deep .croppa-container,
  .sponsor-upload ::v-deep canvas {
    height: auto !important;
    max-width: 100% !important;
  }
}
</style>

