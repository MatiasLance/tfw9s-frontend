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
        class="editor-content"
      />
    </div>
  </div> </template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
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
        TextAlign.configure({
          types: [ 'heading', 'paragraph' ],
          alignments: [
            'left', 'center', 'right', 'justify'
          ],
        }),
        Underline,
        Link,
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      }
    })
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy()
    }
  },
}
</script>

<style>
.ProseMirror {
  outline: none;
  min-height: 500px;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3,
.ProseMirror p {
  font-size: revert !important;
}

.ProseMirror ul,
.ProseMirror ol {
  list-style: revert !important;
  margin: 0 !important;
  padding-left: 20px !important;
}

.editor-content a {
  color: blue !important;
  text-decoration: underline;
}

</style>
