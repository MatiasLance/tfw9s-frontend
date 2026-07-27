<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#111712]
    via-[#1A1A1B] to-[#0d120e]"
  >
    <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black shadow-md">
      <BreadCrumbs title="Admin" />
    </BaseHeader>

    <main class="mx-auto w-full max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
      <section
        class="relative mb-7 overflow-hidden rounded-3xl border
        border-white/10 bg-gradient-to-br from-[#26352a] via-brand-black
        to-[#163e2b] p-6 shadow-2xl shadow-black/30 sm:p-8"
        aria-labelledby="admin-dashboard-title"
      >
        <div
          class="pointer-events-none absolute -right-20 -top-24 h-72 w-72
          rounded-full border-[42px] border-brand-green/10"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-28 right-1/3 h-64 w-64
          rounded-full bg-brand-green/10 blur-3xl"
        ></div>
        <div
          class="pointer-events-none absolute left-1/2 top-0 h-px w-1/3
          bg-gradient-to-r from-transparent via-brand-green/60 to-transparent"
        ></div>

        <div
          class="relative flex flex-col gap-8 lg:flex-row lg:items-end
          lg:justify-between"
        >
          <div class="flex max-w-3xl items-start gap-5">
            <div
              class="hidden h-16 w-16 shrink-0 items-center justify-center
              rounded-3xl bg-brand-green text-brand-black shadow-xl
              shadow-green-950/30 sm:flex"
            >
              <i class="ri-dashboard-3-line text-3xl" aria-hidden="true"></i>
            </div>
            <div>
              <div
                class="mb-4 inline-flex items-center gap-2 rounded-full
                border border-brand-green/20 bg-brand-green/10 px-3 py-1.5
                text-xs font-bold uppercase tracking-widest text-green-300"
              >
                <span
                  class="h-2 w-2 rounded-full bg-brand-green"
                  aria-hidden="true"
                ></span>
                Administration workspace
              </div>
              <h1
                id="admin-dashboard-title"
                class="text-3xl font-black tracking-tight text-white sm:text-4xl"
              >
                Everything you manage, in one clear workspace
              </h1>
              <p
                class="mt-3 max-w-2xl text-sm leading-6 text-gray-300
                sm:text-base"
              >
                Move quickly between event operations, merchandise, site
                settings, and tournament draws from your central control panel.
              </p>
            </div>
          </div>

          <div
            class="flex w-full items-center gap-4 rounded-2xl border
            border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm
            sm:w-auto"
            aria-live="polite"
          >
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center
              rounded-2xl bg-brand-green/10 text-brand-green"
            >
              <i
                :class="[
                  adminTab.toUpperCase() === 'EVENTS'
                    ? 'ri-calendar-event-line'
                    : adminTab.toUpperCase() === 'MERCH'
                      ? 'ri-shopping-bag-3-line'
                      : adminTab.toUpperCase() === 'DRAWS'
                        ? 'ri-git-branch-line'
                        : 'ri-settings-3-line'
                ]"
                class="text-2xl"
                aria-hidden="true"
              ></i>
            </div>
            <div>
              <p class="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Active workspace
              </p>
              <p class="mt-0.5 text-lg font-black capitalize text-white">
                {{ adminTab }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        class="dashboard-tabs mb-7 overflow-hidden rounded-3xl border
        border-gray-200 bg-white p-3 shadow-xl shadow-black/15 sm:p-4"
        aria-labelledby="workspace-switcher-title"
      >
        <div
          class="mb-3 flex flex-col gap-2 px-2 pt-2 sm:flex-row
          sm:items-center sm:justify-between"
        >
          <div>
            <h2 id="workspace-switcher-title" class="font-black text-gray-900">
              Choose a workspace
            </h2>
            <p class="mt-1 text-xs text-gray-500">
              Each workspace groups related administration tools.
            </p>
          </div>
          <span
            class="inline-flex w-max items-center gap-2 rounded-full
            bg-green-50 px-3 py-1.5 text-[11px] font-bold uppercase
            tracking-wide text-green-700"
          >
            <i class="ri-shield-check-line" aria-hidden="true"></i>
            Admin access
          </span>
        </div>

        <VTabs
          v-model="adminTab"
          background-color="transparent"
          centered
          grow
          show-arrows
        >
          <VTab href="#events">
            <i class="ri-calendar-event-line mr-2 text-lg" aria-hidden="true"></i>
            Events
          </VTab>
          <VTab href="#merch">
            <i class="ri-shopping-bag-3-line mr-2 text-lg" aria-hidden="true"></i>
            Merch
          </VTab>
          <VTab href="#master">
            <i class="ri-settings-3-line mr-2 text-lg" aria-hidden="true"></i>
            Master
          </VTab>
          <VTab href="#draws">
            <i class="ri-git-branch-line mr-2 text-lg" aria-hidden="true"></i>
            Draws
          </VTab>
        </VTabs>
      </section>

      <section
        v-if="adminTab.toUpperCase() === 'EVENTS'"
        class="overflow-hidden rounded-3xl border border-white/10
        bg-white/5 py-6 shadow-2xl shadow-black/20 sm:py-8"
        aria-labelledby="events-workspace-title"
      >
        <header class="mb-6 px-6 sm:px-8">
          <div class="flex items-start gap-4">
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center
              rounded-2xl bg-brand-green text-brand-black"
            >
              <i class="ri-calendar-todo-line text-2xl" aria-hidden="true"></i>
            </div>
            <div>
              <p
                class="text-xs font-black uppercase tracking-[0.18em]
                text-green-300"
              >
                Event operations
              </p>
              <h2
                id="events-workspace-title"
                class="mt-1 text-2xl font-black text-white"
              >
                Manage the competition
              </h2>
              <p class="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                Work with regions, teams, players, fixtures, results, and
                registrations using the tools below.
              </p>
            </div>
          </div>
        </header>
        <div class="admin-embedded-workspace">
          <PartsList />
        </div>
      </section>

      <section
        v-else-if="adminTab.toUpperCase() === 'DRAWS'"
        class="overflow-hidden rounded-3xl border border-white/10
        bg-white/5 py-6 shadow-2xl shadow-black/20 sm:py-8"
        aria-labelledby="draws-workspace-title"
      >
        <header class="mb-6 px-6 sm:px-8">
          <div class="flex items-start gap-4">
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center
              rounded-2xl bg-brand-green text-brand-black"
            >
              <i class="ri-git-branch-line text-2xl" aria-hidden="true"></i>
            </div>
            <div>
              <p
                class="text-xs font-black uppercase tracking-[0.18em]
                text-green-300"
              >
                Tournament planning
              </p>
              <h2
                id="draws-workspace-title"
                class="mt-1 text-2xl font-black text-white"
              >
                Build and review draws
              </h2>
              <p class="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                Organise tournament structures and review the current draw
                configuration.
              </p>
            </div>
          </div>
        </header>
        <div class="admin-embedded-workspace">
          <DrawsComponent />
        </div>
      </section>

      <section v-else aria-labelledby="admin-tools-title">
        <header
          class="mb-6 flex flex-col gap-4 rounded-3xl border border-white/10
          bg-white/5 p-5 shadow-xl shadow-black/10 sm:flex-row sm:items-center
          sm:justify-between sm:p-6"
        >
          <div>
            <p
              class="text-xs font-black uppercase tracking-[0.18em]
              text-green-300"
            >
              {{ adminTab.toUpperCase() === 'MERCH' ? 'Store management' : 'Site administration' }}
            </p>
            <h2 id="admin-tools-title" class="mt-1 text-2xl font-black text-white">
              {{
                adminTab.toUpperCase() === 'MERCH'
                  ? 'Merchandise workspace'
                  : 'Master settings and content'
              }}
            </h2>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              {{
                adminTab.toUpperCase() === 'MERCH'
                  ? 'Manage the products and categories customers discover in your store.'
                  : 'Keep public content, checkout settings, policies, and site information current.'
              }}
            </p>
          </div>
          <div
            class="flex w-max items-center gap-3 rounded-2xl border
            border-white/10 bg-brand-black/30 px-4 py-3"
          >
            <div
              class="flex h-9 w-9 items-center justify-center rounded-xl
              bg-brand-green/10 text-brand-green"
            >
              <i class="ri-layout-grid-line text-xl" aria-hidden="true"></i>
            </div>
            <div>
              <p class="text-xl font-black text-white">
                {{ filteredPanels.length }}
              </p>
              <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Tools available
              </p>
            </div>
          </div>
        </header>

        <div
          class="grid grid-cols-1 gap-5 sm:grid-cols-2
          xl:grid-cols-3"
        >
          <article
            v-for="(panel, key) in filteredPanels"
            :key="key"
            class="dashboard-card group relative flex min-h-[250px]
            flex-col overflow-hidden rounded-3xl border border-gray-200
            bg-white p-6 shadow-xl shadow-black/15 transition duration-300
            hover:border-green-300 hover:shadow-2xl"
          >
            <div
              class="pointer-events-none absolute -right-12 -top-14 h-40
              w-40 rounded-full transition duration-500 group-hover:scale-110"
              :class="panel.count !== -1 ? 'bg-green-50' : 'bg-gray-50'"
            ></div>
            <div
              class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r
              from-brand-green via-green-400 to-emerald-600 opacity-60
              transition group-hover:opacity-100"
            ></div>

            <div class="relative flex items-start justify-between gap-4">
              <div
                class="flex h-14 w-14 shrink-0 items-center justify-center
                rounded-2xl shadow-sm transition group-hover:-rotate-3
                group-hover:scale-105"
                :class="panel.count !== -1
                  ? 'bg-green-50 text-green-700'
                  : 'bg-gray-100 text-gray-700'"
              >
                <i
                  :class="[
                    panel.icon.startsWith('ri-')
                      ? panel.icon
                      : 'ri-' + panel.icon
                  ]"
                  class="text-3xl"
                  aria-hidden="true"
                ></i>
              </div>
              <span
                class="rounded-full px-3 py-1 text-[10px] font-black
                uppercase tracking-wider"
                :class="panel.count !== -1
                  ? 'bg-green-50 text-green-700'
                  : 'bg-gray-100 text-gray-500'"
              >
                {{ panel.count !== -1 ? 'Live data' : 'Configuration' }}
              </span>
            </div>

            <div class="relative mt-5 flex-1">
              <h3
                class="text-xl font-black leading-tight text-gray-900
                transition group-hover:text-green-800"
              >
                {{ panel.title }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-gray-500">
                {{
                  panel.count !== -1
                    ? 'Review and manage the records currently available in this area.'
                    : 'Open this area to review and update its current configuration.'
                }}
              </p>
            </div>

            <div
              v-if="panel.count !== -1"
              class="relative my-5 flex items-center justify-between
              rounded-2xl border border-green-100 bg-green-50 px-4 py-3"
            >
              <span
                class="text-xs font-black uppercase tracking-wider
                text-green-700"
              >
                Total records
              </span>
              <span class="text-2xl font-black text-green-800">
                {{ panel.count }}
              </span>
            </div>
            <div v-else class="h-5"></div>

            <NuxtLink
              :to="panel.route"
              class="relative inline-flex min-h-[46px] items-center
              justify-between gap-3 rounded-xl bg-green-600 px-4
              text-sm font-black text-white transition hover:bg-green-700
              focus:outline-none focus:ring-2 focus:ring-brand-green
              focus:ring-offset-2"
              :aria-label="`${panel.desc}: ${panel.title}`"
            >
              <span class="text-gray-50">{{ panel.desc }}</span>
              <span
                class="flex h-8 w-8 items-center justify-center rounded-lg
                bg-white/10 transition group-hover:translate-x-1"
              >
                <i
                  :class="[
                    panel.desc === 'Edit'
                      ? 'ri-pencil-line'
                      : 'ri-arrow-right-line'
                  ]"
                  class="text-gray-50"
                  aria-hidden="true"
                ></i>
              </span>
            </NuxtLink>
          </article>
        </div>

        <aside
          class="mt-6 flex flex-col gap-4 rounded-2xl border border-blue-100
          bg-blue-50 p-5 sm:flex-row sm:items-center"
          aria-label="Dashboard guidance"
        >
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center
            rounded-2xl bg-blue-100 text-blue-700"
          >
            <i class="ri-lightbulb-flash-line text-2xl" aria-hidden="true"></i>
          </div>
          <div>
            <h3 class="font-black text-blue-950">Keep customer-facing information current</h3>
            <p class="mt-1 text-sm leading-6 text-blue-800">
              Review content and checkout settings regularly so the public site
              stays accurate and trustworthy.
            </p>
          </div>
        </aside>
      </section>
    </main>
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
        {
          title: 'Terms And Condition',
          icon: 'ri-article-line',
          route: '/admin/terms-and-condition',
          desc: 'Edit',
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
            'News', 'Partner Sponsor', 'Tax', 'Code of Conduct', 'Rules', 'Insurance', 'Discount Codes', 'Shipping Settings', 'Shipping Master Controls', 'FAQ', 'Team Folder', 'Home Page Info', 'Payment', 'Terms And Condition'
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
          this.panels[0].count = response.data.data.products || 0;
          this.panels[1].count = response.data.data.category || 0;
          this.panels[2].count = response.data.data.discountcode || 0;
          this.panels[3].count = response.data.data.news || 0;
          this.panels[4].count = response.data.data.partner_sponsor || 0;
        })
        .catch(error => {
          console.error('Error fetching total count:', error.response);
        });
    }
  }
};
</script>

<style>
  .dashboard-tabs .v-tabs-bar {
    height: auto;
    background: transparent !important;
  }

  .dashboard-tabs .v-slide-group__content {
    gap: 0.5rem;
    padding-top: 0.25rem;
  }

  .dashboard-tabs .v-tab {
    min-height: 52px;
    border: 1px solid #e5e7eb;
    border-radius: 0.875rem;
    color: #4b5563 !important;
    font-size: 0.8125rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: none;
    transition: color 180ms ease, background-color 180ms ease,
      border-color 180ms ease, transform 180ms ease;
  }

  .dashboard-tabs .v-tab:hover {
    border-color: #86efac;
    background: #f0fdf4;
    color: #166534 !important;
  }

  .dashboard-tabs .v-tab.v-tab--active {
    border-color: #1a1a1b;
    background: #1a1a1b;
    color: #fff !important;
    box-shadow: 0 12px 24px -16px rgba(17, 24, 39, 0.8);
  }

  .dashboard-tabs .v-tabs-slider-wrapper {
    display: none;
  }

  .dashboard-tabs .v-slide-group__prev,
  .dashboard-tabs .v-slide-group__next {
    color: #166534;
  }

  .dashboard-card {
    transform: translateZ(0);
  }

  .dashboard-card:hover {
    transform: translateY(-3px);
  }

  .admin-embedded-workspace {
    min-width: 0;
  }

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
  html {
    scroll-behavior: smooth;
  }

  @media (max-width: 639px) {
    .dashboard-tabs .v-tab {
      min-width: 132px;
    }

    .admin-embedded-workspace {
      overflow-x: hidden;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dashboard-card,
    .dashboard-card:hover,
    .dashboard-tabs .v-tab {
      transform: none;
      transition: none;
    }
  }
</style>
