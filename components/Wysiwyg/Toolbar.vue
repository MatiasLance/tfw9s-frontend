<template>
  <div
    class="
      flex flex-wrap
      items-center justify-start
      gap-2
      border-b border-solid border-gray-300
      bg-gray-200
      p-2
    "
  >

    <span class="flex items-center justify-center">
      <ToolbarButton @click="undo">
        <i class="ri-arrow-go-back-line"></i>
      </ToolbarButton>
      <ToolbarButton @click="redo">
        <i class="ri-arrow-go-forward-line"></i>
      </ToolbarButton>
    </span>

    <span class="flex items-center justify-center">
      <ToolbarButton @click="bold">
        <i class="ri-bold"></i>
      </ToolbarButton>
      <ToolbarButton @click="italic">
        <i class="ri-italic"></i>
      </ToolbarButton>
      <ToolbarButton @click="underline">
        <i class="ri-underline"></i>
      </ToolbarButton>
    </span>

    <span class="flex items-center justify-center">
      <ToolbarButton @click="horizontalRule">
        hr
      </ToolbarButton>
      <ToolbarButton @click="hardBreak">
        br
      </ToolbarButton>
    </span>
  </div>
</template>

<script>

import ToolbarButton from '~/components/Wysiwyg/ToolbarButton'

export default {
  components: { ToolbarButton },
  props: {
    editor: {
      type: [ Object, null ],
      required: true,
    },
  },
  methods: {
    undo() {
      this.editor
        .chain()
        .focus()
        .undo()
        .run()
    },
    redo() {
      this.editor
        .chain()
        .focus()
        .redo()
        .run()
    },
    bold() {
      this.editor
        .chain()
        .focus()
        .toggleBold()
        .run()
    },
    italic() {
      this.editor
        .chain()
        .focus()
        .toggleItalic()
        .run()
    },
    underline() {
      this.editor
        .chain()
        .focus()
        .toggleUnderline()
        .run()
    },
    unordered() {
      this.editor
        .chain()
        .focus()
        .toggleBulletList()
        .run()
    },
    ordered() {
      this.editor
        .chain()
        .focus()
        .toggleOrderedList()
        .run()
    },
    horizontalRule() {
      this.editor
        .chain()
        .focus()
        .setHorizontalRule()
        .run()
    },
    hardBreak() {
      this.editor
        .chain()
        .focus()
        .setHardBreak()
        .run()
    },
  },
}
</script>