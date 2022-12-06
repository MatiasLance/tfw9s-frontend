<template>
    <div>
        <BaseHeader class="bg-gradient-to-r from-brand-dgrey to-brand-black">
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
                <NuxtLink to="/admin">
                <VBtn text color="white">Admin</VBtn>
                </NuxtLink>
            </span>
            </span>
            <h1 class="flex flex-row text-4xl font-bold text-white lg:text-6xl">
            Variants
            </h1>
        </div>
        </BaseHeader>
        <section class="container mx-auto max-w-screen-lg px-2 sm:px-4">
            <div class="my-8 w-full py-7 sm:px-12">
                <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <VariantSection
                        :options="variantList"
                        @retrieve="retrieveVariants"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import 'vue-croppa/dist/vue-croppa.css';
import 'remixicon/fonts/remixicon.css';
import VariantSection from '../../components/VariantSection.vue'
export default {
  name: 'variants',
  components: { VariantSection },
  data() {
    return {
      variantList: [],
      variantsDemo: [
        {
          name: 'Size',
          elements: [
            {
              name: 'Small',
              photo: {
                type: '',
                value: '',
              },
              price: 0
            },
            {
              name: 'Medium',
              photo: {
                type: '',
                value: '',
              },
              price: 0
            },
            {
              name: 'Large',
              photo: {
                type: '',
                value: '',
              },
              price: 0
            },
            {
              name: 'XLarge',
              photo: {
                type: '',
                value: '',
              },
              price: 0
            },
            {
              name: 'XXLarge',
              photo: {
                type: '',
                value: '',
              },
              price: 0
            }
          ]
        },
        {
          name: 'Color',
          elements: [
            {
              name: 'Black',
              photo: {
                type: 'colour',
                value: '#000'
              },
              price: 0
            },
            {
              name: 'Red White w/ Stripes',
              photo: {
                type: 'image',
                value: null
              },
              price: 0
            },
            {
              name: 'Blue',
              photo: {
                type: 'image',
                value: null
              },
              price: 0
            },
            {
              name: 'Green',
              photo: {
                type: 'colour',
                value: '#319b5a'
              },
              price: 0
            },
            {
              name: 'Brown',
              photo: {
                type: 'colour',
                value: '#b4844b'
              },
              price: 0
            }
          ]
        }
      ],
      query: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.retrieveVariants()
    })
  },
  methods: {
    retrieveVariants() {
      const query = { q: this.query }

      // Sanitize and remove null values
      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/variants?${queryString}`)
        .then((response) => {
          this.variantList = response.data.variants;
          console.log(this.variantList)
        })
    },
  }
}
</script>