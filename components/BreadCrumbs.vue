<template>
  <div
    class="col-span-12 text-center sm:space-y-3 sm:text-left
            lg:col-span-6 xl:mt-10 relative z-10"
    data-aos="fade-right"
  >
    <span class="superheadline flex flex-row items-center text-[1rem]
                font-normal text-white"
    >
      <span class="font-medium">
        <NuxtLink :to="dynamicRounting">
          <VBtn text color="white" class="hover:scale-105 transition-transform">
            <i class="ri-home-4-line mr-2"></i>
            {{ routeName ==='admin' ? 'Home' : 'Admin' }} 
          </VBtn>
        </NuxtLink>
      </span>
    </span>
    <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl
                bg-gradient-to-r from-green-400 to-white bg-clip-text 
                drop-shadow-lg"
    >
      🏉 {{ title }}
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
  },
  data() {
    return { routeName: '' }
  },
  mounted() {
    this.routeName = this.$route.name
  },
  computed: {
    dynamicRounting() {
      if (this.routeName === 'admin') {
        return '/'
      } else {
        return '/admin'
      }
    }
  }
}
</script>
