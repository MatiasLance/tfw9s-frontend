<template>
     <!-- variant -->
     <div class="col-span-3 mb-4 w-full">
        <div class="my-4 flex justify-between">
            <label for="variants" class="mb-2 block">
                Variants:
            </label>
            <button
            type="button"
            class="
                flex
                items-center
                justify-center
                border border-solid border-brand-slate
                px-4
                py-2
                text-slate-600
                hover:bg-gray-100
            "
            @click="addVariantOpt"
            >
            <i class="ri-add-fill"></i>
            Add Variant
            </button>
        </div>
        <AddVariantModal
            :active="showAddVariant"
            @close="closeAddVariantDialog"
            @confirm="createVariant"
        />
        <AddElementModal
          :active="showAddElement"
          @close="closeAddElementDialog"
          @confirm="createElement"
        />
        <!-- show variants -->
        <div class="mb-5 gap-4 sm:grid sm:grid-cols-2">
            <figure
            v-for="variant in options"
            :key="variant.id"
            class="relative
            rounded-md bg-gray-100 p-4 sm:col-span-2 md:col-span-1"
            >
                <div class="flex w-full justify-between">
                    <label for="size" class="mb-2 block text-xl font-semibold">
                        {{ variant.name }}
                    </label>
                    <VBtn plain elevation="2" small @click="addElementOpt">
                        <i class="ri-add-fill mr-2"></i>
                        Add Element
                    </VBtn>
                </div>
                <div class="grid w-full grid-cols-2 gap-2">
                    <label
                    v-for="(element, elementKey) in variant.elements"
                    :key="elementKey"
                    class="
                    col-span-2
                    flex w-full cursor-pointer
                    flex-wrap border
                    border-gray-200
                    bg-transparent p-3
                    hover:border-brand-slate
                    hover:bg-slate-100
                    "
                    >
                    <input
                        :name="variant.name"
                        :value="element.name"
                        type="checkbox"
                        class="
                        mt-1 mr-3 h-4 w-4 bg-gray-200 text-brand-black
                        focus:ring-brand-black"
                    />
                    <figcaption class="text-gray-600">
                        <span class="my-0 mx-2">
                            {{ element.name }}
                        </span>
                        <span>
                        - {{ formatCurrency(element.price) }}
                        </span>
                        <span>
                            <VTextField
                                v-model="element.price"
                                solo
                                prefix="$"
                                class="w-1/2"
                            >
                            </VTextField>
                        </span>
                    </figcaption>
                    <div class="ml-11 flex items-end justify-end">
                        <!-- todo: showAssignImage and showAssignColour -->
                        <VBtn
                            class="self-end text-right text-base"
                            @click="assignImage(elementKey)"
                        >
                        <i class="ri-image-add-fill"></i>
                        </VBtn>
                        <VBtn
                            class="self-end text-right text-base"
                            @click="assignColour(elementKey)"
                        >
                        <i class="ri-sip-line"></i>
                        </VBtn>
                    </div>
                    </label>
                </div>
            </figure>
        </div>
    </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import AddElementModal from './AddElementModal.vue';
import currencyMixin from '@/mixins/currency';

export default {
  name: 'VariantSection',
  components: { AddElementModal },
  mixins: [ currencyMixin ],
  props: {
    options: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      showAddVariant: false,
      showAddElement: false,
      variantsList: [],
      variantSize: ''
    }
  },
  computed: {
    variants: {
      get() {
        return this.$store.state.product.variants;
      },
      set(value) {
        this.$store.commit('product/setVariants', value)
      }
    },
    elements: {
      get(id) {
        return this.$store.state.product.variants[id].elements
      },
      set(value) {
        this.$store.commit('product/setElements', value)
      }
    }
  },
  mounted() {
    this.retrieveVariants()
  },
  methods: {
    retrieveVariants() {
      this.variantsList = this.$store.state.product.variants
    },
    createVariant(variantName) {
      console.log(variantName)
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Work in progress',
        position: 'bottom',
        variant: 'warning',
        queue: true,
      });
    },
    createElement(element) {
      console.log(element)
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Work in progress',
        position: 'bottom',
        variant: 'warning',
        queue: true,
      });
    },
    closeAddVariantDialog() {
      this.showAddVariant = false
    },
    closeAddElementDialog() {
      this.showAddElement = false
    },
    addVariantOpt() {
      this.showAddVariant = true
    },
    addElementOpt() {
      this.showAddElement = true
    },
    assignImage(elementId) {
      console.log(`Assigning image to Element# ${elementId}`)
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Work in progress',
        position: 'bottom',
        variant: 'warning',
        queue: true
      })
    },
    assignColour(elementId) {
      console.log(`Assigning colour to Element# ${elementId}`)
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Work in progress',
        position: 'bottom',
        variant: 'warning',
        queue: true
      })
    }
  }
}
</script>