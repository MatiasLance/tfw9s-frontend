<template>
  <div class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
    <label class="block font-bold text-gray-800 mb-4 flex items-center text-lg">
      <i class="ri-palette-line mr-2 text-green-600"></i>
      Product Colors
    </label>

    <div v-if="value.length" class="flex flex-wrap gap-3 mb-6">
      <div
        v-for="(colorObj, idx) in mappedValue"
        :key="idx"
        class="group flex items-center gap-3 px-3 py-2 rounded-lg text-sm
               bg-gray-50 border border-gray-200 hover:border-green-400
               transition-all duration-200 shadow-sm"
      >

        <span
          class="w-6 h-6 rounded-full border border-gray-300 shadow-inner overflow-hidden flex-shrink-0"
          :class="{ 'bg-gray-100': !colorObj.hex && !colorObj.image_url }"
        >
          <img 
            v-if="colorObj.image_url" 
            :src="colorObj.image_url" 
            class="w-full h-full object-cover"
            :alt="colorObj.label"
          />
          <div 
            v-else
            class="w-full h-full"
            :style="{ backgroundColor: colorObj.hex || '#ccc' }"
          ></div>
        </span>

        <span class="font-semibold text-gray-700 max-w-[120px] truncate">
          {{ colorObj.label }}
        </span>

        <button
          type="button"
          class="ml-1 w-5 h-5 flex items-center justify-center rounded-full
                 bg-gray-200 hover:bg-red-500 text-gray-500 hover:text-white
                 transition-colors duration-200 focus:outline-none"
          @click="removeColor(idx)"
          title="Remove Color"
        >
          <i class="ri-close-line text-xs"></i>
        </button>
      </div>
    </div>

    <div class="mb-6">
      <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Quick Select Presets
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <button
          v-for="c in colorPresets"
          :key="c.value"
          type="button"
          class="relative flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
          :class="isSelected(c.value) ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-white hover:border-gray-300'"
          @click="togglePreset(c.value)"
        >
          <span
            class="w-10 h-10 rounded-full border border-gray-200 shadow-sm overflow-hidden"
          >
            <img 
              v-if="c.image_url" 
              :src="c.image_url" 
              class="w-full h-full object-cover"
              :alt="c.label"
            />
            <div 
              v-else
              class="w-full h-full"
              :style="{ backgroundColor: c.hex }"
            ></div>
          </span>
          
          <span class="text-xs font-medium text-gray-700 text-center leading-tight line-clamp-1">
            {{ c.label }}
          </span>

          <div 
            v-if="isSelected(c.value)"
            class="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
          >
            <i class="ri-check-line text-white text-[10px]"></i>
          </div>
        </button>
      </div>
    </div>

    <div class="pt-4 border-t border-gray-100">
      <button
        type="button"
        class="flex items-center gap-2 text-sm font-semibold text-gray-600
               hover:text-green-700 transition-colors duration-200"
        @click="showCustomColor = !showCustomColor"
      >
        <i
          class="ri-add-circle-line text-lg"
          :class="{ 'ri-indeterminate-circle-line': showCustomColor }"
        ></i>
        {{ showCustomColor ? 'Hide Custom Picker' : 'Add Custom Color' }}
      </button>

      <transition name="slide-fade">
        <div v-if="showCustomColor" class="mt-4 flex items-center gap-4 flex-wrap bg-gray-50 p-3 rounded-lg border border-gray-200">
          
          <div class="relative">
            <input
              v-model="tempCustomColor"
              type="color"
              class="w-12 h-10 p-0 border-0 rounded cursor-pointer bg-transparent"
            />
          </div>

          <div class="flex flex-col">
            <span class="text-xs text-gray-500 font-medium">HEX Code</span>
            <span class="text-sm font-mono text-gray-800">{{ tempCustomColor || '#000000' }}</span>
          </div>

          <div class="ml-auto flex gap-2">
            <button
              type="button"
              class="px-4 py-2 text-xs font-bold uppercase tracking-wide rounded-lg
                     bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
              @click="tempCustomColor = ''"
            >
              Clear
            </button>
            <button
              type="button"
              class="px-4 py-2 text-xs font-bold uppercase tracking-wide rounded-lg
                     bg-green-600 hover:bg-green-700 text-white shadow-md
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              :disabled="!isValidHex"
              @click="addCustomColor"
            >
              Add Color
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorPicker',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showCustomColor: false,
      tempCustomColor: '#C8102E',
      colorPresets: [
        { label: 'Black', value: 'black', hex: '#000000', image_url: null },
        { label: 'White', value: 'white', hex: '#FFFFFF', image_url: null },
        { label: 'Navy Blue', value: 'navy', hex: '#002147', image_url: null },
        { label: 'Red', value: 'red', hex: '#C8102E', image_url: null },
        { label: 'Forest Green', value: 'forestgreen', hex: '#228B22', image_url: null },
        { label: 'Royal Blue', value: 'royalblue', hex: '#4169E1', image_url: null },
        { label: 'Yellow', value: 'yellow', hex: '#FFD700', image_url: null },
        { label: 'Orange', value: 'orange', hex: '#FF8200', image_url: null },
        { label: 'Grey', value: 'grey', hex: '#808080', image_url: null },
        { label: 'Maroon', value: 'maroon', hex: '#800000', image_url: null },
        { label: 'Teal', value: 'teal', hex: '#008080', image_url: null },
        { label: 'Pink', value: 'pink', hex: '#FFC0CB', image_url: null },
        { label: 'Army Green', value: 'armygreen', hex: '#4B5320', image_url: null },
      ]
    };
  },
  computed: {
    isValidHex() {
      return /^#([0-9A-F]{3}){1,2}$/i.test(this.tempCustomColor);
    },
    mappedValue() {
      return this.value.map(item => {
        if (typeof item === 'object') return item;
        const preset = this.colorPresets.find(p => p.value === item || p.hex === item);
        if (preset) return preset;
        return { value: item, label: item, hex: item, image_url: null };
      });
    }
  },
  methods: {
    isSelected(val) {
      return this.value.some(item => {
        if (typeof item === 'object') return item.value === val;
        return item === val;
      });
    },

    togglePreset(value) {
      const current = [...this.value];
      const existsIndex = current.findIndex(item => {
         if (typeof item === 'object') return item.value === value;
         return item === value;
      });

      if (existsIndex !== -1) {
        current.splice(existsIndex, 1);
      } else {
        const preset = this.colorPresets.find(p => p.value === value);
        current.push(preset);
      }
      this.$emit('input', current);
    },

    addCustomColor() {
      if (!this.isValidHex) return;
      
      const current = [...this.value];
      
      const newColor = {
        value: this.tempCustomColor.toLowerCase(),
        label: `Custom ${this.tempCustomColor}`,
        hex: this.tempCustomColor,
        image_url: null
      };

      const exists = current.some(item => {
        const hex = typeof item === 'object' ? item.hex : item;
        return hex.toLowerCase() === newColor.hex.toLowerCase();
      });

      if (!exists) {
        current.push(newColor);
        this.$emit('input', current);
        this.showCustomColor = false;
      }
    },

    removeColor(index) {
      const current = [...this.value];
      current.splice(index, 1);
      this.$emit('input', current);
    }
  }
};
</script>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
}
</style>