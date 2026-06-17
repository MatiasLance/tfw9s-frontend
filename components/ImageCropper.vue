<template>
  <div class="w-[480px]">
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      
      <!-- Header -->
      <div class="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
        <div class="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-blue-600">
          <i class="ri-image-line text-lg" aria-hidden="true"></i>
        </div>
        <h3 class="text-sm font-semibold text-gray-700">Upload Image</h3>
      </div>

      <!-- Croppa area -->
        <Croppa
          v-model="myCroppa"
          :width="width"
          :height="height"
          :quality="5"
          placeholder="Click or drop image here"
          :placeholder-font-size="14"
          accept=".png, .webp, .jpeg, .jpg"
          :file-size-limit="31457280"
          :zoom-speed="5"
          :prevent-white-space="false"
          :show-loading="true"
          initial-size="contain"
          @file-size-exceed="handleCroppaFileSizeExceed"
          @file-type-mismatch="handleCroppaFileTypeMismatch"
          @new-image-drawn="handleNewImageCreate"
          @image-remove="handleImageRemoveCreate"
          @loading-end="applyMetadata"
        />

      <!-- Toolbar: all controls in one compact row -->
      <div class="flex flex-wrap items-center gap-2 px-5 py-3">
        <!-- Rotate & Flip group -->
        <div class="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-1 py-1">
          <button
            class="rounded p-1.5 text-gray-600 hover:bg-gray-200 focus:outline-none"
            @click="rotateAnti"
            aria-label="Rotate left"
          >
            <i class="ri-anticlockwise-line"></i>
          </button>
          <button
            class="rounded p-1.5 text-gray-600 hover:bg-gray-200 focus:outline-none"
            @click="rotate"
            aria-label="Rotate right"
          >
            <i class="ri-clockwise-line"></i>
          </button>
          <span class="mx-0.5 h-4 w-px bg-gray-200"></span>
          <button
            class="rounded p-1.5 text-gray-600 hover:bg-gray-200 focus:outline-none"
            @click="flipx"
            aria-label="Flip horizontal"
          >
            <i class="ri-arrow-left-right-line"></i>
          </button>
          <button
            class="rounded p-1.5 text-gray-600 hover:bg-gray-200 focus:outline-none"
            @click="flipy"
            aria-label="Flip vertical"
          >
            <i class="ri-arrow-up-down-line"></i>
          </button>
        </div>

        <!-- Zoom group -->
        <div class="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-1 py-1">
          <button
            class="rounded p-1.5 text-gray-600 hover:bg-gray-200 focus:outline-none"
            @click="zoomIn"
            aria-label="Zoom in"
          >
            <i class="ri-zoom-in-line"></i>
          </button>
          <button
            class="rounded p-1.5 text-gray-600 hover:bg-gray-200 focus:outline-none"
            @click="zoomOut"
            aria-label="Zoom out"
          >
            <i class="ri-zoom-out-line"></i>
          </button>
        </div>

        <!-- Preset controls -->
        <div class="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-1 py-1">
          <button
            class="rounded p-1.5 text-gray-600 hover:bg-gray-200 focus:outline-none"
            @click="setImagePreset"
            aria-label="Save preset"
          >
            <i class="ri-save-line"></i>
          </button>
          <button
            class="rounded p-1.5 text-gray-600 hover:bg-gray-200 focus:outline-none"
            @click="clearImagePreset"
            aria-label="Clear preset"
          >
            <i class="ri-delete-back-line"></i>
          </button>
        </div>
      </div>

      <!-- Generate button (only when image is loaded) -->
      <div class="border-t border-gray-100 px-5 py-4">
        <button
          v-if="showGenerateCreatedImageBtn"
          class="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
          @click="generateImage"
        >
          <i class="ri-check-line"></i>
          Generate
        </button>
        <p v-else class="text-xs text-gray-400">
          Crop and adjust your image, then press Generate.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: { type: [ String, Number ], default: 480 },
    height: { type: [ String, Number ], default: 320 },
  },
  data() {
    return {
      myCroppa: {},
      showGenerateCreatedImageBtn: false,
      showGenerateEditedImageBtn: false,
    }
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
    zoomIn() { this.myCroppa.zoomIn(); },
    zoomOut() { this.myCroppa.zoomOut(); },
    rotateAnti() { this.myCroppa.rotate(-1); },
    rotate() { this.myCroppa.rotate(); },
    flipx() { this.myCroppa.flipX(); },
    flipy() { this.myCroppa.flipY(); },
    setImagePreset() {
      const metadata = this.myCroppa.getMetadata()
      localStorage.setItem('metadata', JSON.stringify(metadata));
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
        this.myCroppa.moveUpwards(1)
        this.myCroppa.moveDownwards(1)
      })
    },
    generateImage() {
      this.showGenerateCreatedImageBtn = false;
      this.myCroppa.generateBlob((blob) => {
        this.$emit('upload', blob);
      });
      this.myCroppa.refresh();
    },
    handleNewImageCreate() { this.showGenerateCreatedImageBtn = true; },
    handleImageRemoveCreate() { this.showGenerateCreatedImageBtn = false; },
  },
}
</script>

<style scoped>
:deep(.croppa-container) {
  border-radius: 0.5rem;
  background: transparent;
  overflow: hidden;
  position: relative;
}

:deep(.croppa-container canvas) {
  border-radius: 0.5rem;
}

:deep(.croppa-container > .remove),
:deep(.croppa-container > .croppa-remove),
:deep(.croppa-container > button[title*="Remove"]) {
  position: absolute;
  top: 8px !important;
  right: 8px !important;
  margin: 0 !important;
}
</style>