<template>
    <div>
        <BaseHeader class="bg-gradient-to-r from-brand-dgrey to-brand-black">
        <div
            class="
            col-span-12
            mt-12
            space-y-3
            px-6
            text-center
            sm:space-y-3 sm:text-left
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
            {{ pageName }}
            </h1>
        </div>
        </BaseHeader>
        <div class="container">
            <BaseSection class="my-16 sm:my-12 sm:px-12">
                <div
                data-aos="fade-down"
                data-aos-delay="300"
                class="col-span-12
                mt-4
                space-y-6
                p-5
                md:text-left
                lg:space-y-8"
                >
                <ul class="shadow-box">
                    <BaseAccordion
                        v-for="(accordion, index) in accordions"
                        :key="index"
                        :accordion="accordion"
                    />
                </ul>
                </div>
            </BaseSection>
        </div>
    </div>
</template>

<script>
import BaseAccordion from '../components/base/BaseAccordion.vue'
import aosMixin from '@/mixins/aos'

export default {
  name: 'faq',
  components: { BaseAccordion },
  mixins: [ aosMixin ],
  data() {
    return {
      pageName: 'FAQs',
      blurb: 'Content',
      accordions: [
        {
          title: 'Why are these sneakers so expensive?',
          description: 'The sneakers that are sold in this store are all about exclusivity. These are not sneakers you can just walk into any regular retail store and buy. These are often pairs that sell out within minutes through major retail chains like Culture Kings, JD Sports and Footlocker. Once the pairs sell out from the limited avenues here, it’s the simple rule of supply and demand. There simply isn’t a large enough supply as each retailer drops a small amount of each size, in each exclusive shoe style and release. Therefore, this sparks the expensive resale market, which is what many unhappy customers have had to resort to after missing out on exclusive drops. It’s simple economics… a.k.a supply and demand. Low supply, high demand, high price. It’s the way it goes unfortunately. But we are here to help you find some awesome sneakers at a far better price than other reseller stores.',
        },
        {
          title: 'Why are these shirts so expensive?',
          description: 'The shirts sold on this website are expensive because the brands and labels we stock are extremely hard to get your hands on. even more so than shoes. There are next to no retailers in Australia that sell exclusive streetwear and designer brands, so importing them from overseas is almost always the go, and that means that the shipping, tax and customs duty is involved, therefore prices must be bumped up from their original price tags. For example, Japanese brands like Billionaire Boys Club, ICE CREAM, or Italian brands like Moschino etc. cannot physically be bought in Australia at retail prices because they are not stocked in stores here.'
        },
        {
          title: 'What makes this store different from another reseller store?',
          description: 'Great question – we’re glad you asked! The reason this store is special is because we do not primarily operate on consignment, which means all pairs that are sold from us, are completely owned by us outright. A lot of stores that you buy from are fully stocked by thousands of individual sellers, in which the store takes a commission of each sale. This business model can end up being a bit clunky and slow. Consignment stores operate in a way where their sellers individually set the prices, which means people can set prices hundreds of dollars over what is deemed fair. This is of course at the expense of the buyer. We set our prices fairly and according to true market value. Building trust with our customer is important to us, and forming a relationship for return buyers is a top priority. For that reason, we stay transparent form the beginning. We also do generous discounts for those real hustlers and underappreciated workers on the front line who really do deserve it. This is a feature that no other stores do (despite them being so much larger than us!). We have discounts for high school students, university students, hospitality workers and emergency service workers. Eligibility requirements: currently only for in-store payments. Additionally, we are constantly updating our product inventory with all sorts of sneakers and clothing. Not just the typical Nike Dunks and Jordans you see all the time. There is no chance of a sale being cancelled, or your order being refunded due to an item being fake. We do all sorts of sneaker models and brands that you cannot find anywhere else! We authenticate, sell and ship in-house too, which speeds up the process entirely. We have a more diverse product range, faster shipping times, and far better prices than any of our competitors. We put people before profits.'
        },
        {
          title: 'Where do you source and get the products from?',
          description: 'Products sold on Revamped are mainly sourced through 2 levels. The first level is on a local scale from trusted, small suppliers that sell one-off products. The second level consists of large international retailers who we have great connections with. Usually, we source our second-hand products locally so we can authenticate them by hand. Whilst on the other hand, we buy our brand-new products in Australia, and other countries all over the world. We only buy products from official brand retailers and legitimate suppliers, so you don’t ever need to worry about an item’s authenticity. And to tell you the exact suppliers would be like us giving up the secret Krabby Patty formula ;)'
        },
        {
          title: 'Are the products authentic?',
          description: 'We sell second-hand shoes because it’s an underrated market, which can serve to benefit our company, the planet and our people. It’s a win, win, win. Our company is built around the concept of sustainability, and we do the best we can to help the environment. There is a global movement that we love to be a part of, which advocates for mitigating climate change, pollution, and a push for reducing, reusing, and recycling materials. Although, there still seems to be a stigma around reusing sneakers. We are doing our part to remove this stigma. We believe that sneakers are going to get worn sooner or later, so does it really matter if you are the first wearer? It also gives people an opportunity to sell their shoes they don’t want and ‘cash out’ (should they be appropriate to be sold in our store). This scheme allows buyers to afford pairs they have always wanted too, even if they come with a few small scratches here and there.'
        },
        {
          title: 'Are the second-hand shoes still in good condition?',
          description: 'Most of our sneakers are rated at least an 8 out of 10 on the sneaker condition scale. This means that the preloved shoes we sell, are always cleaned, revamped and in amazing condition, ready to go to a new home (for an absolute steal of a price). We believe no crease should ever put someone off from buying a pair they love.'
        }
      ],
    }
  },
  head() {
    return {
      title: 'FAQs | Drum HQ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Frequently Asked Questions from our customers'
        },
      ],
    }
  }
}
</script>