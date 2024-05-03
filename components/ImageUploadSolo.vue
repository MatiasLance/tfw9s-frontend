<template>
  <div class="col-span-1 md:col-span-2">
    <label for="photo" class="mb-1 block">
        Image upload:
    </label>
    <!-- Insert myCroppa here -->
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <div class="col-span-1">
        <Croppa
          v-model="myCroppa"
          :width="320"
          :height="320"
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
      <div class="col-span-1 max-h-[320px] max-w-[320px]">
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
</template>

<script>
export default {
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
          this.imgUrl.splice(0, 1, URL.createObjectURL(blob));
          this.imgList.splice(0, 1, blob);
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
