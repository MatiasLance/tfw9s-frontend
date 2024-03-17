<template >
  <!-- Footer -->
  <footer class="fixed bottom-0 w-screen bg-brand-black text-white">
    <section class="mx-auto max-w-screen-xl">
      <div class="grid grid-cols-1 p-4 md:grid-cols-4">
        <div
        class="col-span-1 md:col-span-3 flex justify-start"
        >
          <span class="text-center text-sm md:text-left">
            Copyright, All Rights Reserved TFW Rugby League 2024
          </span>
        </div>
        <div class="md:justify-right col-span-1 flex justify-center">

          <span
          class="mr-5 transition
          duration-300 ease-in-out hover:text-[#5EE738]"
          >
            Contact
          </span>
          <NuxtLink v-if="$store.state.auth.user === null" to="/login">
            <span
            class="ext-white px-5 transition
            duration-300 ease-in-out hover:text-[#5EE738]"
            >
              Login
            </span>
          </NuxtLink>
          <NuxtLink
          v-if="$store.state.auth.user !== null &&
          $route.path !== '/admin'" to="/admin"
          >
            <span
            class="px-5 text-white transition
            duration-300 ease-in-out hover:text-[#5EE738]"
            >
              Admin
            </span>
          </NuxtLink>
          <span
          v-if="$store.state.auth.user !== null &&
          $route.path === '/admin'"
          class="z-10 px-5 text-white transition
          duration-300 ease-in-out hover:text-[#5EE738]"
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

export default { mixins: [ logout, aosMixin ] }
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