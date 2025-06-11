export default {
  data() {
    return {
      FieldList: [],
      isFieldsLoading: true
    }
  },
  methods: {
    retrieveFields() {
      this.isFieldsLoading = true;
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
        .$get(`v1/fields/all?${queryString}`)
        .then((response) => {
          this.FieldList= response.data.fields;
        })
        .catch((error) => {
          const errorMessage = error.response.data.message || 'Failed to retrieve fields.';
          this.$oruga.notification.open({
            duration: 5000,
            message: errorMessage,
            position: 'bottom',
            variant: 'danger',
            queue: true,
          });
        })
        .finally(() => {
          this.isFieldsLoading = false;
        })
    },
  },
}
