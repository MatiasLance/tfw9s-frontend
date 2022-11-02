<template>
  <OModal :active="active" @close="closeDialog">
    <div class="w-[440px] rounded bg-white">
      <div class="p-4">
        <span class="text-xl">
          Place this above/beneath
        </span>
      </div>
      <hr>
      <div class="p-2">
        <InfiniteCategories
          ref="moveCategoryPicker"
          :options="moveCandidates"
        />
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
            text-swd-blue
            hover:bg-swd-blue
            hover:text-white
          "
          @click="confirmAction"
        >
          Move
        </button>
      </div>
    </div>
  </OModal>
</template>

<script>
import InfiniteCategories from '~/components/InfiniteCategories'
import categoryList from '~/mixins/shop/categories'

export default {
  components: { InfiniteCategories },
  mixins: [ categoryList ],
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    moveCandidates: {
      get() {
        const candidates = JSON.parse(JSON.stringify(this.categories))
        candidates.unshift({
          id: -1,
          name: '[None]',
          children: [],
        })
        return candidates
      },
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    confirmAction() {
      const selected = this.$refs.moveCategoryPicker.getSelected()
      this.$emit('confirm', selected)
    },
  },
}
</script>