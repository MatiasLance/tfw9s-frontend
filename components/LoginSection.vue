<template>
  <!--  COMPONENT: LOGIN -->
  <div class="mx-auto mt-10 mb-20 rounded bg-white p-4 shadow-lg md:p-7">
    <form action="">
      <h2 class="mb-5 text-4xl font-bold">
        Login
      </h2>

      <div class="mb-4">
        <label class="mb-1 block"> Username or email address </label>
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
          @keyup.enter="authenticate"
        />
      </div>

      <div class="mb-4">
        <label class="mb-1 block"> Password </label>
        <div
          class="
            flex items-center justify-between
            bg-gray-200
          "
        >
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
            :type="passwordFieldType"
            placeholder=""
            required
            @keyup.enter="authenticate"
          />
          <span
            class="
              flex
              h-12 w-12
              cursor-pointer items-center
              justify-center
              text-gray-400
              hover:text-gray-700
            "
            @click="isPasswordRevealed = !isPasswordRevealed"
          >
            <template v-if="isPasswordRevealed">
              <i class="ri-eye-off-line ri-xl"></i>
            </template>
            <template v-else>
              <i class="ri-eye-line ri-xl"></i>
            </template>
          </span>
        </div>
      </div>

      <label class="mb-5 flex w-max items-center">
        <input
          checked
          name=""
          type="checkbox"
          class="
            h-5
            w-5
            cursor-pointer
            rounded-full
            border-[3px] border-gray-300
            bg-transparent
            text-swd-blue
            hover:border-gray-700
            focus:border-transparent
            focus:bg-gray-200
            focus:ring-1
            focus:ring-gray-500
            focus:ring-offset-2
          "
        />
        <span class="ml-2 inline-block text-gray-500"> Remember me </span>
      </label>
      <button
        type="submit"
        class="
          my-2
          inline-block
          w-full
          border border-transparent
          bg-swd-blue
          py-3
          px-5
          text-center
          font-bold
          text-white
          hover:bg-swd-grey
        "
        @click="authenticate"
      >
        Log in
      </button>
      <p class="mt-5 text-center font-semibold">
        <a
          class="text-swd-blue hover:underline hover:decoration-swd-blue"
          href="/forgot-password"
        >
          Lost your password ?
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
                  this.$router.push('/admin');
                } else {
                  this.$oruga.notification.open({
                    duration: 5000,
                    message: response.title,
                    position: 'bottom',
                    variant: 'danger',
                    closable: true,
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
                  closable: true,
                  queue: true,
                });
              });
          })
          .catch((err) => {
            const errorDetail = err.response.data;
            this.$oruga.notification.open({
              duration: 5000,
              message: `${errorDetail.title} - ${errorDetail.data}`,
              position: 'bottom',
              variant: 'danger',
              closable: true,
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
  background-color: #3981da !important;
}
</style>