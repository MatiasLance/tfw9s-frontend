<!-- eslint-disable tailwindcss/classnames-order -->
<template>
  <div>
    <BaseHeader class="bg-gradient-to-r from-swd-grey to-swd-blue">
      <div
        class="
          col-span-12
          space-y-3
          px-6
          text-center
          sm:space-y-3 sm:text-left
          md:mt-12
          lg:col-span-6
          xl:mt-10
        "
      >
        <span
          class="
            superheadline
            flex flex-row
            items-center
            pb-3
            text-[1rem]
            font-normal
          "
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white">Home</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-6xl">
          Privacy Policy
        </h1>
      </div>
    </BaseHeader>

    <div class="container mx-auto md:max-w-6xl">
      <div class="content-block py-24">
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '../components/base/BaseHeader.vue';
export default { components: { BaseHeader } };
</script>