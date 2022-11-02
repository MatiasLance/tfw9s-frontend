export default {
  methods: {
    logout() {
      this.$oruga.notification.open({
        message: 'Logging out...',
        rootClass: 'toast-notification',
        position: 'bottom',
        queue: true
      })
      this.$axios
        .$post('v1/auth/logout')
        .then(() => {
          this.$store.dispatch('auth/clearUser')
          this.$oruga.notification.open({
            message: 'Logged out successfully',
            variant: 'success',
            position: 'bottom',
            duration: 5000,
            queue: true
          })
          this.$router.push('/login')
        })
    }
  }
}