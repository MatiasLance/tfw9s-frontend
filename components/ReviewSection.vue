<template>
    <section class="my-24 w-full">
        <BaseSection>
            <div class="col-span-12">
                <h1
                    data-aos="flip-down"
                    class="mb-10 text-center text-3xl
                    font-bold uppercase sm:mb-6 sm:text-5xl"
                >
                    {{ headline }}
                </h1>
            </div>
            <div
                data-aos="fade-left"
                data-aos-delay="150"
                class="col-span-12 mt-8 w-full px-4 sm:px-6"
            >
                <ReviewSlider />
            </div>
        </BaseSection>
    </section>
</template>

<script>
import ReviewSlider from './ReviewSlider.vue';
import aosMixin from '@/mixins/aos';

export default {
  name: 'ReviewSection',
  components: { ReviewSlider },
  mixins: [ aosMixin ],
  data() {
    return { headline: 'Reviews' }
  }
}
</script>