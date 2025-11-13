<template>
  <div class="space-y-6">
    <!-- Main Image Upload Section -->
    <div class="col-span-4 w-full">
      <div class="flex items-center mb-4">
        <i class="ri-image-line text-green-600 text-xl mr-2"></i>
        <label for="photo" class="block text-lg font-bold text-gray-800">
          Image Upload*
        </label>
      </div>
      
      <!-- Croppa Container with Rugby Theme -->
      <div class="rugby-croppa-container bg-gradient-to-br from-gray-50 to-green-50 
                  border-2 border-green-200 rounded-xl p-4 shadow-sm">
        <Croppa
          v-model="myCroppa"
          :width="width"
          :height="height"
          :quality="5"
          placeholder="Drop rugby image here"
          :placeholder-font-size="16"
          placeholder-color="#6b7280"
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
          class="mx-auto border-2 border-dashed border-green-300 rounded-lg 
                 hover:border-green-400 transition-colors duration-300"
        />
      </div>

      <!-- Image Control Buttons -->
      <div class="mt-4 space-y-3">
        <!-- Transform Controls -->
        <div class="flex flex-wrap gap-2 justify-center">
          <button
            type="button"
            class="rugby-control-btn bg-green-100 hover:bg-green-200 text-green-700 
                   border border-green-300"
            @click="rotateAnti"
          >
            <i class="ri-anticlockwise-line mr-1"></i>
            Rotate Left
          </button>
          <button
            type="button"
            class="rugby-control-btn bg-green-100 hover:bg-green-200 text-green-700 
                   border border-green-300"
            @click="rotate"
          >
            <i class="ri-clockwise-line mr-1"></i>
            Rotate Right
          </button>
          <button
            type="button"
            class="rugby-control-btn bg-blue-100 hover:bg-blue-200 text-blue-700 
                   border border-blue-300"
            @click="flipx"
          >
            <i class="ri-arrow-left-right-line mr-1"></i>
            Flip Horizontal
          </button>
          <button
            type="button"
            class="rugby-control-btn bg-blue-100 hover:bg-blue-200 text-blue-700 
                   border border-blue-300"
            @click="flipy"
          >
            <i class="ri-arrow-up-down-line mr-1"></i>
            Flip Vertical
          </button>
        </div>

        <!-- Zoom & Preset Controls -->
        <div class="flex flex-wrap gap-2 justify-center">
          <button
            type="button"
            class="rugby-control-btn bg-purple-100 hover:bg-purple-200 text-purple-700 
                   border border-purple-300"
            @click="zoomIn"
          >
            <i class="ri-zoom-in-line mr-1"></i>
            Zoom In
          </button>
          <button
            type="button"
            class="rugby-control-btn bg-purple-100 hover:bg-purple-200 text-purple-700 
                   border border-purple-300"
            @click="zoomOut"
          >
            <i class="ri-zoom-out-line mr-1"></i>
            Zoom Out
          </button>
          <button
            type="button"
            class="rugby-control-btn bg-amber-100 hover:bg-amber-200 text-amber-700 
                   border border-amber-300"
            @click="setImagePreset"
          >
            <i class="ri-checkbox-circle-line mr-1"></i>
            Set Preset
          </button>
          <button
            type="button"
            class="rugby-control-btn bg-red-100 hover:bg-red-200 text-red-700 
                   border border-red-300"
            @click="clearImagePreset"
          >
            <i class="ri-close-circle-line mr-1"></i>
            Clear
          </button>
        </div>
      </div>

      <!-- Generate Button -->
      <div class="mt-6 text-center" v-if="showGenerateCreatedImageBtn">
        <button
          type="button"
          class="rugby-generate-btn bg-gradient-to-r from-green-600 to-green-700 
                 hover:from-green-700 hover:to-green-800 text-gray-50 font-bold 
                 py-3 px-8 rounded-xl shadow-lg transition-all duration-300 
                 transform hover:scale-105 hover:shadow-xl"
          @click="generateImage"
        >
          <i class="ri-team-line mr-2"></i>
          GENERATE IMAGE
        </button>
      </div>
    </div>

    <!-- Image Gallery Preview -->
    <div class="col-span-4 w-full">
      <div class="flex items-center mb-4">
        <i class="ri-gallery-line text-green-600 text-xl mr-2"></i>
        <h3 class="text-lg font-bold text-gray-800">
          Image Preview
        </h3>
      </div>
      
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(photo, photoIndex) in imgUrl"
          :key="photo"
          class="relative group"
        >
          <div class="rugby-image-card bg-gradient-to-br from-gray-800 
                      via-gray-850 to-gray-900 rounded-xl shadow-md 
                      border border-gray-200 overflow-hidden 
                      transition-all duration-300 group-hover:shadow-lg 
                      group-hover:border-green-300">
            <img 
              :src="photo" 
              class="w-full h-72 object-contain transition-transform 
                     duration-300 group-hover:scale-105"
            />
            
            <!-- Remove Button -->
            <button
              type="button"
              class="absolute top-2 right-2 w-8 h-8 bg-red-500 
                     hover:bg-red-600 text-gray-50 rounded-full 
                     flex items-center justify-center shadow-md 
                     transition-all duration-200 transform 
                     hover:scale-110 opacity-0 group-hover:opacity-100"
              @click="removeImage(photoIndex)"
            >
              <i class="ri-close-line text-sm"></i>
            </button>
            
            <!-- Image Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 
                        to-transparent opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 flex items-end p-3">
              <span class="text-gray-50 text-sm font-medium">
                Image {{ photoIndex + 1 }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div 
        v-if="!imgUrl || imgUrl.length === 0"
        class="text-center py-12 bg-gray-50 rounded-xl border-2 
               border-dashed border-gray-300"
      >
        <i class="ri-image-2-line text-4xl text-gray-400 mb-3"></i>
        <p class="text-gray-500 font-medium">
          No team images uploaded yet
        </p>
        <p class="text-gray-400 text-sm mt-1">
          Upload your first image above
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: [ String, Number ],
      default: 420
    },
    height: {
      type: [ String, Number ],
      default: 280
    },
  },
  data() {
    return {
      myCroppa: {},
      showGenerateCreatedImageBtn: false,
      showGenerateEditedImageBtn: false,
      imgUrl: [],
      imgList: [],
    }
  },
  watch: {
    imgList: {
      handler(newImgList) {
        this.$emit('update-image', newImgList)
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
    generateImage() {
      this.showGenerateCreatedImageBtn = false;
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
    handleNewImageCreate() {
      this.showGenerateCreatedImageBtn = true;
    },
    handleImageRemoveCreate() {
      this.showGenerateCreatedImageBtn = false;
    },
  },
}

</script>

<style scoped>
.rugby-control-btn {
  @apply flex items-center gap-1 px-4 py-2 rounded-lg font-semibold 
         transition-all duration-200 transform hover:scale-105 
         active:scale-95 shadow-sm;
}

.rugby-generate-btn {
  @apply inline-flex items-center justify-center;
}

.rugby-image-card {
  position: relative;
  overflow: hidden;
}

.rugby-croppa-container {
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%);
}
</style>
