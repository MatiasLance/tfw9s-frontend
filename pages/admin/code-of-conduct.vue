<!-- eslint-disable max-len -->
<template>
    <div class="min-h-full bg-[#1A1A1B]">
      <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black">
         <!-- Breadcrumbs and Title -->
        <BreadCrumbs title="Code of Conduct Setting"/>
      </BaseHeader>
      <div class="mx-auto max-w-screen-xl px-4 py-7">
        <div data-aos="fade-up">
          <div class="grid grid-cols-1 gap-4">
            <div class="col-span-1 flex items-center">
              <button
                type="button"
                class="
                w-full rounded-md
                bg-gradient-to-br
                from-[#5EE738] via-[#3e872a]
                to-[#050505] py-1.5
                text-center
                font-semibold
                text-white
                sm:w-36"
                @click="openAddContentDialog"
              >
                +
              </button>
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

              <section class="col-span-1 overflow-x-scroll md:overflow-x-hidden">
                <div class="min-w-[640px] grid grid-cols-1 gap-4 md:gap-6">
                  <div
                    v-for="(content, index) in ContentList"
                    :key="content.id"
                    class="
                      rounded-lg border border-gray-200 bg-white p-5 shadow-sm
                      transition duration-300 hover:border-green-500 hover:shadow-md
                    "
                    data-aos="fade-up"
                    data-aos-offset="0"
                  >
                    <!-- Title + Status -->
                    <div class="mb-4 flex items-center justify-between">
                      <h3 class="text-xl font-bold text-gray-800">
                        Guideline {{ index + 1 }}
                      </h3>
                      <span v-if="content.isActive">
                        <ActiveChip />
                      </span>
                    </div>

                    <!-- Content Preview -->
                    <div class="mb-6 line-clamp-4 text-gray-600" v-html="content.content"></div>

                    <!-- Actions -->
                    <div class="flex justify-end space-x-3">
                      <BaseButton
                        v-if="!content.isActive"
                        @click="setActive(content.id)"
                        class="
                          flex items-center gap-2 rounded-md
                          border border-gray-300
                          bg-gray-800 px-4 py-2
                          text-sm font-medium
                          text-gray-800
                          transition
                          hover:bg-gray-700
                        "
                      >
                        <i class="ri-check-line text-white text-2xl"></i> Set as Active
                      </BaseButton>

                      <BaseButton
                        v-else
                        @click="deactivate(content.id)"
                        class="
                          flex items-center gap-2 rounded-md
                          border border-gray-300
                          bg-gray-800 px-4 py-2
                          text-sm font-medium
                          text-gray-800
                          transition
                          hover:bg-gray-700
                        "
                      >
                        <i class="ri-close-circle-line text-white text-2xl"></i> Deactivate
                      </BaseButton>

                      <BaseButton
                        @click="openEditContentDialog(content)"
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
                        <i class="ri-edit-line text-white text-xl"></i> Edit
                      </BaseButton>

                      <BaseButton
                        @click="openDeleteContentDialog(content)"
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
                        <i class="ri-delete-bin-line text-white text-xl"></i> Delete
                      </BaseButton>
                    </div>
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
                ri-sticky-note-line
                text-4xl text-green-500
                mb-3 animate-pulse"
                ></i>

                <!-- Message -->
                <h3 class="text-lg">
                  No Code of Conduct Available
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Try adding some code of conduct or adjusting your search.
                </p>
              </section>
            </div>
        </div>
      </div>
      <OModal
      :active="showAddContentModal"
      @close="closeAddContentDialog"
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
           Add Content
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
             @click="closeAddContentDialog"
           >
             Cancel
           </button>
         </div>
        </VForm>
     </OModal>
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
              lg:mx-4 lg:w-48
            "
            :disabled="!valid"
            @click="validate('Edit')"
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
    <OModal
    :active="showDeleteContentModal"
    @close="closeDeleteContentDialog"
    >
     <div class="w-full rounded bg-white p-2 sm:w-[890px] sm:p-4">
       <h3
     class="
     mb-3
     font-bold"
     >
         Delete Content
       </h3>
       <hr class="my-3  lg:w-[918px]"/>
       <div class="grid grid-cols-1">
         <div class="col-span-1">
           <label for="headline" class="mb-1 block">
            <span>Are you sure you want to delete this guideline</span>
           </label>
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
             lg:mx-4 lg:w-48
           "
           @click="DeleteContent"
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
           @click="closeDeleteContentDialog"
           >
           Cancel
         </button>
       </div>
     </div>
   </OModal>
    </div>
</template>

<script>
import Tiptap from '~/components/Wysiwyg/Tiptap'
import ActiveChip from '~/components/chips/ActiveChip';
export default {
  components: {
    Tiptap,
    ActiveChip
  },
  data() {
    return {
      valid: true,
      showAddContentModal: false,
      showEditContentModal: false,
      showDeleteContentModal: false,
      rules: [ value => !!value || 'Required' ],
      contentData: { content: '<p></p>' },
      ContentList: [],
      query: '',
      from: 0,
      to: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
      Rules: [
        value => {
          if (value) {
            return true
          }
          return 'Name is required.'
        },
        value => {
          if (value.length <= 10) {
            return true
          }
          return 'Name must be less than 10 characters.'
        },
      ],
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
        this.retrieveGuidelines()
      },
      immediate: true,
    },
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
      } else if (this.contentData.content === '<p></p>') {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Fill out Guideline Content',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else if (type === 'Add') {
        this.AddContent()
        return true;
      } else if (type === 'Edit') {
        this.UpdateContent()
        return true;
      } else {
        return false;
      }
    },
    setPage() {
      this.retrieveGuidelines();
    },
    openAddContentDialog(a) {
      this.showAddContentModal = true
    },
    openEditContentDialog(data) {
      this.contentData = data
      this.showEditContentModal = true
    },
    openDeleteContentDialog(data) {
      this.contentData = data
      this.showDeleteContentModal = true
    },
    closeAddContentDialog(a) {
      this.showAddContentModal = false
    },
    closeEditContentDialog(data) {
      this.contentData = ({})
      this.showEditContentModal = false
    },
    closeDeleteContentDialog(data) {
      this.contentData = ({})
      this.showDeleteContentModal = false
    },
    setActive(id) {
      this.$axios
        .$post(`v1/guidelines/active/${id}`)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Guideline Activated',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.retrieveGuidelines();
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
    deactivate(id) {
      this.$axios
        .$post(`v1/guidelines/deactivate/${id}`)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Guideline Deactivated',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.retrieveGuidelines();
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
    AddContent() {
      const form = new FormData();
      form.append('type', 'Code_of_conduct')
      form.append('content', this.contentData.content)

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$axios
        .$post('/v1/guidelines', form, config)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Guidline Added',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.showAddContentModal= false
          this.retrieveGuidelines();
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
    UpdateContent(data) {
      const form = new FormData();
      form.append('type', 'Code_of_conduct')
      form.append('content', this.contentData.content)

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$axios
        .$post(`v1/guidelines/${this.contentData.id}`, form, config)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Guideline Updated',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.showEditContentModal= false
          this.retrieveGuidelines();
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
    DeleteContent(data) {
      this.$axios
        .$delete(`/v1/guidelines/${this.contentData.id}`)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Guideline Deleted',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.showDeleteContentModal= false
          this.retrieveGuidelines();
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
      this.contentData = { content: '<p></p>' }
    },
    retrieveGuidelines() {
      const query = {
        q: this.query,
        page: this.page,
        type: 'Code_of_conduct',
        maxContentPerPage: 10,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/guidelines?${queryString}`)
        .then((response) => {
          this.ContentList = response.data.guidelines;
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
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
