<template>
  <!--  COMPONENT: LOGIN -->
  <div class="mx-auto mt-20 mb-20 rounded bg-transparent
  p-4 md:p-7 sm:w-[400px]"
  >
    <form action="">

      <div class="mb-2">
        <input
          v-model="email"
          class="
            w-full
            appearance-none
            rounded-lg border
            border-transparent
            bg-brand-black
            py-4
            px-5
            text-base
            text-white
            hover:border-gray-400
            focus:border-gray-500 focus:outline-none focus:ring-0
          "
          type="email"
          placeholder="email@example.com"
          required
          @keyup.enter="authenticate"
        />
      </div>

      <div class="mb-2">
        <div
          class="
            flex items-center justify-between
            rounded-lg
            bg-brand-black
          "
        >
          <input
            v-model="password"
            class="
              form-input
              w-full
              appearance-none
              rounded-lg border
              border-transparent
              bg-transparent
              py-4
              px-5
              text-base
              text-white
              hover:border-gray-400
              focus:border-gray-500 focus:outline-none focus:ring-0
            "
            :type="passwordFieldType"
            placeholder="Password"
            required
          />
          <span
            class="
              flex
              h-12 w-12
              cursor-pointer items-center
              justify-center
              text-gray-400
              hover:text-gray-100
            "
            @click="isPasswordRevealed = !isPasswordRevealed"
          >
            <template v-if="isPasswordRevealed">
              <i class="ri-eye-2-line ri-xl"></i>
            </template>
            <template v-else>
              <i class="ri-eye-close-line ri-xl"></i>
            </template>
          </span>
        </div>
      </div>

      <button
        type="submit"
        class="
          from-40%
          via-95%
          to-100%
          my-2 inline-block
          w-full rounded-lg border
          border-transparent
          bg-gradient-to-br
          from-[#5EE738]
          via-[#3e872a]
          to-[#050505]
          py-3
          px-5
          text-center
          font-bold
          text-white
          hover:bg-brand-grey
        "
        @click="authenticate"
      >
        Log in
      </button>
      <p class="mt-5 text-center font-semibold">
        <a
          class="text-white hover:underline hover:decoration-white"
          href="/forgot-password"
        >
          <span class="text-white">Lost your password ?</span>
        </a>
      </p>
    </form>
  </div>
  <!--  COMPONENT: LOGIN //END -->
</template>

<script>
import 'remixicon/fonts/remixicon.css';
export default {
  data() {
    return {
      email: '',
      password: '',
      isPasswordRevealed: false,
    };
  },
  computed: {
    passwordFieldType() {
      return this.isPasswordRevealed ? 'text' : 'password'
    },
  },
  methods: {
    authenticate(e) {
      e.preventDefault();
      if (!this.isFormEmpty()) {
        this.$axios
          .$get(`${this.$config.baseURL}/sanctum/csrf-cookie`)
          .then(() => {
            this.$axios
              .$post('/v1/auth/login', {
                email: this.email,
                password: this.password,
              })
              .then((response) => {
                if (response.data.isLoggedIn) {
                  this.$oruga.notification.open({
                    message: 'Logged in successfully',
                    variant: 'success',
                    duration: 5000,
                    position: 'bottom',
                    queue: true,
                  });
                  this.$store.dispatch('auth/setUser', response.data);
                  switch (response.data.roles) {
                  case 'superadmin':
                    this.$router.push('/admin');
                    break;
                  case 'admin':
                    this.$router.push('/admin');
                    break;
                  case 'manager':
                    this.$router.push('/manage');
                    break;
                  default:
                    this.$router.push('/');
                  }
                } else {
                  this.$oruga.notification.open({
                    duration: 5000,
                    message: response.title,
                    position: 'bottom',
                    variant: 'danger',
                    queue: true,
                  });
                }
              })
              .catch((err) => {
                const errorDetail = err.response.data;
                this.$oruga.notification.open({
                  duration: 5000,
                  message: `${errorDetail.title} - ${errorDetail.data}`,
                  position: 'bottom',
                  variant: 'danger',
                  queue: true,
                });
              });
          })
          .catch((err) => {
            const errorDetail = err.message;
            this.$oruga.notification.open({
              duration: 5000,
              message: errorDetail,
              position: 'bottom',
              variant: 'danger',
              queue: true,
            });
          });
      } else {
        this.$oruga.notification.open({
          message: 'Email or password field must not be empty',
          variant: 'info',
          duration: 5000,
          position: 'bottom',
          queue: true,
        });
      }
    },
    isFormEmpty() {
      return (
        this.email === '' ||
        typeof this.email === 'undefined' ||
        this.password === '' ||
        typeof this.password === 'undefined'
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