<!-- eslint-disable max-len -->
<template>
    <div class="h-full  bg-[#1A1A1B]">
      <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black shadow-md">
        <!-- Breadcrumbs and Title -->
         <BreadCrumbs title="Discount Code Setting"/>
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
                  @click="addDiscountCode"
                >
                  <i
                  class="
                  ri-add-line mr-2
                  text-lg transition-transform
                  group-hover:rotate-90"
                  ></i>
                  <span>Add Discount Code</span>
                </button>
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
                  @click="goToDiscountCodeTable"
                >
                  <i
                  class="
                  ri-add-line mr-2
                  text-lg transition-transform
                  group-hover:rotate-90"
                  ></i>
                  <span>Discount Table</span>
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
          ri-exchange-dollar-line
          text-4xl text-green-500
          mb-3 animate-pulse"
          ></i>

          <!-- Message -->
          <h3 class="text-lg">
            No Discount Code Available
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Try adding some discount code or adjusting your search.
          </p>
        </section>
        
        <div
          class="
          grid grid-cols-1 gap-x-0
          gap-y-6 sm:grid-cols-2
          sm:gap-x-4 md:grid-cols-3
          md:gap-x-4 md:gap-y-8 xl:grid-cols-3
          xl:gap-x-4 xl:gap-y-12"
        >
          <article
            v-for="code in discountCodeList"
            :key="code.id"
            class="
              group
              relative
              overflow-hidden
              rounded-lg
              bg-white
              text-black
              shadow-md
              transition-all duration-300 ease-in-out
              hover:shadow-xl hover:cursor-pointer
              flex flex-col
            "
            data-aos="fade-up"
          >
            <!-- Main Content -->
            <div class="p-5 flex flex-col justify-between h-full">
              <!-- Code Title -->
              <div class="mb-9 space-y-2">
                <span
                  class="text-2xl selection:bg-yellow-600 selection:text-white"
                >
                  <span
                    class="
                      font-michroma font-bold
                      transition
                      duration-200
                    "
                  >
                    {{ code.code }}
                  </span>
                </span>
              </div>

              <!-- Description -->
              <div class="mb-6 w-full">
                <p
                  class="text-left text-slate-400 line-clamp-1"
                  v-html="code.description"
                ></p>
              </div>

              <!-- Actions -->
              <div class="mt-4 flex flex-wrap justify-start gap-2">
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
                  @click="editNews(code.id)"
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
                  @click="removeNews(code.id)"
                >
                  <i class="ri-delete-bin-5-line"></i>
                  <span>Remove</span>
                </button>
              </div>
            </div>

            <!-- Optional Thumbnail -->
            <div
              v-if="showThumbnail"
              class="absolute inset-0 z-0 hidden md:block"
            >
              <img
                class="
                  absolute inset-0
                  object-cover
                  transition-transform duration-300
                  group-hover:scale-110
                "
                :src="getMediaURL([])"
                :alt="code.name"
              />
            </div>
          </article>
        </div>
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
            Add Discount Code
          </h3>
          <hr class="my-3">
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div class="col-span-3 mb-4">
              <label class="mb-1 block"> Codename: </label>
              <input
                v-model="discount.codename"
                class="
                  w-full
                  appearance-none
                  bg-gray-300
                  py-2
                  px-3
                  hover:border-gray-400
                  focus:border-gray-400 focus:outline-none
                "
                :class="showAddNewsError.codename.status ? 'border border-red-500' : 'border border-gray-100'"
                @keyup="showAddNewsError.codename.status = false"
              />
              <small
                v-if="showAddNewsError.codename.status"
                class="my-1 block text-xs text-red-500"
              >
                {{ showAddNewsError.codename.message }}
              </small>
            </div>
            <div class="col-span-3 mb-4 lg:col-span-1">
                <label class="mb-1 block">Discount Rate:</label>
                <div class="flex flex-wrap">
                <OInput
                    v-model="discount.rate"
                    placeholder="Rate"
                    type="number"
                    icon="percent"
                    min="0"
                    max="100"
                    class="w-40"
                ></OInput>
                <small
                v-if="showAddNewsError.rate.status"
                class="my-1 block text-xs text-red-500"
              >
                {{ showAddNewsError.rate.message }}
              </small>
                </div>
            </div>
            <div class="col-span-3 mb-4 lg:col-span-1">
              <div class="flex flex-wrap">
            <label class="mb-1 block">Applied to carts with at least:</label>
                  <OInput
                      v-model="discount.amountapplied"
                      placeholder="Amount"
                      type="number"
                      icon="currency-usd"
                      min="0"
                      max="100"
                      class="w-40"
                  ></OInput>
              </div>
            </div>
            <div class="col-span-3 mb-4 lg:col-span-1">
              <div class="flex flex-wrap">
            <label class="mb-1 block">Usage Limit:</label>
                  <OInput
                      v-model="discount.usageLimit"
                      placeholder="Usage Limit"
                      type="number"
                      min="0"
                      max="100"
                      class="w-40"
                  ></OInput>
              </div>
            </div>
            <div class="col-span-3 mb-4">
              <label class="mb-1 block"> Short Description: </label>
              <input
                v-model="discount.description"
                class="
                  w-full
                  appearance-none
                  bg-gray-300
                  py-2
                  px-3
                  hover:border-gray-400
                  focus:border-gray-400 focus:outline-none
                "
                :class="showAddNewsError.description.status ? 'border border-red-500' : 'border border-gray-100'"
                @keyup="showAddNewsError.description.status = false"
              />
              <small
                v-if="showAddNewsError.description.status"
                class="my-1 block text-xs text-red-500"
              >
                {{ showAddNewsError.description.message }}
              </small>
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
          Edit Discount Code
        </h3>
        <hr class="my-3">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div class="col-span-3 mb-4">
            <label class="mb-1 block"> Codename: </label>
            <input
              v-model="discount.codename"
              class="
                w-full
                appearance-none
                border border-gray-100
                bg-gray-200
                py-2
                px-3
                hover:border-gray-400
                focus:border-gray-400 focus:outline-none
              "
              required
            />
          </div>
          <div class="col-span-3 mb-4 lg:col-span-1">
            <label class="mb-1 block">Discount Rate:</label>
            <div class="flex flex-wrap">
            <OInput
                v-model="discount.rate"
                placeholder="Rate"
                type="text"
                icon="percent"
                required
            ></OInput>
            </div>
        </div>
        <div class="col-span-3 mb-4 lg:col-span-1">
          <div class="flex flex-wrap">
        <label class="mb-1 block">Applied to carts with at least:</label>
              <OInput
                  v-model="discount.amountapplied"
                  placeholder="Amount"
                  type="number"
                  icon="currency-usd"
                  min="0"
                  max="100"
                  class="w-40"
              ></OInput>
          </div>
        </div>
        <div class="col-span-3 mb-4 lg:col-span-1">
              <div class="flex flex-wrap">
            <label class="mb-1 block">Usage Limit:</label>
                  <OInput
                      v-model="discount.usageLimit"
                      placeholder="Usage Limit"
                      type="number"
                      min="0"
                      max="100"
                      class="w-40"
                  ></OInput>
              </div>
            </div>
        <div class="col-span-3 mb-4">
            <label class="mb-1 block"> Short Description: </label>
            <input
                v-model="discount.description"
                class="
                w-full
                appearance-none
                bg-gray-200
                py-2
                px-3
                hover:border-gray-400
                focus:border-gray-400 focus:outline-none
                "
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
          Remove Discount Code {{ discount.codename }}
        </h3>
        <hr class="my-3">
        <p class="text-center text-lg font-semibold">
          Are you sure you want to delete this ?
        </p>
        <hr class="my-3">
        <div class="flex items-center justify-center gap-2">
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
import currencyMixin from '@/mixins/currency';

const toNumber = (str) => +str;
export default {
  buildModules: [ '@nuxtjs/moment' ],
  components: {
    BasePagination,
    SearchBar,
    BreadCrumbs
  },
  mixins: [
    aosMixin,
    currencyMixin,
    logout,
    handlesMedia
  ],
  data() {
    return {
      myCroppa: {},
      myEditCroppa: {},
      showGenerateCreatedImageBtn: false,
      showGenerateEditedImageBtn: false,
      discount: {
        codename: '',
        rate: '',
        description: '',
        amountapplied: '',
        usageLimit: 0
      },
      showAddNewsError: {
        codename: {
          status: false,
          message: ''
        },
        rate: {
          status: false,
          message: ''
        },
        description: {
          status: false,
          message: ''
        },
      },
      imgUrl: [],
      imgUrlEdit: [],
      imgList: [],
      imgListEdit: [],
      query: null,
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
      newsList: [],
      showThumbnail: false,
      discountCodeList: [],
      discountCodeListTest: [
        {
          id: 1,
          code: 'CODE1',
          description: 'This is a test',
          rate: 30,
          // eslint-disable-next-line camelcase
          created_at: '2023-10-21 00:00:00'
        },
        {
          id: 2,
          code: 'CODE2',
          description: 'This is a test',
          rate: 20,
          // eslint-disable-next-line camelcase
          created_at: '2023-10-22 04:30:00'
        },
      ],
      editingNo: -1,
      isNewsLoading: false,
      isNewsAdded: false,
      showAddNewsModal: false,
      showEditNewsModal: false,
      showRemoveNewsModal: false,
      showModal: false,
      headline: '',
      content: '',
      pageSEO: {
        title: 'Discount Code Admin - Drum HQ',
        description: 'Discount Code Page',
      },
      adminpage: { title: 'Discount Codes' }
    };
  },
  head() {
    return { title: this.pageSEO.title };
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
    goToDiscountCodeTable() {
      this.$router.push('discountcodes-table');
    },
    setAddNewsErrorContentStatus(status) {
      this.showAddNewsError.content.status = status
    },
    getExcerptContent(content) {
      const truncate = (str, max, suffix) => (str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`);
      return truncate(content, 190, '...')
    },
    addDiscountCode() {
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
        sort: 'a_to_z',
        page: this.page,
        maxDiscountPerPage: 10,
      };

      // Sanitize and remove null values
      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })
      const queryString = new URLSearchParams(query).toString()
      this.$axios
        .$get(`v1/discountcode?${queryString}`)
        .then((response) => {
          this.discountCodeList = response.data.discount;
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
    create() {
      if (!this.validateDiscountRate()) {
        return false
      }
      if (!this.isCreateNewsFormEmpty()) {
        const decimalRate = this.toDecimal(this.discount.rate)
        const discountcode = {
          code: this.discount.codename,
          rate: decimalRate,
          description: this.discount.description,
          amountapplied: this.discount.amountapplied,
          usageLimit: this.discount.usageLimit
        };
        const form = new FormData();
        form.append('code', discountcode.code);
        form.append('rate', discountcode.rate);
        form.append('description', discountcode.description);
        form.append('amountapplied', discountcode.amountapplied);
        form.append('usage_limit', discountcode.usageLimit)
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        this.$axios
          .$post('/v1/discountcode', form, config)
          .then((response) => {
            this.showAddNewsModal = false;
            this.isNewsAdded = true;
            this.$oruga.notification.open({
              message: response.message,
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
      } else {
        const isHeadlineEmptyOrUndefined = (this.discount.codename === '' ||
        typeof this.discount.codename === 'undefined')
        const isImgListEmpty = (this.discount.description.length === 0)
        if (isHeadlineEmptyOrUndefined) {
          this.showAddNewsError.codename.status = true
          this.showAddNewsError.codename.message = 'Please indicate the discount code'
          this.$oruga.notification.open({
            message: this.showAddNewsError.codename.message,
            variant: 'info',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
        }
        if (isImgListEmpty) {
          this.showAddNewsError.description.status = true
          this.showAddNewsError.description.message = 'Please add a short description.'
        }
      }
    },
    editNews(index) {
      this.$oruga.notification.open({
        message: 'Retrieving...',
        variant: 'info',
        duration: 2000,
        position: 'bottom',
        queue: true,
      });
      this.editingNo = toNumber(index);
      this.$axios
        .$get(`v1/discountcode/${this.editingNo}`)
        .then((response) => {
          this.$oruga.notification.open({
            message: response.title,
            variant: 'success',
            duration: 2000,
            position: 'bottom',
            queue: true,
          });
          this.discount.codename = response.data.discountcode.code;
          this.discount.rate = response.data.discountcode.rate * 100;
          this.discount.description = response.data.discountcode.description;
          this.discount.amountapplied = response.data
            .discountcode.amountapplied;
          this.discount.usageLimit = response.data
            .discountcode.usage_limit
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
      if (!this.validateDiscountRate()) {
        return false
      }
      const editObject = this.discountCodeList.find(
        (itemNews) => itemNews.id === this.editingNo
      );
      const decimalRate = this.toDecimal(this.discount.rate)
      const editedNews = {
        code: this.discount.codename,
        rate: decimalRate,
        description: this.discount.description,
        amountapplied: this.discount.amountapplied,
        usageLimit: this.discount.usageLimit
      };
      const form = new FormData();
      form.append('_method', 'PATCH');
      form.append('code', editedNews.code);
      form.append('rate', editedNews.rate);
      form.append('description', editedNews.description);
      form.append('amountapplied', editedNews.amountapplied);
      form.append('usage_limit', editedNews.usageLimit);
      form.append('id', index);
      this.$axios
        .$post(`v1/discountcode/${editObject.id}`, form)
        .then((response) => {
          this.showEditNewsModal = false;
          this.$oruga.notification.open({
            message: response.Message,
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
      this.$axios.$get(`v1/discountcode/${this.editingNo}`)
        .then((response) => {
          this.discount.codename = response.data.discountcode.code;
        });
      setTimeout(() => {
        this.showRemoveNewsModal = true;
      }, 1000);
    },
    remove(index) {
      const editObject = this.discountCodeList.find(
        (itemNews) => itemNews.id === this.editingNo
      );
      this.$axios
        .$delete(`/v1/discountcode/${editObject.id}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: response.Message,
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
      this.discountCodeList.splice(index, 1);
      this.reset();
      this.showRemoveNewsModal = false;
    },
    reset() {
      this.headline = '';
      this.content = '';
      this.discount.codename = ''
      this.discount.rate = ''
      this.discount.description = ''
      this.discount.amountapplied = ''
      this.discount.usageLimit = 0
      this.imgList = []
      this.imgUrl = []
    },
    isCreateNewsFormEmpty() {
      return (
        this.discount.codename === '' ||
        typeof this.discount.codename === 'undefined' ||
        this.discount.description.length === 0 ||
        typeof this.discount.description === 'undefined'
      );
    },
    validateDiscountRate() {
      const discountRate = parseInt(this.discount.rate);
      if (discountRate > 100) {
        this.$oruga.notification.open({
          message: 'Maximum Discount rate is 100',
          variant: 'info',
          duration: 5000,
          position: 'bottom',
          queue: true,
        });
        return false;
      }
      return true;
    }
  },
};

</script>

<style>
    .croppa-container {
    background-color: #abb8c3;
    border: 3px solid #3981da;
    }
    .o-inputit__item--danger {
    background-color: #e73538 !important;
    }
</style>
