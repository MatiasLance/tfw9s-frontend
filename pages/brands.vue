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
        <h1 class="flex flex-row text-4xl font-bold text-white lg:text-6xl">
          {{ pageTitle }}
        </h1>
      </div>
    </BaseHeader>

    <div class="mx-auto max-w-screen-xl px-4 py-28">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 my-8 md:my-16 lg:my-24">
            <h3 class="text-left leading-[1]">
              <span
                class="
                  font-montserrat
                  block
                  text-[2.5rem]
                  font-bold
                  leading-tight
                  text-black
                  sm:pr-8 sm:text-lg
                  xl:pr-10 xl:text-3xl
                "
              >
                {{ headline }}
              </span>
            </h3>
        </div>
        <div class="col-span-12 my-9">
            <div class="grid grid-cols-2 gap-12 lg:grid-cols-3">
                <BrandImage
                    v-for="img in brandsList"
                    :key="img"
                    :img="img"
                />
            </div>
        </div>
        <div class="col-span-12 my-8 md:my-16 lg:my-24">
            <h3 class="text-center leading-[1]">
              <span
                class="
                  font-montserrat
                  block
                  text-[2.5rem]
                  font-bold
                  leading-tight
                  text-black
                  sm:pr-8 sm:text-lg
                  xl:pr-10 xl:text-3xl
                "
              >
                {{ headline }}
              </span>
            </h3>
        </div>
        <div class="col-span-12 my-9">
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <p
                    v-for="brand in allBrands"
                    :key="brand"
                    class="paragraph text-center text-lg uppercase"
                >
                    {{ brand }}
                </p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css'
import BaseHeader from '../components/base/BaseHeader.vue';
import BrandImage from '../components/BrandImage.vue';

export default {
  name: 'brands',
  components: { BaseHeader, BrandImage },
  data() {
    return {
      headline: 'Major Footwear Brands',
      headline2: 'All Brands',
      pageTitle: 'Brands',
      pageSEO: {
        title: 'Brands | Revamped',
        description: '',
      },
      brandsList: [
        '1.png',
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png',
        '7.png',
        '8.png',
        '9.png',
      ],
      allBrands: [
        'ACNE STUDIOS',
        'ADIDAS YEEZY',
        'ALEXANDER MCQUEEN',
        'ANTI SOCIAL SOCIAL CLUB',
        'ASICS',
        'BALENCIAGA',
        'BALLY',
        'BAPE',
        'BIANCA CHANDON',
        'BILLIONAIRE BOYS CLUB',
        'BURBERRY',
        'CLOT',
        'COMME DE GARCONS (CDG)',
        'DOLCE AND GABBANA',
        'FEAR OF GOD/ESSENTIALS',
        'FENDI',
        'GIUSEPPE ZANOTTI',
        'GIVENCHY',
        'HERON PRESTON',
        'HUMAN MADE',
        'JORDAN',
        'KENZO',
        'MCM',
        'MONCLER',
        'MOSCHINO',
        'NEIGHBOURHOOD',
        'NEILL BARRET',
        'NEW BALANCE',
        'NIKE',
        'OFF WHITE',
        'PALACE',
        'PALM ANGELS',
        'PARRA',
        'PATTA',
        'PLEASURES',
        'PUMA',
        'REEBOK',
        'SACAI',
        'SALVATORE FERRAGAMO',
        'SUPREME',
        'UNDEFEATED',
        'VETEMENTS',
        'VLONE'
      ]
    }
  },
  head() {
    return {
      title: this.pageSEO.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageSEO.description,
        },
      ],
    };
  }
}
</script>