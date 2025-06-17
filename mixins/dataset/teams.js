export default {
  data() {
    return {
      TeamList: [],
      isTeamsLoading: true
    }
  },
  methods: {
    retrieveTeams() {
      this.isTeamsLoading = true;
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
        .$get(`v1/teams?${queryString}`)
        .then((response) => {
          this.TeamList= response.data.teams;
        })
        .catch((error) => {
          const errorMessage = error.response.data.message || 'Failed to retrieve teams.';
          this.$oruga.notification.open({
            duration: 5000,
            message: errorMessage,
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
        .finally(() => {
          this.isTeamsLoading = false;
        })
    },
  },
}
