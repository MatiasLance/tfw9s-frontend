<template>
  <section>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div class="col-span-3 md:col-span-1">
        <div>
          <select
            v-model="sortBy"
            class="
              mt-1
              block
              w-full
              appearance-none
              rounded-xl
              border-2 border-gray-600
              bg-gray-700
              py-3
              px-4
              font-normal
              text-gray-100
              outline-inherit
              transition-all
              duration-300
              placeholder-gray-400
              hover:border-green-400
              focus:border-green-500 focus:bg-gray-600 
              focus:text-gray-50 focus:outline-none
              focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
            "
            @change="emitUpdate(this)"
          >
            <option
              v-for="option in sortOptions"
              :key="option.value"
              :value="option.value"
              class="bg-gray-700 text-gray-100"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-span-3 md:col-span-1"></div>
      <div class="col-span-3 md:col-span-1">
        <div class="col-span-1">
          <div class="flex justify-center">
            <div class="xl:w-96">
              <form @submit.prevent="emitUpdate(this)">
                <SearchBar v-model="query"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import _debounce from 'lodash/debounce'
import SearchBar from '~/components/SearchBar'

export default {
  name: 'SortSearchTop',
  components: { SearchBar },
  data() {
    return {
      sortOptions: [
        {
          name: 'Sort by latest',
          value: 'latest',
        },
        {
          name: 'Sort by price: low to high',
          value: 'low_to_high',
        },
        {
          name: 'Sort by price: high to low',
          value: 'high_to_low',
        },
      ],
      showComponent: false
    };
  },
  computed: {
    sortBy: {
      get() {
        return this.$store.state.shop.sortBy;
      },
      set(value) {
        this.$store.commit('shop/setSortBy', value);
      },
    },
    query: {
      get() {
        return this.$store.state.shop.q;
      },
      set(value) {
        this.$store.commit('shop/setQuery', value);
      },
    },
  },
  methods: {
    emitUpdate: _debounce(function() {
      this.$emit('change')
    }, 1000)
  },
};
</script>