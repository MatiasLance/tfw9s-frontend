<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <div>
    <HeroSection
      class="flex min-h-screen items-center justify-center py-24"
    />
    <section
      class="
        bg-partner
        relative
        my-24
        max-w-full
        overflow-hidden
        shadow
        sm:mx-6
      "
    >
    <BaseSection>
      <div class="col-span-12 lg:col-span-6">
        <iframe src="https://www.editmysite.com/ajax/apps/generateMap.php?elementid=addead40-60cc-11ed-ac71-7911be0fba12&amp;map=google&amp;ineditor=0&amp;width=auto&amp;point=1&amp;control=3&amp;scalecontrol=1&amp;height=350px&amp;zoom=10&amp;zoomScale=50&amp;lat=-28.02964&amp;long=153.43256&amp;pincolor=%23ffffff&amp;pincontrastcolor=%23000000&amp;styles=%5B%7B%22featureType%22%3A%22poi%22%2C%22elementType%22%3A%22labels.text%22%2C%22stylers%22%3A%5B%7B%22visibility%22%3A%22off%22%7D%5D%7D%2C%7B%22featureType%22%3A%22poi.business%22%2C%22stylers%22%3A%5B%7B%22visibility%22%3A%22off%22%7D%5D%7D%2C%7B%22featureType%22%3A%22road%22%2C%22elementType%22%3A%22labels.icon%22%2C%22stylers%22%3A%5B%7B%22visibility%22%3A%22off%22%7D%5D%7D%2C%7B%22featureType%22%3A%22transit%22%2C%22stylers%22%3A%5B%7B%22visibility%22%3A%22off%22%7D%5D%7D%5D&amp;touch=1&amp;forcemapdrag=1" title="75 Surf Parade Broadbeach QLD 4218" allowtransparency="true" frameborder="0" scrolling="no" loading="lazy" data-v-ab1ca44a="" style="width: 100%; height: 350px;"></iframe>
      </div>
      <div class="col-span-12 lg:col-span-6">
        <h3
        class="mb-4 text-left text-xl
        font-bold uppercase sm:mb-2"
        >
          Location & Hours
        </h3>
        <small>NEW STORE OPENING SOON!</small>
        <small class="paragraph my-7 block">
          Shop 1.11, Level 1
          Oasis Shopping Centre
          75 Surf Parade
          Broadbeach QLD 4218
        </small>
        <p class="paragraph my-4 text-sm">
          Number *TBC*
          <a
            class="hover:text-slate-400 hover:decoration-slate-700
            hover:underline-offset-4"
            href="mailto:finn@revampedoffical.com"
          >
            finn@revampedoffical.com
          </a>
        </p>
        <p class="paragraph my-3 text-sm">
          <a
            class="underline
            hover:text-slate-400 hover:decoration-slate-700
            hover:underline-offset-4"
            href="https://www.google.com/maps/dir/?api=1&destination=75+Surf+Parade+Broadbeach+QLD+4218"
          >
          Get directions
          </a><br>
          MONDAY: 9:00AM - 4:00PM<br>
          TUESDAY: 9:00AM - 4:00PM<br>
          WEDNESDAY: 9:00AM - 4:00PM<br>
          THURSDAY: 9:00AM - 7:00PM<br>
          FRIDAY: 9:00AM - 5:00PM<br>
          SATURDAY: 9:00AM - 5:00PM<br>
          SUNDAY: 10:00AM - 3:00PM
        </p>
      </div>
    </BaseSection>
    </section>
  </div>
</template>

<script>
import aosMixin from '@/mixins/aos';

export default {
  name: 'index',
  mixins: [ aosMixin ],
  data() {
    return { }
  },
  head() {
    return {
      title: 'Revamped - GC\'S Finest Store: NIKE DUNKS, JORDANS, YEEZYS & MORE! | Revamped Official',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Gold Coast\'s finest sneaker, clothing and accessories store',
        },
      ],
      keywords: [
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'sneakers, clothing, accessories, nike dunks, jordans, yeezys, online store',
        },
      ],
    };
  },
};
</script>
