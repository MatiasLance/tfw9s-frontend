<template>
  <div class="col-span-1 md:col-span-2">
    <!-- Card Wrapper -->
    <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label class="mb-4 block text-lg font-semibold text-gray-800">
        <i class="ri-image-edit-line mr-2 text-indigo-600"></i>Featured Image
      </label>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Left: Croppa Editor -->
        <div class="space-y-4">
          <!-- Croppa Container with subtle border -->
          <div class="overflow-hidden rounded-lg border-2 border-dashed
            border-gray-300 bg-gray-50 p-2 transition-colors
            hover:border-indigo-400"
          >
            <Croppa
              v-model="myEditCroppa"
              :width="395"
              :height="290"
              :quality="5"
              placeholder="Drop your image here or click"
              :placeholder-font-size="15"
              accept=".png, .webp, .jpeg, .jpg"
              :file-size-limit="31457280"
              :zoom-speed="5"
              :prevent-white-space="false"
              :show-loading="true"
              initial-size="contain"
              @file-size-exceed="handleCroppaFileSizeExceed"
              @file-type-mismatch="handleCroppaFileTypeMismatch"
              @new-image-drawn="handleNewImage"
              @image-remove="handleImageRemove"
              @loading-end="applyEditMetadata"
            />
          </div>

          <!-- Toolbar – grouped controls -->
          <div class="flex flex-wrap items-center gap-2">
            <!-- Transform Group -->
            <div class="flex items-center rounded-lg border border-gray-300 bg-white p-1">
              <button
                type="button"
                class="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                title="Rotate Left"
                @click="rotateAnti"
              >
                <i class="ri-anticlockwise-line text-lg"></i>
              </button>
              <button
                type="button"
                class="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                title="Rotate Right"
                @click="rotate"
              >
                <i class="ri-clockwise-line text-lg"></i>
              </button>
              <button
                type="button"
                class="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                title="Flip Horizontal"
                @click="flipx"
              >
                <i class="ri-arrow-left-right-line text-lg"></i>
              </button>
              <button
                type="button"
                class="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                title="Flip Vertical"
                @click="flipy"
              >
                <i class="ri-arrow-up-down-line text-lg"></i>
              </button>
            </div>

            <!-- Zoom Group -->
            <div class="flex items-center rounded-lg border border-gray-300 bg-white p-1">
              <button
                type="button"
                class="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                title="Zoom In"
                @click="zoomIn"
              >
                <i class="ri-zoom-in-line text-lg"></i>
              </button>
              <button
                type="button"
                class="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                title="Zoom Out"
                @click="zoomOut"
              >
                <i class="ri-zoom-out-line text-lg"></i>
              </button>
            </div>
          </div>

          <!-- Preset & Generate Row -->
          <div class="flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="rounded-lg border border-gray-300 bg-white
              px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              @click="setImagePreset"
            >
              Save Preset
            </button>
            <button
              type="button"
              class="rounded-lg border border-gray-300
              bg-white px-4 py-2 text-sm font-medium
              text-gray-700 hover:bg-gray-50"
              @click="clearImagePreset"
            >
              Clear Preset
            </button>

            <button
             type="button"
              v-if="showGenerateEditedImageBtn"
              class="ml-auto rounded-lg bg-indigo-600 px-6 py-2
              text-sm font-semibold text-white shadow-md
              hover:bg-indigo-700 focus:outline-none
              focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="generateEditedImage"
            >
              <i class="ri-download-2-line mr-2"></i>GENERATE
            </button>
          </div>
        </div>

        <!-- Right: Generated Images Gallery -->
        <div class="space-y-4">
          <h3 class="text-sm font-medium text-gray-500">
            Generated Versions
          </h3>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div
              v-for="(photo, photoIndex) in imgUrlEdit"
              :key="photo"
              class="group relative overflow-hidden rounded-lg
              border border-gray-200 bg-white shadow-sm"
            >
              <img
                :src="photo"
                alt="Edited image"
                class="h-28 w-full object-cover transition-transform
                duration-200 group-hover:scale-105"
              />
              <button
                type="button"
                class="absolute right-1 top-1 flex h-6 w-6 items-center
                justify-center rounded-full bg-white/80 text-gray-600
                shadow-sm backdrop-blur-sm hover:bg-red-50 hover:text-red-600"
                title="Remove image"
                @click="removeEditedImage(photoIndex)"
              >
                <i class="ri-close-line text-sm"></i>
              </button>
            </div>
            <!-- Empty state when no images -->
            <div
              v-if="imgUrlEdit.length === 0"
              class="col-span-full flex flex-col items-center
              justify-center rounded-lg border-2 border-dashed
              border-gray-300 py-8 text-gray-400"
            >
              <i class="ri-image-add-line text-3xl"></i>
              <p class="mt-2 text-sm">
                No generated images yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imglistedit: {
      type: Array,
      required: true,
    },
    imgurledit: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      myEditCroppa: {},
      showGenerateCreatedImageBtn: false,
      showGenerateEditedImageBtn: false,
      imgUrlEdit: this.imgurledit,
      imgListEdit: this.imglistedit,
    }
  },
  watch: {
    imgListEdit: {
      handler(newImgList) {
        this.$emit('update-image-edit', newImgList)
      },
      deep: true,
    },
  },
  methods: {
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
      this.myEditCroppa.zoomIn();
    },
    zoomOut() {
      this.myEditCroppa.zoomOut();
    },
    rotateAnti() {
      this.myEditCroppa.rotate(-1);
    },
    rotate() {
      this.myEditCroppa.rotate();
    },
    flipx() {
      this.myEditCroppa.flipX();
    },
    flipy() {
      this.myEditCroppa.flipY();
    },
    setImagePreset() {
      const metadata = this.myCroppa.getMetadata()
      localStorage.setItem(
        'metadata',
        JSON.stringify(metadata)
      );
      this.applyMetadata()
      this.$oruga.notification.open({
        message: 'Image preset applied on proceeding uploads',
        variant: 'info',
        duration: 5000,
        position: 'bottom',
        queue: true,
      })
    },
    clearImagePreset() {
      localStorage.removeItem('metadata')
      this.applyMetadata()
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
      this.applyEditMetadata()
      this.$oruga.notification.open({
        message: 'Image preset applied on proceeding uploads',
        variant: 'info',
        duration: 5000,
        position: 'bottom',
        queue: true,
      })
    },
    generateEditedImage() {
      this.showGenerateEditedImageBtn = false;
      this.myEditCroppa.generateBlob(
        (blob) => {
          this.imgUrlEdit.splice(0, 1, URL.createObjectURL(blob));
          this.imgListEdit.splice(0, 1, blob);
        },
      );

      this.myEditCroppa.refresh()
    },
    /** REMOVE IMAGE IN IMGURL AND IMGLIST */
    removeEditedImage(index) {
      this.imgUrlEdit.splice(index, 1)
      this.imgListEdit.splice(index, 1)
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
  },
}

</script>
