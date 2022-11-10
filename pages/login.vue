<template>
    <div>
        <section
            class="relative min-h-[97vh] w-full
            bg-brand-slate
            bg-cover
            py-10"
        >
            <div class="container mx-auto max-w-screen-md px-4">
                <LoginSection />
            </div>
        </section>
    </div>
</template>

<script>
import LoginSection from '../components/LoginSection.vue';
export default {
  name: 'login',
  components: { LoginSection }
}
</script>