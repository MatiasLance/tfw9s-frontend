<!-- eslint-disable max-len -->
<template>
  <li v-show="!isPendingDeletion" class="group text-white">
    <div
      class="
        flex
        h-8
        select-none
        flex-wrap
        items-center
        gap-1
        rounded
        px-2
        bg-[#212121]
        hover:brightness-125
      "
      @click.prevent="toggle"
    >
      <span>
        <input
          :value="selected"
          type="checkbox"
          class="
            cursor-pointer
            border border-brand-black
            text-white
            outline-1 outline-brand-black
          "
          @click.stop="selected = !selected"
        >
      </span>

      <template v-if="isFolder">
        <span
          :class="`
            flex flex-wrap
            items-center
            text-xl
            duration-100
            min-w-[24px]
            ${folderStateClass}
          `"
        >
          <i class="ri-arrow-right-s-fill"></i>
        </span>
      </template>

      <template v-else>
        <span
          class="
            flex min-w-[24px]
            flex-wrap
            items-center
          "
        >
          <i class="ri-subtract-fill"></i>
        </span>
      </template>

      <span
        :class="`
          grow
          ${isFolder ? 'font-bold' : ''}
        `"
      >
        {{ item.name }}
      </span>

      <VEditDialog
        @save="createDialogSave"
        @cancel="createDialogCancel"
        @open="createDialogOpen"
      >
        <button
          type="button"
          class="
            flex
            h-6 w-4
            flex-wrap
            items-center
            justify-center
            rounded
            text-sm
            hover:bg-gray-100
            sm:w-6
          "
        >
          <i class="ri-add-fill"></i>
        </button>
        <template #input>
          <VTextField
            v-model="editableText"
            :rules="[max14chars]"
            label="Edit"
            single-line
            counter="14"
            maxlength="14"
          ></VTextField>
        </template>
      </VEditDialog>

      <VEditDialog
        @save="editDialogSave"
        @cancel="editDialogCancel"
        @open="editDialogOpen"
      >
        <button
          type="button"
          class="
            flex
            h-6 w-4
            flex-wrap
            items-center
            justify-center
            rounded
            text-sm
            hover:bg-gray-100
            sm:w-6
          "
        >
          <i class="ri-pencil-line"></i>
        </button>
        <template #input>
          <VTextField
            v-model="editableText"
            :rules="[max14chars]"
            label="Edit"
            single-line
            counter="14"
            maxlength="14"
          ></VTextField>
        </template>
      </VEditDialog>

      <button
        type="button"
        class="
          flex
          h-6 w-4
          flex-wrap
          items-center
          justify-center
          rounded
          text-sm
          text-brand-red
          hover:bg-brand-red
          hover:text-white
          sm:w-6
        "
        @click.stop="openDeleteDialog"
      >
        <i class="ri-delete-bin-6-line"></i>
      </button>
    </div>
    <ul v-show="isOpen" v-if="isFolder" class="ml-5">
      <TreeItem
        v-for="child in item.children"
        :key="child.id"
        class="item"
        :item="child"
      ></TreeItem>
    </ul>

    <OModal
      :active="deleteDialog"
      :width="'520px'"
      class="category-delete-modal"
      @close="closeDeleteDialog"
    >
      <div
        class="delete-dialog w-full overflow-hidden rounded-3xl bg-white"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-category-title"
        aria-describedby="delete-category-description"
        :aria-busy="isDeleting ? 'true' : 'false'"
      >
        <div class="relative overflow-hidden px-6 pb-6 pt-8 text-center sm:px-8">
          <div
            class="absolute -right-12 -top-14 h-36 w-36 rounded-full
            border-[24px] border-red-50"
          ></div>
          <div
            class="absolute -bottom-16 -left-12 h-36 w-36 rounded-full
            bg-red-50 blur-2xl"
          ></div>

          <button
            type="button"
            class="absolute right-4 top-4 z-10 flex h-10 w-10 items-center
            justify-center rounded-full text-gray-400 transition
            hover:rotate-90 hover:bg-gray-100 hover:text-gray-700
            focus:outline-none focus:ring-2 focus:ring-gray-300
            disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="isDeleting"
            aria-label="Close delete category dialog"
            @click="closeDeleteDialog"
          >
            <i class="ri-close-line text-2xl"></i>
          </button>

          <div class="relative mx-auto mb-5 h-20 w-20">
            <div
              class="absolute inset-0 animate-pulse rounded-3xl
              bg-red-100"
            ></div>
            <div
              class="relative flex h-20 w-20 rotate-3 items-center
              justify-center rounded-3xl border-8 border-red-50 bg-red-100
              text-red-600 shadow-lg shadow-red-100"
            >
              <i class="ri-delete-bin-6-line -rotate-3 text-3xl"></i>
            </div>
          </div>

          <div
            class="mb-3 inline-flex items-center gap-2 rounded-full
            bg-red-50 px-3 py-1 text-xs font-bold uppercase
            tracking-widest text-red-600"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
            Permanent action
          </div>

          <h2
            id="delete-category-title"
            class="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl"
          >
            Delete this category?
          </h2>
          <p
            id="delete-category-description"
            class="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500"
          >
            You are about to permanently remove
            <strong class="font-bold text-gray-900">“{{ item.name }}”</strong>
            from your category tree.
          </p>

          <div
            class="relative mt-6 flex items-start gap-3 rounded-2xl
            border border-red-100 bg-red-50/70 p-4 text-left"
          >
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center
              rounded-xl bg-white text-red-600 shadow-sm"
            >
              <i class="ri-alert-line text-xl"></i>
            </div>
            <div>
              <p class="text-sm font-bold text-red-900">
                What will happen?
              </p>
              <p class="mt-1 text-xs leading-5 text-red-700">
                <template v-if="descendantCount">
                  {{ descendantCount }}
                  nested
                  {{ descendantCount === 1 ? 'subcategory' : 'subcategories' }}
                  will also be deleted.
                </template>
                <template v-else>
                  This category will be removed from the current hierarchy.
                </template>
                This cannot be undone.
              </p>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col-reverse gap-3 border-t border-gray-200
          bg-gray-50 px-6 py-5 sm:flex-row sm:px-8"
        >
          <button
            type="button"
            class="inline-flex min-h-[50px] flex-1 items-center justify-center
            gap-2 rounded-xl border border-gray-500 bg-gray-500 px-5
            font-semibold text-gray-700 transition hover:border-gray-600
            hover:bg-gray-600 focus:outline-none focus:ring-2
            focus:ring-gray-600 disabled:cursor-not-allowed
            disabled:opacity-50"
            :disabled="isDeleting"
            @click="closeDeleteDialog"
          >
            <i class="ri-arrow-go-back-line text-lg"></i>
            Keep category
          </button>
          <button
            type="button"
            class="inline-flex min-h-[50px] flex-1 items-center justify-center
            gap-2 rounded-xl bg-red-600 px-5 font-bold text-white
            shadow-lg shadow-red-200 transition hover:-translate-y-0.5
            hover:bg-red-700 hover:shadow-xl focus:outline-none focus:ring-2
            focus:ring-red-500 focus:ring-offset-2
            disabled:cursor-wait disabled:opacity-70 disabled:shadow-none"
            :disabled="isDeleting"
            @click="deleteCategory"
          >
            <i
              :class="isDeleting
                ? 'ri-loader-4-line animate-spin'
                : 'ri-delete-bin-line'"
              class="text-lg"
            ></i>
            {{ isDeleting ? 'Deleting…' : 'Delete category' }}
          </button>
        </div>
      </div>
    </OModal>

  </li>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import rules from '../mixins/treeitem/rules';
import categoryList from '~/mixins/shop/categories'

const countDescendants = (children) => children.reduce(
  (total, child) => total + 1 + countDescendants(child.children || []),
  0
);

export default {
  name: 'TreeItem', // necessary for self-reference
  mixins: [
    rules,
    categoryList,
  ],
  props: {
    item: {
      type: [ Object, Array ],
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      editableText: '',
      deleteDialog: false,
      isSelected: false,
      isPendingDeletion: false,
      isDeleting: false,
    };
  },
  computed: {
    selected: {
      get() {
        return this.isSelected
      },
      set(val) {
        if (val) {
          this.$store.commit('admin/addSelectedCategory', this.item.id)
        } else {
          this.$store.commit('admin/removeSelectedCategory', this.item.id)
        }
        this.isSelected = val
      },
    },
    isFolder() {
      return this.item.children && this.item.children.length > 0;
    },
    descendantCount() {
      return countDescendants(this.item.children || []);
    },
    folderStateClass() {
      return this.isOpen ? 'rotate-90' : ''
    },
  },
  methods: {
    createDialogSave() {
      this.createCategory()
    },
    createDialogCancel() {
      this.editableText = ''
    },
    createDialogOpen() {
      this.editableText = ''
    },
    editDialogSave() {
      this.updateCategory()
    },
    editDialogCancel() {
      this.editableText = ''
    },
    editDialogOpen() {
      this.editableText = this.item.name
    },
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    createCategory() {
      this.$axios
        .$post('/v1/categories', {
          name: this.editableText,
          parentId: this.item.id,
        })
        .then((response) => {

          this.retrieveCategories()
            .then(() => {
              this.isOpen = true
            })
        })

      // Fix race condition
      this.editableText = ''
    },
    updateCategory() {
      this.$axios
        .$patch(`/v1/categories/${this.item.id}`, { name: this.editableText })
        .then((response) => {
          this.retrieveCategories()
        })

      // Fix race condition
      this.editableText = ''
    },
    deleteCategory() {
      if (this.isDeleting) {
        return;
      }

      this.isDeleting = true
      this.$axios
        .$delete(`/v1/categories/${this.item.id}`)
        .then((response) => {
          this.isPendingDeletion = true
          return this.retrieveCategories()
        })
        .catch(() => {
          this.isPendingDeletion = false
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Category deletion failed. Please try again',
            position: 'bottom',
            variant: 'danger',
            closable: true,
            queue: true,
          });
        })
        .finally(() => {
          this.isDeleting = false
          if (this.isPendingDeletion) {
            this.closeDeleteDialog()
          }
        })
    },
    openDeleteDialog() {
      this.deleteDialog = true
    },
    closeDeleteDialog() {
      if (this.isDeleting) {
        return;
      }
      this.deleteDialog = false
    },
  },
};
</script>

<style scoped>
input[type="checkbox"] {
  -webkit-appearance: none; /* Remove default styles */
  -moz-appearance: none;
  appearance: none;
  background-color: white; /* Transparent background */
  border: 2px solid white; /* White border */
  width: 25px; /* Adjust width and height as needed */
  height: 25px;
  outline: none; /* Remove outline */
  cursor: pointer; /* Show pointer on hover */
  border-radius: 5px;
}

/* Background color for checked checkbox */
input[type="checkbox"]:checked {
  background-color:#4cbe5c; /* Orange background */
}

/* Optional: Styles for checkmark */
input[type="checkbox"]::after {
  display: inline-block;
  font-size: 14px; /* Adjust size as needed */
  color: white; /* Color of the checkmark */
  line-height: 1; /* Vertical alignment */
  visibility: hidden; /* Hide by default */
}

/* Show checkmark when checkbox is checked */
input[type="checkbox"]:checked::after {
  visibility: visible;
}

.category-delete-modal ::v-deep .o-modal__overlay {
  background:
    radial-gradient(circle at 50% 20%, rgb(239 68 68 / 10%), transparent 32%),
    rgb(5 5 5 / 78%);
  backdrop-filter: blur(5px);
}

.category-delete-modal ::v-deep .o-modal__content {
  max-height: calc(100vh - 2rem);
  overflow: hidden;
  border-radius: 1.5rem;
  background: transparent;
  box-shadow: 0 30px 80px rgb(0 0 0 / 40%);
}

.category-delete-modal ::v-deep .o-modal__close {
  display: none;
}

.delete-dialog {
  animation: delete-dialog-enter 0.28s ease-out;
}

@keyframes delete-dialog-enter {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 640px) {
  .category-delete-modal ::v-deep .o-modal__content {
    max-height: calc(100vh - 1rem);
    margin: 0.5rem;
    border-radius: 1.25rem;
  }
}
</style>
