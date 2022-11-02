<template>
    <div
        class="font-sans antialiased"
    >
        <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
        <v-app>
            <NavHeader class="font-montserrat relative py-4 font-semibold"/>
            <Nuxt />
            <Footer />
        </v-app>
    </div>
</template>

<script>
export default {
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
    font-family: 'Atkinson Hyperlegible';
}
h1, h2, h3, h4, h5, h6 {
    font-family: "Montserrat",Arial, Helvetica, sans-serif;
}

.font-montserrat {
    font-family: "Montserrat", Arial, Helvetica, sans-serif;
}

.btn.disabled, .btn:disabled {
    cursor: not-allowed;
    opacity: .65;
}

.superheadline:before {
    width: 3.125rem;
    border-top: 2px solid #3981da;
    margin-right: 10px;
    content: ' ';
}
</style>