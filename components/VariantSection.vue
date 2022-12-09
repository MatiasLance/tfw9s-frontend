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
            @edit-variant="updateVariant"
            @delete-variant="removeVariant"
            @retrieve="retrieveVariants"
            @remove-element="removeElement"
            @update-element="updateElement"
          />
        </div>
        <AssignImageModal
          ref="assignImg"
          :active="showAssignImage"
          :element-key="selectedElement"
          @close="closeAssignImageDialog"
          @confirm="createImageToElement"
        />
        <AssignColourModal
          ref="assignCol"
          :active="showAssignColour"
          :element-key="selectedElement"
          @close="closeAssignColourDialog"
          @confirm="createColourToElement"
        />
        <UpdateElementModal
          ref="updateEleme"
          :active="showEditElement"
          :element-key="selectedElement"
          @close="closeEditElementDialog"
          @confirm="updateElementProceed"
          @retrieve="retrieveVariants"
        />
        <OModal
          :active="showRemoveElement"
          :element-key="selectedElement"
          @close="closeRemoveElementDialog"
        >
        <div class="w-full rounded bg-white sm:w-[440px]">
          <div class="p-4">
            <div class="text-lg leading-tight">
              Are you sure you want to delete this element ?
            </div>
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
              @click="closeRemoveElementDialog"
            >
              Cancel
            </button>
            <button
              type="button"
              class="
                rounded
                px-2
                py-1
                text-brand-black
                hover:bg-brand-black
                hover:text-white
              "
              @click="removeElementProceed(selectedElement)"
            >
              Delete
            </button>
          </div>
        </div>
      </OModal>
    </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import AssignImageModal from './AssignImageModal.vue';
import AssignColourModal from './AssignColourModal.vue';
import SingleVariant from './SingleVariant.vue';
import currencyMixin from '@/mixins/currency';

const toNumber = (str) => +str;
export default {
  name: 'VariantSection',
  components: {
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
      showRemoveElement: false,
      showEditElement: false,
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
      this.$emit('retrieve')
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
    createImageToElement(editedElement) {
      const form = new FormData()
      form.append('_method', 'PATCH')
      form.append('name', editedElement.name)
      form.append('thumbnail_type', editedElement.thumbnailType)
      form.append('thumbnail', editedElement.thumbnail)

      const config = { headers: { 'Content-Type': 'multipart/form-data' } }

      this.$axios
        .$post(`/v1/variants/elements/${editedElement.id}`, form, config)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: response.title,
            position: 'bottom',
            variant: 'success',
            queue: true
          })
          this.retrieveVariants()
        })
        .catch((err) => {
          console.log(err)
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Failed to update thumbnail',
            position: 'bottom',
            variant: 'danger',
            queue: true
          })
        })

      this.closeAssignImageDialog()
    },
    createColourToElement(editedElement) {
      const form = new FormData()
      form.append('_method', 'PATCH')
      form.append('name', editedElement.name)
      form.append('thumbnail_type', editedElement.thumbnailType)
      form.append('thumbnail', editedElement.thumbnail)

      this.$axios
        .$post(`/v1/variants/elements/${editedElement.id}`, form)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: response.title,
            position: 'bottom',
            variant: 'success',
            queue: true
          })
          this.retrieveVariants()
        })
        .catch((err) => {
          console.log(err)
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Failed to update element',
            position: 'bottom',
            variant: 'danger',
            queue: true
          })
        })
      this.closeAssignColourDialog()
    },
    removeElementProceed(elementId) {
      const id = toNumber(elementId)
      this.$axios
        .$delete(`/v1/variants/elements/${id}`)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: response.title,
            position: 'bottom',
            variant: 'info',
            queue: true
          })
          this.closeRemoveElementDialog()
          this.retrieveVariants()
        })
        .catch((err) => {
          console.log(err)
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Failed to remove element',
            position: 'bottom',
            variant: 'danger',
            queue: true
          })
        })
    },
    updateElementProceed(editedElement) {
      console.log(editedElement)
      const form = new FormData()
      form.append('_method', 'PATCH')
      form.append('name', editedElement.name)
      form.append('thumbnail_type', editedElement.thumbnailType)
      form.append('thumbnail', editedElement.thumbnail)

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      this.$axios
        .$post(`/v1/variants/elements/${editedElement.id}`, form, config)
        .then((response) => {
          this.$oruga.notification.open({
            duration: 5000,
            message: response.title,
            position: 'bottom',
            variant: 'success',
            queue: true
          })
        })
        .catch((err) => {
          console.log(err)
          this.$oruga.notification.open({
            duration: 5000,
            message: 'Failed to update element',
            position: 'bottom',
            variant: 'danger',
            queue: true
          })
        })
      this.retrieveVariants()
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
    closeRemoveElementDialog() {
      this.showRemoveElement = false
    },
    closeEditElementDialog() {
      this.showEditElement = false
    },
    addVariantOpt() {
      this.showAddVariant = true
    },
    addElementOpt() {
      this.showAddElement = true
    },
    assignImage(elementId) {
      this.selectedElement = toNumber(elementId)
      this.$refs.assignImg.retrieveElement(this.selectedElement)
      setTimeout(() => {
        this.showAssignImage = true
      }, 2000)
    },
    assignColour(elementId) {
      this.selectedElement = toNumber(elementId)
      this.$refs.assignCol.retrieveElement(this.selectedElement)
      setTimeout(() => {
        this.showAssignColour = true
      }, 2000)
    },
    removeElement(elementId) {
      this.selectedElement = toNumber(elementId)
      this.showRemoveElement = true
    },
    updateElement(elementId) {
      this.selectedElement = toNumber(elementId)
      this.$refs.updateEleme.retrieveElement(this.selectedElement)
      setTimeout(() => {
        this.showEditElement = true
      }, 2000);
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