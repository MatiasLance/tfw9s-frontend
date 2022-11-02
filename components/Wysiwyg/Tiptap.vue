<template>
  <div
    v-if="editor != null"
    class="
      border
      border-gray-300
    "
  >
    <Toolbar :editor="editor" />
    <hr>
    <div class="p-2">
      <EditorContent
        :editor="editor"
      />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Toolbar from '~/components/Wysiwyg/Toolbar'

export default {
  components: {
    EditorContent,
    Toolbar,
  },
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return { editor: null }
  },
  watch: {
    value(value) {
      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },
  mounted() {
    const defaultValue = this.value === '' ? '<p></p>' : this.value

    this.editor = new Editor({
      content: defaultValue,
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [
              1,
              2,
              3,
            ]
          }
        }),
        Underline
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      }
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style>
.ProseMirror {
  outline: none;
  min-height: 200px;
}
</style>