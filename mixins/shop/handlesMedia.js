export default {
  methods: {
    getMediaURL(media) {
      if (media && media.path) {
        return `${this.$config.baseURL}/storage/${media.path}`
      } else {
        return require('~/assets/images/products/straddieworld_item_placeholder_thumbnail.png')
      }
    },
  },
}