export default {
  data() {
    return { data: null }
  },
  methods: {
    generateRandomString() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        // eslint-disable-next-line max-len, vue/max-len
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      return result;
    },
  },
}
