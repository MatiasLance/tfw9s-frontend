<template>
  <div>
    <div
      id="sky"
      class="fixed top-0 z-50 flex
      h-screen w-screen
      items-center justify-center"
    >
      <div
        class="hidden
        h-screen w-screen
        flex-col items-center justify-center
        bg-gradient-to-r from-slate-100 to-slate-100 text-black md:flex"
      >

      <template v-if="error.statusCode === 404">
        <h2
        class="z-50 block space-y-5 text-9xl font-bold text-black"
        >
          <span class="font-montserrat">{{ error.statusCode }}</span>
        </h2>
        <div class="my-5 pb-4">
          <span
          class="superheadline text-xl font-medium
          text-black"
        >
              We can't find the page you're looking for.
          </span>
        </div>
      </template>
      <template v-else>
        <h2
        class="font-montserrat z-50 block space-y-5 text-6xl
        font-bold text-black"
        >
          <span class="font-montserrat">
           {{ error.statusCode }}.
          </span>
        </h2>
        <div class="my-5 pb-4">
          <span
          class="superheadline text-xl font-medium
          text-black"
        >
              Oops! Something went wrong. Please try again later.
          </span>
        </div>
      </template>
        <div class="mt-[2em] text-2xl">
          <BaseButton
              class="max-w-full border border-[#1a1d18]
              bg-gradient-to-r from-[#1a1d18]
              to-slate-700 py-[1.25em] px-[1.563em]
              font-bold uppercase text-white"
              @click="goBack()"
            >
              Return
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '../components/base/BaseButton.vue'
export default {
  components: { BaseButton },
  layout: 'error',
  props: {
    error: {
      type: Object,
      default() {
        return { statusCode: 404 };
      }
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style>
.font-montserrat {
    font-family: "Montserrat", Arial, Helvetica, sans-serif;
}
.space img {
  -webkit-animation: mover 2s ease-in-out infinite alternate;
  animation: mover 2s ease-in-out infinite alternate;
}

@-webkit-keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-30px);
  }
}
@keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-30px);
  }
}

#sky {
  height: 100%;
  width: 100vw;
  background: radial-gradient(ellipse at bottom, #e2e8f0 0%, #f8fafc 100%);
  overflow: hidden;
  padding: 10% 0;
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}
</style>