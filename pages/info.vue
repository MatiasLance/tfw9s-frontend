<template>
  <div class="w-screen min-h-screen bg-[#1A1A1B]">
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
          Info
        </h1>
      </div>
    </BaseHeader>
    <section class="mx-auto max-w-screen-xl gap-4 p-6">
      <div class="grid grid-cols-1 gap-4">
        <span class="col-cpan-1">
          <VueSlickCarousel
            v-bind="slickSettings"
            draggable
            focus-on-select
            >
            <div
              v-for="tab in tabs"
              :key="tab.name" class="px-2"
            >
              <button
                type="button"
                class="
                w-full
                rounded-md
                py-1.5
                text-center
                font-semibold
                "
                :class="(activeTab == tab.name)
                ? `from-40% via-95% to-100%
                    bg-gradient-to-br
                    from-[#5EE738]
                    via-[#3e872a]
                    to-[#050505]
                    text-white`
                :
                'bg-[#212121] text-[#555555]'"
                @click="setTab(tab.name)"
              >
                {{ tab.Label }}
              </button>
            </div>
          </VueSlickCarousel>
        </span>
        <span
        v-if="activeTab == 'code'"
        class="col-cpan-1 p-4 text-white"
        data-aos="fade-up"
        data-aos-offset="0"
        >
          <h3 class="text-xl mb-2 font-bold underline">
            Code of Conduct:
          </h3>
          <ul class="pl-8 list-outside list-disc space-y-2">
              <li
                  v-for="statement in codeOfConduct"
                  :key="statement.id"
              >
                  {{ statement.content }}
              </li>
          </ul>
        </span>
        <span
        v-if="activeTab == 'rules'"
        class="col-cpan-1 p-4 text-white"
        data-aos="fade-up"
        data-aos-offset="0"
        >
          <h3 class="text-xl mb-2 font-bold underline">
            Rules and Regulations:
          </h3>
          <ul class="pl-8 list-outside list-disc space-y-2">
              <li
                  v-for="statement in Rules"
                  :key="statement.id"
              >
                  {{ statement.content }}
              </li>
          </ul>
        </span>
        <span
        v-if="activeTab == 'insurance'"
        class="col-cpan-1 p-4 text-white"
        data-aos="fade-up"
        data-aos-offset="0"
        >
          <h3 class="text-xl mb-2 font-bold underline">
            Insurance Policies:
          </h3>
          <ul class="pl-8 list-outside list-disc space-y-2">
              <li
                  v-for="statement in insurancePolicies"
                  :key="statement.id"
              >
                  {{ statement.content }}
              </li>
          </ul>
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
export default {
  components: { VueSlickCarousel },
  data() {
    return {
      pageSEO: {
        title: 'Info - TFW Rugby League',
        description: ''
      },
      activeTab: 'code',
      tabs: [
        { name: 'code', Label: 'Code of Conduct' },
        { name: 'rules', Label: 'Rules' },
        { name: 'insurance', Label: 'Insurance' },
      ],
      slickSettings: {
        arrows: false,
        slidesToShow: 4,
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              initialSlide: 0,
              infinite: true,
              arrows: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 3,
              initialSlide: 0,
              infinite: true,
              arrows: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 2,
              initialSlide: 0,
              infinite: true,
              arrows: true
            }
          },
          {
            breakpoint: 370,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 0,
              infinite: true,
              arrows: true
            }
          }
        ],
      },
      Rules: [
        {
          id: 1,
          content: '"Viewer" refers to an individual registered user of the TFW Rugby League platform.'
        },
        {
          id: 2,
          content: 'Viewers can access match results for free.'
        },
        {
          id: 3,
          content: 'Match results are freely accessible to all users, regardless of subscription status.'
        },
        {
          id: 4,
          content: 'Viewers do not participate in any revenue generated from advertisements or premium subscriptions.'
        },
        {
          id: 5,
          content: 'Viewers maintain ownership rights over any comments or contributions they make.'
        },
        {
          id: 6,
          content: 'TFW Rugby League reserves the right to adjust subscription pricing as necessary.'
        },
        {
          id: 7,
          content: 'TFW Rugby League reserves the right to display and monetize user-generated content indefinitely.'
        },
        {
          id: 8,
          content: 'TFW Rugby League may modify user privileges without prior notification.'
        },
        {
          id: 9,
          content: 'TFW Rugby League offers merchandise for sale through its platform.'
        },
        {
          id: 10,
          content: 'All merchandise sales are subject to the terms and conditions outlined by TFW Rugby League.'
        },
        {
          id: 11,
          content: 'TFW Rugby League reserves the right to modify merchandise offerings and pricing at its discretion.'
        },
        {
          id: 12,
          content: 'This are static data for TEMPORARY purpose only'
        },
      ],
      codeOfConduct: [
        {
          id: 1,
          content: 'Respectful Communication: All users are expected to communicate respectfully with each other, avoiding offensive language, harassment, or discrimination based on race, gender, religion, nationality, sexual orientation, or any other personal characteristic.'
        },
        {
          id: 2,
          content: 'Compliance with Platform Rules: Users must adhere to the terms of service and community guidelines set forth by TFW Rugby League. Any violation of these rules may result in account suspension or termination.'
        },
        {
          id: 3,
          content: 'Protection of Intellectual Property: Users must respect the intellectual property rights of others, including copyright and trademark laws. Unauthorized use of copyrighted material or trademarks is prohibited.'
        },
        {
          id: 4,
          content: 'Contribution to Positive Environment: Users are encouraged to contribute to a positive and inclusive environment within the TFW Rugby League community, fostering constructive discussions and supporting fellow members.'
        },
        {
          id: 5,
          content: 'Reporting Violations: Users who encounter behavior that violates the code of conduct or platform rules are encouraged to report it to TFW Rugby League administrators for appropriate action.'
        },
        {
          id: 6,
          content: 'Confidentiality: Users must respect the privacy and confidentiality of others, refraining from sharing personal information or confidential data without permission.'
        },
        {
          id: 7,
          content: 'Cooperation with Moderators: Users are expected to cooperate with moderators and administrators of TFW Rugby League in resolving disputes, addressing issues, and enforcing platform rules.'
        },
        {
          id: 8,
          content: 'Continuous Improvement: TFW Rugby League encourages feedback from users to improve the platform and enhance the overall experience for all members of the community.'
        }
      ],
      insurancePolicies: [
        {
          id: 1,
          content: 'Insurance Coverage: TFW Rugby League provides limited insurance coverage for registered users participating in official league events or activities organized through the platform.'
        },
        {
          id: 2,
          content: 'Coverage Limitations: The insurance coverage provided by TFW Rugby League is subject to certain limitations and exclusions, as outlined in the insurance policy documents.'
        },
        {
          id: 3,
          content: 'Policy Terms: Users are responsible for familiarizing themselves with the terms and conditions of the insurance policy provided by TFW Rugby League and complying with any requirements for coverage eligibility.'
        },
        {
          id: 4,
          content: 'Insurance Claims: In the event of an accident or injury occurring during a covered activity, users must promptly report the incident to TFW Rugby League administrators and follow the established procedure for filing an insurance claim.'
        },
        {
          id: 5,
          content: 'Exclusion of Liability: TFW Rugby League and its affiliates shall not be liable for any damages, injuries, or losses incurred by users that are not covered under the insurance policy, including but not limited to acts of negligence or misconduct.'
        },
        {
          id: 6,
          content: 'Modification of Coverage: TFW Rugby League reserves the right to modify or terminate the insurance coverage provided to users at any time, with or without prior notice.'
        },
        {
          id: 7,
          content: 'Additional Coverage: Users are advised to obtain additional insurance coverage as needed to supplement the limited coverage provided by TFW Rugby League, especially for high-risk activities or events.'
        },
        {
          id: 8,
          content: 'Disclaimer: The insurance coverage provided by TFW Rugby League is intended to supplement, not replace, any existing insurance policies held by users. Users are encouraged to review their personal insurance coverage and consult with a qualified insurance professional.'
        }
      ],
    };
  },
  head() {
    return {
      title: this.pageSEO.title,
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
    setTab(tab) {
      this.activeTab = tab;
    }
  }
};
</script>

<style scoped>
.superheadline {
  color: aliceblue;
}
</style>
