export default {
  methods: {
    getMediaURL(media) {
      if (media && media.path) {
        const url = `${this.$config.baseURL}/storage/${media.path}`
        const http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send()
        if (http.status !== 404) {
          return url
        } else {
          return `
          ${this.$config.baseURL}/img/brand_item_placeholder_thumbnail.jpeg
          `
        }
      } else {
        return require('~/assets/images/products/brand_item_placeholder_thumbnail.png')
      }
    },
  },
}