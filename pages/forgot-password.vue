<template>
  <div class="forgot-page">
    <div class="background-layer">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="grid-pattern"></div>
    </div>

    <div class="forgot-card-wrapper">
      <div ref="forgotCard" class="forgot-card">
        <div class="text-center mb-8">
          <span class="block text-5xl mb-3 animate-bounce-slow">🏉</span>
          <h2 class="text-3xl font-bold text-white mb-2">Forgot Password?</h2>
          <p class="text-zinc-400 text-sm">
            Enter your email and we’ll send you a reset link
          </p>
        </div>

        <form @submit.prevent="sendPasswordLink" class="space-y-6">
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              <i class="ri-mail-line ri-lg"></i>
            </div>
            <div class="w-full border border-gray-600 rounded-xl">
              <input
                v-model="email"
                type="email"
                placeholder="email@example.com"
                required
                class="w-full pl-12 pr-5 py-4 rounded-xl
                      bg-gray-900/60 text-white placeholder-zinc-500
                      border border-gray-600
                      focus:border-green-500 focus:ring-2 focus:ring-green-500/20
                      focus:outline-none focus-visible:outline-none
                      transition-all"
                @keyup.enter="sendPasswordLink"
              />
            </div>
          </div>

          <button
            type="submit"
            class="submit-btn"
          >
            <i class="ri-send-plane-fill ri-lg"></i>
            <span>Send Reset Link</span>
          </button>
        </form>

        <p class="forgot-password underline-offset-8">
          <NuxtLink to="/login" class="forgot-link">
            ← Back to Login
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css'

export default {
  name: 'ForgotPassword',
  data() {
    return { email: '' }
  },
  head() {
    return { title: 'Forgot Password - TFW9\'s' }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.forgotCard.classList.add('visible')
    })
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
            })
          })
          .catch((error) => {
            const payload = error.response.data;
            const errorMessage = payload.message;
            const retryAfter = payload.retry_after;
            this.$oruga.notification.open({
              message: `${errorMessage} ${retryAfter} seconds`,
              variant: 'danger',
              duration: 5000,
              position: 'bottom',
              queue: true,
            })
          })
      } else {
        this.$oruga.notification.open({
          message: 'Email field must not be empty',
          variant: 'info',
          duration: 5000,
          position: 'bottom',
          queue: true,
        })
      }
    },
    isFormEmpty() {
      return this.email === '' || typeof this.email === 'undefined'
    },
  },
}
</script>

<style scoped>
.forgot-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.background-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.4;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: #22c55e;
  top: -15%;
  left: -20%;
  animation-name: float1;
  animation-duration: 18s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: #16a34a;
  bottom: -15%;
  right: -15%;
  animation-name: float2;
  animation-duration: 22s;
}

@keyframes float1 {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(50px, 40px) scale(1.1); }
  100% { transform: translate(-20px, -30px) scale(0.95); }
}

@keyframes float2 {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(-40px, -30px) scale(1.15); }
  100% { transform: translate(30px, 20px) scale(0.9); }
}

.forgot-card-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 28rem;
  padding: 0 1rem;
}

.forgot-card {
  background: rgba(17, 24, 39, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.forgot-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.o-notification--success {
  background-color: #4cbe5c !important;
}
.o-notification--danger {
  background-color: #1a1d18 !important;
}

.forgot-password {
  text-align: center;
  margin-top: 1rem;
}

.forgot-link {
  color: #a1a1aa;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s;
  font-weight: 500;
}

.forgot-link:hover {
  color: #22c55e;
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 0.85rem 1.5rem;
  background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
  border: none;
  border-radius: 0.75rem;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
  box-shadow: 0 8px 24px rgba(34, 197, 94, 0.25);
  margin-top: 0.5rem;
}

.submit-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 32px rgba(34, 197, 94, 0.4);
}

.submit-btn:active {
  transform: scale(0.98);
}
</style>