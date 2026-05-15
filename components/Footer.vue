<template >
  <footer class="w-screen bg-brand-black text-white">
    <section class="mx-auto max-w-screen-xl">
      <div class="p-4 flex flex-col md:flex-row md:justify-between gap-2">
        <div class="flex flex-col items-center justify-left">
          <span class="text-sm text-left">
            &copy; TFW9's {{ currentYear }}. All Rights Reserved.
          </span>
          <p class="text-xs text-left">
            Built by:{{ ' ' }}
            <span class="font-semibold cursor-pointer transition
            duration-300 ease-in-out hover:text-[#5EE738]"
              @click="openLink('https://pageone247.com/')"
            >
              PageOne247
            </span>
          </p>
        </div>
        <div class="footer-menu-wrapper">
          <VMenu
          :top="true"
          :offset-y="true"
          origin="bottom left"
          transition="scale-transition"
          content-class="footer-dropdown"
          >
          <template #activator="{ on, attrs }">
            <span
              class="footer-menu-activator transition duration-300 ease-in-out hover:text-[#5EE738]"
              v-bind="attrs"
              v-on="on"
            >
              Contact
            </span>
          </template>

            <VList dark class="rounded-lg border">
              <VListItem>
                <VListItemTitle
                title="Visit Facebook Page"
                class="flex items-center brightness-75 transition
                duration-200 hover:scale-105 hover:brightness-100
                cursor-pointer"
                @click="openLink('https://www.facebook.com/thefinalwhistleRL/')"
                >
                  <i class="ri-facebook-circle-fill text-2xl"></i>
                  <span class="ml-2 text-sm">
                    TFW9's (@TFW9's)
                  </span>
                </VListItemTitle>
              </VListItem>
              <VListItem>
                <VListItemTitle
                title="Visit Instagram Page"
                class="flex items-center brightness-75 transition
                duration-200 hover:scale-105 hover:brightness-100
                cursor-pointer"
                @click="openLink('https://www.instagram.com/tfw9s')"
                >
                    <i class="ri-instagram-fill text-2xl"></i>
                  <span class="ml-2 text-sm">
                    TFW9s (@tfw9s)
                  </span>
                </VListItemTitle>
              </VListItem>
              <VListItem>
                <VListItemTitle
                title="Compose Email"
                class="flex items-center brightness-75 transition
                duration-200 hover:scale-105 hover:brightness-100
                cursor-pointer"
                @click="openLink('https://mail.google.com/mail/u/0/?fs=1&to=thefinalwhistlerl@hotmail.com&su=&body=&tf=cm')"
                >
                  <i class="ri-mail-add-fill text-2xl"></i>
                  <span class="ml-2 text-sm">
                    thefinalwhistlerl@hotmail.com
                  </span>
                </VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
          <NuxtLink v-if="$store.state.auth.user === null" to="/login">
            <span
            class="px-5 text-white transition
            duration-300 ease-in-out hover:text-[#5EE738]"
            >
              Login
            </span>
          </NuxtLink>
          <NuxtLink
          v-else-if="
          ($store.state.auth.roles.includes('admin') ||
          $store.state.auth.roles.includes('superadmin'))
          && $route.path !== '/admin'" to="/admin"
          >
            <span
            class="px-5 text-white transition
            duration-300 ease-in-out hover:text-[#5EE738]"
            >
              Admin
            </span>
          </NuxtLink>
          <NuxtLink
          v-else-if="
          $store.state.auth.roles.includes('manager')
          && $route.path !== '/manage'" to="/manage"
          >
            <span
            class="px-5 text-white transition
            duration-300 ease-in-out hover:text-[#5EE738]"
            >
              Manage
            </span>
          </NuxtLink>
          <span
          v-else-if="$store.state.auth.user !== null &&
          ($route.path === '/admin' || $route.path === '/manage')"
          class="z-10 px-5 text-white transition
          duration-300 ease-in-out hover:text-[#5EE738]
          cursor-pointer"
          @click="logout"
          >
            Logout
          </span>
          <span
          v-else
          class="z-10 px-5 text-white transition
          duration-300 ease-in-out hover:text-[#5EE738]
          cursor-pointer"
          @click="logout"
          >
            Logout
          </span>

        </div>
      </div>
    </section>
  </footer>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import logout from '~/mixins/auth/logout';
import aosMixin from '@/mixins/aos';

export default {
  mixins: [ logout, aosMixin ],
  data() {
    return {
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ]
    }
  },
  methods: {
    openLink(url) {
      window.open(url, '_blank');
    },
    toClipboard(number) {
      navigator.clipboard.writeText(number);
      this.$oruga.notification.open({
        message: 'Saved to Clipboard',
        variant: 'success',
        duration: 5000,
        position: 'bottom',
        queue: true,
      });
    },
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
}
</script>

<style>
.bt-site-footer {
  position: horizontal;
}
.swlink {
  color: rgb(255, 255, 255) !important;
  font-weight: 600;
}
.swlink:hover {
  color: #f1ebeb !important;
  font-weight: 600;
}
.footer-menu-wrapper {
  position: relative;
  z-index: 10;
  display: inline-block;
}
.footer-dropdown {
  z-index: 999 !important;
}
</style>
