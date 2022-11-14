<template>
    <section
        class="relative my-9 max-w-full
        bg-white sm:mx-6
        sm:rounded-2xl"
    >
    <BaseSection>
        <div
            class="col-span-12 mt-8 w-full px-4 sm:px-6"
        >
            <BrandsSlider />
        </div>
        <div
            class="col-span-12 mt-8"
        >
            <div class="flex items-center justify-center">
                <NuxtLink
                    to="brands"
                    class="rounded-xl
                    border
                    border-solid border-brand-black
                    bg-transparent px-6 py-3
                    text-base text-white hover:bg-slate-200
                    hover:text-black"
                >
                View all brands
                </NuxtLink>
            </div>
        </div>
    </BaseSection>
    </section>
</template>

<script>
import BrandsSlider from './BrandsSlider.vue'
export default {
  name: 'BrandsSection',
  components: { BrandsSlider }
}
</script>

<style>
.bg-partner {
  background: url('../assets/images/partner/background.png');
  background-size: cover;
  background-position: center;
}
</style>