<!-- eslint-disable max-len -->
<template>
    <div class="min-h-screen bg-[#1A1A1B]">
      <div class="mx-auto max-w-screen-xl px-4 py-7">
        <div class="bg-[#1A1A1B]" data-aos="fade-up">
          <section class="mx-auto max-w-screen-xl gap-4 p-4">
            <div class="grid grid-cols-1 gap-4">
              <div
                v-if="
                  ($store.state.auth.roles.includes('admin') ||
                  $store.state.auth.roles.includes('superadmin'))"
                class="col-span-1 flex items-center"
              >
                <button
                type="button"
                class="
                from-40% via-95% to-100%
                w-full rounded-md
                bg-gradient-to-br
                from-[#5EE738] via-[#3e872a]
                to-[#050505] py-1.5
                text-center
                font-semibold
                text-white
                sm:w-36"
                @click="openEditContentDialog"
              >
                <i class="ri-edit-2-fill"></i>
                Edit
              </button>
              </div>

              <section
                class="col-span-1 overflow-x-scroll
                overflow-y-hidden md:overflow-x-hidden text-white"
              >
              <h1 class=" pt-4 text-4xl font-bold">
                {{ contentData.title }}
              </h1>
              <p class="py-4">
                <span v-html="contentData.content"/>
              </p>
              </section>
            </div>
          </section>
        </div>
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
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div class="col-span-1">
              <label for="regionname" class="mb-1 block">
                Title:
              </label>
              <VTextField
                id="name"
                v-model="contentData.title"
                label="Enter Title"
                :rules="rules"
                type="text"
                solo
              />
            </div>
          </div>
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
            @click="validate"
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
export default {
  components: { Tiptap },
  data() {
    return {
      valid: true,
      showEditContentModal: false,
      rules: [ value => !!value || 'Required' ],
      contentData: {
        title: '',
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
        this.retrieveTeamFolder()
      },
      immediate: true,
    },
  },
  methods: {
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
      form.append('title', this.contentData.title)
      form.append('content', this.contentData.content)

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$axios
        .$post(`v1/teamfolder/update/${1}`, form, config)
        .then((response) => {
          this.$oruga.notification.open({
            message: 'Team Folder Updated',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.showEditContentModal= false
          this.retrieveTeamFolder();
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
    retrieveTeamFolder() {
      const id = 1;

      this.$axios
        .$get(`v1/teamfolder/${id}`)
        .then((response) => {
          this.contentData.title = response.data.teamFolder.title
          this.contentData.content = response.data.teamFolder.content
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

