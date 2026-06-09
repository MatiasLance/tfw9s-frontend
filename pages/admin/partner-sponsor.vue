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
                  @click="addPartnerSponsor"
                >
                  <i
                  class="
                  ri-add-line mr-2
                  text-lg transition-transform
                  group-hover:rotate-90"
                  ></i>
                  <span>Add Partner Sponsor</span>
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
                    bg-green-100 text-brand-green
                    hover:bg-green-200
                    active:bg-green-300
                    transition-colors
                    text-sm font-medium
                  "
                  @click="editSponsor(sponsor.id)"
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
                  @click="removeSponsor(sponsor.id)"
                >
                  <span class="text-white">
                    <i class="ri-delete-bin-5-line"></i>
                    Remove
                  </span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
       <!-- showAdd modal component -->
       <OModal
       :active="showAddSponsorsModal"
       @close="showAddSponsorsModal = false"
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
            Add Partner Sponsor
          </h3>
          <hr class="my-3">
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div class="col-span-1 md:col-span-2">
              <label for="sponsorname" class="mb-1 block">
                Company Name:
              </label>
              <VTextField
              id="name"
              v-model="sponsor.company_name"
              label="Enter Company Name"
              :rules="rules"
              type="text"
              solo
              />
            </div>
            <div class="col-span-1 md:col-span-2">
              <label for="sponsorname" class="mb-1 block">
                Hyperlink:
              </label>
              <VTextField
              id="name"
              v-model="sponsor.link"
              label="Enter Link"
              :rules="rules"
              type="url"
              solo
              />
            </div>
            <div class="col-span-1" hidden>
              <label for="sponsorfirst" class="mb-1 block">
                Firstname:
              </label>
              <VTextField
                id="name"
                v-model="sponsor.first_name"
                label="Enter Firstname"
                type="text"
                solo
              />
            </div>
            <div class="col-span-1" hidden>
              <label for="sponsorlast" class="mb-1 block">
                Lastname:
              </label>
              <VTextField
              id="name"
              v-model="sponsor.last_name"
              label="Enter Lastname"
              type="text"
              solo
              />
            </div>
            <div class="col-span-1 md:col-span-2" hidden>
              <label for="sponsordescription" class="mb-1 block">
                Description:
              </label>
              <Tiptap
              id="content"
              v-model="sponsor.description"
              />
            </div>
            <div class="col-span-1 md:col-span-2">
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
      <!-- Show Edit News -->
      <OModal
      :active="showEditSponsorsModal"
      @close="showEditSponsorsModal = false"
    >
      <VForm
      ref="form" v-model="valid" lazy-validation
      class="p-2 md:p-4"
      >
        <h3 class="text-swd-red mb-3 font-bold">
          Edit Partner Sponsor
        </h3>
        <hr class="my-3">
        <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div class="col-span-1 md:col-span-2">
            <label for="sponsorname" class="mb-1 block">
              Company Name:
            </label>
            <VTextField
            id="name"
            v-model="sponsor.company_name"
            label="Enter Company Name"
            :rules="rules"
            type="text"
            solo
            />
          </div>
          <div class="col-span-1 md:col-span-2">
            <label for="sponsorname" class="mb-1 block">
              Hyperlink:
            </label>
            <VTextField
              id="name"
              v-model="sponsor.link"
              label="Enter Link"
              :rules="rules"
              type="url"
              solo
            />
          </div>
          <div class="col-span-1" hidden>
            <label for="sponsorfirst" class="mb-1 block">
              Firstname:
            </label>
            <VTextField
            id="name"
            v-model="sponsor.first_name"
            label="Enter Firstname"
            :rules="rules"
            type="text"
            solo
            />
          </div>
          <div class="col-span-1" hidden>
            <label for="sponsorlast" class="mb-1 block">
              Lastname:
            </label>
            <VTextField
            id="name"
            v-model="sponsor.last_name"
            label="Enter Lastname"
            :rules="rules"
            type="text"
            solo
            />
          </div>
          <div class="col-span-1 md:col-span-2" hidden>
            <label for="sponsordescription" class="mb-1 block">
              Description:
            </label>
            <Tiptap
            id="content"
            v-model="sponsor.description"
            />
          </div>
          <div class="col-span-1 md:col-span-2">
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
      :active="showRemoveSponsorsModal"
      @close="showRemoveSponsorsModal = false"
    >
      <div class="w-full rounded bg-white p-2 sm:w-[890px] sm:p-4">
        <h3 class="text-swd-red mb-3 font-bold">
          Remove Sponsor {{ sponsor.company_name }}
        </h3>
        <hr class="my-3">
        <p class="text-center text-lg font-semibold">
          Are you sure you want to delete this ?
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
import handlesMedia from '~/mixins/shop/handlesMedia';
import BasePagination from '~/components/base/BasePagination';
import SearchBar from '~/components/SearchBar'
import aosMixin from '@/mixins/aos';
import currencyMixin from '@/mixins/currency';
import ImageUpload from '~/components/ImageUploadSolo'
import ImageUploadEdit from '~/components/ImageUploadEditSolo'
import Tiptap from '~/components/Wysiwyg/Tiptap';

const toNumber = (str) => +str;
export default {
  buildModules: [ '@nuxtjs/moment' ],
  components: {
    Tiptap,
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

