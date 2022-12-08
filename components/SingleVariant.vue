<template>
    <figure
        class="relative
        my-9 rounded-md bg-gray-100 p-4 sm:col-span-2 md:col-span-1"
    >
        <div class="flex w-full justify-between">
            <label
                for="size"
                class="mb-2 block text-xl font-semibold"
            >
                {{ name }}
            </label>
            <div
              class="flex flex-col justify-end space-y-4
              lg:flex-row lg:space-y-0"
            >
              <VBtn plain elevation="2" x-small @click="editVariantOpt">
                  <i class="ri-pencil-fill mr-2"></i>
              </VBtn>
              <VBtn plain elevation="2" x-small @click="deleteVariantOpt">
                  <i class="ri-delete-bin-2-fill mr-2"></i>
              </VBtn>
              <VBtn plain elevation="2" x-small @click="addElementOpt">
                  <i class="ri-add-fill mr-2"></i>
                  Add Element
              </VBtn>
            </div>
        </div>
        <div class="grid w-full grid-cols-2 gap-2">
            <SingleElementEdit
                v-for="element in elements"
                :key="element.id"
                :eid="element.id"
                :variant-name="name"
                :name="element.name"
                :price="element.price"
                :stock="element.stock"
                :photo="element.thumbnail"
                :photo-type="element.thumbnail.type"
                @assign-image="assignImage"
                @assign-colour="assignColour"
                @remove-element="removeElement"
                @edit-element="editElement"
            />
        </div>
        <EditVariantModal
         :active="showEditVariant"
         :uid="uid"
         @close="closeEditVariantDialog"
         @confirm="updateVariant"
        />
        <div class="z-auto overflow-hidden">
          <AddElementModal
            :active="showAddElement"
            :uid="uid"
            @close="closeAddElementDialog"
            @confirm="createElement"
          />
        </div>
        <div>
      <OModal
        :active="showDeleteVariant"
        @close="closeDeleteVariantDialog"
      >
        <div class="w-full rounded bg-white sm:w-[440px]">
          <div class="p-4">
            <div class="text-lg leading-tight">
              Are you sure you want to delete this variant #{{uid}} ?
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
              @click="closeDeleteVariantDialog"
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
              @click="removeVariant(uid)"
            >
              Delete
            </button>
          </div>
        </div>
      </OModal>
    </div>
    </figure>
</template>

<script>
import EditVariantModal from './EditVariantModal.vue';
import SingleElementEdit from './SingleElementEdit.vue';
const toNumber = (str) => +str;
export default {
  name: 'SingleVariant',
  components: { SingleElementEdit, EditVariantModal },
  props: {
    uid: {
      type: Number,
      required: true,
    },
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
      selectedElement: -1,
      newVariantName: '',
      showAddElement: false,
      showEditVariant: false,
      showDeleteVariant: false,
      showDeleteVariantDialog: false
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
    editElement(elementId) {
      this.selectedElement = toNumber(elementId)
      this.$emit('update-element', this.selectedElement)
    },
    createElement(element) {
      console.log(element)
      const form = new FormData()
      form.append('name', element.name)
      form.append('thumbnail_type', element.thumbnailType)
      form.append('thumbnail', element.thumbnail)
      form.append('order', element.order)

      const config = { headers: { 'Content-Type': 'multipart/form-data' } }

      this.$axios
        .$post(`v1/variants/${element.variantId}`, form, config)
        .then((response) => {
          this.$oruga.notification.open({
            message: response.title,
            variant: 'success',
            duration: 5000,
            position: 'bottom',
            queue: true
          })
          this.$emit('retrieve')
        })
      this.$oruga.notification.open({
        duration: 3000,
        message: 'Creating element...',
        position: 'bottom',
        variant: 'warning',
        queue: true,
      });
    },
    removeElement(elementId) {
      this.$emit('remove-element', elementId)
    },
    addElementOpt() {
      this.showAddElement = true
    },
    deleteVariantOpt() {
      this.showDeleteVariant = true
    },
    editVariantOpt() {
      this.showEditVariant = true
    },
    closeAddElementDialog() {
      this.showAddElement = false
    },
    closeEditVariantDialog() {
      this.showEditVariant = false
    },
    closeDeleteVariantDialog() {
      this.showDeleteVariant = false
    },
    updateVariant(editedVariant) {
      this.$emit('edit-variant', editedVariant)
    },
    removeVariant(variantId) {
      this.$emit('delete-variant', toNumber(variantId))
    }
  }
}
</script>