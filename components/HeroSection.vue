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
          />
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

        <!-- Quick Stats -->
        <div class="mt-8 flex flex-wrap gap-6">
          <div class="text-center">
            <div class="text-2xl font-bold text-green-400">
              50+
            </div>
            <div class="text-sm text-gray-400">
              Teams
            </div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-400">
              1K+
            </div>
            <div class="text-sm text-gray-400">
              Players
            </div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-400">
              25+
            </div>
            <div class="text-sm text-gray-400">
              Events
            </div>
          </div>
        </div>
      </div>

      <!-- Image Section -->
      <div class="relative col-span-1 w-full p-4" data-aos="fade-up">
        <div class="relative overflow-hidden rounded-2xl bg-gray-800 p-6 
                    shadow-2xl border border-green-500/30">
          <!-- Main Image -->
          <div class="relative z-10">
            <img
              :src="getMediaURL(contentimage)"
              loading="lazy"
              class="h-auto w-full rounded-xl object-cover shadow-lg 
                     transition-transform duration-500 hover:scale-105"
              alt="Rugby Action"
            />
          </div>
          
          <!-- Floating Badge -->
          <div class="absolute -top-4 -right-4 z-20 animate-bounce">
            <div class="bg-green-600 text-gray-50 rounded-full p-4 
                        shadow-2xl">
              <i class="ri-football-line text-2xl"></i>
            </div>
          </div>

          <!-- TFW Logo -->
          <div class="absolute bottom-4 left-4 z-20">
            <div class="bg-gray-50 rounded-xl p-3 shadow-lg">
              <img
                src="~/assets/images/tfw9s.png"
                class="h-16 w-16 object-contain"
                alt="TFW Rugby"
              />
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