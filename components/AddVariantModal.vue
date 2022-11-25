<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-[440px] rounded bg-white">
      <div class="p-4">
        <span class="text-xl">
          Add Variant
        </span>
      </div>
      <hr>
      <div class="p-2">
        <VTextField
          v-model="variantName"
          solo
          label="Variant Name"
          @keyup.enter="confirmAction"
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
  name: 'AddVariantModal',
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return { variantName: '' }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    confirmAction() {
      this.$emit('confirm', this.variantName)
      this.closeDialog()
    },
  },
}
</script>