<template>
    <div
        class="font-sans antialiased"
    >
        <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
        <v-app>
            <TopHeader />
            <NavHeader class="font-montserrat relative py-4 font-semibold"/>
            <Nuxt />
            <Footer />
        </v-app>
    </div>
</template>

<script>
import TopHeader from '../components/TopHeader.vue'
export default {
  components: { TopHeader },
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
    font-family: 'Courier Prime';
}
h1, h2, h3, h4, h5, h6 {
    font-family: "Courier Prime", monospace;
}

.font-montserrat {
    font-family: "Courier Prime", Arial, Helvetica, monospace;
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