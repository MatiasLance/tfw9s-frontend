<template>
  <!-- Footer -->
  <footer class="bg-brand-yellow">
    <!-- section footer top -->
    <section class="py-12 text-white">
			<div class="container mx-auto max-w-screen-xl px-4">
				<div class="flex flex-wrap sm:space-x-8 md:space-x-16 lg:space-x-24">
					<aside class="mx-auto mb-5 w-full self-center md:w-1/3 lg:w-1/4">
						<NuxtLink to="/" class="py-5">
              <img
                src="~/assets/images/logo_brand_02.svg"
                class="footer-logo w-52 mx-auto" height="38"
              />
            </NuxtLink>
            <div
              class="
              mx-auto
              my-4
              block
              max-w-full
              text-center text-[16px] text-brand-black
              lg:text-start
              "
            >
              &copy; Copyright 2022, Drum HQ. | Built by
                <a
                href="https://pageone247.com/"
                target="_blank"
                class="swlink underline hover:text-brand-grey"
                >
                PageOne247
                </a>
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
                    leading-loose text-brand-black
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
                    text-brand-black
                    opacity-70 transition
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
                    text-brand-black
                    opacity-70 transition
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
					</aside> <!-- col .// -->
				</div>  <!-- grid .// -->
			</div> <!-- container .// -->
		</section>

    <!-- section footer bottom -->
    <section class="bg-yellow-600 py-6">
      <div class="container mx-auto max-w-screen-xl px-4">
        <div class="justify-between lg:flex">
          <div class="mb-3 flex flex-wrap gap-2">
            <img
              v-for="paymentimg in paymentchannels"
              :key="paymentimg"
              :src="`/img/misc/${paymentimg}`"
              height="24"
              class="h-6"
              :alt="`Payment method - ${paymentimg}`"
            />
          </div>
          <div class="space-x-6">
            <nav class="space-x-4">
            </nav>
          </div>
        </div>
      </div>
    </section>
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
          text: 'Store',
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
  position: relative;
}
.swlink {
  color: black !important;
  font-weight: 600;
}
.swlink:hover {
  color: #191919 !important;
  font-weight: 600;
}
</style>