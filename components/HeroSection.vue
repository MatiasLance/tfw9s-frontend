<template>
  <section class="mx-auto max-w-screen-xl gap-6 p-4 sm:p-8">
    <div class="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
      <!-- Content Section -->
      <div class="relative col-span-1 w-full p-4 lg:p-6" data-aos="fade-right">
        <!-- Rugby Badge -->
        <div class="mb-6 flex items-center gap-3">
          <div class="bg-green-600 rounded-full p-2 shadow-lg">
            <i class="ri-team-line text-gray-50 text-xl"></i>
          </div>
          <span class="text-sm font-semibold uppercase tracking-wide text-green-600">
            Rugby League
          </span>
        </div>

        <!-- Main Headline -->
        <h1 class="font-montserrat mb-6 bg-gradient-to-r from-green-500 
                   via-green-600 to-gray-900 bg-clip-text text-4xl 
                   font-bold leading-tight text-transparent sm:text-5xl 
                   xl:text-6xl">
          {{ headline }}
        </h1>

        <!-- Content Blurb -->
        <div class="mb-8">
          <span
            class="text-justify text-base leading-relaxed text-white 
                   md:text-lg"
            v-html="blurb"
          ></span>
        </div>

        <!-- Call to Action Buttons -->
        <div v-show="!isAdmin" class="flex flex-wrap gap-4">
          <NuxtLink to="/tournaments">
            <button
              type="button"
              class="bg-green-600 hover:bg-green-700 text-gray-50 
                     font-bold py-4 px-8 rounded-xl uppercase transition-all 
                     duration-300 transform hover:scale-105 border-2 
                     border-green-500 flex items-center gap-2"
            >
              <i class="ri-trophy-line"></i>
              {{ cta }}
            </button>
          </NuxtLink>
          
          <NuxtLink to="/shop">
            <button
              type="button"
              class="bg-gradient-to-r from-green-500 to-green-600 
                     hover:from-green-600 hover:to-green-700 text-gray-50 
                     font-bold py-4 px-8 rounded-xl uppercase transition-all 
                     duration-300 transform hover:scale-105 border-2 
                     border-green-400 flex items-center gap-2 shadow-lg 
                     hover:shadow-xl"
            >
              <i class="ri-shopping-bag-line"></i>
              Shop Merch
            </button>
          </NuxtLink>
        </div>
      </div>

      <!-- Image Section -->
      <div class="relative col-span-1 w-full" data-aos="fade-up">
        <!-- TFW Logo - Floating Above Everything -->
        <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 z-30">
          <div class="bg-gradient-to-r from-green-600 to-green-800 
                      rounded-2xl p-4 shadow-2xl border-2 border-yellow-400">
            <img
              src="~/assets/images/tfw9s.png"
              class="h-20 w-20 object-contain"
              alt="TFW Rugby"
            />
          </div>
        </div>

        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br 
            from-gray-900 to-green-900 p-8 pt-12 shadow-2xl 
            border-2 border-green-500/40 mt-8">

          <!-- Fireworks Canvas -->
          <canvas
          v-if="image.length > 0"
            ref="fireworksCanvas"
            class="absolute inset-0 z-30 pointer-events-none"
          ></canvas>

          <div v-if="image.length > 0" class="trophy-wrapper">
            <div class="trophy">
              <div class="trophy-cup"></div>
              <div class="trophy-text">
                TFW9S
              </div>
              <div class="trophy-base"></div>
            </div>
          </div>

          <!-- Main Image -->
          <div class="relative z-10">
            <img
              :src="getMediaURL(image[0])"
              loading="lazy"
              class="h-auto w-full object-cover transition-transform
                    duration-500 hover:scale-105"
              alt="Rugby Action"
            />
          </div>

          <!-- Rugby Badge -->
          <div class="absolute -bottom-3 -right-3 z-20">
            <div class="bg-yellow-400 text-gray-900 rounded-full p-4 
                        shadow-2xl rotate-12 animate-bounce">
              <i class="ri-football-line text-2xl font-bold"></i>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
import handlesMedia from '~/mixins/shop/handlesMedia'

export default {
  mixins: [ handlesMedia ],
  props: {
    blurb: {
      type: String,
      required: false
    },
    isAdmin: {
      type: Boolean,
      required: false
    },
    image: {
      type: [
        String,
        Object,
        Array
      ],
      required: false
    }
  },
  data() {
    return {
      headline: 'TFW9’s',
      cta: 'Register Now'
    };
  },

  mounted() {
    this.$nextTick(() => {
      setInterval(() => {
        this.launchFireworks()
      }, 500)
    })
  },

  methods: {
    launchFireworks() {
      const canvas = this.$refs.fireworksCanvas
      if (!canvas) {
        return
      }
      const ctx = canvas.getContext('2d')

      const resize = () => {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }

      resize()
      window.addEventListener('resize', resize)

      const fireworks = []
      const particles = []

      class Firework {
        constructor(x, y) {
          this.x = x
          this.y = canvas.height
          this.targetY = y
          this.speed = 20
        }

        update() {
          this.y -= this.speed
          if (this.y <= this.targetY) {
            explode(this.x, this.y)
            return false
          }
          return true
        }

        draw() {
          ctx.fillStyle = '#facc15'
          ctx.fillRect(this.x, this.y, 2, 8)
        }
      }

      class Particle {
        constructor(x, y) {
          this.x = x
          this.y = y
          this.angle = Math.random() * Math.PI * 2
          this.speed = Math.random() * 4 + 2
          this.alpha = 1
        }

        update() {
          this.x += Math.cos(this.angle) * this.speed
          this.y += Math.sin(this.angle) * this.speed
          this.alpha -= 0.02
          return this.alpha > 0
        }

        draw() {
          ctx.fillStyle = `rgba(250, 204, 21, ${this.alpha})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      const explode = (x, y) => {
        for (let i = 0; i < 30; i++) {
          particles.push(new Particle(x, y))
        }
      }

      const launch = () => {
        fireworks.push(
          new Firework(
            Math.random() * canvas.width,
            Math.random() * canvas.height * 0.5
          )
        )
      }

      let frames = 0
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        fireworks.forEach((f, i) => {
          if (!f.update()) fireworks.splice(i, 1)
          else f.draw()
        })

        particles.forEach((p, i) => {
          if (!p.update()) particles.splice(i, 1)
          else p.draw()
        })

        frames++
        if (frames < 180) requestAnimationFrame(animate)
        else cleanup()
      }

      const cleanup = () => {
        window.removeEventListener('resize', resize)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      // Launch sequence
      for (let i = 0; i < 6; i++) {
        setTimeout(launch, i * 400)
      }

      animate()
    }
  }

}
</script>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.trophy-wrapper {
  position: absolute;
  inset: 0;
  z-index: 25;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.trophy {
  animation: trophyZoom 2.8s ease-in-out infinite;
  transform-origin: center;
  text-align: center;
}

/* Trophy Cup */
.trophy-cup {
  width: 120px;
  height: 90px;
  background: linear-gradient(135deg, #facc15, #f59e0b);
  border-radius: 0 0 60px 60px;
  position: relative;
  box-shadow: 0 0 25px rgba(250, 204, 21, 0.6);
}

/* Trophy Handles */
.trophy-cup::before,
.trophy-cup::after {
  content: '';
  position: absolute;
  width: 35px;
  height: 50px;
  border: 6px solid #facc15;
  top: 15px;
  border-radius: 50%;
}

.trophy-cup::before {
  left: -35px;
}

.trophy-cup::after {
  right: -35px;
}

/* Trophy Text */
.trophy-text {
  margin-top: -32px;
  font-weight: 900;
  font-size: 1.25rem;
  letter-spacing: 0.12em;
  color: #14532d;
  background: #fde047;
  padding: 6px 14px;
  border-radius: 999px;
  display: inline-block;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

/* Trophy Base */
.trophy-base {
  width: 90px;
  height: 20px;
  background: #78350f;
  margin: 10px auto 0;
  border-radius: 6px;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3);
}

/* Zoom In / Zoom Out Animation */
@keyframes trophyZoom {
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  20% {
    transform: scale(1.05);
    opacity: 1;
  }
  50% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(0.6);
    opacity: 0;
  }
}
</style>