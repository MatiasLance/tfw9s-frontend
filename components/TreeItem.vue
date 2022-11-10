<template>
  <li v-show="!isPendingDeletion" class="group">
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
        hover:bg-gray-200
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
            text-brand-black
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

      <span>
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
      </span>
      <span>
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
      </span>
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

    <div>
      <OModal :active="deleteDialog" @close="closeDeleteDialog">
        <div class="w-full rounded bg-white sm:w-[440px]">
          <div class="p-4">
            <div class="text-lg leading-tight">
              Are you sure you want to delete
              <span class="font-bold text-brand-black">{{ item.name }}</span>
              category along with all its subcategories?
            </div>
          </div>
          <hr>
          <div
            class="
              flex items-center
              justify-end
              gap-2
              px-4
              pt-2
            "
          >
            <button
              type="button"
              class="
                rounded
                px-2
                py-1
                hover:bg-gray-500
                hover:text-white
              "
              @click="closeDeleteDialog"
            >
              Cancel
            </button>
            <button
              type="button"
              class="
                rounded
                px-2
                py-1
                text-brand-black
                hover:bg-brand-black
                hover:text-white
              "
              @click="deleteCategory"
            >
              Delete
            </button>
          </div>
        </div>
      </OModal>
    </div>
  </li>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import rules from '../mixins/treeitem/rules';
import categoryList from '~/mixins/shop/categories'

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
      this.isPendingDeletion = true
      this.$axios
        .$delete(`/v1/categories/${this.item.id}`)
        .then((response) => {
          this.retrieveCategories()
            .then(() => {
              this.closeDeleteDialog()
            })
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
    },
    openDeleteDialog() {
      this.deleteDialog = true
    },
    closeDeleteDialog() {
      this.deleteDialog = false
    },
  },
};
</script>