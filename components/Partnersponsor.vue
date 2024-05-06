<template>
  <section class="mx-auto max-w-screen-xl gap-4 p-7">
      <div
      class="relative flex w-full snap-x gap-6
      overflow-y-hidden overflow-x-scroll pb-14"
      >
        <img
          v-for="(item, index) in partnerSponsors"
          :key="index"
          class="h-40 w-40 shrink-0 snap-center overflow-hidden rounded-lg
          object-contain brightness-50 transition duration-300 ease-in-out
          first:pl-8 last:pr-8 hover:scale-125 hover:brightness-100"
          data-aos="fade-up"
          :src="getMediaURL(item.media[0])"
          alt="Sponsor Image"
        />
      </div>
  </section>
</template>

<script>
import handlesMedia from '~/mixins/shop/handlesMedia';
export default {
  mixins: [ handlesMedia ],
  data() {
    return {
      partnerSponsors: [],
      items: [
        { text: 'Partner Sponsor' },
        { text: 'Partner Sponsor' },
        { text: 'Partner Sponsor' },
        { text: 'Partner Sponsor' },
        { text: 'Partner Sponsor' },
        { text: 'Partner Sponsor' },
        { text: 'Partner Sponsor' },
      ],
    };
  },
  created() {
    this.retrieveSponsors()
  },
  methods: {
    retrieveSponsors() {
      const query = { q: this.query };

      // Sanitize and remove null values
      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })
      const queryString = new URLSearchParams(query).toString()
      this.$axios
        .$get(`v1/partnersponsors?${queryString}`)
        .then((response) => {
          this.partnerSponsors = response.data.partnerSponsors
        })
    },
  }
};
</script>
