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
    return { elementName: '' }
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
        })
        .catch((err) => {
          console.log(err)
        })
    },
    confirmAction() {
      const editedElement = {
        id: this.elementKey,
        name: this.elementName
      }
      this.$emit('confirm', editedElement)
      this.closeDialog()
      this.elementName = ''
    },
  }
}
</script>