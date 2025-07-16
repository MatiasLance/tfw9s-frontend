<template>
  <div class="h-full  bg-[#1A1A1B]">
    <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black">
      <!-- Breadcrumbs and Title -->
      <BreadCrumbs title="Home Page Setting"/>
    </BaseHeader>

    <div class="mx-auto max-w-screen-xl px-4 py-7">
      <div class="-mx-4 flex flex-wrap">
        <main class="w-full px-4">
          <div class="my-6 flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-wrap justify-start gap-2">
              <BaseButton
                @click="openEditContentDialog"
                class="
                  group
                  flex w-full items-center justify-center
                  bg-gradient-to-r from-green-500 via-lime-500 to-emerald-700
                  p-2.5
                  font-semibold text-white
                  transition-transform duration-200
                  hover:scale-[1.02]
                  sm:w-60
                  shadow-md hover:shadow-lg
                " 
              >
                <i
                  class="
                  ri-edit-line mr-2
                  text-lg transition-transform
                  group-hover:rotate-90"
                ></i>
                <span>
                  Edit
                </span>
              </BaseButton>
            </div>
          </div>
        </main>
      </div>
      <HeroSection
        :blurb="contentData.content"
        :image='contentData.image'
        :isAdmin='true'
      />
    </div>
    <OModal
      :active="showEditContentModal"
      @close="closeEditContentDialog"
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
          Edit Content
        </h3>
      <hr class="my-3  lg:w-[918px]"/>
      <div class="grid grid-cols-1">
        <div class="col-span-1">
          <label for="headline" class="mb-1 block">
            Content:
          </label>
          <Tiptap
            id="content"
            v-model="contentData.content"
          />
          <div class="col-span-1 md:col-span-2 pt-6">
            <ImageUpload
              :imglistedit="imgListEdit"
              :imgurledit="imgUrlEdit"
              @update-image-edit="updateImageEdit"
            />
          </div>
        </div>
      </div>
      <hr class="my-3  lg:w-[918px]"/>
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
          lg:mx-4 lg:w-48"
          :disabled="!valid" @click="validate"
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
          @click="closeEditContentDialog"
        >
          Cancel
        </button>
      </div>
      </VForm>
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
      showEditContentModal: false,
      rules: [ value => !!value || 'Required' ],
      imgListEdit: [],
      imgUrlEdit: [],
      contentData: {
        image: [],
        content: '<p></p>'
      },
      ContentList: [],
      query: '',
      totalPages: 0,
      totalItems: 0,
    };
  },
  watch: {
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
    page: {
      handler(newPage) {
        this.retrieveHomePageInfo()
      },
      immediate: true,
    },
  },
  methods: {
    updateImageEdit(image) {
      this.imgListEdit = image
    },
    validate() {
      if (!this.$refs.form.validate()) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Fill out all required fields',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else if (this.contentData.content === '<p></p>') {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Fill out Content',
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
    setPage() {
      this.retrieveGuidelines();
    },
    openEditContentDialog() {
      this.showEditContentModal = true
    },
    closeEditContentDialog() {
      this.showEditContentModal = false
    },
    updateTeamFolder() {
      const form = new FormData();
      form.append('content', this.contentData.content)

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
          this.reset();
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
        });
    },
    reset() {
      this.contentData = {
        content: '<p></p>',
        image: []
      }
    },
    retrieveHomePageInfo() {
      const id = 1;

      this.$axios
        .$get(`v1/homepageinfo/${id}`)
        .then((response) => {
          this.contentData.content = response.data.teamFolder.blurb
          this.contentData.image = response.data.teamFolder.media

          this.imgUrlEdit = this.contentData.image.map((x) =>
            `${this.$config.baseURL}/storage/${x.path}`);
          this.imgListEdit = this.contentData.image.map((x) => x.hash);
        })
    },
  }
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

