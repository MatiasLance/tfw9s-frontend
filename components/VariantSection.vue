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
        <!-- todo: showAddVariant modal wip -->
        <!-- show variants -->
        <div class="mb-5 gap-4 sm:flex">
            <figure
            v-for="variant in variants"
            :key="variant.name"
            class="relative flex flex-col items-start rounded-md
            bg-gray-100 p-4 md:w-1/2"
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
                        v-model="element.isTicked"
                        :name="variant.name"
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
                                :disabled="!element.isTicked"
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
import currencyMixin from '@/mixins/currency';

export default {
  name: 'VariantSection',
  mixins: [ currencyMixin ],
  data() {
    return {
      variantsNew: [],
      variants: [
        {
          name: 'Size',
          elements: [
            {
              name: 'Small',
              photo: null,
              price: 0,
              isTicked: true
            },
            {
              name: 'Medium',
              photo: null,
              price: 0,
              isTicked: true
            },
            {
              name: 'Large',
              photo: null,
              price: 0,
              isTicked: false
            },
            {
              name: 'XLarge',
              photo: null,
              price: 0,
              isTicked: true
            },
            {
              name: 'XXLarge',
              photo: null,
              price: 0,
              isTicked: false
            }
          ]
        },
        {
          name: 'Color',
          elements: [
            {
              name: 'Black',
              photo: {
                type: 'color',
                value: '#000'
              },
              price: 0,
              isTicked: true
            },
            {
              name: 'Red White w/ Stripes',
              photo: {
                type: 'image',
                value: null
              },
              price: 0,
              isTicked: true
            },
            {
              name: 'Blue',
              photo: {
                type: 'image',
                value: null
              },
              price: 0,
              isTicked: true
            },
            {
              name: 'Green',
              photo: {
                type: 'color',
                value: '#319b5a'
              },
              price: 0,
              isTicked: false
            },
            {
              name: 'Brown',
              photo: {
                type: 'color',
                value: '#b4844b'
              },
              price: 0,
              isTicked: false
            }
          ]
        }
      ],
      variantSize: ''
    }
  },
  methods: {
    addVariantOpt() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Work in progress',
        position: 'bottom',
        variant: 'warning',
        queue: true,
      });
    },
    addElementOpt() {
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Work in progress',
        position: 'bottom',
        variant: 'warning',
        queue: true
      });
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