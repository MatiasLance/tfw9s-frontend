<!-- eslint-disable max-len -->
<template>
  <div class="min-h-screen bg-[#1A1A1B]">
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
          Rules
        </h1>
      </div>
    </BaseHeader>
    <div class="mx-auto max-w-screen-xl px-4 py-7">
      <div class="bg-[#1A1A1B]" data-aos="fade-up">
        <section class="mx-auto max-w-screen-xl gap-4 p-4">
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
            <div
            v-if="totalPages > 0"
            class="col-span-1 flex flex-wrap items-center
            justify-around gap-x-2 md:justify-between"
            data-aos="flip-up"
            >
              <span
              class="font-medium text-white"
              >
              Showing {{ from }}-{{ to }} of {{ totalItems }} items
              </span>
              <VPagination
                v-model="page"
                :length="totalPages"
                :total-visible="7"
                class="text-white"
                color="success"
                dark
                @change="setPage"
                />
            </div>
            <section
            class="col-span-1 overflow-x-scroll
            overflow-y-hidden md:overflow-x-hidden"
            >
              <div class="grid min-w-[640px] grid-cols-1 gap-2">
                <div
                v-for="(content, index) in ContentList"
                :key="content.id"
                class="col-span-1 p-4 text-white bg-[#212121]"
                data-aos="fade-up" data-aos-offset="0"
                >
                  <Form class="grid grid-cols-3 gap-2 p-2">
                    <div class="col-span-3 font-semibold">
                      {{ `Guideline ${index + 1}`}}
                      <span v-if="content.isActive">
                        <ActiveChip />
                      </span>
                    </div>
                    <span class="col-span-3 indent-8 line-clamp-4 link"
                    v-html="content.content"
                    />
                    <div class="col-span-3 flex justify-end gap-4">
                      <div v-if="!content.isActive">
                        <BaseButton
                          class="
                            max-w-full rounded-lg
                            border border-gray-200
                            bg-[#737373]
                            py-2
                            px-4
                            text-white
                            "
                            @click="setActive(content.id)"
                          >
                          Set as Active
                        </BaseButton>
                      </div>
                      <div v-else>
                        <BaseButton
                          class="
                            max-w-full rounded-lg
                            border border-gray-200
                            bg-[#737373]
                            py-2
                            px-4
                            text-white
                            "
                            @click="deactivate(content.id)"
                          >
                          Deactivate
                        </BaseButton>
                      </div>
                      <BaseButton
                      class="
                        max-w-full rounded-lg
                        border border-gray-200
                        bg-[#4cbe5c]
                        py-2
                        px-4
                        text-white
                        "
                        @click="openEditContentDialog(content)"
                      >
                        Edit
                      </BaseButton>
                      <BaseButton
                      class="
                        max-w-full rounded-lg
                        border border-gray-200
                        bg-[#fb0d2b]
                        py-2
                        px-4
                        text-white
                        "
                        @click="openDeleteContentDialog(content)"
                      >
                        Delete
                      </BaseButton>
                    </div>
                  </Form>
                </div>
              </div>
            </section>
            <section
            v-if="totalPages=== 0"
            class="col-span-1 flex h-60 items-center
            justify-center font-semibold
            text-[#555555] md:col-span-3"
            >
            No Rules Available
            </section>
          </div>
        </section>
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
          if (value?.length <= 10) {
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
      form.append('type', 'Rules')
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
      form.append('type', 'Rules')
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
        type: 'Rules',
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
