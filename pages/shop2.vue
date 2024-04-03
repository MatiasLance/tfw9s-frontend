<template>
    <div class="w-screen min-h-screen bg-[#1A1A1B]">
      <section class="mx-auto max-w-screen-xl gap-4">
        <section class="mb-8 px-4" data-aos="fade-up">
          <div class="my-6 flex flex-wrap items-center justify-end gap-4">
            <div class="w-full sm:w-80">
              <form @submit.prevent="retrieveItems">
                <SearchBar v-model="query" dark/>
              </form>
            </div>
          </div>
          <div
            class="
              flex flex-wrap items-center justify-around
              gap-x-2
              md:justify-between
            "
          >
            <span class="flex items-center">
              <p class="text-base leading-[2.5em] text-white">
                Showing {{ from }}-{{ to }} of {{ totalItems }} results
              </p>
            </span>
            <BasePagination
              :active-page="page"
              :total-pages="totalPages"
              @change="setPage"
            />
          </div>
        </section>
        <div
        class="grid grid-cols-1 gap-8 px-8
        sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
        <Item
        v-for="(item) in itemList"
        :key="item.id"
        class="overflow-hidden rounded-lg bg-[#212121] shadow-lg"
        data-aos="fade-up"
        >
          <div class="h-64 w-full overflow-hidden">
            <img
            :src="getMediaURL(item.media[0])"
            alt="item Image"
            class="object-cover transition hover:scale-125"
            >
          </div>
        <div class="grid grid-cols-1 gap-2 px-6 py-8">

            <span class="col-span-1 text-[16px] text-white">
              <i class="ri-price-tag-3-line"></i>  Merch
            </span>

            <span
            class="col-span-1 text-xl font-medium text-white"
            >
              {{ item.name }}
          </span>

          <span class="col-span-1 text-white">
          <hr class="my-3"/>
          </span>

            <span class="col-span-1 font-semibold text-white">
              {{ formatCurrency(item.price) }}
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
import handlesMedia from '~/mixins/shop/handlesMedia';
import handlesCurrency from '~/mixins/currency/handlesCurrency';
export default {
  mixins: [
    handlesMedia,
    handlesCurrency,
  ],
  data() {
    return {
      itemList: [],
      query: '',
      from: 0,
      to: 0,
      page: 1,
      perPage: 12,
      totalPages: 0,
      totalItems: 0,
    }
  },
  created() {
    this.retrieveItems();
  },
  methods: {
    setPage(page) {
      this.page = page;
      this.retrieveItems();
    },
    retrieveItems() {
      this.isGymsLoading = true;

      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.page,
        maxItemsPerPage: 12,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null) {
          delete query[key]
        }
      })

      const queryString = new URLSearchParams(query).toString()

      this.$axios
        .$get(`v1/items?${queryString}`)
        .then((response) => {
          this.itemList = response.data.items;
          this.totalItems = response.data.total_items;
          this.totalPages = response.data.last_page;
          this.from = response.data.from;
          this.to = response.data.to;
        })
        .finally(() => {
          this.isGymsLoading = false;
          console.log(this.itemList)
        });
    },
  }
}
</script>