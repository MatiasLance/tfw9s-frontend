<template>
  <div class="min-h-screen w-screen bg-[#1A1A1B] transition">
    <BaseHeader class="from-brand-green to-brand-black bg-gradient-to-r shadow-md">
      <!-- Breadcrumbs and Title -->
      <BreadCrumbs title="Admin"/>
    </BaseHeader>
    <section class="mx-auto max-w-full gap-4">
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
          <VTab href="#draws">
            Draws
          </VTab>
        </VTabs>
      </div>
      <div class="grid grid-cols-1 gap-4 pt-2">
        <div v-if="adminTab.toUpperCase() === 'EVENTS'">
          <PartsList />
        </div>
        <div v-if="adminTab.toUpperCase() === 'DRAWS'">
          <DrawsComponent />
        </div>
        <div
        v-else
        class="
        mb-5
        grid
        gap-6
        px-6
        md:grid-cols-2
        md:px-0
        lg:grid-cols-3
        xl:grid-cols-3"
        >
          <div v-for="(panel, key) in filteredPanels" :key="key">
            <article
              class="
                group
                rounded-lg border border-gray-200
                bg-white
                p-6
                shadow-md
                transition-all duration-300
                hover:border-green-400
                hover:shadow-lg
              "
            >
              <!-- Title + Icon -->
              <div class="mb-4 flex items-center justify-center gap-3">
                <i :class="['ri-' + panel.icon, 'text-3xl']"></i>
                <h2
                  class="
                  text-xl
                  font-bold
                  text-gray-800
                  transition-colors
                  group-hover:text-green-500"
                >
                  {{ panel.title }}
                </h2>
              </div>

              <!-- Count Section -->
              <template v-if="panel.count !== -1">
                <div class="mb-4 rounded bg-green-50 px-3 py-2 text-center">
                  <span 
                  class="
                  block
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-green-600"
                  >
                  Total
                  </span>
                  <span
                  class="
                  text-3xl
                  font-extrabold
                  text-green-700"
                  >
                    {{ panel.count }}
                  </span>
                </div>
              </template>

              <!-- Action Button -->
              <div class="flex justify-center">
                <NuxtLink
                  :to="panel.route"
                  class="
                    mt-2
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-green-100
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-green-700
                    transition
                    hover:bg-green-200
                  "
                >
                  <i :class="[
                    panel.desc === 'Edit'
                      ? 'ri-pencil-line'
                      : 'ri-corner-down-right-line'
                  ]"></i>
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
import DrawsComponent from './draws-admin.vue';
import BreadCrumbs from '~/components/BreadCrumbs.vue';

export default {
  components: {
    PartsList,
    DrawsComponent,
    BreadCrumbs
  },
  data() {
    return {
      adminTab: 'events',
      panels: [
        {
          title: 'Merch Products',
          icon: 'shopping-bag-line',
          route: '/admin/products',
          desc: 'See all products',
          count: 0,
        },
        {
          title: 'Merch Categories',
          icon: 'product-hunt-line',
          route: '/admin/categories',
          desc: 'See all categories',
          count: 0
        },
        {
          title: 'Discount Codes',
          icon: 'exchange-dollar-line',
          route: '/admin/discountcodes',
          desc: 'See all discount codes',
          count: 0
        },
        {
          title: 'News',
          icon: 'newspaper-line',
          route: '/admin/news',
          desc: 'See all news',
          count: 0
        },
        {
          title: 'Partner Sponsor',
          icon: 'service-line',
          route: '/admin/partner-sponsor',
          desc: 'See all Partner Sponsor',
          count: 0
        },
        {
          title: 'Tax',
          icon: 'money-dollar-circle-line',
          route: '/admin/tax-setting',
          desc: 'Edit',
          count: -1
        },
        {
          title: 'Superadmin',
          icon: 'admin-line',
          route: '/superadmin',
          desc: 'Proceed',
          count: -1
        },
        {
          title: 'Code of Conduct',
          icon: 'sticky-note-line',
          route: '/admin/code-of-conduct',
          desc: 'Edit',
          count: -1
        },
        {
          title: 'Rules',
          icon: 'forbid-line',
          route: '/admin/rules',
          desc: 'Edit',
          count: -1
        },
        {
          title: 'Insurance',
          icon: 'shield-cross-line',
          route: '/admin/insurance',
          desc: 'Edit',
          count: -1
        },
        {
          title: 'FAQ',
          icon: 'question-line',
          route: '/admin/faq',
          desc: 'Edit',
          count: -1
        },
        {
          title: 'Team Folder',
          icon: 'folder-line',
          route: '/admin/teamfolder',
          desc: 'Edit',
          count: -1
        },
        {
          title: 'Home Page Info',
          icon: 'home-gear-line',
          route: '/admin/home-page',
          desc: 'Edit',
          count: -1
        },
        {
          title: 'Payment',
          icon: 'bank-card-2-line',
          route: '/admin/payment-setting',
          desc: 'Manage',
          count: -1
        },
      ]
    };
  },
  computed: {
    filteredPanels() {
      switch (this.adminTab.toUpperCase()) {
      case 'MERCH':
        return this.panels.filter(panel => {
          return [ 'Merch Products', 'Merch Categories' ].includes(panel.title)
        })
      case 'MASTER':
        return this.panels.filter(panel => {
          return [
            'News', 'Partner Sponsor', 'Tax', 'Code of Conduct', 'Rules', 'Insurance', 'Discount Codes', 'Shipping Settings', 'Shipping Master Controls', 'FAQ', 'Team Folder', 'Home Page Info', 'Payment'
          ].includes(panel.title)
        })
      case 'DRAWS':
        return this.panels.filter(panel => {
          return [ 'Draws' ].includes(panel.title)
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
          this.panels[0].count = response.data.data.products;
          this.panels[1].count = response.data.data.category;
          this.panels[2].count = response.data.data.discountcode;
          this.panels[3].count = response.data.data.news;
          this.panels[4].count = response.data.data.partner_sponsor;
          this.panels.find(p => p.title === 'Draws').count = response.data.data.draws || 0;
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