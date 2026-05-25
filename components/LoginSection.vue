<template>
  <div class="login-section">
    <div class="login-header">
      <span class="login-emoji">🏉</span>
      <h2 class="login-title">Welcome Back</h2>
      <p class="login-subtitle">Sign in to your rugby hub</p>
    </div>

    <form @submit.prevent="authenticate" class="login-form">
      <div class="input-group">
        <div class="input-icon">
          <i class="ri-mail-line ri-lg"></i>
        </div>
        <input
          v-model="email"
          type="email"
          placeholder="email@example.com"
          required
          class="input-field"
          @keyup.enter="authenticate"
        />
      </div>

      <div class="input-group">
        <div class="input-icon">
          <i class="ri-lock-2-line ri-lg"></i>
        </div>
        <input
          v-model="password"
          :type="passwordFieldType"
          placeholder="Password"
          required
          class="input-field"
        />
        <button
          type="button"
          class="password-toggle"
          @click="isPasswordRevealed = !isPasswordRevealed"
          :aria-label="isPasswordRevealed ? 'Hide password' : 'Show password'"
        >
          <i :class="isPasswordRevealed ? 'ri-eye-2-line' : 'ri-eye-close-line'" class="ri-lg"></i>
        </button>
      </div>

      <button type="submit" class="submit-btn">
        <span>Log In</span>
        <i class="ri-arrow-right-line ri-lg ml-2"></i>
      </button>

      <p class="forgot-password underline-offset-8">
        <NuxtLink to="/forgot-password" class="forgot-link">
          Lost your password?
        </NuxtLink>
      </p>
    </form>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css'

export default {
  data() {
    return {
      email: '',
      password: '',
      isPasswordRevealed: false,
    }
  },
  computed: {
    passwordFieldType() {
      return this.isPasswordRevealed ? 'text' : 'password'
    },
  },
  methods: {
    authenticate(e) {
      e.preventDefault()
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
                  })
                  this.$store.dispatch('auth/setUser', response.data)
                  switch (response.data.roles) {
                    case 'superadmin':
                    case 'admin':
                      this.$router.push('/admin')
                      break
                    case 'manager':
                      this.$router.push('/manage')
                      break
                    default:
                      this.$router.push('/')
                  }
                } else {
                  this.$oruga.notification.open({
                    duration: 5000,
                    message: response.title,
                    position: 'bottom',
                    variant: 'danger',
                    queue: true,
                  })
                }
              })
              .catch((err) => {
                const errorDetail = err.response.data
                this.$oruga.notification.open({
                  duration: 5000,
                  message: `${errorDetail.title} - ${errorDetail.data}`,
                  position: 'bottom',
                  variant: 'danger',
                  queue: true,
                })
              })
          })
          .catch((err) => {
            const errorDetail = err.message
            this.$oruga.notification.open({
              duration: 5000,
              message: errorDetail,
              position: 'bottom',
              variant: 'danger',
              queue: true,
            })
          })
      } else {
        this.$oruga.notification.open({
          message: 'Email or password field must not be empty',
          variant: 'info',
          duration: 5000,
          position: 'bottom',
          queue: true,
        })
      }
    },
    isFormEmpty() {
      return (
        this.email === '' ||
        typeof this.email === 'undefined' ||
        this.password === '' ||
        typeof this.password === 'undefined'
      )
    },
  },
}
</script>

<style scoped>
.login-section {
  width: 100%;
  text-align: center;
  font-family: system-ui, -apple-system, sans-serif;
}

.login-header {
  margin-bottom: 2rem;
}

.login-emoji {
  font-size: 2.8rem;
  display: block;
  margin-bottom: 0.5rem;
  animation: gentle-bounce 2s ease-in-out infinite;
}

.login-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
}

.login-subtitle {
  font-size: 0.95rem;
  color: #a1a1aa;
  margin-top: 0.25rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #9ca3af;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.input-field {
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 2.75rem;
  background: rgba(17, 24, 39, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  color: #ffffff;
  font-size: 0.95rem;
  transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
  outline: none;
}

.input-field::placeholder {
  color: #6b7280;
}

.input-field:focus {
  border-color: #22c55e;
  background: rgba(17, 24, 39, 0.8);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
}

.password-toggle {
  position: absolute;
  right: 0.5rem;
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.password-toggle:hover {
  color: #22c55e;
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

.forgot-password {
  text-align: center;
  margin-top: 0.25rem;
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

@keyframes gentle-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@media (max-width: 480px) {
  .login-title {
    font-size: 1.5rem;
  }
  .input-field {
    padding-left: 2.5rem;
  }
}
</style>