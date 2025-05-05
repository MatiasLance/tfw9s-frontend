<template>
    <div class="min-h-full bg-[#1A1A1B]">
      <BaseHeader
        class="mx-auto max-w-screen-xl gap-4
        bg-gradient-to-r from-brand-green to-brand-black lg:px-8"
      >
        <div
          class="
            col-span-12
            text-center
            sm:space-y-3
            sm:text-left
            lg:col-span-6
            xl:mt-10
          "
        >
          <span
            class="
              superheadline
              flex flex-row
              items-center
              text-[1rem]
              font-normal
              text-white
            "
          >
            <span class="font-medium">
              <NuxtLink to="/">
                <VBtn text color="white">Home</VBtn>
              </NuxtLink>
            </span>
          </span>
          <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl">
            Registration Limit Reached
          </h1>
        </div>
      </BaseHeader>
  
      <div class="my-24 mx-auto max-w-screen-xl bg-[#1A1A1B] p-8 text-center">
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <h2 class="text-2xl font-bold mb-4">Registration Full</h2>
          <p class="mb-4">
            Sorry, registration for "{{ $route.query.seriesName }}" has reached its maximum capacity of 
            {{ $route.query.maxRegistrations }} participants.
          </p>
          <p class="mb-6">Please check back later or contact us for more information.</p>
          <NuxtLink to="/">
            <VBtn color="black" dark>Return to Home</VBtn>
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BaseHeader from '~/components/base/BaseHeader';
  
  export default {
    components: {
      BaseHeader
    },
    head() {
      return {
        title: 'Registration Limit Reached'
      };
    }
  };
  </script>