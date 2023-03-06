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
                  text-[#1a1d18]
                "
              >
                Contact Drum HQ
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
                {{ headline }}
              </span>
            </h1>
            <div class="mt-0 pt-3 text-[1.125rem] leading-[1.5em]">
              <template v-if="showMap">
                  <div class="my-4">
                    <iframe
src="https://www.editmysite.com/ajax/apps/generateMap.php?elementid=04a40800-69fb-11ed-a163-6117b7a7504e&amp;map=google&amp;ineditor=0&amp;width=auto&amp;point=1&amp;control=3&amp;scalecontrol=1&amp;height=350px&amp;zoom=10&amp;zoomScale=50&amp;lat=-27.932873&amp;long=153.38002&amp;pincolor=%23ffffff&amp;pincontrastcolor=%23000000&amp;styles=%5B%7B%22featureType%22%3A%22poi%22%2C%22elementType%22%3A%22labels.text%22%2C%22stylers%22%3A%5B%7B%22visibility%22%3A%22off%22%7D%5D%7D%2C%7B%22featureType%22%3A%22poi.business%22%2C%22stylers%22%3A%5B%7B%22visibility%22%3A%22off%22%7D%5D%7D%2C%7B%22featureType%22%3A%22road%22%2C%22elementType%22%3A%22labels.icon%22%2C%22stylers%22%3A%5B%7B%22visibility%22%3A%22off%22%7D%5D%7D%2C%7B%22featureType%22%3A%22transit%22%2C%22stylers%22%3A%5B%7B%22visibility%22%3A%22off%22%7D%5D%7D%5D&amp;touch=1&amp;forcemapdrag=1" title="" allowtransparency="true" frameborder="0" scrolling="no" loading="lazy" data-v-ab1ca44a=""
                    style="width: 100%; height: 350px;"
></iframe>
                  </div>
                  <button
                    type="button"
                    class="rounded-xl
                    bg-brand-black px-6 py-3
                    text-base text-white hover:bg-slate-200
                    hover:text-black"
                    @click="getDirectionsLink"
                  >
                  Get directions
                </button>
              </template>
              <address class="my-4">
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <p v-html="address">
                  </p>
                  <p
                    v-if="showNote"
                    class="my-3 text-[16px] sm:text-sm"
                  >
                    Note: {{ importantNotes }}
                  </p>
              </address>
              <span class="mb-2 block">
                <a
                  :href="`tel:${mobile}`"
                  class="
                  hover:underline
                  hover:decoration-gray-400
                  hover:decoration-4
                  hover:underline-offset-8"
                >
                  {{ mobile }}
                </a>
              </span>
              <a
                class="mb-2 block hover:text-slate-400
                hover:decoration-slate-700
                hover:underline-offset-4"
                :href="toemail"
              >
                {{ email }}
              </a>
            </div>
          </header>
          <div class="mb-[40px]"></div>
          <div
            v-if="showHours"
            class="max-w-[calc(100% + 40px)] grid grid-cols-12"
          >
            <div class="col-span-12 md:col-span-6">
              <h5 class="text-[1.563rem] font-bold leading-[1] text-[#1a1d18]">
                Hours
              </h5>
              <div class="mb-3"></div>
              <div v-if="showTimes" class="flex justify-start gap-2">
                <small class="paragraph my-3 block text-sm">
                  MONDAY: {{ time1 }}<br>
                  TUESDAY: {{ time1 }}<br>
                  WEDNESDAY: {{ time1 }}<br>
                  THURSDAY: {{ time1 }}<br>
                  FRIDAY: {{ time1 }}<br>
                  SATURDAY: {{ time3 }}<br>
                  SUNDAY: {{ time4 }}
                </small>
              </div>
              <div v-if="showAppointmentMsg" class="flex justify-start gap-2">
                <small class="paragraph my-3 block text-base">
                  By Appointment Only
                </small>
              </div>
            </div>
          </div>
          <div class="mb-[40px]"></div>
          <div class="max-w-[calc(100% + 40px)] grid grid-cols-12">
            <div v-if="socials.activate" class="col-span-12 md:col-span-6">
              <h5 class="text-[1.563rem] font-bold leading-[1] text-[#1a1d18]">
                Follow us
              </h5>
              <div class="mb-3"></div>
              <div class="flex justify-start gap-2">
                <a
                  v-if="socials.fb.length != 0"
                  :href="socials.fb"
                >
                  <div
                    class="
                      flex
                      h-[48px]
                      w-[48px]
                      cursor-pointer
                      items-center
                      justify-center
                      bg-gray-200
                      hover:bg-slate-400 hover:text-white
                    "
                  >
                    <i class="ri-facebook-line text-2xl"></i>
                  </div>
                </a>
                <a
                  v-if="socials.linkedin.length != 0"
                  :href="socials.linkedin"
                >
                  <div
                    class="
                      flex
                      h-[48px]
                      w-[48px]
                      cursor-pointer
                      items-center
                      justify-center
                      bg-gray-200
                      hover:bg-slate-400 hover:text-white
                    "
                  >
                    <i class="ri-linkedin-box-line text-2xl"></i>
                  </div>
                </a>
                <a
                  v-if="socials.ig.length != 0"
                  :href="socials.ig"
                >
                  <div
                    class="
                      flex
                      h-[48px]
                      w-[48px]
                      cursor-pointer
                      items-center
                      justify-center
                      bg-gray-200
                      hover:bg-slate-400 hover:text-white
                    "
                  >
                    <i class="ri-instagram-line text-2xl"></i>
                  </div>
                </a>
                <a
                  v-if="socials.youtube != 0"
                  :href="socials.youtube"
                >
                  <div
                    class="
                      flex
                      h-[48px]
                      w-[48px]
                      cursor-pointer
                      items-center
                      justify-center
                      bg-gray-200
                      hover:bg-slate-400 hover:text-white
                    "
                  >
                    <i class="ri-youtube-line text-2xl"></i>
                  </div>
                </a>
                <a
                  v-if="socials.tiktok.length != 0"
                  :href="socials.tiktok"
                >
                  <div
                    class="
                      flex
                      h-[48px]
                      w-[48px]
                      cursor-pointer
                      items-center
                      justify-center
                      bg-gray-200
                      hover:bg-slate-400 hover:text-white
                    "
                  >
                    <i class="ri-music-line text-2xl"></i>
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
import BaseHeader from '~/components/base/BaseHeader.vue';
import ContactSection from '~/components/ContactSection.vue';
export default {
  name: 'contact-us',
  components: {
    BaseHeader,
    ContactSection,
  },
  data() {
    return {
      address: 'Suite 11 / 1407 Logan Rd<br>Mt Gravatt QLD 4122',
      importantNotes: 'For local (Gold Coast) customers and order pickups only. Strictly no walk-in policy, unless appointment is scheduled. Please email or phone for a prearranged, curb side pick-up.',
      mapslink: 'https://www.google.com/maps/dir/?api=1&destination=280+Brisbane+Road+Labrador+QLD+4215',
      mobile: '0411 965 954',
      email: 'hello@thedrumhq.com.au',
      toemail: 'mailto:hello@thedrumhq.com.au',
      headline: 'ENQUIRE / BOOK TO VISIT US!',
      pageSEO: {
        title: 'Contact Us - Drum HQ',
        description: 'How can we help? Reach out to us for more information.',
      },
      time1: '9:00AM - 4:00PM',
      time2: '9:00AM - 7:00PM',
      time3: '10:00AM - 3:00PM',
      time4: 'CLOSED',
      socials: {
        activate: true,
        fb: '#',
        linkedin: '',
        ig: '#',
        tiktok: '',
        youtube: ''
      },
      showHours: true,
      showTimes: false,
      showAppointmentMsg: true,
      showMap: false,
    }
  },
  head() {
    return {
      title: 'Contact Us - Drum HQ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageSEO.description,
        },
      ],
    };
  },
  methods: {
    getDirectionsLink() {
      window.open(this.mapslink, '_blank')
    }
  }
};
</script>