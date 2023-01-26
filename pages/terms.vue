<template>
  <div>
    <BaseHeader class="bg-gradient-to-r from-brand-dgrey to-brand-black">
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
          Terms &amp; Conditions
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
                    <p class="paragraph text-xl">
                      {{ text }}
                    </p>
                </div>
            </section>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '../components/base/BaseHeader.vue';
export default {
  components: { BaseHeader },
  data() {
    return {
      adminEmail: 'admin@thedrumhq.com.au.au',
      contents: [
        {
          type: 'section',
          title: 'Pricing',
          paragraphs: [ 'All prices are in Australian dollars (AUD) and are inclusive of GST. The prices listed on the website do not include delivery charges. Delivery prices will be automatically calculated in the checkout process based on the delivery option and location you require the item to be shipped.' ]
        },
        {
          type: 'section',
          title: 'Payment Methods: Credit and Debit Cards',
          paragraphs: [
            `
            We accept credit card payments via Visa,
            Mastercard & American Express. All information
            is encrypted using SSL encryption, which prevents
            unauthorised access to card details.
            You will be asked for your card number, its
            period of validity and the CVN.
            `
          ]
        },
        {
          type: 'section',
          title: 'Order Cancellations',
          paragraphs: [
            `
            Please note, after you have placed an order, a
            receipt is automatically mailed to you confirming
            the purchase intent.
            This receipt does not constitute a contract, and orders
            may be cancelled at any time due to insufficient stock,
            inability to authorise a
            credit card, suspicion of fraudulent activity,
            or any unforeseen reason or circumstance, as we see fit.
            `,
            `
            In the event that one of the above has taken place,
            and your nominated credit card has been charged,
            your order will be subsequently cancelled, and
            a refund will be organised.

            `
          ]
        },
      ]
    };
  },
};
</script>