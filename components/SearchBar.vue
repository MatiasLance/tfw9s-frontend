<template>
  <div class="input-group relative flex w-full flex-row items-stretch">
    <input
      :id="inputId"
      :value="value"
      type="search"
      class="
        form-control
        relative
        m-0
        block
        h-12
        w-full
        min-w-0 flex-auto
        rounded-l-xl
        border-2 border-solid border-gray-600
        bg-gray-700 bg-clip-padding
        text-base
        font-normal
        text-gray-100
        transition-all
        duration-300
        ease-in-out
        placeholder-gray-400
        focus:border-green-500 focus:bg-gray-600 
        focus:text-gray-50 focus:outline-none
        focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
      "
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      aria-describedby="button-addon2"
      @input="$emit('input', $event.target.value)"
    />
    <button
      id="button-addon2"
      class="
        flex
        h-12
        items-center
        rounded-r-xl
        bg-gradient-to-r from-green-500 to-green-600
        px-6
        text-xs
        font-bold
        uppercase leading-tight
        text-gray-50
        shadow-lg
        transition-all
        duration-300
        ease-in-out
        hover:from-green-600 hover:to-green-700 
        hover:shadow-green-500/50 hover:scale-105
        focus:from-green-600 focus:to-green-700 
        focus:shadow-lg focus:outline-none focus:ring-2 
        focus:ring-green-500 focus:ring-opacity-50
        active:from-green-700 active:scale-95
      "
      type="submit"
    >
      <i class="ri-search-line text-lg text-gray-50"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    inputId: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Search tournaments...',
    },
    ariaLabel: {
      type: String,
      default: 'Search',
    },
  },
}
</script>
