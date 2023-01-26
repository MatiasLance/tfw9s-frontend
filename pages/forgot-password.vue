<template>
  <div>
    <section class="relative min-h-[97vh] w-full bg-brand-slate bg-cover py-10">
      <div class="container mx-auto max-w-screen-md px-4">

        <div class="mx-auto mt-10 mb-20 rounded bg-white p-4 shadow-lg md:p-7">
          <form @submit.prevent="sendPasswordLink">
            <h2 class="mb-5 text-4xl font-bold">
              Forgot Password
            </h2>

            <div class="mb-4">
              <label class="mb-1 block"> Enter your email address </label>
              <input
                v-model="email"
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
                type="email"
                placeholder="email@example.com"
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
              Request new password
            </button>
          </form>
        </div>
        <!--  COMPONENT: Forgot Password //END -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'forgot-password',
  data() {
    return { email: '' };
  },
  head() {
    return { title: 'Forgot Password - Drum HQ' };
  },
  methods: {
    sendPasswordLink() {
      if (!this.isFormEmpty()) {
        this.$axios
          .$post('v1/auth/forgot-password', { email: this.email })
          .then((response) => {
            this.$oruga.notification.open({
              message: response.detail,
              variant: 'success',
              duration: 5000,
              position: 'bottom',
              queue: true,
            });
          })
          .catch(() => {
            this.$oruga.notification.open({
              message: 'Errors found',
              variant: 'danger',
              duration: 5000,
              position: 'bottom',
              queue: true,
            });
          });
      } else {
        this.$oruga.notification.open({
          message: 'Email field must not be empty',
          variant: 'info',
          duration: 5000,
          position: 'bottom',
          queue: true,
        });
      }
    },
    isFormEmpty() {
      return this.email === '' || typeof this.email === 'undefined';
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