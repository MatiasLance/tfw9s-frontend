<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <div class="w-screen min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <!-- Subtle Background Elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <!-- Rugby Field Lines -->
      <div class="absolute top-1/4 left-0 w-full h-1 bg-green-500/20 
                  transform -skew-y-6"></div>
      <div class="absolute top-1/2 left-0 w-full h-1 bg-green-500/15 
                  transform skew-y-3"></div>
      <div class="absolute top-3/4 left-0 w-full h-1 bg-green-500/10 
                  transform -skew-y-12"></div>
      
      <!-- Minimal Floating Elements -->
      <div class="absolute top-20 left-10 animate-float-slow">
        <div class="w-8 h-12 bg-green-500/10 rounded-full transform rotate-45"></div>
      </div>
      <div class="absolute bottom-32 right-20 animate-float-medium">
        <div class="w-10 h-14 bg-green-400/10 rounded-full transform -rotate-20"></div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10">
      <!-- Hero Section -->
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-green-900/5 to-transparent 
                    z-0"></div>
        <HeroSection
          :blurb="contentData.content"
          :image="contentData.image"
        />
      </div>

      <!-- Partner/Sponsor Section -->
      <div class="relative bg-gradient-to-b from-transparent to-gray-800/50 
                  py-16 lg:py-24">
        <div class="absolute inset-0 bg-pattern opacity-5"></div>
        <Partnersponsor />
      </div>
    </div>
  </div>
</template>

<script>
import HeroSection from '~/components/HeroSection'
import Partnersponsor from '~/components/Partnersponsor'
import aosMixin from '@/mixins/aos'

export default {
  name: 'index',
  components: { 
    HeroSection,
    Partnersponsor
  },
  mixins: [ aosMixin ],
  data() {
    return {
      contentData: {
        image: [],
        content: '<p></p>'
      },
      isLoading: true
    }
  },
  head() {
    return {
      title: 'Rugby Club - Home | TFW9s',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Join the ultimate rugby experience with TFW9s. ' +
                   'Discover tournaments, teams, and exclusive rugby merchandise.'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'rugby, tournaments, teams, sports, TFW9s, rugby club, ' +
                   'rugby matches, rugby community'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Rugby Club - TFW9s | Home of Rugby Excellence'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Experience the thrill of rugby with TFW9s. ' +
                   'Join our community and elevate your game.'
        }
      ]
    }
  },
  created() {
    this.retrieveHomePageInfo()
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    })
  },
  methods: {
    retrieveHomePageInfo() {
      const id = 1
      this.isLoading = true

      this.$axios
        .$get(`v1/homepageinfo/${id}`)
        .then((response) => {
          this.contentData.content = response.data.teamFolder.blurb
          this.contentData.image = response.data.teamFolder.media
        })
        .catch((error) => {
          console.error('Error fetching homepage data:', error)
          this.handleDataError()
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    handleDataError() {
      // Fallback content
      this.contentData.content = '<p>Welcome to TFW9s Rugby Club. ' +
                                'Join our community of passionate rugby players ' +
                                'and fans. Experience the thrill of the game!</p>'
      this.contentData.image = [ '/default-rugby-banner.jpg' ]
    },

    handleImageError(event) {
      console.warn('Image failed to load:', event.target.src)
      event.target.src = '/fallback-rugby-image.jpg'
    }
  }
}
</script>

<style scoped>
@keyframes float-slow {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes float-medium {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(90deg); }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}

.bg-pattern {
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.1) 0%, transparent 50%);
}

/* Smooth scrolling for better UX */
html {
  scroll-behavior: smooth;
}
</style>
