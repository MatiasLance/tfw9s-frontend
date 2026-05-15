<template>
  <div class="login-page">
    <!-- Animated background layer -->
    <div class="background-layer">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="grid-pattern"></div>
    </div>

    <!-- Centred login card -->
    <div class="login-card-wrapper">
      <div class="login-card" ref="loginCard">
        <!-- Your existing LoginSection component -->
        <LoginSection />
      </div>
    </div>
  </div>
</template>

<script>
import LoginSection from '../components/LoginSection.vue'

export default {
  name: 'login',
  components: { LoginSection },
  mounted() {
    // Trigger entrance animation after mount
    this.$nextTick(() => {
      this.$refs.loginCard.classList.add('visible')
    })
  }
}
</script>

<style scoped>
/* ========== LAYOUT ========== */
.login-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #111827; /* fallback */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* ========== ANIMATED BACKGROUND ========== */
.background-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
}

/* Grid pattern – gives a sporty “field” texture */
.grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.4;
}

/* Large floating orbs – green accent from your brand */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  will-change: transform;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: #22c55e;
  top: -10%;
  left: -15%;
  animation-name: float1;
  animation-duration: 18s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: #16a34a;
  bottom: -10%;
  right: -10%;
  animation-name: float2;
  animation-duration: 22s;
}

@keyframes float1 {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(40px, 30px) scale(1.1); }
  100% { transform: translate(-20px, -20px) scale(0.95); }
}

@keyframes float2 {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(-30px, -40px) scale(1.15); }
  100% { transform: translate(30px, 20px) scale(0.9); }
}

/* ========== LOGIN CARD ========== */
.login-card-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 28rem; /* 448px – comfortable for a login form */
  padding: 0 1rem;
}

.login-card {
  width: 100%;
  background: rgba(17, 24, 39, 0.7); /* dark glass */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  
  /* Entrance animation */
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.login-card.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Optional: subtle hover lift effect */
.login-card:hover {
  box-shadow: 0 30px 60px -12px rgba(34, 197, 94, 0.15);
}
</style>