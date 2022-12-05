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
          <SingleVariant
            v-for="variant in options"
            :key="variant.id"
            :uid="variant.id"
            :name="variant.name"
            :elements="variant.elements"
            @assign-image="assignImage"
            @assign-colour="assignColour"
            @show-element-dialog="addElementOpt"
            @edit-variant="updateVariant"
            @delete-variant="removeVariant"
          />
        </div>
        <!-- todo: showAssignImage and showAssignColour -->
        <AssignImageModal
          :active="showAssignImage"
          :element-key="selectedElement"
          @close="closeAssignImageDialog"
          @confirm="createImageToElement"
        />
        <AssignColourModal
          :active="showAssignColour"
          :element-key="selectedElement"
          @close="closeAssignColourDialog"
          @confirm="createColourToElement"
        />
    </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import AddElementModal from './AddElementModal.vue';
import AssignImageModal from './AssignImageModal.vue';
import AssignColourModal from './AssignColourModal.vue';
import SingleVariant from './SingleVariant.vue';
import currencyMixin from '@/mixins/currency';

const toNumber = (str) => +str;
export default {
  name: 'VariantSection',
  components: {
    AddElementModal,
    AssignImageModal,
    AssignColourModal,
    SingleVariant,
  },
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
      showAssignImage: false,
      showAssignColour: false,
      variantsList: [],
      variantSize: '',
      selectedElement: -1,
      selectedVariantId: -1,
    }
  },
  computed: {
    elements: {
      get(id) {
        return this.$store.state.product.variants[id].elements
      },
      set(value) {
        this.$store.commit('product/setElements', value)
      }
    }
  },
  methods: {
    retrieveVariants() {
      this.variantsList = this.$store.state.product.variants
    },
    createVariant(variantName) {
      const form = new FormData();
      form.append('name', variantName);

      this.$axios
        .$post('v1/variants/', form)
        .then((response) => {
          this.$oruga.notification.open({
            message: response.title,
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
          this.$emit('retrieve')
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.title,
            position: 'bottom',
            variant: 'danger',
            closable: true,
            queue: true,
          });
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
    createImageToElement(imgValue) {
      console.log(imgValue)
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Work in progress',
        position: 'bottom',
        variant: 'warning',
        queue: true,
      });
    },
    createColourToElement(colourValue) {
      console.log(colourValue)
      this.$oruga.notification.open({
        duration: 5000,
        message: 'Work in progress',
        position: 'bottom',
        variant: 'warning',
        queue: true
      })
    },
    closeAddVariantDialog() {
      this.showAddVariant = false
    },
    closeAddElementDialog() {
      this.showAddElement = false
    },
    closeAssignImageDialog() {
      this.showAssignImage = false
    },
    closeAssignColourDialog() {
      this.showAssignColour = false
    },
    addVariantOpt() {
      this.showAddVariant = true
    },
    addElementOpt() {
      this.showAddElement = true
    },
    assignImage(elementId) {
      this.selectedElement = toNumber(elementId)
      console.log(`Assigning image to Element# ${this.selectedElement}`)
      this.showAssignImage = true
    },
    assignColour(elementId) {
      this.selectedElement = toNumber(elementId)
      console.log(`Assigning colour to Element# ${this.selectedElement}`)
      this.showAssignColour = true
    },
    updateVariant(editedVariant) {
      console.log(editedVariant)
      const form = new FormData()
      form.append('_method', 'PATCH')
      form.append('name', editedVariant.name)
      form.append('id', editedVariant.id)

      this.$axios
        .$post(`v1/variants/${editedVariant.id}`, form)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: response.title,
            position: 'bottom',
            variant: 'success',
            queue: true
          })
          this.$emit('retrieve')
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.title,
            position: 'bottom',
            variant: 'danger',
            closable: true,
            queue: true,
          });
        });
    },
    removeVariant(index) {
      console.log(index)
      this.$axios
        .$delete(`v1/variants/${index}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: response.title,
            position: 'bottom',
            variant: 'success',
            queue: true
          });
          this.$emit('retrieve')
        })
        .catch((err) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: err.title,
            position: 'bottom',
            variant: 'danger',
            closable: true,
            queue: true,
          });
        });
    }
  }
}
</script>