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
            <h1 class="flex flex-row text-6xl font-bold text-white lg:text-5xl">
            {{ pageName }}
            </h1>
        </div>
        </BaseHeader>

        <div class="container mx-auto md:max-w-6xl">
            <div class="content-block py-9 lg:py-24">
                <article class="my-9">
                    <h2 class="mb-11 text-3xl font-bold uppercase">
                        Delivery timeframe:
                    </h2>
                    <div class="overflow-x-auto">
                    <table class="min-w-full border text-center">
                        <tbody>
                            <tr class="border-b">
                                <td
                                    class="whitespace-nowrap border-x
                                    px-6 py-4 text-xl font-bold text-brand-red"
                                >
                                Intercity
                                </td>
                                <td
                                    class="whitespace-nowrap border-x px-6 py-4
                                    text-xl font-bold"
                                >
                                Express
                                </td>
                                <td
                                    class="whitespace-nowrap border-x px-6 py-4
                                    text-xl font-bold"
                                >
                                Global X
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td
                                    class="whitespace-nowrap border-x px-6 py-4
                                    text-xl font-bold text-brand-red"
                                >
                                3 - 8 days
                                </td>
                                <td
                                    class="whitespace-nowrap border-x px-6 py-4
                                    text-xl font-bold"
                                >
                                5 - 10 days
                                </td>
                                <td
                                    class="whitespace-nowrap border-x px-6 py-4
                                    text-xl font-bold"
                                >
                                10 - 20 days
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </article>
                <article class="my-9">
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
  name: 'revamped-intercity',
  data() {
    return {
      pageName: 'Revamped X Intercity Products',
      contents: [
        {
          type: 'paragraph',
          title: 'Pricing',
          paragraphs: [
            'Products that are a part of REVAMPED X Intercity Collection',
            'Order ready to pick up for locals/GC (approximately): <span class="font-bold">5 days from purchase</span>',
            'Total shipping time for interstate/non-local (approximately): <span class="font-bold">5 – 10 days from purchase</span>'
          ]
        },
        {
          type: 'section',
          title: 'What is a REVAMPED X PRODUCT?',
          paragraphs: [
            `
            Revamped X is a collection of exclusive products available at
            our fingertips. This system enables you to get your hands on
            the latest and greatest products from all around Australia,
            right here
            from Revamped,
            on the Gold Coast. As much as we would love to have all our
            stock in-hand and
            shipped out the same day, the limited space, capital, and
            inventory capacity prevents us from doing so.
            At Revamped, we take pride in transparency and honesty with all
            our customers. Instead of having the product in-store,
            the item gets sent to us first (once you have placed the order).
            When the item gets shipped to us, it’s directly posted to you, or
            immediately available for pickup. Stocking the diverse products in
            one place is now possible because of retail, ecommerce, and
            seamless logistics.
            `,
            `
            We would like to cover as many brands, sizes, and quantities
            as possible, to provide the best experience for shoppers.
            This business process is no different from what other giant,
            online retailers do. In simpler terms, these are products
            stocked at our interstate and intercity associate retail
            stores, but not currently in-hand at our shop. We do this
            because it enables a larger range of products to buy. 
            `,
            `
            Depending on the product ordered, each product is held by a
            specific supplier in different states around Australia, which
            the shipping times may vary. In some cases, we receive the
            product from some suppliers within 2 – 4 days. In other
            cases, the longest time it will take to touch down at
            our store is 7 days. 
            `,
            `
            We will try our best to advise the shipping times for
            each product in their respective descriptions. After this
            first stage is done and dusted, the product can be picked up,
            or will be sent to you the same day it arrives. Should you be
            a Gold Coast customer, you can pick up your order via prearranged
            kerbside pickup. For other customers that aren’t based
            on the Gold Coast, we will be sending the parcel immediately
            via Australia Post. Once in Australia Post’s hands,
            shipping times vary from 3 – 5 business days (from date of
            arrival) to your designated address.
            `,
            `
            The great thing about this system is that in time,
            we can hopefully become big enough to stock thousands
            of products in-hand, all at once.

            `
          ]
        },
      ]
    }
  },
  head() {
    return {
      title: 'Revamped X Intercity Products | Revamped Official',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This product is part of our Revamped X Intercity Collection:'
        },
      ],
    }
  }
}
</script>