<template>
    <div>
        <BaseHeader class="bg-gradient-to-r from-brand-dgrey to-brand-black">
            <div
            class="
            col-span-12
            mt-12
            space-y-3
            px-6
            text-left
            sm:space-y-3
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

        <div class="container mx-auto md:max-w-6xl">
            <div class="content-block py-9 lg:py-24">
                <article class="space-y-9">
                    <section
                        v-for="(content, contentKey) in contents"
                        :key="contentKey"
                        class="my-16"
                    >
                        <h2
                            v-if="content.title !== ''"
                            class="mb-11 text-2xl font-bold lg:text-3xl"
                        >
                            {{ content.title }}
                        </h2>
                        <div
                            v-for="text in content.paragraphs"
                            :key="text"
                            class="my-5"
                        >
                            <!-- eslint-disable-next-line vue/no-v-html -->
                            <p class="paragraph text-xl" v-html="text">
                            </p>
                        </div>
                    </section>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'shipping',
  data() {
    return {
      pageName: 'Shipping',
      contents: [
        {
          type: 'section',
          title: '',
          paragraphs: [ 'Once an order is placed, we try our best to ship the package the same day, unless on weekends and/or public holidays. Please allow a minimum of 24hrs for processing.' ]
        },
        {
          type: 'section',
          title: 'Domestic Shipping (Australia)',
          paragraphs: [
            'Regular AusPost eParcel (3-5 working days, 5-7 for WA)',
            'Express AusPost eParcel (Usually 1-3 days, except remote locations & outside Perth City for WA Customers).',
            'Please note: If you choose Express AusPost and your postcode is outside of the guaranteed next day delivery zone we will still send it the fastest way possible.'
          ]
        },
        {
          type: 'section',
          title: 'International Shipping',
          paragraphs: [
            `
            <a class="hover:underline hover:decoration-brand-grey hover:decoration-4 hover:underline-offset-8" href="https://auspost.com.au/track/track.html">Australia Post International</a> - Up to 14 approx. business days depending on location
            `,
          ]
        },
        {
          type: 'section',
          title: 'International Custom Duties',
          paragraphs: [
            `You are responsible for assuring that the product can be
            lawfully imported to the destination country. When ordering
            from REVAMPED, the recipient is the importer of record and
            must comply with all lawsand regulations of the destination
            country. Orders that are shipped to countries outside of Australia
            may be subject to import taxes, customs duties and fees levied
            by the destination country. `,
            `The recipient of an international
            shipment may be subject to such import taxes, customs duties
            and fees, which are levied once a shipment reaches your
            country. Additional charges for customs clearance must be assumed
            by the recipient; we have no control over these charges and cannot
            predict what they may be. Customs policies vary widely from country
            to country; you should contact your local customs office for further
            information. When customs clearance procedures are required, it can
            cause delays beyond our original delivery estimates.`,
            `For any further questions email
            <a
                class="
                    hover:underline
                    hover:decoration-brand-grey
                    hover:decoration-4
                    hover:underline-offset-8
                "
                href="mailto:finn@revampedofficial.com">
                finn@revampedofficial.com
            </a>`
          ]
        }
      ]
    }
  }
}
</script>