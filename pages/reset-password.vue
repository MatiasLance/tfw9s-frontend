<template>
  <div>
    <section class="relative min-h-[97vh] w-full bg-brand-slate bg-cover py-10">
      <div class="container mx-auto max-w-screen-md px-4">

        <div class="mx-auto mt-10 mb-20 rounded bg-white p-4 shadow-lg md:p-7">
          <form @submit.prevent="resetPassword">
            <h2 class="mb-5 text-4xl font-bold">
              Reset Password
            </h2>
            <small class="mb-11 block">
              User Account: <b>{{ email }}</b>
            </small>
            <div class="mb-4">
              <label class="mb-1 block"> New Password </label>
              <input
                v-model="password"
                class="
                  w-full
                  appearance-none
                  border border-transparent
                  bg-gray-200
                  py-4
                  px-5
                  text-base
                  hover:border-gray-400
                  focus:border-gray-500 focus:outline-none focus:ring-0
                "
                type="password"
                required
              />
            </div>
            <div class="mb-4">
              <label class="mb-1 block"> Confirm Password </label>
              <input
                v-model="confirmPassword"
                class="
                  w-full
                  appearance-none
                  border border-transparent
                  bg-gray-200
                  py-4
                  px-5
                  text-base
                  hover:border-gray-400
                  focus:border-gray-500 focus:outline-none focus:ring-0
                "
                type="password"
                required
              />
            </div>

            <button
              type="submit"
              class="
                my-2
                inline-block
                w-full
                border border-transparent
                bg-brand-black
                py-3
                px-5
                text-center
                font-bold
                text-white
                hover:bg-brand-dblue
              "
            >
              Reset new password
            </button>
          </form>
        </div>
        <!--  COMPONENT: RESET Password //END -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'reset-password',
  data() {
    return {
      email: this.$route.query.email,
      password: '',
      confirmPassword: '',
      token: this.$route.query.token,
      isPasswordRevealed: false,
      isPasswordReset: false,
    };
  },
  head() {
    return { title: 'Reset Password - Drum HQ' };
  },
  methods: {
    resetPassword() {
      if (!this.isFormEmpty()) {
        if (!this.areBothPasswordsEqual()) {
          this.$oruga.notification.open({
            message: 'Passwords do not match',
            variant: 'danger',
            duration: 5000,
            position: 'bottom',
            queue: true,
          });
        } else {
          this.$axios
            .$post('v1/auth/reset-password', {
              email: this.email,
              password: this.password,
              // eslint-disable-next-line camelcase
              password_confirmation: this.confirmPassword,
              token: this.token,
            })
            .then((response) => {
              this.isPasswordReset = true;
              this.showResetStatus(this.isPasswordReset);
            })
            .catch(() => {
              this.isPasswordReset = false;
              this.showResetStatus(this.isPasswordReset);
            });
        }
      } else {
        this.$oruga.notification.open({
          message: 'Password field/s must not be empty',
          variant: 'info',
          duration: 5000,
          position: 'bottom',
          queue: true,
        });
      }
    },
    showResetStatus(v) {
      if (v) {
        this.$oruga.notification.open({
          message: 'Your password has been reset successfully',
          variant: 'success',
          duration: 5000,
          position: 'bottom',
          queue: true,
        });
        setTimeout(() => {
          this.$router.push('/login');
        }, 3000);
      } else {
        this.$oruga.notification.open({
          message: 'Password cannot be reset, errors found',
          variant: 'danger',
          duration: 5000,
          position: 'bottom',
          queue: true,
        });
      }
    },
    isFormEmpty() {
      return (
        this.password === '' ||
        typeof this.password === 'undefined' ||
        this.confirmPassword === '' ||
        typeof this.confirmPassword === 'undefined'
      );
    },
    areBothPasswordsEqual() {
      return (
        this.password === this.confirmPassword
      );
    },
  },
};
</script>

<style>
.o-notification--success {
  background-color: #4cbe5c !important;
}
.o-notification--danger {
  background-color: #1a1d18 !important;
}
</style>