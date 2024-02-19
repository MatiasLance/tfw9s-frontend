<template>
  <!-- Footer -->
  <footer class="bg-brand-black">
    <!-- section footer top -->
    <section class="py-8 text-white">
			<div class="container mx-auto max-w-screen-xl px-4">
				<div class="flex flex-wrap sm:space-x-8 md:space-x-16 lg:space-x-24">
					<aside class="mx-auto mb-5 w-full self-center md:w-1/3 lg:w-1/4">
            <div
              class="
              mx-auto
              my-4
              block
              max-w-full
              text-center text-[16px] text-white
              lg:text-start
              "
            >
              Copyright, All Rights Reserved TFW Rugby League 2024.
            </div>
					</aside> <!-- col .// -->
					<aside
            v-if="showFirstLinks"
            class="mb-5 flex-auto sm:w-auto"
            :class="!showFirstLinks ? 'w-full' : 'w-1/2'"
          >
						<ul class="mt-2 space-y-1 text-center sm:text-left">
 							<li
                v-for="(link, linkIndex) in links"
                :key="`links-${linkIndex}`"
              >
								<NuxtLink
                  :to="link.to"
                  class="
                    hover:text-primary
                    swlink
                    mb-2
                    inline-block
                    text-center
                    text-base
                    leading-loose
                    text-white
                    opacity-70
                    transition
                    duration-300
                    ease-in-out
                    hover:underline
                    hover:decoration-brand-grey
                    hover:decoration-4
                    hover:underline-offset-8
                    hover:opacity-100
                  "
                >
                  {{ link.text }}
                </NuxtLink>
							</li>
						</ul>
					</aside> <!-- col .// -->
					<aside
            v-if="showSecondLinks"
            class="mb-5 w-1/2 flex-auto  sm:w-auto"
          >
						<ul class="mt-2 space-y-1 text-center sm:text-left">
 							<li
                v-for="(link, linkIndex) in links2"
                :key="`links2-${linkIndex}`"
              >
							  <NuxtLink :to="link.to">
                  <span
                    class="
                    hover:text-primary
                    swlink
                    mb-2
                    inline-block
                    text-center text-base
                    leading-loose
                    text-white opacity-70
                    transition
                    duration-300
                    ease-in-out
                    hover:underline
                    hover:decoration-brand-grey
                    hover:decoration-4
                    hover:underline-offset-8
                    hover:opacity-100
                    "
                  >
                    {{ link.text }}
                  </span>
                </NuxtLink>
							</li>
						</ul>
						<ul class="mt-2 space-y-1 text-center sm:text-left">
 							<li
                v-for="(link, linkIndex) in links3"
                :key="`links2-${linkIndex}`"
              >
							  <NuxtLink :to="link.to">
                  <span
                    class="
                    hover:text-primary
                    swlink
                    mb-2
                    inline-block
                    text-center text-base
                    leading-loose
                    text-white opacity-70
                    transition
                    duration-300
                    ease-in-out
                    hover:underline
                    hover:decoration-brand-grey
                    hover:decoration-4
                    hover:underline-offset-8
                    hover:opacity-100"
                  >
                    {{ link.text }}
                  </span>
                </NuxtLink>
							</li>
						</ul>
					</aside> <!-- col .// -->
				</div>  <!-- grid .// -->
			</div> <!-- container .// -->
		</section>

    <!-- section footer bottom -->
  </footer>
</template>

<script>
export default {
  data() {
    return {
      showFirstLinks: true,
      showSecondLinks: false,
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
          to: '/about-us',
          text: 'About',
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
      links2: [],
      links3: [],
      paymentchannels: [
        'stripe-purple.svg',
        'visa.svg',
        'mastercard.svg',
        'maestro.svg',
        'americanexpress.svg',
        'jcb.svg',
        'unionpay.svg',
        'paypal.jpg',
        'afterpay.svg',
      ]
    }
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