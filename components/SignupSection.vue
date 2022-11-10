<template>
    <div>
        <!--  COMPONENT: SIGN IN -->
        <div
            class="mx-auto mt-10 mb-20 rounded
            bg-white p-4 shadow-lg
            md:p-7"
        >
            <form @submit.prevent="register">
                <h2 class="mb-5 text-4xl font-bold">
                    Sign up
                </h2>

                <div class="grid gap-x-2 md:grid-cols-2">
                    <div class="mb-4">
                        <label class="mb-1 block"> First name </label>
                        <input
                            v-model="firstname"
                            class="
                            w-full appearance-none
                            border border-gray-100 bg-gray-200
                            py-2
                            px-3
                    hover:border-gray-400
                            focus:border-gray-400
                            focus:outline-none"
                            type="text"
                            placeholder="Type here"
                        >
                    </div>

                    <div class="mb-4">
                        <label class="mb-1 block"> Last name </label>
                        <input
                            v-model="lastname"
                            class="w-full appearance-none border
                            border-gray-100 bg-gray-200 py-2
                            px-3
                            hover:border-gray-400
                            focus:border-gray-400
                            focus:outline-none"
                            type="text"
                            placeholder="Type here"
                        >
                    </div>
                </div> <!-- grid -->

                <div class="mb-4">
                    <label class="mb-1 block"> Phone </label>
                    <div class="flex w-full">
                        <input
                            v-model="phone"
                            class="
                            flex-1 appearance-none border
                            border-gray-100 bg-gray-200
                            py-2
                            px-3
                            hover:border-gray-400 focus:border-gray-400
                            focus:outline-none"
                            type="text"
                            placeholder="Type here"
                        >
                    </div>
                </div>

                <div class="mb-4">
                    <label class="mb-1 block"> Email </label>
                    <input
                    v-model="email"
                    class="w-full appearance-none border
                    border-gray-100 bg-gray-200
                    py-2
                    px-3
                    hover:border-gray-400
                    focus:border-gray-400
                    focus:outline-none"
                    type="email"
                    placeholder="Type here"
                    >
                </div>

                <div class="mb-4">
                    <label class="mb-1 block"> Create password </label>
                    <input
                    v-model="password"
                    class="w-full appearance-none
                    border border-gray-100 bg-gray-200
                    py-2
                    px-3 hover:border-gray-400
                    focus:border-gray-400 focus:outline-none"
                    type="password"
                    placeholder="Type here"
                    >
                </div>

                <button
                type="submit"
                class="my-2 inline-block w-full border border-transparent
                bg-brand-black py-3 px-5
                text-center font-bold
                text-white hover:bg-brand-grey"
                >
                 Register
                </button>

                <label class="my-4 flex w-max items-center">
                    <input
                    v-model="isTerms"
                    name=""
                    type="checkbox"
                    class="
                    h-5
                    w-5
                    cursor-pointer
                    rounded-full
                    border-[3px]
                    border-gray-300
                    bg-transparent
                    text-brand-black
                    hover:border-gray-700
                    focus:border-transparent focus:bg-gray-200
                    focus:ring-1 focus:ring-gray-500 focus:ring-offset-2
                    "
                    >
                    <span class="ml-2 inline-block">
                        I agree with <a
                        class="decoration-none hover:text-brand-black
                        hover:underline"
                        href="/terms"
                        target="_blank"
                        >Terms and Conditions</a>
                    </span>
                </label>

                <hr>

                <p class="mt-5 text-center">
                    Already have an account?
                    <a class="text-brand-black" href="/login">Login</a>
                </p>
            </form>
        </div>
        <!--  COMPONENT: SIGN IN //END -->
    </div>
</template>

<script>
export default {
  name: 'SignupSection',
  data() {
    return {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      password: '',
      isTerms: false
    }
  },
  methods: {
    register() {
      if (this.validateForm()) {
        const form = new FormData();
        form.append('firstName', this.firstname);
        form.append('lastName', this.lastname);
        form.append('phone', this.phone);
        form.append('email', this.email);
        form.append('password', this.password);

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        this.$axios
          .$post('/v1/users/sign-up', form, config)
          .then((response) => {
            this.$oruga.notification.open({
              message: response.title,
              variant: 'success',
              duration: 5000,
              position: 'bottom-right'
            })
            this.$router.push({ path: '/login' });
          })
          .catch((err) => {
            const errorDetail = err.response.detail;

            this.$oruga.notification.open({
              message: errorDetail,
              variant: 'danger',
              duration: 3000,
              position: 'bottom-right'
            })
          })
      }
    },
    validateForm() {
      if (
        this.firstname === '' ||
            typeof this.firstname === 'undefined'
      ) {
        this.$oruga.notification.open({
          message: 'firstname must not be empty',
          variant: 'info',
          duration: 5000,
          position: 'bottom-right'
        })
        return false;
      }

      if (
        this.lastname === '' ||
            typeof this.lastname === 'undefined'
      ) {
        this.$oruga.notification.open({
          message: 'lastname must not be empty',
          variant: 'info',
          duration: 5000,
          position: 'bottom-right'
        })
        return false;
      }

      if (
        this.phone === '' ||
            typeof this.phone === 'undefined'
      ) {
        this.$oruga.notification.open({
          message: 'phone must not be empty',
          variant: 'info',
          duration: 5000,
          position: 'bottom-right'
        })
        return false;
      }
      if (
        this.email === '' ||
        typeof this.email === 'undefined'
      ) {
        this.$oruga.notification.open({
          message: 'email must not be empty',
          variant: 'info',
          duration: 5000,
          position: 'bottom-right'
        })
        return false;
      }
      if (
        this.password === '' ||
        typeof this.password === 'undefined'
      ) {
        this.$oruga.notification.open({
          message: 'Please enter a password, must not be empty',
          variant: 'info',
          duration: 5000,
          position: 'bottom-right'
        })
        return false;
      }

      return true;
    }

  }
}
</script>

<style>
.o-notification--success {
  background-color: #4cbe5c !important;
}
.o-notification--danger {
  background-color: #3981da !important;
}
</style>