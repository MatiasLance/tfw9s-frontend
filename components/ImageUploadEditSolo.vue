<template>
  <div class="col-span-1 md:col-span-2">
    <label for="photo" class="mb-1 block">
        Image upload:
    </label>
    <!-- Insert myCroppa here -->
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <div class="col-span-1">
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
        v-if="showGenerateEditedImageBtn"
        dark
        large
        class="bg-gradient-to-r from-brand-black to-brand-black"
        @click="generateEditedImage"
        >
          GENERATE
        </VBtn>
      </div>
      <div class="col-span-1 max-h-[320px] max-w-[320px]">
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
