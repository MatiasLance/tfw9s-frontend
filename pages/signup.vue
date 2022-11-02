<template>
  <div>
      <section
      class="relative min-h-[97vh] w-full
      bg-[url('~/assets/images/login_2.jpeg')]
      bg-cover py-10"
      >
      <div class="container mx-auto max-w-screen-md px-4">
      <SignupSection />
      </div>
      </section>
  </div>
</template>

<script>
import SignupSection from '../components/SignupSection.vue';
export default { name: 'signup', components: { SignupSection } }
</script>

<style>
.container-signup {
    align-items: center;
    display: flex;
    justify-content: center;
}
</style>