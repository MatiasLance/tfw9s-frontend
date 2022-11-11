<template>
    <div class="w-full">
        <BaseHeader
        class="
        h-screen
        bg-[url('/img/1.webp')] md:h-96
        "
        >
        </BaseHeader>
        <BaseSection class="my-16 sm:my-12 sm:px-12">
            <div
            data-aos="fade-right"
            class="col-span-12
            mt-4
            space-y-6
            p-5
            md:text-left
            lg:space-y-8"
            >
                <small class="my-5 font-bold uppercase">
                    How it all started
                </small>
                <h2
                    class="mb-9
                    break-words text-4xl font-bold
                    uppercase sm:pr-8 xl:pr-12"
                >
                {{ headline }}
                </h2>
                <p class="paragraph text-base">
                    {{ contentblurb1 }}
                </p>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p class="paragraph text-base" v-html="contentblurb2" />
            </div>
        </BaseSection>
        <BaseSection class="my-16 sm:my-12 sm:px-12">
            <div
                data-aos="fade-right"
                data-aos-delay="300"
                class="col-span-12 hidden sm:block lg:col-span-6"
            >
                <img
                    src="img/3.webp"
                    class="mt-4 w-full sm:-mt-4"
                    alt="Finn Johnson Photo"
                />
            </div>
            <div
            data-aos="fade-left"
            data-aos-delay="700"
            class="col-span-12
            mt-4
            flex flex-col
            items-center
            justify-center
            space-y-6 p-5
            md:text-left lg:col-span-6 lg:space-y-8"
            >
                <p class="paragraph text-xs">
                    {{ contentblurb3 }}
                </p>
                <p class="paragraph text-xs">
                    {{ contentblurb4 }}
                </p>
                <p class="paragraph text-xs">
                    {{ contentblurb5 }}
                </p>
                <p class="paragraph text-xs">
                    {{ contentblurb6 }}
                </p>
            </div>
            <div class="col-span-12 mt-8 sm:hidden">
                <div class="w-full">
                    <img
                        src="img/3.webp"
                        class="mt-4 w-full sm:-mt-4"
                    />
                </div>
            </div>
        </BaseSection>
        <BaseSection class="my-16 sm:my-12 sm:px-12">
            <div
                data-aos="fade-right"
                data-aos-delay="300"
                class="col-span-12 hidden sm:block lg:col-span-6"
            >
                <img
                    src="img/2.webp"
                    class="mt-4 w-full sm:-mt-4"
                    alt="A mini warehouse"
                />
            </div>
            <div
            data-aos="fade-left"
            data-aos-delay="700"
            class="col-span-12
            mt-4
            flex flex-col
            items-center
            justify-center
            space-y-6 p-5
            md:text-left lg:col-span-6 lg:space-y-8"
            >
                <p class="paragraph text-xs">
                    {{ contentblurb7 }}
                </p>
                <p class="paragraph text-xs">
                    {{ contentblurb8 }}
                </p>
                <p class="paragraph text-xs">
                    {{ contentblurb9 }}
                </p>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p class="paragraph text-xs" v-html="contentblurb10" />
            </div>
            <div class="col-span-12 mt-8 sm:hidden">
                <div class="w-full">
                    <img
                        src="img/2.webp"
                        class="mt-4 w-full sm:-mt-4"
                    />
                </div>
            </div>
        </BaseSection>
        <BaseSection class="my-20 sm:my-12 sm:px-12">
            <div
                class="
                col-span-12
                mt-4
            space-y-6
            p-5
            md:text-left
            lg:space-y-8
                "
            >
                <h2
                    class="my-7
                    break-words text-2xl font-bold
                    uppercase sm:pr-8 xl:pr-12"
                >
                {{ headline2 }}
                </h2>
                <h2
                    class="mb-7
                    break-words text-xl font-bold
                    uppercase sm:pr-8 xl:pr-12"
                >
                {{ subheadline2 }}
                </h2>
                <p class="paragraph mb-5 text-base">
                    {{ contentblurb11 }}
                </p>
                <p class="paragraph mb-5 text-base">
                    {{ contentblurb12 }}
                </p>
                <p class="paragraph mb-5 text-base">
                    {{ contentblurb13 }}
                </p>
                <span
                    class="block rounded-lg bg-brand-black px-5
                    py-2 text-center text-2xl"
                >
                    {{ emphasis1 }}
                </span>
            </div>
        </BaseSection>
        <BaseHeader
            class="
            h-screen
            bg-[url('/img/4.webp')] md:h-96
            "
        >
        </BaseHeader>
        <BaseSection class="my-20 sm:my-12">
            <div
            data-aos="fade-right"
            class="col-span-12
            mt-4
            space-y-6
            p-5
            md:text-left
            lg:space-y-8"
            >
                <small class="my-5 text-sm font-bold">
                    Taking a Deeper Look Into Finn's Journey
                </small>
                <h2
                    class="mb-9
                    break-words text-4xl font-bold sm:pr-8 xl:pr-12"
                >
                A True Story of the Come-Up
                </h2>
                <div class="paragraph text-lg">
                    <blockquote class="my-7">
                        It's so easy to judge someone and make
                        assumptions without actually knowing their
                        whole story, their background, or speaking to
                        them directly.
                    </blockquote>
                    <address class="my-3">
                        For years, I've just been doing my own thing;
                        staying in my own lane, trying to make my own path
                        to success.
                        I try avoid all distractions that do not seek to
                        better me mentally, physically, spiritually or
                        financially.
                        As corny as that sounds - it's true. I don't
                        care enough to follow society or adhere to new trends,
                        and so paying attention to all the garbage onlin
                         media puts out... sometimes I feel like ignorance is
                         bliss. And all
                        that BS doesn't only come from media/news channels.
                        It comes from your friends, celebrities and
                        self-proclaimed 'influencers', just to name a few.
                        Especially because nothing online is real these
                        days anyway. Everything is either fake, forced,
                        edited, or set up for attention. I'm not interested in
                        things that aren't authentic.
                    </address>
                    <address class="my-3">
                        Over the years I have worked really hard,
                        absorbed as much knowledge and experience
                        I can, and have invested my money into
                        appreciating assets, and now it's time to
                        take it to the next level. I'm always
                        thinking outside the box and taking calculated
                        risks. As every entrepreneur knows, it's
                        part of the job, and it can easily fail,
                        at any given time.
                    </address>
                    <address class="my-3">
                        Buying and selling is something I've
                        done since 12 years old. It started with
                        shirts on Gumtree, then selling Old Skool
                        Vans and other cheap miscellaneous items
                        through eBay and Facebook Marketplace.
                        As years went on, each item held a higher
                        price, with an even higher profit margin.
                        Eventually, I couldn't find a job, so I
                        would be driving around Brisbane and Gold
                        Coast buying undervalued sneakers and reselling
                        them for profit. That really was a hustle!
                        Nowadays, I have done the same with cars,
                        despite knowing little about them, and since
                        16 years old, I have flipped 4 cars up to my current
                        car, an Audi TT Quattro S Line.
                    </address>
                    <address class="my-3">
                        My come-up is nothing without the mention of
                        my supportive parents, who have been with me
                        every step of the way. Coming from a stable household,
                        I have been privileged enough to never worry
                        about bills,
                        shelter, rent and education. Having both parents
                        still together is something I'm forever
                        grateful for and blessed. Although, most kids
                        that find themselves in similar positions,
                        tend to take it for granted, and do the wrong
                        thing. Or worse - do absolutely nothing, and
                        leech from their parents. But this is something
                        I couldn't do, and so I tried to capitalise on
                        the opportunity at hand, and hustle everyday
                        like it's my last.
                    </address>
<address class="my-3">
I've done everything up until this point.
Working in warehouses, factories, logistics, driving
forklifts, retail, hospitality, fast food - you name it.
It's not all glitter and gold. I worked hard for
everything I have, but there is still so much more to
be done; I'm barely past the surface.
</address>
<address class="my-3">
    I've done anything and everything to try and
    make something for myself so far. No matter what I'm doing,
    I always put in 100%,
    and I think that's why I see myself going further than some
    others who don't have that drive. Although I have a long way to go,
    there is hopefully, a bright future ahead.
</address>
                    <address class="my-3">
                        And this store is just the start of it.
                    </address>
                    <address class="my-6">
                        Stay true. Stay real. Just Be Yourself.
                    </address>
                </div>
                <span class="my-12 block text-lg font-bold">
                    ~ Finn Johnson
                </span>
                <span class="my-12 block text-lg font-bold">
                    Founder, CEO & Owner
                </span>
            </div>
        </BaseSection>
    </div>
</template>

<script>
import aosMixin from '@/mixins/aos'
import BaseSection from '~/components/base/BaseSection.vue';
import BaseHeader from '~/components/base/BaseHeader.vue';

export default {
  name: 'about-us',
  components: { BaseSection, BaseHeader },
  mixins: [ aosMixin ],
  data() {
    return {
      pageName: 'About us',
      headline: 'An opportunity for the taking: the first experience',
      contentblurb1: 'Starting off by selling on eBay, Finn would be making over $1k/week in sales online through his ecommerce store, selling sneakers, shirts and designer belts. Finn was always looking for new ways to sell stock, but eBay kept eating away large chunks of each sale, in which the ad fees just kept accumulating (15%, which becomes excessive). The focus began trailing away from the eBay Store, and into other avenues.',
      contentblurb2: 'Always curious about how a brick-and-mortar store would perform, Finn eventually got his first taste at a weekly pop-up shop. Studying as a business student, his first experience allowed him to book a market stall at his local campus, Griffith University Gold Coast. It was an eye-opener to see the reactions and interactions from potential customers in real life. Before <b>Revamped</b>, it was <b>The New Wave</b>, but only recently did he decide to rebrand and expand the catalogue into clothing, as well as sneakers.',
      contentblurb3: 'The business started years ago in 2019, but the Revamped Store was only born in 2022, when the owner, Finn (pictured left), changed his offical eBay Shop TheNewAussieWave, to a more official setup.',
      contentblurb4: '"Sneakerboy had just shut down, Incu was just not hitting the right spot. Reseller stores were ruining the whole game..."',
      contentblurb5: 'It started getting serious when he noticed an extremely large gap in the market of streetwear and high-end fashion, and large retail chains just weren\'t doing a great job with the exclusive items they were selling via drops and raffles.',
      contentblurb6: '"Very few retailers offer high-quality, exclusive products from highly-coveted labels, here in Australia. If it wasn\'t already hard enough for Australians to get their hands on the latest pair of sneakers, being on the Gold Coast doesn\'t make it any easier" ~ Finn',
      contentblurb7: 'On top of this, reseller stores started popping up everywhere and sabotaging the market, by artificially raising their prices to over 3X as much as what the product\'s retail value is. For customers, it was a lose-lose situation.',
      contentblurb8: '"I hated the thought of innocent people getting ripped off by greedy, reseller stores. It\'s just not morally right. You shouldn\'t take advantage of someone just because they are clueless on what they are buying. It comes down to ethics."',
      contentblurb9: 'This is a small, unique, retail boutique, serving eager customers everything they\'ve been looking for. A small business based on the Gold Coast, for the Gold Coast.',
      contentblurb10: 'A Mini Warehouse: Starting To Stock Sneakers became difficult. A growing inventory piled into a small room within the house.<br>It couldn\'t be sustained for long...',
      headline2: 'The hottest global brands',
      subheadline2: 'JAPAN | USA | ITALY | FRANCE',
      contentblurb11: 'We provide you a platform that retails popular products from major brands such as Nike, Jordan, Adidas, New Balance, Reebok, Puma and Asics.',
      contentblurb12: 'Unrestricted from the norm, our inventory goes all the way from popular streetwear labels such as BAPE, Billionaire Boys Club, Comme De Garcons/CDG Play, Fear of God, Human Made, ICE CREAM, Palace, Supreme and more.',
      contentblurb13: 'It doesn\'t stop at streetwear though, as we boast high-end designer products from Alexander McQueen, Bally, Bianca Chandon, MOSCHINO, Salvatore Ferragamo, and more.',
      emphasis1: 'When other major chains sell-out, we NEVER will.',
    };
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