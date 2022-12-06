<template>
   <OModal :active="active" @close="closeDialog">
    <div class="w-[440px] rounded bg-white">
        <div class="p-5">
            <span class="text-xl font-bold">
                Assign Colour for {{ elementName }}
            </span>
        </div>
        <hr>
            <div
            :id="elementKey"
            class="mx-auto my-4 flex flex-col items-center justify-center"
            >
                <VSheet
                v-if="thumbnailType === 'color'"
                rounded="circle"
                class="mx-auto my-3"
                height="100"
                width="100"
                :color="thumbnail"
                ></VSheet>
                <VSheet
                v-if="thumbnailType === 'image'"
                rounded="circle"
                class="mx-auto my-3"
                height="100"
                width="100"
                :color="colorValue"
                ></VSheet>
                <ChromePicker v-model="colors" :color="colors" />
                <VBtn class="my-3 uppercase" @click="setColour">
                    Set Colour
                </VBtn>
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
  name: 'AssignColourModal',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    elementKey: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      colorValue: '',
      thumbnail: '',
      elementName: '',
      thumbnailType: 'color',
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
          this.elementName = response.data.element.name
          this.thumbnail = response.data.element.thumbnail.value
          this.thumbnailType = response.data.element.thumbnail_type
        })
        .catch((err) => {
          console.log(err)
        })
    },
    confirmAction() {
      this.thumbnailType = 'color'
      const editedElement = {
        id: this.elementKey,
        name: this.elementName,
        thumbnail: this.thumbnail,
        thumbnailType: this.thumbnailType
      }
      this.$emit('confirm', editedElement)
      this.closeDialog()
    },
    setColour() {
      this.colorValue = this.colors.hex
      this.thumbnail = this.colorValue
    }
  }
}
</script>