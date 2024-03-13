<template>
  <div
    class="
    ud-header
    top-0 left-0 z-40
    flex h-20
    w-full items-center
    bg-brand-black text-white"
  >
    <div class="container max-w-6xl " >
      <div class="relative flex justify-between">
        <div class="hidden self-center px-4 lg:block lg:w-32">
          <NuxtLink to="/">
            <span class="navbar-logo block w-full py-2">
              <img
                src="~/assets/images/the-final-whistle-logo.png"
                alt="logo"
                class="header-logo"
              />
            </span>
          </NuxtLink>
        </div>
        <div
        class="flex w-full items-center
        justify-between px-4"
        >
          <div class="custom-pl-16 lg:custom-pl-0">
            <button
              id="navbarToggler"
              type="button"
              class="
                navbarNavToggle
                ring-primary
                absolute
                top-1/2
                left-4
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
                left-4
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
                lg:shadow-none
              "
            >
              <ul class="block lg:flex">
                <li
                  v-for="(link, linkIndex) in links"
                  :key="`left-menu-links-desktop-${linkIndex}`"
                  class="group relative"
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
                        group-hover:decoration-slate-600
                        group-hover:decoration-2
                        group-hover:underline-offset-8
                        lg:mr-0
                        lg:inline-flex
                        lg:py-4
                        lg:px-0
                        lg:text-[#181818]
                        lg:group-hover:text-slate-800 lg:group-hover:opacity-70
                      "
                      :class="(link.to === $route.path)
                        ? 'underline underline-offset-8'
                        : ''"
                    >
                      {{ link.text }}
                    </span>
                  </NuxtLink>
                </li>
                <li
                  v-if="more.length > 0"
                  class="group submenu-item relative hover:bg-yellow-400"
                >
                  <span
                    class="
                      text-dark
                      font-montserrat
                      relative
                      mx-6
                      flex
                      cursor-pointer
                      py-2
                      text-base
                      after:absolute
                      after:top-1/2
                      after:right-1
                      after:mt-[-2px]
                      after:h-2
                      after:w-2
                      after:-translate-y-1/2
                      after:rotate-45
                      after:border-r-2
                      after:border-b-2
                      after:border-current
                      group-hover:text-slate-200
                      lg:mr-0
                      lg:ml-8
                      lg:inline-flex
                      lg:py-6
                      lg:pr-4
                      lg:pl-0
                      lg:text-[#181818]
                      lg:after:right-0
                      lg:group-hover:text-[#181818]
                      lg:group-hover:opacity-70
                      xl:ml-12
                    "
                  >
                    More
                  </span>
                  <div
                    class="
                      submenu
                      relative
                      top-full
                      left-0
                      hidden
                      w-[250px]
                      rounded-sm
                      bg-white
                      p-4
                      transition-[top]
                      duration-300
                      group-hover:opacity-100
                      lg:invisible
                      lg:absolute
                      lg:top-[110%]
                      lg:block
                      lg:opacity-0
                      lg:shadow-lg
                      lg:group-hover:visible
                      lg:group-hover:top-full
                    "
                  >
                    <a
                      v-for="(link, linkIndex) in more"
                      :key="`more-a-link-mobile-${linkIndex}`"
                      :href="link.to"
                      class="hover:bg-brand-lgrey"
                    >
                      <span
                        class="
                          text-body-color
                          block
                          rounded
                          py-[10px]
                          px-4
                          text-sm
                          hover:text-gray-500 hover:underline
                        "
                      >
                        {{ link.text }}
                      </span>
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
            <nav
              v-show="isOpen"
              id="navbarCollapse"
              class="
                menuDropdown
                absolute
                top-full left-4 w-full
                max-w-[250px]
                rounded-lg
                bg-black
                py-2
                shadow-lg
                transition-all
                duration-300
                lg:static
                lg:block
                lg:w-full
                lg:max-w-full
                lg:bg-brand-yellow/60
                lg:py-0
                lg:px-4
                lg:shadow-none
                xl:px-6
              "
            >
              <ul class="block lg:flex">
                <li
                  v-for="(link, linkIndex) in links"
                  :key="`left-menu-link-mobile-${linkIndex}`"
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
                        hover:text-gray-500
                        hover:underline
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
                <li
                  v-for="(link, linkIndex) in rightMenu"
                  :key="`right-menu-link-mobile-${linkIndex}`"
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
                        hover:text-gray-500
                        hover:underline
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
                <li
                  v-if="more.length > 0"
                  class="group submenu-item relative"
                >
                  <span
                    href="javascript:void(0)"
                    class="
                      text-dark
                      group-hover:text-primary
                      font-montserrat
                      relative
                      mx-8
                      flex
                      cursor-pointer
                      py-2
                      text-base
                      after:absolute
                      after:top-1/2
                      after:right-1
                      after:mt-[-2px]
                      after:h-2
                      after:w-2
                      after:-translate-y-1/2
                      after:rotate-45
                      after:border-r-2
                      after:border-b-2
                      after:border-current
                      hover:text-gray-500
                      hover:underline
                      lg:mr-0
                      lg:ml-8
                      lg:inline-flex
                      lg:py-6
                      lg:pr-4
                      lg:pl-0
                      lg:text-[#181818]
                      lg:after:right-0 lg:group-hover:text-[#181818]
                      lg:group-hover:opacity-70 xl:ml-12
                    "
                    @click="toggle2"
                    @mouseover="toggle2"
                  >
                    More
                  </span>
                  <div
                    v-show="isOpen2"
                    class="
                      submenu
                      relative
                      top-full
                      left-0
                      w-[250px]
                      rounded-sm
                      bg-white
                      p-4
                      transition-[top]
                      duration-300
                      group-hover:opacity-100
                      lg:invisible
                      lg:absolute
                      lg:top-[110%]
                      lg:block
                      lg:opacity-0
                      lg:shadow-lg
                      lg:group-hover:visible
                      lg:group-hover:top-full
                    "
                  >
                    <a
                      v-for="(link, linkIndex) in more"
                      :key="`more-a-link-mobile-${linkIndex}`"
                      :href="link.to"
                      class="hover:bg-brand-lgrey"
                    >
                      <span
                        class="
                          text-body-color
                          block
                          rounded
                          py-[10px]
                          px-4
                          text-sm
                          hover:text-brand-mgrey hover:underline
                        "
                      >
                        {{ link.text }}
                      </span>
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          <div class="topBarInMenuCell hidden px-2 lg:block"></div>
          <div class="block w-16 justify-center lg:hidden">
            <NuxtLink to="/">
              <span class="navbar-logo block py-2">
                <img
                  src="~/assets/images/the-final-whistle-logo.png"
                  alt="logo"
                  class="header-logo w-full"
                />
              </span>
            </NuxtLink>
          </div>
          <div class="justify-end sm:flex lg:pr-0">
            <NuxtLink to="/cart" class="self-center">
              <button
                type="button"
                class="
                  relative
                  flex cursor-pointer
                  flex-row-reverse
                  items-center px-3
                  hover:text-brand-dgrey
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
                    class="fill-black"
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
                <span class="mx-[0.35em] opacity-50">
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
      isOpen2: false,
      links: [
        {
          to: '/',
          text: 'Home',
        },
        {
          to: '/news',
          text: 'News',
        },
        {
          to: '/bar-tv',
          text: 'BarTV  ',
        },
        {
          to: '/draws',
          text: 'Draws',
        },
        {
          to: '/contact-us',
          text: 'Ladders',
        },
        {
          to: '/shop2',
          text: 'shop',
        },
        {
          to: '/contact-us',
          text: 'Info',
        },
      ],
      more: [],
      rightMenu: [],
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
    toggle2() {
      this.isOpen2 = !this.isOpen2;
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
.text-dark:hover {
  color: lightgray;
  text-decoration: underline;
}
.text-dark {
  color: white;
  text-decoration: none;
}
  .custom-pl-16 {
    @apply pl-16
  }
  .custom-pl-0 {
    @apply pl-0
  }

  @media (min-width: 1024px) {
    .lg\:custom-pl-0 {
      @apply pl-0
    }
}

  .sticky {
    @apply fixed z-[9999] bg-brand-black bg-opacity-80 transition;
    backdrop-filter: blur(5px);
    box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  }

  .sticky .navbar-logo {
    @apply py-2;
  }

  .sticky #navbarToggler span {
    @apply bg-brand-dgrey;
  }

  .sticky #navbarCollapse li a {
    @apply text-brand-dgrey hover:text-brand-black hover:opacity-100;
  }
  #navbarCollapse li .ud-menu-scroll.active {
    @apply opacity-70;
  }
  .sticky #navbarCollapse li .ud-menu-scroll.active {
    @apply text-brand-black opacity-100;
  }
  .sticky .loginBtn {
    @apply text-brand-dgrey hover:text-brand-black hover:opacity-100;
  }
  .sticky .signUpBtn {
    @apply bg-brand-black text-white hover:bg-brand-dgrey hover:text-white;
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