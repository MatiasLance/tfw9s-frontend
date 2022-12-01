<template>
    <figure
        class="relative
        rounded-md bg-gray-100 p-4 sm:col-span-2 md:col-span-1"
    >
        <div class="flex w-full justify-between">
            <label
                for="size"
                class="mb-2 block text-xl font-semibold"
            >
                {{ name }}
            </label>
            <VBtn plain elevation="2" small @click="addElementOpt">
                <i class="ri-add-fill mr-2"></i>
                Add Element
            </VBtn>
        </div>
        <div class="grid w-full grid-cols-2 gap-2">
            <!-- todo: change elementKey to element.id -->
            <SingleElement
                v-for="(element, elementKey) in elements"
                :key="elementKey"
                :eid="elementKey"
                :variant-name="name"
                :name="element.name"
                :price="element.price"
                :stock="element.stock"
                :photo="element.photo"
                @assign-image="assignImage"
                @assign-colour="assignColour"
            />
        </div>
    </figure>
</template>

<script>
import SingleElement from './SingleElement.vue'
const toNumber = (str) => +str;
export default {
  name: 'SingleVariant',
  components: { SingleElement },
  props: {
    name: {
      type: String,
      required: true
    },
    elements: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      editableVariant: '',
      selectedElement: -1
    }
  },
  methods: {
    assignImage(elementId) {
      this.selectedElement = toNumber(elementId)
      this.$emit('assign-image', this.selectedElement)
    },
    assignColour(elementId) {
      this.selectedElement = toNumber(elementId)
      this.$emit('assign-colour', this.selectedElement)
    },
    addElementOpt() {
      this.$emit('show-element-dialog', true)
    }
  }
}
</script>