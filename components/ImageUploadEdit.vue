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
          v-model="myEditCroppa"
          :width="420"
          :height="280"
          :quality="5"
          placeholder="Drop team image here"
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
          @new-image-drawn="handleNewImage"
          @image-remove="handleImageRemove"
          @loading-end="applyEditMetadata"
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
            @click="rotateAntiEdit"
          >
            <i class="ri-anticlockwise-line mr-1"></i>
            Rotate Left
          </button>
          <button
            type="button"
            class="rugby-control-btn bg-green-100 hover:bg-green-200 text-green-700 
                   border border-green-300"
            @click="rotateEdit"
          >
            <i class="ri-clockwise-line mr-1"></i>
            Rotate Right
          </button>
          <button
            type="button"
            class="rugby-control-btn bg-blue-100 hover:bg-blue-200 text-blue-700 
                   border border-blue-300"
            @click="flipxEdit"
          >
            <i class="ri-arrow-left-right-line mr-1"></i>
            Flip X
          </button>
          <button
            type="button"
            class="rugby-control-btn bg-blue-100 hover:bg-blue-200 text-blue-700 
                   border border-blue-300"
            @click="flipyEdit"
          >
            <i class="ri-arrow-up-down-line mr-1"></i>
            Flip Y
          </button>
        </div>

        <!-- Zoom & Preset Controls -->
        <div class="flex flex-wrap gap-2 justify-center">
          <button
            type="button"
            class="rugby-control-btn bg-purple-100 hover:bg-purple-200 text-purple-700 
                   border border-purple-300"
            @click="zoomInEdit"
          >
            <i class="ri-zoom-in-line mr-1"></i>
            Zoom In
          </button>
          <button
            type="button"
            class="rugby-control-btn bg-purple-100 hover:bg-purple-200 text-purple-700 
                   border border-purple-300"
            @click="zoomOutEdit"
          >
            <i class="ri-zoom-out-line mr-1"></i>
            Zoom Out
          </button>
          <button
            type="button"
            class="rugby-control-btn bg-amber-100 hover:bg-amber-200 text-amber-700 
                   border border-amber-300"
            @click="setEditImagePreset"
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
      <div class="mt-6 text-center" v-if="showGenerateEditedImageBtn">
        <button
          type="button"
          class="rugby-generate-btn bg-gradient-to-r from-green-600 to-green-700 
                 hover:from-green-700 hover:to-green-800 text-gray-50 font-bold 
                 py-3 px-8 rounded-xl shadow-lg transition-all duration-300 
                 transform hover:scale-105 hover:shadow-xl"
          @click="generateEditedImage"
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
          Uploaded Image
        </h3>
      </div>
      
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(photo, photoIndex) in imgUrlEdit"
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
              class="h-72 w-full object-contain transition-transform 
                    duration-300 group-hover:scale-105"
            />
            
            <!-- Remove Button - Higher z-index -->
            <button
              type="button"
              class="absolute top-2 right-2 w-8 h-8 bg-red-500 
                    hover:bg-red-600 text-gray-50 rounded-full 
                    flex items-center justify-center shadow-md 
                    transition-all duration-200 transform 
                    hover:scale-110 opacity-0 group-hover:opacity-100 
                    cursor-pointer z-30"
              @click="removeEditedImage(photoIndex)"
            >
              <i class="ri-close-line text-sm"></i>
            </button>
            
            <!-- Image Overlay - Lower z-index -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 
                        to-transparent opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 flex items-end p-3 z-20">
              <span class="text-gray-50 text-sm font-medium">
                Image {{ photoIndex + 1 }}
              </span>
            </div>
          </div>
        </div>
      </div>
  
  <!-- Empty State -->
  <div 
    v-if="!imgUrlEdit || imgUrlEdit.length === 0"
    class="text-center py-12 bg-gray-50 rounded-xl border-2 
           border-dashed border-gray-300"
  >
    <i class="ri-image-2-line text-4xl text-gray-400 mb-3"></i>
    <p class="text-gray-500 font-medium">
      No images uploaded yet
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
          this.imgUrlEdit.push(URL.createObjectURL(blob));
          this.imgListEdit.push(blob);
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


<style lang="postcss">
.rugby-control-btn {
  @apply flex items-center gap-1 px-4 py-2 rounded-lg font-semibold 
         transition-all duration-200 transform hover:scale-105 
         active:scale-95 shadow-sm;
}

.rugby-generate-btn {
  @apply inline-flex items-center justify-center;
}
</style>

<style scoped>
.rugby-croppa-container {
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%);
}

.rugby-image-card {
  position: relative;
  overflow: hidden;
}
</style>
