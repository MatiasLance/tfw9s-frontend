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
            Merch Products
          </h1>
        </div>
      </BaseHeader>

      <div class="mx-auto max-w-screen-xl px-4 py-7">
        <div class="-mx-4 flex flex-wrap">
          <main class="w-full px-4">
            <div class="my-6 flex flex-wrap items-center justify-between gap-4">
              <div
                class="flex flex-wrap justify-start gap-8"
              >
              <button
                type="button"
                class="
                  w-full rounded-md
                  bg-gradient-to-br
                  from-[#5EE738] via-[#3e872a]
                  to-[#050505] p-1.5
                  text-center
                  font-semibold
                  text-white
                  sm:w-60"
                @click="addMerchItem"
              >
                <span
                class="
                flex items-center
                justify-center"
                aria-hidden="true"
                >
                  <i class="ri-add-line"></i>
                  <span class="pr-1">Add Merch Item</span>
                </span>
              </button>
              <button
                type="button"
                class="
                  w-full rounded-md
                  bg-gradient-to-br
                  from-[#5EE738] via-[#3e872a]
                  to-[#050505] p-1.5
                  text-center
                  font-semibold
                  text-white
                  sm:w-60"
                @click="addMerchVariant"
              >
                <span
                class="
                flex items-center
                justify-center"
                aria-hidden="true"
                >
                  <i class="ri-add-line"></i>
                  <span class="pr-1">Add Merch Variant</span>
                </span>
              </button>
              </div>
              <div class="w-full sm:w-80">
              <form @submit.prevent="retrieveMerchItems">
                <SearchBar v-model="query" />
              </form>
            </div>
            </div>
          </main>
        </div>
        <div class="w-full">
          <CategorySlider
          @change="retrieveMerchItems"
          />
        </div>
        <section class="mb-8" data-aos="fade-up">
        <div
          v-if="totalPages > 0"
          class="
            flex flex-wrap items-center justify-around
            gap-x-2
            md:justify-between
          "
        >
          <span class="flex items-center">
            <p class="text-base leading-[2.5em] text-white">
              Showing {{ from }}-{{ to }} of {{ totalItems }} results
            </p>
          </span>
            <BasePagination
              :active-page="page"
              :total-pages="totalPages"
              @change="setPage"
            />
          </div>
        </section>
        <section
          class="
          grid grid-cols-1 gap-4
          "
          v-bind="$attrs"
        >
          <ManageItemThumbnailView
            v-for="product in MerchItems"
            :key="product.id"
            :uid="product.id"
            :name="product.name"
            :description="product.description"
            :price="product.price"
            :saleprice="product.saleprice"
            :categories="product.categories"
            :stock="product.stock"
            :path="getMediaURL(product.media[0])"
            :has-variants="product.has_variants"
            :is-rrp="product.show_rrp===1?true:false"
            :is-on-sale="product.is_on_sale===1?true:false"
            :is-hide-out-of-stock="product.isHideOutOfStock"
            data-aos="fade-up"
            data-aos-offset="30"
            @update="editMerchItem"
            @duplicate="duplicateItem"
            @addvariant="addVariant"
            @showvariant="showVariant"
            @delete="removeMerchItem"
          />
        </section>
        <section
          v-if="totalPages === 0"
          class="col-span-1 flex h-60 items-center
          justify-center font-semibold
          text-[#555555] md:col-span-3"
          >
          No Merch Available
        </section>
      </div>

      <OModal
       :active="showAddMerchVariantModal"
       @close="showAddMerchVariantModal = false"
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
            Add Merch Variant
          </h3>
          <hr class="my-3">
          <div class="grid grid-cols-1">
            <div class="col-span-1">
              <label for="productname" class="mb-1 block">
                Variant Name:
              </label>
              <VTextField
              id="name"
              v-model="variant"
              label="Enter Variant Name"
              :rules="rules"
              type="text"
              solo
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
              @click="saveVariant"
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
              @click="closeVariant"
            >
              Cancel
            </button>
          </div>
        </VForm>
      </OModal>

       <!-- Add Merch Modal component -->
        <OModal
          :active="showAddMerchItemModal"
          @close="showAddMerchItemModal = false"
          class="rugby-modal"
        >
          <VForm
            ref="form" 
            v-model="valid" 
            lazy-validation
            class="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-green-50 rounded-xl"
          >
            <!-- Header with Rugby Theme -->
            <div class="flex items-center mb-6 pb-4 border-b-2 border-green-600">
              <div class="rugby-icon mr-3 w-10 h-10 bg-green-600 rounded-full 
                          flex items-center justify-center shadow-lg">
                <i class="ri-t-shirt-line text-gray-50 text-xl"></i>
              </div>
              <h3 class="text-2xl font-bold bg-gradient-to-r from-green-600 to-gray-800 
                        bg-clip-text text-transparent">
                Add Rugby Merch
              </h3>
            </div>

            <!-- Product Details Grid -->
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <!-- Product Name -->
              <div class="col-span-1">
                <label for="productname" class="mb-2 block font-semibold text-gray-700">
                  <i class="ri-price-tag-3-line mr-2 text-green-600"></i>
                  Product Name:
                </label>
                <VTextField
                  id="name"
                  v-model="item.name"
                  label="Enter Product Name"
                  :rules="rules"
                  type="text"
                  solo
                  class="rugby-input"
                />
              </div>

              <!-- Stock -->
              <div class="col-span-1">
                <label for="productstock" class="mb-2 block font-semibold text-gray-700">
                  <i class="ri-stack-line mr-2 text-green-600"></i>
                  Stock:
                </label>
                <VTextField
                  id="stock"
                  v-model="item.stock"
                  label="Enter Stock"
                  :rules="rules"
                  type="number"
                  min="0"
                  solo
                  class="rugby-input"
                />
              </div>

              <!-- Price -->
              <div class="col-span-1">
                <label for="productprice" class="mb-2 flex justify-between
                font-semibold text-gray-700"
                >
                  <span><i class="ri-money-dollar-circle-line mr-2 text-green-600"></i>
                    Price:
                  </span>
                  <span class="font-bold text-green-700 bg-green-100 px-3 py-1 rounded-lg">
                    {{ formatCurrency(item.price) }}
                  </span>
                </label>
                <VTextField
                  id="price"
                  v-model="item.price"
                  label="Enter Price"
                  :rules="rules"
                  type="number"
                  step=".01"
                  min="0.00"
                  solo
                  class="rugby-input"
                />
              </div>

              <!-- Sale Price -->
              <div class="col-span-1">
                <label for="productsaleprice" class="mb-2 flex justify-between
                font-semibold text-gray-700"
                >
                  <span><i class="ri-discount-percent-line mr-2 text-green-600"></i>
                    Sale Price:
                  </span>
                  <span class="font-bold text-red-600 bg-red-100 px-3 py-1 rounded-lg">
                    {{ formatCurrency(item.saleprice) }}
                  </span>
                </label>
                <VTextField
                  id="saleprice"
                  v-model="item.saleprice"
                  label="Enter Sale Price"
                  type="number"
                  step=".01"
                  min="0.00"
                  solo
                  class="rugby-input"
                />
              </div>

              <!-- Description -->
              <div class="col-span-1 md:col-span-2">
                <label for="productdescription" class="mb-2 block font-semibold text-gray-700">
                  <i class="ri-file-text-line mr-2 text-green-600"></i>
                  Description:
                </label>
                <Tiptap
                  id="content"
                  v-model="item.description"
                  class="rugby-editor"
                />
              </div>

              <!-- Categories Section -->
              <div class="col-span-1 md:col-span-2">
                <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <div class="flex items-center justify-between mb-4">
                    <label class="block font-semibold text-gray-700">
                      <i class="ri-folder-line mr-2 text-green-600"></i>
                      Categories:
                    </label>
                    <button
                      type="button"
                      class="flex items-center gap-2 bg-green-600 hover:bg-green-700 
                            text-gray-50 font-semibold px-4 py-2 rounded-lg 
                            transition-all duration-200 transform hover:scale-105 
                            shadow-md"
                      @click="addCategoryPicker"
                    >
                      <i class="ri-add-fill"></i>
                      Add Category
                    </button>
                  </div>

                  <!-- Selected Categories -->
                  <div v-if="multipleCategoryBuffer.length > 0" 
                      class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div
                      v-for="(index) in multipleCategoryBuffer"
                      :key="index"
                      class="flex items-center gap-2 bg-gray-50 rounded-lg p-3 
                            border border-gray-200 group hover:border-green-300 
                            transition-colors duration-200"
                    >
                      <InfiniteCategories
                        :ref="`categoryPicker-${index}`"
                        :options="categories"
                        :lineage="categoryLineages[index - 1]"
                        class="flex-grow"
                      />
                      <button
                        type="button"
                        class="w-8 h-8 flex items-center justify-center bg-red-500 
                              hover:bg-red-600 text-gray-50 rounded-full 
                              transition-all duration-200 transform hover:scale-110 
                              shadow-sm"
                        @click="removeCategoryPicker(index)"
                      >
                        <i class="ri-close-line text-sm"></i>
                      </button>
                    </div>
                  </div>

                  <!-- Empty State -->
                  <div
                    v-else
                    class="bg-gray-100 rounded-lg p-6 text-center border-2 
                          border-dashed border-gray-300"
                  >
                    <i class="ri-folder-open-line text-3xl text-gray-400 mb-2"></i>
                    <p class="text-gray-600 font-medium">
                      No categories selected
                    </p>
                    <p class="text-gray-500 text-sm mt-1">
                      Add categories to organize your rugby merch
                    </p>
                  </div>
                </div>
              </div>

              <!-- Toggle Switches -->
              <div class="col-span-1 md:col-span-2">
                <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <h4 class="font-semibold text-gray-700 mb-3 flex items-center">
                    <i class="ri-toggle-line mr-2 text-green-600"></i>
                    Product Settings
                  </h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label class="rugby-toggle">
                      <input
                        v-model="item.is_featured"
                        type="checkbox"
                        class="rugby-checkbox"
                      />
                      <span class="rugby-toggle-slider"></span>
                      <span class="ml-3 font-medium text-gray-700">Featured Item</span>
                    </label>

                    <label class="rugby-toggle">
                      <input
                        v-model="item.isHideOutOfStock"
                        type="checkbox"
                        class="rugby-checkbox"
                      />
                      <span class="rugby-toggle-slider"></span>
                      <span class="ml-3 font-medium text-gray-700">Out of Stock</span>
                    </label>

                    <label class="rugby-toggle">
                      <input
                        v-model="item.is_on_sale"
                        type="checkbox"
                        class="rugby-checkbox"
                      />
                      <span class="rugby-toggle-slider"></span>
                      <span class="ml-3 font-medium text-gray-700">On Sale</span>
                    </label>

                    <label class="rugby-toggle">
                      <input
                        v-model="item.show_rrp"
                        type="checkbox"
                        class="rugby-checkbox"
                      />
                      <span class="rugby-toggle-slider"></span>
                      <span class="ml-3 font-medium text-gray-700">Show RRP</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Image Upload -->
              <div class="col-span-1 md:col-span-2">
                <ImageUpload
                  @update-image="updateImage"
                />
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col lg:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                class="flex-1 lg:flex-none bg-green-600 hover:bg-green-700 
                      text-gray-50 font-bold py-3 px-6 rounded-lg 
                      transition-all duration-200 transform hover:scale-105 
                      disabled:opacity-50 disabled:cursor-not-allowed 
                      disabled:transform-none shadow-lg"
                :disabled="!valid"
                @click="validate('Add')"
              >
                <i class="ri-check-double-line mr-2"></i>
                Add Rugby Merch
              </button>
              <button
                type="button"
                class="flex-1 lg:flex-none bg-gray-500 hover:bg-gray-600 
                      text-gray-50 font-bold py-3 px-6 rounded-lg 
                      transition-all duration-200 transform hover:scale-105 
                      shadow-lg"
                @click="close"
              >
                <i class="ri-close-line mr-2"></i>
                Cancel
              </button>
            </div>
          </VForm>
        </OModal>

      <!-- Show Edit Merch -->
      <OModal
        :active="showEditMerchItemModal"
        @close="showEditMerchItemModal = false"
        class="rugby-modal"
      >
        <VForm
          ref="form" 
          v-model="valid" 
          lazy-validation
          class="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl"
        >
          <!-- Header with Rugby Theme -->
          <div class="flex items-center mb-4 pb-3 border-b-2 border-green-600">
            <div class="rugby-ball-icon mr-3 w-8 h-8 bg-green-600
            rounded-full flex items-center justify-center"
            >
              <i class="ri-t-shirt-line text-white text-lg"></i>
            </div>
            <h3 class="text-2xl font-bold bg-gradient-to-r from-green-600
            to-gray-800 bg-clip-text text-transparent"
            >
              Edit Rugby Merch
            </h3>
          </div>

          <!-- Product Details Grid -->
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <!-- Product Name -->
            <div class="col-span-1">
              <label for="productname" class="mb-2 block font-semibold text-gray-700">
                <i class="ri-price-tag-3-line mr-2 text-green-600"></i>
                Product Name:
              </label>
              <VTextField
                id="name"
                v-model="item.name"
                label="Enter Product Name"
                :rules="rules"
                type="text"
                solo
                class="rugby-input"
              />
              <div class="text-xs text-gray-500 mt-1">
                {{ item.name ? `${item.name.length}/80` : '0/80' }}
              </div>
            </div>

            <!-- Stock -->
            <div class="col-span-1">
              <label for="productstock" class="mb-2 block font-semibold text-gray-700">
                <i class="ri-stack-line mr-2 text-green-600"></i>
                Stock:
              </label>
              <VTextField
                id="stock"
                v-model="item.stock"
                label="Enter Stock"
                :rules="rules"
                type="number"
                min="0"
                solo
                class="rugby-input"
              />
            </div>

            <!-- Price Fields -->
            <div class="col-span-1">
              <label for="productprice" class="mb-2 flex justify-between
              font-semibold text-gray-700"
              >
                <span><i class="ri-money-dollar-circle-line mr-2 text-green-600"></i>Price:</span>
                <span class="font-bold text-green-700 bg-green-100 px-2 py-1 rounded">
                  {{ formatCurrency(item.price) }}
                </span>
              </label>
              <VTextField
                id="price"
                v-model="item.price"
                label="Enter Price"
                :rules="rules"
                type="number"
                step=".01"
                min="0.00"
                solo
                class="rugby-input"
              />
            </div>

            <div class="col-span-1">
              <label for="productsaleprice" class="mb-2 flex justify-between
              font-semibold text-gray-700"
              >
                <span><i class="ri-discount-percent-line mr-2 text-green-600"></i>
                  Sale Price:
                </span>
                <span class="font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                  {{ formatCurrency(item.saleprice) }}
                </span>
              </label>
              <VTextField
                id="saleprice"
                v-model="item.saleprice"
                label="Enter Sale Price"
                type="number"
                step=".01"
                min="0.00"
                solo
                class="rugby-input"
              />
            </div>

            <!-- Description -->
            <div class="col-span-1 md:col-span-2">
              <label for="productdescription" class="mb-2 block
              font-semibold text-gray-700"
              >
                <i class="ri-file-text-line mr-2 text-green-600"></i>
                Description:
              </label>
              <Tiptap
                id="content"
                v-model="item.description"
                class="rugby-editor"
              />
              <div class="text-xs text-gray-500 mt-1">
                {{ item.description ? `${item.description.length}/80` : '0/80' }}
              </div>
            </div>

            <!-- Categories Section -->
            <div class="col-span-1 mb-4 md:col-span-2">
              <div class="flex items-center justify-between mb-3">
                <label class="block font-semibold text-gray-700">
                  <i class="ri-folder-line mr-2 text-green-600"></i>
                  Categories:
                </label>
                <button
                  type="button"
                  class="flex items-center justify-center bg-green-600 hover:bg-green-700
                  text-white font-semibold px-4 py-2 rounded-lg
                  transition-all duration-200 transform hover:scale-105"
                  @click="addCategoryPicker"
                >
                  <i class="ri-add-fill mr-2"></i>
                  Add Category
                </button>
              </div>
              <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                <div
                  v-for="categoryPickerIndex in multipleCategoryBuffer"
                  :key="categoryPickerIndex"
                  class="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200"
                >
                  <InfiniteCategories
                    :ref="`categoryPicker-${categoryPickerIndex}`"
                    :options="categories"
                    :lineage="categoryLineages[categoryPickerIndex-1]"
                  />
                  <button
                    type="button"
                    class="w-8 h-8 flex items-center justify-center
                    bg-gray-100 hover:bg-red-500
                    hover:text-white text-gray-600 rounded-full
                    transition-colors duration-200"
                    @click="removeCategoryPicker(categoryPickerIndex)"
                  >
                    <i class="ri-close-line"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Toggle Switches -->
            <div class="col-span-1 md:col-span-2">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4
              bg-white rounded-lg border border-gray-200"
              >
                <label class="rugby-toggle">
                  <input
                    v-model="item.is_featured"
                    type="checkbox"
                    class="rugby-checkbox"
                  />
                  <span class="rugby-toggle-slider"></span>
                  <span class="ml-3 font-medium text-gray-700">Featured</span>
                </label>

                <label class="rugby-toggle">
                  <input
                    v-model="item.isHideOutOfStock"
                    type="checkbox"
                    class="rugby-checkbox"
                  />
                  <span class="rugby-toggle-slider"></span>
                  <span class="ml-3 font-medium text-gray-700">Out of Stock</span>
                </label>

                <label class="rugby-toggle">
                  <input
                    v-model="item.is_on_sale"
                    type="checkbox"
                    class="rugby-checkbox"
                  />
                  <span class="rugby-toggle-slider"></span>
                  <span class="ml-3 font-medium text-gray-700">On Sale</span>
                </label>

                <label class="rugby-toggle">
                  <input
                    v-model="item.show_rrp"
                    type="checkbox"
                    class="rugby-checkbox"
                  />
                  <span class="rugby-toggle-slider"></span>
                  <span class="ml-3 font-medium text-gray-700">Show RRP</span>
                </label>
              </div>
            </div>

            <!-- Image Upload -->
            <div class="col-span-1 md:col-span-2">
              <ImageUploadEdit
                :imglistedit="imgListEdit"
                :imgurledit="imgUrlEdit"
                @update-image-edit="updateImageEdit"
              />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col lg:flex-row gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              class="flex-1 lg:flex-none bg-green-600 hover:bg-green-700 text-white
              font-bold py-3 px-6 rounded-lg transition-all duration-200
              transform hover:scale-105 disabled:opacity-50
              disabled:cursor-not-allowed disabled:transform-none"
              :disabled="!valid"
              @click="validate('Edit')"
            >
              <i class="ri-check-line mr-2"></i>
              Confirm Changes
            </button>
            <button
              type="button"
              class="flex-1 lg:flex-none bg-gray-500 hover:bg-gray-600
              text-white font-bold py-3 px-6 rounded-lg transition-all
              duration-200 transform hover:scale-105"
              @click="closeEdit"
            >
              <i class="ri-close-line mr-2"></i>
              Cancel
            </button>
          </div>
        </VForm>
      </OModal>

    <!-- showRemoveProduct modal component -->
    <OModal
      :active="showRemoveMerchItemModal"
      @close="showRemoveMerchItemModal = false"
    >
      <div class="w-full rounded bg-white p-2 sm:w-[890px] sm:p-4">
        <h3 class="text-swd-red mb-3 font-bold">
          Remove Merch Item {{ item.name }}
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
import CategorySlider from '~/components/CategorySlider.vue';
import logout from '~/mixins/auth/logout';
import handlesMedia from '~/mixins/shop/handlesMedia';
import BasePagination from '~/components/base/BasePagination';
import SearchBar from '~/components/SearchBar'
import aosMixin from '@/mixins/aos';
import currencyMixin from '@/mixins/currency';
import ImageUpload from '~/components/ImageUpload'
import ImageUploadEdit from '~/components/ImageUploadEdit'
import ManageItemThumbnailView from '~/components/ManageItemThumbnailView';
import Tiptap from '~/components/Wysiwyg/Tiptap';

const toNumber = (str) => +str;
export default {
  buildModules: [ '@nuxtjs/moment' ],
  components: {
    Tiptap,
    BasePagination,
    SearchBar,
    ImageUpload,
    ImageUploadEdit,
    ManageItemThumbnailView,
    CategorySlider
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
      item: {
        name: '',
        stock: 0,
        price: 0.00,
        description: '',
      },
      Taglist: [],
      tags: [],
      multipleCategoryCounter: 1,
      multipleCategoryBuffer: [ 1 ],
      categoryLineages: [],
      selectedCategory: {},
      tagQuery: '',
      MerchItems: [],
      myCroppa: {},
      myEditCroppa: {},
      showGenerateCreatedImageBtn: false,
      showGenerateEditedImageBtn: false,
      rules: [ value => !!value || 'Required' ],
      imgUrl: [],
      imgUrlEdit: [],
      imgList: [],
      imgListEdit: [],
      query: null,
      from: 0,
      to: 0,
      totalPages: 0,
      totalItems: 0,
      newsList: [],
      variant: '',
      variantList: [],
      myVariantList: [],
      prodId: '',
      editingNo: null,
      isNewsLoading: false,
      isNewsAdded: false,
      showAddMerchItemModal: false,
      showAddMerchVariantModal: false,
      showEditMerchItemModal: false,
      showRemoveMerchItemModal: false,
      showAddVariant: false,
      showShowVariant: false,
      showModal: false,
      headline: '',
      content: '',
      pageSEO: {
        title: 'Products - TFW9s',
        description: 'Products Page',
      },
      adminpage: { title: 'Products Codes' },
      checkedVariants: [],
    };
  },
  head() {
    return { title: this.pageSEO.title };
  },
  computed: {
    checkedVariantObjects() {
      return this.variantList.filter(
        variant => this.checkedVariants.includes(
          variant.id
        )
      );
    },
    categories: {
      get() {
        return this.$store.state.product.categories
      },
      set(value) {
        this.$store.commit('product/setCategories', value)
      }
    },
    page: {
      get() {
        return this.$store.state.shop.page;
      },
      set(value) {
        this.$store.commit('shop/setPage', value);
      },
    },
    formattedTags() {
      return this.Taglist.map(cat =>
        ({
          text: cat.name,
          value: cat.id,
        }));
    },
    filteredTags() {
      return this.formattedTags.filter(cat =>
        cat && cat.text && typeof cat.text === 'string' ?
          cat.text.toLowerCase().includes(this.tagQuery.toLowerCase()):
          false
      )
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
    this.debouncedSearch = debounce(this.retrieveMerchItems, 800);
    this.retrieveMerchItems();
    /* this.retrieveTags(); */
    this.page = 1 // Reset pagination
  },
  methods: {
    validate(type) {
      if (type === 'Add') {
        this.create()
        return true;
      } else if (type === 'Edit') {
        this.edit()
        return true;
      } else {
        return false;
      }
      /*
       * else if (this.tags.length === 0) {
       * this.$oruga.notification.open({
       *   duration: 5000,
       *   message: 'Item needs at least one tag',
       *   position: 'bottom',
       *   variant: 'danger',
       *   queue: true,
       * });
       * return false;
       * }
       */
    },
    addMerchItem() {
      this.showAddMerchItemModal = true;
      this.reset()
    },
    close() {
      this.showAddMerchItemModal = false;
    },
    addMerchVariant() {
      this.showAddMerchVariantModal = true;
      this.reset()
    },
    closeVariant() {
      this.showAddMerchVariantModal = false;
    },
    closeEdit() {
      this.showEditMerchItemModal = false;
    },
    closeRemove() {
      this.showRemoveMerchItemModal = false;
    },
    closeAddVariant() {
      this.showAddVariant = false;
    },
    closeShowVariant() {
      this.showShowVariant = false;
    },
    retrieveMerchItems() {
      this.isNewsLoading = true;

      const query = {
        q: this.query,
        page: this.page,
        category: this.$store.state.shop.selectedCategory,
      };

      // Sanitize and remove null values
      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })
      const queryString = new URLSearchParams(query).toString()
      this.$axios
        .$get(`v1/items?${queryString}`)
        .then((response) => {
          this.$store.commit('admin/setTotalItems', response.data.total_items)
          this.MerchItems = response.data.items
          this.totalItems = response.data.total_items
          this.totalPages = response.data.last_page
          this.from = response.data.from
          this.to = response.data.to
        })
        .finally(() => {
          this.isNewsLoading = false;
        });
    },
    /*
     * retrieveTags() {
     * this.isNewsLoading = true;
     *
     * const query = { q: this.query };
     *
     * // Sanitize and remove null values
     * Object.keys(query).forEach((key) => {
     * if (query[key] == null) {
     *   }
     * })
     * const queryString = new URLSearchParams(query).toString()
     * this.$axios
     *   .$get(`v1/tags?${queryString}`)
     *   .then((response) => {
     *     this.Taglist = response.data.tags
     *   })
     *   .finally(() => {
     *     this.isNewsLoading = false;
     *   });
     * },
     */
    addCategoryPicker() {
      this.multipleCategoryCounter += 1
      this.multipleCategoryBuffer.push(this.multipleCategoryCounter)
    },
    removeCategoryPicker(picker) {
      this.multipleCategoryCounter += 1
      const index = this.multipleCategoryBuffer.indexOf(picker)
      if (index > -1) {
        this.multipleCategoryBuffer.splice(index, 1)
      }
    },
    resetCategoryPicker() {
      this.multipleCategoryCounter = 1
      this.multipleCategoryBuffer = [ 1 ]
    },
    getSelected() {
      const categories = []
      this.multipleCategoryBuffer.forEach((picker) => {
        const selected = this.$refs[`categoryPicker-${picker}`][0].getSelected()
        if (selected !== null) {
          categories.push(selected)
        }
      })
      this.selectedCategory = categories;
    },
    setPage(page) {
      this.page = page
      this.retrieveMerchItems()
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
      this.getSelected();
      const categoryId = this.selectedCategory.map(x => x.id);

      const form = new FormData();
      form.append('name', this.item.name)
      form.append('stock', this.item.stock)
      form.append('price', this.item.price)
      form.append('salePrice', this.item.saleprice ? this.item.saleprice : 0)
      form.append('description', this.item.description)
      form.append('isFeatured', this.item.is_featured)
      form.append('isHideOutOfStock', this.item.isHideOutOfStock)
      form.append('isOnSale', this.item.is_on_sale)
      form.append('isRRP', this.item.show_rrp)

      /*
       * for (let i = 0; i < this.tags.length; i++) {
       * form.append('tags[]', this.tags[i]);
       * }
       */

      for (let i = 0; i < categoryId.length; i++) {
        form.append('categoryId[]', categoryId[i]);
      }

      for (let i = 0; i < this.imgList.length; i++) {
        form.append('photo[]', this.imgList[i], 'newsThumbnail.png');
      }

      // label Data
      form.append('selected_shippingid', '0')

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$axios
        .$post('/v1/items', form, config)
        .then((response) => {
          this.showAddNewsModal = false;
          this.isNewsAdded = true;
          this.$oruga.notification.open({
            message: 'Merch Item Added',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.reset();
          this.showAddMerchItemModal = false
          this.retrieveMerchItems();
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
    editMerchItem(index) {
      this.editingNo = toNumber(index);
      this.$axios
        .$get(`v1/items/${this.editingNo}`)
        .then((response) => {
          this.item = response.data.item
          /*
           * this.tags = response.data.item.tags.map(x => x.id);
           */
          const categoryLineages = response.data.item.categoryLineages
          this.multipleCategoryCounter = categoryLineages.length
          this.multipleCategoryBuffer = categoryLineages.map(((x, i) => i+1))
          this.categoryLineages = categoryLineages
          this.imgUrlEdit = response.data.item.media.map((x) =>
            `${this.$config.baseURL}/storage/${x.path}`);
          // eslint-disable-next-line max-len, vue/max-len
          this.imgListEdit = response.data.item.media.map((x) => x.hash);

          this.showEditMerchItemModal = true;
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
      this.getSelected();
      const editObject = this.MerchItems.find(
        (item) => item.id === this.editingNo
      );

      const categoryId = this.selectedCategory.map(x => x.id);

      const form = new FormData();
      form.append('name', this.item.name)
      form.append('stock', this.item.stock)
      form.append('price', this.item.price)
      form.append('salePrice', this.item.saleprice ? this.item.saleprice : 0)
      form.append('description', this.item.description)
      form.append('isFeatured', this.item.is_featured)
      form.append('isHideOutOfStock', this.item.isHideOutOfStock)
      form.append('isOnSale', this.item.is_on_sale)
      form.append('isRRP', this.item.show_rrp)

      /*
       * for (let i = 0; i < this.tags.length; i++) {
       * form.append('tags[]', this.tags[i]);
       * }
       */

      for (let i = 0; i < categoryId.length; i++) {
        form.append('categoryId[]', categoryId[i]);
      }

      for (let i = 0; i < this.imgListEdit.length; i++) {
        form.append('photo[]', this.imgListEdit[i]);
      }

      // label Data
      form.append('selected_shippingid', '0')

      form.append('id', this.item.id);
      this.$axios
        .$post(`v1/items/${editObject.id}`, form)
        .then((response) => {
          this.showEditNewsModal = false;
          this.$oruga.notification.open({
            message: 'Merch Item Updated',
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.editingNo = '';
          this.reset();
          this.showEditMerchItemModal = false
          this.retrieveMerchItems();
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
    removeMerchItem(index) {
      this.editingNo = toNumber(index);
      this.$axios.$get(`v1/items/${this.editingNo}`)
        .then((response) => {
          // eslint-disable-next-line max-len, camelcase, vue/max-len
          this.item.name = response.data.item.name;
        });
      setTimeout(() => {
        this.showRemoveMerchItemModal = true;
      }, 1000);
    },
    addVariant(index) {
      this.editingNo = toNumber(index);
      this.prodId = this.editingNo;
      this.$axios.$get('v1/variant/')
        .then((response) => {
          this.variantList = response.data.variant;
        });
      setTimeout(() => {
        this.showAddVariant = true;
      }, 1000);
    },
    confirmVariant(prodId) {

      const form = new FormData();
      form.append('item_id', prodId)
      for (let i = 0; i < this.checkedVariants.length; i++) {
        form.append('color[]', this.checkedVariants[i]);
      }
      this.$axios
        .$post('v1/variant/', form)
        .then((response) => {
          if (response.title === 'success') {
            this.$oruga.notification.open({
              duration: 5000,
              message: 'Merch Variant Added',
              position: 'bottom',
              variant: 'success',
              queue: true,
            });
            this.showAddVariant = false;
            this.checkedVariants = [];
          } else if (response.title === 'exists') {
            this.$oruga.notification.open({
              duration: 5000,
              message: 'Merch Variant already exists',
              position: 'bottom',
              variant: 'warning',
              queue: true,
            });
          }
        })
        .catch(() => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Failed to add variant',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        });
    },
    showVariant(index) {
      this.myVariantList = [];
      this.editingNo = toNumber(index);
      this.prodId = this.editingNo;
      this.$axios.$get(`v1/variant/${this.editingNo}`)
        .then((response) => {
          this.myVariantList = response.data.variant;
        });
      setTimeout(() => {
        this.showShowVariant = true;
      }, 1000);
    },
    removeVariant(variantId) {
      this.$axios
        .$delete(`v1/variant/${variantId}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Item variant Deleted',
            position: 'bottom',
            variant: 'success',
            queue: true,
          });
          this.$axios.$get(`v1/variant/${this.prodId}`)
            .then((res) => {
              if (!res.data) {
                this.showShowVariant = false;
              } else {
                this.myVariantList = res.data.variant;
              }
            })
            .catch((error) => {
              console.error('Error fetching variant:', error);
            });
        })
        .catch(() => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Failed to remove item variant',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        });
    },
    duplicateItem(index) {
      this.editingNo = toNumber(index);
      this.$axios
        .$post(`v1/items/duplicate/${this.editingNo}`)
        .then(() => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Item duplicated',
            position: 'bottom',
            variant: 'success',
            queue: true,
          });
          this.retrieveMerchItems();
        })
        .catch(() => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Failed to duplicate item',
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
    },
    remove(index) {
      const editObject = this.MerchItems.find(
        (item) => item.id === this.editingNo
      );
      this.$axios
        .$delete(`/v1/items/${editObject.id}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Merch Item Deleted',
            position: 'bottom',
            variant: 'success',
            queue: true,
          });
          this.reset();
          this.showRemoveMerchItemModal = false
          this.retrieveMerchItems();
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
      this.showRemoveMerchItemModal = false;
    },
    reset() {
      this.item = []
      this.imgList = []
      this.imgUrl = []
      this.imgListEdit = []
      this.selectedCategory = {}
      /* this.tags = [] */
    },
    saveVariant() {
      const formData = new FormData();
      formData.append('name', this.variant);

      this.$axios
        .$post('/v1/variant/itemvariant', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(() => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Variant added',
            position: 'bottom',
            variant: 'success',
            queue: true,
          });
          this.showAddMerchVariantModal = false;
          this.variant = '';
        })
    }
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

::v-deep .v-text-field input::label {
font-size: 1rem !important;
font-family: inherit !important;
color: rgb(104, 104, 104) !important;
}

.custom-btn {
  height: 50px !important;
}

.rugby-modal {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
}

.rugby-input .v-text-field__slot {
  border-radius: 8px;
}

.rugby-toggle {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;
}

.rugby-checkbox {
  display: none;
}

.rugby-toggle-slider {
  position: relative;
  width: 50px;
  height: 26px;
  background: #d1d5db;
  border-radius: 50px;
  transition: all 0.3s;
}

.rugby-toggle-slider:before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  top: 3px;
  left: 3px;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.rugby-checkbox:checked + .rugby-toggle-slider {
  background: #16a34a;
}

.rugby-checkbox:checked + .rugby-toggle-slider:before {
  transform: translateX(24px);
}

.rugby-editor {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  overflow: hidden;
}

.rugby-icon {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
}
</style>

