<template>
  <div class="min-h-screen w-screen bg-[#1A1A1B] transition">
    <BaseHeader
    class="mx-auto max-w-screen-xl gap-4
    bg-gradient-to-r from-brand-green to-brand-black lg:px-8"
    >
      <div
        class="
          col-span-12
          text-center
          sm:space-y-3
          sm:text-left
          lg:col-span-6
          xl:mt-10"
          data-aos="fade-right"
      >
        <span
          class="
            superheadline
            flex flex-row
            items-center
            text-[1rem]
            font-normal
            text-white
          "
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white">Home</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-5xl">
          Admin
        </h1>
      </div>
    </BaseHeader>
    <section class="mx-auto max-w-screen-xl gap-4 p-4">
      <div class="mb-4 w-full">
        <VTabs
          v-model="adminTab"
          background-color="accent-4"
          centered
          dark
        >
          <VTab href="#events">
            Events
          </VTab>
          <VTab href="#merch">
            Merch
          </VTab>
          <VTab href="#master">
            Master
          </VTab>
        </VTabs>
      </div>
      <div class="grid grid-cols-1 gap-4 pt-6">
        <div v-if="adminTab.toUpperCase() === 'EVENTS'">
          <PartsList />
        </div>
        <div
            class="mb-5 grid gap-6 md:grid-cols-2
            lg:grid-cols-3 xl:grid-cols-3"
        >
            <div
              v-for="(panel, key) in filteredPanels"
              :key="key"
            >
              <article
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
                      <h4
                        class="mr-2 text-3xl font-bold"
                        data-aos="fade-up"
                      >
                        {{ panel.count }}
                      </h4>
                    </div>
                  </template>
                  <template v-else>
                    <small
                    class="mb-1 font-bold  uppercase text-transparent"
                    >TOTAL</small>
                    <div class="flex items-start text-transparent">
                      <h4
                        class="mr-2 text-3xl font-bold"
                        data-aos="fade-up"
                      >
                        {{ panel.count }}
                      </h4>
                    </div>
                  </template>

                  <hr class="my-4">
                  <NuxtLink
                    :to="panel.route"
                    class="hover:text-brand-black"
                  >
                    <template v-if="panel.desc === 'Edit'">
                      <i
                        class="ri-pencil-line mr-1"
                      ></i>
                    </template>
                    <template v-else>
                      <i
                        class="ri-corner-down-right-line mr-1"
                      ></i>
                    </template>
                    {{ panel.desc }}
                  </NuxtLink>
                  </div>
              </article>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PartsList from './parts-list.vue';
export default {
  components: { PartsList },
  data() {
    return {
      adminTab: 'events',
      panels: [
        {
          title: 'Merch Products',
          icon: 'fas fa-shopping-cart',
          route: '/admin/products',
          desc: 'See all products',
          count: 0,
        },
        {
          title: 'Merch Categories',
          icon: 'fas fa-folder',
          route: '/admin/categories',
          desc: 'See all categories',
          count: 0
        },
        {
          title: 'Add Fights',
          icon: 'fas fa-shopping-cart',
          route: '/admin/parts-list',
          desc: 'See all fights',
          count: 0
        },
        {
          title: 'Fight Categories',
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
        {
          title: 'Superadmin',
          icon: 'fas fa-cog',
          route: '/superadmin',
          desc: 'Proceed',
          count: -1
        },
        {
          title: 'News',
          icon: 'fas fa-cog',
          route: '/admin/news',
          desc: 'See all news',
          count: 0
        },
        {
          title: 'Partner Sponsor',
          icon: 'fas fa-cog',
          route: '/admin/partner-sponsor',
          desc: 'See all Partner Sponsor',
          count: 0
        },
        {
          title: 'Code of Conduct',
          icon: 'fas fa-cog',
          route: '/admin/code-of-conduct',
          desc: 'Edit',
          count: -1
        },
        {
          title: 'Rules',
          icon: 'fas fa-cog',
          route: '/admin/rules',
          desc: 'Edit',
          count: -1
        },
        {
          title: 'Insurance',
          icon: 'fas fa-cog',
          route: '/admin/insurance',
          desc: 'Edit',
          count: -1
        },
      ],
      items: [
        {
          title: 'Weekly Wrap up',
          text: '00-00-00',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          title: 'Weekly Wrap up',
          text: '00-00-00',
          description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          title: 'Weekly Wrap up',
          text: '00-00-00',
          description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: require('~/assets/images/kidsplaying.jpg')
        },

      ]
    };
  },
  computed: {
    filteredPanels() {
      switch (this.adminTab.toUpperCase()) {
      case 'MERCH':
        return this.panels.filter(panel => {
          return [
            'Merch Products', 'Merch Categories', 'Discount Codes'
          ].includes(panel.title)
        })
      case 'MASTER':
        return this.panels.filter(panel => {
          return [
            'News', 'Partner Sponsor', 'Master Settings', 'Code of Conduct', 'Rules', 'Insurance'
          ].includes(panel.title)
        })
      default:
        return []
      }
    },
  },
  mounted() {
    this.fetchTotalCount();
  },
  methods: {
    fetchTotalCount() {
      this.$axios.get('/v1/total/')
        .then(response => {
          console.log(response);
          this.panels[0].count = response.data.data.products;
          this.panels[1].count = response.data.data.category;
          this.panels[6].count = response.data.data.discountcode;
          this.panels[9].count = response.data.data.news;
          this.panels[10].count = response.data.data.partner_sponsor;
        })
        .catch(error => {
          console.error('Error fetching total count:', error);
        });
    }
  }
};
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
