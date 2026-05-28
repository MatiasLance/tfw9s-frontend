<template>
  <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
    <label class="block font-semibold text-gray-700 mb-4">
      <i class="ri-palette-line mr-2 text-green-600"></i>
      Colors
    </label>

    <!-- Selected Colors as Chips -->
    <div v-if="value.length" class="flex flex-wrap gap-2 mb-4">
      <div
        v-for="(color, idx) in value"
        :key="idx"
        class="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm
               bg-green-50 border border-green-200 shadow-sm
               transition-all duration-200"
      >
        <span
          class="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
          :style="{ backgroundColor: hexFor(color) }"
          aria-hidden="true"
        ></span>
        <span class="font-medium text-gray-700">
          {{ labelFor(color) }}
        </span>
        <button
          type="button"
          class="w-4 h-4 flex items-center justify-center rounded-full
                 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white
                 transition-colors duration-200"
          @click="removeColor(idx)"
          title="Remove"
        >
          <i class="ri-close-line text-xs"></i>
        </button>
      </div>
    </div>

    <!-- Preset swatches (toggle) -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
      <button
        v-for="c in colorPresets"
        :key="c.value"
        type="button"
        class="flex items-center gap-3 p-2.5 rounded-lg border-2 transition-all duration-200
               focus:outline-none focus:ring-2 focus:ring-green-500"
        :class="selectedPresetClass(c.value)"
        @click="togglePreset(c.value)"
      >
        <span
          class="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
          :style="{ backgroundColor: c.hex }"
          aria-hidden="true"
        ></span>
        <span class="text-sm font-medium text-gray-700 leading-tight">
          {{ c.label }}
        </span>
      </button>
    </div>

    <!-- Custom color adder -->
    <div>
      <button
        type="button"
        class="flex items-center gap-2 text-sm font-medium text-gray-600
               hover:text-green-700 transition-colors duration-200"
        @click="showCustomColor = !showCustomColor"
      >
        <i
          class="ri-add-circle-line"
          :class="{ 'ri-indeterminate-circle-line': showCustomColor }"
        ></i>
        Pick a custom colour
      </button>

      <div v-if="showCustomColor" class="mt-3 flex items-center gap-3 flex-wrap">
        <input
          v-model="tempCustomColor"
          type="color"
          class="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer bg-white
                 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <span class="text-sm text-gray-500">
          {{ tempCustomColor || 'Choose a colour' }}
        </span>
        <button
          type="button"
          class="text-xs bg-green-600 hover:bg-green-700 text-gray-50 font-medium
                 px-3 py-1.5 rounded-lg transition-colors duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!tempCustomColor"
          @click="addCustomColor"
        >
          Add
        </button>
        <button
          type="button"
          class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5
                 rounded-lg transition-colors duration-200"
          @click="tempCustomColor = ''"
        >
          Clear
        </button>
      </div>
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
      tempCustomColor: '',
      colorPresets: [
        {
          label: 'Black',
          value: 'black',
          hex: '#000000'
        },
        {
          label: 'White',
          value: 'white',
          hex: '#FFFFFF'
        },
        {
          label: 'Navy Blue',
          value: 'navy',
          hex: '#002147'
        },
        {
          label: 'Red',
          value: 'red',
          hex: '#C8102E'
        },
        {
          label: 'Forest Green',
          value: 'forestgreen',
          hex: '#228B22'
        },
        {
          label: 'Royal Blue',
          value: 'royalblue',
          hex: '#4169E1'
        },
        {
          label: 'Yellow',
          value: 'yellow',
          hex: '#FFD700'
        },
        {
          label: 'Orange',
          value: 'orange',
          hex: '#FF8200'
        },
        {
          label: 'Grey',
          value: 'grey',
          hex: '#808080'
        },
        {
          label: 'Maroon',
          value: 'maroon',
          hex: '#800000'
        },
        {
          label: 'Teal',
          value: 'teal',
          hex: '#008080'
        },
        {
          label: 'Pink',
          value: 'pink',
          hex: '#FFC0CB'
        },
        {
          label: 'Army Green',
          value: 'armygreen',
          hex: '#4B5320'
        }
      ]
    };
  },
  methods: {
    // Toggle a preset colour on/off
    togglePreset(colorValue) {
      const current = [ ...this.value ];
      const idx = current.indexOf(colorValue);
      if (idx === -1) {
        current.push(colorValue);
      } else {
        current.splice(idx, 1);
      }
      this.$emit('input', current);
    },

    // Add the temporary custom colour to the selection
    addCustomColor() {
      if (!this.tempCustomColor) return;
      const newColor = this.tempCustomColor.toLowerCase();
      const current = [ ...this.value ];
      // avoid duplicates
      if (!current.includes(newColor)) {
        current.push(newColor);
        this.$emit('input', current);
      }
      this.tempCustomColor = '';
    },

    // Remove a colour by its index in the array
    removeColor(index) {
      const current = [ ...this.value ];
      current.splice(index, 1);
      this.$emit('input', current);
    },

    // Styling helper for preset buttons
    selectedPresetClass(colorValue) {
      return this.value.includes(colorValue) ?
        'border-green-600 bg-green-50 shadow-md' :
        'border-gray-200 bg-gray-50 hover:border-green-300 hover:shadow-sm';
    },

    // Helper functions for chip display
    hexFor(colorStr) {
      const preset = this.colorPresets.find(c => c.value === colorStr);
      return preset ? preset.hex : colorStr;
    },
    labelFor(colorStr) {
      const preset = this.colorPresets.find(c => c.value === colorStr);
      return preset ? preset.label : colorStr;
    }
  }
};
</script>