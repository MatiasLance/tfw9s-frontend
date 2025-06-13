<template>
  <div class="w-full">
    <!-- Insert myCroppa here -->
    <Croppa
      v-model="myCroppa"
      :width="width"
      :height="height"
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
      class="from-brand-black to-brand-black bg-gradient-to-r"
      @click="generateImage"
      >
      GENERATE
    </VBtn>
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
          this.$emit('upload', blob);
        },
      );
      this.myCroppa.refresh();
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
