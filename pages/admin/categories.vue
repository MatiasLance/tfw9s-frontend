<template>
  <div class="min-h-screen w-screen bg-[#1A1A1B]">
    <BaseHeader
    class="mx-auto max-w-screen-xl gap-4
    bg-gradient-to-r from-brand-green to-brand-black lg:px-8"
    >
      <div
        class="
          col-span-12
          text-center
          sm:space-y-3
          sm:text-left
          lg:col-span-6
          xl:mt-10"
        data-aos="fade-right"
      >
        <span
          class="
            superheadline flex flex-row
            items-center
            text-[1rem]
            font-normal
            text-white
          "
        >
          <span class="font-medium">
            <NuxtLink to="/admin">
              <VBtn text color="white">Admin</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl">
          Categories
        </h1>
      </div>
    </BaseHeader>

    <section class="container mx-auto max-w-screen-md px-2 sm:px-4">
      <div class="my-8 w-full py-7 sm:px-12">
        <div class="mb-4 flex flex-wrap items-center pl-4">
          <VEditDialog
            @save="createDialogSave"
            @cancel="createDialogCancel"
            @open="createDialogOpen"
          >
            <button
              type="button"
              class="
                text-bold
                mr-2
                flex
                items-center
                rounded
                bg-gradient-to-br
                from-[#5EE738]
                to-[#050505]
                py-1
                pl-2 pr-3 text-white
                transition
                hover:brightness-125
              "
            >
              <i class="ri-add-fill"></i>
              <span class="ml-1">
                Add Category
              </span>
            </button>
            <template #input>
              <VTextField
                v-model="newCategoryName"
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
            :class="`
              text-bold
              flex items-center
              rounded
              border border-solid
              py-1 pl-2 pr-3
              mr-2
              ${moveCategoryDisableClass}
            `"
            :disabled="moveCategoryDisabled"
            @click="showMoveDialog"
          >
            <i class="ri-arrow-left-right-line"></i>
            <span class="ml-1">Move Category</span>
          </button>
          <button
            type="button"
            :class="`
                bg-gray-200
                text-bold
                flex
                items-center
                rounded
                border border-solid border-gray-500
                py-1 pl-2 pr-3
                mr-2
                hover:border-brand-black hover:bg-brand-black hover:text-white
            `"
            @click="goToPartsList"
          >
            <i class="ri-arrow-right-line"></i>
            <span class="ml-1">Products</span>
          </button>
        </div>
        <ul class="gap-2 text-sm sm:text-base">
          <TreeItem
            v-for="category in categories"
            :key="category.id"
            class="item"
            :item="category"
          />
        </ul>
        <div class="flex justify-center">
          <div class="items-center">
          </div>
        </div>
        <MoveModal
          :active="moveDialog"
          @close="closeMoveDialog"
          @confirm="moveCategory"
        />
      </div>
    </section>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import logout from '~/mixins/auth/logout';
import TreeItem from '~/components/TreeItem.vue';
import MoveModal from '~/components/AdminCategoryTree/MoveModal.vue';
import rules from '~/mixins/treeitem/rules';
import categoryList from '~/mixins/shop/categories';

export default {
  components: {
    TreeItem,
    MoveModal,
  },
  mixins: [
    rules,
    categoryList,
    logout
  ],
  data() {
    return {
      isOpen: false,
      fullName: '',
      firstname: '',
      lastname: '',
      email: '',
      newCategoryName: '',
      moveDialog: false,
    };
  },
  head() {
    return { title: 'Categories - TFW9s' };
  },
  computed: {
    selectedCategories: {
      get() {
        return this.$store.state.admin.selectedCategories;
      },
    },
    moveCategoryDisabled: {
      get() {
        return this.selectedCategories.length < 1;
      },
    },
    moveCategoryDisableClass: {
      get() {
        if (this.moveCategoryDisabled) {
          return 'bg-[#212121] text-[#555555] border-none cursor-not-allowed';
        }

        return 'bg-gray-200 border-gray-200 hover:border-brand-black hover:bg-brand-black hover:text-white cursor-pointer';
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$store.state.auth.user !== null) {
        this.email = this.$store.state.auth.user.email;
        this.firstname = this.$store.state.auth.user.first_name;
        this.lastname = this.$store.state.auth.user.last_name;
        this.fullName = `${this.firstname} ${this.lastname}`;
      }
      document.addEventListener('click', this.close);
      this.retrieveCategories();
      setInterval(() => {
        this.$axios
          .$get('v1/users/me')
      }, 600000);
    });
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close);
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false;
      }
    },
    showMoveDialog() {
      this.moveDialog = true;
    },
    closeMoveDialog() {
      this.moveDialog = false;
    },
    moveCategory(category) {
      const categories = this.$store.state.admin.selectedCategories;
      if (category.id < 0) {
        category.id = null;
      }
      this.$axios
        .$post('/v1/categories/move', {
          categories,
          target: category.id,
        })
        .then((response) => {
          this.$oruga.notification.open({
            message: response.title,
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.retrieveCategories();
          this.$store.commit('admin/clearSelectedCategory');
          this.moveDialog = false;
        })
        .catch((err) => {
          let message = 'Category move failed. Please try again';
          if (err.response.data.title) {
            message = err.response.data.title;
          }
          this.$oruga.notification.open({
            message,
            variant: 'danger',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
        });
    },
    createDialogSave() {
      this.createCategory();
    },
    createDialogCancel() {
      this.newCategoryName = '';
    },
    createDialogOpen() {
      this.newCategoryName = '';
    },
    goToPartsList() {
      this.$router.push('/admin/products');
    },
    createCategory() {
      this.$axios
        .$post('/v1/categories', {
          name: this.newCategoryName,
          parentId: null,
        })
        .then((response) => {
          this.retrieveCategories();
        });

      // Fix race condition
      this.newCategoryName = '';
    },
  },
};
</script>

<style>
.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
</style>