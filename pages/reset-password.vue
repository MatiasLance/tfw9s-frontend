<template>
  <div class="reset-page">
    <div class="background-layer">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="grid-pattern"></div>
    </div>

    <div class="reset-card-wrapper">
      <div ref="resetCard" class="reset-card">
        <div class="text-center mb-8">
          <span class="block text-5xl mb-3 animate-bounce-slow">🔐</span>
          <h2 class="text-3xl font-bold text-white mb-2">Reset Password</h2>
          <p class="text-zinc-400 text-sm">
            For <span class="text-green-400 font-semibold">{{ email }}</span>
          </p>
        </div>

        <form @submit.prevent="resetPassword" class="space-y-5">
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              <i class="ri-lock-2-line ri-lg"></i>
            </div>
            <div class="w-full border border-gray-600 rounded-xl">
              <input
                v-model="password"
                :type="isResetPasswordRevealed ? 'text' : 'password'"
                placeholder="New password"
                required
                class="w-full pl-12 pr-12 py-4 rounded-xl
                      bg-gray-900/60 text-white placeholder-zinc-500
                      border border-gray-600
                      focus:border-green-500 focus:ring-2 focus:ring-green-500/20
                      focus:outline-none focus-visible:outline-none
                      transition-all"
              />
              <button
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-green-400 transition-colors"
                @click="isResetPasswordRevealed = !isResetPasswordRevealed"
                :aria-label="isResetPasswordRevealed ? 'Hide password' : 'Show password'"
              >
                <i :class="isResetPasswordRevealed ? 'ri-eye-2-line' : 'ri-eye-close-line'" class="ri-lg"></i>
            </button>
            </div>
          </div>

          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              <i class="ri-lock-2-line ri-lg"></i>
            </div>
            <div class="w-full border border-gray-600 rounded-xl">
              <input
                v-model="confirmPassword"
                :type="isConfirmResetPasswordRevealed ? 'text' : 'password'"
                placeholder="Confirm new password"
                required
                class="w-full pl-12 pr-12 py-4 rounded-xl
                      bg-gray-900/60 text-white placeholder-zinc-500
                      border border-gray-600
                      focus:border-green-500 focus:ring-2 focus:ring-green-500/20
                      focus:outline-none focus-visible:outline-none
                      transition-all"
              />
              <button
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-green-400 transition-colors"
                @click="isConfirmResetPasswordRevealed = !isConfirmResetPasswordRevealed"
                :aria-label="isConfirmResetPasswordRevealed ? 'Hide password' : 'Show password'"
              >
                <i :class="isConfirmResetPasswordRevealed ? 'ri-eye-2-line' : 'ri-eye-close-line'" class="ri-lg"></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="submit-btn">
            <i class="ri-shield-check-line ri-lg"></i>
            <span>Set New Password</span>
          </button>
        </form>

        <p class="reset-password underline-offset-8">
          <NuxtLink to="/login" class="reset-link">
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
  name: 'ResetPassword',
  data() {
    return {
      email: this.$route.query.email,
      password: '',
      confirmPassword: '',
      token: this.$route.query.token,
      isResetPasswordRevealed: false,
      isConfirmResetPasswordRevealed: false,
    }
  },
  head() {
    return { title: 'Reset Password - TFW9\'s' }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.resetCard.classList.add('visible')
    })
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
          })
        } else {
          this.$axios
            .$post('v1/auth/reset-password', {
              email: this.email,
              password: this.password,
              password_confirmation: this.confirmPassword,
              token: this.token,
            })
            .then((response) => {
              this.isPasswordReset = true
              this.showResetStatus(this.isPasswordReset)
            })
            .catch(() => {
              this.isPasswordReset = false
              this.showResetStatus(this.isPasswordReset)
            })
        }
      } else {
        this.$oruga.notification.open({
          message: 'Password field/s must not be empty',
          variant: 'info',
          duration: 5000,
          position: 'bottom',
          queue: true,
        })
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
        })
        setTimeout(() => {
          this.$router.push('/login')
        }, 3000)
      } else {
        this.$oruga.notification.open({
          message: 'Password cannot be reset, errors found',
          variant: 'danger',
          duration: 5000,
          position: 'bottom',
          queue: true,
        })
      }
    },
    isFormEmpty() {
      return (
        this.password === '' ||
        typeof this.password === 'undefined' ||
        this.confirmPassword === '' ||
        typeof this.confirmPassword === 'undefined'
      )
    },
    areBothPasswordsEqual() {
      return this.password === this.confirmPassword
    },
  },
}
</script>

<style scoped>
.reset-page {
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

.reset-card-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 28rem;
  padding: 0 1rem;
}

.reset-card {
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

.reset-card.visible {
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

.reset-password {
  text-align: center;
  margin-top: 1rem;
}

.reset-link {
  color: #a1a1aa;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s;
  font-weight: 500;
}

.reset-link:hover {
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