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
      <ToolbarButton @click="strikethrough">
        <i class="ri-strikethrough"></i>
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

    <span class="flex items-center justify-center">
      <ToolbarButton @click="insertLink">
        <i class="ri-link"></i>
      </ToolbarButton>
      <ToolbarButton @click="unlink">
        <i class="ri-link-unlink"></i>
      </ToolbarButton>
    </span>

    <span class="flex items-center justify-center">
      <ToolbarButton @click="unorderedList">
        <i class="ri-list-unordered"></i>
      </ToolbarButton>
      <ToolbarButton @click="orderedList">
        <i class="ri-list-ordered"></i>
      </ToolbarButton>
    </span>

    <span class="flex items-center justify-center">
      <ToolbarButton @click="paragraph">
        <i class="ri-paragraph"></i>
      </ToolbarButton>
      <ToolbarButton @click="heading1">
      <i class="ri-h-1"></i>
      </ToolbarButton>
      <ToolbarButton @click="heading2">
      <i class="ri-h-2"></i>
      </ToolbarButton>
      <ToolbarButton @click="heading3">
      <i class="ri-h-3"></i>
      </ToolbarButton>
    </span>

    <span class="flex items-center justify-center">
      <ToolbarButton @click="alignLeft">
        <i class="ri-align-left"></i>
      </ToolbarButton>
      <ToolbarButton @click="alignCenter">
        <i class="ri-align-center"></i>
      </ToolbarButton>
      <ToolbarButton @click="alignRight">
        <i class="ri-align-right"></i>
      </ToolbarButton>
      <ToolbarButton @click="alignJustify">
        <i class="ri-align-justify"></i>
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
    strikethrough() {
      this.editor
        .chain()
        .focus()
        .toggleStrike()
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
    insertLink() {
      const url = prompt('Enter the URL:')
      if (url) {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run()
      }
    },
    unlink() {
      this.editor
        .chain()
        .focus()
        .unsetLink()
        .run()
    },
    unorderedList() {
      this.editor
        .chain()
        .focus()
        .toggleBulletList()
        .run()
    },
    orderedList() {
      this.editor
        .chain()
        .focus()
        .toggleOrderedList()
        .run()
    },
    paragraph() {
      this.editor
        .chain()
        .focus()
        .setParagraph()
        .run()
    },
    heading1() {
      this.editor
        .chain()
        .focus()
        .toggleHeading({ level: 1 })
        .run()
    },
    heading2() {
      this.editor
        .chain()
        .focus()
        .toggleHeading({ level: 2 })
        .run()
    },
    heading3() {
      this.editor
        .chain()
        .focus()
        .toggleHeading({ level: 3 })
        .run()
    },
    alignLeft() {
      this.editor
        .chain()
        .focus()
        .setTextAlign('left')
        .run()
    },
    alignCenter() {
      this.editor
        .chain()
        .focus()
        .setTextAlign('center')
        .run()
    },
    alignRight() {
      this.editor
        .chain()
        .focus()
        .setTextAlign('right')
        .run()
    },
    alignJustify() {
      this.editor
        .chain()
        .focus()
        .setTextAlign('justify')
        .run()
    },
  },
}
</script>

