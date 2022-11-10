<template>
  <div>
    <BaseHeader class="bg-gradient-to-r from-brand-grey to-brand-black">
      <div
        class="
          col-span-12
          space-y-3
          px-6
          text-center
          sm:space-y-3 sm:text-left
          md:mt-12
          lg:col-span-6
          xl:mt-10
        "
      >
        <span
          class="
            superheadline
            flex flex-row
            items-center
            pb-3
            text-[1rem]
            font-normal
          "
        >
          <span class="font-medium">
            <NuxtLink to="/">
              <VBtn text color="white">Home</VBtn>
            </NuxtLink>
          </span>
        </span>
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-6xl">
          Contact Us
        </h1>
      </div>
    </BaseHeader>

    <div class="mx-auto max-w-screen-xl px-4 py-28">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 px-10 lg:col-span-6">
          <header class="text-left">
            <h2 class="text-[3.75rem] leading-[1]">
              <span
                class="
                  superheadline
                  font-montserrat
                  flex flex-row
                  items-center
                  pb-3
                  text-[1rem]
                  font-bold
                  capitalize
                  text-[#3981da]
                "
              >
                Contact Revamped
              </span>
            </h2>
            <h1 class="text-[3.75rem] leading-[1]">
              <span
                class="
                  font-montserrat
                  block
                  text-[2.5rem]
                  font-bold
                  uppercase
                  leading-tight
                  text-black
                  sm:pr-8 sm:text-5xl
                  xl:pr-10 xl:text-6xl
                "
              >
                how can we help ?
              </span>
            </h1>
            <div class="mt-0 pt-3 text-[1.125rem] leading-[1.5em]">
              <address class="mb-4">
                {{ address }}
              </address>
              <span class="mr-2 font-bold">Mobile:</span>
              <span class="mb-2 block">{{ mobile }}</span>
              <span class="mr-2 font-bold">Email:</span>
              <span class="mb-2 block">{{ email }}</span>
            </div>
          </header>
          <div class="mb-[40px]"></div>
          <div class="max-w-[calc(100% + 40px)] grid grid-cols-12">
            <div class="col-span-12 md:col-span-6">
              <h5 class="text-[1.563rem] font-bold leading-[1] text-[#3981da]">
                Social
              </h5>
              <div class="mb-3"></div>
              <div class="flex justify-start gap-2">
                <a href="#">
                  <div
                    class="
                      flex
                      h-[48px]
                      w-[48px]
                      cursor-pointer
                      items-center
                      justify-center
                      bg-gray-200
                      hover:bg-blue-400 hover:text-white
                    "
                  >
                    <i class="ri-facebook-line text-2xl"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 px-10 lg:col-span-6">
          <ContactSection />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
import BaseHeader from '../components/base/BaseHeader.vue';
import ContactSection from '../components/ContactSection.vue';
export default {
  name: 'contact-us',
  components: { BaseHeader, ContactSection },
  data() {
    return {
      address: 'Point Lookout, 4183 North Stradbroke Island',
      mobile: '0438 098 059',
      email: 'admin@straddieworld.com',
      pageSEO: {
        title: 'Contact Us - Revamped',
        description: 'How can we help? Reach out to us for more information. Point Lookout, 4183 North Stradbroke Island Mobile: 0438 098 059',
      }
    }
  },
  head() {
    return {
      title: 'Contact Us - Revamped',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageSEO.description,
        },
      ],
    };
  }
};
</script>

<style>
.superheadline:before {
  width: 3.125rem;
  border-top: 2px solid #3981da;
  margin-right: 10px;
  content: ' ';
}
</style>