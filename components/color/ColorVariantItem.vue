<!-- components/color/ColorVariantItem.vue -->
<template>
  <div 
    class="flex flex-col sm:flex-row items-start sm:items-center gap-4 
          bg-gray-50 rounded-lg p-4 border border-gray-200 
          group hover:border-green-300 transition-colors duration-200"
    :class="{ 'border-l-4 border-l-green-500': modelValue.active }"
  >
    <!-- Color Preview -->
    <div class="flex-shrink-0">
      <div 
        class="w-16 h-16 rounded-lg border-2 border-gray-300 overflow-hidden 
              flex items-center justify-center shadow-sm"
        :style="{ 
          backgroundColor: isValidHex ? modelValue.hex_code : undefined,
          backgroundImage: modelValue.pattern_url ? `url(${modelValue.pattern_url})` : 
                          modelValue.image_url ? `url(${modelValue.image_url})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }"
      >
        <span 
          v-if="!modelValue.hex_code && !modelValue.image_url && !modelValue.pattern_url"
          class="text-xs text-gray-400 text-center px-1"
        >
          No color
        </span>
        <i 
          v-else-if="!isValidHex && modelValue.hex_code"
          class="ri-error-warning-line text-red-500"
          title="Invalid hex code"
        ></i>
      </div>
    </div>

    <!-- Fields -->
    <div class="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 gap-3">
      <!-- Name -->
      <div class="sm:col-span-1">
        <label class="block text-xs font-medium text-gray-600 mb-1">Name</label>
        <input
          v-model="localName"
          type="text"
          placeholder="e.g., Forest Green"
          class="w-full px-3 py-2 bg-white border border-gray-300 
                rounded-lg text-gray-700 text-sm focus:ring-2 
                focus:ring-green-500 focus:border-green-500 transition-all"
          @blur="emitUpdate"
        />
      </div>

      <!-- Hex Code -->
      <div class="sm:col-span-1">
        <label class="block text-xs font-medium text-gray-600 mb-1">Hex Code</label>
        <div class="relative">
          <input
            v-model="localHex"
            type="text"
            placeholder="#000000"
            class="w-full px-3 py-2 pl-8 bg-white border border-gray-300 
                  rounded-lg text-gray-700 text-sm focus:ring-2 
                  focus:ring-green-500 focus:border-green-500 transition-all"
          />
          <input
            v-if="isValidHex"
            type="color"
            :value="localHex"
            class="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 
                  cursor-pointer opacity-0 hover:opacity-100"
            @input="onColorPickerChange"
          />
          <i 
            v-else-if="localHex"
            class="ri-error-warning-line absolute left-2 top-1/2 -translate-y-1/2 
                  text-red-500"
          ></i>
        </div>
      </div>

      <!-- Image/Pattern Upload -->
      <div class="sm:col-span-1">
        <label class="block text-xs font-medium text-gray-600 mb-1">Visual</label>
        <button
          type="button"
          class="w-full px-3 py-2 bg-white border border-gray-300 
                rounded-lg text-gray-700 text-sm hover:border-green-400 
                hover:text-green-700 transition-colors flex items-center justify-center gap-1"
          @click="$emit('upload-image')"
        >
          <i class="ri-image-add-line"></i>
          <span>{{ modelValue.image_url ? 'Change' : 'Upload' }}</span>
        </button>
      </div>

      <!-- Active Toggle -->
      <div class="sm:col-span-1 flex items-end">
        <label class="rugby-toggle w-full">
          <input
            v-model="localActive"
            type="checkbox"
            class="rugby-checkbox"
            @change="emitUpdate"
          />
          <span class="rugby-toggle-slider"></span>
          <span class="ml-2 text-sm font-medium text-gray-700">Active</span>
        </label>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1 pt-2 sm:pt-0">
      <button
        type="button"
        class="w-8 h-8 flex items-center justify-center text-gray-400 
              hover:text-green-600 rounded-lg hover:bg-green-50 
              transition-colors"
        title="Drag to reorder (coming soon)"
        disabled
      >
        <i class="ri-draggable"></i>
      </button>
      <button
        type="button"
        class="w-8 h-8 flex items-center justify-center text-gray-400 
              hover:text-red-600 rounded-lg hover:bg-red-50 
              transition-colors"
        title="Remove color"
        @click="$emit('remove')"
      >
        <i class="ri-close-line"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorVariantItem',
  
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    index: { type: Number, required: true },
    isFirst: { type: Boolean, default: false },
    isLast: { type: Boolean, default: false }
  },
  
  emits: ['update:modelValue', 'remove', 'upload-image'],
  
  data() {
    return {
      localName: this.modelValue.name || '',
      localHex: this.modelValue.hex_code || '',
      localActive: this.modelValue.active !== false
    };
  },
  
  computed: {
    isValidHex() {
      if (!this.localHex) return true; // Empty is valid (optional)
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(this.localHex);
    }
  },
  
  watch: {
    'modelValue.name'(val) { this.localName = val || ''; },
    'modelValue.hex_code'(val) { this.localHex = val || ''; },
    'modelValue.active'(val) { this.localActive = val !== false; }
  },
  
  methods: {
    onColorPickerChange(event) {
      this.localHex = event.target.value.toUpperCase();
      this.emitUpdate();
    },
    
    emitUpdate() {
      // Only emit if values actually changed
      const payload = {};
      if (this.localName !== this.modelValue.name) payload.name = this.localName;
      if (this.localHex !== this.modelValue.hex_code) payload.hex_code = this.localHex;
      if (this.localActive !== (this.modelValue.active !== false)) {
        payload.active = this.localActive;
      }
      
      if (Object.keys(payload).length > 0) {
        this.$emit('update:modelValue', payload);
      }
    }
  }
};
</script>