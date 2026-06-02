<template>
  <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">


    <div class="flex items-center justify-between mb-4">
      <label class="block font-semibold text-gray-700">
        <i class="ri-palette-line mr-2 text-green-600"></i>
        Color Variants:
      </label>
      <button
        type="button"
        class="flex items-center gap-2 bg-green-600 hover:bg-green-700 
              text-gray-50 font-semibold px-4 py-2 rounded-lg 
              transition-all duration-200 transform hover:scale-105 
              shadow-md"
        @click="addColorVariant"
      >
        <span class="text-gray-50"><i class="ri-add-fill"></i> Add Color</span>
      </button>
    </div>


    <div v-if="localVariants.length === 0" 
        class="bg-gray-100 rounded-lg p-6 text-center border-2 
              border-dashed border-gray-300">
      <i class="ri-palette-line text-3xl text-gray-400 mb-2"></i>
      <p class="text-gray-600 font-medium">
        No color variants added
      </p>
      <p class="text-gray-500 text-sm mt-1">
        Add colors if this product comes in different color options
      </p>
    </div>

    <div v-else class="space-y-3 max-h-80 overflow-y-auto pr-2">
      <div
        v-for="(color, index) in localVariants"
        :key="color.id || `temp-${index}`"
        class="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6
              bg-gray-50 rounded-lg p-4 border border-gray-200 
              group hover:border-green-300 transition-colors duration-200"
      >

        <div class="flex items-center gap-3 min-w-[140px]">
          <div 
            class="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm flex-shrink-0"
            :style="{ backgroundColor: color.hexcode || '#cccccc' }"
            :title="color.name || 'Unnamed color'"
          >
            <img 
              v-if="color.image_url" 
              :src="color.use_image ? color.image_url : ''" 
              :alt="color.name || 'Color swatch'"
              class="w-full h-full rounded-full object-cover"
              @error="handleImageError(index)"
            />
          </div>
          
          <div class="flex items-center bg-white rounded-lg p-1 border border-gray-200">
            <button
              type="button"
              :class="[
                'px-2 py-1 text-xs font-medium rounded-md transition-colors',
                !color.use_image 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              ]"
              @click="setColorInputMethod(index, false)"
              title="Use hex code"
            >
              <i class="ri-hashtag"></i>
            </button>
            <button
              type="button"
              :class="[
                'px-2 py-1 text-xs font-medium rounded-md transition-colors',
                color.use_image 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              ]"
              @click="setColorInputMethod(index, true)"
              title="Upload image"
            >
              <i class="ri-image-line"></i>
            </button>
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ color.use_image ? 'Color Image' : 'Hex Code' }}
            <span class="text-xs text-gray-500">(required)</span>
          </label>
          
          <div v-if="!color.use_image" class="flex items-center gap-2">
            <input
              type="color"
              :value="color.hexcode || '#000000'"
              @input="updateHexcode(index, $event.target.value)"
              class="w-10 h-10 p-0 border-0 rounded cursor-pointer"
              title="Pick a color"
              :id="`color-picker-${index}`"
            />
            <input
              type="text"
              :value="color.hexcode || ''"
              @input="updateHexcode(index, $event.target.value)"
              placeholder="#000000"
              class="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 
                    rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 
                    focus:border-green-500 transition-all duration-200 uppercase"
              maxlength="7"
              pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
            />
          </div>
          

          <div v-else class="flex items-center gap-2">
            <label 
              :for="`color-file-${index}`"
              class="flex-1 flex items-center justify-center px-3 py-2 
                    bg-white border-2 border-dashed border-gray-300 
                    rounded-lg cursor-pointer hover:border-green-400 
                    transition-colors duration-200"
              :class="{ 'border-green-500 bg-green-50': color.image_file }"
            >
              <input
                type="file"
                accept="image/*"
                class="hidden"
                :id="`color-file-${index}`"
                @change="handleImageUpload(index, $event)"
              />
              <span v-if="!color.image_file" class="text-sm text-gray-500">
                <i class="ri-upload-2-line mr-1"></i> Upload swatch
              </span>
              <span v-else class="text-sm text-green-700 truncate">
                <i class="ri-check-line mr-1"></i> {{ color.image_file.name }}
              </span>
            </label>
            <button
              v-if="color.image_file"
              type="button"
              class="w-8 h-8 flex items-center justify-center 
                    text-gray-500 hover:text-red-600 transition-colors"
              @click="clearImage(index)"
              title="Remove image"
            >
              <i class="ri-close-line"></i>
            </button>
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Color Name
            <span class="text-xs text-gray-500">(required)</span>
          </label>
          <input
            type="text"
            v-model="color.name"
            placeholder="e.g., Forest Green"
            class="w-full px-3 py-2 bg-gray-100 border border-gray-300 
                  rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 
                  focus:border-green-500 transition-all duration-200"
            maxlength="50"
          />
        </div>

        <div class="flex items-center gap-2">
          <label class="rugby-toggle">
            <input
              type="checkbox"
              :checked="color.is_active"
              @change="toggleActive(index, $event.target.checked)"
              class="rugby-checkbox"
            />
            <span class="rugby-toggle-slider"></span>
          </label>
          <span class="text-sm font-medium text-gray-700 whitespace-nowrap">
            {{ color.is_active ? 'Active' : 'Inactive' }}
          </span>
        </div>

        <div class="pt-2 lg:pt-0">
          <button
            type="button"
            class="w-10 h-10 flex items-center justify-center bg-red-500 
                  hover:bg-red-600 text-gray-50 rounded-lg 
                  transition-all duration-200 transform hover:scale-110 
                  shadow-sm"
            @click="removeColorVariant(index)"
            title="Remove this color"
          >
            <i class="ri-close-line text-sm text-gray-50"></i>
          </button>
        </div>
      </div>
    </div>

    <div v-if="localVariants.length > 0" 
        class="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
      <div class="flex items-center justify-between text-sm">
        <span class="text-green-700 font-medium">
          <i class="ri-information-line mr-1"></i>
          {{ localVariants.length }} color variant(s) configured
        </span>
        <span class="text-green-600">
          {{ activeCount }} active, {{ inactiveCount }} inactive
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorVariantManager',
  
  props: {
    value: {
      type: Array,
      default: () => []
    },
    productId: {
      type: [Number, String],
      default: null
    }
  },

  data() {
    return {
      localVariants: []
    }
  },

  computed: {
    activeCount() {
      return this.localVariants.filter(c => c.is_active).length
    },
    inactiveCount() {
      return this.localVariants.filter(c => !c.is_active).length
    }
  },

  watch: {
    value: {
      handler(newVal) {
        this.localVariants = newVal.map((color, index) => {
          const existingVariant = this.localVariants[index]
          
          return {
            ...color,
            use_image: color.use_image ?? false,
            is_active: color.is_active ?? true,
            image_file: existingVariant?.image_file || null,
            image_url: color.image_url || existingVariant?.image_url || null
          }
        })
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    emitChange() {
      const cleanData = this.localVariants.map(({ image_file, ...rest }) => ({
        ...rest,
        image_url: rest.use_image ? rest.image_url : null
      }))
      this.$emit('input', cleanData)
      this.$emit('change', cleanData)
    },

    addColorVariant() {
      const newColor = {
        id: null,
        name: '',
        hexcode: '#000000',
        image_url: null,
        image_file: null,
        use_image: false,
        is_active: true,
        type: 'color',
        sort_order: this.localVariants.length
      }
      this.localVariants.push(newColor)
      this.emitChange()
      
      this.$nextTick(() => {
        const inputs = this.$el.querySelectorAll('input[type="text"]')
        if (inputs.length) inputs[inputs.length - 1].focus()
      })
    },

    removeColorVariant(index) {
      const color = this.localVariants[index]

      if (color.image_url?.startsWith('blob:')) {
        URL.revokeObjectURL(color.image_url)
      }
      this.localVariants.splice(index, 1)
      this.emitChange()
    },

    updateHexcode(index, value) {
      let formatted = value.trim()
      if (formatted && !formatted.startsWith('#') && formatted.length === 6) {
        formatted = `#${formatted}`
      }
      if (!formatted || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(formatted)) {
        this.localVariants[index].hexcode = formatted.toUpperCase()
        this.emitChange()
      }
    },

    setColorInputMethod(index, useImage) {
      this.localVariants[index].use_image = useImage
      if (!useImage && !this.localVariants[index].hexcode) {
        this.localVariants[index].hexcode = '#000000'
      }
      this.emitChange()
    },

    handleImageUpload(index, event) {
      const file = event.target.files[0]
      if (!file) return

      if (!file.type.startsWith('image/')) {
        this.$emit('error', { index, message: 'Please upload an image file' })
        return
      }
      if (file.size > 2 * 1024 * 1024) {
        this.$emit('error', { index, message: 'Image must be under 2MB' })
        return
      }

      const oldUrl = this.localVariants[index].image_url
      if (oldUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(oldUrl)
      }

      const previewUrl = URL.createObjectURL(file)
      
      this.localVariants[index] = {
        ...this.localVariants[index],
        image_file: file,
        image_url: previewUrl,
        use_image: true
      }
      
      this.emitChange()
      this.$emit('image-uploaded', { index, file, previewUrl })
      
      event.target.value = ''
    },

    handleImageError(index) {
      this.localVariants[index].image_url = null
      this.emitChange()
    },

     clearImage(index) {
      const color = this.localVariants[index]

      if (color.image_url?.startsWith('blob:')) {
        URL.revokeObjectURL(color.image_url)
      }

      this.localVariants[index] = {
        ...color,
        image_file: null,
        image_url: null
      }
      this.emitChange()
    },

    toggleActive(index, isActive) {
      this.localVariants[index].is_active = isActive
      this.emitChange()
    },

    getColorImageFiles() {
      return this.localVariants
        .map((c, originalIndex) => ({ ...c, _origIndex: originalIndex }))
        .filter(c => c.use_image && c.image_file)
        .map(c => {
          const variantId = c.id || `temp_${c._origIndex}`;
          return {
            fieldName: `color_images[${variantId}]`,
            file: c.image_file,
            variantId,
            index: c._origIndex
          };
        });
    },

    getApiPayload() {
      return this.localVariants.map(({ image_file, ...variant }) => ({
        ...variant,
        hexcode: variant.hexcode?.toUpperCase() || null,
        image_url: variant.use_image ? variant.image_url : null
      }))
    }
  },

  beforeDestroy() {
    this.localVariants.forEach(color => {
      if (color.image_url?.startsWith('blob:')) {
        URL.revokeObjectURL(color.image_url)
      }
    })
  }
}
</script>

<style scoped>
::v-deep .rugby-toggle {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0;
  margin: 0;
}

::v-deep .rugby-checkbox { display: none; }

::v-deep .rugby-toggle-slider {
  position: relative;
  width: 44px;
  height: 24px;
  background: #d1d5db;
  border-radius: 50px;
  transition: all 0.2s;
}

::v-deep .rugby-toggle-slider:before {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ffffff;
  top: 3px;
  left: 3px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

::v-deep .rugby-checkbox:checked + .rugby-toggle-slider {
  background: #16a34a;
}

::v-deep .rugby-checkbox:checked + .rugby-toggle-slider:before {
  transform: translateX(20px);
}

input[type="color"] {
  width: 40px;
  height: 40px;
  padding: 0;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  background: none;
  flex-shrink: 0;
}
input[type="color"]::-webkit-color-swatch-wrapper { padding: 2px; border-radius: 6px; }
input[type="color"]::-webkit-color-swatch { border: none; border-radius: 6px; }
input[type="color"]::-moz-color-swatch { border: none; border-radius: 6px; }
</style>