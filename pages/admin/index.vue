<template>
  <div>
    <header class="z-10 h-14 border-b border-gray-200 bg-white py-3 shadow-sm">
      <div
      class="container mx-auto flex h-full items-center justify-end px-6"
      >
        <ul class="flex shrink-0 items-center space-x-2">
          <li>
            <button
                type="button"
                class="flex h-10 w-36 items-center
                justify-center overflow-hidden border
                border-transparent text-base font-bold
                hover:border-brand-black hover:bg-gray-200"
                aria-label="Button name"
                @click="toggle"
            >
             Account
            </button>
          </li>
        </ul>
      </div>
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform   opacity-0 scale-95"
      >
        <div
          v-show="isOpen"
          class="absolute right-16 z-20 mx-auto mt-2 origin-top-right
          rounded-md shadow-lg"
        >
          <div class="my-3 flex items-center px-5 py-1">
            <div class="shrink-0">
            <img
                class="h-10 w-10 rounded-full"
                src="~/assets/images/avatars/avatar.jpg"
                alt
            >
            </div>
            <div class="ml-3">
                <div class="text-base font-medium leading-none text-black">
            {{ fullName }}
                </div>
                <div
                    class="mt-1 text-sm font-medium leading-none
                    text-gray-400"
                >
            {{ email }}
                </div>
            </div>
            </div>
          <div
            class="shadow-xs rounded-md
            bg-white py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <a
                href="#"
                class="block py-2 px-4 text-sm text-gray-700
                hover:bg-gray-100"
                role="menuitem"
                @click="logout"
            >
              Log out
            </a>
          </div>
        </div>
      </Transition>
    </header>
    <div class="mx-auto max-w-screen-xl pt-3">

        <section
            class="container mx-auto my-20 p-6"
        >
        <article
            class="relative mb-6 overflow-hidden rounded
            bg-brand-black p-4 sm:p-6"
        >
          <div class="" aria-hidden="true">
            <h1 class="mb-1 text-2xl font-bold text-white md:text-3xl">
Good day, {{ fullName }}. 👋
</h1>
            <p class="text-white">
Here is what's happening with your shop today:
</p></div>
        </article>

        <div
            class="mb-5 grid gap-6 md:grid-cols-2
            lg:grid-cols-3 xl:grid-cols-3"
        >
            <article
              v-for="panel in panels"
              :key="panel"
              class="rounded border border-gray-200 bg-white shadow-sm"
            >
              <div class="p-5">
                  <h2 class="text-lg font-semibold text-black">
                    {{ panel.title }}
                  </h2>
                  <template v-if="panel.count !== -1">
                    <small
                    class="mb-1 font-bold  uppercase text-gray-400"
                    >TOTAL</small>
                    <div class="flex items-start">
                      <h4 class="mr-2 text-3xl font-bold" data-aos="fade-up">
                        {{ panel.count }}
                      </h4>
                    </div>
                  </template>
                  <hr class="my-4">
                  <NuxtLink
                    :to="panel.route"
                    class="hover:text-brand-black"
                  >
                    <i
                      v-if="panel.desc === 'Edit'"
                      class="ri-pencil-line mr-1"
                    ></i>
                    {{ panel.desc }}
                  </NuxtLink>
              </div>
            </article>
        </div> <!-- grid.// -->

    </section> <!-- container -->

    </div>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import logout from '~/mixins/auth/logout';
import aosMixin from '@/mixins/aos';

export default {
  mixins: [ logout, aosMixin ],
  data() {
    return {
      isOpen: false,
      fullName: '',
      firstname: '',
      lastname: '',
      email: '',
      pageSEO: {
        title: 'Admin Page - Drum HQ',
        description: 'Admin Page',
        url: 'admin',
      },
      panels: [
        {
          title: 'Products',
          icon: 'fas fa-shopping-cart',
          route: '/admin/parts-list',
          desc: 'See all products',
          count: 0
        },
        {
          title: 'Categories',
          icon: 'fas fa-folder',
          route: '/admin/categories',
          desc: 'See all categories',
          count: 0
        },
        {
          title: 'Shipping Settings',
          icon: 'fas fa-truck',
          route: '/admin/shipping-setting',
          desc: 'Edit',
          count: -1
        },
        {
          title: 'Shipping Master Controls',
          icon: 'fas fa-cog',
          route: '/admin/shipping-master',
          desc: 'Edit',
          count: -1
        },
        {
          title: 'Discount Codes',
          icon: 'fas fa-dollar-sign',
          route: '/admin/discountcodes',
          desc: 'See all discount codes',
          count: 0
        },
        {
          title: 'Master Settings',
          icon: 'fas fa-cog',
          route: '/admin/master-setting',
          desc: 'Edit',
          count: -1
        },
      ]
    }
  },
  head() {
    return {
      title: 'Admin Page - Drum HQ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageSEO.description
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${this.$config.baseURL}/${this.pageSEO.url}`
        },
      ],
    };
  },
  computed: {
    deliveryNote: {
      get() {
        return this.$store.state.order.deliveryNote;
      },
      set(value) {
        this.$store.commit('order/setDeliveryNote', value)
      }
    },
    pickupNote: {
      get() {
        return this.$store.state.order.pickupNote;
      },
      set(value) {
        this.$store.commit('order/setPickupNote', value)
      }
    },
    totalItems: {
      get() {
        return this.$store.state.admin.totalItems;
      },
      set(value) {
        this.$store.commit('admin/setTotalItems', value)
      }
    },
    totalCategories: {
      get() {
        return this.$store.state.admin.totalCategories;
      },
      set(value) {
        this.$store.commit('admin/setTotalCategories', value)
      }
    },
    totalDiscount: {
      get() {
        return this.$store.state.admin.totalDiscount
      },
      set(value) {
        this.$store.commit('admin/setTotalDiscount', value)
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$store.state.auth.user !== null) {
        this.email = this.$store.state.auth.user.email
        this.firstname = this.$store.state.auth.user.first_name
        this.lastname = this.$store.state.auth.user.last_name
        this.fullName = `${this.firstname} ${this.lastname}`
      }
      if (this.$store.state.auth.isLoggedIn === false) {
        this.$router.push('/login');
      }
      setInterval(() => {
        this.$axios
          .$get('v1/users/me')
      }, 600000);
      document.addEventListener('click', this.close)
      this.retrieveTotalProducts()
      this.retrieveTotalCategories()
      this.retrieveTotalDiscounts()
      this.retrieveShippingNotes()
    })
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close)
  },
  methods: {
    retrieveShippingNotes() {
      this.$axios
        .$get('/v1/orders/shipping-notes/')
        .then((response) => {
          this.$store.commit('order/setDeliveryNote', response.data.options.delivery_note)
          this.$store.commit('order/setPickupNote', response.data.options.pickup_note)
        })
    },
    retrieveTotalProducts() {
      this.$axios
        .$get('v1/items/')
        .then((response) => {
          this.$store.commit('admin/setTotalItems', response.data.total_items)
          this.panels[0].count = this.totalItems
        })
    },
    retrieveTotalCategories() {
      this.$axios
        .$get('/v1/categories/')
        .then((response) => {
          this.$store.commit('admin/setTotalCategories', response.data.total_categories)
          this.panels[1].count = this.totalCategories
        })
    },
    retrieveTotalDiscounts() {
      // todo: endpoint from backend
      this.$axios
        .$get('/v1/discountcode/')
        .then((response) => {
          this.$store.commit('admin/setTotalDiscount', response.data.total_discountcode)
          this.panels[4].count = this.totalDiscount
        })
    },
    toggle() {
      this.isOpen = !this.isOpen
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false
      }
    }
  }
}
</script>

<style>
  .toast-notification {
    margin: 0.5em 0;
    text-align: center;
    box-shadow: 0 1px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
    border-radius: 2em;
    padding: 0.75em 1.5em;
    pointer-events: auto;
    color: rgba(0, 0, 0, 0.7);
    background: #ffdd57;
  }
  .o-notification--success {
    background-color: #4cbe5c !important;
  }
  .o-notification--danger {
    background-color: #1a1d18 !important;
  }
</style>
