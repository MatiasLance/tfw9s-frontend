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
          <!-- todo: add saleprice prop after :price -->
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

       <!-- showAdd modal component -->
       <OModal
       :active="showAddMerchItemModal"
       @close="showAddMerchItemModal = false"
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
            Add Merch Item
          </h3>
          <hr class="my-3">
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div class="col-span-1">
              <label for="productname" class="mb-1 block">
                Product Name:
              </label>
              <VTextField
              id="name"
              v-model="item.name"
              label="Enter Product Name"
              :rules="rules"
              type="text"
              solo
              />
            </div>
            <div class="col-span-1">
              <label for="productstock" class="mb-1 block">
                Stock:
              </label>
              <VTextField
              id="name"
              v-model="item.stock"
              label="Enter Stock"
              :rules="rules"
              type="number"
              min="0"
              solo
              />
            </div>
            <div class="col-span-1">
              <label
              for="productprice"
              class="mb-1 flex justify-between"
              >
                <p>Price: </p>
                <span class="font-semibold">
                  {{ formatCurrency(item.price) }}
                </span>
              </label>
              <VTextField
              id="name"
              v-model="item.price"
              label="Enter Price"
              :rules="rules"
              type="number"
              step=".01"
              min="0.00"
              solo
              />
            </div>
            <div class="col-span-1">
              <label
              for="productprice"
              class="mb-1 flex justify-between"
              >
                <p>Sale Price: </p>
                <span class="font-semibold">
                  {{ formatCurrency(item.saleprice) }}
                </span>
              </label>
              <VTextField
              id="name"
              v-model="item.saleprice"
              label="Enter Price"
              :rules="rules"
              type="number"
              step=".01"
              min="0.00"
              solo
              />
            </div>
            <div class="col-span-1 md:col-span-2" hidden>
              <label for="selectfield" class="mb-1 block">
                Tags:
              </label>
              <VSelect
              v-model="tags"
              :items="filteredTags"
              label="Choose Tags"
              :rules="rules"
              chips
              multiple
              solo
              >
                <template #prepend-item>
                  <div class="sticky-search-bar px-3">
                    <SearchBar v-model="tagQuery" />
                  </div>
                </template>
              </VSelect>
            </div>
            <div class="col-span-1 md:col-span-2">
              <label for="productdescription" class="mb-1 block">
                Description:
              </label>
              <Tiptap
              id="content"
              v-model="item.description"
              />
            </div>
            <div class="col-span-1 mb-4 md:col-span-2">
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
            <div class="col-span-1">
              <div
              class="
              flex flex-col
              sm:flex-row
              sm:space-x-2"
              >
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
                      v-model="item.is_featured"
                      name="approvalStatus"
                      type="checkbox"
                      class="
                      form-checkbox
                      h-4 w-4 bg-gray-200 text-brand-black
                      focus:ring-brand-black"
                    />
                  </span>
                  <span class="px-2">Featured</span>
                </label>
              </div>
            </div>
            <div class="col-span-1">
              <div
              class="
              flex flex-col
              sm:flex-row
              sm:space-x-2"
              >
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
                      v-model="item.isHideOutOfStock"
                      name="approvalStatus"
                      type="checkbox"
                      class="
                      form-checkbox
                      h-4 w-4 bg-gray-200 text-brand-black
                      focus:ring-brand-black"
                    />
                  </span>
                  <span class="px-2">Out of Stock</span>
                </label>
              </div>
            </div>
            <div class="col-span-1">
              <div
              class="
              flex flex-col
              sm:flex-row
              sm:space-x-2"
              >
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
                      v-model="item.is_on_sale"
                      name="approvalStatus"
                      type="checkbox"
                      class="
                      form-checkbox
                      h-4 w-4 bg-gray-200 text-brand-black
                      focus:ring-brand-black"
                    />
                  </span>
                  <span class="px-2">On Sale</span>
                </label>
              </div>
            </div>
            <div class="col-span-1">
              <div
              class="
              flex flex-col
              sm:flex-row
              sm:space-x-2"
              >
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
                      v-model="item.show_rrp"
                      name="approvalStatus"
                      type="checkbox"
                      class="
                      form-checkbox
                      h-4 w-4 bg-gray-200 text-brand-black
                      focus:ring-brand-black"
                    />
                  </span>
                  <span class="px-2">Show RRP</span>
                </label>
              </div>
            </div>
            <div class="col-span-1 md:col-span-2">
              <ImageUpload
                @update-image="updateImage"
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
              @click="close"
            >
              Cancel
            </button>
          </div>
        </VForm>
      </OModal>
      <!-- Show Edit News -->
      <OModal
      :active="showEditMerchItemModal"
      @close="showEditMerchItemModal = false"
    >
      <VForm
        ref="form" v-model="valid" lazy-validation
        class="p-2 md:p-4"
        >
        <h3 class="text-swd-red mb-3 font-bold">
          Edit Product Item
        </h3>
        <hr class="my-3">
        <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div class="col-span-1">
            <label for="productname" class="mb-1 block">
              Product Name:
            </label>
            <VTextField
            id="name"
            v-model="item.name"
            label="Enter Product Name"
            :rules="rules"
            type="text"
            solo
            />
          </div>
          <div class="col-span-1">
            <label for="productstock" class="mb-1 block">
              Stock:
            </label>
            <VTextField
            id="name"
            v-model="item.stock"
            label="Enter Stock"
            :rules="rules"
            type="number"
            min="0"
            solo
            />
          </div>
          <div class="col-span-1">
            <label
            for="productprice"
            class="mb-1 flex justify-between"
            >
              <p>Price: </p>
              <span class="font-semibold">
                {{ formatCurrency(item.price) }}
              </span>
            </label>
            <VTextField
            id="name"
            v-model="item.price"
            label="Enter Price"
            :rules="rules"
            type="number"
            step=".01"
            min="0.00"
            solo
            />
          </div>
          <div class="col-span-1">
            <label
            for="productprice"
            class="mb-1 flex justify-between"
            >
              <p>Sale Price: </p>
              <span class="font-semibold">
                {{ formatCurrency(item.saleprice) }}
              </span>
            </label>
            <VTextField
            id="name"
            v-model="item.saleprice"
            label="Enter Price"
            :rules="rules"
            type="number"
            step=".01"
            min="0.00"
            solo
            />
          </div>
          <div class="col-span-1 md:col-span-2" hidden>
            <label for="selectfield" class="mb-1 block">
              Tags:
            </label>
            <VSelect
            v-model="tags"
            :items="filteredTags"
            label="Choose Tags"
            :rules="rules"
            chips
            multiple
            solo
            >
              <template #prepend-item>
                <div class="sticky-search-bar px-3">
                  <SearchBar v-model="tagQuery" />
                </div>
              </template>
            </VSelect>
          </div>
          <div class="col-span-1 md:col-span-2">
            <label for="productdescription" class="mb-1 block">
              Description:
            </label>
            <Tiptap
            id="content"
            v-model="item.description"
            />
          </div>
          <div class="col-span-1 mb-4 md:col-span-2">
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
          <div class="col-span-1">
            <div
            class="
            flex flex-col
            sm:flex-row
            sm:space-x-2"
            >
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
                    v-model="item.is_featured"
                    name="approvalStatus"
                    type="checkbox"
                    class="
                    form-checkbox
                    h-4 w-4 bg-gray-200 text-brand-black
                    focus:ring-brand-black"
                  />
                </span>
                <span class="px-2">Featured</span>
              </label>
            </div>
          </div>
          <div class="col-span-1">
            <div
            class="
            flex flex-col
            sm:flex-row
            sm:space-x-2"
            >
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
                    v-model="item.isHideOutOfStock"
                    name="approvalStatus"
                    type="checkbox"
                    class="
                    form-checkbox
                    h-4 w-4 bg-gray-200 text-brand-black
                    focus:ring-brand-black"
                  />
                </span>
                <span class="px-2">Out of Stock</span>
              </label>
            </div>
          </div>
          <div class="col-span-1">
            <div
            class="
            flex flex-col
            sm:flex-row
            sm:space-x-2"
            >
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
                    v-model="item.is_on_sale"
                    name="approvalStatus"
                    type="checkbox"
                    class="
                    form-checkbox
                    h-4 w-4 bg-gray-200 text-brand-black
                    focus:ring-brand-black"
                  />
                </span>
                <span class="px-2">On Sale</span>
              </label>
            </div>
          </div>
          <div class="col-span-1">
            <div
            class="
            flex flex-col
            sm:flex-row
            sm:space-x-2"
            >
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
                    v-model="item.show_rrp"
                    name="approvalStatus"
                    type="checkbox"
                    class="
                    form-checkbox
                    h-4 w-4 bg-gray-200 text-brand-black
                    focus:ring-brand-black"
                  />
                </span>
                <span class="px-2">Show RRP</span>
              </label>
            </div>
          </div>
          <div class="col-span-1 md:col-span-2">
            <ImageUploadEdit
              :imglistedit="imgListEdit"
              :imgurledit="imgUrlEdit"
              @update-image-edit="updateImageEdit"
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
              hover:bg-green-800
              lg:mx-4 lg:w-48
            "
            :disabled="!valid"
            @click="validate('Edit')"
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
              hover:bg-brand-dred
              lg:mx-4 lg:w-48
            "
            @click="closeEdit"
          >
            Cancel
          </button>
        </div>
      </VForm>
    </OModal>

    <OModal
      :active="showAddVariant"
      @close="showAddVariant = false"
    >
      <div class="w-full rounded bg-white p-2 sm:w-[500px] sm:p-4">
        <h3 class="text-swd-red mb-3 font-bold">
          Add Variant
        </h3>
        <hr class="my-3">
        <div v-if="variantList.length > 0">
          <div
            class="col-span-1 mb-2"
            v-for="variant in variantList"
            :key="variant.id"
          >
            <div
            class="
            flex flex-col
            sm:flex-row
            sm:space-x-2"
            >
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
                    v-model="checkedVariants"
                    :value="variant.name"
                    name="variantColor"
                    type="checkbox"
                    class="
                    form-checkbox
                    h-4 w-4 bg-gray-200 text-brand-black
                    focus:ring-brand-black"
                  />
                </span>
                <span class="px-2">{{ variant.name }}</span>
              </label>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="my-10 text-center text-gray-500">
            No variants available.
          </p>
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
              hover:bg-green-800
              lg:mx-4 lg:w-48
            "
            @click="confirmVariant(prodId)"
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
              hover:bg-brand-dred
              lg:mx-4 lg:w-48
            "
             @click="closeAddVariant"
          >
            Cancel
          </button>
        </div>
      </div>
    </OModal>

    <OModal
      :active="showShowVariant"
      @close="showShowVariant = false"
    >
      <div class="w-full rounded bg-white p-2 sm:w-[500px] sm:p-4">
        <h3 class="text-swd-red mb-3 font-bold">
          Product Variant
        </h3>
        <hr class="my-3">
        <div v-if="myVariantList.length > 0">
          <div
            class="col-span-1 mb-2"
            v-for="variant in myVariantList"
            :key="variant.id"
          >
            <div
              class="flex flex-col sm:flex-row sm:space-x-2"
            >
              <label
                class="flex justify-between w-full border
                border-gray-200 bg-transparent p-3
                hover:border-brand-black hover:bg-slate-100"
              >
                <span class="px-2">{{ variant.color }}</span>
                <i
                  class="cursor-pointer ri-delete-bin-5-line
                  hover:text-red-500"
                  @click="removeVariant(variant.id)"
                ></i>
              </label>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="my-10 text-center text-gray-500">
            No item variants available.
          </p>
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
              bg-brand-red
              py-3
              px-5
              text-center
              font-bold
              text-white
              hover:bg-brand-dred
              lg:mx-4 lg:w-48
              "
            @click="closeShowVariant"
            >
            Close
          </button>
        </div>
      </div>
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
      if (!this.$refs.form.validate()) {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Fill out all required fields',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else if (this.item.description === '<p></p>') {
        this.$oruga.notification.open({
          duration: 5000,
          message: 'Fill out description fields',
          position: 'bottom',
          variant: 'danger',
          queue: true,
        });
        return false;
      } else if (type === 'Add') {
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
      form.append('salePrice', this.item.saleprice)
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
      form.append('salePrice', this.item.saleprice)
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
</style>

