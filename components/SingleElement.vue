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
                    :name="variantName"
                    :value="eid"
                    type="checkbox"
                    class="
                    mt-1 mr-3 mb-2 h-4 w-4 bg-gray-200
                    text-brand-black focus:ring-brand-black"
                />
                <figcaption class="text-gray-600">
                    <span class="my-0 mx-2">
                        {{ name }}
                    </span>
                    <span>
                    - {{ formatCurrency(price) }}
                    </span>
                    <span>
                    - {{ stock }} in stock
                    </span>
                </figcaption>
                <div class="ml-11 flex flex-col items-center justify-center">
                    <div
                        class="flex items-center justify-center"
                    >
                    <template v-if="photoType === 'image'">
                        <!-- todo: change this to photo.value -->
                        <div
                        class="mx-auto my-4 flex items-end justify-end"
                        >
                          <VImg
                          :width="100"
                          :height="100"
                          class="rounded-circle"
                          :src="photo.value"
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
                  v-if="showButtons"
                  class="flex items-center justify-start space-x-6"
                >
                    <VBtn
                        class="self-end text-right text-base"
                        @click="assignImage(eid)"
                    >
                    <i class="ri-image-add-fill"></i>
                    </VBtn>
                    <VBtn
                        class="self-end text-right text-base"
                        @click="assignColour(eid)"
                    >
                    <i class="ri-sip-line"></i>
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
  showButtons: false,
  props: {
    eid: {
      type: Number,
      required: true
    },
    variantName: {
      type: String,
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
      editablePhoto: '',
      editableColour: '',
      editablePrice: 0,
      selectedElement: -1,
      showAssignImage: false,
      showAssignColour: false,
      demoImgPath: '/img/sample/colour/stripes3.png'
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
    }
  }
}
</script>