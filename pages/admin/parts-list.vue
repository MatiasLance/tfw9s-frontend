<template>
  <div>
    <BaseHeader class="bg-gradient-to-r from-brand-dgrey to-brand-black">
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
            <NuxtLink to="/">
              <VBtn text color="white">Home</VBtn>
            </NuxtLink>
            <NuxtLink to="/admin">
              <VBtn text color="white">Admin</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-3xl font-bold text-white lg:text-6xl">
          Product list
        </h1>
      </div>
    </BaseHeader>

    <div class="mx-auto max-w-screen-xl px-4 py-7">
      <div class="-mx-4 flex flex-wrap">
        <main class="w-full px-4">
          <div class="my-6 flex flex-wrap items-center justify-between gap-4">
            <div
              class="flex flex-wrap justify-start gap-2"
            >
            <button
              type="button"
              class="
                w-40
                rounded-xl
                border border-solid border-brand-black
                bg-brand-black
                px-4
                py-2
                text-center
                text-white
                hover:bg-slate-400
                focus:bg-brand-grey
              "
              @click="addPr"
            >
              <span class="flex items-center justify-center" aria-hidden="true">
                <i class="ri-add-line"></i>
                <span class="pr-1">Add Product</span>
              </span>
            </button>
            <button
              type="button"
              class="
                block w-40 rounded-xl
                border border-solid border-brand-black
                bg-brand-black
                px-4
                py-2
                text-center
                text-white
                hover:bg-slate-400
                focus:bg-brand-grey
                md:inline-block
              "
              @click="categoriesLink"
            >
              <span class="flex items-center justify-center" aria-hidden="true">
                <i class="ri-arrow-right-line"></i>
                Categories
              </span>
            </button>
            </div>
            <div class="w-full sm:w-80">
              <form @submit.prevent="retrieveProducts">
                <SearchBar v-model="query" />
              </form>
            </div>
          </div>
        </main>
      </div>

      <section class="mb-8" data-aos="fade-up">
      <div
        class="
          flex flex-wrap items-center justify-around
          gap-x-2
          md:justify-between
        "
      >
          <span class="flex items-center">
            <template v-if="activeVariantItem !== null">
              <button
                type="button"
                class="
                  mr-4
                  rounded-xl border border-solid
                  border-brand-black
                  bg-brand-black
                  px-4
                  py-2
                  text-center
                  text-white
                  hover:bg-slate-400
                  focus:bg-brand-grey
                "
                @click="clearVariantItemFilter"
              >
                <span
                  class="flex items-center justify-center"
                  aria-hidden="true"
                >
                  <i class="ri-arrow-left-line"></i>
                  <span class="pr-1">Back</span>
                </span>
              </button>

              <p class="text-base leading-[2.5em]">
                Showing item and its variants
              </p>
              <span class="px-2 text-3xl">
                |
              </span>
            </template>
            <p class="text-base leading-[2.5em]">
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

      <article
        v-for="prod in productList"
        :key="prod.id"
        class="
          group
          mb-5
          flex flex-col
          items-start
          rounded
          border border-gray-200
          shadow-sm
          transition
          duration-200
          hover:shadow-xl
          md:flex-row
        "
        data-aos="fade-up"
      >
        <div class="w-full overflow-hidden border-r border-gray-200 md:w-1/4">
          <img
            class="
              mx-auto
              cursor-pointer
              object-cover
              transition
              duration-200
              group-hover:scale-125
            "
            :src="getMediaURL(prod.media[0])"
            :alt="prod.name"
          />
        </div>
        <div class="self-stretch md:w-3/4">
          <div class="flex h-full flex-col justify-between p-4">
            <div>
              <div
                class="mb-2 flex flex-wrap items-center gap-2"
              >
                <div
                  v-for="category in prod.categories"
                  :key="category.id"
                  class="flex flex-wrap items-center"
                >
                  <span class="pr-1 text-[16px]">
                    <i class="ri-price-tag-3-line text-brand-black"></i>
                  </span>
                  <span
                    class="text-[16px]
                    selection:bg-brand-black selection:text-white"
                  >
                    {{ category.name }}
                  </span>
                </div>
              </div>
              <span
                class="text-2xl
                selection:bg-brand-black
                selection:text-white"
              >
                <a
                  :href="`/product/?id=${prod.id}`"
                  target="_self"
                  :title="prod.name"
                  class="
                    font-montserrat font-bold
                    transition
                    duration-200
                    hover:text-brand-black
                  "
                >
                  {{ prod.name }}
                </a>
                <span v-if="prod.is_featured" class="ml-2">
                  <FeaturedChip />
                </span>
              </span>
              <p class="mb-1">
                <span
                  class="mb-2 pt-2 pb-4 text-lg font-semibold text-gray-900"
                >
                  <span>{{ formatCurrency(prod.price) }}</span>
                </span>
              </p>
              <p class="mt-6 mb-2 text-gray-500">
                {{ prod.snippet }}
              </p>
              <p>
                <template v-if="prod.stock > 0">
                  <span class="font-bold">{{ prod.stock }}</span> in Stock
                </template>
                <template v-else>
                  Out of stock
                </template>
              </p>
            </div>
            <div
              class="part-item__actions mt-4 flex flex-wrap justify-start gap-2"
            >
              <button
                type="button"
                class="
                  mr-2
                  flex
                  cursor-pointer
                  items-center
                  hover:text-brand-slate
                  hover:underline hover:decoration-brand-slate
                "
                @click="editPr(prod.id)"
              >
                <i class="ri-edit-line"></i> Edit
              </button>
              <button
                type="button"
                class="
                  mr-2
                  flex
                  cursor-pointer
                  items-center
                  hover:text-brand-slate
                  hover:underline hover:decoration-brand-slate
                "
                @click="addVariant(prod.id)"
              >
                <i class="ri-links-line"></i>
                <span class="mt-1">
                  Add Variant
                </span>
              </button>
              <button
                type="button"
                class="
                  mr-2
                  flex
                  cursor-pointer
                  items-center
                  hover:text-brand-slate
                  hover:underline hover:decoration-brand-slate
                "
                @click="showVariants(prod.id)"
              >
                <i class="ri-link"></i>
                <span class="mt-1">
                  Show Variants
                </span>
              </button>
              <button
                type="button"
                class="
                  mr-2
                  flex
                  cursor-pointer
                  items-center
                  hover:text-brand-slate
                  hover:underline hover:decoration-brand-slate
                "
                @click="duplicate(prod.id)"
              >
                <i class="ri-file-copy-line"></i>
                <span class="mt-1">
                  Duplicate
                </span>
              </button>
              <button
                type="button"
                class="
                  mr-2
                  flex
                  cursor-pointer
                  items-center
                  text-brand-red
                  hover:text-red-900
                  hover:underline hover:decoration-brand-slate
                "
                @click="removePr(prod.id)"
              >
                <i class="ri-delete-bin-5-line"></i>
                <span class="mt-1">
                  Remove
                </span>
              </button>
            </div>
          </div>
        </div>
      </article>
      <div class="flex justify-center">
        <div class="items-center">
        </div>
      </div>
    </div>
     <!-- showAddProduct modal component -->
     <OModal :active="showAddProductModal" @close="showAddProductModal = false">
      <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
        <h3 class="mb-3 font-bold text-brand-black">
          Add Product
        </h3>
        <hr class="my-3">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div class="col-span-3 mb-4">
            <label class="mb-1 block"> Product Name: </label>
            <input
              v-model="name"
              class="
                w-full
                appearance-none
                border border-gray-100
                bg-gray-200
                py-2
                px-3
                hover:border-gray-400
                focus:border-gray-400 focus:outline-none
              "
            />
          </div>
          <div class="col-span-3 mb-4 lg:col-span-1">
            <label class="mb-1 block">Price:</label>
            <div class="flex flex-wrap">
              <OInput
                v-model="price"
                placeholder="Amount"
                type="text"
                icon="currency-usd"
              ></OInput>
            </div>
          </div>
          <div class="col-span-3 mb-4 lg:col-span-2">
            <label class="mb-1 block"> In Stock: {{ inStock }} </label>
            <div class="grid w-full grid-cols-2 gap-2">
              <label
                class="
                  flex
                  w-full
                  cursor-pointer border
                  border-gray-200
                  bg-transparent p-3
                  hover:border-brand-black
                  hover:bg-slate-100
                "
                >
                <span>
                  <input
                    v-model="inStockRadio"
                    value="Yes"
                    name="stockRadio"
                    type="radio"
                    class="
                    mt-1 mr-1 h-4 w-4 bg-gray-200 text-brand-black
                    focus:ring-brand-black"
                    @change="toggleStock"
                  />
                </span>
                <span>In Stock</span>
              </label>
              <label
                class="
                flex
                w-full
                cursor-pointer border
                border-gray-200
                bg-transparent p-3
                hover:border-brand-black
                hover:bg-slate-50
                "
              >
                <span>
                  <input
                    v-model="inStockRadio"
                    value='No'
                    name="stockRadio"
                    type="radio"
                    :checked="inStock === 0"
                    class="
                    mt-1 mr-1 h-4 w-4 bg-gray-200 text-brand-black
                    focus:ring-brand-black"
                    @change="toggleStock"
                  />
                </span>
                <span>Out of stock</span>
              </label>
            </div>
            <div class="grid w-full grid-cols-2 gap-2">
              <input
                v-if="inStockRadio === 'Yes'"
                v-model="inStock"
                type="number"
                min="0"
                class="
                  form-input
                  mt-1
                  block
                  w-24
                  appearance-none
                  border border-gray-100
                  bg-gray-200
                  py-2
                  px-3
                  hover:border-gray-400
                  focus:border-gray-400 focus:outline-none
                "
                @keyup="handleNegativeValue"
              />
              <div class="item-center mt-4 flex">
                <label
                  class="
                  flex
                  w-full
                  cursor-pointer border
                  border-gray-200
                  bg-transparent p-3
                  hover:border-brand-black
                  hover:bg-slate-50
                  "
                >
                  <span>
                    <input
                      v-model="isItemFeatured"
                      name="itemFeatured"
                      type="checkbox"
                      class="
                      mt-1 mr-1 h-4 w-4 bg-gray-200 text-brand-black
                      focus:ring-brand-black"
                    />
                  </span>
                  <span>Featured Item</span>
                </label>
              </div>
            </div>
          </div>
          <div class="col-span-3 mb-4">
            <label class="mb-1 block">Description:</label>
            <Tiptap v-model="description" />
          </div>
          <!-- categories section -->
          <div class="col-span-3 mb-4 w-full">
            <div class="flex items-center justify-between">
              <label class="mb-1 block"> Category: </label>
              <button
                type="button"
                class="
                  flex
                  items-center
                  justify-center
                  border border-solid border-brand-black
                  bg-brand-black
                  px-4
                  py-2
                  text-white
                "
                @click="addCategoryPicker"
              >
                <i class="ri-add-fill"></i>
                Add Category
              </button>
            </div>
            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              <div
                v-for="categoryPickerIndex in multipleCategoryBuffer"
                :key="categoryPickerIndex"
                class="flex justify-center gap-1"
              >
                <InfiniteCategories
                  :ref="`categoryPicker-${categoryPickerIndex}`"
                  :options="categories"
                />
                <button
                  type="button"
                  class="
                    my-4
                    h-6 w-6
                    text-brand-black
                    hover:bg-brand-black hover:text-white
                  "
                  @click="removeCategoryPicker(categoryPickerIndex)"
                >
                  <div class="ri-close-fill ri-lg"></div>
                </button>
              </div>
            </div>
          </div>
          <div class="col-span-3 mb-4 w-full">
            <label class="mb-1 block">Image</label>
            <Croppa
              v-model="myCroppa"
              :width="320"
              :height="320"
              :quality="5"
              accept=".png, .webp, .jpeg, .jpg"
              :file-size-limit="31457280"
              :zoom-speed="5"
              :prevent-white-space="false"
              initial-size="contain"
              @file-size-exceed="handleCroppaFileSizeExceed"
              @file-type-mismatch="handleCroppaFileTypeMismatch"
              @new-image-drawn="handleNewImageCreate"
              @image-remove="handleImageRemoveCreate"
              @loading-end="applyMetadata"
            >
            </Croppa>
            <br />
            <div class="flex justify-start">
              <VBtn @click="rotateAnti">
                <i class="ri-anticlockwise-line"></i>
              </VBtn>
              <VBtn @click="rotate">
                <i class="ri-clockwise-line"></i>
              </VBtn>
              <VBtn @click="flipx">
                <i class="ri-arrow-left-right-line"></i>
              </VBtn>
              <VBtn @click="flipy">
                <i class="ri-arrow-up-down-line"></i>
              </VBtn>
            </div>
            <div class="flex justify-start">
              <VBtn @click="zoomIn">
                <i class="ri-zoom-in-line"></i>
              </VBtn>
              <VBtn @click="zoomOut">
                <i class="ri-zoom-out-line"></i>
              </VBtn>
              <VBtn plain @click="setImagePreset">
                set
              </VBtn>
              <VBtn plain @click="clearImagePreset">
                clr
              </VBtn>
            </div>
            <br />
            <VBtn
              v-if="showGenerateCreatedImageBtn"
              dark
              large
              class="bg-gradient-to-r from-brand-black to-brand-black"
              @click="generateImage"
            >
              GENERATE
            </VBtn>
          </div>
          <div
            class="col-span-3 mb-4 w-full"
          >
            <div
              class="grid grid-cols-1 gap-3 lg:grid-cols-3"
            >
              <div
                v-for="(photo, photoIndex) in imgUrl"
                :key="photo"
                class="relative flex justify-center gap-1"
              >
                <VImg :src="photo"></VImg>
                <button
                  type="button"
                  class="
                    absolute
                    left-0 my-2
                    h-6
                    w-6 text-brand-lgrey
                    shadow-sm
                    hover:bg-brand-black
                    hover:text-white
                  "
                  @click="removeImage(photoIndex)"
                >
                  <div class="ri-close-fill ri-lg"></div>
                </button>
              </div>
            </div>
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
              hover:bg-brand-green/30
              lg:mx-4 lg:w-48
            "
            @click="create"
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
              hover:bg-brand-red/30
              lg:mx-4 lg:w-48
            "
            @click="close"
          >
            Cancel
          </button>
        </div>
      </div>
    </OModal>
    <!-- showEditProduct modal component -->
    <OModal
      :active="showEditProductModal"
      @close="showEditProductModal = false"
    >
      <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
        <h3 class="mb-3 font-bold text-brand-black">
          {{ editModalTitle }}
        </h3>
        <hr class="my-3">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div class="col-span-3 mb-4">
            <label class="mb-1 block"> Product Name: </label>
            <input
              v-model="name"
              class="
                w-full
                appearance-none
                border border-gray-100
                bg-gray-200
                py-2
                px-3
                hover:border-gray-400
                focus:border-gray-400 focus:outline-none
              "
            />
          </div>
          <div class="col-span-3 mb-4 lg:col-span-1">
            <label class="mb-1 block">Price:</label>
            <div class="flex flex-wrap">
              <OInput
                v-model="price"
                placeholder="Amount"
                type="text"
                icon="currency-usd"
              ></OInput>
            </div>
          </div>
          <div class="col-span-3 mb-4 lg:col-span-2">
            <label class="mb-1 block"> In Stock: {{ inStock }} </label>
            <div class="grid w-full grid-cols-2 gap-2">
              <label
                class="
                  flex
                  w-full
                  cursor-pointer border
                  border-gray-200
                  bg-transparent p-3
                  hover:border-brand-black
                  hover:bg-slate-50
                "
                >
                <span>
                  <input
                    :id="`instockChoice2-${editingNo}`"
                    v-model="inStockRadio"
                    value="Yes"
                    name="stockRadio"
                    type="radio"
                    class="
                    mt-1 mr-1 h-4 w-4 bg-gray-200 text-brand-black
                    focus:ring-brand-black"
                    @change="toggleStock"
                  />
                </span>
                <span>In Stock</span>
              </label>
              <label
                class="
                flex
                w-full
                cursor-pointer border
                border-gray-200
                bg-transparent p-3
                hover:border-brand-black
                hover:bg-slate-50
                "
              >
              <span>
                <input
                  :id="`outofstockChoice2-${editingNo}`"
                  v-model="inStockRadio"
                  value='No'
                  name="stockRadio"
                  type="radio"
                  class="
                  mt-1 mr-1 h-4 w-4 bg-gray-200 text-brand-black
                  focus:ring-brand-black"
                  @change="toggleStock"
                />
              </span>
              <span>Out of stock</span>
              </label>
            </div>
            <div class="grid w-full grid-cols-2 gap-2">
              <input
                v-if="inStockRadio === 'Yes'"
                v-model="inStock"
                type="number"
                min="0"
                class="
                  form-input
                  mt-1
                  block
                  w-24
                  appearance-none
                  border border-gray-100
                  bg-gray-200
                  py-2
                  px-3
                  hover:border-gray-400
                  focus:border-gray-400 focus:outline-none
                "
                @keyup="handleNegativeValue"
              />
              <div class="item-center mt-4 flex">
                <label
                  class="
                  flex
                  w-full
                  cursor-pointer border
                  border-gray-200
                  bg-transparent p-3
                  hover:border-brand-black
                  hover:bg-slate-50
                  "
                >
                  <span>
                    <input
                      v-model="isItemFeatured"
                      name="itemFeatured"
                      type="checkbox"
                      class="
                      mt-1 mr-1 h-4 w-4 bg-gray-200 text-brand-black
                      focus:ring-brand-black"
                    />
                  </span>
                  <span>Featured Item</span>
                </label>
              </div>
            </div>
          </div>
          <div class="col-span-3 mb-4">
            <label class="mb-1 block">Description:</label>
            <Tiptap v-model="description" />
          </div>
          <div class="col-span-3 mb-4 w-full">
            <div class="flex items-center justify-between">
              <label class="mb-1 block"> Category: </label>
              <button
                type="button"
                class="
                  flex
                  items-center
                  justify-center
                  border border-solid border-brand-black
                  bg-brand-black
                  px-4
                  py-2
                  text-white
                "
                @click="addCategoryPicker"
              >
                <i class="ri-add-fill"></i>
                Add Category
              </button>
            </div>
            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              <div
                v-for="categoryPickerIndex in multipleCategoryBuffer"
                :key="categoryPickerIndex"
                class="flex justify-center gap-1"
              >
                <InfiniteCategories
                  :ref="`categoryPicker-${categoryPickerIndex}`"
                  :options="categories"
                  :lineage="categoryLineages[categoryPickerIndex-1]"
                />
                <button
                  type="button"
                  class="
                    my-4
                    h-6 w-6
                    text-brand-black
                    hover:bg-brand-black hover:text-white
                  "
                  @click="removeCategoryPicker(categoryPickerIndex)"
                >
                  <div class="ri-close-fill ri-lg"></div>
                </button>
              </div>
            </div>
          </div>
          <div class="col-span-3 mb-4 w-full">
            <label class="mb-1 block">Image</label>
            <Croppa
              v-model="myEditCroppa"
              :width="320"
              :height="320"
              :quality="5"
              placeholder="Place image here"
              :placeholder-font-size="15"
              :file-size-limit="31457280"
              :zoom-speed="5"
              accept="image/jpeg,image/png,image/webp, blob"
              :prevent-white-space="false"
              initial-size="contain"
              @file-size-exceed="handleCroppaFileSizeExceed"
              @file-type-mismatch="handleCroppaFileTypeMismatch"
              @new-image-drawn="handleNewImage"
              @image-remove="handleImageRemove"
              @loading-end="applyEditMetadata"
            >
            </Croppa>
            <br />
            <div class="flex justify-start">
              <VBtn @click="rotateAntiEdit">
                <i class="ri-anticlockwise-line"></i>
              </VBtn>
              <VBtn @click="rotateEdit">
                <i class="ri-clockwise-line"></i>
              </VBtn>
              <VBtn @click="flipxEdit">
                <i class="ri-arrow-left-right-line"></i>
              </VBtn>
              <VBtn @click="flipyEdit">
                <i class="ri-arrow-up-down-line"></i>
              </VBtn>
            </div>
            <div class="flex justify-start">
              <VBtn @click="zoomInEdit">
                <i class="ri-zoom-in-line"></i>
              </VBtn>
              <VBtn @click="zoomOutEdit">
                <i class="ri-zoom-out-line"></i>
              </VBtn>
              <VBtn plain @click="setEditImagePreset">
                set
              </VBtn>
              <VBtn plain @click="clearImagePreset">
                clr
              </VBtn>
            </div>
            <br />
            <VBtn
              v-if="showGenerateEditedImageBtn"
              dark
              class="mt-2 bg-gradient-to-r from-brand-black to-brand-black"
              @click="generateEditedImage"
            >
              GENERATE
            </VBtn>
          </div>
          <div class="col-span-3 mb-4 w-full">
            <div
              class="grid grid-cols-1 gap-3 lg:grid-cols-3"
            >
              <div
                v-for="(photo, photoIndex) in imgUrlEdit"
                :key="photoIndex"
                class="relative flex justify-center gap-1"
              >
              <VImg :src="photo"></VImg>
                <button
                  type="button"
                  class="
                    absolute
                    left-0 my-2
                    h-6
                    w-6 text-brand-lgrey
                    shadow-sm
                    hover:bg-brand-black
                    hover:text-white
                  "
                  @click="removeEditedImage(photoIndex)"
                >
                  <div class="ri-close-fill ri-lg"></div>
                </button>
              </div>
            </div>
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
              hover:bg-brand-green/30
              lg:mx-4 lg:w-48
            "
            @click="confirmItemEdit(editingNo)"
          >
            Confirm
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
              hover:bg-brand-red/30
              lg:mx-4 lg:w-48
            "
            @click="closeEdit"
          >
            Cancel
          </button>
        </div>
      </div>
    </OModal>
    <!-- showRemoveProduct modal component -->
    <OModal
      :active="showRemoveProductModal"
      @close="showRemoveProductModal = false"
    >
      <div class="w-full rounded bg-white p-2 sm:w-full sm:p-4">
        <h3 class="mb-3 font-bold text-brand-black">
          Remove Product
        </h3>
        <hr class="my-3">
        <p class="text-center text-lg font-semibold">
          Are you sure you want to delete {{ name }} ?
        </p>
        <hr class="my-3">
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
            hover:bg-brand-green/30
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
            hover:bg-brand-red/30
            lg:mx-4 lg:w-48
          "
          @click="closeRemove"
        >
          No
        </button>
      </div>
    </OModal>
    <AssignImageModal
      :active="showAssignImage"
      :element-key="selectedElement"
      @close="closeAssignImageDialog"
      @confirm="createImageToElement"
    />
    <AssignColourModal
      :active="showAssignColour"
      :element-key="selectedElement"
      @close="closeAssignColourDialog"
      @confirm="createColourToElement"
    />
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import 'vue-croppa/dist/vue-croppa.css';
import logout from '~/mixins/auth/logout';
import handlesMedia from '~/mixins/shop/handlesMedia'
import BasePagination from '~/components/base/BasePagination';
import InfiniteCategories from '~/components/InfiniteCategories.vue';
import FeaturedChip from '~/components/chips/FeaturedChip';
import SearchBar from '~/components/SearchBar'
import Tiptap from '~/components/Wysiwyg/Tiptap'
import aosMixin from '@/mixins/aos';
import currencyMixin from '@/mixins/currency';

const toNumber = (str) => +str;
export default {
  components: {
    InfiniteCategories,
    BasePagination,
    SearchBar,
    Tiptap,
    FeaturedChip,
  },
  mixins: [
    aosMixin,
    currencyMixin,
    logout,
    handlesMedia
  ],
  data() {
    return {
      query: '',
      from: 0,
      to: 0,
      totalPages: 0,
      totalItems: 0,
      activeVariantItem: null,
      isProductsLoading: false,
      isItemAdded: false,
      isItemFeatured: false,
      showAddProductModal: false,
      showEditProductModal: false,
      showRemoveProductModal: false,
      showGenerateEditedImageBtn: false,
      showGenerateCreatedImageBtn: false,
      showModal: false,
      name: '',
      price: '',
      description: '',
      subcategory: '',
      inStock: '',
      categoryLineages: [],
      tags: [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
        { id: 3, name: 'baz' },
      ],
      productList: [],
      editingNo: -1,
      showTags: false,
      myCroppa: {},
      myEditCroppa: {},
      imgUrl: [],
      imgUrlEdit: [],
      imgList: [],
      imgListEdit: [],
      supported: false,
      constraints: { video: true },
      filteredTags: [],
      selectedList: [],
      selectedCategory: {},
      selectedElement: -1,
      showAssignImage: false,
      showAssignColour: false,
      flag: false,
      categoryId: '',
      categoryParentId: '',
      multipleCategoryCounter: 1,
      multipleCategoryBuffer: [ 1 ],
      inStockRadio: 'Yes',
      isOpen: false,
      fullName: '',
      firstname: '',
      lastname: '',
      email: '',
      newCategoryName: '',
      moveDialog: false,
      pageSEO: {
        title: 'Products Admin - Revamped',
        description: 'Page for creating product items for Revamped',
      },
      isEdit: true, // True for editing item, false for adding variant
    };
  },
  head() {
    return {
      title: this.pageSEO.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageSEO.description
        },
      ],
    };
  },
  computed: {
    editModalTitle: {
      get() {
        return this.isEdit ? 'Edit Product' : 'Add Item Variant'
      },
    },
    categories: {
      get() {
        return this.$store.state.product.categories;
      },
      set(value) {
        this.$store.commit('product/setCategories', value);
      },
    },
    tagData: {
      get() {
        return this.$store.state.product.tagData;
      },
      set(value) {
        this.$store.commit('product/setTagData', value);
      },
    },
    page: {
      get() {
        return this.$store.state.shop.page;
      },
      set(value) {
        this.$store.commit('shop/setPage', value);
      },
    },
  },
  watch: {
    totalPages() {
      if (this.page > this.totalPages) {
        this.setPage(1)
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      setInterval(() => {
        this.$axios
          .$get('v1/users/me')
      }, 600000);
      if (this.$store.state.auth.user !== null) {
        this.email = this.$store.state.auth.user.email
        this.firstname = this.$store.state.auth.user.first_name
        this.lastname = this.$store.state.auth.user.last_name
        this.fullName = `${this.firstname} ${this.lastname}`
      }
      document.addEventListener('click', this.closeAdminDropdown)
    });
    this.retrieveProducts();
    this.retrieveCategories();
    this.$axios.$get('v1/tags/').then((response) => {
      this.$store.commit('product/setTagData', response.data.tags);
    });
    this.page = 1 // Reset pagination
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeAdminDropdown)
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    categoriesLink() {
      this.$router.push('/admin/categories')
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
    isDisable() {
      return (
        this.name === '' ||
        this.description === '' ||
        this.price === '' ||
        this.inStock === '' ||
        this.imgUrl === ''
      );
    },
    retrieveCategories() {
      this.$axios
        .$get('v1/categories/')
        .then((response) => {
          this.categories = response.data.categories
          this.$store.commit('product/setCategories', response.data.categories);
        });
    },
    retrieveProducts() {
      this.isProductsLoading = true;

      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        itemVariant: this.activeVariantItem,
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
          this.productList = response.data.items;
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
          console.log(response.data.items)
        })
        .finally(() => {
          this.isProductsLoading = false;
        });
    },
    setPage(page) {
      this.page = page;
      this.retrieveProducts();
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
    getFilteredTags(text) {
      this.filteredTags = this.tagData.map((option) => {
        return option.name.toLowerCase();
      });
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
    /* EDIT IMAGE */
    zoomInEdit() {
      this.myEditCroppa.zoomIn();
    },
    zoomOutEdit() {
      this.myEditCroppa.zoomOut();
    },
    rotateAntiEdit() {
      this.myEditCroppa.rotate(-1);
    },
    rotateEdit() {
      this.myEditCroppa.rotate();
    },
    flipxEdit() {
      this.myEditCroppa.flipX();
    },
    flipyEdit() {
      this.myEditCroppa.flipY();
    },
    handleNewImage() {
      this.showGenerateEditedImageBtn = true;
    },
    handleImageRemove() {
      this.showGenerateEditedImageBtn = false;
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
        },
      );

      this.myEditCroppa.refresh()
    },
    addPr() {
      this.$store.dispatch('product/clearProduct');
      this.reset();
      this.inStockRadio = 'Yes';
      this.toggleStock();
      this.showAddProductModal = true;
    },
    editPr(index) {
      this.$oruga.notification.open({
        message: 'Retrieving...',
        variant: 'info',
        duration: 3000,
        position: 'bottom',
        queue: true,
      });
      this.editingNo = toNumber(index);
      this.$axios
        .$get(`v1/items/${this.editingNo}`)
        .then((response) => {
          console.log(response.data.item)
          this.name = response.data.item.name;
          this.price = response.data.item.price;
          this.description = response.data.item.description;
          this.inStock = response.data.item.stock;
          this.tags = response.data.item.tags;
          this.isItemFeatured = response.data.item.is_featured;
          this.imgUrlEdit = response.data.item.media.map((x) =>
            `${this.$config.baseURL}/storage/${x.path}`);
          this.imgListEdit = response.data.item.media.map((x) => x.hash);
          const categoryLineages = response.data.item.categoryLineages
          this.multipleCategoryCounter = categoryLineages.length
          this.multipleCategoryBuffer = categoryLineages.map(((x, i) => i+1))
          this.categoryLineages = categoryLineages

          this.isEdit = true
          this.showEditProductModal = true;
        });
    },
    addVariant(productId) {
      this.$oruga.notification.open({
        message: 'Retrieving...',
        variant: 'info',
        duration: 3000,
        position: 'bottom',
        queue: true,
      });
      this.editingNo = toNumber(productId);
      this.$axios
        .$get(`v1/items/${this.editingNo}`)
        .then((response) => {
          this.name = response.data.item.name;
          this.price = response.data.item.price;
          this.description = response.data.item.description;
          this.inStock = response.data.item.stock;
          this.tags = response.data.item.tags;
          this.imgUrlEdit = response.data.item.media.map((x) =>
            `${this.$config.baseURL}/storage/${x.path}`);
          this.imgListEdit = response.data.item.media.map((x) => x.hash);
          const categoryLineages = response.data.item.categoryLineages
          this.multipleCategoryCounter = categoryLineages.length
          this.multipleCategoryBuffer = categoryLineages.map(((x, i) => i+1))
          this.categoryLineages = categoryLineages

          this.isEdit = false
          this.showEditProductModal = true;
        });
    },
    showVariants(productId) {
      this.activeVariantItem = productId
      this.retrieveProducts()
    },
    clearVariantItemFilter() {
      this.activeVariantItem = null
      this.retrieveProducts()
    },
    removePr(index) {
      this.editingNo = toNumber(index);
      this.$axios.$get(`v1/items/${this.editingNo}`).then((response) => {
        this.name = response.data.item.name;
      });
      this.showRemoveProductModal = true;
    },
    closeRemove() {
      this.showRemoveProductModal = false;
    },
    closeEdit() {
      this.showEditProductModal = false;
    },
    create() {
      // create item
      this.getSelected();
      this.myCroppa.generateBlob(
        (blob) => {
          const product = {
            name: this.name,
            price: this.price,
            description: this.description,
            categoryId: this.selectedCategory.map(x => x.id),
            inStock: this.inStock,
            tags: this.tags.map((x) => x.id),
            photo: this.imgList,
            isFeatured: this.isItemFeatured.toString(),
          };
          const form = new FormData();
          form.append('name', product.name);
          form.append('description', product.description);
          form.append('price', product.price);
          form.append('stock', product.inStock);
          form.append('isFeatured', product.isFeatured);
          for (let i = 0; i < product.tags.length; i++) {
            form.append('tags[]', product.tags[i]);
          }
          for (let i = 0; i < product.categoryId.length; i++) {
            form.append('categoryId[]', product.categoryId[i]);
          }
          for (let i = 0; i < product.photo.length; i++) {
            form.append('photo[]', product.photo[i], 'itemThumbnail.jpg');
          }
          const config = { headers: { 'Content-Type': 'multipart/form-data' } };

          this.$axios
            .$post('v1/items/', form, config)
            .then((response) => {
              this.showAddProductModal = false;
              this.isItemAdded = true;
              this.$oruga.notification.open({
                message: response.title,
                variant: 'success',
                duration: 5000,
                position: 'bottom',
                queue: true,
              });
              this.reset();
              this.retrieveProducts();
            })
            .catch((err) => {
              this.$oruga.notification.open({
                duration: 5000,
                message: err.title,
                position: 'bottom',
                variant: 'danger',
                closable: true,
                queue: true,
              });
            });
        },
        'image/jpeg',
        0.95
      );
    },
    confirmItemEdit(index) {
      if (this.isEdit) {
        this.updateItem(index)
      } else {
        this.addItemAsVariant(index)
      }
    },
    updateItem(index) {
      const editObject = this.productList.find(
        (product) => product.id === this.editingNo
      );
      this.selectedCategory = {};
      this.getSelected();
      const editedProduct = {
        name: this.name,
        price: this.price,
        description: this.description,
        inStock: this.inStock,
        categoryId: this.selectedCategory.map(x => x.id),
        tags: this.tags.map((x) => x.id),
        photo: this.imgListEdit,
        isFeatured: this.isItemFeatured.toString(),
      };

      const form = new FormData();
      form.append('_method', 'PATCH');
      form.append('name', editedProduct.name);
      form.append('description', editedProduct.description);
      form.append('price', editedProduct.price);
      form.append('stock', editedProduct.inStock);
      form.append('isFeatured', editedProduct.isFeatured);
      for (let i = 0; i < editedProduct.tags.length; i++) {
        form.append('tags[]', editedProduct.tags[i]);
      }
      for (let i = 0; i < editedProduct.categoryId.length; i++) {
        form.append('categoryId[]', editedProduct.categoryId[i]);
      }
      for (let i = 0; i < editedProduct.photo.length; i++) {
        form.append('photo[]', editedProduct.photo[i]);
      }
      form.append('id', index);

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      this.$axios
        .$post(`v1/items/${editObject.id}`, form, config)
        .then((response) => {
          this.showEditProductModal = false;
          this.$oruga.notification.open({
            message: response.title,
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.editingNo = '';
          this.reset();
          this.retrieveProducts();
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.title,
            position: 'bottom',
            variant: 'danger',
            closable: true,
            queue: true,
          });
        });
    },
    addItemAsVariant(index) {
      const editObject = this.productList.find(
        (product) => product.id === this.editingNo
      );
      this.selectedCategory = {};
      this.getSelected();
      const editedProduct = {
        name: this.name,
        price: this.price,
        description: this.description,
        inStock: this.inStock,
        categoryId: this.selectedCategory.map(x => x.id),
        tags: this.tags.map((x) => x.id),
        photo: this.imgListEdit,
      };

      const form = new FormData();
      form.append('_method', 'PATCH');
      form.append('name', editedProduct.name);
      form.append('description', editedProduct.description);
      form.append('price', editedProduct.price);
      form.append('stock', editedProduct.inStock);
      for (let i = 0; i < editedProduct.tags.length; i++) {
        form.append('tags[]', editedProduct.tags[i]);
      }
      for (let i = 0; i < editedProduct.categoryId.length; i++) {
        form.append('categoryId[]', editedProduct.categoryId[i]);
      }
      for (let i = 0; i < editedProduct.photo.length; i++) {
        form.append('photo[]', editedProduct.photo[i]);
      }
      form.append('id', index);

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      this.$axios
        .$post(`v1/items/addVariant/${editObject.id}`, form, config)
        .then((response) => {
          this.showEditProductModal = false;
          this.$oruga.notification.open({
            message: response.title,
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.editingNo = '';
          this.reset();
          this.retrieveProducts();
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.title,
            position: 'bottom',
            variant: 'danger',
            closable: true,
            queue: true,
          });
        });
    },
    remove(index) {
      const editObject = this.productList.find(
        (product) => product.id === this.editingNo
      );
      this.$axios
        .$delete(`/v1/items/${editObject.id}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Item Removed',
            position: 'bottom',
            variant: 'success',
            queue: true,
          });
          this.retrieveProducts();
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

      this.productList.splice(index, 1);
      this.reset();
      this.showRemoveProductModal = false;
    },
    duplicate(itemId) {
      this.$axios
        .$post(`v1/items/duplicate/${itemId}`)
        .then(() => {
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Item duplicated',
            position: 'bottom',
            variant: 'success',
            queue: true,
          });
          this.retrieveProducts();
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
    reset() {
      this.name = '';
      this.price = '';
      this.description = '';
      this.subcategory = '';
      this.inStock = '';
      this.isItemFeatured = false;
      this.imgUrl = [];
      this.imgList = [];
      this.imgUrlEdit = [];
      this.imgListEdit = [];
      this.syncProducts();
      this.resetCategoryPicker()
    },
    syncProducts() {
      this.name = this.$store.state.product.name;
      this.price = this.$store.state.product.price;
      this.description = this.$store.state.product.description;
      this.inStock = this.$store.state.product.inStock;
    },
    close() {
      this.showAddProductModal = false;
    },
    hasValidInput() {
      return this.first.trim() && this.last.trim();
    },
    disableTags() {
      this.tags.length = 0;
    },
    toggleStock() {
      if (this.inStockRadio === 'No') {
        this.inStock = 0
      }
      if (this.inStockRadio === 'Yes') {
        this.inStock = 1
      }
    },
    handleNegativeValue() {
      if (this.inStock < 0) {
        this.inStock = 0
      }
      if (String(this.inStock).length > 12) {
        this.inStock = String(this.inStock).slice(0, 12);
      }
    },
    updateValue() {
      const value = this.inStock;
      if (String(value).length <= 12) {
        this.inStock = value
      }
      this.$forceUpdate()
    },
    assignImage(elementId) {
      this.selectedElement = toNumber(elementId)
      console.log(`Assigning image to Element# ${this.selectedElement}`)
      this.showAssignImage = true
    },
    assignColour(elementId) {
      this.selectedElement = toNumber(elementId)
      console.log(`Assigning colour to Element# ${this.selectedElement}`)
      this.showAssignColour = true
    },
    closeAssignImageDialog() {
      this.showAssignImage = false
    },
    closeAssignColourDialog() {
      this.showAssignColour = false
    },
    createImageToElement(imgValue) {
      console.log(imgValue)
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Work in progress',
        position: 'bottom',
        variant: 'warning',
        queue: true,
      });
    },
    createColourToElement(colourValue) {
      console.log(colourValue)
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Work in progress',
        position: 'bottom',
        variant: 'warning',
        queue: true
      })
    },
  },
};
</script>

<style>
.croppa-container {
  background-color: #abb8c3;
  border: 3px solid #1a1d18;
}
.o-inputit__item--danger {
  background-color: #e73538 !important;
}

.part-item__actions [class^="ri-"] {
  padding-right: 0.25rem;
}
</style>