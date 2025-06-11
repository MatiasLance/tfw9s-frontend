export default {
  data() {
    return {
      AgegroupList: [],
      isAgegroupsLoading: true
    }
  },
  methods: {
    retrieveAgegroups() {
      this.isAgegroupsLoading = true;
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
        .$get(`v1/agegroups?${queryString}`)
        .then((response) => {
          this.AgegroupList= response.data.ageGroups;
        })
        .catch((error) => {
          const errorMessage = error.response.data.message || 'Failed to retrieve agegroups.';
          this.$oruga.notification.open({
            duration: 5000,
            message: errorMessage,
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
        .finally(() => {
          this.isAgegroupsLoading = false;
        })
    },
  },
}
