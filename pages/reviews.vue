<template>
    <div>
        <BaseHeader
            class="
            bg-gradient-to-r
            from-brand-grey
            to-brand-black
            "
        >
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
                <h1
                class="flex flex-row text-4xl
                font-bold text-white lg:text-6xl"
                >
                {{ pageName }}
                </h1>
            </div>
        </BaseHeader>

        <div class="mx-auto max-w-screen-xl px-4 py-28">
            <div class="grid grid-cols-12 gap-8">
                <div
                    v-for="review in reviews"
                    :key="review.id"
                    class="col-span-12 px-10 sm:col-span-6 lg:col-span-4"
                >
                    <h3 class="my-8 text-xl font-bold text-brand-dgrey">
                        "{{ review.message }}"
                    </h3>
                    <small class="mt-11 text-sm">
                        {{ review.customer }} ({{ review.product}})
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: 'Reviews',
      reviews: [
        {
          id: 1,
          message: 'Very happy! Great service! Great product! Great price!',
          customer: 'Mike',
          product: 'Nike Air Huarache Run, Size US 9.5'
        },
        {
          id: 2,
          message: 'Super fast shipping. I love these sneakers so much. Thank you so much',
          customer: 'Kalen Garcia',
          product: 'Jordan 1 Mid Glitter Black, Size US 6.5W'
        },
        {
          id: 3,
          message: 'Quick postage, shoes as pictured and described. They’re so HOT! Really happy, such a smooth transaction with Authenticator.',
          customer: 'Madeleine S. Naylor',
          product: 'Air Force 1 Iridescent Swoosh, Size US 9W'
        },
        {
          id: 4,
          message: 'Perfect seller. Very kind to deal with and immaculate service - had the item posted very fast and the item is exactly as the seller described. Can’t thank you enough.',
          customer: 'Brayden Black',
          product: 'Jordan 1 Low Black, White, Grey, Size US 10'
        },
        {
          id: 5,
          message: 'Great Seller, fast delivery on shoes even with Authentication process. Product exactly as advertised.',
          customer: 'Derrick Chee',
          product: 'Jordan 1 Retro High Reverse bred, Size US 12.5'
        },
        {
          id: 6,
          message: 'Great seller, fast delivery. Definitely recommended!',
          customer: 'Evan Borce',
          product: 'Nike Air Presto South Korea, Size S'
        }
      ]
    }
  }
}
</script>