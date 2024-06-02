<template >
  <!-- Footer fixed bottom-0 was removed so it won't stick in the page -->
  <footer class="w-screen bg-brand-black text-white">
    <section class="mx-auto max-w-screen-xl">
      <div class="grid grid-cols-1 p-4 md:grid-cols-4">
        <div
        class="col-span-1 md:col-span-3 flex justify-start"
        >
          <span class="text-center text-sm md:text-left">
            Copyright, All Rights Reserved TFW9's
          </span>
        </div>
        <div class="md:justify-right col-span-1 flex justify-center">
        <!--
          <span
          class="mr-5 transition
          duration-300 ease-in-out hover:text-[#5EE738]"
          >
          Contact
          </span>
        -->
          <VMenu
          :top="true"
          :offset-y="true"
          origin="bottom left"
          transition="scale-transition"
          >
          <template v-slot:activator="{ on, attrs }">
            <span
            class="transition
            duration-300 ease-in-out hover:text-[#5EE738]"
            v-bind="attrs"
            v-on="on"
            >
            Contact
            </span>
          </template>
            <VList dark class="rounded-lg border">
              <!--
                <VListItem>
                <VListItemTitle>
                <i
                title="Visit Facebook Page"
                class="ri-facebook-circle-fill text-3xl brightness-75
                transition duration-200 hover:scale-110 hover:brightness-100"
                @click="openLink('https://www.facebook.com/thefinalwhistleRL/')"
                />
                <i
                title="Visit Instagram Page"
                class="ri-instagram-fill text-3xl brightness-75
                transition duration-200 hover:scale-110 hover:brightness-100"
                @click="openLink('https://l.facebook.com/l.php?u=https%3A%2F%2Finstagram.com%2Ftfw9s%3Figshid%3DOGQ5ZDc2ODk2ZA%253D%253D%26utm_source%3Dqr%26fbclid%3DIwZXh0bgNhZW0CMTAAAR2BTIykFbgN7_LWAQ2FQNn0g7Qc8YTPyoOTPV9-UMQGtrOjtPntwhZKo6w_aem_AS0HPNsfcSzS1IUprNhe78jjaBZRTBO_BsnO2Eno2PYRiBQwkg9_74z8a5VbolGNRb_LMdw_hWzOQFhwc1fTLLUg&h=AT0qMKlBY3_pYjGjQxkBNR-qMUoooyU4VhqJgkw4W1XGXAyfPLh4OEcY5APVZIFozfyw_4QoI2m70QqCD_dazeutUpTN5hYmciEsQFwh6-wBs5rbKIoikdmdEflIJAkZlEGB8A')"
                />
                </VListItemTitle>
                </VListItem>
              -->
              <VListItem>
                <VListItemTitle
                title="Visit Facebook Page"
                class="flex items-center brightness-75 transition
                duration-200 hover:scale-105 hover:brightness-100
                cursor-pointer"
                @click="openLink('https://www.facebook.com/thefinalwhistleRL/')"
                >
                  <i
                  class="ri-facebook-circle-fill text-2xl"
                  />
                  <span class="ml-2 text-sm">
                    The Final Whistle - Rugby League
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
                  <i
                  class="ri-instagram-fill text-2xl"
                  />
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
                @click="openLink('https://mail.google.com/mail/u/0/?fs=1&to=admin@thefinalwhistle.com&su=&body=&tf=cm')"
                >
                  <i class="ri-mail-add-fill text-2xl"/>
                  <span class="ml-2 text-sm">
                    admin@thefinalwhistle.com
                  </span>
                </VListItemTitle>
              </VListItem>
              <VListItem>
                <VListItemTitle
                title="Save Number"
                class="flex items-center brightness-75 transition
                duration-200 hover:scale-105 hover:brightness-100
                cursor-pointer"
                @click="toClipboard('+1 (899) 884-3727')"
                >
                  <i class="ri-phone-fill text-2xl"/>
                  <span class="ml-2 text-sm">
                    +1 (899) 884-3727
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
          v-if="
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
          v-if="
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
          v-if="$store.state.auth.user !== null &&
          ($route.path === '/admin' || $route.path === '/manage')"
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
</style>