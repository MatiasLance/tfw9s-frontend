<template>
  <label
            class="
            col-span-2
            flex w-full cursor-pointer
            flex-wrap border
            border-gray-200
            bg-transparent p-3
            hover:border-brand-slate
            hover:bg-slate-100
            "
            v-bind="$attrs"
            >
                <input
                    v-model="isSelected"
                    type="checkbox"
                    class="
                    mt-1 mr-3 mb-2 h-4 w-4 bg-gray-200
                    text-brand-black focus:ring-brand-black"
                    @click="emitCheckStatus(eid)"
                />
                <figcaption class="text-gray-600">
                    <span class="my-0 mx-2">
                        {{ name }}
                    </span>
                    <span class="block text-xs">
                    {{ formatCurrency(price) }}
                    </span>
                    <span class="block text-xs">
                      {{ stock }} in stock
                    </span>
                    <div
                      v-if="showChangesPriceStock"
                      class="my-2 block text-xs"
                    >
                      <span class="block">
                        New price: {{ formatCurrency(newPrice) }}
                      </span>
                      <span>New stock: {{ newStock }}</span>
                    </div>
                </figcaption>
                <div class="my-6 flex flex-col">
                  <VTextField
                    v-model="newPrice"
                    solo dense
                    prefix="$"
                    class="w-1/2"
                    label="Price"
                    @change="toggleChangesPriceStock"
                    >
                  </VTextField>
                  <div class="my-2 flex justify-start">
                    <input
                    v-model="newStock"
                    type="number"
                    min="0"
                    class="
                    form-input
                    block
                    w-24
                    appearance-none
                    border border-gray-100
                    bg-gray-200
                    py-2
                    px-3
                    hover:border-gray-400
                    focus:border-gray-400 focus:outline-none
                    "
                    @keyup="handleNegativeValue"
                    @blur="toggleChangesPriceStock"
                    /><small class="self-center text-xs">in Stock</small>
                  </div>
                </div>
                <div class="ml-11 flex flex-col items-center justify-center">
                    <div
                        class="flex items-center justify-center"
                    >
                    <template v-if="photoType === 'image'">
                        <div
                        class="mx-auto my-4 flex items-end justify-end"
                        >
                          <VImg
                          :width="100"
                          :height="100"
                          class="rounded-circle"
                          :src="`/storage/${photo.value}`"
                          >
                          </VImg>
                        </div>
                    </template>
                    <template v-if="photoType === 'color'">
                        <div
                        class="mx-auto my-4 flex items-end justify-end"
                        >
                            <VSheet
                                rounded="circle"
                                class="mx-auto"
                                height="100"
                                width="100"
                                :color="photo.value"
                            ></VSheet>
                        </div>
                    </template>
                </div>
                <div
                  v-if="showEditButtons"
                  class="flex items-center justify-center space-x-6"
                >
                  <VBtn
                    class="self-end text-right text-base"
                    @click="editElement(eid)"
                  >
                    <i class="ri-pencil-fill"></i>
                  </VBtn>
                </div>
            </div>
    </label>
</template>

<script>
import currencyMixin from '~/mixins/currency';
const toNumber = (str) => +str;
export default {
  name: 'SingleElement',
  mixins: [ currencyMixin ],
  props: {
    eid: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      default: 0,
      required: true
    },
    stock: {
      type: Number,
      default: 0,
      required: true
    },
    photoType: {
      type: String,
      required: true
    },
    photo: {
      type: Object,
      default() {
        return { value: '#fa0da1' }
      },
      required: true
    }
  },
  data() {
    return {
      showEditButtons: true,
      editablePhoto: '',
      editableColour: '',
      newItemThumbnailType: '',
      newItemThumbnail: '',
      newPrice: 0,
      newStock: 0,
      isSelected: false,
      selectedElementId: -1,
      showAssignImage: false,
      showAssignColour: false,
      showChangesPriceStock: false,
      demoImgPath: '/img/sample/colour/stripes3.png'
    }
  },
  methods: {
    assignImage(elementId) {
      this.selectedElementId = toNumber(elementId)
      this.$emit('assign-image', this.selectedElementId)
    },
    assignColour(elementId) {
      this.selectedElementId = toNumber(elementId)
      this.$emit('assign-colour', this.selectedElementId)
    },
    editElement(elementId) {
      this.$oruga.notification.open({
        message: 'Retrieving...',
        variant: 'info',
        duration: 3000,
        position: 'bottom',
        queue: true,
      });
      this.selectedElement = toNumber(elementId)
      this.$emit('edit-element', this.selectedElement)
    },
    handleNegativeValue() {
      if (this.newStock < 0) {
        this.newStock = 0
      }
      if (String(this.newStock).length > 12) {
        this.newStock = String(this.newStock).slice(0, 12);
      }
    },
    toggleChangesPriceStock() {
      if (this.newPrice > 0 && this.newStock > 0) {
        this.showChangesPriceStock = true
      } else {
        this.showChangesPriceStock = false
      }
    },
    emitCheckStatus(elementId) {
      if (this.isSelected) {
        this.$emit('unchecked', elementId)
      } else {
        this.$emit('checked', elementId)
      }
    },
    retrieveElement() {
      let newThumbnail
      if (typeof this.photo.value === 'string') {
        newThumbnail = ''
      } else {
        newThumbnail = this.photo.value
      }
      return {
        // eslint-disable-next-line camelcase
        element_id: this.eid,
        stock: this.newStock,
        price: this.newPrice,
        name: this.name,
        // eslint-disable-next-line camelcase
        thumbnail_type: this.photoType,
        thumbnail: newThumbnail
      }
    },
  }
}
</script>