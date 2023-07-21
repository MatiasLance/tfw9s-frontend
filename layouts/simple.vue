<template>
    <Nuxt />
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