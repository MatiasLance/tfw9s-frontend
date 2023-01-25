<template>
    <div
        class="font-sans antialiased"
    >
        <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
        <v-app>
            <TopHeader v-if="showComponents.topheader" />
            <NavHeader
              class="font-montserrat sm:custom-py-4
              custom-py-1 relative font-semibold"
            />
            <Nuxt />
            <Footer />
        </v-app>
    </div>
</template>

<script>
import TopHeader from '~/components/TopHeader.vue'
export default {
  components: { TopHeader },
  data() {
    return {
      showComponents: {
        topheader: false,
        navheader: true,
        footer: true
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.close)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close)
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
    border-top: 2px solid grey;
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