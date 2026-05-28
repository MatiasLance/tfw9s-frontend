<template>
  <div class="error-page">
    <!-- Animated background layer -->
    <div class="background-layer">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="grid-pattern"></div>
    </div>

    <!-- Centered error card -->
    <div class="error-card-wrapper">
      <div ref="errorCard" class="error-card">
        
        <!-- 404: Page Not Found -->
        <template v-if="error.statusCode === 404">
          <span class="block text-6xl md:text-7xl mb-4 animate-bounce-slow">🏉</span>
          <h2 class="error-code text-8xl md:text-9xl">
            404
          </h2>
          <p class="error-message mt-4">
            We can't find the page you're looking for.
          </p>
          <p class="error-subtitle mt-2">
            The ball might have gone into touch. Let's get you back on the field.
          </p>
        </template>

        <!-- Other Errors -->
        <template v-else>
          <span class="block text-6xl md:text-7xl mb-4 animate-pulse-slow">⚠️</span>
          <h2 class="error-code text-7xl md:text-8xl">
            {{ error.statusCode }}
          </h2>
          <p class="error-message mt-4">
            Oops! Something went wrong.
          </p>
          <p class="error-subtitle mt-2">
            The scrum collapsed. Please try again in a moment.
          </p>
        </template>

        <!-- Action Button -->
        <div class="mt-10">
          <button
            type="button"
            class="return-btn group"
            @click="goBack()"
          >
            <i class="ri-arrow-left-line ri-lg transition-transform duration-300 group-hover:-translate-x-1"></i>
            <span>Return to Safety</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css'

export default {
  name: 'ErrorPage',
  layout: 'error',
  props: {
    error: {
      type: Object,
      default() {
        return { statusCode: 404 }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.errorCard) {
        this.$refs.errorCard.classList.add('visible')
      }
    })
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
/* ====== FULL-PAGE LAYOUT ====== */
.error-page {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* ====== ANIMATED BACKGROUND ====== */
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
  filter: blur(90px);
  opacity: 0.15;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.orb-1 {
  width: 700px;
  height: 700px;
  background: #22c55e;
  top: -20%;
  left: -25%;
  animation-name: float1;
  animation-duration: 20s;
}

.orb-2 {
  width: 550px;
  height: 550px;
  background: #16a34a;
  bottom: -20%;
  right: -20%;
  animation-name: float2;
  animation-duration: 24s;
}

@keyframes float1 {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(60px, 50px) scale(1.15); }
  100% { transform: translate(-30px, -40px) scale(0.9); }
}

@keyframes float2 {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(-50px, -40px) scale(1.2); }
  100% { transform: translate(40px, 30px) scale(0.85); }
}

/* ====== GLASS CARD ====== */
.error-card-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 36rem;
  padding: 0 1.5rem;
}

.error-card {
  background: rgba(17, 24, 39, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(34, 197, 94, 0.25);
  border-radius: 2rem;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.6);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.error-card.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ====== ERROR CODE ====== */
.error-code {
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
  font-weight: 800;
  background: linear-gradient(to right, #22c55e, #ffffff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  letter-spacing: -0.02em;
}

/* ====== MESSAGES ====== */
.error-message {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.5;
}

.error-subtitle {
  font-size: 0.95rem;
  color: #a1a1aa;
  line-height: 1.6;
  font-style: italic;
}

/* ====== RETURN BUTTON ====== */
.return-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
  border: none;
  border-radius: 1rem;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(34, 197, 94, 0.3);
}

.return-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 14px 32px rgba(34, 197, 94, 0.5);
}

.return-btn:active {
  transform: scale(0.97);
}

/* ====== ANIMATIONS ====== */
.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
  display: inline-block;
}

.animate-pulse-slow {
  animation: pulse-slow 2.5s ease-in-out infinite;
  display: inline-block;
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.08); }
}

/* ====== RESPONSIVE ====== */
@media (max-width: 640px) {
  .error-card {
    padding: 2rem 1.5rem;
  }
  .error-code {
    font-size: 5rem !important;
  }
  .error-message {
    font-size: 1.1rem;
  }
}
</style>