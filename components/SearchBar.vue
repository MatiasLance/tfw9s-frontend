<template>
  <div class="input-group relative flex w-full flex-row items-stretch">
    <input
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
      placeholder="Search tournaments..."
      aria-label="Search"
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
        py-2.5
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
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="search"
        class="w-4"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M505 442.7L405.3
            343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7
            44-128C416 93.1 322.9 0 208
            0S0 93.1 0 208s93.1
            208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4
            2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4
            33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208
            336c-70.7 0-128-57.2-128-128 0-70.7
            57.2-128 128-128 70.7 0 128 57.2 128
            128 0 70.7-57.2 128-128 128z"
        ></path>
      </svg>
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
  },
}
</script>