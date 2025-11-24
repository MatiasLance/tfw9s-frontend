<template>
  <section class="mx-auto max-w-screen-xl gap-6 p-4 sm:p-8">
    <div class="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
      <!-- Content Section -->
      <div class="relative col-span-1 w-full p-4 lg:p-6" data-aos="fade-right">
        <!-- Rugby Badge -->
        <div class="mb-6 flex items-center gap-3">
          <div class="bg-green-600 rounded-full p-2 shadow-lg">
            <i class="ri-team-line text-gray-50 text-xl"></i>
          </div>
          <span class="text-sm font-semibold uppercase tracking-wide text-green-600">
            Rugby League
          </span>
        </div>

        <!-- Main Headline -->
        <h1 class="font-montserrat mb-6 bg-gradient-to-r from-green-500 
                   via-green-600 to-gray-900 bg-clip-text text-4xl 
                   font-bold leading-tight text-transparent sm:text-5xl 
                   xl:text-6xl">
          {{ headline }}
        </h1>

        <!-- Content Blurb -->
        <div class="mb-8">
          <span
            class="text-justify text-base leading-relaxed text-white 
                   md:text-lg"
            v-html="contentblurb"
          ></span>
        </div>

        <!-- Call to Action Buttons -->
        <div v-show="!isAdmin" class="flex flex-wrap gap-4">
          <NuxtLink to="/tournaments">
            <button
              type="button"
              class="bg-green-600 hover:bg-green-700 text-gray-50 
                     font-bold py-4 px-8 rounded-xl uppercase transition-all 
                     duration-300 transform hover:scale-105 border-2 
                     border-green-500 flex items-center gap-2"
            >
              <i class="ri-trophy-line"></i>
              {{ cta }}
            </button>
          </NuxtLink>
          
          <NuxtLink to="/shop">
            <button
              type="button"
              class="bg-gradient-to-r from-green-500 to-green-600 
                     hover:from-green-600 hover:to-green-700 text-gray-50 
                     font-bold py-4 px-8 rounded-xl uppercase transition-all 
                     duration-300 transform hover:scale-105 border-2 
                     border-green-400 flex items-center gap-2 shadow-lg 
                     hover:shadow-xl"
            >
              <i class="ri-shopping-bag-line"></i>
              Shop Merch
            </button>
          </NuxtLink>
        </div>
      </div>

      <!-- Image Section -->
      <div class="relative col-span-1 w-full" data-aos="fade-up">
        <!-- TFW Logo - Floating Above Everything -->
        <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 z-30">
          <div class="bg-gradient-to-r from-green-600 to-green-800 
                      rounded-2xl p-4 shadow-2xl border-2 border-yellow-400">
            <img
              src="~/assets/images/tfw9s.png"
              class="h-20 w-20 object-contain"
              alt="TFW Rugby"
            />
          </div>
        </div>

        <!-- Image Card -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br 
                    from-gray-900 to-green-900 p-8 pt-12 shadow-2xl 
                    border-2 border-green-500/40 mt-8">
          
          <!-- Main Image -->
          <div class="relative z-10">
            <img
              :src="getMediaURL(contentimage)"
              loading="lazy"
              class="h-auto w-full rounded-xl object-cover shadow-lg 
                    transition-transform duration-500 hover:scale-105 
                    border-2 border-green-500/20"
              alt="Rugby Action"
            />
          </div>

          <!-- Rugby Badge -->
          <div class="absolute -bottom-3 -right-3 z-20">
            <div class="bg-yellow-400 text-gray-900 rounded-full p-4 
                        shadow-2xl rotate-12">
              <i class="ri-football-line text-2xl font-bold"></i>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import handlesMedia from '~/mixins/shop/handlesMedia'

export default {
  mixins: [ handlesMedia ],
  props: {
    blurb: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: false
    },
    image: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      headline: 'TFW9’s',
      cta: 'Register Now',
      contentblurb: '',
      contentimage: []
    };
  },
  watch: {
    blurb(newVal) {
      this.contentblurb = newVal;
    },
    image(newVal) {
      this.contentimage = this.getMediaURL(newVal[0], 'temp');
    }
  }
};
</script>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>