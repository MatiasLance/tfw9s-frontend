export default {
  data() {
    return {
      RegionList: [],
      isRegionsLoading: true
    }
  },
  methods: {
    retrieveRegions() {
      this.isRegionsLoading = true;
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
        .$get(`v1/regions/all?${queryString}`)
        .then((response) => {
          this.RegionList= response.data.regions;
        })
        .catch((error) => {
          const errorMessage = error.response.data.message || 'Failed to retrieve regions.';
          this.$oruga.notification.open({
            duration: 5000,
            message: errorMessage,
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
        .finally(() => {
          this.isRegionsLoading = false;
        })
    },
  },
}
