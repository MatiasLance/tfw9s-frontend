<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-[440px] rounded bg-white">
        <div class="p-5">
            <span class="text-xl font-bold">
                Assign Image for {{ elementName }}
            </span>
        </div>
        <hr>
            <label class="my-8 block">
                <div class="mx-auto my-9 flex items-center justify-center">
                    <Croppa
                        v-model="elementCroppa"
                        :auto-sizing="true"
                        placeholder="Attach image"
                        :quality="2"
                        accept=".png, .webp, .jpeg, .jpg"
                        :image-border-radius="60"
                        :zoom-speed="4"
                        :placeholder-font-size="18"
                        initial-size="contain"
                        show-loading="true"
                        @file-type-mismatch="handleFileTypeMismatch"
                        @new-image-drawn="handleNewImage"
                        @image-remove="handleRemoveImage"
                    >
                    </Croppa>
                </div>
                <section class="flex flex-col">
                    <div class="flex items-center justify-center">
                        <VBtn small @click="rotateAnti">
                            <i class="ri-anticlockwise-line"></i>
                        </VBtn>
                        <VBtn small @click="rotate">
                            <i class="ri-clockwise-line"></i>
                        </VBtn>
                        <VBtn small @click="flipx">
                            <i class="ri-arrow-left-right-line"></i>
                        </VBtn>
                        <VBtn small @click="flipy">
                            <i class="ri-arrow-up-down-line"></i>
                        </VBtn>
                    </div>
                    <div class="flex items-center justify-center">
                        <VBtn small @click="zoomIn">
                            <i class="ri-zoom-in-line"></i>
                        </VBtn>
                        <VBtn small @click="zoomOut">
                            <i class="ri-zoom-out-line"></i>
                        </VBtn>
                    </div>
                    <VBtn
                      v-if="showGenerateBtn"
                      dark
                      large
                      class="my-4 bg-gradient-to-r
                      from-brand-black to-brand-black"
                      @click="generateElementImage"
                    >
                      GENERATE
                    </VBtn>
                </section>
            </label>
            <br />
            <div class="grid grid-cols-1 gap-3">
                <div class="relative col-span-1 flex justify-center">
                    <VImg
                        v-if="isImagePreview"
                        :src="thumbnail"
                    ></VImg>
                    <button
                      v-if="isImagePreview"
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
                      @click="removeImage()"
                    >
                      <div class="ri-close-fill ri-lg"></div>
                    </button>
                </div>
            </div>
        <hr>
        <div
            class="
                flex items-center
                justify-end
                gap-2
                px-4
                pt-2
            "
        >
            <button
                type="button"
                class="
                    rounded
                    px-2
                    py-1
                    hover:bg-gray-500
                    hover:text-white
                "
                @click="closeDialog"
            >
                Cancel
            </button>
            <button
                type="button"
                class="
                rounded
                px-2
                py-1
                font-bold
                text-brand-black
                hover:bg-brand-black
                hover:text-white
                "
                @click="confirmAction"
            >
                Confirm
            </button>
        </div>
    </div>
  </OModal>
</template>

<script>
import 'remixicon/fonts/remixicon.css'
import 'vue-croppa/dist/vue-croppa.css'

export default {
  name: 'AssignImageModal',
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    elementKey: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      imgValue: '',
      elementName: '',
      elementCroppa: {},
      thumbnail: '',
      thumbnailType: 'image',
      showGenerateBtn: false,
      isImagePreview: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    retrieveElement(elid) {
      this.$axios
        .$get(`/v1/variants/elements/${elid}`)
        .then((response) => {
          this.elementName = response.data.element.name
          this.thumbnail = response.data.element.thumbnail.value
          this.thumbnailType = response.data.element.thumbnail.type
        })
        .catch((err) => {
          console.log(err)
        })
    },
    confirmAction() {
      this.thumbnailType = 'image'
      const editedElement = {
        id: this.elementKey,
        name: this.elementName,
        thumbnail: this.imgValue,
        thumbnailType: this.thumbnailType
      }
      this.$emit('confirm', editedElement)
    },
    setImage() {
      this.elementCroppa.generateBlob((blob) => {
        this.imgValue = blob
      })
    },
    generateElementImage() {
      this.elementCroppa.generateBlob(
        (blob) => {
          this.thumbnail = URL.createObjectURL(blob)
          this.imgValue = blob
        }
      );
      this.isImagePreview = true
      this.elementCroppa.remove()
    },
    zoomIn() {
      this.elementCroppa.zoomIn();
    },
    zoomOut() {
      this.elementCroppa.zoomOut();
    },
    rotateAnti() {
      this.elementCroppa.rotate(-1);
    },
    rotate() {
      this.elementCroppa.rotate();
    },
    flipx() {
      this.elementCroppa.flipX();
    },
    flipy() {
      this.elementCroppa.flipY();
    },
    handleFileTypeMismatch(file) {
      console.log(file)
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Invalid file type. Please choose a jpeg, png or webp file.',
        position: 'bottom',
        variant: 'danger',
        queue: true,
      });
    },
    handleNewImage() {
      this.showGenerateBtn = true
    },
    handleRemoveImage() {
      this.showGenerateBtn = false
    },
    removeImage() {
      this.thumbnail = ''
      this.isImagePreview = false;
    }
  }
}
</script>