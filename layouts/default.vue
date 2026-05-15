<template>
    <div
        class="font-sans antialiased"
    >
        <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
        <v-app>
            <TopHeader v-if="showComponents.topheader"/>
            <button
              v-if="showTopScroll"
              type="button"
              class="scroll-to-top-btn group fixed bottom-6 right-6 z-[9999] flex h-12 w-12 items-center justify-center rounded-full border border-green-500/30 bg-gray-900/60 backdrop-blur-md shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-green-400 hover:bg-green-500/20 hover:shadow-green-500/30 active:translate-y-0 active:scale-95"
              data-aos="fade-left"
              @click="scrollUp"
              aria-label="Scroll to top"
            >
              <i class="ri-arrow-up-line text-2xl text-green-500 transition-colors duration-200 group-hover:text-white"></i>
            </button>
            <NavHeader
              class="font-montserrat sm:custom-py-4
              custom-py-1 relative font-semibold"
            />
            <div class="relative min-h-screen bg-[#1A1A1B]">
              <div class="page-top">
                <Nuxt />
                <UpdateNotification />
              </div>
            </div>
            <Footer></Footer>
        </v-app>
    </div>
</template>

<script>
import TopHeader from '~/components/TopHeader.vue'
import UpdateNotification from '~/components/UpdateNotification.vue';

export default {
  components: { TopHeader, UpdateNotification },

  data() {
    return {
      showTopScroll: false,
      showComponents: {
        topheader: false,
        navheader: true,
        footer: true
      }
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    document.addEventListener('click', this.close)
    document.documentElement.classList.add('nuxt-ready')
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    document.removeEventListener('click', this.close)
  },

  methods: {
    scrollUp() {
      const pageTop = document.querySelector('.page-top');
      pageTop.scrollIntoView({ behavior: 'smooth' });
    },
    handleScroll() {
      const pageTop = document.querySelector('.page-top');
      const sticky = pageTop.offsetTop;

      if (window.pageYOffset > sticky) {
        this.showTopScroll = true
      } else {
        this.showTopScroll = false
      }
    }
  },
}
</script>

<style>
* {
    font-family: 'Montserrat';
}
h1, h2, h3, h4, h5, h6 {
    font-family: "Montserrat", monospace;
}

.font-montserrat {
    font-family: "Montserrat", Arial, Helvetica, monospace;
}

.btn.disabled, .btn:disabled {
    cursor: not-allowed;
    opacity: .65;
}

.superheadline:before {
    width: 3.125rem;
    border-top: 2px solid white;
    margin-right: 10px;
    content: ' ';
}
</style>

<style lang="postcss">
  @media (min-width: 1024px) {
    .lg\:custom-py-4 {
        @apply py-4 !important
    }
  }
  @media (min-width: 1024px) {
    .lg\:custom-py-2 {
        @apply py-2 !important
    }
  }
  @media (min-width: 1024px) {
    .sm\:custom-py-4 {
        @apply py-4 !important
    }
  }
  @media (min-width: 1024px) {
    .sm\:custom-py-2 {
        @apply py-2 !important
    }
  }
  .custom-py-1 {
    @apply py-1
  }
  .custom-pl-16 {
    @apply pl-16
  }
  .custom-pl-0 {
    @apply pl-0
  }
  .custom-py-4 {
    @apply py-4
  }
</style>