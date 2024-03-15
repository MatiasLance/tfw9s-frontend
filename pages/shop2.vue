<template>
    <div class="min-h-full bg-[#1A1A1B] pt-8  pb-20">
      <section class="mx-auto max-w-screen-xl gap-4">
        <div
        class="grid grid-cols-1 gap-8 px-8
        sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
        <Item
        v-for="(product, index) in products"
        :key="index"
        class="overflow-hidden rounded-lg bg-[#212121] shadow-lg"
        data-aos="fade-up"
        >
        <img
        :src="product.image"
        alt="Product Image"
        class="h-64 w-full object-cover"
        >
        <div class="grid grid-cols-1 gap-2 px-6 py-8">

            <span class="col-span-1 text-[16px] text-white">
              <i class="ri-price-tag-3-line"></i>  Merch
            </span>

            <span
            class="col-span-1 text-xl font-medium text-white"
            >
              {{ product.name }}
          </span>

          <span class="col-span-1 text-white">
          <hr class="my-3"/>
          </span>

            <span class="col-span-1 text-white">
              {{ product.price }}
            </span>

            <BaseButton
            class="from-40% via-95% to-100%
            w-full rounded-lg
            bg-gradient-to-tr
            from-[#5EE738]
            via-[#3e872a]
            to-[#050505]
            py-4
            px-8
            uppercase
            text-white"
            >
            Add to Cart
            </BaseButton>

        </div>

      </Item>
        </div>
      </section>
    </div>
</template>

<script>
export default {
  data() {
    return { products: [] }
  },
  created() {
    this.generateRandomData();
  },
  methods: {
    generateRandomData() {
      for (let i = 0; i < 14; i++) {
        this.products.push({
          index: i+1,
          name: this.getRandomItem(),
          price: this.getRandomPrice(),
          image: require('~/assets/images/kidsplaying.jpg'),
        });
      }
    },
    getRandomItem() {
      const items = [
        'TFW Cooler',
        'TFW Kids',
        'TFW Tumbler',
        'TFW Towel',
      ];
      return items[Math.floor(Math.random() * items.length)];
    },
    getRandomPrice() {
      const prices = [
        '$20',
        '$15',
        '$10',
        '$5',
      ];
      return prices[Math.floor(Math.random() * prices.length)];
    }
  }
}
</script>