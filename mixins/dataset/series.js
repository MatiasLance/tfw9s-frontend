export default {
  data() {
    return {
      SeriesList: [],
      isSeriessLoading: true
    }
  },
  methods: {
    retrieveSeries() {
      this.isSeriessLoading = true;
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/series?${queryString}`)
        .then((response) => {
          this.SeriesList= response.data.series;
        })
        .catch((error) => {
          const errorMessage = error.response.data.message || 'Failed to retrieve series.';
          this.$oruga.notification.open({
            duration: 5000,
            message: errorMessage,
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
        .finally(() => {
          this.isSeriessLoading = false;
        })
    },
  },
}
