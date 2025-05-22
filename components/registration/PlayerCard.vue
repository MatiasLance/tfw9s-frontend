<template>
  <div
    class="max-w-xl mx-auto mt-15 p-4 bg-white rounded-xl shadow-md
           border border-gray-200 relative overflow-hidden"
  >
    <!-- Background logo (contained within white container) -->
    <img
      src="~/assets/images/tfw9s.png"
      alt="background logo"
      class="
      absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      w-64 opacity-5 z-0"
    >

    <!-- Main content with higher z-index -->
    <div class="relative z-10">
      <!-- Main layout row -->
      <div
        class="flex flex-col sm:flex-row justify-center
               items-center sm:items-start gap-20 sm:gap-22"
      >
        <!-- Left Section -->
        <div
          class="flex flex-col items-center sm:items-start
                 gap-3 sm:gap-4 mr-2 sm:mr-4"
        >
          <img
            src="~/assets/images/tfw9s.png"
            alt="logo"
            class="w-20 sm:w-24"
          >
          <div class="text-center sm:text-left">
            <p class="font-bold text-lg sm:text-xl tracking-wider">
              TIMOTHY
            </p>
            <p class="font-semibold text-base sm:text-lg">
              Maxwell
            </p>
            <p class="text-sm mt-2 tracking-widest">
              01/01/2012
            </p>
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex flex-col items-center gap-2 ml-2 sm:ml-4">
          <p class="font-bold text-xl sm:text-2xl">
            TFW9'S
          </p>
          <img
            src="~/assets/images/kidsplaying.jpg"
            alt="Player"
            class="rounded-xl object-cover w-40 h-48
                  border border-gray-300"
          >
        </div>
      </div>

      <!-- Bottom Banner -->
      <div
        class="mt-6 bg-green-600 text-white text-center
               font-bold py-2 rounded-b-xl text-lg sm:text-xl
               tracking-widest"
      >
        REGISTERED PLAYER
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic here
</script>