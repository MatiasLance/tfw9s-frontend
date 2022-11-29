<template>
   <OModal :active="active" @close="closeDialog">
    <div class="w-[440px] rounded bg-white">
        <div class="p-5">
            <span class="text-xl font-bold">
                Assign Colour {{ elementKey }}
            </span>
        </div>
        <hr>
            <div class="mx-auto my-4 flex items-center justify-center">
                <ChromePicker v-model="colors" :color="colors" />
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
    confirmAction() {
      this.$emit('confirm', this.colorValue)
      this.closeDialog()
    },
    setColour() {
      this.colorValue = this.colors.hex
    }
  }
}
</script>