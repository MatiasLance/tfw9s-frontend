<template>
    <div class="min-h-screen w-screen bg-gradient-to-br from-[#111712]
    via-[#1A1A1B] to-[#0d120e]">
      <BaseHeader class="bg-gradient-to-r from-brand-green to-brand-black">
        <div
          class="
            space-y-3
            px-6
            text-left
            sm:text-left
            lg:col-span-6 lg:mt-10
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
              <NuxtLink to="/admin">
                <VBtn text color="white">Admin</VBtn>
              </NuxtLink>
            </span>
          </span>
          <h1 class="flex flex-row text-3xl font-bold text-white lg:text-4xl">
            Discount Table
          </h1>
        </div>
      </BaseHeader>
      <div class="mx-auto max-w-screen-xl px-4 py-7">
        <div class="-mx-4 flex flex-wrap">
            <main class="w-full px-4">
            <div class="my-6 flex flex-wrap items-center justify-between gap-4">
              <div
                class="flex justify-content-between gap-2"
              >
              <button
                type="button"
                class="
                  w-full rounded-md
                  bg-green-600 p-2.5
                  text-center
                  font-semibold
                  text-white
                  sm:w-60"
                @click="goToDiscountCode"
              >
                <span
                class="
                flex items-center
                justify-center"
                aria-hidden="true"
                >
                  <span class="ml-[5px] text-gray-50">
                    <i class="ri-arrow-go-back-line"></i>
                    Discount Code
                  </span>
                </span>
              </button>
              </div>
            </div>
          </main>
        </div>
        <section v-if="totalPages > 0" class="mb-8" data-aos="fade-up">
          <div
            class="
              flex
              flex-wrap
              items-center
              justify-around
              gap-x-2
              md:justify-between"
            >
            <span class="flex items-center">
              <p class="text-base leading-[2.5em] text-white">
                Showing {{ from }}-{{ to }} of {{ totalItems }} results
              </p>
            </span>
            <BasePagination
              :active-page="activePage"
              :total-pages="totalPages"
              @change="setPage"
            />
          </div>
        </section>
        <DiscountCodeTable
        v-if="discountCodeData && discountCodeData.length > 0"
        :columns="columnsName"
        :data="discountCodeData"
        />
      </div>
    </div>
</template>

<script>
import DiscountCodeTable from '~/components/tables/DiscountCodeTable.vue';

export default {
  components: { DiscountCodeTable },
  data() {
    return {
      columnsName: [
        {
          name: 'Team Name',
          label: 'Team Name'
        },
        {
          name: 'Discount Amount',
          label: 'Discount Amount'
        },
        {
          name: 'Discount Code',
          label: 'Discount Code'
        }
      ],
      discountCodeData: [],
      from: 0,
      to: 0,
      totalItems: 0,
      activePage: 0,
      totalPages: 0,
      discountCodeId: null
    }
  },
  mounted() {
    this.listOfDiscount()
  },
  methods: {
    goToDiscountCode() {
      this.$router.push('/admin/discountcodes');
    },
    listOfDiscount() {
      const query = {
        q: this.query,
        sort: 'a_to_z',
        page: this.totalPages,
        type: this.activePage,
        maxSeriesPerPage: this.totalItems,
        withDiscounts: true,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] == null || query[key] === '') {
          delete query[key];
        }
      });

      const queryString = new URLSearchParams(query).toString()

      this.$axios.$get(`v1/teams?${queryString}`)
        .then((response) => {
          this.discountCodeData = response.data.teams;
          this.from = response.data.from;
          this.to = response.data.to;
          this.totalItems = response.data.total_items;
          this.activePage = response.data.current_page;
          this.totalPages = response.data.last_page;
        })
        .catch((error) => {
          console.log(error.data.message)
        })
    },
    setPage() {
      this.listOfDiscount();
    }
  }
}
</script>