<template>
  <div>
    <div class="container mx-auto md:max-w-6xl">
<div class="content-block py-11">
    <article class="space-y-9">
          <section
                v-for="(content, contentKey) in contents"
                :key="contentKey"
            >
                <h2
                    v-if="content.title !== ''"
                    class="mb-11 text-xl font-bold"
                >
                    {{ content.title }}
                </h2>
                <div
                    v-for="text in content.paragraphs"
                    :key="text"
                    class="my-5"
                >
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <p class="paragraph text-base">
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
export default {
  data() {
    return {
      adminEmail: 'admin@revampedofficial.com',
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
    }
  }
}
</script>