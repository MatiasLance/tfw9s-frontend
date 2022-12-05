<!-- eslint-disable tailwindcss/classnames-order -->
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

    <div class="container mx-auto md:max-w-6xl">
      <div class="content-block py-9 lg:py-24">
        <article class="space-y-9">
          <section
            v-for="(content, contentKey) in contents"
            :key="contentKey"
            class="my-16"
          >
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
import BaseHeader from '../components/base/BaseHeader.vue';
export default {
  name: 'privacy',
  components: { BaseHeader },
  data() {
    return {
      pageName: 'Privacy Policy',
      contents: [
        {
          type: 'paragraphs',
          title: '',
          paragraphs: [ 'Revamped is committed to respecting your privacy and the security of your personal information.' ]
        },
        {
          type: 'paragraphs',
          title: '',
          paragraphs: [
            `
            Please note when purchasing online your email will
            automatically be added to our mailing list. If you
            would like to opt out, scroll to the bottom of our
            newsletter & 'unsubscribe'.
            `
          ]
        },
        {
          type: 'paragraphs',
          title: '',
          paragraphs: [
            `
            ABN - 38663971560
            `
          ]
        }
      ]
    }
  }
};
</script>