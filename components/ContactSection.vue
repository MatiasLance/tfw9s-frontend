<template>
  <div>
    <form class="my-10 w-full max-w-lg" @submit.prevent="submit">
      <div class="-mx-3 mb-2 flex flex-wrap">
        <div class="mb-2 w-full px-3">
          <label
            class="
              mb-2
              block
              text-sm
              font-bold
              uppercase
              tracking-wide
              text-[#555555]
            "
            for="name"
          >
            Your Name
          </label>
          <input
            id="name"
            v-model="name"
            class="
              mb-2
              block
              w-full
              appearance-none
              border border-gray-100
              bg-gray-200
              py-3
              px-4
              text-base
              hover:border-gray-400
              focus:border-gray-400 focus:outline-none
            "
            type="text"
            placeholder="Name"
          />
        </div>
        <div class="w-full px-3">
          <label
            class="
              mb-2
              block
              text-sm
              font-bold
              uppercase
              tracking-wide
              text-[#555555]
            "
            for="grid-password"
          >
            E-mail
          </label>
          <input
            id="email"
            v-model="email"
            class="
              mb-2
              block
              w-full
              border border-gray-100
              bg-gray-200
              py-3
              px-4
              leading-tight
              text-[#555555]
              hover:border-gray-400
              focus:border-gray-400 focus:outline-none
            "
            type="email"
            placeholder="example@gmail.com"
            required
          />
          <p class="text-sm italic text-gray-600"></p>
        </div>
      </div>
      <div class="-mx-3 mb-2 flex flex-wrap">
        <div class="w-full px-3">
          <label
            class="
              mb-2
              block
              text-sm
              font-bold
              uppercase
              tracking-wide
              text-[#555555]
            "
            for="grid-message"
          >
            Message
          </label>
          <textarea
            id="message"
            v-model="message"
            class="
              mb-2
              block
              h-48
              w-full
              resize-y
              appearance-none
              border border-transparent
              bg-gray-200
              py-3
              px-4
              leading-tight
              text-[#555555]
              focus:outline-none
            "
            required
          ></textarea>
          <p class="text-sm italic text-gray-600"></p>
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3">
          <button
            class="
              focus:shadow-outline
              bg-gradient-to-tr
              from-[#5EE738]
              via-[#3e872a]
              to-[#050505]
              rounded-lg
              py-3
              px-7
              font-bold
              text-white
              shadow
              focus:outline-none
            "
            type="submit"
          >
            Send
          </button>
        </div>
        <div class="md:w-2/3"></div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactSection',
  data() {
    return {
      name: '',
      email: '',
      message: '',
    }
  },
  methods: {
    submit() {
      if (!this.isFormEmpty()) {
        this.$axios
          .$post('/v1/contact/send-message', {
            name: this.name,
            email: this.email,
            message: this.message,
          })
          .then((response) => {
            this.$oruga.notification.open({
              message: 'Your message has been sent',
              variant: 'success',
              duration: 5000,
              position: 'bottom',
              queue: true,
            });
            this.formReset();
          })
          .catch(() => {
            this.$oruga.notification.open({
              message: 'An error occured',
              variant: 'danger',
              duration: 5000,
              position: 'bottom',
              queue: true,
            });
          })
      } else {
        this.$oruga.notification.open({
          message: 'Oops! Please make sure the form is filled up',
          variant: 'info',
          duration: 5000,
          position: 'bottom',
          queue: true
        })
      }
    },
    formReset() {
      this.name = this.email = this.message = '';
    },
    isFormEmpty() {
      return (
        this.name === '' ||
        typeof this.name === 'undefined' ||
        this.email === '' ||
        typeof this.email === 'undefined' ||
        this.message === '' ||
        typeof this.message === 'undefined'
      );
    },
  },
};
</script>