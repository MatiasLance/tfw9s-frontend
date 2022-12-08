<template>
    <OModal :active="active" @close="closeDialog">
        <div class="w-[440px] rounded bg-white">
        <div class="p-5">
            <span class="text-xl font-bold">
             Edit Element {{ elementKey }}
            </span>
        </div>
        <hr>
        <div class="my-1 block p-2">
            <label>Element Name:</label>
            <VTextField
                v-model="elementName"
                solo
                label="Element Name"
            ></VTextField>
        </div>
        <div class="my-1 p-2">
            <label>Element Type:</label>
            <select
                v-model="thumbnailType"
                class="block w-full appearance-none rounded-md
                border border-gray-200
                bg-gray-100 py-2 px-4 text-lg
                hover:border-gray-400 focus:border-gray-400
                focus:outline-none"
            >
                <option v-for="item in items" :key="item">
                    {{ item }}
                </option>
            </select>
        </div>
        <div class="my-4 block p-2">
            <template v-if="thumbnailType === 'image'">
                <label class="my-8 block">
                    <!-- todo: insert croppa here -->
                    <VImg
                        :src="thumbnail"
                    ></VImg>
                </label>
            </template>
            <template v-if="thumbnailType === 'color'">
                <div
                class="mx-auto my-4 flex flex-col items-center justify-center"
                >
                <VSheet
                rounded="circle"
                class="mx-auto"
                height="100"
                width="100"
                :color="thumbnail"
                ></VSheet>
            <small class="text-xs">Selected: {{ thumbnail }}</small>
            <ChromePicker v-model="colors" :color="colors" />
            <VBtn class="my-3 uppercase" @click="setColour">
                Set Colour
            </VBtn>
                </div>
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
export default {
  name: 'UpdateElementModal',
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
      elementName: '',
      thumbnailType: '',
      thumbnail: '',
      imgValue: '',
      elementCroppa: {},
      items: [
        'Select one',
        'image',
        'color'
      ],
      colors: {
        hex: '#194d33',
        hex8: '#194D33A8',
        hsl: {
          h: 150, s: 0.5, l: 0.2, a: 1
        },
        hsv: {
          h: 150, s: 0.66, v: 0.30, a: 1
        },
        rgba: {
          r: 25, g: 77, b: 51, a: 1
        },
        a: 1
      },
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
          console.log(response)
          this.elementName = response.data.element.name
          this.thumbnail = response.data.element.thumbnail.value
          this.thumbnailType = response.data.element.thumbnail.type
        })
        .catch((err) => {
          console.log(err)
        })
    },
    setColour() {
      this.thumbnail = this.colors.hex
    },
    clearValues() {
      this.elementName = ''
      this.thumbnail = ''
      this.thumbnailType = ''
    },
    confirmAction() {
      const editedElement = {
        id: this.elementKey,
        name: this.elementName,
        thumbnail: this.thumbnail,
        thumbnailType: this.thumbnailType
      }
      this.$emit('confirm', editedElement)
      this.closeDialog()
      this.clearValues()
    },
  }
}
</script>