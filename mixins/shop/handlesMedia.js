export default {
  methods: {
    getMediaURL(media, tab) {
      if (media && media.path) {
        return `${this.$config.baseURL}/storage/${media.path}`
      } else if (typeof media === 'string') {
        return media;
      } else {
        switch (tab) {
        case 'player': return require('~/assets/images/default-avatar.jpg')
        case 'news': return require('~/assets/images/kidsplaying.jpg')
        case 'temp': return require('~/assets/images/kidsplaying.jpg')
        default: return require('~/assets/images/tfw9s.png')
        }
      }
    },
  },
}
