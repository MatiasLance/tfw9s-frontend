<template>
  <section class="mx-auto max-w-screen-xl gap-4 p-7">
    <div
    class="grid grid-cols-1 gap-4 sm:grid-cols-2
    md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
      <div
      v-for="(item) in partnerSponsors"
      :key="item.id" class="flex h-72 flex-col items-center
      justify-center rounded-lg text-white brightness-50
      hover:brightness-100"
      data-aos="fade-up"
      >
        <div class="w-full overflow-hidden h-64">
          <img
          :src="getMediaURL(item.media[0])"
          alt="Sponsor Image"
          class="w-full h-full object-contain transition-all
            group-hover:scale-110"
          >
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold line-clamp-1">
            {{ item.company_name }}
          </p>
        </div>
      </div>
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
        .finally(() => {
          console.log(this.partnerSponsors)
        });
    },
  }
};
</script>
