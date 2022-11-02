<template>
    <section id="hero" class="w-full">
      <BaseSection>
        <div
            class="col-span-12 mt-12 space-y-4 px-6
            text-center sm:space-y-6 sm:text-left lg:col-span-6 xl:mt-10"
        >
          <span
            data-aos="fade-right"
            data-aos-once="true"
            class="font-montserrat text-base font-semibold
            capitalize text-[#3981da]"
>
            {{ superheadline }}
        </span>
          <h1
            data-aos="fade-right"
            data-aos-once="true"
            class="font-montserrat
            text-[2.5rem] font-bold
            uppercase leading-tight
            text-black sm:pr-8 sm:text-5xl xl:pr-10 xl:text-6xl"
          >
           {{ headline }}
          </h1>
          <p
          data-aos="fade-down"
          data-aos-once="true"
          data-aos-delay="300"
          class="paragraph hidden text-[25px] font-normal text-black sm:block"
          >
            Quickly communicate enabled technology and turnkey
            leadership skills. Uniquely enable accurate
            supply chains rather than frictionless technology.
          </p>
          <div
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-delay="700"
            class="mt-2 flex flex-col
            space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
          >
            <p
            class="paragraph hidden sm:block"
            >
            {{ contentblurb }}
            </p>
          </div>
        </div>
        <div class="my-12 md:hidden"></div>
        <div class="col-span-12 hidden sm:block lg:col-span-6">
          <div class="w-full">
            <img
              data-aos="fade-up"
              data-aos-once="true"
              src="https://korsel.bold-themes.com/main-demo/wp-content/uploads/sites/2/2021/11/post_06-1280x1280.jpg"
              class="mt-32 lg:-mt-4"
              alt=""
            />
          </div>
        </div>
      </BaseSection>
    </section>
</template>

<script>
import BaseSection from './base/BaseSection.vue'
export default {
  name: 'AboutSection',
  components: { BaseSection },
  data() {
    return {
      superheadline: 'StraddieWorld is the right choice',
      headline: 'perfection is in the details',
      cta: '',
      contentblurb: 'Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.',
    }
  }
}
</script>