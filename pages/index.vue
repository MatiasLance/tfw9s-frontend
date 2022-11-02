<template>
  <div>
    <HeroSection />
    <section
      class="
        bg-partner
        relative
        my-24
        max-w-full
        overflow-hidden
        shadow
        sm:mx-6
      "
    >
      <div
        class="
          items-counter
          mx-auto
          flex
          max-w-2xl
          flex-col
          justify-center
          space-y-3
          px-6
          py-16
          text-center
          sm:px-0
        "
      >
        <h3
          data-aos="flip-down"
          class="text-2xl font-semibold text-neutral-800"
        >
          Welcome to Straddie World
        </h3>
        <p data-aos="flip-down" class="paragraph">
          My name is Bill Lowe, Ive been a resident of Straddie for 40 odd
          years. I have a passion for the scenery and wildlife on this beautiful
          island. I've travelled the world and Australia and captured images
          from all around to share them here with you.
        </p>
        <p data-aos="flip-down" class="paragraph">
          You will find here, photo images of North Stradbroke Island
          (Minjerribah), and other places. Canvas art for wall decoration and
          home to Mal-a-pause Surf Wear.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import aosMixin from '@/mixins/aos';

export default {
  name: 'index',
  mixins: [ aosMixin ],
  data() {
    return { }
  },
  head() {
    return {
      title: 'Straddie World - Stradbroke Wedding Photography',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Photo images of North Stradbroke Island (Minjerribah), and other places. Canvas art for wall decoration. Home to Mal-apause Surf Wear.',
        },
      ],
      keywords: [
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Photo images of North Stradbroke Island (Minjerribah), and other places. Canvas art for wall decoration. Home to Mal-apause Surf Wear.',
        },
      ],
    };
  },
};
</script>
