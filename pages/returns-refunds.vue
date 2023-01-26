<template>
    <div>
        <BaseHeader
            class="bg-gradient-to-r from-brand-dgrey to-brand-black"
        >
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
  name: 'returns-refunds',
  data() {
    return {
      pageName: 'Returns & Refunds',
      contents: [
        {
          type: 'paragraph',
          title: '',
          paragraphs: [ 'If you would like to return or exchange your purchase, please contact us via email within 5 business days of receiving your order. All returned items must be returned either as new, or as they were bought, i.e. tagged, unwashed, unworn, and with all original packaging intact. Footwear must be returned in their original box, inside another solid box for postage. Returned items that do not meet these criteria will be returned to you at your own cost.' ]
        },
        {
          type: 'paragraph',
          title: '',
          paragraphs: [
            `
            All return and exchange requests
            should be emailed to:
            <a
                href="mailto:hello@thedrumhq.com.au"
                class="opacity-70 hover:underline hover:decoration-brand-grey
                hover:decoration-4 hover:opacity-100 hover:underline-offset-8"
            >
                hello@thedrumhq.com.au
            </a>
            `
          ]
        },
        {
          type: 'paragraph',
          title: '',
          paragraphs: [
            `
            Should there not be a suitable exchange for your purchase,
            we also offer store credit to the same value of
            the item being returned, excluding shipping costs.
            Please note: we DO NOT offer refunds.

            `
          ]
        },
        {
          type: 'paragraph',
          title: '',
          paragraphs: [
            `
            If the item you have purchased is new, tagged, unwashed,
            and unworn, but deemed faulty, please contact us immediately.
            Each item is dealt with case by case, and if a replacement
            is not possible, a refund will be available.
            `,
            `
            REVAMPED is not liable for packages that are lost
            or damaged in transit.
            `
          ]
        }
      ]
    }
  }
}
</script>