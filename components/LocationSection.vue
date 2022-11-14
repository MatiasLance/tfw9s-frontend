<template>
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
    <BaseSection class="py-24">
      <div class="col-span-12 lg:col-span-6">
        <iframe src="https://www.editmysite.com/ajax/apps/generateMap.php?elementid=addead40-60cc-11ed-ac71-7911be0fba12&amp;map=google&amp;ineditor=0&amp;width=auto&amp;point=1&amp;control=3&amp;scalecontrol=1&amp;height=350px&amp;zoom=10&amp;zoomScale=50&amp;lat=-28.02964&amp;long=153.43256&amp;pincolor=%23ffffff&amp;pincontrastcolor=%23000000&amp;styles=%5B%7B%22featureType%22%3A%22poi%22%2C%22elementType%22%3A%22labels.text%22%2C%22stylers%22%3A%5B%7B%22visibility%22%3A%22off%22%7D%5D%7D%2C%7B%22featureType%22%3A%22poi.business%22%2C%22stylers%22%3A%5B%7B%22visibility%22%3A%22off%22%7D%5D%7D%2C%7B%22featureType%22%3A%22road%22%2C%22elementType%22%3A%22labels.icon%22%2C%22stylers%22%3A%5B%7B%22visibility%22%3A%22off%22%7D%5D%7D%2C%7B%22featureType%22%3A%22transit%22%2C%22stylers%22%3A%5B%7B%22visibility%22%3A%22off%22%7D%5D%7D%5D&amp;touch=1&amp;forcemapdrag=1" title="75 Surf Parade Broadbeach QLD 4218" allowtransparency="true" frameborder="0" scrolling="no" loading="lazy" data-v-ab1ca44a="" style="width: 100%; height: 350px;"></iframe>
      </div>
      <div class="col-span-12 lg:col-span-6">
        <h3
        class="my-4 text-left text-xl
        font-bold uppercase lg:my-0"
        >
          {{ headline }}
        </h3>
        <div class="grid grid-cols-2 gap-8">
          <div class="col-span-2 lg:col-span-1">
            <small>{{ word1 }}</small>
            <small class="paragraph my-7 block">
              {{ address }}
            </small>
            <p class="paragraph my-4 text-sm">
              Number {{ number }}
              <a
                class="hover:text-slate-400 hover:decoration-slate-700
                hover:underline-offset-4"
                :href="toemail"
              >
                {{ email }}
              </a>
            </p>
            <button
                type="button"
                class="rounded-xl
                bg-brand-black px-6 py-3
                text-base text-white hover:bg-slate-200
                hover:text-black"
                @click="window.open(maps, '_blank')"
              >
              Get directions
            </button>
          </div>
          <div class="col-span-2 lg:col-span-1">
            <small class="paragraph my-3 block text-sm">
              MONDAY: {{ time1 }}<br>
              TUESDAY: {{ time1 }}<br>
              WEDNESDAY: {{ time1 }}<br>
              THURSDAY: {{ time2 }}<br>
              FRIDAY: {{ time3 }}<br>
              SATURDAY: {{ time3 }}<br>
              SUNDAY: {{ time4 }}
            </small>
          </div>
        </div>
      </div>
    </BaseSection>
    </section>
</template>

<script>
export default {
  name: 'LocationSection',
  data() {
    return {
      headline: 'Location & Hours',
      word1: 'NEW STORE OPENING SOON!',
      address: 'Shop 1.11, Level 1\nOasis Shopping Centre\n75 Surf Parade\nBroadbeach QLD 4218',
      number: '*TBC*',
      email: 'finn@revampedoffical.com',
      toemail: 'mailto:finn@revampedoffical.com',
      maps: 'https://www.google.com/maps/dir/?api=1&destination=75+Surf+Parade+Broadbeach+QLD+4218',
      time1: '9:00AM - 4:00PM',
      time2: '9:00AM - 7:00PM',
      time3: '9:00AM - 5:00PM',
      time4: '10:00AM - 3:00PM'
    }
  }
}
</script>