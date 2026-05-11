<!-- eslint-disable max-len -->
<template>
    <div class="min-h-screen bg-gradient-to-br
  from-gray-900 via-gray-800 to-gray-900">
      
    <BaseHeader class="from-brand-green to-brand-black bg-gradient-to-r shadow-md">
      <BreadCrumbs title="Merch Items"/>
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
            :is-rrp="product.show_rrp"
            :is-on-sale="product.is_on_sale"
            :is-hide-out-of-stock="product.isHideOutOfStock"
            data-aos="fade-up"
            data-aos-offset="30"
            @update="retrieveMerchItem"
            @duplicate="duplicateItem"
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
      
      <!-- Show Add Merch Color Variant -->
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
                  Base Price:
                </span>
                <span class="font-bold text-green-700 bg-green-100 px-3 py-1 rounded-lg">
                  {{ formatCurrency(item.price) }}
                </span>
              </label>
              <VTextField
                id="price"
                v-model="item.price"
                label="Enter Base Price"
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

            <!-- Size Variants Section - NEW -->
            <div class="col-span-1 md:col-span-2">
              <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                  <label class="block font-semibold text-gray-700">
                    <i class="ri-ruler-line mr-2 text-green-600"></i>
                    Size Variants:
                  </label>
                  <button
                    type="button"
                    class="flex items-center gap-2 bg-green-600 hover:bg-green-700 
                          text-gray-50 font-semibold px-4 py-2 rounded-lg 
                          transition-all duration-200 transform hover:scale-105 
                          shadow-md"
                    @click="addSizeVariant"
                  >
                    <i class="ri-add-fill"></i>
                    Add Size
                  </button>
                </div>

                <!-- Size Variants Info -->
                <div v-if="sizeVariants.length === 0" 
                    class="bg-gray-100 rounded-lg p-6 text-center border-2 
                          border-dashed border-gray-300">
                  <i class="ri-t-shirt-line text-3xl text-gray-400 mb-2"></i>
                  <p class="text-gray-600 font-medium">
                    No size variants added
                  </p>
                  <p class="text-gray-500 text-sm mt-1">
                    Add sizes if this product comes in different sizes with unique pricing
                  </p>
                </div>

                <!-- Size Variants List -->
                <div v-else class="space-y-3 max-h-60 overflow-y-auto">
                  <div
                    v-for="(size, index) in sizeVariants"
                    :key="index"
                    class="flex flex-col sm:flex-row items-start sm:items-center gap-3 
                          bg-gray-50 rounded-lg p-4 border border-gray-200 
                          group hover:border-green-300 transition-colors duration-200"
                  >
                    <!-- Size Selection -->
                    <div class="flex-1 min-w-0">
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Size
                      </label>
                      <select
                        v-model="size.value"
                        class="w-full px-3 py-2 bg-white border border-gray-300 
                              rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 
                              focus:border-green-500 transition-all duration-200"
                      >
                        <option value="XS">
                          XS
                        </option>
                        <option value="S">
                          S
                        </option>
                        <option value="M">
                          M
                        </option>
                        <option value="L">
                          L
                        </option>
                        <option value="XL">
                          XL
                        </option>
                        <option value="XXL">
                          XXL
                        </option>
                        <option value="XXXL">
                          XXXL
                        </option>
                      </select>
                    </div>

                    <!-- Price Override -->
                    <div class="flex-1 min-w-0">
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Price Override
                        <span class="text-xs text-gray-500">(optional)</span>
                      </label>
                      <VTextField
                        v-model="size.price_override"
                        label="Same as base"
                        type="number"
                        step="0.01"
                        min="0"
                        solo
                        class="rugby-input"
                        hide-details
                      />
                    </div>

                    <!-- Stock for this size -->
                    <div class="flex-1 min-w-0">
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Stock
                      </label>
                      <VTextField
                        v-model="size.stock_quantity"
                        label="Size stock"
                        type="number"
                        min="0"
                        solo
                        class="rugby-input"
                        hide-details
                      />
                    </div>

                    <!-- SKU Suffix -->
                    <div class="flex-1 min-w-0">
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        SKU Suffix
                      </label>
                      <VTextField
                        v-model="size.sku_suffix"
                        label="-S, -M, etc"
                        type="text"
                        solo
                        class="rugby-input"
                        hide-details
                      />
                    </div>

                    <!-- Remove Button -->
                    <div class="pt-2 sm:pt-0">
                      <button
                        type="button"
                        class="w-10 h-10 flex items-center justify-center bg-red-500 
                              hover:bg-red-600 text-gray-50 rounded-lg 
                              transition-all duration-200 transform hover:scale-110 
                              shadow-sm"
                        @click="removeSizeVariant(index)"
                        title="Remove this size"
                      >
                        <i class="ri-close-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Size Variants Summary -->
                <div v-if="sizeVariants.length > 0" 
                    class="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-green-700 font-medium">
                      <i class="ri-information-line mr-1"></i>
                      {{ sizeVariants.length }} size variant(s) configured
                    </span>
                    <span class="text-green-600">
                      Price range: {{ sizePriceRange }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Color Picker -->
            <div class="col-span-1 md:col-span-2">
              <ColorPicker v-model="item.colors" />
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

      <!-- Show Edit Merch Modal -->
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
                <span><i class="ri-money-dollar-circle-line mr-2 text-green-600"></i>
                  Base Price:
                </span>
                <span class="font-bold text-green-700 bg-green-100 px-2 py-1 rounded">
                  {{ formatCurrency(item.price) }}
                </span>
              </label>
              <VTextField
                id="price"
                v-model="item.price"
                label="Enter Base Price"
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

            <!-- NEW: Size Variants Section -->
            <div class="col-span-1 md:col-span-2">
              <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                  <label class="block font-semibold text-gray-700">
                    <i class="ri-ruler-line mr-2 text-green-600"></i>
                    Size Variants:
                  </label>
                  <button
                    type="button"
                    class="flex items-center gap-2 bg-green-600 hover:bg-green-700 
                          text-gray-50 font-semibold px-4 py-2 rounded-lg 
                          transition-all duration-200 transform hover:scale-105 
                          shadow-md"
                    @click="addSizeVariant"
                  >
                    <i class="ri-add-fill"></i>
                    Add Size
                  </button>
                </div>

                <!-- Size Variants Info -->
                <div v-if="sizeVariants.length === 0" 
                    class="bg-gray-100 rounded-lg p-6 text-center border-2 
                          border-dashed border-gray-300">
                  <i class="ri-t-shirt-line text-3xl text-gray-400 mb-2"></i>
                  <p class="text-gray-600 font-medium">
                    No size variants configured
                  </p>
                  <p class="text-gray-500 text-sm mt-1">
                    Add sizes if this product comes in different sizes with unique pricing
                  </p>
                </div>

                <!-- Size Variants List -->
                <div v-else class="space-y-3 max-h-60 overflow-y-auto">
                  <div
                    v-for="(size, index) in sizeVariants"
                    :key="size.id || index"
                    class="flex flex-col sm:flex-row items-start sm:items-center gap-3 
                          bg-gray-50 rounded-lg p-4 border border-gray-200 
                          group hover:border-green-300 transition-colors duration-200"
                  >
                    <!-- Size Selection -->
                    <div class="flex-1 min-w-0">
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Size
                      </label>
                      <select
                        v-model="size.value"
                        class="w-full px-3 py-2 bg-white border border-gray-300 
                              rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 
                              focus:border-green-500 transition-all duration-200"
                      >
                        <option value="XS">
                          XS
                        </option>
                        <option value="S">
                          S
                        </option>
                        <option value="M">
                          M
                        </option>
                        <option value="L">
                          L
                        </option>
                        <option value="XL">
                          XL
                        </option>
                        <option value="XXL">
                          XXL
                        </option>
                        <option value="XXXL">
                          XXXL
                        </option>
                      </select>
                    </div>

                    <!-- Price Override -->
                    <div class="flex-1 min-w-0">
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Price Override
                        <span class="text-xs text-gray-500">(optional)</span>
                      </label>
                      <VTextField
                        v-model="size.price_override"
                        label="Same as base"
                        type="number"
                        step="0.01"
                        min="0"
                        solo
                        class="rugby-input"
                        hide-details
                      />
                    </div>

                    <!-- Stock for this size -->
                    <div class="flex-1 min-w-0">
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Stock
                      </label>
                      <VTextField
                        v-model="size.stock_quantity"
                        label="Size stock"
                        type="number"
                        min="0"
                        solo
                        class="rugby-input"
                        hide-details
                      />
                    </div>

                    <!-- SKU Suffix -->
                    <div class="flex-1 min-w-0">
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        SKU Suffix
                      </label>
                      <VTextField
                        v-model="size.sku_suffix"
                        label="-S, -M, etc"
                        type="text"
                        solo
                        class="rugby-input"
                        hide-details
                      />
                    </div>

                    <!-- Remove Button -->
                    <div class="pt-2 sm:pt-0">
                      <button
                        type="button"
                        class="w-10 h-10 flex items-center justify-center bg-red-500 
                              hover:bg-red-600 text-gray-50 rounded-lg 
                              transition-all duration-200 transform hover:scale-110 
                              shadow-sm"
                        @click="removeSizeVariant(index)"
                        title="Remove this size"
                      >
                        <i class="ri-close-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Size Variants Summary -->
                <div v-if="sizeVariants.length > 0" 
                    class="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-green-700 font-medium">
                      <i class="ri-information-line mr-1"></i>
                      {{ sizeVariants.length }} size variant(s) configured
                    </span>
                    <span class="text-green-600">
                      Price range: {{ sizePriceRange }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-1 md:col-span-2">
              <ColorPicker v-model="item.colors" />
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

    <!-- Remove merch item modal -->
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
import ColorPicker from '~/components/ColorPicker.vue'
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
    CategorySlider,
    ColorPicker
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
        price: 0,
        saleprice: 0,
        description: '',
        colors: [],
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
      sizeVariants: [],
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
    sizePriceRange() {
      if (this.sizeVariants.length === 0) {
        return 'No sizes';
      }
      
      const prices = this.sizeVariants.map(size => {
        return size.price_override || this.item.price;
      });
      
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      if (minPrice === maxPrice) {
        return this.formatCurrency(minPrice);
      }
      
      return `${this.formatCurrency(minPrice)} - ${this.formatCurrency(maxPrice)}`;
    }
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
    this.page = 1
  },
  methods: {
    addSizeVariant() {
      /* eslint-disable camelcase */
      this.sizeVariants.push({
        value: 'M',
        price_override: null,
        stock_quantity: 0,
        sku_suffix: '',
        type: 'size'
      });
    },
    removeSizeVariant(index) {
      this.sizeVariants.splice(index, 1);
    },
    validate(type) {
      if (type === 'Add') {
        this.create()
        return true;
      } else if (type === 'Edit') {
        this.updateMerchItem()
        return true;
      } else {
        return false;
      }
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
      
      // Add categories
      for (let i = 0; i < categoryId.length; i++) {
        form.append('categoryId[]', categoryId[i]);
      }
      
      // Add images
      for (let i = 0; i < this.imgList.length; i++) {
        form.append('photo[]', this.imgList[i], 'newsThumbnail.png');
      }
      
      if (this.sizeVariants.length > 0) {
        const cleanedSizeVariants = this.sizeVariants.map(size => ({
          value: size.value,
          price_override: size.price_override ? parseFloat(size.price_override) : null,
          stock_quantity: parseInt(size.stock_quantity) || 0,
          sku_suffix: size.sku_suffix || `-${size.value}`,
          type: 'size'
        }));
        
        form.append('size_variants', JSON.stringify(cleanedSizeVariants));
      }

      if (this.item.colors && this.item.colors.length > 0) {
        form.append('colors', JSON.stringify(this.item.colors));
      }

      form.append('selected_shippingid', '0')

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$axios
        .$post('/v1/items', form, config)
        .then((response) => {
          this.showAddNewsModal = false;
          this.isNewsAdded = true;
          this.$oruga.notification.open({
            message: 'Merch Item Added' + (this.sizeVariants.length > 0 ? ' with Size Variants' : ''),
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
    },
    retrieveMerchItem(index) {
      this.editingNo = toNumber(index);
      this.$axios
        .$get(`v1/items/${this.editingNo}`)
        .then((response) => {
          this.item = response.data.item
          const categoryLineages = response.data.item.categoryLineages
          this.multipleCategoryCounter = categoryLineages.length
          this.multipleCategoryBuffer = categoryLineages.map(((x, i) => i+1))
          this.categoryLineages = categoryLineages
          this.imgUrlEdit = response.data.item.media.map((x) =>
            `${this.$config.baseURL}/storage/${x.path}`);
          // eslint-disable-next-line max-len, vue/max-len
          this.imgListEdit = response.data.item.media.map((x) => x.hash);

          this.sizeVariants = [];
          if (response.data.item.size_variants && response.data.item.size_variants.length > 0) {
            this.sizeVariants = response.data.item.size_variants.map(variant => ({
              id: variant.id,
              value: variant.value,
              price_override: variant.price_override ? parseFloat(variant.price_override) : null,
              stock_quantity: variant.stock_quantity || 0,
              sku_suffix: variant.sku_suffix || `-${variant.value}`,
              type: 'size'
            }));
          } else if (response.data.item.available_sizes &&
            response.data.item.available_sizes.length > 0) {
            this.sizeVariants = response.data.item.available_sizes.map(size => ({
              id: size.id,
              value: size.size,
              price_override: size.price !== response.data.item.price ?
                parseFloat(size.price) : null,
              stock_quantity: size.stock_quantity || 0,
              sku_suffix: size.sku || `-${size.size}`,
              type: 'size'
            }));
          } else if (response.data.item.item_variants) {
            const sizeVariants = response.data.item.item_variants.filter(
              variant => variant.type === 'size'
            );
            this.sizeVariants = sizeVariants.map(variant => ({
              id: variant.id,
              value: variant.value,
              price_override: variant.price_override ? parseFloat(variant.price_override) : null,
              stock_quantity: variant.stock_quantity || 0,
              sku_suffix: variant.sku || `-${variant.value}`,
              type: 'size'
            }));
          }

          if (typeof this.item.colors === 'string') {
            try {
              this.$set(this.item, 'colors', JSON.parse(this.item.colors));
            } catch (e) {
              this.$set(this.item, 'colors', []);
            }
          } else if (!Array.isArray(this.item.colors)) {
            this.$set(this.item, 'colors', []);
          }

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
    updateMerchItem() {
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
      for (let i = 0; i < categoryId.length; i++) {
        form.append('categoryId[]', categoryId[i]);
      }
      for (let i = 0; i < this.imgListEdit.length; i++) {
        form.append('photo[]', this.imgListEdit[i]);
      }

      if (this.sizeVariants.length > 0) {
        const cleanedSizeVariants = this.sizeVariants.map(size => ({
          id: size.id,
          value: size.value,
          price_override: size.price_override ? parseFloat(size.price_override) : null,
          stock_quantity: parseInt(size.stock_quantity) || 0,
          sku_suffix: size.sku_suffix || `-${size.value}`,
          type: 'size'
        }));
        
        form.append('size_variants', JSON.stringify(cleanedSizeVariants));
      }

      if (this.item.colors && this.item.colors.length > 0) {
        form.append('colors', JSON.stringify(this.item.colors));
      }

      form.append('selected_shippingid', '0')
      form.append('id', this.item.id);
      
      this.$axios
        .$post(`v1/items/${editObject.id}`, form)
        .then((response) => {
          this.showEditNewsModal = false;
          this.$oruga.notification.open({
            message: 'Merch Item Updated' + (this.sizeVariants.length > 0 ? ' with Size Variants' : ''),
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
      this.item = {
        name: '',
        description: '',
        price: 0,
        saleprice: 0,
        stock: 0,
        colors: [],
        is_featured: false,
        isHideOutOfStock: false,
        is_on_sale: false,
        show_rrp: false
      };
      this.selectedCategory = [];
      this.imgList = [];
      this.sizeVariants = [];
      this.multipleCategoryBuffer = [];
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

