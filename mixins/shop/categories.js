export default {
  computed: {
    categories: {
      get() {
        return this.$store.state.shop.categories
      },
      set(value) {
        this.$store.commit('shop/setCategories', value)
      },
    },
  },
  methods: {
    async retrieveCategories() {
      await this.$axios
        .$get('/v1/categories/')
        .then((response) => {
          this.categories = response.data.categories
          this.$store.commit('product/setCategories', response.data.categories)
        })
    },
  },
}