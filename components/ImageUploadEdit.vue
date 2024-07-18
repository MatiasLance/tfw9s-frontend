<template>
  <div>
    <div class="col-span-4 mb-4 w-full">
      <label for="photo" class="mb-1 block">
        Image upload:
      </label>
      <!-- Insert myEditCroppa here -->
      <Croppa
          v-model="myEditCroppa"
        :width="420"
        :height="280"
          :quality="5"
          placeholder="Place image here"
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
          large
          class="bg-gradient-to-r from-brand-black to-brand-black"
          @click="generateEditedImage"
          >
          GENERATE
      </VBtn>
    </div>
    <div class="col-span-4 mb-4 w-full">
      <div
          class="grid grid-cols-1 gap-3 lg:grid-cols-3"
          >
          <div
              v-for="(photo, photoIndex) in imgUrlEdit"
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
                  @click="removeEditedImage(photoIndex)"
                  >
                  <div class="ri-close-fill ri-lg"></div>
              </button>
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
