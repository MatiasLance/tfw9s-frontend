<template>
  <div class="min-h-screen bg-[#1A1A1B]">
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
            superheadline flex flex-row
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
          Register
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
                  text-white
                "
              >
              The Final Whistle - Rugby League
              </span>
            </h2>
            <h1 class="text-[3.75rem] leading-[1]">
              <span
                class="font-montserrat from-70%
                via-95% to-100% mb-4
                bg-gradient-to-b
                from-[#5EE738]
                via-[#3e872a]
                to-[#050505]
                bg-clip-text
                text-[2.5rem]
                font-bold uppercase
                leading-tight
                text-transparent sm:pr-8 sm:text-5xl
                xl:pr-10 xl:text-6xl"
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
                    hover:text-white"
                    @click="getDirectionsLink"
                  >
                  Get directions
                </button>
              </template>
              <address class="my-4 text-white opacity-75">
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <span class="flex items-center">
                    <i class="ri-map-pin-fill pr-1"/>
                    <p v-html="address"/>
                  </span>
                  <p
                    v-if="showNotes"
                    class="my-3 text-[16px] sm:text-sm"
                  >
                    Note: {{ importantNotes }}
                  </p>
              </address>
              <span class="mb-2 block">
                <a
                  :href="`tel:${mobile}`"
                  class="flex items-center
                  opacity-75 transition
                  duration-300 ease-in-out
                  hover:opacity-100"
                >
                <i class="ri-phone-fill pr-1"/>{{ mobile }}
                </a>
              </span>
              <a
                class="flex items-center
                opacity-75 transition
                duration-300 ease-in-out
                hover:opacity-100"
                :href="toemail"
              >
              <i class="ri-mail-send-line pr-1"/>{{ email }}
              </a>
            </div>
          </header>
          <div class="mb-[40px]"></div>
          <div
            v-if="showHours"
            class="max-w-[calc(100% + 40px)] grid grid-cols-12"
          >
            <div class="col-span-12 md:col-span-6">
              <h5 class="text-[1.563rem] font-bold leading-[1] text-white">
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
              <h5 class="text-[1.563rem] font-bold leading-[1] text-white">
                Follow us
              </h5>
              <div class="mb-3"></div>
              <div class="flex justify-start gap-2">
                <a
                  v-if="socials.fb.length != 0"
                  :href="socials.fb"
                  target="_blank"
                >
                  <div
                    class="
                      flex
                      h-[48px]
                      w-[48px]
                      text-white
                      cursor-pointer
                      items-center
                      justify-center
                      transition
                      opacity-75
                      hover:scale-125
                      hover:opacity-100
                    "
                  >
                    <i class="ri-facebook-box-line text-5xl"></i>
                  </div>
                </a>
                <a
                  v-if="socials.linkedin.length != 0"
                  :href="socials.linkedin"
                  target="_blank"
                >
                  <div
                    class="
                      flex
                      h-[48px]
                      w-[48px]
                      text-white
                      cursor-pointer
                      items-center
                      justify-center
                      transition
                      opacity-75
                      hover:scale-125
                      hover:opacity-100
                    "
                  >
                    <i class="ri-linkedin-box-line text-5xl"></i>
                  </div>
                </a>
                <a
                  v-if="socials.ig.length != 0"
                  :href="socials.ig"
                  target="_blank"
                >
                  <div
                  class="
                  flex
                  h-[48px]
                  w-[48px]
                  text-white
                  cursor-pointer
                  items-center
                  justify-center
                  transition
                  opacity-75
                  hover:scale-125
                  hover:opacity-100
                "
                  >
                    <i class="ri-instagram-line text-5xl"></i>
                  </div>
                </a>
                <a
                  v-if="socials.youtube != 0"
                  :href="socials.youtube"
                  target="_blank"
                >
                  <div
                  class="
                  flex
                  h-[48px]
                  w-[48px]
                  text-white
                  cursor-pointer
                  items-center
                  justify-center
                  transition
                  opacity-75
                  hover:scale-125
                  hover:opacity-100
                "
                  >
                    <i class="ri-youtube-line text-5xl"></i>
                  </div>
                </a>
                <a
                  v-if="socials.tiktok.length != 0"
                  :href="socials.tiktok"
                  target="_blank"
                >
                  <div
                  class="
                  flex
                  h-[48px]
                  w-[48px]
                  text-white
                  cursor-pointer
                  items-center
                  justify-center
                  transition
                  opacity-75
                  hover:scale-125
                  hover:opacity-100
                "
                  >
                    <i class="ri-music-line text-5xl"></i>
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
  name: 'register',
  components: {
    BaseHeader,
    ContactSection,
  },
  data() {
    return {
      address: 'Establishment Address here 📌',
      importantNotes: 'For local (Gold Coast) customers and order pickups only. Strictly no walk-in policy, unless appointment is scheduled. Please email or phone for a prearranged, curb side pick-up.',
      mapslink: 'https://www.google.com/maps/dir/?api=1&destination=280+Brisbane+Road+Labrador+QLD+4215',
      mobile: '0411 965 954',
      email: 'thefinalwhistlerl@hotmail.com',
      toemail: 'mailto:thefinalwhistlerl@hotmail.com',
      headline: 'Message Here 🤌',
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
        fb: 'https://www.facebook.com/thefinalwhistleRL/',
        linkedin: '',
        ig: 'https://www.instagram.com/tfw9s',
        tiktok: '',
        youtube: ''
      },
      showHours: true,
      showTimes: false,
      showAppointmentMsg: true,
      showMap: false,
      showNotes: false
    }
  },
  head() {
    return {
      title: 'Contact Us - TFW9s',
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

<style scoped>
a{
  color: white !important;
}
a:hover{
  color: #5EE738 !important;
}
</style>