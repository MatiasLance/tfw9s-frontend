<template>
    <div class="w-full">
      <BaseSection class="my-16 sm:my-12 sm:px-12">
        <div
          data-aos="fade-right"
          data-aos-delay="150"
          class="col-span-12 mt-8 flex px-4 sm:px-6 lg:col-span-6"
        >
          <div class="flex w-full items-center justify-center">
            <div class="flex flex-col items-center">
              <span class="text-white text-6xl font-bold">
                {{ pageName }}
              </span>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-down"
          data-aos-delay="300"
          class="col-span-12 mt-8 w-full px-4 sm:px-6 lg:col-span-6"
        >
          <ul class="shadow-box link">
            <BaseAccordion
              v-for="(accordion, index) in faqList"
              :key="index"
              :accordion="accordion"
            />
          </ul>
        </div>
      </BaseSection>
    </div>
</template>

<script>
import aosMixin from '@/mixins/aos'
import BaseSection from '~/components/base/BaseSection.vue';
import BaseAccordion from '~/components/base/BaseAccordion.vue';

export default {
  name: 'FAQ',
  components: {
    BaseSection,
    BaseAccordion,
  },
  mixins: [ aosMixin ],
  data() {
    return {
      pageName: 'Frequently asked questions',
      cta: 'Get online quote',
      blurb: 'Content',
      faqList: [],
      accordions: [
        {
          title: 'How do I register my team?',
          description: 'To register your team, visit our registration page, fill out the required details about your team and players, and submit the form. You will receive a confirmation email with further instructions.',
        },
        {
          title: 'What are the age groups and divisions?',
          description: 'Our platform categorizes teams into different age groups and divisions to ensure fair and competitive play. The age groups range from under-6s to under-18s. Detailed information can be found on our age groups page.',
        },
        {
          title: 'How do I find match schedules and results?',
          description: 'Match schedules and results are regularly updated on our website. Navigate to the "Matches" section to view upcoming fixtures and recent results. You can also filter by age group or division.',
        },
        {
          title: 'What safety measures are in place for players?',
          description: 'Player safety is our top priority. We adhere to strict safety protocols, including mandatory protective gear, trained medical staff at all matches, and adherence to Rugby League safety regulations.',
        },
        {
          title: 'How can I volunteer or become a coach?',
          description: 'We welcome volunteers and aspiring coaches. Visit our "Get Involved" page to find out how you can volunteer or apply for a coaching position. Training and certification programs are available for coaches.',
        },
        {
          title: 'What are the training and practice facilities?',
          description: 'Our platform provides information on available training and practice facilities, including locations, timings, and booking procedures. Check the "Facilities" section for more details.',
        },
        {
          title: 'How do I stay updated with league news and events?',
          description: 'Stay updated by subscribing to our newsletter, following us on social media, and regularly checking our website. We post updates on league news, events, and important announcements.',
        },
        {
          title: 'What support is available for injured players?',
          description: 'Injured players receive comprehensive support, including immediate medical attention during matches, access to physiotherapy, and rehabilitation programs. Visit our "Player Support" section for more details.',
        },
        {
          title: 'How can I contact the league administration?',
          description: 'For any queries or concerns, you can contact the league administration via the contact form on our website, by email, or by phone. Our contact details are available in the "Contact Us" section.',
        },
        {
          title: 'How do I report a concern or complaint?',
          description: 'We take concerns and complaints seriously. You can report any issues through the "Report a Concern" form on our website, and our team will address it promptly and confidentially.',
        },
        {
          title: 'What resources are available for training and development?',
          description: 'We provide a range of resources for player and coach development, including training manuals, video tutorials, and workshops. Visit our "Resources" section to access these materials.',
        },
      ]
    };
  },
  mounted() {
    this.retrieveFaq();
  },
  methods: {
    retrieveFaq() {
      this.$axios
        .$get('v1/faq')
        .then((response) => {
          this.faqList = response.data.faq
          console.log(this.faqList);
        })
        .finally(() => {
          this.isFaqLoading = false;
        });
    },
  }
}
</script>
