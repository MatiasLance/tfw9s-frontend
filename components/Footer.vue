<template>
  <!-- Footer -->
  <footer class="bt-site-footer relative z-10 my-auto">
    <section class="w-full bg-[#424242] pt-[80px] lg:pt-[120px]">
      <div
        class="
          flex flex-wrap
          items-center justify-around
          gap-12 px-12
        "
      >
        <div class="order-[2] grow sm:order-[1]">
          <div class="mx-auto block w-80 max-w-full px-11 lg:mx-0">
            <NuxtLink to="/" class="py-5">
              <img
                src="~/assets/images/logo_straddie_header.svg"
                class="footer-logo w-full"
              />
            </NuxtLink>
          </div>
          <div
            class="
              mx-auto
              mt-20
              block
              max-w-full
              text-center text-[16px] text-white
              lg:text-start
            "
          >
            &copy; Copyright 2022, Straddie World. | Built by
                <a
                  href="https://pageone247.com/"
                  target="_blank"
                  class="swlink underline hover:text-[#3981da]"
                >
                  PageOne247
                </a>
          </div>
        </div>

        <div class="order-[1] grow sm:order-[2]">
          <ul class="mx-auto text-center">
            <li
              v-for="(link, linkIndex) in links"
              :key="`link-${linkIndex}`"
            >
            <NuxtLink :to="link.to">
              <span
                class="
                  hover:text-primary
                  swlink
                  mb-2
                  inline-block
                  text-center text-lg
                  leading-loose
                  text-white
                  transition
                  duration-300
                  ease-in-out
                  hover:underline
                  hover:decoration-swd-blue
                  hover:decoration-4
                  hover:underline-offset-8
                "
              >
                {{ link.text }}
              </span>
            </NuxtLink>
            </li>
          </ul>
        </div>

      </div>

      <div
        class="
          flex flex-wrap
          items-center justify-center
          py-12 px-4
          text-base
        "
      >
        <NuxtLink to="/privacy-policy">
          <span
            class="
              swlink
              mb-2 px-3
              hover:opacity-[.6]
            "
          >
            Privacy policy
          </span>
        </NuxtLink>
        <NuxtLink to="/terms">
          <span
            class="
              swlink
              mb-2 px-3
              hover:opacity-[.6]
            "
          >
            Terms of service
          </span>
        </NuxtLink>
      </div>
    </section>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          to: '/',
          text: 'Home',
        },
        {
          to: '/shop',
          text: 'Shop',
        },
        {
          to: '/contact-us',
          text: 'Contact Us',
        },
        {
          to: '/admin',
          text: 'Admin',
        },
      ],
    }
  },
}
</script>

<style>
.bt-site-footer {
  position: relative;
}
.swlink {
  color: white !important;
}
.swlink:hover {
  color: #3981da !important;
}
</style>