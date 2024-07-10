<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <div class="w-screen min-h-screen bg-[#1A1A1B]">
  <div class="max-w-full overflow-hidden">
    <HeroSection
      :blurb="contentData.content"
      :image='contentData.image'
    />
    <Partnersponsor/>
  </div>
</div>
</template>

<script>
import HeroSection from '~/components/HeroSection'
import aosMixin from '@/mixins/aos';

export default {
  name: 'index',
  components: { HeroSection },
  mixins: [ aosMixin ],
  data() {
    return {
      showSections: {
        homeSlider: false,
        brands: false,
        featured: false,
        review: false,
        beforeFooter: true
      },
      contentData: {
        image: [],
        content: '<p></p>'
      },
    };
  },
  head() {
    return {
      title: 'Home - TFW Rugby League',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
      keywords: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '',
        },
      ],
    };
  },
  created() {
    this.retrieveHomePageInfo()
  },
  methods: {
    retrieveHomePageInfo() {
      const id = 1;

      this.$axios
        .$get(`v1/homepageinfo/${id}`)
        .then((response) => {
          this.contentData.content = response.data.teamFolder.blurb
          this.contentData.image = response.data.teamFolder.media
        })
    },
  },
};
</script>
