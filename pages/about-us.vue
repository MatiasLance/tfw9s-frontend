<template>
    <div class="w-full">
        <BaseSection class="my-16 sm:my-12 sm:px-12">
            <div
            data-aos="fade-right"
            class="col-span-12
            mt-4
            space-y-6
            py-8
            md:text-left
            lg:space-y-8"
            >
            <span
            data-aos="fade-right"
            data-aos-once="true"
            class="
                font-montserrat
                pb-3
                text-2xl
                font-semibold
                capitalize
            "
            >
            Who is The Drum HQ
            </span>
            </div>
            <div
                data-aos="fade-right"
                data-aos-delay="300"
                class="col-span-12 hidden sm:block lg:col-span-6"
            >
                <img
                    src="img/about-img.jpg"
                    loading="lazy"
                    class="mt-4 w-full sm:-mt-4"
                    alt="Bryan Macaranas Photo"
                />
            </div>
            <div
            data-aos="fade-left"
            data-aos-delay="700"
            class="col-span-12
            flex flex-col
            space-y-6 self-center
            px-2
            md:text-left lg:col-span-6 lg:space-y-8"
            >
                <p class="paragraph">
                    My name is <b>Bryan Macaranas</b>, proud founder
                    and owner of The Drum HQ. I am a one-man team,
                    the owner, the packer, the admin and the marketing
                    department. And through The Drum HQ, I hope to be
                    able to bring in some cool gear, uber drum nerd type
                    gizmos, most of which have never touched the shores
                    of Australia. This will be on top of also being
                    able to offer some great deals on good quality
                    pre-loved / second hand gear.  I’ll be mixing it up
                    with value for money gear, new and innovative products,
                    but also offerings that will hopefully cover the
                    budgets and tastes of as many different type of drummers
                    and levels. I’d like to believe that “passion used to be
                    an advantage, nowadays it’s the bare minimum” so I will
                    make sure to keep this in mind as I aim to share my
                    knowledge, my passion and my drive to all. I look forward
                    to meeting as many of you out there and thank you in
                    advance for supporting my little drum shop. If you have
                    any queries, just shoot us a message!
                </p>
            </div>
        </BaseSection>
    </div>
</template>

<script>
import aosMixin from '@/mixins/aos'
import BaseSection from '~/components/base/BaseSection.vue';

export default {
  name: 'about-us',
  components: { BaseSection },
  mixins: [ aosMixin ],
  data() {
    return { pageName: 'About us' };
  },
  head() {
    return {
      title: 'About us | Revamped',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ''
        }
      ]
    };
  }
}
</script>