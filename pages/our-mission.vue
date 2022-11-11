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
          {{ pageName }}
        </h1>
      </div>
    </BaseHeader>

    <BaseSection class="my-16">
        <div class="col-span-12 my-12 px-10 text-center">
            <div class="mb-6">
                <h2 class="text-3xl font-bold">
                    {{ statements[0].title }}
                </h2>
            </div>
            <div class="mb-3">
                <p class="text-sm">
                    {{ statements[0].description1 }}
                </p>
            </div>
        </div>
        <div class="col-span-12 my-12 px-10 text-center">
            <div class="mb-6">
                <h2 class="text-3xl font-bold">
                    {{ statements[1].title }}
                </h2>
            </div>
            <div class="mb-3">
                <p class="text-sm">
                    {{ statements[1].description1 }}
                </p>
            </div>
            <div class="mb-3">
                <p class="text-sm">
                    {{ statements[1].description2 }}
                </p>
            </div>
        </div>
        <div class="col-span-12 my-12 px-10 text-center">
            <div class="mb-6">
                <h2 class="text-3xl font-bold">
                    {{ statements[2].title }}
                </h2>
            </div>
            <div class="mb-3">
                <p class="text-sm">
                    {{ statements[2].subtitle }}
                </p>
                <p class="text-sm">
                    {{ statements[2].description1 }}
                </p>
            </div>
            <div class="mb-3">
                <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="text-sm" v-html="statements[2].description2"/>
            </div>
            <div class="mb-3">
                <p class="text-sm font-bold">
                    {{ statements[2].description3 }}
                </p>
            </div>
        </div>
    </BaseSection>

    </div>
</template>

<script>
import BaseHeader from '../components/base/BaseHeader.vue'
import BaseSection from '../components/base/BaseSection.vue'
export default {
  components: { BaseHeader, BaseSection },
  data() {
    return {
      pageName: 'Our Mission',
      statements: [
        {
          title: 'Our Mission',
          subtitle: '',
          description1: 'Our mission is to create a new avenue for people to buy exclusive products, whilst offering a pleasurable experience for all, by retailing streetwear, designer, and luxury products in a sustainable manner from our unique boutique on the Gold Coast.',
          description2: '',
          description3: ''
        },
        {
          title: 'Our Focus',
          subtitle: '',
          description1: 'Our main focus is creating a relaxed, unique, and enjoyable experience for all customers, whether they plan to make a purchase or not. No matter what person walks through the door, we welcome all walks of life with open arms.',
          description2: 'Our focus is you. Our customer. Without our customers, we are nothing.',
          description3: ''
        },
        {
          title: 'Our Name',
          subtitle: 'Definition:',
          description1: '"To change, make or arrange something differently, in order to improve it; to make it more modern and/or efficient, by creating a better form, structure or appearance."',
          description2: 'Sometimes the name \'Revamped\' may lead people to think we sell second hand clothes, or fix/repair them, but this is <span class="font-bold">not the case.</span>',
          description3: 'In actuality, the name represents a new, reinvented approach to retail fashion entirely.'

        }
      ]
    }
  }
}
</script>