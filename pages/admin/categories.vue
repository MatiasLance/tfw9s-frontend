<!-- eslint-disable max-len -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#111712]
    via-[#1A1A1B] to-[#0d120e]"
  >
    <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black shadow-md">
      <BreadCrumbs title="Categories"/>
    </BaseHeader>

    <main class="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <section
        class="relative mb-7 overflow-hidden rounded-3xl border
        border-white/10 bg-gradient-to-br from-brand-grey-2 via-brand-black
        to-green-900 p-6 shadow-2xl shadow-black/30 sm:p-8"
      >
        <div
          class="absolute -right-16 -top-20 h-64 w-64 rounded-full
          border-[36px] border-brand-green/10"
        ></div>
        <div
          class="absolute -bottom-24 right-32 h-56 w-56 rounded-full
          bg-brand-green/10 blur-3xl"
        ></div>

        <div
          class="relative flex flex-col gap-7 lg:flex-row
          lg:items-end lg:justify-between"
        >
          <div class="max-w-2xl">
            <div
              class="mb-4 inline-flex items-center gap-2 rounded-full
              border border-brand-green/20 bg-brand-green/10 px-3 py-1.5
              text-xs font-bold uppercase tracking-widest text-green-300"
            >
              <span class="h-2 w-2 animate-pulse rounded-full bg-brand-green"></span>
              Content organization
            </div>
            <h1 class="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Shape your product catalogue
            </h1>
            <p class="mt-3 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
              Build a clear category hierarchy so products stay organized and
              customers can find what they need faster.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-2 sm:gap-3">
            <div
              class="min-w-0 rounded-2xl border border-white/10
              bg-white/5 px-3 py-3 text-center backdrop-blur-sm sm:min-w-[112px]"
            >
              <p class="text-2xl font-black text-white">
                {{ totalCategoryCount }}
              </p>
              <p class="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Total
              </p>
            </div>
            <div
              class="min-w-0 rounded-2xl border border-white/10
              bg-white/5 px-3 py-3 text-center backdrop-blur-sm sm:min-w-[112px]"
            >
              <p class="text-2xl font-black text-white">
                {{ rootCategoryCount }}
              </p>
              <p class="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Top level
              </p>
            </div>
            <div
              class="min-w-0 rounded-2xl border border-brand-green/20
              bg-brand-green/10 px-3 py-3 text-center backdrop-blur-sm
              sm:min-w-[112px]"
            >
              <p class="text-2xl font-black text-brand-green">
                {{ selectedCategoryCount }}
              </p>
              <p class="mt-1 text-[11px] font-semibold uppercase tracking-wide text-green-200">
                Selected
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        class="overflow-hidden rounded-3xl border border-gray-200
        bg-gray-50 shadow-2xl shadow-black/25"
      >
        <div
          class="flex flex-col gap-5 border-b border-gray-200 bg-white
          p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div class="flex items-center gap-3">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-2xl
                bg-green-50 text-green-700"
              >
                <i class="ri-node-tree text-2xl"></i>
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900">
                  Category tree
                </h2>
                <p class="mt-0.5 text-sm text-gray-500">
                  Select, expand, and manage categories from one place.
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <VEditDialog
              @save="createDialogSave"
              @cancel="createDialogCancel"
              @open="createDialogOpen"
            >
              <button
                type="button"
                class="inline-flex min-h-[46px] w-full items-center
                justify-center gap-2 rounded-xl bg-brand-green px-5
                font-bold text-brand-black shadow-md shadow-green-200
                transition hover:-translate-y-0.5 hover:bg-green-500
                hover:shadow-lg focus:outline-none focus:ring-2
                focus:ring-brand-green focus:ring-offset-2 sm:w-auto"
              >
                <i class="ri-add-circle-line text-xl"></i>
                Add category
              </button>
              <template #input>
                <div class="category-edit-field pt-2">
                  <p class="mb-3 text-sm font-semibold text-gray-700">
                    Name your new top-level category
                  </p>
                  <VTextField
                    v-model="newCategoryName"
                    :rules="[max14chars]"
                    label="Category name"
                    prepend-inner-icon="ri-price-tag-3-line"
                    single-line
                    counter="14"
                    maxlength="14"
                    autofocus
                  ></VTextField>
                </div>
              </template>
            </VEditDialog>

            <button
              type="button"
              class="inline-flex min-h-[46px] w-full items-center
              justify-center gap-2 rounded-xl border px-5 font-semibold
              transition focus:outline-none focus:ring-2 focus:ring-offset-2
              sm:w-auto"
              :class="moveCategoryButtonClass"
              :disabled="moveCategoryDisabled"
              @click="showMoveDialog"
            >
              <i class="ri-drag-move-2-line text-lg"></i>
              <span>Move</span>
              <span
                v-if="selectedCategoryCount"
                class="flex h-6 min-w-[24px] items-center justify-center
                rounded-full bg-green-200/70 px-1.5 text-xs text-green-900"
              >
                {{ selectedCategoryCount }}
              </span>
            </button>

            <button
              type="button"
              class="inline-flex min-h-[46px] w-full items-center
              justify-center gap-2 rounded-xl border border-gray-300
              bg-white px-5 font-semibold text-gray-700 transition
              hover:border-gray-900 hover:bg-gray-900 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-gray-400
              focus:ring-offset-2 sm:w-auto"
              @click="goToPartsList"
            >
              <i class="ri-shopping-bag-3-line text-lg"></i>
              View products
              <i class="ri-arrow-right-line"></i>
            </button>

            <button
              type="button"
              class="inline-flex min-h-[46px] w-full items-center
              justify-center rounded-xl border border-gray-300 bg-white
              px-3 text-gray-500 transition hover:border-green-300
              hover:bg-green-50 hover:text-green-700 focus:outline-none
              focus:ring-2 focus:ring-brand-green focus:ring-offset-2 sm:w-auto"
              :disabled="isLoadingCategories"
              aria-label="Refresh categories"
              title="Refresh categories"
              @click="refreshCategories"
            >
              <i
                class="ri-refresh-line text-xl"
                :class="{ 'animate-spin': isLoadingCategories }"
              ></i>
            </button>
          </div>
        </div>

        <div
          v-if="selectedCategoryCount"
          class="flex flex-col gap-3 border-b border-green-200 bg-green-50
          px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <div class="flex items-center gap-2 text-sm text-green-900">
            <i class="ri-checkbox-circle-fill text-lg text-green-600"></i>
            <span>
              <strong>{{ selectedCategoryCount }}</strong>
              {{ selectedCategoryCount === 1 ? 'category' : 'categories' }}
              ready to move
            </span>
          </div>
          <button
            type="button"
            class="text-left text-sm font-semibold text-green-800 underline
            decoration-green-300 underline-offset-4 transition
            hover:text-green-900 sm:text-right"
            @click="clearSelectedCategories"
          >
            Clear selection
          </button>
        </div>

        <div class="p-4 sm:p-6">
          <div
            v-if="isLoadingCategories && categories.length === 0"
            class="flex min-h-[320px] flex-col items-center justify-center
            rounded-2xl border border-dashed border-gray-300 bg-white"
          >
            <div
              class="mb-4 flex h-14 w-14 items-center justify-center
              rounded-2xl bg-green-50 text-green-600"
            >
              <i class="ri-loader-4-line animate-spin text-3xl"></i>
            </div>
            <h3 class="font-bold text-gray-900">
              Loading your categories
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Building the category tree…
            </p>
          </div>

          <div
            v-else-if="categories.length === 0"
            class="flex min-h-[320px] flex-col items-center justify-center
            rounded-2xl border-2 border-dashed border-gray-300 bg-white
            px-5 text-center"
          >
            <div
              class="mb-5 flex h-20 w-20 items-center justify-center
              rounded-3xl bg-green-50 text-green-600"
            >
              <i class="ri-folder-add-line text-4xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900">
              Start your category tree
            </h3>
            <p class="mt-2 max-w-md text-sm leading-6 text-gray-500">
              Add your first top-level category, then use the plus button on
              any row to build subcategories beneath it.
            </p>
          </div>

          <div v-else class="category-tree">
            <div
              class="mb-4 flex flex-col gap-3 rounded-2xl border
              border-gray-200 bg-white px-4 py-3 text-xs text-gray-500
              sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span class="inline-flex items-center gap-1.5">
                  <i class="ri-arrow-right-s-fill text-base text-gray-700"></i>
                  Expand category
                </span>
                <span class="inline-flex items-center gap-1.5">
                  <i class="ri-add-line text-base text-green-600"></i>
                  Add child
                </span>
                <span class="inline-flex items-center gap-1.5">
                  <i class="ri-pencil-line text-base text-blue-600"></i>
                  Rename
                </span>
              </div>
              <span class="font-medium text-gray-600">
                Select rows to move them together
              </span>
            </div>

            <ul class="space-y-2 text-sm sm:text-base">
              <TreeItem
                v-for="category in categories"
                :key="category.id"
                class="item"
                :item="category"
              />
            </ul>
          </div>
        </div>

        <div
          class="flex flex-col gap-3 border-t border-gray-200 bg-white
          px-5 py-4 text-xs text-gray-500 sm:flex-row sm:items-center
          sm:justify-between sm:px-6"
        >
          <span class="inline-flex items-center gap-2">
            <i class="ri-information-line text-base text-green-600"></i>
            Click a category row to reveal its subcategories.
          </span>
          <button
            type="button"
            class="inline-flex items-center gap-1 font-semibold text-gray-700
            transition hover:text-green-700"
            @click="goToPartsList"
          >
            Manage associated products
            <i class="ri-arrow-right-up-line"></i>
          </button>
        </div>
      </section>

      <MoveModal
        :active="moveDialog"
        class="category-move-modal"
        @close="closeMoveDialog"
        @confirm="moveCategory"
      />
    </main>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import logout from '~/mixins/auth/logout';
import TreeItem from '~/components/TreeItem.vue';
import MoveModal from '~/components/AdminCategoryTree/MoveModal.vue';
import rules from '~/mixins/treeitem/rules';
import categoryList from '~/mixins/shop/categories';

const countCategoryNodes = (categories) => categories.reduce(
  (total, category) => total + 1 + countCategoryNodes(category.children || []),
  0
);

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
      isLoadingCategories: true,
      sessionRefreshTimer: null,
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
    moveCategoryButtonClass: {
      get() {
        if (this.moveCategoryDisabled) {
          return 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400';
        }

        return 'cursor-pointer border-green-200 bg-green-50 text-green-800 hover:border-brand-green hover:bg-green-100 focus:ring-brand-green';
      },
    },
    selectedCategoryCount() {
      return this.selectedCategories.length;
    },
    rootCategoryCount() {
      return Array.isArray(this.categories) ? this.categories.length : 0;
    },
    totalCategoryCount() {
      return Array.isArray(this.categories)
        ? countCategoryNodes(this.categories)
        : 0;
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
      this.refreshCategories();
      this.sessionRefreshTimer = setInterval(() => {
        this.$axios
          .$get('v1/users/me')
      }, 600000);
    });
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close);
    clearInterval(this.sessionRefreshTimer);
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
    async refreshCategories() {
      this.isLoadingCategories = true;
      try {
        await this.retrieveCategories();
      } catch (error) {
        this.$oruga.notification.open({
          message: 'Categories could not be loaded. Please try again.',
          variant: 'danger',
          duration: 5000,
          position: 'bottom',
          queue: true,
        });
      } finally {
        this.isLoadingCategories = false;
      }
    },
    clearSelectedCategories() {
      this.$store.commit('admin/clearSelectedCategory');
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

<style scoped>
.item {
  cursor: pointer;
  line-height: 1.5;
}

.bold {
  font-weight: bold;
}

.category-tree ::v-deep .item {
  color: #fff;
}

.category-tree ::v-deep .item > div:first-child {
  min-height: 52px;
  height: auto;
  flex-wrap: nowrap;
  gap: 0.35rem;
  border: 1px solid #374151;
  border-radius: 0.85rem;
  background: linear-gradient(115deg, #212121 0%, #292d29 100%);
  padding: 0.55rem 0.75rem;
  box-shadow: 0 5px 14px rgb(0 0 0 / 10%);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.category-tree ::v-deep .item > div:first-child:hover {
  border-color: #5ecb3e;
  box-shadow: 0 8px 20px rgb(20 83 45 / 18%);
  transform: translateX(3px);
}

.category-tree ::v-deep .item > div:first-child > span:nth-child(3) {
  overflow: hidden;
  padding: 0 0.35rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-tree ::v-deep .item > div:first-child button {
  width: 2rem;
  min-width: 2rem;
  height: 2rem;
  border-radius: 0.55rem;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.category-tree ::v-deep .item > div:first-child button:hover {
  transform: translateY(-1px);
}

.category-tree ::v-deep .item > ul {
  position: relative;
  margin-top: 0.45rem;
  margin-left: 1.25rem;
  padding-left: 0.8rem;
  border-left: 2px solid #d1fae5;
}

.category-tree ::v-deep .item > ul::before {
  position: absolute;
  top: 0;
  left: -2px;
  width: 2px;
  height: 2rem;
  background: #5ecb3e;
  content: "";
}

.category-tree ::v-deep input[type="checkbox"]:focus-visible {
  outline: 3px solid rgb(94 203 62 / 30%);
  outline-offset: 2px;
}

.category-move-modal ::v-deep .o-modal__overlay {
  background: rgb(5 5 5 / 75%);
  backdrop-filter: blur(4px);
}

.category-move-modal ::v-deep .o-modal__content {
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 30px 80px rgb(0 0 0 / 35%);
}

@media (max-width: 640px) {
  .category-tree ::v-deep .item > div:first-child {
    padding-right: 0.4rem;
    padding-left: 0.5rem;
  }

  .category-tree ::v-deep .item > ul {
    margin-left: 0.65rem;
    padding-left: 0.45rem;
  }
}
</style>
