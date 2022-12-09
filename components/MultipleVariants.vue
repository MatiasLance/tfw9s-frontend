<template>
    <div class="grow">
        <select
          v-model="selectedVariant"
          class="my-2 block w-full border
          border-gray-300 bg-gray-200 py-2 px-3 text-base"
          @change="addToSelectedVariants"
        >
          <option
            v-for="variant in options"
            :key="variant.id"
            :value="variant.id"
            aria-placeholder="Select Variant"
            selected
          >
            {{ variant.name }}
          </option>
        </select>
        <div
            v-if="selectedVariant !== null"
            class="col-span-3 my-4 w-full"
        >
            <div class="grid grid-cols-6 gap-2">
            <SingleElement
                v-for="element in
                options[selectedVariant-1].elements"
                :key="element.id"
                :ref="`singleElement-${element.id}`"
                :eid="element.id"
                :name="element.name"
                :price="element.price"
                :stock="element.stock"
                :photo="element.thumbnail"
                :photo-type="element.thumbnail.type"
                @checked="recordElementID"
                @unchecked="removeElementID"
                @edit-element="editElement"
            />
            </div>
        </div>
    </div>
</template>

<script>
const toNumber = (str) => +str;
export default {
  name: 'MultipleVariants',
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedVariant: null,
      selectedVariants: [],
      selectedElements: [],
      checkedElementIds: []
    }
  },
  methods: {
    getSelected() {
      return this.selectedVariant
    },
    getSelectedElements() {
      this.checkedElementIds.forEach((elementId) => {
        const elementData =
            this.$refs[`singleElement-${elementId}`][0].retrieveElement()
        this.selectedElements.push(elementData)
      })
      return this.selectedElements
    },
    editElement(elementId) {
      this.selectedElement = toNumber(elementId)
      this.$emit('update-element', this.selectedElement)
    },
    testElements() {
      this.selectedElements = []
      this.getSelectedElements()
    },
    addToSelectedVariants() {
      this.reset()
      this.$emit('variant-selected', this.selectedVariant)
    },
    recordElementID(elementId) {
      this.checkedElementIds.push(elementId)
    },
    removeElementID(elementId) {
      const index = this.checkedElementIds.indexOf(elementId)
      this.checkedElementIds.splice(index, 1)
    },
    reset() {
      this.checkedElementIds = []
      this.selectedElements = []
    }
  }
}
</script>