<template>
    <section id="featuredProducts" class="my-36 w-full">
        <BaseSection>
            <div class="col-span-12 my-4">
                <h2
                    class="mb-8 px-4 text-center text-3xl
                    font-semibold uppercase sm:mb-16 sm:px-0 sm:text-5xl"
                >
                    {{ headline }}
                </h2>
            </div>
            <div
                class="col-span-12 w-full px-4 sm:px-6"
            >
                <div
                    class="grid grid-flow-row grid-cols-1
                    gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    <div
                        v-for="product in featuredProducts"
                        :key="product.id"
                        class="flex cursor-pointer flex-col"
                        @click="$router.push('shop')"
                    >
                        <img
                            :src="`/img/sample/${product.img}`"
                            class="mb-8 h-80 w-80 object-contain"
                            alt=""
                        >
                        <span
                            class="block pb-2 text-[18px] font-bold uppercase
                            text-brand-dgrey"
                        >
                            {{ product.brand }}
                        </span>
                        <h2
                            class="pb-2 text-[16px]
                            font-normal uppercase text-brand-black"
                        >
                            {{ product.name }}
                        </h2>
                        <span
                            class="text-[14px]
                            leading-[20px] text-brand-grey transition-all"
                        >A{{ formatCurrency(product.price) }}</span>
                    </div>
                </div>
            </div>
        </BaseSection>
    </section>
</template>

<script>
import currency from '~/mixins/currency';

export default {
  name: 'FeaturedProductsSection',
  mixins: [ currency ],
  data() {
    return {
      headline: 'Featured Products',
      featuredProducts: [
        {
          id: 1,
          brand: 'NIKE',
          name: 'NIKE SB Dunk Low Pro St. Patrick\'s Day',
          price: 370.00,
          img: '1.png'
        },
        {
          id: 2,
          brand: 'NIKE',
          name: 'nike sb dunk low \'gnarhunters\'',
          price: 280.00,
          img: '2.png'
        },
        {
          id: 3,
          brand: 'JORDAN 1',
          name: 'Jordan 1 Low Diamond Shorts',
          price: 260.00,
          img: '3.png'
        },
        {
          id: 4,
          brand: 'JORDAN 1',
          name: 'JORDAN 1 retro high og grade school/youth \'Marina Blue\'',
          price: 280.00,
          img: '4.png'
        },
        {
          id: 5,
          brand: 'JORDAN 1',
          name: 'Jordan 11 Retro Low \'UNC\'',
          price: 830.00,
          img: '5.png'
        },
        {
          id: 6,
          brand: 'BILLIONAIRE BOYS CLUB',
          name: 'Billionaire BB Ruler Woven Black Casual Button Up Shirt',
          price: 180.00,
          img: '6.png'
        },
        {
          id: 7,
          brand: 'BILLIONAIRE BOYS CLUB',
          name: 'Billionaire BB Deep Space S/S Woven Knit Black',
          price: 220.00,
          img: '7.png'
        },
        {
          id: 8,
          brand: 'JORDAN 1',
          name: 'Jordan 1 Retro High OG \'Heritage\'',
          price: 300.00,
          img: '8.png'
        },
      ]
    }
  }
}
</script>