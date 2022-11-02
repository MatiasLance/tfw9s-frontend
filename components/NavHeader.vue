<template>
  <div
    class="ud-header top-0 left-0 z-40 flex w-full items-center bg-transparent"
  >
    <div class="container">
      <div class="relative -mx-4 flex items-center justify-between">
        <div class="w-72 max-w-full px-4">
          <NuxtLink to="/">
            <span class="navbar-logo block w-full py-5">
              <img
                src="~/assets/images/logo_straddie_header.svg"
                alt="logo"
                class="header-logo w-full"
              />
            </span>
          </NuxtLink>
        </div>
        <div class="flex w-full items-center justify-between px-4">
          <div>
            <button
              id="navbarToggler"
              type="button"
              class="
                navbarNavToggle
                ring-primary
                absolute
                top-1/2
                right-4
                block
                -translate-y-1/2
                rounded-lg
                py-[6px]
                px-3
                focus:ring-2
                lg:hidden
              "
              @click="toggle"
            >
              <span
                class="relative my-[6px] block h-[2px] w-[30px] bg-[#181818]"
              ></span>
              <span
                class="relative my-[6px] block h-[2px] w-[30px] bg-[#181818]"
              ></span>
              <span
                class="relative my-[6px] block h-[2px] w-[30px] bg-[#181818]"
              ></span>
            </button>
            <nav
              id="navbarCollapse"
              class="
                absolute
                top-full
                right-4
                hidden
                w-full
                max-w-[250px]
                rounded-lg
                bg-white
                py-5
                shadow-lg
                lg:static
                lg:block
                lg:w-full
                lg:max-w-full
                lg:bg-transparent
                lg:py-0
                lg:px-4
                lg:shadow-none
                xl:px-6
              "
            >
              <ul class="block lg:flex">
                <li
                  v-for="(link, linkIndex) in links"
                  :key="`link-desktop-${linkIndex}`"
                  class="group"
                >
                  <NuxtLink :to="link.to">
                    <span
                      class="
                        ud-menu-scroll
                        text-dark
                        group-hover:text-primary
                        font-montserrat mx-6
                        flex
                        py-2
                        text-base transition
                        duration-300
                        ease-in-out
                        group-hover:underline
                        group-hover:decoration-swd-blue
                        group-hover:decoration-4
                        group-hover:underline-offset-8
                        lg:mr-0
                        lg:inline-flex
                        lg:py-6
                        lg:px-0
                        lg:text-[#181818]
                        lg:group-hover:text-[#181818] lg:group-hover:opacity-70
                      "
                    >
                      {{ link.text }}
                    </span>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
            <nav
              v-show="isOpen"
              id="navbarCollapse"
              class="
                menuDropdown
                absolute
                top-full
                right-4
                w-full
                max-w-[250px]
                rounded-lg
                bg-white
                py-5
                shadow-lg
                lg:static
                lg:block
                lg:w-full
                lg:max-w-full
                lg:bg-transparent
                lg:py-0
                lg:px-4
                lg:shadow-none
                xl:px-6
              "
            >
              <ul class="blcok lg:flex">
                <li
                  v-for="(link, linkIndex) in links"
                  :key="`link-mobile-${linkIndex}`"
                  class="group"
                >
                  <NuxtLink :to="link.to">
                    <span
                      class="
                        ud-menu-scroll
                        text-dark
                        group-hover:text-primary
                        font-montserrat
                        mx-8
                        flex
                        py-2
                        text-base
                        lg:mr-0
                        lg:inline-flex
                        lg:py-6
                        lg:px-0
                        lg:text-[#181818]
                        lg:group-hover:text-[#181818]
                        lg:group-hover:opacity-70
                      "
                    >
                      {{ link.text }}
                    </span>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
          <div class="topBarInMenuCell hidden lg:flex"></div>
          <div class="justify-end pr-16 sm:flex lg:pr-0">
            <NuxtLink to="/cart">
              <button
                type="button"
                class="
                  relative
                  flex
                  cursor-pointer
                  items-center
                  hover:text-[#3981da]
                "
              >
                <div
                  class="inline-block max-w-full justify-center leading-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="40"
                    height="40"
                    class="fill-[#3981da]"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="
                        M7 8V6a5 5 0 1 1 10 0v2h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1
                        1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3zm0
                        2H5v10h14V10h-2v2h-2v-2H9v2H7v-2zm2-2h6V6a3 3 0 0 0-6
                        0v2z
                      "
                    />
                  </svg>
                </div>
                <span class="ml-[0.35em] opacity-50">
                  {{ cartCount }}
                </span>
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavHeader',
  data() {
    return {
      isOpen: false,
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
      ],
    };
  },
  computed: {
    cartCount: {
      get() {
        return this.$store.getters['cart/cartCount']
      },
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('click', this.close);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('click', this.close);
  },
  methods: {
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false;
        if (this.isOpen === false) {
          const navbarToggler = document.querySelector('#navbarToggler');
          if (navbarToggler.classList.contains('navbarTogglerActive')) {
            navbarToggler.classList.remove('navbarTogglerActive');
          }
        }
      }
    },
    toggle() {
      this.isOpen = !this.isOpen;
      const navbarToggler = document.querySelector('#navbarToggler');
      navbarToggler.classList.toggle('navbarTogglerActive');
    },
    cart() {
      this.$router.push('/checkout');
    },
    handleScroll() {
      const udHeader = document.querySelector('.ud-header');
      const sticky = udHeader.offsetTop;

      if (window.pageYOffset > sticky) {
        udHeader.classList.add('sticky');
      } else {
        udHeader.classList.remove('sticky');
      }
    }
  }
};
</script>

<style lang="postcss">
  .sticky {
    @apply fixed z-[9999] bg-white bg-opacity-80 transition;
    backdrop-filter: blur(5px);
    box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  }

  .sticky .navbar-logo {
    @apply py-2;
  }

  .sticky #navbarToggler span {
    @apply bg-swd-dgrey;
  }

  .sticky #navbarCollapse li a {
    @apply text-swd-dgrey hover:text-swd-blue hover:opacity-100;
  }
  #navbarCollapse li .ud-menu-scroll.active {
    @apply opacity-70;
  }
  .sticky #navbarCollapse li .ud-menu-scroll.active {
    @apply text-swd-blue opacity-100;
  }
  .sticky .loginBtn {
    @apply text-swd-dgrey hover:text-swd-blue hover:opacity-100;
  }
  .sticky .signUpBtn {
    @apply bg-swd-blue text-white hover:bg-swd-dgrey hover:text-white;
  }
  .navbarTogglerActive > span:nth-child(1) {
    @apply top-[7px] rotate-45 transform;
  }
  .navbarTogglerActive > span:nth-child(2) {
    @apply opacity-0;
  }
  .navbarTogglerActive > span:nth-child(3) {
    @apply top-[-8px] rotate-[135deg];
  }
</style>