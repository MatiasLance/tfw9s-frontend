<template>
    <div class="container mx-auto py-12 ">
    <div
     class="grid-cols1 grid gap-8 sm:grid-cols-2
            lg:grid-cols-4"
            >
    <div
    v-for="(product, index) in products"
    :key="index"
    class="overflow-hidden rounded-lg bg-white shadow-lg"
    >
    <img
   :src="product.image"
     alt="Product Image"
    class="h-64 w-full object-cover"
    >
    <div class="p-6">
        <h3
        class="text-xl font-semibold text-gray-800"
        >
        {{ product.name }}</h3>
        <p class="text-gray-600">
            {{ product.description }}
        </p>
        <BaseButton
                class=" mt-3
                max-w-full border
                border-gray-200
                bg-gradient-to-r
                from-brand-green
                to-brand-black
                py-4
                px-8
                text-xl
                font-bold
                uppercase text-white"
                >
                Add to Cart
     </BaseButton>

    </div>

    </div>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          name: 'Product 1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          name: 'Product 1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          name: 'Product 1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: require('~/assets/images/kidsplaying.jpg')
        },
        {
          name: 'Product 1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: require('~/assets/images/kidsplaying.jpg')
        },
      ]
    }
  }
}
</script>