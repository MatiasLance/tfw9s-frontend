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
                <ul
                    v-for="text in content.paragraphs"
                    :key="text"
                    class="my-5 list-outside list-disc"
                >
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <li class="paragraph text-base">
                      {{ text }}
                    </li>
                </ul>
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
      adminEmail: 'admin@thedrumhq.com.au',
      contents: [
        {
          type: 'section',
          title: 'Refund policy',
          paragraphs: [
            `
            There are no full refunds, when you register with us,
             you fully accept our policy on refunds.
            `,
            `
            Cancelling team 7 days out from the event will be
             subject to an administration fee (50% of the team registration)
            `,
            `
            Cancelling team 5 days out from the event will be subject
             to an administration fee (75% of the team registration)
            `,
            `
            Cancelling team 24hrs out from the event will be subject
             to an administration fee (100% of the team registration)
            `,
            `
            Administration fee of 20% apply to prior timeframes above.
            `,
            `
            To avoid administration fees, there is a credit option
             for your team to utilise to go towards the next event.
            `,
            `
            If an event is rescheduled due to unforeseen circumstances,
             a credit will apply for next event.
            `,
            `
            Credit of fees for the next event is the event you can attend
             within a 12 month period. Please note our weekly summer series
              is not a part of this policy.
            `,
            `
            If an event is postponed due to weather or act of god, your
             team registration will be used as credit towards the next event.
            `,
          ]
        },
      ]
    }
  }
}
</script>