<template>
    <OModal :active="active" @close="closeDialog">
    <div class="w-[440px] rounded bg-white">
      <div class="p-4">
        <span class="text-xl">
          Add Element
        </span>
      </div>
      <hr>
      <div class="my-1 p-2">
        <VTextField
          v-model="element.name"
          solo
          required
          label="Element Name"
        ></VTextField>
    </div>
    <div class="my-1 p-2">
      <VTextField
        v-model="element.price"
        solo
        label="Element Price"
        prefix="$"
        @keyup.enter="confirmAction"
      ></VTextField>
    </div>
    <div class="my-1 p-2">
        <VSelect
            v-model="element.photo.type"
            :items="items"
            label="Element Type"
            solo
        ></VSelect>
    </div>
    <div class="my-4 block p-2">
        <template v-if="element.photo.type === 'image'">
            <label class="my-8 block">
                <div class="mx-auto my-9 flex items-center justify-center">
                    <Croppa
                        v-model="elementCroppa"
                        :quality="2"
                        accept=".png, .webp, .jpeg, .jpg"
                        :image-border-radius="60"
                        :zoom-speed="3"
                        :placeholder-font-size="10"
                        :prevent-white-space="true"
                        initial-size="contain"
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
                        :src="thumbnail"
                    ></VImg>
                </div>
            </div>
        </template>
        <template v-if="element.photo.type === 'colour'">
            <span>Work in progress.</span>
        </template>
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
import 'remixicon/fonts/remixicon.css';

export default {
  name: 'AddElementModal',
  props: {
    active: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      element: {
        name: '',
        price: 0,
        photo: {
          type: '',
          value: '',
          imgValue: []
        },
      },
      elementCroppa: {},
      items: [
        'image',
        'colour'
      ],
      thumbnail: ''
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    confirmAction() {
      this.$emit('confirm', this.element)
      this.closeDialog()
    },
    generateElementImage() {
      this.elementCroppa.generateBlob(
        (blob) => {
          this.element.photo.imgValue.push(blob)
          this.thumbnail = URL.createObjectURL(blob)
        }
      )
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
  }
}
</script>